import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const files = formData.getAll("file") as File[]; // Get all files

        if (!files || files.length === 0) {
            return NextResponse.json({ error: "No files received" }, { status: 400 });
        }

        const urls: string[] = [];

        // Ensure directory exists once
        const uploadDir = path.join(process.cwd(), "public/uploads");
        try {
            await mkdir(uploadDir, { recursive: true });
        } catch (e) {
            // Ignore if exists
        }

        for (const file of files) {
            if (!(file instanceof File)) continue;

            const buffer = Buffer.from(await file.arrayBuffer());
            const filename = Date.now() + "_" + Math.random().toString(36).substring(7) + "_" + file.name.replaceAll(" ", "_");
            const filepath = path.join(uploadDir, filename);

            await writeFile(filepath, buffer);
            urls.push(`/uploads/${filename}`);
        }

        return NextResponse.json({ urls, url: urls[0] }); // Return both for backward compat
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}
