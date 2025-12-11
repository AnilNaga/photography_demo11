import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET(request: Request) {
    try {
        const videos = await prisma.video.findMany({
            orderBy: { createdAt: "desc" },
            include: { category: true },
        });
        return NextResponse.json(videos);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch videos" }, { status: 500 });
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

        if (!body.title || !body.videoUrl || !body.categoryId) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        const video = await prisma.video.create({
            data: {
                title: body.title,
                description: body.description,
                videoUrl: body.videoUrl, // Expects full URL (local or remote)
                thumbnailUrl: body.thumbnailUrl,
                categoryId: body.categoryId,
            },
        });

        return NextResponse.json(video);
    } catch (error) {
        console.error("Video creation error:", error);
        return NextResponse.json({ error: "Failed to create video" }, { status: 500 });
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
        await prisma.video.delete({
            where: { id },
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete video" }, { status: 500 });
    }
}
