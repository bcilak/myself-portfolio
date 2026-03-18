import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/mongoose";
import Settings from "@/models/Settings";

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const body = await req.json();
        await dbConnect();
        
        let settings = await Settings.findOne({});
        if (settings) {
            settings = await Settings.findByIdAndUpdate(settings._id, body, { new: true });
        } else {
            settings = await Settings.create(body);
        }
        
        return NextResponse.json({ success: true, data: settings });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
