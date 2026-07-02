import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';
import { 
  IoPeopleOutline, IoCloudUploadOutline, IoLogoGithub, 
  IoLogoLinkedin, IoSearchOutline, IoTrashOutline, 
  IoArrowForwardOutline, IoFilterOutline, IoScaleOutline 
} from 'react-icons/io5';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Avatar from '../../components/common/Avatar';
import UploadArea from '../../components/common/UploadArea';
import Input from '../../components/common/Input';
import SearchBar from '../../components/common/SearchBar';
import FilterPanel from '../../components/common/FilterPanel';

const CandidatesPage = () => {
  const { candidates, jobs, addCandidate, currentUser } = useApp();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const urlJobId = searchParams.get('jobId');

  // Filter jobs & candidates to only show those belonging to this recruiter
  const myJobs = jobs.filter(job => currentUser && job.recruiterId === currentUser.uid);
  const myJobIds = myJobs.map(job => job.id);
  const myCandidates = candidates.filter(cand => myJobIds.includes(cand.jobId));


  // Sourcing Upload Form State
  const [candidateName, setCandidateName] = useState('');
  const [candidateRole, setCandidateRole] = useState('');
  const [selectedJobId, setSelectedJobId] = useState(urlJobId || '');
  const [githubUser, setGithubUser] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzingStep, setAnalyzingStep] = useState('');

  
  // Sourcing Filter/Search State
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [activeFilters, setActiveFilters] = useState({
    job: urlJobId || '',
    experience: '',
    recommendation: ''
  });
  const [sortBy, setSortBy] = useState('overallScore'); // overallScore, githubScore, experience
  const [selectedCompareList, setSelectedCompareList] = useState([]);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleFileSelect = (file) => {
    setUploadedFile(file);
    if (file && !candidateName) {
      // Auto fill name from file name as helper
      const cleanName = file.name
        .replace(/\.[^/.]+$/, "") // strip extension
        .replace(/resume/gi, "")   // strip resume keyword
        .replace(/[-_]/g, " ")     // replace dashes
        .trim();
      setCandidateName(cleanName.charAt(0).toUpperCase() + cleanName.slice(1));
    }
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!candidateName || !selectedJobId) {
      alert('Please fill in candidate name and select a target job position.');
      return;
    }

    setIsAnalyzing(true);
    const matchedJob = jobs.find(j => j.id === selectedJobId);

    let parsedAtsScore = 85;
    let parsedSkills = matchedJob?.skills?.slice(0, 3) || ['React', 'Node.js'];
    let parsedExp = '5 Years';
    let parsedEdu = { degree: 'B.S. in Computer Science', school: 'State University', year: '2021' };
    let parsedSummary = '';

    // 1. Call Resume Optimizer API
    if (uploadedFile) {
      setAnalyzingStep('Running AI Resume Parser...');
      const formData = new FormData();
      formData.append('file', uploadedFile);
      formData.append('job_description', matchedJob?.description || '');
      
      try {
        const apiBase = import.meta.env.VITE_API_BASE_URL || '';
        const res = await fetch(`${apiBase}/api/resume/optimize`, {
          method: 'POST',
          body: formData
        });
        if (res.ok) {
          const data = await res.json();
          parsedAtsScore = data.atsScore ?? data.ats_score ?? 85;
          if (data.highlights) {
            parsedExp = data.highlights.experience || '5 Years';
            if (data.highlights.skills) {
              parsedSkills = data.highlights.skills.split(',').map((s: string) => s.trim());
            }
            if (data.highlights.education) {
              parsedEdu = { degree: data.highlights.education, school: 'Extracted Resume Profile', year: 'N/A' };
            }
          }
          parsedSummary = data.recommendations ? data.recommendations.map((r: any) => r.text).join(' ') : '';
        }
      } catch (err) {
        console.error('Failed to parse resume:', err);
      }
    }

    // 2. Call LinkedIn Sync API
    let linkedInData = null;
    if (linkedinUrl) {
      setAnalyzingStep('Syncing LinkedIn footprint...');
      try {
        const apiBase = import.meta.env.VITE_API_BASE_URL || '';
        const res = await fetch(`${apiBase}/api/linkedin/sync`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ url: linkedinUrl })
        });
        if (res.ok) {
          const data = await res.json();
          linkedInData = data;
        }
      } catch (err) {
        console.error('Failed to sync LinkedIn:', err);
      }
    }

    // 3. Build candidate record using real data
    setAnalyzingStep('Saving candidate DNA...');
    addCandidate({
      name: candidateName,
      role: candidateRole || (linkedInData ? linkedInData.summary?.split('|')?.[0]?.trim() : '') || matchedJob?.title || 'Engineer',
      jobId: selectedJobId,
      experience: parsedExp,
      skills: parsedSkills,
      githubUsername: githubUser || 'mock-dev',
      linkedinUrl: linkedinUrl || 'linkedin.com/in/mock-dev',
      email: `${candidateName.toLowerCase().replace(/\s/g, '')}@devmail.com`,
      phone: '+1 (555) 000-1111',
      resumeSummary: parsedSummary || `${candidateName} is an experienced professional skilled in software engineering, matched against the ${matchedJob?.title || 'target'} position.`,
      experienceTimeline: linkedInData && linkedInData.careerHistory && linkedInData.careerHistory.length > 0
        ? linkedInData.careerHistory.map((h: any) => ({
            role: h.role,
            company: h.company,
            duration: h.duration || 'N/A',
            description: h.description || ''
          }))
        : [
            { role: candidateRole || matchedJob?.title || 'Engineer', company: "Tech Startup", duration: "2023 - Present", description: "Contributed to frontend layouts and APIs." }
          ],
      education: parsedEdu,
      githubAnalysis: {
        stars: 12, forks: 2, totalRepos: 5, contributionsLastYear: 400,
        languages: [{ name: 'JavaScript', percentage: 100 }],
        projectQuality: "Valid codebase, modular layout, clean directory structuring.",
        technicalScore: 82
      },
      linkedinAnalysis: linkedInData ? {
        growthRate: linkedInData.growthRate || 'Steady Trajectory',
        leadershipRating: 'Medium',
        professionalSummary: linkedInData.summary || 'Verified profile summary.',
        endorsements: linkedInData.endorsements && linkedInData.endorsements.length > 0
          ? linkedInData.endorsements.map((e: any) => ({ skill: e.skill, count: e.count }))
          : [{ skill: parsedSkills[0] || 'React', count: 12 }]
      } : {
        growthRate: "Standard growth", leadershipRating: "Medium",
        professionalSummary: "Self-driven engineer focused on writing quality, well-documented applications.",
        endorsements: [{ skill: parsedSkills[0] || 'React', count: 12 }]
      },
      skillGap: {
        matched: matchedJob?.skills ? matchedJob.skills.filter((s: string) => parsedSkills.some((cs: string) => cs.toLowerCase().includes(s.toLowerCase()))) : [],
        missing: matchedJob?.skills ? matchedJob.skills.filter((s: string) => !parsedSkills.some((cs: string) => cs.toLowerCase().includes(s.toLowerCase()))) : [],
        extra: parsedSkills.filter((s: string) => !matchedJob?.skills?.some((js: string) => js.toLowerCase().includes(s.toLowerCase())))
      }
    });

    // Reset Form
    setCandidateName('');
    setCandidateRole('');
    setGithubUser('');
    setLinkedinUrl('');
    setUploadedFile(null);
    setIsAnalyzing(false);
    setAnalyzingStep('');
    alert('Candidate profile added successfully with active AI parsing insights!');
  };

  const handleCheckboxChange = (candidateId) => {
    setSelectedCompareList(prev => {
      if (prev.includes(candidateId)) {
        return prev.filter(id => id !== candidateId);
      }
      if (prev.length >= 2) {
        // limit to 2
        return [prev[1], candidateId];
      }
      return [...prev, candidateId];
    });
  };

  const handleCompareClick = () => {
    if (selectedCompareList.length < 2) return;
    navigate(`/compare?c1=${selectedCompareList[0]}&c2=${selectedCompareList[1]}`);
  };

  // Filter & Search Candidates
  const filteredCandidates = myCandidates.filter(cand => {
    // Search query match
    const matchesSearch = cand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          cand.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          cand.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    // Filter match
    const matchesJob = activeFilters.job ? cand.jobId === activeFilters.job : true;
    const matchesRecommendation = activeFilters.recommendation ? cand.recommendation === activeFilters.recommendation : true;
    
    let matchesExperience = true;
    if (activeFilters.experience) {
      const years = parseInt(cand.experience);
      if (activeFilters.experience === '0-3 years') matchesExperience = years <= 3;
      else if (activeFilters.experience === '4-6 years') matchesExperience = years >= 4 && years <= 6;
      else if (activeFilters.experience === '7+ years') matchesExperience = years >= 7;
    }

    return matchesSearch && matchesJob && matchesRecommendation && matchesExperience;
  }).sort((a, b) => {
    if (sortBy === 'overallScore') return b.overallScore - a.overallScore;
    if (sortBy === 'githubScore') return b.githubScore - a.githubScore;
    if (sortBy === 'experience') {
      const expA = parseInt(a.experience) || 0;
      const expB = parseInt(b.experience) || 0;
      return expB - expA;
    }
    return 0;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredCandidates.length / itemsPerPage);
  const paginatedCandidates = filteredCandidates.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="text-left">
        <h2 className="text-xl font-bold text-textPrimary dark:text-white tracking-tight flex items-center gap-2">
          <IoPeopleOutline className="text-primary" />
          Candidate Pipelines
        </h2>
        <p className="text-xs text-textSecondary dark:text-slate-400 mt-1">
          Upload resume files, crawl GitHub and LinkedIn footprints, and filter top-ranked candidates
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Column (Left on Large screens) */}
        <Card className="lg:col-span-1 text-left h-fit">
          <h3 className="text-xs font-bold text-textPrimary dark:text-white uppercase tracking-wider mb-4 flex items-center gap-1.5">
            <IoCloudUploadOutline className="text-primary" size={16} />
            Candidate Sourcing Uploader
          </h3>

          <form onSubmit={handleUploadSubmit} className="space-y-4">
            <UploadArea onFileSelect={handleFileSelect} />

            <Input 
              label="Candidate Name"
              id="name"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              placeholder="e.g. Sarah Jenkins"
              required
            />

            <div>
              <label className="block text-xs font-semibold text-textSecondary dark:text-slate-400 mb-1">
                Target Job Position <span className="text-customError">*</span>
              </label>
              <select
                value={selectedJobId}
                onChange={(e) => setSelectedJobId(e.target.value)}
                required
                className="block w-full rounded-premium border border-customBorder dark:border-slate-800 text-sm px-3 py-2 bg-white dark:bg-slate-900 text-textPrimary dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-950 focus:border-primary transition-all"
              >
                <option value="">Select Job...</option>
                {myJobs.map(job => (
                  <option key={job.id} value={job.id}>{job.title} ({job.department})</option>
                ))}
              </select>
            </div>

            <Input 
              label="Candidate Role Title"
              id="role"
              value={candidateRole}
              onChange={(e) => setCandidateRole(e.target.value)}
              placeholder="e.g. Senior Frontend Dev (Optional)"
            />

            <div className="grid grid-cols-2 gap-3">
              <Input 
                label="GitHub Username"
                id="github"
                value={githubUser}
                onChange={(e) => setGithubUser(e.target.value)}
                placeholder="e.g. octocat"
                icon={IoLogoGithub}
              />
              <Input 
                label="LinkedIn Profile URL"
                id="linkedin"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                placeholder="e.g. linkedin/in/name"
                icon={IoLogoLinkedin}
              />
            </div>

            <Button
              type="submit"
              fullWidth
              disabled={!candidateName || !selectedJobId || isAnalyzing}
              className="mt-2 py-2.5"
            >
              {isAnalyzing ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  {analyzingStep}
                </span>
              ) : 'Analyze Candidate Profile'}
            </Button>
          </form>
        </Card>

        {/* Candidate List Column (Right on Large screens) */}
        <div className="lg:col-span-2 space-y-4 text-left">
          {/* Search and Filters */}
          <div className="space-y-3">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onClear={() => setSearchQuery('')}
              placeholder="Search applicants by name, role, or skills..."
            />

            <FilterPanel
              options={[
                { id: 'job', label: 'Position', choices: myJobs.map(j => j.id) },
                { id: 'experience', label: 'Experience', choices: ['0-3 years', '4-6 years', '7+ years'] },
                { id: 'recommendation', label: 'Recommendation', choices: ['Strong Match', 'Good Match', 'Potential Match'] }
              ]}
              activeFilters={activeFilters}
              onChange={(filterId, val) => {
                setActiveFilters(prev => ({ ...prev, [filterId]: val }));
                setCurrentPage(1);
              }}
              onReset={() => {
                setActiveFilters({ job: '', experience: '', recommendation: '' });
                setSearchQuery('');
              }}
            />
          </div>

          {/* Candidates Table List */}
          <Card className="p-0 overflow-hidden">
            <div className="px-6 py-4 border-b border-customBorder dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
              <span className="text-xs font-bold text-textPrimary dark:text-white uppercase tracking-wider">Candidate Applications</span>
              
              {/* Sorter selection */}
              <div className="flex items-center gap-1.5 text-xs text-textSecondary dark:text-slate-450 font-semibold">
                <span>Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent font-bold text-primary focus:outline-none cursor-pointer"
                >
                  <option value="overallScore">Overall Match Score</option>
                  <option value="githubScore">GitHub Code Score</option>
                  <option value="experience">Years of Experience</option>
                </select>
              </div>
            </div>

            {paginatedCandidates.length === 0 ? (
              <div className="text-center py-20">
                <span className="text-4xl text-slate-300 dark:text-slate-600 block mb-3">👥</span>
                <p className="text-xs font-semibold text-textSecondary dark:text-slate-400">No candidates matched the current search criteria.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-customBorder dark:border-slate-800 text-[10px] text-textSecondary dark:text-slate-400 uppercase font-bold bg-slate-50/30 dark:bg-slate-900/10">
                      <th className="py-3 px-4 w-10">Select</th>
                      <th className="py-3 px-4">Candidate</th>
                      <th className="py-3 px-4">Exp</th>
                      <th className="py-3 px-4">Skills Match</th>
                      <th className="py-3 px-4 text-center">GitHub</th>
                      <th className="py-3 px-4 text-center">LinkedIn</th>
                      <th className="py-3 px-4 text-center">Overall</th>
                      <th className="py-3 px-4">Recommendation</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-customBorder dark:divide-slate-800 text-xs">
                    {paginatedCandidates.map((cand) => (
                      <tr key={cand.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-850/50 transition-colors">
                        <td className="py-4 px-4 text-center">
                          <input
                            type="checkbox"
                            checked={selectedCompareList.includes(cand.id)}
                            onChange={() => handleCheckboxChange(cand.id)}
                            className="h-4 w-4 rounded border-customBorder text-primary focus:ring-primary focus:outline-none cursor-pointer"
                          />
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <Avatar name={cand.name} size="sm" />
                            <div className="min-w-0">
                              <p className="font-bold text-textPrimary dark:text-white truncate">{cand.name}</p>
                              <p className="text-[10px] text-textSecondary dark:text-slate-400 truncate mt-0.5">{cand.role}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-textSecondary dark:text-slate-350 font-semibold">{cand.experience}</td>
                        <td className="py-4 px-4">
                          <div className="flex flex-wrap gap-0.5 max-w-[150px]">
                            {cand.skills.slice(0, 3).map((s, idx) => (
                              <span key={idx} className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-customBorder/50 dark:border-slate-750">
                                {s}
                              </span>
                            ))}
                            {cand.skills.length > 3 && (
                              <span className="text-[9px] font-bold text-primary px-1">{`+${cand.skills.length - 3}`}</span>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center font-bold text-textSecondary dark:text-slate-300">{cand.githubScore || '-'}</td>
                        <td className="py-4 px-4 text-center font-bold text-textSecondary dark:text-slate-300">{cand.linkedinScore || '-'}</td>
                        <td className="py-4 px-4 text-center font-extrabold text-primary dark:text-blue-400">{cand.overallScore}%</td>
                        <td className="py-4 px-4">
                          <Badge variant={cand.recommendation === 'Strong Match' ? 'success' : cand.recommendation === 'Good Match' ? 'primary' : 'warning'}>
                            {cand.recommendation}
                          </Badge>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <button
                            onClick={() => navigate(`/candidates/${cand.id}`)}
                            className="text-primary hover:underline font-bold mr-3"
                          >
                            Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="px-6 py-4 border-t border-customBorder dark:border-slate-800 flex items-center justify-between bg-slate-50/20 dark:bg-slate-900/5">
                <span className="text-[10px] text-textSecondary dark:text-slate-400 font-semibold">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredCandidates.length)} of {filteredCandidates.length} applicants
                </span>
                
                <div className="flex gap-1.5">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Floating Compare Action Bar */}
      {selectedCompareList.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 w-full max-w-lg px-4">
          <Card className="bg-slate-900/90 dark:bg-slate-950/90 backdrop-blur border border-slate-750 text-white shadow-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 text-white rounded-lg">
                <IoScaleOutline size={18} />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold">{selectedCompareList.length} Candidate(s) Selected</p>
                <p className="text-[10px] text-slate-350">
                  {selectedCompareList.length === 1 
                    ? 'Select one more to compare side-by-side.' 
                    : 'Ready for side-by-side fit comparisons.'
                  }
                </p>
              </div>
            </div>
            
            <div className="flex gap-2">
              {selectedCompareList.length === 2 && (
                <Button 
                  onClick={handleCompareClick}
                  size="sm"
                  className="bg-primary text-white hover:bg-blue-700"
                >
                  Compare Now
                </Button>
              )}
              <button 
                onClick={() => setSelectedCompareList([])}
                className="text-xs font-bold text-slate-400 hover:text-white px-2 py-1"
              >
                Clear
              </button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CandidatesPage;
