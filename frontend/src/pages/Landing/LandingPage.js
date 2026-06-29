import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  IoCheckmarkCircle, IoArrowForward, IoCodeSlashOutline, IoLogoGithub, 
  IoLogoLinkedin, IoShieldCheckmarkOutline, IoSparkles, IoStatsChart,
  IoDocumentTextOutline, IoCloudUploadOutline, IoRibbonOutline
} from 'react-icons/io5';
import Button from '../../components/common/Button';
import Accordion from '../../components/common/Accordion';
import Card from '../../components/common/Card';

const LandingPage = () => {
  const navigate = useNavigate();
  const [selectedWorkflowStep, setSelectedWorkflowStep] = useState(0);

  const workflowSteps = [
    { title: '1. Upload Job Description', desc: 'Paste or upload a job description. The AI instantly identifies core skills, experience brackets, and nice-to-have capabilities.' },
    { title: '2. Source Candidates', desc: 'Drag-and-drop resumes, or provide candidates\' GitHub and LinkedIn links. The parser extracts profiles instantly.' },
    { title: '3. Deep Analytics Sourcing', desc: 'The AI crawls GitHub repositories and LinkedIn timelines, scoring code quality, project complexity, and career progression.' },
    { title: '4. AI Matching & Ranking', desc: 'Get a clear rank of candidates with a detailed confidence score, fit explanation, and interview question list.' }
  ];

  const features = [
    {
      title: 'Automated Resume Parsing',
      desc: 'Extract work history, education, skills, and certifications instantly without formatting errors.',
      icon: IoSparkles,
      color: 'text-blue-500 bg-blue-50'
    },
    {
      title: 'GitHub & Code Analysis',
      desc: 'Evaluate public repository quality, language distributions, contribution consistency, and project complexity.',
      icon: IoCodeSlashOutline,
      color: 'text-cyan-500 bg-cyan-50'
    },
    {
      title: 'LinkedIn Growth Crawling',
      desc: 'Scan job changes, career trajectory consistency, company prestige levels, and peer recommendations.',
      icon: IoLogoLinkedin,
      color: 'text-indigo-500 bg-indigo-50'
    },
    {
      title: 'Skill Gap Visualizations',
      desc: 'Understand exactly what requirements candidates match and what skills require closer checking in interviews.',
      icon: IoStatsChart,
      color: 'text-amber-500 bg-amber-50'
    }
  ];

  const statistics = [
    { value: '10x', label: 'Faster Sourcing Speed' },
    { value: '88%', label: 'Recruitment Cost Saved' },
    { value: '94%', label: 'Candidate Fit Accuracy' },
    { value: '25hrs', label: 'Saved per Recruiter Weekly' }
  ];

  const testimonials = [
    {
      quote: "AI Recruiter completely transformed how our team recruits developers. The GitHub quality scores are highly accurate, saving our tech leads hours of manual review.",
      author: "Julienne Adams",
      role: "VP of Talent at Vercel Partner Agency",
      avatar: "JA"
    },
    {
      quote: "The Skill Gap Analysis and generated interview questions take all the guesswork out of first-round candidate screenings. Excellent tool!",
      author: "Devon Marcus",
      role: "Lead Recruiter at Linear Technologies",
      avatar: "DM"
    }
  ];

  const faqs = [
    {
      title: "How does the GitHub analysis score work?",
      content: "Our AI engine scans public repositories, evaluates contribution consistency (commit history), analyzes primary programming language distributions, and scores codebase architecture quality using modularity and testing indicators."
    },
    {
      title: "Can I use AI Recruiter with my current Applicant Tracking System?",
      content: "Yes, AI Recruiter is designed with external APIs in mind. You can sync candidates, export rankings, and download detailed evaluation summaries straight into systems like Greenhouse, Ashby, and Lever."
    },
    {
      title: "Is candidate data kept secure?",
      content: "Data security is our primary focus. We strictly adhere to SOC2 guidelines, candidate data is fully encrypted at rest and in transit, and resumes are never used to train public LLM foundation models."
    }
  ];

  return (
    <div className="bg-[#F8FAFC] dark:bg-slate-950 text-[#0F172A] dark:text-slate-100 min-h-screen">
      {/* Navbar */}
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between border-b border-slate-150 dark:border-slate-800">
        <div className="flex items-center gap-2.5 font-bold text-sm text-textPrimary">
          <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center text-white">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="text-textPrimary dark:text-white font-bold">AI Recruiter</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-xs font-semibold text-textSecondary dark:text-slate-350">
          <a href="#features" className="hover:text-primary transition-colors">Features</a>
          <a href="#workflow" className="hover:text-primary transition-colors">AI Workflow</a>
          <a href="#testimonials" className="hover:text-primary transition-colors">Testimonials</a>
          <a href="#faq" className="hover:text-primary transition-colors">FAQ</a>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost" size="sm">Log in</Button>
          </Link>
          <Link to="/register">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-20 text-center relative overflow-hidden">
        {/* Decorative blur elements */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 dark:bg-primary/3 rounded-full blur-[100px] pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/30 text-primary dark:text-blue-400 mb-6 border border-blue-100 dark:border-blue-900">
            <IoSparkles size={12} className="animate-spin" />
            Empowering Modern Recruitment Teams
          </span>

          <h1 className="text-4xl md:text-6xl font-bold text-textPrimary dark:text-white max-w-4xl mx-auto tracking-tight leading-[1.1]">
            Intelligent Candidate Evaluations <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Driven by Specialized AI</span>
          </h1>

          <p className="mt-6 text-sm md:text-base text-textSecondary dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            AI Recruiter crawls GitHub projects, evaluates LinkedIn timelines, details technical skill gaps, and auto-generates custom interview playbooks in under 30 seconds.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button
              onClick={() => navigate('/login')}
              icon={IoArrowForward}
              iconPosition="right"
              className="w-full sm:w-auto"
            >
              Upload Job Description
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/login')}
              className="w-full sm:w-auto"
            >
              View Dashboard Demo
            </Button>
          </div>
        </motion.div>

        {/* Hero Interactive UI Showcase mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="mt-16 max-w-5xl mx-auto rounded-premium border border-customBorder dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl p-4 md:p-6"
        >
          <div className="flex items-center justify-between border-b border-customBorder dark:border-slate-800 pb-4 mb-4">
            <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-red-400" />
              <span className="w-3 h-3 rounded-full bg-amber-400" />
              <span className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="text-[10px] font-bold text-textSecondary dark:text-slate-400 bg-slate-50 dark:bg-slate-850 px-4 py-1.5 rounded-full border border-customBorder dark:border-slate-800">
              dashboard.airecruiter.io/ranking
            </div>
            <div className="w-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="md:col-span-2 border border-customBorder dark:border-slate-850 p-5 rounded-premium bg-slate-50/50 dark:bg-slate-950/20">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-textPrimary dark:text-white">Senior React Developer</h4>
                  <p className="text-[10px] text-textSecondary dark:text-slate-400">Match summary for Engineering Dept</p>
                </div>
                <span className="text-xs font-bold text-white bg-green-500 px-3 py-1 rounded-full">Active Sourcing</span>
              </div>

              {/* Mock candidate list inside showcase */}
              <div className="mt-5 space-y-3">
                {[
                  { name: 'Sarah Jenkins', score: 94, tag: 'Strong Match', match: '96% Conf.' },
                  { name: 'Elena Rostova', score: 93, tag: 'Strong Match', match: '94% Conf.' },
                  { name: 'Alex Rivera', score: 87, tag: 'Good Match', match: '90% Conf.' }
                ].map((c, i) => (
                  <div key={i} className="bg-white dark:bg-slate-900 border border-customBorder dark:border-slate-800 p-3 rounded-xl flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-950/30 text-primary dark:text-blue-400 font-bold flex items-center justify-center text-xs">
                        {c.name.split(' ').map(n=>n[0]).join('')}
                      </span>
                      <div>
                        <p className="text-xs font-bold text-textPrimary dark:text-white">{c.name}</p>
                        <p className="text-[9px] text-textSecondary dark:text-slate-400">GitHub: {c.score + 2} | LinkedIn: {c.score - 4}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                        c.tag === 'Strong Match' ? 'bg-green-50 text-green-600 dark:bg-green-950/30 dark:text-green-400' : 'bg-blue-50 text-blue-600 dark:bg-blue-950/30'
                      }`}>{c.tag}</span>
                      <span className="text-[11px] font-bold text-textPrimary dark:text-white">{c.score}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="border border-customBorder dark:border-slate-850 p-5 rounded-premium bg-white dark:bg-slate-900 shadow-sm flex-1">
                <h5 className="text-xs font-bold text-textPrimary dark:text-white">AI Recruiting Insight</h5>
                <div className="mt-3 p-3 bg-amber-50/50 dark:bg-amber-950/15 border border-amber-200 dark:border-amber-900/50 rounded-xl">
                  <p className="text-[10px] font-semibold text-amber-700 dark:text-amber-400">Major Skill Gap Spotted</p>
                  <p className="text-[9px] text-amber-600 dark:text-slate-400 mt-1 leading-relaxed">
                    Most candidates apply without <strong>Framer Motion</strong> skills specified in the React Developer JD. We suggest asking standard animation questions in screening.
                  </p>
                </div>
              </div>
              
              <div className="border border-customBorder dark:border-slate-850 p-5 rounded-premium bg-white dark:bg-slate-900 shadow-sm">
                <h5 className="text-xs font-bold text-textPrimary dark:text-white">Pipeline Efficiency</h5>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-textPrimary dark:text-white">12 Days</span>
                  <span className="text-[10px] font-bold text-green-500">-4 days</span>
                </div>
                <p className="text-[9px] text-textSecondary dark:text-slate-400 mt-1">Average time to source and offer a candidate.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Feature list section */}
      <section id="features" className="bg-white dark:bg-slate-900 py-20 border-y border-customBorder dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-textPrimary dark:text-white tracking-tight">
              Enterprise Sourcing. Powered by AI.
            </h2>
            <p className="mt-3 text-xs md:text-sm text-textSecondary dark:text-slate-400 leading-relaxed">
              Ditch manual resume crawling. AI Recruiter handles deep web checks and checks code repositories, ensuring your interview pipelines contain highly matched candidates.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <Card key={i} className="flex flex-col text-left p-6" hoverEffect>
                  <div className={`p-2.5 rounded-premium inline-self-start ${f.color} mb-4 border border-customBorder/30 w-10 h-10 flex items-center justify-center`}>
                    <Icon size={20} className="text-primary" />
                  </div>
                  <h3 className="text-sm font-bold text-textPrimary dark:text-white">{f.title}</h3>
                  <p className="mt-2.5 text-xs text-textSecondary dark:text-slate-400 leading-relaxed flex-1">
                    {f.desc}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dynamic AI workflow demo */}
      <section id="workflow" className="py-20 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <span className="text-[10px] font-bold tracking-wider text-primary uppercase bg-blue-50 dark:bg-blue-950/20 px-3 py-1 rounded-full border border-blue-100 dark:border-blue-900">
              How it works
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-textPrimary dark:text-white mt-4 tracking-tight">
              A Complete Recruiter Workflow
            </h2>
            <p className="mt-3 text-xs text-textSecondary dark:text-slate-400 leading-relaxed">
              AI Recruiter runs autonomous pipelines that work directly with github commits and career progressions.
            </p>

            <div className="mt-8 space-y-4">
              {workflowSteps.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedWorkflowStep(idx)}
                  className={`w-full text-left p-4 rounded-premium border transition-all ${
                    selectedWorkflowStep === idx
                      ? 'border-primary bg-white dark:bg-slate-900 shadow-md'
                      : 'border-customBorder dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-transparent'
                  }`}
                >
                  <h4 className="text-xs font-bold text-textPrimary dark:text-white">{step.title}</h4>
                  {selectedWorkflowStep === idx && (
                    <p className="text-[11px] text-textSecondary dark:text-slate-400 mt-2 leading-relaxed">
                      {step.desc}
                    </p>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 border border-customBorder dark:border-slate-800 rounded-premium shadow-2xl relative">
            <div className="h-64 flex flex-col justify-center items-center text-center">
              {selectedWorkflowStep === 0 && (
                <div className="space-y-4 max-w-xs flex flex-col items-center">
                  <div className="p-3 bg-blue-50 dark:bg-slate-800 text-primary rounded-full">
                    <IoDocumentTextOutline size={26} />
                  </div>
                  <h4 className="text-sm font-bold text-textPrimary dark:text-white">Analyzing Job Requirements</h4>
                  <p className="text-xs text-textSecondary dark:text-slate-400">AI Recruiter isolates React, Tailwind CSS, and Framer Motion as mandatory skills.</p>
                  <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full w-2/3 bg-primary rounded-full" />
                  </div>
                </div>
              )}
              {selectedWorkflowStep === 1 && (
                <div className="space-y-4 max-w-xs flex flex-col items-center">
                  <div className="p-3 bg-blue-50 dark:bg-slate-800 text-primary rounded-full">
                    <IoCloudUploadOutline size={26} />
                  </div>
                  <h4 className="text-sm font-bold text-textPrimary dark:text-white">Parsing Applicant Files</h4>
                  <p className="text-xs text-textSecondary dark:text-slate-400">Parsing Resume.pdf. Mapping developer parameters into secure workspace tables.</p>
                  <div className="flex gap-2 justify-center">
                    <span className="px-2.5 py-1 text-[10px] font-bold bg-green-50 text-green-700 rounded-full">PDF Parsed</span>
                    <span className="px-2.5 py-1 text-[10px] font-bold bg-cyan-50 text-cyan-700 rounded-full">Structured</span>
                  </div>
                </div>
              )}
              {selectedWorkflowStep === 2 && (
                <div className="space-y-4 max-w-xs flex flex-col items-center">
                  <div className="p-3 bg-blue-50 dark:bg-slate-800 text-primary rounded-full">
                    <IoCodeSlashOutline size={26} />
                  </div>
                  <h4 className="text-sm font-bold text-textPrimary dark:text-white">GitHub Repo Quality Rating</h4>
                  <p className="text-xs text-textSecondary dark:text-slate-400">Scanned 18 repos. Evaluated package.json configurations, JS structures, and commit frequencies.</p>
                  <span className="text-xs font-bold text-primary bg-primary-light/40 dark:bg-primary/20 px-3 py-1 rounded-full">Git Score: 92/100</span>
                </div>
              )}
              {selectedWorkflowStep === 3 && (
                <div className="space-y-4 max-w-xs flex flex-col items-center">
                  <div className="p-3 bg-blue-50 dark:bg-slate-800 text-primary rounded-full">
                    <IoRibbonOutline size={26} />
                  </div>
                  <h4 className="text-sm font-bold text-textPrimary dark:text-white">Candidate Matched!</h4>
                  <p className="text-xs text-textSecondary dark:text-slate-400">Sarah Jenkins matched. Recommendation: Strong Match. Score: 94% fit.</p>
                  <Button size="sm" onClick={() => navigate('/login')}>Review Full Analysis</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* KPI statistics section */}
      <section className="bg-slate-50 dark:bg-slate-900/50 py-16 border-y border-customBorder dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {statistics.map((s, i) => (
              <div key={i}>
                <p className="text-3xl md:text-5xl font-extrabold text-primary dark:text-blue-400 tracking-tight">{s.value}</p>
                <p className="mt-2 text-xs font-semibold text-textSecondary dark:text-slate-400">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-[10px] font-bold text-primary bg-blue-50 dark:bg-blue-950/20 px-3 py-1 rounded-full border border-blue-100 dark:border-blue-900">Success Stories</span>
          <h2 className="text-2xl md:text-3xl font-bold text-textPrimary dark:text-white mt-4 tracking-tight">Trusted by Leading Tech Recruitment Teams</h2>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <Card key={i} className="flex flex-col justify-between text-left p-6">
              <p className="text-xs md:text-sm text-textSecondary dark:text-slate-300 italic leading-relaxed">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3 mt-6">
                <span className="w-10 h-10 rounded-full bg-primary text-white font-bold flex items-center justify-center text-xs">
                  {t.avatar}
                </span>
                <div>
                  <h4 className="text-xs font-bold text-textPrimary dark:text-white">{t.author}</h4>
                  <p className="text-[10px] text-textSecondary dark:text-slate-400">{t.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Accordion FAQ section */}
      <section id="faq" className="bg-white dark:bg-slate-900 py-20 border-t border-customBorder dark:border-slate-800">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-textPrimary dark:text-white tracking-tight">Frequently Asked Questions</h2>
            <p className="mt-2 text-xs text-textSecondary dark:text-slate-400">Everything you need to know about the AI Recruiter pipeline</p>
          </div>
          
          <Accordion items={faqs} />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-450 dark:bg-slate-950 border-t border-slate-800 py-12 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2.5 font-bold text-white text-sm">
            <div className="h-7 w-7 rounded-lg bg-white/10 flex items-center justify-center text-white">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="font-bold text-white">AI Recruiter</span>
          </div>

          <div className="flex flex-wrap gap-6 text-[11px] font-medium text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#features" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#features" className="hover:text-white transition-colors">Contact Support</a>
          </div>

          <p className="text-[10px] text-slate-500">
            © {new Date().getFullYear()} AI Recruiter. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
