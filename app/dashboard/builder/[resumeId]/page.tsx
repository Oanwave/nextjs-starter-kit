'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useUser } from "@clerk/nextjs";
import { Button } from "/components/ui/button";
import { Input } from "/components/ui/input";
import { Textarea } from "/components/ui/textarea";
import Gengar from 'app/components/templates/Gengar';
import { getResume } from "/utils/data/resume/getResume";
import { updateResume } from "/utils/data/resume/updateResume";
import Slider from "/components/ui/slider"
import { Label } from "/components/ui/label"
import { Upload, Plus, Trash2 } from 'lucide-react';

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
}

const initialResumeData: ResumeData = {
  basics: {
    name: '',
    label: '',
    image: '',
    email: '',
    phone: '',
    url: '',
    summary: '',
    location: {
      address: '',
      postalCode: '',
      city: '',
      countryCode: '',
      region: '',
    },
    profiles: [{ network: '', username: '', url: '' }],
  },
  work: [{ name: '', position: '', url: '', startDate: '', endDate: '', summary: '', highlights: [''] }],
  education: [{ institution: '', url: '', area: '', studyType: '', startDate: '', endDate: '', score: '', courses: [''] }],
  skills: [{ name: '', level: '', keywords: [''] }],
  awards: [{ title: '', date: '', awarder: '', summary: '' }],
  certifications: [{ name: '', date: '', issuer: '', level: 0 }],
  publications: [{ name: '', publisher: '', releaseDate: '', summary: '' }],
  languages: [{ language: '', fluency: '' }],
  interests: [{ name: '', keywords: [] }],
  references: [{ name: '', reference: '' }],
  projects: [{ name: '', description: '', highlights: [], startDate: '', endDate: '' }],
  volunteer: [{ organization: '', position: '', startDate: '', endDate: '', summary: '' }]
};

