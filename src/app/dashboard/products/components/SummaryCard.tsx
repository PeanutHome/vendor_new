import React from "react";

// Types for summary card data
export interface SummaryCardData {
  label: string;
  value: string;
  icon: React.ReactNode;
  bgColor: string;
}

// SummaryCard component
export function SummaryCard({ label, value, icon, bgColor }: SummaryCardData) {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="p-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{label}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center`} style={{ backgroundColor: bgColor }}>
          {icon}
        </div>
      </div>
    </div>
  );
} 