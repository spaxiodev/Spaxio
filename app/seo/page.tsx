import SeoServicePage from "@/components/SeoServicePage";
import { buildSeoMetadata, seoServicePages } from "@/lib/seoServiceContent";

export const metadata = buildSeoMetadata("seo");

export default function SeoPage() {
  return <SeoServicePage content={seoServicePages["seo"]} />;
}
