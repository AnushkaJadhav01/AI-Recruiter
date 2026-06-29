import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiSearch, 
  FiSliders, 
  FiCpu, 
  FiCheckCircle, 
  FiArrowRight, 
  FiFilter,
  FiZap,
  FiTrendingUp,
  FiShield
} from 'react-icons/fi'
import { Card } from '../../components/common/Card'
import { Button } from '../../components/common/Button'

export const RankingsPage = () => {
  const navigate = useNavigate()
  
  // Filters & Sorting state
  const [search, setSearch] = useState('')
  const [selectedRole, setSelectedRole] = useState('all')
  const [minScore] = useState(80)
  const [sortBy, setSortBy] = useState<'score' | 'github' | 'comm'>('score')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const candidates = [
    {
      id: 'sarah-jenkins',
      name: 'Sarah Jenkins',
      title: 'Senior React Developer',
      location: 'San Francisco, CA',
      role: 'frontend',
      overallScore: 94,
      confidence: 96,
      momentum: 'High',
      githubScore: 95,
      leadership: 92,
      commScore: 96,
      riskLevel: 'Low',
      skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Redux', 'Jest'],
      reasoning: 'Sarah is an outstanding front-end architect. Her Next.js contributions represent high technical depth. AI evaluation confirms 94% profile match for Senior requirements.'
    },
    {
      id: 'alex-mercer',
      name: 'Alex Mercer',
      title: 'Staff Backend Engineer',
      location: 'Austin, TX',
      role: 'backend',
      overallScore: 91,
      confidence: 92,
      momentum: 'Medium',
      githubScore: 96,
      leadership: 88,
      commScore: 90,
      riskLevel: 'Medium',
      skills: ['Go', 'Node.js', 'PostgreSQL', 'Docker', 'AWS', 'Redis'],
      reasoning: 'Alex shows excellent backend competencies. High PostgreSQL/Redis architecture scores. Medium flight risk due to brief tenures at previous startups.'
    },
    {
      id: 'chloe-fontaine',
      name: 'Chloe Fontaine',
      title: 'UI/UX Design Lead',
      location: 'New York, NY',
      role: 'design',
      overallScore: 88,
      confidence: 94,
      momentum: 'High',
      githubScore: 40,
      leadership: 95,
      commScore: 98,
      riskLevel: 'Low',
      skills: ['Figma', 'Framer', 'Design Systems', 'CSS Grid', 'Prototypes'],
      reasoning: 'Chloe represents a premium product designer. Exceptional LinkedIn endorsements and portfolio case studies score significantly above average.'
    }
  ]

  // Filter and Sort calculation
  const filteredCandidates = useMemo(() => {
    return candidates
      .filter((c) => {
        const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || 
                              c.skills.some(s => s.toLowerCase().includes(search.toLowerCase()))
        const matchesRole = selectedRole === 'all' || c.role === selectedRole
        const matchesScore = c.overallScore >= minScore
        return matchesSearch && matchesRole && matchesScore
      })
      .sort((a, b) => {
        if (sortBy === 'score') return b.overallScore - a.overallScore
        if (sortBy === 'github') return b.githubScore - a.githubScore
        if (sortBy === 'comm') return b.commScore - a.commScore
        return 0
      })
  }, [search, selectedRole, minScore, sortBy])

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Candidate Discovery</h2>
        <p className="text-xs text-gray-500 mt-1">Explore AI-ranked candidates with deep intelligence profiles.</p>
      </div>

      {/* Filter and Control Row */}
      <Card className="p-5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Search */}
          <div className="md:col-span-5 relative">
            <FiSearch className="absolute left-3 top-3 text-[#9CA3AF] w-4 h-4" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search candidate name or skill..."
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563EB] outline-none transition-all placeholder-gray-400"
            />
          </div>

          {/* Job Role Select */}
          <div className="md:col-span-3">
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563EB] outline-none text-gray-700 bg-white"
            >
              <option value="all">All Vacancies</option>
              <option value="frontend">Senior React Developer</option>
              <option value="backend">Staff Backend Engineer</option>
              <option value="design">UI/UX Design Lead</option>
            </select>
          </div>

          {/* Sort By Select */}
          <div className="md:col-span-4 flex items-center gap-2">
            <FiFilter className="text-gray-400 w-3.5 h-3.5 shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-2 py-2 border border-gray-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563EB] outline-none text-gray-700 bg-white"
            >
              <option value="score">Sort by: AI Match Score</option>
              <option value="github">Sort by: GitHub Quality</option>
              <option value="comm">Sort by: Communication Skills</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Candidates List with Animated Reordering */}
      <div className="space-y-6">
        <AnimatePresence>
          {filteredCandidates.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-16 text-center text-gray-500 border border-dashed border-gray-200 bg-white rounded-xl"
            >
              <FiSliders className="w-10 h-10 mx-auto text-gray-300 mb-3" />
              <p className="font-bold text-xs text-gray-800">No candidates match your criteria</p>
              <p className="text-[10px] text-gray-400 mt-1">Try lowering the minimum score or adjusting search query filters.</p>
            </motion.div>
          ) : (
            filteredCandidates.map((candidate, idx) => (
              <motion.div
                key={candidate.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              >
                <Card className="p-0 overflow-hidden border-gray-200 shadow-sm hover:border-blue-300 transition-all bg-white group cursor-pointer" onClick={() => navigate(`/candidate/${candidate.id}`)}>
                  <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                    
                    {/* Left: Score & Core Info */}
                    <div className="md:col-span-5 flex items-start gap-6">
                      <div className="text-center shrink-0">
                        <div className="w-20 h-20 rounded-2xl bg-blue-50 text-[#2563EB] flex items-center justify-center font-extrabold text-2xl border border-blue-100 shadow-sm mx-auto mb-2 relative">
                          {candidate.overallScore}
                          <div className="absolute -top-2 -right-2 bg-emerald-500 text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold shadow-sm">#{idx + 1}</div>
                        </div>
                        <p className="text-[9px] text-[#2563EB] font-bold uppercase tracking-wider">AI Match</p>
                      </div>
                      
                      <div className="flex-1 min-w-0 pt-1">
                        <h4 className="font-extrabold text-lg text-gray-900 truncate group-hover:text-blue-600 transition-colors">{candidate.name}</h4>
                        <p className="text-xs text-gray-500 mt-1">{candidate.title}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">{candidate.location}</p>
                        
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {candidate.skills.slice(0, 4).map((s) => (
                            <span key={s} className="px-2 py-0.5 rounded bg-gray-50 text-[10px] text-gray-700 border border-gray-200 font-semibold">
                              {s}
                            </span>
                          ))}
                          {candidate.skills.length > 4 && (
                            <span className="px-2 py-0.5 rounded bg-gray-50 text-[10px] text-gray-400 border border-gray-100">
                              +{candidate.skills.length - 4}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Middle: Key Intelligence Signals */}
                    <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 text-center">
                        <FiCpu className="mx-auto text-blue-500 mb-1.5 w-4 h-4" />
                        <p className="text-lg font-extrabold text-gray-900">{candidate.confidence}%</p>
                        <p className="text-[9px] text-gray-500 font-bold uppercase">Confidence</p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 text-center">
                        <FiTrendingUp className="mx-auto text-emerald-500 mb-1.5 w-4 h-4" />
                        <p className="text-sm font-extrabold text-gray-900 mt-1">{candidate.momentum}</p>
                        <p className="text-[9px] text-gray-500 font-bold uppercase mt-1">Momentum</p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 text-center">
                        <FiShield className={`mx-auto mb-1.5 w-4 h-4 ${candidate.riskLevel === 'Low' ? 'text-emerald-500' : 'text-amber-500'}`} />
                        <p className="text-sm font-extrabold text-gray-900 mt-1">{candidate.riskLevel}</p>
                        <p className="text-[9px] text-gray-500 font-bold uppercase mt-1">Risk Level</p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 text-center">
                        <FiZap className="mx-auto text-indigo-500 mb-1.5 w-4 h-4" />
                        <p className="text-lg font-extrabold text-gray-900">{candidate.leadership}</p>
                        <p className="text-[9px] text-gray-500 font-bold uppercase">Leadership</p>
                      </div>
                    </div>

                  </div>

                  {/* AI Reasoning Summary Toggle */}
                  <div 
                    onClick={(e) => { e.stopPropagation(); setExpandedId(expandedId === candidate.id ? null : candidate.id) }}
                    className="bg-gray-50/50 px-6 py-3 md:px-8 border-t border-gray-100 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex gap-2 items-center text-xs font-bold text-gray-500 uppercase tracking-wider">
                      <FiCpu className="text-blue-500 w-3.5 h-3.5" /> AI Synthesis Reasoning
                    </div>
                    <FiArrowRight className={`text-gray-400 w-4 h-4 transition-transform ${expandedId === candidate.id ? 'rotate-90' : ''}`} />
                  </div>

                  {/* Expandable Reasoning */}
                  <AnimatePresence>
                    {expandedId === candidate.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden bg-blue-50/30 border-t border-blue-100/50"
                      >
                        <div className="px-6 py-5 md:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                          <div className="flex gap-3 items-start">
                            <FiCheckCircle className="text-blue-500 w-4 h-4 mt-0.5 shrink-0" />
                            <p className="text-xs text-gray-700 font-medium leading-relaxed max-w-2xl">
                              {candidate.reasoning}
                            </p>
                          </div>
                          <Button onClick={(e) => { e.stopPropagation(); navigate(`/candidate/${candidate.id}`) }} className="shrink-0 gap-2 text-xs shadow-sm" size="sm">
                            Full Intelligence Report <FiArrowRight className="w-3 h-3" />
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </Card>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

    </div>
  )
}
