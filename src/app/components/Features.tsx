// src/app/components/Features.tsx

export default function Features() {
  return (
    <section
      data-lov-id="src/pages/Index.tsx:104:6"
      data-lov-name="section"
      data-component-path="src/pages/Index.tsx"
      data-component-line="104"
      data-component-file="Index.tsx"
      data-component-name="section"
      data-component-content="%7B%22className%22%3A%22py-20%20px-4%20bg-white%22%7D"
      id="features"
      className="pt-20 pb-20 pl-4 pr-4 bg-white"
    >
      <div className="container mx-auto px-12 py-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything You Need to Succeed</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our comprehensive platform provides all the tools and support you need to build a thriving online business.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm border-green-100 hover:border-[#00B14F] transition-colors duration-200 hover:shadow-lg">
            <div className="flex flex-col space-y-1.5 p-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-store w-12 h-12 text-[#00B14F] mb-4"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"></path><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"></path><path d="M2 7h20"></path><path d="M22 7v3a2 2 0 0 1-2 2a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7"></path></svg>
              <h3 className="font-semibold tracking-tight text-xl">Easy Product Management</h3>
            </div>
            <div className="p-6 pt-0">
              <p className="text-sm text-gray-600 leading-relaxed">
                Upload and manage your entire product catalog with our intuitive interface. Support for variants, pricing, and inventory.
              </p>
            </div>
          </div>
          {/* Card 2 */}
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm border-green-100 hover:border-[#00B14F] transition-colors duration-200 hover:shadow-lg">
            <div className="flex flex-col space-y-1.5 p-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield w-12 h-12 text-[#00B14F] mb-4"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path></svg>
              <h3 className="font-semibold tracking-tight text-xl">Secure & Compliant</h3>
            </div>
            <div className="p-6 pt-0">
              <p className="text-sm text-gray-600 leading-relaxed">
                Enterprise-grade security with full compliance support for tax collection, business licenses, and regulatory requirements.
              </p>
            </div>
          </div>
          {/* Card 3 */}
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm border-green-100 hover:border-[#00B14F] transition-colors duration-200 hover:shadow-lg">
            <div className="flex flex-col space-y-1.5 p-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trending-up w-12 h-12 text-[#00B14F] mb-4"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
              <h3 className="font-semibold tracking-tight text-xl">Analytics & Insights</h3>
            </div>
            <div className="p-6 pt-0">
              <p className="text-sm text-gray-600 leading-relaxed">
                Comprehensive sales analytics, performance metrics, and customer insights to help you make data-driven decisions.
              </p>
            </div>
          </div>
          {/* Card 4 */}
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm border-green-100 hover:border-[#00B14F] transition-colors duration-200 hover:shadow-lg">
            <div className="flex flex-col space-y-1.5 p-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users w-12 h-12 text-[#00B14F] mb-4"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              <h3 className="font-semibold tracking-tight text-xl">Customer Support</h3>
            </div>
            <div className="p-6 pt-0">
              <p className="text-sm text-gray-600 leading-relaxed">
                24/7 dedicated vendor support team to help you succeed. From onboarding to ongoing operations.
              </p>
            </div>
          </div>
          {/* Card 5 */}
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm border-green-100 hover:border-[#00B14F] transition-colors duration-200 hover:shadow-lg">
            <div className="flex flex-col space-y-1.5 p-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock w-12 h-12 text-[#00B14F] mb-4"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              <h3 className="font-semibold tracking-tight text-xl">Fast Onboarding</h3>
            </div>
            <div className="p-6 pt-0">
              <p className="text-sm text-gray-600 leading-relaxed">
                Get your store live in minutes with our streamlined registration process and guided setup wizard.
              </p>
            </div>
          </div>
          {/* Card 6 */}
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm border-green-100 hover:border-[#00B14F] transition-colors duration-200 hover:shadow-lg">
            <div className="flex flex-col space-y-1.5 p-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check-big w-12 h-12 text-[#00B14F] mb-4"><path d="M21.801 10A10 10 0 1 1 17 3.335"></path><path d="m9 11 3 3L22 4"></path></svg>
              <h3 className="font-semibold tracking-tight text-xl">Payment Solutions</h3>
            </div>
            <div className="p-6 pt-0">
              <p className="text-sm text-gray-600 leading-relaxed">
                Flexible payment options with fast payouts. Support for multiple currencies and payment methods worldwide.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
