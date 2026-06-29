import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { 
  IoSettingsOutline, IoPersonOutline, IoShieldOutline, 
  IoNotificationsOutline, IoColorPaletteOutline, IoKeyOutline, IoCopyOutline 
} from 'react-icons/io5';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Tabs from '../../components/common/Tabs';

const SettingsPage = () => {
  const { currentUser, theme, toggleTheme } = useApp();
  const [activeTab, setActiveTab] = useState('profile');

  // Form State Profile
  const [name, setName] = useState(currentUser?.name || 'Anushka Recruiter');
  const [email, setEmail] = useState(currentUser?.email || 'anushka@recruiter.ai');
  const [company, setCompany] = useState('Recruiter Labs Corp');

  // Form State Security
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // API Key State
  const [leverKey, setLeverKey] = useState('pk_live_51Nv9824HJKsd982312d8a');
  const [copiedKey, setCopiedKey] = useState('');

  const tabs = [
    { id: 'profile', label: 'Recruiter Profile' },
    { id: 'theme', label: 'Theme & Preferences' },
    { id: 'security', label: 'Security' },
    { id: 'api', label: 'API Integrations' }
  ];

  const handleProfileSave = (e) => {
    e.preventDefault();
    alert('Profile settings saved successfully.');
  };

  const handleSecuritySave = (e) => {
    e.preventDefault();
    alert('Security settings updated successfully.');
    setCurrentPassword('');
    setNewPassword('');
  };

  const handleCopyKey = (keyText, label) => {
    navigator.clipboard.writeText(keyText);
    setCopiedKey(label);
    setTimeout(() => setCopiedKey(''), 2000);
  };

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-textPrimary dark:text-white tracking-tight flex items-center gap-2">
          <IoSettingsOutline className="text-primary" />
          Workspace Settings
        </h2>
        <p className="text-xs text-textSecondary dark:text-slate-400 mt-1">
          Customize recruiter preferences, theme settings, API integrations, and security tokens
        </p>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Settings Sections */}
      <div className="max-w-2xl">
        {activeTab === 'profile' && (
          <Card>
            <h3 className="text-xs font-bold text-textPrimary dark:text-white uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <IoPersonOutline className="text-primary" />
              Recruiter Profile Settings
            </h3>
            
            <form onSubmit={handleProfileSave} className="space-y-4">
              <Input
                label="Full Name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                required
              />
              
              <Input
                label="Email Address"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />

              <Input
                label="Company Name"
                id="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Company"
                required
              />

              <div className="pt-3 flex justify-end">
                <Button type="submit">Save Profile</Button>
              </div>
            </form>
          </Card>
        )}

        {activeTab === 'theme' && (
          <Card className="space-y-6">
            <div>
              <h3 className="text-xs font-bold text-textPrimary dark:text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <IoColorPaletteOutline className="text-primary" />
                Color Theme
              </h3>
              <p className="text-xs text-textSecondary dark:text-slate-450 mb-4">
                Toggle between light and dark modes according to your visual environment.
              </p>
              
              <div className="flex gap-4">
                <button
                  onClick={() => { if (theme === 'dark') toggleTheme(); }}
                  className={`flex-1 py-4 border rounded-premium font-bold text-xs flex flex-col items-center justify-center gap-2 transition-all ${
                    theme === 'light'
                      ? 'border-primary bg-blue-50/50 dark:bg-blue-950/20 text-primary shadow-sm'
                      : 'border-customBorder dark:border-slate-800 text-textSecondary hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className="text-xl">☀️</span>
                  <span>Light Mode</span>
                </button>

                <button
                  onClick={() => { if (theme === 'light') toggleTheme(); }}
                  className={`flex-1 py-4 border rounded-premium font-bold text-xs flex flex-col items-center justify-center gap-2 transition-all ${
                    theme === 'dark'
                      ? 'border-primary bg-blue-50/50 dark:bg-blue-950/25 text-primary shadow-sm'
                      : 'border-customBorder dark:border-slate-800 text-textSecondary hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className="text-xl">🌙</span>
                  <span>Dark Mode</span>
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-customBorder dark:border-slate-800">
              <h3 className="text-xs font-bold text-textPrimary dark:text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <IoNotificationsOutline className="text-primary" />
                Email Notifications
              </h3>
              <p className="text-xs text-textSecondary dark:text-slate-450 mb-4">
                Manage alerts regarding automated candidate checks.
              </p>
              
              <div className="space-y-3">
                {[
                  'Send alert when candidate resume is fully evaluated',
                  'Deliver daily digest summary of new ranked matches',
                  'Notify when candidate GitHub commits drop below 30'
                ].map((alertText, idx) => (
                  <label key={idx} className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked={idx < 2}
                      className="h-4 w-4 rounded border-customBorder text-primary focus:ring-primary focus:outline-none mt-0.5"
                    />
                    <span className="text-xs font-medium text-textSecondary dark:text-slate-350">{alertText}</span>
                  </label>
                ))}
              </div>
            </div>
          </Card>
        )}

        {activeTab === 'security' && (
          <Card>
            <h3 className="text-xs font-bold text-textPrimary dark:text-white uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <IoShieldOutline className="text-primary" />
              Credentials & Security
            </h3>

            <form onSubmit={handleSecuritySave} className="space-y-4">
              <Input
                label="Current Password"
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
                required
              />

              <Input
                label="New Password"
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                required
              />

              <div className="pt-3 flex justify-end">
                <Button type="submit">Update Password</Button>
              </div>
            </form>
          </Card>
        )}

        {activeTab === 'api' && (
          <Card className="space-y-6">
            <div>
              <h3 className="text-xs font-bold text-textPrimary dark:text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <IoKeyOutline className="text-primary" />
                Integrations & API Tokens
              </h3>
              <p className="text-xs text-textSecondary dark:text-slate-450 mb-4">
                Export evaluations directly into Lever, Ashby, or Greenhouse using key pairings.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-textSecondary dark:text-slate-450 uppercase mb-1">
                    Ashby API Secret Key
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      readOnly
                      value={leverKey}
                      className="block w-full border border-customBorder dark:border-slate-800 rounded-premium px-3 py-2 pr-10 text-xs bg-slate-50 dark:bg-slate-950 text-textSecondary font-semibold"
                    />
                    <button
                      onClick={() => handleCopyKey(leverKey, 'Ashby')}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-textPrimary transition-colors"
                      title="Copy Key"
                    >
                      {copiedKey === 'Ashby' ? <span className="text-[9px] font-bold text-green-600 mr-1">Copied</span> : null}
                      <IoCopyOutline size={16} />
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-blue-50/50 dark:bg-blue-950/15 border border-blue-200 dark:border-blue-900/50 rounded-premium flex items-start gap-3">
                  <span className="text-lg">⚙️</span>
                  <div className="text-xs leading-relaxed text-textSecondary dark:text-slate-350">
                    <p className="font-bold text-textPrimary dark:text-white">Connecting external ATS systems</p>
                    <p className="mt-1 text-[11px]">
                      By adding this secret key inside your Ashby dashboard, you can trigger automated candidate crawls whenever resumes are uploaded to a job.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
