"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

// return string of an SVG

export const MainContent = async () => {
  const supabase = await createClient(cookies());
  // const { data: projects, error } = await supabase.from("projects").select("*");
  // let Iccon = iconMapper["search"];

  return <div></div>;
};
