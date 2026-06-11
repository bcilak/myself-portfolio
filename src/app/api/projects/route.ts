import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/mongoose";
import Project from "@/models/Project";
import { sanitizeProjectPayload } from "@/lib/adminValidators";

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    try {
        const data = sanitizeProjectPayload(await req.json());
        const newProject = await Project.create(data);
        return NextResponse.json(newProject, { status: 201 });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Project could not be created.";
        return NextResponse.json({ error: message }, { status: 400 });
    }
}
