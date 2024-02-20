"use server";

import { cookies } from "next/headers";

import { createClient } from "@/utils/supabase/actions";

const dbActions = () => {
  return createClient(cookies());
};

export default dbActions;
