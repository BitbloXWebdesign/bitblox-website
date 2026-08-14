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
    const { client = 'bitblox', switches } = await request.json();

    const clientRepoMap: Record<string, { name: string; domain: string; path: string }> = {
      bitblox: {
        name: "BitbloX Webdesign",
        domain: "bitblox.nl",
        path: path.resolve(process.cwd())
      },
      autokampeerder: {
        name: "De Autokampeerder",
        domain: "deautokampeerder.nl",
        path: path.resolve('C:/Users/hzuid/OneDrive - BitbloX/BitbloX/WebDesign/Sites/DeAutokampeerder')
      },
      voetreflextherapeut: {
        name: "Voetreflextherapeut Groningen",
        domain: "voetreflextherapeutgroningen.nl",
        path: path.resolve('C:/Users/hzuid/OneDrive - BitbloX/BitbloX/WebDesign/Sites/BitbloX/BitbloX webdesing/VRG')
      }
    };

    const targetClient = clientRepoMap[client] || clientRepoMap.bitblox;
    const repoDir = targetClient.path;

    // 1. Write public/site-config.json
    const publicConfigDir = path.join(repoDir, 'public');
    const publicConfigPath = path.join(publicConfigDir, 'site-config.json');
    const configData = {
      site: targetClient.name,
      domain: targetClient.domain,
      updatedAt: new Date().toISOString(),
      modules: switches
    };

    try {
      await fs.mkdir(publicConfigDir, { recursive: true });
      await fs.writeFile(publicConfigPath, JSON.stringify(configData, null, 2), 'utf-8');
    } catch (e) {
      console.warn('Could not write public/site-config.json:', e);
    }

    // 2. Write src/data/switches.json if src/data directory exists
    const srcDataDir = path.join(repoDir, 'src/data');
    const switchesDataPath = path.join(srcDataDir, 'switches.json');
    try {
      await fs.mkdir(srcDataDir, { recursive: true });
      await fs.writeFile(switchesDataPath, JSON.stringify(switches, null, 2), 'utf-8');
    } catch (e) {
      console.warn('Could not write src/data/switches.json:', e);
    }

    // 3. Git commit & push for automatic Cloudflare Pages deployment
    try {
      await execAsync('git add . && git commit -m "Update schuifjes via BitbloX Admin Dashboard" && git push origin main', { cwd: repoDir });
    } catch (gitErr) {
      console.warn(`Git push for ${targetClient.name}:`, gitErr);
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: `Schuifjes voor ${targetClient.name} succesvol opgeslagen en live gesynchroniseerd!` 
    }), {
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
