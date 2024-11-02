import React from 'react';
import { MapPin, Phone, Mail, Globe, Github, Linkedin } from 'lucide-react';

interface Skill {
  name: string;
  level: string;
  keywords: string[];
}

const formatLocation = (location: any) => {
  // If location.city exists, use that
  if (location?.city) {
    return location.city;
  }
  
  // If location is array-like, join the characters
  if (typeof location === 'object' && Object.keys(location).some(key => !isNaN(Number(key)))) {
    return Object.keys(location)
      .filter(key => !isNaN(Number(key)))
      .sort((a, b) => Number(a) - Number(b))
      .map(key => location[key])
      .join('');
  }

  return 'Location not specified';
};

const formatSummary = (text: string | string[] | undefined | null) => {
    if (!text) return [];
    
    // If it's already an array, filter empty items
    if (Array.isArray(text)) {
      return text.filter(line => line && line.trim());
    }
    
    // Otherwise, split by newlines and filter out empty lines
    return text.toString().split('\n').filter(line => line.trim());
  };


const Gengar = ({ resumeData }: { resumeData: any }) => {
  return (
    <div className="max-w-6xl mx-auto p-6 bg-white min-h-screen">
      <div className="grid grid-cols-12 gap-6">
        {/* Left Sidebar */}
        <div className="col-span-4 bg-blue-600 text-white p-6 rounded-lg">
          <div className="space-y-6">
            <div>
              <img
                src={resumeData.basics.image || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-32 h-32 rounded-lg mb-4"
              />
              <h1 className="text-2xl font-bold">{resumeData.basics.name}</h1>
              <p className="text-lg">{resumeData.basics.label}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>{formatLocation(resumeData.basics.location)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span>{resumeData.basics.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span>{resumeData.basics.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe size={16} />
                <span>{resumeData.basics.url}</span>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold border-b border-white/20 pb-2 mb-3">Profiles</h2>
              <div className="space-y-2">
                {resumeData.basics.profiles.map((profile: any, index: number) => (
                  <div key={index} className="flex items-center gap-2">
                    {profile.network === 'Github' && <Github size={16} />}
                    {profile.network === 'Linkedin' && <Linkedin size={16} />}
                    <span>{profile.username}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold border-b border-white/20 pb-2 mb-3">Skills</h2>
              <div className="space-y-4">
                {resumeData.skills.map((skill: Skill, index: number) => (
                  <div key={index}>
                    <h3 className="font-medium mb-2">{skill.name}</h3>
                    <p className="text-sm mb-1">{skill.level}</p>
                    <p>{skill.keywords.join(', ')}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold border-b border-white/20 pb-2 mb-3">Certifications</h2>
              <div className="space-y-2">
                {resumeData.certifications.map((cert: any, index: number) => (
                  <div key={index}>
                    <h3 className="font-medium">{cert.name}</h3>
                    <p className="text-sm">{cert.issuer}</p>
                    <p className="text-sm">{cert.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-span-8 p-6">
          <div className="space-y-6">
            <div className="mb-8">
              <ul className="list-disc list-inside space-y-2">
                {formatSummary(resumeData.basics.summary).map((point, index) => (
                  <li key={index} className="text-gray-700">{point}</li>
                ))}
              </ul>
            </div>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 border-b border-gray-200 pb-2 mb-4">
                Experience
              </h2>
              <div className="space-y-6">
                {resumeData.work.map((job: any, index: number) => (
                  <div key={index}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-semibold">{job.position}</h3>
                        <p className="text-gray-600">{job.name}</p>
                        <a href={job.url} className="text-blue-500">{job.url}</a>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-600">{job.startDate} to {job.endDate}</p>
                        <p className="text-gray-600">{job.location}</p>
                      </div>
                    </div>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                      {formatSummary(job.summary).map((point, idx) => (
                        <li key={idx}>{point}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 border-b border-gray-200 pb-2 mb-4">
                Education
              </h2>
              <div className="space-y-6">
                {resumeData.education.map((edu: any, index: number) => (
                  <div key={index}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold">{edu.institution}</h3>
                        <p className="text-gray-600">{edu.area}</p>
                        <p className="text-gray-600">{edu.studyType}</p>
                      </div>
                      <p className="text-gray-600">{edu.startDate} to {edu.endDate}</p>
                    </div>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                      {formatSummary(edu.courses).map((course, idx) => (
                        <li key={idx}>{course}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 border-b border-gray-200 pb-2 mb-4">
                Projects
              </h2>
              <div className="space-y-4">
                {resumeData.projects.map((project: any, index: number) => (
                  <div key={index}>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold">{project.name}</h3>
                      <span className="text-gray-600">{project.role}</span>
                    </div>
                    <p className="text-gray-700">{project.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 border-b border-gray-200 pb-2 mb-4">
                Volunteer
              </h2>
              <div className="space-y-4">
                {resumeData.volunteer.map((vol: any, index: number) => (
                  <div key={index}>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold">{vol.organization}</h3>
                      <span className="text-gray-600">{vol.position}</span>
                    </div>
                    <p className="text-gray-700">{vol.summary}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gengar;