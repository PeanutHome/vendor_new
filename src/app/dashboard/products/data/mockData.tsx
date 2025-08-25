// Constants for repeated styles
export const PRIMARY_GREEN = '#00B14F';

// Utility for button base classes
export const BUTTON_BASE =
  "inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground";

import React from 'react';

// Product status type - added rejected
export type ProductStatus = 'draft' | 'review' | 'live' | 'rejected';

// Enhanced Product interface
export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  status: ProductStatus;
  stock: number;
  rating: number;
  sales: number;
  views: number;
  icon: React.ReactNode;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  images?: string[];
  sku?: string;
  rejectionReason?: string; // For rejected products
}

// Mock products data with different statuses including rejected
export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: '$199.99',
    category: 'Electronics',
    status: 'live',
    stock: 45,
    rating: 4.5,
    sales: 124,
    views: 1580,
    isActive: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20',
    sku: 'WH-001',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-headphones w-6 h-6 text-gray-400">
        <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/>
      </svg>
    ),
  },
  {
    id: '2',
    name: 'Smart Watch Pro',
    description: 'Advanced fitness tracking with health monitoring features',
    price: '$299.99',
    category: 'Wearables',
    status: 'review',
    stock: 0,
    rating: 0,
    sales: 0,
    views: 45,
    isActive: false,
    createdAt: '2024-01-18',
    updatedAt: '2024-01-19',
    sku: 'SW-002',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-watch w-6 h-6 text-gray-400">
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
    description: 'Mechanical RGB gaming keyboard with custom switches',
    price: '$149.99',
    category: 'Gaming',
    status: 'draft',
    stock: 0,
    rating: 0,
    sales: 0,
    views: 12,
    isActive: false,
    createdAt: '2024-01-20',
    updatedAt: '2024-01-20',
    sku: 'GK-003',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-keyboard w-6 h-6 text-gray-400">
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
    description: 'Portable waterproof speaker with 12-hour battery life',
    price: '$79.99',
    category: 'Audio',
    status: 'live',
    stock: 23,
    rating: 4.2,
    sales: 89,
    views: 945,
    isActive: true,
    createdAt: '2024-01-10',
    updatedAt: '2024-01-15',
    sku: 'BS-004',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-speaker w-6 h-6 text-gray-400">
        <rect width="16" height="20" x="4" y="2" rx="2" ry="2"/>
        <circle cx="12" cy="14" r="4"/>
        <path d="m12 6 0 .01"/>
      </svg>
    ),
  },
  {
    id: '5',
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with precision tracking',
    price: '$49.99',
    category: 'Accessories',
    status: 'draft',
    stock: 0,
    rating: 0,
    sales: 0,
    views: 8,
    isActive: false,
    createdAt: '2024-01-21',
    updatedAt: '2024-01-21',
    sku: 'WM-005',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mouse w-6 h-6 text-gray-400">
        <rect width="12" height="18" x="6" y="3" rx="6"/>
        <path d="M12 7v4"/>
      </svg>
    ),
  },
  {
    id: '6',
    name: 'USB-C Hub',
    description: '7-in-1 USB-C hub with 4K HDMI and fast charging',
    price: '$89.99',
    category: 'Accessories',
    status: 'rejected',
    stock: 0,
    rating: 0,
    sales: 0,
    views: 67,
    isActive: false,
    createdAt: '2024-01-17',
    updatedAt: '2024-01-18',
    sku: 'UH-006',
    rejectionReason: 'Product images do not meet quality standards. Please provide high-resolution images with white background and multiple angles.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-usb w-6 h-6 text-gray-400">
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
    description: 'Military-grade protection phone case with card holder',
    price: '$29.99',
    category: 'Accessories',
    status: 'rejected',
    stock: 0,
    rating: 0,
    sales: 0,
    views: 23,
    isActive: false,
    createdAt: '2024-01-19',
    updatedAt: '2024-01-20',
    sku: 'PC-007',
    rejectionReason: 'Product description lacks required technical specifications and compatibility information.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-smartphone w-6 h-6 text-gray-400">
        <rect width="14" height="20" x="5" y="2" rx="2" ry="2"/>
        <path d="M12 18h.01"/>
      </svg>
    ),
  }
];

// Status configuration with better visibility for draft and added rejected
export const statusConfig: Record<ProductStatus, {
  label: string;
  color: string;
  bgColor: string;
  textColor: string;
  icon: React.ReactNode;
}> = {
  draft: {
    label: 'Draft',
    color: 'bg-blue-100 text-blue-800 border border-blue-200',
    bgColor: '#EBF8FF',
    textColor: '#1E40AF',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-edit">
        <path d="M4 13.5V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2h-5.5"/>
        <polyline points="14,2 14,8 20,8"/>
        <path d="M10.42 12.61a2.1 2.1 0 1 1 2.97 2.97L7.95 21 4 22l1.05-3.95 5.37-5.44Z"/>
      </svg>
    )
  },
  review: {
    label: 'In Review',
    color: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
    bgColor: '#FEF3C7',
    textColor: '#D97706',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12,6 12,12 16,14"/>
      </svg>
    )
  },
  live: {
    label: 'Live',
    color: 'bg-green-100 text-green-800 border border-green-200',
    bgColor: '#DCFCE7',
    textColor: '#16A34A',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22,4 12,14.01 9,11.01"/>
      </svg>
    )
  },
  rejected: {
    label: 'Rejected',
    color: 'bg-red-100 text-red-800 border border-red-200',
    bgColor: '#FEE2E2',
    textColor: '#DC2626',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x-circle">
        <circle cx="12" cy="12" r="10"/>
        <path d="m15 9-6 6"/>
        <path d="m9 9 6 6"/>
      </svg>
    )
  }
}; 