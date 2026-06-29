import { useState } from 'react'
import { 
  FiCpu, 
  FiStar, 
  FiGithub,
  FiLinkedin,
  FiBriefcase,
  FiActivity
} from 'react-icons/fi'
import { Card } from '../../components/common/Card'

// Simple SVG Radar Chart Component
const RadarChart = ({ dataA, dataB, labels }: { dataA: number[], dataB: number[], labels: string[] }) => {
  const size = 300
  const center = size / 2
  const radius = (size / 2) - 40
  const angleStep = (Math.PI * 2) / labels.length

  const getCoordinatesForValue = (value: number, index: number) => {
    // value is 0 to 100
    const r = (value / 100) * radius
    const x = center + r * Math.cos(angleStep * index - Math.PI / 2)
    const y = center + r * Math.sin(angleStep * index - Math.PI / 2)
    return { x, y }
  }

  const pathA = dataA.map((v, i) => `${getCoordinatesForValue(v, i).x},${getCoordinatesForValue(v, i).y}`).join(' ')
  const pathB = dataB.map((v, i) => `${getCoordinatesForValue(v, i).x},${getCoordinatesForValue(v, i).y}`).join(' ')

  return (
    <div className="relative flex justify-center items-center w-full overflow-hidden">
      <svg width={size} height={size} className="overflow-visible">
        {/* Background Grid */}
        {[20, 40, 60, 80, 100].map(level => {
          const r = (level / 100) * radius
          const points = labels.map((_, i) => {
            const x = center + r * Math.cos(angleStep * i - Math.PI / 2)
            const y = center + r * Math.sin(angleStep * i - Math.PI / 2)
            return `${x},${y}`
          }).join(' ')
          return <polygon key={level} points={points} fill="none" stroke="#E5E7EB" strokeWidth="1" strokeDasharray={level === 100 ? "" : "4 4"} />
        })}

        {/* Axes */}
        {labels.map((_, i) => {
          const { x, y } = getCoordinatesForValue(100, i)
          return <line key={`axis-${i}`} x1={center} y1={center} x2={x} y2={y} stroke="#E5E7EB" strokeWidth="1" />
        })}

        {/* Data A Polygon (Blue) */}
        <polygon points={pathA} fill="rgba(37, 99, 235, 0.2)" stroke="#2563EB" strokeWidth="2" />
        {dataA.map((v, i) => {
          const { x, y } = getCoordinatesForValue(v, i)
          return <circle key={`pointA-${i}`} cx={x} cy={y} r="4" fill="#2563EB" />
        })}

        {/* Data B Polygon (Emerald) */}
        <polygon points={pathB} fill="rgba(16, 185, 129, 0.2)" stroke="#10B981" strokeWidth="2" />
        {dataB.map((v, i) => {
          const { x, y } = getCoordinatesForValue(v, i)
          return <circle key={`pointB-${i}`} cx={x} cy={y} r="4" fill="#10B981" />
        })}

        {/* Labels */}
        {labels.map((label, i) => {
          const { x, y } = getCoordinatesForValue(125, i) // Push labels out slightly
          const textAnchor = x > center + 10 ? "start" : x < center - 10 ? "end" : "middle"
          return (
            <text key={`label-${i}`} x={x} y={y} fill="#6B7280" fontSize="10" fontWeight="bold" textAnchor={textAnchor} dominantBaseline="middle">
              {label}
            </text>
          )
        })}
      </svg>
    </div>
  )
}

