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
  FiMessageSquare
} from 'react-icons/fi'
import { useApp } from '../contexts/AppContext'

export const DashboardLayout = () => {
  const { currentUser, loginUser, logoutUser } = useApp()
  const location = useLocation()
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [searchQuery, setSearchQuery] = useState('')
  const [showHelp, setShowHelp] = useState(false)

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
            <img src="/logo.png" alt="NexHire" className="w-8 h-8 rounded-lg object-contain" />
            {!collapsed && (
              <span className="text-gray-900 font-bold tracking-tight">NexHire</span>
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
            {!collapsed && (
              <button 
                onClick={handleToggleRole}
                className="w-full text-center py-1.5 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 text-[10px] font-bold uppercase rounded-lg transition-colors mt-1"
              >
                🔄 Switch to {currentUser?.role === 'Candidate' ? 'Recruiter' : 'Candidate'}
              </button>
            )}
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
                  <img src="/logo.png" alt="NexHire" className="w-8 h-8 rounded-lg object-contain" />
                  <span className="text-gray-900 font-bold tracking-tight">NexHire</span>
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
                <button 
                  onClick={handleToggleRole}
                  className="w-full text-center py-1.5 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 text-[10px] font-bold uppercase rounded-lg transition-colors mt-1"
                >
                  🔄 Switch to {currentUser?.role === 'Candidate' ? 'Recruiter' : 'Candidate'}
                </button>
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
          © {new Date().getFullYear()} NexHire Technologies Inc. All rights reserved. Enterprise SaaS Recruiter Workspace.
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
