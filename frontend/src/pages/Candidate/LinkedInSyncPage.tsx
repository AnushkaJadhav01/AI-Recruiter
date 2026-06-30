import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  FiLinkedin, 
  FiClock, 
  FiCheckCircle, 
  FiBriefcase, 
  FiAward, 
  FiUser,
  FiUpload
} from 'react-icons/fi'
import { Card } from '../../components/common/Card'
import { Button } from '../../components/common/Button'
import { Badge } from '../../components/common/Badge'

export const LinkedInSyncPage = () => {
  const [profileUrl, setProfileUrl] = useState("linkedin.com/in/sarah-jenkins-dev")
  const [editing, setEditing] = useState(false)

  const careerHistory = [
    { role: "Senior Frontend Engineer", company: "Vercel Partner Agency", duration: "2023 - Present", description: "Lead frontend developer designing and scaling React component structures. Established architectural designs for 10+ client SaaS platforms, improving hydration bottlenecks and Core Web Vitals." },
    { role: "Full Stack Developer", company: "HiringLoop Inc.", duration: "2021 - 2023", description: "Developed database endpoints using Node.js and Express. Maintained relational tables in PostgreSQL, optimizing speed query indexing and caching layers." },
    { role: "Junior Web Developer", company: "WebPixel Studio", duration: "2019 - 2021", description: "Implemented HTML structure and styling designs for startup customer brands. Managed Git repositories and deployment cycles." }
  ]

  const endorsements = [
    { skill: "React.js", count: 42, verified: true },
    { skill: "Node.js", count: 35, verified: true },
    { skill: "AWS Infrastructure", count: 18, verified: false },
    { skill: "Tailwind CSS", count: 28, verified: true }
  ]

  return (
    <div className="space-y-6 text-left max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
          <FiLinkedin className="text-blue-600" />
          LinkedIn Career Verification
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          Import and verify your employment history, position tenures, and peer endorsements to skip initial manual triage checks.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column: Sync Controls & Summary */}
        <div className="space-y-6">
          {/* Connection Profile Status */}
          <Card className="p-6 bg-white border border-gray-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
              <FiLinkedin className="w-6 h-6" />
            </div>
            
            <div className="space-y-1">
              <h3 className="font-extrabold text-sm text-gray-950">LinkedIn Sync Connection</h3>
              <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider flex items-center gap-1">
                <FiCheckCircle className="w-3.5 h-3.5" /> Fully Synchronized
              </p>
            </div>

            <div className="border-t border-gray-150 my-2" />

            <div className="space-y-3">
              <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-wider">Profile Link / PDF Upload</label>
              {editing ? (
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={profileUrl}
                    onChange={(e) => setProfileUrl(e.target.value)}
                    className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                  />
                  <Button size="sm" onClick={() => setEditing(false)} className="text-xs font-semibold">Save</Button>
                </div>
              ) : (
                <div className="flex justify-between items-center text-xs font-bold text-gray-700 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                  <span className="truncate mr-2">{profileUrl}</span>
                  <button onClick={() => setEditing(true)} className="text-blue-600 hover:underline">Edit</button>
                </div>
              )}
            </div>

            <div className="border-t border-gray-150 my-2" />

            <button className="w-full flex items-center justify-center gap-2 py-2 border border-dashed border-gray-200 hover:border-blue-400 transition-colors text-xs font-semibold text-gray-600 rounded-xl bg-slate-50/50">
              <FiUpload className="w-4 h-4" /> Upload LinkedIn PDF Profile
            </button>
          </Card>

          {/* AI Verified Skills */}
          <Card className="p-6 bg-white border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-extrabold text-sm text-gray-900 tracking-wide">AI Verified Skills</h3>
            <p className="text-[10px] text-gray-500 leading-relaxed font-semibold">
              Skills flagged as "Verified" have matching code evidence found in your synchronized GitHub repositories.
            </p>

            <div className="space-y-3">
              {endorsements.map((end, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 border border-gray-100 rounded-xl bg-gray-50/50 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-800">{end.skill}</span>
                    {end.verified && (
                      <span className="text-[9px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider flex items-center gap-0.5">
                        <FiCheckCircle className="w-2.5 h-2.5" /> Verified
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-bold text-gray-400">{end.count} Endorsements</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column: Work Experience Timeline */}
        <div className="md:col-span-2 space-y-6">
          <Card className="p-6 bg-white border border-gray-200 shadow-sm">
            <h3 className="font-extrabold text-sm text-gray-900 mb-6 tracking-wide flex items-center gap-2">
              <FiBriefcase className="text-gray-400" /> Parsed Professional History
            </h3>

            <div className="relative border-l border-gray-200 pl-6 ml-3 space-y-8">
              {careerHistory.map((item, idx) => (
                <div key={idx} className="relative text-xs">
                  {/* Timeline dot */}
                  <span className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-blue-600 border-4 border-white shadow-sm flex items-center justify-center" />
                  
                  <div className="space-y-1.5 text-left">
                    <div className="flex justify-between items-start flex-wrap gap-1">
                      <h4 className="font-extrabold text-sm text-gray-950">{item.role}</h4>
                      <span className="text-[10px] text-gray-400 font-bold uppercase flex items-center gap-1">
                        <FiClock className="w-3.5 h-3.5" /> {item.duration}
                      </span>
                    </div>
                    
                    <p className="text-xs font-bold text-blue-600 uppercase tracking-wide">{item.company}</p>
                    <p className="text-gray-600 leading-relaxed font-semibold mt-2">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

      </div>
    </div>
  )
}