export const CandidateComparisonPage = () => {
  const [candidateA, setCandidateA] = useState('sarah')
  const [candidateB, setCandidateB] = useState('alex')

  const candidateData: Record<string, any> = {
    sarah: {
      name: 'Sarah Jenkins',
      role: 'Senior React Developer',
      score: 94,
      education: 'Stanford University (CS)',
      skills: ['React', 'TypeScript', 'Next.js', 'Tailwind', 'Jest'],
      exp: '6 Years',
      github: { commits: 1420, stars: 1240, repo: 'saas-glass-ui' },
      linkedin: { tenure: '2.5 Yrs Avg', connections: '500+' },
      history: [
        { title: 'Senior Front-End Architect', company: 'Stripe' },
        { title: 'Senior Software Engineer', company: 'Vercel' }
      ]
    },
    alex: {
      name: 'Alex Mercer',
      role: 'Staff Backend Engineer',
      score: 91,
      education: 'UT Austin (CS)',
      skills: ['Go', 'Node.js', 'PostgreSQL', 'Docker', 'AWS'],
      exp: '8 Years',
      github: { commits: 2420, stars: 80, repo: 'go-pubsub-core' },
      linkedin: { tenure: '1.8 Yrs Avg', connections: '410' },
      history: [
        { title: 'Staff Backend Engineer', company: 'Mercury' },
        { title: 'Senior Developer', company: 'Ramp' }
      ]
    },
    chloe: {
      name: 'Chloe Fontaine',
      role: 'UI/UX Design Lead',
      score: 88,
      education: 'Parsons School of Design',
      skills: ['Figma', 'Framer', 'Design Systems', 'CSS Grid', 'Prototypes'],
      exp: '7 Years',
      github: { commits: 12, stars: 5, repo: 'figma-to-tailwind' },
      linkedin: { tenure: '3.0 Yrs Avg', connections: '500+' },
      history: [
        { title: 'Lead Product Designer', company: 'Linear' },
        { title: 'Senior UI Designer', company: 'Ashby' }
      ]
    }
  }

  const activeA = candidateData[candidateA]
  const activeB = candidateData[candidateB]

  const dimensions = ['Tech Depth', 'Experience', 'Communication', 'Culture Fit', 'GitHub', 'Leadership']
  
  const getCandidateScores = (id: string) => {
    if (id === 'sarah') return [95, 92, 96, 92, 98, 90]
    if (id === 'alex') return [96, 94, 90, 94, 98, 88]
    if (id === 'chloe') return [85, 91, 98, 95, 40, 95]
    return [50, 50, 50, 50, 50, 50]
  }

  const getVerdict = () => {
    if (candidateA === 'sarah' && candidateB === 'alex') {
      return 'Sarah Jenkins is highly recommended for Front-End Architecture roles due to Next.js/Design Systems tenure at Vercel. Alex Mercer represents an outstanding choice if you are prioritizing backend scale (Go/AWS orchestration).'
    }
    return 'Both candidates represent elite professionals in their fields. Select the candidate matching your immediate engineering priorities (UI Systems vs Backend Orchestration).'
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">Compare Candidates</h2>
          <p className="text-xs text-gray-500 mt-1 font-medium">Contrast AI metrics across multi-agent dimensions to make data-driven hiring decisions.</p>
        </div>
      </div>

      {/* Selectors & AI Verdict Card */}
      <Card className="p-6 bg-white border-blue-100 shadow-sm">
        <div className="flex flex-col md:flex-row gap-8 justify-between items-start md:items-center">
          {/* Candidate Selectors */}
          <div className="flex flex-wrap items-center gap-6 text-xs font-semibold text-gray-700 w-full md:w-auto">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Candidate A (Blue)</label>
              <select
                value={candidateA}
                onChange={(e) => setCandidateA(e.target.value)}
                className="w-full px-4 py-2.5 border-2 border-blue-500 rounded-xl text-xs bg-blue-50/50 outline-none text-gray-900 font-bold shadow-sm"
              >
                <option value="sarah">Sarah Jenkins</option>
                <option value="alex">Alex Mercer</option>
                <option value="chloe">Chloe Fontaine</option>
              </select>
            </div>
            
            <div className="flex items-center justify-center pt-5">
              <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center font-extrabold text-[10px]">
                VS
              </div>
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Candidate B (Green)</label>
              <select
                value={candidateB}
                onChange={(e) => setCandidateB(e.target.value)}
                className="w-full px-4 py-2.5 border-2 border-emerald-500 rounded-xl text-xs bg-emerald-50/50 outline-none text-gray-900 font-bold shadow-sm"
              >
                <option value="alex">Alex Mercer</option>
                <option value="sarah">Sarah Jenkins</option>
                <option value="chloe">Chloe Fontaine</option>
              </select>
            </div>
          </div>
          
          <div className="flex-1">
            {/* Recommendation bubble */}
            <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-100 flex gap-4 text-xs leading-relaxed text-gray-700 shadow-inner">
              <FiCpu className="text-blue-600 w-6 h-6 shrink-0 mt-0.5" />
              <div>
                <h5 className="font-extrabold text-blue-900 mb-1.5 uppercase tracking-wider text-[10px]">AI Comparative Verdict</h5>
                <p className="font-medium">{getVerdict()}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Radar Chart */}
        <div className="xl:col-span-5">
          <Card className="p-8 shadow-sm flex flex-col items-center justify-center min-h-[400px]">
            <h4 className="font-extrabold text-sm text-gray-950 mb-6 text-center">Multi-Dimensional Analysis</h4>
            <RadarChart 
              dataA={getCandidateScores(candidateA)} 
              dataB={getCandidateScores(candidateB)} 
              labels={dimensions} 
            />
            <div className="flex items-center justify-center gap-6 mt-8 w-full border-t border-gray-100 pt-6">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-600" />
                <span className="text-xs font-bold text-gray-700">{activeA.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-xs font-bold text-gray-700">{activeB.name}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Split Screen comparative details */}
        <div className="xl:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Candidate A Dossier */}
          <Card className="p-6 space-y-6 border-t-[6px] border-t-blue-600 bg-white shadow-sm">
            <div className="flex justify-between items-start border-b border-gray-100 pb-4">
              <div>
                <h4 className="font-extrabold text-lg text-gray-950 truncate">{activeA.name}</h4>
                <p className="text-[11px] text-gray-500 mt-0.5 font-medium">{activeA.role}</p>
              </div>
              <div className="text-right shrink-0">
                <span className="text-3xl font-extrabold text-blue-600 tracking-tight">{activeA.score}%</span>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-5 text-xs">
              <div className="flex justify-between items-center bg-gray-50 p-3 rounded-xl border border-gray-100">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Total Experience</p>
                <p className="font-extrabold text-gray-900">{activeA.exp}</p>
              </div>

              <div className="space-y-2">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5"><FiActivity /> Technical Skills</p>
                <div className="flex flex-wrap gap-1.5">
                  {activeA.skills.map((s: string) => (
                    <span key={s} className="px-2.5 py-1 bg-white text-gray-700 border border-gray-200 rounded-md font-bold text-[10px] shadow-sm">{s}</span>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5"><FiGithub /> GitHub Footprint</p>
                <div className="p-3 rounded-xl border border-gray-100 bg-[#FAFBFC] flex justify-between items-center shadow-sm">
                  <div>
                    <p className="font-extrabold text-gray-900">{activeA.github.commits}</p>
                    <p className="text-[9px] font-bold text-gray-400 uppercase mt-0.5">Commits</p>
                  </div>
                  <div className="text-right">
                    <p className="font-extrabold text-amber-500 flex items-center gap-1 justify-end"><FiStar className="fill-amber-500 w-3 h-3" /> {activeA.github.stars}</p>
                    <p className="text-[9px] font-bold text-gray-400 uppercase mt-0.5">Repo Stars</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-gray-100">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5"><FiLinkedin /> LinkedIn Network</p>
                <div className="flex justify-between items-center p-3 rounded-xl border border-gray-100 bg-[#FAFBFC] shadow-sm">
                  <span className="font-extrabold text-gray-900">{activeA.linkedin.connections} Conns</span>
                  <span className="font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">{activeA.linkedin.tenure} / Role</span>
                </div>
              </div>

              <div className="space-y-3 pt-2 border-t border-gray-100">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5"><FiBriefcase /> Recent History</p>
                <div className="space-y-2.5">
                  {activeA.history.map((h: any, i: number) => (
                    <div key={i} className="flex gap-3 items-center p-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center shrink-0">
                        <FiBriefcase className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <p className="font-extrabold text-gray-900">{h.title}</p>
                        <p className="text-[10px] text-gray-500 mt-0.5 font-medium">{h.company}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </Card>

          {/* Candidate B Dossier */}
          <Card className="p-6 space-y-6 border-t-[6px] border-t-emerald-500 bg-white shadow-sm">
            <div className="flex justify-between items-start border-b border-gray-100 pb-4">
              <div>
                <h4 className="font-extrabold text-lg text-gray-950 truncate">{activeB.name}</h4>
                <p className="text-[11px] text-gray-500 mt-0.5 font-medium">{activeB.role}</p>
              </div>
              <div className="text-right shrink-0">
                <span className="text-3xl font-extrabold text-emerald-600 tracking-tight">{activeB.score}%</span>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-5 text-xs">
              <div className="flex justify-between items-center bg-gray-50 p-3 rounded-xl border border-gray-100">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Total Experience</p>
                <p className="font-extrabold text-gray-900">{activeB.exp}</p>
              </div>

              <div className="space-y-2">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5"><FiActivity /> Technical Skills</p>
                <div className="flex flex-wrap gap-1.5">
                  {activeB.skills.map((s: string) => (
                    <span key={s} className="px-2.5 py-1 bg-white text-gray-700 border border-gray-200 rounded-md font-bold text-[10px] shadow-sm">{s}</span>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5"><FiGithub /> GitHub Footprint</p>
                <div className="p-3 rounded-xl border border-gray-100 bg-[#FAFBFC] flex justify-between items-center shadow-sm">
                  <div>
                    <p className="font-extrabold text-gray-900">{activeB.github.commits}</p>
                    <p className="text-[9px] font-bold text-gray-400 uppercase mt-0.5">Commits</p>
                  </div>
                  <div className="text-right">
                    <p className="font-extrabold text-amber-500 flex items-center gap-1 justify-end"><FiStar className="fill-amber-500 w-3 h-3" /> {activeB.github.stars}</p>
                    <p className="text-[9px] font-bold text-gray-400 uppercase mt-0.5">Repo Stars</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-gray-100">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5"><FiLinkedin /> LinkedIn Network</p>
                <div className="flex justify-between items-center p-3 rounded-xl border border-gray-100 bg-[#FAFBFC] shadow-sm">
                  <span className="font-extrabold text-gray-900">{activeB.linkedin.connections} Conns</span>
                  <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">{activeB.linkedin.tenure} / Role</span>
                </div>
              </div>

              <div className="space-y-3 pt-2 border-t border-gray-100">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5"><FiBriefcase /> Recent History</p>
                <div className="space-y-2.5">
                  {activeB.history.map((h: any, i: number) => (
                    <div key={i} className="flex gap-3 items-center p-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center shrink-0">
                        <FiBriefcase className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <p className="font-extrabold text-gray-900">{h.title}</p>
                        <p className="text-[10px] text-gray-500 mt-0.5 font-medium">{h.company}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </Card>
        </div>

      </div>
    </div>
  )
}
