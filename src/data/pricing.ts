export interface PricingPackage {
  id: string;
  name: string;
  subtitle: string;
  amount: number | string;
  unit?: string;
  featured?: boolean;
  roi?: string;
  features: string[];
}

export const pricing = {
  webdesign: [
    {
      id: "brons",
      name: "Brons",
      subtitle: "Geschikt voor een strakke 1-page landingpage",
      amount: 100,
      unit: "eenmalig",
      roi: "1 extra klus en de investering is direct terugverdiend",
      features: [
        "1 Converterende pagina (One-Pager)",
        "Zeer snelle laadtijd via Cloudflare Edge",
        "1x Duidelijke Call-to-Action knop",
        "100% Mobiel- en tablet-geoptimaliseerd",
        "Direct contact- en offerteformulier",
        "SSL-beveiligingscertificaat inbegrepen"
      ]
    },
    {
      id: "zilver",
      name: "Zilver",
      subtitle: "Geschikt voor een compacte bedrijfswebsite",
      amount: 250,
      unit: "eenmalig",
      roi: "2 tot 3 klanten per jaar en u maakt pure winst",
      features: [
        "Tot 3 pagina's (Home, Diensten, Contact)",
        "Routemap & Google Maps integratie",
        "WhatsApp directe klantcontact knop",
        "Mobiel en tablet geoptimaliseerd",
        "Basis zoekmachine optimalisatie (SEO)",
        "SSL & Veilige formulierkoppeling"
      ]
    },
    {
      id: "goud",
      name: "Goud",
      featured: true,
      subtitle: "Meest gekozen pakket voor ZZP & MKB",
      amount: 450,
      unit: "eenmalig",
      roi: "Binnen 1 tot 2 maanden volledig terugverdiend",
      features: [
        "Tot 5 complete pagina's op maat",
        "Inclusief Blog / Kennisbank module",
        "Veelgestelde Vragen (FAQ) accordions",
        "Google Reviews & ervaringen showcase",
        "WhatsApp interactieve contactknop",
        "SEO-fundament & basis AI-vindbaarheid (GEO)"
      ]
    },
    {
      id: "platina",
      name: "Platina",
      subtitle: "Voor bedrijven die de regionale markt willen domineren",
      amount: "650+",
      unit: "eenmalig",
      roi: "Gebouwd voor maximale lokale dominantie en omzet",
      features: [
        "7+ Pagina's of meerdere diensten",
        "Inclusief 2 extra steden (Regionale Microsites)",
        "Uitgebreid maatwerk & iconen",
        "Volledige Blog & Kennisbank integratie",
        "Schema.org LocalBusiness zoekmachine data",
        "AI-kennisbestand (llms.txt) voor ChatGPT ingericht"
      ]
    }
  ] as PricingPackage[],

  hosting: [
    {
      id: "basis-hosting",
      name: "Basis Hosting & Domein",
      subtitle: "Betrouwbare en snelle online fundering",
      amount: 149,
      unit: "per jaar (slechts €12,40 p/m)",
      features: [
        "Zeer snelle Cloudflare Edge hosting (onder 0,2s)",
        "Jaarlijkse .NL domeinnaam registratie & DNS-beheer",
        "Tot 3 zakelijke e-mailaccounts (5 GB opslag)",
        "Automatisch SSL-beveiligingscertificaat (HTTPS)",
        "Dagelijkse automatische cloud-backups",
        "Basis contact- en offerteformulier"
      ]
    },
    {
      id: "zorgeloos-beheer",
      name: "Zorgeloos Beveiliging & Conversie",
      featured: true,
      subtitle: "Volledig ontzorgd, beveiligd en voorzien van actieve lead-functies",
      amount: 245,
      unit: "per jaar (slechts €20,40 p/m)",
      roi: "De favoriete keuze voor 80% van onze klanten",
      features: [
        "Alles uit Basis Hosting & Domein",
        "24/7 Watchdog actieve uptime- & storingsbewaking",
        "Enterprise Web Application Firewall & Cyberbeveiliging",
        "Bel-Me-Terug interactieve widget met WhatsApp-notificatie",
        "WhatsApp directe chatfunctionaliteit op mobiel & desktop",
        "Slimme mededelingen- en topbanner voor acties",
        "Toegankelijkheidstoolbar (tekstvergroting & hoog contrast)",
        "Inbegrepen support bij tekst- of fotowijzigingen (30 min/kwartaal)"
      ]
    }
  ] as PricingPackage[],

  seo: [
    {
      id: "halfjaarlijks",
      name: "Halfjaarlijks Onderhoud",
      subtitle: "Laagdrempelige periodieke check voor ZZP'ers",
      amount: 150,
      unit: "per jaar (2x per jaar check-up)",
      features: [
        "2x per jaar technische zoekmachine- & snelheidsscan",
        "Google Search Console indexering & XML-sitemap controle",
        "Bijwerken van zoektermen, openingstijden of teksten",
        "Tot 15 minuten persoonlijke ondersteuning per beurt"
      ]
    },
    {
      id: "kwartaal",
      name: "Kwartaal Onderhoud",
      featured: true,
      subtitle: "De ideale balans voor actieve ondernemers",
      amount: 275,
      unit: "per jaar (4x per jaar onderhoud)",
      roi: "Houdt uw website elk seizoen scherp en up-to-date",
      features: [
        "4x per jaar complete zoekmachine- en prestatie-audit",
        "Seizoensgebonden zoekwoorden & pagina-inhoud bijsturen",
        "AI-kennisindex (llms.txt) actualiseren voor ChatGPT",
        "Tot 30 minuten persoonlijke ondersteuning per beurt"
      ]
    },
    {
      id: "maandelijks",
      name: "Maandelijks Actief Beheer",
      subtitle: "Volledige ontzorging, continue topposities & uw eigen vaste webmaster",
      amount: 600,
      unit: "per jaar (€50,- per maand)",
      roi: "Maximale lokale zichtbaarheid & continue voorsprong op concurrenten",
      features: [
        "Inclusief álles uit Kwartaal Onderhoud",
        "Elk kwartaal 1 nieuw SEO/AI-artikel gepubliceerd",
        "Continue ChatGPT & AI-Vindbaarheid (GEO)",
        "Directe WhatsApp hulplijn & persoonlijk contact",
        "Tot 30 minuten persoonlijke support per maand",
        "Zeer hoge Google Core Web Vitals scores & laadsnelheid"
      ]
    }
  ] as PricingPackage[],

  addons: [
    {
      id: "microsite",
      name: "Extra Stedenpagina (Microsite)",
      subtitle: "Bereik klanten in omliggende steden en dorpen",
      amount: 85,
      unit: "eenmalig (of 3 voor €195,-)",
      features: [
        "Gerichte landingspagina per stad (bijv. Webdesign Haren)",
        "Unieke lokale zoekwoorden & teksten",
        "Lokale Schema.org LocalBusiness data voor Google",
        "Geen extra hostingkosten (binnen bestaand pakket)"
      ]
    },
    {
      id: "blog-module",
      name: "Blog / Kennisbank Module",
      subtitle: "Deel nieuws, advies en versterk uw SEO-autoriteit",
      amount: 95,
      unit: "eenmalig (Inbegrepen bij Goud & Platina)",
      features: [
        "Complete blog-overzichtspagina met categorieën",
        "Mooie artikel-layout met 'Korte samenvatting' capsule",
        "Automatische zoekmachine-schema's (BlogPosting)",
        "Volledig mobielvriendelijk en snel"
      ]
    },
    {
      id: "blog-artikel",
      name: "SEO / GEO Blogartikel Schrijven",
      subtitle: "Kant-en-klaar geoptimaliseerd artikel door BitbloX",
      amount: 55,
      unit: "per artikel",
      features: [
        "Professioneel artikel (400 - 600 woorden) over uw vakgebied",
        "Geoptimaliseerd voor Google en ChatGPT AI-zoekmachines",
        "Inclusief passende afbeelding, tussenkopjes en interne links",
        "Direct gepubliceerd op uw website"
      ]
    }
  ] as PricingPackage[]
};
