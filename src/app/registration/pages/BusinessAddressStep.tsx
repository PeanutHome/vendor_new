import React from "react";

interface BusinessAddressData {
  locationName?: string;
  fullAddress?: string;
  city?: string;
  region?: string;
  postalCode?: string;
}

export default function BusinessAddressStep({ value, onChange, onPrev, onNext }: {
  value: BusinessAddressData;
  onChange: (data: BusinessAddressData) => void;
  onPrev?: () => void;
  onNext?: () => void;
}) {
  return (
    <div className="space-y-6 bg-white">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="font-semibold tracking-tight text-2xl">Step 3: Business Address</h3>
        </div>
        <div className="p-6 pt-0 space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium leading-none" htmlFor="locationName">Location Name *</label>
              <input id="locationName" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus-visible:ring-offset-2 md:text-sm" placeholder="e.g. Main Office" required value={value.locationName || ""} onChange={e => onChange({ ...value, locationName: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium leading-none" htmlFor="fullAddress">Full Address *</label>
              <input id="fullAddress" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus-visible:ring-offset-2 md:text-sm" placeholder="Enter full address" required value={value.fullAddress || ""} onChange={e => onChange({ ...value, fullAddress: e.target.value })} />
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium leading-none" htmlFor="city">Township / City *</label>
              <input id="city" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus-visible:ring-offset-2 md:text-sm" placeholder="e.g. Yangon" required value={value.city || ""} onChange={e => onChange({ ...value, city: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium leading-none" htmlFor="region">Region / State *</label>
              <select
                id="region"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus-visible:ring-offset-2 md:text-sm"
                required
                value={value.region || ""}
                onChange={e => onChange({ ...value, region: e.target.value })}
              >
                <option value="">Select region</option>
                <option value="Ayeyarwady">Ayeyarwady</option>
                <option value="Bago">Bago</option>
                <option value="Chin">Chin</option>
                <option value="Kachin">Kachin</option>
                <option value="Kayah">Kayah</option>
                <option value="Kayin">Kayin</option>
                <option value="Magway">Magway</option>
                <option value="Mandalay">Mandalay</option>
                <option value="Mon">Mon</option>
                <option value="Naypyidaw">Naypyidaw</option>
                <option value="Rakhine">Rakhine</option>
                <option value="Sagaing">Sagaing</option>
                <option value="Shan">Shan</option>
                <option value="Tanintharyi">Tanintharyi</option>
                <option value="Yangon">Yangon</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium leading-none" htmlFor="postalCode">Postal Code (optional)</label>
              <input id="postalCode" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus-visible:ring-offset-2 md:text-sm" placeholder="e.g. 11181" value={value.postalCode || ""} onChange={e => onChange({ ...value, postalCode: e.target.value })} />
            </div>
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
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus-visible:ring-offset-2 bg-[#00B14F] text-white hover:bg-[#00B14F]/90 h-10 px-4 py-2"
              onClick={onNext}
            >
              Next Step
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right w-4 h-4 ml-2"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
