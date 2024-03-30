import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Lato, Oswald, Playfair_Display } from "next/font/google";
import "./globals.css";

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
  title: "Emon Singha | Front-End-Developer",
  description:
    "I am Emon Singha. I am a passionate Frontend Developer dedicated to creating immersive UI experiences that resonate with users. With a keen eye for detail and a love for clean code, I bring ideas to life through elegant and functional interfaces.",
  keywords:
    "Emon Singha, Frontend Developer, ReactJs Developer, NextJs Developer, Web Developer, Web Development",
  author: "Emon Singha",
  robots: "index, follow",
  // og: {
  //   title: "Emon Singha | Front End Developer",
  //   type: "website",
  //   url: "https://emonsingha.vercel.app/",
  //   image: "https://emonsingha.vercel.app/img/ogImage.jpg",
  //   description:
  //     "I am Emon Singha. I am a passionate Frontend Developer dedicated to creating immersive UI experiences that resonate with users. With a keen eye for detail and a love for clean code, I bring ideas to life through elegant and functional interfaces.",
  //   site_name: "Emon Singha Portfolio",
  // },
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
