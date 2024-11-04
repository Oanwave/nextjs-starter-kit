import React, { useState, useRef } from 'react';
import { Card, CardContent } from '/components/ui/card';
import { Badge } from '/components/ui/badge';
// import { Progress } from '/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '/components/ui/tabs';
import { Button } from '/components/ui/button';
import {
  Mail, Phone, Globe, MapPin, Calendar, Award, Download,
  BookOpen, Briefcase, Code, Heart, Star,
  Users, Languages, GraduationCap, CircleUserRound,
  Github, Linkedin, Twitter, ExternalLink
} from 'lucide-react';
import { ResumeData } from '@/types/resume';
const html2pdf = require('html2pdf.js');
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

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

const formatDate = (date: string) => {
  if (!date) return 'Present';
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric'
  }).format(new Date(date));
};
const formatSummary = (text: string | string[] | undefined | null) => {
    if (!text) return [];
    
    if (Array.isArray(text)) {
      return text.filter(line => line && line.trim());
    }
    
    return text.toString().split('\n').filter(line => line.trim());
  };
const SectionHeader = ({ icon: Icon, title }: { icon: any; title: string }) => (
  <div className="flex items-center gap-2 mb-6">
    <Icon className="w-6 h-6 text-blue-600" />
    <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
  </div>
);

