<<<<<<< HEAD
export const SettingsPage = () => {
  return <section><h2>Settings</h2><p>Application settings placeholder.</p></section>
=======
import { useState } from 'react'
import { 
  FiUser, 
  FiKey, 
  FiCpu, 
  FiCreditCard, 
  FiEye, 
  FiCopy 
} from 'react-icons/fi'
import { Card } from '../../components/common/Card'
import { Button } from '../../components/common/Button'
import { Badge } from '../../components/common/Badge'

export const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'weights' | 'api' | 'billing'>('profile')
  
  // Weights State
  const [resumeWeight, setResumeWeight] = useState(40)
  const [githubWeight, setGithubWeight] = useState(30)
  const [linkedinWeight, setLinkedinWeight] = useState(20)
  const [commWeight, setCommWeight] = useState(10)
  
  // API Key States
  const [apiKey, setApiKey] = useState('sk_test_placeholder_key_12345')
  const [showKey, setShowKey] = useState(false)
  const [copied, setCopied] = useState(false)

  // Profile Form States
  const [name, setName] = useState('John Doe')
  const [email, setEmail] = useState('john.doe@enterprise.com')
  const [company, setCompany] = useState('Acme Recruiting Corp')

  const totalWeights = resumeWeight + githubWeight + linkedinWeight + commWeight

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleGenerateKey = () => {
    const randomHex = Array.from({ length: 24 }, () => Math.floor(Math.random() * 16).toString(16)).join('')
    setApiKey(`sk_test_${randomHex}`)
    alert('New Production API Key generated successfully.')
  }

  const handleSaveSettings = () => {
    alert('Settings successfully updated.')
  }

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Workspace Settings</h2>
        <p className="text-xs text-gray-500">Configure recruiter profile, adjust AI parsing metrics, and manage billing credentials.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Tabs Navigation */}
        <div className="lg:col-span-3">
          <Card className="p-3 space-y-1">
            {[
              { id: 'profile', name: 'Profile & Company', icon: FiUser },
              { id: 'weights', name: 'AI Weight Preferences', icon: FiCpu },
              { id: 'api', name: 'API Credentials', icon: FiKey },
              { id: 'billing', name: 'Billing & Subscriptions', icon: FiCreditCard }
            ].map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-colors text-left ${
                    isActive 
                      ? 'bg-blue-50/70 text-[#2563EB]' 
                      : 'text-[#6B7280] hover:text-[#111827] hover:bg-gray-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#2563EB]' : 'text-gray-400'}`} />
                  <span>{tab.name}</span>
                </button>
              )
            })}
          </Card>
        </div>

        {/* Right Column: Tab View */}
        <div className="lg:col-span-9">
          <Card className="p-6 min-h-[380px] flex flex-col justify-between">
            <div>
              {/* Tab 1: Profile & Company */}
              {activeTab === 'profile' && (
                <div className="space-y-5">
                  <div className="border-b border-gray-100 pb-3">
                    <h3 className="font-bold text-sm text-gray-900">Profile & Company Details</h3>
                    <p className="text-[10px] text-gray-400">Edit workspace contact profile details</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-700">Full Name</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563EB] outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-700">Work Email Address</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563EB] outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-xs font-bold text-gray-700">Company Name</label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563EB] outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: AI Weights Sieve */}
              {activeTab === 'weights' && (
                <div className="space-y-5 text-xs">
                  <div className="border-b border-gray-100 pb-3 flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-sm text-gray-900">AI Scoring Metric Weights</h3>
                      <p className="text-[10px] text-gray-400">Configure parameters used to calculate overall candidate suitability match percent.</p>
                    </div>
                    <Badge variant={totalWeights === 100 ? 'success' : 'danger'} className="text-[10px]">
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

              {/* Tab 3: API Credentials */}
              {activeTab === 'api' && (
                <div className="space-y-5 text-xs text-gray-600">
                  <div className="border-b border-gray-100 pb-3">
                    <h3 className="font-bold text-sm text-gray-900">Developer API Keys</h3>
                    <p className="text-[10px] text-gray-400">Integrate candidate analytics with your ATS platform (Greenhouse, Lever, etc.)</p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-gray-700">Production Secret Key</label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <input
                          type={showKey ? 'text' : 'password'}
                          value={apiKey}
                          readOnly
                          className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg text-xs bg-gray-50/50 outline-none font-mono"
                        />
                        <button
                          type="button"
                          onClick={() => setShowKey(!showKey)}
                          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        >
                          <FiEye className="w-4 h-4" />
                        </button>
                      </div>
                      <Button variant="outline" onClick={handleCopyKey} className="gap-1.5">
                        <FiCopy className="w-4.5 h-4.5" /> {copied ? 'Copied' : 'Copy'}
                      </Button>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button onClick={handleGenerateKey} variant="outline" size="sm">
                      Re-generate Production Key
                    </Button>
                  </div>
                </div>
              )}

              {/* Tab 4: Billing & Subscriptions */}
              {activeTab === 'billing' && (
                <div className="space-y-5 text-xs text-gray-600">
                  <div className="border-b border-gray-100 pb-3">
                    <h3 className="font-bold text-sm text-gray-900">Workspace Subscriptions</h3>
                    <p className="text-[10px] text-gray-400">Manage billing plans and credit cards</p>
                  </div>

                  <div className="p-4 rounded-xl border border-blue-150 bg-blue-50/20 flex justify-between items-start">
                    <div className="space-y-1">
                      <h4 className="font-bold text-gray-950 text-sm">Professional Plan</h4>
                      <p className="text-gray-500">Workspace supports unlimited candidate parsing & audits.</p>
                      <p className="text-blue-600 font-extrabold mt-2">$249.00 billed monthly</p>
                    </div>
                    <Badge variant="primary" className="text-[9px] font-bold uppercase py-1">
                      Active Billing
                    </Badge>
                  </div>

                  <div className="space-y-1.5 pt-4 border-t border-gray-100">
                    <h4 className="font-bold text-gray-950 text-xs">Payment Method</h4>
                    <div className="p-3 rounded-lg border border-gray-250 bg-white flex items-center justify-between text-gray-700 font-semibold">
                      <span>•••• •••• •••• 4242 (Visa)</span>
                      <span className="text-[10px] text-gray-400">Expires 12/28</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-gray-100 flex justify-end gap-3">
              <Button variant="outline">Reset Changes</Button>
              <Button onClick={handleSaveSettings} disabled={activeTab === 'weights' && totalWeights !== 100}>
                Save Workspace Settings
              </Button>
            </div>
          </Card>
        </div>

      </div>
    </div>
  )
>>>>>>> 81c760a878bbb7abb2e659b66198862b397b2d39
}
