import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import { Toaster } from "sonner";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import Home from "@/pages/Home";
import CasePage from "@/pages/CasePage";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" onExitComplete={() => window.__lenis?.scrollTo(0, { immediate: true })}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/work/:id" element={<CasePage />} />
      </Routes>
    </AnimatePresence>
  );
}

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
      <BrowserRouter>
        <Cursor />
        <Nav />
        <AnimatedRoutes />
      </BrowserRouter>
    </div>
  );
}
