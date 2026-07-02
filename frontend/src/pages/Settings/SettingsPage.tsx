import React, { useState, useEffect } from 'react'
import { FiUser, FiCpu } from 'react-icons/fi'
import { Card } from '../../components/common/Card'
import { Button } from '../../components/common/Button'
import { Badge } from '../../components/common/Badge'
import { useApp } from '../../contexts/AppContext'

export const SettingsPage = () => {
  const { currentUser } = useApp()
  const isCandidate = currentUser?.role === 'Candidate'
  
  const [activeTab, setActiveTab] = useState<'profile' | 'weights'>('profile')
  
  // Weights State (Recruiter only)
  const [resumeWeight, setResumeWeight] = useState(40)
  const [githubWeight, setGithubWeight] = useState(30)
  const [linkedinWeight, setLinkedinWeight] = useState(20)
  const [commWeight, setCommWeight] = useState(10)
  
  // Profile Form States (Recruiter)
  const [recruiterName, setRecruiterName] = useState('Anushka Recruiter')
  const [recruiterEmail, setRecruiterEmail] = useState('anushka@recruiter.ai')
  const [company, setCompany] = useState('Google DeepMind Recruitment')

  // Profile Form States (Candidate)
  const [candName, setCandName] = useState('Sarah Jenkins')
  const [candEmail, setCandEmail] = useState('sarah.jenkins@stanford.edu')
  const [targetRole, setTargetRole] = useState('Senior Full-Stack Developer')
  const [location, setLocation] = useState('San Francisco, CA (Remote)')
  const [portfolio, setPortfolio] = useState('https://sarahj-codes.dev')

  // Set default form values from current user context
  useEffect(() => {
    if (currentUser) {
      if (isCandidate) {
        setCandName(currentUser.name || '')
        setCandEmail(currentUser.email || '')
        setTargetRole(currentUser.targetRole || 'Senior Full-Stack Developer')
        setLocation(currentUser.location || '')
        setPortfolio(currentUser.portfolio || currentUser.githubUsername || '')
      } else {
        setRecruiterName(currentUser.name || '')
        setRecruiterEmail(currentUser.email || '')
        setCompany(currentUser.company || 'Google DeepMind Recruitment')
        
        if (currentUser.weights) {
          setResumeWeight(currentUser.weights.resumeWeight ?? 40)
          setGithubWeight(currentUser.weights.githubWeight ?? 30)
          setLinkedinWeight(currentUser.weights.linkedinWeight ?? 20)
          setCommWeight(currentUser.weights.commWeight ?? 10)
        }
      }
    }
  }, [currentUser, isCandidate])

  const totalWeights = resumeWeight + githubWeight + linkedinWeight + commWeight

  const { updateUserProfile } = useApp()

  const handleSaveSettings = () => {
    if (isCandidate) {
      updateUserProfile({
        name: candName,
        email: candEmail,
        targetRole,
        location,
        portfolio
      })
    } else {
      updateUserProfile({
        name: recruiterName,
        email: recruiterEmail,
        company,
        weights: {
          resumeWeight,
          githubWeight,
          linkedinWeight,
          commWeight
        }
      })
    }
    alert('Settings successfully updated and saved to your profile.')
  }

  // Define tab navigation based on role
  const tabs = isCandidate 
    ? [{ id: 'profile', name: 'Profile & Account', icon: FiUser }]
    : [
        { id: 'profile', name: 'Profile & Company', icon: FiUser },
        { id: 'weights', name: 'AI Weight Preferences', icon: FiCpu }
      ]

  return (
    <div className="space-y-6 text-left max-w-4xl mx-auto">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
          {isCandidate ? 'Candidate Settings' : 'Workspace Settings'}
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          {isCandidate 
            ? 'Manage your personal account profile, contact credentials, and engineering target preferences.'
            : 'Configure recruiter profile contact info, company detail headers, and customize AI matching metric filters.'
          }
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Left Column: Tabs Navigation */}
        <div className="md:col-span-1">
          <Card className="p-3 space-y-1 bg-white border border-gray-200 shadow-sm">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold transition-colors text-left ${
                    isActive 
                      ? 'bg-blue-50 text-[#F97316]' 
                      : 'text-[#6B7280] hover:text-[#2D2A26] hover:bg-gray-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#F97316]' : 'text-gray-450'}`} />
                  <span>{tab.name}</span>
                </button>
              )
            })}
          </Card>
        </div>

        {/* Right Column: Tab View */}
        <div className="md:col-span-3">
          <Card className="p-6 min-h-[380px] bg-white border border-gray-200 shadow-sm flex flex-col justify-between">
            <div>
              {/* Tab 1: Profile View */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div className="border-b border-gray-150 pb-3">
                    <h3 className="font-extrabold text-sm text-gray-900">
                      {isCandidate ? 'Personal Account Details' : 'Recruiter & Company Details'}
                    </h3>
                    <p className="text-[10px] text-gray-400">Edit your contact details and active preferences</p>
                  </div>

                  {isCandidate ? (
                    /* Candidate Form */
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5 text-xs">
                        <label className="font-bold text-gray-700">Full Name</label>
                        <input
                          type="text"
                          value={candName}
                          onChange={(e) => setCandName(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#F97316] transition-all font-medium text-gray-800"
                        />
                      </div>

                      <div className="space-y-1.5 text-xs">
                        <label className="font-bold text-gray-700">Email Address</label>
                        <input
                          type="email"
                          value={candEmail}
                          onChange={(e) => setCandEmail(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#F97316] transition-all font-medium text-gray-800"
                        />
                      </div>

                      <div className="space-y-1.5 text-xs">
                        <label className="font-bold text-gray-700">Target Job Title</label>
                        <input
                          type="text"
                          value={targetRole}
                          onChange={(e) => setTargetRole(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#F97316] transition-all font-medium text-gray-800"
                        />
                      </div>

                      <div className="space-y-1.5 text-xs">
                        <label className="font-bold text-gray-700">Current Location</label>
                        <input
                          type="text"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#F97316] transition-all font-medium text-gray-800"
                        />
                      </div>

                      <div className="space-y-1.5 text-xs sm:col-span-2">
                        <label className="font-bold text-gray-700">Portfolio or GitHub Website</label>
                        <input
                          type="text"
                          value={portfolio}
                          onChange={(e) => setPortfolio(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#F97316] transition-all font-medium text-gray-800"
                        />
                      </div>
                    </div>
                  ) : (
                    /* Recruiter Form */
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5 text-xs">
                        <label className="font-bold text-gray-700">Recruiter Full Name</label>
                        <input
                          type="text"
                          value={recruiterName}
                          onChange={(e) => setRecruiterName(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#F97316] transition-all font-medium text-gray-800"
                        />
                      </div>

                      <div className="space-y-1.5 text-xs">
                        <label className="font-bold text-gray-700">Work Email Address</label>
                        <input
                          type="email"
                          value={recruiterEmail}
                          onChange={(e) => setRecruiterEmail(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#F97316] transition-all font-medium text-gray-800"
                        />
                      </div>

                      <div className="space-y-1.5 text-xs sm:col-span-2">
                        <label className="font-bold text-gray-700">Recruiting Organization / Company</label>
                        <input
                          type="text"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#F97316] transition-all font-medium text-gray-800"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2: AI Weights Sieve (Recruiter Only) */}
              {!isCandidate && activeTab === 'weights' && (
                <div className="space-y-5 text-xs">
                  <div className="border-b border-gray-150 pb-3 flex justify-between items-center flex-wrap gap-2">
                    <div>
                      <h3 className="font-extrabold text-sm text-gray-900">AI Scoring Metric Weights</h3>
                      <p className="text-[10px] text-gray-400">Configure parameters used to calculate overall candidate suitability match percent.</p>
                    </div>
                    <Badge variant={totalWeights === 100 ? 'success' : 'danger'} className="text-[10px] uppercase font-bold tracking-wider">
                      Total: {totalWeights}%
                    </Badge>
                  </div>

                  {totalWeights !== 100 && (
                    <div className="p-3 bg-red-50 text-red-600 rounded-lg font-bold border border-red-100">
                      Warning: Metric weights must total exactly 100%. Currently it is {totalWeights}%.
                    </div>
                  )}

                  <div className="space-y-5">
                    {/* Resume Weight */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-gray-400">
                        <span>Resume Work History & Tenure</span>
                        <span className="text-gray-900 normal-case font-extrabold text-xs">{resumeWeight}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={resumeWeight}
                        onChange={(e) => setResumeWeight(Number(e.target.value))}
                        className="w-full accent-blue-600 h-1.5 bg-gray-200 rounded-lg cursor-pointer"
                      />
                    </div>

                    {/* GitHub Weight */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-gray-400">
                        <span>GitHub Code Audit & Activity</span>
                        <span className="text-gray-900 normal-case font-extrabold text-xs">{githubWeight}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={githubWeight}
                        onChange={(e) => setGithubWeight(Number(e.target.value))}
                        className="w-full accent-blue-600 h-1.5 bg-gray-200 rounded-lg cursor-pointer"
                      />
                    </div>

                    {/* LinkedIn Weight */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-gray-400">
                        <span>LinkedIn Career Progression</span>
                        <span className="text-gray-900 normal-case font-extrabold text-xs">{linkedinWeight}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={linkedinWeight}
                        onChange={(e) => setLinkedinWeight(Number(e.target.value))}
                        className="w-full accent-blue-600 h-1.5 bg-gray-200 rounded-lg cursor-pointer"
                      />
                    </div>

                    {/* Communication Weight */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-gray-400">
                        <span>Communication & Vibe Screening</span>
                        <span className="text-gray-900 normal-case font-extrabold text-xs">{commWeight}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={commWeight}
                        onChange={(e) => setCommWeight(Number(e.target.value))}
                        className="w-full accent-blue-600 h-1.5 bg-gray-200 rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-gray-150 flex justify-end gap-3">
              <Button variant="outline" className="text-xs font-semibold">Reset Changes</Button>
              <Button 
                onClick={handleSaveSettings} 
                disabled={!isCandidate && activeTab === 'weights' && totalWeights !== 100}
                className="text-xs font-semibold"
              >
                {isCandidate ? 'Save Account Profile' : 'Save Workspace Settings'}
              </Button>
            </div>
          </Card>
        </div>

      </div>
    </div>
  )
}
