import { Navbar } from "@/components/layout/Navbar";
import Image from "next/image";
import { Camera, Award, Globe, Heart } from "lucide-react";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export default async function AboutPage() {
    const profile = await prisma.profile.findFirst();

    // Fallbacks
    const coverImage = profile?.coverImageUrl || "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2000&auto=format&fit=crop";
    const profileImage = profile?.imageUrl || "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop";
    const headline = profile?.headline || "Behind the Lens";
    const bio = profile?.bio || "I am a passionate photographer with over 10 years of experience...";

    return (
        <main className="min-h-screen bg-background text-white pb-20">
            <Navbar />

            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-black/60 z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-20" />
                <Image
                    src={coverImage}
                    alt="Cover"
                    fill
                    className="object-cover"
                />

                <div className="relative z-30 text-center max-w-3xl px-6">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">{headline}</h1>
                    <p className="text-xl text-white/80 leading-relaxed">
                        Capturing the raw beauty of the world, one frame at a time.
                    </p>
                </div>
            </section>

            {/* Bio Section */}
            <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-amber-400 uppercase tracking-widest">The Photographer</h2>
                        <h3 className="text-4xl font-bold text-white uppercase">About Me</h3>
                        <p className="text-white/60 leading-relaxed text-lg whitespace-pre-wrap">
                            {bio}
                        </p>

                        <div className="grid grid-cols-2 gap-6 pt-6">
                            {[
                                { icon: Camera, label: "500+", sub: "Shoots Completed" },
                                { icon: Award, label: "15", sub: "Awards Won" },
                                { icon: Globe, label: "20+", sub: "Countries Visited" },
                                { icon: Heart, label: "100%", sub: "Happy Clients" },
                            ].map((stat, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                                    <div className="p-3 rounded-full bg-amber-500/10 text-amber-400">
                                        <stat.icon size={24} />
                                    </div>
                                    <div>
                                        <div className="font-bold text-white text-lg">{stat.label}</div>
                                        <div className="text-xs text-white/40 uppercase tracking-wider">{stat.sub}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden glass-panel border border-white/10 p-2">
                        <div className="relative w-full h-full rounded-xl overflow-hidden">
                            <Image
                                src={profileImage}
                                alt="Profile Portrait"
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
