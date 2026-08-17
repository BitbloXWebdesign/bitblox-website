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
    const { to, name, email, phone, service, message, domain, clientName } = data;

    if (!to || !email || !name) {
      return new Response(JSON.stringify({ success: false, error: "Ontbrekende verplichte velden" }), {
        status: 400,
        headers: corsHeaders
      });
    }

    const targetEmail = to || "info@bitblox.nl";
    const siteLabel = domain || clientName || "Website";

    let result = null;

    // 1. Direct Web3Forms delivery for BitbloX master mailbox
    if (targetEmail.toLowerCase().includes("bitblox")) {
      const w3Res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          access_key: "19097563-42e8-438f-b0d5-a56c3b2c17d1",
          subject: `📩 Nieuw contactbericht via ${siteLabel}`,
          from_name: `${siteLabel} Contactformulier`,
          name: name,
          email: email,
          phone: phone || "Niet opgegeven",
          service: service || "Algemene vraag",
          message: message
        })
      });
      result = await w3Res.json();
    } else {
      // 2. Automated delivery for client mailboxes (FormSubmit AJAX)
      const fsRes = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(targetEmail)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          _subject: `📩 Nieuw contactbericht via ${siteLabel}`,
          Naam: name,
          "E-mailadres": email,
          Telefoonnummer: phone || "Niet opgegeven",
          "Onderwerp / Dienst": service || "Algemeen",
          Bericht: message,
          _replyto: email,
          _template: "table"
        })
      });
      result = await fsRes.json();
    }

    return new Response(JSON.stringify({ success: true, result }), {
      status: 200,
      headers: corsHeaders
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: corsHeaders
    });
  }
};
