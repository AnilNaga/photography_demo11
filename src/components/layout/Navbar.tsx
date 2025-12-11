"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Camera, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const links = [
    { href: "/", label: "Home" },
    { href: "/gallery", label: "Gallery" },
    { href: "/videos", label: "Films" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed top-0 left-0 right-0 z-50 p-4 md:p-6 flex justify-center pointer-events-none"
        >
            <div className="glass-panel rounded-full px-6 py-3 flex items-center justify-between gap-8 pointer-events-auto md:min-w-[600px] min-w-[90%] transition-all duration-300">
                <Link href="/" className="flex items-center gap-2 text-foreground font-bold text-lg tracking-tight">
                    <Camera className="w-5 h-5" />
                    <span>LUMINA</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-6">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium text-white/70 hover:text-white transition-colors hover:glow"
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link
                        href="/contact"
                        className="bg-white text-black px-4 py-1.5 rounded-full text-sm font-semibold hover:scale-105 transition-transform"
                    >
                        Book Now
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="absolute top-20 left-4 right-4 glass-panel rounded-2xl p-6 flex flex-col gap-4 pointer-events-auto md:hidden">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="text-lg font-medium text-white/90"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            )}
        </motion.nav>
    );
}
