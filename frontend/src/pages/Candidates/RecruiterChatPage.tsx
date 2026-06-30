import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  FiMessageSquare, 
  FiSend, 
  FiCpu, 
  FiUsers, 
  FiTrendingUp, 
  FiCheckCircle, 
  FiBriefcase,
  FiHelpCircle
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
      text: "Hi there! I am your AI recruiting companion. Ask me queries in plain English like 'Who is our top React candidate?', 'Show me candidates with AWS experience', or 'Who has high GitHub contributions?'.",
      timestamp: "Just now"
    }
  ])
  const [inputText, setInputText] = useState('')
  const [loading, setLoading] = useState(false)

  const quickPrompts = [
    "Who is the best React developer?",
    "Show candidates with AWS experience.",
    "Compare Sarah and Alex."
  ]

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

    // Formulate a response based on keywords
    setTimeout(() => {
      const lowerText = text.toLowerCase()
      let replyText = ""
      let replyResults: Message['results'] = undefined

      if (lowerText.includes('best') || lowerText.includes('top') || lowerText.includes('react')) {
        replyText = "Based on our Multi-Agent evaluations, Sarah Jenkins is currently the highest-rated candidate for frontend and full-stack positions with an overall score of 94%."
        replyResults = [
          {
            name: "Sarah Jenkins",
            role: "Senior Full-Stack Developer",
            score: 94,
            recommendation: "Strong Match",
            details: "GitHub score: 92% (Top 2% Next.js SSR contributions). Continuous promotion trajectory at Vercel agency."
          }
        ]
      } else if (lowerText.includes('aws') || lowerText.includes('amazon') || lowerText.includes('cloud')) {
        replyText = "We have 1 evaluated candidate with verified AWS architecture credentials in our system."
        replyResults = [
          {
            name: "Sarah Jenkins",
            role: "Senior Full-Stack Developer",
            score: 94,
            recommendation: "Strong Match",
            details: "AWS Certified Solutions Architect with verified cloud deployment configs on GitHub."
          }
        ]
      } else if (lowerText.includes('compare') || lowerText.includes('alex') || lowerText.includes('sarah')) {
        replyText = "Here is a comparison summary between our top full-stack applicants:"
        replyResults = [
          {
            name: "Sarah Jenkins",
            role: "Senior Full-Stack Developer",
            score: 94,
            recommendation: "Strong Match",
            details: "Stronger in layout styling, caching layers, and TypeScript. Has 7 years of parsed experience."
          },
          {
            name: "Alex Rivera",
            role: "Senior Full-Stack Developer",
            score: 87,
            recommendation: "Good Match",
            details: "Stronger in containerization (Docker) and Redis caches. Has 5 years of parsed experience."
          }
        ]
      } else {
        replyText = "I parsed our database of evaluated applicants. Currently, Sarah Jenkins matches full stack requirements, while other applications are in review. Feel free to refine your search keyword (e.g. 'React', 'Docker')."
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSendMessage(inputText)
  }

  return (
    <div className="space-y-6 text-left max-w-4xl mx-auto flex flex-col h-[calc(100vh-140px)]">
      {/* Header */}
      <div className="shrink-0">
        <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
          <FiMessageSquare className="text-blue-600" />
          Recruiter AI Copilot Chat
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          Ask questions in plain English to search, compare, and filter candidates dynamically.
        </p>
      </div>

      {/* Main Chat Interface */}
      <Card className="flex-1 min-h-0 bg-white border border-gray-200 shadow-sm flex flex-col overflow-hidden p-0 rounded-2xl">
        
        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex gap-4 items-start ${msg.sender === 'user' ? 'justify-end' : ''}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0 shadow-sm">
                  <FiCpu className="w-4 h-4" />
                </div>
              )}

              <div className="space-y-2 max-w-[80%]">
                <div className={`p-4 rounded-2xl text-xs leading-relaxed font-semibold shadow-sm ${
                  msg.sender === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-gray-50 text-gray-800 border border-gray-150 rounded-tl-none'
                }`}>
                  <p>{msg.text}</p>
                </div>

                {/* Optional structured preview data cards */}
                {msg.results && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {msg.results.map((cand, idx) => (
                      <div key={idx} className="p-4 border border-gray-150 rounded-xl bg-white shadow-sm space-y-2 text-left text-xs">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-extrabold text-gray-950">{cand.name}</h4>
                            <p className="text-[10px] text-gray-500 font-bold uppercase">{cand.role}</p>
                          </div>
                          <span className="text-[11px] font-extrabold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                            {cand.score}% Fit
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-650 leading-relaxed font-medium">{cand.details}</p>
                        <Badge variant={cand.recommendation === 'Strong Match' ? 'success' : 'primary'} className="text-[9px] font-bold uppercase">
                          {cand.recommendation}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}

                <span className={`text-[9px] text-gray-400 block px-2 ${msg.sender === 'user' ? 'text-right' : ''}`}>
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-4 items-center">
              <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0">
                <FiCpu className="w-4 h-4 animate-spin" />
              </div>
              <span className="text-xs text-gray-400 font-bold">AI agent typing...</span>
            </div>
          )}
        </div>

        {/* Quick Help Prompts */}
        <div className="px-6 py-2 bg-gray-50/50 border-t border-gray-100 flex gap-2 flex-wrap text-left shrink-0">
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(p)}
              disabled={loading}
              className="text-[10px] font-bold text-blue-600 bg-blue-50/40 border border-blue-100/60 hover:bg-blue-100/40 px-2.5 py-1.5 rounded-lg transition-all"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Chat input box */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-100 flex gap-3 bg-white shrink-0">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={loading}
            placeholder="Ask your AI recruiting assistant anything..."
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder-gray-400"
          />
          <Button 
            type="submit" 
            disabled={loading || !inputText.trim()}
            className="text-xs font-semibold px-4 shadow-sm shrink-0"
          >
            <FiSend className="w-4 h-4" />
          </Button>
        </form>

      </Card>
    </div>
  )
}
