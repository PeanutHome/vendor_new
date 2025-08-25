import React, { useState } from "react";
import { useVendorRegistration } from "../../../lib/vendor-registration";

interface ReviewSubmitStepProps {
  onPrev?: () => void;
  formState?: Record<string, boolean>;
  formData?: Record<string, any>;
}

export default function ReviewSubmitStep({ onPrev, formState, formData }: ReviewSubmitStepProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ success?: boolean; message?: string; error?: string } | null>(null);
  const { submitVendorRegistration } = useVendorRegistration();
  // Example: formState = { business: true, owner: false, ... } for completed steps
  // Fallback: if not provided, mark all as incomplete
  const steps = [
    { key: "business", label: "Business Information" },
    { key: "owner", label: "Authorized Representative" },
    { key: "address", label: "Business Address" },
    { key: "categories", label: "Product Categories" },
    { key: "documents", label: "Document Uploads" },
    { key: "financial", label: "Financial Information" },
    { key: "pickup", label: "Pickup Address(es)" },
    { key: "agreement", label: "Agreement & Declarations" },
    // Vendor Profile removed from flow
  ];
  const completedCount = steps.filter(s => formState?.[s.key]).length;
  const remainingCount = steps.length - completedCount;
  const percent = Math.round((completedCount / steps.length) * 100);

  const handleSubmit = async () => {
    if (!formData || remainingCount > 0) {
      setSubmitResult({ success: false, error: 'Please complete all required steps before submitting.' });
      return;
    }

    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      // Debug: Log the raw form data to see what's actually there
      console.log('=== RAW FORM DATA DEBUG ===');
      console.log('formData.business:', formData.business);
      console.log('formData.owner:', formData.owner);
      console.log('formData.address:', formData.address);
      console.log('formData.financial:', formData.financial);
      console.log('formData.agreement:', formData.agreement);
      
      // Transform form data to match API structure - FLAT STRUCTURE
      const vendorData: any = {
        // Business Info
        businessNameEnglish: formData.business?.businessNameEn || '',
        businessNameMyanmar: formData.business?.businessNameMm || '',
        businessType: formData.business?.businessType || '',
        registrationType: formData.business?.registrationType || '',
        dicaRegistrationNumber: formData.business?.dicaNumber || '',
        tinNumber: formData.business?.tin || '',
        businessLicenseNumber: formData.business?.licenseNumber || '',
        dateOfEstablishment: formData.business?.establishmentDate || '',
        businessDescription: formData.business?.description || '',
        websiteOrSocialMedia: formData.business?.website || '',
        
        // Owner Info
        fullName: formData.owner?.ownerName || '',
        designation: formData.owner?.designation || '',
        nrcOrPassportNumber: formData.owner?.nrc || '',
        email: formData.owner?.email || '',
        mobileNumber: formData.owner?.mobile || '',
        alternateContact: formData.owner?.alternateContact || '',
        
        // Business Address
        addressLine1: formData.address?.fullAddress || '',
        addressLine2: formData.address?.locationName || '',
        region: formData.address?.region || '',
        cityTownship: formData.address?.city || '',
        postalCode: formData.address?.postalCode || '',
        
        // Product Categories
        productCategories: formData.categories?.selected || [],
        
        // Banking Payment
        bankName: formData.financial?.bankName || '',
        accountHolderName: formData.financial?.accountHolder || '',
        accountNumber: formData.financial?.accountNumber || '',
        bankBranch: formData.financial?.bankBranch || '',
        mobileWallet: formData.financial?.mobileWallet || '',
        
        // Pickup Addresses
        pickupAddresses: (formData.pickup?.list || []).map((pickup: any) => ({
          pickupLocationName: pickup.locationName || '',
          contactPerson: pickup.contactName || '',
          contactNumber: pickup.contactNumber || '',
          email: pickup.email || '',
          fullAddress: pickup.fullAddress || '',
          townshipCity: pickup.city || '',
          region: pickup.region || '',
          postalCode: pickup.postalCode || '',
          pickupDaysAndTime: pickup.daysTiming || '',
        })),
        
        // Agreements
        termsAndConditionsAccepted: formData.agreement?.confirmed || false,
        privacyPolicyAccepted: formData.agreement?.confirmed || false,
        dataProcessingConsent: formData.agreement?.confirmed || false,
        businessInformationAccuracy: formData.agreement?.confirmed || false,
        documentAuthenticity: formData.agreement?.confirmed || false,
        digitalSignature: formData.agreement?.signature || '',
        signatureDate: formData.agreement?.date || new Date().toISOString().split('T')[0],
        
        // Document Uploads (as separate fields)
        dicaCertificate: formData.documents?.dicaCertificate || null,
        tinCertificate: formData.documents?.tinCertificate || null,
        nrcOrPassport: formData.documents?.nrcOrPassport || null,
        businessLicense: formData.documents?.businessLicense || null,
        bankDocument: formData.documents?.bankDocument || null,
        authorizationLetter: formData.documents?.authorizationLetter || null,
      };

      // Log the properly structured vendorData for debugging
      console.log('📤 ACTUAL DATA BEING SENT TO API:', JSON.stringify(vendorData, null, 2));
      
      // Log document uploads separately since they're sent as FormData files
      console.log('📎 DOCUMENT UPLOADS:');
      if (vendorData.dicaCertificate) {
        console.log('  - DICA Certificate:', vendorData.dicaCertificate.name, `(${vendorData.dicaCertificate.size} bytes)`);
      }
      if (vendorData.tinCertificate) {
        console.log('  - TIN Certificate:', vendorData.tinCertificate.name, `(${vendorData.tinCertificate.size} bytes)`);
      }
      if (vendorData.nrcOrPassport) {
        console.log('  - NRC/Passport:', vendorData.nrcOrPassport.name, `(${vendorData.nrcOrPassport.size} bytes)`);
      }
      if (vendorData.businessLicense) {
        console.log('  - Business License:', vendorData.businessLicense.name, `(${vendorData.businessLicense.size} bytes)`);
      }
      if (vendorData.bankDocument) {
        console.log('  - Bank Document:', vendorData.bankDocument.name, `(${vendorData.bankDocument.size} bytes)`);
      }
      if (vendorData.authorizationLetter) {
        console.log('  - Authorization Letter:', vendorData.authorizationLetter.name, `(${vendorData.authorizationLetter.size} bytes)`);
      }
      
      const result = await submitVendorRegistration(vendorData);
      setSubmitResult(result);

      if (result.success) {
        // Optionally redirect or show success state
        setTimeout(() => {
          // You might want to redirect to a success page or dashboard
          // window.location.href = '/dashboard';
        }, 3000);
      }
    } catch {
      setSubmitResult({ 
        success: false, 
        error: 'An unexpected error occurred. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 bg-white">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="font-semibold tracking-tight text-2xl">Review &amp; Submit</h3>
        <p className="text-muted-foreground text-lg">Final review and application submission</p>
      </div>
      <div className="p-6 pt-0">
        <div className="space-y-6">
          {/* Application Review */}
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="text-2xl font-semibold leading-none tracking-tight">Application Review</h3>
              <p className="text-sm text-muted-foreground">Review all the information you&apos;ve provided before submitting your vendor application.</p>
            </div>
            <div className="p-6 pt-0">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">{completedCount}</div>
                  <div className="text-sm text-blue-800">Completed Steps</div>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-gray-600">{remainingCount}</div>
                  <div className="text-sm text-gray-800">Remaining Steps</div>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{percent}%</div>
                  <div className="text-sm text-green-800">Application Complete</div>
                </div>
              </div>
            </div>
          </div>
          {/* Step-by-Step Review */}
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="text-2xl font-semibold leading-none tracking-tight">Step-by-Step Review</h3>
              <p className="text-sm text-muted-foreground">Check each section to ensure all required information is complete and accurate.</p>
            </div>
            <div className="p-6 pt-0">
              <div className="space-y-4">
                {steps.map((step, idx) => (
                  <div key={step.key}>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 text-gray-600"><span className="text-sm font-medium">{idx + 1}</span></div>
                        <div>
                          <h4 className="font-medium">{step.label}</h4>
                          <p className="text-sm text-gray-600">{formState?.[step.key] ? "Completed" : "Not completed"}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent ${formState?.[step.key] ? "bg-green-100 text-green-700" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}>{formState?.[step.key] ? "Complete" : "Incomplete"}</div>
                        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-square-pen w-4 h-4"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"></path></svg>
                        </button>
                      </div>
                    </div>
                    <div className="shrink-0 bg-border h-[1px] w-full my-2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Pre-Submission Checklist */}
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="text-2xl font-semibold leading-none tracking-tight">Pre-Submission Checklist</h3>
              <p className="text-sm text-muted-foreground">Final checks before submitting your vendor application.</p>
            </div>
            <div className="p-6 pt-0">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check-big w-4 h-4 text-green-600"><path d="M21.801 10A10 10 0 1 1 17 3.335"></path><path d="m9 11 3 3L22 4"></path></svg>
                  <span className="text-sm">All required information has been provided</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check-big w-4 h-4 text-green-600"><path d="M21.801 10A10 10 0 1 1 17 3.335"></path><path d="m9 11 3 3L22 4"></path></svg>
                  <span className="text-sm">Business documents have been uploaded</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check-big w-4 h-4 text-green-600"><path d="M21.801 10A10 10 0 1 1 17 3.335"></path><path d="m9 11 3 3L22 4"></path></svg>
                  <span className="text-sm">Banking information is accurate</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check-big w-4 h-4 text-green-600"><path d="M21.801 10A10 10 0 1 1 17 3.335"></path><path d="m9 11 3 3L22 4"></path></svg>
                  <span className="text-sm">Product catalog is complete</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check-big w-4 h-4 text-green-600"><path d="M21.801 10A10 10 0 1 1 17 3.335"></path><path d="m9 11 3 3L22 4"></path></svg>
                  <span className="text-sm">Shipping methods are configured</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check-big w-4 h-4 text-green-600"><path d="M21.801 10A10 10 0 1 1 17 3.335"></path><path d="m9 11 3 3L22 4"></path></svg>
                  <span className="text-sm">All legal agreements have been accepted</span>
                </div>
              </div>
            </div>
          </div>
          {/* Submission Result */}
          {submitResult && (
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="p-6">
                <div className={`rounded-lg p-4 ${
                  submitResult.success 
                    ? 'bg-green-50 border border-green-200' 
                    : 'bg-red-50 border border-red-200'
                }`}>
                  <div className={`flex items-center space-x-2 ${
                    submitResult.success ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {submitResult.success ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                        <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                        <path d="m9 11 3 3L22 4"></path>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path>
                        <path d="M12 9v4"></path>
                        <path d="M12 17h.01"></path>
                      </svg>
                    )}
                    <span className="font-medium">
                      {submitResult.success ? 'Application Submitted Successfully!' : 'Submission Failed'}
                    </span>
                  </div>
                  <p className={`text-sm mt-2 ${
                    submitResult.success ? 'text-green-700' : 'text-red-700'
                  }`}>
                    {submitResult.success ? submitResult.message : submitResult.error}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Help Section */}
          {remainingCount > 0 && (
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="p-6 pt-6">
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 text-amber-800">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-triangle-alert w-5 h-5"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path></svg>
                    <span className="font-medium">Application Incomplete</span>
                  </div>
                  <p className="text-amber-700 text-sm mt-2">Please complete all required steps before submitting your application. You have {remainingCount} step(s) remaining.</p>
                </div>
              </div>
            </div>
          )}


          {/* Need Help Section */}
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="text-2xl font-semibold leading-none tracking-tight">Need Help?</h3>
            </div>
            <div className="p-6 pt-0">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Contact Support</h4>
                  <p className="text-sm text-gray-600 mb-2">Our vendor support team is here to help with any questions about your application.</p>
                  <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">Contact Support</button>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Documentation</h4>
                  <p className="text-sm text-gray-600 mb-2">View our comprehensive vendor guide and FAQ for additional information.</p>
                  <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">View Documentation</button>
                </div>
              </div>
            </div>
          </div>
          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <button
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus-visible:ring-offset-2 border border-input bg-background hover:bg-[#00B14F]/10 hover:text-[#00B14F] h-10 px-4 py-2 text-[#00B14F]"
              type="button"
              onClick={onPrev}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left w-4 h-4 mr-2"><path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path></svg>
              Previous
            </button>
            <button
              className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus-visible:ring-offset-2 h-10 px-4 py-2 ${
                isSubmitting || remainingCount > 0 || submitResult?.success
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                  : 'bg-[#00B14F] text-white hover:bg-[#009644]'
              }`}
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting || remainingCount > 0 || submitResult?.success}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : submitResult?.success ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2">
                    <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                    <path d="m9 11 3 3L22 4"></path>
                  </svg>
                  Submitted Successfully
                </>
              ) : (
                <>
                  Submit Application
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check-big w-4 h-4 ml-2"><path d="M21.801 10A10 10 0 1 1 17 3.335"></path><path d="m9 11 3 3L22 4"></path></svg>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
