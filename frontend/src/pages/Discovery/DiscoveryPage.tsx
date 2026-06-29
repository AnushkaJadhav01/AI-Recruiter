import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  FiSearch, 
  FiFilter, 
  FiStar, 
  FiGitCommit, 
  FiLinkedin, 
  FiFileText, 
  FiBriefcase,
  FiTrendingUp,
  FiShield,
  FiArrowRight,
  FiCpu
} from 'react-icons/fi'
import { Card } from '../../components/common/Card'
import { Button } from '../../components/common/Button'
import { Badge } from '../../components/common/Badge'

export const DiscoveryPage = () => {
  const [activeCandidate, setActiveCandidate] = useState<number | null>(null)

  const candidates = [
    {
      id: 1,
      name: 'Sarah Jenkins',
      role: 'Senior React Developer',
      location: 'San Francisco, CA',
      matchScore: 96,
      scores: {
        resume: 98,
        github: 95,
        linkedin: 90,
        projects: 92
      },
      momentum: 'High Growth',
      confidence: '99%',
      riskLevel: 'Low',
      recommendation: 'Strong Hire',
      reasoning: 'Sarah perfectly aligns with the AI Role Persona. Her GitHub shows deep expertise in Next.js SSR optimization (Top 2%), and her career momentum demonstrates consistent promotion velocity. Very low flight risk based on tenure history.'
    },
    {
      id: 2,
      name: 'David Chen',
      role: 'Frontend Engineer',
      location: 'Remote',
      matchScore: 84,
      scores: {
        resume: 88,
        github: 75,
        linkedin: 85,
        projects: 80
      },
      momentum: 'Steady',
      confidence: '85%',
      riskLevel: 'Medium',
      recommendation: 'Interview',
      reasoning: 'Strong foundation in React, but lacks recent evidence of Next.js production experience in GitHub. Communication skills appear excellent based on open-source PR reviews. Worth interviewing to assess SSR knowledge.'
    },
    {
      id: 3,
      name: 'Elena Rodriguez',
      role: 'Full Stack Dev',
      location: 'Austin, TX',
      matchScore: 91,
      scores: {
        resume: 90,
        github: 98,
        linkedin: 85,
        projects: 95
      },
      momentum: 'High Growth',
      confidence: '95%',
      riskLevel: 'Low',
      recommendation: 'Strong Hire',
      reasoning: 'Exceptional open-source contributions. Highly proficient in the required stack. Shows strong autonomous problem-solving capabilities.'
    }
  ]

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-[#FAFBFC] -mx-6 md:-mx-8 px-6 md:px-8 mt-[-32px]">
      
      {/* Filtering Sidebar */}
      <div className="w-72 bg-white border-r border-[#E5E7EB] shrink-0 h-full overflow-y-auto hidden lg:block p-6">
        <div className="flex items-center gap-2 mb-8">
          <FiFilter className="text-gray-400" />
          <h3 className="font-extrabold text-sm text-gray-900">Advanced Filters</h3>
        </div>

        <div className="space-y-6">
          
          {/* Match Score */}
          <div>
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-3 block">Minimum Match Score</label>
            <input type="range" min="0" max="100" defaultValue="80" className="w-full accent-blue-600 h-1.5 bg-gray-200 rounded-lg cursor-pointer" />
            <div className="flex justify-between text-[10px] text-gray-400 mt-2 font-semibold">
              <span>0%</span>
              <span className="text-blue-600">80%+</span>
              <span>100%</span>
            </div>
          </div>

          <div className="border-t border-gray-100" />

          {/* AI Metrics */}
          <div>
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-3 block">AI Risk Level</label>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" /> Low Risk Only
              </label>
            </div>
          </div>

          <div className="border-t border-gray-100" />

          {/* Experience */}
          <div>
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-3 block">Experience (Years)</label>
            <div className="grid grid-cols-2 gap-2">
              <input type="number" placeholder="Min" className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs" />
              <input type="number" placeholder="Max" className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs" />
            </div>
          </div>

          <div className="border-t border-gray-100" />

          {/* Skills */}
          <div>
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-3 block">Must Have Skills</label>
            <div className="flex flex-wrap gap-1.5">
              <span className="px-2 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold rounded">React</span>
              <span className="px-2 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold rounded">Next.js</span>
              <span className="px-2 py-1 bg-gray-50 text-gray-500 text-[10px] font-bold rounded border border-dashed border-gray-300 hover:bg-gray-100 cursor-pointer">+ Add</span>
            </div>
          </div>

        </div>
      </div>

      {/* Main Content Viewport */}
      <div className="flex-1 h-full overflow-y-auto p-6 md:p-8 relative">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">Candidate Discovery</h2>
            <p className="text-xs text-gray-500 mt-1 font-medium">Explore AI-ranked candidates for Senior React Developer (Workspace #1).</p>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search candidates by name..." 
                className="w-64 pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Candidate Feed */}
        <div className="space-y-4 max-w-4xl">
          {candidates.map((candidate, idx) => (
            <motion.div
              key={candidate.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              onMouseEnter={() => setActiveCandidate(candidate.id)}
              onMouseLeave={() => setActiveCandidate(null)}
            >
              <Card className={`p-0 overflow-hidden transition-all duration-300 cursor-pointer border hover:shadow-lg ${activeCandidate === candidate.id ? 'border-blue-300 ring-4 ring-blue-500/10' : 'border-gray-200'}`}>
                <div className="p-5 flex flex-col md:flex-row gap-6">
                  
                  {/* Left: Profile & Top Level */}
                  <div className="flex items-start gap-4 md:w-1/3 shrink-0">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center text-blue-600 font-extrabold text-xl shadow-inner border border-blue-200">
                      {candidate.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-gray-900 text-lg tracking-tight leading-tight">{candidate.name}</h4>
                      <p className="text-xs text-gray-500 font-medium mb-2">{candidate.role}</p>
                      <Badge variant={candidate.recommendation === 'Strong Hire' ? 'success' : 'primary'} className="text-[9px] uppercase font-bold px-2 py-0.5">
                        {candidate.recommendation}
                      </Badge>
                    </div>
                  </div>

                  {/* Middle: Scores Grid */}
                  <div className="flex-1 grid grid-cols-4 gap-2 border-l border-gray-100 pl-6">
                    
                    <div className="col-span-4 mb-2 flex items-center justify-between">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Multi-Agent Intelligence Scores</p>
                      <span className="text-xs font-extrabold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                        {candidate.matchScore}% Overall Match
                      </span>
                    </div>

                    <div className="bg-[#FAFBFC] rounded-lg p-2 border border-gray-100 text-center">
                      <FiFileText className="w-3.5 h-3.5 text-gray-400 mx-auto mb-1" />
                      <p className="text-sm font-extrabold text-gray-900">{candidate.scores.resume}</p>
                      <p className="text-[8px] font-bold text-gray-500 uppercase mt-0.5">Resume</p>
                    </div>
                    <div className="bg-[#FAFBFC] rounded-lg p-2 border border-gray-100 text-center">
                      <FiGitCommit className="w-3.5 h-3.5 text-gray-400 mx-auto mb-1" />
                      <p className="text-sm font-extrabold text-gray-900">{candidate.scores.github}</p>
                      <p className="text-[8px] font-bold text-gray-500 uppercase mt-0.5">GitHub</p>
                    </div>
                    <div className="bg-[#FAFBFC] rounded-lg p-2 border border-gray-100 text-center">
                      <FiLinkedin className="w-3.5 h-3.5 text-gray-400 mx-auto mb-1" />
                      <p className="text-sm font-extrabold text-gray-900">{candidate.scores.linkedin}</p>
                      <p className="text-[8px] font-bold text-gray-500 uppercase mt-0.5">LinkedIn</p>
                    </div>
                    <div className="bg-[#FAFBFC] rounded-lg p-2 border border-gray-100 text-center">
                      <FiBriefcase className="w-3.5 h-3.5 text-gray-400 mx-auto mb-1" />
                      <p className="text-sm font-extrabold text-gray-900">{candidate.scores.projects}</p>
                      <p className="text-[8px] font-bold text-gray-500 uppercase mt-0.5">Projects</p>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex flex-col justify-center items-end border-l border-gray-100 pl-6">
                    <Link to="/candidate/sarah-jenkins">
                      <Button className="w-full sm:w-auto shadow-sm gap-2">
                        View Intelligence <FiArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Hover Expansion: Reasoning */}
                <AnimatePresence>
                  {activeCandidate === candidate.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden bg-blue-50/30 border-t border-blue-100"
                    >
                      <div className="p-5 flex flex-col md:flex-row gap-6">
                        <div className="md:w-1/3 space-y-3 shrink-0">
                          <div>
                            <p className="text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1.5"><FiTrendingUp className="text-emerald-500" /> Career Momentum</p>
                            <p className="text-xs font-semibold text-gray-900">{candidate.momentum}</p>
                          </div>
                          <div>
                            <p className="text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1.5"><FiShield className={candidate.riskLevel === 'Low' ? 'text-emerald-500' : 'text-amber-500'} /> Flight Risk</p>
                            <p className="text-xs font-semibold text-gray-900">{candidate.riskLevel}</p>
                          </div>
                          <div>
                            <p className="text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1.5"><FiStar className="text-indigo-500" /> AI Confidence</p>
                            <p className="text-xs font-semibold text-gray-900">{candidate.confidence}</p>
                          </div>
                        </div>
                        <div className="flex-1 bg-white rounded-xl p-4 border border-blue-100 shadow-sm relative">
                          <div className="absolute top-0 left-6 w-3 h-3 bg-white border-t border-l border-blue-100 -translate-y-1/2 rotate-45" />
                          <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                            <FiCpu className="w-3.5 h-3.5" /> AI Synthesis Reasoning
                          </p>
                          <p className="text-xs text-gray-600 leading-relaxed font-medium">
                            {candidate.reasoning}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </Card>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  )
}
