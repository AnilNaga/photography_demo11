import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/home/Hero";
import prisma from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const categories = await prisma.category.findMany({
    include: {
      photos: {
        take: 1,
        orderBy: { createdAt: 'desc' }
      }
    },
    take: 3
  });

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-white/20">
      <Navbar />
      <Hero />

      {/* Featured Collections Section */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center text-white">Featured Collections</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/gallery`} // We could enhance this to filter by category later
              className="aspect-[4/5] glass-panel rounded-2xl overflow-hidden relative group cursor-pointer hover:border-amber-500/50 transition-all hover:scale-[1.02]"
            >
              {category.photos[0] ? (
                <Image
                  src={category.photos[0].imageUrl}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              ) : (
                <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center">
                  <span className="text-white/20 text-4xl">📷</span>
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />

              <div className="absolute bottom-0 left-0 p-8 w-full">
                <h3 className="text-2xl font-bold text-white mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                  {category.name}
                </h3>
                <div className="flex items-center gap-2 text-amber-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0 duration-300">
                  <span>View Gallery</span>
                  <span>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer Placeholder for visual completeness */}
      <footer className="py-12 border-t border-white/10 text-center text-white/40 text-sm">
        <p>&copy; {new Date().getFullYear()} LUMINA Photography. All rights reserved.</p>
      </footer>
    </main>
  );
}
