import Link from "next/link";

export type SeoServicePageContent = {
  slug: string;
  eyebrow: string;
  title: string;
  lead: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  serviceName: string;
  serviceDescription: string;
  sections: Array<{
    title: string;
    body: string;
  }>;
  deliverables: string[];
  faq: Array<{
    question: string;
    answer: string;
  }>;
};

const SITE_URL = "https://polidori.dev";
const SITE_NAME = "Polidori Dev";
const PHONE_E164 = "15145160515";
const EMAIL = "contact@polidori.dev";

export default function SeoServicePage({ content }: { content: SeoServicePageContent }) {
  const pageUrl = `${SITE_URL}/${content.slug}`;
  const whatsappUrl = `https://wa.me/${PHONE_E164}?text=${encodeURIComponent(
    `Hi, I am interested in ${content.serviceName}.`
  )}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_URL
          },
          {
            "@type": "ListItem",
            position: 2,
            name: content.serviceName,
            item: pageUrl
          }
        ]
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: content.serviceName,
        serviceType: content.primaryKeyword,
        description: content.serviceDescription,
        provider: {
          "@type": "ProfessionalService",
          name: SITE_NAME,
          url: SITE_URL,
          telephone: `+${PHONE_E164}`,
          email: EMAIL,
          address: {
            "@type": "PostalAddress",
            addressCountry: "CA"
          }
        },
        areaServed: [{ "@type": "Country", name: "Canada" }],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `${content.serviceName} deliverables`,
          itemListElement: content.deliverables.map((deliverable) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: deliverable
            }
          }))
        }
      },
      {
        "@type": "FAQPage",
        mainEntity: content.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer
          }
        }))
      }
    ]
  };

  return (
    <main className="mk-page seo-landing">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="mk-header">
        <Link href="/" className="mk-brand" aria-label={`${SITE_NAME} home`}>
          <img src="/logo.png" alt="" className="mk-brand-mark" width="44" height="44" />
          <span>{SITE_NAME}</span>
        </Link>
        <nav className="mk-nav" aria-label="Primary">
          <Link href="/">Home</Link>
          <Link href="/services">Services</Link>
          <a href={whatsappUrl} target="_blank" rel="noreferrer">Contact</a>
        </nav>
      </header>

      <section className="seo-hero">
        <p className="mk-eyebrow">{content.eyebrow}</p>
        <h1>{content.title}</h1>
        <p>{content.lead}</p>
        <div className="mk-actions">
          <a className="mk-btn mk-btn-primary" href={whatsappUrl} target="_blank" rel="noreferrer">
            Talk about a project
          </a>
          <Link className="mk-btn mk-btn-secondary" href="/services">
            View pricing
          </Link>
        </div>
      </section>

      <section className="seo-keywords" aria-label="Service focus">
        <strong>{content.primaryKeyword}</strong>
        {content.secondaryKeywords.map((keyword) => (
          <span key={keyword}>{keyword}</span>
        ))}
      </section>

      <section className="seo-copy-grid" aria-labelledby="seo-overview-title">
        <div>
          <p className="mk-eyebrow">Search focus</p>
          <h2 id="seo-overview-title">{content.serviceName} for growing businesses</h2>
        </div>
        <div className="seo-copy-stack">
          {content.sections.map((section) => (
            <article key={section.title}>
              <h3>{section.title}</h3>
              <p>{section.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="seo-deliverables" aria-labelledby="seo-deliverables-title">
        <div className="mk-section-head">
          <p className="mk-eyebrow">What you get</p>
          <h2 id="seo-deliverables-title">Everything that comes with it.</h2>
        </div>
        <div>
          {content.deliverables.map((deliverable) => (
            <span key={deliverable}>{deliverable}</span>
          ))}
        </div>
      </section>

      <section className="seo-faq" aria-labelledby="seo-faq-title">
        <h2 id="seo-faq-title">Common questions</h2>
        <div>
          {content.faq.map((item) => (
            <article key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mk-contact-methods" aria-labelledby="seo-contact-title">
        <h2 id="seo-contact-title">Want to talk about your site?</h2>
        <div>
          <a href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp</a>
          <a href={`mailto:${EMAIL}`}>Email</a>
          <a href={`tel:+${PHONE_E164}`}>Call</a>
        </div>
      </section>

      <footer className="mk-footer">
        <p>Custom websites, SEO, hosting, and a hand getting it all live.</p>
        <div>
          <Link href="/">Home</Link>
          <Link href="/services">Services</Link>
          <Link href="/privacy-policy">Privacy</Link>
        </div>
      </footer>
    </main>
  );
}
