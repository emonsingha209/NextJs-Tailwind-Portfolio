import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Lato, Oswald, Playfair_Display } from "next/font/google";
import { PortfolioData } from "@/public/data/portfolio-data";
import "./globals.css";
import { openGraphImage } from "./shared-metadata";

const oswald = Oswald({
  weight: ["400", "500"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-oswald",
});

const lato = Lato({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lato",
});

const playfair = Playfair_Display({
  weight: "700",
  style: ["italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

const pageTitle = `${PortfolioData.name} | ${PortfolioData.title}`;

export const metadata = {
  title: pageTitle,
  description: PortfolioData.metaDescription,
  keywords: PortfolioData.keywords,
  author: PortfolioData.name,
  robots: "index, follow",
  canonical: PortfolioData.website,
  openGraph: {
    ...openGraphImage,
    title: pageTitle,
    type: "website",
    url: `${PortfolioData.website}/`,
    description: PortfolioData.metaDescription,
    site_name: `${PortfolioData.name} Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    site: "@EmonSingha209",
    title: pageTitle,
    description: PortfolioData.metaDescription,
    image: `${PortfolioData.website}/img/ogImage.webp`,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true} className="!scroll-smooth">
      <body
        className={cn(
          "bg-background font-lato antialiased ",
          lato.variable,
          oswald.variable,
          playfair.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Toaster />
          <Footer />
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
