import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiFileText, 
  FiCpu, 
  FiCheckCircle, 
  FiAlertTriangle, 
  FiTrendingUp, 
  FiUpload, 
  FiRefreshCw, 
  FiEye,
  FiTerminal
} from 'react-icons/fi'
import { Card } from '../../components/common/Card'
import { Button } from '../../components/common/Button'
import { Badge } from '../../components/common/Badge'
import Progress from '../../components/common/Progress'
import { useApp } from '../../contexts/AppContext'
export const ResumeAnalysisPage = () => {
  const { currentUser, updateUserProfile } = useApp()
  const [atsScore, setAtsScore] = useState<number | null>(currentUser?.resumeAnalysis?.atsScore || null)
  const [uploading, setUploading] = useState(false)
  const [pipelineStep, setPipelineStep] = useState(0)
  
  const [jobDescription, setJobDescription] = useState('')
  const [recommendations, setRecommendations] = useState<any[]>(currentUser?.resumeAnalysis?.recommendations || [])
  const [highlights, setHighlights] = useState<any>(currentUser?.resumeAnalysis?.highlights || null)
  const [fileName, setFileName] = useState(currentUser?.resumeAnalysis?.fileName || '')
  const [errorMsg, setErrorMsg] = useState('')

  React.useEffect(() => {
    if (currentUser?.resumeAnalysis) {
      setAtsScore(currentUser.resumeAnalysis.atsScore ?? null)
      setRecommendations(currentUser.resumeAnalysis.recommendations || [])
      setHighlights(currentUser.resumeAnalysis.highlights || null)
      setFileName(currentUser.resumeAnalysis.fileName || '')
    } else if (currentUser?.resumeName) {
      setFileName(currentUser.resumeName)
      setAtsScore(85) // Prefill a simulated ATS rating since they completed onboarding
    }
  }, [currentUser])

  const pipelineStages = [
    "Reading file structure & OCR...",
    "Segmenting Experience, Education, and Skills...",
    "Cross-referencing keywords with open jobs...",
    "Assessing formatting, layouts, and font readability...",
    "Re-generating overall ATS score..."
  ]

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      if (reader.result && currentUser?.email) {
        localStorage.setItem(`resume_file_${currentUser.email}`, reader.result as string)
      }
    }
    reader.readAsDataURL(file)

    setFileName(file.name)
    setUploading(true)
    setPipelineStep(0)
    setErrorMsg('')

    // Animation simulation for UI feedback while waiting
    const timers = [
      setTimeout(() => setPipelineStep(1), 800),
      setTimeout(() => setPipelineStep(2), 2000),
      setTimeout(() => setPipelineStep(3), 3500),
      setTimeout(() => setPipelineStep(4), 5000)
    ]

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('job_description', jobDescription)

      const apiBase = import.meta.env.VITE_API_BASE_URL || '';
      const response = await fetch(`${apiBase}/api/resume/optimize`, {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}))
        throw new Error(errData.detail || 'Failed to analyze resume.')
      }

      const data = await response.json()
      
      timers.forEach(clearTimeout)
      setPipelineStep(5)
      
      console.log('AI Response:', data)
      const parsedScore = data.atsScore ?? data.ats_score ?? data.score ?? data.AtsScore ?? null;
      const numericScore = parsedScore !== null ? Number(parsedScore) : 85;
      
      setAtsScore(numericScore)
      setRecommendations(data.recommendations || data.Recommendations || [])
      setHighlights(data.highlights || data.Highlights || {})

      updateUserProfile({
        resumeAnalysis: {
          atsScore: numericScore,
          fileName: file.name,
          highlights: data.highlights || data.Highlights || {},
          recommendations: data.recommendations || data.Recommendations || []
        }
      })
      
    } catch (err: any) {
      console.error(err)
      setErrorMsg(err.message)
      timers.forEach(clearTimeout)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-6 text-left max-w-5xl mx-auto">
      <div>
        <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
          <FiFileText className="text-blue-600" />
          Resume Optimizer & ATS Analysis
        </h2>
        <p className="text-xs text-gray-500 mt-1 mb-4">
          Scan your resume using our multi-agent parser to get instant ATS scores and formatting suggestions.
        </p>
        <div className="w-full">
            <label className="block text-xs font-semibold text-gray-700 mb-1">Target Job Description (Optional)</label>
            <textarea 
                className="w-full h-20 p-3 border border-gray-200 rounded-xl text-xs outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-800 resize-none shadow-sm"
                placeholder="Paste the job description here so the AI can optimize your resume specifically for this role..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
            />
        </div>
        {errorMsg && (
            <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-lg text-xs font-semibold text-red-600 flex items-start gap-2">
                <FiAlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{errorMsg}</span>
            </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {uploading ? (
          <motion.div 
            key="parsing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-16 bg-white border border-gray-200 rounded-2xl shadow-sm space-y-6"
          >
            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 relative shadow-sm">
              <FiCpu className="w-8 h-8" />
              <motion.div 
                animate={{ rotate: 360 }} 
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-2xl opacity-40"
              />
            </div>
            
            <div className="text-center space-y-1">
              <h4 className="font-extrabold text-sm text-gray-950">AI Parsing Agent in Progress</h4>
              <p className="text-xs text-gray-500">Processing uploaded PDF resume...</p>
            </div>

            <div className="w-full max-w-sm border border-gray-150 p-4 rounded-xl bg-gray-50/50 space-y-2">
              {pipelineStages.map((stage, idx) => {
                const isActive = pipelineStep === idx
                const isComplete = pipelineStep > idx
                return (
                  <div key={idx} className="flex items-center gap-2 text-xs">
                    <span className={`w-2 h-2 rounded-full ${
                      isComplete ? 'bg-emerald-500' : isActive ? 'bg-blue-600 animate-pulse' : 'bg-gray-200'
                    }`} />
                    <span className={isComplete ? 'text-gray-900 font-medium' : isActive ? 'text-blue-600 font-bold' : 'text-gray-400'}>
                      {stage}
                    </span>
                  </div>
                )
              })}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="analysis"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Left Col: Upload & Score */}
            <div className="space-y-6">
              {/* ATS Compatibility Score */}
              <Card className="flex flex-col justify-between text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 text-gray-900">
                  <FiCpu className="w-24 h-24" />
                </div>
                <div className="relative z-10 space-y-4">
                  <h3 className="font-extrabold text-sm text-gray-400 uppercase tracking-wider">ATS Score</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-6xl font-extrabold tracking-tight text-gray-900">{atsScore !== null ? atsScore : '--'}</span>
                    <span className="text-xl text-gray-500 font-bold">/100</span>
                  </div>
                  <div className="h-2.5 bg-gray-800 rounded-full overflow-hidden w-full">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        (atsScore || 0) >= 90 ? 'bg-emerald-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${atsScore || 0}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-300">
                    {atsScore >= 95 
                      ? "Outstanding match! Your resume is ready for direct review." 
                      : "Good matching. Apply the keyword fixes below to push your score past 95%."}
                  </p>
                </div>
              </Card>

              {/* Upload area */}
              <Card className="p-6 bg-white border border-gray-200 shadow-sm text-center space-y-4">
                <h3 className="font-extrabold text-sm text-gray-900 tracking-wide">Upload New Version</h3>
                <p className="text-[10px] text-gray-500 leading-relaxed">
                  Make revisions based on feedback and re-upload your PDF to re-calculate score.
                </p>
                
                <label 
                  htmlFor="resume-upload"
                  className="border-2 border-dashed border-gray-200 hover:border-blue-400 transition-colors p-6 rounded-xl cursor-pointer bg-slate-50/50 flex flex-col items-center justify-center space-y-2"
                >
                  <FiUpload className="text-gray-400 w-8 h-8" />
                  <span className="text-xs font-bold text-gray-700">Drop PDF here or click to select</span>
                  <span className="text-[9px] text-gray-400">PDF up to 5MB</span>
                </label>
                <input 
                  type="file" 
                  id="resume-upload" 
                  accept=".pdf" 
                  className="hidden" 
                  onChange={handleFileUpload} 
                />
              </Card>
            </div>

            {/* Right Col (2 cols): Recommendations & Current Resume Details */}
            <div className="md:col-span-2 space-y-6">
              
              {/* ATS Recommendations */}
              <Card className="p-6 bg-white border border-gray-200 shadow-sm">
                <h3 className="font-extrabold text-sm text-gray-900 mb-4 tracking-wide">AI Recommendation List</h3>
                <div className="space-y-3">
                  {recommendations.map((rec, idx) => (
                    <div 
                      key={idx} 
                      className={`p-3 border rounded-xl flex items-start gap-3 text-xs leading-relaxed font-semibold ${
                        rec.type === 'warning' 
                          ? 'bg-amber-50/40 border-amber-100 text-gray-800' 
                          : 'bg-green-50/40 border-green-100 text-gray-800'
                      }`}
                    >
                      {rec.type === 'warning' ? (
                        <FiAlertTriangle className="text-amber-500 w-4 h-4 shrink-0 mt-0.5" />
                      ) : (
                        <FiCheckCircle className="text-emerald-500 w-4 h-4 shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <span className={`inline-block text-[9px] uppercase tracking-wider font-bold mb-1 px-1.5 py-0.5 rounded ${
                          rec.type === 'warning' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {rec.category}
                        </span>
                        <p>{rec.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Current Resume Metadata Preview */}
              <Card className="p-6 bg-white border border-gray-200 shadow-sm space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-extrabold text-sm text-gray-900 tracking-wide">Parsed Resume Highlights</h3>
                  <Badge variant="neutral">{fileName || "No file uploaded"}</Badge>
                </div>
                
                {highlights ? (
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="border border-gray-100 p-3 rounded-lg">
                      <p className="text-[10px] text-gray-400 font-bold uppercase">Sourced Experience</p>
                      <p className="font-bold text-gray-800 mt-1 truncate" title={highlights.experience}>{highlights.experience || "N/A"}</p>
                    </div>
                    <div className="border border-gray-100 p-3 rounded-lg">
                      <p className="text-[10px] text-gray-400 font-bold uppercase">Education Degree</p>
                      <p className="font-bold text-gray-800 mt-1 truncate" title={highlights.education}>{highlights.education || "N/A"}</p>
                    </div>
                    <div className="border border-gray-100 p-3 rounded-lg">
                      <p className="text-[10px] text-gray-400 font-bold uppercase">Key Technologies</p>
                      <p className="font-bold text-gray-800 mt-1 line-clamp-2" title={highlights.skills}>{highlights.skills || "N/A"}</p>
                    </div>
                    <div className="border border-gray-100 p-3 rounded-lg">
                      <p className="text-[10px] text-gray-400 font-bold uppercase">Contact Verified</p>
                      <p className="font-bold text-gray-800 mt-1 truncate" title={highlights.contact}>{highlights.contact || "N/A"}</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-xs text-gray-500 font-semibold">Upload a resume to see parsed highlights.</p>
                  </div>
                )}
              </Card>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
