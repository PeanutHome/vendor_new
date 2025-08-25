import React from "react";
import { ActivityItem, ActivityItemData } from "./ActivityItem";
import { PRIMARY_GREEN } from "../data/mockData";

// Mock activity items data
const activityItems: ActivityItemData[] = [
  {
    title: 'Bluetooth Speaker',
    subtitle: '5 new sales today',
    right: <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-primary text-white" style={{ backgroundColor: PRIMARY_GREEN }}>+$399.95</div>,
  },
  {
    title: 'Wireless Headphones',
    subtitle: 'Stock running low',
    right: <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-orange-600">45 left</div>,
  },
  {
    title: 'USB-C Hub',
    subtitle: 'New review (5 stars)',
    right: (
      <div className="flex items-center space-x-1">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star w-4 h-4 text-yellow-400 fill-current"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path></svg>
        <span className="text-sm">5.0</span>
      </div>
    ),
  },
];

export function RecentActivity() {
  return (
    <div className="flex-1 rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trending-up w-5 h-5"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
          <span>Recent Activity</span>
        </h3>
      </div>
      <div className="p-6 pt-0">
        <div className="space-y-3">
          {activityItems.map((item, idx) => (
            <ActivityItem key={idx} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
} 