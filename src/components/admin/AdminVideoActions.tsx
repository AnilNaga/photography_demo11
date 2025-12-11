"use client";

import { useState } from "react";
import UploadVideoModal from "./UploadVideoModal";

interface Category {
    id: string;
    name: string;
}

export default function AdminVideoActions({ categories }: { categories: Category[] }) {
    const [isUploadOpen, setIsUploadOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsUploadOpen(true)}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-black text-sm font-bold transition-colors"
            >
                + Upload Video
            </button>
            <UploadVideoModal
                isOpen={isUploadOpen}
                onClose={() => setIsUploadOpen(false)}
                categories={categories}
            />
        </>
    );
}
