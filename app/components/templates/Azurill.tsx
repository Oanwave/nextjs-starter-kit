// import React from 'react';

// const Azurill = ({ resume }: { resume: any }) => {
//   return (
//     <div className="p-4 border border-gray-300 rounded">
//       <h1 className="text-2xl font-bold">{resume.basics.name}</h1>
//       <p className="text-base">{resume.basics.label}</p>
//       <p>{resume.basics.email}</p>
//       <p>{resume.basics.phone}</p>
//       <p>{resume.basics.location.city}, {resume.basics.location.region}</p>
//       <p>{resume.basics.summary}</p>
//       <div>
//         <h2 className="font-bold">Profiles</h2>
//         {resume.basics.profiles.map((profile: { network: string; url: string; username: string; }) => (
//           <div key={profile.network}>
//             <a href={profile.url} target="_blank" rel="noreferrer">{profile.username}</a>
//           </div>
//         ))}
//       </div>
//       <div>
//         <h2 className="font-bold">Experience</h2>
//         {resume.work.map((job: { name: string; position: string; url: string; startDate: string; endDate: string; summary: string; }) => (
//           <div key={job.name}>
//             <h3 className="font-bold">{job.position} at {job.name}</h3>
//             <p>{job.startDate} - {job.endDate}</p>
//             <p>{job.summary}</p>
//           </div>
//         ))}
//       </div>
//       <div>
//         <h2 className="font-bold">Education</h2>
//         {resume.education.map((edu: { institution: string; url: string; area: string; studyType: string; startDate: string; endDate: string; score: string; }) => (
//           <div key={edu.institution}>
//             <h3 className="font-bold">{edu.institution}</h3>
//             <p>{edu.area} - {edu.studyType}</p>
//             <p>{edu.startDate} - {edu.endDate}</p>
//           </div>
//         ))}
//       </div>
//       <div>
//         <h2 className="font-bold">Skills</h2>
//         {resume.skills.map((skill: { name: string; level: string; }) => (
//           <div key={skill.name}>
//             <h3 className="font-bold">{skill.name}</h3>
//             <p>{skill.level}</p>
//           </div>
//         ))}
//       </div>
//       {/* Add other sections like awards, certifications, etc. similarly */}
//     </div>
//   );
// };

// export default Azurill;

import React from 'react';

// TypeScript Interfaces for Resume Data
interface Profile {
  network: string;
  username: string;
  url: string;
}

interface WorkExperience {
  name: string;
  position: string;
  url: string;
  startDate: string;
  endDate: string;
  summary: string;
  highlights: string[];
}

interface Education {
  institution: string;
  url: string;
  area: string;
  studyType: string;
  startDate: string;
  endDate: string;
  score: string;
  courses: string[];
}

interface ResumeData {
  basics: {
    name: string;
    label: string;
    image: string;
    email: string;
    phone: string;
    url: string;
    summary: string;
    location: {
      address: string;
      postalCode: string;
      city: string;
      countryCode: string;
      region: string;
    };
    profiles: Profile[];
  };
  work: WorkExperience[];
  education: Education[];
  skills: {
    name: string;
    level: string;
    keywords: string[];
  }[];
  languages: {
    language: string;
    fluency: string;
  }[];
  interests: {
    name: string;
    keywords: string[];
  }[];
  references: {
    name: string;
    reference: string;
  }[];
  projects: {
    name: string;
    startDate: string;
    endDate: string;
    description: string;
    highlights: string[];
    url: string;
  }[];
}
  // Dummy data based on your JSON structure
  const resumeData: ResumeData = {
    basics: {
      name: "John Doe",
      label: "Programmer",
      image: "",  // If you have an image URL, you can insert it here
      email: "john@gmail.com",
      phone: "(912) 555-4321",
      url: "https://johndoe.com",
      summary: "A summary of John Doe…",
      location: {
        address: "2712 Broadway St",
        postalCode: "CA 94115",
        city: "San Francisco",
        countryCode: "US",
        region: "California"
      },
      profiles: [
        {
          network: "Twitter",
          username: "john",
          url: "https://twitter.com/john"
        }
      ]
    },
    work: [
      {
        name: "Company",
        position: "President",
        url: "https://company.com",
        startDate: "2013-01-01",
        endDate: "2014-01-01",
        summary: "Description…",
        highlights: [
          "Started the company"
        ]
      }
    ],
    // Add more sections like education, skills, languages, interests, references, projects, etc. here...
    education: [
      {
        institution: "University of Example",
        url: "https://institution.com/",
        area: "Software Development",
        studyType: "Bachelor",
        startDate: "2011-01-01",
        endDate: "2015-01-01",
        score: "3.9",
        courses: ["DB1101 - Basic SQL", "CS2302 - Algorithms"]
      }
    ],
    skills: [
      {
        name: "Web Development",
        level: "Advanced",
        keywords: ["HTML", "CSS", "JavaScript", "React"]
      }
    ],
    languages: [
      {
        language: "English",
        fluency: "Native speaker"
      },
      {
        language: "Spanish",
        fluency: "Intermediate"
      }
    ],
    interests: [
      {
        name: "Technology",
        keywords: ["Innovation", "New Trends"]
      },
      {
        name: "Photography",
        keywords: ["Landscape", "Portraits"]
      }
    ],
    references: [
      {
        name: "Jane Smith",
        reference: "Jane was a direct manager during my tenure at Tech Co."
      }
    ],
    projects: [
      {
        name: "Online Marketplace",
        startDate: "2019-01-01",
        endDate: "2020-01-01",
        description: "Developed a leading platform for online transactions between users.",
        highlights: ["Led the project", "Implemented key features"],
        url: "https://project.com/"
      }
    ]
  };


