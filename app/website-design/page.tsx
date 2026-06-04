import SeoServicePage from "@/components/SeoServicePage";
import { buildSeoMetadata, seoServicePages } from "@/lib/seoServiceContent";

export const metadata = buildSeoMetadata("website-design");

export default function WebsiteDesignPage() {
  return <SeoServicePage content={seoServicePages["website-design"]} />;
}
