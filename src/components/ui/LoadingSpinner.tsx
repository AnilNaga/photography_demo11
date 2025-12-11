"use client";

import { motion } from "framer-motion";
import { Camera } from "lucide-react";

export default function LoadingSpinner() {
    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <div className="relative">
                {/* Spinning Ring */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 rounded-full border-2 border-white/10 border-t-amber-500"
                />

                {/* Center Icon */}
                <div className="absolute inset-0 flex items-center justify-center text-white/50">
                    <Camera size={20} />
                </div>
            </div>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                className="text-xs font-bold text-amber-500 uppercase tracking-widest"
            >
                Loading
            </motion.p>
        </div>
    );
}
