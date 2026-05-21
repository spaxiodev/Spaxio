import SeoServicePage from "@/components/SeoServicePage";
import { buildSeoMetadata, seoServicePages } from "@/lib/seoServiceContent";

export const metadata = buildSeoMetadata("website-design-montreal");

export default function WebsiteDesignMontrealPage() {
  return <SeoServicePage content={seoServicePages["website-design-montreal"]} />;
}
