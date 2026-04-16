"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

const WorldScene = dynamic(() => import("@/components/WorldScene"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

type Lang = "en" | "fr";

const copy = {
  en: {
    hero: {
      name: "Spaxio",
      tagline: "Luxury Web Development",
      sub: "We build websites that look like a million bucks — at prices that make sense.",
    },
    about: {
      title: "About",
      lines: [
        "Founded in Montreal, 2026.",
        "One developer. Zero bloat.",
        "",
        "Obsessive attention to detail meets lean, efficient production.",
        "Luxury watchmaking precision — applied to web development.",
        "",
        "Stack: Next.js, React, Vercel, AI",
        "Clients across Canada & U.S.",
      ],
    },
    skills: {
      title: "Tech Stack",
      items: ["Next.js", "React", "TypeScript", "Node.js", "Tailwind CSS", "Three.js", "Vercel", "AI / LLM"],
    },
    services: {
      title: "What I Build",
      items: [
        { title: "Web Design & Dev", body: "Custom sites from scratch with Next.js. No templates — clean code, sharp design." },
        { title: "Launch & Support", body: "Deployed on Vercel with SMTP, analytics, and SEO baked in." },
      ],
      work: [
        { title: "Ciavaglia Timepieces", url: "https://ciavagliatimepieces.ca" },
        { title: "Spaxio Assistant", url: "https://www.spaxioassistant.com" },
      ],
    },
    contact: {
      title: "New Message",
      name: "Name", email: "Email", projectType: "Project Type", budget: "Budget",
      message: "What can I build for you?", send: "Send Message", sending: "Sending...",
      success: "Message sent successfully",
      error: "Failed to send. Please try again.",
      projectTypes: ["Website", "E-commerce", "Landing page", "Redesign", "Other"],
      budgets: ["Under $2k", "$2k – $5k", "$5k – $10k", "$10k+", "Not sure yet"],
      emailAddr: "polidorispaxio@gmail.com",
    },
    footer: "© 2026 Spaxio",
    privacy: "Privacy Policy",
    scrollHint: "Scroll to explore",
  },
  fr: {
    hero: {
      name: "Spaxio",
      tagline: "Développement Web de Luxe",
      sub: "On crée des sites qui ont l'air d'un million — à des prix qui ont du sens.",
    },
    about: {
      title: "À propos",
      lines: [
        "Fondé à Montréal, 2026.",
        "Un développeur. Zéro surplus.",
        "",
        "Un souci obsessif du détail avec une production lean et efficace.",
        "Précision horlogère — appliquée au développement web.",
        "",
        "Stack: Next.js, React, Vercel, IA",
        "Clients au Canada et aux États-Unis.",
      ],
    },
    skills: {
      title: "Technologies",
      items: ["Next.js", "React", "TypeScript", "Node.js", "Tailwind CSS", "Three.js", "Vercel", "IA / LLM"],
    },
    services: {
      title: "Ce que je construis",
      items: [
        { title: "Design & développement", body: "Sites sur mesure avec Next.js. Pas de templates — du code propre, un design taillé." },
        { title: "Lancement & support", body: "Déployé sur Vercel avec SMTP, analytics et SEO intégrés." },
      ],
      work: [
        { title: "Ciavaglia Timepieces", url: "https://ciavagliatimepieces.ca" },
        { title: "Spaxio Assistant", url: "https://www.spaxioassistant.com" },
      ],
    },
    contact: {
      title: "Nouveau message",
      name: "Nom", email: "Courriel", projectType: "Type de projet", budget: "Budget",
      message: "Que puis-je construire pour vous?", send: "Envoyer", sending: "Envoi...",
      success: "Message envoyé avec succès",
      error: "Échec de l'envoi. Réessayez.",
      projectTypes: ["Site web", "E-commerce", "Page d'atterrissage", "Redesign", "Autre"],
      budgets: ["Moins de 2k$", "2k$ – 5k$", "5k$ – 10k$", "10k$+", "Pas encore sûr"],
      emailAddr: "polidorispaxio@gmail.com",
    },
    footer: "© 2026 Spaxio",
    privacy: "Politique de confidentialité",
    scrollHint: "Défilez pour explorer",
  },
} satisfies Record<Lang, any>;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", name: "Spaxio", url: "https://spaxio.ca", logo: "https://spaxio.ca/logo.png" },
    { "@type": "WebSite", name: "Spaxio", url: "https://spaxio.ca", inLanguage: ["en-CA", "fr-CA"] },
    { "@type": "Service", name: "Luxury-inspired web design and development", serviceType: "Web design and development", provider: { "@type": "Organization", name: "Spaxio", url: "https://spaxio.ca" } },
  ],
};

