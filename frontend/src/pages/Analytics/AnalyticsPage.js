import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { 
  IoPieChartOutline, IoTrendingUp, IoTimeOutline, 
  IoCalendarOutline, IoPeopleOutline, IoSparklesOutline 
} from 'react-icons/io5';
import { 
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, 
  PointElement, LineElement, ArcElement, Title, Tooltip, Legend 
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import Card from '../../components/common/Card';
import StatCard from '../../components/common/StatCard';
import Badge from '../../components/common/Badge';

ChartJS.register(
  CategoryScale, LinearScale, BarElement, PointElement, 
  LineElement, ArcElement, Title, Tooltip, Legend
);

const AnalyticsPage = () => {
  const { candidates } = useApp();

  const totalParsed = candidates.length + 42; // realistic mock base
  const totalShortlisted = candidates.filter(c => c.overallScore >= 85).length + 12;

  // Chart 1: Sourcing Trends (Monthly parsed resumes)
  const monthlyUploadData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'parsed',
        data: [15, 22, 35, 28, 40, candidates.length + 32],
        borderColor: '#2563EB',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        fill: true,
        tension: 0.35,
        borderWidth: 2,
      }
    ]
  };

  const monthlyUploadOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false }, ticks: { color: '#94A3B8', font: { size: 9 } } },
      y: { grid: { borderDash: [4, 4], color: '#E2E8F0' }, ticks: { color: '#94A3B8', font: { size: 9 } } }
    }
  };

  // Chart 2: Experience Levels (Bar Chart)
  const expBracketData = {
    labels: ['Junior (0-2 yrs)', 'Mid-level (3-5 yrs)', 'Senior (6+ yrs)'],
    datasets: [
      {
        label: 'Applicants',
        data: [
          candidates.filter(c => parseInt(c.experience) <= 2).length + 4,
          candidates.filter(c => parseInt(c.experience) >= 3 && parseInt(c.experience) <= 5).length + 8,
          candidates.filter(c => parseInt(c.experience) >= 6).length + 12
        ],
        backgroundColor: '#3B82F6',
        borderRadius: 6,
        barThickness: 32,
      }
    ]
  };

  const expBracketOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false }, ticks: { color: '#94A3B8', font: { size: 9 } } },
      y: { grid: { borderDash: [4, 4], color: '#E2E8F0' }, ticks: { color: '#94A3B8', font: { size: 9 } } }
    }
  };

  // Chart 3: Candidate Sourcing Channels (Doughnut)
  const sourcingChannelsData = {
    labels: ['GitHub Scan', 'LinkedIn Search', 'Resume Uploads', 'Referrals'],
    datasets: [
      {
        data: [35, 25, 30, 10],
        backgroundColor: ['#06B6D4', '#3B82F6', '#6366F1', '#94A3B8'],
        borderWidth: 1.5,
        borderColor: '#FFFFFF',
      }
    ]
  };

  const sourcingChannelsOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: '#475569',
          boxWidth: 8,
          font: { size: 9, weight: '600' }
        }
      }
    },
    cutout: '65%'
  };

  // Chart 4: Top Matching Skills (Horizontal Bar Chart)
  const topSkillsData = {
    labels: ['React', 'Python', 'Node.js', 'Docker', 'AWS', 'SQL'],
    datasets: [
      {
        label: 'Job Match Frequencies',
        data: [42, 38, 29, 24, 20, 18],
        backgroundColor: '#06B6D4',
        borderRadius: 4,
        barThickness: 14,
      }
    ]
  };

  const topSkillsOptions = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { borderDash: [4, 4], color: '#E2E8F0' }, ticks: { color: '#94A3B8', font: { size: 9 } } },
      y: { grid: { display: false }, ticks: { color: '#94A3B8', font: { size: 9 } } }
    }
  };

  return (
    <div className="space-y-6 text-left">
      {/* Page Header */}
      <div>
        <h2 className="text-xl font-bold text-textPrimary dark:text-white tracking-tight flex items-center gap-2">
          <IoPieChartOutline className="text-primary" />
          Recruitment Analytics
        </h2>
        <p className="text-xs text-textSecondary dark:text-slate-400 mt-1">
          Monitor pipeline efficiency, matching rates, channel counts, and average hiring speeds
        </p>
      </div>

      {/* Sourcing KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard 
          title="Total Parsed Profiles" 
          value={totalParsed} 
          trend="+28% this quarter" 
          trendDirection="up" 
          icon={IoPeopleOutline} 
        />
        <StatCard 
          title="Shortlisted Candidates" 
          value={totalShortlisted} 
          trend="+15% increase" 
          trendDirection="up" 
          icon={IoSparklesOutline} 
        />
        <StatCard 
          title="Avg Matching Score" 
          value="84%" 
          trend="+1.2% variance" 
          trendDirection="up" 
          icon={IoTrendingUp} 
        />
        <StatCard 
          title="Recruiting Hours Saved" 
          value="48 hrs" 
          trend="85% faster screening" 
          trendDirection="up" 
          icon={IoTimeOutline} 
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trend line */}
        <Card className="flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xs font-bold text-textPrimary dark:text-white uppercase tracking-wider">Candidate Upload Metrics</h3>
              <p className="text-[10px] text-textSecondary dark:text-slate-400 mt-0.5">Parsed applications trended monthly</p>
            </div>
            <Badge variant="primary">Monthly</Badge>
          </div>
          <div className="h-60 relative flex items-center justify-center">
            <Line data={monthlyUploadData} options={monthlyUploadOptions} />
          </div>
        </Card>

        {/* Channels Doughnut */}
        <Card className="flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xs font-bold text-textPrimary dark:text-white uppercase tracking-wider">Sourcing Channels</h3>
              <p className="text-[10px] text-textSecondary dark:text-slate-400 mt-0.5">Where candidate data is imported from</p>
            </div>
            <Badge variant="accent">Sources</Badge>
          </div>
          <div className="h-60 relative flex items-center justify-center">
            <Doughnut data={sourcingChannelsData} options={sourcingChannelsOptions} />
          </div>
        </Card>

        {/* Experience brackets */}
        <Card className="flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xs font-bold text-textPrimary dark:text-white uppercase tracking-wider">Experience Brackets</h3>
              <p className="text-[10px] text-textSecondary dark:text-slate-400 mt-0.5">Applicant distributions by seniority</p>
            </div>
            <Badge variant="secondary">Demographics</Badge>
          </div>
          <div className="h-60 relative flex items-center justify-center">
            <Bar data={expBracketData} options={expBracketOptions} />
          </div>
        </Card>

        {/* Matching Skills */}
        <Card className="flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xs font-bold text-textPrimary dark:text-white uppercase tracking-wider">Top Matching Tech Skills</h3>
              <p className="text-[10px] text-textSecondary dark:text-slate-400 mt-0.5">Frequency of requirements in candidate database</p>
            </div>
            <Badge variant="success">Skills</Badge>
          </div>
          <div className="h-60 relative flex items-center justify-center">
            <Bar data={topSkillsData} options={topSkillsOptions} />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsPage;
