// Constants for repeated styles
export const PRIMARY_GREEN = '#00B14F';

// Utility for button base classes
export const BUTTON_BASE =
  "inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground";

import React from 'react';

// Product status type - updated to match API
export type ProductStatus = 'draft' | 'review' | 'live' | 'rejected' | 'approved';

// New Product interface matching API response
export interface Product {
  id: string;
  name: {
    en: string;
    my: string;
  };
  status: ProductStatus;
  createdAt: string;
  sellingPrice: string;
  mrp: string;
  discount: string;
  brand: {
    id: string;
    name: string;
  };
  categories: Array<{
    id: string;
    name: {
      en: string;
      my: string;
    };
  }>;
  images: Array<{
    id: string;
    url: string;
    isPrimary: boolean;
    sortOrder: number;
    altText: string | null;
    metadata: any | null;
  }>;
  variants: Array<{
    id: string;
    sku: string;
    price: string;
    stock: number;
    attributes: {
      size: string;
      color: string;
    };
  }>;
  // Legacy fields for backward compatibility
  description?: string;
  price?: string;
  category?: string;
  stock?: number;
  rating?: number;
  sales?: number;
  views?: number;
  icon?: React.ReactNode;
  updatedAt?: string;
  isActive?: boolean;
  sku?: string;
  rejectionReason?: string;
}

// Mock products data matching new API structure
export const mockProducts: Product[] = [
  {
    id: '73940c1b-50c6-4bc2-b08b-7c7e8a92c602',
    name: {
      en: 'Kitchen Knife',
      my: 'Kitchen Knife'
    },
    status: 'approved',
    createdAt: '2025-08-25T02:50:58.002Z',
    sellingPrice: '5000.00',
    mrp: '5000.00',
    discount: '0.00',
    brand: {
      id: 'f790a8c5-6c6a-4d0e-b70d-618b52420161',
      name: 'sisburma'
    },
    categories: [
      {
        id: '53ec5d83-fe61-4c8a-8c95-d4aab03f3060',
        name: {
          en: 'Home & Kitchen',
          my: 'အိမ်သုံးပစ္စည်းနှင့် မီးဖိုချောင်ပစ္စည်းများ'
        }
      },
      {
        id: 'ce9c6b36-7dcb-4cdf-ad9c-dc2db59fb605',
        name: {
          en: 'Cookware',
          my: 'ချက်ပြုတ်ကိရိယာများ'
        }
      }
    ],
    images: [
      {
        id: '6bf8adb8-12ea-4c90-b997-162b34d66625',
        url: 'https://nakshtra-ecommerce.s3.ap-southeast-1.amazonaws.com/products/images/2cd2d756-0ca7-4af7-a907-fbfa7fc2fb4c.jpeg',
        isPrimary: false,
        sortOrder: 1,
        altText: null,
        metadata: null
      },
      {
        id: '78ee09b9-d859-4e91-ab53-7b00751d33d4',
        url: 'https://nakshtra-ecommerce.s3.ap-southeast-1.amazonaws.com/products/images/cc7b9ebd-6e57-469d-a429-2235effb1d18.jpeg',
        isPrimary: true,
        sortOrder: 0,
        altText: null,
        metadata: null
      }
    ],
    variants: [
      {
        id: '8ebeb766-d733-4383-a752-27e104349ecc',
        sku: 'Red-XL-1756090174024',
        price: '5000.00',
        stock: 50,
        attributes: {
          size: 'XL',
          color: 'Red'
        }
      },
      {
        id: '20e9604a-2cb-4e1b-ac0e-b6091d7653ff',
        sku: 'Red-L-1756090174024',
        price: '5000.00',
        stock: 50,
        attributes: {
          size: 'L',
          color: 'Red'
        }
      },
      {
        id: 'ab595d8c-160a-4e62-8113-694d9274fec3',
        sku: 'Red-M-1756090174024',
        price: '5000.00',
        stock: 50,
        attributes: {
          size: 'M',
          color: 'Red'
        }
      },
      {
        id: 'ed6c6832-7ec1-4e6f-993c-a205d376a88c',
        sku: 'Red-S-1756090174024',
        price: '5000.00',
        stock: 50,
        attributes: {
          size: 'S',
          color: 'Red'
        }
      }
    ]
  },
  {
    id: 'dec8eb44-9eeb-4dc8-9957-d0e737fe991d',
    name: {
      en: 'Jumping shoes',
      my: 'Jumping shoes'
    },
    status: 'rejected',
    createdAt: '2025-08-22T08:45:49.858Z',
    sellingPrice: '5000.00',
    mrp: '5000.00',
    discount: '0.00',
    brand: {
      id: '45a1329f-28c0-4399-848e-abd8b0ac27c6',
      name: 'giordanomm'
    },
    categories: [
      {
        id: '66977148-6d83-4316-ba6b-d5eabffaaaeb',
        name: {
          en: 'Fashion',
          my: 'ဖက်ရှင်'
        }
      },
      {
        id: '3f039f49-615e-467c-ae4f-1310bf12c420',
        name: {
          en: 'Tops',
          my: 'အပေါ်ပိုင်း'
        }
      }
    ],
    images: [
      {
        id: '04165b86-4120-4203-85b1-364cea489720',
        url: 'https://nakshtra-ecommerce.s3.ap-southeast-1.amazonaws.com/products/images/9419e1e4-f6b5-4e53-8000-cd847d660cf9.jpg',
        isPrimary: false,
        sortOrder: 1,
        altText: null,
        metadata: null
      },
      {
        id: '5e5e2aaf-1ada-4418-b688-531b39233e6f',
        url: 'https://nakshtra-ecommerce.s3.ap-southeast-1.amazonaws.com/products/images/77ea21f4-809f-41d9-af62-d9bf450bc849.jpg',
        isPrimary: true,
        sortOrder: 0,
        altText: null,
        metadata: null
      },
      {
        id: 'bd31d842-70a1-4c27-8e8f-90b88a3154ae',
        url: 'https://nakshtra-ecommerce.s3.ap-southeast-1.amazonaws.com/products/images/4782025a-0ebc-48d5-8e6b-d8bd075e916a.jpg',
        isPrimary: false,
        sortOrder: 2,
        altText: null,
        metadata: null
      }
    ],
    variants: [
      {
        id: '60d75110-e18d-46d7-a280-b3e311eac8c2',
        sku: 'Red-L-1755852291391',
        price: '5000.00',
        stock: 50,
        attributes: {
          size: 'L',
          color: 'Red'
        }
      },
      {
        id: '5d13926b-c9f1-44d7-854a-d106b8a456d9',
        sku: 'Red-M-1755852291391',
        price: '5000.00',
        stock: 50,
        attributes: {
          size: 'M',
          color: 'Red'
        }
      },
      {
        id: '01d7b30e-ba5e-4a8e-9e1c-5ec5a56919ee',
        sku: 'Red-XL-1755852291391',
        price: '5000.00',
        stock: 50,
        attributes: {
          size: 'XL',
          color: 'Red'
        }
      },
      {
        id: 'bd73514c-6f30-43df-8314-29e0948e44eb',
        sku: 'Red-S-1755852291391',
        price: '5000.00',
        stock: 50,
        attributes: {
          size: 'S',
          color: 'Red'
        }
      }
    ]
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
  approved: {
    label: 'Approved',
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