import React from "react";

interface OwnerData {
  ownerName?: string;
  designation?: string;
  nrc?: string;
  email?: string;
  mobile?: string;
  alternateContact?: string;
}

export default function OwnerRepresentativeStep({ value, onChange, onNext, onPrev }: {
  value: OwnerData;
  onChange: (data: OwnerData) => void;
  onNext?: () => void;
  onPrev?: () => void;
}) {
  return (
    <div className="space-y-6 bg-white">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="font-semibold tracking-tight text-2xl">Step 2: Owner / Authorized Representative</h3>
        </div>
        <div className="p-6 pt-0 space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium leading-none" htmlFor="ownerName">Full Name *</label>
              <input id="ownerName" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus-visible:ring-offset-2 md:text-sm" placeholder="Enter full name" required value={value.ownerName || ""} onChange={e => onChange({ ...value, ownerName: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium leading-none" htmlFor="designation">Designation / Role *</label>
              <input id="designation" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus-visible:ring-offset-2 md:text-sm" placeholder="e.g. Owner, Director, Manager" required value={value.designation || ""} onChange={e => onChange({ ...value, designation: e.target.value })} />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium leading-none" htmlFor="nrc">NRC Number (or Passport No. for foreigners) *</label>
              <input id="nrc" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus-visible:ring-offset-2 md:text-sm" placeholder="Enter NRC or Passport Number" required value={value.nrc || ""} onChange={e => onChange({ ...value, nrc: e.target.value })} />
            </div>
            <div></div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium leading-none" htmlFor="email">Email Address *</label>
              <input id="email" type="email" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus-visible:ring-offset-2 md:text-sm" placeholder="Enter email address" required value={value.email || ""} onChange={e => onChange({ ...value, email: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium leading-none" htmlFor="mobile">Mobile Number *</label>
              <input id="mobile" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus-visible:ring-offset-2 md:text-sm" placeholder="Enter mobile number" required value={value.mobile || ""} onChange={e => onChange({ ...value, mobile: e.target.value })} />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium leading-none" htmlFor="alternateContact">Alternate Contact (optional)</label>
            <input id="alternateContact" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus-visible:ring-offset-2 md:text-sm" placeholder="Enter alternate contact info" value={value.alternateContact || ""} onChange={e => onChange({ ...value, alternateContact: e.target.value })} />
          </div>
          <div className="flex justify-between mt-8 pt-6 border-t">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus-visible:ring-offset-2 border border-input bg-background hover:bg-[#00B14F]/10 hover:text-[#00B14F] h-10 px-4 py-2 text-[#00B14F]"
              onClick={onPrev}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left w-4 h-4 mr-2"><path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path></svg>
              Previous
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus-visible:ring-offset-2 bg-[#00B14F] text-white hover:bg-[#00B14F]/90 h-10 px-4 py-2"
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
