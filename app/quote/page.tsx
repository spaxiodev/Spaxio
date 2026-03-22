import type { Metadata } from "next";
import QuoteClient from "./QuoteClient";

export const metadata: Metadata = {
  title: "Get a quote",
  description:
    "Tell us about your project and receive a scoped quote, timeline, and link to your free mock website."
};

export default function QuotePage() {
  return (
    <main className="page">
      <QuoteClient />
    </main>
  );
}
