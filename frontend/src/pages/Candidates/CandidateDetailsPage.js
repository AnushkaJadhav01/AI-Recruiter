import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';
import { 
  IoArrowBackOutline, IoMailOutline, IoCallOutline, 
  IoLogoGithub, IoLogoLinkedin, IoSparklesOutline, 
  IoBriefcaseOutline, IoRibbonOutline, IoCheckmarkCircle, 
  IoAlertCircle, IoCopyOutline, IoRefreshOutline 
} from 'react-icons/io5';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Avatar from '../../components/common/Avatar';
import Tabs from '../../components/common/Tabs';
import Timeline from '../../components/common/Timeline';
import Progress from '../../components/common/Progress';

ChartJS.register(ArcElement, Tooltip, Legend);

const CandidateDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { candidates, jobs } = useApp();
  const [activeTab, setActiveTab] = useState('overview');
  const [copyStatus, setCopyStatus] = useState({}); // mapping of question id to status

  const candidate = candidates.find(c => c.id === id);
  if (!candidate) {
    return (
      <div className="text-center py-20">
        <p className="text-sm font-semibold text-textPrimary dark:text-white">Candidate not found</p>
        <Link to="/candidates" className="text-primary hover:underline mt-4 block text-xs">Back to pipelines</Link>
      </div>
    );
  }

  const job = jobs.find(j => j.id === candidate.jobId);

  // Tab details definition
  const tabOptions = [
    { id: 'overview', label: 'Match Overview' },
    { id: 'github', label: 'GitHub Analysis' },
    { id: 'linkedin', label: 'LinkedIn Profile' },
    { id: 'interview', label: 'AI Interview Guide' }
  ];

  // Language chart data
  const hasLangData = candidate.githubAnalysis && candidate.githubAnalysis.languages;
  const langChartData = {
    labels: hasLangData ? candidate.githubAnalysis.languages.map(l => l.name) : ['None'],
    datasets: [
      {
        data: hasLangData ? candidate.githubAnalysis.languages.map(l => l.percentage) : [100],
        backgroundColor: ['#2563EB', '#06B6D4', '#6366F1', '#475569'],
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
        position: 'right',
        labels: {
          color: '#475569',
          boxWidth: 8,
          boxHeight: 8,
          font: { size: 10, weight: '600' }
        }
      }
    },
    cutout: '60%'
  };

  const handleCopyQuestion = (text, qId) => {
    navigator.clipboard.writeText(text);
    setCopyStatus(prev => ({ ...prev, [qId]: 'Copied!' }));
    setTimeout(() => {
      setCopyStatus(prev => ({ ...prev, [qId]: '' }));
    }, 2000);
  };

  return (
    <div className="space-y-6 text-left">
      {/* Top Navigation */}
      <button
        onClick={() => navigate('/candidates')}
        className="flex items-center gap-1.5 text-xs font-bold text-textSecondary hover:text-textPrimary dark:text-slate-400 dark:hover:text-white transition-colors"
      >
        <IoArrowBackOutline size={16} />
        Back to pipelines
      </button>

      {/* Candidate Profile Summary Header Card */}
      <Card className="p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-start md:items-center gap-5">
          <Avatar name={candidate.name} size="xl" />
          
          <div className="space-y-1.5 text-left">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-xl font-bold text-textPrimary dark:text-white">{candidate.name}</h2>
              <Badge variant={candidate.recommendation === 'Strong Match' ? 'success' : candidate.recommendation === 'Good Match' ? 'primary' : 'warning'}>
                {candidate.recommendation}
              </Badge>
            </div>
            
            <p className="text-xs font-bold text-textSecondary dark:text-slate-400">{candidate.role} • {candidate.experience} Exp</p>
            {job && (
              <p className="text-[10px] text-textSecondary dark:text-slate-500 font-semibold flex items-center gap-1">
                <IoBriefcaseOutline /> Applied for: <span className="text-primary hover:underline">{job.title}</span>
              </p>
            )}

            <div className="flex flex-wrap gap-4 text-[10px] text-textSecondary dark:text-slate-400 font-semibold pt-1">
              <span className="flex items-center gap-1"><IoMailOutline /> {candidate.email}</span>
              <span className="flex items-center gap-1"><IoCallOutline /> {candidate.phone}</span>
              {candidate.githubUsername && (
                <a href={`https://github.com/${candidate.githubUsername}`} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-primary transition-colors">
                  <IoLogoGithub /> github.com/{candidate.githubUsername}
                </a>
              )}
              {candidate.linkedinUrl && (
                <span className="flex items-center gap-1"><IoLogoLinkedin /> {candidate.linkedinUrl}</span>
              )}
            </div>
          </div>
        </div>

        {/* AI Confidence gauge card */}
        <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-950 border border-customBorder dark:border-slate-800 p-4 rounded-premium w-full md:w-auto">
          <div className="relative h-16 w-16 flex items-center justify-center bg-blue-500/10 dark:bg-blue-500/5 rounded-full border border-blue-500/20">
            <span className="text-base font-extrabold text-primary dark:text-blue-400">{candidate.overallScore}%</span>
          </div>
          <div className="text-left">
            <p className="text-xs font-bold text-textPrimary dark:text-white">AI Overall Score</p>
            <p className="text-[9px] text-textSecondary dark:text-slate-450 mt-0.5 leading-relaxed">
              Based on {candidate.confidence}% AI confidence interval calculation.
            </p>
          </div>
        </div>
      </Card>

      {/* Tabs list */}
      <Tabs tabs={tabOptions} activeTab={activeTab} onChange={setActiveTab} />

      {/* Dynamic Tab Panels */}
      <div>
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Resume Summary and Timeline details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Resume summary */}
              <Card>
                <h3 className="text-xs font-bold text-textPrimary dark:text-white uppercase tracking-wider mb-3">AI Executive Resume Summary</h3>
                <p className="text-xs text-textSecondary dark:text-slate-300 leading-relaxed">
                  {candidate.resumeSummary}
                </p>
              </Card>

              {/* Timeline experience */}
              <Card>
                <h3 className="text-xs font-bold text-textPrimary dark:text-white uppercase tracking-wider mb-6">Experience Timeline</h3>
                <Timeline items={candidate.experienceTimeline} />
              </Card>
            </div>

            {/* Side info columns */}
            <div className="space-y-6">
              {/* Skill gap checklist */}
              <Card>
                <h3 className="text-xs font-bold text-textPrimary dark:text-white uppercase tracking-wider mb-4 flex items-center gap-1.5">
                  <IoSparklesOutline className="text-primary" />
                  AI Skill Gap Analysis
                </h3>

                {candidate.skillGap && (
                  <div className="space-y-5">
                    {/* Matching skills */}
                    <div>
                      <p className="text-[10px] font-bold text-textSecondary dark:text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                        <IoCheckmarkCircle className="text-customSuccess" />
                        Matched Requirements ({candidate.skillGap.matched.length})
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {candidate.skillGap.matched.map(s => (
                          <span key={s} className="text-[10px] font-bold bg-green-50/70 border border-green-200 dark:bg-green-950/20 dark:border-green-900 text-green-700 dark:text-green-400 px-2 py-0.5 rounded">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Missing skills */}
                    <div>
                      <p className="text-[10px] font-bold text-textSecondary dark:text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                        <IoAlertCircle className="text-customWarning" />
                        Missing Requirements ({candidate.skillGap.missing.length})
                      </p>
                      {candidate.skillGap.missing.length === 0 ? (
                        <p className="text-[10px] text-textSecondary italic">No missing requirements found</p>
                      ) : (
                        <div className="flex flex-wrap gap-1">
                          {candidate.skillGap.missing.map(s => (
                            <span key={s} className="text-[10px] font-bold bg-amber-50/70 border border-amber-200 dark:bg-amber-950/20 dark:border-amber-900 text-amber-700 dark:text-amber-400 px-2 py-0.5 rounded">
                              {s}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Extra skills */}
                    <div>
                      <p className="text-[10px] font-bold text-textSecondary dark:text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                        <IoSparklesOutline className="text-primary" />
                        Extra Capabilities ({candidate.skillGap.extra.length})
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {candidate.skillGap.extra.map(s => (
                          <span key={s} className="text-[10px] font-bold bg-blue-50/70 border border-blue-200 dark:bg-blue-950/20 dark:border-blue-900 text-primary dark:text-blue-400 px-2 py-0.5 rounded">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </Card>

              {/* Education & Certs */}
              <Card className="space-y-4">
                {candidate.education && (
                  <div>
                    <h3 className="text-xs font-bold text-textPrimary dark:text-white uppercase tracking-wider mb-2 flex items-center gap-1">
                      <IoBriefcaseOutline className="text-slate-400" />
                      Education
                    </h3>
                    <p className="text-xs font-bold text-textPrimary dark:text-white">{candidate.education.degree}</p>
                    <p className="text-[10px] text-textSecondary dark:text-slate-400 mt-0.5">
                      {candidate.education.school} • Class of {candidate.education.year}
                    </p>
                  </div>
                )}

                {candidate.certifications && candidate.certifications.length > 0 && (
                  <div className="pt-3 border-t border-customBorder dark:border-slate-800">
                    <h3 className="text-xs font-bold text-textPrimary dark:text-white uppercase tracking-wider mb-2 flex items-center gap-1">
                      <IoRibbonOutline className="text-slate-400" />
                      Certifications
                    </h3>
                    <div className="flex flex-col gap-1.5">
                      {candidate.certifications.map((c, i) => (
                        <p key={i} className="text-xs font-semibold text-textSecondary dark:text-slate-350 flex items-center gap-1.5">
                          <span className="h-1 w-1 bg-primary rounded-full" /> {c}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            </div>
          </div>
        )}

        {/* Tab 2: GitHub Analysis */}
        {activeTab === 'github' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Repository list card */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-xs font-bold text-textPrimary dark:text-white uppercase tracking-wider">GitHub Scanned Repositories</h3>
                    <p className="text-[10px] text-textSecondary dark:text-slate-400 mt-0.5">Crawl audit results from public sources</p>
                  </div>
                  <Badge variant="accent">{candidate.githubAnalysis?.totalRepos || 0} Total Repos</Badge>
                </div>

                <div className="space-y-4">
                  {candidate.projects && candidate.projects.map((p, idx) => (
                    <div key={idx} className="p-4 border border-customBorder dark:border-slate-800 bg-slate-50/30 dark:bg-slate-950/10 rounded-premium hover:border-primary/40 transition-colors flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                      <div>
                        <h4 className="text-xs font-bold text-textPrimary dark:text-white flex items-center gap-1">
                          <IoLogoGithub />
                          {p.name}
                        </h4>
                        <p className="text-[10px] text-textSecondary dark:text-slate-400 mt-1 leading-relaxed max-w-lg">
                          {p.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0 text-[10px] font-semibold text-textSecondary dark:text-slate-400">
                        <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-[9px] font-bold text-primary">{p.language}</span>
                        <span>⭐ {p.stars} Stars</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Code Quality Insight Text */}
              <Card>
                <h3 className="text-xs font-bold text-textPrimary dark:text-white uppercase tracking-wider mb-2">AI Code Quality Summary</h3>
                <p className="text-xs text-textSecondary dark:text-slate-350 leading-relaxed bg-slate-50 dark:bg-slate-950 border border-customBorder dark:border-slate-850 p-4 rounded-premium">
                  {candidate.githubAnalysis?.projectQuality}
                </p>
              </Card>
            </div>

            {/* Sidebar analytics graphs */}
            <div className="space-y-6">
              {/* Score rating summary */}
              <Card className="text-center p-6 bg-gradient-to-br from-slate-900 to-slate-950 text-white border-0">
                <IoLogoGithub size={28} className="mx-auto text-slate-450 dark:text-slate-400" />
                <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-3">GitHub Tech Rating</h3>
                <p className="text-4xl font-extrabold mt-4 text-cyan-400">{candidate.githubAnalysis?.technicalScore || 0}</p>
                <p className="text-[10px] text-slate-400 mt-2">Ranked based on contributions, coding structures, and documentation practices.</p>
                
                <div className="grid grid-cols-2 gap-2 mt-6 pt-5 border-t border-slate-800">
                  <div>
                    <p className="text-xs font-bold text-cyan-400">{candidate.githubAnalysis?.contributionsLastYear || 0}</p>
                    <p className="text-[9px] text-slate-450">Commits Year</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-cyan-400">{candidate.githubAnalysis?.stars || 0}</p>
                    <p className="text-[9px] text-slate-450">Stars Earned</p>
                  </div>
                </div>
              </Card>

              {/* Languages chart */}
              <Card className="text-left">
                <h3 className="text-xs font-bold text-textPrimary dark:text-white uppercase tracking-wider mb-6">Language Distributions</h3>
                <div className="h-44 relative">
                  <Doughnut data={langChartData} options={langChartOptions} />
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Tab 3: LinkedIn Analysis */}
        {activeTab === 'linkedin' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Professional Summary */}
              <Card>
                <h3 className="text-xs font-bold text-textPrimary dark:text-white uppercase tracking-wider mb-3 flex items-center gap-1">
                  <IoLogoLinkedin className="text-blue-700" />
                  LinkedIn Executive Summary
                </h3>
                <p className="text-xs text-textSecondary dark:text-slate-350 leading-relaxed bg-slate-50 dark:bg-slate-950 border border-customBorder dark:border-slate-850 p-4 rounded-premium">
                  {candidate.linkedinAnalysis?.professionalSummary}
                </p>
              </Card>

              {/* Career Progression analysis */}
              <Card className="space-y-4">
                <h3 className="text-xs font-bold text-textPrimary dark:text-white uppercase tracking-wider mb-2">Career Performance Metrics</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 border border-customBorder dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 rounded-premium">
                    <p className="text-[9px] font-bold text-textSecondary dark:text-slate-450 uppercase tracking-wider">Career Trajectory Growth</p>
                    <p className="text-xs font-bold text-textPrimary dark:text-white mt-1.5">{candidate.linkedinAnalysis?.growthRate}</p>
                  </div>
                  <div className="p-4 border border-customBorder dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 rounded-premium">
                    <p className="text-[9px] font-bold text-textSecondary dark:text-slate-450 uppercase tracking-wider">Team Leadership Rating</p>
                    <p className="text-xs font-bold text-textPrimary dark:text-white mt-1.5">{candidate.linkedinAnalysis?.leadershipRating}</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Side endorsements */}
            <div className="space-y-6">
              {/* Score rating summary */}
              <Card className="text-center p-6 bg-gradient-to-br from-slate-900 to-slate-950 text-white border-0">
                <IoLogoLinkedin size={28} className="mx-auto text-blue-500" />
                <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-3">LinkedIn Score</h3>
                <p className="text-4xl font-extrabold mt-4 text-blue-400">{candidate.linkedinScore}</p>
                <p className="text-[10px] text-slate-450 mt-2">Evaluation of previous companies, promotion durations, and recommendations.</p>
                
                <div className="mt-6 pt-5 border-t border-slate-800 text-xs font-bold text-cyan-400">
                  {candidate.linkedinAnalysis?.recommendationsCount || 0} Professional Recommendations
                </div>
              </Card>

              {/* Endorsement list */}
              <Card>
                <h3 className="text-xs font-bold text-textPrimary dark:text-white uppercase tracking-wider mb-4">Top Endorsements</h3>
                <div className="space-y-3">
                  {candidate.linkedinAnalysis?.endorsements ? (
                    candidate.linkedinAnalysis.endorsements.map((e, i) => (
                      <div key={i} className="flex justify-between items-center text-xs">
                        <span className="font-semibold text-textSecondary dark:text-slate-350">{e.skill}</span>
                        <Badge variant="primary">{e.count}+ Endorsers</Badge>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-textSecondary italic">No endorsements cached.</p>
                  )}
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Tab 4: Generated Interview Prep */}
        {activeTab === 'interview' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-customBorder dark:border-slate-800 pb-4">
              <div>
                <h3 className="text-xs font-bold text-textPrimary dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                  <IoSparklesOutline className="text-primary" />
                  Custom AI Interview Playbook
                </h3>
                <p className="text-[10px] text-textSecondary dark:text-slate-400 mt-0.5">Generated questions targeting candidate's identified skill gaps</p>
              </div>
              <Button size="sm" icon={IoRefreshOutline}>Regenerate Guide</Button>
            </div>

            {candidate.interviewQuestions ? (
              <div className="space-y-6 text-left">
                {/* Easy Section */}
                <div>
                  <h4 className="text-xs font-extrabold text-green-700 dark:text-green-400 uppercase tracking-wider mb-3">Easy Level Screenings</h4>
                  <div className="space-y-4">
                    {candidate.interviewQuestions.easy.map((q, idx) => {
                      const qId = `easy-${idx}`;
                      return (
                        <div key={idx} className="p-4 border border-green-150 dark:border-green-950/20 bg-green-50/20 dark:bg-green-950/5 rounded-premium relative">
                          <button
                            onClick={() => handleCopyQuestion(q.question, qId)}
                            className="absolute top-4 right-4 p-1 text-slate-400 hover:text-textPrimary dark:hover:text-white transition-colors"
                            title="Copy Question"
                          >
                            {copyStatus[qId] ? <span className="text-[9px] font-bold text-green-600 mr-1">{copyStatus[qId]}</span> : null}
                            <IoCopyOutline size={16} className="inline-block" />
                          </button>
                          <p className="text-xs font-bold text-textPrimary dark:text-white pr-10">{q.question}</p>
                          <div className="mt-2.5 p-3 rounded-lg bg-white dark:bg-slate-900 border border-green-100 dark:border-green-950/30 text-xs text-textSecondary dark:text-slate-400 leading-relaxed">
                            <span className="font-bold text-green-700 dark:text-green-400 block mb-1">Expected Answer Direction:</span>
                            {q.answer}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Medium Section */}
                <div>
                  <h4 className="text-xs font-extrabold text-blue-700 dark:text-blue-400 uppercase tracking-wider mb-3 mt-4">Medium Level Screenings</h4>
                  <div className="space-y-4">
                    {candidate.interviewQuestions.medium.map((q, idx) => {
                      const qId = `med-${idx}`;
                      return (
                        <div key={idx} className="p-4 border border-blue-150 dark:border-blue-950/20 bg-blue-50/20 dark:bg-blue-950/5 rounded-premium relative">
                          <button
                            onClick={() => handleCopyQuestion(q.question, qId)}
                            className="absolute top-4 right-4 p-1 text-slate-400 hover:text-textPrimary dark:hover:text-white transition-colors"
                            title="Copy Question"
                          >
                            {copyStatus[qId] ? <span className="text-[9px] font-bold text-blue-600 mr-1">{copyStatus[qId]}</span> : null}
                            <IoCopyOutline size={16} className="inline-block" />
                          </button>
                          <p className="text-xs font-bold text-textPrimary dark:text-white pr-10">{q.question}</p>
                          <div className="mt-2.5 p-3 rounded-lg bg-white dark:bg-slate-900 border border-blue-100 dark:border-blue-950/30 text-xs text-textSecondary dark:text-slate-400 leading-relaxed">
                            <span className="font-bold text-blue-700 dark:text-blue-400 block mb-1">Expected Answer Direction:</span>
                            {q.answer}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Hard Section */}
                <div>
                  <h4 className="text-xs font-extrabold text-red-700 dark:text-red-400 uppercase tracking-wider mb-3 mt-4">Hard Level Architecture Screenings</h4>
                  <div className="space-y-4">
                    {candidate.interviewQuestions.hard.map((q, idx) => {
                      const qId = `hard-${idx}`;
                      return (
                        <div key={idx} className="p-4 border border-red-150 dark:border-red-950/20 bg-red-50/20 dark:bg-red-950/5 rounded-premium relative">
                          <button
                            onClick={() => handleCopyQuestion(q.question, qId)}
                            className="absolute top-4 right-4 p-1 text-slate-400 hover:text-textPrimary dark:hover:text-white transition-colors"
                            title="Copy Question"
                          >
                            {copyStatus[qId] ? <span className="text-[9px] font-bold text-red-600 mr-1">{copyStatus[qId]}</span> : null}
                            <IoCopyOutline size={16} className="inline-block" />
                          </button>
                          <p className="text-xs font-bold text-textPrimary dark:text-white pr-10">{q.question}</p>
                          <div className="mt-2.5 p-3 rounded-lg bg-white dark:bg-slate-900 border border-red-100 dark:border-red-950/30 text-xs text-textSecondary dark:text-slate-400 leading-relaxed">
                            <span className="font-bold text-red-700 dark:text-red-400 block mb-1">Expected Answer Direction:</span>
                            {q.answer}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-xs text-textSecondary italic">No interview playbook questions generated yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidateDetailsPage;
