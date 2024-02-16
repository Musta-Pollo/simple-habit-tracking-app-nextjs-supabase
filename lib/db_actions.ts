"use server";

import { cookies } from "next/headers";

import { createClient } from "@/utils/supabase/actions";

export default function dbActions() {
  return createClient(cookies());
}
