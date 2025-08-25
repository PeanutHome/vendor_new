import React from "react";

interface AgreementData {
  signature?: string;
  date?: string;
  confirmed?: boolean;
}

export default function AgreementDeclarationsStep({ value, onChange, onPrev, onNext }: {
  value: AgreementData;
  onChange: (data: AgreementData) => void;
  onPrev?: () => void;
  onNext?: () => void;
}) {
  return (
    <div className="space-y-6 bg-white">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="font-semibold tracking-tight text-2xl">Step 8: Agreement & Declarations</h3>
        <p className="text-muted-foreground text-lg">Please review and confirm the following declarations to complete your registration.</p>
      </div>
      <div className="p-6 pt-0 space-y-6">
        <div>
          <label className="text-sm font-medium leading-none">Digital Signature (Full Name) *</label>
          <input
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus-visible:ring-offset-2 md:text-sm"
            placeholder="Enter your full name"
            required
            value={value.signature || ""}
            onChange={e => onChange({ ...value, signature: e.target.value })}
          />
        </div>
        <div>
          <label className="text-sm font-medium leading-none">Date *</label>
          <input
            type="date"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus-visible:ring-offset-2 md:text-sm"
            required
            value={value.date || ""}
            onChange={e => onChange({ ...value, date: e.target.value })}
          />
        </div>
        <div className="flex items-center gap-2 mt-2">
          <input
            type="checkbox"
            checked={!!value.confirmed}
            onChange={e => onChange({ ...value, confirmed: e.target.checked })}
            className="accent-[#00B14F]"
          />
          <span>I confirm all declarations above are true and valid.</span>
        </div>
        <div className="flex justify-between mt-8 pt-6 border-t">
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus-visible:ring-offset-2 border border-input bg-background hover:bg-[#00B14F]/10 hover:text-[#00B14F] h-10 px-4 py-2 text-[#00B14F]"
            onClick={onPrev}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left w-4 h-4 mr-2"><path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path></svg>
            Previous
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus-visible:ring-offset-2 bg-[#00B14F] text-white hover:bg-[#00B14F]/90 h-10 px-4 py-2 disabled:opacity-60"
            onClick={onNext}
            disabled={!value.confirmed || !value.signature || !value.date}
          >
            Submit
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-4 h-4 ml-2"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
