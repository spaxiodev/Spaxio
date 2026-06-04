import type { Metadata } from "next";
import "./globals.css";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import CookieConsent from "@/components/CookieConsent";

const display = Playfair_Display({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--font-display" });
const sans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-sans" });

const SITE_URL = "https://polidori.dev";
const SITE_NAME = "Polidori Dev";
const SITE_TAGLINE = "Web Design & Development Agency";
const SITE_DESCRIPTION =
  "Web design and development agency offering professional custom websites for $1000 CAD, managed hosting for $150/month, SEO, analytics and launch support.";
const SITE_DESCRIPTION_SHORT =
  "Professional custom websites, website development, managed hosting, SEO, analytics and launch support by an independent web agency.";
const PHONE = "+1-514-516-0515";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_TAGLINE} | ${SITE_NAME}`,
    template: `%s | ${SITE_NAME}`
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "web design",
    "website design",
    "custom website design",
    "web development",
    "website development",
    "web agency",
    "web hosting",
    "website hosting",
    "professional website",
    "business website",
    "small business website",
    "SEO",
    "local SEO",
    "managed website hosting",
    "website redesign",
    "Polidori Dev",
    "Stefano Polidori",
    "Next.js developer",
    "freelance web developer"
  ],
  authors: [{ name: "Stefano Polidori", url: SITE_URL }],
  creator: "Stefano Polidori",
  publisher: SITE_NAME,
  category: "Web design",
  applicationName: SITE_NAME,
  alternates: {
    canonical: SITE_URL
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
        alt: `${SITE_NAME} - web design and development agency`
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
  addressCountry: "CA"
};

const AREA_SERVED = [{ "@type": "Country", name: "Canada" }];

const SERVICES = [
  {
    name: "Website Design",
    description: "Custom business website design with Zoom discovery, full custom design, 3 revision rounds, responsive layouts, SEO and launch support.",
    url: `${SITE_URL}/website-design`,
    price: "1000"
  },
  {
    name: "Website Development",
    description: "Responsive website development with technical SEO, contact flows, analytics setup and launch support.",
    url: `${SITE_URL}/website-development`,
    price: "1000"
  },
  {
    name: "SEO",
    description: "Technical SEO, structured data, page structure, service pages and on-page optimization for organic search visibility.",
    url: `${SITE_URL}/seo`,
    price: "0"
  },
  {
    name: "Managed Website Hosting",
    description: "Monthly hosting with maintenance checks, SEO support, analytics reports, SSL, backups, uptime checks and priority support.",
    url: `${SITE_URL}/website-hosting`,
    price: "150"
  },
  {
    name: "Website Launch Support",
    description: "Deployment support, contact flow setup, analytics setup and final launch checks.",
    url: `${SITE_URL}/services`,
    price: "0"
  }
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
      areaServed: AREA_SERVED,
      provider: { "@id": `${SITE_URL}#organization` },
      knowsAbout: [
        "Web Design",
        "Web Development",
        "Web Hosting",
        "Managed Hosting",
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
            url: s.url,
            areaServed: { "@type": "Country", name: "Canada" }
          },
          price: s.price,
          priceCurrency: "CAD"
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
