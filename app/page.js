import About from "@/components/About";
import Chatbot from "@/components/Chatbot";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import JsonLd from "@/components/JsonLd";
import Project from "@/components/Project";
import { homeJsonLd } from "@/lib/seo";

export default async function Home() {
  await new Promise((resolve) => setTimeout(resolve, 25000));
  return (
    <main>
      <JsonLd data={homeJsonLd()} />
      <Hero />
      <About />
      <Project />
      <Chatbot />
      <Contact />
    </main>
  );
}
