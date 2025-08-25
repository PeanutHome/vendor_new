import React from 'react';

export type StockStatus = 'in-stock' | 'low-stock' | 'out-of-stock' | 'discontinued';

export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  currentStock: number;
  minimumStock: number;
  maximumStock: number;
  unitCost: number;
  retailPrice: number;
  supplier: string;
  location: string;
  lastRestocked: string;
  stockStatus: StockStatus;
  icon: React.ReactNode;
  barcode?: string;
  weight?: number;
  dimensions?: string;
}

export interface StockActivity {
  id: string;
  itemId: string;
  itemName: string;
  type: 'adjustment' | 'restock' | 'sale' | 'transfer' | 'return';
  quantity: number;
  previousStock: number;
  newStock: number;
  reason?: string;
  timestamp: string;
  user: string;
  icon: React.ReactNode;
}

// Mock inventory data
export const mockInventoryItems: InventoryItem[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    sku: 'WH-001',
    category: 'Electronics',
    currentStock: 45,
    minimumStock: 10,
    maximumStock: 100,
    unitCost: 89.99,
    retailPrice: 199.99,
    supplier: 'TechSupply Co.',
    location: 'A1-B3',
    lastRestocked: '2024-01-15',
    stockStatus: 'in-stock',
    barcode: '123456789012',
    weight: 0.3,
    dimensions: '20x15x8 cm',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-headphones w-5 h-5 text-gray-400">
        <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/>
      </svg>
    ),
  },
  {
    id: '2',
    name: 'Smart Watch Pro',
    sku: 'SW-002',
    category: 'Wearables',
    currentStock: 8,
    minimumStock: 15,
    maximumStock: 50,
    unitCost: 149.99,
    retailPrice: 299.99,
    supplier: 'WearTech Ltd.',
    location: 'B2-C1',
    lastRestocked: '2024-01-10',
    stockStatus: 'low-stock',
    barcode: '123456789013',
    weight: 0.1,
    dimensions: '4.5x4x1.2 cm',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-watch w-5 h-5 text-gray-400">
        <circle cx="12" cy="12" r="6"/>
        <polyline points="12,10 12,12 13,13"/>
        <path d="m16.13 7.66-.81-4.05a2 2 0 0 0-2-1.61h-2.68a2 2 0 0 0-2 1.61l-.78 4.05"/>
        <path d="m7.88 16.36.8 4a2 2 0 0 0 2 1.61h2.72a2 2 0 0 0 2-1.61l.81-4.05"/>
      </svg>
    ),
  },
  {
    id: '3',
    name: 'Gaming Keyboard',
    sku: 'GK-003',
    category: 'Gaming',
    currentStock: 0,
    minimumStock: 5,
    maximumStock: 30,
    unitCost: 79.99,
    retailPrice: 149.99,
    supplier: 'GameGear Inc.',
    location: 'C1-D2',
    lastRestocked: '2023-12-20',
    stockStatus: 'out-of-stock',
    barcode: '123456789014',
    weight: 1.2,
    dimensions: '45x15x3.5 cm',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-keyboard w-5 h-5 text-gray-400">
        <rect width="20" height="16" x="2" y="4" rx="2"/>
        <path d="M6 8h.01"/>
        <path d="M10 8h.01"/>
        <path d="M14 8h.01"/>
        <path d="M18 8h.01"/>
        <path d="M8 12h.01"/>
        <path d="M12 12h.01"/>
        <path d="M16 12h.01"/>
        <path d="M7 16h10"/>
      </svg>
    ),
  },
  {
    id: '4',
    name: 'Bluetooth Speaker',
    sku: 'BS-004',
    category: 'Audio',
    currentStock: 23,
    minimumStock: 12,
    maximumStock: 60,
    unitCost: 39.99,
    retailPrice: 79.99,
    supplier: 'AudioMax Corp.',
    location: 'A3-B1',
    lastRestocked: '2024-01-12',
    stockStatus: 'in-stock',
    barcode: '123456789015',
    weight: 0.8,
    dimensions: '18x8x8 cm',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-speaker w-5 h-5 text-gray-400">
        <rect width="16" height="20" x="4" y="2" rx="2" ry="2"/>
        <circle cx="12" cy="14" r="4"/>
        <path d="m12 6 0 .01"/>
      </svg>
    ),
  },
  {
    id: '5',
    name: 'Wireless Mouse',
    sku: 'WM-005',
    category: 'Accessories',
    currentStock: 67,
    minimumStock: 20,
    maximumStock: 100,
    unitCost: 24.99,
    retailPrice: 49.99,
    supplier: 'PeripheralPro',
    location: 'B1-A2',
    lastRestocked: '2024-01-18',
    stockStatus: 'in-stock',
    barcode: '123456789016',
    weight: 0.1,
    dimensions: '12x6x4 cm',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mouse w-5 h-5 text-gray-400">
        <rect width="12" height="18" x="6" y="3" rx="6"/>
        <path d="M12 7v4"/>
      </svg>
    ),
  },
  {
    id: '6',
    name: 'USB-C Hub',
    sku: 'UH-006',
    category: 'Accessories',
    currentStock: 3,
    minimumStock: 8,
    maximumStock: 40,
    unitCost: 44.99,
    retailPrice: 89.99,
    supplier: 'ConnectTech',
    location: 'C2-A1',
    lastRestocked: '2024-01-05',
    stockStatus: 'low-stock',
    barcode: '123456789017',
    weight: 0.2,
    dimensions: '10x3x1.5 cm',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-usb w-5 h-5 text-gray-400">
        <circle cx="10" cy="7" r="1"/>
        <circle cx="4" cy="20" r="1"/>
        <path d="M4.7 19.3 19 5"/>
        <path d="m21 3-3 1 2 2Z"/>
        <path d="M9.26 7.68 5 12l2 5"/>
        <path d="m10 14 5 2 2-2"/>
      </svg>
    ),
  },
  {
    id: '7',
    name: 'Phone Case Premium',
    sku: 'PC-007',
    category: 'Accessories',
    currentStock: 0,
    minimumStock: 25,
    maximumStock: 150,
    unitCost: 14.99,
    retailPrice: 29.99,
    supplier: 'CaseCraft Ltd.',
    location: 'D1-C3',
    lastRestocked: '2023-11-15',
    stockStatus: 'discontinued',
    barcode: '123456789018',
    weight: 0.05,
    dimensions: '16x8x1 cm',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-smartphone w-5 h-5 text-gray-400">
        <rect width="14" height="20" x="5" y="2" rx="2" ry="2"/>
        <path d="M15 14h.01"/>
        <path d="M9 14h.01"/>
        <path d="M12 14h.01"/>
        <path d="M15 11h.01"/>
        <path d="M9 11h.01"/>
        <path d="M12 11h.01"/>
      </svg>
    ),
  },
];

