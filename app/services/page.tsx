import type { Metadata } from "next";
import MarketingSite from "@/components/MarketingSite";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Professional website creation for $1000 CAD and managed monthly hosting for $150 CAD with SEO, maintenance, analytics, and launch support."
};

export default function ServicesPage() {
  return <MarketingSite variant="services" />;
}
