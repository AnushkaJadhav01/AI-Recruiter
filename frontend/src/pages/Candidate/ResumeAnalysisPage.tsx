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
  const { currentUser } = useApp()
  const [atsScore, setAtsScore] = useState(88)
  const [uploading, setUploading] = useState(false)
  const [pipelineStep, setPipelineStep] = useState(0)

  const recommendations = [
    { type: 'warning', text: 'Add "Next.js SSR" or "Server Components" to match Senior React roles.', category: 'Keywords' },
    { type: 'warning', text: 'Quantify your impact in the Vercel role (e.g. "% page load reduction").', category: 'Content' },
    { type: 'success', text: 'Excellent section layouts (Experience, Education, Projects).', category: 'Formatting' },
    { type: 'success', text: 'File format (PDF) is highly compatible with ATS parsers.', category: 'Technical' }
  ]

  const pipelineStages = [
    "Reading file structure & OCR...",
    "Segmenting Experience, Education, and Skills...",
    "Cross-referencing keywords with open jobs...",
    "Assessing formatting, layouts, and font readability...",
    "Re-generating overall ATS score..."
  ]

  const simulateUpload = () => {
    setUploading(true)
    setPipelineStep(0)
    
    // Animate through parser steps
    const timer1 = setTimeout(() => setPipelineStep(1), 1000)
    const timer2 = setTimeout(() => setPipelineStep(2), 2000)
    const timer3 = setTimeout(() => setPipelineStep(3), 3000)
    const timer4 = setTimeout(() => setPipelineStep(4), 4000)
    const timer5 = setTimeout(() => {
      setUploading(false)
      setAtsScore(96) // increase score!
    }, 5000)
  }

  return (
    <div className="space-y-6 text-left max-w-5xl mx-auto">
      <div>
        <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
          <FiFileText className="text-blue-600" />
          Resume Optimizer & ATS Analysis
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          Scan your resume using our multi-agent parser to get instant ATS scores and formatting suggestions.
        </p>
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
              <Card className="p-6 bg-gray-900 text-white border-gray-800 shadow-md flex flex-col justify-between text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                  <FiCpu className="w-24 h-24" />
                </div>
                <div className="relative z-10 space-y-4">
                  <h3 className="font-extrabold text-sm text-gray-400 uppercase tracking-wider">ATS Score</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-6xl font-extrabold tracking-tight">{atsScore}</span>
                    <span className="text-xl text-gray-500 font-bold">/100</span>
                  </div>
                  <div className="h-2.5 bg-gray-800 rounded-full overflow-hidden w-full">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        atsScore >= 90 ? 'bg-emerald-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${atsScore}%` }}
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
                
                <div 
                  onClick={simulateUpload}
                  className="border-2 border-dashed border-gray-200 hover:border-blue-400 transition-colors p-6 rounded-xl cursor-pointer bg-slate-50/50 flex flex-col items-center justify-center space-y-2"
                >
                  <FiUpload className="text-gray-400 w-8 h-8" />
                  <span className="text-xs font-bold text-gray-700">Drop PDF here or click to select</span>
                  <span className="text-[9px] text-gray-400">PDF, DOCX up to 5MB</span>
                </div>
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
                  <Badge variant="neutral">sarah_jenkins_resume.pdf</Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="border border-gray-100 p-3 rounded-lg">
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Sourced Experience</p>
                    <p className="font-bold text-gray-800 mt-1">7 Years Total</p>
                  </div>
                  <div className="border border-gray-100 p-3 rounded-lg">
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Education Degree</p>
                    <p className="font-bold text-gray-800 mt-1">B.S. in Computer Science</p>
                  </div>
                  <div className="border border-gray-100 p-3 rounded-lg">
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Key Technologies</p>
                    <p className="font-bold text-gray-800 mt-1">React, Node.js, Express, SQL, Tailwind, AWS</p>
                  </div>
                  <div className="border border-gray-100 p-3 rounded-lg">
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Contact Verified</p>
                    <p className="font-bold text-gray-800 mt-1">+1 (555) 234-5678</p>
                  </div>
                </div>
              </Card>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
