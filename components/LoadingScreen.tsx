// components/LoadingScreen.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 🔥 Verificar si ya cargó antes en la sesión actual
    const hasLoadedBefore = sessionStorage.getItem('hasLoadedBefore');

    if (hasLoadedBefore) {
      setLoading(false);
      document.body.style.overflow = "unset";
      return;
    }

    // 🆕 Primera carga: mostrar loading moderno
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = "unset";
      sessionStorage.setItem('hasLoadedBefore', 'true');
    }, 1800); // Ligeramente más ágil para mejor UX

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          key="loading-powa-screen"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "#060913",
            zIndex: 9999999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "all",
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-center"
          >
            <h1
              style={{
                color: "white",
                fontSize: "clamp(2rem, 5vw, 3rem)",
                fontWeight: 900,
                letterSpacing: "-0.04em",
                margin: 0,
                fontFamily: 'var(--font-orbitron), sans-serif',
              }}
            >
              POWA<span style={{ color: "#22d3ee" }}>DIGITAL</span>
            </h1>

            <div
              style={{
                width: "160px",
                height: "2px",
                backgroundColor: "rgba(255,255,255,0.08)",
                margin: "24px auto",
                overflow: "hidden",
                borderRadius: "10px",
              }}
            >
              <motion.div
                animate={{ x: ["-100%", "100%"] }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                style={{
                  width: "100%",
                  height: "100%",
                  background: "linear-gradient(90deg, transparent, #22d3ee, transparent)",
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}