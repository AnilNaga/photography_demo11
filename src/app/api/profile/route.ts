import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET(request: Request) {
    try {
        // Singleton pattern: Find first or create default
        let profile = await prisma.profile.findFirst();

        if (!profile) {
            profile = await prisma.profile.create({
                data: {
                    headline: "Capture the Moment",
                    bio: "Welcome to my portfolio. I am a passionate photographer dedicated to capturing life's most beautiful moments.",
                    email: "hello@lumina.com",
                    location: "New York, USA",
                    experience: "10+ Years",
                } as any, // "experience" field might not be in schema yet, let's stick to schema
            });
        }
        return NextResponse.json(profile);
    } catch (error) {
        console.error("Profile Fetch Error:", error);
        return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    // Auth Check
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;
    if (!token || !(await verifyToken(token))) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await request.json();

        // Update first profile or create if not exists
        const profile = await prisma.profile.findFirst();

        let updatedProfile;
        if (profile) {
            updatedProfile = await prisma.profile.update({
                where: { id: profile.id },
                data: body,
            });
        } else {
            updatedProfile = await prisma.profile.create({
                data: body,
            });
        }

        return NextResponse.json(updatedProfile);
    } catch (error) {
        console.error("Profile Update Error:", error);
        return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
    }
}
