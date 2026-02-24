import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Features from "@/components/Features";
import Architecture from "@/components/Architecture";
import Benchmarks from "@/components/Benchmarks";
import Languages from "@/components/Languages";
import Install from "@/components/Install";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />

      <ScrollReveal>
        <Problem />
      </ScrollReveal>

      <ScrollReveal>
        <Features />
      </ScrollReveal>

      <ScrollReveal>
        <Architecture />
      </ScrollReveal>

      <ScrollReveal>
        <Benchmarks />
      </ScrollReveal>

      <ScrollReveal>
        <Languages />
      </ScrollReveal>

      <ScrollReveal>
        <Install />
      </ScrollReveal>

      <Footer />
    </main>
  );
}
