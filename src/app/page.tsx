import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import LiveGraphSimulation from "@/components/LiveGraphSimulation";
import TerminalDemo from "@/components/TerminalDemo";
import Features from "@/components/Features";
import Architecture from "@/components/Architecture";
import Benchmarks from "@/components/Benchmarks";
import Languages from "@/components/Languages";
import Install from "@/components/Install";
import CTASection from "@/components/CTASection";
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
        <LiveGraphSimulation />
      </ScrollReveal>

      <ScrollReveal>
        <TerminalDemo />
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

      <CTASection />

      <Footer />
    </main>
  );
}