const Modern = ({ resumeData }: { resumeData: any }) => {
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
        <div className={`flex flex-col items-center gap-8 py-8 min-h-screen ${inter.className}`}>
            <div ref={componentRef} className="w-full max-w-[850px] bg-white">
                {/* Header Section */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4">
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="grid grid-cols-12 gap-8 items-center">
                            <div className="col-span-12 md:col-span-4 flex flex-col items-center text-center">
                                <div className="w-40 h-40 rounded-full overflow-hidden mb-4 border-4 border-white/20">
                                    {resumeData.basics.image ? (
                                        <img
                                            src={resumeData.basics.image}
                                            alt={resumeData.basics.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-blue-800 flex items-center justify-center">
                                            <CircleUserRound className="w-20 h-20 text-white/70" />
                                        </div>
                                    )}
                                </div>
                                <h1 className="text-3xl font-bold mb-2">{resumeData.basics.name}</h1>
                                <p className="text-xl text-blue-100 mb-4">{resumeData.basics.label}</p>
                                <div className="flex gap-4">
                                    {resumeData.basics.profiles.map((profile: { network: string; url: string }) => {
                                        const IconMap: Record<string, any> = {
                                            'Github': Github,
                                            'LinkedIn': Linkedin,
                                            'Twitter': Twitter
                                        };
                                        const Icon = IconMap[profile.network] || Globe;
                                        return (
                                            <a
                                                key={profile.network}
                                                href={profile.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-white/80 hover:text-white transition-colors"
                                            >
                                                <Icon className="w-6 h-6" />
                                            </a>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-8">
                                <div className="space-y-6">
                                    <p className="text-md leading-relaxed text-blue-50">
                                        {resumeData.basics.summary}
                                    </p>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex items-center gap-3 text-blue-50">
                                            <Mail className="w-5 h-5" />
                                            <a href={`mailto:${resumeData.basics.email}`} className="hover:text-white">
                                                {resumeData.basics.email}
                                            </a>
                                        </div>
                                        {resumeData.basics.phone && (
                                            <div className="flex items-center gap-3">
                                                <Phone className="w-5 h-5" />
                                                <a href={`tel:${resumeData.basics.phone}`} className="hover:text-white">
                                                    {resumeData.basics.phone}
                                                </a>
                                            </div>
                                        )}
                                        {resumeData.basics.url && (
                                            <div className="flex items-center gap-3">
                                                <Globe className="w-5 h-5" />
                                                <a href={resumeData.basics.url} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                                                    {resumeData.basics.url}
                                                </a>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-3 text-blue-50">
                                            <MapPin className="w-5 h-5" />
                                            <span>{resumeData.basics.location.city}, {resumeData.basics.location.region}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-6xl mx-auto px-6 py-12">
                    <div className="space-y-6">
                        {/* Work Experience */}
                        {resumeData.work?.length > 0 && (
                            <section>
                                <SectionHeader icon={Briefcase} title="Experience" />
                                <div className="space-y-4">
                                    {resumeData.work.map((job, index) => (
                                        <Card key={index} className="hover:shadow-lg transition-all">
                                            <CardContent className="p-6">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div>
                                                        <h3 className="text-xl font-bold text-gray-800">{job.position}</h3>
                                                        <div className="flex items-center gap-2 text-blue-600">
                                                            <span>{job.name}</span>
                                                            {job.url && (
                                                                <a href={job.url} target="_blank" rel="noopener noreferrer">
                                                                    <ExternalLink className="w-4 h-4" />
                                                                </a>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                                                            <Calendar className="w-4 h-4" />
                                                            <span>{formatDate(job.startDate)} - {formatDate(job.endDate)}</span>
                                                        </div>
                                                        {job.location && (
                                                            <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
                                                                <MapPin className="w-4 h-4" />
                                                                <span>{job.location}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <ul className="space-y-2 text-sm">
                                                    {formatSummary(job.summary).map((point, idx) => (
                                                        <li key={idx}>{point}</li>
                                                    ))}
                                                    {/* {job.highlights.map((highlight, i) => (
                          <li key={i} className="flex items-start gap-2 text-gray-600">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                            <span>{highlight}</span>
                          </li>
                        ))} */}
                                                </ul>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Education */}
                        {resumeData.education.length > 0 && (
                            <section>
                                <SectionHeader icon={GraduationCap} title="Education" />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {resumeData.education.map((edu, index) => (
                                        <Card key={index} className="hover:shadow-lg transition-all">
                                            <CardContent className="p-6">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div>
                                                        <h3 className="text-xl font-bold text-gray-800">{edu.institution}</h3>
                                                        <p className="text-blue-600">{edu.studyType} in {edu.area}</p>
                                                        {edu.url && (
                                                            <a
                                                                href={edu.url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-sm text-blue-500 hover:text-blue-600 flex items-center gap-1"
                                                            >
                                                                <Globe className="w-4 h-4" />
                                                                <span>Website</span>
                                                            </a>
                                                        )}
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                                                            <Calendar className="w-4 h-4" />
                                                            <span>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</span>
                                                        </div>
                                                        {edu.location && (
                                                            <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
                                                                <MapPin className="w-4 h-4" />
                                                                <span>{edu.location}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                {edu.score && (
                                                    <div className="flex items-center gap-2 text-gray-700 mb-2">
                                                        <Star className="w-4 h-4 text-yellow-500" />
                                                        <span className="text-sm">GPA: {edu.score}</span>
                                                    </div>
                                                )}
                                                {edu.courses.length > 0 && (
                                                    <div className="mt-2">
                                                        {/* <p className="font-medium text-gray-700 mb-2">Key Courses:</p> */}
                                                        <ul className="flex flex-wrap gap-2">
                                                            {edu.courses.map((course, i) => (
                                                                <li key={i} className="text-sm">{course}</li>
                                                                // <Badge key={i} variant="secondary" className="text-sm">{course}</Badge>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Skills */}
                        {resumeData.skills.length > 0 && (
                            <section>
                                <SectionHeader icon={Code} title="Skills" />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {resumeData.skills.map((skill, index) => (
                                        <Card key={index}>
                                            <CardContent className="p-6">
                                                <div className="flex justify-between items-center mb-4">
                                                    <h3 className="text-lg font-semibold text-gray-800">{skill.name}</h3>
                                                    <Badge>{skill.level}</Badge>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {skill.keywords.map((keyword, i) => (
                                                        <Badge key={i} variant="outline" className="bg-blue-50">
                                                            {keyword}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Projects */}
                        {resumeData.projects?.length > 0 && (
                            <section>
                                <SectionHeader icon={Code} title="Projects" />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {resumeData.projects.map((project, index) => (
                                        <Card key={index} className="hover:shadow-lg transition-all">
                                            <CardContent className="p-6">
                                                <div className="flex justify-between items-start mb-4">
                                                    <h3 className="text-xl font-bold text-gray-800">{project.name}</h3>
                                                    <div className="text-gray-600 text-sm">
                                                        {formatDate(project.startDate)} - {formatDate(project.endDate)}
                                                    </div>
                                                </div>
                                                <p className="text-gray-700 mb-4">{project.description}</p>
                                                <ul className="space-y-2 mb-4">
                                                    {project.highlights.map((highlight, i) => (
                                                        <li key={i} className="flex items-start gap-2 text-gray-600">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                                                            <span>{highlight}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                                {project.url && (
                                                    <a
                                                        href={project.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
                                                    >
                                                        <Globe className="w-4 h-4" />
                                                        <span>View Project</span>
                                                    </a>
                                                )}
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Additional Sections Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Languages */}
                            {resumeData.languages?.length > 0 && (
                                <Card>
                                    <CardContent className="p-6">
                                        <SectionHeader icon={Languages} title="Languages" />
                                        <div className="space-y-4">
                                            {resumeData.languages.map((language, index) => (
                                                <div key={index}>
                                                    <div className="flex justify-between mb-2">
                                                        <span className="font-medium text-gray-700">{language.language}</span>
                                                        <span className="text-gray-600">{language.fluency}</span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                                        <div
                                                            className="bg-blue-600 h-2 rounded-full transition-all"
                                                            style={{
                                                                width: `${language.fluency === 'Native' ? 100 :
                                                                        language.fluency === 'Fluent' ? 90 :
                                                                            language.fluency === 'Professional' ? 75 :
                                                                                language.fluency === 'Intermediate' ? 50 : 25
                                                                    }%`
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}


                            {/* Interests */}
                            {resumeData.interests?.length > 0 && (
                                <Card>
                                    <CardContent className="p-6">
                                        <SectionHeader icon={Heart} title="Interests" />
                                        <div className="flex flex-wrap gap-2">
                                            {resumeData.interests.map((interest, index) => (
                                                <Badge key={index} variant="secondary">
                                                    {interest.name} : {interest.keywords.map((keyword, i) => (
                                                        <Badge key={i} variant="outline" className="bg-blue-50">
                                                            {keyword}
                                                        </Badge>
                                                    ))}
                                                </Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </div>

                        {/* Volunteer Experience */}
                        {resumeData.volunteer?.length > 0 && (
                            <section>
                                <SectionHeader icon={Heart} title="Volunteer Experience" />
                                <div className="space-y-8">
                                    {resumeData.volunteer.map((vol: any, index: number) => (
                                        <Card key={index} className="hover:shadow-lg transition-all">
                                            <CardContent className="p-6">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div>
                                                        <h3 className="text-xl font-bold text-gray-800">{vol.position}</h3>
                                                        <div className="text-blue-600">{vol.organization}</div>
                                                    </div>
                                                    <div className="text-right text-sm text-gray-600">
                                                        <div className="flex items-center gap-2">
                                                            <Calendar className="w-4 h-4" />
                                                            <span>{formatDate(vol.startDate)} - {formatDate(vol.endDate)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <ul className="space-y-2 text-gray-600">
                                                    {formatSummary(vol.summary).map((point, idx) => (
                                                        <li key={idx}>{point}</li>
                                                    ))}
                                                </ul>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Awards */}
                        {resumeData.awards?.length > 0 && (
                            <section>
                                <SectionHeader icon={Award} title="Awards" />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {resumeData.awards.map((award: any, index: number) => (
                                        <Card key={index}>
                                            <CardContent className="p-6">
                                                <h3 className="text-lg font-semibold text-gray-800">{award.title}</h3>
                                                <p className="text-blue-600 text-sm">{award.awarder}</p>
                                                <div className="text-sm text-gray-600 mt-2">
                                                    <Calendar className="w-4 h-4 inline mr-2" />
                                                    {formatDate(award.date)}
                                                </div>
                                                {award.summary && (
                                                    <p className="mt-2 text-gray-600">{award.summary}</p>
                                                )}
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Certifications */}
                        {resumeData.certificates?.length > 0 && (
                            <section>
                                <SectionHeader icon={Award} title="Certifications" />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {resumeData.certificates.map((cert: any, index: number) => (
                                        <Card key={index}>
                                            <CardContent className="p-6">
                                                <h3 className="text-lg font-semibold text-gray-800">{cert.name}</h3>
                                                <p className="text-blue-600 text-sm">{cert.issuer}</p>
                                                <div className="text-sm text-gray-600 mt-2">
                                                    <Calendar className="w-4 h-4 inline mr-2" />
                                                    {formatDate(cert.date)}
                                                </div>
                                                {cert.url && (
                                                    <a 
                                                        href={cert.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 hover:text-blue-700 mt-2 inline-flex items-center gap-1"
                                                    >
                                                        <ExternalLink className="w-4 h-4" />
                                                        View Certificate
                                                    </a>
                                                )}
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Publications */}
                        {resumeData.publications?.length > 0 && (
                            <section>
                                <SectionHeader icon={BookOpen} title="Publications" />
                                <div className="space-y-6">
                                    {resumeData.publications.map((pub: any, index: number) => (
                                        <Card key={index}>
                                            <CardContent className="p-6">
                                                <h3 className="text-lg font-semibold text-gray-800">{pub.name}</h3>
                                                <p className="text-blue-600 text-sm">{pub.publisher}</p>
                                                <div className="text-sm text-gray-600 mt-2">
                                                    <Calendar className="w-4 h-4 inline mr-2" />
                                                    {formatDate(pub.releaseDate)}
                                                </div>
                                                {pub.summary && (
                                                    <p className="mt-2 text-gray-600">{pub.summary}</p>
                                                )}
                                                {pub.url && (
                                                    <a 
                                                        href={pub.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 hover:text-blue-700 mt-2 inline-flex items-center gap-1"
                                                    >
                                                        <ExternalLink className="w-4 h-4" />
                                                        View Publication
                                                    </a>
                                                )}
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* References */}
                        {resumeData.references?.length > 0 && (
                            <section>
                                <SectionHeader icon={Users} title="References" />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {resumeData.references.map((reference, index) => (
                                        <Card key={index}>
                                            <CardContent className="p-6">
                                                <h3 className="text-lg font-semibold text-gray-800 mb-2">{reference.name}</h3>
                                                <p className="text-gray-700 italic">"{reference.reference}"</p>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </div>

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

export default Modern;