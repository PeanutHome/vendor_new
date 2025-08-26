import React from "react";
import { SummaryCard, SummaryCardData } from "./SummaryCard";
import { mockProducts } from "../data/mockData";

// Calculate summary statistics from mock data
const totalProducts = mockProducts.length;
const liveProducts = mockProducts.filter(p => p.status === 'live').length;
const totalRevenue = mockProducts
  .filter(p => p.status === 'live')
  .reduce((sum, p) => {
    const price = parseFloat(p.sellingPrice || '0');
    const sales = p.sales || 0;
    return sum + (price * sales);
  }, 0);
const avgRating = liveProducts > 0 
  ? (mockProducts.filter(p => p.status === 'live').reduce((sum, p) => sum + (p.rating || 0), 0) / liveProducts).toFixed(1)
  : '0';
const lowStockProducts = mockProducts.filter(p => p.status === 'live' && (p.stock || 0) < 25).length;

// Essential summary cards only
const summaryCards: SummaryCardData[] = [
  {
    label: 'Total Products',
    value: totalProducts.toString(),
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-package w-4 h-4 text-blue-600">
        <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"></path>
        <path d="M12 22V12"></path>
        <path d="m3.3 7 7.703 4.734a2 2 0 0 0 1.994 0L20.7 7"></path>
        <path d="m7.5 4.27 9 5.15"></path>
      </svg>
    ),
    bgColor: '#DBEAFE',
  },
  {
    label: 'Live Products',
    value: liveProducts.toString(),
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle w-4 h-4 text-green-600">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22,4 12,14.01 9,11.01"/>
      </svg>
    ),
    bgColor: '#DCFCE7',
  },
  {
    label: 'Total Revenue',
    value: `$${totalRevenue.toLocaleString()}`,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-dollar-sign w-4 h-4 text-green-600">
        <line x1="12" x2="12" y1="2" y2="22"></line>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
      </svg>
    ),
    bgColor: '#DCFCE7',
  },
  {
    label: 'Avg. Rating',
    value: avgRating,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star w-4 h-4 text-yellow-600">
        <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
      </svg>
    ),
    bgColor: '#FEF9C3',
  },
  {
    label: 'Low Stock',
    value: lowStockProducts.toString(),
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-triangle-alert w-4 h-4 text-red-600">
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path>
        <path d="M12 9v4"></path>
        <path d="M12 17h.01"></path>
      </svg>
    ),
    bgColor: '#FECACA',
  },
];

export function SummaryCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      {summaryCards.map((card, idx) => (
        <SummaryCard key={idx} {...card} />
      ))}
    </div>
  );
} 