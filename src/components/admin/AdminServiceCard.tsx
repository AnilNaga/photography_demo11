"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Clock, DollarSign, Trash2 } from "lucide-react";

interface Service {
    id: string;
    name: string;
    description: string | null;
    priceFrom: string | null; // Prisma Decimal comes as string often or we cast it
    priceTo: string | null;
    duration: string | null;
    isFeatured: boolean;
}

export default function AdminServiceCard({ service }: { service: any }) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this service?")) return;

        setIsDeleting(true);
        try {
            const res = await fetch(`/api/services?id=${service.id}`, {
                method: "DELETE",
            });

            if (!res.ok) throw new Error("Delete failed");

            router.refresh();
        } catch (error) {
            console.error(error);
            alert("Failed to delete service");
            setIsDeleting(false);
        }
    };

    return (
        <div className="group relative glass-panel p-6 rounded-2xl border border-white/5 hover:border-amber-500/30 transition-all">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                    {service.name}
                </h3>
                <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="p-2 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all disabled:opacity-50"
                    title="Delete Service"
                >
                    {isDeleting ? "..." : <Trash2 size={16} />}
                </button>
            </div>

            <p className="text-white/60 mb-6 text-sm line-clamp-2">
                {service.description}
            </p>

            <div className="space-y-3">
                {service.duration && (
                    <div className="flex items-center gap-3 text-white/80">
                        <div className="p-1.5 rounded-full bg-white/5 text-amber-400">
                            <Clock size={14} />
                        </div>
                        <span className="text-xs font-medium">{service.duration}</span>
                    </div>
                )}

                {(service.priceFrom || service.priceTo) && (
                    <div className="flex items-center gap-3 text-white/80">
                        <div className="p-1.5 rounded-full bg-white/5 text-green-400">
                            <DollarSign size={14} />
                        </div>
                        <span className="text-xs font-medium">
                            {service.priceFrom && service.priceTo
                                ? `$${service.priceFrom} - $${service.priceTo}`
                                : service.priceFrom
                                    ? `Starting at $${service.priceFrom}`
                                    : `Up to $${service.priceTo}`
                            }
                        </span>
                    </div>
                )}
            </div>

            {service.isFeatured && (
                <div className="absolute bottom-4 right-4">
                    <span className="px-2 py-1 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold uppercase tracking-wider">
                        Featured
                    </span>
                </div>
            )}
        </div>
    );
}
