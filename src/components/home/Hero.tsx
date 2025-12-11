"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function Hero() {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 200]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
            {/* Background Parallax */}
            <motion.div
                style={{ y, opacity: 0.6 }}
                className="absolute inset-0 z-0"
            >
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
                    style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2942&auto=format&fit=crop)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-background" />
            </motion.div>

            {/* Content */}
            <motion.div
                style={{ opacity }}
                className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-8"
            >
                <motion.h1
                    initial={{ y: 50, opacity: 0, filter: "blur(10px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-5xl md:text-8xl font-bold tracking-tighter text-white"
                >
                    Capturing <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">Eternity</span>
                </motion.h1>

                <motion.p
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed"
                >
                    World-class photography for those who demand the extraordinary.
                    Experience visual storytelling at its finest.
                </motion.p>

                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
                >
                    <Link
                        href="/gallery"
                        className="glass-button px-8 py-4 rounded-full text-white font-medium flex items-center gap-2 group"
                    >
                        View Portfolio
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                        href="/contact"
                        className="px-8 py-4 rounded-full text-white/70 hover:text-white font-medium transition-colors"
                    >
                        Book a Session
                    </Link>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30"
            >
                <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-2">
                    <div className="w-1 h-3 bg-white/50 rounded-full" />
                </div>
            </motion.div>
        </section>
    );
}
