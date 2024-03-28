import About from "@/components/About";
import Hero from "@/components/Hero";
import Project from "@/components/Project";

export default function Home() {
  return (
    <main className="container">
      <Hero />
      <About />
      <Project />
      <div className="h-screen"></div>
    </main>
  );
}
