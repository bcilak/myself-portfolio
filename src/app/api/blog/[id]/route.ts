import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/mongoose";
import Blog from "@/models/Blog";
import { sanitizeBlogPayload } from "@/lib/adminValidators";

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await dbConnect();
    try {
        const { id } = await params;
        await Blog.findByIdAndDelete(id);
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: "Blog post could not be deleted." }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await dbConnect();
    try {
        const { id } = await params;
        const data = sanitizeBlogPayload(await req.json());
        const updated = await Blog.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true });
        if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
        return NextResponse.json(updated);
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Blog post could not be updated.";
        return NextResponse.json({ error: message }, { status: 400 });
    }
}
