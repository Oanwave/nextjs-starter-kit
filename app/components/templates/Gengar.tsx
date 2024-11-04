import React, { useRef, useState } from 'react';
import { MapPin, Phone, Mail, Globe, Github, Linkedin, Download, Twitter, BriefcaseBusiness } from 'lucide-react';
import { Button } from '/components/ui/button';
const html2pdf = require('html2pdf.js');

interface Skill {
  name: string;
  level: string;
  keywords: string[];
}

interface Location {
  city?: string;
  region?: string;
  countryCode?: string;
}

const formatLocation = (location: Location | any) => {
  if (location?.city) {
    return location.city;
  }
  
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
  
  if (Array.isArray(text)) {
    return text.filter(line => line && line.trim());
  }
  
  return text.toString().split('\n').filter(line => line.trim());
};

const PDFLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-[210mm] min-h-[297mm] mx-auto bg-white shadow-lg">
      <div className="p-12">
        {children}
      </div>
    </div>
  );
};

const Gengar = ({ resumeData }: { resumeData: any }) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const [isPrinting, setIsPrinting] = useState(false);

  const handleDownloadPDF = () => {
    if (!componentRef.current) return;
    
    setIsPrinting(true);
    const element = componentRef.current;
    const opt = {
      margin: 0,
      filename: `${resumeData.basics.name}_Resume.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save()
      .then(() => setIsPrinting(false))
      .catch(err => {
        console.error('PDF generation failed:', err);
        setIsPrinting(false);
      });
  };

  return (
    <div className="flex flex-col items-center gap-8 py-8 min-h-screen">
      {/* Resume Content */}
      {/* <div ref={componentRef} className="w-full max-w-full"> */}
      <div ref={componentRef} className="w-full max-w-full">
        <PDFLayout>
          <div className="grid grid-cols-12 gap-6">
            {/* Left Sidebar */}
            <div className="col-span-4 bg-blue-600 text-white p-4 rounded-lg">
              <div className="space-y-8">
              <div className="text-center"> {/* Centered profile section */}
              {resumeData.basics.image?.length > 0 && (
              <img
                    src={resumeData.basics.image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDB8fDB8fHww"}
                    alt="Profile"
                    className="w-40 h-40 rounded-full mx-auto mb-4 border-4 border-white/20"
                  />
                  )}
                  <h1 className="text-3xl font-bold tracking-tight mb-2">{resumeData.basics.name}</h1>
                  <p className="text-xl font-light text-blue-100">{resumeData.basics.label}</p>
                </div>

                <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 p-2 hover:bg-blue-700/30 rounded transition-colors">
                    <MapPin size={18} className="text-blue-200" />
                    <span className="font-medium">{formatLocation(resumeData.basics.location)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={18} className="text-blue-200"/>
                    <span className="font-medium">{resumeData.basics.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={18} className="text-blue-200"/>
                    <span className="font-medium">{resumeData.basics.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe size={18} className="text-blue-200"/>
                    <span className="font-medium">{resumeData.basics.url}</span>
                  </div>
                </div>

                {resumeData.basics.profiles?.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold border-b border-white/20 pb-2 mb-3">Profiles</h2>
                  <div className="space-y-2">
                    {resumeData.basics.profiles.map((profile: any, index: number) => (
                      <a 
                        key={index} 
                        href={profile.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        {profile.network === 'Github' && <Github size={16} />}
                        {profile.network === 'Linkedin' && <Linkedin size={16} />}
                        {profile.network === 'Twitter' && <Twitter size={16} />}
                        {profile.network === 'BriefcaseBusiness' && <BriefcaseBusiness size={16} />}
                        <span>{profile.network}</span>
                      </a>
                    ))}
                  </div>
                </div>
                )}

                {/* Skills Section */}
                {resumeData.skills?.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold tracking-wide border-b-2 border-white/20 pb-2 mb-2">
                    EXPERTISE
                  </h2>
                  <div className="space-y-2">
                    {resumeData.skills.map((skill: Skill, index: number) => (
                      <div key={index} className="bg-blue-700/20 p-3 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">{skill.name}</h3>
                        <div className="text-sm space-y-2">
                          <p className="text-blue-200">{skill.level}</p>
                          <p className="font-light leading-relaxed">{skill.keywords.join(' • ')}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                )}
                {/* <div>
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
                </div> */}

                {resumeData.certifications?.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold tracking-wide border-b-2 border-white/20 pb-2 mb-2">Certifications</h2>
                  <div className="space-y-2">
                    {resumeData.certifications.map((cert: any, index: number) => (
                      <div key={index} className="bg-blue-700/20 p-3 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">{cert.name}</h3>
                        <p className="text-sm space-y-2">{cert.issuer}</p>
                        <p className="text-sm">{cert.date}</p>
                      </div>
                    ))}
                  </div>
                </div>
                )}

                {/* Languages Section */}
                {resumeData.languages?.length > 0 && (
                  <section>
                    <h2 className="text-xl font-bold tracking-wide border-b-2 border-white/20 pb-2 mb-2">
                      Languages
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                      {resumeData.languages.map((lang: any, index: number) => (
                        <div key={index} className="bg-blue-700/20 p-3 rounded-lg">
                          <span className="text-sm">{lang.language}</span>
                          <span className="text-sm">{lang.fluency}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Interests Section */}
                {resumeData.interests?.length > 0 && (
                  <section>
                    <h2 className="text-xl font-bold tracking-wide border-b-2 border-white/20 pb-2 mb-2">
                      Interests
                    </h2>
                    <div className="space-y-4">
                      {resumeData.interests.map((interest: any, index: number) => (
                        <div key={index} className="bg-blue-700/20 p-3 rounded-lg">
                          <h3 className="text-lg">{interest.name}</h3>
                          {interest.keywords && (
                            <p className="text-sm">{interest.keywords.join(', ')}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                )}

              </div>
            </div>

            {/* Main Content */}
            <div className="col-span-8 p-6">
              <div className="space-y-6">
                <div className="mb-8">
                <p className="text-gray-700 leading-relaxed">
                    {resumeData.basics.summary}
                </p>
                </div>

                {resumeData.work?.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-gray-800 border-b border-gray-200 pb-2 mb-2">
                    Experience
                  </h2>
                  <div className="space-y-6">
                    {resumeData.work.map((job: any, index: number) => (
                      <div key={index}>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-xl font-semibold">{job.position}</h3>
                            <p className="text-gray-600 text-sm">{job.name}</p>
                            <a href={job.url} className="text-blue-500 text-sm">{job.url}</a>
                          </div>
                          <div className="text-right text-sm text-nowrap">
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
                )}

                {resumeData.education?.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-gray-800 border-b border-gray-200 pb-2 mb-2">
                    Education
                  </h2>
                  <div className="space-y-6">
                    {resumeData.education.map((edu: any, index: number) => (
                      <div key={index}>
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-semibold">{edu.institution}</h3>
                            <p className="text-gray-600 text-sm">{edu.area}</p>
                            <p className="text-gray-600 text-sm">{edu.studyType}</p>
                            
                          </div>
                          <div className="text-right text-sm">
                          <p className="text-gray-600 text-nowrap">{edu.startDate} to {edu.endDate}</p>
                          <p className="text-gray-600">{edu.location}</p>
                          </div>
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
                )}

                {resumeData.projects?.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-gray-800 border-b border-gray-200 pb-2 mb-2">
                    Projects
                  </h2>
                  <div className="space-y-4">
                    {resumeData.projects.map((project: any, index: number) => (
                      <div key={index}>
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-semibold">{project.name}</h3>
                          <p className="text-gray-600 text-right text-sm">{project.startDate} to {project.endDate}</p>
                        </div>
                        
                        <div className="text-gray-700">
                        <span className="text-gray-600">{project.description}</span>
                        <p className="text-gray-700">{project.highlights.join(', ')}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
                )}

                {resumeData.volunteer?.length > 0 && (
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
                )}

                {/* Awards Section */}
                {resumeData.awards?.length > 0 && (
                  <section>
                    <h2 className="text-2xl font-bold text-gray-800 border-b border-gray-200 pb-2 mb-4">
                      Awards
                    </h2>
                    <div className="space-y-4">
                      {resumeData.awards.map((award: any, index: number) => (
                        <div key={index}>
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-semibold">{award.title}</h3>
                            <span className="text-gray-600 text-right text-sm">{award.date}</span>
                          </div>
                          <p className="text-gray-600">{award.awarder}</p>
                          <p className="text-gray-700">{award.summary}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Publications Section */}
                {resumeData.publications?.length > 0 && (
                  <section>
                    <h2 className="text-2xl font-bold text-gray-800 border-b border-gray-200 pb-2 mb-4">
                      Publications
                    </h2>
                    <div className="space-y-4">
                      {resumeData.publications.map((pub: any, index: number) => (
                        <div key={index}>
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-semibold">{pub.name}</h3>
                            <span className="text-gray-600">{pub.releaseDate}</span>
                          </div>
                          <p className="text-gray-600">{pub.publisher}</p>
                          <p className="text-gray-700">{pub.summary}</p>
                          {pub.url && (
                            <a href={pub.url} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                              View Publication
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                )}


                {/* References Section */}
                {resumeData.references?.length > 0 && (
                  <section>
                    <h2 className="text-2xl font-bold text-gray-800 border-b border-gray-200 pb-2 mb-4">
                      References
                    </h2>
                    <div className="space-y-4">
                      {resumeData.references.map((ref: any, index: number) => (
                        <div key={index}>
                          <h3 className="text-xl font-semibold">{ref.name}</h3>
                          <p className="text-gray-600">{ref.reference}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

              </div>
            </div>
          </div>
        </PDFLayout>
      </div>

      {/* Download Button - Now at the bottom */}
      <Button
        onClick={handleDownloadPDF}
        disabled={isPrinting}
        className="no-print flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700"
      >
        <Download size={16} />
        {isPrinting ? 'Preparing PDF...' : 'Download PDF'}
      </Button>
    </div>
  );
};

export default Gengar;