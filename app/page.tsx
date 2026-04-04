"use client";

import { useEffect, useMemo, useState } from "react";
import HeroNavCards from "@/components/HeroNavCards";
import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";
import Script from "next/script";
import { useTheme } from "./useTheme";

/** Full-bleed background for scroll hero (Next/Image remotePatterns). */
const HERO_SCROLL_BG =
  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80";

type Lang = "en" | "fr";

const copy = {
  en: {
    badge: "Boutique quality ·\nAccessible pricing",
    headline: "Websites built with luxe attention to detail — priced for brands that are scaling.",
    heroLead:
      "I craft sites with the obsessive detail of high horology and lean, efficient workflows. Expect elegant visuals, conversion-focused UX, and smart AI automation and AI integration — priced to win without cutting corners.",
    ctaQuote: "Get a quote",
    ctaMock: "Request a free mock",
    ribbon: "Free mock website within 48 hours. Only pay when you love it.",
    cards: [
      {
        title: "Priced to win",
        body: "Lean, streamlined production means bespoke builds typically 30-50% below agency rates."
      },
      {
        title: "Automation ready",
        body: "Need AI automation, AI integration, forms, scheduling, CRM handoff, or simple workflows? I'll wire the essentials so leads flow smoothly."
      },
      {
        title: "Luxury polish",
        body: "Layout cues, typography, and motion borrow from modern luxury — bold hero, precise grids, and warm gold accents."
      }
    ],
    mockTitle: "Free mock website",
    mockLead:
      "I'll design a clickable mock tailored to your brand — no commitment. Use it to align on tone and structure before any build costs start. If you approve it, we ship fast and keep costs predictable.",
    processTitle: "How I work",
    process: [
      {
        title: "01. Discovery & quote",
        body: "Share your goals, budget, and must-haves. I return a scoped quote and timeline within 24 hours."
      },
      {
        title: "02. Design & build sprint",
        body: "Structured sprints combine design craft with fast production to draft copy, variants, and data-informed UX tweaks."
      },
      {
        title: "03. Launch & automation",
        body: "Ship to Vercel, wire SMTP for leads, and add light automations to qualify and route inbound messages."
      }
    ],
    formTitle: "Get a quote",
    formLead: "Tell me about your project. I'll reply with pricing, a delivery window, and a link to your free mock.",
    copyright: "© 2026 Spaxio. All rights reserved.",
    scrollToExpand: "Scroll to continue",
    nav: {
      hero: "Home",
      process: "Process",
      mock: "Free mock",
      quote: "Quote",
      work: "Work",
      faq: "FAQ"
    },
    heroNav: {
      process: { description: "Discovery, scope, and timeline", date: "Section" },
      mock: { description: "Clickable preview before you commit", date: "48h" },
      quote: { description: "Pricing and delivery window", date: "Chat" }
    },
    contactLabel: "Contact",
    workTitle: "Work",
    workLead: "Sites I've designed and built.",
    work: {
      ciavaglia: {
        title: "Ciavaglia Timepieces",
        description: "Custom luxury watches, Montreal. E-commerce with an interactive configurator — design dial, case, movement, and strap with live pricing.",
        viewSite: "View website",
        visitLabel: "Visit website"
      },
      spaxioassistant: {
        title: "Spaxio Assistant",
        description: "AI assistant widget for websites — embed on any site to offer instant support and guidance.",
        viewSite: "View site",
        visitLabel: "Visit website"
      }
    }
  },
  fr: {
    badge: "Qualité boutique ·\nPrix accessibles",
    headline: "Sites au niveau luxe — pensés pour les marques en croissance.",
    heroLead:
      "Je conçois des sites avec le souci du détail horloger et des processus efficaces. Attendez-vous à des visuels élégants, une UX orientée conversion, ainsi qu'à l'automatisation IA et à l'intégration IA — sans sacrifier le budget.",
    ctaQuote: "Obtenir une soumission",
    ctaMock: "Demander une maquette gratuite",
    ribbon: "Maquette gratuite en 48 heures. Vous ne payez que si vous l’adoptez.",
    cards: [
      {
        title: "Tarifs avantageux",
        body: "Une production optimisée permet des sites sur mesure souvent 30 à 50 % moins chers qu'en agence."
      },
      {
        title: "Prêt pour l'automatisation",
        body: "Automatisation IA, intégration IA, formulaires, prises de rendez-vous, transfert CRM ou petites automatisations : j'installe l'essentiel pour que vos leads circulent sans friction."
      },
      {
        title: "Finition luxe",
        body: "Mise en page, typographie et motion inspirées du luxe moderne — hero audacieux, grilles précises et accents dorés chaleureux."
      }
    ],
    mockTitle: "Maquette gratuite",
    mockLead:
      "Je crée une maquette cliquable adaptée à votre marque — sans engagement. Elle sert à valider le ton et la structure avant tout coût. Si vous l'approuvez, on livre rapidement avec un budget maîtrisé.",
    processTitle: "Ma méthode",
    process: [
      {
        title: "01. Découverte & soumission",
        body: "Vous partagez objectifs, budget et requis. Je renvoie une soumission détaillée et un délai en moins de 24 h."
      },
      {
        title: "02. Sprint design & build",
        body: "Des sprints structurés allient design soigné et production rapide pour rédiger les textes, variantes et ajustements UX."
      },
      {
        title: "03. Mise en ligne & automatisation",
        body: "Mise en ligne sur Vercel, configuration SMTP pour les leads et automatisations légères pour qualifier et router les messages entrants."
      }
    ],
    formTitle: "Obtenir une soumission",
    formLead: "Parlez-moi de votre projet. Je répondrai avec le prix, l’échéancier et un lien vers votre maquette gratuite.",
    copyright: "© 2026 Spaxio. Tous droits réservés.",
    scrollToExpand: "Faites défiler pour continuer",
    nav: {
      hero: "Accueil",
      process: "Méthode",
      mock: "Maquette",
      quote: "Soumission",
      work: "Travaux",
      faq: "FAQ"
    },
    heroNav: {
      process: { description: "Portée, délais et méthode", date: "Section" },
      mock: { description: "Aperçu cliquable sans engagement", date: "48h" },
      quote: { description: "Tarif et échéancier", date: "Chat" }
    },
    contactLabel: "Contact",
    workTitle: "Travaux",
    workLead: "Sites que j'ai conçus et réalisés.",
    work: {
      ciavaglia: {
        title: "Ciavaglia Timepieces",
        description: "Montres de luxe sur mesure, Montréal. E-commerce avec configurateur — cadran, boîtier, mouvement et bracelet, avec prix en direct.",
        viewSite: "Voir le site",
        visitLabel: "Visiter le site"
      },
      spaxioassistant: {
        title: "Spaxio Assistant",
        description: "Widget d'assistant IA pour sites web — à intégrer sur n'importe quel site pour offrir support et conseils instantanés.",
        viewSite: "Voir le site",
        visitLabel: "Visiter le site"
      }
    }
  }
} satisfies Record<Lang, any>;

