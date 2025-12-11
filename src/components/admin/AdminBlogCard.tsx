"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Calendar, EyeOff } from "lucide-react";
import Image from "next/image";

interface BlogPost {
    id: string;
    title: string;
    slug: string;
    content: string;
    coverImageUrl: string | null;
    published: boolean;
    createdAt: Date;
}

export default function AdminBlogCard({ post }: { post: BlogPost }) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this post?")) return;

        setIsDeleting(true);
        try {
            const res = await fetch(`/api/blog?id=${post.id}`, {
                method: "DELETE",
            });

            if (!res.ok) throw new Error("Delete failed");

            router.refresh();
        } catch (error) {
            console.error(error);
            alert("Failed to delete post");
            setIsDeleting(false);
        }
    };

    return (
        <div className="group relative glass-panel rounded-2xl border border-white/5 overflow-hidden transition-all hover:border-amber-500/30 flex flex-col h-full">
            {/* Image */}
            <div className="relative h-48 w-full bg-black/20">
                {post.coverImageUrl ? (
                    <Image
                        src={post.coverImageUrl}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-white/20 bg-white/5">
                        No Cover Image
                    </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

                {/* Status Badge */}
                <div className="absolute top-3 right-3">
                    {post.published ? (
                        <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
                            Published
                        </span>
                    ) : (
                        <span className="px-2 py-1 rounded-full bg-zinc-500/50 text-white/70 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md flex items-center gap-1">
                            <EyeOff size={10} /> Draft
                        </span>
                    )}
                </div>

                {/* Delete Button */}
                <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="absolute top-3 left-3 p-2 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100 disabled:opacity-50 backdrop-blur-md"
                    title="Delete Post"
                >
                    {isDeleting ? "..." : <Trash2 size={16} />}
                </button>
            </div>

            {/* Content */}
            <div className="p-5 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-amber-400 transition-colors">
                    {post.title}
                </h3>

                <p className="text-white/50 text-sm line-clamp-3 mb-4 flex-grow">
                    {post.content.substring(0, 150)}...
                </p>

                <div className="flex items-center gap-2 text-xs text-white/40 mt-auto pt-4 border-t border-white/5">
                    <Calendar size={12} />
                    {new Date(post.createdAt).toLocaleDateString()}
                </div>
            </div>
        </div>
    );
}
