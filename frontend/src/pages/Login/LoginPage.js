import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';
import { IoLogoGoogle, IoMailOutline, IoLockClosedOutline } from 'react-icons/io5';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';

const LoginPage = () => {
  const navigate = useNavigate();
  const { loginUser } = useApp();
  const [email, setEmail] = useState('anushka@recruiter.ai');
  const [password, setPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    // Simulate auth login
    const isCandidate = email.includes('cand') || email.includes('candidate');
    const mockUser = {
      name: isCandidate ? "Sarah Jenkins" : "Anushka Recruiter",
      email: email,
      role: isCandidate ? "Candidate" : "Recruiter"
    };

    loginUser(mockUser);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-slate-50 dark:bg-slate-950">
      {/* Left Form Panel */}
      <div className="flex flex-col justify-center px-6 py-12 sm:px-12 md:px-20 lg:px-24">
        <div className="max-w-md w-full mx-auto space-y-8">
          {/* Logo & Header */}
          <div className="text-left">
            <Link to="/" className="flex items-center gap-2.5 font-bold text-sm text-textPrimary mb-6">
              <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center text-white">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="text-textPrimary dark:text-white font-bold">AI Recruiter</span>
            </Link>
            <h2 className="text-2xl font-bold text-textPrimary dark:text-white tracking-tight">
              Welcome back
            </h2>
            <p className="mt-1 text-xs text-textSecondary dark:text-slate-400">
              Sign in to manage candidates and jobs with AI recommendations
            </p>
          </div>

          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/20 text-xs font-semibold text-customError border border-red-200 dark:border-red-900/50">
                  {error}
                </div>
              )}
              
              <Input
                label="Email Address"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
                icon={IoMailOutline}
              />

              <Input
                label="Password"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                icon={IoLockClosedOutline}
              />

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-customBorder dark:border-slate-800 text-primary focus:ring-primary focus:outline-none"
                  />
                  <span className="text-xs text-textSecondary dark:text-slate-400 select-none">Remember me</span>
                </label>
                <a href="#forgot" className="text-xs font-semibold text-primary hover:underline">
                  Forgot password?
                </a>
              </div>

              <Button type="submit" fullWidth className="py-2.5">
                Sign In
              </Button>
            </form>

            <div className="relative my-6 text-center">
              <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-b border-customBorder dark:border-slate-800" />
              <span className="relative bg-white dark:bg-slate-900 px-3 text-[10px] text-textSecondary dark:text-slate-400 uppercase tracking-wider">
                Or continue with
              </span>
            </div>

            <Button
              variant="outline"
              fullWidth
              icon={IoLogoGoogle}
              onClick={() => {
                loginUser({ name: "Anushka Recruiter", email: "anushka@recruiter.ai", role: "Recruiter" });
                navigate('/dashboard');
              }}
              className="py-2.5"
            >
              Sign in with Google
            </Button>
          </Card>

          <p className="text-center text-xs text-textSecondary dark:text-slate-400 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="font-bold text-primary hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>

      {/* Right Marketing Panel */}
      <div className="hidden md:flex flex-col justify-between p-12 lg:p-16 bg-gradient-to-br from-blue-600 to-indigo-700 text-white relative overflow-hidden">
        {/* Abstract design elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.06),transparent)]" />
        <div className="absolute top-1/3 -right-20 w-80 h-80 bg-cyan-400/20 rounded-full blur-[80px]" />
        
        <div className="relative z-10 flex items-center gap-2.5 font-bold text-sm">
          <div className="h-7 w-7 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center text-white">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <span>AI Recruiter</span>
        </div>

        <div className="relative z-10 max-w-lg space-y-6 my-auto text-left">
          <h3 className="text-3xl lg:text-4xl font-bold tracking-tight leading-tight">
            Source tech talent <br />10x faster.
          </h3>
          <p className="text-slate-200 text-sm leading-relaxed font-medium">
            Join thousands of recruiters using our integrated GitHub code rating and LinkedIn crawling pipelines. No more wading through endless spreadsheets.
          </p>
          <div className="bg-white/10 backdrop-blur-md border border-white/10 p-5 rounded-premium flex items-start gap-4">
            <div className="text-cyan-400 mt-0.5">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold text-white">AI Recruiting Tip</p>
              <p className="text-[11px] text-slate-200 mt-1 leading-relaxed">
                Candidates with high GitHub scoring (90+) represent the top 5% of open source contributors in our database.
              </p>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex justify-between items-center text-xs text-slate-300">
          <span>Secure SOC2 Compliant</span>
          <span>© AI Recruiter</span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