/* Site icons (like Apple link previews) — official logo/favicon from each site */
const PREVIEW_CIAVAGLIA = "https://www.ciavagliatimepieces.ca/images/logo.png";
const PREVIEW_SPAXIOASSISTANT = "https://www.spaxioassistant.com/logo.png";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "Spaxio",
      url: "https://spaxio.ca",
      logo: "https://spaxio.ca/logo.png"
    },
    {
      "@type": "WebSite",
      name: "Spaxio",
      url: "https://spaxio.ca",
      inLanguage: ["en-CA", "fr-CA"]
    },
    {
      "@type": "Service",
      name: "Luxury-inspired web design and development",
      serviceType: "Web design and development",
      provider: {
        "@type": "Organization",
        name: "Spaxio",
        url: "https://spaxio.ca"
      }
    }
  ]
};

export default function HomePage() {
  const [lang, setLang] = useState<Lang>("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const logoSrc = isDark ? "/darkmodelogo.png" : "/logo.png";
  const heroVideos = [
    "/2887463-hd_1920_1080_25fps.mp4",
    "/IMG_4685.mov",
    "/5495845-hd_1920_1080_30fps.mp4"
  ];
  const [heroVideoIndex, setHeroVideoIndex] = useState(0);

  const t = useMemo(() => copy[lang], [lang]);

  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>(".scroll-image"));
    const onScroll = () => {
      const vh = window.innerHeight || 1;
      items.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const offset = rect.top - vh * 0.5;
        const value = `${offset * -0.2}px`;
        el.style.setProperty("--parallax-offset", value);
        const img = el.querySelector<HTMLElement>("img");
        const videos = el.querySelectorAll<HTMLElement>(".hero-video");
        if (img) img.style.setProperty("--parallax-offset", value);
        videos.forEach((v) => v.style.setProperty("--parallax-offset", value));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const header = document.querySelector<HTMLElement>(".overlay-header");
    if (!header) return;
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const currentY = window.scrollY;
      const shouldHide = currentY > lastY && currentY > 80;
      header.style.transform = shouldHide ? "translate(-50%, -120%)" : "translate(-50%, 0)";
      setHeaderHidden(shouldHide);
      lastY = currentY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const elements = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          } else {
            entry.target.classList.remove("is-visible");
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -6% 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const id = window.setInterval(() => {
      setHeroVideoIndex((prev) => (prev + 1) % heroVideos.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, [heroVideos.length]);

  return (
    <main className="page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen max-w-[100vw] shrink-0">
        <header className="overlay-header">
          <div className="logo-banner">
            <img src={logoSrc} alt="Spaxio logo" />
          </div>
          <button
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
            <a href="#hero" onClick={() => setMenuOpen(false)}>{t.nav.hero}</a>
            <a href="#process" onClick={() => setMenuOpen(false)}>{t.nav.process}</a>
            <a href="#mock" onClick={() => setMenuOpen(false)}>{t.nav.mock}</a>
            <a href="/quote" className="nav-cta" onClick={() => setMenuOpen(false)}>
              {t.nav.quote}
            </a>
            <a href="#work" onClick={() => setMenuOpen(false)}>{t.nav.work}</a>
            <a href="/faq" onClick={() => setMenuOpen(false)}>{t.nav.faq}</a>
            <a href="/blog" onClick={() => setMenuOpen(false)}>Blog</a>
            <button
              className="button secondary"
              style={{ padding: "10px 14px", borderRadius: 10 }}
              onClick={() => {
                setLang("en");
                setMenuOpen(false);
              }}
              aria-label="Switch to English"
            >
              EN
            </button>
            <button
              className="button secondary"
              style={{ padding: "10px 14px", borderRadius: 10 }}
              onClick={() => {
                setLang("fr");
                setMenuOpen(false);
              }}
              aria-label="Passer au français"
            >
              FR
            </button>
            <button
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
          </div>
        </header>

        <ScrollExpandMedia
          mediaType="video"
          mediaSrc={heroVideos[heroVideoIndex]}
          bgImageSrc={HERO_SCROLL_BG}
          title={t.headline}
          date={t.badge}
          scrollToExpand={t.scrollToExpand}
          textBlend
        >
          <div className="hero max-w-[1320px] mx-auto w-full" id="hero">
            <h1 className="sr-only">{t.headline}</h1>
            <div className="hero-grid">
              <div className="reveal" style={{ transitionDelay: "60ms" }}>
                <p className="lead">{t.heroLead}</p>
                <div className="cta-row">
                  <a className="button" href="/quote">
                    {t.ctaQuote}
                  </a>
                  <a className="button secondary" href="#mock">{t.ctaMock}</a>
                </div>
                <div className="ribbon reveal" style={{ transitionDelay: "120ms" }}>{t.ribbon}</div>
              </div>
              <div className="hero-nav-wrap reveal min-w-0" style={{ transitionDelay: "140ms" }}>
                <HeroNavCards
                  titles={{
                    process: t.nav.process,
                    mock: t.nav.mock,
                    quote: t.nav.quote
                  }}
                  heroNav={t.heroNav}
                />
              </div>
            </div>
          </div>
        </ScrollExpandMedia>
      </div>

      <section className="scroll-image" aria-hidden="true">
        <img
          src="/pexels-hitarth-jadhav-57415-220357.jpg"
          alt="Team collaborating on a high-end digital experience"
          loading="lazy"
        />
      </section>

      <section id="mock">
        <h2 className="reveal">{t.mockTitle}</h2>
        <p className="lead reveal" style={{ transitionDelay: "90ms" }}>{t.mockLead}</p>
      </section>

      <section id="work">
        <h2 className="reveal">{t.workTitle}</h2>
        <p className="lead reveal" style={{ transitionDelay: "90ms" }}>{t.workLead}</p>
        <div className="work-row reveal" style={{ transitionDelay: "120ms" }}>
          <div className="work-row-item">
            <a
              href="https://ciavagliatimepieces.ca"
              target="_blank"
              rel="noopener noreferrer"
              className="work-preview-link"
              aria-label={t.work.ciavaglia.viewSite}
            >
              <img
                src={PREVIEW_CIAVAGLIA}
                alt="Ciavaglia Timepieces"
                loading="lazy"
                className="work-preview-img work-preview-icon"
              />
            </a>
            <a
              href="https://ciavagliatimepieces.ca"
              target="_blank"
              rel="noopener noreferrer"
              className="work-visit"
            >
              {t.work.ciavaglia.visitLabel}
            </a>
          </div>
          <div className="work-row-item">
            <a
              href="https://www.spaxioassistant.com"
              target="_blank"
              rel="noopener noreferrer"
              className="work-preview-link"
              aria-label={t.work.spaxioassistant.viewSite}
            >
              <img
                src={PREVIEW_SPAXIOASSISTANT}
                alt="Spaxio Assistant"
                loading="lazy"
                className="work-preview-img work-preview-icon"
              />
            </a>
            <a
              href="https://www.spaxioassistant.com"
              target="_blank"
              rel="noopener noreferrer"
              className="work-visit"
            >
              {t.work.spaxioassistant.visitLabel}
            </a>
          </div>
        </div>
      </section>

      <section className="scroll-image" aria-hidden="true">
        <img
          src="/pexels-pixabay-37347.jpg"
          alt="Luxury-inspired workspace for digital product strategy"
          loading="lazy"
        />
      </section>

      <section id="process">
        <h2 className="reveal">{t.processTitle}</h2>
        <div className="cards">
          {t.process.map((step: any, idx: number) => (
            <div
              className="card reveal"
              style={{ transitionDelay: `${idx * 80}ms` }}
              key={step.title}
            >
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="quote">
        <div className="form-shell">
          <h2 className="reveal">{t.formTitle}</h2>
          <p className="lead reveal" style={{ transitionDelay: "90ms" }}>{t.formLead}</p>
          <div className="reveal" style={{ transitionDelay: "140ms" }}>
            <a className="button" href="/quote">
              {t.ctaQuote}
            </a>
          </div>
        </div>
      </section>

      <section id="contact">
        <div id="spaxio-form-3a6a74a3-e227-48d8-8d38-6e8623124ee2" />
        <Script
          src="https://www.spaxioassistant.com/embed/form.js"
          data-form-id="3a6a74a3-e227-48d8-8d38-6e8623124ee2"
          data-container="#spaxio-form-3a6a74a3-e227-48d8-8d38-6e8623124ee2"
          data-theme="inherit"
          strategy="afterInteractive"
        />
      </section>

      <footer>
        <p style={{ marginTop: "8px", color: "var(--muted)" }}>{t.copyright}</p>
        <div className="footer-contact">
          <span className="label">{t.contactLabel}</span>
          <a href="mailto:polidorispaxio@gmail.com">polidorispaxio@gmail.com</a>
        </div>
      </footer>
      <a
        className={`button floating-quote ${headerHidden ? "hidden" : ""}`}
        href="/quote"
      >
        {lang === "en" ? "Get Quote" : "Obtenir une soumission"}
      </a>
    </main>
  );
}
