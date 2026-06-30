import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  FiSearch, FiFilter, FiMapPin,
  FiArrowRight, FiChevronDown, FiChevronUp,
  FiGithub, FiLinkedin, FiFileText
} from 'react-icons/fi'

type Recommendation = 'Strong Fit' | 'Worth a Chat' | 'Needs Review'

const recStyle: Record<Recommendation, string> = {
  'Strong Fit':   'bg-emerald-50 text-emerald-700 border border-emerald-200',
  'Worth a Chat': 'bg-blue-50   text-blue-700   border border-blue-200',
  'Needs Review': 'bg-amber-50  text-amber-700  border border-amber-200',
}

const candidates: {
  id: number; name: string; role: string; location: string;
  matchScore: number; resume: number; github: number; linkedin: number; projects: number;
  recommendation: Recommendation; note: string;
}[] = [
  {
    id: 1, name: 'Sarah Jenkins', role: 'Senior React Developer', location: 'San Francisco, CA',
    matchScore: 96, resume: 98, github: 95, linkedin: 90, projects: 92,
    recommendation: 'Strong Fit',
    note: "Sarah's experience closely matches what you described in the job post. Her open-source work and project history show solid depth in React and Next.js. Highly recommend a first call."
  },
  {
    id: 2, name: 'David Chen', role: 'Frontend Engineer', location: 'Remote',
    matchScore: 84, resume: 88, github: 75, linkedin: 85, projects: 80,
    recommendation: 'Worth a Chat',
    note: "David has a good foundation and strong communication indicators. He may need to build up Next.js production experience, but his communication in open-source reviews is above average. Worth a conversation."
  },
  {
    id: 3, name: 'Elena Rodriguez', role: 'Full Stack Developer', location: 'Austin, TX',
    matchScore: 91, resume: 90, github: 98, linkedin: 85, projects: 95,
    recommendation: 'Strong Fit',
    note: "Elena's GitHub activity is exceptional — among the top profiles we've seen for this role. Her project breadth and consistency make her a very strong candidate for your consideration."
  },
]

export const DiscoveryPage = () => {
  const [expanded, setExpanded] = useState<number | null>(null)
  const [search, setSearch] = useState('')
  const [minScore, setMinScore] = useState(70)

  const filtered = candidates.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) &&
    c.matchScore >= minScore
  )

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden -mx-6 md:-mx-8 mt-[-32px]">

      {/* Filter Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-[#F1DDD2] h-full overflow-y-auto shrink-0 p-6 gap-6">
        <div className="flex items-center gap-2 text-[#2D2A26]">
          <FiFilter className="w-4 h-4 text-[#9CA3AF]" />
          <h3 className="font-semibold text-sm">Filter Candidates</h3>
        </div>

        {/* Min Score */}
        <div>
          <label className="block text-xs font-semibold text-[#6B7280] mb-2">
            Minimum match: <span className="text-[#F97316] font-bold">{minScore}%+</span>
          </label>
          <input
            type="range" min="0" max="100" value={minScore}
            onChange={e => setMinScore(Number(e.target.value))}
            className="w-full accent-[#F97316] h-1.5 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-[#9CA3AF] mt-1.5">
            <span>0%</span><span>100%</span>
          </div>
        </div>

        <div className="border-t border-[#F1DDD2]" />

        {/* Skills */}
        <div>
          <label className="block text-xs font-semibold text-[#6B7280] mb-2">Skills to look for</label>
          <div className="flex flex-wrap gap-1.5">
            {['React', 'Next.js', 'TypeScript'].map(s => (
              <span key={s} className="px-2.5 py-1 bg-[#FFF2EA] text-[#F97316] border border-[#FDBA74] text-[11px] font-semibold rounded-full">{s}</span>
            ))}
            <button className="px-2.5 py-1 bg-gray-50 text-[#9CA3AF] border border-dashed border-gray-300 text-[11px] font-semibold rounded-full hover:bg-gray-100 transition-colors">+ Add</button>
          </div>
        </div>

        <div className="border-t border-[#F1DDD2]" />

        {/* Experience */}
        <div>
          <label className="block text-xs font-semibold text-[#6B7280] mb-2">Experience (years)</label>
          <div className="grid grid-cols-2 gap-2">
            <input type="number" placeholder="Min" className="px-3 py-2 border border-[#F1DDD2] rounded-xl text-xs bg-[#FFF8F4] focus:outline-none focus:border-[#FDBA74]" />
            <input type="number" placeholder="Max" className="px-3 py-2 border border-[#F1DDD2] rounded-xl text-xs bg-[#FFF8F4] focus:outline-none focus:border-[#FDBA74]" />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-6 md:px-8 py-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
          <div>
            <h2 className="text-xl font-bold text-[#2D2A26]">Browse Candidates</h2>
            <p className="text-sm text-[#9CA3AF] mt-0.5">Showing applicants for: <span className="font-medium text-[#6B7280]">Senior React Developer</span></p>
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

        {/* Candidate Cards */}
        <div className="space-y-4 max-w-3xl">
          {filtered.length === 0 && (
            <div className="text-center py-16 text-[#9CA3AF] border border-dashed border-gray-200 rounded-2xl bg-white">
              <p className="font-semibold text-sm text-[#6B7280] mb-1">No candidates match your filters</p>
              <p className="text-xs">Try lowering the minimum match score.</p>
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
                      <p className="text-xs text-[#9CA3AF] mt-0.5">{c.role}</p>
                      <p className="text-[11px] text-[#9CA3AF] flex items-center gap-1 mt-0.5">
                        <FiMapPin className="w-3 h-3" /> {c.location}
                      </p>
                    </div>
                  </div>

                  {/* Score bars */}
                  <div className="flex-1 space-y-2">
                    {[
                      { label: 'Resume',   score: c.resume,   icon: FiFileText, color: 'bg-[#F97316]' },
                      { label: 'GitHub',   score: c.github,   icon: FiGithub,   color: 'bg-purple-500' },
                      { label: 'LinkedIn', score: c.linkedin, icon: FiLinkedin, color: 'bg-blue-500' },
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
                      <p className="text-2xl font-bold text-[#F97316]">{c.matchScore}%</p>
                      <p className="text-[10px] text-[#9CA3AF] font-medium">match</p>
                    </div>
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${recStyle[c.recommendation]}`}>
                      {c.recommendation}
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
                    to="/candidate/sarah-jenkins"
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
                      <p className="text-sm text-[#2D2A26] leading-relaxed">{c.note}</p>
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
