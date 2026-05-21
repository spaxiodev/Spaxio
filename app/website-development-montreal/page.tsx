import SeoServicePage from "@/components/SeoServicePage";
import { buildSeoMetadata, seoServicePages } from "@/lib/seoServiceContent";

export const metadata = buildSeoMetadata("website-development-montreal");

export default function WebsiteDevelopmentMontrealPage() {
  return <SeoServicePage content={seoServicePages["website-development-montreal"]} />;
}
