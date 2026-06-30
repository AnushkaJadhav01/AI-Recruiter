import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiSearch, FiFilter, FiArrowRight,
  FiChevronDown, FiChevronUp, FiMapPin
} from 'react-icons/fi'

const candidates = [
  {
    id: 'sarah-jenkins',
    name: 'Sarah Jenkins',
    title: 'Senior React Developer',
    location: 'San Francisco, CA',
    role: 'frontend',
    score: 94,
    skills: ['React', 'TypeScript', 'Next.js', 'Redux', 'Jest', 'Tailwind'],
    strengths: ['Strong open-source contributor', 'Very active GitHub', 'Excellent written communication'],
    note: "Sarah is an outstanding fit for the Senior role. Her open-source contributions show she works well at scale and writes maintainable code. We'd recommend getting her on a call soon."
  },
  {
    id: 'alex-mercer',
    name: 'Alex Mercer',
    title: 'Staff Backend Engineer',
    location: 'Austin, TX',
    role: 'backend',
    score: 91,
    skills: ['Go', 'Node.js', 'PostgreSQL', 'Docker', 'AWS', 'Redis'],
    strengths: ['Deep database architecture skills', 'Strong system design', 'Fast problem solver'],
    note: "Alex brings excellent backend depth, especially around PostgreSQL and distributed systems. He's held shorter tenures at a couple of startups — worth discussing directly in the interview."
  },
  {
    id: 'chloe-fontaine',
    name: 'Chloe Fontaine',
    title: 'UI/UX Design Lead',
    location: 'New York, NY',
    role: 'design',
    score: 88,
    skills: ['Figma', 'Framer', 'Design Systems', 'Prototyping', 'CSS Grid'],
    strengths: ['Award-winning portfolio', 'Strong leadership presence', 'Excellent stakeholder communication'],
    note: "Chloe is a premium product designer whose portfolio and endorsements stand out significantly. If you're looking for someone who can both design and lead a design system, she's a great pick."
  }
]

