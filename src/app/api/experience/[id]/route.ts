import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/mongoose";
import Experience from "@/models/Experience";

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await dbConnect();
    try {
        const { id } = await params;
        await Experience.findByIdAndDelete(id);
        return NextResponse.json({ success: true });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await dbConnect();
    try {
        const { id } = await params;
        const data = await req.json();
        const updated = await Experience.findByIdAndUpdate(id, data, { new: true });
        return NextResponse.json(updated);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}