import { LandingPage } from '../pages/Landing/LandingPage'
import { LoginPage } from '../pages/Login/LoginPage'
import { RegisterPage } from '../pages/Register/RegisterPage'
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

export const routes = [
  { path: '/', element: <LandingPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
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
    ]
  }
]
