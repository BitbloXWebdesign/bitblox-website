import type { APIRoute } from 'astro';
import staticReviews from '../../data/reviews.json';

export const GET: APIRoute = async () => {
  const GOOGLE_PLACE_ID = "ChIJiQDR4JQ1yEcRKVfrKKlPajc"; // BitbloX Place ID from CID 0x37ab4f8928e27729
  const GOOGLE_API_KEY = import.meta.env.GOOGLE_PLACES_API_KEY;

  if (GOOGLE_API_KEY) {
    try {
      const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${GOOGLE_PLACE_ID}&fields=reviews,rating,user_ratings_total&key=${GOOGLE_API_KEY}&language=nl`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.result && data.result.reviews) {
        const fetchedReviews = data.result.reviews.map((r: any, idx: number) => ({
          id: idx + 1,
          name: r.author_name,
          location: "Google Review",
          rating: r.rating,
          text: r.text,
          initials: r.author_name ? r.author_name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase() : 'G',
          date: r.relative_time_description || 'Google Beoordeling'
        }));

        return new Response(JSON.stringify({
          rating: data.result.rating || 5.0,
          total: data.result.user_ratings_total || fetchedReviews.length,
          reviews: fetchedReviews
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    } catch (err) {
      console.error("Google Places API error, falling back to static cache:", err);
    }
  }

  // Fallback to static cache
  return new Response(JSON.stringify({
    rating: 5.0,
    total: staticReviews.length,
    reviews: staticReviews
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};
