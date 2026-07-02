import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  FiMapPin, 
  FiBriefcase, 
  FiCheckCircle,
  FiClock,
  FiZap,
} from 'react-icons/fi'
import { Card } from '../../components/common/Card'
import { Button } from '../../components/common/Button'
import { Badge } from '../../components/common/Badge'
import { useApp } from '../../contexts/AppContext'

export const JobRecommendationsPage = () => {
  const { jobs, currentUser, addCandidate } = useApp()
  const [appliedJobs, setAppliedJobs] = useState<Record<string, boolean>>({})

  // Filter for open jobs
  const openJobs = jobs.filter(j => j.status === 'Open')

  const handleApply = (jobId: string, jobTitle: string) => {
    // Register candidate application for this job
    addCandidate({
      name: currentUser?.name || 'Applicant',
      email: currentUser?.email || 'applicant@example.com',
      jobId: jobId,
      role: jobTitle,
      skills: ['React', 'Node.js', 'Figma', 'Python', 'Tailwind CSS', 'SQL'],
      githubUsername: currentUser?.github?.username || '',
      githubData: currentUser?.github || null,
      linkedinUrl: currentUser?.linkedin?.profileUrl || '',
      linkedinData: currentUser?.linkedin || null,
      resumeFileName: currentUser?.resumeAnalysis?.fileName || ''
    })
    setAppliedJobs(prev => ({ ...prev, [jobId]: true }))
    alert(`Successfully applied to ${jobTitle}!`)
  }

  return (
    <div className="space-y-6 text-left max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
          <FiBriefcase className="text-blue-600" />
          Available Jobs
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          Explore and apply for open positions directly through the platform.
        </p>
      </div>

      <div className="space-y-5">
        {openJobs.length === 0 ? (
          <div className="py-12 text-center bg-[#F8FAFC] rounded-2xl border border-[#E5E7EB] border-dashed">
            <p className="text-[#6B7280] text-sm font-medium">No open positions available right now.</p>
          </div>
        ) : (
          openJobs.map((job) => {
            const isApplied = appliedJobs[job.id]

            return (
              <Card 
                key={job.id} 
                className="p-6 border transition-all bg-white shadow-sm flex flex-col space-y-4 hover:border-gray-300"
              >
                {/* Top Row: Info */}
                <div className="flex justify-between items-start flex-wrap gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-extrabold text-base text-gray-950">{job.title}</h3>
                      <Badge variant="primary" className="text-[10px] uppercase font-bold tracking-wider">
                        {job.type || 'Full-time'}
                      </Badge>
                    </div>
                    <p className="text-xs font-bold text-blue-600 uppercase tracking-wide">
                      {job.department}
                    </p>
                    <p className="text-[11px] text-gray-500 font-medium flex items-center gap-4 mt-1.5">
                      <span className="flex items-center gap-1"><FiMapPin className="w-3.5 h-3.5" /> {job.location || 'Remote'}</span>
                      <span className="flex items-center gap-1"><FiClock className="w-3.5 h-3.5" /> Posted {job.postedDate || 'Recently'}</span>
                    </p>
                    {(job.recruiterName || job.recruiterContact) && (
                      <p className="text-[11px] text-gray-500 font-medium mt-1.5 flex items-center gap-1.5">
                        <span className="text-gray-400">Recruiter:</span>
                        <span className="font-semibold text-gray-800">{job.recruiterName || 'N/A'}</span>
                        {job.recruiterContact && <span className="text-gray-400">({job.recruiterContact})</span>}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2 shrink-0">
                    <Button 
                      onClick={() => handleApply(job.id, job.title)}
                      disabled={isApplied}
                      className={`text-xs font-semibold min-w-[120px] shadow-sm ${
                        isApplied ? 'bg-emerald-100 text-emerald-800 border border-emerald-200 cursor-default hover:bg-emerald-100' : 'bg-[#F97316] text-white hover:bg-[#EA580C]'
                      }`}
                    >
                      {isApplied ? (
                        <span className="flex items-center gap-1 justify-center"><FiCheckCircle className="w-3.5 h-3.5" /> Applied</span>
                      ) : (
                        <span className="flex items-center gap-1 justify-center"><FiZap className="w-3.5 h-3.5 fill-white" /> Easy Apply</span>
                      )}
                    </Button>
                  </div>
                </div>

                {job.skills && job.skills.length > 0 && (
                  <div className="border-t border-gray-100 pt-3 mt-1">
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-2">Required Skills</p>
                    <div className="flex flex-wrap gap-1.5">
                      {job.skills.map((skill: string, index: number) => (
                        <span key={index} className="px-2 py-0.5 bg-blue-50 border border-blue-100 text-blue-700 rounded text-[10px] font-bold">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Brief Job Description */}
                <div className="text-xs text-gray-700 leading-relaxed font-medium border-t border-gray-100 pt-3">
                  <span className="font-bold text-gray-900 block mb-1">Job Description:</span>
                  <p className="whitespace-pre-line">{job.description || "No description provided."}</p>
                </div>

              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}
