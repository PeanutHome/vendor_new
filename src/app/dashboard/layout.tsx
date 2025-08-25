"use client";

import React from "react";
import VendorSidebar from "@/components/vendor/VendorSidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  // Temporarily removed all authentication checks for testing
  console.log('🚀 Dashboard Layout - No Auth Required (Testing Mode)');
  console.log('👶 Children received:', children);
  console.log('📍 Current pathname:', typeof window !== 'undefined' ? window.location.pathname : 'server-side');

  return (
    <div className="flex min-h-screen bg-gray-50">
      <VendorSidebar />
      <main className="flex-1 md:ml-64 p-8 overflow-x-auto">
        {children ? (
          children
        ) : (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00B14F] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading dashboard content...</p>
          </div>
        )}
      </main>
    </div>
  );
}

// Tailwind styles for active/hover state can be added in globals.css or as needed.
