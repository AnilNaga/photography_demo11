import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

function slugify(text: string) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')     // Replace spaces with -
        .replace(/[^\w\-]+/g, '') // Remove all non-word chars
        .replace(/\-\-+/g, '-')   // Replace multiple - with single -
        .replace(/^-+/, '')       // Trim - from start of text
        .replace(/-+$/, '');      // Trim - from end of text
}

export async function GET(request: Request) {
    try {
        const posts = await prisma.blogPost.findMany({
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(posts);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 });
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

        if (!body.title || !body.content) {
            return NextResponse.json({ error: "Title and Content are required" }, { status: 400 });
        }

        const slug = slugify(body.title) + '-' + Date.now().toString().slice(-4);

        const post = await prisma.blogPost.create({
            data: {
                title: body.title,
                slug: slug,
                content: body.content,
                coverImageUrl: body.coverImageUrl || null,
                published: body.published || false,
                publishedAt: body.published ? new Date() : null,
            },
        });

        return NextResponse.json(post);
    } catch (error) {
        console.error("Blog post creation error:", error);
        return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 });
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
        await prisma.blogPost.delete({
            where: { id },
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete blog post" }, { status: 500 });
    }
}
