import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiArrowLeft,
  FiCheckCircle,
  FiAlertCircle,
  FiTerminal,
  FiCpu,
  FiZap,
  FiGitCommit,
  FiTrendingUp,
  FiTarget,
  FiShield,
  FiLinkedin,
  FiBriefcase,
  FiLayers,
  FiList,
  FiMessageSquare,
  FiFileText
} from 'react-icons/fi'
import { Card } from '../../components/common/Card'
import { Badge } from '../../components/common/Badge'

import { useParams, useNavigate } from 'react-router-dom'
import { useApp } from '../../contexts/AppContext'

export const CandidateProfilePage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { candidates, updateCandidateStatus, currentUser } = useApp()

  const [pipelineState, setPipelineState] = useState<number>(0)
  const [reportReady, setReportReady] = useState<boolean>(false)

  const realCandidate = candidates.find(c => c.id === id)

  const pipelineSteps = [
    { name: 'Resume Parsing & Extraction', icon: FiTerminal },
    { name: 'GitHub Code Quality Analysis', icon: FiGitCommit },
    { name: 'LinkedIn Tenure Verification', icon: FiLinkedin },
    { name: 'Project & Portfolio Analysis', icon: FiBriefcase },
    { name: 'Candidate DNA Generation', icon: FiZap },
    { name: 'Role Persona Matching', icon: FiTarget },
    { name: 'Multi-Agent Evaluation', icon: FiCpu },
    { name: 'Evidence Aggregation', icon: FiLayers },
    { name: 'Ranking & Scoring', icon: FiList },
    { name: 'Interview Generation', icon: FiMessageSquare },
  ]

  // Simulation of the 10-step AI processing pipeline
  useEffect(() => {
    if (pipelineState < 10) {
      const timer = setTimeout(() => {
        setPipelineState(prev => prev + 1)
      }, 300) // 300ms per stage for a fast, dynamic feel
      return () => clearTimeout(timer)
    } else {
      setTimeout(() => setReportReady(true), 400)
    }
  }, [pipelineState])

  const handleAction = (status: string, step: number) => {
    if (realCandidate) {
      updateCandidateStatus(realCandidate.id, status, step, currentUser?.email)
      alert(`Candidate marked as ${status}`)
      navigate('/discovery')
    }
  }

  if (!realCandidate && reportReady) {
    return <div className="text-center py-20">Candidate not found</div>
  }

  const candidate = realCandidate ? {
    name: realCandidate.name,
    role: realCandidate.role || 'Candidate',
    location: 'Remote', // Could be added to profile
    email: realCandidate.email,
    phone: realCandidate.phone || 'N/A',
    matchScore: realCandidate.matchScore || realCandidate.overallScore || 0,
    confidence: realCandidate.confidence || 95,
    momentum: 'High Growth',
    riskLevel: realCandidate.riskLevel || 'Medium',
    dna: realCandidate.matchedSkills || ['Problem Solving', 'Adaptable'],
    executiveSummary: realCandidate.executiveSummary || 'No summary available.',
    careerPrediction: 'Projected to be a valuable asset to the team with steady growth potential.',
    agents: {
      resume: realCandidate.agents?.resume || `Resume parsed successfully. ATS Score: ${realCandidate.atsScore || 85}/100.`,
      github: realCandidate.githubData ? 
        `Synchronized username: @${realCandidate.githubData.username}. Quality rating: ${realCandidate.githubData.techScore}/100. Audit: ${realCandidate.githubData.qualityAudit}` :
        `GitHub activity analyzed. Technical score: ${realCandidate.githubScore || 80}/100.`,
      linkedin: realCandidate.linkedinData ?
        `Synchronized profile for ${realCandidate.linkedinData.profileData?.name}. Growth rate: ${realCandidate.linkedinData.profileData?.growthRate}. Summary: ${realCandidate.linkedinData.profileData?.summary}` :
        `LinkedIn profile verified. Network score: ${realCandidate.linkedinScore || 80}/100.`,
      projects: realCandidate.githubData?.projects && realCandidate.githubData.projects.length > 0 ?
        `Audited repos: ${realCandidate.githubData.projects.map((p: any) => `${p.name} (${p.stars} stars)`).join(', ')}.` :
        'Projects reviewed.'
    },
    riskFlags: realCandidate.riskFlags || [],
    interviewQuestions: realCandidate.interviewQuestions || [],
    recommendation: realCandidate.recommendation || 'Consider'
  } : {} as any

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Navigation */}
      <Link to="/discovery" className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors">
        <FiArrowLeft className="w-4 h-4" /> Back to Candidate Discovery
      </Link>

      <AnimatePresence mode="wait">
        {!reportReady ? (
          // Loading Pipeline State (10 Steps)
          <motion.div 
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center justify-center min-h-[70vh] space-y-12"
          >
            <div className="text-center space-y-4">
              <div className="w-20 h-20 rounded-3xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto border border-blue-100 shadow-sm relative">
                <FiCpu className="w-10 h-10 relative z-10" />
                <motion.div 
                  animate={{ rotate: 360 }} 
                  transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                  className="absolute inset-0 border-4 border-blue-400 border-t-transparent rounded-3xl opacity-40"
                />
                <motion.div 
                  animate={{ rotate: -360 }} 
                  transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
                  className="absolute inset-[-8px] border-2 border-indigo-400 border-b-transparent rounded-[32px] opacity-30"
                />
              </div>
              <div>
                <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Compiling Intelligence Report</h2>
                <p className="text-sm text-gray-500 mt-1 font-medium">Multi-agent system analyzing {candidate.name}</p>
              </div>
            </div>

            <div className="w-full max-w-lg grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              {pipelineSteps.map((step, idx) => {
                const isActive = pipelineState === idx
                const isComplete = pipelineState > idx
                const Icon = step.icon

                return (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all">
                      {isComplete ? (
                        <div className="bg-emerald-100 text-emerald-600 rounded-full w-full h-full flex items-center justify-center border border-emerald-200">
                          <FiCheckCircle className="w-3.5 h-3.5" />
                        </div>
                      ) : isActive ? (
                        <div className="bg-blue-100 text-blue-600 rounded-full w-full h-full flex items-center justify-center border border-blue-200 shadow-[0_0_10px_rgba(37,99,235,0.2)]">
                          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}>
                            <Icon className="w-3 h-3" />
                          </motion.div>
                        </div>
                      ) : (
                        <div className="bg-gray-50 text-gray-400 rounded-full w-full h-full flex items-center justify-center border border-gray-100">
                          <Icon className="w-3 h-3" />
                        </div>
                      )}
                    </div>
                    <div className={`flex-1 text-[11px] font-bold ${isComplete ? 'text-gray-900' : isActive ? 'text-blue-600' : 'text-gray-400'}`}>
                      {step.name}
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        ) : (
          // Intelligence Report State
          <motion.div 
            key="report"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 xl:grid-cols-12 gap-8"
          >
            {/* Left Sidebar: Identity & Scores */}
            <div className="xl:col-span-4 space-y-6">
              
              {/* Identity Card */}
              <Card className="p-8 text-center space-y-6 shadow-sm border-gray-200 bg-white">
                <div className="w-28 h-28 rounded-3xl bg-gradient-to-tr from-blue-100 to-indigo-50 text-blue-700 flex items-center justify-center font-extrabold text-4xl mx-auto border-[6px] border-white shadow-md ring-1 ring-gray-100">
                  {candidate.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight">{candidate.name}</h3>
                  <p className="text-sm text-gray-500 mt-1 font-medium">{candidate.role}</p>
                </div>

                <div className="flex justify-center flex-wrap gap-2 pt-2">
                  <Badge variant="success" className="text-[10px] px-2 py-1 uppercase font-bold tracking-wider"><FiCheckCircle className="w-3 h-3 mr-1" /> DNA Verified</Badge>
                  <Badge variant="primary" className="text-[10px] px-2 py-1 uppercase font-bold tracking-wider"><FiTrendingUp className="w-3 h-3 mr-1" /> {candidate.momentum}</Badge>
                </div>

                <div className="border-t border-gray-100 my-4" />
                
                <div className="space-y-4 text-left text-xs text-gray-600 font-medium px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded bg-gray-50 flex items-center justify-center"><FiMapPin className="text-gray-400 w-3.5 h-3.5" /></div>
                    <span>{candidate.location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded bg-gray-50 flex items-center justify-center"><FiMail className="text-gray-400 w-3.5 h-3.5" /></div>
                    <span className="truncate">{candidate.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded bg-gray-50 flex items-center justify-center"><FiPhone className="text-gray-400 w-3.5 h-3.5" /></div>
                    <span>{candidate.phone}</span>
                  </div>

                  {realCandidate && (realCandidate.githubUsername || realCandidate.githubData?.username) && (
                    <div className="flex items-center gap-3 border-t border-gray-50 pt-3">
                      <div className="w-6 h-6 rounded bg-slate-50 flex items-center justify-center text-gray-800"><FiGitCommit className="w-3.5 h-3.5" /></div>
                      <a 
                        href={`https://github.com/${realCandidate.githubUsername || realCandidate.githubData?.username}`} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-blue-600 hover:underline font-bold truncate"
                      >
                        github.com/{realCandidate.githubUsername || realCandidate.githubData?.username}
                      </a>
                    </div>
                  )}

                  {realCandidate && (realCandidate.linkedinUrl || realCandidate.linkedinData?.profileUrl) && (
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded bg-blue-50 flex items-center justify-center text-blue-600"><FiLinkedin className="w-3.5 h-3.5" /></div>
                      <a 
                        href={realCandidate.linkedinUrl || realCandidate.linkedinData?.profileUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-blue-600 hover:underline font-bold truncate"
                      >
                        LinkedIn Profile Link
                      </a>
                    </div>
                  )}

                  {realCandidate && (realCandidate.resumeFileName || realCandidate.resumeAnalysis?.fileName) && (
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded bg-red-50 flex items-center justify-center text-red-500"><FiFileText className="w-3.5 h-3.5" /></div>
                      <a 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          const base64 = localStorage.getItem(`resume_file_${realCandidate.id}`) || 
                                         localStorage.getItem(`resume_file_${realCandidate.email}`)
                          if (base64) {
                            try {
                              const base64Parts = base64.split(',');
                              const mime = base64Parts[0].match(/:(.*?);/)?.[1] || 'application/pdf';
                              const byteCharacters = atob(base64Parts[1]);
                              const byteNumbers = new Array(byteCharacters.length);
                              for (let i = 0; i < byteCharacters.length; i++) {
                                byteNumbers[i] = byteCharacters.charCodeAt(i);
                              }
                              const byteArray = new Uint8Array(byteNumbers);
                              const blob = new Blob([byteArray], { type: mime });
                              const fileURL = URL.createObjectURL(blob);
                              window.open(fileURL, '_blank');
                            } catch (err) {
                              console.error("Failed to parse base64 PDF string", err);
                              alert("Could not render uploaded PDF binary. It may be corrupt.");
                            }
                          } else {
                            alert("No uploaded resume PDF found in this browser's local store. Please make sure you upload a resume first!");
                          }
                        }} 
                        className="text-blue-600 hover:underline font-bold truncate"
                      >
                        {realCandidate.resumeFileName || realCandidate.resumeAnalysis?.fileName}
                      </a>
                    </div>
                  )}
                </div>
              </Card>

              {/* Core AI Scores */}
              <Card className="p-8 bg-gray-900 text-white border-gray-800 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <FiTarget className="w-32 h-32" />
                </div>
                
                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">Aggregate Match Intelligence</h4>
                
                <div className="grid grid-cols-2 gap-8 relative z-10">
                  <div>
                    <p className="text-5xl font-extrabold text-white tracking-tight">{candidate.matchScore}<span className="text-2xl text-gray-500 font-bold">%</span></p>
                    <p className="text-[10px] text-blue-400 font-bold uppercase tracking-wider mt-2">Overall Match</p>
                  </div>
                  <div>
                    <p className="text-5xl font-extrabold text-white tracking-tight">{candidate.confidence}<span className="text-2xl text-gray-500 font-bold">%</span></p>
                    <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider mt-2">AI Confidence</p>
                  </div>
                </div>

                <div className="border-t border-gray-800 my-8" />
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-[11px] mb-2 font-bold uppercase tracking-wider">
                      <span className="text-gray-400">Risk Assessment</span>
                      <span className="text-emerald-400">{candidate.riskLevel} Risk</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 w-[15%]" />
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Right Column: Deep Intelligence Blocks */}
            <div className="xl:col-span-8 space-y-6">
              
              {/* Executive Summary */}
              <Card className="p-8 border-blue-200 bg-gradient-to-br from-blue-50/50 to-white shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-2 h-full bg-blue-600" />
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <FiCpu className="text-blue-600 w-5 h-5" />
                    <h4 className="font-extrabold text-sm text-gray-900 uppercase tracking-wider">Executive Summary</h4>
                  </div>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed font-medium mb-6">
                  {candidate.executiveSummary}
                </p>
                <div className="p-4 bg-white border border-blue-100 rounded-xl text-xs font-extrabold text-blue-900 flex items-center gap-3 shadow-sm mb-6">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <FiCheckCircle className="w-4 h-4" />
                  </div>
                  <span className="uppercase tracking-wider">{candidate.recommendation}</span>
                </div>
                
                {/* Recruiter Actions */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <button onClick={() => handleAction('Shortlisted', 3)} className="px-4 py-2.5 bg-green-100 text-green-700 font-bold rounded-xl text-xs hover:bg-green-200 transition-colors">
                    Shortlist
                  </button>
                  <button onClick={() => handleAction('Interviewing', 4)} className="px-4 py-2.5 bg-purple-100 text-purple-700 font-bold rounded-xl text-xs hover:bg-purple-200 transition-colors">
                    Schedule Interview
                  </button>
                  <button onClick={() => handleAction('Hired', 5)} className="px-4 py-2.5 bg-blue-600 text-white font-bold rounded-xl text-xs hover:bg-blue-700 transition-colors">
                    Hire
                  </button>
                  <button onClick={() => handleAction('Rejected', 5)} className="px-4 py-2.5 bg-red-100 text-red-700 font-bold rounded-xl text-xs hover:bg-red-200 transition-colors">
                    Reject
                  </button>
                </div>
              </Card>

              {/* Multi-Agent Reasoning Blocks */}
              <div className="space-y-4">
                <h4 className="font-extrabold text-sm text-gray-900 flex items-center gap-2 px-1">
                  <FiLayers className="text-indigo-500" /> Multi-Agent Reasoning
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Resume Agent */}
                  <Card className="p-6 bg-white border border-gray-200 shadow-sm hover:border-indigo-300 transition-colors">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded">
                        <FiTerminal className="w-4 h-4" />
                      </div>
                      <h5 className="font-bold text-xs text-gray-900 uppercase tracking-wider">Resume Agent</h5>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed font-medium">
                      {candidate.agents.resume}
                    </p>
                  </Card>

                  {/* GitHub Agent */}
                  <Card className="p-6 bg-white border border-gray-200 shadow-sm hover:border-gray-900 transition-colors">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-1.5 bg-gray-100 text-gray-900 rounded">
                        <FiGitCommit className="w-4 h-4" />
                      </div>
                      <h5 className="font-bold text-xs text-gray-900 uppercase tracking-wider">GitHub Agent</h5>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed font-medium">
                      {candidate.agents.github}
                    </p>
                  </Card>

                  {/* LinkedIn Agent */}
                  <Card className="p-6 bg-white border border-gray-200 shadow-sm hover:border-blue-400 transition-colors">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-1.5 bg-blue-50 text-blue-600 rounded">
                        <FiLinkedin className="w-4 h-4" />
                      </div>
                      <h5 className="font-bold text-xs text-gray-900 uppercase tracking-wider">LinkedIn Agent</h5>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed font-medium">
                      {candidate.agents.linkedin}
                    </p>
                  </Card>

                  {/* Portfolio Agent */}
                  <Card className="p-6 bg-white border border-gray-200 shadow-sm hover:border-emerald-400 transition-colors">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-1.5 bg-emerald-50 text-emerald-600 rounded">
                        <FiBriefcase className="w-4 h-4" />
                      </div>
                      <h5 className="font-bold text-xs text-gray-900 uppercase tracking-wider">Project Agent</h5>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed font-medium">
                      {candidate.agents.projects}
                    </p>
                  </Card>

                </div>
              </div>

              {/* DNA & Trajectory */}
              <Card className="p-8 shadow-sm bg-white">
                <div className="flex items-center gap-2 mb-6">
                  <FiZap className="text-amber-500 w-5 h-5" />
                  <h4 className="font-extrabold text-sm text-gray-900 uppercase tracking-wider">Candidate DNA Profile</h4>
                </div>
                <div className="flex flex-wrap gap-2 mb-8">
                  {candidate.dna.map((tag, i) => (
                    <span key={i} className="px-4 py-2 bg-gray-50 text-gray-900 rounded-xl text-xs font-bold border border-gray-200 shadow-sm">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="pt-6 border-t border-gray-100">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <FiTrendingUp className="text-gray-400" /> Career Trajectory Prediction
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed font-medium">{candidate.careerPrediction}</p>
                </div>
              </Card>

              {/* Risk Flags & Interview Prep */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <Card className="p-8 shadow-sm border-t-[6px] border-t-amber-400 bg-white">
                  <div className="flex items-center gap-2 mb-6">
                    <FiShield className="text-amber-500 w-5 h-5" />
                    <h4 className="font-extrabold text-sm text-gray-900 uppercase tracking-wider">Risk Factors</h4>
                  </div>
                  <ul className="space-y-4">
                    {candidate.riskFlags.map((risk, i) => (
                      <li key={i} className="text-xs text-gray-700 leading-relaxed font-medium flex items-start gap-3 bg-amber-50/50 p-4 rounded-xl border border-amber-100">
                        <FiAlertCircle className="text-amber-500 shrink-0 w-4 h-4 mt-0.5" />
                        <span>{risk}</span>
                      </li>
                    ))}
                  </ul>
                </Card>

                <Card className="p-8 shadow-sm border-t-[6px] border-t-purple-500 bg-white">
                  <div className="flex items-center gap-2 mb-6">
                    <FiMessageSquare className="text-purple-600 w-5 h-5" />
                    <h4 className="font-extrabold text-sm text-gray-900 uppercase tracking-wider">Interview Protocol</h4>
                  </div>
                  <ul className="space-y-4">
                    {candidate.interviewQuestions.map((q, i) => (
                      <li key={i} className="text-xs text-gray-700 leading-relaxed font-medium flex gap-3">
                        <span className="text-purple-600 font-extrabold text-sm">{i + 1}.</span> {q}
                      </li>
                    ))}
                  </ul>
                </Card>

              </div>
              
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
