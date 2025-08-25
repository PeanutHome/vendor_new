import React from "react";

// Bank enum for Myanmar banks
export enum Bank {
  AYA_BANK = 'AYA Bank',
  KBZ_BANK = 'KBZ Bank',
  CB_BANK = 'CB Bank',
  UAB_BANK = 'UAB Bank',
  YOMA_BANK = 'Yoma Bank',
  AGD_BANK = 'AGD Bank',
  MAB_BANK = 'MAB Bank',
  MYANMAR_ECONOMIC_BANK = 'Myanmar Economic Bank',
  MYANMAR_INVESTMENT_COMMERCIAL_BANK = 'Myanmar Investment Commercial Bank',
  INNWA_BANK = 'Innwa Bank',
  FIRST_PRIVATE_BANK = 'First Private Bank',
  KANBAWZA_BANK = 'Kanbawza Bank',
  ASIA_GREEN_DEVELOPMENT_BANK = 'Asia Green Development Bank',
  UNITED_AMARA_BANK = 'United Amara Bank',
  MYAWADDY_BANK = 'Myawaddy Bank',
  COOPERATIVE_BANK = 'Cooperative Bank',
  MYANMAR_AGRICULTURAL_DEVELOPMENT_BANK = 'Myanmar Agricultural Development Bank',
  OTHER = 'Other',
}

// Mobile Wallet enum
export enum MobileWallet {
  KBZPAY = 'KBZPay',
  WAVEPAY = 'WavePay',
}

interface FinancialData {
  accountNumber?: string;
  bankName?: string;
  accountHolder?: string;
  bankBranch?: string;
  mobileWallet?: string;
}

