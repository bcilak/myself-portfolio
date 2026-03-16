import { NextRequest, NextResponse } from "next/server";

// Simple rate limit: track requests per IP in memory (resets on server restart)
// For production, use Redis or Upstash
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function getRateLimitKey(req: NextRequest): string {
    return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
}

function isRateLimited(key: string): boolean {
    const now = Date.now();
    const entry = rateLimitMap.get(key);

    if (!entry || now > entry.resetAt) {
        rateLimitMap.set(key, { count: 1, resetAt: now + 60 * 60 * 1000 }); // 1 hour window
        return false;
    }

    if (entry.count >= 5) return true; // Max 5 submissions per hour per IP

    entry.count++;
    return false;
}

function sanitize(str: string): string {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#x27;");
}

function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 200;
}

export async function POST(req: NextRequest) {
    const key = getRateLimitKey(req);

    if (isRateLimited(key)) {
        return NextResponse.json(
            { error: "Too many requests. Please try again later." },
            { status: 429 }
        );
    }

    let body: unknown;
    try {
        body = await req.json();
    } catch {
        return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    if (typeof body !== "object" || body === null) {
        return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    const { name, email, subject, message } = body as Record<string, unknown>;

    // Validate
    if (
        typeof name !== "string" ||
        typeof email !== "string" ||
        typeof message !== "string"
    ) {
        return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanSubject = typeof subject === "string" ? subject.trim() : "";
    const cleanMessage = message.trim();

    if (cleanName.length < 2 || cleanName.length > 100) {
        return NextResponse.json({ error: "Name must be between 2-100 characters." }, { status: 400 });
    }

    if (!isValidEmail(cleanEmail)) {
        return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    if (cleanMessage.length < 10 || cleanMessage.length > 2000) {
        return NextResponse.json({ error: "Message must be between 10-2000 characters." }, { status: 400 });
    }

    if (cleanSubject.length > 200) {
        return NextResponse.json({ error: "Subject too long." }, { status: 400 });
    }

    // Sanitize for XSS protection
    const safeData = {
        name: sanitize(cleanName),
        email: sanitize(cleanEmail),
        subject: sanitize(cleanSubject),
        message: sanitize(cleanMessage),
        submittedAt: new Date().toISOString(),
    };

    // Log to console (replace with email service / database in production)
    console.log("New contact form submission:", safeData);

    // TODO: Send email via nodemailer / Resend / SendGrid
    // await sendEmail(safeData);

    return NextResponse.json(
        { message: "Message received. I will get back to you within 24 hours." },
        { status: 200 }
    );
}
