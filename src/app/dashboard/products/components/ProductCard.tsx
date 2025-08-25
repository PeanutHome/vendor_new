import React from "react";
import { statusConfig } from "../data/mockData";

interface ProductCardProps {
  product: any; // Real product from API
  onRejectedClick?: (product: any) => void;
  onEdit?: (product: any) => void;
  onQuickEdit?: (product: any) => void;
}

// ProductCard component with enhanced status display
export function ProductCard({ product, onRejectedClick, onEdit, onQuickEdit }: ProductCardProps) {
  // Map API status to display status
  const getDisplayStatus = (apiStatus: string) => {
    switch (apiStatus) {
      case 'approved': return 'live';
      case 'pending': return 'review';
      case 'rejected': return 'rejected';
      default: return 'draft';
    }
  };
  
  const displayStatus = getDisplayStatus(product.status);
  const statusInfo = statusConfig[displayStatus];

  const handleRejectedClick = () => {
    if (product.status === 'rejected' && onRejectedClick) {
      onRejectedClick(product);
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering rejected click
    if (onEdit) {
      onEdit(product);
    }
  };

  const handleQuickEdit = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering rejected click
    if (onQuickEdit) {
      onQuickEdit(product);
    }
  };

  const handleResubmit = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering rejected click
    if (onRejectedClick) {
      onRejectedClick(product);
    }
  };

  return (
    <div 
      className={`flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors ${
        product.status === 'rejected' ? 'cursor-pointer hover:border-red-300' : ''
      }`}
      onClick={product.status === 'rejected' ? handleRejectedClick : undefined}
    >
              <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
            {/* Placeholder icon since API doesn't provide icons */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-package w-6 h-6 text-gray-400">
              <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"></path>
              <path d="M12 22V12"></path>
              <path d="m3.3 7 7.703 4.734a2 2 0 0 0 1.994 0L20.7 7"></path>
              <path d="m7.5 4.27 9 5.15"></path>
            </svg>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-gray-900">{product.name?.en || product.name}</h3>
              <span className="text-xs text-gray-500">#{product.sku}</span>
              {product.status === 'rejected' && (
                <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded">
                  Click to view details
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600 mt-1">{product.description?.en || product.description}</p>
            <div className="flex items-center space-x-4 mt-2">
              <span className="text-lg font-bold text-primary">MMK {product.sellingPrice}</span>
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground">
                {product.categories?.[0]?.name?.en || 'Unknown Category'}
              </div>
              <div className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors ${statusInfo.color}`}>
                {statusInfo.icon}
                {statusInfo.label}
              </div>
              {displayStatus === 'live' && (
                <>
                  <span className="text-sm text-gray-500">Stock: dmt* 100</span>
                  <div className="flex items-center space-x-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star w-4 h-4 text-yellow-400 fill-current">
                      <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>
                    </svg>
                    <span className="text-sm">dmt* 4.5</span>
                    <span className="text-sm text-gray-500">(dmt* 25 sales)</span>
                  </div>
                  <span className="text-sm text-gray-500">dmt* 150 views</span>
                </>
              )}
              {displayStatus !== 'live' && (
                <span className="text-sm text-gray-500">Created: {new Date(product.createdAt).toLocaleDateString()}</span>
              )}
            </div>
          </div>
        </div>
      <div className="flex items-center space-x-4">
        {displayStatus === 'live' && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Visibility</span>
            <div className="relative">
              <input
                type="checkbox"
                checked={true} // dmt* - API doesn't provide this field
                className="sr-only"
                readOnly
              />
              <div className="w-11 h-6 rounded-full border-2 transition-colors bg-green-500 border-green-500">
                <div className="w-5 h-5 bg-white rounded-full shadow-lg transform transition-transform translate-x-5"></div>
              </div>
            </div>
            <span className="text-sm text-green-600">Active</span>
          </div>
        )}
        <div className="flex items-center space-x-2">
          <button 
            onClick={handleQuickEdit}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-green-600 bg-green-50 text-green-700 hover:bg-green-100 h-9 rounded-md px-3"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap w-4 h-4">
              <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"></polygon>
            </svg>
            Quick Edit
          </button>
          <button 
            onClick={handleEdit}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-square-pen w-4 h-4">
              <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"></path>
            </svg>
            Edit
          </button>
          {displayStatus === 'draft' && (
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-blue-600 text-white hover:bg-blue-700 h-9 rounded-md px-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-send w-4 h-4">
                <path d="m22 2-7 20-4-9-9-4Z"/>
                <path d="M22 2 11 13"/>
              </svg>
              Submit for Review
            </button>
          )}
          {displayStatus === 'rejected' && (
            <button 
              onClick={handleResubmit}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-blue-600 text-white hover:bg-blue-700 h-9 rounded-md px-3"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-refresh-cw">
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                <path d="M21 3v5h-5"/>
                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
                <path d="M8 16H3v5"/>
              </svg>
              Resubmit
            </button>
          )}
          <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash2 w-4 h-4">
              <path d="M3 6h18"></path>
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
              <line x1="10" x2="10" y1="11" y2="17"></line>
              <line x1="14" x2="14" y1="11" y2="17"></line>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
} 