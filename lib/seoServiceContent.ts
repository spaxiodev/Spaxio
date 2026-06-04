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
      "Custom website design for small businesses that need a credible, mobile-friendly site built for SEO, trust, and booked calls.",
    eyebrow: "Website design",
    title: "Custom website design for growing businesses.",
    lead:
      "Polidori Dev designs business websites that make your offer clear, help customers trust you faster, and give search engines a stronger page structure to understand.",
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
        title: "Designed around the way customers decide",
        body:
          "A strong business website is not just visual polish. The page order, service copy, proof points, contact paths, and mobile layout all need to help visitors quickly understand why they should contact you."
      },
      {
        title: "Built for search from the start",
        body:
          "Each design is planned with search-friendly headings, internal links, service sections, metadata, and structured data so your website has a better foundation for searches like website design."
      },
      {
        title: "Clear scope and launch support",
        body:
          "The professional website package includes a custom design, responsive development, three revision rounds, SEO setup, analytics basics, and support to get the site live."
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
          "Yes. Polidori Dev focuses on custom websites for businesses that need a credible online presence, clearer service pages, and better search visibility."
      },
      {
        question: "Is SEO included with website design?",
        answer:
          "The website build includes technical SEO basics, metadata, page structure, structured data, mobile responsive development, and launch checks. Ongoing SEO support is available with managed hosting."
      },
      {
        question: "How much does a professional website cost?",
        answer:
          "The core professional website build is $1000 CAD and includes discovery, custom design, three revision rounds, SEO setup, and launch support."
      }
    ]
  },
  "website-development": {
    slug: "website-development",
    metaTitle: "Website Development | Fast Business Websites",
    metaDescription:
      "Website development for fast, mobile-friendly business websites with technical SEO, contact flows, analytics, and launch support.",
    eyebrow: "Website development",
    title: "Website development that turns design into a fast business tool.",
    lead:
      "Polidori Dev builds custom websites with clean responsive code, fast loading, reliable contact paths, and the technical SEO foundation needed for modern search.",
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
        title: "Fast, responsive implementation",
        body:
          "Your website is developed to work smoothly across phones, tablets, laptops, and desktops. Performance, accessibility, clean page structure, and reliable contact actions are part of the build."
      },
      {
        title: "Technical SEO is handled during development",
        body:
          "Search visibility depends on more than copy. Metadata, schema, sitemap coverage, robots settings, semantic headings, crawlable links, and mobile performance all matter during development."
      },
      {
        title: "Launch support after the code is ready",
        body:
          "The process includes deployment support, SSL checks, contact form setup, analytics setup, and final QA so the website can go live without leaving the technical pieces unfinished."
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
          "Polidori Dev builds modern custom websites with technologies such as Next.js, React, TypeScript, and optimized static or server-rendered pages depending on the project."
      },
      {
        question: "Can you rebuild an existing business website?",
        answer:
          "Yes. Existing websites can be reviewed for content, structure, SEO issues, and conversion problems before rebuilding the parts that need to change."
      },
      {
        question: "Does development include mobile optimization?",
        answer:
          "Yes. Responsive development is included so the website works clearly across common mobile and desktop screen sizes."
      }
    ]
  },
  "seo": {
    slug: "seo",
    metaTitle: "SEO | Search Optimization for Business Websites",
    metaDescription:
      "SEO support for small business websites, including technical SEO, structured data, service pages, analytics, and ranking improvements.",
    eyebrow: "SEO",
    title: "SEO setup for websites that need better visibility.",
    lead:
      "Polidori Dev adds technical SEO, clear service architecture, structured data, and reporting basics so your business website has a stronger foundation for organic search.",
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
        title: "Search intent before keyword stuffing",
        body:
          "Ranking for searches like website design and website development requires pages that directly answer the search intent. The goal is useful, focused content that matches what customers are trying to find."
      },
      {
        title: "Technical SEO plus useful service pages",
        body:
          "SEO work includes metadata, sitemap coverage, schema, heading structure, internal links, fast mobile pages, and dedicated service pages that describe the business clearly."
      },
      {
        title: "Measurement for ongoing improvement",
        body:
          "Analytics and monthly reporting help show which pages are getting attention, which contact paths are working, and where content can be improved over time."
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
          "No ethical SEO provider can guarantee first place. Good SEO improves the technical foundation, content relevance, and measurement so the site has a better chance to compete."
      },
      {
        question: "What SEO is included in the website package?",
        answer:
          "The $1000 CAD website build includes SEO basics such as metadata, page structure, structured data, sitemap coverage, mobile responsive development, and launch checks."
      },
      {
        question: "Do you offer ongoing SEO support?",
        answer:
          "Yes. Managed hosting includes ongoing SEO support, monthly analytics reports, maintenance checks, uptime checks, and small content updates when needed."
      }
    ]
  },
  "website-hosting": {
    slug: "website-hosting",
    metaTitle: "Website Hosting | Managed Hosting and Maintenance",
    metaDescription:
      "Managed website hosting with maintenance checks, SSL, backups, uptime monitoring, analytics reports, SEO support, and priority support.",
    eyebrow: "Website hosting",
    title: "Managed website hosting for business owners who want support.",
    lead:
      "Polidori Dev offers managed hosting for business websites that need secure hosting, maintenance checks, uptime monitoring, analytics reports, and ongoing SEO support.",
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
        title: "Hosting with maintenance built in",
        body:
          "Managed hosting keeps the technical side of the site from becoming another task on your list. The monthly service includes monitoring, maintenance checks, and priority support for site issues."
      },
      {
        title: "SEO and reporting continue after launch",
        body:
          "A website should not be ignored after it goes live. Monthly reports and SEO support help identify search and conversion opportunities as the site starts collecting real visitor data."
      },
      {
        title: "Support for practical content updates",
        body:
          "Small updates can be handled as your offer, hours, services, or contact details change, which helps the site stay accurate for customers and search engines."
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
          "Managed hosting is $150 CAD per month and includes hosting, maintenance checks, SEO support, analytics reports, SSL, backups, uptime checks, and priority support."
      },
      {
        question: "Is hosting required with the website build?",
        answer:
          "No. Managed hosting is an optional monthly add-on for business owners who want maintenance, support, reporting, and ongoing improvements handled for them."
      },
      {
        question: "Can you host a website you already built?",
        answer:
          "Yes. Managed hosting is designed for websites built by Polidori Dev, with support for maintenance, reporting, small updates, and launch checks."
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
