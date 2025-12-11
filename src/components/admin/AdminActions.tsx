"use client";

import { useState } from "react";
import UploadModal from "./UploadModal";

interface Category {
    id: string;
    name: string;
}

interface AdminActionsProps {
    categories: Category[];
}

export default function AdminActions({ categories }: AdminActionsProps) {
    const [isUploadOpen, setIsUploadOpen] = useState(false);

    return (
        <>
            <div className="glass-panel p-6 rounded-2xl border border-white/5">
                <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-4">
                    <button
                        onClick={() => setIsUploadOpen(true)}
                        className="p-4 rounded-xl bg-white/5 hover:bg-white/10 hover:scale-[1.02] transition-all text-left text-white text-sm font-medium"
                    >
                        + Upload New Photo
                    </button>
                    <button className="p-4 rounded-xl bg-white/5 hover:bg-white/10 hover:scale-[1.02] transition-all text-left text-white text-sm font-medium">
                        + Create Blog Post
                    </button>
                    <button className="p-4 rounded-xl bg-white/5 hover:bg-white/10 hover:scale-[1.02] transition-all text-left text-white text-sm font-medium">
                        View Calendar
                    </button>
                    <button className="p-4 rounded-xl bg-white/5 hover:bg-white/10 hover:scale-[1.02] transition-all text-left text-white text-sm font-medium">
                        Update Prices
                    </button>
                </div>
            </div>

            <UploadModal
                isOpen={isUploadOpen}
                onClose={() => setIsUploadOpen(false)}
                categories={categories}
            />
        </>
    );
}
