import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * API wrapper that automatically handles token refresh on 401 errors
 * @param url - The API endpoint URL
 * @param options - Fetch options
 * @param retryCount - Internal retry counter (don't set this manually)
 * @returns Promise with the response
 */
export const apiCallWithRefresh = async (
  url: string,
  options: RequestInit = {},
  retryCount: number = 0
): Promise<Response> => {
  const { useAuthStore } = await import('./auth-store');
  const authStore = useAuthStore.getState();
  
  try {
    // Make the API call
    const response = await fetch(url, options);
    
    // If we get a 401 and haven't retried yet, try to refresh the token
    if (response.status === 401 && retryCount === 0) {
      console.log('🔄 Got 401, attempting to refresh token...');
      
      const refreshSuccess = await authStore.refreshToken();
      
      if (refreshSuccess) {
        console.log('✅ Token refreshed, retrying original request...');
        
        // Get the new token and create new options with updated headers
        const newToken = useAuthStore.getState().accessToken;
        if (newToken) {
          // Create a new options object with the updated Authorization header
          const newOptions = {
            ...options,
            headers: {
              ...options.headers,
              'Authorization': `Bearer ${newToken}`
            }
          };
          
          console.log('🔄 Retrying with new token (first 20 chars):', newToken.substring(0, 20) + '...');
          
          // Retry the request with the new token
          return apiCallWithRefresh(url, newOptions, retryCount + 1);
        }
      } else {
        console.log('❌ Token refresh failed, user will be logged out');
        // The refresh function already handles logout, so just return the original response
        return response;
      }
    }
    
    return response;
  } catch (error) {
    console.error('❌ API call error:', error);
    throw error;
  }
};
