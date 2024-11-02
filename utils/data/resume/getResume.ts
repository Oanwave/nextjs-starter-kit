"use server"

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export const getResume = async (resumeId: string, userId: string) => {
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
      .eq("id", resumeId)
      .eq("user_id", userId)
      .single();

    if (error) throw error;
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}; 