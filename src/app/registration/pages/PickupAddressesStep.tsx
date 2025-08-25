import React from "react";

interface PickupAddress {
  locationName: string;
  contactName: string;
  contactNumber: string;
  email: string;
  fullAddress: string;
  city: string;
  region: string;
  postalCode: string;
  daysTiming: string;
}

const emptyPickup: PickupAddress = {
  locationName: "",
  contactName: "",
  contactNumber: "",
  email: "",
  fullAddress: "",
  city: "",
  region: "",
  postalCode: "",
  daysTiming: "",
};

export default function PickupAddressesStep({ value, onChange, onPrev, onNext }: {
  value: { list?: PickupAddress[] };
  onChange: (data: { list?: PickupAddress[] }) => void;
  onPrev?: () => void;
  onNext?: () => void;
}) {
  const pickups = value.list || [];

  const handleChange = (idx: number, field: keyof PickupAddress, newValue: string) => {
    const updatedPickups = pickups.map((pickup, i) => i === idx ? { ...pickup, [field]: newValue } : pickup);
    onChange({ list: updatedPickups });
  };

  const addPickup = () => {
    const newPickup = { ...emptyPickup };
    onChange({ list: [ ...pickups, newPickup ] });
  };

  const removePickup = (idx: number) => {
    if (pickups.length <= 1) return;
    const updatedPickups = pickups.filter((_, i) => i !== idx);
    onChange({ list: updatedPickups });
  };

  return (
    <div className="space-y-6 bg-white">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="font-semibold tracking-tight text-2xl">Step 7: Pickup Address</h3>
        <p className="text-muted-foreground text-lg">Multiple pickup addresses can be added.</p>
      </div>
      <div className="p-6 pt-0 space-y-8">
        {pickups.map((pickup, idx) => (
          <div key={idx} className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 space-y-6 relative">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-lg">Pickup Address #{idx + 1}</h4>
              {pickups.length > 1 && (
                <button type="button" className="text-red-600 text-xs hover:underline" onClick={() => removePickup(idx)}>
                  Remove
                </button>
              )}
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium leading-none" htmlFor={`locationName${idx}`}>Pickup Location Name *</label>
                <input id={`locationName${idx}`} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus-visible:ring-offset-2 md:text-sm" value={pickup.locationName} onChange={e => handleChange(idx, 'locationName', e.target.value)} placeholder="e.g. Main Warehouse" required />
              </div>
              <div>
                <label className="text-sm font-medium leading-none" htmlFor={`contactName${idx}`}>Contact Person Name *</label>
                <input id={`contactName${idx}`} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus-visible:ring-offset-2 md:text-sm" value={pickup.contactName} onChange={e => handleChange(idx, 'contactName', e.target.value)} placeholder="e.g. John Doe" required />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium leading-none" htmlFor={`contactNumber${idx}`}>Contact Number *</label>
                <input id={`contactNumber${idx}`} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus-visible:ring-offset-2 md:text-sm" value={pickup.contactNumber} onChange={e => handleChange(idx, 'contactNumber', e.target.value)} placeholder="e.g. 09-xxxxxxx" required />
              </div>
              <div>
                <label className="text-sm font-medium leading-none" htmlFor={`email${idx}`}>Email (optional)</label>
                <input id={`email${idx}`} type="email" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus-visible:ring-offset-2 md:text-sm" value={pickup.email} onChange={e => handleChange(idx, 'email', e.target.value)} placeholder="e.g. pickup@yourcompany.com" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium leading-none" htmlFor={`fullAddress${idx}`}>Full Address *</label>
              <textarea id={`fullAddress${idx}`} rows={2} className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus-visible:ring-offset-2" value={pickup.fullAddress} onChange={e => handleChange(idx, 'fullAddress', e.target.value)} placeholder="Enter full address" required />
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium leading-none" htmlFor={`city${idx}`}>Township / City *</label>
                <input id={`city${idx}`} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus-visible:ring-offset-2 md:text-sm" value={pickup.city} onChange={e => handleChange(idx, 'city', e.target.value)} placeholder="e.g. Yangon" required />
              </div>
              <div>
                <label className="text-sm font-medium leading-none" htmlFor={`region${idx}`}>Region / State *</label>
                <select
                  id={`region${idx}`}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus-visible:ring-offset-2 md:text-sm"
                  required
                  value={pickup.region}
                  onChange={e => handleChange(idx, 'region', e.target.value)}
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
                <label className="text-sm font-medium leading-none" htmlFor={`postalCode${idx}`}>Postal Code (optional)</label>
                <input id={`postalCode${idx}`} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus-visible:ring-offset-2 md:text-sm" value={pickup.postalCode} onChange={e => handleChange(idx, 'postalCode', e.target.value)} placeholder="e.g. 11181" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium leading-none" htmlFor={`daysTiming${idx}`}>Pickup Days & Timing *</label>
              <div className="flex flex-col md:flex-row gap-2">
                <select
                  id={`daysTiming-day-${idx}`}
                  className="flex h-10 w-full md:w-auto rounded-md border border-input bg-background px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus-visible:ring-offset-2 md:text-sm"
                  value={pickup.daysTiming.split(' ')[0] || ''}
                  onChange={e => {
                    const time = pickup.daysTiming.split(' ').slice(1).join(' ');
                    handleChange(idx, 'daysTiming', `${e.target.value} ${time}`.trim());
                  }}
                  required
                >
                  <option value="">Select Days</option>
                  <option value="Mon-Fri">Mon-Fri</option>
                  <option value="Mon-Sat">Mon-Sat</option>
                  <option value="Weekends">Weekends</option>
                  <option value="Everyday">Everyday</option>
                  <option value="Custom">Custom</option>
                </select>
                <input
                  id={`daysTiming-time-${idx}`}
                  type="text"
                  className="flex h-10 w-full md:w-48 rounded-md border border-input bg-background px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus-visible:ring-offset-2 md:text-sm"
                  value={pickup.daysTiming.split(' ').slice(1).join(' ')}
                  onChange={e => {
                    const day = pickup.daysTiming.split(' ')[0] || '';
                    handleChange(idx, 'daysTiming', `${day} ${e.target.value}`.trim());
                  }}
                  placeholder="e.g. 9am-5pm"
                  required
                />
              </div>
            </div>
          </div>
        ))}
        <button type="button" className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-md border border-[#00B14F] text-[#00B14F] font-medium hover:bg-[#00B14F]/10 transition-colors" onClick={addPickup}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="16"/><line x1="8" x2="16" y1="12" y2="12"/></svg>
          + Add Another Pickup Address
        </button>
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
  );
}
