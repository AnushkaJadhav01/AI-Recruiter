import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiArrowRight, 
  FiCheck, 
  FiCheckCircle,
  FiCpu,
  FiChevronDown,
  FiZap,
  FiActivity,
  FiGitCommit,
  FiLayers,
  FiSearch,
  FiList,
  FiMessageSquare,
  FiBriefcase,
  FiSliders} from 'react-icons/fi'
import { Button } from '../../components/common/Button'
import { Card } from '../../components/common/Card'

export const LandingPage = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const faqs = [
    {
      q: 'How does the Candidate DNA extraction work?',
      a: 'We use a fine-tuned LLM pipeline to semantically parse resumes and online profiles. It translates unstructured text into a standardized Candidate DNA matrix, evaluating hard skills, soft skills, and career momentum.'
    },
    {
      q: 'What is an Evidence Graph?',
      a: 'The Evidence Graph cross-references claims made on a resume against external data sources (GitHub commits, LinkedIn tenures, public portfolios). It surfaces Corroborated Signals and Contradiction Flags.'
    },
    {
      q: 'Can we adjust the scoring weights for specific roles?',
      a: 'Yes. Every Hiring Workspace allows you to customize the multi-agent reasoning weights. You can heavily weight GitHub code quality for engineering roles, or prioritize communication and leadership for management.'
    },
    {
      q: 'Is candidate and applicant data secure?',
      a: 'We are fully SOC2 Type II compliant. All intelligence reports are encrypted at rest and in transit, and we never use your proprietary hiring data to train public AI models.'
    }
  ]

  return (
    <div className="bg-[#FFF8F4] min-h-screen text-gray-900 overflow-x-hidden selection:bg-blue-100">
      
      {/* Navbar & Hero Section */}
      <div className="relative w-full overflow-hidden">
        {/* Navbar */}
        <div className="absolute top-0 z-50 w-full py-4 text-sm font-semibold transition-colors duration-500">
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
            <div>
              <Link to="/" className="flex items-center gap-3 font-semibold text-lg">
                <img src="/logo.png" alt="NexHire Logo" className="w-8 h-8 rounded-lg object-contain" />
                <span className="text-gray-900 font-bold tracking-tight">NexHire</span>
              </Link>
            </div>
            <div className="md:flex gap-8 hidden text-[#6B7280] font-medium">
              <a href="#how-it-works" className="hover:text-[#F97316] transition-colors">How it Works</a>
              <a href="#features" className="hover:text-[#F97316] transition-colors">Features</a>
              <Link to="/dashboard" className="hover:text-[#F97316] transition-colors">Platform Demo</Link>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/login">
                <button
                  type="button"
                  className="bg-[#FFF2EA] hover:bg-[#FFE8D6] border border-[#F1DDD2] rounded-xl px-5 py-2.5 text-xs font-bold text-[#F97316] transition-all"
                >
                  Sign In
                </button>
              </Link>
              <Link to="/register">
                <button
                  type="button"
                  className="bg-[#F97316] hover:bg-[#EA580C] rounded-xl px-5 py-2.5 text-xs font-bold text-white transition-all shadow-sm"
                >
                  Start Free Trial
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Header Hero Layout */}
        <div className="flex pt-28 w-full xl:pt-16 justify-between min-h-screen items-center flex-wrap px-6 max-w-7xl mx-auto relative z-10">
          <div className="max-w-lg 2xl:max-w-xl text-[#2D2A26] py-12 space-y-6">
          
                 <h1 className="max-w-4xl font-extrabold text-[44px] leading-[50px] tracking-[-0.02em] sm:text-6xl sm:leading-[70px] text-[#2D2A26]">
  Intelligent Screening is The Key of Recruiting Success.
