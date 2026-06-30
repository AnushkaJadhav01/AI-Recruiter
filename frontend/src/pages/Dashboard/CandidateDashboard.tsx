import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FiFileText, FiGithub, FiLinkedin,
  FiCheckCircle, FiClock, FiArrowRight,
  FiBell, FiStar
} from 'react-icons/fi'
import { useApp } from '../../contexts/AppContext'

export const CandidateDashboard = () => {
  const { currentUser } = useApp()
  const candidateName = currentUser?.name || 'there'

  const applications = [
    {
      id: 1,
      jobTitle: 'Senior Full-Stack Developer',
      company: 'AI Recruiter Co.',
      appliedDate: '3 days ago',
      status: 'Shortlisted',
      statusStep: 3,
      latestUpdate: 'A recruiter has shortlisted you for an interview.',
    },
    {
      id: 2,
      jobTitle: 'AI/ML Research Engineer',
      company: 'AI Labs Ltd.',
      appliedDate: '1 week ago',
      status: 'Being Reviewed',
      statusStep: 2,
      latestUpdate: 'Your resume has been received and is under review.',
    },
  ]

  const jobMatches = [
    {
      id: 1,
      title: 'Senior Full-Stack Developer',
      company: 'Fintech Sandbox',
      matchScore: 94,
      reason: 'Your React and Node.js skills are a strong fit for this role.',
    },
    {
      id: 2,
      title: 'React Native Mobile Lead',
      company: 'HealthPulse',
      matchScore: 86,
      reason: 'Your frontend experience matches what this team is looking for.',
    },
  ]

  const notifications = [
    { id: 1, text: 'A recruiter viewed your profile.', time: '2 hours ago' },
    { id: 2, text: 'You have been invited to a Technical Interview.', time: '1 day ago' },
    { id: 3, text: 'New matching job: Front-End Core Developer.', time: '2 days ago' },
  ]

  const trackerSteps = ['Applied', 'Being Reviewed', 'Shortlisted', 'Interview', 'Decision']

  const statusColor: Record<string, string> = {
    'Shortlisted':   'bg-green-100 text-green-700',
    'Being Reviewed':'bg-yellow-100 text-yellow-700',
    'Applied':       'bg-blue-100 text-blue-700',
    'Interview':     'bg-purple-100 text-purple-700',
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">

      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-gradient-to-r from-[#FFF8F4] to-[#FFE8D6] border border-[#F1DDD2] rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h2 className="text-2xl font-extrabold text-[#2D2A26] tracking-tight">
            Welcome back, {candidateName} 👋
          </h2>
          <p className="text-sm text-[#6B7280] mt-1 font-medium">
            Your job applications are up to date. Here's what's happening.
          </p>
        </div>
        <div className="flex gap-2 shrink-0 flex-wrap">
          <Link
            to="/resume-analysis"
            className="px-4 py-2.5 border border-[#F1DDD2] bg-white text-[#2D2A26] text-sm font-bold rounded-xl hover:bg-[#FFF2EA] transition-colors"
          >
            Improve My Resume
          </Link>
          <Link
            to="/job-recommendations"
            className="px-4 py-2.5 bg-[#F97316] text-white text-sm font-bold rounded-xl hover:bg-[#EA580C] transition-colors"
          >
            See Job Matches
          </Link>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Jobs Applied To', value: '2',  color: 'bg-blue-50   text-blue-600'   },
          { label: 'Under Review',    value: '1',  color: 'bg-yellow-50 text-yellow-600' },
          { label: 'Shortlisted',     value: '1',  color: 'bg-green-50  text-green-600'  },
          { label: 'Job Matches',     value: '2',  color: 'bg-orange-50 text-orange-600' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <p className={`text-2xl font-extrabold ${stat.color.split(' ')[1]}`}>{stat.value}</p>
            <p className="text-xs text-[#6B7280] font-medium mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Left — Applications + Matches */}
        <div className="xl:col-span-2 space-y-6">

          {/* My Applications */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-[#2D2A26] mb-5">My Applications</h3>
            <div className="space-y-6">
              {applications.map((app) => (
                <div key={app.id} className="border border-gray-100 rounded-xl p-4 bg-[#F8FAFC] space-y-4">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <p className="font-bold text-[#2D2A26] text-sm">{app.jobTitle}</p>
                      <p className="text-xs text-[#9CA3AF] font-medium">{app.company} · Applied {app.appliedDate}</p>
                    </div>
                    <span className={`text-[11px] font-bold px-3 py-1 rounded-full self-start sm:self-auto ${statusColor[app.status] || 'bg-gray-100 text-gray-500'}`}>
                      {app.status}
                    </span>
                  </div>

                  {/* Progress Steps */}
                  <div className="relative pt-1">
                    <div className="flex justify-between mb-2">
                      {trackerSteps.map((step, idx) => {
                        const done = app.statusStep > idx
                        const active = app.statusStep === idx + 1
                        return (
                          <div key={step} className="flex flex-col items-center flex-1">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border-2 transition-all ${
                              done   ? 'bg-[#F97316] border-[#F97316] text-white' :
                              active ? 'bg-white border-[#F97316] text-[#F97316]' :
                                       'bg-white border-gray-200 text-gray-300'
                            }`}>
                              {done ? <FiCheckCircle className="w-3.5 h-3.5" /> : idx + 1}
                            </div>
                            <span className={`text-[9px] font-semibold mt-1.5 hidden sm:block text-center ${done || active ? 'text-[#2D2A26]' : 'text-gray-300'}`}>
                              {step}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                    {/* Progress bar */}
                    <div className="absolute top-[11px] left-3 right-3 h-0.5 bg-gray-200 -z-0">
                      <div
                        className="h-full bg-[#F97316] transition-all"
                        style={{ width: `${((app.statusStep - 1) / (trackerSteps.length - 1)) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Latest Update */}
                  <div className="flex items-start gap-2 bg-white border border-gray-100 p-3 rounded-xl text-xs text-[#6B7280] font-medium">
                    <FiClock className="w-4 h-4 text-[#F97316] shrink-0 mt-0.5" />
                    <span><strong className="text-[#2D2A26]">Latest: </strong>{app.latestUpdate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Jobs */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-sm font-bold text-[#2D2A26]">Jobs That Match You</h3>
              <Link to="/job-recommendations" className="text-xs font-bold text-[#F97316] flex items-center gap-1 hover:underline">
                See all <FiArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {jobMatches.map((job) => (
                <div key={job.id} className="border border-gray-100 rounded-xl p-4 bg-[#F8FAFC] flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-bold text-[#2D2A26] text-sm leading-tight">{job.title}</p>
                      <p className="text-xs text-[#9CA3AF] font-medium mt-0.5">{job.company}</p>
                    </div>
                    <span className="text-xs font-extrabold text-green-600 bg-green-50 px-2 py-0.5 rounded-full shrink-0">
                      {job.matchScore}% match
                    </span>
                  </div>
                  <p className="text-xs text-[#6B7280] leading-relaxed">{job.reason}</p>
                  <Link
                    to="/job-recommendations"
                    className="flex items-center justify-center gap-1.5 py-2 bg-[#F97316] text-white text-xs font-bold rounded-lg hover:bg-[#EA580C] transition-colors"
                  >
                    View & Apply <FiArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-4">

          {/* Connected Profiles */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <h3 className="text-sm font-bold text-[#2D2A26] mb-4">Connected Profiles</h3>
            <p className="text-xs text-[#6B7280] font-medium mb-3">Connecting your profiles helps recruiters verify your experience automatically.</p>
            <div className="space-y-2">
              <Link to="/github-sync" className="flex items-center justify-between p-3 bg-green-50 border border-green-100 rounded-xl hover:bg-green-100 transition-colors">
                <span className="flex items-center gap-2.5 text-xs font-bold text-[#2D2A26]">
                  <FiGithub className="w-4 h-4" /> GitHub
                </span>
                <span className="text-[10px] font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">Connected ✓</span>
              </Link>
              <Link to="/linkedin-sync" className="flex items-center justify-between p-3 bg-blue-50 border border-blue-100 rounded-xl hover:bg-blue-100 transition-colors">
                <span className="flex items-center gap-2.5 text-xs font-bold text-[#2D2A26]">
                  <FiLinkedin className="w-4 h-4 text-blue-600" /> LinkedIn
                </span>
                <span className="text-[10px] font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">Connected ✓</span>
              </Link>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <h3 className="text-sm font-bold text-[#2D2A26] mb-4 flex items-center gap-2">
              <FiBell className="w-4 h-4 text-[#F97316]" /> Notifications
            </h3>
            <div className="space-y-3">
              {notifications.map((n) => (
                <div key={n.id} className="flex gap-3 items-start">
                  <div className="w-2 h-2 rounded-full bg-[#F97316] mt-1.5 shrink-0" />
                  <div>
                    <p className="text-xs text-[#2D2A26] font-semibold leading-relaxed">{n.text}</p>
                    <p className="text-[10px] text-[#9CA3AF] font-medium mt-0.5">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interview Prep CTA */}
          <div className="bg-[#2D2A26] text-white rounded-2xl p-5 space-y-3 text-center">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mx-auto">
              <FiStar className="w-5 h-5 text-[#FDBA74]" />
            </div>
            <div>
              <h4 className="font-bold text-sm">Practice Interview Questions</h4>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Get ready with questions tailored to the jobs you've applied for.
              </p>
            </div>
            <Link
              to="/interview-prep"
              className="block py-2 bg-[#F97316] text-white text-xs font-bold rounded-lg hover:bg-[#EA580C] transition-colors"
            >
              Start Practicing
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
