import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiGithub, 
  FiRefreshCw, 
  FiCpu, 
  FiCheckCircle, 
  FiStar, 
  FiGitCommit,
  FiAward
} from 'react-icons/fi'
import { Card } from '../../components/common/Card'
import { Button } from '../../components/common/Button'
import { Badge } from '../../components/common/Badge'
import Progress from '../../components/common/Progress'

export const GitHubSyncPage = () => {
  const [syncing, setSyncing] = useState(false)
  const [syncDone, setSyncDone] = useState(false)
  const [techScore, setTechScore] = useState(92)
  const [starsCount, setStarsCount] = useState(202)

  const githubData = {
    username: "sarahj-codes",
    totalRepos: 18,
    contributions: 1450,
    languages: [
      { name: "JavaScript", percentage: 55, color: "bg-yellow-400" },
      { name: "TypeScript", percentage: 25, color: "bg-blue-500" },
      { name: "HTML/CSS", percentage: 15, color: "bg-orange-500" },
      { name: "SQL", percentage: 5, color: "bg-purple-500" }
    ],
    qualityAudit: "Exceptional clean code structure, consistent modular architectures, high coverage test scripts (88%), and extremely readable README documentations.",
    projects: [
      { name: "SaaS Dashboard Kit", stars: 124, description: "Customizable React SaaS framework containing pre-made Tailwind configurations and Framer Motion animation layouts.", language: "JavaScript" },
      { name: "QuickAPI Express", stars: 78, description: "Microservice structure boilerplate for rapid backend routing with integrated Swagger documentation generators.", language: "JavaScript" }
    ]
  }

  const triggerSync = () => {
    setSyncing(true)
    setSyncDone(false)
    setTimeout(() => {
      setSyncing(false)
      setSyncDone(true)
      setTechScore(95)
      setStarsCount(212)
    }, 3000)
  }

  return (
    <div className="space-y-6 text-left max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-start flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
            <FiGithub className="text-gray-900" />
            GitHub Profile Synchronization
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Connect and analyze your repositories to demonstrate coding structure and modular architectures to recruiting teams.
          </p>
        </div>
        
        <Button 
          onClick={triggerSync} 
          disabled={syncing}
          className="text-xs font-semibold gap-1.5 shadow-sm"
        >
          <FiRefreshCw className={`w-3.5 h-3.5 ${syncing ? 'animate-spin' : ''}`} /> 
          {syncing ? 'Analyzing Repositories...' : 'Re-sync GitHub'}
        </Button>
      </div>

      <AnimatePresence mode="wait">
        {syncing ? (
          <motion.div 
            key="syncing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-20 bg-white border border-gray-200 rounded-2xl shadow-sm space-y-4"
          >
            <FiCpu className="text-blue-600 w-12 h-12 animate-pulse" />
            <h4 className="font-extrabold text-sm text-gray-950">AI Code Auditor in Progress</h4>
            <p className="text-xs text-gray-500">Crawling public projects, evaluating test suites, and analyzing imports...</p>
          </motion.div>
        ) : (
          <motion.div 
            key="details"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Left Col: Sync Status & Aggregate Score */}
            <div className="space-y-6">
              
              {/* Profile Card */}
              <Card className="p-6 bg-white border border-gray-200 shadow-sm space-y-4 text-center">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto border border-gray-200 text-gray-800">
                  <FiGithub className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-gray-950">@{githubData.username}</h3>
                  <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider flex items-center justify-center gap-1 mt-1">
                    <FiCheckCircle className="w-3.5 h-3.5" /> Synchronized & Audited
                  </p>
                </div>
                
                <div className="border-t border-gray-150 my-2" />
                
                <div className="grid grid-cols-2 gap-2 text-left text-xs">
                  <div>
                    <span className="text-[9px] text-gray-400 font-bold uppercase block">Repositories</span>
                    <span className="font-extrabold text-gray-800">{githubData.totalRepos} Public</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-gray-400 font-bold uppercase block">Contributions</span>
                    <span className="font-extrabold text-gray-800">{githubData.contributions} (1yr)</span>
                  </div>
                </div>
              </Card>

              {/* Code Quality Rating */}
              <Card className="p-6 bg-gray-900 text-white border-gray-800 shadow-md text-center space-y-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                  <FiGitCommit className="w-24 h-24" />
                </div>
                <div className="relative z-10 space-y-3">
                  <h4 className="font-extrabold text-xs text-gray-400 uppercase tracking-widest">Technical Code Rating</h4>
                  <div className="flex items-baseline justify-center gap-0.5">
                    <span className="text-5xl font-extrabold tracking-tight">{techScore}</span>
                    <span className="text-lg text-gray-500 font-bold">/100</span>
                  </div>
                  <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-blue-400">
                    <FiAward className="w-4 h-4 shrink-0" /> Top 5% of React Developers
                  </div>
                  <p className="text-[10px] text-gray-450 leading-relaxed font-semibold">
                    Calculated by inspecting code reuse, component modularity, hydration efficiencies, and layout styling patterns.
                  </p>
                </div>
              </Card>

            </div>

            {/* Right Col: Languages & Repos List */}
            <div className="md:col-span-2 space-y-6">
              
              {/* Language Breakdown */}
              <Card className="p-6 bg-white border border-gray-200 shadow-sm space-y-4">
                <h3 className="font-extrabold text-sm text-gray-900 tracking-wide">Language Sourcing Split</h3>
                
                {/* Visual Stacked bar */}
                <div className="h-5 bg-gray-100 rounded-lg overflow-hidden flex w-full">
                  {githubData.languages.map((lang, idx) => (
                    <div 
                      key={idx} 
                      className={`${lang.color} h-full`} 
                      style={{ width: `${lang.percentage}%` }}
                      title={`${lang.name}: ${lang.percentage}%`}
                    />
                  ))}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                  {githubData.languages.map((lang, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs">
                      <span className={`w-3 h-3 rounded ${lang.color}`} />
                      <span className="font-bold text-gray-700">{lang.name}</span>
                      <span className="text-gray-400 font-medium">({lang.percentage}%)</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Highlighted Repositories */}
              <Card className="p-6 bg-white border border-gray-200 shadow-sm space-y-4">
                <h3 className="font-extrabold text-sm text-gray-900 tracking-wide">Highlighted Repositories</h3>
                
                <div className="space-y-4">
                  {githubData.projects.map((proj, idx) => (
                    <div key={idx} className="p-4 border border-gray-150 rounded-xl space-y-2 hover:border-blue-400 transition-colors">
                      <div className="flex justify-between items-center">
                        <h4 className="font-extrabold text-sm text-gray-950 flex items-center gap-1.5">
                          <FiGithub className="w-4 h-4" /> {proj.name}
                        </h4>
                        <span className="text-xs font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-lg flex items-center gap-1">
                          <FiStar className="w-3.5 h-3.5 fill-amber-500" /> {idx === 0 ? starsCount - 78 : 78}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed font-semibold">{proj.description}</p>
                      <Badge variant="primary" className="text-[10px] uppercase font-bold tracking-wider">{proj.language}</Badge>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Code Quality Audit */}
              <Card className="p-6 bg-white border border-gray-200 shadow-sm">
                <h3 className="font-extrabold text-sm text-gray-900 mb-2 tracking-wide">AI Code Quality Audit</h3>
                <p className="text-xs text-gray-700 leading-relaxed font-medium">
                  {githubData.qualityAudit}
                </p>
              </Card>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
