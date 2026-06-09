import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { loginRateLimiter } from "@/lib/rate-limit";

// We wrap the standard NextAuth handler to add rate limiting
async function authHandler(req: NextRequest, ctx: { params: Promise<{ nextauth: string[] }> }) {
  const params = await ctx.params;
  if (req.method === "POST" && params.nextauth.includes("callback") && params.nextauth.includes("credentials")) {
    const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";
    try {
      await loginRateLimiter.check(5, ip); // 5 attempts per minute
    } catch {
      return new NextResponse("Too Many Requests", { status: 429 });
    }
  }

  // NextAuth expects a standard Request in Next.js App Router
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return await NextAuth(authOptions)(req as any, ctx as any);
}

export { authHandler as GET, authHandler as POST };
