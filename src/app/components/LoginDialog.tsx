"use client";

import { useState } from 'react';
import { useAuthStore } from '../../lib/auth-store';
import { API_CONFIG } from '../../lib/config';

interface LoginDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginDialog({ isOpen, onClose }: LoginDialogProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { login, isLoading, error, clearError } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    
    console.log('🚀 LoginDialog: Starting login process...');
    console.log('📧 Email:', email);
    console.log('🔑 Password:', password);
    
    const loginSuccess = await login(email, password);
    
    console.log('📊 LoginDialog: Login result:', loginSuccess);
    
    if (loginSuccess) {
      console.log('✅ LoginDialog: Login successful, fetching vendor details...');
      
      try {
        // Get user ID from auth store
        const { userId, accessToken } = useAuthStore.getState();
        
        if (!userId || !accessToken) {
          console.error('❌ No user ID or access token available after login');
          alert('Login successful but failed to get user details. Please try again.');
          return;
        }
        
        // Call vendor API to get vendor details
        const vendorResponse = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.VENDOR_BY_USER.replace('{userId}', userId)}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (!vendorResponse.ok) {
          console.error('❌ Failed to fetch vendor details:', vendorResponse.status);
          alert('Login successful but failed to get vendor details. Please try again.');
          return;
        }
        
        const vendorData = await vendorResponse.json();
        console.log('🏪 Vendor details fetched:', vendorData);
        
        // Save vendor ID to auth store
        useAuthStore.setState(prevState => ({
          ...prevState,
          vendorId: vendorData.id,
          vendorDetails: vendorData
        }));
        
        console.log('💾 Vendor ID saved to auth store:', vendorData.id);
        
        // Close dialog and redirect to products page
        onClose();
        setEmail('');
        setPassword('');
        setShowPassword(false);
        setRememberMe(false);
        
        // Redirect to dashboard products page
        setTimeout(() => {
          window.location.href = '/dashboard/products';
        }, 500);
        
      } catch (error) {
        console.error('💥 Error fetching vendor details:', error);
        alert('Login successful but failed to get vendor details. Please try again.');
      }
    } else {
      console.log('❌ LoginDialog: Login failed, keeping dialog open...');
    }
    // If login fails, dialog stays open and error is displayed
  };

  const handleClose = () => {
    clearError();
    setEmail('');
    setPassword('');
    setShowPassword(false);
    setRememberMe(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-[60]" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, width: '100vw', height: '100vh' }}>
      <div className="bg-white border border-gray-100 rounded-xl shadow-2xl p-8 w-full max-w-md mx-4 transform transition-all duration-300 scale-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Login</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 text-xl font-bold"
            disabled={isLoading}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#00B14F] focus:border-[#00B14F]"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#00B14F] focus:border-[#00B14F]"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                disabled={isLoading}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 hover:text-gray-700">
                    <path d="M2 12s3-7 10-7 10 7 10 7"></path>
                    <path d="M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"></path>
                    <path d="m15 9-6 6"></path>
                    <path d="m9 9 6 6"></path>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 hover:text-gray-700">
                    <path d="M2 12s3-7 10-7 10 7 10 7"></path>
                    <path d="M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"></path>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 text-[#00B14F] focus:ring-[#00B14F] border-gray-300 rounded"
              disabled={isLoading}
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
              Remember me
            </label>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <div className="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path>
                  <path d="M12 9v4"></path>
                  <path d="M12 17h.01"></path>
                </svg>
                <span className="text-red-800 text-sm font-medium">Login Failed</span>
              </div>
              <p className="text-red-700 text-sm mt-1">{error}</p>
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-[#00B14F] text-white rounded-md hover:bg-[#009644] disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 