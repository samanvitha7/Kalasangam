// src/components/UserSettings.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import api from "../utils/axios";

export default function UserSettings({ user, onLogout }) {
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [deleteForm, setDeleteForm] = useState({
    password: '',
    confirmText: ''
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      toast.error('New password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      await api.put('/api/users/change-password', {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword
      });
      
      toast.success('Password changed successfully!');
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    
    if (deleteForm.confirmText !== 'DELETE MY ACCOUNT') {
      toast.error('Please type "DELETE MY ACCOUNT" to confirm');
      return;
    }

    setLoading(true);
    try {
      await api.delete('/api/users/delete-account', {
        data: { password: deleteForm.password }
      });
      
      toast.success('Account deleted successfully');
      onLogout();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Password Change Section */}
      <motion.div 
        className="bg-gradient-to-br from-[#1d7c6f] to-[#f58c8c] rounded-3xl shadow-2xl p-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-[#F8E6DA] rounded-2xl p-8">
          <h2 className="text-3xl font-bold font-dm-serif mb-6 bg-gradient-to-r from-[#134856] to-[#e05264] bg-clip-text text-transparent">
            Change Password
          </h2>
          
          <form onSubmit={handlePasswordChange} className="space-y-6">
            <div>
              <label className="block text-sm font-medium font-lora text-[#134856] mb-2">
                Current Password
              </label>
              <input
                type="password"
                required
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#E05264] focus:border-transparent font-lora"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium font-lora text-[#134856] mb-2">
                New Password
              </label>
              <input
                type="password"
                required
                minLength="6"
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#E05264] focus:border-transparent font-lora"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium font-lora text-[#134856] mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                required
                minLength="6"
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#E05264] focus:border-transparent font-lora"
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-[#1d7c6f] to-[#f58c8c] text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 font-dm-serif disabled:opacity-50"
              whileHover={{ scale: loading ? 1 : 1.05, y: loading ? 0 : -2 }}
              whileTap={{ scale: loading ? 1 : 0.95 }}
            >
              {loading ? 'Changing Password...' : 'Change Password'}
            </motion.button>
          </form>
        </div>
      </motion.div>

      {/* Danger Zone */}
      <motion.div 
        className="bg-gradient-to-br from-red-500 to-red-600 rounded-3xl shadow-2xl p-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="bg-[#F8E6DA] rounded-2xl p-8 border-l-4 border-red-500">
          <h2 className="text-3xl font-bold font-dm-serif text-red-600 mb-2">⚠️ Danger Zone</h2>
          <p className="text-[#E05264] font-lora mb-6">
            Once you delete your account, there is no going back. Please be certain.
          </p>

          {!showDeleteConfirm ? (
            <motion.button
              onClick={() => setShowDeleteConfirm(true)}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 font-dm-serif"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Delete My Account
            </motion.button>
          ) : (
            <div className="bg-red-50 rounded-2xl p-6 border border-red-200">
              <h3 className="text-xl font-bold font-dm-serif text-red-800 mb-4">
                🚨 Oh no! You're in dangerous territory!
              </h3>
              <p className="text-red-700 font-lora mb-4">
                This action cannot be undone. This will permanently delete your account, 
                all your artworks, likes, and followers. Are you absolutely sure?
              </p>
              
              <form onSubmit={handleDeleteAccount} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium font-lora text-red-700 mb-2">
                    Enter your password to confirm:
                  </label>
                  <input
                    type="password"
                    required
                    value={deleteForm.password}
                    onChange={(e) => setDeleteForm({...deleteForm, password: e.target.value})}
                    className="w-full px-4 py-3 border border-red-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent font-lora"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium font-lora text-red-700 mb-2">
                    Type "DELETE MY ACCOUNT" to confirm:
                  </label>
                  <input
                    type="text"
                    required
                    value={deleteForm.confirmText}
                    onChange={(e) => setDeleteForm({...deleteForm, confirmText: e.target.value})}
                    placeholder="DELETE MY ACCOUNT"
                    className="w-full px-4 py-3 border border-red-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent font-lora"
                  />
                </div>

                <div className="flex space-x-4">
                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 font-dm-serif disabled:opacity-50"
                    whileHover={{ scale: loading ? 1 : 1.05, y: loading ? 0 : -2 }}
                    whileTap={{ scale: loading ? 1 : 0.95 }}
                  >
                    {loading ? 'Deleting Account...' : 'Yes, Delete My Account'}
                  </motion.button>
                  
                  <motion.button
                    type="button"
                    onClick={() => {
                      setShowDeleteConfirm(false);
                      setDeleteForm({ password: '', confirmText: '' });
                    }}
                    className="bg-white text-[#134856] border border-gray-300 px-6 py-3 rounded-full font-semibold hover:bg-gray-50 transition-all duration-300 font-dm-serif"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Cancel
                  </motion.button>
                </div>
              </form>
            </div>
          )}
        </div>
      </motion.div>

      {/* Account Information */}
      <motion.div 
        className="bg-gradient-to-br from-[#1d7c6f] to-[#f58c8c] rounded-3xl shadow-2xl p-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="bg-[#F8E6DA] rounded-2xl p-8">
          <h2 className="text-3xl font-bold font-dm-serif mb-6 bg-gradient-to-r from-[#134856] to-[#e05264] bg-clip-text text-transparent">
            Account Information
          </h2>
          <div className="space-y-4 font-lora">
            <div className="text-[#134856]">
              <strong>Name:</strong> <span className="text-[#E05264]">{user?.name}</span>
            </div>
            <div className="text-[#134856]">
              <strong>Email:</strong> <span className="text-[#E05264]">{user?.email}</span>
            </div>
            <div className="text-[#134856]">
              <strong>Account Status:</strong> 
              <span className="ml-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                Active
              </span>
            </div>
            <div className="text-[#134856]">
              <strong>Member Since:</strong> <span className="text-[#E05264]">{new Date(user?.createdAt || Date.now()).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
