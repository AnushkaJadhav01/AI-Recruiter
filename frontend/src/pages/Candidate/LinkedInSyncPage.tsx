import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiLinkedin, 
  FiClock, 
  FiCheckCircle, 
  FiBriefcase, 
  FiUser,
  FiRefreshCw,
  FiCpu
} from 'react-icons/fi'
import { Card } from '../../components/common/Card'
import { Button } from '../../components/common/Button'
import { mockCandidates } from '../../services/mockData'

import { useApp } from '../../contexts/AppContext'

export const LinkedInSyncPage = () => {
  const { updateUserProfile, currentUser } = useApp()
  const [profileUrl, setProfileUrl] = useState(currentUser?.linkedin?.profileUrl || "")
  const [syncing, setSyncing] = useState(false)
  const [syncDone, setSyncDone] = useState(!!currentUser?.linkedin)
  const [errorMsg, setErrorMsg] = useState("")

  const [careerHistory, setCareerHistory] = useState<any[]>(currentUser?.linkedin?.careerHistory || [])
  const [endorsements, setEndorsements] = useState<any[]>(currentUser?.linkedin?.endorsements || [])
  const [profileData, setProfileData] = useState<any>(currentUser?.linkedin?.profileData || null)

  React.useEffect(() => {
    if (currentUser?.linkedin) {
      setSyncDone(true)
      setProfileUrl(currentUser.linkedin.profileUrl || '')
      setCareerHistory(currentUser.linkedin.careerHistory || [])
      setEndorsements(currentUser.linkedin.endorsements || [])
      setProfileData(currentUser.linkedin.profileData || null)
    } else if (currentUser?.linkedinUrl) {
      setProfileUrl(currentUser.linkedinUrl)
    }
  }, [currentUser])

  const triggerSync = async () => {
    if (!profileUrl) return;
    
    setSyncing(true)
    setSyncDone(false)
    setErrorMsg('')

    try {
      const response = await fetch('http://localhost:8000/api/linkedin/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: profileUrl })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.detail || 'Failed to sync LinkedIn profile. Check API key or URL.');
      }

      const data = await response.json();

      const syncPayload = {
        profileUrl,
        careerHistory: data.careerHistory || [],
        endorsements: data.endorsements || [],
        profileData: {
          name: data.name,
          score: data.score,
          summary: data.summary,
          growthRate: data.growthRate
        }
      }

      setCareerHistory(syncPayload.careerHistory);
      setEndorsements(syncPayload.endorsements);
      setProfileData(syncPayload.profileData);
      
      updateUserProfile({ linkedin: syncPayload })
      setSyncDone(true);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Failed to sync LinkedIn profile. Please try again.");
    } finally {
      setSyncing(false);
    }
  }

  return (
    <div className="space-y-6 text-left max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
            <FiLinkedin className="text-blue-600" />
            LinkedIn Career Verification
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Import and verify your employment history, position tenures, and peer endorsements to skip initial manual triage checks.
          </p>
        </div>
        
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="linkedin.com/in/username"
              value={profileUrl}
              onChange={(e) => setProfileUrl(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-800 w-64"
              onKeyDown={(e) => e.key === 'Enter' && triggerSync()}
            />
            <Button 
              onClick={triggerSync} 
              disabled={syncing || !profileUrl}
              className="text-xs font-semibold gap-1.5 shadow-sm whitespace-nowrap bg-blue-600 hover:bg-blue-700 text-white border-transparent"
            >
              <FiRefreshCw className={`w-3.5 h-3.5 ${syncing ? 'animate-spin' : ''}`} /> 
              {syncing ? 'Syncing...' : 'Sync Profile'}
            </Button>
          </div>
          {errorMsg && (
            <span className="text-xs font-semibold text-red-500 bg-red-50 px-2 py-0.5 rounded border border-red-100">{errorMsg}</span>
          )}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {syncing ? (
          <motion.div 
            key="syncing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-20 bg-white border border-gray-200 rounded-2xl shadow-sm space-y-4"
          >
            <FiCpu className="text-blue-600 w-12 h-12 animate-pulse" />
            <h4 className="font-extrabold text-sm text-gray-950">AI LinkedIn Auditor in Progress</h4>
            <p className="text-xs text-gray-500">Extracting career history, evaluating endorsements, and verifying skills...</p>
          </motion.div>
        ) : !syncDone ? (
          <motion.div 
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 bg-white border border-gray-200 rounded-2xl shadow-sm space-y-4"
          >
            <FiLinkedin className="text-gray-300 w-12 h-12" />
            <h4 className="font-extrabold text-sm text-gray-950">No Profile Synchronized</h4>
            <p className="text-xs text-gray-500">Enter your LinkedIn URL and sync to verify your career history.</p>
          </motion.div>
        ) : (
          <motion.div 
            key="details"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            
            {/* Left Column: Sync Controls & Summary */}
            <div className="space-y-6">
              {/* Connection Profile Status */}
              <Card className="p-6 bg-white border border-gray-200 shadow-sm space-y-4">
                <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 mx-auto">
                  <FiUser className="w-8 h-8" />
                </div>
                
                <div className="space-y-1 text-center">
                  <h3 className="font-extrabold text-sm text-gray-950">{profileData?.name}</h3>
                  <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider flex items-center justify-center gap-1 mt-1">
                    <FiCheckCircle className="w-3.5 h-3.5" /> Fully Synchronized
                  </p>
                </div>

                <div className="border-t border-gray-150 my-2" />
                
                <div className="grid grid-cols-2 gap-2 text-left text-xs">
                  <div>
                    <span className="text-[9px] text-gray-400 font-bold uppercase block">Positions</span>
                    <span className="font-extrabold text-gray-800">{careerHistory.length} Recorded</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-gray-400 font-bold uppercase block">Progression</span>
                    <span className="font-extrabold text-gray-800 truncate" title={profileData?.growthRate}>{profileData?.growthRate || "Standard"}</span>
                  </div>
                </div>
              </Card>

              {/* AI Verified Skills */}
              <Card className="p-6 bg-white border border-gray-200 shadow-sm space-y-4">
                <h3 className="font-extrabold text-sm text-gray-900 tracking-wide">AI Verified Skills</h3>
                <p className="text-[10px] text-gray-500 leading-relaxed font-semibold">
                  Skills flagged as "Verified" have matching code evidence found in synchronized repositories or assessments.
                </p>

                <div className="space-y-3">
                  {endorsements.length > 0 ? endorsements.map((end: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between p-2.5 border border-gray-100 rounded-xl bg-gray-50/50 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-800">{end.skill}</span>
                        {end.verified && (
                          <span className="text-[9px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider flex items-center gap-0.5">
                            <FiCheckCircle className="w-2.5 h-2.5" /> Verified
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] font-bold text-gray-400">{end.count} Endorsements</span>
                    </div>
                  )) : (
                    <p className="text-xs text-gray-500 text-center py-2">No endorsements found.</p>
                  )}
                </div>
              </Card>
            </div>

            {/* Right Column: Work Experience Timeline */}
            <div className="md:col-span-2 space-y-6">
              {/* Profile Summary */}
              {profileData?.summary && (
                <Card className="p-6 bg-white border border-gray-200 shadow-sm space-y-2">
                   <h3 className="font-extrabold text-sm text-gray-900 tracking-wide">Professional Summary</h3>
                   <p className="text-xs text-gray-700 leading-relaxed font-medium">{profileData.summary}</p>
                </Card>
              )}

              <Card className="p-6 bg-white border border-gray-200 shadow-sm">
                <h3 className="font-extrabold text-sm text-gray-900 mb-6 tracking-wide flex items-center gap-2">
                  <FiBriefcase className="text-gray-400" /> Parsed Professional History
                </h3>

                <div className="relative border-l border-gray-200 pl-6 ml-3 space-y-8">
                  {careerHistory.map((item, idx) => (
                    <div key={idx} className="relative text-xs">
                      {/* Timeline dot */}
                      <span className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-blue-600 border-4 border-white shadow-sm flex items-center justify-center" />
                      
                      <div className="space-y-1.5 text-left">
                        <div className="flex justify-between items-start flex-wrap gap-1">
                          <h4 className="font-extrabold text-sm text-gray-950">{item.role}</h4>
                          <span className="text-[10px] text-gray-400 font-bold uppercase flex items-center gap-1">
                            <FiClock className="w-3.5 h-3.5" /> {item.duration}
                          </span>
                        </div>
                        
                        <p className="text-xs font-bold text-blue-600 uppercase tracking-wide">{item.company}</p>
                        <p className="text-gray-600 leading-relaxed font-semibold mt-2">{item.description}</p>
                      </div>
                    </div>
                  ))}
                  {careerHistory.length === 0 && (
                    <p className="text-xs text-gray-500">No career history found.</p>
                  )}
                </div>
              </Card>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
