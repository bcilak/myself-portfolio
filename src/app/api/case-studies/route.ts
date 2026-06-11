import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/mongoose";
import CaseStudy from "@/models/CaseStudy";
import { sanitizeCaseStudyPayload } from "@/lib/adminValidators";

export async function GET() {
    await dbConnect();
    try {
        const items = await CaseStudy.find().sort({ order: 1, createdAt: -1 });
        return NextResponse.json(items);
    } catch {
        return NextResponse.json({ error: "Case studies could not be loaded." }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await dbConnect();
    try {
        const data = sanitizeCaseStudyPayload(await req.json());
        const newItem = await CaseStudy.create(data);
        return NextResponse.json(newItem, { status: 201 });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Case study could not be created.";
        return NextResponse.json({ error: message }, { status: 400 });
    }
}