export default function HomePage() {
  const [lang, setLang] = useState<Lang>("en");
  const t = useMemo(() => copy[lang], [lang]);
  const scrollProgress = useRef(0);
  const [progress, setProgress] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({ name: "", email: "", projectType: "", budget: "", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [notification, setNotification] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (!res.ok) throw new Error();
      setFormStatus("sent");
      setForm({ name: "", email: "", projectType: "", budget: "", message: "" });
      setNotification(true);
      setTimeout(() => setNotification(false), 4000);
    } catch {
      setFormStatus("error");
      setNotification(true);
      setTimeout(() => setNotification(false), 4000);
    }
  };

  useEffect(() => {
    const lenis = new Lenis({
      duration: 2.5,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1,
    });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time: number) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.create({
      trigger: scrollRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 2.5,
      onUpdate: (self) => {
        scrollProgress.current = self.progress;
        setProgress(self.progress);
      },
    });

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  // Smooth opacity ramps
  const fade = (start: number, peakStart: number, peakEnd: number, end: number) => {
    const p = progress;
    if (p < start || p > end) return 0;
    if (p < peakStart) return (p - start) / (peakStart - start);
    if (p > peakEnd) return 1 - (p - peakEnd) / (end - peakEnd);
    return 1;
  };

  const heroOp = Math.max(0, 1 - progress * 7);
  const aboutOp = fade(0.14, 0.2, 0.3, 0.38);
  const skillsOp = fade(0.32, 0.38, 0.48, 0.55);
  const servicesOp = fade(0.50, 0.56, 0.68, 0.76);
  const contactOp = Math.min(1, Math.max(0, (progress - 0.82) * 6));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <WorldScene scrollProgress={scrollProgress} />

      {/* ── Nav ── */}
      <nav className="site-nav">
        <button onClick={() => setLang(lang === "en" ? "fr" : "en")} className="lang-btn">
          {lang === "en" ? "FR" : "EN"}
        </button>
      </nav>

      {/* ── Vignette ── */}
      <div className="vignette" />

      {/* ═══ OVERLAYS ═══ */}

      {/* Hero */}
      <div className={`ov ov-hero ${heroOp > 0.01 ? "active" : ""}`} style={{ opacity: heroOp }}>
        <h1 className="hero-name">{t.hero.name}</h1>
        <p className="hero-tag">{t.hero.tagline}</p>
        <p className="hero-sub">{t.hero.sub}</p>
        <div className="scroll-hint">
          <span>{t.scrollHint}</span>
          <div className="scroll-bar" />
        </div>
      </div>

      {/* About */}
      <div className={`ov ov-side-left ${aboutOp > 0.01 ? "active" : ""}`} style={{ opacity: aboutOp }}>
        <div className="warm-panel">
          <h2 className="panel-title">{t.about.title}</h2>
          <div className="panel-lines">
            {t.about.lines.map((l: string, i: number) => (
              <p key={i}>{l || "\u00A0"}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className={`ov ov-side-right ${skillsOp > 0.01 ? "active" : ""}`} style={{ opacity: skillsOp }}>
        <div className="warm-panel">
          <h2 className="panel-title">{t.skills.title}</h2>
          <div className="skill-grid">
            {t.skills.items.map((s: string) => (
              <div className="skill-chip" key={s}>{s}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Services */}
      <div className={`ov ${servicesOp > 0.01 ? "active" : ""}`} style={{ opacity: servicesOp }}>
        <div className="svc-panel">
          <h2 className="panel-title">{t.services.title}</h2>
          <div className="svc-grid">
            {t.services.items.map((s: any) => (
              <div className="svc-card" key={s.title}>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
          <div className="svc-work">
            {t.services.work.map((w: any) => (
              <a key={w.title} href={w.url} target="_blank" rel="noopener noreferrer" className="work-link">
                {w.title} &rarr;
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Contact — macOS MacBook screen */}
      <div className={`ov ov-contact ${contactOp > 0.01 ? "active" : ""}`} style={{ opacity: contactOp }}>
        <div className="macbook-screen">
          <div className="mac-titlebar">
            <div className="mac-dots">
              <span className="mac-dot red" />
              <span className="mac-dot yellow" />
              <span className="mac-dot green" />
            </div>
            <span className="mac-title">{t.contact.title}</span>
          </div>
          <form onSubmit={handleSubmit} className="mac-form">
            <div className="mac-row">
              <label>
                <span>{t.contact.name}</span>
                <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </label>
              <label>
                <span>{t.contact.email}</span>
                <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </label>
            </div>
            <div className="mac-row">
              <label>
                <span>{t.contact.projectType}</span>
                <select value={form.projectType} onChange={(e) => setForm({ ...form, projectType: e.target.value })}>
                  <option value="">—</option>
                  {t.contact.projectTypes.map((pt: string) => <option key={pt} value={pt}>{pt}</option>)}
                </select>
              </label>
              <label>
                <span>{t.contact.budget}</span>
                <select value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })}>
                  <option value="">—</option>
                  {t.contact.budgets.map((b: string) => <option key={b} value={b}>{b}</option>)}
                </select>
              </label>
            </div>
            <label className="mac-full">
              <span>{t.contact.message}</span>
              <textarea required rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
            </label>
            <div className="mac-footer">
              <button type="submit" className="mac-send" disabled={formStatus === "sending"}>
                {formStatus === "sending" ? t.contact.sending : t.contact.send}
              </button>
              <a href={`mailto:${t.contact.emailAddr}`} className="mac-email">{t.contact.emailAddr}</a>
            </div>
          </form>
          <p className="privacy-notice">
            Your information is collected solely to respond to your inquiry and will not be shared with third parties.{" "}
            See our <a href="/privacy">Privacy Policy</a> for details.
          </p>
        </div>

        {/* macOS notification */}
        <div className={`mac-notif ${notification ? "show" : ""}`}>
          <div className="notif-icon">{formStatus === "sent" ? "✓" : "✕"}</div>
          <div className="notif-text">
            <strong>Spaxio</strong>
            <span>{formStatus === "sent" ? t.contact.success : t.contact.error}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={`ov ov-footer ${contactOp > 0.01 ? "active" : ""}`} style={{ opacity: contactOp * 0.6 }}>
        <p>{t.footer}</p>
        <div className="footer-links">
          <Link href="/privacy-policy" className="footer-link">{t.privacy}</Link>
        </div>
      </div>

      {/* Scroll spacer */}
      <div ref={scrollRef} className="scroll-spacer" />
    </>
  );
}
