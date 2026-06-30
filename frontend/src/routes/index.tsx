import { LandingPage } from '../pages/Landing/LandingPage'
import { LoginPage } from '../pages/Login/LoginPage'
import { RegisterPage } from '../pages/Register/RegisterPage'
import { PrivacyPolicyPage } from '../pages/Legal/PrivacyPolicyPage'
import { TermsPage } from '../pages/Legal/TermsPage'
import { DashboardPage } from '../pages/Dashboard/DashboardPage'
import { UploadJobPage } from '../pages/UploadJob/UploadJobPage'
import { UploadResumePage } from '../pages/UploadResume/UploadResumePage'
import { CandidateProfilePage } from '../pages/CandidateProfile/CandidateProfilePage'
import { RankingsPage } from '../pages/Rankings/RankingsPage'
import { DiscoveryPage } from '../pages/Discovery/DiscoveryPage'
import { CandidateComparisonPage } from '../pages/CandidateComparison/CandidateComparisonPage'
import { AnalyticsPage } from '../pages/Analytics/AnalyticsPage'
import { SettingsPage } from '../pages/Settings/SettingsPage'
import { DashboardLayout } from '../layouts/DashboardLayout'

// New Candidate Pages
import { ResumeAnalysisPage } from '../pages/Candidate/ResumeAnalysisPage'
import { GitHubSyncPage } from '../pages/Candidate/GitHubSyncPage'
import { LinkedInSyncPage } from '../pages/Candidate/LinkedInSyncPage'
import { JobRecommendationsPage } from '../pages/Candidate/JobRecommendationsPage'
import { SkillGapPage } from '../pages/Candidate/SkillGapPage'
import { InterviewPrepPage } from '../pages/Candidate/InterviewPrepPage'

// New Recruiter Pages
import { RecruiterChatPage } from '../pages/Candidates/RecruiterChatPage'

export const routes = [
  { path: '/', element: <LandingPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/privacy', element: <PrivacyPolicyPage /> },
  { path: '/terms', element: <TermsPage /> },
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'workspaces', element: <DashboardPage /> },
      { path: 'upload-job', element: <UploadJobPage /> },
      { path: 'upload-resume', element: <UploadResumePage /> },
      { path: 'candidate/:id', element: <CandidateProfilePage /> },
      { path: 'discovery', element: <DiscoveryPage /> },
      { path: 'rankings', element: <RankingsPage /> },
      { path: 'compare', element: <CandidateComparisonPage /> },
      { path: 'analytics', element: <AnalyticsPage /> },
      { path: 'settings', element: <SettingsPage /> },
      
      // Candidate Routes
      { path: 'resume-analysis', element: <ResumeAnalysisPage /> },
      { path: 'github-sync', element: <GitHubSyncPage /> },
      { path: 'linkedin-sync', element: <LinkedInSyncPage /> },
      { path: 'job-recommendations', element: <JobRecommendationsPage /> },
      { path: 'skill-gap', element: <SkillGapPage /> },
      { path: 'interview-prep', element: <InterviewPrepPage /> },
      
      // Recruiter Routes
      { path: 'chat', element: <RecruiterChatPage /> },
    ]
  }
]

