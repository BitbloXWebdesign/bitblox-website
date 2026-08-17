export const onRequestOptions = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Accept'
    }
  });
};

export const onRequestPost = async ({ request }: { request: Request }) => {
  const corsHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Accept'
  };

  try {
    const data = await request.json();
    const { to, name, email, phone, service, message, domain, clientName } = data;

    if (!to || !email || !name) {
      return new Response(JSON.stringify({ success: false, error: 'Ontbrekende verplichte velden (naam, email of ontvanger)' }), {
        status: 400,
        headers: corsHeaders
      });
    }

    const res = await fetch(https://formsubmit.co/ajax/, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        _subject: 📩 Nieuw contactbericht via ,
        Naam: name,
        'E-mailadres': email,
        Telefoonnummer: phone || 'Niet opgegeven',
        'Onderwerp / Dienst': service || 'Algemene vraag / Afspraak',
        Bericht: message,
        _replyto: email,
        _template: 'table'
      })
    });

    const result = await res.json();

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
