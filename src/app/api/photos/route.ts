import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET(request: Request) {
    try {
        const photos = await prisma.photo.findMany({
            orderBy: { createdAt: "desc" },
            include: { category: true },
        });
        return NextResponse.json(photos);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch photos" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    // Auth Check
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;
    if (!token || !(await verifyToken(token))) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await request.json();

        // Handle Batch Upload
        if (body.imageUrls && Array.isArray(body.imageUrls)) {
            if (!body.categoryId) {
                return NextResponse.json({ error: "Category is required" }, { status: 400 });
            }

            const photos = await prisma.$transaction(
                body.imageUrls.map((url: string, index: number) =>
                    prisma.photo.create({
                        data: {
                            title: body.title || `Untitled ${index + 1}`, // Clean fallback
                            description: body.description,
                            imageUrl: url,
                            categoryId: body.categoryId,
                            isFeatured: body.isFeatured || false,
                        },
                    })
                )
            );
            return NextResponse.json({ count: photos.length });
        }

        // Handle Single Upload (Backward Compatibility)
        if (!body.title || !body.imageUrl || !body.categoryId) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        const photo = await prisma.photo.create({
            data: {
                title: body.title,
                description: body.description,
                imageUrl: body.imageUrl,
                categoryId: body.categoryId,
                isFeatured: body.isFeatured || false,
            },
        });

        return NextResponse.json(photo);
    } catch (error) {
        console.error("Photo Creation Error:", error);
        return NextResponse.json({ error: "Failed to create photo" }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
        return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    }

    // Auth Check
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;
    if (!token || !(await verifyToken(token))) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        await prisma.photo.delete({
            where: { id },
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete photo" }, { status: 500 });
    }
}
