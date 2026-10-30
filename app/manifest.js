import { pageTitle } from "@/lib/seo";
import { PortfolioData } from "@/public/data/portfolio-data";

export default function manifest() {
  return {
    name: pageTitle,
    short_name: PortfolioData.name,
    description: PortfolioData.metaDescription,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#021257",
    theme_color: "#021257",
    lang: "en",
    categories: ["portfolio"],
    icons: [
      { src: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { src: "/favicon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/favicon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