export default function FinacialInformationsStep({ value, onChange, onPrev, onNext }: {
  value: FinancialData;
  onChange: (data: FinancialData) => void;
  onPrev?: () => void;
  onNext?: () => void;
}) {
  // State for upload buttons (W-9 and W-8) - temporarily unused
  // const [w9Uploaded, setW9Uploaded] = useState(false);
  // const [w8Uploaded, setW8Uploaded] = useState(false);

  return (
    <div className="space-y-6 bg-white">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="font-semibold tracking-tight text-2xl">Banking & Payment Information</h3>
        <p className="text-muted-foreground text-lg">Payment setup and tax information</p>
      </div>
      <div className="p-6 pt-0">
        <div className="space-y-6">
          {/* Bank Account Information */}
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="text-2xl font-semibold leading-none tracking-tight flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-banknote w-5 h-5"><rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>
                <span>Bank Account Information</span>
              </h3>
              <p className="text-sm text-muted-foreground">Provide your bank account details for payments and settlements. This information is kept secure and confidential.</p>
            </div>
            <div className="p-6 pt-0 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium leading-none" htmlFor="bankName">Bank Name *</label>
                  <select
                    id="bankName"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus-visible:ring-offset-2 md:text-sm"
                    required
                    value={value.bankName || ""}
                    onChange={e => onChange({ ...value, bankName: e.target.value })}
                  >
                    <option value="">Select bank</option>
                    <option value={Bank.AYA_BANK}>{Bank.AYA_BANK}</option>
                    <option value={Bank.KBZ_BANK}>{Bank.KBZ_BANK}</option>
                    <option value={Bank.CB_BANK}>{Bank.CB_BANK}</option>
                    <option value={Bank.UAB_BANK}>{Bank.UAB_BANK}</option>
                    <option value={Bank.YOMA_BANK}>{Bank.YOMA_BANK}</option>
                    <option value={Bank.AGD_BANK}>{Bank.AGD_BANK}</option>
                    <option value={Bank.MAB_BANK}>{Bank.MAB_BANK}</option>
                    <option value={Bank.MYANMAR_ECONOMIC_BANK}>{Bank.MYANMAR_ECONOMIC_BANK}</option>
                    <option value={Bank.MYANMAR_INVESTMENT_COMMERCIAL_BANK}>{Bank.MYANMAR_INVESTMENT_COMMERCIAL_BANK}</option>
                    <option value={Bank.INNWA_BANK}>{Bank.INNWA_BANK}</option>
                    <option value={Bank.FIRST_PRIVATE_BANK}>{Bank.FIRST_PRIVATE_BANK}</option>
                    <option value={Bank.KANBAWZA_BANK}>{Bank.KANBAWZA_BANK}</option>
                    <option value={Bank.ASIA_GREEN_DEVELOPMENT_BANK}>{Bank.ASIA_GREEN_DEVELOPMENT_BANK}</option>
                    <option value={Bank.UNITED_AMARA_BANK}>{Bank.UNITED_AMARA_BANK}</option>
                    <option value={Bank.MYAWADDY_BANK}>{Bank.MYAWADDY_BANK}</option>
                    <option value={Bank.COOPERATIVE_BANK}>{Bank.COOPERATIVE_BANK}</option>
                    <option value={Bank.MYANMAR_AGRICULTURAL_DEVELOPMENT_BANK}>{Bank.MYANMAR_AGRICULTURAL_DEVELOPMENT_BANK}</option>
                    <option value={Bank.OTHER}>{Bank.OTHER}</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium leading-none" htmlFor="accountHolder">Account Holder Name *</label>
                  <input id="accountHolder" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus-visible:ring-offset-2 md:text-sm" placeholder="Enter account holder name" required value={value.accountHolder || ""} onChange={e => onChange({ ...value, accountHolder: e.target.value })} />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium leading-none" htmlFor="accountNumber">Account Number *</label>
                  <input id="accountNumber" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus-visible:ring-offset-2 md:text-sm" placeholder="Enter account number" required value={value.accountNumber || ""} onChange={e => onChange({ ...value, accountNumber: e.target.value })} />
                </div>
                <div>
                  <label className="text-sm font-medium leading-none" htmlFor="bankBranch">Bank Branch *</label>
                  <input id="bankBranch" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus-visible:ring-offset-2 md:text-sm" placeholder="Enter bank branch" required value={value.bankBranch || ""} onChange={e => onChange({ ...value, bankBranch: e.target.value })} />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium leading-none" htmlFor="mobileWallet">Mobile Wallet (optional)</label>
                <select
                  id="mobileWallet"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus-visible:ring-offset-2 md:text-sm"
                  value={value.mobileWallet || ""}
                  onChange={e => onChange({ ...value, mobileWallet: e.target.value })}
                >
                  <option value="">Select mobile wallet</option>
                  <option value={MobileWallet.KBZPAY}>{MobileWallet.KBZPAY}</option>
                  <option value={MobileWallet.WAVEPAY}>{MobileWallet.WAVEPAY}</option>
                </select>
              </div>
            </div>
          </div>
          {/*
          // Billing Contact Information
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="text-2xl font-semibold leading-none tracking-tight">Billing Contact Information</h3>
              <p className="text-sm text-muted-foreground">Designated contact for billing inquiries and financial matters.</p>
            </div>
            <div className="p-6 pt-0 space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="billingContactName">Billing Contact Name *</label>
                  <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm" id="billingContactName" placeholder="Full name" required />
                </div>
                <div>
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="billingContactEmail">Billing Contact Email *</label>
                  <input type="email" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm" id="billingContactEmail" placeholder="billing@yourbusiness.com" required />
                </div>
                <div>
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="billingContactPhone">Billing Contact Phone *</label>
                  <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm" id="billingContactPhone" placeholder="+1 (555) 123-4567" required />
                </div>
              </div>
            </div>
          </div>
          // Commission Structure
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="text-2xl font-semibold leading-none tracking-tight">Commission Structure</h3>
              <p className="text-sm text-muted-foreground">Review and confirm the commission rates and fee structure.</p>
            </div>
            <div className="p-6 pt-0">
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center"><span className="font-medium">Platform Commission:</span><div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">8% per sale</div></div>
                <div className="flex justify-between items-center"><span className="font-medium">Payment Processing:</span><div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">2.9% + $0.30</div></div>
                <div className="flex justify-between items-center"><span className="font-medium">Monthly Fee:</span><div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">$0 (No monthly fees)</div></div>
                <div className="border-t pt-3 mt-3"><div className="flex justify-between items-center font-semibold"><span>Total Platform Fees:</span><span className="text-primary">~10.9% + $0.30 per transaction</span></div></div>
              </div>
            </div>
          </div>
          // Tax Reporting Documentation
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="text-2xl font-semibold leading-none tracking-tight">Tax Reporting Documentation</h3>
              <p className="text-sm text-muted-foreground">Upload required tax forms for compliance and reporting purposes.</p>
            </div>
            <div className="p-6 pt-0 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <button
                  className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground px-4 py-2 h-24 flex-col space-y-2 ${w9Uploaded ? "border-green-200 bg-green-50 text-green-700" : ""}`}
                  onClick={() => setW9Uploaded(true)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-upload w-6 h-6"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" x2="12" y1="3" y2="15"></line></svg>
                  <span className="text-sm">{w9Uploaded ? "W-9 Uploaded" : "Upload W-9 Form"}</span>
                  <span className="text-xs text-gray-500">(US Taxpayers)</span>
                  {w9Uploaded && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check-big w-4 h-4 text-green-600"><path d="M21.801 10A10 10 0 1 1 17 3.335"></path><path d="m9 11 3 3L22 4"></path></svg>
                  )}
                </button>
                <button
                  className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground px-4 py-2 h-24 flex-col space-y-2 ${w8Uploaded ? "border-green-200 bg-green-50 text-green-700" : ""}`}
                  onClick={() => setW8Uploaded(true)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-upload w-6 h-6"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" x2="12" y1="3" y2="15"></line></svg>
                  <span className="text-sm">{w8Uploaded ? "W-8 Uploaded" : "Upload W-8 Form"}</span>
                  <span className="text-xs text-gray-500">(Non-US Taxpayers)</span>
                  {w8Uploaded && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check-big w-4 h-4 text-green-600"><path d="M21.801 10A10 10 0 1 1 17 3.335"></path><path d="m9 11 3 3L22 4"></path></svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          // Payment Method Preference
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="text-2xl font-semibold leading-none tracking-tight">Payment Method Preferences</h3>
              <p className="text-sm text-muted-foreground">Choose how you&apos;d like to receive payments from sales.</p>
            </div>
            <div className="p-6 pt-0">
              <div>
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="paymentMethod">Preferred Payment Method *</label>
                <button type="button" className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1">
                  <span style={{ pointerEvents: "none" }}>Select payment method</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down h-4 w-4 opacity-50"><path d="m6 9 6 6 6-6"></path><path d="M19 12H5"></path></svg>
                </button>
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
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus-visible:ring-offset-2 bg-[#00B14F] text-white hover:bg-[#00B14F]/90 h-10 px-4 py-2"
              type="button"
              onClick={onNext}
            >
              Next Step
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right w-4 h-4 ml-2"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
