import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  FiBriefcase, 
  FiClock, 
  FiArrowRight,
  FiActivity,
  FiCpu,
  FiPlus,
  FiUpload,
  FiRefreshCw,
  FiFileText,
  FiUsers,
  FiTarget,
  FiCheckCircle
} from 'react-icons/fi'
import { Card } from '../../components/common/Card'
import { Button } from '../../components/common/Button'
import { Badge } from '../../components/common/Badge'

export const DashboardPage = () => {
  const navigate = useNavigate()

  const workspaces = [
    {
      id: 1,
      title: 'ML Engineer Hiring',
      department: 'AI Research',
      status: 'Active',
      lastUpdated: '10 mins ago',
      candidateCount: 142,
      aiProcessingStatus: 'Complete',
      aiMatchAverage: 88,
      pipeline: { 
        sourced: 142, 
        recentlyAnalyzed: 12, 
        shortlisted: 5, 
        pendingInterviews: 2 
      },
    },
    {
      id: 2,
      title: 'Backend Engineer Hiring',
      department: 'Infrastructure',
      status: 'Processing',
      lastUpdated: '1 hr ago',
      candidateCount: 412,
      aiProcessingStatus: 'Analyzing 42 resumes...',
      aiMatchAverage: 82,
      pipeline: { 
        sourced: 412, 
        recentlyAnalyzed: 42, 
        shortlisted: 18, 
        pendingInterviews: 4 
      },
    },
    {
      id: 3,
      title: 'AI Research Intern',
      department: 'Research',
      status: 'Active',
      lastUpdated: '2 days ago',
      candidateCount: 86,
      aiProcessingStatus: 'Complete',
      aiMatchAverage: 76,
      pipeline: { 
        sourced: 86, 
        recentlyAnalyzed: 0, 
        shortlisted: 3, 
        pendingInterviews: 1 
      },
    },
    {
      id: 4,
      title: 'Frontend Developer',
      department: 'Product',
      status: 'Draft',
      lastUpdated: '3 days ago',
      candidateCount: 0,
      aiProcessingStatus: 'Awaiting Candidates',
      aiMatchAverage: 0,
      pipeline: { 
        sourced: 0, 
        recentlyAnalyzed: 0, 
        shortlisted: 0, 
        pendingInterviews: 0 
      },
    }
  ]

  const recentActivity = [
    { id: 1, action: 'AI Role Persona generated', target: 'Frontend Developer', time: '10 mins ago', icon: FiBriefcase },
    { id: 2, action: 'Multi-Agent Evaluation completed', target: 'Alex Mercer (Backend)', time: '1 hour ago', icon: FiCpu },
    { id: 3, action: 'Interview recommended', target: 'Sarah Jenkins (ML)', time: '5 hours ago', icon: FiCheckCircle },
  ]

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">Hiring Workspaces</h2>
          <p className="text-xs text-gray-500 mt-1 font-medium">Manage your active campaigns, review AI processing statuses, and monitor pipeline health.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/upload-job">
            <Button className="gap-2 shadow-sm font-semibold">
              <FiPlus className="w-4 h-4" /> Create Workspace
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* Left Side: Workspaces */}
        <div className="xl:col-span-8 space-y-6">
          
          <div className="space-y-6">
            {workspaces.map((workspace, idx) => (
              <motion.div 
                key={workspace.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
              >
                <Card className="p-0 overflow-hidden hover:border-gray-300 transition-colors bg-white shadow-sm">
                  {/* Card Header */}
                  <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between sm:items-start gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1.5">
                        <h4 className="font-extrabold text-lg text-gray-950">{workspace.title}</h4>
                        <Badge variant={workspace.status === 'Active' ? 'success' : workspace.status === 'Processing' ? 'primary' : 'neutral'} className="text-[10px] uppercase tracking-wider font-bold">
                          {workspace.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500 font-medium flex items-center gap-2">
                        {workspace.department} 
                        <span className="text-gray-300">•</span>
                        <span className="inline-flex items-center gap-1"><FiClock className="w-3.5 h-3.5" /> Last updated: {workspace.lastUpdated}</span>
                      </p>
                    </div>
                    
                    {/* Primary Action */}
                    <Button onClick={() => navigate('/discovery')} className="text-xs font-semibold shrink-0 gap-1.5">
                      Open Workspace <FiArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </div>

                  {/* Core Metrics & Pipeline */}
                  <div className="p-6 bg-gray-50/50">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      
                      {/* AI Intelligence Metrics */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-200 shadow-sm">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                              <FiCpu className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">AI Processing</p>
                              <p className={`text-xs font-semibold ${workspace.status === 'Processing' ? 'text-blue-600 animate-pulse' : 'text-gray-900'}`}>
                                {workspace.aiProcessingStatus}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-200 shadow-sm">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                              <FiTarget className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Average Match</p>
                              <p className="text-xs font-bold text-gray-900">{workspace.aiMatchAverage}% System Average</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Pipeline Status */}
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">Pipeline Status</p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          <div className="text-center bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                            <p className="text-xl font-extrabold text-gray-900">{workspace.pipeline.sourced}</p>
                            <p className="text-[9px] font-bold text-gray-500 uppercase mt-1">Candidates</p>
                          </div>
                          <div className="text-center bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                            <p className="text-xl font-extrabold text-blue-600">{workspace.pipeline.recentlyAnalyzed}</p>
                            <p className="text-[9px] font-bold text-gray-500 uppercase mt-1">Recently Analyzed</p>
                          </div>
                          <div className="text-center bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                            <p className="text-xl font-extrabold text-emerald-600">{workspace.pipeline.shortlisted}</p>
                            <p className="text-[9px] font-bold text-gray-500 uppercase mt-1">Shortlisted</p>
                          </div>
                          <div className="text-center bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                            <p className="text-xl font-extrabold text-purple-600">{workspace.pipeline.pendingInterviews}</p>
                            <p className="text-[9px] font-bold text-gray-500 uppercase mt-1">Interviews</p>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Quick Actions Footer */}
                  <div className="p-4 bg-white border-t border-gray-100 flex flex-wrap gap-3">
                    <Button variant="ghost" size="sm" className="text-[11px] font-semibold text-gray-600 border border-gray-200">
                      <FiUpload className="w-3.5 h-3.5 mr-1.5" /> Upload Candidates
                    </Button>
                    <Button variant="ghost" size="sm" className="text-[11px] font-semibold text-gray-600 border border-gray-200">
                      <FiRefreshCw className="w-3.5 h-3.5 mr-1.5" /> Analyze Again
                    </Button>
                    <Button variant="ghost" size="sm" className="text-[11px] font-semibold text-gray-600 border border-gray-200">
                      <FiFileText className="w-3.5 h-3.5 mr-1.5" /> Generate Report
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Side: Global Activity */}
        <div className="xl:col-span-4 space-y-6">
          
          <Card className="p-6 bg-gray-900 text-white border-gray-800 shadow-xl overflow-hidden relative">
            <div className="absolute -top-10 -right-10 opacity-10">
              <FiCpu className="w-40 h-40" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
                  <FiActivity className="w-4 h-4" />
                </div>
                <h4 className="font-extrabold text-sm text-white tracking-wide">System Intelligence</h4>
              </div>
              <div className="space-y-5">
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Total AI Scans</p>
                  <p className="text-3xl font-extrabold text-white tracking-tight">24,892</p>
                </div>
                <div className="border-t border-gray-800" />
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Compute Status</p>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                    <span className="text-xs font-semibold text-emerald-400">All Agents Operational</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-sm border-gray-200">
            <h4 className="font-extrabold text-sm text-gray-950 mb-5 flex items-center gap-2">
              <FiUsers className="text-gray-400 w-4 h-4" /> Recent Activity
            </h4>
            <div className="space-y-5">
              {recentActivity.map((activity) => {
                const Icon = activity.icon
                return (
                  <div key={activity.id} className="flex gap-3 items-start text-xs relative">
                    <div className="p-2 rounded-xl bg-gray-50 border border-gray-100 text-gray-500 shrink-0 shadow-sm relative z-10">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="font-semibold text-gray-900">{activity.action}</p>
                      <p className="text-gray-500 mt-0.5 font-medium">{activity.target}</p>
                      <p className="text-[9px] text-gray-400 font-bold uppercase mt-1.5">{activity.time}</p>
                    </div>
                  </div>
                )
              })}
            </div>
            <Button variant="ghost" className="w-full mt-6 text-xs font-semibold text-blue-600 bg-blue-50/50 hover:bg-blue-50">
              View Audit Log
            </Button>
          </Card>

        </div>

      </div>
    </div>
  )
}
