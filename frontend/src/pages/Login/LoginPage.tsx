import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowLeft, FiChrome } from 'react-icons/fi'
import { Button } from '../../components/common/Button'
import { Card } from '../../components/common/Card'

export const LoginPage = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    // Basic validation
    if (!email) {
      setError('Please enter your email address.')
      return
    }
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      // Navigate to dashboard
      navigate('/dashboard')
    }, 1200)
  }

  return (
    <div className="min-h-screen flex bg-[#FAFBFC] font-sans">
      
      {/* Back to Home Button */}
      <Link to="/" className="fixed top-6 left-6 z-20 flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors">
        <FiArrowLeft className="w-4 h-4" /> Back to home
      </Link>

      {/* Left Pane - Stats & Branding (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white flex-col justify-between p-12 relative overflow-hidden">
        {/* Subtle grid layout background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        
        {/* Logo */}
        <div className="flex items-center gap-3 font-semibold text-lg relative z-10">
          <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center text-white font-extrabold text-sm border border-white/20">
            AR
          </div>
          <span className="tracking-tight text-white font-bold">Recruiter<span className="text-blue-200">.ai</span></span>
        </div>

        {/* Testimonial / Features */}
        <div className="space-y-8 max-w-md relative z-10 my-auto">
          <div className="space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-200">Enterprise AI Recruitment</span>
            <h2 className="text-3xl font-extrabold tracking-tight leading-tight">
              Recruiting pipeline, powered by intelligence.
            </h2>
            <p className="text-xs text-blue-100 leading-relaxed">
              We parsed and scored over 5,000 resume applications for our engineering team, reducing overall screening time by 76% in our first quarter.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md space-y-3">
            <p className="text-xs italic text-blue-50">
              "Recruiter.ai completely replaced our manual triage phase. The resume scoring is incredibly accurate and matches candidates exactly based on technology stack."
            </p>
            <div>
              <p className="text-xs font-bold text-white">David Miller</p>
              <p className="text-[10px] text-blue-200">Director of Engineering at Stripe</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center text-[10px] text-blue-200 relative z-10">
          <span>© {new Date().getFullYear()} Recruiter.ai</span>
          <span className="hover:underline cursor-pointer">Privacy & Terms</span>
        </div>
      </div>

      {/* Right Pane - Form Card */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 md:px-12 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md space-y-8"
        >
          <div className="space-y-2">
            <h3 className="text-2xl font-extrabold text-gray-950">Welcome back</h3>
            <p className="text-xs text-gray-500">Sign in to your Recruiter.ai workspace</p>
          </div>

          {/* Form */}
          <Card className="p-8 border-gray-200/80">
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Error Callout */}
              {error && (
                <div className="p-3 bg-red-50 text-red-600 rounded-lg text-xs font-semibold border border-red-100">
                  {error}
                </div>
              )}

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">Email Address</label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563EB] outline-none transition-all placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-gray-700">Password</label>
                  <span className="text-[10px] text-blue-600 hover:underline cursor-pointer">Forgot password?</span>
                </div>
                <div className="relative">
                  <FiLock className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-10 py-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563EB] outline-none transition-all placeholder-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center">
                <input
                  id="remember_me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                />
                <label htmlFor="remember_me" className="ml-2 block text-xs text-gray-600 cursor-pointer select-none">
                  Keep me signed in for 30 days
                </label>
              </div>

              {/* Submit */}
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-3 text-gray-400">or continue with</span>
              </div>
            </div>

            {/* Google OAuth Single Sign-on */}
            <Button
              variant="outline"
              onClick={() => {
                setLoading(true)
                setTimeout(() => {
                  setLoading(false)
                  navigate('/dashboard')
                }, 1000)
              }}
              className="w-full gap-2 text-xs"
            >
              <FiChrome className="w-4 h-4" /> Continue with Google SSO
            </Button>
          </Card>

          <p className="text-center text-xs text-gray-500">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-blue-600 hover:underline">
              Create an account
            </Link>
          </p>
        </motion.div>
      </div>

    </div>
  )
}
