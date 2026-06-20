"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import ScrollVideoHero from "./ScrollVideoHero";

type Lang = "en" | "fr";
type MotionStyle = CSSProperties & { "--i"?: number; "--cs-glow-color"?: string };

const COURSE_URL = "https://whop.com/polidori-dev/course-access-one-time-payment/";
const DISCORD_URL = "https://discord.gg/kQhZgkDT8";

const CODE_SNIPPET = `<span class="c">~/clients/dental-clinic</span>
<span class="k">$</span> claude

<span class="f">&rsaquo;</span> Build a landing page for a dental clinic with
  online booking and local SEO. Match the brand
  colors from their logo.

<span class="s">✓</span> Created the site &amp; booking form
<span class="s">✓</span> Wrote the local SEO + copy
<span class="s">✓</span> Connected the calendar &amp; email
<span class="s">✓</span> Deployed to production

<span class="k">$</span> <span class="c">_</span>`;

const brand = {
  name: "Polidori Dev",
  email: "contact@polidori.dev"
};

const copy = {
  en: {
    nav: {
      learn: "What you learn",
      curriculum: "Curriculum",
      instructor: "Instructor",
      pricing: "Pricing",
      enroll: "Get the course",
      lang: "FR"
    },
    hero: {
      eyebrow: "The Polidori Dev course",
      title: "Build something real from nothing.",
      lead:
        "Learn to build websites with AI and land clients on social media — the exact system I use to run a profitable web business. No coding degree required.",
      enroll: "Get instant access",
      discord: "Join the Discord"
    },
    pillarsHead: {
      eyebrow: "What you'll learn",
      title: "From empty lot to finished build."
    },
    pillars: [
      ["Build with AI, not code", "Use Claude Code and connectors to turn a simple brief into a finished, client-ready website — without hand-writing it all."],
      ["Prompt like a pro", "The exact prompts and workflows that get AI to produce real, polished work fast — and how to fix it when it gets things wrong."],
      ["Get clients on social media", "Turn content, posts, and DMs into a steady flow of paying clients — the outreach system that actually fills your pipeline."],
      ["Close deals & get paid", "How I price the work, run the call, send the proposal, and deliver — the business side most people never figure out."]
    ],
    instructor: {
      eyebrow: "Your instructor",
      title: "I built this from the ground up. I'll show you how.",
      body:
        "I'm Stefano — I run Polidori Dev, building custom websites for real businesses. This course is everything I wish I'd had when I started, condensed into a path you can actually follow.",
      placeholder: "Instructor video coming soon"
    },
    curriculumHead: {
      eyebrow: "Curriculum",
      title: "Everything, in the order it actually matters."
    },
    curriculum: [
      ["01", "Your AI toolkit", "Set up Claude Code and the connectors you'll use to build, plus the mindset that separates earners from dabblers."],
      ["02", "Prompting Claude Code", "Turn a plain-English brief into a finished website — the prompts, the workflow, and how to course-correct the AI."],
      ["03", "Connectors & automation", "Wire up connectors to ship faster, handle the boring parts, and deliver more without more hours."],
      ["04", "Packaging your offer", "Decide what you sell and price it so it's an easy yes — productized services that scale."],
      ["05", "Clients from social media", "Content, posts, and DMs that pull in leads — the exact outreach system that fills your pipeline."],
      ["06", "Closing & getting paid", "Running the call, sending proposals, handling objections, and collecting payment with confidence."]
    ],
    pricing: {
      eyebrow: "Pricing",
      title: "One payment. Lifetime access.",
      price: "One-time",
      cadence: "lifetime access + community",
      features: [
        "Full course — every module, start to finish",
        "Lifetime access, including future updates",
        "Private Discord community",
        "Real project walkthroughs",
        "The business playbook to land paid work"
      ],
      cta: "Get instant access",
      note: "Secure checkout on Whop."
    },
    community: {
      eyebrow: "Community",
      title: "You won't be building alone.",
      body: "Join the Discord to ask questions, share your builds, and learn alongside everyone else taking the course.",
      cta: "Join the Discord"
    },
    faqHead: { eyebrow: "FAQ", title: "Questions, answered." },
    faq: [
      ["Do I need to know how to code?", "No. The whole point is that AI does the building — you learn to direct Claude Code and connectors. If you can write a clear brief, you can do this."],
      ["How long do I have access?", "Forever. One payment gets you lifetime access, including any updates I add later."],
      ["What will I be able to do after?", "Use AI to build real websites for clients, and consistently find those clients through social media."],
      ["Is there support?", "Yes — the private Discord community is included so you can get help and feedback as you build and sell."]
    ],
    finalCta: {
      title: "Ready to start building?",
      lead: "Get instant access and start today.",
      enroll: "Get the course",
      discord: "Join the Discord"
    },
    footer: { line: "Build websites with AI. Land clients on social media." }
  },
  fr: {
    nav: {
      learn: "Ce que tu apprends",
      curriculum: "Programme",
      instructor: "Formateur",
      pricing: "Prix",
      enroll: "Obtenir le cours",
      lang: "EN"
    },
    hero: {
      eyebrow: "Le cours Polidori Dev",
      title: "Construis quelque chose de réel, à partir de rien.",
      lead:
        "Apprends à créer des sites web avec l'IA et à trouver des clients sur les réseaux sociaux — le système exact que j'utilise pour faire vivre une vraie entreprise web. Aucun diplôme en programmation requis.",
      enroll: "Accès immédiat",
      discord: "Rejoindre le Discord"
    },
    pillarsHead: {
      eyebrow: "Ce que tu apprends",
      title: "Du terrain vide au projet fini."
    },
    pillars: [
      ["Créer avec l'IA, pas du code", "Utilise Claude Code et des connecteurs pour transformer un simple brief en site web fini, prêt pour le client — sans tout écrire à la main."],
      ["Prompter comme un pro", "Les prompts et les méthodes exactes pour faire produire à l'IA un travail soigné et rapide — et comment corriger quand elle se trompe."],
      ["Trouver des clients sur les réseaux", "Transforme ton contenu, tes publications et tes DM en flux constant de clients payants — le système qui remplit vraiment ton pipeline."],
      ["Conclure et être payé", "Comment je fixe les prix, mène l'appel, envoie l'offre et livre — le côté business que la plupart des gens ne maîtrisent jamais."]
    ],
    instructor: {
      eyebrow: "Ton formateur",
      title: "J'ai tout bâti à partir de zéro. Je vais te montrer comment.",
      body:
        "Je suis Stefano — je dirige Polidori Dev et je crée des sites sur mesure pour de vraies entreprises. Ce cours, c'est tout ce que j'aurais voulu avoir au départ, condensé en un parcours que tu peux suivre.",
      placeholder: "Vidéo du formateur à venir"
    },
    curriculumHead: {
      eyebrow: "Programme",
      title: "Tout, dans l'ordre qui compte vraiment."
    },
    curriculum: [
      ["01", "Ta boîte à outils IA", "Installe Claude Code et les connecteurs que tu utiliseras, plus l'état d'esprit qui distingue ceux qui gagnent des amateurs."],
      ["02", "Prompter Claude Code", "Transforme un brief en français simple en site web fini — les prompts, la méthode et comment corriger l'IA."],
      ["03", "Connecteurs et automatisation", "Branche des connecteurs pour livrer plus vite, gérer les tâches ennuyeuses et produire plus sans plus d'heures."],
      ["04", "Emballer ton offre", "Décide quoi vendre et fixe un prix qui rend le oui facile — des services productisés qui passent à l'échelle."],
      ["05", "Des clients via les réseaux", "Contenu, publications et DM qui attirent des prospects — le système d'approche qui remplit ton pipeline."],
      ["06", "Conclure et être payé", "Mener l'appel, envoyer les offres, gérer les objections et encaisser avec confiance."]
    ],
    pricing: {
      eyebrow: "Prix",
      title: "Un seul paiement. Accès à vie.",
      price: "Paiement unique",
      cadence: "accès à vie + communauté",
      features: [
        "Cours complet — chaque module, du début à la fin",
        "Accès à vie, mises à jour futures incluses",
        "Communauté Discord privée",
        "Démonstrations de vrais projets",
        "Le plan d'affaires pour décrocher des contrats"
      ],
      cta: "Accès immédiat",
      note: "Paiement sécurisé sur Whop."
    },
    community: {
      eyebrow: "Communauté",
      title: "Tu ne bâtiras pas seul.",
      body: "Rejoins le Discord pour poser tes questions, partager tes projets et apprendre avec les autres membres du cours.",
      cta: "Rejoindre le Discord"
    },
    faqHead: { eyebrow: "FAQ", title: "Tes questions, nos réponses." },
    faq: [
      ["Faut-il savoir coder ?", "Non. Tout l'intérêt, c'est que l'IA construit — tu apprends à diriger Claude Code et les connecteurs. Si tu sais écrire un brief clair, tu peux le faire."],
      ["Combien de temps ai-je accès ?", "Pour toujours. Un paiement te donne un accès à vie, mises à jour incluses."],
      ["Que serai-je capable de faire après ?", "Utiliser l'IA pour créer de vrais sites pour des clients, et trouver ces clients de façon constante sur les réseaux sociaux."],
      ["Y a-t-il du soutien ?", "Oui — la communauté Discord privée est incluse pour obtenir de l'aide et des retours pendant que tu crées et vends."]
    ],
    finalCta: {
      title: "Prêt à commencer à bâtir ?",
      lead: "Obtiens un accès immédiat et commence aujourd'hui.",
      enroll: "Obtenir le cours",
      discord: "Rejoindre le Discord"
    },
    footer: { line: "Crée des sites avec l'IA. Trouve des clients sur les réseaux." }
  }
} as const;

