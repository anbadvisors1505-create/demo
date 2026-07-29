"use client";

import { useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import { ModalProvider, useModals } from "@/components/ModalProvider";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import Capabilities from "@/components/sections/Capabilities";
import Services from "@/components/sections/Services";
import Engagement from "@/components/sections/Engagement";
import Industries from "@/components/sections/Industries";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";

function SiteBody() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Capabilities />
        <Services />
        <Engagement />
        <Industries />
        <About />
        <Contact />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}

function LoadingGate({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  const { openSpeakToCa } = useModals();

  return (
    <>
      {!loaded && (
        <LoadingScreen onDone={() => setLoaded(true)} onSpeakToCa={openSpeakToCa} />
      )}
      {children}
    </>
  );
}

export default function Home() {
  return (
    <ModalProvider>
      <LoadingGate>
        <SiteBody />
      </LoadingGate>
    </ModalProvider>
  );
}
