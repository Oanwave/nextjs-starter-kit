'use client'

import React, { useState, useEffect } from 'react'
import { Button } from "/components/ui/button"
import { Input } from "/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "/components/ui/dialog"
import { Card, CardContent } from "/components/ui/card"
import { PlusIcon, DownloadIcon } from 'lucide-react'
import Link from 'next/link'
import { createResume } from "/utils/data/resume/resumeCreate";
import { useUser } from "@clerk/nextjs";
import { getResumes } from "/utils/data/resume/getResumes";

interface Resume {
  id: string
  title: string
  lastUpdated: string
}

export default function CreateResume() {
  const { user } = useUser();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [newResumeTitle, setNewResumeTitle] = useState('')
  const [newResumeSlug, setNewResumeSlug] = useState('')
  const [resumes, setResumes] = useState<Resume[]>([
    { id: '1', title: 'Sample Resume', lastUpdated: 'an hour ago' },
    // { id: '2', title: 'Able', lastUpdated: '3 days ago' },
  ])

  useEffect(() => {
    const loadResumes = async () => {
      if (user) {
        try {
          const userResumes = await getResumes(user.id);
          setResumes(userResumes.map(resume => ({
            id: resume.id,
            title: resume.title,
            lastUpdated: new Date(resume.last_updated).toLocaleDateString()
          })));
        } catch (error) {
          console.error('Error loading resumes:', error);
        }
      }
    };

    loadResumes();
  }, [user]);

  const handleCreateResume = async () => {
    try {
      if (!user) {
        throw new Error("User not authenticated");
      }

      const newResumeData = {
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
          profiles: [],
        },
        work: [],
        education: [],
        skills: [],
        awards: [],
        certifications: [],
        publications: [],
        languages: [],
        interests: [],
        references: [],
        projects: [],
        volunteer: []
      };

      const response = await createResume({
        title: newResumeTitle,
        description: newResumeSlug,
        userId: user.id,
        data: newResumeData,
      });

      // Add the new resume to the local state
      const newResume = {
        id: response[0].id,
        title: newResumeTitle,
        lastUpdated: 'Just now'
      };

      setResumes([...resumes, newResume]);
      setIsCreateModalOpen(false);
      setNewResumeTitle('');
      setNewResumeSlug('');

    } catch (error) {
      console.error('Error creating resume:', error);
      alert('Failed to create resume. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Resumes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="cursor-pointer hover:bg-gray-100" onClick={() => setIsCreateModalOpen(true)}>
          <CardContent className="flex flex-col items-center justify-center h-40">
            <PlusIcon className="w-12 h-12 mb-2" />
            <p>Create a new resume</p>
            <p className="text-sm text-gray-500">Start building from scratch</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:bg-gray-100">
          <CardContent className="flex flex-col items-center justify-center h-40">
            <DownloadIcon className="w-12 h-12 mb-2" />
            <p>Import an existing resume</p>
            <p className="text-sm text-gray-500">LinkedIn, JSON Resume, etc.</p>
          </CardContent>
        </Card>
        {resumes.map(resume => (
          <Link href={`/dashboard/builder/${resume.id}`} key={resume.id}>
            <Card className="cursor-pointer hover:bg-gray-100">
              <CardContent className="h-40 flex flex-col justify-between">
                <h3 className="font-semibold">{resume.title}</h3>
                <p className="text-sm text-gray-500">Last updated {resume.lastUpdated}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a new resume</DialogTitle>
            <DialogDescription>
              Start building your resume by giving it a name.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="title" className="text-right">
                Title
              </label>
              <Input
                id="title"
                value={newResumeTitle}
                onChange={(e) => setNewResumeTitle(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="slug" className="text-right">
                Description
              </label>
              <Input
                id="slug"
                value={newResumeSlug}
                onChange={(e) => setNewResumeSlug(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleCreateResume}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}