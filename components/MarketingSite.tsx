"use client";

import type { CSSProperties, FormEvent } from "react";
import type { Route } from "next";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Lang = "en" | "fr";
type Variant = "home" | "services";
type Status = "idle" | "sending" | "sent" | "error";
type MotionStyle = CSSProperties & { "--i"?: number };
type ServiceAreaLink = [string, Route];

const brand = {
  name: "Polidori Dev",
  phoneDisplay: "514-516-0515",
  phoneE164: "15145160515",
  email: "contact@polidori.dev",
  messengerUrl: "https://m.me/polidoridev",
  instagramUrl: "https://www.instagram.com/polidori.dev/",
  instagramHandle: "@polidori.dev"
};

// Reel shortcodes from instagram.com/polidori.dev, ordered by views.
const reels = [
  { code: "DZl4PovRcYy", views: "1.7M", featured: true },
  { code: "Da8k-0MxpPJ", views: "162K", featured: false },
  { code: "Dav6OECRPRV", views: "78.7K", featured: false },
  { code: "Day_GmjRKn3", views: "58.8K", featured: false }
];

const copy = {
  en: {
    nav: {
      home: "Home",
      work: "Portfolio",
      services: "Services",
      reserve: "Contact",
      lang: "FR"
    },
    hero: {
      eyebrow: "Web design and development",
      title: "Websites that actually bring you work.",
      lead:
        "I build custom websites for small businesses. The kind that look the part, show up in local searches, and get the phone ringing.",
      reserve: "Contact",
      services: "View services",
      contact: "Talk on WhatsApp"
    },
    proof: [
      ["$1000 CAD", "one-time, for the whole website"],
      ["3 rounds", "of revisions on design and copy"],
      ["Launch support", "from our first call to going live"]
    ],
    intro: {
      kicker: "No templates",
      title: "A simple process for businesses that need to be taken seriously online.",
      body:
        "We start with a real conversation about what you sell, who buys it, and who you're up against locally. Then I design the site around how your customers actually make up their minds, not around whatever looks trendy this year."
    },
    processTitle: "How it works",
    process: [
      ["We talk", "A quick Zoom call to get to know your business, your customers, your goals, and what pages you actually need."],
      ["I design it", "Your site gets planned and built from scratch around your brand, your services, and the calls you want coming in."],
      ["You give notes", "Three rounds of revisions, so nothing goes live until it feels right to you."],
      ["SEO and launch", "Technical SEO, page structure, ranking basics, analytics, and help getting it live. All part of the build."]
    ],
    work: {
      eyebrow: "Recent work",
      title: "Sites I've built.",
      lead: "Real businesses running on sites I designed and built from scratch. Tap any of them to see it live.",
      visit: "Visit site"
    },
    servicesPage: {
      eyebrow: "Services",
      title: "Clear pricing, no surprises.",
      lead:
        "Start with the website. Add managed hosting later if you'd rather not think about maintenance, reports, and ongoing SEO yourself."
    },
    services: [
      {
        label: "Primary service",
        name: "Professional website",
        price: "$1000 CAD",
        cadence: "one-time payment",
        description:
          "A custom site built to explain what you do, make people trust you fast, and show up when they search for you locally.",
        features: [
          "Zoom calls to get to know your business",
          "Fully custom design",
          "3 rounds of revisions",
          "SEO and ranking setup",
          "Works properly on phones",
          "WhatsApp, Messenger, email, and form contact",
          "Help getting the site live"
        ]
      },
      {
        label: "Monthly add-on",
        name: "Managed hosting",
        price: "$150 CAD",
        cadence: "per month",
        description:
          "For owners who want the site looked after and improved without ever touching the technical side of it.",
        features: [
          "Secure hosting, month to month",
          "Monthly maintenance checks",
          "Ongoing SEO and ranking work",
          "Monthly analytics reports",
          "SSL, backups, uptime and speed monitoring",
          "Small content updates when you need them",
          "Priority support if something breaks"
        ]
      }
    ],
    serviceAreas: {
      title: "Looking for something specific?",
      lead: "Each service has its own page, so you and Google both know exactly what's on offer."
    },
    contactMethods: {
      title: "Reach me directly",
      whatsapp: "WhatsApp",
      messenger: "Messenger",
      email: "Email",
      phone: "Call",
      instagram: "Instagram"
    },
    form: {
      eyebrow: "Contact",
      title: "Tell me what you need.",
      lead:
        "Give me the basics and I'll get back to you with the next steps. Already have a site? Drop the link in and I'll tell you what's worth keeping and what isn't.",
      name: "Name",
      email: "Email",
      phone: "Phone number",
      industry: "What kind of business",
      website: "Current website, if you have one",
      message: "About the project",
      messagePlaceholder: "Tell me about your business, what pages you think you need, when you'd like it live, and what you want the site to do for you.",
      submit: "Send it",
      sending: "Sending...",
      success: "Got it. I'll be in touch shortly.",
      error: "Something went wrong on my end. Try email or WhatsApp instead."
    },
    reels: {
      eyebrow: "Instagram",
      title: "Watch the builds.",
      lead: "Short videos on real client sites, the design calls I make, and what goes into a launch. Come follow along.",
      views: "views",
      follow: "Follow on Instagram"
    },
    footer: {
      line: "Custom websites, SEO, hosting, and a hand getting it all live.",
      privacy: "Privacy"
    }
  },
  fr: {
    nav: {
      home: "Accueil",
      work: "Portfolio",
      services: "Services",
      reserve: "Contact",
      lang: "EN"
    },
    hero: {
      eyebrow: "Conception et developpement web",
      title: "Des sites web qui vous amenent des clients.",
      lead:
        "Je cree des sites sur mesure pour les petites entreprises. Le genre de site qui inspire confiance, qui sort dans les recherches locales et qui fait sonner le telephone.",
      reserve: "Contact",
      services: "Voir les services",
      contact: "Parler sur WhatsApp"
    },
    proof: [
      ["1000 $ CAD", "un seul paiement, pour tout le site"],
      ["3 rondes", "de revisions sur le design et les textes"],
      ["Soutien au lancement", "du premier appel jusqu'a la mise en ligne"]
    ],
    intro: {
      kicker: "Aucun modele generique",
      title: "Une facon de travailler simple, pour les entreprises qui veulent etre prises au serieux en ligne.",
      body:
        "On commence par une vraie conversation sur ce que vous vendez, a qui vous le vendez et contre qui vous vous battez dans votre coin. Ensuite, je concois le site selon la facon dont vos clients decident vraiment, pas selon la tendance du moment."
    },
    processTitle: "Comment ca se passe",
    process: [
      ["On se parle", "Un appel Zoom pour bien comprendre votre entreprise, vos clients, vos objectifs et les pages dont vous avez vraiment besoin."],
      ["Je concois le site", "Tout est planifie et cree a partir de zero autour de votre marque, vos services et les appels que vous voulez recevoir."],
      ["Vous commentez", "Trois rondes de revisions. Rien ne part en ligne tant que ce n'est pas a votre gout."],
      ["SEO et lancement", "SEO technique, structure des pages, bases du classement, analytiques et aide a la mise en ligne. Tout est inclus."]
    ],
    work: {
      eyebrow: "Projets recents",
      title: "Des sites que j'ai crees.",
      lead: "De vraies entreprises qui roulent sur des sites que j'ai concus et developpes a partir de zero. Touchez-en un pour le voir en ligne.",
      visit: "Voir le site"
    },
    servicesPage: {
      eyebrow: "Services",
      title: "Des prix clairs, aucune surprise.",
      lead:
        "Commencez par le site. Ajoutez l'hebergement gere plus tard si vous preferez ne pas vous occuper vous-meme de la maintenance, des rapports et du SEO."
    },
    services: [
      {
        label: "Service principal",
        name: "Site web professionnel",
        price: "1000 $ CAD",
        cadence: "paiement unique",
        description:
          "Un site sur mesure qui explique ce que vous faites, qui inspire confiance rapidement et qui sort quand on vous cherche dans votre region.",
        features: [
          "Appels Zoom pour bien comprendre votre entreprise",
          "Design entierement sur mesure",
          "3 rondes de revisions",
          "SEO et configuration pour le classement",
          "Fonctionne comme il faut sur mobile",
          "Contact par WhatsApp, Messenger, courriel et formulaire",
          "Aide a mettre le site en ligne"
        ]
      },
      {
        label: "Option mensuelle",
        name: "Hebergement gere",
        price: "150 $ CAD",
        cadence: "par mois",
        description:
          "Pour les proprietaires qui veulent que leur site soit suivi et ameliore sans jamais toucher au cote technique.",
        features: [
          "Hebergement securise, mois par mois",
          "Verifications de maintenance chaque mois",
          "Travail SEO continu",
          "Rapports analytiques mensuels",
          "SSL, sauvegardes, surveillance de la disponibilite et de la vitesse",
          "Petites mises a jour de contenu quand vous en avez besoin",
          "Soutien prioritaire si quelque chose brise"
        ]
      }
    ],
    serviceAreas: {
      title: "Vous cherchez quelque chose de precis ?",
      lead: "Chaque service a sa propre page, comme ca vous et Google savez exactement ce qui est offert."
    },
    contactMethods: {
      title: "Me joindre directement",
      whatsapp: "WhatsApp",
      messenger: "Messenger",
      email: "Courriel",
      phone: "Appeler",
      instagram: "Instagram"
    },
    form: {
      eyebrow: "Contact",
      title: "Dites-moi ce dont vous avez besoin.",
      lead:
        "Donnez-moi les grandes lignes et je reviens vers vous avec les prochaines etapes. Vous avez deja un site ? Mettez le lien et je vous dirai ce qui vaut la peine d'etre garde.",
      name: "Nom",
      email: "Courriel",
      phone: "Numero de telephone",
      industry: "Votre domaine",
      website: "Site actuel, si vous en avez un",
      message: "A propos du projet",
      messagePlaceholder: "Parlez-moi de votre entreprise, des pages que vous pensez avoir besoin, du moment ou vous voulez etre en ligne et de ce que le site doit vous rapporter.",
      submit: "Envoyer",
      sending: "Envoi...",
      success: "C'est recu. Je vous reviens sous peu.",
      error: "Un probleme de mon cote. Essayez par courriel ou WhatsApp."
    },
    reels: {
      eyebrow: "Instagram",
      title: "Voir les projets en video.",
      lead: "De courtes videos sur de vrais sites clients, les choix de design que je fais et ce qu'implique un lancement. Venez suivre ca.",
      views: "vues",
      follow: "Suivre sur Instagram"
    },
    footer: {
      line: "Sites web sur mesure, SEO, hebergement et un coup de main pour tout mettre en ligne.",
      privacy: "Confidentialite"
    }
  }
};

