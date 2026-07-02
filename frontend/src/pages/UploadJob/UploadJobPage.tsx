import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  FiBriefcase,
  FiCheckCircle,
} from 'react-icons/fi'
import { Card } from '../../components/common/Card'
import { Button } from '../../components/common/Button'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../contexts/AppContext'

export const UploadJobPage = () => {
  const navigate = useNavigate()
  const { addJob, currentUser } = useApp()
  const [submitting, setSubmitting] = useState(false)
  
  // Basic Form State
  const [formState, setFormState] = useState({
    title: '',
    department: '',
    experience: '',
    location: '',
    type: 'Full-time',
    description: '',
    skills: '',
    recruiterName: currentUser?.name || '',
    recruiterContact: currentUser?.email || ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formState.title || !formState.department || !formState.description) {
      alert("Please fill out the required fields (Title, Department, Description).")
      return
    }

    setSubmitting(true)
    
    // Convert comma-separated skills to an array
    const skillsArray = formState.skills
      ? formState.skills.split(',').map(s => s.trim()).filter(Boolean)
      : []

    // Add job to global state / Firebase
    addJob({
      title: formState.title,
      department: formState.department,
      location: formState.location || 'Remote',
      type: formState.type,
      status: 'Open',
      skills: skillsArray,
      description: formState.description,
      recruiterName: formState.recruiterName,
      recruiterContact: formState.recruiterContact
    })

    setTimeout(() => {
      setSubmitting(false)
      navigate('/dashboard')
    }, 800)
  }

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      {/* Title */}
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">Post a New Role</h2>
        <p className="text-xs text-gray-500 mt-1 font-medium">Define your job requirements and manually post the role to the platform.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="space-y-5 p-6 shadow-sm">
          <h4 className="font-bold text-sm text-gray-950 flex items-center gap-2 mb-4">
            <FiBriefcase className="text-gray-400" /> Job Details
          </h4>
          
          <div className="space-y-5">
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Job Title *</label>
              <input 
                type="text" 
                name="title"
                placeholder="e.g. Senior Frontend Engineer"
                value={formState.title}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Department *</label>
                <input 
                  type="text" 
                  name="department"
                  placeholder="e.g. Engineering"
                  value={formState.department}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Required Experience (Years)</label>
                <input 
                  type="number" 
                  name="experience"
                  placeholder="e.g. 5"
                  value={formState.experience}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Location</label>
                <input 
                  type="text" 
                  name="location"
                  placeholder="e.g. Remote, US"
                  value={formState.location}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Employment Type</label>
                <select
                  name="type"
                  value={formState.type}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all bg-white"
                >
                  <option>Full-time</option>
                  <option>Contract</option>
                  <option>Part-time</option>
                  <option>Internship</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Recruiter Name *</label>
                <input 
                  type="text" 
                  name="recruiterName"
                  placeholder="e.g. John Doe"
                  value={formState.recruiterName}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Recruiter Contact Info *</label>
                <input 
                  type="text" 
                  name="recruiterContact"
                  placeholder="e.g. jdoe@company.com or +1 (555) 123-4567"
                  value={formState.recruiterContact}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Required Skills (Comma separated)</label>
              <input 
                type="text" 
                name="skills"
                placeholder="e.g. React, Node.js, Typescript"
                value={formState.skills}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Job Description *</label>
              <textarea
                name="description"
                value={formState.description}
                onChange={handleChange}
                placeholder="Write or paste the full job description here..."
                rows={10}
                className="w-full p-4 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all placeholder-gray-400 font-mono resize-y"
                required
              />
            </div>
          </div>
        </Card>

        <div className="flex justify-end pt-2">
          <Button type="submit" disabled={submitting} className="px-8 py-3 bg-[#F97316] hover:bg-[#EA580C] text-white font-bold rounded-xl flex items-center gap-2 transition-colors">
            {submitting ? 'Posting Job...' : (
              <>
                <FiCheckCircle className="w-4 h-4" /> Post Job
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
