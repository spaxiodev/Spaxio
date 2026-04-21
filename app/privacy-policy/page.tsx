"use client";

import { useState } from "react";
import Link from "next/link";

type Lang = "en" | "fr";

const content = {
  en: {
    title: "Privacy Policy",
    lastUpdated: "Last updated: April 16, 2026",
    backHome: "Back to home",
    sections: [
      {
        heading: "1. Information We Collect",
        body: `When you use our contact form, we collect the following personal information:

• **Name** — to address you properly in our response.
• **Email address** — to reply to your inquiry.
• **Project type and budget** — to understand the scope of your request.
• **Message content** — the details of your inquiry.

We do not collect any information beyond what you voluntarily submit through the contact form.`,
      },
      {
        heading: "2. Why We Collect This Information",
        body: `We collect your personal information solely to:

• Respond to your inquiries and provide the services you request.
• Follow up on potential projects.
• Improve our services based on the types of inquiries we receive.

We will never use your information for unsolicited marketing or sell it to third parties.`,
      },
      {
        heading: "3. How Long We Keep Your Data",
        body: `We retain the personal information you submit through our contact form for up to **12 months** from the date of your inquiry, unless an ongoing business relationship requires us to keep it longer. After this period, your data is permanently deleted from our systems.`,
      },
      {
        heading: "4. Third-Party Services",
        body: `We use the following third-party services that may process your data:

• **Formspree** — Our contact form submissions are processed through Formspree. Their privacy policy is available at [formspree.io/legal/privacy-policy](https://formspree.io/legal/privacy-policy).
• **Google Analytics** — We use Google Analytics to understand how visitors interact with our website. This service collects anonymized usage data such as pages visited, session duration, and general geographic location. No personally identifiable information is shared with Google Analytics. You can opt out using the [Google Analytics Opt-out Browser Add-on](https://tools.google.com/dlpage/gaoptout).
• **Vercel** — Our website is hosted on Vercel. Vercel may collect standard server logs including IP addresses. See [vercel.com/legal/privacy-policy](https://vercel.com/legal/privacy-policy).

We do not sell, rent, or trade your personal information to any other third party.`,
      },
      {
        heading: "5. Cookies",
        body: `Our website may use cookies set by third-party analytics services (such as Google Analytics). These cookies help us understand site usage and improve our services. You can disable cookies through your browser settings at any time.`,
      },
      {
        heading: "6. Your Rights & Data Deletion",
        body: `You have the right to:

• **Access** the personal data we hold about you.
• **Correct** any inaccurate information.
• **Request deletion** of your personal data from our systems.
• **Withdraw consent** for data processing at any time.

To exercise any of these rights, please contact us using the information below. We will respond to your request within **30 days**.`,
      },
      {
        heading: "7. Contact — Privacy Officer",
        body: `If you have any questions about this privacy policy or wish to make a data-related request, please contact:

**Stefano Polidori**
Privacy Officer, Spaxio
Email: [contact@spaxio.ca](mailto:contact@spaxio.ca)
Website: [spaxio.ca](https://spaxio.ca)`,
      },
      {
        heading: "8. Changes to This Policy",
        body: `We may update this privacy policy from time to time. Any changes will be posted on this page with a revised "Last updated" date. We encourage you to review this policy periodically.`,
      },
    ],
  },
  fr: {
    title: "Politique de confidentialité",
    lastUpdated: "Dernière mise à jour : 16 avril 2026",
    backHome: "Retour à l'accueil",
    sections: [
      {
        heading: "1. Informations collectées",
        body: `Lorsque vous utilisez notre formulaire de contact, nous recueillons les informations personnelles suivantes :

• **Nom** — pour vous adresser correctement dans notre réponse.
• **Adresse courriel** — pour répondre à votre demande.
• **Type de projet et budget** — pour comprendre la portée de votre demande.
• **Contenu du message** — les détails de votre demande.

Nous ne collectons aucune information au-delà de ce que vous soumettez volontairement via le formulaire de contact.`,
      },
      {
        heading: "2. Pourquoi nous collectons ces informations",
        body: `Nous collectons vos informations personnelles uniquement pour :

• Répondre à vos demandes et fournir les services que vous sollicitez.
• Assurer un suivi sur les projets potentiels.
• Améliorer nos services en fonction des types de demandes que nous recevons.

Nous n'utiliserons jamais vos informations pour du marketing non sollicité et ne les vendrons jamais à des tiers.`,
      },
      {
        heading: "3. Durée de conservation des données",
        body: `Nous conservons les informations personnelles que vous soumettez via notre formulaire de contact pendant un maximum de **12 mois** à compter de la date de votre demande, sauf si une relation d'affaires en cours nécessite une conservation plus longue. Après cette période, vos données sont définitivement supprimées de nos systèmes.`,
      },
      {
        heading: "4. Services tiers",
        body: `Nous utilisons les services tiers suivants qui peuvent traiter vos données :

• **Formspree** — Les soumissions de notre formulaire de contact sont traitées par Formspree. Leur politique de confidentialité est disponible à [formspree.io/legal/privacy-policy](https://formspree.io/legal/privacy-policy).
• **Google Analytics** — Nous utilisons Google Analytics pour comprendre comment les visiteurs interagissent avec notre site. Ce service collecte des données d'utilisation anonymisées telles que les pages visitées, la durée des sessions et la localisation géographique générale. Aucune information personnellement identifiable n'est partagée avec Google Analytics. Vous pouvez vous désinscrire via le [module complémentaire de navigateur pour la désactivation de Google Analytics](https://tools.google.com/dlpage/gaoptout).
• **Vercel** — Notre site est hébergé sur Vercel. Vercel peut collecter des journaux serveur standard incluant les adresses IP. Voir [vercel.com/legal/privacy-policy](https://vercel.com/legal/privacy-policy).

Nous ne vendons, ne louons et n'échangeons vos informations personnelles avec aucun autre tiers.`,
      },
      {
        heading: "5. Cookies",
        body: `Notre site web peut utiliser des cookies définis par des services d'analyse tiers (comme Google Analytics). Ces cookies nous aident à comprendre l'utilisation du site et à améliorer nos services. Vous pouvez désactiver les cookies via les paramètres de votre navigateur à tout moment.`,
      },
      {
        heading: "6. Vos droits et suppression des données",
        body: `Vous avez le droit de :

• **Accéder** aux données personnelles que nous détenons à votre sujet.
• **Corriger** toute information inexacte.
• **Demander la suppression** de vos données personnelles de nos systèmes.
• **Retirer votre consentement** au traitement des données à tout moment.

Pour exercer l'un de ces droits, veuillez nous contacter en utilisant les coordonnées ci-dessous. Nous répondrons à votre demande dans un délai de **30 jours**.`,
      },
      {
        heading: "7. Contact — Responsable de la confidentialité",
        body: `Si vous avez des questions concernant cette politique de confidentialité ou souhaitez faire une demande relative à vos données, veuillez contacter :

**Stefano Polidori**
Responsable de la confidentialité, Spaxio
Courriel : [contact@spaxio.ca](mailto:contact@spaxio.ca)
Site web : [spaxio.ca](https://spaxio.ca)`,
      },
      {
        heading: "8. Modifications de cette politique",
        body: `Nous pouvons mettre à jour cette politique de confidentialité de temps à autre. Toute modification sera publiée sur cette page avec une date de « Dernière mise à jour » révisée. Nous vous encourageons à consulter cette politique périodiquement.`,
      },
    ],
  },
};

