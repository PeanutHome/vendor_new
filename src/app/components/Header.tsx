// src/app/components/Header.tsx
'use client';

import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();

  const handleViewDemo = () => {
    console.log('🚀 View Demo clicked, navigating to dashboard...');
    console.log('📍 Current location:', window.location.href);
    console.log('🔧 Router object:', router);
    
    try {
      console.log('📤 Attempting router.push to /dashboard...');
      router.push('/dashboard');
      console.log('✅ Router.push completed');
    } catch (error) {
      console.error('❌ Navigation error:', error);
      console.log('🔄 Falling back to window.location.href...');
      // Fallback to window.location if router fails
      window.location.href = '/dashboard';
    }
  };

  const handleStartRegistration = () => {
    console.log('🚀 Start Registration clicked, navigating to registration...');
    try {
      router.push('/registration');
    } catch (error) {
      console.error('❌ Navigation error:', error);
      // Fallback to window.location if router fails
      window.location.href = '/registration';
    }
  };

  return (
    <section
      data-lov-id="src/pages/Index.tsx:38:6"
      data-lov-name="section"
      data-component-path="src/pages/Index.tsx"
      data-component-line="38"
      data-component-file="Index.tsx"
      data-component-name="section"
      data-component-content="%7B%22className%22%3A%22relative%20py-20%20px-4%22%7D"
      className="relative py-20 px-4 bg-gradient-to-b from-green-50 to-emerald-100"
    >
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto animate-slide-in-up">
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:bg-[#E6F9EF] mb-4 bg-[#E6F9EF] text-[#00B14F] border-[#BFF2D1] mb-4">
            Trusted by 10,000+ Vendors Worldwide
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-2 leading-tight">
            Join the Leading
            <span className="text-[#00B14F]"> E-Commerce </span>
            Marketplace
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Start selling your products to millions of customers worldwide. Our comprehensive vendor platform provides everything you need to grow your business online.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-[#00B14F] text-white hover:bg-[#009944] rounded-md text-lg px-8 py-3 h-auto"
              onClick={handleStartRegistration}
            >
              Start Vendor Registration
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right ml-2 w-5 h-5"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </button>
            <button
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border bg-background rounded-md text-lg px-8 py-3 h-auto border-[#00B14F] text-[#00B14F] hover:bg-[#00B14F] hover:text-white"
              onClick={handleViewDemo}
              onMouseEnter={() => console.log('🖱️ Mouse entered View Demo button')}
              onMouseLeave={() => console.log('🖱️ Mouse left View Demo button')}
              style={{ position: 'relative', zIndex: 10 }}
            >
              View Demo
            </button>
          </div>
        </div>
      </div>
      <div className="absolute top-20 left-10 hidden lg:block animate-fade-in" style={{ animationDelay: '0.5s' }}>
        <div className="rounded-lg border bg-card text-card-foreground w-48 shadow-lg border-[#BFF2D1]">
          <div className="p-4">
            <div className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trending-up w-8 h-8 text-[#00B14F]"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
              <div>
                <div className="font-semibold text-sm text-gray-900">Revenue Growth</div>
                <div className="text-xs text-gray-600">+150% Average</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-32 right-10 hidden lg:block animate-fade-in" style={{ animationDelay: '0.7s' }}>
        <div className="rounded-lg border bg-card text-card-foreground w-48 shadow-lg border-[#BFF2D1]">
          <div className="p-4">
            <div className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users w-8 h-8 text-[#00B14F]"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              <div>
                <div className="font-semibold text-sm text-gray-900">Global Reach</div>
                <div className="text-xs text-gray-600">50+ Countries</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
