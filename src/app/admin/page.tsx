import Link from "next/link";
import prisma from "@/lib/prisma";
import AdminActions from "@/components/admin/AdminActions";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    // Fetch real data
    const categories = await prisma.category.findMany();
    const photoCount = await prisma.photo.count();
    const recentBookings = await prisma.booking.findMany({
        take: 3,
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-500">
            <div>
                <h2 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h2>
                <p className="text-white/50">Welcome back to your portfolio management center.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Total Photos", value: photoCount.toString(), change: "Live", href: "/admin/photos" },
                    { label: "Total Videos", value: "0", change: "Live", href: "/admin/videos", color: "text-blue-400" },
                    { label: "Profile & Bio", value: "Edit", change: "Update", href: "/admin/profile", color: "text-purple-400" },
                    { label: "Blog Views", value: "2.4k", change: "Manage", href: "/admin/blog" },
                    { label: "Active Services", value: "8", change: "Manage", href: "/admin/services" },
                ].map((stat, i) => (
                    stat.href ? (
                        <Link key={i} href={stat.href} className="block glass-panel p-6 rounded-2xl border border-white/5 hover:border-white/20 transition-colors cursor-pointer group">
                            <p className="text-sm text-white/50 font-medium group-hover:text-amber-400 transition-colors">{stat.label}</p>
                            <div className="mt-2 flex items-baseline gap-2">
                                <span className="text-3xl font-bold text-white mb-0">{stat.value}</span>
                                <span className={`text-xs ${stat.color || 'text-green-400'}`}>{stat.change}</span>
                            </div>
                        </Link>
                    ) : (
                        <div key={i} className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-white/20 transition-colors">
                            <p className="text-sm text-white/50 font-medium">{stat.label}</p>
                            <div className="mt-2 flex items-baseline gap-2">
                                <span className="text-3xl font-bold text-white">{stat.value}</span>
                                <span className={`text-xs ${stat.color || 'text-green-400'}`}>{stat.change}</span>
                            </div>
                        </div>
                    )
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="glass-panel p-6 rounded-2xl border border-white/5">
                    <h3 className="text-lg font-bold text-white mb-4">Recent Bookings</h3>
                    <div className="space-y-4">
                        {recentBookings.length === 0 ? (
                            <div className="text-white/30 text-center py-8">No recent bookings</div>
                        ) : (
                            recentBookings.map((booking) => (
                                <div key={booking.id} className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                                    <div>
                                        <p className="text-white font-medium">{booking.name}</p>
                                        <p className="text-xs text-white/50">{booking.status} • {booking.createdAt.toLocaleDateString()}</p>
                                    </div>
                                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-500/20 text-amber-300">
                                        {booking.status}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <AdminActions categories={categories} />
            </div>
        </div>
    );
}
