"use client";

import { motion } from "framer-motion";

export function SectionReveal({ children }: { children: React.ReactNode }) {
    return (
        <section className="relative flex min-h-screen items-center">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                    duration: 0.6,
                    ease: "easeOut",
                }}
                className="w-full"
            >
                {children}
            </motion.div>
        </section>
    );
}
