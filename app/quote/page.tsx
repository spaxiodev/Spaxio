import type { Metadata } from "next";
import QuoteClient from "./QuoteClient";

export const metadata: Metadata = {
  title: "Get a Quote",
  description:
    "Get a custom web design quote from Spaxio. Chat with our AI assistant to discuss your project, budget, and timeline. Free mock website within 48 hours.",
  keywords: [
    "web design quote",
    "website quote",
    "Spaxio pricing",
    "custom website cost",
    "luxury web design quote",
    "Next.js website quote"
  ],
  alternates: { canonical: "https://spaxio.ca/quote" },
  openGraph: {
    title: "Get a Quote | Spaxio — Luxe-grade web builds at honest prices",
    description:
      "Chat with our AI assistant to get a custom quote for your website. Free mock within 48 hours.",
    url: "https://spaxio.ca/quote",
    type: "website",
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "Spaxio logo" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Get a Quote | Spaxio",
    description:
      "Chat with our AI assistant to get a custom quote for your website. Free mock within 48 hours."
  },
  robots: {
    index: true,
    follow: true
  }
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Get a Quote | Spaxio",
  description:
    "Get a custom web design quote from Spaxio. Chat with our AI assistant to discuss your project, budget, and timeline.",
  url: "https://spaxio.ca/quote",
  mainEntity: {
    "@type": "Service",
    name: "Web Design Quote",
    description: "Custom website quotes with AI-assisted consultation. Free mock within 48 hours."
  }
};

export default function QuotePage() {
  return (
    <main className="page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <QuoteClient />
    </main>
  );
}
