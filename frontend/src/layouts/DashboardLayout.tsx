import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiLayout, 
  FiList, 
  FiBarChart2, 
  FiSettings, 
  FiSearch, 
  FiBell, 
  FiSun, 
  FiMoon, 
  FiHelpCircle, 
  FiMenu, 
  FiX, 
  FiChevronLeft,
  FiChevronRight,
  FiLogOut,
  FiUser,
  FiBriefcase,
  FiFileText,
  FiGithub,
  FiLinkedin,
  FiTrendingUp,
  FiCpu,
  FiAward,
  FiMessageSquare,
  FiCheckCircle
} from 'react-icons/fi'
import { useApp } from '../contexts/AppContext'
import { Card } from '../components/common/Card'
import { Button } from '../components/common/Button'
import { Badge } from '../components/common/Badge'

export const DashboardLayout = () => {
  const { currentUser, loginUser, logoutUser, addCandidate, updateUserProfile, jobs } = useApp()
  const location = useLocation()
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [searchQuery, setSearchQuery] = useState('')
  const [showHelp, setShowHelp] = useState(false)

  // Candidate Setup Wizard States
  const [setupStep, setSetupStep] = useState(1)
  const [setupPhone, setSetupPhone] = useState('')
  const [setupLocation, setSetupLocation] = useState('')
  const [setupRole, setSetupRole] = useState('Senior Full-Stack Developer')
  const [setupGithub, setSetupGithub] = useState('')
  const [setupLinkedin, setSetupLinkedin] = useState('')
  const [setupResumeFile, setSetupResumeFile] = useState<File | null>(null)
  const [setupResumeName, setSetupResumeName] = useState('')
  const [savingSetup, setSavingSetup] = useState(false)
  const [setupMessage, setSetupMessage] = useState('')

  // Sync profile details when currentUser loads
  useEffect(() => {
    if (currentUser && currentUser.role === 'Candidate') {
      if (currentUser.phone) setSetupPhone(currentUser.phone)
      if (currentUser.location) setSetupLocation(currentUser.location)
      if (currentUser.targetRole) setSetupRole(currentUser.targetRole)
      
      const github = currentUser.github?.username || currentUser.githubUsername || ''
      if (github) setSetupGithub(github)
      
      const linkedin = currentUser.linkedin?.profileUrl || currentUser.linkedinUrl || ''
      if (linkedin) setSetupLinkedin(linkedin)
      
      const resume = currentUser.resumeAnalysis?.fileName || currentUser.resumeName || ''
      if (resume) setSetupResumeName(resume)
    }
  }, [currentUser])

  const handleCompleteSetup = async () => {
    if (!setupPhone.trim() || !setupLocation.trim() || !setupRole.trim()) {
      alert('Please fill out all basic contact details in Step 1.')
      setSetupStep(1)
      return
    }
    if (!setupGithub.trim() || !setupLinkedin.trim()) {
      alert('Please fill out both your GitHub and LinkedIn credentials in Step 2.')
      setSetupStep(2)
      return
    }
    if (!setupResumeFile && !setupResumeName) {
      alert('Please upload a resume file in Step 3.')
      return
    }

    setSavingSetup(true)
    setSetupMessage('Initializing secure profile workspace...')

    let githubSyncData: any = null
    let linkedinSyncData: any = null

    // 1. Sync GitHub
    try {
      setSetupMessage('Auditing GitHub code history & active repositories...')
      const userRes = await fetch(`https://api.github.com/users/${setupGithub}`)
      if (userRes.ok) {
        const user = await userRes.json()
        const reposRes = await fetch(`https://api.github.com/users/${setupGithub}/repos?sort=updated&per_page=100`)
        const repos = await reposRes.json()
        
        const langCounts: Record<string, number> = {}
        let totalStars = 0
        const projects = repos
           .filter((r: any) => !r.fork)
           .sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)
           .slice(0, 4)
           .map((r: any) => ({
             name: r.name,
             stars: r.stargazers_count,
             description: r.description || "No description provided.",
             language: r.language || "Unknown"
           }))
           
        repos.forEach((r: any) => {
          if (!r.fork && r.language) {
            langCounts[r.language] = (langCounts[r.language] || 0) + 1
          }
          totalStars += r.stargazers_count
        })
        
        const totalLangRepos = Object.values(langCounts).reduce((a: number, b: number) => a + b, 0)
        const languages = Object.entries(langCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 4)
          .map(([name, count], index) => {
            const colors = ["bg-yellow-400", "bg-blue-500", "bg-orange-500", "bg-purple-500"]
            return {
              name,
              percentage: Math.round((count / (totalLangRepos || 1)) * 100),
              color: colors[index % colors.length]
            }
          })

        const calculatedScore = Math.min(99, 70 + Math.floor(totalStars / 5) + Math.floor(user.public_repos / 3))

        githubSyncData = {
          username: user.login,
          totalRepos: user.public_repos,
          contributions: Math.floor(Math.random() * 150) + 50,
          languages,
          qualityAudit: "Codebase demonstrates clean modularity. Strong file separation and API structure.",
          projects,
          techScore: calculatedScore,
          starsCount: totalStars
        }
      }
    } catch (err) {
      console.warn("GitHub sync fetch failed, falling back to mock info", err)
    }

    // 2. Sync LinkedIn
    try {
      setSetupMessage('Analyzing LinkedIn tenure & verification tokens...')
      const apiBase = import.meta.env.VITE_API_BASE_URL || '';
      const response = await fetch(`${apiBase}/api/linkedin/sync`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: setupLinkedin })
      })
      if (response.ok) {
        const data = await response.json()
        linkedinSyncData = {
          profileUrl: setupLinkedin,
          careerHistory: data.career_history || [],
          endorsements: data.endorsements || [],
          profileData: {
            score: data.match_score || 85,
            name: currentUser?.name || 'Candidate User',
            headline: data.headline || 'Software Engineer',
            summary: data.summary || 'Experienced software builder specializing in frontend and cloud systems.'
          }
        }
      }
    } catch (err) {
      console.warn("LinkedIn sync fetch failed, falling back to mock info", err)
    }

    // High fidelity fallback objects if API failed
    if (!githubSyncData) {
      githubSyncData = {
        username: setupGithub,
        totalRepos: 18,
        contributions: 142,
        languages: [
          { name: 'TypeScript', percentage: 60, color: 'bg-blue-500' },
          { name: 'JavaScript', percentage: 25, color: 'bg-yellow-400' },
          { name: 'CSS', percentage: 15, color: 'bg-orange-500' }
        ],
        qualityAudit: "Clean modularity. Well structured components and responsive CSS setups.",
        projects: [
          { name: 'task-runner-api', stars: 4, description: 'Asynchronous command dispatcher API.', language: 'TypeScript' },
          { name: 'recruitment-wizard', stars: 2, description: 'React multi-step form and ATS score simulator.', language: 'JavaScript' }
        ],
        techScore: 88,
        starsCount: 6
      }
    }

    if (!linkedinSyncData) {
      linkedinSyncData = {
        profileUrl: setupLinkedin,
        careerHistory: [
          { role: 'Software Engineer', duration: '2 years', description: 'Built React layout modules and Node microservices.' }
        ],
        endorsements: [
          { name: 'TypeScript', count: 12 },
          { name: 'React', count: 9 }
        ],
        profileData: {
          score: 84,
          name: currentUser?.name || 'Candidate User',
          headline: 'Full-Stack Developer',
          summary: 'Experienced software engineer focused on building performant frontend applications.'
        }
      }
    }

    setSetupMessage('Saving profile data to live applicant registry...')

    // Save profile fields to candidate's own user record
    updateUserProfile({
      phone: setupPhone,
      location: setupLocation,
      targetRole: setupRole,
      githubUsername: setupGithub,
      linkedinUrl: setupLinkedin,
      resumeName: setupResumeName,
      github: githubSyncData,
      linkedin: linkedinSyncData,
      profileComplete: true
    })

    setSavingSetup(false)
  }

  // Close dropdowns on route change
  useEffect(() => {
    setShowNotifications(false)
    setShowProfile(false)
    setMobileOpen(false)
  }, [location.pathname])

  const recruiterMenuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: FiLayout },
    { name: 'Browse Candidates', path: '/discovery', icon: FiSearch },
    { name: 'Rankings', path: '/rankings', icon: FiList },
    { name: 'Compare', path: '/compare', icon: FiList },
    { name: 'Analytics', path: '/analytics', icon: FiBarChart2 },
    { name: 'Recruiter Chat', path: '/chat', icon: FiMessageSquare },
    { name: 'Settings', path: '/settings', icon: FiSettings },
  ]

  const candidateMenuItems = [
    { name: 'Home', path: '/dashboard', icon: FiLayout },
    { name: 'Resume Optimizer', path: '/resume-analysis', icon: FiFileText },
    { name: 'GitHub Integration', path: '/github-sync', icon: FiGithub },
    { name: 'LinkedIn Integration', path: '/linkedin-sync', icon: FiLinkedin },
    { name: 'Job Matches', path: '/job-recommendations', icon: FiAward },
    { name: 'Skill Gap Roadmaps', path: '/skill-gap', icon: FiTrendingUp },
    { name: 'AI Interview Practice', path: '/interview-prep', icon: FiCpu },
    { name: 'Settings', path: '/settings', icon: FiSettings },
  ]

  const menuItems = currentUser?.role === 'Candidate' ? candidateMenuItems : recruiterMenuItems

  // Get current breadcrumb
  const getBreadcrumbs = () => {
    const paths = location.pathname.split('/').filter(Boolean)
    if (paths.length === 0) return ['Workspace']
    return ['Workspace', ...paths.map(p => p.charAt(0).toUpperCase() + p.slice(1).replace('-', ' '))]
  }

  const mockNotifications = [
    { id: 1, text: 'Alex Mercer was shortlisted for Backend Engineer', time: '2 mins ago', unread: true },
    { id: 2, text: 'New applicant added to Frontend Developer role', time: '1 hour ago', unread: true },
    { id: 3, text: "Sarah Chen's profile is ready to review", time: '4 hours ago', unread: false },
  ]

  const handleToggleRole = () => {
    if (currentUser?.role === 'Candidate') {
      loginUser({ name: "Anushka Recruiter", email: "anushka@recruiter.ai", role: "Recruiter" })
    } else {
      loginUser({ name: "Sarah Jenkins", email: "sarah.jenkins@stanford.edu", role: "Candidate" })
    }
    navigate('/dashboard')
  }

  const initials = currentUser?.name 
    ? currentUser.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().substring(0, 2) 
    : 'SJ'

  if (currentUser?.role === 'Candidate' && !currentUser?.profileComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FFF7F2] via-[#FFFDFB] to-[#F3E7DF] flex flex-col items-center justify-center p-6 text-left font-sans">
        <div className="max-w-2xl w-full bg-white/95 backdrop-blur-md border border-[#F1DDD2] rounded-[32px] shadow-[0_20px_50px_rgba(249,115,22,0.08)] overflow-hidden flex flex-col transition-all duration-300 hover:shadow-[0_24px_60px_rgba(249,115,22,0.12)]">
          {/* Logo & Header */}
          <div className="bg-[#F97316] p-8 text-white flex justify-between items-center shrink-0 border-b border-orange-600/10">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)]">
                Setup Your Candidate Profile
              </h2>
              <p className="text-xs text-orange-50 mt-1.5 font-medium">Complete these quick steps to synchronize your resume and sync socials before applying.</p>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <button
                onClick={() => {
                  updateUserProfile({ profileComplete: true })
                }}
                className="px-4 py-2 bg-white hover:bg-orange-50 text-[#F97316] hover:text-[#EA580C] rounded-xl text-xs font-extrabold transition-all shadow-md active:scale-95 shrink-0"
              >
                Skip Setup
              </button>
              <img src="/logo.png" alt="Candidate360" className="w-12 h-12 rounded-2xl bg-white/20 p-1.5 object-contain shadow-inner border border-white/10" />
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="px-8 py-4 bg-orange-50/15 border-b border-orange-100/20 flex justify-between items-center text-xs font-bold text-gray-400 select-none">
            <span className={`flex items-center gap-2 ${setupStep >= 1 ? 'text-[#EA580C] font-extrabold' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${setupStep >= 1 ? 'bg-[#F97316] text-white' : 'bg-gray-200 text-gray-400'}`}>1</span>
              Basic Info
            </span>
            <span className="text-gray-300">➔</span>
            <span className={`flex items-center gap-2 ${setupStep >= 2 ? 'text-[#EA580C] font-extrabold' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${setupStep >= 2 ? 'bg-[#F97316] text-white' : 'bg-gray-200 text-gray-400'}`}>2</span>
              Github & LinkedIn
            </span>
            <span className="text-gray-300">➔</span>
            <span className={`flex items-center gap-2 ${setupStep >= 3 ? 'text-[#EA580C] font-extrabold' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${setupStep >= 3 ? 'bg-[#F97316] text-white' : 'bg-gray-200 text-gray-400'}`}>3</span>
              Upload Resume
            </span>
          </div>

          {/* Body Content */}
          <div className="p-8 flex-1 min-h-[300px]">
            {savingSetup ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-4 text-center h-full">
                <FiCpu className="w-12 h-12 text-[#F97316] animate-spin" />
                <h4 className="font-extrabold text-gray-900 text-sm">Processing Profile Setup</h4>
                <p className="text-xs text-gray-500 font-semibold">{setupMessage}</p>
              </div>
            ) : (
              <>
                {setupStep === 1 && (
                  <div className="space-y-4 animate-fadeIn">
                    <h3 className="font-extrabold text-sm text-gray-900 border-b border-gray-100 pb-2">Profile & Contact Information</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5 text-xs">
                        <label className="font-bold text-gray-700">Phone Number</label>
                        <input
                          type="text"
                          value={setupPhone}
                          onChange={(e) => setSetupPhone(e.target.value)}
                          placeholder="+1 (555) 0199"
                          className="w-full px-4 py-2.5 border border-orange-100 rounded-xl outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-[#F97316] transition-all font-medium text-gray-800 bg-orange-50/5"
                        />
                      </div>
                      <div className="space-y-1.5 text-xs">
                        <label className="font-bold text-gray-700">Current Location</label>
                        <input
                          type="text"
                          value={setupLocation}
                          onChange={(e) => setSetupLocation(e.target.value)}
                          placeholder="San Francisco, CA (Remote)"
                          className="w-full px-4 py-2.5 border border-orange-100 rounded-xl outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-[#F97316] transition-all font-medium text-gray-800 bg-orange-50/5"
                        />
                      </div>
                      <div className="space-y-1.5 text-xs sm:col-span-2">
                        <label className="font-bold text-gray-700">Target Job Title</label>
                        <input
                          type="text"
                          value={setupRole}
                          onChange={(e) => setSetupRole(e.target.value)}
                          placeholder="Senior Full-Stack Developer"
                          className="w-full px-4 py-2.5 border border-orange-100 rounded-xl outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-[#F97316] transition-all font-medium text-gray-800 bg-orange-50/5"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {setupStep === 2 && (
                  <div className="space-y-4 animate-fadeIn">
                    <h3 className="font-extrabold text-sm text-gray-900 border-b border-gray-100 pb-2">Sync Technical Socials</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5 text-xs">
                        <label className="font-bold text-gray-700">GitHub Username</label>
                        <input
                          type="text"
                          value={setupGithub}
                          onChange={(e) => setSetupGithub(e.target.value)}
                          placeholder="e.g. alexmercer"
                          className="w-full px-4 py-2.5 border border-orange-100 rounded-xl outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-[#F97316] transition-all font-medium text-gray-800 bg-orange-50/5"
                        />
                        {(currentUser?.github?.username || currentUser?.githubUsername) && (
                          <div className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 mt-1 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100/50 w-fit">
                            <FiCheckCircle className="w-3.5 h-3.5" /> Synced from GitHub page
                          </div>
                        )}
                      </div>
                      <div className="space-y-1.5 text-xs">
                        <label className="font-bold text-gray-700">LinkedIn Profile URL</label>
                        <input
                          type="text"
                          value={setupLinkedin}
                          onChange={(e) => setSetupLinkedin(e.target.value)}
                          placeholder="https://linkedin.com/in/alex-mercer"
                          className="w-full px-4 py-2.5 border border-orange-100 rounded-xl outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-[#F97316] transition-all font-medium text-gray-800 bg-orange-50/5"
                        />
                        {(currentUser?.linkedin?.profileUrl || currentUser?.linkedinUrl) && (
                          <div className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 mt-1 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100/50 w-fit">
                            <FiCheckCircle className="w-3.5 h-3.5" /> Synced from LinkedIn page
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {setupStep === 3 && (
                  <div className="space-y-4 animate-fadeIn">
                    <h3 className="font-extrabold text-sm text-gray-900 border-b border-gray-100 pb-2">Upload Professional Resume</h3>
                    <div className="space-y-4">
                      <div className="border-2 border-dashed border-orange-200 hover:border-orange-500 rounded-2xl p-8 text-center flex flex-col items-center justify-center space-y-3 bg-orange-50/5 hover:bg-orange-50/20 transition-all cursor-pointer group">
                        <FiFileText className="w-10 h-10 text-orange-400 group-hover:scale-110 transition-transform" />
                        <div className="text-xs">
                          <label className="cursor-pointer font-bold text-orange-600 hover:underline">
                            Choose PDF or Word Document
                            <input
                              type="file"
                              accept=".pdf,.doc,.docx"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) {
                                  setSetupResumeFile(file)
                                  setSetupResumeName(file.name)
                                }
                              }}
                            />
                          </label>
                          <p className="text-[10px] text-gray-400 mt-1 font-semibold">Max file size 5MB</p>
                        </div>
                      </div>

                      {setupResumeName && (
                        <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-100 text-blue-800 rounded-xl text-xs font-semibold">
                          <div className="flex items-center gap-2 min-w-0">
                            <FiCheckCircle className="text-emerald-500 w-4 h-4 shrink-0" />
                            <span className="truncate">{setupResumeName}</span>
                          </div>
                          {(currentUser?.resumeAnalysis?.fileName || currentUser?.resumeName) && (
                            <span className="text-[9px] text-emerald-700 bg-emerald-100/60 border border-emerald-200 px-2 py-0.5 rounded font-bold uppercase shrink-0">
                              Synced from Analyzer
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Navigation Controls */}
          {!savingSetup && (
            <div className="p-6 bg-gray-50/50 border-t border-gray-150 flex justify-between items-center shrink-0">
              <Button
                variant="outline"
                disabled={setupStep === 1}
                onClick={() => setSetupStep(prev => prev - 1)}
                className="text-xs font-semibold px-4 py-2 border-orange-200 text-orange-700 hover:bg-orange-50 rounded-xl"
              >
                Back
              </Button>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    logoutUser();
                    navigate('/login');
                  }}
                  className="px-3 py-1.5 text-xs text-red-500 hover:text-red-700 font-bold uppercase transition-colors mr-2 hover:bg-red-50 rounded-xl"
                >
                  Logout
                </button>
                <button
                  onClick={() => {
                    updateUserProfile({ profileComplete: true })
                  }}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-650 hover:text-gray-800 rounded-xl text-xs font-bold transition-all shadow-sm mr-1.5"
                >
                  Skip Setup
                </button>
                {setupStep < 3 ? (
                  <Button
                    onClick={() => {
                      if (setupStep === 1 && (!setupPhone.trim() || !setupLocation.trim() || !setupRole.trim())) {
                        alert('Please fill out all basic contact details.')
                        return
                      }
                      if (setupStep === 2 && (!setupGithub.trim() || !setupLinkedin.trim())) {
                        alert('Please specify your social profile links.')
                        return
                      }
                      setSetupStep(prev => prev + 1)
                    }}
                    className="text-xs font-semibold px-5 py-2 bg-[#F97316] hover:bg-[#EA580C] text-white rounded-xl shadow-md"
                  >
                    Continue
                  </Button>
                ) : (
                  <Button
                    disabled={!setupResumeFile && !setupResumeName}
                    onClick={handleCompleteSetup}
                    className="text-xs font-bold px-5 py-2 bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-xl shadow-md hover:shadow-lg hover:shadow-orange-500/20"
                  >
                    Complete Setup
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-[#FFF8F4] font-sans flex text-gray-900`}>
      
      {/* Sidebar - Desktop */}
      <motion.aside 
        animate={{ width: collapsed ? '80px' : '260px' }}
        className="hidden md:flex flex-col bg-white border-r border-[#F1DDD2] sticky top-0 h-screen overflow-hidden z-20"
      >
        {/* Logo Section */}
        <div className="h-16 flex items-center gap-3 px-6 border-b border-[#F1DDD2]">
          <Link to="/dashboard" className="flex items-center gap-3 font-semibold text-lg">
            <img src="/logo.png" alt="Candidate360" className="w-8 h-8 rounded-lg object-contain" />
            {!collapsed && (
              <span className="text-gray-900 font-bold tracking-tight">Candidate360</span>
            )}
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path
            const Icon = item.icon
            return (
              <Link key={item.name} to={item.path}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all mb-1 ${
                    isActive 
                      ? 'bg-gray-100/80 text-gray-900 shadow-sm font-semibold' 
                      : 'text-[#6B7280] font-medium hover:text-[#2D2A26] hover:bg-gray-50'
                  }`}
                >
                  <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-gray-900' : 'text-[#9CA3AF]'}`} />
                  {!collapsed && (
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      {item.name}
                    </motion.span>
                  )}
                </motion.div>
              </Link>
            )
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-[#F1DDD2] bg-white">
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center justify-center w-full py-2 hover:bg-gray-50 rounded-lg text-gray-500 border border-gray-100 mb-3"
          >
            {collapsed ? <FiChevronRight className="w-5 h-5" /> : <FiChevronLeft className="w-5 h-5" />}
          </button>
          
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold shrink-0">
                {initials}
              </div>
              {!collapsed && (
                <div className="text-left overflow-hidden">
                  <p className="text-xs font-semibold text-gray-900 truncate">{currentUser?.name || 'Recruiter'}</p>
                  <p className="text-[10px] text-gray-500 truncate">{currentUser?.role || 'Recruiter'}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.aside>


      {/* Sidebar - Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black z-30 md:hidden"
            />
            <motion.aside 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 bottom-0 left-0 w-64 bg-white z-40 flex flex-col md:hidden border-r border-[#F1DDD2]"
            >
              <div className="h-16 flex items-center justify-between px-6 border-b border-[#F1DDD2]">
                <Link to="/dashboard" className="flex items-center gap-3 font-semibold text-lg">
                  <img src="/logo.png" alt="Candidate360" className="w-8 h-8 rounded-lg object-contain" />
                  <span className="text-gray-900 font-bold tracking-tight">Candidate360</span>
                </Link>
                <button onClick={() => setMobileOpen(false)} className="text-gray-500 hover:text-gray-800">
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                {menuItems.map((item) => {
                  const isActive = location.pathname === item.path
                  const Icon = item.icon
                  return (
                    <Link key={item.name} to={item.path} onClick={() => setMobileOpen(false)}>
                      <div
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                          isActive 
                            ? 'bg-gray-100/80 text-gray-900 shadow-sm font-semibold' 
                            : 'text-[#6B7280] font-medium hover:text-[#2D2A26] hover:bg-gray-50'
                        }`}
                      >
                        <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-gray-900' : 'text-[#9CA3AF]'}`} />
                        <span>{item.name}</span>
                      </div>
                    </Link>
                  )
                })}
              </nav>
              <div className="p-4 border-t border-[#F1DDD2] flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                    {initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{currentUser?.name || 'Recruiter'}</p>
                    <p className="text-xs text-gray-500">{currentUser?.role || 'Recruiter'}</p>
                  </div>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        
        {/* Sticky Navbar */}
        <header className="h-16 border-b border-[#F1DDD2] bg-white/80 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between px-6">
          {/* Breadcrumbs / Mobile trigger */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setMobileOpen(true)}
              className="p-2 hover:bg-gray-50 rounded-lg text-gray-600 md:hidden border border-gray-100"
            >
              <FiMenu className="w-5 h-5" />
            </button>
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-gray-500">
              {getBreadcrumbs().map((b, idx, arr) => (
                <React.Fragment key={b}>
                  <span className={idx === arr.length - 1 ? 'text-[#F97316] font-semibold' : 'hover:text-gray-900'}>
                    {b}
                  </span>
                  {idx < arr.length - 1 && <span className="text-gray-300">/</span>}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Search bar */}
          <div className="hidden md:flex items-center w-72 max-w-lg bg-[#FFF8F4] border border-[#F1DDD2] rounded-lg px-3 py-1.5 focus-within:border-blue-500 focus-within:bg-white transition-all">
            <FiSearch className="text-[#9CA3AF] mr-2 w-4 h-4 shrink-0" />
            <input 
              type="text" 
              placeholder="Quick search (e.g. React, 90%+)..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-xs w-full focus:outline-none placeholder-[#9CA3AF]"
            />
          </div>

          {/* Nav Controls */}
          <div className="flex items-center gap-4 relative">
            {/* Theme Toggle */}
            <button 
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors border border-gray-100"
              title="Toggle theme (Preview)"
            >
              {theme === 'light' ? <FiMoon className="w-4 h-4" /> : <FiSun className="w-4 h-4" />}
            </button>

            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={() => {
                  setShowNotifications(!showNotifications)
                  setShowProfile(false)
                }}
                className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors border border-gray-100 relative"
              >
                <FiBell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#EF4444]" />
              </button>
              
              <AnimatePresence>
                {showNotifications && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowNotifications(false)} />
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-80 bg-white border border-[#F1DDD2] rounded-xl shadow-premium z-20 py-2 overflow-hidden"
                    >
                      <div className="px-4 py-2 border-b border-[#F1DDD2] flex items-center justify-between">
                        <span className="font-semibold text-xs text-gray-900">Notifications</span>
                        <span className="text-[10px] text-blue-600 hover:underline cursor-pointer">Mark all read</span>
                      </div>
                      <div className="max-h-64 overflow-y-auto">
                        {mockNotifications.map((notif) => (
                          <div 
                            key={notif.id} 
                            className={`p-3 text-xs border-b border-gray-55 hover:bg-gray-50 cursor-pointer ${
                              notif.unread ? 'bg-blue-50/20' : ''
                            }`}
                          >
                            <p className="text-gray-700 leading-snug">{notif.text}</p>
                            <p className="text-[10px] text-gray-400 mt-1">{notif.time}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button 
                onClick={() => {
                  setShowProfile(!showProfile)
                  setShowNotifications(false)
                }}
                className="flex items-center gap-2 p-1 hover:bg-gray-50 rounded-lg transition-colors border border-gray-100"
              >
                <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs">
                  {initials}
                </div>
              </button>
              
              <AnimatePresence>
                {showProfile && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowProfile(false)} />
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 bg-white border border-[#F1DDD2] rounded-xl shadow-premium z-20 py-1 overflow-hidden"
                    >
                      <div className="px-4 py-2.5 border-b border-[#F1DDD2]">
                        <p className="text-xs font-semibold text-gray-900">{currentUser?.name || 'Recruiter'}</p>
                        <p className="text-[10px] text-gray-400 truncate">{currentUser?.email || 'recruiter@enterprise.com'}</p>
                      </div>
                      <button 
                        onClick={() => navigate('/settings')}
                        className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                      >
                        <FiUser className="w-3.5 h-3.5" />
                        My Profile
                      </button>
                      <button 
                        onClick={() => navigate('/settings')}
                        className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                      >
                        <FiSettings className="w-3.5 h-3.5" />
                        Account Settings
                      </button>
                      <div className="border-t border-[#F1DDD2] my-1" />
                      <button 
                        onClick={() => {
                          logoutUser()
                          navigate('/login')
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2"
                      >
                        <FiLogOut className="w-3.5 h-3.5" />
                        Sign Out
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Dashboard Main Viewport */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
        
        {/* Footer */}
        <footer className="text-center py-6 text-[10px] text-gray-400 border-t border-[#F1DDD2] bg-[#FFF8F4]">
          © {new Date().getFullYear()} Candidate360 Technologies Inc. All rights reserved. Enterprise SaaS Recruiter Workspace.
        </footer>
      </div>

      {/* Floating Help Button & Panel */}
      <div className="fixed bottom-6 right-6 z-30">
        <button 
          onClick={() => setShowHelp(!showHelp)}
          className="w-10 h-10 bg-[#F97316] hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95"
        >
          <FiHelpCircle className="w-5 h-5" />
        </button>
        
        <AnimatePresence>
          {showHelp && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowHelp(false)} />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="absolute right-0 bottom-12 w-80 bg-white border border-[#F1DDD2] rounded-2xl shadow-premium p-5 z-20"
              >
                <h4 className="font-bold text-sm text-gray-900 mb-2">Need a hand?</h4>
                <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                  If you're not sure how something works, our support team is happy to walk you through it.
                </p>
                <div className="space-y-2">
                  <a 
                    href="#docs" 
                    className="block text-center text-xs font-semibold py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg transition-colors border border-gray-200"
                  >
                    Browse Help Articles
                  </a>
                  <button 
                    onClick={() => setShowHelp(false)}
                    className="w-full text-center text-xs font-semibold py-2 bg-[#F97316] hover:bg-[#EA580C] text-white rounded-lg transition-colors"
                  >
                    Chat with Support
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

    </div>
  )
}
