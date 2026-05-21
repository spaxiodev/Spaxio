import SeoServicePage from "@/components/SeoServicePage";
import { buildSeoMetadata, seoServicePages } from "@/lib/seoServiceContent";

export const metadata = buildSeoMetadata("website-hosting-montreal");

export default function WebsiteHostingMontrealPage() {
  return <SeoServicePage content={seoServicePages["website-hosting-montreal"]} />;
}
