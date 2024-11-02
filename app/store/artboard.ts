import { create } from 'zustand';

interface Profile {
  network: string;
  url: string;
  username: string;
}

interface Work {
  name: string;
  position: string;
  url: string;
  startDate: string;
  endDate: string;
  summary: string;
}

interface Education {
  institution: string;
  url: string;
  area: string;
  studyType: string;
  startDate: string;
  endDate: string;
  score: string;
}

interface Skill {
  name: string;
  level: string;
}

interface Award {
  title: string;
  date: string;
  awarder: string;
  summary: string;
}

interface Certification {
  name: string;
  date: string;
  issuer: string;
  url: string;
}

interface Project {
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  highlights: string[];
  url: string;
}

interface Volunteer {
  organization: string;
  position: string;
  url: string;
  startDate: string;
  endDate: string;
  summary: string;
}

interface Language {
  language: string;
  fluency: string;
}

interface Reference {
  name: string;
  reference: string;
}

interface Interest {
  name: string;
  keywords: string[];
}

interface Publication {
  name: string;
  publisher: string;
  releaseDate: string;
  url: string;
  summary: string;
}

interface Resume {
  basics: {
    name: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
    profiles: Profile[];
  };
  work: Work[];
  education: Education[];
  skills: Skill[];
  awards: Award[];
  certifications: Certification[];
  projects: Project[];
  volunteer: Volunteer[];
  languages: Language[];
  references: Reference[];
  interests: Interest[];
  publications: Publication[];
}

interface ArtboardState {
  resume: Resume;
  setResume: (resume: Resume) => void;
}

export const useArtboardStore = create<ArtboardState>((set) => ({
  resume: {
    basics: {
      name: '',
      email: '',
      phone: '',
      location: '',
      summary: '',
      profiles: [],
    },
    work: [],
    education: [],
    skills: [],
    awards: [],
    certifications: [],
    projects: [],
    volunteer: [],
    languages: [],
    references: [],
    interests: [],
    publications: [],
  },
  setResume: (resume: Resume) => set((state) => ({ resume })),
}));
