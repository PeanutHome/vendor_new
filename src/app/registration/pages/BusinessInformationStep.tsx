import React from "react";

// Business Type Enum
export enum BusinessType {
  SOLE_PROPRIETORSHIP = 'Sole Proprietorship',
  PARTNERSHIP = 'Partnership',
  PRIVATE_CO_LTD = 'Private Co., Ltd.',
  INDIVIDUAL_SELLER = 'Individual Seller',
}

// Registration Type Enum
export enum RegistrationType {
  DICA_REGISTERED = 'DICA-Registered',
  NON_REGISTERED_MICRO_SELLER = 'Non-Registered Micro Seller',
  NGO = 'NGO',
  GOVERNMENT_SUPPLIER = 'Government Supplier',
}

interface BusinessInformation {
  businessNameEn: string;
  businessNameMm: string;
  businessType: string;
  registrationType: string;
  dicaNumber: string;
  tin: string;
  licenseNumber: string;
  establishmentDate: string;
  description: string;
  website: string;
}

interface BusinessInformationStepProps {
  value: BusinessInformation;
  onChange: (value: Partial<BusinessInformation>) => void;
  onNext?: () => void;
}

export default function BusinessInformationStep({ value, onChange, onNext }: BusinessInformationStepProps) {
  return (
    <div className="space-y-6 bg-white">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="font-semibold tracking-tight text-2xl">Step 1: Business Information</h3>
        </div>
        <div className="p-6 pt-0 space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium leading-none" htmlFor="businessNameEn">Business Name (English) *</label>
              <input
                id="businessNameEn"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus-visible:ring-offset-2 md:text-sm"
                placeholder="Enter your business name in English"
                required
                value={value.businessNameEn}
                onChange={e => onChange({ businessNameEn: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium leading-none" htmlFor="businessNameMm">Business Name (Myanmar) *</label>
              <input
                id="businessNameMm"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus-visible:ring-offset-2 md:text-sm"
                placeholder="Enter your business name in Myanmar"
                required
                value={value.businessNameMm}
                onChange={e => onChange({ businessNameMm: e.target.value })}
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium leading-none" htmlFor="businessType">Business Type *</label>
              <select
                id="businessType"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus-visible:ring-offset-2 md:text-sm"
                required
                value={value.businessType}
                onChange={e => onChange({ businessType: e.target.value })}
              >
                <option value="">Select type</option>
                <option value={BusinessType.SOLE_PROPRIETORSHIP}>Sole Proprietorship</option>
                <option value={BusinessType.PARTNERSHIP}>Partnership</option>
                <option value={BusinessType.PRIVATE_CO_LTD}>Private Co., Ltd.</option>
                <option value={BusinessType.INDIVIDUAL_SELLER}>Individual Seller</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium leading-none" htmlFor="registrationType">Registration Type *</label>
              <select
                id="registrationType"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus-visible:ring-offset-2 md:text-sm"
                required
                value={value.registrationType}
                onChange={e => onChange({ registrationType: e.target.value })}
              >
                <option value="">Select registration type</option>
                <option value={RegistrationType.DICA_REGISTERED}>DICA-Registered</option>
                <option value={RegistrationType.NON_REGISTERED_MICRO_SELLER}>Non-Registered Micro Seller</option>
                <option value={RegistrationType.NGO}>NGO</option>
                <option value={RegistrationType.GOVERNMENT_SUPPLIER}>Government Supplier</option>
              </select>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium leading-none" htmlFor="dicaNumber">DICA Registration Number</label>
              <input
                id="dicaNumber"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus-visible:ring-offset-2 md:text-sm"
                placeholder="Enter DICA registration number"
                value={value.dicaNumber}
                onChange={e => onChange({ dicaNumber: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium leading-none" htmlFor="tin">TIN (Taxpayer Identification Number)</label>
              <input
                id="tin"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus-visible:ring-offset-2 md:text-sm"
                placeholder="Enter TIN"
                value={value.tin}
                onChange={e => onChange({ tin: e.target.value })}
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium leading-none" htmlFor="licenseNumber">Business License Number (if applicable)</label>
              <input
                id="licenseNumber"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus-visible:ring-offset-2 md:text-sm"
                placeholder="Enter license number"
                value={value.licenseNumber}
                onChange={e => onChange({ licenseNumber: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium leading-none" htmlFor="establishmentDate">Date of Establishment (DD/MM/YYYY)</label>
              <input
                id="establishmentDate"
                type="date"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus-visible:ring-offset-2 md:text-sm"
                placeholder="DD/MM/YYYY"
                value={value.establishmentDate}
                onChange={e => onChange({ establishmentDate: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium leading-none" htmlFor="description">Brief Business Description</label>
            <textarea
              id="description"
              rows={3}
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus-visible:ring-offset-2"
              placeholder="Describe your business, products, and what makes you unique..."
              value={value.description}
              onChange={e => onChange({ description: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm font-medium leading-none" htmlFor="website">Website or Social Media (optional)</label>
            <input
              id="website"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus-visible:ring-offset-2 md:text-sm"
              placeholder="Enter your website or social media link"
              value={value.website}
              onChange={e => onChange({ website: e.target.value })}
            />
          </div>
          <div className="flex justify-end mt-8 pt-6 border-t">
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
