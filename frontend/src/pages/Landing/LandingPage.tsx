import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { 
  FiArrowRight, 
  FiCheckCircle,
  FiCpu,
  FiGitCommit,
  FiSliders,
  FiMenu,
  FiX,
  FiSearch,
  FiZap
} from 'react-icons/fi'

export const LandingPage = () => {
  // PRESERVED: Existing state variables (billingPeriod, openFaq unused in snippet but kept for completeness if needed later)
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly')
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  
  // ADDED: Mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // ADDED: Framer Motion hooks for scroll and accessibility
  const { scrollY } = useScroll()
  const isReducedMotion = useReducedMotion()

  // ADDED: Navbar condense and glassmorphic effect
  const navPadding = useTransform(scrollY, [0, 50], ["1.5rem", "0.75rem"])
  const navBackground = useTransform(
    scrollY, 
    [0, 50], 
    ["rgba(255, 248, 244, 0)", "rgba(255, 248, 244, 0.85)"]
  )
  const navBackdropBlur = useTransform(scrollY, [0, 50], ["blur(0px)", "blur(12px)"])
  const navBorderColor = useTransform(scrollY, [0, 50], ["rgba(241, 221, 210, 0)", "rgba(241, 221, 210, 0.5)"])

  // ADDED: Hero Parallax effect
  const heroParallaxY = useTransform(scrollY, [0, 800], [0, 200])

  // ADDED: Scroll reveal variants
  const fadeInUp = {
    hidden: { opacity: 0, y: isReducedMotion ? 0 : 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  // ADDED: Hero Visual Floating Animation
  const floatAnimation = isReducedMotion ? {} : {
    y: [-12, 12, -12],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }

  return (
    <div className="bg-[#FFF8F4] min-h-screen text-gray-900 overflow-x-hidden selection:bg-blue-100">
      
      {/* Navbar & Hero Section */}
      <div className="relative w-full overflow-hidden">
        {/* ADDED: motion.div for Navbar to support condensing on scroll + backdrop blur */}
        <motion.div 
          className="fixed top-0 z-50 w-full text-sm font-semibold border-b transition-colors duration-200"
          style={{ 
            paddingTop: isReducedMotion ? "1rem" : navPadding, 
            paddingBottom: isReducedMotion ? "1rem" : navPadding, 
            backgroundColor: isReducedMotion ? "rgba(255, 248, 244, 0.95)" : navBackground,
            backdropFilter: isReducedMotion ? "none" : navBackdropBlur,
            WebkitBackdropFilter: isReducedMotion ? "none" : navBackdropBlur,
            borderBottomColor: navBorderColor
          }}
        >
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
            <div>
              {/* PRESERVED: Logo and Title */}
              <Link to="/" className="flex items-center gap-3 font-semibold text-lg">
                <img src="/logo.png" alt="NexHire Logo" className="w-8 h-8 rounded-lg object-contain" />
                <span className="text-gray-900 font-bold tracking-tight">NexHire</span>
              </Link>
            </div>
            {/* PRESERVED: Desktop Links */}
            <div className="md:flex gap-8 hidden text-[#6B7280] font-medium">
              <a href="#how-it-works" className="hover:text-[#F97316] transition-colors">How it Works</a>
              <a href="#features" className="hover:text-[#F97316] transition-colors">Features</a>
              <Link to="/dashboard" className="hover:text-[#F97316] transition-colors">Platform Demo</Link>
            </div>
            {/* PRESERVED: CTA Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Link to="/login">
                <button
                  type="button"
                  className="bg-[#FFF2EA] hover:bg-[#FFE8D6] border border-[#F1DDD2] rounded-xl px-5 py-2.5 text-xs font-bold text-[#F97316] transition-all"
                >
                  Sign In
                </button>
              </Link>
              <Link to="/register">
                {/* ADDED: Subtle hover lift for CTA */}
                <button
                  type="button"
                  className="bg-[#F97316] hover:bg-[#EA580C] rounded-xl px-5 py-2.5 text-xs font-bold text-white transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
                >
                  Start Free Trial
                </button>
              </Link>
            </div>
            {/* ADDED: Mobile Menu Toggle */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-[#2D2A26] text-2xl focus:outline-none"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <FiX /> : <FiMenu />}
              </button>
            </div>
          </div>
        </motion.div>

        {/* ADDED: Mobile Menu Dropdown with AnimatePresence */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="fixed top-[60px] left-0 w-full bg-[#FFF8F4]/95 backdrop-blur-xl border-b border-[#F1DDD2] z-40 md:hidden flex flex-col px-6 py-6 gap-5 shadow-lg"
            >
              <a href="#how-it-works" className="text-[#6B7280] font-medium hover:text-[#F97316] text-base" onClick={() => setIsMobileMenuOpen(false)}>How it Works</a>
              <a href="#features" className="text-[#6B7280] font-medium hover:text-[#F97316] text-base" onClick={() => setIsMobileMenuOpen(false)}>Features</a>
              <Link to="/dashboard" className="text-[#6B7280] font-medium hover:text-[#F97316] text-base" onClick={() => setIsMobileMenuOpen(false)}>Platform Demo</Link>
              <div className="flex flex-col gap-3 pt-4 border-t border-[#F1DDD2]">
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <button className="w-full bg-[#FFF2EA] border border-[#F1DDD2] rounded-xl px-5 py-3 text-sm font-bold text-[#F97316]">Sign In</button>
                </Link>
                <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                  <button className="w-full bg-[#F97316] rounded-xl px-5 py-3 text-sm font-bold text-white shadow-sm">Start Free Trial</button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header Hero Layout */}
        <div className="flex pt-32 xl:pt-20 justify-between min-h-screen items-center flex-wrap px-6 max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-lg 2xl:max-w-xl text-[#2D2A26] py-12 space-y-6"
          >
            {/* PRESERVED: Exact headline and copy, wrapped in motion variants */}
            <motion.h1 
              variants={fadeInUp}
              className="max-w-4xl font-extrabold text-[44px] leading-[50px] tracking-[-0.02em] sm:text-6xl sm:leading-[70px] text-[#2D2A26]"
            >
              Intelligent Screening is The Key of Recruiting Success.
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              className="text-sm md:text-base text-[#6B7280] leading-relaxed"
            >
              Move beyond manual resume screening. NexHire uses an advanced multi-agent pipeline to extract Candidate DNA, build Evidence Graphs, and deliver an AI-ranked shortlist instantly.
            </motion.p>
            <motion.div 
              variants={fadeInUp}
              className="flex items-center flex-wrap gap-4 pt-4"
            >
              <Link to="/register">
                {/* ADDED: React Icon instead of inline SVG */}
                <button className="bg-[#F97316] hover:bg-[#EA580C] flex text-white font-bold w-[170px] h-[54px] rounded-3xl text-sm items-center justify-center transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
                  Get Started{' '}
                  <FiArrowRight className="mx-2 text-lg text-[#FFE8D6]" />
                </button>
              </Link>
              <Link to="/dashboard">
                {/* ADDED: Clean FiSearch icon instead of massive concentric circle SVG */}
                <button className="flex text-[#6B7280] hover:text-[#F97316] my-1 sm:my-0 items-center font-bold text-sm transition-colors group">
                  <span className="flex items-center justify-center w-11 h-11 rounded-full bg-[#FFF2E5] text-[#F97316] mr-3 group-hover:bg-[#FFE8D6] transition-colors">
                    <FiSearch className="text-xl" />
                  </span>
                  Explore Platform Demo
                </button>
              </Link>
            </motion.div>
          </motion.div>
          
          <div className="relative h-full flex justify-center items-center py-12 select-none">
            {/* ADDED: Float animation on hero image */}
            <motion.div
              animate={floatAnimation}
              className="relative z-10"
            >
              <img
                src="https://res.cloudinary.com/ddcg0rzlo/image/upload/v1651252781/Hero_mcnozf.png"
                loading="lazy"
                width="500"
                height="500"
                alt="Hero Platform Visual"
                className="relative z-10 top-6 right-0 max-w-full h-auto drop-shadow-2xl"
              />
            </motion.div>
            
            {/* ADDED: Parallax scrolling effect on background decoration */}
            <motion.div 
              style={{ y: isReducedMotion ? 0 : heroParallaxY }}
              className="absolute -top-6 h-full w-[110%] pointer-events-none flex justify-center items-center z-0"
            >
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
            </motion.div>
          </div>
        </div>
      </div>

      {/* Platform Features Section */}
      {/* ADDED: Scroll reveal wrap */}
      <motion.section 
        id="features" 
        className="py-24 bg-[#FFF5EF] border-y border-[#F1DDD2] px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto space-y-16 text-left">
          <motion.div variants={fadeInUp} className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl font-extrabold tracking-tight text-[#2D2A26] sm:text-4xl">
              Features
            </h2>
            <p className="text-xs text-[#6B7280] leading-relaxed font-medium">
              We replace resume claims with corroborated proof. Our platform utilizes advanced autonomous agents to inspect candidate data from every engineering angle.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Multi-Agent Assessment */}
            {/* ADDED: hover shadow glow, hover:-translate-y-1 */}
            <motion.div 
              variants={fadeInUp}
              className="md:max-w-sm w-full p-6 rounded-2xl shadow-sm bg-white border border-[#F1DDD2] hover:border-[#F97316] hover:shadow-[0_8px_30px_rgb(249,115,22,0.12)] transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between"
            >
              <div>
                <div className="mb-4">
                  {/* ADDED: React Icon in badge */}
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase bg-[#FFE8D6] text-[#F97316] rounded-full mb-3">
                    <FiCpu /> Intelligence
                  </span>
                  <h2 className="text-base font-extrabold text-[#2D2A26] mb-2 group-hover:text-[#F97316] transition-colors duration-200">
                    Multi-Agent Assessment
                  </h2>
                </div>

                <p className="text-[#6B7280] text-xs leading-relaxed mb-4">
                  Autonomous recruiter agents run in parallel to review resume metrics, grade complex technical histories, and score candidates objectively.
                </p>
              </div>

              <div className="flex items-center justify-between mt-auto pt-4">
                <Link to="/register">
                  <button className="flex items-center gap-1.5 px-4 py-2 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold rounded-lg transition-colors duration-200 shadow-sm">
                    Get Started <FiArrowRight />
                  </button>
                </Link>
              </div>
            </motion.div>

            {/* Card 2: Evidence Graph */}
            <motion.div 
              variants={fadeInUp}
              className="md:max-w-sm w-full p-6 rounded-2xl shadow-sm bg-white border border-[#F1DDD2] hover:border-[#F97316] hover:shadow-[0_8px_30px_rgb(249,115,22,0.12)] transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between"
            >
              <div>
                <div className="mb-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase bg-[#FFE8D6] text-[#F97316] rounded-full mb-3">
                    <FiGitCommit /> Verification
                  </span>
                  <h2 className="text-base font-extrabold text-[#2D2A26] mb-2 group-hover:text-[#F97316] transition-colors duration-200">
                    Evidence Graph Verification
                  </h2>
                </div>

                <p className="text-[#6B7280] text-xs leading-relaxed mb-4">
                  Automatically audits public code repos, validating commit frequencies, structural code patterns, and career tenures to filter out inflated claims.
                </p>
              </div>

              <div className="flex items-center justify-between mt-auto pt-4">
                <Link to="/register">
                  <button className="flex items-center gap-1.5 px-4 py-2 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold rounded-lg transition-colors duration-200 shadow-sm">
                    Get Started <FiArrowRight />
                  </button>
                </Link>
              </div>
            </motion.div>

            {/* Card 3: Custom Workspace Tuning */}
            <motion.div 
              variants={fadeInUp}
              className="md:max-w-sm w-full p-6 rounded-2xl shadow-sm bg-white border border-[#F1DDD2] hover:border-[#F97316] hover:shadow-[0_8px_30px_rgb(249,115,22,0.12)] transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between"
            >
              <div>
                <div className="mb-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase bg-[#FFE8D6] text-[#F97316] rounded-full mb-3">
                    <FiSliders /> Tuning
                  </span>
                  <h2 className="text-base font-extrabold text-[#2D2A26] mb-2 group-hover:text-[#F97316] transition-colors duration-200">
                    Custom Workspace Tuning
                  </h2>
                </div>

                <p className="text-[#6B7280] text-xs leading-relaxed mb-4">
                  Tailor candidate ranking formulas to your hiring needs. Adjust scoring weights for systems engineering, front-end development, or systems leadership.
                </p>
              </div>

              <div className="flex items-center justify-between mt-auto pt-4">
                <Link to="/register">
                  <button className="flex items-center gap-1.5 px-4 py-2 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold rounded-lg transition-colors duration-200 shadow-sm">
                    Get Started <FiArrowRight />
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* How it Works Section */}
      <motion.section 
        id="how-it-works" 
        className="py-24 bg-white px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto space-y-16">
          <motion.div variants={fadeInUp} className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl font-extrabold tracking-tight text-[#2D2A26] sm:text-4xl">
              How NexHire Works
            </h2>
            <p className="text-sm text-[#6B7280] leading-relaxed font-medium">
              A seamless pipeline from candidate sourcing to final decision.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Step 1 */}
            <motion.div variants={fadeInUp} className="relative p-6 bg-[#FFF8F4] rounded-2xl border border-[#F1DDD2] text-center hover:-translate-y-1 hover:border-[#F97316] transition-all duration-300 group">
              <div className="w-12 h-12 mx-auto bg-[#F97316] text-white rounded-xl flex items-center justify-center font-bold text-xl mb-4 shadow-md group-hover:scale-110 transition-transform">1</div>
              <h3 className="text-sm font-bold text-[#2D2A26] mb-2 group-hover:text-[#F97316] transition-colors">Connect Sources</h3>
              <p className="text-[11px] text-[#6B7280]">Integrate with GitHub, LinkedIn, and your ATS to gather candidate data.</p>
            </motion.div>
            {/* Step 2 */}
            <motion.div variants={fadeInUp} className="relative p-6 bg-[#FFF8F4] rounded-2xl border border-[#F1DDD2] text-center hover:-translate-y-1 hover:border-[#F97316] transition-all duration-300 group">
              <div className="w-12 h-12 mx-auto bg-[#F97316] text-white rounded-xl flex items-center justify-center font-bold text-xl mb-4 shadow-md group-hover:scale-110 transition-transform">2</div>
              <h3 className="text-sm font-bold text-[#2D2A26] mb-2 group-hover:text-[#F97316] transition-colors">Extract DNA</h3>
              <p className="text-[11px] text-[#6B7280]">Our AI evaluates skills, career momentum, and hard data points instantly.</p>
            </motion.div>
            {/* Step 3 */}
            <motion.div variants={fadeInUp} className="relative p-6 bg-[#FFF8F4] rounded-2xl border border-[#F1DDD2] text-center hover:-translate-y-1 hover:border-[#F97316] transition-all duration-300 group">
              <div className="w-12 h-12 mx-auto bg-[#F97316] text-white rounded-xl flex items-center justify-center font-bold text-xl mb-4 shadow-md group-hover:scale-110 transition-transform">3</div>
              <h3 className="text-sm font-bold text-[#2D2A26] mb-2 group-hover:text-[#F97316] transition-colors">AI Ranking</h3>
              <p className="text-[11px] text-[#6B7280]">Candidates are objectively scored and ranked against your custom parameters.</p>
            </motion.div>
            {/* Step 4 */}
            <motion.div variants={fadeInUp} className="relative p-6 bg-[#FFF8F4] rounded-2xl border border-[#F1DDD2] text-center hover:-translate-y-1 hover:border-[#F97316] transition-all duration-300 group">
              <div className="w-12 h-12 mx-auto bg-[#F97316] text-white rounded-xl flex items-center justify-center font-bold text-xl mb-4 shadow-md group-hover:scale-110 transition-transform">4</div>
              <h3 className="text-sm font-bold text-[#2D2A26] mb-2 group-hover:text-[#F97316] transition-colors">Hire Smarter</h3>
              <p className="text-[11px] text-[#6B7280]">Review the corroborated evidence graph and make confident decisions.</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="py-24 bg-gradient-to-br from-[#F97316] to-[#EA580C] px-6 text-center text-white relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
      >
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <motion.div variants={fadeInUp} className="max-w-3xl mx-auto space-y-8 relative z-10">
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Ready to Hire Smarter?
          </h2>
          <p className="text-base text-orange-100 font-medium max-w-xl mx-auto">
            Join thousands of modern recruiting teams using AI to find the perfect candidate faster than ever.
          </p>
          <div className="pt-4">
            <Link to="/register">
              <button className="bg-white text-[#EA580C] hover:bg-orange-50 px-8 py-3.5 rounded-full font-bold text-sm transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center gap-2 mx-auto">
                Start Your Free Trial <FiZap />
              </button>
            </Link>
          </div>
        </motion.div>
      </motion.section>

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
              {/* ADDED: Icon for SOC2 */}
              <li><span className="text-[#D6D3D1] cursor-default flex items-center gap-1.5"><FiCheckCircle className="text-[#F97316]"/> SOC 2 Type II Certified</span></li>
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
