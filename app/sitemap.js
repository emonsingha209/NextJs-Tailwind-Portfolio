import { absoluteUrl, resume } from "@/lib/seo";
import { siteUrl } from "@/lib/site";

export default function sitemap() {
  const lastModified = new Date();

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: absoluteUrl(resume.path),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
