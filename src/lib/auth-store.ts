import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { API_CONFIG } from './config';

export interface User {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  phone: string;
  avatar: string | null;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  userId: string | null; // ✅ ADDED: User ID from login response
  vendorId: string | null; // ✅ ADDED: Vendor ID from vendor API response
  vendorDetails: any | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
  validateToken: () => boolean;
  checkAuthStatus: () => void;
  updateAccessToken: (newToken: string) => void;
  updateUser: (userData: User) => void;
  fetchVendorDetails: () => Promise<void>;
  refreshToken: () => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      userId: null,
      vendorId: null,
      vendorDetails: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        
        try {
          console.log('🔐 LOGIN REQUEST STARTED');
          console.log('📧 Email:', email);
          console.log('🌐 API Endpoint:', `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LOGIN}`);
          
          const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LOGIN}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });

          console.log('📥 RESPONSE RECEIVED');
          console.log('🔢 Response Status Code:', response.status);
          console.log('📝 Response Status Text:', response.statusText);

          const responseText = await response.text();
          let responseData: any = {};
          
          try {
            responseData = JSON.parse(responseText);
            console.log('✅ Response Data (JSON):', responseData);
          } catch {
            console.log('⚠️ Response Text (not JSON):', responseText);
            responseData = { message: responseText };
          }

          if (!response.ok) {
            // Extract the actual error message from API response
            const errorMessage = (responseData as any).message || 
                               (responseData as any).error || 
                               responseText || 
                               `Login failed with status: ${response.status}`;
            console.log('❌ LOGIN FAILED:', errorMessage);
            
            // Set error and return false to indicate failure
            set({
              error: errorMessage,
              isLoading: false,
            });
            return false; // Return false to indicate login failed
          }

          console.log('✅ LOGIN SUCCESSFUL');
          console.log('🎯 Success Response:', responseData);
          console.log('👤 User Data:', responseData.user);
          console.log('🔑 Access Token:', responseData.accessToken);
          
          set({
            user: responseData.user,
            accessToken: responseData.accessToken,
            userId: responseData.user?.id || null, // ✅ Save user ID separately
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
          
          console.log('✅ Auth State Updated Successfully');
          
          // Fetch vendor details after successful login
          const authState = get();
          if (authState.userId && authState.accessToken) {
            console.log('🔄 Fetching vendor details after login...');
            await get().fetchVendorDetails();
          }
          
          return true; // Return true to indicate login success
        } catch (error) {
          console.error('❌ LOGIN ERROR:', error);
          const errorMessage = error instanceof Error ? error.message : 'Login failed';
          set({
            error: errorMessage,
            isLoading: false,
          });
          return false; // Return false to indicate login failed
        }
      },

      logout: () => {
        // Clear access token from localStorage
        localStorage.removeItem('accessToken');
        console.log('🗑️ Access token cleared from localStorage');
        
        set({
          user: null,
          accessToken: null,
          userId: null,
          vendorId: null,
          vendorDetails: null,
          isAuthenticated: false,
          error: null,
        });
      },

      clearError: () => {
        set({ error: null });
      },

      validateToken: () => {
        const state = get();
        if (!state.accessToken) return false;
        
        try {
          // Decode JWT token to check expiration
          const token = state.accessToken;
          const payload = JSON.parse(atob(token.split('.')[1]));
          const currentTime = Math.floor(Date.now() / 1000);
          
          if (payload.exp && payload.exp > currentTime) {
            console.log('✅ Token is valid, expires at:', new Date(payload.exp * 1000));
            return true;
          } else {
            console.log('❌ Token has expired');
            return false;
          }
        } catch (error) {
          console.error('❌ Error validating token:', error);
          return false;
        }
      },

      checkAuthStatus: () => {
        const state = get();
        console.log('🔍 Checking auth status:', { 
          hasToken: !!state.accessToken, 
          hasUser: !!state.user, 
          isAuthenticated: state.isAuthenticated 
        });
        
        if (state.accessToken && state.user) {
          const isValid = get().validateToken();
          if (isValid) {
            set({ isAuthenticated: true });
            console.log('✅ User is authenticated with valid token');
          } else {
            // Token expired, log out user
            set({
              user: null,
              accessToken: null,
              isAuthenticated: false,
              error: null,
            });
            console.log('❌ Token expired, user logged out');
          }
        } else if (!state.accessToken && !state.user && state.isAuthenticated) {
          // Clear authentication state if no token/user but still marked as authenticated
          set({ isAuthenticated: false });
          console.log('🔄 Clearing invalid authentication state');
        } else if (state.accessToken && state.user && !state.isAuthenticated) {
          // Restore authentication state if we have valid data but not marked as authenticated
          set({ isAuthenticated: true });
          console.log('🔄 Restoring authentication state');
        }
      },

      updateAccessToken: (newToken: string) => {
        console.log('🔄 Updating access token');
        set({ accessToken: newToken });
      },

      updateUser: (userData: User) => {
        console.log('🔄 Updating user data');
        set({ user: userData });
      },

      fetchVendorDetails: async () => {
        const state = get();
        if (!state.accessToken || !state.userId) {
          console.log('❌ Cannot fetch vendor details: missing token or user ID');
          return;
        }

        try {
          console.log('🚀 Fetching vendor details for user:', state.userId);
          const apiUrl = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.VENDOR_BY_USER.replace('{userId}', state.userId)}`;
          
          const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${state.accessToken}`,
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const vendorData = await response.json();
          console.log('✅ Vendor details fetched successfully:', vendorData);
          
          set({
            vendorId: vendorData.id || vendorData.vendorId,
            vendorDetails: vendorData,
          });
          
          console.log('✅ Vendor ID saved:', vendorData.id || vendorData.vendorId);
        } catch (error) {
          console.error('❌ Error fetching vendor details:', error);
          // Don't throw error, just log it - vendor might not exist yet
        }
      },

      refreshToken: async () => {
        const state = get();
        if (!state.accessToken) {
          console.log('❌ Cannot refresh token: no access token available');
          return false;
        }

        try {
          console.log('🔄 Attempting to refresh access token...');
          console.log('🔑 Current token (first 20 chars):', state.accessToken.substring(0, 20) + '...');
          
          // Send the expired token in Authorization header as Bearer token
          const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.REFRESH}`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${state.accessToken}`, // Send as Bearer token
              'Content-Type': 'application/json',
            },
          });

          console.log('📥 Refresh response status:', response.status);
          console.log('📥 Refresh response ok:', response.ok);

          if (!response.ok) {
            const errorText = await response.text();
            console.log('❌ Token refresh failed with status:', response.status);
            console.log('❌ Error response:', errorText);
            
            // If refresh fails, log out the user
            get().logout();
            return false;
          }

          const refreshData = await response.json();
          console.log('✅ Token refreshed successfully');
          console.log('🆕 New token (first 20 chars):', refreshData.accessToken?.substring(0, 20) + '...');
          
          // Update the access token
          set({ accessToken: refreshData.accessToken });
          console.log('✅ New access token saved to store');
          
          return true;
        } catch (error) {
          console.error('❌ Error refreshing token:', error);
          // If refresh fails, log out the user
          get().logout();
          return false;
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        accessToken: state.accessToken, 
        userId: state.userId,
        vendorId: state.vendorId,
        vendorDetails: state.vendorDetails,
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);

 