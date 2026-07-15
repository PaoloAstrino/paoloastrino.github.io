"use client";

import { useEffect, useState } from "react";

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if the user has already made a choice
    const consent = localStorage.getItem("cookie-consent");
    
    if (!consent) {
      setShowBanner(true);
    } else if (consent === "accepted") {
      // If already accepted, update GA consent on mount
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("consent", "update", {
          analytics_storage: "granted",
        });
      }
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShowBanner(false);
    
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("consent", "update", {
        analytics_storage: "granted",
      });
    }
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setShowBanner(false);
    // Consent remains "denied" (default state set in layout)
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md bg-background border border-border p-5 rounded-xl shadow-2xl z-50 flex flex-col gap-4 animate-fade-in-up">
      <div className="space-y-1.5">
        <h4 className="text-base font-medium text-foreground">Informativa sui Cookie 🍪</h4>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Questo sito utilizza cookie tecnici e di analisi (Google Analytics) anonimizzati per capire come i visitatori interagiscono con il portfolio. Puoi scegliere se accettare o rifiutare il tracciamento.
        </p>
      </div>
      <div className="flex items-center justify-end gap-3">
        <button
          onClick={handleDecline}
          className="px-3.5 py-1.5 text-xs font-mono border border-border rounded-md text-muted-foreground hover:text-foreground hover:border-muted-foreground/50 transition-colors duration-300"
        >
          Rifiuta
        </button>
        <button
          onClick={handleAccept}
          className="px-4 py-1.5 text-xs font-mono bg-foreground text-background rounded-md hover:bg-muted-foreground transition-colors duration-300"
        >
          Accetta
        </button>
      </div>
    </div>
  );
}
