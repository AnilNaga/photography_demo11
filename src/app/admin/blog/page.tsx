import Link from "next/link";
import prisma from "@/lib/prisma";
import AdminBlogCard from "@/components/admin/AdminBlogCard";
import CreateBlogButton from "@/components/admin/CreateBlogButton";

export const dynamic = 'force-dynamic';

export default async function AdminBlogPage() {
    const posts = await prisma.blogPost.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2">Blog Management</h2>
                    <p className="text-white/50">Share your stories and updates.</p>
                </div>
                <div className="flex gap-4">
                    <Link
                        href="/admin"
                        className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-colors flex items-center"
                    >
                        ← Dashboard
                    </Link>
                    <CreateBlogButton />
                </div>
            </div>

            {posts.length === 0 ? (
                <div className="glass-panel p-12 rounded-2xl border border-white/5 text-center">
                    <p className="text-white/30 text-lg">No blog posts yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post) => (
                        <AdminBlogCard key={post.id} post={post} />
                    ))}
                </div>
            )}
        </div>
    );
}
