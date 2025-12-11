"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface CreateServiceModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CreateServiceModal({ isOpen, onClose }: CreateServiceModalProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        priceFrom: "",
        priceTo: "",
        duration: "",
        isFeatured: false,
    });

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/services", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Failed to create service");
            }

            alert("Service created successfully!");
            router.refresh(); // Refresh server data
            onClose();
            // Reset form
            setFormData({
                name: "",
                description: "",
                priceFrom: "",
                priceTo: "",
                duration: "",
                isFeatured: false,
            });
        } catch (error: any) {
            console.error(error);
            alert("Error: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 w-full max-w-lg shadow-2xl animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-white">Add New Service</h3>
                    <button onClick={onClose} className="text-white/50 hover:text-white">✕</button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block text-xs font-medium text-white/50 mb-1">Service Name *</label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500/50"
                            placeholder="e.g. Wedding Photography"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-xs font-medium text-white/50 mb-1">Description</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500/50 h-24 resize-none"
                            placeholder="Details about the service..."
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Price From */}
                        <div>
                            <label className="block text-xs font-medium text-white/50 mb-1">Price From ($)</label>
                            <input
                                type="number"
                                value={formData.priceFrom}
                                onChange={(e) => setFormData({ ...formData, priceFrom: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500/50"
                                placeholder="0.00"
                            />
                        </div>
                        {/* Price To */}
                        <div>
                            <label className="block text-xs font-medium text-white/50 mb-1">Price To ($)</label>
                            <input
                                type="number"
                                value={formData.priceTo}
                                onChange={(e) => setFormData({ ...formData, priceTo: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500/50"
                                placeholder="Optional"
                            />
                        </div>
                    </div>

                    {/* Duration */}
                    <div>
                        <label className="block text-xs font-medium text-white/50 mb-1">Duration</label>
                        <input
                            type="text"
                            value={formData.duration}
                            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500/50"
                            placeholder="e.g. 8 hours"
                        />
                    </div>

                    {/* Featured Checkbox */}
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="isFeatured"
                            checked={formData.isFeatured}
                            onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                            className="w-4 h-4 rounded border-white/10 bg-white/5 text-amber-500 focus:ring-amber-500"
                        />
                        <label htmlFor="isFeatured" className="text-sm text-white/70">Feature this service</label>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Creating..." : "Create Service"}
                    </button>
                </form>
            </div>
        </div>
    );
}
