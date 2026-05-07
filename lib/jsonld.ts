/**
 * JSON-LD schema builders.
 * Returns plain objects suitable for `JSON.stringify` in <script type="application/ld+json">.
 *
 * Schema reference: https://schema.org/Person, https://schema.org/CreativeWork
 */

import { profile, projects, certifications, education, experience } from "@/content/cv";

export const SITE_URL = "https://ahmadnassar.dev";

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.headline,
    description: profile.bio,
    email: `mailto:${profile.email}`,
    telephone: profile.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Amman",
      addressCountry: "JO",
    },
    url: SITE_URL,
    sameAs: [profile.links.github, profile.links.linkedin],
    image: `${SITE_URL}/og`,
    knowsAbout: [
      "Artificial Intelligence",
      "Large Language Models",
      "Agentic AI",
      "Model Context Protocol",
      "Next.js",
      "TypeScript",
      "ASP.NET Core",
      "Computer Vision",
      "Full-stack Development",
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: education.school,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Amman",
        addressCountry: "JO",
      },
    },
    hasCredential: certifications.map((c) => ({
      "@type": "EducationalOccupationalCredential",
      name: c.name,
      recognizedBy: { "@type": "Organization", name: c.issuer },
      dateCreated: c.year,
    })),
    worksFor: experience.slice(0, 1).map((e) => ({
      "@type": "Organization",
      name: e.company,
    }))[0],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${profile.name} — Portfolio`,
    url: SITE_URL,
    description: profile.tagline,
    author: { "@type": "Person", name: profile.name, url: SITE_URL },
    inLanguage: "en",
  };
}

export function projectSchema(slug: string) {
  const project = projects.find((p) => p.slug === slug);
  if (!project) return null;
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    headline: project.tagline,
    description: project.description,
    url: project.liveUrl ?? `${SITE_URL}/projects/${project.slug}`,
    author: { "@type": "Person", name: profile.name, url: SITE_URL },
    keywords: project.stack.join(", "),
    dateCreated: project.year,
  };
}

export function breadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
