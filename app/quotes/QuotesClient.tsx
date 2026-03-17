"use client";

import { useTheme } from "../useTheme";

export default function QuotesClient() {
  const { isDark, toggleTheme } = useTheme();
  const logoSrc = isDark ? "/darkmodelogo.png" : "/logo.png";

  return (
    <main className="page">
      <header className="overlay-header faq-header">
        <div className="logo-banner">
          <img src={logoSrc} alt="Spaxio logo" />
        </div>
        <div className="nav" aria-label="Theme switcher">
          <button
            className="button secondary"
            style={{ padding: "10px 14px", borderRadius: 10 }}
            onClick={toggleTheme}
            aria-pressed={isDark}
          >
            {isDark ? "Light mode" : "Dark mode"}
          </button>
          <a className="button secondary" href="/" style={{ padding: "10px 14px", borderRadius: 10 }}>
            Back to home
          </a>
        </div>
      </header>

      <section className="hero" id="quotes">
        <div className="badge">Quotes</div>
        <div className="hero-grid">
          <div>
            <h1 className="tagline">Get a quote in minutes</h1>
            <p className="lead">
              Tell the assistant what you’re building and your budget range. You’ll get a fast, scoped quote and next steps.
            </p>
            <div className="cards" style={{ marginTop: 18 }}>
              <div className="card">
                <h3>What to share</h3>
                <p>Pages, references, timeline, must-have features, and any integrations (booking, CRM, payments, etc.).</p>
              </div>
            </div>
          </div>
          <div className="cards" />
        </div>
      </section>

      <section style={{ width: "min(1100px, 94vw)", margin: "0 auto" }}>
        <iframe
          src="https://www.spaxioassistant.com/en/a/quote?embed=1"
          title="Assistant"
          width="100%"
          height="600"
          frameBorder={0}
          style={{ border: "0", borderRadius: 14 }}
          allow="clipboard-write"
        />
      </section>

      <footer>
        <p style={{ marginTop: "8px", color: "var(--muted)" }}>© 2026 Spaxio. All rights reserved.</p>
        <div className="footer-contact">
          <span className="label">Contact</span>
          <a href="tel:+15145160515">+1 514-516-0515</a>
          <span className="dot">·</span>
          <a href="mailto:polidorispaxio@gmail.com">polidorispaxio@gmail.com</a>
        </div>
      </footer>
    </main>
  );
}

