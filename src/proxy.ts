import createMiddleware from "next-intl/middleware";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const adminMatch = pathname.match(/^\/(?:(tr|en)\/)?admin(\/.*)?$/);
  const isAdminLogin = /^\/(?:(tr|en)\/)?admin\/login$/.test(pathname);

  if (adminMatch && !isAdminLogin) {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
      const locale = adminMatch[1] || routing.defaultLocale;
      const loginPath = locale === routing.defaultLocale ? "/admin/login" : `/${locale}/admin/login`;
      const loginUrl = new URL(loginPath, req.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
