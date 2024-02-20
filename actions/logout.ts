"use server";

import dbActions from "@/lib/db_actions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const logout = async () => {
  const db = dbActions();
  const res = await db.auth.signOut();
  console.log("res", res);
  const u = await db.auth.getUser();
  const {
    data: { user },
  } = u;
  console.log("Logged out");
  revalidatePath(`/`);
  redirect(`/`);
};
