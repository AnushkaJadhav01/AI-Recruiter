import React from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft, FiShield } from 'react-icons/fi'
import { motion } from 'framer-motion'

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-10">
    <h2 className="text-lg font-bold text-[#2D2A26] mb-3 pb-2 border-b border-[#F1DDD2]">{title}</h2>
    <div className="space-y-3 text-[15px] text-[#6B7280] leading-relaxed">{children}</div>
  </div>
)

export const PrivacyPolicyPage = () => (
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
            <FiShield className="w-3.5 h-3.5 text-[#F97316]" />
            <span className="text-xs font-bold text-[#F97316] uppercase tracking-wider">Privacy Policy</span>
          </div>
          <h1 className="text-4xl font-extrabold text-[#2D2A26] tracking-tight mb-4">Your Privacy Matters</h1>
          <p className="text-base text-[#6B7280] leading-relaxed max-w-2xl">
            This Privacy Policy explains how NexHire Technologies collects, uses, and protects your personal information when you use our AI-powered recruitment platform.
          </p>
          <p className="text-xs text-[#9CA3AF] font-medium mt-4">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>

        <div className="bg-white rounded-2xl border border-[#F1DDD2] shadow-sm p-8 sm:p-12">

          <Section title="1. Information We Collect">
            <p>We collect information you provide directly to us when you create an account, submit a resume, post a job description, or communicate with us.</p>
            <p><strong className="text-[#2D2A26]">Account Information:</strong> Name, email address, password, and role (Recruiter or Candidate).</p>
            <p><strong className="text-[#2D2A26]">Profile Data:</strong> Resume content, work history, skills, GitHub and LinkedIn profile data (only when you explicitly connect these accounts).</p>
            <p><strong className="text-[#2D2A26]">Usage Data:</strong> Log data, device type, browser, IP address, pages visited, and time spent on the platform.</p>
          </Section>

          <Section title="2. How We Use Your Information">
            <p>We use the information we collect to provide, maintain, and improve our services, including:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Operating and personalizing the NexHire platform for recruiters and candidates.</li>
              <li>Running AI-powered analysis including Candidate DNA extraction and Evidence Graph generation.</li>
              <li>Matching candidates to relevant job opportunities using autonomous AI agents.</li>
              <li>Sending product updates, security alerts, and support messages.</li>
              <li>Complying with legal obligations and preventing fraud.</li>
            </ul>
          </Section>

          <Section title="3. AI Processing and Candidate Data">
            <p>NexHire uses large language model (LLM) pipelines to analyze resumes and online profiles. This processing is used solely to generate structured skill summaries and match scores within our platform.</p>
            <p>We do not sell your resume data or personal profile information to third parties. AI-generated candidate scores are for internal platform use only and are visible only to recruiters you have applied to or been matched with.</p>
          </Section>

          <Section title="4. Data Sharing">
            <p>We do not sell, trade, or rent your personal information. We may share data with trusted service providers who assist in operating our platform, subject to strict confidentiality agreements. We may disclose information if required by law or to protect the rights and safety of our users.</p>
          </Section>

          <Section title="5. Data Retention">
            <p>We retain your account data for as long as your account is active. You may request deletion of your account and associated data at any time by contacting our support team. Anonymized, aggregated data may be retained for analytical purposes.</p>
          </Section>

          <Section title="6. Security">
            <p>We implement industry-standard security measures including encryption in transit (TLS), secure password hashing, and access controls. However, no method of transmission over the internet is 100% secure, and we encourage you to use a strong, unique password.</p>
          </Section>

          <Section title="7. Cookies">
            <p>We use essential cookies to maintain your session and preferences. We do not use third-party advertising cookies. You can control cookie settings through your browser preferences.</p>
          </Section>

          <Section title="8. Your Rights">
            <p>Depending on your jurisdiction, you may have the right to access, correct, or delete your personal data. You may also object to or restrict certain types of processing. To exercise these rights, contact us at <a href="mailto:privacy@nexhire.ai" className="text-[#F97316] hover:underline font-semibold">privacy@nexhire.ai</a>.</p>
          </Section>

          <Section title="9. Children's Privacy">
            <p>NexHire is not intended for individuals under the age of 16. We do not knowingly collect personal information from children. If you believe a child has provided us with data, please contact us immediately.</p>
          </Section>

          <Section title="10. Changes to This Policy">
            <p>We may update this Privacy Policy from time to time. We will notify you of significant changes via email or a prominent notice on our platform. Continued use of the platform after changes constitutes acceptance.</p>
          </Section>

          <Section title="11. Contact Us">
            <p>If you have questions about this Privacy Policy, please contact us at:</p>
            <p><strong className="text-[#2D2A26]">NexHire Technologies</strong><br />
            Email: <a href="mailto:privacy@nexhire.ai" className="text-[#F97316] hover:underline font-semibold">privacy@nexhire.ai</a><br />
            Website: <a href="https://nexhire.ai" className="text-[#F97316] hover:underline font-semibold">nexhire.ai</a></p>
          </Section>

        </div>

        <div className="flex items-center justify-between mt-10 text-sm text-[#9CA3AF]">
          <Link to="/terms" className="text-[#F97316] font-semibold hover:underline">View Terms of Service →</Link>
          <Link to="/" className="hover:text-[#2D2A26] transition-colors">Return to Home</Link>
        </div>
      </motion.div>
    </main>
  </div>
)
