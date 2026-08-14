import type { APIRoute } from 'astro';
import fs from 'node:fs';
import path from 'node:path';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { filename, id } = body;

    const targetSlug = filename || id;

    if (!targetSlug) {
      return new Response(JSON.stringify({ error: "Bestandsnaam of ID is verplicht." }), { status: 400 });
    }

    const cleanFilename = targetSlug.endsWith('.md') ? targetSlug : `${targetSlug}.md`;
    const blogFilePath = path.resolve(process.cwd(), 'src/content/blog', cleanFilename);

    if (fs.existsSync(blogFilePath)) {
      fs.unlinkSync(blogFilePath);
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: `Blog ${cleanFilename} succesvol verwijderd!`
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
