import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';
import { 
  IoBriefcaseOutline, IoPeopleOutline, IoStatsChartOutline, 
  IoSparklesOutline, IoTimeOutline, IoCheckmarkCircleOutline, 
  IoDocumentTextOutline, IoPulseOutline 
} from 'react-icons/io5';
import { 
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, 
  LineElement, BarElement, ArcElement, Title, Tooltip, Legend 
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import StatCard from '../../components/common/StatCard';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Avatar from '../../components/common/Avatar';

// Register Chart.js components
ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, 
  BarElement, ArcElement, Title, Tooltip, Legend
);

const DashboardPage = () => {
  const { jobs, candidates, insights, activities, currentUser } = useApp();
  const navigate = useNavigate();

  const totalJobs = jobs.length;
  const totalCandidates = candidates.length;
  const averageMatchScore = Math.round(
    candidates.reduce((sum, c) => sum + c.overallScore, 0) / (totalCandidates || 1)
  );

  // Chart 1: Candidate Upload Sourcing Trends
  const trendChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Resumes Sourced',
        data: [18, 24, 38, 29, 42, totalCandidates + 32],
        borderColor: '#2563EB',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        tension: 0.35,
        fill: true,
        borderWidth: 2,
      }
    ]
  };

  const trendChartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#0F172A',
        titleFont: { size: 11, weight: 'bold' },
        bodyFont: { size: 11 },
        padding: 8,
        cornerRadius: 6
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#94A3B8', font: { size: 10 } }
      },
      y: {
        grid: { borderDash: [4, 4], color: '#E2E8F0' },
        ticks: { color: '#94A3B8', font: { size: 10 } }
      }
    }
  };

  // Chart 2: Match Distribution Doughnut
  const strongMatchCount = candidates.filter(c => c.recommendation === 'Strong Match').length;
  const goodMatchCount = candidates.filter(c => c.recommendation === 'Good Match').length;
  const potentialMatchCount = candidates.filter(c => c.recommendation === 'Potential Match').length;
  const notRecCount = candidates.filter(c => c.recommendation === 'Not Recommended').length;

  const distributionData = {
    labels: ['Strong Match', 'Good Match', 'Potential Match', 'Not Recommended'],
    datasets: [
      {
        data: [
          strongMatchCount || 2, 
          goodMatchCount || 3, 
          potentialMatchCount || 1, 
          notRecCount || 0
        ],
        backgroundColor: ['#22C55E', '#3B82F6', '#F59E0B', '#EF4444'],
        borderWidth: 1.5,
        borderColor: '#FFFFFF',
      }
    ]
  };

  const distributionOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#475569',
          boxWidth: 8,
          boxHeight: 8,
          font: { size: 10, weight: '600' },
          padding: 15
        }
      },
      tooltip: {
        backgroundColor: '#0F172A',
        padding: 8,
        cornerRadius: 6
      }
    },
    cutout: '72%'
  };

  // Icon mapping helper for activity log
  const getActivityIcon = (type) => {
    switch (type) {
      case 'upload':
        return <IoDocumentTextOutline className="text-primary" size={16} />;
      case 'score':
        return <IoSparklesOutline className="text-customSuccess" size={16} />;
      case 'interview':
        return <IoTimeOutline className="text-accent" size={16} />;
      default:
        return <IoPulseOutline className="text-textSecondary" size={16} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-white dark:bg-slate-900 border border-customBorder dark:border-slate-800 rounded-premium p-6 relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-left">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
        <div className="pl-2">
          <h2 className="text-base font-bold text-textPrimary dark:text-white">Welcome back, {currentUser?.name || 'Recruiter'}</h2>
          <p className="text-xs text-textSecondary dark:text-slate-400 mt-1 max-w-xl leading-relaxed">
            AI Recruiter has evaluated your pending applications. Review candidate fit analysis and export summaries directly to your integrated ATS platforms.
          </p>
        </div>
        <div className="flex gap-2.5">
          <Link to="/jobs">
            <button className="bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-750 border border-customBorder dark:border-slate-700 text-textPrimary dark:text-white font-bold text-xs px-3.5 py-2 rounded-premium transition-all">
              Manage Jobs
            </button>
          </Link>
          <Link to="/candidates">
            <button className="bg-primary hover:bg-primary-dark text-white font-bold text-xs px-3.5 py-2 rounded-premium transition-all shadow-sm">
              Sourced Applicants
            </button>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard 
          title="Active Positions" 
          value={totalJobs} 
          trend="+1 position" 
          trendDirection="up" 
          icon={IoBriefcaseOutline} 
        />
        <StatCard 
          title="Evaluated Applicants" 
          value={totalCandidates} 
          trend="+12% weekly" 
          trendDirection="up" 
          icon={IoPeopleOutline} 
        />
        <StatCard 
          title="Average Match Score" 
          value={`${averageMatchScore}%`} 
          trend="+2.5% increase" 
          trendDirection="up" 
          icon={IoStatsChartOutline} 
        />
        <StatCard 
          title="Time to Shortlist" 
          value="12 mins" 
          trend="-8 mins vs manual" 
          trendDirection="up" 
          icon={IoSparklesOutline} 
        />
      </div>

      {/* Visual Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sourcing Trends */}
        <Card className="lg:col-span-2 text-left">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xs font-bold text-textPrimary dark:text-white uppercase tracking-wider">Candidate Sourcing Trends</h3>
              <p className="text-[10px] text-textSecondary dark:text-slate-400 mt-0.5">Monthly breakdown of parsed profiles</p>
            </div>
            <Badge variant="primary">Active Pipeline</Badge>
          </div>
          <div className="h-64 flex items-center justify-center">
            <Line data={trendChartData} options={trendChartOptions} />
          </div>
        </Card>

        {/* Fit Analysis Distribution */}
        <Card className="text-left flex flex-col">
          <h3 className="text-xs font-bold text-textPrimary dark:text-white uppercase tracking-wider mb-1">Fit Distribution</h3>
          <p className="text-[10px] text-textSecondary dark:text-slate-400 mb-6">AI Recommendation breakdowns</p>
          <div className="flex-1 h-56 relative min-h-0">
            <Doughnut data={distributionData} options={distributionOptions} />
          </div>
        </Card>
      </div>

      {/* Recent Activities, Jobs & Candidate listings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity Log */}
        <Card className="lg:col-span-1 text-left flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-textPrimary dark:text-white uppercase tracking-wider mb-1">Recent Activity</h3>
            <p className="text-[10px] text-textSecondary dark:text-slate-400 mb-6">Live recruitment event updates</p>
            
            <div className="space-y-4">
              {activities.map((act) => (
                <div key={act.id} className="flex gap-3.5 items-start">
                  <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-customBorder dark:border-slate-750">
                    {getActivityIcon(act.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-textPrimary dark:text-white truncate">{act.action}</p>
                    <p className="text-[10px] text-textSecondary dark:text-slate-400 truncate mt-0.5">{act.target}</p>
                  </div>
                  <span className="text-[9px] font-semibold text-slate-400 flex-shrink-0 mt-0.5">{act.time}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Recent Jobs */}
        <Card className="text-left flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-textPrimary dark:text-white uppercase tracking-wider mb-1">Active Positions</h3>
            <p className="text-[10px] text-textSecondary dark:text-slate-400 mb-6">Open recruitment roles</p>

            <div className="divide-y divide-customBorder dark:divide-slate-800">
              {jobs.slice(0, 4).map((job) => (
                <div key={job.id} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-textPrimary dark:text-white truncate">{job.title}</p>
                    <p className="text-[10px] text-textSecondary dark:text-slate-400 truncate mt-0.5">
                      {job.department} • {job.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                      {job.candidatesCount} Applicants
                    </span>
                    <Badge variant={job.status === 'Open' ? 'success' : job.status === 'Draft' ? 'warning' : 'danger'}>
                      {job.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Top Match Candidates */}
        <Card className="text-left flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-textPrimary dark:text-white uppercase tracking-wider mb-1">Top Applicants</h3>
            <p className="text-[10px] text-textSecondary dark:text-slate-400 mb-6">Candidates sorted by overall rating</p>

            <div className="space-y-3">
              {candidates.slice(0, 4).map((c) => (
                <div 
                  key={c.id} 
                  onClick={() => navigate(`/candidates/${c.id}`)}
                  className="p-3 border border-customBorder dark:border-slate-800 rounded-xl hover:border-primary/45 transition-colors cursor-pointer bg-slate-50/20 dark:bg-slate-900/10 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Avatar name={c.name} size="sm" />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-textPrimary dark:text-white truncate">{c.name}</p>
                      <p className="text-[9px] text-textSecondary dark:text-slate-400 truncate mt-0.5">{c.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={c.recommendation === 'Strong Match' ? 'success' : 'primary'}>
                      {c.recommendation}
                    </Badge>
                    <span className="text-xs font-bold text-textPrimary dark:text-white">{c.overallScore}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* AI Insights panel */}
      <Card className="text-left">
        <h3 className="text-xs font-bold text-textPrimary dark:text-white uppercase tracking-wider mb-1">AI Talent Insights</h3>
        <p className="text-[10px] text-textSecondary dark:text-slate-400 mb-6">Autonomous analytics & warning highlights</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {insights.map((insight, idx) => (
            <div 
              key={idx} 
              className={`p-4 border rounded-premium shadow-sm ${
                insight.type === 'success' ? 'bg-green-50/50 dark:bg-green-950/10 border-green-200 dark:border-green-900/50' : 
                insight.type === 'warning' ? 'bg-amber-50/50 dark:bg-amber-950/10 border-amber-200 dark:border-amber-900/50' : 
                'bg-blue-50/50 dark:bg-blue-950/10 border-blue-200 dark:border-blue-900/50'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className={`text-[9px] font-bold uppercase tracking-wider ${
                  insight.type === 'success' ? 'text-green-600 dark:text-green-400' :
                  insight.type === 'warning' ? 'text-amber-600 dark:text-amber-400' :
                  'text-primary dark:text-blue-400'
                }`}>{insight.title}</span>
                <span className="text-[9px] text-slate-400 dark:text-slate-500 font-semibold">{insight.trend}</span>
              </div>
              <p className="text-sm font-bold text-textPrimary dark:text-white mt-2 truncate">{insight.metric}</p>
              <p className="text-[10px] text-textSecondary dark:text-slate-450 mt-1 leading-relaxed">{insight.description}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default DashboardPage;
