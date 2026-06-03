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
                backgroundColor: "#0f172a",
                zIndex: 999999,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-center"
            >
                <h1
                    style={{
                        color: "white",
                        fontSize: "3rem",
                        fontWeight: 900,
                        letterSpacing: "-0.05em",
                        margin: 0,
                    }}
                >
                    POWA<span style={{ color: "#00f2fe" }}>DIGITAL</span>
                </h1>

                <div
                    style={{
                        width: "180px",
                        height: "2px",
                        backgroundColor: "rgba(255,255,255,0.1)",
                        margin: "20px auto",
                        overflow: "hidden",
                        borderRadius: "10px",
                    }}
                >
                    <motion.div
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                        style={{
                            width: "100%",
                            height: "100%",
                            backgroundColor: "#00f2fe",
                        }}
                    />
                </div>
            </motion.div>
        </div>
    );
}