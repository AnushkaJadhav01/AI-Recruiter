<<<<<<< HEAD
export const AnalyticsPage = () => {
  return <section><h2>Analytics</h2><p>Analytics dashboard placeholder.</p></section>
=======
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend, 
  ArcElement 
} from 'chart.js'
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import { FiTrendingUp, FiUsers, FiClock, FiCheckSquare } from 'react-icons/fi'
import { Card } from '../../components/common/Card'

// Register ChartJS modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

export const AnalyticsPage = () => {

  const kpis = [
    { label: 'Total Sourced Candidates', value: '1,842', trend: '+15.2%', isPositive: true, icon: FiUsers, color: 'text-blue-600 bg-blue-50 border-blue-100' },
    { label: 'Funnel Conversion Rate', value: '8.4%', trend: '+0.8%', isPositive: true, icon: FiTrendingUp, color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
    { label: 'Avg Days-to-Hire', value: '18 Days', trend: '-3 Days', isPositive: true, icon: FiClock, color: 'text-purple-600 bg-purple-50 border-purple-100' },
    { label: 'Hiring Accuracy Rating', value: '94.2%', trend: '+2.1%', isPositive: true, icon: FiCheckSquare, color: 'text-indigo-600 bg-indigo-50 border-indigo-100' }
  ]

  // Chart 1: Applications Trend (Line)
  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Resumes Uploaded',
        data: [120, 180, 240, 310, 290, 482],
        borderColor: '#2563EB',
        backgroundColor: 'rgba(37, 99, 235, 0.05)',
        tension: 0.3,
        fill: true,
      }
    ]
  }

  // Chart 2: Hiring Funnel Conversion (Horizontal Bar)
  const funnelData = {
    labels: ['Applied', 'AI Screened', 'GitHub Verified', 'Interview', 'Offered'],
    datasets: [
      {
        label: 'Candidates Count',
        data: [482, 184, 96, 28, 9],
        backgroundColor: [
          '#9CA3AF',
          '#3B82F6',
          '#6366F1',
          '#F59E0B',
          '#10B981'
        ],
        borderRadius: 6
      }
    ]
  }

  // Chart 3: Experience Distribution (Vertical Bar)
  const expData = {
    labels: ['0-2 Years', '3-5 Years', '6-9 Years', '10+ Years'],
    datasets: [
      {
        label: 'Applicants Count',
        data: [45, 142, 280, 110],
        backgroundColor: '#3B82F6',
        borderRadius: 4
      }
    ]
  }

  // Chart 4: Skill Distribution (Doughnut)
  const skillData = {
    labels: ['React/Next.js', 'Node.js', 'Go Lang', 'Figma Design', 'Kubernetes'],
    datasets: [
      {
        data: [420, 280, 140, 190, 80],
        backgroundColor: [
          '#2563EB',
          '#10B981',
          '#F59E0B',
          '#EF4444',
          '#6366F1'
        ],
        borderWidth: 1,
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        grid: {
          color: 'rgba(229, 231, 235, 0.5)'
        },
        ticks: {
          font: {
            size: 10
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 10
          }
        }
      }
    }
  }

  const reports = [
    { month: 'June 2026', sourced: 482, screened: 184, hired: 9, speed: '18 days' },
    { month: 'May 2026', sourced: 290, screened: 110, hired: 6, speed: '21 days' },
    { month: 'April 2026', sourced: 310, screened: 120, hired: 5, speed: '23 days' }
  ]

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Hiring Insights & Analytics</h2>
        <p className="text-xs text-gray-500">Analyze recruiting conversion rates, candidate experience, and skill breakdown demographics.</p>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon
          return (
            <Card key={idx} className="p-5 flex items-center justify-between" hoverEffect>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{kpi.label}</span>
                <h3 className="text-xl font-extrabold text-gray-950">{kpi.value}</h3>
                <p className="text-[9px] text-emerald-500 font-bold mt-1">
                  {kpi.trend} <span className="text-gray-400 font-normal">vs last quarter</span>
                </p>
              </div>
              <div className={`p-2.5 rounded-lg border shrink-0 ${kpi.color}`}>
                <Icon className="w-5 h-5 shrink-0" />
              </div>
            </Card>
          )
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Chart 1: Applications Over Time */}
        <Card className="lg:col-span-8 p-6 space-y-4">
          <h4 className="font-bold text-sm text-gray-950">Applicant Volume MoM</h4>
          <div className="h-64">
            <Line data={lineData} options={chartOptions} />
          </div>
        </Card>

        {/* Chart 4: Skill Distribution */}
        <Card className="lg:col-span-4 p-6 space-y-4">
          <h4 className="font-bold text-sm text-gray-950">Skills Distribution</h4>
          <div className="h-64 flex items-center justify-center">
            <Doughnut data={skillData} options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'bottom',
                  labels: {
                    boxWidth: 8,
                    font: {
                      size: 9
                    }
                  }
                }
              }
            }} />
          </div>
        </Card>

        {/* Chart 2: Hiring Funnel */}
        <Card className="lg:col-span-6 p-6 space-y-4">
          <h4 className="font-bold text-sm text-gray-950">Hiring Funnel Stage Conversion</h4>
          <div className="h-64">
            <Bar data={funnelData} options={{
              ...chartOptions,
              indexAxis: 'y' as const
            }} />
          </div>
        </Card>

        {/* Chart 3: Experience Distribution */}
        <Card className="lg:col-span-6 p-6 space-y-4">
          <h4 className="font-bold text-sm text-gray-950">Candidate Experience Distribution</h4>
          <div className="h-64">
            <Bar data={expData} options={chartOptions} />
          </div>
        </Card>

      </div>

      {/* Monthly Report Table */}
      <Card className="p-6">
        <h4 className="font-bold text-sm text-gray-950 mb-4">Monthly Performance Summary</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-gray-500">
            <thead className="bg-[#FAFBFC] text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
              <tr>
                <th className="py-3 px-4">Recruiting Month</th>
                <th className="py-3 px-4">Sourced</th>
                <th className="py-3 px-4">AI Triage Screened</th>
                <th className="py-3 px-4">Hired Offer Accept</th>
                <th className="py-3 px-4">Avg Hiring Duration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {reports.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50 transition-colors text-gray-700 font-semibold">
                  <td className="py-3 px-4 text-gray-950 font-bold">{row.month}</td>
                  <td className="py-3 px-4">{row.sourced} candidates</td>
                  <td className="py-3 px-4">{row.screened} candidates</td>
                  <td className="py-3 px-4 text-emerald-600">{row.hired} hires</td>
                  <td className="py-3 px-4">{row.speed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

    </div>
  )
>>>>>>> 81c760a878bbb7abb2e659b66198862b397b2d39
}
