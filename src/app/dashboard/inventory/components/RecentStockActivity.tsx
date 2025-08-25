import React from "react";
import { mockStockActivity } from "../data/inventoryMockData";

export function RecentStockActivity() {
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  const getActivityTypeText = (type: string, quantity: number) => {
    switch (type) {
      case 'restock':
        return `Restocked ${quantity} units`;
      case 'sale':
        return `Sold ${Math.abs(quantity)} units`;
      case 'adjustment':
        return quantity > 0 ? `Added ${quantity} units` : `Removed ${Math.abs(quantity)} units`;
      case 'transfer':
        return `Transferred ${Math.abs(quantity)} units`;
      case 'return':
        return `Returned ${quantity} units`;
      default:
        return `${quantity > 0 ? '+' : ''}${quantity} units`;
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Recent Stock Activity</h2>
        <p className="text-sm text-gray-600">Latest inventory movements and adjustments</p>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          {mockStockActivity.slice(0, 6).map((activity) => (
            <div key={activity.id} className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  {activity.icon}
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.itemName}
                  </p>
                  <span className="text-xs text-gray-500">
                    {formatTimestamp(activity.timestamp)}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600">
                  {getActivityTypeText(activity.type, activity.quantity)}
                </p>
                
                <div className="flex items-center gap-4 mt-1">
                  <span className="text-xs text-gray-500">
                    {activity.previousStock} → {activity.newStock} units
                  </span>
                  <span className="text-xs text-gray-500">
                    by {activity.user}
                  </span>
                </div>
                
                {activity.reason && (
                  <p className="text-xs text-gray-400 mt-1">
                    Reason: {activity.reason}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-200">
          <button className="w-full text-sm text-gray-600 hover:text-gray-900 transition-colors">
            View all activity →
          </button>
        </div>
      </div>
    </div>
  );
} 