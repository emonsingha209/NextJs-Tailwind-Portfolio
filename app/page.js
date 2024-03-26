import About from "@/components/About";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="container">
      <Hero />
      <About />
      <div className="h-screen"></div>
    </main>
  );
}
