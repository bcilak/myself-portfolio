import { NextResponse } from "next/server";

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, RateLimitEntry>();

export function jsonError(message = "Request failed.", status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export function getClientIp(req: Request) {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]?.trim() || "unknown";
  return req.headers.get("x-real-ip") || "unknown";
}

export function checkRateLimit({
  key,
  limit,
  windowMs,
}: {
  key: string;
  limit: number;
  windowMs: number;
}) {
  const now = Date.now();
  const current = buckets.get(key);

  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return null;
  }

  current.count += 1;
  if (current.count > limit) {
    return jsonError("Too many requests. Please try again later.", 429);
  }

  return null;
}

export function assertObject(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("Invalid request payload.");
  }
  return value as Record<string, unknown>;
}

export function cleanText(value: unknown, maxLength: number, fallback = "") {
  const text = String(value ?? fallback).trim();
  if (text.length > maxLength) {
    throw new Error(`Text field exceeds ${maxLength} characters.`);
  }
  return text;
}

export function cleanSlug(value: unknown) {
  const slug = cleanText(value, 120).toLowerCase();
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error("Slug must contain lowercase letters, numbers, and hyphens only.");
  }
  return slug;
}

export function cleanUrl(value: unknown, maxLength = 500) {
  const url = cleanText(value, maxLength);
  if (!url || url === "#") return url;
  try {
    const parsed = new URL(url);
    if (!["http:", "https:"].includes(parsed.protocol)) {
      throw new Error("URL protocol is not allowed.");
    }
    return parsed.toString();
  } catch {
    throw new Error("Invalid URL.");
  }
}

export function cleanStringArray(value: unknown, maxItems = 30, maxItemLength = 80) {
  if (!Array.isArray(value)) return [];
  return value
    .slice(0, maxItems)
    .map((item) => cleanText(item, maxItemLength))
    .filter(Boolean);
}

export function cleanLocalizedText(value: unknown, maxLength: number, required = false) {
  const object = assertObject(value);
  const tr = cleanText(object.tr, maxLength);
  const en = cleanText(object.en, maxLength);

  if (required && (!tr || !en)) {
    throw new Error("Localized fields require both Turkish and English values.");
  }

  return { tr, en };
}
