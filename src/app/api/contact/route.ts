import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Message from "@/models/Message";
import { notifyContactMessage } from "@/lib/contactNotifications";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const subject = String(body.subject || "").trim();
    const message = String(body.message || "").trim();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
    }

    if (name.length > 120 || email.length > 180 || subject.length > 180 || message.length > 4000) {
      return NextResponse.json({ error: "Message payload is too large." }, { status: 400 });
    }

    await dbConnect();

    const newMessage = await Message.create({ name, email, subject, message });

    notifyContactMessage({ name, email, subject, message }).catch((error) => {
      console.error("Contact notification failed:", error);
    });

    return NextResponse.json({ success: true, data: newMessage }, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
