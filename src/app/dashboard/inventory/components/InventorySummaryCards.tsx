import React from "react";
import { mockInventoryItems, calculateStockValue, getLowStockItems, getOutOfStockItems } from "../data/inventoryMockData";

interface SummaryCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  bgColor: string;
}

function SummaryCard({ label, value, icon, bgColor }: SummaryCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{label}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <div 
          className="p-3 rounded-lg"
          style={{ backgroundColor: bgColor }}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

export function InventorySummaryCards() {
  const totalItems = mockInventoryItems.length;
  const totalStockValue = calculateStockValue(mockInventoryItems);
  const lowStockCount = getLowStockItems(mockInventoryItems).length;
  const outOfStockCount = getOutOfStockItems(mockInventoryItems).length;
  const totalUnits = mockInventoryItems.reduce((sum, item) => sum + item.currentStock, 0);

  const summaryCards = [
    {
      label: 'Total Items',
      value: totalItems.toString(),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-package w-4 h-4 text-blue-600">
          <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"></path>
          <path d="M12 22V12"></path>
          <path d="m3.3 7 7.703 4.734a2 2 0 0 0 1.994 0L20.7 7"></path>
        </svg>
      ),
      bgColor: '#DBEAFE',
    },
    {
      label: 'Total Units',
      value: totalUnits.toLocaleString(),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-boxes w-4 h-4 text-green-600">
          <path d="M2.97 1.35A2 2 0 0 1 5.63 0h2.74A2 2 0 0 1 11 2.35l.33 2.35h7.32A2 2 0 0 1 20.63 7l-1.05 7.35A2 2 0 0 1 17.96 16H5.37a2 2 0 0 1-1.98-1.65L2.35 3.5A2 2 0 0 1 2.97 1.35z"/>
          <path d="m9 11 1 3 4-6"/>
        </svg>
      ),
      bgColor: '#DCFCE7',
    },
    {
      label: 'Stock Value',
      value: `$${totalStockValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-dollar-sign w-4 h-4 text-green-600">
          <line x1="12" x2="12" y1="2" y2="22"></line>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>
      ),
      bgColor: '#DCFCE7',
    },
    {
      label: 'Low Stock',
      value: lowStockCount.toString(),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-triangle-alert w-4 h-4 text-yellow-600">
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path>
          <path d="M12 9v4"></path>
          <path d="M12 17h.01"></path>
        </svg>
      ),
      bgColor: '#FEF3C7',
    },
    {
      label: 'Out of Stock',
      value: outOfStockCount.toString(),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x-circle w-4 h-4 text-red-600">
          <circle cx="12" cy="12" r="10"/>
          <path d="m15 9-6 6"/>
          <path d="m9 9 6 6"/>
        </svg>
      ),
      bgColor: '#FECACA',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      {summaryCards.map((card, idx) => (
        <SummaryCard key={idx} {...card} />
      ))}
    </div>
  );
} 