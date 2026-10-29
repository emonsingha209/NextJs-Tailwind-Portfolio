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
      { src: "/icon", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
      {
        src: "/brand-icon/192",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/brand-icon/512",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/img/emon-singha.jpeg",
        sizes: "720x720",
        type: "image/jpeg",
        purpose: "any",
      },
    ],
  };
}
