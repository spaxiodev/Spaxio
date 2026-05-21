import SeoServicePage from "@/components/SeoServicePage";
import { buildSeoMetadata, seoServicePages } from "@/lib/seoServiceContent";

export const metadata = buildSeoMetadata("seo-montreal");

export default function SeoMontrealPage() {
  return <SeoServicePage content={seoServicePages["seo-montreal"]} />;
}
