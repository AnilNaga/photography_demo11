"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, PlayCircle } from "lucide-react";

interface Video {
    id: string;
    title: string;
    description: string | null;
    videoUrl: string;
    category: {
        name: string;
    };
}

export default function AdminVideoCard({ video }: { video: Video }) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this video?")) return;

        setIsDeleting(true);
        try {
            const res = await fetch(`/api/videos?id=${video.id}`, {
                method: "DELETE",
            });

            if (!res.ok) throw new Error("Delete failed");

            router.refresh();
        } catch (error) {
            console.error(error);
            alert("Failed to delete video");
            setIsDeleting(false);
        }
    };

    return (
        <div className="group relative glass-panel rounded-2xl border border-white/5 overflow-hidden transition-all hover:border-amber-500/30">
            {/* Video Preview Container */}
            <div className="relative aspect-video w-full bg-black/40 flex items-center justify-center">
                <video
                    src={video.videoUrl}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                    muted
                    loop
                    onMouseOver={e => e.currentTarget.play()}
                    onMouseOut={e => e.currentTarget.pause()}
                />

                <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity">
                    <PlayCircle className="w-12 h-12 text-white/50" />
                </div>

                {/* Delete Button */}
                <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="absolute top-3 right-3 p-2 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100 disabled:opacity-50"
                    title="Delete Video"
                >
                    {isDeleting ? "..." : <Trash2 size={16} />}
                </button>
            </div>

            {/* Info */}
            <div className="p-4">
                <p className="text-xs text-amber-400 font-medium mb-1 uppercase tracking-wide">
                    {video.category.name}
                </p>
                <h3 className="text-white font-bold truncate mb-1">{video.title}</h3>
                {video.description && (
                    <p className="text-white/50 text-xs line-clamp-2">
                        {video.description}
                    </p>
                )}
            </div>
        </div>
    );
}
