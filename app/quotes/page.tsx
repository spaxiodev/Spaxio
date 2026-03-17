export const metadata = {
  title: "Quotes"
};

export default function QuotesPage() {
  return (
    <main className="page">
      <section className="hero" id="quotes">
        <div className="badge">Quotes</div>
        <div className="hero-grid">
          <div>
            <h1 className="tagline">Get a quote</h1>
            <p className="lead">Chat with the assistant to get your quote.</p>
            <div className="cta-row">
              <a className="button secondary" href="/">
                Back to home
              </a>
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
    </main>
  );
}

