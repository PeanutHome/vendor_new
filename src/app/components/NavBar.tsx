// src/app/components/NavBar.tsx
"use client";

import { useState } from 'react';
import { useAuthStore } from '../../lib/auth-store';
import LoginDialog from './LoginDialog';

export default function NavBar() {
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();
  return (
    <header
      data-lov-id="src/pages/Index.tsx:19:6"
      data-lov-name="header"
      data-component-path="src/pages/Index.tsx"
      data-component-line="19"
      data-component-file="Index.tsx"
      data-component-name="header"
      data-component-content="%7B%22className%22%3A%22bg-white%2F80%20backdrop-blur-sm%20border-b%20border-green-100%20sticky%20top-0%20z-50%22%7D"
      className="bg-white/80 backdrop-blur-sm border-b border-green-100 sticky top-0 z-50 px-12"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#00B14F] rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-store w-5 h-5 text-white"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"></path><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"></path><path d="M2 7h20"></path><path d="M22 7v3a2 2 0 0 1-2 2a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7"></path></svg>
            </div>
            <span className="text-xl font-bold text-gray-900">VendorHub</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-gray-600 hover:text-primary transition-colors">Features</a>
            <a href="#benefits" className="text-gray-600 hover:text-primary transition-colors">Benefits</a>
            <a href="#support" className="text-gray-600 hover:text-primary transition-colors">Support</a>
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">
                  Welcome, {user?.firstName}
                </span>
                <button
                  onClick={logout}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-red-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsLoginDialogOpen(true)}
                className="px-4 py-2 bg-[#00B14F] text-white text-sm font-medium rounded-lg hover:bg-[#009644] transition-colors"
              >
                Login
              </button>
            )}
          </nav>
          
          {/* Mobile menu button */}
          <button
            className="md:hidden flex items-center justify-center w-8 h-8"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <a href="#features" className="text-gray-600 hover:text-primary transition-colors">Features</a>
              <a href="#benefits" className="text-gray-600 hover:text-primary transition-colors">Benefits</a>
              <a href="#support" className="text-gray-600 hover:text-primary transition-colors">Support</a>
              
              {isAuthenticated ? (
                <div className="flex flex-col space-y-2 pt-2 border-t border-gray-200">
                  <span className="text-sm text-gray-700">
                    Welcome, {user?.firstName}
                  </span>
                  <button
                    onClick={logout}
                    className="text-left text-sm font-medium text-gray-600 hover:text-red-600 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsLoginDialogOpen(true)}
                  className="self-start px-4 py-2 bg-[#00B14F] text-white text-sm font-medium rounded-lg hover:bg-[#009644] transition-colors"
                >
                  Login
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
      
      <LoginDialog 
        isOpen={isLoginDialogOpen} 
        onClose={() => setIsLoginDialogOpen(false)} 
      />
    </header>
  );
}

export function RegistrationNavBar() {
  const { isAuthenticated, user, logout } = useAuthStore();
  
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-green-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <button
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent h-10 px-4 py-2 text-gray-600 hover:text-primary"
            onClick={() => window.location.href = '/'}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left w-4 h-4 mr-2"><path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path></svg>
            Back to Home
          </button>
          <div className="text-center">
            <h1 className="text-xl font-semibold text-gray-900">Vendor Registration</h1>
            <p className="text-sm text-gray-600">Step 1 of 11</p>
          </div>
          
          {isAuthenticated ? (
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-[#00B14F] rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs text-gray-600">{user?.email}</p>
                </div>
              </div>
              <button
                onClick={logout}
                className="text-xs text-gray-500 hover:text-red-600 transition-colors"
                title="Logout"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16,17 21,12 16,7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
              </button>
            </div>
          ) : (
            <div className="w-24"></div>
          )}
        </div>
      </div>
    </header>
  );
}
