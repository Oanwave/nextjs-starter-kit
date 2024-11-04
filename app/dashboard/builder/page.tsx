'use client';


//Previous version before adding updaye to the resume builder
import React, { useState, useEffect } from 'react'
import { Button } from "/components/ui/button"
import { Input } from "/components/ui/input"
import { Textarea } from "/components/ui/textarea"
import { Label } from "/components/ui/label"
import Slider from "/components/ui/slider"
import Gengar from 'app/components/templates/Gengar';

interface ResumeData {
  basics: {
    name: string
    label: string
    image: string
    email: string
    phone: string
    url: string
    summary: string
    address: string
    location: {
      address: string
      postalCode: string
      city: string
      countryCode: string
      region: string
    }
    profiles: Array<{
      network: string
      username: string
      url: string
    }>
  }
  work: Array<{
    name: string
    position: string
    url: string
    location: string
    startDate: string
    endDate: string
    summary: string
    highlights: string[]
  }>
  education: Array<{
    institution: string
    url: string
    location: string
    area: string
    studyType: string
    startDate: string
    endDate: string
    score: string
    courses: string[]
  }>
  skills: Array<{
    name: string
    level: string
    keywords: string[]
  }>
  awards: Array<{
    title: string
    date: string
    awarder: string
    summary: string
  }>
  certifications: Array<{
    name: string
    date: string
    issuer: string
    level: number
  }>
  publications: Array<{
    name: string
    publisher: string
    releaseDate: string
    summary: string
  }>
  languages: Array<{
    language: string
    fluency: string
  }>
  interests: Array<{
    name: string
    keywords: string[]
  }>
  references: Array<{
    name: string
    reference: string
  }>
  projects: Array<{
    name: string
    description: string
    highlights: string[]
    startDate: string
    endDate: string
  }>
  volunteer: Array<{
    organization: string
    position: string
    startDate: string
    endDate: string
    summary: string
  }>
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
    address: '',
    location: {
      address: '',
      postalCode: '',
      city: '',
      countryCode: '',
      region: '',
    },
    profiles: [{ network: '', username: '', url: '' }],
  },
  work: [{ name: '', position: '', url: '', location: '', startDate: '', endDate: '', summary: '', highlights: [''] }],
  education: [{ institution: '', url: '', location: '', area: '', studyType: '', startDate: '', endDate: '', score: '', courses: [''] }],
  skills: [{ name: '', level: '', keywords: [''] }],
  awards: [{ title: '', date: '', awarder: '', summary: '' }],
  certifications: [{ name: '', date: '', issuer: '', level: 0 }],
  publications: [{ name: '', publisher: '', releaseDate: '', summary: '' }],
  languages: [{ language: '', fluency: '' }],
  interests: [{ name: '', keywords: [] }],
  references: [{ name: '', reference: '' }],
  projects: [{ name: '', description: '', highlights: [], startDate: '', endDate: '' }],
  volunteer: [{ organization: '', position: '', startDate: '', endDate: '', summary: '' }]
}

