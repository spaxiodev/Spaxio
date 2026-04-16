import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Spaxio's privacy policy — what personal information we collect, how we use it, and how you can request deletion.",
  alternates: { canonical: "https://spaxio.ca/privacy-policy" },
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
