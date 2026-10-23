import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "@/components/Hero";
import WaveDivider from "@/components/WaveDivider";
import Services from "@/components/Services";
import About from "@/components/About";
import Wordmark from "@/components/Wordmark";
import Work from "@/components/Work";
import Clients from "@/components/Clients";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import TransitionPage from "@/components/TransitionPage";

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    const target = location.state?.scrollTo;
    if (target) {
      const t = setTimeout(() => window.__lenis?.scrollTo(target, { offset: -70, duration: 1.2 }), 750);
      return () => clearTimeout(t);
    }
  }, [location.state]);

  return (
    <TransitionPage>
      <main>
        <Hero />
        <WaveDivider className="-mb-8 sm:-mb-10 z-10" />
        <About />
        <Services />
        <Wordmark />
        <Work />
        <Clients />
        <Testimonials />
        <Contact />
      </main>
    </TransitionPage>
  );
}
