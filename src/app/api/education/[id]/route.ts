import dbConnect from "@/lib/mongoose";
import Education from "@/models/Education";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    await dbConnect();
    const body = await req.json();
    const education = await Education.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json(education);
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    await dbConnect();
    await Education.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
}

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    await dbConnect();
    const education = await Education.findById(id);
    if (!education) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(education);
}
