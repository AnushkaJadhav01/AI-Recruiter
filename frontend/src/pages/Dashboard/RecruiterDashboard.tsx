import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FiPlus, FiUsers, FiCheckCircle, FiClock,
  FiArrowRight, FiUpload, FiMapPin, FiMoreHorizontal
} from 'react-icons/fi'
import { useApp } from '../../contexts/AppContext'

type JobStatus = 'Open' | 'Closed' | 'Draft'

const statusStyles: Record<string, string> = {
  Open:      'bg-emerald-50 text-emerald-700 border-emerald-200',
  Closed:    'bg-gray-100  text-gray-500   border-gray-200',
  Draft:     'bg-amber-50  text-amber-700  border-amber-200',
}

export const RecruiterDashboard = () => {
  const navigate = useNavigate()
  const { jobs, candidates, activities: globalActivities, currentUser, deleteJob } = useApp()
  const firstName = (currentUser?.name || 'there').split(' ')[0]

  const myJobs = jobs.filter(job => !job.recruiterId || (currentUser && job.recruiterId === currentUser.uid))
  
  // Filter activities to show only those relevant to this recruiter's jobs or created by this recruiter
  const recentActivity = globalActivities
    .filter(a => a.recruiterId === currentUser?.uid || myJobs.some(j => j.title === a.target))
    .slice(0, 5)

  const myJobIds = myJobs.map(j => j.id)
  const myCandidates = candidates.filter(c => myJobIds.includes(c.jobId))

  const totalApplicants = myCandidates.length
  const totalShortlisted = myCandidates.filter(c => c.status === 'Shortlisted').length
  const totalInterviews  = myCandidates.filter(c => c.status === 'Interviewing' || c.status === 'Interview Scheduled' || c.status === 'Interview').length

  return (
    <div className="space-y-8 max-w-6xl">

      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-[#2D2A26] tracking-tight">
            Good to see you, {firstName} 👋
          </h1>
          <p className="text-sm text-[#6B7280] mt-1">Here's what's happening across your open roles today.</p>
        </div>
        <Link
          to="/upload-job"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#F97316] text-white text-sm font-semibold rounded-xl hover:bg-[#EA580C] transition-colors shadow-sm shrink-0"
        >
          <FiPlus className="w-4 h-4" /> Post a Role
        </Link>
      </motion.div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Open Roles',        value: jobs.filter(j => j.status === 'Active').length, suffix: '',  sub: 'currently hiring'    },
          { label: 'Total Applicants',  value: totalApplicants,                                 suffix: '',  sub: 'across all roles'    },
          { label: 'Shortlisted',       value: totalShortlisted,                                suffix: '',  sub: 'ready to interview'  },
          { label: 'Interviews Set',    value: totalInterviews,                                 suffix: '',  sub: 'scheduled so far'    },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.06 }}
            className="bg-white border border-[#F1DDD2] rounded-2xl px-5 py-4 shadow-sm"
          >
            <p className="text-2xl font-bold text-[#2D2A26]">{stat.value}</p>
            <p className="text-sm font-semibold text-[#2D2A26] mt-1">{stat.label}</p>
            <p className="text-xs text-[#9CA3AF] mt-0.5">{stat.sub}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Job Listings */}
        <div className="xl:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-[#2D2A26]">Your Roles</h2>
            <Link to="/upload-job" className="text-xs text-[#F97316] font-semibold hover:underline flex items-center gap-1">
              + Add role
            </Link>
          </div>

          {myJobs.length === 0 ? (
            <div className="col-span-full py-12 text-center bg-[#F8FAFC] rounded-2xl border border-[#E5E7EB] border-dashed">
              <p className="text-[#6B7280] text-sm font-medium">No open positions right now.</p>
            </div>
          ) : (
            myJobs.map((job, idx) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + idx * 0.05 }}
                className="bg-white border border-[#F1DDD2] rounded-2xl p-5 shadow-[0_2px_10px_rgba(45,42,38,0.02)] hover:shadow-[0_8px_24px_rgba(45,42,38,0.06)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#FFF2EA] text-[#F97316] font-bold text-base flex items-center justify-center shrink-0">
                      {job.title.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-[#2D2A26] text-sm">{job.title}</p>
                      <p className="text-xs text-[#9CA3AF] flex items-center gap-1 mt-0.5">
                        {job.department} · <FiMapPin className="w-3 h-3" /> {job.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${statusStyles[job.status]}`}>
                      {job.status}
                    </span>
                    <button className="p-1.5 rounded-lg hover:bg-gray-50 text-[#9CA3AF] transition-colors">
                      <FiMoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                 {/* Metrics */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[
                    { label: 'Applicants',  value: candidates.filter(c => c.jobId === job.id).length, color: 'text-[#2D2A26]' },
                    { label: 'Shortlisted', value: candidates.filter(c => c.jobId === job.id && c.status === 'Shortlisted').length,     color: 'text-emerald-600' },
                    { label: 'Interviews',  value: candidates.filter(c => c.jobId === job.id && (c.status === 'Interviewing' || c.status === 'Interview Scheduled' || c.status === 'Interview')).length,      color: 'text-purple-600' },
                  ].map(m => (
                    <div key={m.label} className="bg-[#F8FAFC] rounded-xl py-3 text-center">
                      <p className={`text-xl font-bold ${m.color}`}>{m.value}</p>
                      <p className="text-[10px] text-[#9CA3AF] font-medium mt-0.5">{m.label}</p>
                    </div>
                  ))}
                </div>

                {/* Actions + timestamp */}
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="text-[11px] text-[#9CA3AF] flex items-center gap-1">
                    <FiClock className="w-3 h-3" /> Updated {job.postedDate || job.updated || 'Today'}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to delete this job role?')) {
                          deleteJob(job.id)
                        }
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold rounded-lg transition-colors border border-red-100"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => navigate('/upload-resume')}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-[#2D2A26] text-xs font-semibold rounded-lg transition-colors"
                    >
                      <FiUpload className="w-3 h-3" /> Upload CVs
                    </button>
                    <button
                      onClick={() => navigate('/discovery')}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-semibold rounded-lg transition-colors"
                    >
                      View Candidates <FiArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">

          {/* Recent Activity */}
          <div className="bg-white border border-[#F1DDD2] rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-[#2D2A26] mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivity.map(item => (
                <div key={item.id} className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${item.color || 'bg-gray-100 text-gray-700'}`}>
                    {(item.name || 'U').charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-[#2D2A26] font-medium leading-relaxed">
                      <span className="font-semibold">{item.name || 'User'}</span> {item.action}
                    </p>
                    <p className="text-[11px] text-[#9CA3AF] mt-0.5">{item.target || item.role} · {new Date(item.timestamp || Date.now()).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white border border-[#F1DDD2] rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-[#2D2A26] mb-3">Quick Actions</h3>
            <div className="space-y-2">
              {[
                { label: 'Browse all candidates',  to: '/discovery',  icon: FiUsers },
                { label: 'Compare top applicants', to: '/compare',    icon: FiCheckCircle },
                { label: 'View rankings',          to: '/rankings',   icon: FiArrowRight },
              ].map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#FFF8F4] hover:bg-[#FFF2EA] border border-[#F1DDD2] text-sm font-medium text-[#2D2A26] transition-colors group"
                >
                  <span className="flex items-center gap-2.5">
                    <link.icon className="w-4 h-4 text-[#F97316]" />
                    {link.label}
                  </span>
                  <FiArrowRight className="w-3.5 h-3.5 text-[#9CA3AF] group-hover:text-[#F97316] transition-colors" />
                </Link>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="bg-[#FFF8F4] border border-[#F1DDD2] rounded-2xl p-5">
            <p className="text-xs font-semibold text-[#2D2A26] mb-2">💡 Tip of the day</p>
            <p className="text-xs text-[#6B7280] leading-relaxed">
              Shortlisting at least 3–5 candidates per role gives you better comparison data in the Rankings page.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
