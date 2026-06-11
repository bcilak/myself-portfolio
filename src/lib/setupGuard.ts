import { NextResponse } from "next/server";

export function validateSetupRequest(req: Request) {
  if (process.env.ENABLE_SETUP_ROUTES !== "true") {
    return NextResponse.json(
      { error: "Setup routes are disabled." },
      { status: 404 }
    );
  }

  const expectedToken = process.env.SETUP_TOKEN;
  const token = req.headers.get("x-setup-token");

  if (!expectedToken || token !== expectedToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return null;
}