const ProfilesSection = ({ profiles, onChange }: {
  profiles: any[],
  onChange: (profiles: any[]) => void
}) => {
  const addProfile = () => {
    onChange([...profiles, { network: '', url: '', username: '' }]);
  };

  const removeProfile = (index: number) => {
    const newProfiles = profiles.filter((_, i) => i !== index);
    onChange(newProfiles);
  };

  const updateProfile = (index: number, field: string, value: string) => {
    const newProfiles = [...profiles];
    newProfiles[index] = { ...newProfiles[index], [field]: value };
    onChange(newProfiles);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Profiles</h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addProfile}
          className="flex items-center gap-2"
        >
          <Plus size={16} />
          Add Profile
        </Button>
      </div>

      {profiles.map((profile, index) => (
        <div key={index} className="flex gap-4 items-start">
          <select
            value={profile.network}
            onChange={(e) => updateProfile(index, 'network', e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">Select Network</option>
            <option value="Github">GitHub</option>
            <option value="Linkedin">LinkedIn</option>
            <option value="Twitter">Twitter</option>
            <option value="Portfolio">Portfolio</option>
          </select>

          <Input
            placeholder="Profile URL"
            value={profile.url}
            onChange={(e) => updateProfile(index, 'url', e.target.value)}
          />

          <Input
            placeholder="Username"
            value={profile.username}
            onChange={(e) => updateProfile(index, 'username', e.target.value)}
          />

          <Button
            type="button"
            variant="destructive"
            size="icon"
            onClick={() => removeProfile(index)}
          >
            <Trash2 size={16} />
          </Button>
        </div>
      ))}
    </div>
  );
};

const ImageUpload = ({ value, onChange }: { 
  value: string, 
  onChange: (value: string) => void 
}) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      setError('');
      
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      onChange(data.url);
    } catch (error) {
      console.error('Error uploading image:', error);
      setError('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <Label>Profile Image</Label>
      <div className="flex items-center gap-4">
        {value && (
          <img 
            src={value} 
            alt="Profile" 
            className="w-20 h-20 rounded-full object-cover"
          />
        )}
        <div className="space-y-2">
          <Label 
            htmlFor="image-upload" 
            className={`cursor-pointer flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50 ${
              uploading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <Upload size={16} />
            {uploading ? 'Uploading...' : 'Upload Image'}
          </Label>
          <Input
            id="image-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
            disabled={uploading}
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
};

const ResumeBuilder = () => {
  const { resumeId } = useParams();
  const { user } = useUser();
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [activeSection, setActiveSection] = useState('basics');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const loadResumeData = async () => {
      if (user && resumeId) {
        try {
          const resume = await getResume(resumeId as string, user.id);
          if (resume) {
            setResumeData(resume.data);
          }
        } catch (error) {
          console.error('Error loading resume:', error);
        }
      }
    };

    loadResumeData();
  }, [resumeId, user]);

  // Handle input changes
  const handleInputChange = (section: keyof ResumeData, field: string, value: string | string[] | number, index: number = 0) => {
    setResumeData(prev => {
      if (Array.isArray(prev[section])) {
        const newArray = [...prev[section]];
        newArray[index] = { ...newArray[index], [field]: value };
        return { ...prev, [section]: newArray };
      } else if (typeof prev[section] === 'object') {
        return { ...prev, [section]: { ...prev[section], [field]: value } };
      }
      return prev;
    });
  };

  // Handle adding new items to arrays
  const handleAddItem = (section: keyof ResumeData) => {
    setResumeData(prev => {
      if (Array.isArray(prev[section])) {
        const sectionArray = initialResumeData[section] as any[];
        return {
          ...prev,
          [section]: [...prev[section], sectionArray[0]]
        };
      }
      return prev;
    });
  };

  // Handle deleting items from arrays
  const handleDeleteItem = (section: keyof ResumeData, index: number) => {
    setResumeData(prev => {
      if (Array.isArray(prev[section])) {
        const newArray = [...prev[section]];
        newArray.splice(index, 1);
        return { ...prev, [section]: newArray };
      }
      return prev;
    });
  };

  // Save changes
  const handleSave = async () => {
    if (!user || !resumeId) return;
    
    setIsSaving(true);
    try {
      await updateResume(resumeId as string, user.id, resumeData);
      alert('Resume saved successfully!');
    } catch (error) {
      console.error('Error saving resume:', error);
      alert('Failed to save resume');
    } finally {
      setIsSaving(false);
    }
  };

  const handleProfileChange = (network: string, url: string) => {
    setResumeData(prev => {
      const profiles = [...prev.basics.profiles];
      const index = profiles.findIndex(p => p.network === network);
      
      if (index >= 0) {
        profiles[index] = { ...profiles[index], url };
      } else {
        profiles.push({ network, url, username: '' });
      }

      return {
        ...prev,
        basics: {
          ...prev.basics,
          profiles
        }
      };
    });
  };

  const renderForm = () => {
    switch (activeSection) {
            case 'basics':
        return (
          <div className="space-y-4 border p-4 rounded">
            <Input
              name="name"
              placeholder="Name"
              value={resumeData.basics.name}
              onChange={(e) => handleInputChange('basics', 'name', e.target.value)}
            />
            <Input
              name="label"
              placeholder="Professional Title"
              value={resumeData.basics.label}
              onChange={(e) => handleInputChange('basics', 'label', e.target.value)}
            />
            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={resumeData.basics.email}
              onChange={(e) => handleInputChange('basics', 'email', e.target.value)}
            />
            <Input
              name="phone"
              placeholder="Phone"
              value={resumeData.basics.phone}
              onChange={(e) => handleInputChange('basics', 'phone', e.target.value)}
            />
            <Input
              name="location"
              placeholder="City, Region"
              value={resumeData.basics.location.city}
              onChange={(e) => handleInputChange('basics', 'location', {
                ...resumeData.basics.location,
                city: e.target.value
              })}
            />
            <Input
              name="url"
              placeholder="https://example.com"
              value={resumeData.basics.url}
              onChange={(e) => handleInputChange('basics', 'url', e.target.value)}
            />
            <Textarea
              name="summary"
              placeholder="Professional Summary"
              value={resumeData.basics.summary}
              onChange={(e) => handleInputChange('basics', 'summary', e.target.value)}
            />

            <div className="space-y-6">
              <ImageUpload
                value={resumeData.basics.image}
                onChange={(url) => handleInputChange('basics', 'image', url)}
              />
              
              <ProfilesSection
                profiles={resumeData.basics.profiles}
                onChange={(profiles) => handleInputChange('basics', 'profiles', profiles)}
              />
            </div>
          </div>
        )
      case 'work':
        return (
          <div className="space-y-4">
            {resumeData.work.map((job, index) => (
              <div key={index} className="space-y-4 border p-4 rounded">
                <Input
                  name="name"
                  placeholder="Company Name"
                  value={job.name}
                  onChange={(e) => handleInputChange('work', 'name', e.target.value, index)}
                />
                <Input
                  name="position"
                  placeholder="Position"
                  value={job.position}
                  onChange={(e) => handleInputChange('work', 'position', e.target.value, index)}
                />
                <Input
                  name="startDate"
                  type="date"
                  placeholder="Start Date"
                  value={job.startDate}
                  onChange={(e) => handleInputChange('work', 'startDate', e.target.value, index)}
                />
                <Input
                  name="endDate"
                  type="date"
                  placeholder="End Date"
                  value={job.endDate}
                  onChange={(e) => handleInputChange('work', 'endDate', e.target.value, index)}
                />
                <Textarea
                  name="summary"
                  placeholder="Summary"
                  value={job.summary}
                  onChange={(e) => handleInputChange('work', 'summary', e.target.value, index)}
                />
                <Button onClick={() => handleDeleteItem('work', index)}>Delete</Button>
              </div>
            ))}
            <Button onClick={() => handleAddItem('work')}>Add Experience</Button>
          </div>
        )
      case 'education':
        return (
          <div className="space-y-4">
            {resumeData.education.map((edu, index) => (
              <div key={index} className="space-y-4 border p-4 rounded">
                <Input
                  name="institution"
                  placeholder="Institution"
                  value={edu.institution}
                  onChange={(e) => handleInputChange('education', 'institution', e.target.value, index)}
                />
                <Input
                  name="url"
                  placeholder="Institution Website"
                  value={edu.url}
                  onChange={(e) => handleInputChange('education', 'url', e.target.value, index)}
                />
                <Input
                  name="area"
                  placeholder="Area of Study"
                  value={edu.area}
                  onChange={(e) => handleInputChange('education', 'area', e.target.value, index)}
                />
                <Input
                  name="studyType"
                  placeholder="Degree Type"
                  value={edu.studyType}
                  onChange={(e) => handleInputChange('education', 'studyType', e.target.value, index)}
                />
                <Input
                  name="score"
                  placeholder="GPA/Score"
                  value={edu.score}
                  onChange={(e) => handleInputChange('education', 'score', e.target.value, index)}
                />
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    name="startDate"
                    type="date"
                    placeholder="Start Date"
                    value={edu.startDate}
                    onChange={(e) => handleInputChange('education', 'startDate', e.target.value, index)}
                  />
                  <Input
                    name="endDate"
                    type="date"
                    placeholder="End Date"
                    value={edu.endDate}
                    onChange={(e) => handleInputChange('education', 'endDate', e.target.value, index)}
                  />
                </div>
                <Textarea
                  name="courses"
                  placeholder="Courses (One per line)"
                  value={edu.courses.join('\n')}
                  onChange={(e) => handleInputChange('education', 'courses', e.target.value.split('\n'), index)}
                  className="font-mono min-h-[100px]"
                />
                <Button onClick={() => handleDeleteItem('education', index)}>Delete</Button>
              </div>
            ))}
            <Button onClick={() => handleAddItem('education')}>Add Education</Button>
          </div>
        )
      case 'skills':
        return (
          <div className="space-y-4">
            {resumeData.skills.map((skill, index) => (
              <div key={index} className="space-y-4 border p-4 rounded">
                <Input
                  name="name"
                  placeholder="Skill Name"
                  value={skill.name}
                  onChange={(e) => handleInputChange('skills', 'name', e.target.value, index)}
                />
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Label style={{ marginRight: '10px' }}>Skill Level</Label>
                  <Slider
                    value={skill.level}
                    onValueChange={(value) => handleInputChange('skills', 'level', value, index)}
                  />
                </div>
                <Input
                  name="keywords"
                  placeholder="Keywords (comma-separated)"
                  value={skill.keywords.join(', ')}
                  onChange={(e) => handleInputChange('skills', 'keywords', e.target.value.split(', '), index)}
                />
                <Button onClick={() => handleDeleteItem('skills', index)}>Delete</Button>
              </div>
            ))}
            <Button onClick={() => handleAddItem('skills')}>Add Skill</Button>
          </div>
        )
      case 'awards':
        return (
          <div className="space-y-4">
            {resumeData.awards.map((award, index) => (
              <div key={index} className="space-y-4 border p-4 rounded">
                <Input
                  name="title"
                  placeholder="Award Title"
                  value={award.title}
                  onChange={(e) => handleInputChange('awards', 'title', e.target.value, index)}
                />
                <Input
                  name="date"
                  type="date"
                  placeholder="Date"
                  value={award.date}
                  onChange={(e) => handleInputChange('awards', 'date', e.target.value, index)}
                />
                <Input
                  name="awarder"
                  placeholder="Awarder"
                  value={award.awarder}
                  onChange={(e) => handleInputChange('awards', 'awarder', e.target.value, index)}
                />
                <Textarea
                  name="summary"
                  placeholder="Summary (Use • for bullet points)"
                  value={award.summary}
                  onChange={(e) => handleInputChange('awards', 'summary', e.target.value, index)}
                  className="min-h-[100px] font-mono" // Monospace font helps with formatting
                />
                <Button onClick={() => handleDeleteItem('awards', index)}>Delete</Button>
              </div>
            ))}
            <Button onClick={() => handleAddItem('awards')}>Add Award</Button>
          </div>
        )
      case 'certifications':
        return (
          <div className="space-y-4">
            {resumeData.certifications.map((cert, index) => (
              <div key={index} className="space-y-4 border p-4 rounded">
                <Input
                  name="name"
                  placeholder="Certification Name"
                  value={cert.name}
                  onChange={(e) => handleInputChange('certifications', 'name', e.target.value, index)}
                />
                <Input
                  name="date"
                  type="date"
                  placeholder="Date"
                  value={cert.date}
                  onChange={(e) => handleInputChange('certifications', 'date', e.target.value, index)}
                />
                <Input
                  name="issuer"
                  placeholder="Issuer"
                  value={cert.issuer}
                  onChange={(e) => handleInputChange('certifications', 'issuer', e.target.value, index)}
                />
                
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Label style={{ marginRight: '10px' }}>Certification Level</Label>
                <Slider
                  value={cert.level}
                  onValueChange={(value) => handleInputChange('certifications', 'level', value, index)}
                />
              </div>
              </div>
            ))}
            <Button onClick={() => handleAddItem('certifications')}>Add Certification</Button>
          </div>
        )
      case 'publications':
        return (
          <div className="space-y-4">
            {resumeData.publications.map((pub, index) => (
              <div key={index} className="space-y-4 border p-4 rounded">
                <Input
                  name="name"
                  placeholder="Publication Title"
                  value={pub.name}
                  onChange={(e) => handleInputChange('publications', 'name', e.target.value, index)}
                />
                <Input
                  name="publisher"
                  placeholder="Publisher"
                  value={pub.publisher}
                  onChange={(e) => handleInputChange('publications', 'publisher', e.target.value, index)}
                />
                <Input
                  name="releaseDate"
                  type="date"
                  placeholder="Release Date"
                  value={pub.releaseDate}
                  onChange={(e) => handleInputChange('publications', 'releaseDate', e.target.value, index)}
                />
                <Textarea
                  name="summary"
                  placeholder="Summary (Use • for bullet points)"
                  value={pub.summary}
                  onChange={(e) => handleInputChange('publications', 'summary', e.target.value, index)}
                  className="font-mono min-h-[100px]"
                />
                <Button onClick={() => handleDeleteItem('publications', index)}>Delete</Button>
              </div>
            ))}
            <Button onClick={() => handleAddItem('publications')}>Add Publication</Button>
          </div>
        )
      case 'languages':
        return (
          <div className="space-y-4">
            {resumeData.languages.map((lang, index) => (
              <div key={index} className="space-y-4 border p-4 rounded">
                <Input
                  name="language"
                  placeholder="Language"
                  value={lang.language}
                  onChange={(e) => handleInputChange('languages', 'language', e.target.value, index)}
                />
                <Input
                  name="fluency"
                  placeholder="Fluency Level (e.g., Native, Fluent, Intermediate)"
                  value={lang.fluency}
                  onChange={(e) => handleInputChange('languages', 'fluency', e.target.value, index)}
                />
                <Button onClick={() => handleDeleteItem('languages', index)}>Delete</Button>
              </div>
            ))}
            <Button onClick={() => handleAddItem('languages')}>Add Language</Button>
          </div>
        )
      case 'interests':
        return (
          <div className="space-y-4">
            {resumeData.interests.map((interest, index) => (
              <div key={index} className="space-y-4 border p-4 rounded">
                <Input
                  name="name"
                  placeholder="Interest Category"
                  value={interest.name}
                  onChange={(e) => handleInputChange('interests', 'name', e.target.value, index)}
                />
                <Textarea
                  name="keywords"
                  placeholder="Keywords (One per line)"
                  value={interest.keywords.join('\n')}
                  onChange={(e) => handleInputChange('interests', 'keywords', e.target.value.split('\n'), index)}
                  className="font-mono min-h-[100px]"
                />
                <Button onClick={() => handleDeleteItem('interests', index)}>Delete</Button>
              </div>
            ))}
            <Button onClick={() => handleAddItem('interests')}>Add Interest</Button>
          </div>
        )
      case 'references':
        return (
          <div className="space-y-4">
            {resumeData.references.map((ref, index) => (
              <div key={index} className="space-y-4 border p-4 rounded">
                <Input
                  name="name"
                  placeholder="Reference Name"
                  value={ref.name}
                  onChange={(e) => handleInputChange('references', 'name', e.target.value, index)}
                />
                <Textarea
                  name="reference"
                  placeholder="Reference Details (Use • for bullet points)"
                  value={ref.reference}
                  onChange={(e) => handleInputChange('references', 'reference', e.target.value, index)}
                  className="font-mono min-h-[100px]"
                />
                <Button onClick={() => handleDeleteItem('references', index)}>Delete</Button>
              </div>
            ))}
            <Button onClick={() => handleAddItem('references')}>Add Reference</Button>
          </div>
        )
      case 'projects':
        return (
          <div className="space-y-4">
            {resumeData.projects.map((project, index) => (
              <div key={index} className="space-y-4 border p-4 rounded">
                <Input
                  name="name"
                  placeholder="Project Name"
                  value={project.name}
                  onChange={(e) => handleInputChange('projects', 'name', e.target.value, index)}
                />
                <Textarea
                  name="description"
                  placeholder="Project Description (Use • for bullet points)"
                  value={project.description}
                  onChange={(e) => handleInputChange('projects', 'description', e.target.value, index)}
                  className="font-mono min-h-[100px]"
                />
                <Textarea
                  name="highlights"
                  placeholder="Highlights (One per line)"
                  value={project.highlights.join('\n')}
                  onChange={(e) => handleInputChange('projects', 'highlights', e.target.value.split('\n'), index)}
                  className="font-mono min-h-[100px]"
                />
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    name="startDate"
                    type="date"
                    placeholder="Start Date"
                    value={project.startDate}
                    onChange={(e) => handleInputChange('projects', 'startDate', e.target.value, index)}
                  />
                  <Input
                    name="endDate"
                    type="date"
                    placeholder="End Date"
                    value={project.endDate}
                    onChange={(e) => handleInputChange('projects', 'endDate', e.target.value, index)}
                  />
                </div>
                <Button onClick={() => handleDeleteItem('projects', index)}>Delete</Button>
              </div>
            ))}
            <Button onClick={() => handleAddItem('projects')}>Add Project</Button>
          </div>
        )
      case 'volunteer':
        return (
          <div className="space-y-4">
            {resumeData.volunteer.map((vol, index) => (
              <div key={index} className="space-y-4 border p-4 rounded">
                <Input
                  name="organization"
                  placeholder="Organization"
                  value={vol.organization}
                  onChange={(e) => handleInputChange('volunteer', 'organization', e.target.value, index)}
                />
                <Input
                  name="position"
                  placeholder="Position"
                  value={vol.position}
                  onChange={(e) => handleInputChange('volunteer', 'position', e.target.value, index)}
                />
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    name="startDate"
                    type="date"
                    placeholder="Start Date"
                    value={vol.startDate}
                    onChange={(e) => handleInputChange('volunteer', 'startDate', e.target.value, index)}
                  />
                  <Input
                    name="endDate"
                    type="date"
                    placeholder="End Date"
                    value={vol.endDate}
                    onChange={(e) => handleInputChange('volunteer', 'endDate', e.target.value, index)}
                  />
                </div>
                <Textarea
                  name="summary"
                  placeholder="Summary (Use • for bullet points)"
                  value={vol.summary}
                  onChange={(e) => handleInputChange('volunteer', 'summary', e.target.value, index)}
                  className="font-mono min-h-[100px]"
                />
                <Button onClick={() => handleDeleteItem('volunteer', index)}>Delete</Button>
              </div>
            ))}
            <Button onClick={() => handleAddItem('volunteer')}>Add Volunteer Experience</Button>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Input Section */}
      <div className="w-full md:w-1/2 p-6 overflow-x-auto">
        <h1 className="text-2xl font-bold mb-4">Resume Builder</h1>
        <div className="flex-wrap space-x-2 space-y-2 mb-4">
          <Button onClick={() => setActiveSection('basics')}>Basics</Button>
          <Button onClick={() => setActiveSection('work')}>Experience</Button>
          <Button onClick={() => setActiveSection('education')}>Education</Button>
          <Button onClick={() => setActiveSection('skills')}>Skills</Button>
          <Button onClick={() => setActiveSection('awards')}>Awards</Button>
          <Button onClick={() => setActiveSection('certifications')}>Certifications</Button>
          <Button onClick={() => setActiveSection('publications')}>Publications</Button>
          <Button onClick={() => setActiveSection('languages')}>Languages</Button>
          <Button onClick={() => setActiveSection('interests')}>Interests</Button>
          <Button onClick={() => setActiveSection('references')}>References</Button>
          <Button onClick={() => setActiveSection('projects')}>Projects</Button>
          <Button onClick={() => setActiveSection('volunteer')}>Volunteer</Button>
        </div>
        {renderForm()}
        <Button 
          className="mt-4" 
          onClick={handleSave} 
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save Resume'}
        </Button>
      </div>

      {/* Preview Section */}
      <div className="w-full md:w-full p-6 overflow-y-auto">
        <div className="max-w-screen-lg mx-auto border border-gray-200 p-8 shadow-lg">
          <Gengar resumeData={resumeData} />
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;

