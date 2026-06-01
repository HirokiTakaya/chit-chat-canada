import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  const adminPassword = process.env.ADMIN_PASSWORD || "hiroki-bjj-admin";

  if (password === adminPassword) {
    const response = NextResponse.json({ success: true });
    response.cookies.set("admin-auth", adminPassword, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 24 hours
    });
    return response;
  }

  return NextResponse.json({ error: "Invalid password" }, { status: 401 });
}