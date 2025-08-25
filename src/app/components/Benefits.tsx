// src/app/components/Benefits.tsx

export default function Benefits() {
  return (
    <section
      data-lov-id="src/pages/Index.tsx:163:6"
      data-lov-name="section"
      data-component-path="src/pages/Index.tsx"
      data-component-line="163"
      data-component-file="Index.tsx"
      data-component-name="section"
      data-component-content="%7B%22className%22%3A%22py-20%20px-4%20bg-gradient-to-r%20from-green-50%20to-emerald-50%22%7D"
      id="benefits"
      className="py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-r from-green-50 to-emerald-50"
    >
      <div className="container mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose VendorHub?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of successful vendors who have chosen our platform to grow their business.
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            {[
              'Zero setup fees and transparent pricing',
              'Access to millions of active customers',
              'Marketing tools and promotional support',
              'Mobile-optimized vendor dashboard',
              'Automated tax and compliance management',
              'Integration with popular shipping carriers',
            ].map((benefit, i) => (
              <div key={i} className="flex items-center space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check-big w-6 h-6 text-[#00B14F] flex-shrink-0"><path d="M21.801 10A10 10 0 1 1 17 3.335"></path><path d="m9 11 3 3L22 4"></path></svg>
                <span className="text-lg text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-green-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Ready to Get Started?</h3>
            <p className="text-gray-600 mb-6">
              Join our marketplace today and start reaching customers worldwide. Our simple onboarding process will have you selling in minutes.
            </p>
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-[#00B14F] text-white hover:bg-[#009944] rounded-md px-8 w-full text-lg py-3 h-auto">
              Begin Vendor Registration
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right ml-2 w-5 h-5"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
