import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Message from "@/models/Message";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
    }

    await dbConnect();

    const newMessage = await Message.create({ name, email, subject, message });

    return NextResponse.json({ success: true, data: newMessage }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
