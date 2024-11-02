"use server"

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export const getResumes = async (userId: string) => {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  try {
    const { data, error } = await supabase
      .from("resume")
      .select("*")
      .eq("user_id", userId)
      .order("created_time", { ascending: false });

    if (error) throw error;
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}; 