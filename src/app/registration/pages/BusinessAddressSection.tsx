import React from "react";

export default function BusinessAddressSection() {
  return (
    <div className="rounded-lg border bg-white shadow-sm">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight">Business Address</h3>
        <p className="text-sm text-muted-foreground">Provide your business location and mailing address information.</p>
      </div>
      <div className="p-6 pt-0 space-y-4">
        <div>
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="physicalAddress">Physical Business Address *</label>
          <textarea className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" id="physicalAddress" placeholder="Enter your complete business address including street, city, state, and ZIP code" rows={3} required />
        </div>
        <div>
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="mailingAddress">Mailing Address</label>
          <textarea className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" id="mailingAddress" placeholder="If different from physical address" rows={3} />
        </div>
      </div>
      
    </div>
  );
}
