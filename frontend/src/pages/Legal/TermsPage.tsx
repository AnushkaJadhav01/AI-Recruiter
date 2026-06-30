import React from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft, FiFileText } from 'react-icons/fi'
import { motion } from 'framer-motion'

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-10">
    <h2 className="text-lg font-bold text-[#2D2A26] mb-3 pb-2 border-b border-[#F1DDD2]">{title}</h2>
    <div className="space-y-3 text-[15px] text-[#6B7280] leading-relaxed">{children}</div>
  </div>
)

export const TermsPage = () => (
  <div className="min-h-screen bg-[#FFF8F4]" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

    {/* Header */}
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-[#F1DDD2]">
      <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link to="/" className="inline-flex items-center gap-2.5">
          <img src="/logo.png" alt="NexHire" className="w-7 h-7 rounded-lg object-contain border border-gray-100 bg-white shadow-sm" />
          <span className="font-bold text-[#2D2A26] tracking-tight">NexHire</span>
        </Link>
        <Link to="/" className="flex items-center gap-1.5 text-xs font-semibold text-[#6B7280] hover:text-[#2D2A26] transition-colors">
          <FiArrowLeft className="w-3.5 h-3.5" /> Back to home
        </Link>
      </div>
    </header>

    <main className="max-w-4xl mx-auto px-6 py-14">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>

        {/* Hero */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#FFF2EA] border border-[#FDBA74] rounded-full mb-5">
            <FiFileText className="w-3.5 h-3.5 text-[#F97316]" />
            <span className="text-xs font-bold text-[#F97316] uppercase tracking-wider">Terms of Service</span>
          </div>
          <h1 className="text-4xl font-extrabold text-[#2D2A26] tracking-tight mb-4">Terms of Service</h1>
          <p className="text-base text-[#6B7280] leading-relaxed max-w-2xl">
            Please read these Terms and Conditions carefully before using the NexHire platform. By accessing or using our services, you agree to be bound by these terms.
          </p>
          <p className="text-xs text-[#9CA3AF] font-medium mt-4">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>

        <div className="bg-white rounded-2xl border border-[#F1DDD2] shadow-sm p-8 sm:p-12">

          <Section title="1. Acceptance of Terms">
            <p>By creating an account or using NexHire, you confirm that you are at least 16 years of age and have the legal capacity to enter into these Terms. If you are using NexHire on behalf of an organization, you represent that you have authority to bind that organization to these Terms.</p>
          </Section>

          <Section title="2. Description of Service">
            <p>NexHire is an AI-native recruitment platform that enables recruiters to discover, evaluate, and rank candidates using autonomous AI agents, skill evidence graphs, and structured Candidate DNA profiles.</p>
            <p>Candidates may use NexHire to upload resumes, connect professional profiles, and receive personalized job recommendations and skill analysis.</p>
          </Section>

          <Section title="3. Account Registration">
            <p>You must provide accurate, current, and complete information when registering. You are responsible for maintaining the security of your account credentials and for all activities that occur under your account.</p>
            <p>You agree to notify us immediately at <a href="mailto:support@nexhire.ai" className="text-[#F97316] font-semibold hover:underline">support@nexhire.ai</a> if you suspect any unauthorized access to your account.</p>
          </Section>

          <Section title="4. Acceptable Use">
            <p>You agree not to:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Upload false, misleading, or plagiarized resume content or job descriptions.</li>
              <li>Attempt to reverse-engineer, scrape, or extract data from the NexHire platform.</li>
              <li>Use the platform to harass, discriminate against, or harm other users.</li>
              <li>Circumvent any access controls, rate limits, or authentication mechanisms.</li>
              <li>Use NexHire for any unlawful purpose or in violation of applicable employment laws.</li>
            </ul>
          </Section>

          <Section title="5. AI-Generated Content">
            <p>NexHire uses artificial intelligence to generate candidate scores, skill summaries, evidence graphs, and match recommendations. These outputs are provided as decision-support tools and should not be the sole basis for hiring decisions.</p>
            <p>NexHire does not guarantee the accuracy, completeness, or fitness for any particular purpose of AI-generated content. Recruiters remain solely responsible for their hiring decisions.</p>
          </Section>

          <Section title="6. Intellectual Property">
            <p>All platform features, design, code, trademarks, and AI models are the exclusive property of NexHire Technologies. You are granted a limited, non-exclusive, non-transferable license to use the platform for its intended purposes.</p>
            <p>You retain ownership of content you upload (e.g., resumes, job descriptions). By uploading content, you grant NexHire a limited license to process that content to provide our services.</p>
          </Section>

          <Section title="7. Subscription and Billing">
            <p>Certain features of NexHire require a paid subscription. All fees are stated in USD and are non-refundable except as required by law or as described in our refund policy. We reserve the right to modify pricing with 30 days' advance notice.</p>
          </Section>

          <Section title="8. Termination">
            <p>You may terminate your account at any time from the Settings page. We may suspend or terminate your account if you violate these Terms, with or without notice. Upon termination, your access to the platform will cease and your data will be handled in accordance with our Privacy Policy.</p>
          </Section>

          <Section title="9. Limitation of Liability">
            <p>To the maximum extent permitted by law, NexHire Technologies shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the platform, including but not limited to lost profits, data loss, or unsuccessful hires.</p>
            <p>Our total liability to you for any claims arising from your use of the platform shall not exceed the amount you paid to us in the three months preceding the claim.</p>
          </Section>

          <Section title="10. Disclaimer of Warranties">
            <p>The NexHire platform is provided "as is" and "as available" without warranties of any kind, either express or implied, including but not limited to merchantability, fitness for a particular purpose, or non-infringement.</p>
          </Section>

          <Section title="11. Governing Law">
            <p>These Terms are governed by and construed in accordance with the laws of India, without regard to conflict of law principles. Any disputes shall be subject to the exclusive jurisdiction of the courts located in Mumbai, Maharashtra.</p>
          </Section>

          <Section title="12. Changes to Terms">
            <p>We reserve the right to modify these Terms at any time. We will provide at least 14 days' notice of material changes via email or an in-app notification. Continued use of the platform after the effective date constitutes acceptance of the updated Terms.</p>
          </Section>

          <Section title="13. Contact">
            <p>For questions about these Terms, please contact us:</p>
            <p><strong className="text-[#2D2A26]">NexHire Technologies</strong><br />
            Email: <a href="mailto:legal@nexhire.ai" className="text-[#F97316] hover:underline font-semibold">legal@nexhire.ai</a><br />
            Website: <a href="https://nexhire.ai" className="text-[#F97316] hover:underline font-semibold">nexhire.ai</a></p>
          </Section>

        </div>

        <div className="flex items-center justify-between mt-10 text-sm text-[#9CA3AF]">
          <Link to="/privacy" className="text-[#F97316] font-semibold hover:underline">View Privacy Policy →</Link>
          <Link to="/" className="hover:text-[#2D2A26] transition-colors">Return to Home</Link>
        </div>
      </motion.div>
    </main>
  </div>
)
