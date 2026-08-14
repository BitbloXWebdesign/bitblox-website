import type { APIRoute } from 'astro';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs/promises';

const execAsync = promisify(exec);

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify({ message: "Save Switches API is actief." }), { status: 200 });
};

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

      await fs.writeFile(configPath, JSON.stringify(configData, null, 2), 'utf-8');

      // Git commit and push to GitHub so Cloudflare Pages deploys in 15s
      try {
        await execAsync('git add . && git commit -m "Update schuifjes via BitbloX Admin Dashboard" && git push origin main', { cwd: repoDir });
      } catch (gitErr) {
        console.warn('Git push for DeAutokampeerder:', gitErr);
      }

      return new Response(JSON.stringify({ success: true, message: 'Schuifjes voor De Autokampeerder opgeslagen en live gepusht!' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Default: BitbloX Webdesign
    const bitbloxDir = path.resolve(process.cwd());
    const switchesDataPath = path.join(bitbloxDir, 'src/data/switches.json');
    const publicConfigPath = path.join(bitbloxDir, 'public/site-config.json');

    await fs.writeFile(switchesDataPath, JSON.stringify(switches, null, 2), 'utf-8');
    await fs.writeFile(publicConfigPath, JSON.stringify({ site: "BitbloX", modules: switches }, null, 2), 'utf-8');

    try {
      await execAsync('git add src/data/switches.json public/site-config.json && git commit -m "Update schuifjes via BitbloX Admin Dashboard" && git push origin main', { cwd: bitbloxDir });
    } catch (gitErr) {
      console.warn('Git push for BitbloX:', gitErr);
    }

    return new Response(JSON.stringify({ success: true, message: 'Schuifjes voor BitbloX succesvol opgeslagen en live gepusht!' }), {
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
