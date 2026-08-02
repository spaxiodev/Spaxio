import type { Metadata } from "next";
import "./globals.css";
import { Instrument_Serif, Inter, Geist_Mono } from "next/font/google";
import CookieConsent from "@/components/CookieConsent";

const display = Instrument_Serif({ subsets: ["latin"], weight: ["400"], style: ["normal", "italic"], variable: "--font-display" });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

const SITE_URL = "https://polidori.dev";
const SITE_NAME = "Polidori Dev";
const SITE_TAGLINE = "Build Websites with AI & Land Clients on Social Media";
const SITE_DESCRIPTION =
  "The Polidori Dev course teaches you to build websites with AI — prompting Claude Code and connectors — and land clients through social media. No coding degree required. Lifetime access and a private community.";
const SITE_DESCRIPTION_SHORT =
  "Learn to build websites with AI (Claude Code + connectors) and get clients on social media. Lifetime access plus a private Discord community.";
const PHONE = "+1-514-516-0515";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_TAGLINE} | ${SITE_NAME}`,
    template: `%s | ${SITE_NAME}`
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "build websites with AI",
    "Claude Code course",
    "AI web design course",
    "make websites without coding",
    "get clients on social media",
    "freelance clients social media",
    "AI agency course",
    "prompt engineering for websites",
    "no-code AI websites",
    "web design business",
    "make money with AI",
    "online course",
    "Polidori Dev",
    "Polidori Dev course",
    "Stefano Polidori"
  ],
  authors: [{ name: "Stefano Polidori", url: SITE_URL }],
  creator: "Stefano Polidori",
  publisher: SITE_NAME,
  category: "Education",
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
      sameAs: ["https://www.instagram.com/polidori.dev/"]
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
      "@type": "Course",
      "@id": `${SITE_URL}#course`,
      name: "The Polidori Dev Course",
      description: SITE_DESCRIPTION,
      url: SITE_URL,
      image: `${SITE_URL}/logo.png`,
      inLanguage: ["en-CA", "fr-CA"],
      provider: { "@id": `${SITE_URL}#organization` },
      instructor: { "@type": "Person", name: "Stefano Polidori" },
      teaches: [
        "Building websites with AI",
        "Prompting Claude Code",
        "Using AI connectors and automation",
        "Packaging and pricing web services",
        "Getting clients on social media",
        "Closing deals and getting paid"
      ],
      offers: {
        "@type": "Offer",
        category: "Paid",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: "https://whop.com/polidori-dev-3c24/polidori-dev-full-guide/"
      },
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: "Online",
        courseWorkload: "PT20H"
      }
    }
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${sans.variable} ${mono.variable}`}>
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
