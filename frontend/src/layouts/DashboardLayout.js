import React, { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  IoGridOutline, IoBriefcaseOutline, IoPeopleOutline, IoStatsChartOutline, 
  IoPieChartOutline, IoHelpCircleOutline, IoLogoGithub, IoLogoLinkedin, 
  IoSettingsOutline, IoLogOutOutline, IoMoonOutline, IoSunnyOutline, 
  IoNotificationsOutline, IoSearchOutline, IoMenuOutline, IoChevronBackOutline,
  IoChevronForwardOutline, IoClose
} from 'react-icons/io5';
import Avatar from '../components/common/Avatar';
import Badge from '../components/common/Badge';

const Logo = ({ collapsed }) => (
  <div className={`rounded-lg bg-primary flex items-center justify-center text-white ${collapsed ? 'h-8 w-8' : 'h-7 w-7'}`}>
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  </div>
);

const DashboardLayout = () => {
  const { 
    currentUser, theme, toggleTheme, notifications, 
    markAllNotificationsRead, logoutUser 
  } = useApp();
  
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: IoGridOutline },
    { name: 'Jobs', path: '/jobs', icon: IoBriefcaseOutline },
    { name: 'Candidates', path: '/candidates', icon: IoPeopleOutline },
    { name: 'Rankings', path: '/rankings', icon: IoStatsChartOutline },
    { name: 'Analytics', path: '/analytics', icon: IoPieChartOutline },
    { name: 'Interview Questions', path: '/interview-questions', icon: IoHelpCircleOutline },
    { name: 'GitHub Analysis', path: '/github-analysis', icon: IoLogoGithub },
    { name: 'LinkedIn Analysis', path: '/linkedin-analysis', icon: IoLogoLinkedin },
    { name: 'Settings', path: '/settings', icon: IoSettingsOutline },
  ];

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  const activeNotificationCount = notifications.filter(n => !n.read).length;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Trigger search navigation or dashboard update
      navigate(`/candidates?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className={`min-h-screen flex bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-200`}>
      {/* Sidebar - Desktop */}
      <aside 
        className={`hidden md:flex flex-col border-r border-customBorder dark:border-slate-800 bg-white dark:bg-slate-900 transition-all duration-300 z-20 ${
          sidebarCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-customBorder dark:border-slate-800">
          {!sidebarCollapsed && (
            <Link to="/dashboard" className="flex items-center gap-2.5 font-bold text-sm tracking-tight text-textPrimary">
              <Logo collapsed={false} />
              <span className="text-textPrimary dark:text-white font-bold">AI Recruiter</span>
            </Link>
          )}
          {sidebarCollapsed && (
            <Link to="/dashboard" className="flex items-center justify-center mx-auto">
              <Logo collapsed={true} />
            </Link>
          )}
          <button 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="text-textSecondary hover:text-textPrimary dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 p-1.5 rounded-lg transition-colors hidden md:block"
          >
            {sidebarCollapsed ? <IoChevronForwardOutline size={16} /> : <IoChevronBackOutline size={16} />}
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-premium text-xs font-semibold tracking-wide transition-all ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-sm dark:bg-white dark:text-slate-900'
                    : 'text-textSecondary dark:text-slate-400 hover:text-textPrimary dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-850'
                } ${sidebarCollapsed ? 'justify-center' : ''}`}
              >
                <Icon size={18} className={isActive ? (theme === 'dark' ? 'text-slate-900' : 'text-white') : 'text-slate-400 dark:text-slate-500'} />
                {!sidebarCollapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-customBorder dark:border-slate-800">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-3 py-2.5 text-xs font-bold text-customError hover:bg-red-50 dark:hover:bg-red-950/20 rounded-premium transition-all ${
              sidebarCollapsed ? 'justify-center' : ''
            }`}
          >
            <IoLogOutOutline size={18} />
            {!sidebarCollapsed && <span>Log out</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-[1px]"
            />
            
            {/* Slide menu */}
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-slate-900 shadow-2xl flex flex-col border-r border-customBorder dark:border-slate-800"
            >
              <div className="h-16 flex items-center justify-between px-5 border-b border-customBorder dark:border-slate-800">
                <span className="flex items-center gap-2.5 font-bold text-sm text-textPrimary">
                  <Logo collapsed={false} />
                  <span className="text-textPrimary dark:text-white font-bold">AI Recruiter</span>
                </span>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-textSecondary hover:text-textPrimary dark:hover:text-white p-1 rounded-lg"
                >
                  <IoClose size={22} />
                </button>
              </div>

              <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                {menuItems.map((item) => {
                  const isActive = location.pathname.startsWith(item.path);
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-premium text-xs font-semibold transition-all ${
                        isActive
                          ? 'bg-primary text-white shadow-md shadow-blue-500/10'
                          : 'text-textSecondary dark:text-slate-400 hover:text-textPrimary dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-850'
                      }`}
                    >
                      <Icon size={18} className={isActive ? 'text-white' : 'text-slate-400 dark:text-slate-500'} />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="p-3 border-t border-customBorder dark:border-slate-800">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-bold text-customError hover:bg-red-50 dark:hover:bg-red-950/20 rounded-premium transition-all"
                >
                  <IoLogOutOutline size={18} />
                  <span>Log out</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-16 flex items-center justify-between px-6 bg-white dark:bg-slate-900 border-b border-customBorder dark:border-slate-800 z-10 sticky top-0">
          {/* Left: Mobile Toggle & Page Title */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="text-textSecondary hover:text-textPrimary dark:hover:text-white md:hidden p-1 rounded-lg"
            >
              <IoMenuOutline size={22} />
            </button>
            
            {/* Global Search Bar */}
            <form onSubmit={handleSearchSubmit} className="hidden sm:flex relative items-center max-w-xs w-64">
              <IoSearchOutline size={16} className="absolute left-3 text-slate-400 dark:text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search candidates globally..."
                className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 dark:bg-slate-850 border border-customBorder dark:border-slate-800 rounded-premium text-textPrimary dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-950 focus:border-primary transition-all"
              />
            </form>
          </div>

          {/* Right: Theme, Notifications, Profile Menu */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="text-textSecondary hover:text-textPrimary dark:text-slate-400 dark:hover:text-white p-2 hover:bg-slate-50 dark:hover:bg-slate-850 rounded-full transition-colors"
              title="Toggle theme"
            >
              {theme === 'dark' ? <IoSunnyOutline size={18} /> : <IoMoonOutline size={18} />}
            </button>

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowProfileMenu(false);
                }}
                className="relative text-textSecondary hover:text-textPrimary dark:text-slate-400 dark:hover:text-white p-2 hover:bg-slate-50 dark:hover:bg-slate-850 rounded-full transition-colors"
              >
                <IoNotificationsOutline size={18} />
                {activeNotificationCount > 0 && (
                  <span className="absolute top-1 right-1.5 h-4 w-4 bg-customError text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-pulse">
                    {activeNotificationCount}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <>
                    {/* Click-away backdrop */}
                    <div className="fixed inset-0 z-30" onClick={() => setShowNotifications(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 border border-customBorder dark:border-slate-800 rounded-premium shadow-2xl z-40 overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b border-customBorder dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
                        <span className="text-xs font-bold text-textPrimary dark:text-white">Notifications</span>
                        {activeNotificationCount > 0 && (
                          <button
                            onClick={markAllNotificationsRead}
                            className="text-[10px] font-bold text-primary hover:underline"
                          >
                            Mark all read
                          </button>
                        )}
                      </div>
                      <div className="max-h-60 overflow-y-auto divide-y divide-customBorder dark:divide-slate-800">
                        {notifications.length === 0 ? (
                          <div className="px-4 py-6 text-center text-xs text-textSecondary dark:text-slate-400">
                            No notifications yet.
                          </div>
                        ) : (
                          notifications.map((n) => (
                            <div 
                              key={n.id} 
                              className={`px-4 py-3 text-xs leading-normal transition-colors hover:bg-slate-50 dark:hover:bg-slate-850 ${
                                !n.read ? 'bg-blue-50/40 dark:bg-blue-950/10 border-l-2 border-primary' : ''
                              }`}
                            >
                              <p className="text-textPrimary dark:text-slate-200">{n.text}</p>
                              <span className="text-[10px] text-textSecondary dark:text-slate-500 mt-1 block">{n.time}</span>
                            </div>
                          ))
                        )}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Profile Dropdown Menu */}
            <div className="relative">
              {currentUser ? (
                <button
                  onClick={() => {
                    setShowProfileMenu(!showProfileMenu);
                    setShowNotifications(false);
                  }}
                  className="flex items-center gap-2.5 focus:outline-none focus:ring-2 focus:ring-blue-100 rounded-full p-0.5"
                >
                  <Avatar name={currentUser.name} size="sm" />
                </button>
              ) : (
                <Link to="/login" className="text-xs font-semibold text-primary hover:underline">Log in</Link>
              )}

              <AnimatePresence>
                {showProfileMenu && currentUser && (
                  <>
                    <div className="fixed inset-0 z-30" onClick={() => setShowProfileMenu(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-customBorder dark:border-slate-800 rounded-premium shadow-2xl z-40 p-2"
                    >
                      <div className="px-3 py-2 border-b border-customBorder dark:border-slate-800 mb-1">
                        <p className="text-xs font-bold text-textPrimary dark:text-white truncate">{currentUser.name}</p>
                        <p className="text-[10px] text-textSecondary dark:text-slate-400 truncate mt-0.5">{currentUser.email}</p>
                        <Badge variant="accent" className="mt-1.5">{currentUser.role}</Badge>
                      </div>
                      
                      <Link
                        to="/settings"
                        onClick={() => setShowProfileMenu(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-premium text-xs text-textSecondary dark:text-slate-400 hover:text-textPrimary dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-850 font-semibold"
                      >
                        <IoSettingsOutline size={16} />
                        <span>Settings</span>
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-premium text-xs text-customError hover:bg-red-50 dark:hover:bg-red-950/20 font-bold text-left"
                      >
                        <IoLogOutOutline size={16} />
                        <span>Log out</span>
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Dynamic Route Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
