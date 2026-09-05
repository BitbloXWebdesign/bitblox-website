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

    const scriptCount = (htmlText.match(/<script/gi) || []).length;
    const cssCount = (htmlText.match(/rel=["']stylesheet["']/gi) || []).length;
    const imgCount = (htmlText.match(/<img/gi) || []).length;
    const hasGzipOrBrotli = !!(response.headers.get("content-encoding"));

    const simulatedMobileSeconds = Math.max(
      0.6,
      Math.round(((ttfb * 1.5 + scriptCount * 55 + cssCount * 45 + (htmlSizeKB > 100 ? 550 : 150)) / 1000) * 10) / 10
    );

    let score = Math.max(15, Math.min(99, Math.round(102 - (simulatedMobileSeconds * 16))));
    if (ttfb > 1200) score = Math.min(score, 52);
    if (!hasGzipOrBrotli && score > 75) score -= 12;

    let visitorLossPercent = 10;
    if (simulatedMobileSeconds >= 4.5) {
      visitorLossPercent = 55;
    } else if (simulatedMobileSeconds >= 3.0) {
      visitorLossPercent = 42;
    } else if (simulatedMobileSeconds >= 2.0) {
      visitorLossPercent = 26;
    } else if (simulatedMobileSeconds >= 1.2) {
      visitorLossPercent = 15;
    } else {
      visitorLossPercent = 4;
    }

    return new Response(JSON.stringify({
      success: true,
      domain: domain,
      status: response.status,
      ttfbMs: ttfb,
      totalTimeMs: totalTime,
      htmlSizeKB: htmlSizeKB,
      scriptCount: scriptCount,
      cssCount: cssCount,
      imgCount: imgCount,
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