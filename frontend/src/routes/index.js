import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';

// Pages
import LandingPage from '../pages/Landing/LandingPage';
import LoginPage from '../pages/Login/LoginPage';
import RegisterPage from '../pages/Register/RegisterPage';
import DashboardPage from '../pages/Dashboard/DashboardPage';
import JobsPage from '../pages/Jobs/JobsPage';
import CandidatesPage from '../pages/Candidates/CandidatesPage';
import CandidateDetailsPage from '../pages/Candidates/CandidateDetailsPage';
import CandidateComparisonPage from '../pages/Candidates/CandidateComparisonPage';
import RankingsPage from '../pages/Rankings/RankingsPage';
import AnalyticsPage from '../pages/Analytics/AnalyticsPage';
import SettingsPage from '../pages/Settings/SettingsPage';
import InterviewQuestionsPage from '../pages/Candidates/InterviewQuestionsPage';
import GitHubAnalysisPage from '../pages/Candidates/GitHubAnalysisPage';
import LinkedInAnalysisPage from '../pages/Candidates/LinkedInAnalysisPage';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Authenticated Dashboard Sub-routes */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/candidates" element={<CandidatesPage />} />
        <Route path="/candidates/:id" element={<CandidateDetailsPage />} />
        <Route path="/compare" element={<CandidateComparisonPage />} />
        <Route path="/rankings" element={<RankingsPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/interview-questions" element={<InterviewQuestionsPage />} />
        <Route path="/github-analysis" element={<GitHubAnalysisPage />} />
        <Route path="/linkedin-analysis" element={<LinkedInAnalysisPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>

      {/* Fallback routing */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
