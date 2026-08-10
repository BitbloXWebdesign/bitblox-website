import type { APIRoute } from 'astro';
import fs from 'node:fs';
import path from 'node:path';

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify({ message: "Save Location API is actief." }), { status: 200 });
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { locationData } = body;

    if (!locationData || !locationData.slug) {
      return new Response(JSON.stringify({ error: "Ongeldige locatie data." }), { status: 400 });
    }

    const locationsFilePath = path.resolve(process.cwd(), 'src/data/locations.json');
    let locationsObj: Record<string, any> = {};

    if (fs.existsSync(locationsFilePath)) {
      const fileRaw = fs.readFileSync(locationsFilePath, 'utf-8');
      locationsObj = JSON.parse(fileRaw);
    }

    locationsObj[locationData.slug] = locationData;

    fs.writeFileSync(locationsFilePath, JSON.stringify(locationsObj, null, 2), 'utf-8');

    return new Response(JSON.stringify({ 
      success: true, 
      message: `Microsite voor ${locationData.plaats} succesvol toegevoegd!`,
      slug: locationData.slug
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
