import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { 
  IoHelpCircleOutline, IoSparklesOutline, IoCopyOutline, 
  IoRefreshOutline, IoCheckmarkCircle 
} from 'react-icons/io5';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Avatar from '../../components/common/Avatar';

const InterviewQuestionsPage = () => {
  const { candidates } = useApp();
  const [selectedCandidateId, setSelectedCandidateId] = useState(candidates[0]?.id || '');
  const [copyStatus, setCopyStatus] = useState({});

  const activeCandidate = candidates.find(c => c.id === selectedCandidateId);

  const handleCopyQuestion = (text, qId) => {
    navigator.clipboard.writeText(text);
    setCopyStatus(prev => ({ ...prev, [qId]: 'Copied' }));
    setTimeout(() => {
      setCopyStatus(prev => ({ ...prev, [qId]: '' }));
    }, 2000);
  };

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-textPrimary dark:text-white tracking-tight flex items-center gap-2">
          <IoHelpCircleOutline className="text-primary" />
          AI Interview Playbooks
        </h2>
        <p className="text-xs text-textSecondary dark:text-slate-400 mt-1">
          Review customized screening questions and answer templates targeting skill gaps
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
            {candidates.map(c => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.role})
              </option>
            ))}
          </select>
        </div>

        {activeCandidate && (
          <div className="flex items-center gap-3">
            <Avatar name={activeCandidate.name} size="sm" />
            <div className="text-left">
              <p className="text-xs font-bold text-textPrimary dark:text-white">{activeCandidate.name}</p>
              <p className="text-[10px] text-textSecondary dark:text-slate-400">Match score: {activeCandidate.overallScore}%</p>
            </div>
          </div>
        )}
      </Card>

      {/* Questions list */}
      {activeCandidate && activeCandidate.interviewQuestions ? (
        <div className="space-y-6">
          {/* Easy section */}
          <div>
            <h3 className="text-xs font-extrabold text-green-700 dark:text-green-400 uppercase tracking-wider mb-3 flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              Easy Level Screening Questions
            </h3>
            <div className="space-y-4">
              {activeCandidate.interviewQuestions.easy.map((q, idx) => {
                const qId = `easy-${idx}`;
                return (
                  <Card key={idx} className="p-4 relative bg-green-50/10 dark:bg-green-950/5 border-green-150/40">
                    <button
                      onClick={() => handleCopyQuestion(q.question, qId)}
                      className="absolute top-4 right-4 p-1 text-slate-400 hover:text-textPrimary transition-colors"
                      title="Copy Question"
                    >
                      {copyStatus[qId] ? <span className="text-[9px] font-bold text-green-600 mr-1">{copyStatus[qId]}</span> : null}
                      <IoCopyOutline size={16} className="inline-block" />
                    </button>
                    <p className="text-xs font-bold text-textPrimary dark:text-white pr-10">{q.question}</p>
                    <div className="mt-2.5 p-3 rounded-lg bg-white dark:bg-slate-900 border border-green-100 dark:border-green-950/20 text-xs text-textSecondary dark:text-slate-400 leading-relaxed">
                      <span className="font-bold text-green-700 dark:text-green-400 block mb-1">Expected Answer:</span>
                      {q.answer}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Medium section */}
          <div>
            <h3 className="text-xs font-extrabold text-blue-700 dark:text-blue-400 uppercase tracking-wider mb-3 mt-6 flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              Medium Level Screening Questions
            </h3>
            <div className="space-y-4">
              {activeCandidate.interviewQuestions.medium.map((q, idx) => {
                const qId = `med-${idx}`;
                return (
                  <Card key={idx} className="p-4 relative bg-blue-50/10 dark:bg-blue-950/5 border-blue-150/40">
                    <button
                      onClick={() => handleCopyQuestion(q.question, qId)}
                      className="absolute top-4 right-4 p-1 text-slate-400 hover:text-textPrimary transition-colors"
                      title="Copy Question"
                    >
                      {copyStatus[qId] ? <span className="text-[9px] font-bold text-blue-600 mr-1">{copyStatus[qId]}</span> : null}
                      <IoCopyOutline size={16} className="inline-block" />
                    </button>
                    <p className="text-xs font-bold text-textPrimary dark:text-white pr-10">{q.question}</p>
                    <div className="mt-2.5 p-3 rounded-lg bg-white dark:bg-slate-900 border border-blue-100 dark:border-blue-950/20 text-xs text-textSecondary dark:text-slate-400 leading-relaxed">
                      <span className="font-bold text-blue-700 dark:text-blue-400 block mb-1">Expected Answer:</span>
                      {q.answer}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Hard section */}
          <div>
            <h3 className="text-xs font-extrabold text-red-700 dark:text-red-400 uppercase tracking-wider mb-3 mt-6 flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              Hard Level Architecture Questions
            </h3>
            <div className="space-y-4">
              {activeCandidate.interviewQuestions.hard.map((q, idx) => {
                const qId = `hard-${idx}`;
                return (
                  <Card key={idx} className="p-4 relative bg-red-50/10 dark:bg-red-950/5 border-red-150/40">
                    <button
                      onClick={() => handleCopyQuestion(q.question, qId)}
                      className="absolute top-4 right-4 p-1 text-slate-400 hover:text-textPrimary transition-colors"
                      title="Copy Question"
                    >
                      {copyStatus[qId] ? <span className="text-[9px] font-bold text-red-600 mr-1">{copyStatus[qId]}</span> : null}
                      <IoCopyOutline size={16} className="inline-block" />
                    </button>
                    <p className="text-xs font-bold text-textPrimary dark:text-white pr-10">{q.question}</p>
                    <div className="mt-2.5 p-3 rounded-lg bg-white dark:bg-slate-900 border border-red-100 dark:border-red-950/20 text-xs text-textSecondary dark:text-slate-400 leading-relaxed">
                      <span className="font-bold text-red-700 dark:text-red-400 block mb-1">Expected Answer:</span>
                      {q.answer}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-xs text-textSecondary">Please select a candidate with generated playbooks.</p>
        </div>
      )}
    </div>
  );
};

export default InterviewQuestionsPage;
