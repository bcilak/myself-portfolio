import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import dbConnect from "@/lib/mongoose";
import User from "@/models/User";
import { validateSetupRequest } from "@/lib/setupGuard";

export async function GET(req: Request) {
  const guardResponse = validateSetupRequest(req);
  if (guardResponse) return guardResponse;

  try {
    await dbConnect();

    const userCount = await User.countDocuments();
    if (userCount > 0) {
      return NextResponse.json(
        { message: "Setup has already been completed." },
        { status: 400 }
      );
    }

    const username = process.env.SETUP_ADMIN_USERNAME || "admin";
    const temporaryPassword =
      process.env.SETUP_ADMIN_PASSWORD || crypto.randomBytes(18).toString("base64url");

    if (temporaryPassword.length < 12) {
      return NextResponse.json(
        { message: "SETUP_ADMIN_PASSWORD must be at least 12 characters." },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(temporaryPassword, salt);

    await User.create({
      username,
      passwordHash,
    });

    return NextResponse.json(
      {
        message: "Initial admin user created.",
        username,
        temporaryPassword,
        note: "Store this password securely. It is returned only once.",
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { message: "Setup failed." },
      { status: 500 }
    );
  }
}