export default function CourseHome() {
  const [lang, setLang] = useState<Lang>("en");
  const t = copy[lang];

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedLang = params.get("lang");
    const storedLang = window.localStorage.getItem("site_lang");
    const nextLang: Lang = requestedLang === "fr" || storedLang === "fr" ? "fr" : "en";
    setLang(nextLang);
    document.documentElement.lang = nextLang === "fr" ? "fr-CA" : "en-CA";
  }, []);

  const toggleLang = () => {
    const next: Lang = lang === "en" ? "fr" : "en";
    setLang(next);
    window.localStorage.setItem("site_lang", next);
    document.documentElement.lang = next === "fr" ? "fr-CA" : "en-CA";
  };

  return (
    <main className="cs-page">
      {/* Final-frame background — held and subtly blurred behind the whole page */}
      <div className="cs-bg" aria-hidden="true" />
      <div className="cs-bg-overlay" aria-hidden="true" />

      <header className="cs-header">
        <Link href="/" className="cs-brand" aria-label={`${brand.name} home`}>
          <img src="/logo.png" alt="" className="cs-brand-mark" width="40" height="40" />
          <span>{brand.name}</span>
        </Link>
        <nav className="cs-nav" aria-label="Primary">
          <a href="#learn">{t.nav.learn}</a>
          <a href="#curriculum">{t.nav.curriculum}</a>
          <a href="#instructor">{t.nav.instructor}</a>
          <a href="#pricing">{t.nav.pricing}</a>
          <a className="cs-nav-cta" href={COURSE_URL} target="_blank" rel="noreferrer">{t.nav.enroll}</a>
          <button type="button" onClick={toggleLang}>{t.nav.lang}</button>
        </nav>
      </header>

      <ScrollVideoHero src="/hero.mp4" poster="/hero-poster.jpg" trackVh={320}>
        <p className="cs-eyebrow">{t.hero.eyebrow}</p>
        <h1 className="cs-hero-title">{t.hero.title}</h1>
        <p className="cs-hero-lead">{t.hero.lead}</p>
        <div className="cs-hero-actions">
          <a className="cs-btn cs-btn-primary" href={COURSE_URL} target="_blank" rel="noreferrer">{t.hero.enroll}</a>
          <a className="cs-btn cs-btn-ghost" href={DISCORD_URL} target="_blank" rel="noreferrer">{t.hero.discord}</a>
        </div>
      </ScrollVideoHero>

      <div className="cs-content">
        {/* What you'll learn */}
        <section className="cs-section" id="learn">
          <div className="cs-section-head">
            <p className="cs-eyebrow">{t.pillarsHead.eyebrow}</p>
            <h2>{t.pillarsHead.title}</h2>
          </div>
          <div className="cs-pillars">
            {t.pillars.map(([title, body], i) => (
              <article className="cs-pillar" key={title} style={{ "--i": i } as MotionStyle}>
                <span className="cs-pillar-num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Code-story split — developer-tool flavor for a coding course */}
        <section
          className="cs-section cs-glow cs-codestory"
          style={{ "--cs-glow-color": "var(--cs-blue-glow)" } as MotionStyle}
        >
          <div className="cs-codestory-copy">
            <p className="cs-eyebrow">{lang === "fr" ? "Construire avec l'IA" : "Build with AI"}</p>
            <h2>{lang === "fr" ? "Tu ne codes pas. Tu diriges l'IA." : "You don't code. You direct the AI."}</h2>
            <p>
              {lang === "fr"
                ? "Apprends à prompter Claude Code et à brancher des connecteurs pour livrer de vrais sites pour tes clients — sans diplôme en programmation."
                : "Learn to prompt Claude Code and wire up connectors to ship real, client-ready websites — no coding degree required."}
            </p>
          </div>
          <div className="cs-code-window">
            <div className="cs-code-bar">
              <i className="cs-d1" />
              <i className="cs-d2" />
              <i className="cs-d3" />
              <span>claude</span>
            </div>
            <pre dangerouslySetInnerHTML={{ __html: CODE_SNIPPET }} />
          </div>
        </section>

        {/* Instructor video */}
        <section className="cs-section" id="instructor">
          <div className="cs-instructor">
            <div className="cs-instructor-copy">
              <p className="cs-eyebrow">{t.instructor.eyebrow}</p>
              <h2>{t.instructor.title}</h2>
              <p>{t.instructor.body}</p>
            </div>
            {/*
              Instructor video slot — drop your file at /public/instructor.mp4
              (and an optional /public/instructor-poster.jpg) and it will play here.
            */}
            <div className="cs-instructor-video">
              <video
                className="cs-instructor-player"
                src="/instructor.mp4"
                poster="/instructor-poster.jpg"
                controls
                playsInline
                preload="none"
              />
              <div className="cs-instructor-placeholder" aria-hidden="true">
                <span className="cs-play"><i /></span>
                <p>{t.instructor.placeholder}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Curriculum */}
        <section className="cs-section" id="curriculum">
          <div className="cs-section-head">
            <p className="cs-eyebrow">{t.curriculumHead.eyebrow}</p>
            <h2>{t.curriculumHead.title}</h2>
          </div>
          <div className="cs-modules">
            {t.curriculum.map(([num, title, body], i) => (
              <article className="cs-module" key={num} style={{ "--i": i } as MotionStyle}>
                <span className="cs-module-num">{num}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section
          className="cs-section cs-section-center cs-glow"
          id="pricing"
          style={{ "--cs-glow-color": "var(--cs-orange-glow)" } as MotionStyle}
        >
          <div className="cs-section-head">
            <p className="cs-eyebrow">{t.pricing.eyebrow}</p>
            <h2>{t.pricing.title}</h2>
          </div>
          <div className="cs-price-card">
            <div className="cs-price-top">
              <strong>{t.pricing.price}</strong>
              <small>{t.pricing.cadence}</small>
            </div>
            <ul>
              {t.pricing.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <a className="cs-btn cs-btn-primary cs-btn-block" href={COURSE_URL} target="_blank" rel="noreferrer">
              {t.pricing.cta}
            </a>
            <p className="cs-price-note">{t.pricing.note}</p>
          </div>
        </section>

        {/* Community */}
        <section className="cs-section">
          <div className="cs-community">
            <div>
              <p className="cs-eyebrow">{t.community.eyebrow}</p>
              <h2>{t.community.title}</h2>
              <p>{t.community.body}</p>
            </div>
            <a className="cs-btn cs-btn-discord" href={DISCORD_URL} target="_blank" rel="noreferrer">
              {t.community.cta}
            </a>
          </div>
        </section>

        {/* FAQ */}
        <section className="cs-section" id="faq">
          <div className="cs-section-head">
            <p className="cs-eyebrow">{t.faqHead.eyebrow}</p>
            <h2>{t.faqHead.title}</h2>
          </div>
          <div className="cs-faq">
            {t.faq.map(([q, a]) => (
              <details className="cs-faq-item" key={q}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section
          className="cs-section cs-section-center cs-final cs-glow"
          style={{ "--cs-glow-color": "var(--cs-blue-glow)" } as MotionStyle}
        >
          <h2>{t.finalCta.title}</h2>
          <p>{t.finalCta.lead}</p>
          <div className="cs-hero-actions cs-center">
            <a className="cs-btn cs-btn-primary" href={COURSE_URL} target="_blank" rel="noreferrer">{t.finalCta.enroll}</a>
            <a className="cs-btn cs-btn-ghost" href={DISCORD_URL} target="_blank" rel="noreferrer">{t.finalCta.discord}</a>
          </div>
        </section>
      </div>

      <footer className="cs-footer">
        <div className="cs-footer-inner">
          <p>{t.footer.line}</p>
          <div>
            <span className="cs-status"><i />{lang === "fr" ? "Inscriptions ouvertes" : "Enrolling now"}</span>
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
            <Link href="/privacy-policy">{lang === "fr" ? "Confidentialité" : "Privacy"}</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
