"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import ScrollVideoHero from "./ScrollVideoHero";

type Lang = "en" | "fr";
type MotionStyle = CSSProperties & { "--i"?: number; "--cs-glow-color"?: string };

const COURSE_URL = "https://whop.com/polidori-dev-3c24/polidori-dev-full-guide/";
const DISCORD_URL = "https://discord.gg/kQhZgkDT8";

const CODE_SNIPPET = `<span class="c">~/projects/sneaker-ad</span>
<span class="k">$</span> claude

<span class="f">&rsaquo;</span> Make a 9:16 product shot of the sneaker on wet
  asphalt at night, then animate it with a slow
  push-in. Add a voiceover and captions.

<span class="s">✓</span> Higgsfield: generated the still
<span class="s">✓</span> Higgsfield: animated the push-in
<span class="s">✓</span> Viewmax: voiceover + captions
<span class="s">✓</span> Exported 9:16, ready to post

<span class="k">$</span> <span class="c">_</span>`;

const brand = {
  name: "Polidori Dev",
  email: "contact@polidori.dev",
  instagramUrl: "https://www.instagram.com/polidori.dev/",
  instagramHandle: "@polidori.dev"
};

// Reel shortcodes from instagram.com/polidori.dev, ordered by views.
const REELS = [
  { code: "DZl4PovRcYy", views: "1.7M", featured: true },
  { code: "Da8k-0MxpPJ", views: "162K", featured: false },
  { code: "Dav6OECRPRV", views: "78.7K", featured: false },
  { code: "Day_GmjRKn3", views: "58.8K", featured: false }
];

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
      title: "Make something real from a sentence.",
      lead:
        "Learn to prompt Claude to drive Higgsfield and Viewmax, so a plain-English idea comes back as a finished image, video, voiceover, or captioned cut. No editing background required.",
      enroll: "Get instant access",
      discord: "Join the Discord"
    },
    pillarsHead: {
      eyebrow: "What you'll learn",
      title: "From a blank prompt to a finished cut."
    },
    pillars: [
      ["Set up the connectors", "Get Higgsfield and Viewmax connected to Claude so you can generate images, video, and audio straight from a conversation."],
      ["Prompt like a pro", "The prompts and workflows that get usable shots on the first few tries, plus how to pull it back when it goes sideways."],
      ["Pick the right model", "Which tool handles what: stills, animation, voice, captions, upscaling. Stop guessing and stop burning credits."],
      ["Finish the video", "Voiceovers, captions, aspect ratios, and exports, so what you make is ready to post instead of almost ready."]
    ],
    instructor: {
      eyebrow: "Your instructor",
      title: "I built this from the ground up. I'll show you how.",
      body:
        "I'm Stefano. I run Polidori Dev and I make AI video every week for my own channels. This course is everything I wish someone had handed me when I started, cut down to a path you can actually follow.",
      placeholder: "Instructor video coming soon"
    },
    curriculumHead: {
      eyebrow: "Curriculum",
      title: "Everything, in the order it actually matters."
    },
    curriculum: [
      ["01", "Your setup", "Get Claude running and connect Higgsfield and Viewmax, so everything happens in one place."],
      ["02", "Prompting for images", "Turn a plain-English idea into the still you actually pictured. Framing, lighting, references, and fixing a shot that came back wrong."],
      ["03", "Prompting for video", "Animate a still or generate from scratch. Camera moves, motion control, and keeping a look consistent across shots."],
      ["04", "Voice and captions", "Voiceovers, voice changes, caption styles, and getting timing that doesn't feel robotic."],
      ["05", "Higgsfield vs Viewmax", "Which one to reach for, model by model, and how to hand work from one to the other mid-project."],
      ["06", "Full builds, start to finish", "Real walkthroughs: a product ad, a short-form story, a talking-head clip, prompt by prompt."]
    ],
    pricing: {
      eyebrow: "Pricing",
      title: "One payment. Lifetime access.",
      price: "One-time",
      cadence: "lifetime access + community",
      features: [
        "The full course, every module, start to finish",
        "Lifetime access, including future updates",
        "Private Discord community",
        "Real project walkthroughs",
        "A prompt library you can copy and reuse"
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
    reels: {
      eyebrow: "Instagram",
      title: "Millions of views. Same tools.",
      body:
        "The prompts and tools in this course are the ones behind what I post every week. Here are some of the reels that got the most attention.",
      views: "views",
      cta: "Follow on Instagram"
    },
    faqHead: { eyebrow: "FAQ", title: "Questions, answered." },
    faq: [
      ["Do I need to know how to edit or code?", "No. That's the whole point. The AI does the making and you learn to direct it. If you can describe what you want, you can do this."],
      ["How long do I have access?", "Forever. One payment gets you lifetime access, including anything I add later."],
      ["What will I be able to do after?", "Prompt Claude to generate images, video, voiceovers, and captioned cuts through Higgsfield and Viewmax, on your own, without following a tutorial every time."],
      ["Do I need Higgsfield or Viewmax credits?", "Yes, those are separate. They're paid tools with their own plans, and this course teaches you how to use them without wasting credits."],
      ["Is there support?", "Yes. The private Discord community is included, so you can get help and feedback while you make things."]
    ],
    finalCta: {
      title: "Ready to start making?",
      lead: "Get instant access and start today.",
      enroll: "Get the course",
      discord: "Join the Discord"
    },
    footer: { line: "Prompt Claude. Make video with Higgsfield and Viewmax." }
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
      title: "Crée quelque chose de réel, à partir d'une phrase.",
      lead:
        "Apprends à prompter Claude pour piloter Higgsfield et Viewmax : une idée en français simple revient en image, en vidéo, en voix off ou en montage sous-titré. Aucune expérience en montage requise.",
      enroll: "Accès immédiat",
      discord: "Rejoindre le Discord"
    },
    pillarsHead: {
      eyebrow: "Ce que tu apprends",
      title: "D'un prompt vide au montage fini."
    },
    pillars: [
      ["Brancher les connecteurs", "Connecte Higgsfield et Viewmax à Claude pour générer images, vidéos et audio directement dans une conversation."],
      ["Prompter comme un pro", "Les prompts et les méthodes qui donnent des plans utilisables dès les premiers essais, et comment remettre l'IA sur les rails quand elle déraille."],
      ["Choisir le bon modèle", "Quel outil pour quoi : images fixes, animation, voix, sous-titres, upscaling. Fini les devinettes et les crédits gaspillés."],
      ["Finir la vidéo", "Voix off, sous-titres, formats et exports, pour que ce que tu crées soit prêt à publier au lieu de presque prêt."]
    ],
    instructor: {
      eyebrow: "Ton formateur",
      title: "J'ai tout bâti à partir de zéro. Je vais te montrer comment.",
      body:
        "Je suis Stefano. Je dirige Polidori Dev et je crée de la vidéo IA chaque semaine pour mes propres comptes. Ce cours, c'est tout ce que j'aurais voulu qu'on me donne au départ, ramené à un parcours que tu peux vraiment suivre.",
      placeholder: "Vidéo du formateur à venir"
    },
    curriculumHead: {
      eyebrow: "Programme",
      title: "Tout, dans l'ordre qui compte vraiment."
    },
    curriculum: [
      ["01", "Ton installation", "Lance Claude et branche Higgsfield et Viewmax, pour que tout se passe au même endroit."],
      ["02", "Prompter des images", "Transforme une idée en français simple en l'image que tu avais en tête. Cadrage, lumière, références, et comment corriger un plan raté."],
      ["03", "Prompter des vidéos", "Anime une image ou génère à partir de zéro. Mouvements de caméra, contrôle du mouvement et cohérence d'un plan à l'autre."],
      ["04", "Voix et sous-titres", "Voix off, changement de voix, styles de sous-titres et un timing qui ne sonne pas robotique."],
      ["05", "Higgsfield ou Viewmax", "Lequel utiliser, modèle par modèle, et comment passer le travail de l'un à l'autre en cours de projet."],
      ["06", "Des projets complets", "Des démonstrations réelles : une pub produit, une histoire courte, un plan face caméra, prompt par prompt."]
    ],
    pricing: {
      eyebrow: "Prix",
      title: "Un seul paiement. Accès à vie.",
      price: "Paiement unique",
      cadence: "accès à vie + communauté",
      features: [
        "Le cours complet, chaque module, du début à la fin",
        "Accès à vie, mises à jour futures incluses",
        "Communauté Discord privée",
        "Démonstrations de vrais projets",
        "Une bibliothèque de prompts à copier et réutiliser"
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
    reels: {
      eyebrow: "Instagram",
      title: "Des millions de vues. Les mêmes outils.",
      body:
        "Les prompts et les outils de ce cours sont ceux derrière ce que je publie chaque semaine. Voici quelques-uns des reels les plus vus.",
      views: "vues",
      cta: "Suivre sur Instagram"
    },
    faqHead: { eyebrow: "FAQ", title: "Tes questions, nos réponses." },
    faq: [
      ["Faut-il savoir monter ou coder ?", "Non, c'est tout l'intérêt. L'IA crée et toi tu apprends à la diriger. Si tu sais décrire ce que tu veux, tu peux le faire."],
      ["Combien de temps ai-je accès ?", "Pour toujours. Un paiement te donne un accès à vie, mises à jour incluses."],
      ["Que serai-je capable de faire après ?", "Prompter Claude pour générer des images, des vidéos, des voix off et des montages sous-titrés avec Higgsfield et Viewmax, tout seul, sans suivre un tutoriel chaque fois."],
      ["Faut-il des crédits Higgsfield ou Viewmax ?", "Oui, ils sont à part. Ce sont des outils payants avec leurs propres forfaits, et ce cours t'apprend à les utiliser sans gaspiller de crédits."],
      ["Y a-t-il du soutien ?", "Oui. La communauté Discord privée est incluse, pour obtenir de l'aide et des retours pendant que tu crées."]
    ],
    finalCta: {
      title: "Prêt à commencer à créer ?",
      lead: "Obtiens un accès immédiat et commence aujourd'hui.",
      enroll: "Obtenir le cours",
      discord: "Rejoindre le Discord"
    },
    footer: { line: "Prompte Claude. Crée de la vidéo avec Higgsfield et Viewmax." }
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
            <p className="cs-eyebrow">{lang === "fr" ? "Créer avec l'IA" : "Make it with AI"}</p>
            <h2>{lang === "fr" ? "Tu ne montes pas. Tu diriges l'IA." : "You don't edit. You direct the AI."}</h2>
            <p>
              {lang === "fr"
                ? "Apprends à prompter Claude et à brancher Higgsfield et Viewmax pour sortir des images, des vidéos et des voix off finies, sans jamais ouvrir un logiciel de montage."
                : "Learn to prompt Claude and wire up Higgsfield and Viewmax to turn out finished images, video, and voiceovers without ever opening an editor."}
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

        {/* Instagram reels */}
        <section className="cs-section" id="instagram">
          <div className="cs-section-head">
            <p className="cs-eyebrow">{t.reels.eyebrow}</p>
            <h2>{t.reels.title}</h2>
            <p className="cs-reels-body">{t.reels.body}</p>
            <a className="cs-btn cs-btn-ghost cs-reels-cta" href={brand.instagramUrl} target="_blank" rel="noreferrer">
              {t.reels.cta}
            </a>
          </div>
          <div className="cs-reels">
            {REELS.map((reel, i) => (
              <figure
                className={reel.featured ? "cs-reel cs-reel-featured" : "cs-reel"}
                key={reel.code}
                style={{ "--i": i } as MotionStyle}
              >
                <iframe
                  src={`https://www.instagram.com/reel/${reel.code}/embed/`}
                  title={`${brand.instagramHandle} reel ${reel.code}`}
                  loading="lazy"
                  allow="encrypted-media; picture-in-picture; web-share"
                  allowFullScreen
                  scrolling="no"
                />
                <figcaption>
                  <strong>{reel.views}</strong>
                  <span>{t.reels.views}</span>
                </figcaption>
              </figure>
            ))}
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
            <a href={brand.instagramUrl} target="_blank" rel="noreferrer">{brand.instagramHandle}</a>
            <Link href="/privacy-policy">{lang === "fr" ? "Confidentialité" : "Privacy"}</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
