import Link from "next/link";
import prisma from "@/lib/prisma";
import AdminVideoCard from "@/components/admin/AdminVideoCard";
import AdminVideoActions from "@/components/admin/AdminVideoActions";

export const dynamic = 'force-dynamic';

export default async function AdminVideosPage() {
    const videos = await prisma.video.findMany({
        orderBy: { createdAt: "desc" },
        include: { category: true },
    });

    const categories = await prisma.category.findMany({
        orderBy: { name: "asc" }
    });

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2">Video Gallery</h2>
                    <p className="text-white/50">Manage your portfolio videos.</p>
                </div>
                <div className="flex gap-4">
                    <Link
                        href="/admin"
                        className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-colors flex items-center"
                    >
                        ← Dashboard
                    </Link>
                    <AdminVideoActions categories={categories} />
                </div>
            </div>

            {videos.length === 0 ? (
                <div className="glass-panel p-12 rounded-2xl border border-white/5 text-center">
                    <p className="text-white/30 text-lg">No videos uploaded yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {videos.map((video) => (
                        <AdminVideoCard key={video.id} video={video} />
                    ))}
                </div>
            )}
        </div>
    );
}
