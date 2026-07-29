"use client";

import { createContext, useContext, useMemo, useState, ReactNode } from "react";
import BookConsultationModal from "@/components/BookConsultationModal";
import SpeakToCaModal from "@/components/SpeakToCaModal";

interface ModalContextValue {
  openBookConsultation: () => void;
  openSpeakToCa: () => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

export function useModals() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModals must be used within ModalProvider");
  return ctx;
}

export function ModalProvider({ children }: { children: ReactNode }) {
  const [bookOpen, setBookOpen] = useState(false);
  const [caOpen, setCaOpen] = useState(false);

  const value = useMemo(
    () => ({
      openBookConsultation: () => setBookOpen(true),
      openSpeakToCa: () => setCaOpen(true),
    }),
    []
  );

  return (
    <ModalContext.Provider value={value}>
      {children}
      <BookConsultationModal open={bookOpen} onClose={() => setBookOpen(false)} />
      <SpeakToCaModal open={caOpen} onClose={() => setCaOpen(false)} />
    </ModalContext.Provider>
  );
}
