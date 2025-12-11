"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { PlayCircle } from "lucide-react";

interface Category {
    id: string;
    name: string;
}

interface Video {
    id: string;
    title: string;
    description: string | null;
    videoUrl: string;
    category: {
        name: string;
    };
}

interface VideosClientProps {
    initialVideos: Video[];
    categories: Category[];
}

export default function VideosClient({ initialVideos, categories }: VideosClientProps) {
    const [filter, setFilter] = useState("All");

    const filteredVideos = filter === "All"
        ? initialVideos
        : initialVideos.filter(v => v.category.name === filter);

    return (
        <div className="pt-32 px-6 md:px-12 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Films & Cinematography</h1>
                    <p className="text-white/60 max-w-md">Capturing motion, emotion, and the stories in between.</p>
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

            {filteredVideos.length === 0 ? (
                <div className="py-20 text-center text-white/30 text-lg border border-white/5 rounded-2xl">
                    No videos found in this category.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {filteredVideos.map((video) => (
                        <motion.div
                            key={video.id}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="group relative glass-panel rounded-2xl overflow-hidden border border-white/5"
                        >
                            {/* Video Player / Preview */}
                            <div className="relative aspect-video w-full bg-black/40">
                                <video
                                    src={video.videoUrl}
                                    controls
                                    className="w-full h-full object-cover"
                                    poster={video.videoUrl + "#t=0.5"} // Cheat to show first frame
                                    preload="metadata"
                                >
                                    Your browser does not support the video tag.
                                </video>
                            </div>

                            <div className="p-6">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                                        {video.category.name}
                                    </span>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">{video.title}</h3>
                                {video.description && (
                                    <p className="text-white/60 text-sm leading-relaxed">
                                        {video.description}
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
