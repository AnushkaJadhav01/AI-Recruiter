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
  FiBriefcase
} from 'react-icons/fi'

export const DashboardLayout = () => {
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

  const menuItems = [
    { name: 'Home', path: '/dashboard', icon: FiLayout },
    { name: 'Hiring Workspaces', path: '/workspaces', icon: FiBriefcase },
    { name: 'Create Workspace', path: '/upload-job', icon: FiSearch },
    { name: 'Candidate Discovery', path: '/discovery', icon: FiSearch },
    { name: 'AI Rankings', path: '/rankings', icon: FiList },
    { name: 'Candidate Intelligence', path: '/candidate/sarah-jenkins', icon: FiUser },
    { name: 'Compare Candidates', path: '/compare', icon: FiList },
    { name: 'Analytics', path: '/analytics', icon: FiBarChart2 },
    { name: 'Settings', path: '/settings', icon: FiSettings },
  ]

  // Get current breadcrumb
  const getBreadcrumbs = () => {
    const paths = location.pathname.split('/').filter(Boolean)
    if (paths.length === 0) return ['Workspace']
    return ['Workspace', ...paths.map(p => p.charAt(0).toUpperCase() + p.slice(1).replace('-', ' '))]
  }

  const mockNotifications = [
    { id: 1, text: 'Candidate Alex Mercer score updated to 94%', time: '2 mins ago', unread: true },
    { id: 2, text: 'Job Description "Backend Dev" parsed successfully', time: '1 hour ago', unread: true },
    { id: 3, text: 'LinkedIn profile analysis complete for Sarah Chen', time: '4 hours ago', unread: false },
  ]

  return (
    <div className={`min-h-screen bg-[#FAFBFC] font-sans flex text-gray-900`}>
      
      {/* Sidebar - Desktop */}
      <motion.aside 
        animate={{ width: collapsed ? '80px' : '260px' }}
        className="hidden md:flex flex-col bg-white border-r border-[#E5E7EB] sticky top-0 h-screen overflow-hidden z-20"
      >
        {/* Logo Section */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-[#E5E7EB] bg-white">
          <Link to="/dashboard" className="flex items-center gap-3 font-semibold text-lg overflow-hidden whitespace-nowrap">
            <div className="w-8 h-8 rounded-lg bg-[#2563EB] flex items-center justify-center text-white font-extrabold text-sm shrink-0">
              AR
            </div>
            {!collapsed && (
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-gray-900 font-bold tracking-tight"
              >
                Recruiter<span className="text-[#2563EB]">.ai</span>
              </motion.span>
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
                      : 'text-[#6B7280] font-medium hover:text-[#111827] hover:bg-gray-50'
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
        <div className="p-4 border-t border-[#E5E7EB] bg-white">
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center justify-center w-full py-2 hover:bg-gray-50 rounded-lg text-gray-500 border border-gray-100 mb-3"
          >
            {collapsed ? <FiChevronRight className="w-5 h-5" /> : <FiChevronLeft className="w-5 h-5" />}
          </button>
          
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold shrink-0">
              JD
            </div>
            {!collapsed && (
              <div className="text-left overflow-hidden">
                <p className="text-xs font-semibold text-gray-900 truncate">John Doe</p>
                <p className="text-[10px] text-gray-500 truncate">Senior Recruiter</p>
              </div>
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
              className="fixed top-0 bottom-0 left-0 w-64 bg-white z-40 flex flex-col md:hidden border-r border-[#E5E7EB]"
            >
              <div className="h-16 flex items-center justify-between px-6 border-b border-[#E5E7EB]">
                <Link to="/dashboard" className="flex items-center gap-3 font-semibold text-lg">
                  <div className="w-8 h-8 rounded-lg bg-[#2563EB] flex items-center justify-center text-white font-extrabold text-sm">
                    AR
                  </div>
                  <span className="text-gray-900 font-bold tracking-tight">Recruiter.ai</span>
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
                            : 'text-[#6B7280] font-medium hover:text-[#111827] hover:bg-gray-50'
                        }`}
                      >
                        <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-gray-900' : 'text-[#9CA3AF]'}`} />
                        <span>{item.name}</span>
                      </div>
                    </Link>
                  )
                })}
              </nav>

              <div className="p-4 border-t border-[#E5E7EB] flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                  JD
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">John Doe</p>
                  <p className="text-xs text-gray-500">Senior Recruiter</p>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        
        {/* Sticky Navbar */}
        <header className="h-16 border-b border-[#E5E7EB] bg-white/80 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between px-6">
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
                  <span className={idx === arr.length - 1 ? 'text-[#2563EB] font-semibold' : 'hover:text-gray-900'}>
                    {b}
                  </span>
                  {idx < arr.length - 1 && <span className="text-gray-300">/</span>}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Search bar */}
          <div className="hidden md:flex items-center w-72 max-w-lg bg-[#FAFBFC] border border-[#E5E7EB] rounded-lg px-3 py-1.5 focus-within:border-blue-500 focus-within:bg-white transition-all">
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
                      className="absolute right-0 mt-2 w-80 bg-white border border-[#E5E7EB] rounded-xl shadow-premium z-20 py-2 overflow-hidden"
                    >
                      <div className="px-4 py-2 border-b border-[#E5E7EB] flex items-center justify-between">
                        <span className="font-semibold text-xs text-gray-900">Notifications</span>
                        <span className="text-[10px] text-blue-600 hover:underline cursor-pointer">Mark all read</span>
                      </div>
                      <div className="max-h-64 overflow-y-auto">
                        {mockNotifications.map((notif) => (
                          <div 
                            key={notif.id} 
                            className={`p-3 text-xs border-b border-gray-50 hover:bg-gray-50 cursor-pointer ${
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
                  JD
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
                      className="absolute right-0 mt-2 w-48 bg-white border border-[#E5E7EB] rounded-xl shadow-premium z-20 py-1 overflow-hidden"
                    >
                      <div className="px-4 py-2.5 border-b border-[#E5E7EB]">
                        <p className="text-xs font-semibold text-gray-900">John Doe</p>
                        <p className="text-[10px] text-gray-400 truncate">john.doe@enterprise.com</p>
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
                      <div className="border-t border-[#E5E7EB] my-1" />
                      <button 
                        onClick={() => navigate('/login')}
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
        <footer className="border-t border-[#E5E7EB] bg-white py-4 px-6 text-center text-[10px] text-[#9CA3AF] mt-auto">
          © {new Date().getFullYear()} Recruiter.ai Technologies Inc. All rights reserved. Enterprise SaaS Recruiter Workspace.
        </footer>
      </div>

      {/* Floating Help Button & Panel */}
      <div className="fixed bottom-6 right-6 z-30">
        <button 
          onClick={() => setShowHelp(!showHelp)}
          className="w-10 h-10 bg-[#2563EB] hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95"
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
                className="absolute right-0 bottom-12 w-80 bg-white border border-[#E5E7EB] rounded-2xl shadow-premium p-5 z-20"
              >
                <h4 className="font-bold text-sm text-gray-900 mb-2">Recruiting Copilot</h4>
                <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                  Need help parsing resumes or adjusting AI weights? Ask us anything about candidate scoring models.
                </p>
                <div className="space-y-2">
                  <a 
                    href="#docs" 
                    className="block text-center text-xs font-semibold py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg transition-colors border border-gray-200"
                  >
                    View API Reference
                  </a>
                  <button 
                    onClick={() => setShowHelp(false)}
                    className="w-full text-center text-xs font-semibold py-2 bg-[#2563EB] hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    Start Live Chat Support
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
