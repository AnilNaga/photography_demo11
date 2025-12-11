"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Photo {
    id: string;
    title: string;
    description: string | null;
    imageUrl: string;
    isFeatured: boolean;
    category: {
        name: string;
    };
}

export default function AdminPhotoCard({ photo }: { photo: Photo }) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this photo?")) return;

        setIsDeleting(true);
        try {
            const res = await fetch(`/api/photos?id=${photo.id}`, {
                method: "DELETE",
            });

            if (!res.ok) throw new Error("Delete failed");

            router.refresh();
        } catch (error) {
            console.error(error);
            alert("Failed to delete photo");
            setIsDeleting(false);
        }
    };

    return (
        <div className="group relative glass-panel rounded-2xl border border-white/5 overflow-hidden transition-all hover:border-amber-500/30">
            {/* Image Aspect Ratio Container */}
            <div className="relative aspect-[4/5] w-full bg-black/20">
                <Image
                    src={photo.imageUrl}
                    alt={photo.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                {/* Status Badges */}
                <div className="absolute top-3 right-3 flex flex-col gap-2">
                    {photo.isFeatured && (
                        <span className="px-2 py-1 rounded-full bg-amber-500 text-black text-[10px] font-bold uppercase tracking-wider">
                            Featured
                        </span>
                    )}
                </div>

                {/* Delete Button */}
                <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="absolute top-3 left-3 p-2 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100 disabled:opacity-50"
                    title="Delete Photo"
                >
                    {isDeleting ? "..." : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Info */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-xs text-amber-400 font-medium mb-1 uppercase tracking-wide">
                    {photo.category.name}
                </p>
                <div className="flex justify-between items-end">
                    <div>
                        <h3 className="text-white font-bold truncate">{photo.title}</h3>
                        {photo.description && (
                            <p className="text-white/50 text-xs mt-1 line-clamp-2">
                                {photo.description}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
