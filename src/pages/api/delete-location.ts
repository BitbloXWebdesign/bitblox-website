import type { APIRoute } from 'astro';
import fs from 'node:fs';
import path from 'node:path';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { slug } = body;

    if (!slug) {
      return new Response(JSON.stringify({ error: "Slug is verplicht." }), { status: 400 });
    }

    const locationsFilePath = path.resolve(process.cwd(), 'src/data/locations.json');

    if (fs.existsSync(locationsFilePath)) {
      const fileRaw = fs.readFileSync(locationsFilePath, 'utf-8');
      const locationsObj = JSON.parse(fileRaw);
      
      if (locationsObj[slug]) {
        delete locationsObj[slug];
        fs.writeFileSync(locationsFilePath, JSON.stringify(locationsObj, null, 2), 'utf-8');
      }
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: `Microsite ${slug} succesvol verwijderd!`
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
