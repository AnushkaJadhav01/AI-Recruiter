import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockJobs, mockCandidates, mockInsights, mockActivities } from '../services/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [jobs, setJobs] = useState(() => {
    const local = localStorage.getItem('ai_recruiter_jobs');
    return local ? JSON.parse(local) : mockJobs;
  });

  const [candidates, setCandidates] = useState(() => {
    const local = localStorage.getItem('ai_recruiter_candidates');
    return local ? JSON.parse(local) : mockCandidates;
  });

  const [notifications, setNotifications] = useState([
    { id: 1, text: "Sarah Jenkins completed GitHub evaluation. Score: 92/100", time: "1 hour ago", read: false },
    { id: 2, text: "New applicant Elena Rostova for AI/ML Research Engineer", time: "2 hours ago", read: false },
    { id: 3, text: "Job Description 'DevOps & Infrastructure Lead' saved as draft", time: "Yesterday", read: true }
  ]);

  const [currentUser, setCurrentUser] = useState(() => {
    const local = localStorage.getItem('ai_recruiter_user');
    return local ? JSON.parse(local) : { name: "Anushka Recruiter", email: "anushka@recruiter.ai", role: "Recruiter" };
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('ai_recruiter_theme') || 'light';
  });

  useEffect(() => {
    localStorage.setItem('ai_recruiter_jobs', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem('ai_recruiter_candidates', JSON.stringify(candidates));
  }, [candidates]);

  useEffect(() => {
    localStorage.setItem('ai_recruiter_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('ai_recruiter_theme', theme);
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const addJob = (job) => {
    const newJob = {
      id: `job-${Date.now()}`,
      postedDate: new Date().toISOString().split('T')[0],
      candidatesCount: 0,
      status: 'Open',
      ...job
    };
    setJobs(prev => [newJob, ...prev]);
    addNotification(`New Job Posted: ${job.title} in ${job.department}`);
  };

  const deleteJob = (jobId) => {
    setJobs(prev => prev.filter(job => job.id !== jobId));
    // Remove candidates associated with this job as well
    setCandidates(prev => prev.filter(cand => cand.jobId !== jobId));
  };

  const updateJob = (updatedJob) => {
    setJobs(prev => prev.map(job => job.id === updatedJob.id ? updatedJob : job));
  };

  const addCandidate = (candidate) => {
    const newCandidate = {
      id: `cand-${Date.now()}`,
      avatar: candidate.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2),
      githubScore: Math.floor(Math.random() * 25) + 70, // realistic range 70-95
      linkedinScore: Math.floor(Math.random() * 25) + 70,
      overallScore: Math.floor(Math.random() * 20) + 76,
      recommendation: "Good Match",
      confidence: Math.floor(Math.random() * 15) + 82,
      projects: [],
      experienceTimeline: [],
      ...candidate
    };

    // Calculate rating recommendation
    if (newCandidate.overallScore >= 90) {
      newCandidate.recommendation = "Strong Match";
    } else if (newCandidate.overallScore >= 80) {
      newCandidate.recommendation = "Good Match";
    } else if (newCandidate.overallScore >= 70) {
      newCandidate.recommendation = "Potential Match";
    } else {
      newCandidate.recommendation = "Not Recommended";
    }

    setCandidates(prev => [newCandidate, ...prev]);
    // increment candidate count for job
    setJobs(prev => prev.map(job => {
      if (job.id === candidate.jobId) {
        return { ...job, candidatesCount: job.candidatesCount + 1 };
      }
      return job;
    }));

    addNotification(`New Candidate Uploaded: ${candidate.name} for ${newCandidate.role || 'Job Position'}`);
  };

  const addNotification = (text) => {
    setNotifications(prev => [
      { id: Date.now(), text, time: "Just now", read: false },
      ...prev
    ]);
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const loginUser = (user) => {
    setCurrentUser(user);
  };

  const logoutUser = () => {
    setCurrentUser(null);
  };

  return (
    <AppContext.Provider value={{
      jobs,
      candidates,
      insights: mockInsights,
      activities: mockActivities,
      notifications,
      currentUser,
      theme,
      toggleTheme,
      addJob,
      deleteJob,
      updateJob,
      addCandidate,
      addNotification,
      markAllNotificationsRead,
      loginUser,
      logoutUser
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
