import React, { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';
import { 
  IoArrowBackOutline, IoScaleOutline, IoLogoGithub, 
  IoLogoLinkedin, IoSparklesOutline, IoCheckmarkCircle, IoAlertCircle 
} from 'react-icons/io5';
import { 
  Chart as ChartJS, RadialLinearScale, PointElement, 
  LineElement, Filler, Tooltip, Legend 
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import Card from '../../components/common/Card';
import Avatar from '../../components/common/Avatar';
import Badge from '../../components/common/Badge';
import Progress from '../../components/common/Progress';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const CandidateComparisonPage = () => {
  const { candidates } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const c1Id = searchParams.get('c1') || (candidates[0]?.id);
  const c2Id = searchParams.get('c2') || (candidates[1]?.id);

  const [cand1Id, setCand1Id] = useState(c1Id);
  const [cand2Id, setCand2Id] = useState(c2Id);

  const candidateA = candidates.find(c => c.id === cand1Id);
  const candidateB = candidates.find(c => c.id === cand2Id);

  const handleCandidateAChange = (id) => {
    setCand1Id(id);
    setSearchParams({ c1: id, c2: cand2Id });
  };

  const handleCandidateBChange = (id) => {
    setCand2Id(id);
    setSearchParams({ c1: cand1Id, c2: id });
  };

  // Radar comparison chart configuration
  const radarData = {
    labels: ['Overall Score', 'GitHub Quality', 'LinkedIn Growth', 'Confidence Level', 'Experience Score'],
    datasets: [
      {
        label: candidateA ? candidateA.name : 'Candidate A',
        data: candidateA ? [
          candidateA.overallScore,
          candidateA.githubScore || 0,
          candidateA.linkedinScore || 0,
          candidateA.confidence || 0,
          Math.min(100, (parseInt(candidateA.experience) || 0) * 10)
        ] : [0,0,0,0,0],
        backgroundColor: 'rgba(37, 99, 235, 0.15)',
        borderColor: '#2563EB',
        borderWidth: 2,
        pointBackgroundColor: '#2563EB',
      },
      {
        label: candidateB ? candidateB.name : 'Candidate B',
        data: candidateB ? [
          candidateB.overallScore,
          candidateB.githubScore || 0,
          candidateB.linkedinScore || 0,
          candidateB.confidence || 0,
          Math.min(100, (parseInt(candidateB.experience) || 0) * 10)
        ] : [0,0,0,0,0],
        backgroundColor: 'rgba(6, 182, 212, 0.15)',
        borderColor: '#06B6D4',
        borderWidth: 2,
        pointBackgroundColor: '#06B6D4',
      }
    ]
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: { color: '#475569', font: { size: 10, weight: '600' } }
      }
    },
    scales: {
      r: {
        angleLines: { color: '#E2E8F0' },
        grid: { color: '#E2E8F0' },
        pointLabels: { color: '#475569', font: { size: 10, weight: '600' } },
        ticks: { display: false },
        suggestedMin: 0,
        suggestedMax: 100
      }
    }
  };

  return (
    <div className="space-y-6 text-left">
      {/* Back button */}
      <button
        onClick={() => navigate('/candidates')}
        className="flex items-center gap-1.5 text-xs font-bold text-textSecondary hover:text-textPrimary dark:text-slate-400 dark:hover:text-white transition-colors"
      >
        <IoArrowBackOutline size={16} />
        Back to pipelines
      </button>

      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-textPrimary dark:text-white tracking-tight flex items-center gap-2">
          <IoScaleOutline className="text-primary" />
          Candidate Comparisons
        </h2>
        <p className="text-xs text-textSecondary dark:text-slate-400 mt-1">
          Perform side-by-side audits of qualifications, coding scores, and skill alignments
        </p>
      </div>

      {/* Selectors Panel */}
      <Card className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Selector A */}
        <div className="text-left">
          <label className="block text-[10px] font-bold text-textSecondary dark:text-slate-450 uppercase mb-1">
            Compare Candidate A
          </label>
          <select
            value={cand1Id}
            onChange={(e) => handleCandidateAChange(e.target.value)}
            className="block w-full rounded-premium border border-customBorder dark:border-slate-800 text-xs px-3 py-2 bg-white dark:bg-slate-900 text-textPrimary dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-100"
          >
            {candidates.map(c => (
              <option key={c.id} value={c.id} disabled={c.id === cand2Id}>
                {c.name} ({c.role})
              </option>
            ))}
          </select>
        </div>

        {/* Selector B */}
        <div className="text-left">
          <label className="block text-[10px] font-bold text-textSecondary dark:text-slate-450 uppercase mb-1">
            Compare Candidate B
          </label>
          <select
            value={cand2Id}
            onChange={(e) => handleCandidateBChange(e.target.value)}
            className="block w-full rounded-premium border border-customBorder dark:border-slate-800 text-xs px-3 py-2 bg-white dark:bg-slate-900 text-textPrimary dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-100"
          >
            {candidates.map(c => (
              <option key={c.id} value={c.id} disabled={c.id === cand1Id}>
                {c.name} ({c.role})
              </option>
            ))}
          </select>
        </div>
      </Card>

      {/* Comparison Grid */}
      {candidateA && candidateB ? (
        <div className="space-y-6">
          {/* Visual radar chart comparison */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-1 flex flex-col items-center justify-center p-6 text-center">
              <h3 className="text-xs font-bold text-textPrimary dark:text-white uppercase tracking-wider mb-6">Radar Analysis Comparison</h3>
              <div className="h-56 w-full relative">
                <Radar data={radarData} options={radarOptions} />
              </div>
            </Card>

            {/* Score profiles details */}
            <Card className="lg:col-span-2 text-left p-6">
              <h3 className="text-xs font-bold text-textPrimary dark:text-white uppercase tracking-wider mb-6">Candidate Profiles</h3>
              
              <div className="grid grid-cols-2 gap-8">
                {/* Profile A */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar name={candidateA.name} size="md" />
                    <div>
                      <p className="text-sm font-bold text-textPrimary dark:text-white">{candidateA.name}</p>
                      <Badge variant="primary">{candidateA.recommendation}</Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-2.5 pt-3">
                    <div>
                      <span className="text-[10px] text-textSecondary dark:text-slate-450 font-semibold block">Overall Match Fit</span>
                      <div className="flex items-center gap-2 mt-1">
                        <Progress value={candidateA.overallScore} size="sm" />
                        <span className="text-xs font-bold text-textPrimary dark:text-white">{candidateA.overallScore}%</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] text-textSecondary dark:text-slate-450 font-semibold block">GitHub Code Score</span>
                      <div className="flex items-center gap-2 mt-1">
                        <Progress value={candidateA.githubScore} size="sm" variant="accent" />
                        <span className="text-xs font-bold text-textPrimary dark:text-white">{candidateA.githubScore}%</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] text-textSecondary dark:text-slate-450 font-semibold block">LinkedIn Growth</span>
                      <div className="flex items-center gap-2 mt-1">
                        <Progress value={candidateA.linkedinScore} size="sm" variant="secondary" />
                        <span className="text-xs font-bold text-textPrimary dark:text-white">{candidateA.linkedinScore}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Profile B */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar name={candidateB.name} size="md" />
                    <div>
                      <p className="text-sm font-bold text-textPrimary dark:text-white">{candidateB.name}</p>
                      <Badge variant="accent">{candidateB.recommendation}</Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-2.5 pt-3">
                    <div>
                      <span className="text-[10px] text-textSecondary dark:text-slate-450 font-semibold block">Overall Match Fit</span>
                      <div className="flex items-center gap-2 mt-1">
                        <Progress value={candidateB.overallScore} size="sm" />
                        <span className="text-xs font-bold text-textPrimary dark:text-white">{candidateB.overallScore}%</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] text-textSecondary dark:text-slate-450 font-semibold block">GitHub Code Score</span>
                      <div className="flex items-center gap-2 mt-1">
                        <Progress value={candidateB.githubScore} size="sm" variant="accent" />
                        <span className="text-xs font-bold text-textPrimary dark:text-white">{candidateB.githubScore}%</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] text-textSecondary dark:text-slate-450 font-semibold block">LinkedIn Growth</span>
                      <div className="flex items-center gap-2 mt-1">
                        <Progress value={candidateB.linkedinScore} size="sm" variant="secondary" />
                        <span className="text-xs font-bold text-textPrimary dark:text-white">{candidateB.linkedinScore}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Deep side by side lists */}
          <Card className="p-0 overflow-hidden text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-customBorder dark:border-slate-800 text-[10px] text-textSecondary dark:text-slate-400 uppercase font-bold bg-slate-50/50 dark:bg-slate-900/50">
                  <th className="py-3 px-6 w-1/4">Metric</th>
                  <th className="py-3 px-6 w-3/8 bg-slate-50/20 dark:bg-slate-850/10">{candidateA.name}</th>
                  <th className="py-3 px-6 w-3/8">{candidateB.name}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-customBorder dark:divide-slate-800">
                {/* Exp Row */}
                <tr className="hover:bg-slate-50/20">
                  <td className="py-4 px-6 font-bold text-textSecondary dark:text-slate-450">Experience</td>
                  <td className="py-4 px-6 bg-slate-50/10 dark:bg-slate-850/5 font-semibold text-textPrimary dark:text-white">{candidateA.experience}</td>
                  <td className="py-4 px-6 font-semibold text-textPrimary dark:text-white">{candidateB.experience}</td>
                </tr>
                {/* Skills Row */}
                <tr className="hover:bg-slate-50/20">
                  <td className="py-4 px-6 font-bold text-textSecondary dark:text-slate-450">Skills</td>
                  <td className="py-4 px-6 bg-slate-50/10 dark:bg-slate-850/5">
                    <div className="flex flex-wrap gap-1">
                      {candidateA.skills.map(s => <span key={s} className="text-[9px] font-bold px-2 py-0.5 rounded bg-slate-50 dark:bg-slate-800 text-slate-500 border border-customBorder/50">{s}</span>)}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-wrap gap-1">
                      {candidateB.skills.map(s => <span key={s} className="text-[9px] font-bold px-2 py-0.5 rounded bg-slate-50 dark:bg-slate-800 text-slate-500 border border-customBorder/50">{s}</span>)}
                    </div>
                  </td>
                </tr>
                {/* Top projects Row */}
                <tr className="hover:bg-slate-50/20">
                  <td className="py-4 px-6 font-bold text-textSecondary dark:text-slate-450">GitHub Projects</td>
                  <td className="py-4 px-6 bg-slate-50/10 dark:bg-slate-850/5">
                    <div className="space-y-1.5">
                      {candidateA.projects?.slice(0,2).map(p => (
                        <p key={p.name} className="font-semibold text-textPrimary dark:text-white">
                          • {p.name} <span className="text-[9px] text-primary bg-primary-light/40 px-1 rounded">{p.language}</span>
                        </p>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-1.5">
                      {candidateB.projects?.slice(0,2).map(p => (
                        <p key={p.name} className="font-semibold text-textPrimary dark:text-white">
                          • {p.name} <span className="text-[9px] text-primary bg-primary-light/40 px-1 rounded">{p.language}</span>
                        </p>
                      ))}
                    </div>
                  </td>
                </tr>
                {/* AI Executive Summary Row */}
                <tr className="hover:bg-slate-50/20">
                  <td className="py-4 px-6 font-bold text-textSecondary dark:text-slate-450">AI Fit Explanation</td>
                  <td className="py-4 px-6 bg-slate-50/10 dark:bg-slate-850/5 text-textSecondary dark:text-slate-400 leading-relaxed text-[11px]">
                    {candidateA.resumeSummary}
                  </td>
                  <td className="py-4 px-6 text-textSecondary dark:text-slate-400 leading-relaxed text-[11px]">
                    {candidateB.resumeSummary}
                  </td>
                </tr>
              </tbody>
            </table>
          </Card>
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-xs text-textSecondary">Please select candidates for comparison.</p>
        </div>
      )}
    </div>
  );
};

export default CandidateComparisonPage;
