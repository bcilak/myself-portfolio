import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/mongoose";
import CaseStudy from "@/models/CaseStudy";

export async function GET() {
    await dbConnect();
    try {
        const items = await CaseStudy.find().sort({ order: 1, createdAt: -1 });
        return NextResponse.json(items);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await dbConnect();
    try {
        const data = await req.json();
        const newItem = await CaseStudy.create(data);
        return NextResponse.json(newItem, { status: 201 });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
