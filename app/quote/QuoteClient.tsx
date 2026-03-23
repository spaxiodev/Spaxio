"use client";

<<<<<<< HEAD
import Script from "next/script";
=======
import Link from "next/link";
>>>>>>> 6fa17ce (COntact form)
import { useMemo, useState } from "react";
import { useTheme } from "../useTheme";

type Lang = "en" | "fr";

export default function QuoteClient() {
  const [lang, setLang] = useState<Lang>("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const logoSrc = isDark ? "/darkmodelogo.png" : "/logo.png";

  const t = useMemo(() => {
    if (lang === "fr") {
      return {
        badge: "Obtenir une soumission",
        title: "Discutez de votre projet",
        lead: "Utilisez le formulaire ci-dessous pour partager vos objectifs, votre budget et vos besoins. Je vous répondrai avec une estimation et un lien vers votre maquette gratuite.",
        nav: {
          hero: "Accueil",
          process: "Méthode",
          mock: "Maquette",
          quote: "Soumission",
          work: "Travaux",
          faq: "FAQ"
        }
      };
    }
    return {
      badge: "Get a quote",
      title: "Discuss your project",
      lead: "Use the form below to share your goals, budget, and requirements. I'll reply with a scoped quote and a link to your free mock.",
      nav: {
        hero: "Home",
        process: "Process",
        mock: "Free mock",
        quote: "Quote",
        work: "Work",
        faq: "FAQ"
      }
    };
  }, [lang]);

  return (
    <>
      <header className="overlay-header faq-header">
<<<<<<< HEAD
        <a href="/" className="logo-banner" aria-label="Spaxio home">
          <img src={logoSrc} alt="Spaxio logo" />
        </a>
        <button
          type="button"
          className="nav-toggle"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>
        <div className={`nav ${menuOpen ? "open" : ""}`} aria-label="Primary">
          <a href="/#hero" onClick={() => setMenuOpen(false)}>
            {t.nav.hero}
          </a>
          <a href="/#process" onClick={() => setMenuOpen(false)}>
            {t.nav.process}
          </a>
          <a href="/#mock" onClick={() => setMenuOpen(false)}>
            {t.nav.mock}
          </a>
          <a href="/quote" className="nav-cta" onClick={() => setMenuOpen(false)}>
            {t.nav.quote}
          </a>
          <a href="/#work" onClick={() => setMenuOpen(false)}>
            {t.nav.work}
          </a>
          <a href="/faq" onClick={() => setMenuOpen(false)}>
            {t.nav.faq}
          </a>
          <a href="/blog" onClick={() => setMenuOpen(false)}>
            Blog
          </a>
          <button
            type="button"
            className="button secondary"
            style={{ padding: "10px 14px", borderRadius: 10 }}
            onClick={() => {
              setLang("en");
              setMenuOpen(false);
            }}
            aria-pressed={lang === "en"}
            aria-label="Switch to English"
          >
            EN
          </button>
          <button
            type="button"
            className="button secondary"
            style={{ padding: "10px 14px", borderRadius: 10 }}
            onClick={() => {
              setLang("fr");
              setMenuOpen(false);
            }}
            aria-pressed={lang === "fr"}
            aria-label="Passer au français"
          >
            FR
          </button>
          <button
            type="button"
            className="button secondary"
            style={{ padding: "10px 14px", borderRadius: 10 }}
            onClick={() => {
              toggleTheme();
              setMenuOpen(false);
            }}
            aria-pressed={isDark}
          >
            {lang === "en" ? (isDark ? "Light mode" : "Dark mode") : isDark ? "Mode clair" : "Mode sombre"}
          </button>
=======
        <div className="nav" style={{ flexDirection: "column", alignItems: "flex-start" }}>
          <Link href="/" className="logo-banner" aria-label={t.backToHome}>
            <img src={logoSrc} alt="Spaxio logo" />
          </Link>
          <Link className="button secondary" href="/">
            {t.backToHome}
          </Link>
>>>>>>> 6fa17ce (COntact form)
        </div>
      </header>

      <section className="quote-hero">
        <div className="badge">{t.badge}</div>
        <h1 className="tagline">{t.title}</h1>
        <p className="lead">{t.lead}</p>
      </section>

      <section className="quote-iframe-section">
        <div id="spaxio-form-4c48c88e-abb5-4530-a4e6-2cb947bdf8f5" />
        <Script
          src="https://www.spaxioassistant.com/embed/form.js"
          strategy="afterInteractive"
          data-form-id="4c48c88e-abb5-4530-a4e6-2cb947bdf8f5"
          data-container="#spaxio-form-4c48c88e-abb5-4530-a4e6-2cb947bdf8f5"
          data-theme="inherit"
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
