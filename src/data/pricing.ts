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
        "Directe bel- en e-mailkoppelingen",
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
        "Schema.org gestructureerde data",
        "SEO-fundament & basis AI-vindbaarheid (GEO)"
      ]
    },
    {
      id: "platina",
      name: "Platina",
      subtitle: "Voor uitgebreide maatwerk websites, webshops & regionale dominantie",
      amount: "650+",
      unit: "eenmalig",
      roi: "Gebouwd voor maximale online verkoop en regionale dominantie",
      features: [
        "7+ Pagina's of complete E-Commerce Webshop",
        "Inclusief 2 extra steden (Microsites) óf Productshop",
        "iDEAL & Bancontact veilige online checkout",
        "Volledige Blog & Kennisbank integratie",
        "Schema.org LocalBusiness & Product structured data",
        "AI-kennisbestand (llms.txt) voor ChatGPT & Perplexity"
      ]
    }
  ] as PricingPackage[],

  hosting: [
    {
      id: "basis-hosting",
      name: "Basis Hosting & Domein",
      subtitle: "De betrouwbare en snelle technische fundering",
      amount: "12,40",
      unit: "per maand",
      roi: "Volledige ontzorging van domeinnaam, cloud hosting en zakelijke e-mail",
      features: [
        "Supersnelle cloud hosting",
        "Jaarlijkse .NL domeinnaam & DNS-beheer",
        "Tot 3 zakelijke e-mailaccounts (bijv. info@)",
        "3 GB cloud-opslag",
        "Automatisch SSL-beveiligingscertificaat",
        "Dagelijkse automatische cloud-backups",
        "Support via e-mail (wijzigingen op uurtarief)"
      ]
    },
    {
      id: "zorgeloos-beheer",
      name: "Zorgeloos Bewaakt",
      featured: true,
      subtitle: "Inclusief wijzigingsservice, korte lijnen & 24/7 bewaking",
      amount: "17,50",
      unit: "per maand",
      roi: "De favoriete keuze voor 85% van onze klanten (slechts € 5,10 p/m extra)",
      features: [
        "Inclusief álles uit Basis Hosting & Domein",
        "Inclusief Kleine Wijzigingen Service",
        "Korte lijnen via WhatsApp & e-mail",
        "Tot 5 zakelijke e-mailaccounts (bijv. info@)",
        "10 GB royale cloud-opslag",
        "Vakantie- & actiemeldingen instelservice",
        "Foto- en beeldoptimalisatie bij aanlevering",
        "24/7 Website Watchdog actieve storingsbewaking",
        "Beveiligd cloud-archief met versiehistorie",
        "Geen onverwachte facturen voor klein beheer"
      ]
    }
  ] as PricingPackage[],

  conversion: {
    id: "conversie-suite",
    name: "Conversie & Interactie Suite",
    subtitle: "Maakt van uw website een actieve klantenmagneet voor meer aanvragen en leads",
    amount: "9,95",
    unit: "per maand",
    featured: true,
    roi: "1 extra afspraak of klant via WhatsApp en het pakket is direct terugverdiend",
    features: [
      "WhatsApp directe floating chat knop (mobiel & desktop)",
      "Bel-Me-Terug interactieve quick widget (leads buiten kantoortijd)",
      "Google Reviews carrousel met 1-klik klantbeheer",
      "Slimme mededelingen- & actiebalk bovenaan (Top-Bar)",
      "Interactief contact- & offerteformulier (zonder irritante captcha's)",
      "Interactieve Google Maps & directe routeplanner-koppeling",
      "Veelgestelde vragen (FAQ) interactieve accordions",
      "Toegankelijkheid & Dyslexie A11y toolbar (inclusief & compliant)",
      "Slimme AVG-cookiebanner & privacymelding (AVG-proof)"
    ]
  } as PricingPackage,

  seo: [
    {
      id: "halfjaarlijks",
      name: "Halfjaarlijks Onderhoud",
      subtitle: "Laagdrempelige periodieke check voor ZZP'ers",
      amount: 150,
      unit: "per jaar",
      roi: "2x per jaar technische check-up & Google scan (slechts €75,- per ronde)",
      features: [
        "2x per jaar technische zoekmachine- & snelheidsscan",
        "Google Search Console indexering & XML-sitemap controle",
        "Bijwerken van zoektermen, openingstijden of teksten",
        "Tot 15 minuten persoonlijke support per onderhoudsronde"
      ]
    },
    {
      id: "kwartaal",
      name: "Kwartaal Onderhoud",
      featured: true,
      subtitle: "De ideale balans voor actieve ondernemers",
      amount: 275,
      unit: "per jaar",
      roi: "4x per jaar seizoens-update & ChatGPT index (slechts €68,75 per kwartaal)",
      features: [
        "4x per jaar complete zoekmachine- en prestatie-audit",
        "Seizoensgebonden zoekwoorden & pagina-inhoud bijsturen",
        "AI-kennisindex (llms.txt) actualiseren voor ChatGPT",
        "Tot 30 minuten persoonlijke support per kwartaal"
      ]
    },
    {
      id: "maandelijks",
      name: "Maandelijks Actief Beheer",
      subtitle: "Volledige ontzorging, continue topposities & uw eigen vaste webmaster",
      amount: 600,
      unit: "per jaar",
      roi: "Elke maand actieve bewaking & artikelen (of € 50,- per maand)",
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
      amount: 45,
      unit: "eenmalig (3 voor € 95,- • 5 voor € 150,-)",
      features: [
        "Gerichte landingspagina per stad of dorp (bijv. Webdesign Haren)",
        "Unieke lokale zoekwoorden, H1's & teksten",
        "Lokale Schema.org LocalBusiness data voor Google",
        "Bundelvoordeel: 1 stad € 45,- • 3 steden € 95,- • 5 steden € 150,-",
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
    },
    {
      id: "email-storage",
      name: "Extra E-mail & Opslag Booster",
      subtitle: "Flexibel uitbreiden bij zware bijlagen en archief",
      amount: "2,95",
      unit: "per maand (+5 GB • of +10 GB voor € 4,95 p/m)",
      features: [
        "Direct extra opslagruimte voor al uw zakelijke e-mailadressen",
        "Ruimte voor zware PDF-offertes, facturen en foto-bijlagen",
        "Flexibele keuze: +5 GB (€ 2,95 p/m) of +10 GB (€ 4,95 p/m)",
        "Of kies Zorgeloos Bewaakt (10 GB opslag + all-in beheer)",
        "Direct geactiveerd zonder e-mailonderbreking"
      ]
    }
  ] as PricingPackage[]
};
