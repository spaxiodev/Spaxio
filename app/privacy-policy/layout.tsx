import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Polidori Dev's privacy policy: what personal information we collect, how we use it, and how you can ask us to delete it.",
  alternates: { canonical: "https://polidori.dev/privacy-policy" },
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
