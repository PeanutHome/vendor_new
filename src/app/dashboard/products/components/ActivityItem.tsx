import React from "react";

// Types for activity data
export interface ActivityItemData {
  title: string;
  subtitle: string;
  right: React.ReactNode;
}

// ActivityItem component
export function ActivityItem({ title, subtitle, right }: ActivityItemData) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-gray-600">{subtitle}</p>
      </div>
      {right}
    </div>
  );
} 