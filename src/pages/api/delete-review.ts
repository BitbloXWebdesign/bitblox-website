import type { APIRoute } from 'astro';
import fs from 'node:fs';
import path from 'node:path';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { name } = body;

    if (!name) {
      return new Response(JSON.stringify({ error: "Naam is verplicht." }), { status: 400 });
    }

    const reviewsFilePath = path.resolve(process.cwd(), 'src/data/reviews.json');

    if (fs.existsSync(reviewsFilePath)) {
      const fileRaw = fs.readFileSync(reviewsFilePath, 'utf-8');
      let reviewsList: Array<any> = JSON.parse(fileRaw);
      
      reviewsList = reviewsList.filter(r => r.name.toLowerCase() !== name.toLowerCase());
      fs.writeFileSync(reviewsFilePath, JSON.stringify(reviewsList, null, 2), 'utf-8');
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: `Review van ${name} succesvol verwijderd!`
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