</h1>
            <p className="text-sm md:text-base text-[#6B7280] leading-relaxed">
              Move beyond manual resume screening. NexHire uses an advanced multi-agent pipeline to extract Candidate DNA, build Evidence Graphs, and deliver an AI-ranked shortlist instantly.
            </p>
            <div className="flex items-center flex-wrap gap-4 pt-4">
              <Link to="/register">
                <button className="bg-[#F97316] hover:bg-[#EA580C] flex text-white font-bold w-[170px] h-[54px] rounded-3xl text-sm items-center justify-center transition-all shadow-md">
                  Get Started{' '}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 23 23"
                    fill="none"
                    className="mx-1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="23" height="23" rx="5" fill="#FFE8D6" />
                    <path
                      d="M16.3536 12.3536C16.5488 12.1583 16.5488 11.8417 16.3536 11.6464L13.1716 8.46447C12.9763 8.2692 12.6597 8.2692 12.4645 8.46447C12.2692 8.65973 12.2692 8.97631 12.4645 9.17157L15.2929 12L12.4645 14.8284C12.2692 15.0237 12.2692 15.3403 12.4645 15.5355C12.6597 15.7308 12.9763 15.7308 13.1716 15.5355L16.3536 12.3536ZM7 12.5L16 12.5L16 11.5L7 11.5L7 12.5Z"
                      fill="#2D2A26"
                    />
                  </svg>
                </button>
              </Link>
              <Link to="/dashboard">
                <button className="flex text-[#6B7280] hover:text-[#2D2A26] my-1 sm:my-0 items-center font-bold text-sm transition-colors">
                  <svg
                    width="44"
                    height="44"
                    viewBox="0 0 48 48"
                    fill="none"
                    className="mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="24" cy="24" r="20" fill="#F97316" />
                    <circle cx="24" cy="24" r="20.95" stroke="#F97316" strokeWidth="0.1" />
                    <circle cx="24" cy="24" r="22.95" stroke="#F97316" strokeWidth="0.1" />
                    <circle cx="24" cy="24" r="21.95" stroke="#F97316" strokeWidth="0.1" />
                    <circle cx="24" cy="24" r="23.95" stroke="#F97316" strokeWidth="0.1" />
                    <path
                      d="M31 22.2679C32.3333 23.0377 32.3333 24.9623 31 25.7321L22 30.9282C20.6667 31.698 19 30.7358 19 29.1962L19 18.8038C19 17.2642 20.6667 16.302 22 17.0718L31 22.2679Z"
                      fill="#FFF2E5"
                    />
                  </svg>
                  Explore Platform Demo
                </button>
              </Link>
            </div>
          </div>
          <div className="relative h-full flex justify-center items-center py-12 select-none">
            <img
              src="https://res.cloudinary.com/ddcg0rzlo/image/upload/v1651252781/Hero_mcnozf.png"
              loading="lazy"
              width="500"
              height="500"
              alt="Hero Platform Visual"
              className="relative z-10 top-6 right-0 max-w-full h-auto drop-shadow-xl"
            />
            <div className="absolute -top-6 h-full w-[110%] pointer-events-none flex justify-center items-center z-0">
              <svg
                width="800"
                height="600"
                viewBox="0 0 1100 808"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="opacity-70 transform translate-x-12 scale-90 sm:scale-100"
              >
                <rect x="216" width="884" height="808" rx="60" fill="#FFE8D6" fillOpacity="0.75" />
                <rect y="132" width="501" height="514" rx="60" fill="#FDBA74" fillOpacity="0.75" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Platform Features Section */}
      <section id="features" className="py-24 bg-[#FFF5EF] border-y border-[#F1DDD2] px-6">
        <div className="max-w-7xl mx-auto space-y-16 text-left">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl font-extrabold tracking-tight text-[#2D2A26] sm:text-4xl">
              Features
            </h2>
            <p className="text-xs text-[#6B7280] leading-relaxed font-medium">
              We replace resume claims with corroborated proof. Our platform utilizes advanced autonomous agents to inspect candidate data from every engineering angle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Multi-Agent Assessment */}
            <div className="md:max-w-sm w-full p-5 rounded-2xl shadow-sm bg-white border border-[#F1DDD2] hover:border-[#F97316] transition-all duration-300 hover:transform hover:scale-[1.03] group flex flex-col justify-between">
              <div>
                <div className="mb-3">
                  <span className="inline-block px-2.5 py-0.5 text-[9px] font-bold tracking-wider uppercase bg-[#FFE8D6] text-[#F97316] rounded-full mb-2">
                    Intelligence
                  </span>
                  <h2 className="text-sm font-extrabold text-[#2D2A26] mb-2 group-hover:text-[#F97316] transition-colors duration-200">
                    Multi-Agent Assessment
                  </h2>
                </div>

                <p className="text-[#6B7280] text-[11px] leading-relaxed mb-4">
                  Autonomous recruiter agents run in parallel to review resume metrics, grade complex technical histories, and score candidates objectively.
                </p>
              </div>

              <div className="flex items-center justify-between mt-auto">
                <Link to="/register">
                  <button className="px-3.5 py-1.5 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold rounded-lg transition-colors duration-200 shadow-sm">
                    Get Started
                  </button>
                </Link>
              </div>
            </div>

            {/* Card 2: Evidence Graph */}
            <div className="md:max-w-sm w-full p-5 rounded-2xl shadow-sm bg-white border border-[#F1DDD2] hover:border-[#F97316] transition-all duration-300 hover:transform hover:scale-[1.03] group flex flex-col justify-between">
              <div>
                <div className="mb-3">
                  <span className="inline-block px-2.5 py-0.5 text-[9px] font-bold tracking-wider uppercase bg-[#FFE8D6] text-[#F97316] rounded-full mb-2">
                    Verification
                  </span>
                  <h2 className="text-sm font-extrabold text-[#2D2A26] mb-2 group-hover:text-[#F97316] transition-colors duration-200">
                    Evidence Graph Verification
                  </h2>
                </div>

                <p className="text-[#6B7280] text-[11px] leading-relaxed mb-4">
                  Automatically audits public code repos, validating commit frequencies, structural code patterns, and career tenures to filter out inflated claims.
                </p>
              </div>

              <div className="flex items-center justify-between mt-auto">
                <Link to="/register">
                  <button className="px-3.5 py-1.5 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold rounded-lg transition-colors duration-200 shadow-sm">
                    Get Started
                  </button>
                </Link>
              </div>
            </div>

            {/* Card 3: Custom Workspace Tuning */}
            <div className="md:max-w-sm w-full p-5 rounded-2xl shadow-sm bg-white border border-[#F1DDD2] hover:border-[#F97316] transition-all duration-300 hover:transform hover:scale-[1.03] group flex flex-col justify-between">
              <div>
                <div className="mb-3">
                  <span className="inline-block px-2.5 py-0.5 text-[9px] font-bold tracking-wider uppercase bg-[#FFE8D6] text-[#F97316] rounded-full mb-2">
                    Tuning
                  </span>
                  <h2 className="text-sm font-extrabold text-[#2D2A26] mb-2 group-hover:text-[#F97316] transition-colors duration-200">
                    Custom Workspace Tuning
                  </h2>
                </div>

                <p className="text-[#6B7280] text-[11px] leading-relaxed mb-4">
                  Tailor candidate ranking formulas to your hiring needs. Adjust scoring weights for systems engineering, front-end development, or systems leadership.
                </p>
              </div>

              <div className="flex items-center justify-between mt-auto">
                <Link to="/register">
                  <button className="px-3.5 py-1.5 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold rounded-lg transition-colors duration-200 shadow-sm">
                    Get Started
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl font-extrabold tracking-tight text-[#2D2A26] sm:text-4xl">
              How NexHire Works
            </h2>
            <p className="text-sm text-[#6B7280] leading-relaxed font-medium">
              A seamless pipeline from candidate sourcing to final decision.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Step 1 */}
            <div className="relative p-6 bg-[#FFF8F4] rounded-2xl border border-[#F1DDD2] text-center hover:-translate-y-1 transition-transform duration-300">
              <div className="w-12 h-12 mx-auto bg-[#F97316] text-white rounded-xl flex items-center justify-center font-bold text-xl mb-4 shadow-md">1</div>
              <h3 className="text-sm font-bold text-[#2D2A26] mb-2">Connect Sources</h3>
              <p className="text-[11px] text-[#6B7280]">Integrate with GitHub, LinkedIn, and your ATS to gather candidate data.</p>
            </div>
            {/* Step 2 */}
            <div className="relative p-6 bg-[#FFF8F4] rounded-2xl border border-[#F1DDD2] text-center hover:-translate-y-1 transition-transform duration-300">
              <div className="w-12 h-12 mx-auto bg-[#F97316] text-white rounded-xl flex items-center justify-center font-bold text-xl mb-4 shadow-md">2</div>
              <h3 className="text-sm font-bold text-[#2D2A26] mb-2">Extract DNA</h3>
              <p className="text-[11px] text-[#6B7280]">Our AI evaluates skills, career momentum, and hard data points instantly.</p>
            </div>
            {/* Step 3 */}
            <div className="relative p-6 bg-[#FFF8F4] rounded-2xl border border-[#F1DDD2] text-center hover:-translate-y-1 transition-transform duration-300">
              <div className="w-12 h-12 mx-auto bg-[#F97316] text-white rounded-xl flex items-center justify-center font-bold text-xl mb-4 shadow-md">3</div>
              <h3 className="text-sm font-bold text-[#2D2A26] mb-2">AI Ranking</h3>
              <p className="text-[11px] text-[#6B7280]">Candidates are objectively scored and ranked against your custom parameters.</p>
            </div>
            {/* Step 4 */}
            <div className="relative p-6 bg-[#FFF8F4] rounded-2xl border border-[#F1DDD2] text-center hover:-translate-y-1 transition-transform duration-300">
              <div className="w-12 h-12 mx-auto bg-[#F97316] text-white rounded-xl flex items-center justify-center font-bold text-xl mb-4 shadow-md">4</div>
              <h3 className="text-sm font-bold text-[#2D2A26] mb-2">Hire Smarter</h3>
              <p className="text-[11px] text-[#6B7280]">Review the corroborated evidence graph and make confident decisions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-[#F97316] to-[#EA580C] px-6 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="max-w-3xl mx-auto space-y-8 relative z-10">
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Ready to Hire Smarter?
          </h2>
          <p className="text-base text-orange-100 font-medium max-w-xl mx-auto">
            Join thousands of modern recruiting teams using AI to find the perfect candidate faster than ever.
          </p>
          <div className="pt-4">
            <Link to="/register">
              <button className="bg-white text-[#EA580C] hover:bg-orange-50 px-8 py-3.5 rounded-full font-bold text-sm transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                Start Your Free Trial
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2D2A26] text-[#D6D3D1] pt-16 pb-8 px-6 border-t border-white/10 text-xs font-semibold select-none text-left">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-white/10">
          {/* Logo Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 font-semibold text-lg text-white">
              <img src="/logo.png" alt="NexHire Logo" className="w-8 h-8 rounded-lg object-contain" />
              <span className="tracking-tight font-bold">NexHire</span>
            </div>
            <p className="text-[11px] leading-relaxed text-[#D6D3D1] font-medium max-w-xs">
              Next-generation talent intelligence platform leveraging multi-agent evaluation pipelines to extract Candidate DNA and evidence validation.
            </p>
          </div>

          {/* Platform Column */}
          <div>
            <h4 className="text-white text-[10px] font-bold uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><a href="#features" className="hover:text-[#FDBA74] transition-colors">Core Capabilities</a></li>
              <li><Link to="/dashboard" className="hover:text-[#FDBA74] transition-colors">Workspace Demo</Link></li>
              <li><Link to="/register" className="hover:text-[#FDBA74] transition-colors">Get Started</Link></li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="text-white text-[10px] font-bold uppercase tracking-wider mb-4">Security & Legal</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><span className="text-[#D6D3D1] cursor-default">SOC 2 Type II Certified</span></li>
              <li><span className="text-[#D6D3D1] cursor-default">Privacy Policy</span></li>
              <li><span className="text-[#D6D3D1] cursor-default">Terms of Service</span></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-4">
            <h4 className="text-white text-[10px] font-bold uppercase tracking-wider mb-2">Stay Connected</h4>
            <p className="text-[10px] text-[#D6D3D1] font-medium leading-relaxed">
              Subscribe to receive insights on AI hiring trends and technical screening standards.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter email address"
                className="flex-1 bg-white/10 border border-white/15 px-3 py-2 rounded-lg text-white placeholder-[#D6D3D1] outline-none text-xs focus:ring-1 focus:ring-[#F97316] focus:border-[#F97316] transition-all"
              />
              <button className="bg-[#F97316] hover:bg-[#EA580C] text-white px-3 py-2 rounded-lg text-xs font-bold transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-[10px]">
          <div>
            <p>© 2026 NexHire. All rights reserved. Enterprise Recruiting Intelligence.</p>
          </div>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-[#FDBA74] transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-[#FDBA74] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
