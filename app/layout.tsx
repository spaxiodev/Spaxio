import type { Metadata } from "next";
import "./globals.css";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import CookieConsent from "@/components/CookieConsent";

const display = Playfair_Display({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--font-display" });
const sans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-sans" });

const SITE_URL = "https://polidori.dev";
const SITE_NAME = "Polidori Dev";
const SITE_TAGLINE = "Clean websites at honest prices";
const SITE_DESCRIPTION =
  "Polidori Dev builds clean, custom websites at a fraction of typical agency cost. Get a quote in minutes and receive a free mock site.";
const SITE_DESCRIPTION_SHORT =
  "Clean, custom web design, fast builds, and AI-powered sites at honest prices.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Polidori Dev",
    "Polidori",
    "Stefano Polidori",
    "web development",
    "Next.js developer",
    "custom websites",
    "affordable websites",
    "landing page",
    "Montreal web developer",
    "freelance web developer"
  ],
  authors: [{ name: "Stefano Polidori", url: SITE_URL }],
  creator: "Stefano Polidori",
  publisher: SITE_NAME,
  category: "Web design",
  applicationName: SITE_NAME,
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_CA",
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION_SHORT,
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} logo`
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
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

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      founder: {
        "@type": "Person",
        name: "Stefano Polidori"
      },
      email: "contact@polidori.dev",
      areaServed: "CA",
      sameAs: []
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      publisher: { "@id": `${SITE_URL}#organization` },
      inLanguage: "en-CA"
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}#service`,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      url: SITE_URL,
      image: `${SITE_URL}/logo.png`,
      priceRange: "$$",
      areaServed: { "@type": "Country", name: "Canada" },
      provider: { "@id": `${SITE_URL}#organization` }
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
