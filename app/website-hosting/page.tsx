import SeoServicePage from "@/components/SeoServicePage";
import { buildSeoMetadata, seoServicePages } from "@/lib/seoServiceContent";

export const metadata = buildSeoMetadata("website-hosting");

export default function WebsiteHostingPage() {
  return <SeoServicePage content={seoServicePages["website-hosting"]} />;
}
