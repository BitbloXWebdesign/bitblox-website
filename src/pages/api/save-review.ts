import type { APIRoute } from 'astro';
import fs from 'node:fs';
import path from 'node:path';

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify({ message: "Save Review API is actief." }), { status: 200 });
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { name, location, text, rating, date } = body;

    if (!name || !text) {
      return new Response(JSON.stringify({ error: "Naam en tekst zijn verplicht." }), { status: 400 });
    }

    const reviewsFilePath = path.resolve(process.cwd(), 'src/data/reviews.json');
    let reviewsList: any[] = [];

    if (fs.existsSync(reviewsFilePath)) {
      const fileRaw = fs.readFileSync(reviewsFilePath, 'utf-8');
      reviewsList = JSON.parse(fileRaw);
    }

    const initials = name
      .split(' ')
      .filter((n: string) => n.length > 0)
      .map((n: string) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();

    const newReview = {
      id: reviewsList.length + 1,
      name: name,
      location: location || "Google Review",
      rating: Number(rating) || 5,
      text: text,
      initials: initials || "G",
      date: date || "Google Beoordeling"
    };

    reviewsList.push(newReview);

    fs.writeFileSync(reviewsFilePath, JSON.stringify(reviewsList, null, 2), 'utf-8');

    return new Response(JSON.stringify({ 
      success: true, 
      message: `Review van ${name} succesvol toegevoegd!`,
      total: reviewsList.length
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
