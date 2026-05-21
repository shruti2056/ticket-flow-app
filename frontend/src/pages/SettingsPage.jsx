import { useState } from 'react';
import { User, Lock, Mail, Save, Eye, EyeOff, Check, X } from 'lucide-react';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  
  // Profile form state
  const [profileForm, setProfileForm] = useState({
    name: 'Sarah Chen',
    email: 'sarah.chen@company.com',
    phone: '+1 234-567-8901',
    role: 'Senior Support Engineer'
  });

  // Password form state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const [saveStatus, setSaveStatus] = useState({ type: '', message: '' });

  // Handle profile update
  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // Here you would call your API
    setSaveStatus({ type: 'success', message: 'Profile updated successfully!' });
    setTimeout(() => setSaveStatus({ type: '', message: '' }), 3000);
  };

  // Handle password update
  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    
    // Validation
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setSaveStatus({ type: 'error', message: 'New passwords do not match!' });
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setSaveStatus({ type: 'error', message: 'Password must be at least 6 characters!' });
      return;
    }

    // Here you would call your API
    setSaveStatus({ type: 'success', message: 'Password updated successfully!' });
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setTimeout(() => setSaveStatus({ type: '', message: '' }), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Settings</h2>
        <p className="text-gray-400 text-sm">Manage your account settings and preferences</p>
      </div>

      {/* Tabs */}
      <div className="glass rounded-2xl overflow-hidden">
        <div className="flex border-b border-white/10">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 px-6 py-4 text-sm font-semibold transition-all duration-200 ${
              activeTab === 'profile'
                ? 'bg-indigo-500/20 text-purple-400 border-b-2 border-indigo-500'
                : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
            }`}
          >
            <User size={18} className="inline mr-2" />
            Profile Information
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`flex-1 px-6 py-4 text-sm font-semibold transition-all duration-200 ${
              activeTab === 'security'
                ? 'bg-indigo-500/20 text-purple-400 border-b-2 border-indigo-500'
                : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
            }`}
          >
            <Lock size={18} className="inline mr-2" />
            Security
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Status Message */}
          {saveStatus.message && (
            <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 animate-slideDown ${
              saveStatus.type === 'success' 
                ? 'bg-emerald-500/20 border border-emerald-500/30' 
                : 'bg-red-500/20 border border-red-500/30'
            }`}>
              {saveStatus.type === 'success' ? (
                <Check size={20} className="text-emerald-400 flex-shrink-0" />
              ) : (
                <X size={20} className="text-red-400 flex-shrink-0" />
              )}
              <span className={saveStatus.type === 'success' ? 'text-emerald-300' : 'text-red-300'}>
                {saveStatus.message}
              </span>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <form onSubmit={handleProfileUpdate} className="space-y-6">
              {/* Avatar Section */}
              <div className="flex items-center gap-6 pb-6 border-b border-white/10">
                <div className="w-24 h-24 gradient-button rounded-full flex items-center justify-center font-bold text-3xl">
                  SC
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-1">{profileForm.name}</h3>
                  <p className="text-gray-400 text-sm mb-3">{profileForm.role}</p>
                  <button
                    type="button"
                    className="px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 text-sm rounded-lg transition-all duration-200 border border-white/10"
                  >
                    Change Avatar
                  </button>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-200 focus:outline-none focus:border-indigo-500 focus:bg-white/8 transition-all"
                    placeholder="Enter your name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-200 focus:outline-none focus:border-indigo-500 focus:bg-white/8 transition-all"
                    placeholder="Enter your email"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-200 focus:outline-none focus:border-indigo-500 focus:bg-white/8 transition-all"
                    placeholder="Enter your phone"
                  />
                </div>

                {/* Role (Read-only) */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Role
                  </label>
                  <input
                    type="text"
                    value={profileForm.role}
                    onChange={(e) => setProfileForm({ ...profileForm, role: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-200 focus:outline-none focus:border-indigo-500 focus:bg-white/8 transition-all"
                    placeholder="Enter your role"
                  />
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="px-6 py-3 gradient-button text-white rounded-xl font-semibold flex items-center gap-2 hover:-translate-y-0.5 transition-all duration-300 shadow-[0_4px_12px_rgba(99,102,241,0.3)]"
                >
                  <Save size={18} />
                  Save Changes
                </button>
              </div>
            </form>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <form onSubmit={handlePasswordUpdate} className="space-y-6 max-w-2xl">
              <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-xl p-4 mb-6">
                <p className="text-sm text-indigo-300">
                  <Lock size={16} className="inline mr-2" />
                  For security reasons, please enter your current password before setting a new one.
                </p>
              </div>

              {/* Current Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.current ? 'text' : 'password'}
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                    className="w-full px-4 py-3 pr-12 bg-white/5 border border-white/10 rounded-xl text-gray-200 focus:outline-none focus:border-indigo-500 focus:bg-white/8 transition-all"
                    placeholder="Enter current password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
                  >
                    {showPasswords.current ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.new ? 'text' : 'password'}
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                    className="w-full px-4 py-3 pr-12 bg-white/5 border border-white/10 rounded-xl text-gray-200 focus:outline-none focus:border-indigo-500 focus:bg-white/8 transition-all"
                    placeholder="Enter new password"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
                  >
                    {showPasswords.new ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">Must be at least 6 characters</p>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.confirm ? 'text' : 'password'}
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                    className="w-full px-4 py-3 pr-12 bg-white/5 border border-white/10 rounded-xl text-gray-200 focus:outline-none focus:border-indigo-500 focus:bg-white/8 transition-all"
                    placeholder="Confirm new password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
                  >
                    {showPasswords.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end pt-4 border-t border-white/10">
                <button
                  type="submit"
                  className="px-6 py-3 gradient-button text-white rounded-xl font-semibold flex items-center gap-2 hover:-translate-y-0.5 transition-all duration-300 shadow-[0_4px_12px_rgba(99,102,241,0.3)]"
                >
                  <Save size={18} />
                  Update Password
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
