import prisma from "@/lib/prisma";
import Link from "next/link";
import AdminPhotoCard from "@/components/admin/AdminPhotoCard";

export const dynamic = 'force-dynamic';

export default async function AdminPhotosPage() {
    const photos = await prisma.photo.findMany({
        orderBy: { createdAt: "desc" },
        include: { category: true },
    });

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2">Photo Gallery</h2>
                    <p className="text-white/50">Manage your portfolio images.</p>
                </div>
                <Link
                    href="/admin"
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-colors"
                >
                    ← Back to Dashboard
                </Link>
            </div>

            {photos.length === 0 ? (
                <div className="glass-panel p-12 rounded-2xl border border-white/5 text-center">
                    <p className="text-white/30 text-lg">No photos uploaded yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {photos.map((photo) => (
                        <AdminPhotoCard key={photo.id} photo={photo} />
                    ))}
                </div>
            )}
        </div>
    );
}
