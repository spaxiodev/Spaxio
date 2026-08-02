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
      title: "Websites built like business tools.",
      lead:
        "Custom websites for small businesses that need to look credible, rank locally, and turn visitors into booked calls.",
      reserve: "Contact",
      services: "View services",
      contact: "Talk on WhatsApp"
    },
    proof: [
      ["$1000 CAD", "one-time professional website build"],
      ["3 rounds", "of design and content revisions"],
      ["Launch support", "from planning call to published site"]
    ],
    intro: {
      kicker: "No template churn",
      title: "A lean process for businesses that need a serious web presence.",
      body:
        "The work starts with a real conversation about your offer, audience, and local market. From there, the site is designed around the way your customers decide, not around generic web trends."
    },
    processTitle: "How the build works",
    process: [
      ["Discovery call", "We use Zoom to learn your business, customers, goals, and the pages your site needs."],
      ["Custom design", "Your site is planned and designed from scratch around your brand, services, and conversion goals."],
      ["Revisions", "You get 3 rounds of revisions so the final site feels aligned before launch."],
      ["SEO and launch", "Technical SEO, page structure, ranking basics, analytics setup, and launch support are handled with the build."]
    ],
    work: {
      eyebrow: "Selected work",
      title: "Sites I've built.",
      lead: "Real businesses now running on websites I designed and developed from scratch. Tap any one to see it live.",
      visit: "Visit site"
    },
    servicesPage: {
      eyebrow: "Services",
      title: "Website services with clear pricing and a clean scope.",
      lead:
        "Start with a professional website build, then add managed hosting when you want maintenance, reporting, and ongoing search improvements handled for you."
    },
    services: [
      {
        label: "Primary service",
        name: "Professional website",
        price: "$1000 CAD",
        cadence: "one-time payment",
        description:
          "A custom business website built to present your offer clearly, earn trust quickly, and support local search visibility.",
        features: [
          "Zoom calls to learn about your business",
          "Full custom design",
          "3 rounds of revisions",
          "Full SEO and ranking setup",
          "Mobile responsive development",
          "Contact paths for WhatsApp, Messenger, email, and forms",
          "Support to launch the website"
        ]
      },
      {
        label: "Monthly add-on",
        name: "Managed hosting",
        price: "$150 CAD",
        cadence: "per month",
        description:
          "Hosting and care for business owners who want the site monitored, maintained, and improved without dealing with the technical side.",
        features: [
          "Secure monthly hosting",
          "Monthly maintenance checks",
          "Full SEO and ranking support",
          "Monthly analytics reports",
          "SSL, backups, uptime checks, and performance monitoring",
          "Small content updates when needed",
          "Priority support for site issues"
        ]
      }
    ],
    serviceAreas: {
      title: "Service pages for local search",
      lead: "Focused pages help customers and search engines understand the exact web services available."
    },
    contactMethods: {
      title: "Reach out directly",
      whatsapp: "WhatsApp",
      messenger: "Messenger",
      email: "Email",
      phone: "Call",
      instagram: "Instagram"
    },
    form: {
      eyebrow: "Contact",
      title: "Tell me what you need built.",
      lead:
        "Share the basics and I will follow up with next steps. If you already have a website, include it so I can review what should stay, change, or be rebuilt.",
      name: "Name",
      email: "Email",
      phone: "Phone number",
      industry: "Business industry",
      website: "Current website, if you have one",
      message: "Project info",
      messagePlaceholder: "Tell me about the business, pages needed, timeline, and what the website should help you achieve.",
      submit: "Send request",
      sending: "Sending...",
      success: "Request sent. I will follow up soon.",
      error: "Something went wrong. Please try email or WhatsApp."
    },
    reels: {
      eyebrow: "Instagram",
      title: "Watch the builds.",
      lead: "Short breakdowns of real client sites, design decisions, and the work behind the launches. Follow along on Instagram.",
      views: "views",
      follow: "Follow on Instagram"
    },
    footer: {
      line: "Custom websites, SEO, hosting, and launch support.",
      privacy: "Privacy"
    }
  },
  fr: {
    nav: {
      home: "Accueil",
      work: "Portfolio",
      services: "Services",
      reserve: "Reserver une place",
      lang: "EN"
    },
    hero: {
      eyebrow: "Conception et developpement web",
      title: "Des sites web concus comme de vrais outils d'affaires.",
      lead:
        "Des sites personnalises pour les petites entreprises qui veulent paraitre credibles, etre visibles localement et transformer les visiteurs en appels reserves.",
      reserve: "Reserver une place",
      services: "Voir les services",
      contact: "Parler sur WhatsApp"
    },
    proof: [
      ["1000 $ CAD", "creation de site professionnel en paiement unique"],
      ["3 rondes", "de revisions du design et du contenu"],
      ["Soutien au lancement", "de l'appel de planification jusqu'a la mise en ligne"]
    ],
    intro: {
      kicker: "Pas de modele generique",
      title: "Un processus clair pour les entreprises qui ont besoin d'une presence web serieuse.",
      body:
        "Le travail commence par une vraie conversation sur votre offre, votre clientele et votre marche local. Ensuite, le site est concu selon la facon dont vos clients prennent une decision, pas selon des tendances web generiques."
    },
    processTitle: "Comment se deroule le projet",
    process: [
      ["Appel decouverte", "Nous utilisons Zoom pour comprendre votre entreprise, vos clients, vos objectifs et les pages necessaires."],
      ["Design sur mesure", "Votre site est planifie et concu a partir de zero autour de votre marque, vos services et vos objectifs de conversion."],
      ["Revisions", "Vous avez 3 rondes de revisions pour que le resultat final soit bien aligne avant le lancement."],
      ["SEO et lancement", "Le SEO technique, la structure des pages, les bases de classement, les analytiques et le soutien au lancement sont inclus."]
    ],
    work: {
      eyebrow: "Projets realises",
      title: "Des sites que j'ai crees.",
      lead: "De vraies entreprises propulsees par des sites que j'ai concus et developpes a partir de zero. Touchez-en un pour le voir en ligne.",
      visit: "Voir le site"
    },
    servicesPage: {
      eyebrow: "Services",
      title: "Des services web avec des prix clairs et une portee precise.",
      lead:
        "Commencez avec un site web professionnel, puis ajoutez l'hebergement gere si vous voulez que la maintenance, les rapports et l'amelioration SEO continue soient pris en charge."
    },
    services: [
      {
        label: "Service principal",
        name: "Site web professionnel",
        price: "1000 $ CAD",
        cadence: "paiement unique",
        description:
          "Un site web d'entreprise sur mesure concu pour presenter votre offre clairement, inspirer confiance rapidement et soutenir votre visibilite locale.",
        features: [
          "Appels Zoom pour comprendre votre entreprise",
          "Design complet sur mesure",
          "3 rondes de revisions",
          "SEO complet et configuration pour le classement",
          "Developpement adapte aux mobiles",
          "Contacts via WhatsApp, Messenger, courriel et formulaire",
          "Soutien pour mettre le site en ligne"
        ]
      },
      {
        label: "Option mensuelle",
        name: "Hebergement gere",
        price: "150 $ CAD",
        cadence: "par mois",
        description:
          "Hebergement et suivi pour les entrepreneurs qui veulent que le site soit surveille, maintenu et ameliore sans gerer la partie technique.",
        features: [
          "Hebergement mensuel securise",
          "Verifications mensuelles de maintenance",
          "SEO complet et soutien au classement",
          "Rapports analytiques mensuels",
          "SSL, sauvegardes, verifications de disponibilite et performance",
          "Petites mises a jour de contenu au besoin",
          "Soutien prioritaire en cas de probleme"
        ]
      }
    ],
    serviceAreas: {
      title: "Pages de services pour la recherche locale",
      lead: "Des pages ciblees aident les clients et les moteurs de recherche a comprendre les services web offerts."
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
      eyebrow: "Reserver une place",
      title: "Dites-moi ce qu'il faut creer.",
      lead:
        "Partagez les informations de base et je vous repondrai avec les prochaines etapes. Si vous avez deja un site, ajoutez-le pour que je puisse voir ce qui doit rester, changer ou etre reconstruit.",
      name: "Nom",
      email: "Courriel",
      phone: "Numero de telephone",
      industry: "Secteur d'activite",
      website: "Site actuel, si vous en avez un",
      message: "Infos sur le projet",
      messagePlaceholder: "Parlez-moi de l'entreprise, des pages necessaires, du delai et de ce que le site doit vous aider a accomplir.",
      submit: "Envoyer la demande",
      sending: "Envoi...",
      success: "Demande envoyee. Je vous repondrai bientot.",
      error: "Un probleme est survenu. Essayez par courriel ou WhatsApp."
    },
    reels: {
      eyebrow: "Instagram",
      title: "Voir les projets en video.",
      lead: "De courtes videos sur de vrais sites clients, les choix de design et le travail derriere chaque lancement. Suivez le tout sur Instagram.",
      views: "vues",
      follow: "Suivre sur Instagram"
    },
    footer: {
      line: "Sites web sur mesure, SEO, hebergement et soutien au lancement.",
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
      en: "An elegant storefront built to showcase fine jewelery and turn browsers into buyers.",
      fr: "Une vitrine elegante concue pour mettre en valeur la bijouterie fine et convertir les visiteurs en clients."
    }
  },
  {
    name: "Ciavaglia Timepieces",
    host: "ciavagliatimepieces.ca",
    url: "https://ciavagliatimepieces.ca",
    tag: { en: "Watchmaking", fr: "Horlogerie" },
    blurb: {
      en: "A refined site for a watchmaker, framing craftsmanship and heritage with quiet confidence.",
      fr: "Un site raffine pour un horloger, mettant en scene le savoir-faire et l'heritage avec elegance."
    }
  },
  {
    name: "Tooth Doctor Patel",
    host: "toothdoctorpatel.com",
    url: "https://toothdoctorpatel.com",
    tag: { en: "Dental practice", fr: "Clinique dentaire" },
    blurb: {
      en: "A trustworthy, easy-to-navigate site that helps a dental practice fill its appointment book.",
      fr: "Un site fiable et facile a parcourir qui aide une clinique dentaire a remplir son agenda."
    }
  }
];

const whatsappText = {
  en: "Hi, I want to Contact for a professional website.",
  fr: "Bonjour, je veux reserver une place pour un site web professionnel."
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
              <img src="/whop-course.png" alt="Polidori Dev web development course — Learn. Build. Launch." loading="lazy" />
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
