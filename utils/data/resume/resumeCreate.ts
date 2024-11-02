"use server"

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

interface CreateResumeProps {
  title: string;
  description: string;
  userId: string;
  data: {
    basics: {
      name: string;
      label: string;
      image: string;
      email: string;
      phone: string;
      url: string;
      summary: string;
      address: string;
      location: {
        address: string;
        postalCode: string;
        city: string;
        countryCode: string;
        region: string;
      };
      profiles: Array<{
        network: string;
        username: string;
        url: string;
      }>;
    };
    work: Array<{
      name: string;
      position: string;
      url: string;
      startDate: string;
      endDate: string;
      summary: string;
      highlights: string[];
    }>;
    education: Array<{
      institution: string;
      url: string;
      area: string;
      studyType: string;
      startDate: string;
      endDate: string;
      score: string;
      courses: string[];
    }>;
    skills: Array<{
      name: string;
      level: string;
      keywords: string[];
    }>;
    awards: Array<{
      title: string;
      date: string;
      awarder: string;
      summary: string;
    }>;
    certifications: Array<{
      name: string;
      date: string;
      issuer: string;
      level: number;
    }>;
    publications: Array<{
      name: string;
      publisher: string;
      releaseDate: string;
      summary: string;
    }>;
    languages: Array<{
      language: string;
      fluency: string;
    }>;
    interests: Array<{
      name: string;
      keywords: string[];
    }>;
    references: Array<{
      name: string;
      reference: string;
    }>;
    projects: Array<{
      name: string;
      description: string;
      highlights: string[];
      startDate: string;
      endDate: string;
    }>;
    volunteer: Array<{
      organization: string;
      position: string;
      startDate: string;
      endDate: string;
      summary: string;
    }>;
  };
}

export const createResume = async ({
  title,
  description,
  userId,
  data
}: CreateResumeProps) => {
  const cookieStore = cookies();

  console.log('Creating resume with:', { title, description, userId });

  const supabase = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
      auth: {
        persistSession: false,
      }
    }
  );

  try {
    const { data: resumeData, error } = await supabase
      .from("resume")
      .insert([
        {
          title,
          description,
          user_id: userId,
          data: data,
          last_updated: new Date().toISOString(),
        },
      ])
      .select();

    console.log('Resume created:', resumeData);
    console.log('Error if any:', error);

    if (error) {
      console.error('Supabase error:', error);
      throw new Error(`Database error: ${error.message}`);
    }

    return resumeData;
  } catch (error: any) {
    console.error('Error in createResume:', error);
    throw new Error(error.message || 'Failed to create resume');
  }
}; 