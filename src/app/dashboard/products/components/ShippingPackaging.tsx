import React from "react";
import { CustomSelect } from "./CustomSelect";
import { PackType, DispatchTime, ReturnPolicy } from "@/lib/enums";

interface Option {
  value: string;
  label: string;
}

interface ShippingPackagingProps {
  dimensionL: string;
  setDimensionL: (value: string) => void;
  dimensionW: string;
  setDimensionW: (value: string) => void;
  dimensionH: string;
  setDimensionH: (value: string) => void;
  netWeight: string;
  setNetWeight: (value: string) => void;
  packType: Option | null;
  setPackType: (value: Option | null) => void;
  dispatchTime: Option | null;
  setDispatchTime: (value: Option | null) => void;
  returnPolicy: Option | null;
  setReturnPolicy: (value: Option | null) => void;
  codAvailable: boolean;
  setCodAvailable: (value: boolean) => void;
}

export function ShippingPackaging({
  dimensionL,
  setDimensionL,
  dimensionW,
  setDimensionW,
  dimensionH,
  setDimensionH,
  netWeight,
  setNetWeight,
  packType,
  setPackType,
  dispatchTime,
  setDispatchTime,
  returnPolicy,
  setReturnPolicy,
  codAvailable,
  setCodAvailable,
}: ShippingPackagingProps) {
  const packTypeOptions: Option[] = [
    { value: PackType.BOX, label: "Box" },
    { value: PackType.POUCH, label: "Pouch" },
    { value: PackType.BAG, label: "Bag" },
    { value: PackType.TUBE, label: "Tube" },
    { value: PackType.JAR, label: "Jar" },
    { value: PackType.BOTTLE, label: "Bottle" },
    { value: PackType.SACHET, label: "Sachet" },
    { value: PackType.CAN, label: "Can" }
  ];

  const dispatchTimeOptions: Option[] = [
    { value: DispatchTime.ONE_DAY, label: "1 day" },
    { value: DispatchTime.TWO_THREE_DAYS, label: "2-3 days" },
    { value: DispatchTime.FIVE_SEVEN_DAYS, label: "5-7 days" },
    { value: DispatchTime.ONE_WEEK, label: "1 week" }
  ];

  const returnPolicyOptions: Option[] = [
    { value: ReturnPolicy.SEVEN_DAYS, label: "7 days" },
    { value: ReturnPolicy.FIFTEEN_DAYS, label: "15 days" },
    { value: ReturnPolicy.THIRTY_DAYS, label: "30 days" },
    { value: ReturnPolicy.NO_RETURN, label: "No returns" }
  ];

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm px-0 overflow-hidden">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight">7. Shipping, Packaging & Fulfilment</h3>
      </div>
      <div className="p-6 pt-0 space-y-4">
        <div>
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block">
            Package Dimensions (cm) *
          </label>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-gray-500">Length</label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus:border-[#00B14F] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                placeholder="L (cm)"
                type="number"
                step="0.1"
                value={dimensionL}
                onChange={e => setDimensionL(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs text-gray-500">Width</label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus:border-[#00B14F] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                placeholder="W (cm)"
                type="number"
                step="0.1"
                value={dimensionW}
                onChange={e => setDimensionW(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs text-gray-500">Height</label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus:border-[#00B14F] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                placeholder="H (cm)"
                type="number"
                step="0.1"
                value={dimensionH}
                onChange={e => setDimensionH(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Net Weight (kg) *
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus:border-[#00B14F] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              placeholder="Weight in kg"
              type="number"
              step="0.01"
              value={netWeight}
              onChange={e => setNetWeight(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Package Type
            </label>
            <CustomSelect
              options={packTypeOptions}
              value={packType}
              onChange={setPackType}
              placeholder="Select package type"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Dispatch Time *
            </label>
            <CustomSelect
              options={dispatchTimeOptions}
              value={dispatchTime}
              onChange={setDispatchTime}
              placeholder="Ready to ship in..."
            />
          </div>
          <div>
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Return/Exchange Policy
            </label>
            <CustomSelect
              options={returnPolicyOptions}
              value={returnPolicy}
              onChange={setReturnPolicy}
              placeholder="Select return policy"
            />
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Payment & Delivery Options
          </label>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              role="checkbox"
              aria-checked={codAvailable}
              data-state={codAvailable ? "checked" : "unchecked"}
              value="on"
              className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground cursor-pointer"
              onClick={() => setCodAvailable(!codAvailable)}
              style={codAvailable ? { backgroundColor: '#00B14F', borderColor: '#00B14F', color: 'white' } : {}}
            >
              {codAvailable && (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check h-4 w-4"><path d="M20 6 9 17l-5-5"></path></svg>
              )}
            </button>
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Cash on Delivery (COD) Available
            </label>
          </div>
          <p className="text-xs text-gray-500">
            Enable COD option for customers who prefer to pay upon delivery
          </p>
        </div>

        {/* Package Summary */}
        {(dimensionL || dimensionW || dimensionH || netWeight) && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Package Summary</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Dimensions:</span>
                <span className="ml-2 font-medium">
                  {dimensionL || '?'} × {dimensionW || '?'} × {dimensionH || '?'} cm
                </span>
              </div>
              <div>
                <span className="text-gray-600">Weight:</span>
                <span className="ml-2 font-medium">{netWeight || 'Not set'} kg</span>
              </div>
              <div>
                <span className="text-gray-600">Dispatch:</span>
                <span className="ml-2 font-medium">{dispatchTime?.label || 'Not set'}</span>
              </div>
              <div>
                <span className="text-gray-600">Returns:</span>
                <span className="ml-2 font-medium">{returnPolicy?.label || 'Not set'}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 