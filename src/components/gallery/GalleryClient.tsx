"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

interface Category {
    id: string;
    name: string;
    slug: string;
}

interface Photo {
    id: string;
    title: string;
    imageUrl: string;
    categoryId: string;
    category: {
        name: string;
    }
}

interface GalleryClientProps {
    initialPhotos: Photo[];
    categories: Category[];
}

export default function GalleryClient({ initialPhotos, categories }: GalleryClientProps) {
    const [filter, setFilter] = useState("All");

    const filteredPhotos = filter === "All"
        ? initialPhotos
        : initialPhotos.filter(p => p.category.name === filter);

    return (
        <div className="pt-32 px-6 md:px-12 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Portfolio</h1>
                    <p className="text-white/60 max-w-md">Explore a curated selection of my finest work.</p>
                </div>

                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => setFilter("All")}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === "All"
                            ? "bg-white text-black"
                            : "bg-white/5 hover:bg-white/10 text-white/70"
                            }`}
                    >
                        All
                    </button>
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setFilter(cat.name)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === cat.name
                                ? "bg-white text-black"
                                : "bg-white/5 hover:bg-white/10 text-white/70"
                                }`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            {filteredPhotos.length === 0 ? (
                <div className="py-20 text-center text-white/30 text-lg border border-white/5 rounded-2xl">
                    No photos found in this category.
                </div>
            ) : (
                <motion.div
                    layout
                    className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8"
                >
                    {filteredPhotos.map((photo) => (
                        <motion.div
                            key={photo.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.4 }}
                            className="break-inside-avoid relative group rounded-xl overflow-hidden cursor-pointer"
                        >
                            <div className="relative w-full">
                                <Image
                                    src={photo.imageUrl}
                                    alt={photo.title}
                                    width={800}
                                    height={1200} // Approximate aspect ratio
                                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                                <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <p className="text-sm font-medium uppercase tracking-widest text-white/80">{photo.category.name}</p>
                                    <h3 className="text-xl font-bold">{photo.title}</h3>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </div>
    );
}