const portfolio = [
  {
    name: "Vasto Jewelery",
    host: "vastojewelery.com",
    url: "https://vastojewelery.com",
    tag: { en: "Jewelery", fr: "Bijouterie" },
    blurb: {
      en: "An elegant storefront that lets the jewelery do the talking and turns browsers into buyers.",
      fr: "Une vitrine elegante qui laisse parler les bijoux et transforme les curieux en clients."
    }
  },
  {
    name: "Ciavaglia Timepieces",
    host: "ciavagliatimepieces.ca",
    url: "https://ciavagliatimepieces.ca",
    tag: { en: "Watchmaking", fr: "Horlogerie" },
    blurb: {
      en: "A quiet, refined site for a watchmaker, built around craftsmanship and family history.",
      fr: "Un site sobre et raffine pour un horloger, bati autour du savoir-faire et de l'histoire de famille."
    }
  },
  {
    name: "Tooth Doctor Patel",
    host: "toothdoctorpatel.com",
    url: "https://toothdoctorpatel.com",
    tag: { en: "Dental practice", fr: "Clinique dentaire" },
    blurb: {
      en: "A clear, reassuring site that makes booking easy and keeps the appointment book full.",
      fr: "Un site clair et rassurant qui rend la prise de rendez-vous facile et garde l'agenda plein."
    }
  }
];

