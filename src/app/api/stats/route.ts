import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Blog from "@/models/Blog";
import Project from "@/models/Project";

export async function POST(req: Request) {
    try {
        const { type, slug } = await req.json();

        if (!type || !slug) {
            return NextResponse.json({ error: "Eksik parametre" }, { status: 400 });
        }

        await dbConnect();

        let updatedDoc = null;

        if (type === "blog") {
            updatedDoc = await Blog.findOneAndUpdate(
                { slug },
                { $inc: { views: 1 } },
                { new: true }
            );
        } else if (type === "project") {
            updatedDoc = await Project.findOneAndUpdate(
                { slug },
                { $inc: { views: 1 } },
                { new: true }
            );
        }

        if (!updatedDoc) {
            return NextResponse.json({ error: "Bulunamadı" }, { status: 404 });
        }

        return NextResponse.json({ success: true, views: updatedDoc.views }, { status: 200 });

    } catch (error: any) {
        console.error("View increment error:", error);
        return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
    }
}
