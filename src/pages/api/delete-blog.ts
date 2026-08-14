import type { APIRoute } from 'astro';
import fs from 'node:fs';
import path from 'node:path';
import { exec } from 'node:child_process';
import { promisify } from 'node:util';

const execAsync = promisify(exec);

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { filename, id, client } = body;

    const targetSlug = filename || id;

    if (!targetSlug) {
      return new Response(JSON.stringify({ error: "Bestandsnaam of ID is verplicht." }), { status: 400 });
    }

    const cleanFilename = targetSlug.endsWith('.md') ? targetSlug : `${targetSlug}.md`;
    let blogFilePath = path.resolve(process.cwd(), 'src/content/blog', cleanFilename);
    let isExternalRepo = false;
    let repoPath = '';

    if (client === 'autokampeerder') {
      repoPath = `c:\\Users\\hzuid\\OneDrive - BitbloX\\BitbloX\\WebDesign\\Sites\\DeAutokampeerder`;
      blogFilePath = path.resolve(repoPath, 'src/content/kennisbank', cleanFilename);
      isExternalRepo = true;
    }

    if (fs.existsSync(blogFilePath)) {
      fs.unlinkSync(blogFilePath);
    }

    if (isExternalRepo && fs.existsSync(repoPath)) {
      try {
        await execAsync(`git add . && git commit -m "Delete blog ${cleanFilename} via BitbloX Admin" && git push origin main`, {
          cwd: repoPath
        });
      } catch (gitErr) {
        console.log('Git delete push error:', gitErr);
      }
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
