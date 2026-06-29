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
  FiBriefcase} from 'react-icons/fi'
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
    <div className="bg-[#FAFBFC] min-h-screen text-gray-900 overflow-x-hidden selection:bg-blue-100">
      
      {/* Navbar */}
      <header className="border-b border-[#E5E7EB] bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 font-semibold text-lg">
            <div className="w-8 h-8 rounded-lg bg-[#2563EB] flex items-center justify-center text-white font-extrabold text-sm">
              AR
            </div>
            <span className="text-gray-900 font-bold tracking-tight">Recruiter<span className="text-[#2563EB]">.ai</span></span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#pipeline" className="hover:text-gray-950 transition-colors">Intelligence Pipeline</a>
            <a href="#pricing" className="hover:text-gray-950 transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-gray-950 transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link to="/register">
              <Button size="sm">Start Free Trial</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-20 px-6 max-w-7xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#2563EB] text-[10px] font-bold uppercase tracking-wider border border-blue-100 mx-auto">
          <FiCpu className="w-3.5 h-3.5" /> Introducing Multi-Agent Reasoning
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 leading-tight max-w-5xl mx-auto">
          The AI-Native <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Recruiting OS</span>
        </h1>
        <p className="text-sm md:text-base text-gray-500 leading-relaxed max-w-2xl mx-auto font-medium">
          Move beyond manual resume screening. Recruiter.ai uses an advanced multi-agent pipeline to extract Candidate DNA, build Evidence Graphs, and deliver an AI-ranked shortlist instantly.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <Link to="/register">
            <Button className="gap-2 shadow-sm font-semibold">
              Get Started Now <FiArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="outline" className="font-semibold text-gray-700">Explore Workspace Demo</Button>
          </Link>
        </div>
      </section>

      {/* Architecture Visual */}
      <section className="px-6 max-w-6xl mx-auto pb-24">
        <div className="relative rounded-2xl bg-gray-900 border border-gray-800 p-8 shadow-2xl overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-400 via-transparent to-transparent" />
          
          <div className="relative z-10 flex flex-wrap items-center justify-center gap-6">
            
            {/* 1. Job Description */}
            <div className="text-center p-3 w-32">
              <div className="w-12 h-12 rounded-xl bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-400 mx-auto mb-3 shadow-sm">
                <FiLayers className="w-5 h-5" />
              </div>
              <p className="text-[9px] font-bold text-gray-300 uppercase tracking-wider">Job Description</p>
            </div>
            
            <FiArrowRight className="text-gray-700 hidden md:block" />
            
            {/* 2. AI Role Persona */}
            <div className="text-center p-3 w-32">
              <div className="w-12 h-12 rounded-xl bg-gray-800 border border-gray-700 flex items-center justify-center text-blue-400 mx-auto mb-3 shadow-sm">
                <FiBriefcase className="w-5 h-5" />
              </div>
              <p className="text-[9px] font-bold text-gray-300 uppercase tracking-wider">AI Role Persona</p>
            </div>

            <FiArrowRight className="text-gray-700 hidden md:block" />

            {/* 3. Candidate Discovery */}
            <div className="text-center p-3 w-32">
              <div className="w-12 h-12 rounded-xl bg-gray-800 border border-gray-700 flex items-center justify-center text-emerald-400 mx-auto mb-3 shadow-sm">
                <FiSearch className="w-5 h-5" />
              </div>
              <p className="text-[9px] font-bold text-gray-300 uppercase tracking-wider">Candidate Discovery</p>
            </div>

            <FiArrowRight className="text-gray-700 hidden md:block" />

            {/* 4. Candidate DNA */}
            <div className="text-center p-3 w-32">
              <div className="w-12 h-12 rounded-xl bg-gray-800 border border-gray-700 flex items-center justify-center text-purple-400 mx-auto mb-3 shadow-sm">
                <FiZap className="w-5 h-5" />
              </div>
              <p className="text-[9px] font-bold text-gray-300 uppercase tracking-wider">Candidate DNA</p>
            </div>

            <FiArrowRight className="text-gray-700 hidden lg:block" />

            {/* 5. Multi-Agent Reasoning */}
            <div className="text-center p-3 w-32">
              <div className="w-12 h-12 rounded-xl bg-gray-800 border border-gray-700 flex items-center justify-center text-indigo-400 mx-auto mb-3 shadow-sm">
                <FiCpu className="w-5 h-5" />
              </div>
              <p className="text-[9px] font-bold text-gray-300 uppercase tracking-wider">Multi-Agent Reasoning</p>
            </div>

            <FiArrowRight className="text-gray-700 hidden md:block" />

            {/* 6. AI Rankings */}
            <div className="text-center p-3 w-32">
              <div className="w-12 h-12 rounded-xl bg-gray-800 border border-gray-700 flex items-center justify-center text-orange-400 mx-auto mb-3 shadow-sm">
                <FiList className="w-5 h-5" />
              </div>
              <p className="text-[9px] font-bold text-gray-300 uppercase tracking-wider">AI Rankings</p>
            </div>

            <FiArrowRight className="text-gray-700 hidden md:block" />

            {/* 7. Interview Recommendations */}
            <div className="text-center p-3 w-32">
              <div className="w-12 h-12 rounded-xl bg-gray-800 border border-gray-700 flex items-center justify-center text-teal-400 mx-auto mb-3 shadow-sm">
                <FiMessageSquare className="w-5 h-5" />
              </div>
              <p className="text-[9px] font-bold text-gray-300 uppercase tracking-wider">Interview Recommendations</p>
            </div>

            <FiArrowRight className="text-gray-700 hidden md:block" />

            {/* 8. Hiring Decision */}
            <div className="text-center p-3 w-32">
              <div className="w-12 h-12 rounded-xl bg-blue-600 border border-blue-500 flex items-center justify-center text-white mx-auto mb-3 shadow-lg shadow-blue-500/20">
                <FiCheckCircle className="w-5 h-5" />
              </div>
              <p className="text-[9px] font-bold text-blue-200 uppercase tracking-wider">Hiring Decision</p>
            </div>
            
          </div>
        </div>
      </section>

      {/* Pipeline Features Section */}
      <section id="pipeline" className="py-24 bg-white border-y border-[#E5E7EB] px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              The Intelligence Pipeline
            </h2>
            <p className="text-xs text-gray-500 leading-relaxed font-medium">
              We process every applicant through a 4-stage semantic architecture to guarantee high-signal hiring recommendations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card hoverEffect className="p-8 border-gray-200 bg-[#FAFBFC]">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 mb-6">
                <FiZap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-gray-950 mb-3">1. Candidate DNA Extraction</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                Our parsing agent transforms unstructured PDFs and social profiles into a normalized matrix of hard skills, soft skills, and leadership indicators.
              </p>
            </Card>

            <Card hoverEffect className="p-8 border-gray-200 bg-[#FAFBFC]">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100 mb-6">
                <FiActivity className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-gray-950 mb-3">2. Evidence Graph Generation</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                We cross-reference the extracted DNA against GitHub repositories and LinkedIn histories to corroborate claims and highlight contradiction flags.
              </p>
            </Card>

            <Card hoverEffect className="p-8 border-gray-200 bg-[#FAFBFC]">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 mb-6">
                <FiGitCommit className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-gray-950 mb-3">3. AI Hiring Board (Workspaces)</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                Manage campaigns efficiently. Our workspaces aggregate pipeline data, AI insights, and technical assessments into a single command center.
              </p>
            </Card>

            <Card hoverEffect className="p-8 border-gray-200 bg-[#FAFBFC]">
              <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100 mb-6">
                <FiCheckCircle className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-gray-950 mb-3">4. Ranked Candidate Discovery</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                Discover the top 1% of talent instantly. Candidates are ranked objectively based on Match Score, Code Quality, and Career Momentum.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Trusted Companies */}
      <section className="py-12 px-6 text-center border-b border-[#E5E7EB] bg-[#FAFBFC]">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">Engineered for teams scaling at</p>
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center items-center gap-10 md:gap-16 opacity-40 grayscale">
          <span className="font-extrabold text-lg text-gray-800 tracking-tight">STRIPE</span>
          <span className="font-extrabold text-lg text-gray-800 tracking-tight">VERCEL</span>
          <span className="font-extrabold text-lg text-gray-800 tracking-tight">LINEAR</span>
          <span className="font-extrabold text-lg text-gray-800 tracking-tight">OPENAI</span>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-xl mx-auto space-y-4">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Transparent Pricing</h2>
            <p className="text-xs text-gray-500 font-medium">Choose the intelligence tier that fits your company size.</p>
            
            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-1.5 p-1 bg-gray-100 rounded-lg border border-gray-200/50 mt-4">
              <button 
                onClick={() => setBillingPeriod('monthly')}
                className={`px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider transition-all ${
                  billingPeriod === 'monthly' ? 'bg-white text-gray-950 shadow-sm' : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                Monthly
              </button>
              <button 
                onClick={() => setBillingPeriod('annual')}
                className={`px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider transition-all ${
                  billingPeriod === 'annual' ? 'bg-white text-gray-950 shadow-sm' : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                Annual
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Pro */}
            <Card className="flex flex-col justify-between p-8 border-[#2563EB] ring-2 ring-blue-500/10 relative bg-white">
              <div className="absolute top-0 right-6 -translate-y-1/2 bg-[#2563EB] text-white px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider shadow-sm">
                Most Popular
              </div>
              <div className="space-y-4">
                <p className="text-xs font-bold text-[#2563EB] uppercase tracking-wider">Professional</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-gray-950">
                    ${billingPeriod === 'monthly' ? '249' : '199'}
                  </span>
                  <span className="text-xs text-gray-500 font-medium">/mo</span>
                </div>
                <p className="text-xs text-gray-500 font-medium">For scaling hiring teams and recruiting agencies.</p>
                <div className="border-t border-gray-100 my-4" />
                <ul className="space-y-3 text-xs text-gray-600 font-medium">
                  <li className="flex items-center gap-2"><FiCheck className="text-emerald-500 shrink-0" /> Unlimited Candidate DNA Extractions</li>
                  <li className="flex items-center gap-2"><FiCheck className="text-emerald-500 shrink-0" /> Full GitHub & LinkedIn Evidence Graphs</li>
                  <li className="flex items-center gap-2"><FiCheck className="text-emerald-500 shrink-0" /> Custom AI Reasoning Weights</li>
                </ul>
              </div>
              <Link to="/register" className="mt-8">
                <Button className="w-full shadow-sm font-semibold">Start 14-Day Free Trial</Button>
              </Link>
            </Card>

            {/* Enterprise */}
            <Card className="flex flex-col justify-between p-8 border-gray-200 bg-white">
              <div className="space-y-4">
                <p className="text-xs font-bold text-gray-600 uppercase tracking-wider">Enterprise</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-gray-950">Custom</span>
                </div>
                <p className="text-xs text-gray-500 font-medium">For large companies requiring custom SLA & SSO.</p>
                <div className="border-t border-gray-100 my-4" />
                <ul className="space-y-3 text-xs text-gray-600 font-medium">
                  <li className="flex items-center gap-2"><FiCheck className="text-emerald-500 shrink-0" /> Private LLM Deployments</li>
                  <li className="flex items-center gap-2"><FiCheck className="text-emerald-500 shrink-0" /> SAML/SSO Integration</li>
                  <li className="flex items-center gap-2"><FiCheck className="text-emerald-500 shrink-0" /> Dedicated Solutions Architect</li>
                </ul>
              </div>
              <a href="mailto:sales@recruiter.ai" className="mt-8">
                <Button variant="outline" className="w-full font-semibold">Contact Sales</Button>
              </a>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 px-6 bg-white border-t border-[#E5E7EB]">
        <div className="max-w-3xl mx-auto space-y-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 text-center">Technical FAQ</h2>
          
          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx
              return (
                <div key={idx} className="border border-gray-200 rounded-xl bg-[#FAFBFC] overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-xs text-gray-900 hover:bg-gray-100/50 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <FiChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-4 text-xs text-gray-600 leading-relaxed font-medium">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3 font-semibold text-lg text-white">
              <div className="w-8 h-8 rounded-lg bg-[#2563EB] flex items-center justify-center text-white font-extrabold text-sm">
                AR
              </div>
              <span className="tracking-tight">Recruiter.ai</span>
            </div>
            <p className="text-[11px] leading-relaxed font-medium">
              The AI-Native Recruiting OS for engineering teams.
            </p>
          </div>
          <div>
            <h4 className="text-white text-[10px] font-bold uppercase tracking-wider mb-4">Product</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><a href="#pipeline" className="hover:text-white">Pipeline</a></li>
              <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
              <li><Link to="/dashboard" className="hover:text-white">Workspace Demo</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-[10px] font-bold uppercase tracking-wider mb-4">Security</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><a href="#compliance" className="hover:text-white">SOC 2 Compliance</a></li>
              <li><a href="#privacy" className="hover:text-white">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-[10px] font-bold uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><a href="#about" className="hover:text-white">About Us</a></li>
              <li><a href="#careers" className="hover:text-white">Careers</a></li>
            </ul>
          </div>
        </div>
      </footer>

    </div>
  )
}
