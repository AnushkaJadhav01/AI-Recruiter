import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { 
  IoLogoLinkedin, IoBriefcaseOutline, IoRibbonOutline, 
  IoSparklesOutline, IoTrendingUp, IoPeopleOutline 
} from 'react-icons/io5';
import Card from '../../components/common/Card';
import Avatar from '../../components/common/Avatar';
import Badge from '../../components/common/Badge';
import Timeline from '../../components/common/Timeline';

const LinkedInAnalysisPage = () => {
  const { candidates } = useApp();
  const linkedinCandidates = candidates.filter(c => c.linkedinUrl);

  const [selectedCandidateId, setSelectedCandidateId] = useState(linkedinCandidates[0]?.id || '');
  const activeCandidate = candidates.find(c => c.id === selectedCandidateId);

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-textPrimary dark:text-white tracking-tight flex items-center gap-2">
          <IoLogoLinkedin className="text-blue-700" />
          LinkedIn Sourcing Insights
        </h2>
        <p className="text-xs text-textSecondary dark:text-slate-400 mt-1">
          Review career growth metrics, previous company sizes, promotions, and peer recommendations
        </p>
      </div>

      {/* Selectors Panel */}
      <Card className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="text-left w-full sm:max-w-xs">
          <label className="block text-[10px] font-bold text-textSecondary dark:text-slate-450 uppercase mb-1">
            Select Candidate Profile
          </label>
          <select
            value={selectedCandidateId}
            onChange={(e) => setSelectedCandidateId(e.target.value)}
            className="block w-full rounded-premium border border-customBorder dark:border-slate-800 text-xs px-3 py-2 bg-white dark:bg-slate-900 text-textPrimary dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-100"
          >
            {linkedinCandidates.map(c => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.linkedinUrl})
              </option>
            ))}
          </select>
        </div>

        {activeCandidate && (
          <div className="flex items-center gap-3">
            <Avatar name={activeCandidate.name} size="sm" />
            <div className="text-left">
              <p className="text-xs font-bold text-textPrimary dark:text-white">{activeCandidate.name}</p>
              <p className="text-[10px] text-textSecondary dark:text-slate-400">LinkedIn Score: {activeCandidate.linkedinScore}/100</p>
            </div>
          </div>
        )}
      </Card>

      {activeCandidate && activeCandidate.linkedinAnalysis ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Column: Timeline & Endorsements */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Professional Summary */}
            <Card className="p-6 text-left">
              <h3 className="text-xs font-bold text-textPrimary dark:text-white uppercase tracking-wider mb-3">AI Executive Profile Summary</h3>
              <p className="text-xs text-textSecondary dark:text-slate-350 leading-relaxed bg-slate-50 dark:bg-slate-950 border border-customBorder dark:border-slate-850 p-4 rounded-premium">
                {activeCandidate.linkedinAnalysis.professionalSummary}
              </p>
            </Card>

            {/* Experience Timeline */}
            <Card className="p-6 text-left">
              <h3 className="text-xs font-bold text-textPrimary dark:text-white uppercase tracking-wider mb-6">Career Timeline</h3>
              <Timeline items={activeCandidate.experienceTimeline} />
            </Card>

          </div>

          {/* Sidebar Column: Career Metrics & Skills */}
          <div className="space-y-6">
            
            {/* Score rating summary */}
            <Card className="p-6 text-left bg-gradient-to-br from-slate-900 to-slate-950 border-0 text-white">
              <IoLogoLinkedin size={26} className="text-blue-400" />
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-3">Professional Ranking</h3>
              <p className="text-3xl font-extrabold text-white mt-3">{activeCandidate.linkedinScore}/100</p>
              
              <div className="mt-6 pt-5 border-t border-slate-850 space-y-3.5 text-[10px]">
                <div className="flex justify-between items-center">
                  <span className="text-slate-450 font-semibold">Promotion Trajectory</span>
                  <span className="font-bold text-blue-400">{activeCandidate.linkedinAnalysis.growthRate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-450 font-semibold">Leadership Rating</span>
                  <span className="font-bold text-blue-400">{activeCandidate.linkedinAnalysis.leadershipRating}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-450 font-semibold">Endorsements Found</span>
                  <span className="font-bold text-blue-400">High</span>
                </div>
              </div>
            </Card>

            {/* Endorsement list */}
            <Card className="p-6 text-left">
              <h3 className="text-xs font-bold text-textPrimary dark:text-white uppercase tracking-wider mb-4">LinkedIn Endorsements</h3>
              
              <div className="space-y-3.5">
                {activeCandidate.linkedinAnalysis.endorsements ? (
                  activeCandidate.linkedinAnalysis.endorsements.map((e, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-textSecondary dark:text-slate-350">{e.skill}</span>
                      <Badge variant="primary">{e.count}+ peer votes</Badge>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-textSecondary italic">No endorsements found.</p>
                )}
              </div>
            </Card>

            {/* Education & Certs */}
            <Card className="p-6 text-left space-y-4">
              {activeCandidate.education && (
                <div>
                  <h3 className="text-xs font-bold text-textPrimary dark:text-white uppercase tracking-wider mb-2 flex items-center gap-1">
                    <IoBriefcaseOutline className="text-slate-400" />
                    University
                  </h3>
                  <p className="text-xs font-bold text-textPrimary dark:text-white">{activeCandidate.education.degree}</p>
                  <p className="text-[10px] text-textSecondary dark:text-slate-400 mt-0.5">
                    {activeCandidate.education.school} • Class of {activeCandidate.education.year}
                  </p>
                </div>
              )}

              {activeCandidate.certifications && activeCandidate.certifications.length > 0 && (
                <div className="pt-3 border-t border-customBorder dark:border-slate-800">
                  <h3 className="text-xs font-bold text-textPrimary dark:text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <IoRibbonOutline className="text-slate-400" />
                    Certifications List
                  </h3>
                  <div className="flex flex-col gap-1.5">
                    {activeCandidate.certifications.map((c, i) => (
                      <p key={i} className="text-xs font-semibold text-textSecondary dark:text-slate-450">
                        • {c}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </Card>

          </div>
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-xs text-textSecondary">Please select a candidate with LinkedIn analysis data.</p>
        </div>
      )}
    </div>
  );
};

export default LinkedInAnalysisPage;
