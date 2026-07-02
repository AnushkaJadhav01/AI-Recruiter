import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiHelpCircle, 
  FiCpu, 
  FiCheckCircle, 
  FiAlertTriangle, 
  FiSend, 
  FiAward,
  FiMessageSquare,
  FiZap,
  FiBookOpen
} from 'react-icons/fi'
import { Card } from '../../components/common/Card'
import { Button } from '../../components/common/Button'
import { Badge } from '../../components/common/Badge'
import { useApp } from '../../contexts/AppContext'

export const InterviewPrepPage = () => {
  const { candidates, currentUser } = useApp()
  const [selectedCategory, setSelectedCategory] = useState<'technical' | 'behavioral' | 'hr'>('technical')
  const [selectedQuestionIdx, setSelectedQuestionIdx] = useState(0)
  const [userAnswer, setUserAnswer] = useState('')
  const [evaluating, setEvaluating] = useState(false)
  const [feedback, setFeedback] = useState<{
    score: number;
    strengths: string;
    weaknesses: string;
    modelAnswer: string;
  } | null>(null)

  // Find real candidate application entries for this user
  const candidateData = useMemo(() => {
    return candidates.find(c => c.email === currentUser?.email)
  }, [candidates, currentUser])

  const questions = useMemo(() => {
    const defaultQuestions = {
      technical: [
        {
          question: "Explain the difference between Server Components and Client Components in React 19.",
          expectedAnswer: "Server Components run on the server to retrieve data and render static layouts, bypassing client bundles. Client Components use directives like 'use client' and run in the browser to handle interactivity, state updates, and hook triggers.",
          hints: "Mention server rendering vs client bundles, 'use client' directive, and access to node modules vs browser DOM."
        },
        {
          question: "How does layoutId in Framer Motion accomplish smooth layout transitions?",
          expectedAnswer: "layoutId matches elements with identical IDs across different states, calculating their scale and position discrepancies and animating the morph automatically without manual styles.",
          hints: "Explain layout morphing, shared elements across mounts, and automatic transition calculations."
        }
      ],
      behavioral: [
        {
          question: "Describe a time you disagreed with a product specification. How did you resolve it?",
          expectedAnswer: "Focus on using evidence and performance audits to back up your claim, maintaining respect, suggesting constructive alternative options, and aligning with standard developer trade-offs.",
          hints: "Use the STAR method: Situation, Task, Action, Result. Highlight data-driven decisions."
        }
      ],
      hr: [
        {
          question: "Why do you want to join AI Recruiter as a Senior Developer?",
          expectedAnswer: "Express enthusiasm for scaling automation agents, building premium UX designs, and working with complex web sockets or dashboard integrations.",
          hints: "Show familiarity with the product, highlight your skill overlap (Next.js/Node), and state career growth expectations."
        }
      ]
    }

    if (candidateData && Array.isArray(candidateData.interviewQuestions) && candidateData.interviewQuestions.length > 0) {
      const customTech = candidateData.interviewQuestions.map((q: string) => ({
        question: q,
        expectedAnswer: `Detailed explanation of your specific implementation strategies, architectures, and design trade-offs regarding ${q.toLowerCase().replace(/[^a-z0-9 ]/g, "")}.`,
        hints: "Highlight your hands-on project experience, mention specific frameworks, and talk about optimization metrics."
      }))
      return {
        ...defaultQuestions,
        technical: [...customTech, ...defaultQuestions.technical]
      }
    }

    return defaultQuestions
  }, [candidateData])

  const categoryQuestions = questions[selectedCategory]
  const currentQuestion = categoryQuestions[selectedQuestionIdx] || categoryQuestions[0]

  const handleSubmitAnswer = (e: React.FormEvent) => {
    e.preventDefault()
    if (!userAnswer.trim()) return

    setEvaluating(true)
    setFeedback(null)

    // Simulate AI model evaluation with smart keyword analysis
    setTimeout(() => {
      setEvaluating(false)
      const answerLower = userAnswer.toLowerCase()
      const wordCount = userAnswer.trim().split(/\s+/).length

      if (wordCount < 15) {
        setFeedback({
          score: 42,
          strengths: "Your response has a correct baseline structure.",
          weaknesses: "Too brief. Try to elaborate on core concepts, outline structural details, and mention specific rendering cycles or database trade-offs.",
          modelAnswer: currentQuestion.expectedAnswer
        })
        return
      }

      // Dynamic keywords check
      let matches = 0
      const matchesWords: string[] = []
      const keywordsList = [
        "render", "server", "client", "bundle", "hydrate", "dom", "browser", "state", "hook",
        "layout", "animate", "morph", "id", "scale", "position", "star", "situation", "task",
        "action", "result", "experience", "lead", "coordinate", "db", "api", "query", "scale"
      ]

      keywordsList.forEach(word => {
        if (answerLower.includes(word)) {
          matches++
          matchesWords.push(word)
        }
      })

      let score = 55 + Math.min(20, wordCount * 0.3) + Math.min(25, matches * 3)
      score = Math.min(100, Math.round(score))

      let strengths = "Good structural approach. "
      if (matchesWords.length > 0) {
        strengths += `You correctly highlighted key concepts like: ${matchesWords.slice(0, 4).join(', ')}.`
      } else {
        strengths += "Your writing style is highly professional."
      }

      let weaknesses = ""
      if (score < 75) {
        weaknesses = "Missing deeper architectural descriptions. Add details on project scaling constraints, library imports, and performance testing."
      } else if (score < 90) {
        weaknesses = "Solid explanation. To secure a perfect score, include code snippet layout illustrations or mention edge-case caching."
      } else {
        weaknesses = "Outstanding response! Very minor styling enhancements could be made, but conceptually complete."
      }

      setFeedback({
        score,
        strengths,
        weaknesses,
        modelAnswer: currentQuestion.expectedAnswer
      })
    }, 2000)
  }

  const handleSelectQuestion = (idx: number) => {
    setSelectedQuestionIdx(idx)
    setUserAnswer('')
    setFeedback(null)
  }

  const handleSelectCategory = (cat: 'technical' | 'behavioral' | 'hr') => {
    setSelectedCategory(cat)
    setSelectedQuestionIdx(0)
    setUserAnswer('')
    setFeedback(null)
  }

  return (
    <div className="space-y-6 text-left max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
          <FiCpu className="text-blue-600" />
          AI Mock Interview Practice
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          Select interview categories, submit your answers to mock technical/behavioral prompts, and receive structured grading feedback.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column: Questions List */}
        <div className="space-y-6">
          <Card className="p-6 bg-white border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-extrabold text-sm text-gray-900 tracking-wide">Select Category</h3>
            
            {/* Category Pills */}
            <div className="flex gap-2 flex-wrap">
              {(['technical', 'behavioral', 'hr'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleSelectCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border transition-all ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="border-t border-gray-100 my-2" />

            {/* Questions selectors */}
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Available Questions</label>
              {categoryQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectQuestion(idx)}
                  className={`w-full text-left p-3 border rounded-xl text-xs font-bold transition-all leading-normal ${
                    selectedQuestionIdx === idx
                      ? 'border-blue-500 bg-blue-50/40 text-blue-900'
                      : 'border-gray-150 bg-gray-50/20 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Question {idx + 1}
                </button>
              ))}
            </div>
          </Card>

          {/* Hint Card */}
          <Card className="p-6 bg-white border border-gray-200 shadow-sm space-y-3">
            <h4 className="font-extrabold text-xs text-gray-900 uppercase tracking-wider flex items-center gap-1">
              <FiZap className="text-amber-500 shrink-0" /> Answer Hints
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed font-semibold">
              {currentQuestion.hints}
            </p>
          </Card>
        </div>

        {/* Right Column (2 cols): Practice Area & Feedback */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Question detail and uploader */}
          <Card className="p-6 bg-white border border-gray-200 shadow-sm space-y-4">
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Active Question Prompt</span>
              <h3 className="font-extrabold text-base text-gray-950 leading-snug">
                {currentQuestion.question}
              </h3>
            </div>

            <form onSubmit={handleSubmitAnswer} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Your Answer</label>
                <textarea
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Type your explanation here. Be as detailed as possible to score higher..."
                  rows={6}
                  className="w-full p-4 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder-gray-400"
                />
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[10px] text-gray-400 font-bold">Word Count: {userAnswer.trim() ? userAnswer.trim().split(/\s+/).length : 0}</span>
                <Button 
                  type="submit" 
                  disabled={evaluating || !userAnswer.trim()}
                  className="text-xs font-semibold gap-1.5 shadow-sm min-w-[120px]"
                >
                  <FiSend className="w-3.5 h-3.5" /> Submit Answer
                </Button>
              </div>
            </form>
          </Card>

          {/* Evaluating State */}
          <AnimatePresence mode="wait">
            {evaluating && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="p-8 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col items-center justify-center space-y-4 text-center"
              >
                <FiCpu className="w-10 h-10 text-blue-600 animate-spin" />
                <h4 className="font-extrabold text-sm text-gray-950">AI Evaluation Agent</h4>
                <p className="text-xs text-gray-500">Grading response schema, comparing technical correctness, and identifying omissions...</p>
              </motion.div>
            )}

            {/* AI Grading Feedback */}
            {feedback && !evaluating && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Score & audit summary */}
                <Card className="p-6 bg-white border border-gray-200 shadow-sm grid grid-cols-1 sm:grid-cols-4 gap-6 text-left">
                  <div className="sm:col-span-1 text-center sm:border-r border-gray-100 flex flex-col justify-center py-2">
                    <span className="text-4xl font-extrabold text-blue-600">{feedback.score}</span>
                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mt-1">AI Grading Score</p>
                  </div>
                  
                  <div className="sm:col-span-3 space-y-3">
                    <div className="text-xs text-gray-700 leading-relaxed font-semibold">
                      <span className="font-bold text-emerald-600 flex items-center gap-1.5 mb-1">
                        <FiCheckCircle className="w-4 h-4" /> Strong Elements
                      </span>
                      {feedback.strengths}
                    </div>
                    
                    <div className="text-xs text-gray-700 leading-relaxed font-semibold">
                      <span className="font-bold text-amber-500 flex items-center gap-1.5 mb-1">
                        <FiAlertTriangle className="w-4 h-4" /> Room for Improvement
                      </span>
                      {feedback.weaknesses}
                    </div>
                  </div>
                </Card>

                {/* Expected Model Answer */}
                <Card className="p-6 bg-white border border-gray-200 shadow-sm space-y-3">
                  <h3 className="font-extrabold text-sm text-gray-900 tracking-wide flex items-center gap-2">
                    <FiBookOpen className="text-gray-400" /> AI Expected Model Answer
                  </h3>
                  <p className="text-xs text-gray-700 leading-relaxed font-medium bg-gray-50 p-4 rounded-xl border border-gray-100">
                    {feedback.modelAnswer}
                  </p>
                </Card>

              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </div>
  )
}
