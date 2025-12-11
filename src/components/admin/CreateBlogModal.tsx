"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload } from "lucide-react";
import Image from "next/image";

interface CreateBlogModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CreateBlogModal({ isOpen, onClose }: CreateBlogModalProps) {
    const router = useRouter();
    const [file, setFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        published: false,
    });

    if (!isOpen) return null;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let coverImageUrl = null;

            // 1. Upload Cover Image (if selected)
            if (file) {
                const uploadData = new FormData();
                uploadData.append("file", file);

                const uploadRes = await fetch("/api/upload", {
                    method: "POST",
                    body: uploadData,
                });

                if (!uploadRes.ok) throw new Error("Image upload failed");
                const { url } = await uploadRes.json();
                coverImageUrl = url;
            }

            // 2. Create Blog Post
            const res = await fetch("/api/blog", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    coverImageUrl,
                }),
            });

            if (!res.ok) throw new Error("Failed to create blog post");

            alert("Blog post created successfully!");
            router.refresh();
            onClose();
            // Reset form
            setFile(null);
            setImagePreview(null);
            setFormData({ title: "", content: "", published: false });
        } catch (error: any) {
            console.error(error);
            alert("Error: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 w-full max-w-2xl shadow-2xl animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-white">Write New Blog Post</h3>
                    <button onClick={onClose} className="text-white/50 hover:text-white">✕</button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Cover Image */}
                    <div>
                        <label className="block text-xs font-medium text-white/50 mb-2">Cover Image</label>
                        <div className="relative border-2 border-dashed border-white/10 rounded-xl p-4 text-center hover:border-amber-500/50 transition-colors h-48 flex flex-col items-center justify-center bg-white/5 overflow-hidden">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            />
                            {imagePreview ? (
                                <Image
                                    src={imagePreview}
                                    alt="Preview"
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <>
                                    <div className="p-3 rounded-full bg-white/5 text-amber-500 mb-2">
                                        <Upload size={20} />
                                    </div>
                                    <span className="text-sm font-medium text-white/70">
                                        Click to upload cover image
                                    </span>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Title */}
                    <div>
                        <label className="block text-xs font-medium text-white/50 mb-1">Title</label>
                        <input
                            type="text"
                            required
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 text-lg font-bold"
                            placeholder="Enter a catchy title..."
                        />
                    </div>

                    {/* Content */}
                    <div>
                        <label className="block text-xs font-medium text-white/50 mb-1">Content (Markdown supported)</label>
                        <textarea
                            required
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 min-h-[300px] resize-y font-mono text-sm leading-relaxed"
                            placeholder="# Introduction\n\nStart writing your amazing story here..."
                        />
                    </div>

                    {/* Published Toggle */}
                    <div className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/5">
                        <input
                            type="checkbox"
                            id="published"
                            checked={formData.published}
                            onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                            className="w-5 h-5 rounded border-white/10 bg-white/10 text-amber-500 focus:ring-amber-500 cursor-pointer"
                        />
                        <label htmlFor="published" className="cursor-pointer">
                            <span className="block text-sm font-bold text-white">Publish immediately</span>
                            <span className="block text-xs text-white/50">If unchecked, it will be saved as a draft.</span>
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                    >
                        {loading ? "Publishing..." : "Create Post"}
                    </button>
                </form>
            </div>
        </div>
    );
}
