import type { APIRoute } from 'astro';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';

const execAsync = promisify(exec);

export const POST: APIRoute = async ({ request }) => {
  try {
    const { client, switches } = await request.json();

    if (client === 'autokampeerder') {
      const repoDir = path.resolve('C:/Users/hzuid/OneDrive - BitbloX/BitbloX/WebDesign/Sites/DeAutokampeerder');
      const configPath = path.join(repoDir, 'public/site-config.json');

      const configData = {
        site: "De Autokampeerder",
        domain: "deautokampeerder.nl",
        modules: switches
      };

      const fs = await import('fs/promises');
      await fs.writeFile(configPath, JSON.stringify(configData, null, 2), 'utf-8');

      // Git commit and push to GitHub so Cloudflare Pages deploys in 15s
      await execAsync('git add . && git commit -m "Update schuifjes via BitbloX Admin Dashboard" && git push origin main', { cwd: repoDir });

      return new Response(JSON.stringify({ success: true, message: 'Schuifjes gepusht naar Cloudflare Pages!' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ success: true, message: 'Schuifjes lokaal bijgewerkt.' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    console.error('Error saving switches:', error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
