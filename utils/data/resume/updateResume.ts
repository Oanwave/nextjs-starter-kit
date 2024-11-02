"use server"

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export const updateResume = async (resumeId: string, userId: string, data: any) => {
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
    const { data: resumeData, error } = await supabase
      .from("resume")
      .update({
        data: data,
        last_updated: new Date().toISOString(),
      })
      .eq("id", resumeId)
      .eq("user_id", userId)
      .select();

    if (error) throw error;
    return resumeData;
  } catch (error: any) {
    throw new Error(error.message);
  }
}; 