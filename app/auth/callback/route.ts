import dbServer from "@/lib/db_server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: { req: NextRequest }) {
  const cookieStore = cookies();
  const supabase = dbServer();
  const { searchParams } = new URL(req.req.url);
  const code = searchParams.get("code");

  console.log("Starting callback");
  if (code) {
    await supabase.auth.exchangeCodeForSession(code);
  }

  console.log("Callback complete");
  const newUrl = new URL("/dashboard", req.req.url);
  console.log("Redirecting to", newUrl.toString());
  return NextResponse.redirect(newUrl);
}
