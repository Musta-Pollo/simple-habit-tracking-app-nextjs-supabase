"use server";
import { cookies } from "next/headers";

import { createClient } from "@/utils/supabase/server";

const dbServer = () => {
  return createClient(cookies());
};

export default dbServer;