function renderMarkdown(text: string) {
  const lines = text.split("\n");
  return lines.map((line, i) => {
    // Convert **bold** to <strong>
    const parts: (string | JSX.Element)[] = [];
    const regex = /\*\*(.*?)\*\*/g;
    let lastIndex = 0;
    let match;
    let raw = line;

    // Convert [text](url) to <a>
    raw = raw.replace(/\[([^\]]+)\]\((mailto:[^)]+)\)/g, '<a href="$2" class="pp-link">$1</a>');
    raw = raw.replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="pp-link">$1</a>');

    // Now handle bold
    const boldRegex = /\*\*(.*?)\*\*/g;
    let processed = raw.replace(boldRegex, '<strong>$1</strong>');

    if (line.trim() === "") {
      return <br key={i} />;
    }

    return (
      <span key={i} dangerouslySetInnerHTML={{ __html: processed }} />
    );
  });
}

export default function PrivacyPolicyPage() {
  const [lang, setLang] = useState<Lang>("en");
  const t = content[lang];

  return (
    <div className="pp-page">
      <nav className="site-nav">
        <button
          onClick={() => setLang(lang === "en" ? "fr" : "en")}
          className="lang-btn"
        >
          {lang === "en" ? "FR" : "EN"}
        </button>
      </nav>

      <div className="pp-container">
        <Link href="/" className="pp-back">
          &larr; {t.backHome}
        </Link>

        <h1 className="pp-title">{t.title}</h1>
        <p className="pp-updated">{t.lastUpdated}</p>

        {t.sections.map((section, i) => (
          <section key={i} className="pp-section">
            <h2 className="pp-heading">{section.heading}</h2>
            <div className="pp-body">
              {renderMarkdown(section.body)}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
