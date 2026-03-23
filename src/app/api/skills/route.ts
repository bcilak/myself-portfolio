import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/mongoose";
import Skill from "@/models/Skill";

export async function GET() {
    await dbConnect();
    try {
        const skills = await Skill.find().sort({ order: 1, createdAt: -1 });
        return NextResponse.json(skills);
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
        const newSkill = await Skill.create(data);
        return NextResponse.json(newSkill, { status: 201 });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
