<<<<<<< HEAD
export const RegisterPage = () => {
  return <section><h2>Register</h2><p>Registration flow placeholder.</p></section>
=======
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMail, FiLock, FiArrowRight, FiArrowLeft, FiUser, FiBriefcase, FiCompass } from 'react-icons/fi'
import { Button } from '../../components/common/Button'
import { Card } from '../../components/common/Card'

export const RegisterPage = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  
  // Registration data
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'recruiter' | 'hr' | 'company' | null>(null)
  const [companyName, setCompanyName] = useState('')
  const [companySize, setCompanySize] = useState('')

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleNextStep = () => {
    setError('')
    if (step === 1) {
      if (!email) {
        setError('Please enter a valid email address.')
        return
      }
      if (!password || password.length < 6) {
        setError('Password must be at least 6 characters.')
        return
      }
      setStep(2)
    } else if (step === 2) {
      if (!role) {
        setError('Please select your hiring role.')
        return
      }
      setStep(3)
    }
  }

  const handleBackStep = () => {
    setError('')
    setStep(prev => prev - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!companyName) {
      setError('Please enter your company name.')
      return
    }
    if (!companySize) {
      setError('Please select your company size.')
      return
    }

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate('/dashboard')
    }, 1200)
  }

  const roles = [
    { id: 'recruiter', title: 'Independent Recruiter', desc: 'Sourcing and screening candidates for clients.', icon: FiUser },
    { id: 'hr', title: 'In-house HR Specialist', desc: 'Hiring internally for engineering teams.', icon: FiBriefcase },
    { id: 'company', title: 'Company Admin / Executive', desc: 'Managing workspace licensing and billing.', icon: FiCompass }
  ]

  return (
    <div className="min-h-screen bg-[#FAFBFC] font-sans flex items-center justify-center px-6 py-16">
      
      {/* Back Button */}
      <Link to="/" className="fixed top-6 left-6 z-20 flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors">
        <FiArrowLeft className="w-4 h-4" /> Back to home
      </Link>

      <div className="w-full max-w-lg space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-3 font-semibold text-lg justify-center">
            <div className="w-8 h-8 rounded-lg bg-[#2563EB] flex items-center justify-center text-white font-extrabold text-sm">
              AR
            </div>
            <span className="text-gray-900 font-bold tracking-tight">Recruiter.ai</span>
          </Link>
          <h3 className="text-xl font-extrabold text-gray-950">Create your recruiter workspace</h3>
          <p className="text-xs text-gray-500">Get set up and start matching resumes in minutes</p>
        </div>

        {/* Progress Bar */}
        <div className="relative">
          <div className="overflow-hidden h-1.5 text-xs flex rounded bg-gray-200">
            <motion.div 
              animate={{ width: `${(step / 3) * 100}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#2563EB]"
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-gray-400 mt-2 font-bold uppercase tracking-wider">
            <span className={step >= 1 ? 'text-[#2563EB]' : ''}>Account Setup</span>
            <span className={step >= 2 ? 'text-[#2563EB]' : ''}>Your Role</span>
            <span className={step >= 3 ? 'text-[#2563EB]' : ''}>Workspace Details</span>
          </div>
        </div>

        {/* Form Container */}
        <Card className="p-8 border-gray-200/80 min-h-[360px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            
            {/* Step 1: Account credentials */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-5"
              >
                <h4 className="font-bold text-sm text-gray-900">Step 1: Set up your account credentials</h4>
                
                {error && (
                  <div className="p-3 bg-red-50 text-red-600 rounded-lg text-xs font-semibold border border-red-100">
                    {error}
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">Work Email</label>
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

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">Choose Password</label>
                  <div className="relative">
                    <FiLock className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="At least 6 characters"
                      className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563EB] outline-none transition-all placeholder-gray-400"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <Button onClick={handleNextStep} className="gap-2">
                    Next Step <FiArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Role Selection */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-5"
              >
                <h4 className="font-bold text-sm text-gray-900">Step 2: Choose your role</h4>
                
                {error && (
                  <div className="p-3 bg-red-50 text-red-600 rounded-lg text-xs font-semibold border border-red-100">
                    {error}
                  </div>
                )}

                <div className="space-y-3">
                  {roles.map((r) => {
                    const isSelected = role === r.id
                    const Icon = r.icon
                    return (
                      <div
                        key={r.id}
                        onClick={() => setRole(r.id as any)}
                        className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                          isSelected 
                            ? 'border-[#2563EB] bg-blue-50/20 ring-2 ring-blue-500/5' 
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50/50'
                        }`}
                      >
                        <div className={`p-2 rounded-lg ${isSelected ? 'bg-blue-100 text-[#2563EB]' : 'bg-gray-100 text-gray-500'}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="text-left">
                          <p className="text-xs font-bold text-gray-950">{r.title}</p>
                          <p className="text-[10px] text-gray-500 mt-0.5 leading-relaxed">{r.desc}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="pt-4 flex justify-between">
                  <Button variant="ghost" onClick={handleBackStep} className="gap-2">
                    <FiArrowLeft className="w-4 h-4" /> Back
                  </Button>
                  <Button onClick={handleNextStep} className="gap-2">
                    Next Step <FiArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Workspace setup */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-5"
              >
                <h4 className="font-bold text-sm text-gray-900">Step 3: Tell us about your company</h4>
                
                {error && (
                  <div className="p-3 bg-red-50 text-red-600 rounded-lg text-xs font-semibold border border-red-100">
                    {error}
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">Company Name</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Acme Corp"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563EB] outline-none transition-all placeholder-gray-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">Company Size</label>
                  <select
                    value={companySize}
                    onChange={(e) => setCompanySize(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563EB] outline-none transition-all text-gray-700"
                  >
                    <option value="">Select size...</option>
                    <option value="1-10">1-10 Employees</option>
                    <option value="11-50">11-50 Employees</option>
                    <option value="51-200">51-200 Employees</option>
                    <option value="201+">201+ Employees</option>
                  </select>
                </div>

                <div className="pt-4 flex justify-between">
                  <Button variant="ghost" onClick={handleBackStep} className="gap-2">
                    <FiArrowLeft className="w-4 h-4" /> Back
                  </Button>
                  <Button onClick={handleSubmit} disabled={loading}>
                    {loading ? 'Creating Workspace...' : 'Complete Workspace Setup'}
                  </Button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </Card>

        {/* Footnote */}
        <p className="text-center text-xs text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-blue-600 hover:underline">
            Sign in instead
          </Link>
        </p>
      </div>

    </div>
  )
>>>>>>> 81c760a878bbb7abb2e659b66198862b397b2d39
}
