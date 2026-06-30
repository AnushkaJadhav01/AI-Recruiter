import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiCpu, 
  FiCheckCircle, 
  FiBriefcase,
  FiZap,
  FiTarget,
  FiShield,
  FiUsers,
  FiMessageSquare,
  FiActivity
} from 'react-icons/fi'
import { Card } from '../../components/common/Card'
import { Button } from '../../components/common/Button'
import { useNavigate } from 'react-router-dom'

export const UploadJobPage = () => {
  const navigate = useNavigate()
  const [parsing, setParsing] = useState(false)
  const [parsed, setParsed] = useState(false)
  
  // Basic Form State
  const [formState, setFormState] = useState({
    title: '',
    department: '',
    experience: '5',
    location: '',
    type: 'Full-time',
    description: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  const handleGeneratePersona = () => {
    if (!formState.description) return
    setParsing(true)
    setTimeout(() => {
      setParsing(false)
      setParsed(true)
    }, 2500)
  }

  const handleSaveWorkspace = () => {
    alert('Hiring Workspace Created! You can now start routing candidates into this campaign.')
    navigate('/dashboard')
  }

  // AI Generated Persona Data (mocked based on prompt instructions)
  const personaData = {
    technicalRequired: ['React', 'TypeScript', 'Node.js', 'Next.js'],
    technicalPreferred: ['GraphQL', 'AWS', 'Docker'],
    softSkills: ['Cross-functional Collaboration', 'Autonomous Problem Solving', 'Adaptability'],
    leadership: ['Mentorship of Junior Devs', 'Technical Architecture Ownership'],
    communication: ['High clarity in async environments', 'Able to explain technical tradeoffs to product'],
    cultureFit: ['Fast-paced startup environment', 'Bias for action', 'Data-driven decision making'],
    careerStage: ['Senior (5-8 years)', 'Looking for architectural impact'],
    riskFactors: ['Flight risk if not given technical autonomy', 'Compensation expectations usually high'],
    hiringPriorities: ['1. Next.js SSR expertise', '2. Proven system design', '3. Speed of execution']
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Title */}
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">Create Hiring Workspace</h2>
        <p className="text-xs text-gray-500 mt-1 font-medium">Define your requirements to generate an AI Role Persona and initialize candidate screening.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Input Form */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="space-y-5">
            <h4 className="font-bold text-sm text-gray-950 flex items-center gap-2">
              <FiBriefcase className="text-gray-400" /> Basic Details
            </h4>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Job Title</label>
                <input 
                  type="text" 
                  name="title"
                  placeholder="e.g. Senior Frontend Engineer"
                  value={formState.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Department</label>
                  <input 
                    type="text" 
                    name="department"
                    placeholder="e.g. Engineering"
                    value={formState.department}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Experience (Years)</label>
                  <input 
                    type="number" 
                    name="experience"
                    placeholder="e.g. 5"
                    value={formState.experience}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Location</label>
                  <input 
                    type="text" 
                    name="location"
                    placeholder="e.g. Remote, US"
                    value={formState.location}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Employment Type</label>
                  <select
                    name="type"
                    value={formState.type}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all bg-white"
                  >
                    <option>Full-time</option>
                    <option>Contract</option>
                    <option>Internship</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Job Description</label>
                <textarea
                  name="description"
                  value={formState.description}
                  onChange={handleChange}
                  placeholder="Paste the full job description here..."
                  rows={10}
                  className="w-full p-3 border border-gray-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder-gray-400 font-mono resize-y"
                />
              </div>
            </div>

            <Button onClick={handleGeneratePersona} disabled={!formState.description || parsing} className="w-full gap-2 font-semibold">
              <FiCpu className="w-4 h-4" /> {parsing ? 'Analyzing Description...' : 'Generate AI Role Persona'}
            </Button>
          </Card>
        </div>

        {/* Right Column: AI Role Persona Generation */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {!parsed && !parsing && (
              <motion.div
                key="empty-state"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="h-full"
              >
                <Card className="p-10 text-center text-gray-500 h-full flex flex-col justify-center items-center space-y-4 border-dashed bg-[#FFF8F4]">
                  <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center border border-gray-200">
                    <FiCpu className="w-8 h-8 text-gray-400" />
                  </div>
                  <div>
                    <h5 className="font-extrabold text-sm text-gray-900">Awaiting Job Data</h5>
                    <p className="text-[11px] text-gray-500 mt-1.5 leading-relaxed max-w-sm font-medium">
                      Fill out the minimal job details and paste the description. Our AI will automatically synthesize a deep Role Persona to score candidates against.
                    </p>
                  </div>
                </Card>
              </motion.div>
            )}

            {parsing && (
              <motion.div
                key="loading-state"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="h-full"
              >
                <Card className="p-10 text-center h-full flex flex-col justify-center items-center space-y-6 bg-[#FFF8F4]">
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center border border-blue-100 shadow-inner relative">
                    <FiCpu className="w-8 h-8 text-blue-600 relative z-10" />
                    <motion.div 
                      animate={{ rotate: 360 }} 
                      transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                      className="absolute inset-0 border-2 border-blue-400 border-t-transparent rounded-2xl opacity-50"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <h5 className="font-extrabold text-sm text-gray-900 tracking-tight">Generating AI Role Persona</h5>
                    <p className="text-[11px] text-gray-500 font-medium">Extracting technical requirements, cultural indicators, and leadership expectations...</p>
                  </div>
                </Card>
              </motion.div>
            )}

            {parsed && !parsing && (
              <motion.div
                key="parsed-state"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="text-xl font-extrabold tracking-tight text-gray-900">AI Role Persona</h3>
                    <p className="text-[11px] text-gray-500 mt-1 font-medium">Synthesized requirements to drive the multi-agent screening pipeline.</p>
                  </div>
                  <Button onClick={handleSaveWorkspace} className="gap-2 shadow-sm">
                    <FiCheckCircle className="w-4 h-4" /> Finalize Workspace
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Technical Required */}
                  <Card className="p-5 border-blue-100 bg-blue-50/20 shadow-sm">
                    <h5 className="font-bold text-xs text-blue-900 mb-3 flex items-center gap-2">
                      <FiZap className="w-4 h-4 text-blue-600" /> Required Technical Skills
                    </h5>
                    <div className="flex flex-wrap gap-1.5">
                      {personaData.technicalRequired.map(s => (
                        <span key={s} className="px-2.5 py-1 bg-white text-blue-700 text-[10px] font-bold rounded shadow-sm border border-blue-100">{s}</span>
                      ))}
                    </div>
                  </Card>

                  {/* Technical Preferred */}
                  <Card className="p-5 shadow-sm border-gray-200">
                    <h5 className="font-bold text-xs text-gray-900 mb-3 flex items-center gap-2">
                      <FiActivity className="w-4 h-4 text-gray-500" /> Preferred Skills
                    </h5>
                    <div className="flex flex-wrap gap-1.5">
                      {personaData.technicalPreferred.map(s => (
                        <span key={s} className="px-2.5 py-1 bg-gray-50 text-gray-700 text-[10px] font-bold rounded border border-gray-200">{s}</span>
                      ))}
                    </div>
                  </Card>

                  {/* Soft Skills */}
                  <Card className="p-5 shadow-sm border-gray-200">
                    <h5 className="font-bold text-xs text-gray-900 mb-3 flex items-center gap-2">
                      <FiUsers className="w-4 h-4 text-emerald-500" /> Soft Skills
                    </h5>
                    <ul className="space-y-1.5">
                      {personaData.softSkills.map(s => (
                        <li key={s} className="text-[11px] text-gray-600 font-medium flex items-start gap-1.5">
                          <span className="text-emerald-500 font-bold mt-0.5">•</span> {s}
                        </li>
                      ))}
                    </ul>
                  </Card>

                  {/* Communication Expectations */}
                  <Card className="p-5 shadow-sm border-gray-200">
                    <h5 className="font-bold text-xs text-gray-900 mb-3 flex items-center gap-2">
                      <FiMessageSquare className="w-4 h-4 text-indigo-500" /> Communication
                    </h5>
                    <ul className="space-y-1.5">
                      {personaData.communication.map(s => (
                        <li key={s} className="text-[11px] text-gray-600 font-medium flex items-start gap-1.5">
                          <span className="text-indigo-500 font-bold mt-0.5">•</span> {s}
                        </li>
                      ))}
                    </ul>
                  </Card>

                  {/* Leadership Indicators */}
                  <Card className="p-5 shadow-sm border-gray-200">
                    <h5 className="font-bold text-xs text-gray-900 mb-3 flex items-center gap-2">
                      <FiTarget className="w-4 h-4 text-purple-500" /> Leadership Indicators
                    </h5>
                    <ul className="space-y-1.5">
                      {personaData.leadership.map(s => (
                        <li key={s} className="text-[11px] text-gray-600 font-medium flex items-start gap-1.5">
                          <span className="text-purple-500 font-bold mt-0.5">•</span> {s}
                        </li>
                      ))}
                    </ul>
                  </Card>

                  {/* Risk Factors */}
                  <Card className="p-5 shadow-sm border-amber-100 bg-amber-50/20">
                    <h5 className="font-bold text-xs text-amber-900 mb-3 flex items-center gap-2">
                      <FiShield className="w-4 h-4 text-amber-500" /> Risk Factors
                    </h5>
                    <ul className="space-y-1.5">
                      {personaData.riskFactors.map(s => (
                        <li key={s} className="text-[11px] text-amber-900 font-medium flex items-start gap-1.5">
                          <span className="text-amber-500 font-bold mt-0.5">•</span> {s}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </div>

                <Card className="p-5 shadow-sm border-gray-200 bg-gray-900 text-white">
                  <h5 className="font-bold text-xs text-gray-50 mb-3 flex items-center gap-2 uppercase tracking-wider">
                    <FiCheckCircle className="w-4 h-4 text-emerald-400" /> AI Hiring Priorities
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {personaData.hiringPriorities.map(s => (
                      <span key={s} className="px-3 py-1.5 bg-gray-800 text-white text-[11px] font-bold rounded-lg border border-gray-700">{s}</span>
                    ))}
                  </div>
                </Card>

              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

    </div>
  )
}
