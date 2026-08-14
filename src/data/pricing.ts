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
      subtitle: "Geschikt voor een landingpage",
      amount: 100,
      unit: "eenmalig",
      roi: "1 extra klus en dit is terugverdiend",
      features: [
        "1 pagina",
        "Maillink",
        "SSL-certificaat",
        "1× call-to-action",
        "Contactgedeelte"
      ]
    },
    {
      id: "zilver",
      name: "Zilver",
      subtitle: "Geschikt voor een kleine website",
      amount: 250,
      unit: "eenmalig",
      roi: "2–3 extra klanten per jaar en dit is terugverdiend",
      features: [
        "3 pagina's",
        "Maillink & SSL-certificaat",
        "1× call-to-action",
        "Contactgedeelte",
        "Routemap",
        "Licht maatwerk"
      ]
    },
    {
      id: "goud",
      name: "Goud",
      featured: true,
      subtitle: "Geschikt voor middelgrote websites",
      amount: 450,
      unit: "eenmalig",
      roi: "1 extra klant per maand en binnen 2 maanden terugverdiend",
      features: [
        "5 pagina's",
        "Maillink & SSL-certificaat",
        "1× call-to-action",
        "Contactgedeelte & Routemap",
        "Beperkt maatwerk",
        "1 social media integratie",
        "Prijslijst & Contactformulier"
      ]
    },
    {
      id: "platina",
      name: "Platina",
      subtitle: "Grote websites of webshops",
      amount: "650+",
      unit: "eenmalig",
      roi: "Gebouwd voor omzet — elke verkoop is winst",
      features: [
        "7+ pagina's",
        "Maillink & SSL-certificaat",
        "5× call-to-action",
        "Routemap & Maatwerk",
        "3 social media integraties",
        "Webshop & Blog integratie"
      ]
    }
  ] as PricingPackage[],

  geo: [
    {
      id: "geo-basis",
      name: "GEO-basis",
      subtitle: "De fundamenten voor AI-vindbaarheid",
      amount: 250,
      unit: "eenmalig",
      roi: "1 extra klant via AI-zoeken en dit is terugverdiend",
      features: [
        "Structured data (schema's) op orde",
        "Citeerbare antwoordblokken",
        "llms.txt + AI-crawler-toegang",
        "Strakke GEO-optimalisatie & structuur"
      ]
    },
    {
      id: "geo-compleet",
      name: "GEO-compleet",
      featured: true,
      subtitle: "Volledige optimalisatie voor AI-zoekmachines",
      amount: 450,
      unit: "eenmalig",
      roi: "Maximale AI-zichtbaarheid voor uw onderneming",
      features: [
        "Alles uit GEO-basis",
        "FAQ-content op maat geschreven",
        "Entiteits-consistentie (KVK, GBP, socials)",
        "Uitgebreide AI-antwoordstructuur"
      ]
    }
  ] as PricingPackage[],

  hosting: [
    {
      id: "basis",
      name: "Basis Hosting",
      subtitle: "Ideale start voor uw website",
      amount: 72,
      unit: "per jaar",
      features: [
        "SSL-certificaat inbegrepen",
        "Supersnelle Cloudflare CDN hosting",
        "3 e-mailaccounts",
        "5 GB opslag"
      ]
    },
    {
      id: "extra",
      name: "Extra Hosting",
      subtitle: "Voor websites die meer nodig hebben",
      amount: 120,
      unit: "per jaar",
      features: [
        "SSL-certificaat inbegrepen",
        "Supersnelle Cloudflare CDN hosting",
        "10 e-mailaccounts",
        "15 GB opslag"
      ]
    }
  ] as PricingPackage[],

  extra: [
    {
      id: "update-service",
      name: "Update service",
      subtitle: "Uw website blijft up-to-date",
      amount: 40,
      unit: "per jaar",
      features: [
        "SSL-certificaat",
        "PHP- & beveiligings-updates",
        "5 GB opslag"
      ]
    },
    {
      id: "beveiliging",
      name: "Beveiligingspakket",
      subtitle: "Veilig online, zorgeloos ondernemen",
      amount: "5,99",
      unit: "per maand",
      features: [
        "SSL-certificaat",
        "Firewall & DDoS-bescherming",
        "Malware- & virusscans",
        "Snel herstel bij aanvallen"
      ]
    },
    {
      id: "seo-maand",
      name: "SEO Op Maat",
      subtitle: "Continue groei in zoekresultaten",
      amount: 50,
      unit: "per maand",
      features: [
        "SEO-tekstoptimalisatie & zoekwoorden",
        "Alt-teksten voor alle afbeeldingen",
        "Techniek, content & autoriteit",
        "Maandelijkse rapportage"
      ]
    },
    {
      id: "microsites-pakket",
      name: "Steden-Microsites Pakket",
      subtitle: "Regio-dominantie in omliggende dorpen",
      amount: 125,
      unit: "eenmalig (5 steden)",
      roi: "Trek klanten uit de hele regio naar uw praktijk",
      features: [
        "5 unieke regio-landingspagina's op maat",
        "Lokale SEO & zoekwoorden per plaats",
        "Geïntegreerd in BitbloX Dashboard",
        "Losse extra steden uit te breiden voor € 25/stad"
      ]
    },
    {
      id: "blog-kennisbank",
      name: "Kennisbank & Blog Module",
      subtitle: "Autoriteit in uw vakgebied",
      amount: 95,
      unit: "eenmalig",
      roi: "Inclusief 3 geschreven artikelen door BitbloX",
      features: [
        "Inrichting van de Kennisbank module op uw site",
        "Inclusief 3 complete geschreven SEO-artikelen",
        "U mag onderwerpen aandragen, wij schrijven ze uit",
        "Losse extra artikelen uit te breiden voor € 25/blog"
      ]
    },
    {
      id: "logo-design",
      name: "Logo & Huisstijl",
      subtitle: "Het gezicht van uw merk",
      amount: 150,
      unit: "eenmalig",
      features: [
        "Uniek logo-ontwerp op maat",
        "Afgestemd op uw branche & kleuren",
        "PNG-bestanden in hoge resolutie"
      ]
    }
  ] as PricingPackage[]
};
