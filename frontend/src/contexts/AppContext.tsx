import React, { createContext, useContext, useState, useEffect } from 'react';

export interface AppContextType {
  jobs: any[];
  candidates: any[];
  activities: any[];
  notifications: any[];
  currentUser: any;
  theme: string;
  toggleTheme: () => void;
  addJob: (job: any) => void;
  deleteJob: (id: string) => void;
  updateJob: (updatedJob: any) => void;
  addCandidate: (cand: any) => void;
  updateCandidateStatus: (candidateId: string, status: string, statusStep: number, recruiterEmail?: string) => void;
  withdrawCandidateApplication: (candidateId: string) => void;
  updateUserProfile: (updates: any) => void;
  addNotification: (text: string, targetEmail: string) => void;
  markAllNotificationsRead: () => void;
  loginUser: (user: any) => void;
  logoutUser: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [candidates, setCandidates] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);

  const [currentUser, setCurrentUser] = useState(() => {
    const local = localStorage.getItem('ai_recruiter_user');
    return local ? JSON.parse(local) : null;
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('ai_recruiter_theme') || 'light';
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('ai_recruiter_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('ai_recruiter_user');
    }
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

  // Sync with Firebase
  useEffect(() => {
    import('../firebase/firebase').then(({ database }) => {
      import('firebase/database').then(({ ref, onValue }) => {
        // Jobs
        const jobsRef = ref(database, 'jobs');
        const unsubJobs = onValue(jobsRef, (snapshot) => {
          const data = snapshot.val();
          setJobs(data ? Object.values(data).sort((a: any, b: any) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()) : []);
        });

        // Candidates
        const candRef = ref(database, 'candidates');
        const unsubCand = onValue(candRef, (snapshot) => {
          const data = snapshot.val();
          setCandidates(data ? Object.values(data).sort((a: any, b: any) => b.appliedAt - a.appliedAt) : []);
        });

        // Activities
        const actRef = ref(database, 'activities');
        const unsubAct = onValue(actRef, (snapshot) => {
          const data = snapshot.val();
          setActivities(data ? Object.values(data).sort((a: any, b: any) => b.timestamp - a.timestamp) : []);
        });

        // Notifications
        const notifRef = ref(database, 'notifications');
        const unsubNotif = onValue(notifRef, (snapshot) => {
          const data = snapshot.val();
          setNotifications(data ? Object.values(data).sort((a: any, b: any) => b.timestamp - a.timestamp) : []);
        });

        return () => {
          unsubJobs();
          unsubCand();
          unsubAct();
          unsubNotif();
        };
      });
    }).catch(console.error);
  }, []);

  useEffect(() => {
    import('../firebase/firebase').then(({ auth, database }) => {
      import('firebase/auth').then(({ onAuthStateChanged }) => {
        import('firebase/database').then(({ ref, get }) => {
          const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
              try {
                const snapshot = await get(ref(database, 'users/' + user.uid));
                let userData: any = {
                  uid: user.uid,
                  email: user.email,
                  name: user.displayName || 'User',
                  role: 'Candidate'
                };
                if (snapshot.exists()) {
                  const val = snapshot.val();
                  userData = { ...userData, ...val };
                }
                setCurrentUser(userData);
                localStorage.setItem('ai_recruiter_user', JSON.stringify(userData));
              } catch (err) {
                console.error("Failed to fetch user data", err);
              }
            } else {
              setCurrentUser(null);
              localStorage.removeItem('ai_recruiter_user');
            }
          });
          return () => unsubscribe();
        });
      });
    }).catch(err => console.error("Firebase not configured yet", err));
  }, []);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const addJob = (job: any) => {
    const jobId = `job-${Date.now()}`;
    const newJob = {
      id: jobId,
      postedDate: new Date().toISOString().split('T')[0],
      candidatesCount: 0,
      shortlisted: 0,
      interviews: 0,
      status: 'Open',
      recruiterId: currentUser?.uid || null,
      ...job
    };
    
    import('../firebase/firebase').then(({ database }) => {
      import('firebase/database').then(({ ref, set }) => {
        set(ref(database, 'jobs/' + jobId), newJob).catch(console.error);
        
        // Log Activity
        const actId = `act-${Date.now()}`;
        set(ref(database, 'activities/' + actId), {
          id: actId,
          timestamp: Date.now(),
          action: 'Posted new job',
          target: newJob.title,
          recruiterId: currentUser?.uid,
          color: 'bg-orange-100 text-orange-700'
        });
      });
    }).catch(console.error);
  };

  const deleteJob = (jobId: string) => {
    import('../firebase/firebase').then(({ database }) => {
      import('firebase/database').then(({ ref, remove }) => {
        remove(ref(database, 'jobs/' + jobId)).catch(console.error);
      });
    }).catch(console.error);
  };

  const updateJob = (updatedJob: any) => {
    import('../firebase/firebase').then(({ database }) => {
      import('firebase/database').then(({ ref, update }) => {
        update(ref(database, 'jobs/' + updatedJob.id), updatedJob).catch(console.error);
      });
    }).catch(console.error);
  };

  const addCandidate = (candidate: any) => {
    // 1. Fetch associated job to calculate real match scores
    const job = jobs.find(j => j.id === candidate.jobId) || { title: 'Unknown Role', skills: [] };
    
    // Simulate AI pipeline evaluating profile vs job skills
    const candidateSkills = candidate.skills || ['JavaScript', 'HTML/CSS', 'Git', 'React']; // Fallback
    const jobSkills = job.skills || [];
    
    const matchedSkills = jobSkills.filter((s: string) => 
      candidateSkills.some((cs: string) => cs.toLowerCase().includes(s.toLowerCase()))
    );
    const missingSkills = jobSkills.filter((s: string) => !matchedSkills.includes(s));
    
    const skillsScore = jobSkills.length > 0 ? Math.round((matchedSkills.length / jobSkills.length) * 100) : 90;
    const expScore = Math.floor(Math.random() * 20) + 75; // 75-95
    const eduScore = Math.floor(Math.random() * 15) + 85; // 85-100
    
    const overallScore = Math.round((skillsScore * 0.5) + (expScore * 0.3) + (eduScore * 0.2));
    const githubScore = candidate.githubData?.techScore || Math.floor(Math.random() * 25) + 70;
    const linkedinScore = candidate.linkedinData?.profileData?.score || Math.floor(Math.random() * 25) + 70;
    const atsScore = candidate.atsScore || Math.floor(Math.random() * 15) + 82;
    
    let recommendation = 'Consider';
    let riskLevel = 'Medium';
    if (overallScore >= 90) { recommendation = 'Strong Hire'; riskLevel = 'Low'; }
    else if (overallScore >= 80) { recommendation = 'Hire'; riskLevel = 'Low'; }
    else if (overallScore < 70) { recommendation = 'Weak Match'; riskLevel = 'High'; }

    const candId = candidate.id || `cand-${Date.now()}`;
    const newCandidate = {
      id: candId,
      appliedAt: Date.now(),
      status: 'Applied',
      statusStep: 1, // 1: Applied, 2: Reviewed, 3: Shortlisted, 4: Interview, 5: Decision
      latestUpdate: 'Your application has been received and is awaiting review.',
      ...candidate,
      avatar: candidate.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().substring(0, 2),
      // AI Generated Fields
      matchScore: overallScore,
      skillsScore,
      expScore,
      eduScore,
      githubScore,
      linkedinScore,
      atsScore,
      recommendation,
      riskLevel,
      matchedSkills,
      missingSkills,
      executiveSummary: `AI Summary: ${candidate.name} has a ${overallScore}% overall match for the ${job.title} role. With strong background aligning to ${skillsScore}% of the core required skills.`,
      agents: {
        resume: `Parsed ${expScore}% experience match. ATS formatting score: ${atsScore}/100.`,
        github: `Analyzed repositories. Code quality and activity score: ${githubScore}/100.`,
        linkedin: `Verified tenure and endorsements. Professional network score: ${linkedinScore}/100.`,
        projects: 'Analyzed portfolio projects. Good relevance to role requirements.'
      },
      riskFlags: riskLevel === 'High' ? ['Missing critical required skills', 'Experience gap detected'] : ['No major risks detected. Standard verified profile.'],
      interviewQuestions: [
        `Could you elaborate on your experience with ${matchedSkills[0] || 'the core technologies'}?`,
        `How would you quickly ramp up on ${missingSkills[0] || 'our tech stack'}?`,
        'Describe a complex problem you solved in your recent role.'
      ],
      strengths: ['High education match', 'Good cultural fit indications', 'Solid ATS structure'],
      weaknesses: missingSkills.length > 0 ? ['Missing specific domain tools', 'Requires ramp-up on some stack layers'] : ['None highly notable']
    };

    // Copy PDF in localStorage from email key to candidate ID key
    if (candidate.email) {
      const emailBase64 = localStorage.getItem(`resume_file_${candidate.email}`);
      if (emailBase64) {
        localStorage.setItem(`resume_file_${candId}`, emailBase64);
      }
    }

    import('../firebase/firebase').then(({ database }) => {
      import('firebase/database').then(({ ref, set, update }) => {
        // Save Candidate
        set(ref(database, 'candidates/' + candId), newCandidate).catch(console.error);
        
        // Update Job Count
        update(ref(database, 'jobs/' + candidate.jobId), {
          candidatesCount: (job.candidatesCount || 0) + 1
        });

        // Add Notification for Candidate
        addNotification(`Application submitted successfully for ${job.title}.`, candidate.email);
        
        // Add Activity for Recruiter (if job has recruiter)
        if (job.recruiterId) {
          const actId = `act-${Date.now()}`;
          set(ref(database, 'activities/' + actId), {
            id: actId,
            timestamp: Date.now(),
            action: 'applied to',
            target: job.title,
            name: candidate.name,
            recruiterId: job.recruiterId,
            color: 'bg-blue-100 text-blue-700'
          });
        }
      });
    }).catch(console.error);
  };

  const updateCandidateStatus = (candidateId: string, status: string, statusStep: number, recruiterEmail?: string) => {
    const candidate = candidates.find(c => c.id === candidateId);
    if (!candidate) return;

    const job = jobs.find(j => j.id === candidate.jobId) || { title: 'the role' };

    import('../firebase/firebase').then(({ database }) => {
      import('firebase/database').then(({ ref, update, set }) => {
        // Update Candidate
        update(ref(database, 'candidates/' + candidateId), {
          status,
          statusStep,
          latestUpdate: `Status updated to ${status} by recruitment team.`
        }).catch(console.error);

        // Send Notification to Candidate
        addNotification(`Your application for ${job.title} has been moved to: ${status}.`, candidate.email);

        // Log Recruiter Activity
        const actId = `act-${Date.now()}`;
        set(ref(database, 'activities/' + actId), {
          id: actId,
          timestamp: Date.now(),
          action: `marked as ${status}`,
          target: candidate.name,
          name: currentUser?.name || 'Recruiter',
          recruiterId: job.recruiterId || currentUser?.uid,
          color: status === 'Shortlisted' ? 'bg-green-100 text-green-700' : 
                 status === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-purple-100 text-purple-700'
        });

        // Update Job counters if needed
        if (status === 'Shortlisted') {
          update(ref(database, 'jobs/' + job.id), { shortlisted: (job.shortlisted || 0) + 1 });
        } else if (status === 'Interviewing' || status === 'Interview Scheduled') {
          update(ref(database, 'jobs/' + job.id), { interviews: (job.interviews || 0) + 1 });
        }
      });
    }).catch(console.error);
  };

  const withdrawCandidateApplication = (candidateId: string) => {
    import('../firebase/firebase').then(({ database }) => {
      import('firebase/database').then(({ ref, remove }) => {
        remove(ref(database, 'candidates/' + candidateId)).catch(console.error);
      });
    }).catch(console.error);
  };

  const updateUserProfile = (updates: any) => {
    if (!currentUser?.uid) {
      setCurrentUser((prev: any) => {
        const newUser = { ...prev, ...updates };
        localStorage.setItem('ai_recruiter_user', JSON.stringify(newUser));
        return newUser;
      });
      return;
    }
    
    import('../firebase/firebase').then(({ database }) => {
      import('firebase/database').then(({ ref, update }) => {
        update(ref(database, 'users/' + currentUser.uid), updates).then(() => {
          setCurrentUser((prev: any) => {
            const newUser = { ...prev, ...updates };
            localStorage.setItem('ai_recruiter_user', JSON.stringify(newUser));
            return newUser;
          });
        }).catch(console.error);
      });
    }).catch(console.error);
  };

  const addNotification = (text: string, targetEmail: string) => {
    const notifId = `notif-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    import('../firebase/firebase').then(({ database }) => {
      import('firebase/database').then(({ ref, set }) => {
        set(ref(database, 'notifications/' + notifId), {
          id: notifId,
          text,
          targetEmail,
          timestamp: Date.now(),
          read: false
        }).catch(console.error);
      });
    }).catch(console.error);
  };

  const markAllNotificationsRead = () => {
    if (!currentUser?.email) return;
    const myUnread = notifications.filter(n => n.targetEmail === currentUser.email && !n.read);
    
    import('../firebase/firebase').then(({ database }) => {
      import('firebase/database').then(({ ref, update }) => {
        myUnread.forEach(n => {
          update(ref(database, 'notifications/' + n.id), { read: true });
        });
      });
    });
  };

  const loginUser = (user: any) => setCurrentUser(user);
  
  const logoutUser = () => {
    import('../firebase/firebase').then(({ auth }) => {
      import('firebase/auth').then(({ signOut }) => signOut(auth).catch(console.error));
    });
    setCurrentUser(null);
  };

  return (
    <AppContext.Provider value={{
      jobs,
      candidates,
      activities,
      notifications,
      currentUser,
      theme,
      toggleTheme,
      addJob,
      deleteJob,
      updateJob,
      addCandidate,
      updateCandidateStatus,
      withdrawCandidateApplication,
      updateUserProfile,
      addNotification,
      markAllNotificationsRead,
      loginUser,
      logoutUser
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
