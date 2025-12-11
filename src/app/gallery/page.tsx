import { Navbar } from "@/components/layout/Navbar";
import prisma from "@/lib/prisma";
import GalleryClient from "@/components/gallery/GalleryClient";

export const dynamic = 'force-dynamic';

export default async function GalleryPage() {
    const photos = await prisma.photo.findMany({
        orderBy: { createdAt: "desc" },
        include: { category: true },
    });

    const categories = await prisma.category.findMany({
        orderBy: { name: "asc" }
    });

    return (
        <main className="min-h-screen bg-background text-white pb-20">
            <Navbar />
            <GalleryClient initialPhotos={photos} categories={categories} />
        </main>
    );
}
