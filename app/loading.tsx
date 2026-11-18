"use client";

import { motion } from "framer-motion";

export default function Loading() {
    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "#0a0f1a",
                backgroundImage:
                    "radial-gradient(circle at 50% 50%, rgba(34, 211, 238, 0.08) 0%, transparent 65%)",
                zIndex: 999999,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-center"
            >
                <div
                    style={{
                        fontFamily: "var(--font-orbitron), sans-serif",
                        color: "#ffffff",
                        fontSize: "clamp(2rem, 5vw, 3rem)",
                        fontWeight: 900,
                        letterSpacing: "0.04em",
                        margin: 0,
                    }}
                >
                    POWA<span style={{ color: "#22d3ee" }}>DIGITAL</span>
                </div>

                <div
                    style={{
                        width: "200px",
                        height: "3px",
                        backgroundColor: "rgba(255, 255, 255, 0.08)",
                        margin: "18px auto 12px",
                        overflow: "hidden",
                        borderRadius: "100px",
                    }}
                >
                    <motion.div
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ repeat: Infinity, duration: 1.3, ease: "easeInOut" }}
                        style={{
                            width: "60%",
                            height: "100%",
                            background: "linear-gradient(90deg, #3b82f6, #22d3ee)",
                            borderRadius: "100px",
                        }}
                    />
                </div>

                <span
                    style={{
                        fontSize: "0.72rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "#64748b",
                        fontWeight: 600,
                    }}
                >
                    Inicializando entorno
                </span>
            </motion.div>
        </div>
    );
}