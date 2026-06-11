import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/mongoose";
import CaseStudy from "@/models/CaseStudy";
import { sanitizeCaseStudyPayload } from "@/lib/adminValidators";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    await dbConnect();
    try {
        const data = sanitizeCaseStudyPayload(await req.json());
        const updated = await CaseStudy.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true });
        if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
        return NextResponse.json(updated);
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Case study could not be updated.";
        return NextResponse.json({ error: message }, { status: 400 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    await dbConnect();
    try {
        const deleted = await CaseStudy.findByIdAndDelete(id);
        if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: "Case study could not be deleted." }, { status: 500 });
    }
}
