import type { Metadata } from "next";
import "./globals.css";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import CookieConsent from "@/components/CookieConsent";

const display = Playfair_Display({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--font-display" });
const sans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL("https://spaxio.ca"),
  title: {
    default: "Spaxio — Luxe-grade web builds at honest prices",
    template: "%s | Spaxio"
  },
  description: "Spaxio crafts luxury-inspired websites at a fraction of typical agency cost. Get a quote in minutes and receive a free mock site.",
  keywords: ["Spaxio", "web development", "Next.js", "luxury web design", "affordable websites", "landing page", "web agency"],
  authors: [{ name: "Spaxio" }],
  creator: "Spaxio",
  publisher: "Spaxio",
  category: "Web design",
  applicationName: "Spaxio",
  alternates: { canonical: "https://spaxio.ca" },
  openGraph: {
    type: "website",
    url: "https://spaxio.ca",
    siteName: "Spaxio",
    locale: "en_CA",
    title: "Spaxio — Luxe-grade web builds at honest prices",
    description: "Get luxury-inspired web design, fast builds, and AI-powered sites at honest prices.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Spaxio logo"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Spaxio — Luxe-grade web builds at honest prices",
    description: "Get luxury-inspired web design, fast builds, and AI-powered sites at honest prices.",
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
  icons: { icon: "/favicon.png", shortcut: "/favicon.png", apple: "/favicon.png" },
  referrer: "origin-when-cross-origin",
  formatDetection: { email: false, address: false, telephone: false }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${sans.variable}`}>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}



