import React from "react";

interface VisibilityPublishingProps {
  publishStatus: "draft" | "preview";
  setPublishStatus: (value: "draft" | "preview") => void;
  showInNewArrivals: boolean;
  setShowInNewArrivals: (value: boolean) => void;
  featureOnHomepage: boolean;
  setFeatureOnHomepage: (value: boolean) => void;
  enableForCampaigns: boolean;
  setEnableForCampaigns: (value: boolean) => void;
}

export function VisibilityPublishing({
  publishStatus,
  setPublishStatus,
  showInNewArrivals,
  setShowInNewArrivals,
  featureOnHomepage,
  setFeatureOnHomepage,
  enableForCampaigns,
  setEnableForCampaigns,
}: VisibilityPublishingProps) {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm px-0 overflow-hidden">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight">10. Visibility & Publishing Options</h3>
        <p className="text-sm text-gray-600">Control how and when your product appears to customers</p>
      </div>
      <div className="p-6 pt-0 space-y-6">
        {/* Publishing Status */}
        <div>
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-3 block">
            Publishing Status *
          </label>
          <div className="flex gap-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="publishStatus"
                value="preview"
                checked={publishStatus === "preview"}
                onChange={(e) => setPublishStatus(e.target.value as "draft" | "preview")}
                className="h-4 w-4 text-[#00B14F] border-gray-300 focus:ring-[#00B14F]"
              />
              <div className="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
                <span className="text-sm font-medium">Preview (Ready for Review)</span>
              </div>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="publishStatus"
                value="draft"
                checked={publishStatus === "draft"}
                onChange={(e) => setPublishStatus(e.target.value as "draft" | "preview")}
                className="h-4 w-4 text-[#00B14F] border-gray-300 focus:ring-[#00B14F]"
              />
              <div className="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14,2 14,8 20,8"/>
                  <line x1="16" x2="8" y1="13" y2="13"/>
                  <line x1="16" x2="8" y1="17" y2="17"/>
                  <polyline points="10,9 9,9 8,9"/>
                </svg>
                <span className="text-sm font-medium">Save as Draft</span>
              </div>
            </label>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {publishStatus === "preview" 
              ? "Product will be submitted for review and approval" 
              : "Product will be saved privately as a draft"}
          </p>
        </div>

        {/* Visibility Options */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium leading-none">Visibility Options</h4>
          
          {/* Show in New Arrivals */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  role="switch"
                  aria-checked={showInNewArrivals}
                  className={`peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 ${
                    showInNewArrivals ? 'bg-[#00B14F]' : 'bg-input'
                  }`}
                  onClick={() => setShowInNewArrivals(!showInNewArrivals)}
                >
                  <span
                    className={`pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform ${
                      showInNewArrivals ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Show in &quot;New Arrivals&quot;
                </label>
              </div>
              <div className="flex items-center space-x-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span className="text-xs text-gray-500">Highlights product as new</span>
              </div>
            </div>
          </div>

          {/* Feature on Homepage */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  role="switch"
                  aria-checked={featureOnHomepage}
                  className={`peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 ${
                    featureOnHomepage ? 'bg-[#00B14F]' : 'bg-input'
                  }`}
                  onClick={() => setFeatureOnHomepage(!featureOnHomepage)}
                >
                  <span
                    className={`pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform ${
                      featureOnHomepage ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Feature on Homepage Banner
                </label>
              </div>
              <div className="flex items-center space-x-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                  <polyline points="7.5,4.21 12,6.81 16.5,4.21"/>
                  <polyline points="7.5,19.79 7.5,14.6 3,12"/>
                  <polyline points="21,12 16.5,14.6 16.5,19.79"/>
                </svg>
                <span className="text-xs text-gray-500">Requires admin approval</span>
              </div>
            </div>
          </div>

          {/* Enable for Campaigns */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  role="switch"
                  aria-checked={enableForCampaigns}
                  className={`peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 ${
                    enableForCampaigns ? 'bg-[#00B14F]' : 'bg-input'
                  }`}
                  onClick={() => setEnableForCampaigns(!enableForCampaigns)}
                >
                  <span
                    className={`pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform ${
                      enableForCampaigns ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Enable for Campaigns
                </label>
              </div>
              <div className="flex items-center space-x-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-600">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  <path d="m12 5 2 4h4l-3 3 1 4-4-2-4 2 1-4-3-3h4l2-4"/>
                </svg>
                <span className="text-xs text-gray-500">e.g., Thingyan Deals, Flash Sales</span>
              </div>
            </div>
          </div>
        </div>

        {/* Status Summary */}
        <div className="bg-gray-50 rounded-lg p-4 border">
          <h5 className="text-sm font-medium mb-2 flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 16v-4"/>
              <path d="M12 8h.01"/>
            </svg>
            <span>Publishing Summary</span>
          </h5>
          <div className="text-sm text-gray-600 space-y-1">
            <p>• Status: <span className="font-medium">{publishStatus === "preview" ? "Ready for Review" : "Saving as Draft"}</span></p>
            {showInNewArrivals && <p>• Will appear in New Arrivals section</p>}
            {featureOnHomepage && <p>• Requested for Homepage Banner (pending admin approval)</p>}
            {enableForCampaigns && <p>• Available for promotional campaigns</p>}
          </div>
        </div>
      </div>
    </div>
  );
} 