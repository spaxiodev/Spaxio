import type { Metadata } from "next";
import "./globals.css";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import CookieConsent from "@/components/CookieConsent";

const display = Playfair_Display({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--font-display" });
const sans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-sans" });

const SITE_URL = "https://polidori.dev";
const SITE_NAME = "Polidori Dev";
const SITE_TAGLINE = "Web Design & Development Agency Montreal";
const SITE_DESCRIPTION =
  "Montreal web design & development agency. Custom websites, motion design, hosting, e-commerce, landing pages, SEO and redesigns at honest prices. Get a free quote — 514-516-0515.";
const SITE_DESCRIPTION_SHORT =
  "Custom websites, motion design, hosting, e-commerce, landing pages, SEO and redesigns by an independent Montreal agency.";
const PHONE = "+1-514-516-0515";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_TAGLINE} | ${SITE_NAME}`,
    template: `%s | ${SITE_NAME}`
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "web design Montreal",
    "web development Montreal",
    "web agency Montreal",
    "web hosting Montreal",
    "motion design Montreal",
    "e-commerce Montreal",
    "landing pages Montreal",
    "SEO Montreal",
    "website redesign Montreal",
    "Polidori Dev",
    "Stefano Polidori",
    "Next.js developer Montreal",
    "freelance web developer Montreal",
    "Quebec web agency"
  ],
  authors: [{ name: "Stefano Polidori", url: SITE_URL }],
  creator: "Stefano Polidori",
  publisher: SITE_NAME,
  category: "Web design",
  applicationName: SITE_NAME,
  alternates: {
    canonical: SITE_URL,
    languages: {
      "en-CA": SITE_URL,
      "fr-CA": `${SITE_URL}/?lang=fr`
    }
  },
  other: {
    "geo.region": "CA-QC",
    "geo.placename": "Montreal",
    "geo.position": "45.5017;-73.5673",
    ICBM: "45.5017, -73.5673"
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_CA",
    alternateLocale: ["fr_CA"],
    title: `${SITE_TAGLINE} | ${SITE_NAME}`,
    description: SITE_DESCRIPTION_SHORT,
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — Montreal web design and development agency`
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_TAGLINE} | ${SITE_NAME}`,
    description: SITE_DESCRIPTION_SHORT,
    images: ["/logo.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1
    }
  },
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    shortcut: "/favicon.png",
    apple: "/favicon.png"
  },
  referrer: "origin-when-cross-origin",
  formatDetection: { email: false, address: false, telephone: false }
};

const ADDRESS = {
  "@type": "PostalAddress",
  addressLocality: "Montreal",
  addressRegion: "QC",
  addressCountry: "CA"
};

const AREA_SERVED = [
  { "@type": "City", name: "Montreal" },
  { "@type": "AdministrativeArea", name: "Quebec" },
  { "@type": "Country", name: "Canada" }
];

const SERVICES = [
  { name: "Web Design", description: "Custom website design tailored to your brand and audience." },
  { name: "Web Development", description: "Hand-coded Next.js and React websites with clean architecture." },
  { name: "Motion Design", description: "Motion graphics, animated interfaces and launch visuals for websites and campaigns." },
  { name: "Web Hosting", description: "Managed hosting on Vercel with SSL, global CDN and uptime monitoring." },
  { name: "E-commerce Websites", description: "Custom online stores with secure checkout, payments and inventory." },
  { name: "Landing Pages", description: "High-converting single-page sites for campaigns and product launches." },
  { name: "Search Engine Optimization (SEO)", description: "Technical SEO, structured data and on-page optimization for Google rankings." },
  { name: "Website Redesign", description: "Modernization of legacy websites with improved performance, SEO and UX." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      founder: { "@type": "Person", name: "Stefano Polidori" },
      email: "contact@polidori.dev",
      telephone: PHONE,
      address: ADDRESS,
      areaServed: AREA_SERVED,
      sameAs: []
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      publisher: { "@id": `${SITE_URL}#organization` },
      inLanguage: ["en-CA", "fr-CA"]
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}#service`,
      name: SITE_NAME,
      alternateName: "Polidori Dev Web Agency",
      description: SITE_DESCRIPTION,
      url: SITE_URL,
      image: `${SITE_URL}/logo.png`,
      logo: `${SITE_URL}/logo.png`,
      telephone: PHONE,
      email: "contact@polidori.dev",
      priceRange: "$$",
      currenciesAccepted: "CAD",
      paymentAccepted: "Credit Card, Bank Transfer, E-transfer",
      address: ADDRESS,
      geo: { "@type": "GeoCoordinates", latitude: 45.5017, longitude: -73.5673 },
      areaServed: AREA_SERVED,
      serviceArea: {
        "@type": "GeoCircle",
        geoMidpoint: { "@type": "GeoCoordinates", latitude: 45.5017, longitude: -73.5673 },
        geoRadius: "150000"
      },
      provider: { "@id": `${SITE_URL}#organization` },
      knowsAbout: [
        "Web Design",
        "Web Development",
        "Motion Design",
        "Web Hosting",
        "E-commerce",
        "Landing Pages",
        "Search Engine Optimization",
        "Website Redesign",
        "Next.js",
        "React",
        "TypeScript"
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Web Services",
        itemListElement: SERVICES.map((s) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: s.name,
            description: s.description,
            areaServed: { "@type": "City", name: "Montreal" }
          }
        }))
      }
    }
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${sans.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
