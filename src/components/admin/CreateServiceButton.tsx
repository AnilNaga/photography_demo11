"use client";

import { useState } from "react";
import CreateServiceModal from "./CreateServiceModal";

export default function CreateServiceButton() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-black text-sm font-bold transition-colors"
            >
                + Add Service
            </button>
            <CreateServiceModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    );
}
