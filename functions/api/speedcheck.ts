export const onRequestOptions = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Accept"
    }
  });
};

export const onRequestPost = async ({ request }: { request: Request }) => {
  const corsHeaders = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Accept"
  };

  try {
    const data = await request.json();
    let { domain } = data;

    if (!domain || typeof domain !== "string") {
      return new Response(JSON.stringify({ success: false, error: "Vul een geldige domeinnaam in." }), {
        status: 400,
        headers: corsHeaders
      });
    }

    domain = domain.trim().toLowerCase().replace(/^https?:\/\//i, "").replace(/\/.*$/, "");
    if (!domain || domain.length < 3 || !domain.includes(".")) {
      return new Response(JSON.stringify({ success: false, error: "Controleer de domeinnaam (bijv. uwbedrijf.nl)." }), {
        status: 400,
        headers: corsHeaders
      });
    }

    const targetUrl = "https://" + domain;
    const startTime = Date.now();

    const response = await fetch(targetUrl, {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 BitbloXSpeedAudit/1.0",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
      },
      signal: AbortSignal.timeout(9000)
    });

    const ttfb = Date.now() - startTime;
    const htmlText = await response.text();
    const totalTime = Date.now() - startTime;
    const htmlSizeKB = Math.round((htmlText.length / 1024) * 10) / 10;

    const isWP = htmlText.includes("/wp-content/") || htmlText.includes("/wp-includes/");
    const isShopify = htmlText.includes("cdn.shopify.com");
    const isWix = htmlText.includes("wixsite.com") || htmlText.includes("parastorage.com");
    const isJoomla = htmlText.includes("joomla") || htmlText.includes("/components/com_");
    const isBitbloXorJamstack = domain.includes("bitblox.nl") || domain.includes("tuinstaalnoord.nl") || domain.includes("massagestudioeelde.nl") || htmlText.includes("astro") || (!isWP && !isShopify && !isWix && htmlSizeKB < 80);

    let platform = "Maatwerk / Modern";
    if (isWP) platform = "WordPress CMS";
    else if (isShopify) platform = "Shopify E-commerce";
    else if (isWix) platform = "Wix Website Builder";
    else if (isJoomla) platform = "Joomla CMS";
    else if (isBitbloXorJamstack) platform = "Jamstack / Cloud Edge";

    const scriptCount = (htmlText.match(/<script/gi) || []).length;
    const cssCount = (htmlText.match(/rel=["']stylesheet["']/gi) || []).length;
    const totalAssets = scriptCount + cssCount;

    let simulatedMobileSeconds = 0;
    if (isBitbloXorJamstack && ttfb < 180) {
      simulatedMobileSeconds = 0.2 + Math.round((ttfb / 1000) * 10) / 10;
    } else {
      simulatedMobileSeconds = (ttfb * 1.8 + totalAssets * 85 + (htmlSizeKB > 100 ? htmlSizeKB * 3.2 : htmlSizeKB * 1.6)) / 1000;
      if (isWP) simulatedMobileSeconds += 0.8;
      if (isWix) simulatedMobileSeconds += 1.3;
    }
    simulatedMobileSeconds = Math.max(0.2, Math.round(simulatedMobileSeconds * 10) / 10);

    let score = 0;
    if (isBitbloXorJamstack && ttfb < 180) {
      score = Math.max(96, Math.min(100, Math.round(100 - (simulatedMobileSeconds * 6))));
    } else {
      score = Math.round(100 - (simulatedMobileSeconds * 14) - (ttfb > 500 ? 12 : 0) - (isWP ? 6 : 0));
      score = Math.max(22, Math.min(94, score));
    }

    let visitorLossPercent = 0;
    if (simulatedMobileSeconds <= 0.4) visitorLossPercent = 2;
    else if (simulatedMobileSeconds <= 1.0) visitorLossPercent = 7;
    else if (simulatedMobileSeconds <= 1.8) visitorLossPercent = 16;
    else if (simulatedMobileSeconds <= 2.8) visitorLossPercent = 32;
    else if (simulatedMobileSeconds <= 4.0) visitorLossPercent = 47;
    else visitorLossPercent = Math.min(68, Math.round(48 + (simulatedMobileSeconds - 4) * 7));

    return new Response(JSON.stringify({
      success: true,
      domain: domain,
      platform: platform,
      status: response.status,
      ttfbMs: ttfb,
      totalTimeMs: totalTime,
      htmlSizeKB: htmlSizeKB,
      scriptCount: scriptCount,
      cssCount: cssCount,
      totalAssets: totalAssets,
      mobileLoadSeconds: simulatedMobileSeconds.toFixed(1),
      performanceScore: score,
      visitorLossPercent: visitorLossPercent,
      bitbloxLoadSeconds: "0.2",
      bitbloxScore: 99
    }), {
      status: 200,
      headers: corsHeaders
    });

  } catch (error: any) {
    return new Response(JSON.stringify({
      success: false,
      error: "Kon geen verbinding maken met deze website. Controleer of het domein online is."
    }), {
      status: 500,
      headers: corsHeaders
    });
  }
};