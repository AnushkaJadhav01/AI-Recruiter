import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiUploadCloud, FiCheck, FiCpu, FiAward } from 'react-icons/fi'
import { Card } from '../../components/common/Card'
import { Button } from '../../components/common/Button'
import { Badge } from '../../components/common/Badge'
import { Timeline } from '../../components/common/Timeline'

export const UploadResumePage = () => {
  const [file, setFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [parsingStep, setParsingStep] = useState<string>('')
  const [status, setStatus] = useState<'idle' | 'uploading' | 'parsing' | 'done'>('idle')
  const [activeTab, setActiveTab] = useState<'overview' | 'experience' | 'skills' | 'projects'>('overview')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)
      startUploadFlow()
    }
  }

  const startUploadFlow = () => {
    setStatus('uploading')
    setUploadProgress(0)

    // Simulate upload progress
    const uploadInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(uploadInterval)
          startParsingFlow()
          return 100
        }
        return prev + 25
      })
    }, 300)
  }

  const startParsingFlow = () => {
    setStatus('parsing')
    const steps = [
      'Extracting plain-text nodes...',
      'Mapping semantic work history...',
      'Aggregating tech skills list...',
      'Validating certifications...',
      'Calculating match index...'
    ]

    let stepIndex = 0
    setParsingStep(steps[stepIndex])

    const parsingInterval = setInterval(() => {
      stepIndex++
      if (stepIndex >= steps.length) {
        clearInterval(parsingInterval)
        setStatus('done')
      } else {
        setParsingStep(steps[stepIndex])
      }
    }, 800)
  }

  const handleReset = () => {
    setFile(null)
    setUploadProgress(0)
    setParsingStep('')
    setStatus('idle')
  }

  const mockCandidate = {
    name: 'Sarah Jenkins',
    email: 'sarah.j@company.com',
    phone: '+1 (555) 432-8765',
    headline: 'Senior React Developer | Front-End Architect',
    matchScore: 94,
    skills: {
      frontend: ['React', 'TypeScript', 'Tailwind CSS', 'Redux Toolkit', 'Next.js', 'Framer Motion'],
      backend: ['Node.js', 'Express', 'GraphQL', 'PostgreSQL'],
      tools: ['Git', 'Docker', 'Jest', 'Webpack', 'Vite']
    },
    experience: [
      { date: '2023 - Present', title: 'Senior Front-End Architect', subtitle: 'Stripe Inc.', description: 'Architected and built the main dashboards for Stripe Billing. Migrated legacy JS pages to React & TypeScript, boosting page speeds by 42%. Managed a core UI engineering squad of 4 developers.' },
      { date: '2020 - 2023', title: 'Senior Software Engineer', subtitle: 'Vercel', description: 'Contributed directly to Next.js routing and CSS loading performance. Worked closely with product design to construct the premium Vercel design system components.' }
    ],
    projects: [
      { name: 'SaaS Glass UI Toolkit', desc: 'Open-source React library for glassmorphic elements. 1.2k Stars on GitHub.', link: 'https://github.com' },
      { name: 'Semantic Resume Reader', desc: 'Microservice parsing resume PDF nodes and converting to JSON schemas using Python NLP.', link: 'https://github.com' }
    ],
    education: 'B.S. in Computer Science — Stanford University (2016-2020)',
    certifications: ['AWS Certified Solutions Architect', 'React Advanced Professional']
  }

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Upload Candidates</h2>
        <p className="text-xs text-gray-500">Add applicant resumes to extract metadata and rank matching skills in real-time.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Drag/Drop Area */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="p-6">
            <h4 className="font-bold text-sm text-gray-950 mb-4">1. Select Candidate Resume</h4>
            
            {status === 'idle' && (
              <div className="border-2 border-dashed border-gray-200 hover:border-blue-500 rounded-xl p-10 text-center bg-[#FAFBFC] transition-colors relative cursor-pointer group">
                <input 
                  type="file" 
                  accept=".pdf,.docx,.txt"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-full bg-blue-50 text-[#2563EB] flex items-center justify-center mx-auto border border-blue-100 group-hover:scale-105 transition-transform">
                    <FiUploadCloud size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-950">Drag & drop candidate CV file</p>
                    <p className="text-[10px] text-gray-500 mt-1">Supports PDF, DOCX, TXT (Max 10MB)</p>
                  </div>
                </div>
              </div>
            )}

            {/* Uploading progress indicator */}
            {status === 'uploading' && (
              <div className="py-8 space-y-4 text-center">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-[#2563EB] flex items-center justify-center mx-auto border border-blue-100 animate-pulse">
                  <FiUploadCloud size={20} />
                </div>
                <div className="space-y-2 max-w-xs mx-auto">
                  <div className="flex justify-between text-xs font-semibold text-gray-700">
                    <span>Uploading file...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="overflow-hidden h-1.5 rounded bg-gray-100">
                    <motion.div 
                      animate={{ width: `${uploadProgress}%` }}
                      className="h-full bg-blue-600 rounded"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* AI Parsing status log */}
            {status === 'parsing' && (
              <div className="py-8 space-y-4 text-center">
                <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-[#2563EB] uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                    AI Sieve Engine Active
                  </span>
                  <p className="text-xs font-semibold text-gray-950 mt-3">{parsingStep}</p>
                  <p className="text-[10px] text-gray-400">Extracting fields and matching tags...</p>
                </div>
              </div>
            )}

            {/* Parsing Complete */}
            {status === 'done' && (
              <div className="py-6 space-y-4 text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-100">
                  <FiCheck size={24} />
                </div>
                <div>
                  <h5 className="font-bold text-xs text-gray-950">{file?.name}</h5>
                  <p className="text-[10px] text-emerald-600 font-bold mt-1">Fully Parsed & Ranked Successfully</p>
                </div>
                <div className="pt-2">
                  <Button variant="outline" size="sm" onClick={handleReset}>
                    Upload Another Resume
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Right Column: Parsed Dossier Preview */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {status === 'idle' && (
              <motion.div
                key="idle-preview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                <Card className="p-8 text-center text-gray-500 min-h-[400px] flex flex-col justify-center items-center space-y-3">
                  <span className="text-gray-350"><FiCpu size={40} /></span>
                  <div>
                    <h5 className="font-bold text-xs text-gray-800">Dossier Parsing Panel</h5>
                    <p className="text-[10px] text-gray-400 mt-1 leading-relaxed max-w-xs mx-auto">
                      Select a resume on the left to begin extraction. The parsed summary, work history, skills matrix, and certifications will display here.
                    </p>
                  </div>
                </Card>
              </motion.div>
            )}

            {(status === 'uploading' || status === 'parsing') && (
              <motion.div
                key="loading-preview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                <Card className="p-8 text-center min-h-[400px] flex flex-col justify-center items-center space-y-4">
                  <div className="w-8 h-8 rounded-full border-2 border-gray-200 border-t-[#2563EB] animate-spin" />
                  <p className="text-xs text-gray-500">Assembling structured candidate data models...</p>
                </Card>
              </motion.div>
            )}

            {status === 'done' && (
              <motion.div
                key="done-preview"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <Card className="p-0 overflow-hidden border-gray-200/80 bg-white">
                  {/* Top Candidate Brief */}
                  <div className="p-6 bg-gradient-to-b from-blue-50/20 to-white border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-extrabold text-sm shrink-0">
                        SJ
                      </div>
                      <div>
                        <h4 className="font-bold text-base text-gray-900">{mockCandidate.name}</h4>
                        <p className="text-xs text-gray-500 mt-0.5">{mockCandidate.headline}</p>
                        <p className="text-[10px] text-gray-400 mt-1">{mockCandidate.email} • {mockCandidate.phone}</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-2xl font-extrabold text-[#2563EB]">{mockCandidate.matchScore}%</div>
                      <p className="text-[9px] text-[#2563EB] font-bold uppercase tracking-wider">AI MATCH SCORE</p>
                    </div>
                  </div>

                  {/* Tabs Selector */}
                  <div className="flex border-b border-gray-100 px-6 bg-gray-50/50">
                    {['overview', 'experience', 'skills', 'projects'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`py-3 px-4 border-b-2 font-bold text-xs capitalize transition-all ${
                          activeTab === tab 
                            ? 'border-[#2563EB] text-[#2563EB]' 
                            : 'border-transparent text-gray-500 hover:text-gray-900'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  {/* Tab Contents */}
                  <div className="p-6">
                    {activeTab === 'overview' && (
                      <div className="space-y-5 text-xs text-gray-600">
                        <div className="space-y-1.5">
                          <p className="font-bold text-gray-900 uppercase text-[9px] tracking-wider text-gray-400">Extracted Education</p>
                          <p className="font-semibold text-gray-800">{mockCandidate.education}</p>
                        </div>
                        
                        <div className="space-y-1.5 pt-4 border-t border-gray-100">
                          <p className="font-bold text-gray-900 uppercase text-[9px] tracking-wider text-gray-400 font-sans">Certifications Identified</p>
                          <div className="flex flex-wrap gap-2">
                            {mockCandidate.certifications.map((c, i) => (
                              <span key={i} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-gray-50 text-gray-700 border border-gray-150 font-semibold">
                                <span className="text-amber-500"><FiAward size={14} /></span> {c}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="pt-4 border-t border-gray-100 flex justify-end">
                          <Link to="/candidate/sarah-jenkins">
                            <Button className="text-xs">Go to Candidate Dossier Profile</Button>
                          </Link>
                        </div>
                      </div>
                    )}

                    {activeTab === 'experience' && (
                      <Timeline items={mockCandidate.experience} />
                    )}

                    {activeTab === 'skills' && (
                      <div className="space-y-5">
                        <div className="space-y-1.5">
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Front-End Stack</p>
                          <div className="flex flex-wrap gap-1.5">
                            {mockCandidate.skills.frontend.map(s => (
                              <Badge key={s} variant="primary">{s}</Badge>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-1.5 pt-4 border-t border-gray-100">
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Back-End / Databases</p>
                          <div className="flex flex-wrap gap-1.5">
                            {mockCandidate.skills.backend.map(s => (
                              <Badge key={s} variant="success">{s}</Badge>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-1.5 pt-4 border-t border-gray-100">
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">DevOps & Tools</p>
                          <div className="flex flex-wrap gap-1.5">
                            {mockCandidate.skills.tools.map(s => (
                              <Badge key={s} variant="neutral">{s}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'projects' && (
                      <div className="space-y-4">
                        {mockCandidate.projects.map((proj, idx) => (
                          <div key={idx} className="p-4 rounded-xl border border-gray-150 bg-[#FAFBFC] space-y-2 text-xs">
                            <div className="flex justify-between items-start">
                              <h5 className="font-bold text-gray-950">{proj.name}</h5>
                              <a href={proj.link} className="text-blue-600 hover:underline font-semibold text-[10px]">GitHub Repository</a>
                            </div>
                            <p className="text-gray-500 leading-relaxed">{proj.desc}</p>
                          </div>
                        ))}
                      </div>
                    )}
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
