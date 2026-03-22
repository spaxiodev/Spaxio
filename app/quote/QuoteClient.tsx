"use client";

import { useMemo, useState } from "react";
import { useTheme } from "../useTheme";

type Lang = "en" | "fr";

export default function QuoteClient() {
  const [lang] = useState<Lang>("en");
  const { isDark } = useTheme();
  const logoSrc = isDark ? "/darkmodelogo.png" : "/logo.png";

  const t = useMemo(() => {
    if (lang === "fr") {
      return {
        badge: "Obtenir une soumission",
        title: "Discutez de votre projet",
        lead: "Utilisez l'assistant ci-dessous pour partager vos objectifs, votre budget et vos besoins. Je vous répondrai avec une estimation et un lien vers votre maquette gratuite.",
        backToHome: "Retour à l'accueil"
      };
    }
    return {
      badge: "Get a quote",
      title: "Discuss your project",
      lead: "Use the assistant below to share your goals, budget, and requirements. I'll reply with a scoped quote and a link to your free mock.",
      backToHome: "Back to home"
    };
  }, [lang]);

  return (
    <>
      <header className="overlay-header faq-header">
        <a href="/" className="logo-banner" aria-label={t.backToHome}>
          <img src={logoSrc} alt="Spaxio logo" />
        </a>
        <a className="button secondary" href="/">
          {t.backToHome}
        </a>
      </header>

      <section className="quote-hero">
        <div className="badge">{t.badge}</div>
        <h1 className="tagline">{t.title}</h1>
        <p className="lead">{t.lead}</p>
      </section>

      <section className="quote-iframe-section">
        <iframe
          src="https://www.spaxioassistant.com/en/a/p/6c9e3989-a29b-4d47-a608-d6168836a425?embed=1"
          title="Spaxio Quote Assistant"
          width="100%"
          height="600"
          frameBorder="0"
          allow="clipboard-write"
          className="quote-iframe"
        />
      </section>

      <footer>
        <p style={{ marginTop: "8px", color: "var(--muted)", fontSize: "0.9em" }}>
          © 2026 Spaxio
        </p>
      </footer>
    </>
  );
}
