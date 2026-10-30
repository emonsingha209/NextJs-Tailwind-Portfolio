import socialIcons from "@/components/icon/Social";
import { siteUrl } from "@/lib/site";
import { PortfolioData } from "@/public/data/portfolio-data";
import contactDetails from "@/public/data/contact-details";
import projects from "@/public/data/projects";

const PROFILE_HOSTS = [
  "linkedin.com",
  "github.com",
  "facebook.com",
  "instagram.com",
  "x.com",
];

export const personId = `${siteUrl}/#person`;
export const websiteId = `${siteUrl}/#website`;
export const pageTitle = `${PortfolioData.name} | ${PortfolioData.title}`;

export const ogImage = {
  url: "/img/ogImage.webp",
  width: 1200,
  height: 630,
  alt: `${PortfolioData.name}, ${PortfolioData.title}`,
};

export const resume = {
  path: "/resume",
  title: "Resume",
  pdfPath: "/resume/Emon-Singha-Resume.pdf",
  description: `Resume of ${PortfolioData.name}, a ${PortfolioData.title} focused on React, Next.js, Node.js, and Express.`,
};

const phones = contactDetails
  .filter((item) => item.type === "Phone")
  .map((item) => item.value);

const email = contactDetails.find((item) => item.type === "Email")?.value;

const currentRole = PortfolioData.about.experience.find((role) =>
  role.dateRange.includes("Present")
);

const education = PortfolioData.about.education[0];

const [locality, region, countryName] = PortfolioData.location
  .split(",")
  .map((part) => part.trim());

export const sameAs = socialIcons
  .map((item) => item.link)
  .filter((link) => PROFILE_HOSTS.some((host) => link.includes(host)));

export function socialLinkRel(link) {
  if (!link.startsWith("http")) return undefined;
  const rel = ["noopener", "noreferrer"];
  if (PROFILE_HOSTS.some((host) => link.includes(host))) rel.unshift("me");
  return rel.join(" ");
}

export function absoluteUrl(path = "/") {
  if (!path || path === "/") return siteUrl;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

function personNode() {
  return {
    "@type": "Person",
    "@id": personId,
    name: PortfolioData.name,
    jobTitle: PortfolioData.title,
    description: PortfolioData.metaDescription,
    url: siteUrl,
    image: absoluteUrl("/img/emon-singha.jpeg"),
    email,
    telephone: phones,
    address: {
      "@type": "PostalAddress",
      addressLocality: locality,
      addressRegion: region,
      addressCountry: countryName === "Bangladesh" ? "BD" : countryName,
    },
    alumniOf: education
      ? {
          "@type": "CollegeOrUniversity",
          name: education.institution,
          url: education.link,
        }
      : undefined,
    worksFor: currentRole
      ? {
          "@type": "Organization",
          name: currentRole.company,
          url: currentRole.link,
        }
      : undefined,
    knowsAbout: PortfolioData.keywords
      .split(",")
      .map((keyword) => keyword.trim())
      .filter((keyword) => keyword && keyword !== PortfolioData.name),
    sameAs,
  };
}

function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": websiteId,
    url: siteUrl,
    name: PortfolioData.name,
    alternateName: [pageTitle, `${PortfolioData.name} Portfolio`],
    description: PortfolioData.metaDescription,
    inLanguage: "en",
    publisher: { "@id": personId },
  };
}

function projectWorks() {
  return projects.map((project) => {
    const live = project.liveDemoLinks?.[0]?.url;
    return {
      "@type": "CreativeWork",
      "@id": `${siteUrl}/#project-${project.id}`,
      name: project.name,
      description: project.description,
      image: absoluteUrl(project.image),
      url: live || absoluteUrl("/#projects"),
      creator: { "@id": personId },
      keywords: project.stack?.join(", "),
    };
  });
}

export function homeJsonLd() {
  const works = projectWorks();
  return {
    "@context": "https://schema.org",
    "@graph": [
      personNode(),
      websiteNode(),
      {
        "@type": "ProfilePage",
        "@id": `${siteUrl}/#profile`,
        url: siteUrl,
        name: pageTitle,
        description: PortfolioData.metaDescription,
        inLanguage: "en",
        isPartOf: { "@id": websiteId },
        about: { "@id": personId },
        mainEntity: { "@id": personId },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: absoluteUrl(ogImage.url),
          width: ogImage.width,
          height: ogImage.height,
        },
      },
      {
        "@type": "ItemList",
        "@id": `${siteUrl}/#projects`,
        name: "Selected projects",
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        numberOfItems: works.length,
        itemListElement: works.map((work, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: work,
        })),
      },
    ],
  };
}

export function resumeJsonLd() {
  const resumeUrl = absoluteUrl(resume.path);
  return {
    "@context": "https://schema.org",
    "@graph": [
      personNode(),
      websiteNode(),
      {
        "@type": "ProfilePage",
        "@id": `${resumeUrl}#webpage`,
        url: resumeUrl,
        name: `${resume.title} | ${PortfolioData.name}`,
        description: resume.description,
        inLanguage: "en",
        isPartOf: { "@id": websiteId },
        about: { "@id": personId },
        mainEntity: { "@id": personId },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: absoluteUrl(ogImage.url),
          width: ogImage.width,
          height: ogImage.height,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${resumeUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Resume",
            item: resumeUrl,
          },
        ],
      },
      {
        "@type": "DigitalDocument",
        name: `${PortfolioData.name} resume`,
        encodingFormat: "application/pdf",
        url: absoluteUrl(resume.pdfPath),
        about: { "@id": personId },
        isBasedOn: { "@id": `${resumeUrl}#webpage` },
      },
    ],
  };
}

export function llmsText() {
  const projectLines = projects
    .map((project) => {
      const live = project.liveDemoLinks?.[0]?.url;
      const where = live ? `: ${live}` : "";
      return `- ${project.name}${where} — ${project.description}`;
    })
    .join("\n");

  const profileLines = sameAs.map((url) => `- ${url}`).join("\n");

  return `# ${PortfolioData.name}

> ${PortfolioData.metaDescription}

${PortfolioData.profileDescription}

## Pages

- [Home](${siteUrl}/): Portfolio, experience, selected work, and contact.
- [Resume](${absoluteUrl(resume.path)}): HTML resume page. This is the canonical resume URL.
- [Resume PDF](${absoluteUrl(resume.pdfPath)}): Downloadable resume. Canonical page is ${absoluteUrl(resume.path)}.

## Projects

${projectLines}

## Profiles

${profileLines}

## Contact

- Email: ${email}
- Phone: ${phones.join(", ")}
- Location: ${PortfolioData.location}
`;
}

export const rootMetadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: pageTitle,
    template: `%s | ${PortfolioData.name}`,
  },
  description: PortfolioData.metaDescription,
  applicationName: `${PortfolioData.name} Portfolio`,
  authors: [{ name: PortfolioData.name, url: siteUrl }],
  creator: PortfolioData.name,
  publisher: PortfolioData.name,
  category: "portfolio",
  keywords: PortfolioData.keywords.split(",").map((keyword) => keyword.trim()),
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      "x-default": "/",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: PortfolioData.name,
    title: pageTitle,
    description: PortfolioData.metaDescription,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    site: "@EmonSingha209",
    creator: "@EmonSingha209",
    title: pageTitle,
    description: PortfolioData.metaDescription,
    images: [ogImage.url],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
};

export const rootViewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f6fb" },
    { media: "(prefers-color-scheme: dark)", color: "#021257" },
  ],
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
};
