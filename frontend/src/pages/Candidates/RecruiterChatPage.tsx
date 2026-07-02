import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { 
  FiMessageSquare, 
  FiSend, 
  FiCpu, 
  FiUsers, 
  FiTrendingUp, 
  FiCheckCircle, 
  FiBriefcase,
  FiHelpCircle,
  FiTrash2
} from 'react-icons/fi'
import { Card } from '../../components/common/Card'
import { Button } from '../../components/common/Button'
import { Badge } from '../../components/common/Badge'
import { useApp } from '../../contexts/AppContext'

interface Message {
  id: number;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  results?: Array<{
    name: string;
    role: string;
    score: number;
    recommendation: string;
    details: string;
  }>;
}

export const RecruiterChatPage = () => {
  const { candidates } = useApp()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'ai',
      text: "Hi there! I am your AI recruiting companion. Ask me queries in plain English like 'Who is our top candidate?', 'Show me candidates with React experience', or 'Compare our top developers'.",
      timestamp: "Just now"
    }
  ])
  const [inputText, setInputText] = useState('')
  const [loading, setLoading] = useState(false)

  const messagesEndRef = React.useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  React.useEffect(() => {
    scrollToBottom()
  }, [messages, loading])

  // Build dynamic quick prompts based on real candidates in DB
  const quickPrompts = useMemo(() => {
    const prompts = ["Who is the best candidate?", "Show candidates with React experience."]
    if (candidates.length >= 2) {
      prompts.push(`Compare ${candidates[0].name || 'demo6'} and ${candidates[1].name || 'testuser'}`)
    } else {
      prompts.push("Compare candidates.")
    }
    return prompts
  }, [candidates])

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return

    const userMsg: Message = {
      id: Date.now(),
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages(prev => [...prev, userMsg])
    setInputText('')
    setLoading(true)

    // Formulate a response based on live candidate database
    setTimeout(() => {
      const lowerText = text.toLowerCase()
      let replyText = ""
      let replyResults: Message['results'] = []

      // Helper to find matching candidates by skill
      const searchBySkill = (skill: string) => {
        return candidates.filter(c => 
          (Array.isArray(c.skills) && c.skills.some((s: string) => s.toLowerCase().includes(skill.toLowerCase()))) ||
          (Array.isArray(c.matchedSkills) && c.matchedSkills.some((s: string) => s.toLowerCase().includes(skill.toLowerCase())))
        ).sort((a, b) => (b.overallScore || b.matchScore || 0) - (a.overallScore || a.matchScore || 0))
      }

      // Check if comparing specific names (e.g. "compare Sarah and Alex")
      const compareMatch = lowerText.match(/compare\s+([a-z0-9]+)\s+and\s+([a-z0-9]+)/i)
      
      if (compareMatch) {
        const name1 = compareMatch[1].toLowerCase()
        const name2 = compareMatch[2].toLowerCase()
        const cand1 = candidates.find(c => c.name?.toLowerCase().includes(name1))
        const cand2 = candidates.find(c => c.name?.toLowerCase().includes(name2))
        
        if (cand1 && cand2) {
          replyText = `Here is a detailed AI comparison between ${cand1.name} and ${cand2.name}:`
          replyResults = [
            {
              name: cand1.name || "Candidate 1",
              role: cand1.role || "Developer",
              score: cand1.overallScore || cand1.matchScore || 0,
              recommendation: cand1.recommendation || "Review",
              details: `Strengths: ${Array.isArray(cand1.strengths) ? cand1.strengths.slice(0, 2).join(', ') : 'N/A'}. Executive Summary: ${cand1.executiveSummary || 'No summary.'}`
            },
            {
              name: cand2.name || "Candidate 2",
              role: cand2.role || "Developer",
              score: cand2.overallScore || cand2.matchScore || 0,
              recommendation: cand2.recommendation || "Review",
              details: `Strengths: ${Array.isArray(cand2.strengths) ? cand2.strengths.slice(0, 2).join(', ') : 'N/A'}. Executive Summary: ${cand2.executiveSummary || 'No summary.'}`
            }
          ]
        } else {
          replyText = `I couldn't find both candidates in the database. Please verify name spellings (e.g., try comparing matching candidates).`
        }
      } 
      // General compare query
      else if (lowerText.includes('compare')) {
        const sortedCands = [...candidates].sort((a, b) => (b.overallScore || b.matchScore || 0) - (a.overallScore || a.matchScore || 0))
        if (sortedCands.length >= 2) {
          const cand1 = sortedCands[0]
          const cand2 = sortedCands[1]
          replyText = `Comparing our top two candidates, ${cand1.name} and ${cand2.name}:`
          replyResults = [
            {
              name: cand1.name,
              role: cand1.role || "Developer",
              score: cand1.overallScore || cand1.matchScore || 0,
              recommendation: cand1.recommendation || "Review",
              details: `Top Match: ${Array.isArray(cand1.strengths) ? cand1.strengths.slice(0, 2).join(', ') : 'N/A'}.`
            },
            {
              name: cand2.name,
              role: cand2.role || "Developer",
              score: cand2.overallScore || cand2.matchScore || 0,
              recommendation: cand2.recommendation || "Review",
              details: `Runner Up: ${Array.isArray(cand2.strengths) ? cand2.strengths.slice(0, 2).join(', ') : 'N/A'}.`
            }
          ]
        } else {
          replyText = "We need at least 2 candidates registered in the system to run a comparison."
        }
      }
      // Top or best candidate query
      else if (lowerText.includes('best') || lowerText.includes('top') || lowerText.includes('highest')) {
        const sortedCands = [...candidates].sort((a, b) => (b.overallScore || b.matchScore || 0) - (a.overallScore || a.matchScore || 0))
        if (sortedCands.length > 0) {
          const best = sortedCands[0]
          replyText = `Our highest-rated candidate is ${best.name} with an overall suitability match score of ${best.overallScore || best.matchScore || 0}%.`
          replyResults = [
            {
              name: best.name,
              role: best.role || "Developer",
              score: best.overallScore || best.matchScore || 0,
              recommendation: best.recommendation || "Hire",
              details: best.executiveSummary || "Analyzed portfolio matches technical parameters perfectly."
            }
          ]
        } else {
          replyText = "There are no candidates registered in the system yet."
        }
      }
      // Specific skill check
      else {
        let matchedSkill = ""
        const knownSkills = ["react", "node", "express", "postgres", "aws", "python", "fastapi", "java", "figma", "tailwind", "git", "github", "linkedin", "css", "html"]
        
        knownSkills.forEach(skill => {
          if (lowerText.includes(skill)) {
            matchedSkill = skill
          }
        })

        if (matchedSkill) {
          const matches = searchBySkill(matchedSkill)
          if (matches.length > 0) {
            replyText = `Found ${matches.length} candidate(s) with verified ${matchedSkill.toUpperCase()} expertise:`
            replyResults = matches.map(cand => ({
              name: cand.name || "Candidate",
              role: cand.role || "Developer",
              score: cand.overallScore || cand.matchScore || 0,
              recommendation: cand.recommendation || "Review",
              details: `Has expertise matching ${matchedSkill.toUpperCase()}. Strengths: ${Array.isArray(cand.strengths) ? cand.strengths.slice(0, 2).join(', ') : 'N/A'}`
            }))
          } else {
            replyText = `We currently do not have any candidates in the database with listed ${matchedSkill.toUpperCase()} skills.`
          }
        } else {
          // General query fallback: return candidates matching keyword in name, role, or description
          const generalMatches = candidates.filter(c => 
            (c.name && c.name.toLowerCase().includes(lowerText)) || 
            (c.role && c.role.toLowerCase().includes(lowerText)) ||
            (c.executiveSummary && c.executiveSummary.toLowerCase().includes(lowerText))
          )
          
          if (generalMatches.length > 0) {
            replyText = `Found ${generalMatches.length} candidate(s) matching your query:`
            replyResults = generalMatches.map(cand => ({
              name: cand.name,
              role: cand.role || "Developer",
              score: cand.overallScore || cand.matchScore || 0,
              recommendation: cand.recommendation || "Review",
              details: cand.executiveSummary || "Evaluated application matching criteria."
            }))
          } else {
            replyText = "I parsed our candidate records but couldn't find any direct matches. Try search keywords like 'React', 'AWS', or 'Compare'."
          }
        }
      }

      const aiMsg: Message = {
        id: Date.now() + 1,
        sender: 'ai',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        results: replyResults
      }

      setMessages(prev => [...prev, aiMsg])
      setLoading(false)
    }, 1500)
  }

  const handleClearChat = () => {
    setMessages([
      {
        id: 1,
        sender: 'ai',
        text: "Hi there! I am your AI recruiting companion. Ask me queries in plain English like 'Who is our top candidate?', 'Show me candidates with React experience', or 'Compare our top developers'.",
        timestamp: "Just now"
      }
    ])
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSendMessage(inputText)
  }

  return (
    <div className="space-y-4 text-left max-w-4xl mx-auto flex flex-col h-[calc(100vh-190px)] min-h-[580px]">
      {/* Header */}
      <div className="shrink-0 flex justify-between items-center bg-white/40 backdrop-blur-md p-4 rounded-xl border border-gray-200/65 shadow-sm">
        <div>
          <h2 className="text-xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
            <FiMessageSquare className="text-blue-600 animate-pulse" />
            Recruiter AI Copilot Chat
          </h2>
          <p className="text-[11px] text-gray-500 mt-0.5 font-semibold">
            Ask questions in plain English to search, compare, and filter candidates dynamically.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-lg text-emerald-800 text-[10px] font-bold uppercase tracking-wider shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Active: {candidates.length} Applicants
          </div>
          <button
            onClick={handleClearChat}
            disabled={messages.length <= 1}
            className={`p-2 rounded-lg transition-colors border shadow-sm ${
              messages.length <= 1 
                ? 'bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed'
                : 'bg-red-50 hover:bg-red-100 text-red-600 border-red-200 hover:border-red-300'
            }`}
            title="Clear Chat History"
          >
            <FiTrash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Chat Interface */}
      <Card className="flex-1 min-h-0 bg-gray-50/50 backdrop-blur-sm border border-gray-200/80 shadow-md flex flex-col overflow-hidden p-0 rounded-2xl">
        
        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex gap-3 items-start ${msg.sender === 'user' ? 'justify-end' : ''}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-650 text-white flex items-center justify-center shrink-0 shadow-md border border-blue-500/20 mt-1">
                  <FiCpu className="w-4 h-4" />
                </div>
              )}

              <div className="space-y-2 max-w-[85%]">
                <div className={`p-4 rounded-2xl text-xs leading-relaxed font-semibold shadow-sm transition-all border ${
                  msg.sender === 'user' 
                    ? 'bg-gradient-to-tr from-blue-600 to-indigo-650 text-white rounded-tr-none border-blue-600/35 shadow-blue-500/10' 
                    : 'bg-white text-gray-800 border-gray-200/80 rounded-tl-none'
                }`}>
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>

                {/* Structured preview candidate details cards */}
                {msg.results && msg.results.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {msg.results.map((cand, idx) => {
                      const scoreVal = cand.score || 0
                      // Select top border accent based on evaluation score
                      const borderAccent = scoreVal >= 90
                        ? 'border-t-4 border-t-emerald-500 hover:border-emerald-300'
                        : scoreVal >= 75
                        ? 'border-t-4 border-t-blue-500 hover:border-blue-300'
                        : 'border-t-4 border-t-amber-500 hover:border-amber-300'
                      
                      return (
                        <div 
                          key={idx} 
                          className={`p-4 border border-gray-200 hover:shadow-indigo-500/5 hover:-translate-y-0.5 rounded-xl bg-white shadow-sm space-y-2.5 text-left text-xs transition-all duration-300 ${borderAccent}`}
                        >
                          <div className="flex justify-between items-start gap-2">
                            <div className="min-w-0">
                              <h4 className="font-extrabold text-gray-950 truncate">{cand.name}</h4>
                              <p className="text-[10px] text-gray-400 font-bold uppercase truncate">{cand.role}</p>
                            </div>
                            <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-lg shrink-0 border ${
                              scoreVal >= 90
                                ? 'text-emerald-700 bg-emerald-50 border-emerald-100'
                                : scoreVal >= 75
                                ? 'text-blue-700 bg-blue-50 border-blue-100'
                                : 'text-amber-700 bg-amber-50 border-amber-100'
                            }`}>
                              {scoreVal}% Match
                            </span>
                          </div>
                          <p className="text-[10px] text-gray-650 leading-relaxed font-semibold">{cand.details}</p>
                          <div className="flex justify-between items-center pt-1 border-t border-gray-50 shrink-0">
                            <Badge variant={cand.recommendation === 'Strong Match' || cand.recommendation === 'Hire' ? 'success' : 'primary'} className="text-[9px] font-bold uppercase tracking-wide">
                              {cand.recommendation}
                            </Badge>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}

                <span className={`text-[9px] text-gray-400 block px-2 ${msg.sender === 'user' ? 'text-right' : ''}`}>
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 items-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-650 text-white flex items-center justify-center shrink-0 shadow-md">
                <FiCpu className="w-4 h-4 animate-spin" />
              </div>
              <div className="bg-white border border-gray-200/80 px-4 py-2.5 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce" />
              </div>
            </div>
          )}
          
          {/* Scroll anchor */}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Help Prompts */}
        <div className="px-6 py-3 bg-gray-50/80 border-t border-gray-200/60 flex gap-2 flex-wrap text-left shrink-0">
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(p)}
              disabled={loading}
              className="text-[10px] font-bold text-blue-700 bg-blue-50/50 hover:bg-blue-100/50 border border-blue-100/40 hover:border-blue-200 px-3 py-1.5 rounded-xl transition-all shadow-sm cursor-pointer"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Chat input box */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200/60 flex gap-3 bg-white shrink-0">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={loading}
            placeholder="Search candidates, e.g. 'Who is the best React developer?' or 'Compare candidates'..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder-gray-400 font-semibold"
          />
          <Button 
            type="submit" 
            disabled={loading || !inputText.trim()}
            className="text-xs font-semibold px-4 shadow-md bg-gradient-to-tr from-blue-600 to-indigo-650 border-0 hover:brightness-105 transition-all text-white shrink-0"
          >
            <FiSend className="w-4 h-4" />
          </Button>
        </form>

      </Card>
    </div>
  )
}
