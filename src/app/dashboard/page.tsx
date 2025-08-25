"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardHome() {
  const router = useRouter();

  useEffect(() => {
    console.log('🚀 Dashboard home page - redirecting to products...');
    router.replace('/dashboard/products');
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00B14F] mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to Products...</p>
      </div>
    </div>
  );
}
