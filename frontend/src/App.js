import { useEffect } from "react";
import "@/App.css";
import Lenis from "lenis";
import { Toaster } from "sonner";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Wordmark from "@/components/Wordmark";
import Work from "@/components/Work";
import Clients from "@/components/Clients";
import Contact from "@/components/Contact";

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    window.__lenis = lenis;
    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return (
    <div className="grain bg-paper text-ink font-body antialiased overflow-x-clip" data-testid="app-root">
      <Toaster position="bottom-center" />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Services />
        <About />
        <Wordmark />
        <Work />
        <Clients />
        <Contact />
      </main>
    </div>
  );
}
