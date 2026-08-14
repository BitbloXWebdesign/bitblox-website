import type { APIRoute } from 'astro';
import fs from 'node:fs';
import path from 'node:path';

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify({ message: "Save Blog API is actief." }), { status: 200 });
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { filename, fileContent, client = 'bitblox' } = body;

    if (!filename || !fileContent) {
      return new Response(JSON.stringify({ error: "Bestandsnaam en inhoud zijn verplicht." }), { status: 400 });
    }

    const cleanFilename = filename.toLowerCase().replace(/[^a-z0-9\.-]+/g, '');
    let blogDir = path.resolve(process.cwd(), 'src/content/blog');

    if (client === 'autokampeerder') {
      blogDir = path.resolve('C:/Users/hzuid/OneDrive - BitbloX/BitbloX/WebDesign/Sites/DeAutokampeerder/src/content/kennisbank');
    }

    if (!fs.existsSync(blogDir)) {
      fs.mkdirSync(blogDir, { recursive: true });
    }

    const filePath = path.join(blogDir, cleanFilename);
    fs.writeFileSync(filePath, fileContent, 'utf-8');

    return new Response(JSON.stringify({ 
      success: true, 
      message: `Blog artikel succesvol opgeslagen in ${client === 'autokampeerder' ? 'De Autokampeerder Kennisbank' : 'BitbloX Blog'} als ${cleanFilename}!`,
      slug: cleanFilename.replace('.md', '')
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
