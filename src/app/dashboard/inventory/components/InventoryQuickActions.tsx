import React from "react";
import { mockInventoryItems, getLowStockItems, getOutOfStockItems, InventoryItem } from "../data/inventoryMockData";

interface InventoryQuickActionsProps {
  onStockAdjustment: (item: InventoryItem) => void;
}

export function InventoryQuickActions({ onStockAdjustment }: InventoryQuickActionsProps) {
  const lowStockItems = getLowStockItems(mockInventoryItems);
  const outOfStockItems = getOutOfStockItems(mockInventoryItems);

  const quickActions = [
    {
      label: 'Bulk Import',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-upload w-4 h-4">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="17,8 12,3 7,8"/>
          <line x1="12" x2="12" y1="3" y2="15"/>
        </svg>
      ),
      onClick: () => console.log('Bulk import'),
      color: 'blue',
    },
    {
      label: 'Generate Report',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text w-4 h-4">
          <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
          <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
          <path d="M10 9H8"/>
          <path d="M16 13H8"/>
          <path d="M16 17H8"/>
        </svg>
      ),
      onClick: () => console.log('Generate report'),
      color: 'green',
    },
    {
      label: 'Barcode Scanner',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-scan-line w-4 h-4">
          <path d="M3 7V5a2 2 0 0 1 2-2h2"/>
          <path d="M17 3h2a2 2 0 0 1 2 2v2"/>
          <path d="M21 17v2a2 2 0 0 1-2 2h-2"/>
          <path d="M7 21H5a2 2 0 0 1-2-2v-2"/>
          <path d="M7 8h10"/>
          <path d="M7 12h10"/>
          <path d="M7 16h10"/>
        </svg>
      ),
      onClick: () => console.log('Barcode scanner'),
      color: 'purple',
    },
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-50 text-blue-700 hover:bg-blue-100';
      case 'green':
        return 'bg-green-50 text-green-700 hover:bg-green-100';
      case 'purple':
        return 'bg-purple-50 text-purple-700 hover:bg-purple-100';
      default:
        return 'bg-gray-50 text-gray-700 hover:bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
        </div>
        
        <div className="p-6 space-y-3">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${getColorClasses(action.color)}`}
            >
              {action.icon}
              <span className="text-sm font-medium">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Low Stock Alerts */}
      {lowStockItems.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-triangle-alert w-4 h-4 text-yellow-600">
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/>
                <path d="M12 9v4"/>
                <path d="M12 17h.01"/>
              </svg>
              <h2 className="text-lg font-semibold text-gray-900">Low Stock Alerts</h2>
            </div>
          </div>
          
          <div className="p-6">
            <div className="space-y-3">
              {lowStockItems.slice(0, 3).map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center bg-white rounded">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.name}</p>
                      <p className="text-xs text-gray-600">{item.currentStock} units left</p>
                    </div>
                  </div>
                  <button
                    onClick={() => onStockAdjustment(item)}
                    className="px-3 py-1.5 text-xs font-medium text-yellow-700 bg-yellow-100 rounded hover:bg-yellow-200 transition-colors"
                  >
                    Restock
                  </button>
                </div>
              ))}
            </div>
            
            {lowStockItems.length > 3 && (
              <button className="w-full mt-4 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                View all {lowStockItems.length} low stock items →
              </button>
            )}
          </div>
        </div>
      )}

      {/* Out of Stock Alerts */}
      {outOfStockItems.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x-circle w-4 h-4 text-red-600">
                <circle cx="12" cy="12" r="10"/>
                <path d="m15 9-6 6"/>
                <path d="m9 9 6 6"/>
              </svg>
              <h2 className="text-lg font-semibold text-gray-900">Out of Stock</h2>
            </div>
          </div>
          
          <div className="p-6">
            <div className="space-y-3">
              {outOfStockItems.slice(0, 3).map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center bg-white rounded">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.name}</p>
                      <p className="text-xs text-gray-600">0 units in stock</p>
                    </div>
                  </div>
                  <button
                    onClick={() => onStockAdjustment(item)}
                    className="px-3 py-1.5 text-xs font-medium text-red-700 bg-red-100 rounded hover:bg-red-200 transition-colors"
                  >
                    Restock
                  </button>
                </div>
              ))}
            </div>
            
            {outOfStockItems.length > 3 && (
              <button className="w-full mt-4 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                View all {outOfStockItems.length} out of stock items →
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 