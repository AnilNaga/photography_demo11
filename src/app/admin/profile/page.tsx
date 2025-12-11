"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Upload, Save, User, Image as ImageIcon } from "lucide-react";
import Link from "next/link";

export default function AdminProfilePage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        headline: "",
        bio: "",
        imageUrl: "",
        coverImageUrl: "",
        email: "",
        phone: "",
        location: "",
        instagram: "",
    });

    useEffect(() => {
        fetch("/api/profile")
            .then(res => res.json())
            .then(data => {
                if (data && !data.error) {
                    setFormData(prev => ({ ...prev, ...data }));
                }
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: "imageUrl" | "coverImageUrl") => {
        const file = e.target.files?.[0];
        if (!file) return;

        const uploadData = new FormData();
        uploadData.append("file", file);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: uploadData,
            });
            if (!res.ok) throw new Error("Upload failed");
            const { url } = await res.json();
            setFormData(prev => ({ ...prev, [field]: url }));
        } catch (error) {
            alert("Image upload failed");
            console.error(error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const res = await fetch("/api/profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (!res.ok) throw new Error("Update failed");
            alert("Profile updated successfully!");
        } catch (error) {
            alert("Failed to update profile");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="text-white p-10">Loading profile...</div>;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-500 pb-20">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2">Edit Profile</h2>
                    <p className="text-white/50">Manage your bio, contact info, and branding images.</p>
                </div>
                <Link
                    href="/admin"
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-colors"
                >
                    ← Dashboard
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Visuals Column */}
                <div className="space-y-6">
                    {/* Cover Image */}
                    <div className="glass-panel p-6 rounded-2xl border border-white/5">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <ImageIcon size={18} className="text-amber-400" /> Cover Image
                        </h3>
                        <div className="relative aspect-video rounded-xl bg-black/40 overflow-hidden border border-white/10 group">
                            {formData.coverImageUrl ? (
                                <Image src={formData.coverImageUrl} alt="Cover" fill className="object-cover" />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-white/30">No Cover Image</div>
                            )}
                            <label className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                <span className="text-white font-medium flex items-center gap-2">
                                    <Upload size={20} /> Change Cover
                                </span>
                                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, "coverImageUrl")} />
                            </label>
                        </div>
                        <p className="text-xs text-white/40 mt-2">Recommended: 1920x1080px</p>
                    </div>

                    {/* Profile Image */}
                    <div className="glass-panel p-6 rounded-2xl border border-white/5">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <User size={18} className="text-amber-400" /> Profile Photo
                        </h3>
                        <div className="flex items-center gap-6">
                            <div className="relative w-32 h-32 rounded-full bg-black/40 overflow-hidden border border-white/10 group flex-shrink-0">
                                {formData.imageUrl ? (
                                    <Image src={formData.imageUrl} alt="Profile" fill className="object-cover" />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center text-white/30">No Photo</div>
                                )}
                                <label className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-full">
                                    <Upload size={20} className="text-white" />
                                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, "imageUrl")} />
                                </label>
                            </div>
                            <div className="text-sm text-white/60">
                                <p>Upload a square photo.</p>
                                <p>Recommended: 500x500px</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Text Details Column */}
                <div className="glass-panel p-8 rounded-2xl border border-white/5 space-y-6">
                    <h3 className="text-lg font-bold text-white mb-4">Content & Contact</h3>

                    <div>
                        <label className="block text-xs font-medium text-white/50 mb-1">Headline</label>
                        <input
                            type="text"
                            name="headline"
                            value={formData.headline || ""}
                            onChange={handleChange}
                            className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500/50"
                            placeholder="e.g. Capturing the Moment"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-white/50 mb-1">Biography</label>
                        <textarea
                            name="bio"
                            value={formData.bio || ""}
                            onChange={handleChange}
                            rows={6}
                            className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 resize-y"
                            placeholder="Tell your story..."
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-white/50 mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email || ""}
                                onChange={handleChange}
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500/50"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-white/50 mb-1">Location</label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location || ""}
                                onChange={handleChange}
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500/50"
                            />
                        </div>
                    </div>

                    <div className="pt-6 border-t border-white/10">
                        <button
                            type="submit"
                            disabled={saving}
                            className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
                        >
                            {saving ? "Saving..." : <><Save size={18} /> Save Changes</>}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
