import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify({ message: "DeepSeek Blog API is actief. Gebruik POST met een onderwerp om een blog-artikel te genereren." }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const topic = body.topic;

    if (!topic) {
      return new Response(JSON.stringify({ error: "Geen blog onderwerp of titel opgegeven." }), { status: 400 });
    }

    const DEEPSEEK_API_KEY = import.meta.env.DEEPSEEK_API_KEY || process.env.DEEPSEEK_API_KEY;
    const slug = topic.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const dateStr = new Date().toISOString().split('T')[0];

    if (DEEPSEEK_API_KEY) {
      const prompt = `Schrijf een waardevol, professioneel en SEO-geoptimaliseerd blog-artikel in het Nederlands over het onderwerp: "${topic}" voor het webdesignbureau BitbloX uit Assen.
Reageer UITSLUITEND met een JSON object in het volgende formaat:
{
  "filename": "${slug}.md",
  "title": "<Pakkende SEO titel>",
  "description": "<Pakkende samenvatting van 1-2 zinnen>",
  "category": "<Webdesign, SEO, AI of Hosting>",
  "markdown": "<Volledig artikel in Markdown met duidelijke H2 en H3 kopjes, opsommingen en praktische adviezen voor ZZP en MKB>"
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
        const resObj = JSON.parse(aiData.choices[0].message.content);

        const fullMarkdownFile = `---
title: "${resObj.title.replace(/"/g, '\\"')}"
description: "${resObj.description.replace(/"/g, '\\"')}"
pubDate: ${dateStr}
category: "${resObj.category || 'Webdesign'}"
author: "BitbloX"
---

${resObj.markdown}
`;

        return new Response(JSON.stringify({ 
          success: true, 
          source: "DeepSeek AI", 
          filename: resObj.filename || `${slug}.md`,
          fileContent: fullMarkdownFile 
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    // Fallback als er (nog) geen DeepSeek API sleutel aanwezig is
    const fallbackTitle = topic;
    const fallbackMarkdown = `---
title: "${fallbackTitle.replace(/"/g, '\\"')}"
description: "Praktische tips en adviezen over ${fallbackTitle} voor ZZP en MKB ondernemers."
pubDate: ${dateStr}
category: "Webdesign"
author: "BitbloX"
---

## Waarom ${fallbackTitle} belangrijk is voor uw onderneming

Als ondernemer wilt u dat uw website snel is, goed gevonden wordt en nieuwe klanten oplevert. ${fallbackTitle} speelt hierin een cruciale rol.

### Belangrijkste inzichten
- **Snelheid & Gebruiksgemak**: Een snelle website verhoogt conversie.
- **Lokale SEO**: Beter vindbaar in Assen, Groningen en Drenthe.
- **AI-Klaar**: Voorbereid op zoekopdrachten in ChatGPT en Google AI Overviews.

Wilt u meer weten of uw website laten optimaliseren door BitbloX? Neem vrijblijvend contact op via info@bitblox.nl.
`;

    return new Response(JSON.stringify({ 
      success: true, 
      source: "Lokale Generator", 
      filename: `${slug}.md`,
      fileContent: fallbackMarkdown 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
