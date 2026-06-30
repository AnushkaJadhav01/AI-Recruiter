import { auth, database } from "../../firebase/firebase";

import { createUserWithEmailAndPassword } from "firebase/auth";

import { ref, set } from "firebase/database";

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiMail, FiLock, FiArrowLeft, FiUser, FiBriefcase } from 'react-icons/fi'
import { useApp } from '../../contexts/AppContext'

export const RegisterPage = () => {
  const navigate = useNavigate()
  const { loginUser } = useApp()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'Recruiter' | 'Candidate' | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {

  e.preventDefault();

  setError("");

  if (!name.trim()) {
    setError("Please enter your full name.");
    return;
  }

  if (!email.trim()) {
    setError("Please enter a valid email.");
    return;
  }

  if (!password || password.length < 6) {
    setError("Password must be at least 6 characters.");
    return;
  }

  if (!role) {
    setError("Please select Recruiter or Candidate.");
    return;
  }

  setLoading(true);

  try {

    console.log("Creating account...");

    const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
    );

    console.log("User created:", userCredential.user);

    const user = userCredential.user;

    await set(
        ref(database, "users/" + user.uid),
        {
            name,
            email,
            role,
            createdAt: Date.now()
        }
    );

    console.log("Saved to database");

    loginUser({
        name,
        email,
        role
    });

    navigate("/dashboard");

}
catch (err: any) {

    console.error("Firebase Error:", err);

    alert(err.code + "\n" + err.message);

    setError(err.message);

}
finally {

    setLoading(false);

}
}

  return (
    <div className="min-h-screen flex bg-[#FFF8F4]" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* ── Left Panel ───────────────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-[42%] xl:w-[45%] relative flex-col justify-between p-12 xl:p-16 overflow-hidden bg-gradient-to-br from-[#FFF8F4] via-[#FFF2EA] to-[#FFE8D6]">

        {/* Static decorative background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-[480px] h-[480px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(253,186,116,0.1) 0%, transparent 70%)' }} />
          <div className="absolute -bottom-32 -left-16 w-[420px] h-[420px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.07) 0%, transparent 70%)' }} />
          <div className="absolute inset-0 opacity-[0.12]"
            style={{ backgroundImage: 'radial-gradient(circle, #2D2A26 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

          {/* Abstract geometric art — pure shapes, no fake content */}
          <svg className="absolute bottom-8 right-0 w-[85%] opacity-[0.06]" viewBox="0 0 500 460" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="60" y="60" width="380" height="340" rx="24" stroke="#2D2A26" strokeWidth="1.5"/>
            <rect x="100" y="100" width="300" height="260" rx="16" stroke="#2D2A26" strokeWidth="1"/>
            <line x1="100" y1="160" x2="400" y2="160" stroke="#2D2A26" strokeWidth="1"/>
            <line x1="100" y1="220" x2="400" y2="220" stroke="#2D2A26" strokeWidth="1"/>
            <line x1="100" y1="280" x2="320" y2="280" stroke="#2D2A26" strokeWidth="1"/>
            <circle cx="430" cy="100" r="40" stroke="#2D2A26" strokeWidth="1"/>
            <circle cx="430" cy="100" r="25" stroke="#2D2A26" strokeWidth="1"/>
            <circle cx="430" cy="100" r="8" fill="#2D2A26" fillOpacity="0.3"/>
          </svg>

          {/* Accent ring */}
          <div className="absolute top-[30%] left-[5%] w-24 h-24 rounded-full border border-[#F97316]/15" />
        </div>

        {/* Logo */}
        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center gap-3">
            <img src="/logo.png" alt="NexHire" className="w-9 h-9 rounded-xl object-contain bg-white shadow-sm border border-white/80" />
            <span className="text-xl font-bold tracking-tight text-[#2D2A26]">NexHire</span>
          </Link>
        </div>

        {/* Hero copy */}
        <div className="relative z-10 max-w-sm">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F97316] mb-5">Join the Platform</p>
          <h1 className="text-3xl xl:text-4xl font-extrabold text-[#2D2A26] leading-[1.2] tracking-tight mb-5">
            Start hiring smarter from day one.
          </h1>
          <p className="text-sm text-[#6B7280] leading-relaxed font-medium">
            Create your NexHire account to unlock AI-powered screening, skill verification, and autonomous candidate ranking.
          </p>

          <div className="mt-10 space-y-3">
            {['Autonomous candidate screening', 'Verified skill evidence graphs', 'Custom AI reasoning weights'].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#FFF2EA] border border-[#FDBA74] flex items-center justify-center shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F97316]" />
                </div>
                <span className="text-sm font-semibold text-[#2D2A26]">{item}</span>
              </div>
            ))}
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
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10 lg:px-12 xl:px-16 bg-white relative overflow-y-auto">

        {/* Back link */}
        <Link to="/" className="absolute top-6 left-6 flex items-center gap-1.5 text-xs font-semibold text-[#6B7280] hover:text-[#2D2A26] transition-colors">
          <FiArrowLeft className="w-3.5 h-3.5" /> Home
        </Link>

        {/* Mobile logo */}
        <div className="lg:hidden mb-8">
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
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2D2A26] tracking-tight mb-2">Create Your Account</h2>
            <p className="text-sm text-[#6B7280] font-medium">Join NexHire to access AI-powered talent pipelines.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Error */}
            {error && (
              <div className="px-4 py-3 bg-red-50 border border-red-100 rounded-xl text-xs font-semibold text-red-600">
                {error}
              </div>
            )}

            {/* Full Name */}
            <div className="group">
              <label className="block text-[11px] font-bold text-[#6B7280] uppercase tracking-widest mb-1.5">Full Name</label>
              <div className="relative">
                <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[17px] h-[17px] text-[#9CA3AF] group-focus-within:text-[#F97316] transition-colors" />
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="John Doe"
                  autoFocus
                  className="w-full pl-10 pr-4 py-3 bg-[#FFF8F4] border border-[#F1DDD2] rounded-xl text-sm font-medium text-[#2D2A26] placeholder-[#9CA3AF] focus:outline-none focus:bg-white focus:border-[#FDBA74] focus:ring-4 focus:ring-[#FFF2EA] transition-all"
                />
              </div>
            </div>

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
                  className="w-full pl-10 pr-4 py-3 bg-[#FFF8F4] border border-[#F1DDD2] rounded-xl text-sm font-medium text-[#2D2A26] placeholder-[#9CA3AF] focus:outline-none focus:bg-white focus:border-[#FDBA74] focus:ring-4 focus:ring-[#FFF2EA] transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="group">
              <label className="block text-[11px] font-bold text-[#6B7280] uppercase tracking-widest mb-1.5">Password</label>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[17px] h-[17px] text-[#9CA3AF] group-focus-within:text-[#F97316] transition-colors" />
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full pl-10 pr-4 py-3 bg-[#FFF8F4] border border-[#F1DDD2] rounded-xl text-sm font-medium text-[#2D2A26] placeholder-[#9CA3AF] focus:outline-none focus:bg-white focus:border-[#FDBA74] focus:ring-4 focus:ring-[#FFF2EA] transition-all"
                />
              </div>
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-[11px] font-bold text-[#6B7280] uppercase tracking-widest mb-2">I am a...</label>
              <div className="grid grid-cols-2 gap-3">

                <button
                  type="button"
                  onClick={() => setRole('Recruiter')}
                  className={`flex flex-col items-center justify-center gap-2 py-5 px-4 rounded-xl border-2 transition-all ${
                    role === 'Recruiter'
                      ? 'border-[#F97316] bg-[#FFF2EA]'
                      : 'border-[#F1DDD2] bg-[#FFF8F4] hover:border-[#FDBA74] hover:bg-[#FFF2EA]/50'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                    role === 'Recruiter' ? 'bg-[#F97316] text-white' : 'bg-white border border-[#F1DDD2] text-[#9CA3AF]'
                  }`}>
                    <FiBriefcase className="w-5 h-5" />
                  </div>
                  <span className={`text-sm font-bold transition-colors ${role === 'Recruiter' ? 'text-[#F97316]' : 'text-[#2D2A26]'}`}>
                    Recruiter
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setRole('Candidate')}
                  className={`flex flex-col items-center justify-center gap-2 py-5 px-4 rounded-xl border-2 transition-all ${
                    role === 'Candidate'
                      ? 'border-[#F97316] bg-[#FFF2EA]'
                      : 'border-[#F1DDD2] bg-[#FFF8F4] hover:border-[#FDBA74] hover:bg-[#FFF2EA]/50'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                    role === 'Candidate' ? 'bg-[#F97316] text-white' : 'bg-white border border-[#F1DDD2] text-[#9CA3AF]'
                  }`}>
                    <FiUser className="w-5 h-5" />
                  </div>
                  <span className={`text-sm font-bold transition-colors ${role === 'Candidate' ? 'text-[#F97316]' : 'text-[#2D2A26]'}`}>
                    Candidate
                  </span>
                </button>

              </div>
            </div>

            {/* Submit */}
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
                    Creating Account...
                  </span>
                ) : 'Create Account'}
              </button>
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-[#6B7280]">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-[#F97316] hover:text-[#EA580C] transition-colors">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
