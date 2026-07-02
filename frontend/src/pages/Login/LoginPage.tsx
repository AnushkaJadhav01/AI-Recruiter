import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowLeft } from 'react-icons/fi'
import { useApp } from '../../contexts/AppContext'

import { auth } from '../../firebase/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

export const LoginPage = () => {
  const navigate = useNavigate()
  const { loginUser } = useApp()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!email) { setError('Please enter your email address.'); return }
    if (!password || password.length < 6) { setError('Password must be at least 6 characters.'); return }
    
    setLoading(true)
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      // loginUser context will automatically be updated by AppContext onAuthStateChanged,
      // but we can call it to trigger any side effects if necessary, or just rely on the effect.
      navigate('/dashboard')
    } catch (err: any) {
      console.error('Firebase Login Error:', err)
      setError(err.message || 'Failed to sign in. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex bg-[#FFF8F4]" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* ── Left Panel ───────────────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-[52%] xl:w-[55%] relative flex-col justify-between p-12 xl:p-16 overflow-hidden bg-gradient-to-br from-[#FFF8F4] via-[#FFF2EA] to-[#FFE8D6]">

        {/* Abstract geometric artwork */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Large soft radial glow */}
          <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)' }} />
          <div className="absolute -bottom-40 -right-20 w-[500px] h-[500px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(253,186,116,0.12) 0%, transparent 70%)' }} />
          
          {/* Subtle dot grid */}
          <div className="absolute inset-0 opacity-[0.15]"
            style={{ backgroundImage: 'radial-gradient(circle, #2D2A26 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

          {/* Abstract SVG illustration — pure geometric, no fake data */}
          <svg className="absolute bottom-0 right-0 w-[90%] opacity-[0.07]" viewBox="0 0 600 500" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="300" cy="250" r="220" stroke="#2D2A26" strokeWidth="1"/>
            <circle cx="300" cy="250" r="160" stroke="#2D2A26" strokeWidth="1"/>
            <circle cx="300" cy="250" r="100" stroke="#2D2A26" strokeWidth="1"/>
            <line x1="80" y1="250" x2="520" y2="250" stroke="#2D2A26" strokeWidth="1"/>
            <line x1="300" y1="30" x2="300" y2="470" stroke="#2D2A26" strokeWidth="1"/>
            <line x1="144" y1="94" x2="456" y2="406" stroke="#2D2A26" strokeWidth="1"/>
            <line x1="456" y1="94" x2="144" y2="406" stroke="#2D2A26" strokeWidth="1"/>
          </svg>

          {/* Foreground accent shapes */}
          <div className="absolute top-[22%] right-[12%] w-20 h-20 rounded-full border border-[#F97316]/20" />
          <div className="absolute top-[22%] right-[12%] w-32 h-32 rounded-full border border-[#FDBA74]/15 -translate-x-6 -translate-y-6" />
          <div className="absolute bottom-[28%] left-[8%] w-16 h-16 rounded-full bg-[#F97316]/05 border border-[#F97316]/10" />
        </div>

        {/* Logo */}
        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center gap-3">
            <img src="/logo.png" alt="NexHire" className="w-9 h-9 rounded-xl object-contain bg-white shadow-sm border border-white/80" />
            <span className="text-xl font-bold tracking-tight text-[#2D2A26]">NexHire</span>
          </Link>
        </div>

        {/* Hero copy */}
        <div className="relative z-10 max-w-md">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F97316] mb-6">AI-Native Recruitment</p>
          <h1 className="text-4xl xl:text-5xl font-extrabold text-[#2D2A26] leading-[1.15] tracking-tight mb-6">
            The intelligence layer for modern hiring teams.
          </h1>
          <p className="text-base text-[#6B7280] leading-relaxed font-medium">
            Evaluate candidates with verified evidence, autonomous reasoning, and deep skill analysis—all from one platform.
          </p>

          {/* Divider row */}
          <div className="flex items-center gap-6 mt-12">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#F97316]" />
              <span className="text-xs font-semibold text-[#6B7280]">Candidate DNA</span>
            </div>
            <div className="w-px h-4 bg-[#F1DDD2]" />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#FDBA74]" />
              <span className="text-xs font-semibold text-[#6B7280]">Evidence Graphs</span>
            </div>
            <div className="w-px h-4 bg-[#F1DDD2]" />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#2D2A26]" />
              <span className="text-xs font-semibold text-[#6B7280]">Multi-Agent AI</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 text-[11px] text-[#9CA3AF] font-medium">
          © {new Date().getFullYear()} NexHire Technologies ·{' '}
          <Link to="/privacy" className="hover:text-[#F97316] transition-colors">Privacy Policy</Link>
          {' · '}
          <Link to="/terms" className="hover:text-[#F97316] transition-colors">Terms of Service</Link>
        </div>
      </div>

      {/* ── Right Panel ──────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 lg:px-12 xl:px-20 bg-white relative">

        {/* Back link */}
        <Link to="/" className="absolute top-6 left-6 flex items-center gap-1.5 text-xs font-semibold text-[#6B7280] hover:text-[#2D2A26] transition-colors">
          <FiArrowLeft className="w-3.5 h-3.5" /> Home
        </Link>

        {/* Mobile logo */}
        <div className="lg:hidden mb-10">
          <Link to="/" className="inline-flex items-center gap-3">
            <img src="/logo.png" alt="NexHire" className="w-9 h-9 rounded-xl object-contain border border-gray-100 shadow-sm" />
            <span className="text-xl font-bold tracking-tight text-[#2D2A26]">NexHire</span>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="w-full max-w-[400px]"
        >
          {/* Heading */}
          <div className="mb-9">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2D2A26] tracking-tight mb-2">Welcome Back</h2>
            <p className="text-sm text-[#6B7280] font-medium">Sign in to your NexHire account to continue.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Error */}
            {error && (
              <div className="px-4 py-3 bg-red-50 border border-red-100 rounded-xl text-xs font-semibold text-red-600">
                {error}
              </div>
            )}

            {/* Email */}
            <div className="group">
              <label className="block text-[11px] font-bold text-[#6B7280] uppercase tracking-widest mb-1.5">Email Address</label>
              <div className="relative">
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[17px] h-[17px] text-[#9CA3AF] group-focus-within:text-[#F97316] transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  autoFocus
                  className="w-full pl-10 pr-4 py-3 bg-[#FFF8F4] border border-[#F1DDD2] rounded-xl text-sm font-medium text-[#2D2A26] placeholder-[#9CA3AF] focus:outline-none focus:bg-white focus:border-[#FDBA74] focus:ring-4 focus:ring-[#FFF2EA] transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="group">
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-[11px] font-bold text-[#6B7280] uppercase tracking-widest">Password</label>
                <button type="button" className="text-[11px] font-semibold text-[#F97316] hover:text-[#EA580C] transition-colors">Forgot password?</button>
              </div>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[17px] h-[17px] text-[#9CA3AF] group-focus-within:text-[#F97316] transition-colors" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-11 py-3 bg-[#FFF8F4] border border-[#F1DDD2] rounded-xl text-sm font-medium text-[#2D2A26] placeholder-[#9CA3AF] focus:outline-none focus:bg-white focus:border-[#FDBA74] focus:ring-4 focus:ring-[#FFF2EA] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#2D2A26] transition-colors"
                >
                  {showPassword ? <FiEyeOff className="w-[17px] h-[17px]" /> : <FiEye className="w-[17px] h-[17px]" />}
                </button>
              </div>
            </div>

            {/* Sign In */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#F97316] to-[#EA580C] shadow-[0_4px_14px_rgba(249,115,22,0.35)] hover:shadow-[0_6px_18px_rgba(249,115,22,0.45)] hover:-translate-y-px active:translate-y-0 active:scale-[0.99] transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    Signing in...
                  </span>
                ) : 'Sign In'}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-7">
            <div className="flex-1 h-px bg-[#F1DDD2]" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#9CA3AF]">or</span>
            <div className="flex-1 h-px bg-[#F1DDD2]" />
          </div>

          {/* Google SSO */}
          <button
            type="button"
            onClick={async () => {
              setLoading(true)
              try {
                const { GoogleAuthProvider, signInWithPopup } = await import('firebase/auth')
                const provider = new GoogleAuthProvider()
                await signInWithPopup(auth, provider)
                navigate('/dashboard')
              } catch (err: any) {
                console.error('Google Sign-In Error:', err)
                setError(err.message || 'Failed to sign in with Google.')
              } finally {
                setLoading(false)
              }
            }}
            className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl border border-[#F1DDD2] bg-white text-sm font-bold text-[#2D2A26] hover:bg-[#FFF8F4] hover:border-[#FDBA74] active:scale-[0.99] transition-all"
          >
            {/* Google "G" SVG */}
            <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <p className="mt-8 text-center text-sm text-[#6B7280]">
            Don't have an account?{' '}
            <Link to="/register" className="font-bold text-[#F97316] hover:text-[#EA580C] transition-colors">
              Create one
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