// Recent stock activity data
export const mockStockActivity: StockActivity[] = [
  {
    id: '1',
    itemId: '1',
    itemName: 'Wireless Headphones',
    type: 'restock',
    quantity: 25,
    previousStock: 20,
    newStock: 45,
    reason: 'Scheduled restock',
    timestamp: '2024-01-15T10:30:00Z',
    user: 'John Smith',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-package-plus w-4 h-4 text-green-600">
        <path d="M16 16h6"/>
        <path d="M19 13v6"/>
        <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"/>
        <path d="m7.5 4.27 9 5.15"/>
        <polyline points="3.29,7 12,12 20.71,7"/>
        <line x1="12" x2="12" y1="22" y2="12"/>
      </svg>
    ),
  },
  {
    id: '2',
    itemId: '4',
    itemName: 'Bluetooth Speaker',
    type: 'sale',
    quantity: -5,
    previousStock: 28,
    newStock: 23,
    reason: 'Customer purchase',
    timestamp: '2024-01-14T15:22:00Z',
    user: 'System',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart w-4 h-4 text-blue-600">
        <circle cx="8" cy="21" r="1"/>
        <circle cx="19" cy="21" r="1"/>
        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
      </svg>
    ),
  },
  {
    id: '3',
    itemId: '2',
    itemName: 'Smart Watch Pro',
    type: 'adjustment',
    quantity: -2,
    previousStock: 10,
    newStock: 8,
    reason: 'Damaged units removed',
    timestamp: '2024-01-13T09:15:00Z',
    user: 'Sarah Johnson',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-minus-circle w-4 h-4 text-red-600">
        <circle cx="12" cy="12" r="10"/>
        <path d="M8 12h8"/>
      </svg>
    ),
  },
  {
    id: '4',
    itemId: '5',
    itemName: 'Wireless Mouse',
    type: 'return',
    quantity: 3,
    previousStock: 64,
    newStock: 67,
    reason: 'Customer return',
    timestamp: '2024-01-12T14:45:00Z',
    user: 'Mike Davis',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-undo w-4 h-4 text-orange-600">
        <path d="M3 7v6h6"/>
        <path d="m21 17a9 9 0 11-9-9 9 9 0 019 9z"/>
      </svg>
    ),
  },
  {
    id: '5',
    itemId: '6',
    itemName: 'USB-C Hub',
    type: 'transfer',
    quantity: -5,
    previousStock: 8,
    newStock: 3,
    reason: 'Transfer to Branch B',
    timestamp: '2024-01-11T11:30:00Z',
    user: 'Lisa Chen',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right-left w-4 h-4 text-purple-600">
        <path d="m16 3 4 4-4 4"/>
        <path d="M20 7H4"/>
        <path d="m8 21-4-4 4-4"/>
        <path d="M4 17h16"/>
      </svg>
    ),
  },
];

// Utility functions
export const getStockStatusColor = (status: StockStatus): string => {
  switch (status) {
    case 'in-stock':
      return 'text-green-600 bg-green-50';
    case 'low-stock':
      return 'text-yellow-600 bg-yellow-50';
    case 'out-of-stock':
      return 'text-red-600 bg-red-50';
    case 'discontinued':
      return 'text-gray-600 bg-gray-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
};

export const getStockStatusText = (status: StockStatus): string => {
  switch (status) {
    case 'in-stock':
      return 'In Stock';
    case 'low-stock':
      return 'Low Stock';
    case 'out-of-stock':
      return 'Out of Stock';
    case 'discontinued':
      return 'Discontinued';
    default:
      return 'Unknown';
  }
};

export const calculateStockValue = (items: InventoryItem[]): number => {
  return items.reduce((total, item) => total + (item.currentStock * item.unitCost), 0);
};

export const getLowStockItems = (items: InventoryItem[]): InventoryItem[] => {
  return items.filter(item => 
    item.currentStock <= item.minimumStock && item.stockStatus !== 'discontinued'
  );
};

export const getOutOfStockItems = (items: InventoryItem[]): InventoryItem[] => {
  return items.filter(item => item.currentStock === 0 && item.stockStatus !== 'discontinued');
}; 