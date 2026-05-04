import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Polidori Dev privacy policy — how we handle your data.",
};

export default function PrivacyPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg)",
        color: "var(--text)",
        fontFamily: "var(--font-sans), system-ui, sans-serif",
        padding: "4rem 1.5rem",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ maxWidth: "640px", width: "100%" }}>
        <Link
          href="/"
          style={{
            color: "var(--warm)",
            fontSize: "0.875rem",
            marginBottom: "2rem",
            display: "inline-block",
          }}
        >
          &larr; Back to Polidori Dev
        </Link>

        <h1
          style={{
            fontFamily: "var(--font-display), serif",
            fontSize: "2.5rem",
            marginBottom: "0.5rem",
          }}
        >
          Privacy Policy
        </h1>

        <p style={{ color: "var(--text-dim)", marginBottom: "2.5rem" }}>
          Last updated: April 2026
        </p>

        <section style={{ lineHeight: 1.8, fontSize: "1rem" }}>
          <p style={{ marginBottom: "1.5rem" }}>
            Polidori Dev respects your privacy. When you use our contact form,
            we collect only the information you provide (name, email, project
            details) to respond to your inquiry. We do not sell, share, or
            distribute your personal data to third parties.
          </p>

          <p style={{ marginBottom: "1.5rem" }}>
            Our website may use basic analytics to understand traffic patterns.
            No personally identifiable information is stored beyond what you
            voluntarily submit.
          </p>

          <h2
            style={{
              fontFamily: "var(--font-display), serif",
              fontSize: "1.5rem",
              marginTop: "2.5rem",
              marginBottom: "1rem",
            }}
          >
            Privacy Officer
          </h2>
          <p>
            Privacy Officer: Stefano Polidori —{" "}
            <a href="mailto:contact@polidori.dev" style={{ color: "var(--warm)" }}>
              contact@polidori.dev
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
