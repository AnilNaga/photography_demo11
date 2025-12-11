"use client";

import { useState } from "react";
import CreateBlogModal from "./CreateBlogModal";

export default function CreateBlogButton() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-black text-sm font-bold transition-colors"
            >
                + Write Post
            </button>
            <CreateBlogModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    );
}