export const RankingsPage = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [selectedRole, setSelectedRole] = useState('all')
  const [sortBy, setSortBy] = useState<'score' | 'name'>('score')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const filtered = useMemo(() =>
    candidates
      .filter(c => {
        const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.skills.some(s => s.toLowerCase().includes(search.toLowerCase()))
        const matchRole = selectedRole === 'all' || c.role === selectedRole
        return matchSearch && matchRole
      })
      .sort((a, b) => sortBy === 'score' ? b.score - a.score : a.name.localeCompare(b.name)),
    [search, selectedRole, sortBy]
  )

  const rankColor = (idx: number) => {
    if (idx === 0) return 'bg-amber-50 text-amber-600 border-amber-200'
    if (idx === 1) return 'bg-gray-50 text-gray-500 border-gray-200'
    if (idx === 2) return 'bg-orange-50 text-orange-500 border-orange-200'
    return 'bg-[#FFF8F4] text-[#9CA3AF] border-[#F1DDD2]'
  }

  return (
    <div className="space-y-6 max-w-4xl">

      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-[#2D2A26]">Candidate Rankings</h2>
        <p className="text-sm text-[#9CA3AF] mt-1">Candidates ranked by overall fit for your open roles.</p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-[#F1DDD2] rounded-2xl p-4 flex flex-wrap gap-3 items-center">
        {/* Search */}
        <div className="relative flex-1 min-w-48">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] w-4 h-4" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search name or skill..."
            className="w-full pl-9 pr-3 py-2.5 border border-[#F1DDD2] rounded-xl text-sm bg-[#FFF8F4] focus:outline-none focus:border-[#FDBA74] placeholder-[#9CA3AF]"
          />
        </div>

        {/* Role filter */}
        <div className="flex items-center gap-2">
          <FiFilter className="text-[#9CA3AF] w-4 h-4 shrink-0" />
          <select
            value={selectedRole}
            onChange={e => setSelectedRole(e.target.value)}
            className="px-3 py-2.5 border border-[#F1DDD2] rounded-xl text-sm bg-[#FFF8F4] focus:outline-none focus:border-[#FDBA74] text-[#2D2A26]"
          >
            <option value="all">All Roles</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="design">Design</option>
          </select>
        </div>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value as any)}
          className="px-3 py-2.5 border border-[#F1DDD2] rounded-xl text-sm bg-[#FFF8F4] focus:outline-none focus:border-[#FDBA74] text-[#2D2A26]"
        >
          <option value="score">Sort by: Best match</option>
          <option value="name">Sort by: Name A–Z</option>
        </select>
      </div>

      {/* Candidate List */}
      <div className="space-y-3">
        <AnimatePresence>
          {filtered.length === 0 ? (
            <div className="py-16 text-center bg-white border border-dashed border-gray-200 rounded-2xl text-[#9CA3AF]">
              <p className="font-semibold text-sm text-[#6B7280] mb-1">No results found</p>
              <p className="text-xs">Try a different search or filter.</p>
            </div>
          ) : filtered.map((c, idx) => (
            <motion.div
              key={c.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25, delay: idx * 0.05 }}
              className="bg-white border border-[#F1DDD2] rounded-2xl overflow-hidden hover:border-[#FDBA74] hover:shadow-sm transition-all cursor-pointer"
              onClick={() => navigate(`/candidate/${c.id}`)}
            >
              <div className="p-5 flex flex-col sm:flex-row sm:items-center gap-5">

                {/* Rank badge + avatar */}
                <div className="flex items-center gap-4 sm:w-[55%]">
                  <div className={`w-9 h-9 rounded-xl border font-bold text-sm flex items-center justify-center shrink-0 ${rankColor(idx)}`}>
                    #{idx + 1}
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#FFF2EA] border border-[#FDBA74]/30 text-[#F97316] font-bold text-base flex items-center justify-center shrink-0">
                    {c.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-[#2D2A26] text-sm truncate">{c.name}</p>
                    <p className="text-xs text-[#9CA3AF] truncate">{c.title}</p>
                    <p className="text-[11px] text-[#9CA3AF] flex items-center gap-1 mt-0.5">
                      <FiMapPin className="w-3 h-3" /> {c.location}
                    </p>
                  </div>
                </div>

                {/* Score */}
                <div className="flex items-center gap-5 sm:ml-auto">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-[#F97316]">{c.score}<span className="text-sm text-[#9CA3AF] font-normal">%</span></p>
                    <p className="text-[10px] text-[#9CA3AF] font-medium">overall fit</p>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1.5 max-w-[180px]">
                    {c.skills.slice(0, 3).map(s => (
                      <span key={s} className="px-2 py-0.5 bg-[#F8FAFC] border border-gray-200 text-[10px] text-[#6B7280] font-medium rounded-full">{s}</span>
                    ))}
                    {c.skills.length > 3 && (
                      <span className="px-2 py-0.5 bg-[#F8FAFC] border border-gray-200 text-[10px] text-[#9CA3AF] rounded-full">+{c.skills.length - 3}</span>
                    )}
                  </div>

                  <button
                    onClick={e => { e.stopPropagation(); navigate(`/candidate/${c.id}`) }}
                    className="flex items-center gap-1 px-4 py-2 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-semibold rounded-lg transition-colors shrink-0"
                  >
                    View <FiArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Expand toggle */}
              <div
                onClick={e => { e.stopPropagation(); setExpandedId(expandedId === c.id ? null : c.id) }}
                className="px-5 py-2.5 border-t border-[#F1DDD2] bg-[#FFF8F4]/50 flex items-center justify-between text-xs text-[#9CA3AF] hover:bg-[#FFF8F4] transition-colors cursor-pointer"
              >
                <span className="font-medium">{expandedId === c.id ? 'Hide details' : `Why ${c.name.split(' ')[0]}?`}</span>
                {expandedId === c.id ? <FiChevronUp className="w-3.5 h-3.5" /> : <FiChevronDown className="w-3.5 h-3.5" />}
              </div>

              <AnimatePresence>
                {expandedId === c.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 py-4 bg-[#FFF8F4] border-t border-[#F1DDD2] space-y-4">
                      <p className="text-sm text-[#2D2A26] leading-relaxed">{c.note}</p>
                      <div>
                        <p className="text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-wider mb-2">Key strengths</p>
                        <div className="flex flex-wrap gap-2">
                          {c.strengths.map(s => (
                            <span key={s} className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#F1DDD2] rounded-xl text-xs text-[#2D2A26] font-medium">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] shrink-0" /> {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
