"use client";
import About from "@/components/About";
import Chatbot from "@/components/Chatbot";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Project from "@/components/Project";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Project />
      <Contact />
      <Chatbot />
    </main>
  );
}
