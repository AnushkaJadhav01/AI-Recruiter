import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiMapPin, 
  FiBriefcase, 
  FiCheckCircle, 
  FiTrendingUp, 
  FiPlusCircle,
  FiZap,
  FiHelpCircle,
  FiAward
} from 'react-icons/fi'
import { Card } from '../../components/common/Card'
import { Button } from '../../components/common/Button'
import { Badge } from '../../components/common/Badge'

export const JobRecommendationsPage = () => {
  const [appliedJobs, setAppliedJobs] = useState<Record<string, boolean>>({})
  const [activeExplainId, setActiveExplainId] = useState<string | null>(null)

  const recommendedJobs = [
    {
      id: "job-1",
      title: "Senior Full-Stack Developer",
      company: "AI Recruiter Technologies",
      location: "Remote (US/Canada)",
      department: "Product Engineering",
      salary: "$140k - $170k",
      skillsMatched: ["React", "Node.js", "Express", "PostgreSQL", "Tailwind CSS", "AWS"],
      skillsMissing: ["Framer Motion"],
      matchScore: 94,
      whyMatch: "This job requires deep frontend styling (Tailwind CSS) and solid REST endpoint design (Express/Node.js), matching your experience at Vercel Agency and HiringLoop. The only missing skill is Framer Motion, which our AI agents estimate you can learn in 3-5 days.",
      details: "We are looking for a Senior Developer to own frontend-to-backend development. You will design component architectures, database tables, and help scale microservices."
    },
    {
      id: "job-2",
      title: "React Native Mobile Lead",
      company: "HealthPulse",
      location: "San Francisco, CA (Hybrid)",
      department: "Mobile Team",
      salary: "$150k - $180k",
      skillsMatched: ["React", "Node.js", "Express", "Tailwind CSS"],
      skillsMissing: ["React Native", "iOS/Android Deployments"],
      matchScore: 86,
      whyMatch: "Your strong background in state management, rendering layouts, and reusable components makes you a fast study for mobile design. Our system rates you as a high-growth candidate who can lead cross-platform deployments.",
      details: "Build and scale our React Native consumer healthcare app. Work with hardware endpoints, health kit integrations, and optimized render queues."
    },
    {
      id: "job-3",
      title: "AI UI developer",
      company: "AI Labs Ltd.",
      location: "Austin, TX (In-Office)",
      department: "AI Products",
      salary: "$130k - $160k",
      skillsMatched: ["React", "Node.js", "Tailwind CSS", "AWS"],
      skillsMissing: ["Python", "FastAPI"],
      matchScore: 81,
      whyMatch: "Matches your cloud environment configs (AWS) and responsive layouts. Python/FastAPI endpoint skills can be bridged using your backend experience.",
      details: "Work at the interface of LLMs and web apps. Design beautiful chat controls, prompt playgrounds, and model scoring analytics pages."
    }
  ]

  const handleApply = (id: string) => {
    setAppliedJobs(prev => ({ ...prev, [id]: true }))
  }

  return (
    <div className="space-y-6 text-left max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
          <FiZap className="text-blue-600 fill-blue-600" />
          AI Job Recommendations
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          Open positions matched dynamically to your verified skills, experience level, and coding rating.
        </p>
      </div>

      <div className="space-y-5">
        {recommendedJobs.map((job) => {
          const isApplied = appliedJobs[job.id]
          const isExplaining = activeExplainId === job.id

          return (
            <Card 
              key={job.id} 
              className={`p-6 border transition-all bg-white shadow-sm flex flex-col space-y-4 ${
                isExplaining ? 'ring-2 ring-blue-500/20 border-blue-400' : 'hover:border-gray-300'
              }`}
            >
              {/* Top Row: Info & Scores */}
              <div className="flex justify-between items-start flex-wrap gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-extrabold text-base text-gray-950">{job.title}</h3>
                    <Badge variant={job.matchScore >= 90 ? 'success' : 'primary'} className="text-[10px] uppercase font-bold tracking-wider">
                      {job.matchScore}% Match
                    </Badge>
                  </div>
                  <p className="text-xs font-bold text-blue-600 uppercase tracking-wide">
                    {job.company} • {job.department}
                  </p>
                  <p className="text-[11px] text-gray-500 font-medium flex items-center gap-3 mt-1.5">
                    <span className="flex items-center gap-1"><FiMapPin className="w-3.5 h-3.5" /> {job.location}</span>
                    <span className="flex items-center gap-1"><FiBriefcase className="w-3.5 h-3.5" /> {job.salary}</span>
                  </p>
                </div>

                <div className="flex gap-2 shrink-0">
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveExplainId(isExplaining ? null : job.id)}
                    className="text-xs font-semibold gap-1"
                  >
                    <FiHelpCircle className="w-3.5 h-3.5" /> Why I Match?
                  </Button>
                  
                  <Button 
                    onClick={() => handleApply(job.id)}
                    disabled={isApplied}
                    className={`text-xs font-semibold min-w-[100px] shadow-sm ${
                      isApplied ? 'bg-emerald-100 text-emerald-800 border border-emerald-200 cursor-default' : ''
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

              {/* Collapsible Explain matching block */}
              <AnimatePresence>
                {isExplaining && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-xl space-y-3 mt-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900 uppercase tracking-wide">
                        <FiZap className="text-blue-600 w-4 h-4 shrink-0" />
                        AI Matching Logic Explanation
                      </div>
                      
                      <p className="text-xs text-blue-950 font-semibold leading-relaxed">
                        {job.whyMatch}
                      </p>

                      <div className="border-t border-blue-200/50 my-2" />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs leading-relaxed">
                        <div>
                          <span className="text-[10px] text-blue-800 font-bold uppercase tracking-wider block mb-1">Matched Skills</span>
                          <div className="flex flex-wrap gap-1">
                            {job.skillsMatched.map((s, i) => (
                              <span key={i} className="px-2 py-0.5 bg-emerald-100/60 border border-emerald-200 text-emerald-800 rounded text-[10px] font-bold">{s}</span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <span className="text-[10px] text-blue-800 font-bold uppercase tracking-wider block mb-1">Skill Gaps</span>
                          <div className="flex flex-wrap gap-1">
                            {job.skillsMissing.map((s, i) => (
                              <span key={i} className="px-2 py-0.5 bg-amber-100/60 border border-amber-200 text-amber-800 rounded text-[10px] font-bold">{s}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Brief Job Description */}
              <div className="text-xs text-gray-700 leading-relaxed font-semibold border-t border-gray-100 pt-3">
                <span className="font-bold text-gray-900 block mb-1">Job Description Snippet:</span>
                {job.details}
              </div>

            </Card>
          )
        })}
      </div>
    </div>
  )
}
