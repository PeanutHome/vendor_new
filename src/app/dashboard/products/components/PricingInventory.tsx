import React from "react";

interface PricingInventoryProps {
  mrp: string;
  setMrp: (value: string) => void;
  price: string;
  setPrice: (value: string) => void;
  sellingPrice: string;
  setSellingPrice: (value: string) => void;
  taxClass: string;
  setTaxClass: (value: string) => void;
  discount: string;
  setDiscount: (value: string) => void;
}

export function PricingInventory({
  mrp,
  setMrp,
  price,
  setPrice,
  sellingPrice,
  setSellingPrice,
  taxClass,
  setTaxClass,
  discount,
  setDiscount,
}: PricingInventoryProps) {
  const calculatedDiscount = mrp && sellingPrice ? (((parseFloat(mrp) - parseFloat(sellingPrice)) / parseFloat(mrp)) * 100).toFixed(1) : "0";

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm px-0 overflow-hidden">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight">6. Pricing & Inventory</h3>
      </div>
      <div className="p-6 pt-0 space-y-4">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              MRP (Maximum Retail Price) *
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus:border-[#00B14F] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              placeholder="Enter MRP in MMK"
              type="number"
              value={mrp}
              onChange={e => setMrp(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Price *
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus:border-[#00B14F] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              placeholder="Enter price in MMK"
              type="number"
              value={price}
              onChange={e => setPrice(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Selling Price * 
              {mrp && sellingPrice && parseFloat(sellingPrice) < parseFloat(mrp) && (
                <span className="text-green-600 ml-2">({calculatedDiscount}% off)</span>
              )}
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus:border-[#00B14F] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              placeholder="Enter selling price in MMK"
              type="number"
              value={sellingPrice}
              onChange={e => setSellingPrice(e.target.value)}
            />
            {sellingPrice && mrp && parseFloat(sellingPrice) > parseFloat(mrp) && (
              <p className="text-sm text-red-600 mt-1">Selling price cannot be higher than MRP</p>
            )}
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Discount Percentage
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus:border-[#00B14F] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              placeholder="Enter discount percentage"
              type="number"
              min="0"
              max="100"
              value={discount}
              onChange={e => setDiscount(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Tax Class
            </label>
            <select
              className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-[#00B14F] focus:border-[#00B14F] focus:ring-offset-2"
              value={taxClass}
              onChange={e => setTaxClass(e.target.value)}
            >
              <option value="">Select tax class</option>
              <option value="exempt">0% - Exempt</option>
              <option value="GST_5">5% - GST</option>
              <option value="GST_12">12% - GST</option>
              <option value="GST_18">18% - GST</option>
              <option value="GST_28">28% - GST</option>
            </select>
          </div>
        </div>
        {/* Price Summary Card */}
        {(mrp || price || sellingPrice) && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Price Summary</h4>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-600">MRP:</span>
                <span className="ml-2 font-medium">{mrp ? `MMK ${mrp}` : 'Not set'}</span>
              </div>
              <div>
                <span className="text-gray-600">Price:</span>
                <span className="ml-2 font-medium">{price ? `MMK ${price}` : 'Not set'}</span>
              </div>
              <div>
                <span className="text-gray-600">Selling Price:</span>
                <span className="ml-2 font-medium">{sellingPrice ? `MMK ${sellingPrice}` : 'Not set'}</span>
              </div>
            </div>
            {mrp && sellingPrice && parseFloat(sellingPrice) < parseFloat(mrp) && (
              <div className="mt-2 text-green-600 font-medium">
                Discount: {calculatedDiscount}% off MRP
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 