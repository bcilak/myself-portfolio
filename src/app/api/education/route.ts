import dbConnect from "@/lib/mongoose";
import Education from "@/models/Education";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
    await dbConnect();
    const educations = await Education.find({}).sort({ year: -1 });
    return NextResponse.json(educations);
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await dbConnect();
    const body = await req.json();
    const education = await Education.create(body);
    return NextResponse.json(education);
}
