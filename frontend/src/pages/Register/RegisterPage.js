import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';
import { IoMailOutline, IoLockClosedOutline, IoPersonOutline } from 'react-icons/io5';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { loginUser } = useApp();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Recruiter'); // Recruiter, Candidate
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName || !email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    // Simulate user creation
    const mockUser = {
      name: fullName,
      email: email,
      role: role
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
              Create an account
            </h2>
            <p className="mt-1 text-xs text-textSecondary dark:text-slate-400">
              Start building high-performing dev teams in minutes
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
                label="Full Name"
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Jane Doe"
                required
                icon={IoPersonOutline}
              />
              
              <Input
                label="Email Address"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@company.com"
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

              {/* Role Select Buttons */}
              <div>
                <label className="block text-xs font-semibold text-textSecondary dark:text-slate-400 mb-2">
                  I want to use AI Recruiter as:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole('Recruiter')}
                    className={`py-2 px-3 text-xs font-bold rounded-premium border transition-all text-center ${
                      role === 'Recruiter'
                        ? 'border-primary bg-blue-50/50 dark:bg-blue-950/25 text-primary'
                        : 'border-customBorder dark:border-slate-800 text-textSecondary hover:bg-slate-50 dark:hover:bg-slate-850'
                    }`}
                  >
                    💼 A Recruiter
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('Candidate')}
                    className={`py-2 px-3 text-xs font-bold rounded-premium border transition-all text-center ${
                      role === 'Candidate'
                        ? 'border-primary bg-blue-50/50 dark:bg-blue-950/25 text-primary'
                        : 'border-customBorder dark:border-slate-800 text-textSecondary hover:bg-slate-50 dark:hover:bg-slate-850'
                    }`}
                  >
                    👤 A Candidate
                  </button>
                </div>
              </div>

              <Button type="submit" fullWidth className="py-2.5">
                Register Account
              </Button>
            </form>
          </Card>

          <p className="text-center text-xs text-textSecondary dark:text-slate-400 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-primary hover:underline">
              Log in instead
            </Link>
          </p>
        </div>
      </div>

      {/* Right Marketing Panel */}
      <div className="hidden md:flex flex-col justify-between p-12 lg:p-16 bg-gradient-to-br from-blue-600 to-indigo-700 text-white relative overflow-hidden">
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
            The intelligent candidate platform.
          </h3>
          <p className="text-slate-200 text-sm leading-relaxed font-medium">
            AI Recruiter extracts details, rates repositories, evaluates profiles, and generates custom checklists—all automatically. Join thousands of high-velocity recruiting teams.
          </p>
          <div className="bg-white/10 backdrop-blur-md border border-white/10 p-5 rounded-premium flex items-start gap-4">
            <div className="text-cyan-400 mt-0.5">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Ashby / Greenhouse Compatible</p>
              <p className="text-[11px] text-slate-200 mt-1 leading-relaxed">
                Connect and sync profiles automatically. Standard API integrations allow single-click imports.
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

export default RegisterPage;
