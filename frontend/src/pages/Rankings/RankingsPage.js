import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';
import { 
  IoStatsChartOutline, IoSparklesOutline, IoRibbonOutline, 
  IoChevronForwardOutline, IoFilterOutline 
} from 'react-icons/io5';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Avatar from '../../components/common/Avatar';
import Progress from '../../components/common/Progress';
import SearchBar from '../../components/common/SearchBar';

const RankingsPage = () => {
  const { candidates, jobs } = useApp();
  const navigate = useNavigate();

  const [selectedJobId, setSelectedJobId] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Sort candidates by overall score to represent ranking
  const rankedCandidates = [...candidates]
    .filter(c => {
      const matchesJob = selectedJobId ? c.jobId === selectedJobId : true;
      const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            c.role.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesJob && matchesSearch;
    })
    .sort((a, b) => b.overallScore - a.overallScore);

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-textPrimary dark:text-white tracking-tight flex items-center gap-2">
            <IoStatsChartOutline className="text-primary" />
            AI Fit Rankings
          </h2>
          <p className="text-xs text-textSecondary dark:text-slate-400 mt-1">
            Browse applicants ranked autonomously by matching algorithms and code audits
          </p>
        </div>
      </div>

      {/* Search and Job Filter Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <SearchBar 
          value={searchQuery}
          onChange={setSearchQuery}
          onClear={() => setSearchQuery('')}
          placeholder="Search ranked candidates..."
          className="flex-1"
        />

        <div className="relative flex-shrink-0 sm:w-60">
          <select
            value={selectedJobId}
            onChange={(e) => setSelectedJobId(e.target.value)}
            className="appearance-none block w-full rounded-premium border border-customBorder dark:border-slate-800 text-xs px-3 py-2.5 bg-white dark:bg-slate-900 text-textPrimary dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-100"
          >
            <option value="">All Job Positions</option>
            {jobs.map(j => (
              <option key={j.id} value={j.id}>{j.title}</option>
            ))}
          </select>
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400 text-[10px]">
            ▼
          </span>
        </div>
      </div>

      {/* Rankings List */}
      {rankedCandidates.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-slate-900 border border-customBorder dark:border-slate-800 rounded-premium shadow-premium">
          <span className="text-4xl text-slate-300 dark:text-slate-650 block mb-3">🏆</span>
          <p className="text-sm font-semibold text-textPrimary dark:text-white">No candidates ranked</p>
          <p className="text-xs text-textSecondary dark:text-slate-400 mt-1">Try resetting search filters or upload resumes.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {rankedCandidates.map((cand, idx) => {
            const currentJob = jobs.find(j => j.id === cand.jobId);
            
            return (
              <Card
                key={cand.id}
                onClick={() => navigate(`/candidates/${cand.id}`)}
                hoverEffect
                className="p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-5"
              >
                {/* Left side: Rank Number + Avatar + Candidate info */}
                <div className="flex items-start md:items-center gap-4">
                  {/* Rank indicator */}
                  <div className="h-10 w-10 flex-shrink-0 rounded-premium bg-slate-50 dark:bg-slate-950 border border-customBorder dark:border-slate-850 flex items-center justify-center font-bold text-xs text-textSecondary dark:text-slate-350">
                    #{idx + 1}
                  </div>
                  
                  <Avatar name={cand.name} size="md" />

                  <div className="text-left space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm font-bold text-textPrimary dark:text-white">{cand.name}</h3>
                      <Badge variant={cand.recommendation === 'Strong Match' ? 'success' : cand.recommendation === 'Good Match' ? 'primary' : 'warning'}>
                        {cand.recommendation}
                      </Badge>
                    </div>
                    <p className="text-[10px] font-bold text-textSecondary dark:text-slate-450">{cand.role} • {cand.experience} Experience</p>
                    {currentJob && (
                      <p className="text-[9px] text-primary dark:text-blue-400 font-semibold">Matched for: {currentJob.title}</p>
                    )}
                  </div>
                </div>

                {/* Middle: AI Fit Reason summary */}
                <div className="flex-1 max-w-xl text-left bg-slate-50/50 dark:bg-slate-950/20 border border-customBorder/50 dark:border-slate-850/50 p-3.5 rounded-xl">
                  <p className="text-[9px] font-bold text-textSecondary dark:text-slate-450 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <IoSparklesOutline className="text-primary" />
                    AI Fit Analysis
                  </p>
                  <p className="text-xs text-textSecondary dark:text-slate-400 leading-relaxed line-clamp-2">
                    {cand.resumeSummary}
                  </p>
                </div>

                {/* Right: Scores & Action Chevron */}
                <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0">
                  <div className="text-left md:text-right min-w-[90px]">
                    <span className="text-[9px] font-bold text-textSecondary dark:text-slate-450 uppercase block">Match Score</span>
                    <span className="text-xl font-extrabold text-primary dark:text-blue-400 block mt-0.5">{cand.overallScore}%</span>
                    <span className="text-[9px] text-slate-400 dark:text-slate-500 font-medium block">Conf: {cand.confidence}%</span>
                  </div>

                  <button className="h-8 w-8 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-textSecondary hover:text-textPrimary flex items-center justify-center transition-colors">
                    <IoChevronForwardOutline size={18} />
                  </button>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RankingsPage;