export default function ResumeBuilder() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData)
  const [activeSection, setActiveSection] = useState('basics')

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem('resumeData');
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleInputChange = (section: keyof ResumeData, field: string, value: string | string[] | number, index: number = 0) => {
      setResumeData(prev => {
        if (Array.isArray(prev[section])) {
          const newArray = [...prev[section]]
          newArray[index] = { ...newArray[index], [field]: value }
          return { ...prev, [section]: newArray }
        } else if (typeof prev[section] === 'object') {
          return { ...prev, [section]: { ...prev[section], [field]: value } }
        }
        return prev
      })
    }

    const handleAddItem = (section: keyof ResumeData) => {
      setResumeData(prev => {
        if (Array.isArray(prev[section])) {
          const newArray = [...prev[section], {}]
          return { ...prev, [section]: newArray }
        }
        return prev
      })
    }
  
    const handleDeleteItem = (section: keyof ResumeData, index: number) => {
      setResumeData(prev => {
        if (Array.isArray(prev[section])) {
          const newArray = prev[section].filter((_, i) => i !== index)
          return { ...prev, [section]: newArray }
        }
        return prev
      })
    }

  const handleSave = () => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData))
    alert('Resume data saved successfully!')
  }

  const isFormValid = () => {
    return resumeData.basics.name && resumeData.basics.email && resumeData.basics.phone;
  }

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
              name="address"
              placeholder="location"
              value={resumeData.basics.address}
              onChange={(e) => handleInputChange('basics', 'address', e.target.value)}
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

          </div>
        )
      // case 'work':
      //   return (
      //     <div className="space-y-4">
      //       {resumeData.work.map((job, index) => (
      //         <div key={index} className="space-y-4 border p-4 rounded">
      //           <Input
      //             name="name"
      //             placeholder="Company Name"
      //             value={job.name}
      //             onChange={(e) => handleInputChange('work', 'name', e.target.value, index)}
      //           />
      //           <Input
      //             name="position"
      //             placeholder="Position"
      //             value={job.position}
      //             onChange={(e) => handleInputChange('work', 'position', e.target.value, index)}
      //           />
      //           <div className="grid grid-cols-2 gap-2">
      //             <Input
      //               name="startDate"
      //               placeholder="Start Date"
      //               value={job.startDate}
      //               onChange={(e) => handleInputChange('work', 'startDate', e.target.value, index)}
      //             />
      //             <Input
      //               name="endDate"
      //               placeholder="End Date"
      //               value={job.endDate}
      //               onChange={(e) => handleInputChange('work', 'endDate', e.target.value, index)}
      //             />
      //           </div>
      //           <Textarea
      //             name="summary"
      //             placeholder="Job Summary"
      //             value={job.summary}
      //             onChange={(e) => handleInputChange('work', 'summary', e.target.value, index)}
      //           />
      //         </div>
      //       ))}
      //     </div>
      //   )
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
                  name="location"
                  placeholder="Location"
                  value={job.location}
                  onChange={(e) => handleInputChange('work', 'location', e.target.value, index)}
                />
                <Input
            name="url"
            placeholder="Company Website URL"
            type="url"
            value={job.url}
            onChange={(e) => handleInputChange('work', 'url', e.target.value, index)}
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
                  name="area"
                  placeholder="Area of Study"
                  value={edu.area}
                  onChange={(e) => handleInputChange('education', 'area', e.target.value, index)}
                />
                <Input
            name="url"
            placeholder="Institution Website URL"
            type="url"
            value={edu.url}
            onChange={(e) => handleInputChange('education', 'url', e.target.value, index)}
          />
                <Input
                  name="location"
                  placeholder="Location"
                  value={edu.location}
                  onChange={(e) => handleInputChange('education', 'location', e.target.value, index)}
                />
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    name="startDate"
                    placeholder="Start Date"
                    value={edu.startDate}
                    onChange={(e) => handleInputChange('education', 'startDate', e.target.value, index)}
                  />
                  <Input
                    name="endDate"
                    placeholder="End Date"
                    value={edu.endDate}
                    onChange={(e) => handleInputChange('education', 'endDate', e.target.value, index)}
                  />
                </div>
              </div>
            ))}
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
                  value={skill.level} // Pass as a single number
                  onValueChange={(value) => handleInputChange('skills', 'level', value, index)} // Pass single number
                />
                </div>
                <Input
                  name="keywords"
                  placeholder="Keywords (comma-separated)"
                  value={skill.keywords.join(', ')}
                  onChange={(e) => handleInputChange('skills', 'keywords', e.target.value.split(', '), index)}
                />
              </div>
            ))}
          </div>
        )
      case 'awards':
        return (
          <div className="space-y-4">
            {resumeData.awards.length > 0 ? (
              resumeData.awards.map((award, index) => (
                <div key={index} className="space-y-4 border p-4 rounded">
                  <Input
                    name="title"
                    placeholder="Award Title"
                    value={award.title}
                    onChange={(e) => handleInputChange('awards', 'title', e.target.value, index)}
                  />
                  <Input
                    name="date"
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
                    placeholder="Summary"
                    value={award.summary}
                    onChange={(e) => handleInputChange('awards', 'summary', e.target.value, index)}
                  />
                </div>
              ))
            ) : (
              <p>No awards added yet.</p>
            )}
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
                  value={cert.level} // Pass as a single number
                  onValueChange={(value) => handleInputChange('certifications', 'level', value, index)} // Pass single number
                />
              </div>
              </div>
            ))}
          </div>
        )
      case 'publications':
        return (
          <div className="space-y-4">
            {resumeData.publications.map((pub, index) => (
              <div key={index} className="space-y-4 border p-4 rounded">
                <Input
                  name="name"
                  placeholder="Publication Name"
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
                  placeholder="Release Date"
                  value={pub.releaseDate}
                  onChange={(e) => handleInputChange('publications', 'releaseDate', e.target.value, index)}
                />
                <Textarea
                  name="summary"
                  placeholder="Summary"
                  value={pub.summary}
                  onChange={(e) => handleInputChange('publications', 'summary', e.target.value, index)}
                />
              </div>
            ))}
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
                  placeholder="Fluency Level"
                  value={lang.fluency}
                  onChange={(e) => handleInputChange('languages', 'fluency', e.target.value, index)}
                />
              </div>
            ))}
          </div>
        )
      case 'interests':
        return (
          <div className="space-y-4">
            {resumeData.interests.map((interest, index) => (
              <div key={index} className="space-y-4 border p-4 rounded">
                <Input
                  name="name"
                  placeholder="Interest Name"
                  value={interest.name}
                  onChange={(e) => handleInputChange('interests', 'name', e.target.value, index)}
                />
                <Input
                  name="keywords"
                  placeholder="Keywords (comma-separated)"
                  value={interest.keywords.join(', ')}
                  onChange={(e) => handleInputChange('interests', 'keywords', e.target.value.split(', '), index)}
                />
              </div>
            ))}
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
                  placeholder="Reference Details"
                  value={ref.reference}
                  onChange={(e) => handleInputChange('references', 'reference', e.target.value, index)}
                />
              </div>
            ))}
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
                  placeholder="Project Description"
                  value={project.description}
                  onChange={(e) => handleInputChange('projects', 'description', e.target.value, index)}
                />
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    name="startDate"
                    placeholder="Start Date"
                    value={project.startDate}
                    onChange={(e) => handleInputChange('projects', 'startDate', e.target.value, index)}
                  />
                  <Input
                    name="endDate"
                    placeholder="End Date"
                    value={project.endDate}
                    onChange={(e) => handleInputChange('projects', 'endDate', e.target.value, index)}
                  />
                </div>
              </div>
            ))}
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
                    placeholder="Start Date"
                    value={vol.startDate}
                    onChange={(e) => handleInputChange('volunteer', 'startDate', e.target.value, index)}
                  />
                  <Input
                    name="endDate"
                    placeholder="End Date"
                    value={vol.endDate}
                    onChange={(e) => handleInputChange('volunteer', 'endDate', e.target.value, index)}
                  />
                </div>
                <Textarea
                  name="summary"
                  placeholder="Summary"
                  value={vol.summary}
                  onChange={(e) => handleInputChange('volunteer', 'summary', e.target.value, index)}
                />
              </div>
            ))}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col md:flex-row h-screen ">
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
        <Button className="mt-4" onClick={handleSave} disabled={!isFormValid()}>Save Resume</Button>
      </div>

      {/* Preview Section */}
      <div className="w-full md:w-full p-6 overflow-y-auto">
        <div className="max-w-screen-lg mx-auto border border-gray-200 p-8 shadow-lg">
          <Gengar resumeData={resumeData} />
        </div>
      </div>
    </div>
  )
}

