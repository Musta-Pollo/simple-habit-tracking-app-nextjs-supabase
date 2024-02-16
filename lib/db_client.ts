"use client";

import { createClient } from "@/utils/supabase/client";

export default function dbClient() {
  return createClient();
}
