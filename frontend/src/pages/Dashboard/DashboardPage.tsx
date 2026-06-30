import React from 'react'
import { useApp } from '../../contexts/AppContext'
import { RecruiterDashboard } from './RecruiterDashboard'
import { CandidateDashboard } from './CandidateDashboard'

export const DashboardPage = () => {
  const { currentUser } = useApp()

  if (currentUser?.role === 'Candidate') {
    return <CandidateDashboard />
  }

  return <RecruiterDashboard />
}
