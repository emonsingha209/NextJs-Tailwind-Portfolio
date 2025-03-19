import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Lato, Oswald, Playfair_Display } from "next/font/google";
import "./globals.css";
import { openGraphImage } from "./shared-metadata";

const oswald = Oswald({
  weight: "400",
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-oswald",
});

const lato = Lato({
  weight: "400",
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

export const metadata = {
  title: "Emon Singha | Jr. Software Engineer",
  description:
    "Emon Singha is a passionate Jr. Software Engineer dedicated to crafting immersive UI experiences with React and Next.js. Known for clean code and elegant interfaces.",
  keywords:
    "Emon Singha, Jr. Software Engineer, React Developer, Next.js Developer, Web Developer, UI Developer, Web Development, JavaScript, HTML, CSS",
  author: "Emon Singha",
  robots: "index, follow",
  canonical: "https://emonsingha.vercel.app",
  openGraph: {
    ...openGraphImage,
    title: "Emon Singha | Jr. Software Engineer",
    type: "website",
    url: "https://emonsingha.vercel.app/",
    description:
      "Emon Singha is a passionate Jr. Software Engineer who excels in creating engaging UI experiences with a focus on React and Next.js. Explore his portfolio to see his work.",
    site_name: "Emon Singha Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    site: "@EmonSingha209",
    title: "Emon Singha | Jr. Software Engineer",
    description:
      "Discover the work of Emon Singha, a dedicated Jr. Software Engineer specializing in React and Next.js, known for clean code and beautiful UI designs.",
    image: "https://emonsingha.vercel.app/img/ogImage.webp",
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
