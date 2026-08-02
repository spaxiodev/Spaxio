import type { Metadata } from "next";
import type { SeoServicePageContent } from "@/components/SeoServicePage";

const SITE_URL = "https://polidori.dev";
const SITE_NAME = "Polidori Dev";

type SeoPage = SeoServicePageContent & {
  metaTitle: string;
  metaDescription: string;
};

export const seoServicePages: Record<string, SeoPage> = {
  "website-design": {
    slug: "website-design",
    metaTitle: "Website Design | Custom Business Websites",
    metaDescription:
      "Custom website design for small businesses that need a site people trust, that works on a phone, and that gets found on Google.",
    eyebrow: "Website design",
    title: "Custom website design for growing businesses.",
    lead:
      "I design business websites that make it obvious what you do, get people to trust you faster, and give Google a clean structure to work with.",
    primaryKeyword: "website design",
    secondaryKeywords: [
      "custom website design",
      "business website design",
      "small business web design",
      "responsive web design"
    ],
    serviceName: "Website Design",
    serviceDescription:
      "Custom website design for small businesses, including mobile responsive layouts, service page planning, conversion-focused content structure, and SEO setup.",
    sections: [
      {
        title: "Designed around how people actually decide",
        body:
          "A good business website is more than something that looks nice. The order of the sections, the way services are written, the proof you show, how easy it is to reach you, how it all behaves on a phone. Every one of those either helps someone pick up the phone or gives them a reason not to."
      },
      {
        title: "Built for search from day one",
        body:
          "Every design gets planned with search-friendly headings, internal links, proper service sections, metadata, and structured data. That's the groundwork that gives you a shot at ranking for something like website design."
      },
      {
        title: "You know the scope, and I help you launch",
        body:
          "The professional website package covers a custom design, responsive build, three rounds of revisions, SEO setup, analytics, and me helping you get the thing live."
      }
    ],
    deliverables: [
      "Custom homepage design",
      "Responsive mobile layout",
      "Service page structure",
      "Conversion-focused calls to action",
      "SEO metadata",
      "Image alt text guidance",
      "Analytics and launch checks"
    ],
    faq: [
      {
        question: "Do you design websites for small businesses?",
        answer:
          "Yes, that's most of what I do. Small businesses that need to look legitimate online, explain their services properly, and get found in search."
      },
      {
        question: "Is SEO included with website design?",
        answer:
          "Yes. The build covers technical SEO basics, metadata, page structure, structured data, responsive development, and launch checks. If you want SEO worked on month after month, that comes with managed hosting."
      },
      {
        question: "How much does a professional website cost?",
        answer:
          "$1000 CAD for the whole thing. That includes the first call, a custom design, three rounds of revisions, SEO setup, and help getting it live."
      }
    ]
  },
  "website-development": {
    slug: "website-development",
    metaTitle: "Website Development | Fast Business Websites",
    metaDescription:
      "Website development for fast, mobile-friendly business websites with technical SEO, working contact forms, analytics, and launch support.",
    eyebrow: "Website development",
    title: "Development that turns a design into something fast and useful.",
    lead:
      "I build custom websites with clean responsive code, quick load times, contact buttons that actually work, and the technical SEO groundwork search engines expect these days.",
    primaryKeyword: "website development",
    secondaryKeywords: [
      "web development",
      "business website development",
      "Next.js developer",
      "responsive website development"
    ],
    serviceName: "Website Development",
    serviceDescription:
      "Website development for businesses, including responsive front-end development, technical SEO, contact forms, analytics setup, hosting support, and launch checks.",
    sections: [
      {
        title: "Fast, and it works everywhere",
        body:
          "Your site gets built to run smoothly on phones, tablets, laptops, and desktops. Speed, accessibility, a clean page structure, and contact buttons that do what they say are all part of it, not extras."
      },
      {
        title: "Technical SEO happens while I build",
        body:
          "Getting found takes more than good writing. Metadata, schema, sitemaps, robots settings, proper headings, links Google can follow, and mobile speed all get sorted during the build rather than bolted on after."
      },
      {
        title: "I stick around for the launch",
        body:
          "Deployment, SSL checks, contact form setup, analytics, and a final pass over everything. The site goes live with nothing technical left dangling."
      }
    ],
    deliverables: [
      "Responsive website development",
      "Fast loading page structure",
      "Technical SEO setup",
      "Contact form integration",
      "WhatsApp, Messenger, email, and phone links",
      "Analytics setup",
      "Deployment and launch support"
    ],
    faq: [
      {
        question: "What platform do you use for website development?",
        answer:
          "I build with Next.js, React, and TypeScript, using static or server-rendered pages depending on what the project needs. No page builders, no bloated themes."
      },
      {
        question: "Can you rebuild an existing business website?",
        answer:
          "Yes. I'll go through what you have first, look at the content, structure, SEO problems, and why people aren't converting, then rebuild the parts that need it."
      },
      {
        question: "Does development include mobile optimization?",
        answer:
          "Yes, always. The site is built to read clearly on phones and desktops alike. Most of your visitors will be on a phone anyway."
      }
    ]
  },
  "seo": {
    slug: "seo",
    metaTitle: "SEO | Search Optimization for Business Websites",
    metaDescription:
      "SEO for small business websites: technical SEO, structured data, service pages, analytics, and steady ranking improvements.",
    eyebrow: "SEO",
    title: "SEO for businesses that aren't showing up.",
    lead:
      "I handle the technical SEO, the service page structure, the structured data, and the reporting, so your site has a real foundation to compete in search instead of sitting on page four.",
    primaryKeyword: "SEO",
    secondaryKeywords: [
      "local SEO",
      "small business SEO",
      "technical SEO",
      "website ranking support"
    ],
    serviceName: "SEO",
    serviceDescription:
      "Local SEO and technical SEO support for business websites, including metadata, structured data, sitemap setup, service page planning, analytics, and on-page optimization.",
    sections: [
      {
        title: "Answer the question, don't stuff keywords",
        body:
          "To rank for something like website design or website development, a page has to actually answer what the person typed in. That means useful, focused content, not the same phrase repeated twenty times."
      },
      {
        title: "The technical side, plus pages worth reading",
        body:
          "Metadata, sitemaps, schema, heading structure, internal links, fast mobile pages, and service pages that explain the business in plain terms. Both halves matter, and one without the other doesn't get you far."
      },
      {
        title: "Numbers, so you know what's working",
        body:
          "Analytics and monthly reports show which pages people land on, which contact buttons they press, and where the content needs another look."
      }
    ],
    deliverables: [
      "Technical SEO audit",
      "Page titles and descriptions",
      "Structured data",
      "Sitemap and robots review",
      "Service page planning",
      "Internal linking improvements",
      "Analytics reporting"
    ],
    faq: [
      {
        question: "Can SEO guarantee first place on Google?",
        answer:
          "No, and anyone who promises that is lying to you. What good SEO does is fix the technical foundation, sharpen the content, and track the results, so the site has a real chance to compete."
      },
      {
        question: "What SEO is included in the website package?",
        answer:
          "The $1000 CAD build covers the basics: metadata, page structure, structured data, sitemap coverage, responsive development, and launch checks."
      },
      {
        question: "Do you offer ongoing SEO support?",
        answer:
          "Yes, through managed hosting. That gets you continued SEO work, monthly analytics reports, maintenance and uptime checks, and small content updates as you need them."
      }
    ]
  },
  "website-hosting": {
    slug: "website-hosting",
    metaTitle: "Website Hosting | Managed Hosting and Maintenance",
    metaDescription:
      "Managed website hosting with maintenance checks, SSL, backups, uptime monitoring, analytics reports, SEO work, and priority support.",
    eyebrow: "Website hosting",
    title: "Hosting for owners who'd rather not think about it.",
    lead:
      "Secure hosting, maintenance checks, uptime monitoring, monthly reports, and ongoing SEO. You run your business and I keep the site running.",
    primaryKeyword: "website hosting",
    secondaryKeywords: [
      "managed website hosting",
      "business website maintenance",
      "website support",
      "monthly website hosting"
    ],
    serviceName: "Managed Website Hosting",
    serviceDescription:
      "Managed website hosting and maintenance for businesses, including SSL, backups, uptime checks, performance monitoring, analytics reports, small updates, and SEO support.",
    sections: [
      {
        title: "Maintenance is part of the deal",
        body:
          "The technical side of your site shouldn't become one more thing on your list. Every month includes monitoring, maintenance checks, and priority support if something goes wrong."
      },
      {
        title: "The work doesn't stop at launch",
        body:
          "A site that gets ignored after launch slowly falls behind. Monthly reports and ongoing SEO show you what's working once real visitors start showing up, and where there's room to do better."
      },
      {
        title: "Small changes, handled",
        body:
          "Prices change, hours change, you add a service, you switch phone numbers. Send it over and I'll update it, so what people read is what's actually true."
      }
    ],
    deliverables: [
      "Secure managed hosting",
      "SSL support",
      "Backups",
      "Uptime checks",
      "Performance monitoring",
      "Monthly analytics reports",
      "SEO support",
      "Small content updates"
    ],
    faq: [
      {
        question: "How much is managed website hosting?",
        answer:
          "$150 CAD a month. That covers hosting, maintenance checks, SEO work, analytics reports, SSL, backups, uptime checks, and priority support."
      },
      {
        question: "Is hosting required with the website build?",
        answer:
          "No. It's completely optional, for owners who'd rather have the maintenance, support, reporting, and improvements handled for them."
      },
      {
        question: "Can you host a website you already built?",
        answer:
          "Yes. Managed hosting is meant for sites I've built, and it covers maintenance, reporting, small updates, and launch checks."
      }
    ]
  }
};

export function buildSeoMetadata(slug: keyof typeof seoServicePages): Metadata {
  const page = seoServicePages[slug];
  const url = `${SITE_URL}/${page.slug}`;

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: [page.primaryKeyword, ...page.secondaryKeywords, SITE_NAME, "web agency"],
    alternates: {
      canonical: url
    },
    openGraph: {
      type: "website",
      url,
      siteName: SITE_NAME,
      locale: "en_CA",
      title: page.metaTitle,
      description: page.metaDescription,
      images: [
        {
          url: "/logo.png",
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} - ${page.serviceName}`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.metaDescription,
      images: ["/logo.png"]
    }
  };
}
