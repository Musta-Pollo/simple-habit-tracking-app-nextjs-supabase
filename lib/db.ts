import { Database } from "@/supabase";
import {
  SupabaseClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

declare global {
  var prisma: SupabaseClient<Database> | undefined;
}

export const db =
  globalThis.prisma || createServerComponentClient<Database>({ cookies });

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
