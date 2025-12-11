"use client";

import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
            <LoadingSpinner />
        </div>
    );
}
