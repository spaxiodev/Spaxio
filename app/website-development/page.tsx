import SeoServicePage from "@/components/SeoServicePage";
import { buildSeoMetadata, seoServicePages } from "@/lib/seoServiceContent";

export const metadata = buildSeoMetadata("website-development");

export default function WebsiteDevelopmentPage() {
  return <SeoServicePage content={seoServicePages["website-development"]} />;
}
