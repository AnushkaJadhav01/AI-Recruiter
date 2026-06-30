import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  FiTrendingUp, 
  FiCpu, 
  FiCheckCircle, 
  FiAlertCircle, 
  FiArrowRight, 
  FiAward,
  FiBookOpen,
  FiClock
} from 'react-icons/fi'
import { Card } from '../../components/common/Card'
import { Button } from '../../components/common/Button'
import { Badge } from '../../components/common/Badge'

export const SkillGapPage = () => {
  const [targetRole, setTargetRole] = useState("Senior Full-Stack Developer")

  const skillsData: Record<string, {
    matched: string[];
    missing: string[];
    recommendations: { course: string; platform: string; time: string; reason: string }[];
    roadmap: { phase: string; title: string; desc: string; duration: string }[];
  }> = {
    "Senior Full-Stack Developer": {
      matched: ["React", "Node.js", "Express", "PostgreSQL", "Tailwind CSS", "AWS"],
      missing: ["Framer Motion", "GraphQL", "System Design Patterns"],
      recommendations: [
        { course: "Framer Motion Complete Course", platform: "Frontend Masters", time: "12 hours", reason: "Directly bridges the missing animation skills required for our SaaS Dashboard interface." },
        { course: "Designing Data-Intensive Applications Guide", platform: "O'Reilly Media", time: "25 hours", reason: "Strengthens microservices queries, load balancing, and SQL indexing patterns." },
        { course: "GraphQL API Development and Schemas", platform: "Apollo Odyssey", time: "8 hours", reason: "Adds modern API gateway routing to support our dashboard state patterns." }
      ],
      roadmap: [
        { phase: "Phase 1", title: "Mastering Framer Motion", desc: "Build layouts with layoutId, animate layout changes, and optimize render cycles.", duration: "1 week" },
        { phase: "Phase 2", title: "API Federation & GraphQL", desc: "Understand Apollo Client, state federation, schema stitchings, and queries resolution.", duration: "2 weeks" },
        { phase: "Phase 3", title: "System Design Auditing", desc: "Re-architect caching layers with Redis, optimize query tables index, and load balance nodes.", duration: "2 weeks" }
      ]
    },
    "AI/ML Research Engineer": {
      matched: ["React", "AWS"],
      missing: ["Python", "PyTorch", "Transformers", "LLMs", "FastAPI"],
      recommendations: [
        { course: "Deep Learning Specialization", platform: "Coursera", time: "40 hours", reason: "Covers ML models, parameter adjustments, and standard PyTorch architectures." },
        { course: "Hugging Face Transformers Masterclass", platform: "Hugging Face", time: "15 hours", reason: "Teaches tokenization, fine-tunings, and model fine alignments." }
      ],
      roadmap: [
        { phase: "Phase 1", title: "Python Core & FastAPI", desc: "Learn type hints, async endpoints, Pydantic data schemas, and clean routers.", duration: "2 weeks" },
        { phase: "Phase 2", title: "PyTorch & Transformers", desc: "Develop tensor operations, gradient descents, and transformer pipeline structures.", duration: "3 weeks" },
        { phase: "Phase 3", title: "LLM Fine-tuning & Scales", desc: "Perform weights adapters fine tuning (LoRA), quantization, and hosting endpoints.", duration: "4 weeks" }
      ]
    }
  }

  const data = skillsData[targetRole] || skillsData["Senior Full-Stack Developer"]

  return (
    <div className="space-y-6 text-left max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
            <FiTrendingUp className="text-blue-600" />
            Skill Gap & Learning Roadmap
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Compare your profile skills against target role requirements and explore customized courses to bridge gaps.
          </p>
        </div>

        {/* Target role dropdown */}
        <div className="text-left w-full sm:max-w-xs shrink-0">
          <select
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            className="block w-full rounded-lg border border-gray-300 text-xs px-3 py-2 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
          >
            <option value="Senior Full-Stack Developer">Senior Full-Stack Developer</option>
            <option value="AI/ML Research Engineer">AI/ML Research Engineer</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column (1 col): Skill Matches & Gaps */}
        <div className="space-y-6">
          <Card className="p-6 bg-white border border-gray-200 shadow-sm space-y-6">
            <h3 className="font-extrabold text-sm text-gray-900 tracking-wide">Target Role Fit</h3>
            
            {/* Fit Score Progress */}
            <div className="text-center space-y-2">
              <span className="text-4xl font-extrabold tracking-tight text-blue-600">
                {Math.round((data.matched.length / (data.matched.length + data.missing.length)) * 100)}%
              </span>
              <p className="text-[10px] text-gray-400 font-bold uppercase">Role Skill Compatibility</p>
            </div>

            <div className="border-t border-gray-100 my-4" />

            {/* Matched list */}
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Matched Skills</label>
              <div className="flex flex-wrap gap-1.5">
                {data.matched.map((s, i) => (
                  <span key={i} className="px-2 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-bold flex items-center gap-1">
                    <FiCheckCircle className="w-3 h-3 text-emerald-600" /> {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-100 my-4" />

            {/* Missing list */}
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Missing Skills (Gaps)</label>
              <div className="flex flex-wrap gap-1.5">
                {data.missing.map((s, i) => (
                  <span key={i} className="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-800 rounded-lg text-xs font-bold flex items-center gap-1">
                    <FiAlertCircle className="w-3 h-3 text-amber-500" /> {s}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column (2 cols): Recommendations & Roadmap */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Courses */}
          <Card className="p-6 bg-white border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-extrabold text-sm text-gray-900 tracking-wide flex items-center gap-2">
              <FiBookOpen className="text-gray-400" /> AI-Recommended Courses
            </h3>
            
            <div className="space-y-4">
              {data.recommendations.map((rec, idx) => (
                <div key={idx} className="p-4 border border-gray-100 rounded-xl bg-gray-50/50 space-y-2 text-xs">
                  <div className="flex justify-between items-center flex-wrap gap-1">
                    <h4 className="font-extrabold text-gray-950">{rec.course}</h4>
                    <span className="text-[10px] text-gray-400 font-bold uppercase flex items-center gap-1">
                      <FiClock className="w-3.5 h-3.5" /> {rec.time}
                    </span>
                  </div>
                  <p className="text-[10px] font-bold text-blue-600 uppercase">{rec.platform}</p>
                  <p className="text-gray-600 leading-relaxed font-semibold mt-1">
                    <span className="text-blue-600 font-bold">Why take:</span> {rec.reason}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* Roadmap */}
          <Card className="p-6 bg-white border border-gray-200 shadow-sm">
            <h3 className="font-extrabold text-sm text-gray-900 mb-6 tracking-wide flex items-center gap-2">
              <FiAward className="text-gray-400" /> Recommended Study Roadmap
            </h3>

            <div className="relative border-l border-gray-200 pl-6 ml-3 space-y-6">
              {data.roadmap.map((step, idx) => (
                <div key={idx} className="relative text-xs">
                  {/* Timeline dot */}
                  <span className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-blue-600 border-4 border-white shadow-sm" />
                  
                  <div className="space-y-1 text-left">
                    <div className="flex justify-between items-start flex-wrap gap-1">
                      <h4 className="font-extrabold text-sm text-gray-950">{step.title}</h4>
                      <Badge variant="primary" className="text-[9px] font-bold uppercase tracking-wider">{step.duration}</Badge>
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{step.phase}</span>
                    <p className="text-gray-600 leading-relaxed font-semibold mt-1">{step.desc}</p>
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
