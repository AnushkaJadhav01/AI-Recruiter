import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { 
  IoLogoGithub, IoStarOutline, IoGitBranchOutline, 
  IoSparklesOutline, IoTerminalOutline, IoCheckmarkCircleOutline 
} from 'react-icons/io5';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Card from '../../components/common/Card';
import Avatar from '../../components/common/Avatar';
import Badge from '../../components/common/Badge';

ChartJS.register(ArcElement, Tooltip, Legend);

const GitHubAnalysisPage = () => {
  const { candidates } = useApp();
  const githubCandidates = candidates.filter(c => c.githubUsername);
  
  const [selectedCandidateId, setSelectedCandidateId] = useState(githubCandidates[0]?.id || '');
  const activeCandidate = candidates.find(c => c.id === selectedCandidateId);

  // Generate mock contribution calendar (52 weeks * 7 days)
  const generateContributionDays = () => {
    const days = [];
    const colors = ['bg-slate-100 dark:bg-slate-800/40', 'bg-green-100 dark:bg-green-950/20', 'bg-green-300 dark:bg-green-800/40', 'bg-green-500 dark:bg-green-600/60', 'bg-green-700 dark:bg-green-500/80'];
    
    // Create random commit intensity pattern
    for (let i = 0; i < 364; i++) {
      const isWeekend = i % 7 === 0 || i % 7 === 6;
      let level = Math.floor(Math.random() * 5);
      if (isWeekend) {
        level = Math.random() > 0.85 ? 1 : 0; // weekends usually have fewer commits
      }
      days.push({
        id: i,
        color: colors[level]
      });
    }
    return days;
  };

  const contributionCalendarDays = generateContributionDays();

  // Language Chart data
  const hasLangData = activeCandidate?.githubAnalysis?.languages;
  const langChartData = {
    labels: hasLangData ? activeCandidate.githubAnalysis.languages.map(l => l.name) : ['None'],
    datasets: [
      {
        data: hasLangData ? activeCandidate.githubAnalysis.languages.map(l => l.percentage) : [100],
        backgroundColor: ['#3B82F6', '#06B6D4', '#6366F1', '#475569'],
        borderWidth: 1.5,
        borderColor: '#FFFFFF',
      }
    ]
  };

  const langChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#475569',
          boxWidth: 8,
          font: { size: 9, weight: '600' }
        }
      }
    },
    cutout: '60%'
  };

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-textPrimary dark:text-white tracking-tight flex items-center gap-2">
          <IoLogoGithub className="text-slate-900 dark:text-slate-100" />
          GitHub Auditing Engine
        </h2>
        <p className="text-xs text-textSecondary dark:text-slate-400 mt-1">
          Perform source audits on candidate repositories, checking architectures, commit histories, and lang weights
        </p>
      </div>

      {/* Selectors Panel */}
      <Card className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="text-left w-full sm:max-w-xs">
          <label className="block text-[10px] font-bold text-textSecondary dark:text-slate-450 uppercase mb-1">
            Select Developer Profile
          </label>
          <select
            value={selectedCandidateId}
            onChange={(e) => setSelectedCandidateId(e.target.value)}
            className="block w-full rounded-premium border border-customBorder dark:border-slate-800 text-xs px-3 py-2 bg-white dark:bg-slate-900 text-textPrimary dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-100"
          >
            {githubCandidates.map(c => (
              <option key={c.id} value={c.id}>
                {c.name} (@{c.githubUsername})
              </option>
            ))}
          </select>
        </div>

        {activeCandidate && (
          <div className="flex items-center gap-3">
            <Avatar name={activeCandidate.name} size="sm" />
            <div className="text-left">
              <p className="text-xs font-bold text-textPrimary dark:text-white">{activeCandidate.name}</p>
              <p className="text-[10px] text-textSecondary dark:text-slate-400">GitHub Score: {activeCandidate.githubScore}/100</p>
            </div>
          </div>
        )}
      </Card>

      {activeCandidate && activeCandidate.githubAnalysis ? (
        <div className="space-y-6">
          {/* Top Row: Contribution Graph & Languages */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Contribution Calendar Card */}
            <Card className="lg:col-span-2 text-left p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xs font-bold text-textPrimary dark:text-white uppercase tracking-wider">GitHub Contribution History</h3>
                  <p className="text-[10px] text-textSecondary dark:text-slate-400 mt-0.5">Commit distributions over the last 365 days</p>
                </div>
                <Badge variant="success">{activeCandidate.githubAnalysis.contributionsLastYear} Commits</Badge>
              </div>

              {/* Contribution Grid */}
              <div className="overflow-x-auto pb-2">
                <div className="grid grid-flow-col grid-rows-7 gap-1 w-[600px] sm:w-auto h-28">
                  {contributionCalendarDays.map((day) => (
                    <div
                      key={day.id}
                      className={`w-[9px] h-[9px] rounded-sm transition-colors ${day.color}`}
                      title={`${Math.floor(Math.random() * 5)} commits`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center text-[9px] font-semibold text-slate-450 mt-4">
                <span>Less</span>
                <div className="flex gap-1 items-center">
                  <span className="w-2.5 h-2.5 bg-slate-100 dark:bg-slate-800 rounded-sm" />
                  <span className="w-2.5 h-2.5 bg-green-100 rounded-sm" />
                  <span className="w-2.5 h-2.5 bg-green-300 rounded-sm" />
                  <span className="w-2.5 h-2.5 bg-green-500 rounded-sm" />
                  <span className="w-2.5 h-2.5 bg-green-700 rounded-sm" />
                </div>
                <span>More</span>
              </div>
            </Card>

            {/* Language Share */}
            <Card className="flex flex-col text-left p-6">
              <h3 className="text-xs font-bold text-textPrimary dark:text-white uppercase tracking-wider mb-6">Language Distributions</h3>
              <div className="h-44 relative">
                <Doughnut data={langChartData} options={langChartOptions} />
              </div>
            </Card>
          </div>

          {/* Details Row: Repositories & Audits */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Repositories */}
            <div className="lg:col-span-2 space-y-4">
              <Card className="p-6 text-left">
                <h3 className="text-xs font-bold text-textPrimary dark:text-white uppercase tracking-wider mb-6">Inspected Repositories</h3>
                
                <div className="divide-y divide-customBorder dark:divide-slate-850 space-y-4">
                  {activeCandidate.projects && activeCandidate.projects.map((p, idx) => (
                    <div key={idx} className="pt-4 first:pt-0 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                      <div>
                        <h4 className="text-xs font-bold text-textPrimary dark:text-white hover:text-primary cursor-pointer transition-colors">
                          {p.name}
                        </h4>
                        <p className="text-[10px] text-textSecondary dark:text-slate-450 mt-1 leading-relaxed max-w-lg">
                          {p.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 text-[10px] text-textSecondary font-semibold">
                        <span className="bg-slate-100 dark:bg-slate-800 text-primary px-2 py-0.5 rounded text-[9px] font-bold">{p.language}</span>
                        <span className="flex items-center gap-0.5"><IoStarOutline /> {p.stars}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Audit Summary Card */}
            <div className="space-y-6">
              {/* Score breakdown */}
              <Card className="p-6 text-left bg-gradient-to-br from-slate-900 to-slate-950 border-0 text-white">
                <IoTerminalOutline size={26} className="text-cyan-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-3">Code Audit Rating</h3>
                <p className="text-3xl font-extrabold text-white mt-3">{activeCandidate.githubAnalysis.technicalScore}/100</p>
                
                <div className="mt-6 pt-5 border-t border-slate-800 space-y-3.5 text-[10px]">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-450 font-semibold">Total Repos Analyzed</span>
                    <span className="font-bold text-cyan-400">{activeCandidate.githubAnalysis.totalRepos}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-450 font-semibold">Forks Scanned</span>
                    <span className="font-bold text-cyan-400">{activeCandidate.githubAnalysis.forks}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-450 font-semibold">Average Star Weight</span>
                    <span className="font-bold text-cyan-400">High</span>
                  </div>
                </div>
              </Card>

              {/* Code Quality Insight Text */}
              <Card className="p-6 text-left">
                <h3 className="text-xs font-bold text-textPrimary dark:text-white uppercase tracking-wider mb-3 flex items-center gap-1">
                  <IoSparklesOutline className="text-primary" />
                  AI Quality Review
                </h3>
                <p className="text-xs text-textSecondary dark:text-slate-400 leading-relaxed">
                  {activeCandidate.githubAnalysis.projectQuality}
                </p>
              </Card>
            </div>

          </div>
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-xs text-textSecondary">Please select a candidate with GitHub analysis data.</p>
        </div>
      )}
    </div>
  );
};

export default GitHubAnalysisPage;
