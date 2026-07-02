import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  FiSearch, FiFilter, FiMapPin,
  FiArrowRight, FiChevronDown, FiChevronUp,
  FiGithub, FiLinkedin, FiFileText
} from 'react-icons/fi'
import { useApp } from '../../contexts/AppContext'

type Recommendation = 'Strong Fit' | 'Worth a Chat' | 'Needs Review'

const recStyle: Record<string, string> = {
  'Strong Fit':   'bg-emerald-50 text-emerald-700 border border-emerald-200',
  'Strong Hire':  'bg-emerald-50 text-emerald-700 border border-emerald-200',
  'Worth a Chat': 'bg-blue-50   text-blue-700   border border-blue-200',
  'Hire':         'bg-blue-50   text-blue-700   border border-blue-200',
  'Consider':     'bg-amber-50  text-amber-700  border border-amber-200',
  'Needs Review': 'bg-amber-50  text-amber-700  border border-amber-200',
}

export const DiscoveryPage = () => {
  const { candidates } = useApp()
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState<string | null>(null)
  const [selectedStatus, setSelectedStatus] = useState('Active')

  const filtered = candidates.filter(c => {
    const matchesSearch = (c.name || 'Candidate').toLowerCase().includes(search.toLowerCase())
    if (selectedStatus === 'Active') {
      return matchesSearch && c.status !== 'Rejected'
    } else {
      return matchesSearch && (
        c.status === selectedStatus || 
        (selectedStatus === 'Interviewing' && (c.status === 'Interview Scheduled' || c.status === 'Interviewing'))
      )
    }
  })

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden -mx-6 md:-mx-8 mt-[-32px]">

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-6 md:px-8 py-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
          <div>
            <h2 className="text-xl font-bold text-[#2D2A26]">Browse Candidates</h2>
            <p className="text-sm text-[#9CA3AF] mt-0.5">Showing dynamic applicants matched by AI.</p>
          </div>
          <div className="relative shrink-0">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] w-4 h-4" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name..."
              className="w-56 pl-9 pr-3 py-2.5 bg-white border border-[#F1DDD2] rounded-xl text-xs focus:outline-none focus:border-[#FDBA74] placeholder-[#9CA3AF]"
            />
          </div>
        </div>

        {/* Status Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-150 pb-3 overflow-x-auto">
          {['Active', 'Applied', 'Shortlisted', 'Interviewing', 'Hired', 'Rejected'].map(status => {
            const count = status === 'Active' 
              ? candidates.filter(c => c.status !== 'Rejected').length
              : candidates.filter(c => c.status === status || (status === 'Interviewing' && (c.status === 'Interview Scheduled' || c.status === 'Interviewing'))).length;
            return (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all shrink-0 ${
                  selectedStatus === status 
                    ? 'bg-[#2D2A26] text-white shadow-sm' 
                    : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                }`}
              >
                {status} ({count})
              </button>
            )
          })}
        </div>

        {/* Candidate Cards */}
        <div className="space-y-4 max-w-3xl">
          {filtered.length === 0 && (
            <div className="text-center py-16 text-[#9CA3AF] border border-dashed border-gray-200 rounded-2xl bg-white">
              <p className="font-semibold text-sm text-[#6B7280] mb-1">No candidates match your search</p>
              <p className="text-xs">Try typing a different name.</p>
            </div>
          )}

          {filtered.map((c, idx) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className="bg-white border border-[#F1DDD2] rounded-2xl overflow-hidden hover:border-[#FDBA74] hover:shadow-sm transition-all"
            >
              {/* Card Main */}
              <div className="p-5">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">

                  {/* Avatar + Info */}
                  <div className="flex items-center gap-3 sm:w-1/3 shrink-0">
                    <div className="w-12 h-12 rounded-full bg-[#FFF2EA] text-[#F97316] font-bold text-lg flex items-center justify-center shrink-0 border border-[#FDBA74]/30">
                      {c.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-[#2D2A26] text-sm leading-tight">{c.name}</p>
                      <p className="text-xs text-[#9CA3AF] mt-0.5">{c.role || 'Software Engineer'}</p>
                      <p className="text-[11px] text-[#9CA3AF] flex items-center gap-1 mt-0.5">
                        <FiMapPin className="w-3 h-3" /> {c.location || 'Remote'}
                      </p>
                    </div>
                  </div>

                  {/* Score bars */}
                  <div className="flex-1 space-y-2">
                    {[
                      { label: 'Resume',   score: c.atsScore || 85,   icon: FiFileText, color: 'bg-[#F97316]' },
                      { label: 'GitHub',   score: c.githubScore || 80,   icon: FiGithub,   color: 'bg-purple-500' },
                      { label: 'LinkedIn', score: c.linkedinScore || 80, icon: FiLinkedin, color: 'bg-blue-500' },
                    ].map(row => (
                      <div key={row.label} className="flex items-center gap-2">
                        <row.icon className="w-3.5 h-3.5 text-[#9CA3AF] shrink-0" />
                        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className={`h-full ${row.color} rounded-full`} style={{ width: `${row.score}%` }} />
                        </div>
                        <span className="text-[11px] font-semibold text-[#6B7280] w-7 text-right">{row.score}</span>
                      </div>
                    ))}
                  </div>

                  {/* Score + Recommendation */}
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-[#F97316]">{c.matchScore || c.overallScore || 0}%</p>
                      <p className="text-[10px] text-[#9CA3AF] font-medium">match</p>
                    </div>
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${recStyle[c.recommendation || 'Consider'] || 'bg-gray-50 text-gray-700'}`}>
                      {c.recommendation || 'Consider'}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between gap-3 mt-4 pt-4 border-t border-[#F1DDD2]">
                  <button
                    onClick={() => setExpanded(expanded === c.id ? null : c.id)}
                    className="flex items-center gap-1.5 text-xs text-[#6B7280] font-medium hover:text-[#2D2A26] transition-colors"
                  >
                    {expanded === c.id ? <FiChevronUp className="w-3.5 h-3.5" /> : <FiChevronDown className="w-3.5 h-3.5" />}
                    {expanded === c.id ? 'Hide summary' : 'Read summary'}
                  </button>
                  <Link
                    to={`/candidate/${c.id}`}
                    className="flex items-center gap-1.5 px-4 py-2 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-semibold rounded-lg transition-colors"
                  >
                    View Full Profile <FiArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Expanded note */}
              <AnimatePresence>
                {expanded === c.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 bg-[#FFF8F4] border-t border-[#F1DDD2]">
                      <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider pt-4 mb-2">Our take on this candidate</p>
                      <p className="text-sm text-[#2D2A26] leading-relaxed">{c.executiveSummary || 'No summary generated yet.'}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