const Azurill: React.FC = () => {

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg">
      <div className="border-b-2 border-gray-200 pb-4 mb-4">
        <h1 className="text-xl font-bold text-gray-900">{resumeData.basics.name}</h1>
        <p className="text-sm text-gray-500">{resumeData.basics.label}</p>
      </div>
      <div>
        <h2 className="font-semibold text-gray-700">Contact</h2>
        <p className="text-gray-600">{resumeData.basics.email} | {resumeData.basics.phone}</p>
        <p className="text-gray-600">{resumeData.basics.url}</p>
      </div>
      (
    <div className="bg-white p-6 shadow-lg rounded-lg">
      <div className="border-b-2 border-gray-200 pb-4 mb-4">
        <h1 className="text-xl font-bold text-gray-900">{resumeData.basics.name}</h1>
        <p className="text-sm text-gray-500">{resumeData.basics.label}</p>
        <div className="flex items-center space-x-4 mt-2">
          <a href={resumeData.basics.url} className="text-blue-500 hover:underline">{resumeData.basics.url}</a>
          <a href={`mailto:${resumeData.basics.email}`} className="text-blue-500 hover:underline">{resumeData.basics.email}</a>
          <span className="text-gray-600">{resumeData.basics.phone}</span>
        </div>
      </div>

      {/* Work Experience Section */}
      <div className="mb-6">
        <h2 className="font-semibold text-gray-800 text-lg mb-3">Experience</h2>
        {resumeData.work.map((job, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-gray-800 font-semibold">{job.position} at <a href={job.url} className="text-blue-500 hover:underline">{job.name}</a></h3>
            <p className="text-gray-500 text-sm">{job.startDate} - {job.endDate}</p>
            <p className="text-gray-600">{job.summary}</p>
            <ul className="list-disc ml-5 text-gray-600">
              {job.highlights.map((highlight, idx) => <li key={idx}>{highlight}</li>)}
            </ul>
          </div>
        ))}
      </div>

      {/* Education Section */}
      <div className="mb-6">
        <h2 className="font-semibold text-gray-800 text-lg mb-3">Education</h2>
        {resumeData.education.map((edu, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-gray-800 font-semibold">{edu.institution}</h3>
            <p className="text-gray-500 text-sm">{edu.startDate} - {edu.endDate}</p>
            <p className="text-gray-600">{edu.area}, {edu.studyType}</p>
            <p className="text-gray-600">GPA: {edu.score}</p>
          </div>
        ))}
      </div>

      {/* Skills Section */}
      <div className="mb-6">
        <h2 className="font-semibold text-gray-800 text-lg mb-3">Skills</h2>
        <div className="flex flex-wrap">
          {resumeData.skills.map((skill, index) => (
            <span key={index} className="m-1 bg-gray-200 rounded-full px-4 py-1 text-sm text-gray-700">{skill.name}</span>
          ))}
        </div>
      </div>

      {/* Projects Section (if applicable) */}
      <div className="mb-6">
        <h2 className="font-semibold text-gray-800 text-lg mb-3">Projects</h2>
        {resumeData.projects.map((project, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-gray-800 font-semibold">{project.name}</h3>
            <p className="text-gray-500 text-sm">{project.startDate} - {project.endDate}</p>
            <p className="text-gray-600">{project.description}</p>
            <ul className="list-disc ml-5 text-gray-600">
              {project.highlights.map((highlight, idx) => <li key={idx}>{highlight}</li>)}
            </ul>
          </div>
        ))}
      </div>

      {/* Languages and Interests (Optional) */}
      <div className="mb-6">
        <h2 className="font-semibold text-gray-800 text-lg mb-3">Languages</h2>
        {resumeData.languages.map((language, index) => (
          <p key={index} className="text-gray-600">{language.language} ({language.fluency})</p>
        ))}
      </div>
      <div className="mb-6">
        <h2 className="font-semibold text-gray-800 text-lg mb-3">Interests</h2>
        {resumeData.interests.map((interest, index) => (
          <p key={index} className="text-gray-600">{interest.name}</p>
        ))}
      </div>
    </div>
    </div>
  );
}

export default Azurill;
