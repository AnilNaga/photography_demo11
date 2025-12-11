import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET(request: Request) {
    try {
        const services = await prisma.service.findMany({
            orderBy: { name: "asc" },
        });
        return NextResponse.json(services);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
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

        if (!body.name) {
            return NextResponse.json({ error: "Name is required" }, { status: 400 });
        }

        const service = await prisma.service.create({
            data: {
                name: body.name,
                description: body.description,
                priceFrom: body.priceFrom ? parseFloat(body.priceFrom) : null,
                priceTo: body.priceTo ? parseFloat(body.priceTo) : null,
                duration: body.duration,
                isFeatured: body.isFeatured || false,
            },
        });

        return NextResponse.json(service);
    } catch (error) {
        console.error("Service creation error:", error);
        return NextResponse.json({ error: "Failed to create service" }, { status: 500 });
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
        await prisma.service.delete({
            where: { id },
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete service" }, { status: 500 });
    }
}
