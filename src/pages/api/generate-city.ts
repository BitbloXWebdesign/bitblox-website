import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify({ message: "DeepSeek API endpoint is actief. Gebruik POST om een stad te genereren." }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const city = body.city;

    if (!city) {
      return new Response(JSON.stringify({ error: "Geen plaatsnaam opgegeven." }), { status: 400 });
    }

    const DEEPSEEK_API_KEY = import.meta.env.DEEPSEEK_API_KEY || process.env.DEEPSEEK_API_KEY;

    if (DEEPSEEK_API_KEY) {
      const prompt = `Genereer een JSON object voor een webdesign microsite in de Nederlandse plaats "${city}".
Reageer UITSLUITEND met valide JSON in dit exacte formaat:
{
  "slug": "${city.toLowerCase().replace(/[^a-z0-9]+/g, '-')}",
  "plaats": "${city}",
  "provincie": "<Provincie waarin ${city} ligt>",
  "afstand": "<Echte autorijtijd vanaf Assen, bijv: Slechts 20 min rijden vanaf Assen>",
  "intro": "<Een unieke, wervende intro-tekst van 2 zinnen over professionele en betaalbare websites laten maken in ${city} door BitbloX>",
  "wijken": ["<Echte bekende wijk of buurt 1 in ${city}>", "<Echte bekende wijk of buurt 2>", "<Echte bekende wijk of buurt 3>"],
  "klanten": []
}`;

      const apiRes = await fetch("https://api.deepseek.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${DEEPSEEK_API_KEY}`
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [{ role: "user", content: prompt }],
          response_format: { type: "json_object" }
        })
      });

      if (apiRes.ok) {
        const aiData = await apiRes.json();
        const jsonContent = JSON.parse(aiData.choices[0].message.content);
        return new Response(JSON.stringify({ success: true, source: "DeepSeek AI", data: jsonContent }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    // Fallback als DeepSeek API key (nog) niet is ingevuld
    const slugKey = city.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const fallbackData = {
      slug: slugKey,
      plaats: city.charAt(0).toUpperCase() + city.slice(1),
      provincie: "Drenthe / Groningen",
      afstand: "Slechts korte reistijd vanaf onze vestiging in Assen",
      intro: `Zoekt u een professionele & betaalbare website laten maken in ${city}? BitbloX levert maatwerk webdesign, supersnelle hosting en lokale SEO.`,
      wijken: [`${city}-Centrum`, `Bedrijventerrein ${city}`, "Omliggende dorpen"],
      klanten: []
    };

    return new Response(JSON.stringify({ success: true, source: "Lokale Database", data: fallbackData }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
