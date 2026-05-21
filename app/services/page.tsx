import type { Metadata } from "next";
import MarketingSite from "@/components/MarketingSite";

export const metadata: Metadata = {
  title: "Web Design, Development, SEO and Hosting Services",
  description:
    "Professional website creation for $1000 CAD and managed monthly hosting for $150 CAD with web design, development, SEO, maintenance, analytics, and launch support.",
  alternates: {
    canonical: "https://polidori.dev/services"
  },
  keywords: [
    "web design services Montreal",
    "website development services Montreal",
    "SEO services Montreal",
    "managed website hosting Montreal",
    "business website services"
  ],
  openGraph: {
    title: "Web Design, Development, SEO and Hosting Services | Polidori Dev",
    description:
      "Clear pricing for custom business websites, managed hosting, SEO, analytics, maintenance, and launch support in Montreal.",
    url: "https://polidori.dev/services",
    type: "website"
  }
};

export default function ServicesPage() {
  return <MarketingSite variant="services" />;
}
