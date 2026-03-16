import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/mongoose";
import Blog from "@/models/Blog";

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await dbConnect();
    try {
        const body = await req.json();
        const doc = await Blog.create(body);
        return NextResponse.json(doc);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}