const whatsappText = {
  en: "Hi Stefano, I'm interested in getting a website built.",
  fr: "Bonjour Stefano, je suis interesse par la creation d'un site web."
};

const serviceAreaLinks = {
  en: [
    ["Website design", "/website-design"],
    ["Website development", "/website-development"],
    ["SEO", "/seo"],
    ["Website hosting", "/website-hosting"]
  ],
  fr: [
    ["Conception de site web", "/website-design"],
    ["Developpement web", "/website-development"],
    ["SEO", "/seo"],
    ["Hebergement web", "/website-hosting"]
  ]
} satisfies Record<Lang, ServiceAreaLink[]>;

export default function MarketingSite({ variant }: { variant: Variant }) {
  const [lang, setLang] = useState<Lang>("en");
  const [status, setStatus] = useState<Status>("idle");
  const t = copy[lang];

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedLang = params.get("lang");
    const storedLang = window.localStorage.getItem("site_lang");
    const nextLang = requestedLang === "fr" || storedLang === "fr" ? "fr" : "en";
    setLang(nextLang);
    document.documentElement.lang = nextLang === "fr" ? "fr-CA" : "en-CA";
  }, []);

  useEffect(() => {
    let frame = 0;
    const updateScrollVars = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      document.documentElement.style.setProperty("--mk-scroll", progress.toFixed(4));
      document.documentElement.style.setProperty("--mk-scroll-px", `${window.scrollY}px`);
      frame = 0;
    };
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateScrollVars);
    };

    updateScrollVars();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const links = useMemo(() => {
    const message = encodeURIComponent(whatsappText[lang]);
    const mailSubject = encodeURIComponent(lang === "fr" ? "Demande de site web" : "Website project request");
    const mailBody = encodeURIComponent(whatsappText[lang]);

    return {
      whatsapp: `https://wa.me/${brand.phoneE164}?text=${message}`,
      email: `mailto:${brand.email}?subject=${mailSubject}&body=${mailBody}`,
      messenger: brand.messengerUrl,
      phone: `tel:+${brand.phoneE164}`,
      instagram: brand.instagramUrl
    };
  }, [lang]);

  const toggleLang = () => {
    const nextLang = lang === "en" ? "fr" : "en";
    setLang(nextLang);
    window.localStorage.setItem("site_lang", nextLang);
    document.documentElement.lang = nextLang === "fr" ? "fr-CA" : "en-CA";
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      industry: String(formData.get("industry") || ""),
      website: String(formData.get("website") || ""),
      message: String(formData.get("message") || ""),
      projectType: "Professional website reservation",
      budget: "$1000 CAD website build"
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error("Request failed");
      setStatus("sent");
      event.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <main className="mk-page">
      <div className="mk-scroll-progress" aria-hidden="true" />
      <header className="mk-header">
        <Link href="/" className="mk-brand" aria-label={`${brand.name} home`}>
          <img src="/logo.png" alt="" className="mk-brand-mark" width="44" height="44" />
          <span>{brand.name}</span>
        </Link>

        <nav className="mk-nav" aria-label="Primary">
          <Link href="/">{t.nav.home}</Link>
          <a href="/#work">{t.nav.work}</a>
          <Link href="/services">{t.nav.services}</Link>
          <a href="#contact">{t.nav.reserve}</a>
          <button type="button" onClick={toggleLang}>{t.nav.lang}</button>
        </nav>
      </header>

      {variant === "home" ? (
        <>
          <section className="mk-hero" id="top">
            <div className="mk-hero-copy">
              <p className="mk-eyebrow">{t.hero.eyebrow}</p>
              <h1 className="mk-kinetic-title">
                {t.hero.title.split(" ").map((word, index) => (
                  <span key={`${word}-${index}`} style={{ "--i": index } as MotionStyle}>
                    {word}
                  </span>
                ))}
              </h1>
              <p className="mk-lead">{t.hero.lead}</p>
              <div className="mk-actions">
                <a className="mk-btn mk-btn-primary" href="#contact">{t.hero.reserve}</a>
                <Link className="mk-btn mk-btn-secondary" href="/services">{t.hero.services}</Link>
                <a className="mk-btn mk-btn-plain" href={links.whatsapp} target="_blank" rel="noreferrer">{t.hero.contact}</a>
              </div>
            </div>

            <div className="mk-hero-panel" aria-label="Service summary">
              {t.proof.map(([value, label]) => (
                <div className="mk-proof" key={value}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </section>

          <div className="mk-marquee" aria-hidden="true">
            <div>
              <span><b>01</b> Custom websites</span>
              <span><b>02</b> SEO architecture</span>
              <span><b>03</b> Launch support</span>
              <span><b>04</b> Managed hosting</span>
              <span><b>05</b> Analytics reports</span>
            </div>
            <div>
              <span><b>01</b> Custom websites</span>
              <span><b>02</b> SEO architecture</span>
              <span><b>03</b> Launch support</span>
              <span><b>04</b> Managed hosting</span>
              <span><b>05</b> Analytics reports</span>
            </div>
          </div>

          <section className="mk-promo" aria-label="Course and community">
            <a
              className="mk-promo-card"
              href="https://whop.com/polidori-dev-3c24/polidori-dev-full-guide/"
              target="_blank"
              rel="noreferrer"
            >
              <img src="/whop-course.png" alt="Polidori Dev web development course: learn, build, launch." loading="lazy" />
            </a>
            <a
              className="mk-promo-card"
              href="https://discord.gg/kQhZgkDT8"
              target="_blank"
              rel="noreferrer"
            >
              <img src="/discord-community.png" alt="Join the Polidori Dev Discord community" loading="lazy" />
            </a>
          </section>

          <section className="mk-intro">
            <div>
              <p className="mk-eyebrow">{t.intro.kicker}</p>
              <h2>{t.intro.title}</h2>
            </div>
            <p>{t.intro.body}</p>
          </section>

          <section className="mk-process" aria-labelledby="process-title">
            <h2 id="process-title">{t.processTitle}</h2>
            <div className="mk-process-grid">
              {t.process.map(([title, body], index) => (
                <article className="mk-step" key={title} style={{ "--i": index } as MotionStyle}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="mk-work" id="work" aria-labelledby="work-title">
            <div className="mk-work-head">
              <p className="mk-eyebrow">{t.work.eyebrow}</p>
              <h2 id="work-title">{t.work.title}</h2>
              <p className="mk-work-lead">{t.work.lead}</p>
            </div>

            <div className="mk-work-grid">
              {portfolio.map((item, index) => (
                <a
                  className="mk-work-card"
                  key={item.url}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{ "--i": index } as MotionStyle}
                >
                  <div className="mk-work-card-top">
                    <span className="mk-work-fav">
                      <img
                        src={`https://www.google.com/s2/favicons?domain=${item.host}&sz=256`}
                        alt={`${item.name} favicon`}
                        width="256"
                        height="256"
                        loading="lazy"
                      />
                    </span>
                    <span className="mk-work-tag">{item.tag[lang]}</span>
                  </div>
                  <h3 className="mk-work-name">{item.name}</h3>
                  <p className="mk-work-blurb">{item.blurb[lang]}</p>
                  <span className="mk-work-foot">
                    <span className="mk-work-host">{item.host}</span>
                    <span className="mk-work-visit">{t.work.visit}<i aria-hidden="true">&rarr;</i></span>
                  </span>
                </a>
              ))}
            </div>
          </section>

          <section className="mk-reels" id="instagram" aria-labelledby="reels-title">
            <div className="mk-reels-head">
              <p className="mk-eyebrow">{t.reels.eyebrow}</p>
              <h2 id="reels-title">{t.reels.title}</h2>
              <p className="mk-reels-lead">{t.reels.lead}</p>
              <a
                className="mk-btn mk-btn-primary mk-reels-follow"
                href={links.instagram}
                target="_blank"
                rel="noreferrer"
              >
                {t.reels.follow}
              </a>
            </div>

            <div className="mk-reels-grid">
              {reels.map((reel, index) => (
                <figure
                  className={reel.featured ? "mk-reel mk-reel-featured" : "mk-reel"}
                  key={reel.code}
                  style={{ "--i": index } as MotionStyle}
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
        </>
      ) : (
        <section className="mk-services-hero">
          <p className="mk-eyebrow">{t.servicesPage.eyebrow}</p>
          <h1>{t.servicesPage.title}</h1>
          <p>{t.servicesPage.lead}</p>
        </section>
      )}

      <section className="mk-services" id="services" aria-labelledby="services-title">
        {variant === "home" && (
          <div className="mk-section-head">
            <p className="mk-eyebrow">{t.servicesPage.eyebrow}</p>
            <h2 id="services-title">{t.servicesPage.title}</h2>
          </div>
        )}

        <div className="mk-service-grid">
          {t.services.map((service) => (
            <article className="mk-service-card" key={service.name}>
              <div className="mk-card-top">
                <span>{service.label}</span>
                <div>
                  <strong>{service.price}</strong>
                  <small>{service.cadence}</small>
                </div>
              </div>
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              <ul>
                {service.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <a className="mk-card-link" href="#contact">{t.nav.reserve}</a>
            </article>
          ))}
        </div>
      </section>

      <section className="mk-local-links" aria-labelledby="local-service-pages-title">
        <div>
          <p className="mk-eyebrow">Local SEO</p>
          <h2 id="local-service-pages-title">{t.serviceAreas.title}</h2>
          <p>{t.serviceAreas.lead}</p>
        </div>
        <nav aria-label="Local service pages">
          {serviceAreaLinks[lang].map(([label, href]) => (
            <Link key={href} href={href}>{label}</Link>
          ))}
        </nav>
      </section>

      <section className="mk-contact-methods" aria-labelledby="contact-methods-title">
        <h2 id="contact-methods-title">{t.contactMethods.title}</h2>
        <div>
          <a href={links.whatsapp} target="_blank" rel="noreferrer">{t.contactMethods.whatsapp}</a>
          <a href={links.messenger} target="_blank" rel="noreferrer">{t.contactMethods.messenger}</a>
          <a href={links.email}>{t.contactMethods.email}</a>
          <a href={links.phone}>{t.contactMethods.phone}</a>
          <a href={links.instagram} target="_blank" rel="noreferrer">{t.contactMethods.instagram}</a>
        </div>
      </section>

      <section className="mk-contact" id="contact">
        <div className="mk-contact-copy">
          <p className="mk-eyebrow">{t.form.eyebrow}</p>
          <h2>{t.form.title}</h2>
          <p>{t.form.lead}</p>
          <a href={links.email} className="mk-email-link">{brand.email}</a>
        </div>

        <form className="mk-form" onSubmit={handleSubmit}>
          <label>
            <span>{t.form.name}</span>
            <input name="name" autoComplete="name" required />
          </label>
          <label>
            <span>{t.form.email}</span>
            <input type="email" name="email" autoComplete="email" required />
          </label>
          <label>
            <span>{t.form.phone}</span>
            <input name="phone" autoComplete="tel" required />
          </label>
          <label>
            <span>{t.form.industry}</span>
            <input name="industry" required />
          </label>
          <label className="mk-full">
            <span>{t.form.website}</span>
            <input type="url" name="website" placeholder="https://" />
          </label>
          <label className="mk-full">
            <span>{t.form.message}</span>
            <textarea name="message" rows={6} placeholder={t.form.messagePlaceholder} required />
          </label>
          <button type="submit" disabled={status === "sending"}>
            {status === "sending" ? t.form.sending : t.form.submit}
          </button>
          {status === "sent" && <p className="mk-form-note mk-form-success">{t.form.success}</p>}
          {status === "error" && <p className="mk-form-note mk-form-error">{t.form.error}</p>}
        </form>
      </section>

      <footer className="mk-footer">
        <p>{t.footer.line}</p>
        <div>
          <a href={`tel:+${brand.phoneE164}`}>{brand.phoneDisplay}</a>
          <a href={`mailto:${brand.email}`}>{brand.email}</a>
          <a href={brand.instagramUrl} target="_blank" rel="noreferrer">{brand.instagramHandle}</a>
          <Link href="/privacy-policy">{t.footer.privacy}</Link>
        </div>
      </footer>
    </main>
  );
}
