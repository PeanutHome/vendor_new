import React, { useState, useEffect } from 'react';
import { API_CONFIG } from '@/lib/config';
import { apiCallWithRefresh } from '@/lib/utils';

// Type for API category structure
interface APICategory {
  id: string;
  name: {
    en: string;
    my: string;
  };
  description: {
    en: string;
    my: string;
  };
  level: number;
  slug: string;
  icon: string | null;
  sortOrder: number;
  isActive: boolean;
  parentId: string | null;
  productCount: number;
  createdAt: string;
  updatedAt: string;
}

interface CategorySelectionProps {
  mainCategory: string;
  setMainCategory: (value: string) => void;
  subCategory: string;
  setSubCategory: (value: string) => void;
  subSubCategory: string;
  setSubSubCategory: (value: string) => void;
}

export function CategorySelection({
  mainCategory,
  setMainCategory,
  subCategory,
  setSubCategory,
  subSubCategory,
  setSubSubCategory,
}: CategorySelectionProps) {
  const [categories, setCategories] = useState<APICategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await apiCallWithRefresh(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PRODUCT_CATEGORIES}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('📂 Categories fetched from API:', data);
        setCategories(data.data || []);
      } catch (err) {
        console.error('❌ Error fetching categories:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Get main categories (level 1)
  const mainCategories = categories.filter(cat => cat.level === 1 && cat.isActive);

  // Get subcategories for selected main category (level 2)
  const subCategories = mainCategory 
    ? categories.filter(cat => cat.level === 2 && cat.parentId === mainCategory && cat.isActive)
    : [];

  // Get sub-subcategories for selected subcategory (level 3)
  const subSubCategories = subCategory 
    ? categories.filter(cat => cat.level === 3 && cat.parentId === subCategory && cat.isActive)
    : [];

  // Helper function to get category name for display
  const getCategoryName = (category: APICategory) => {
    return category.name?.en || category.name?.my || 'Unnamed Category';
  };

  if (loading) {
    return (
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm px-0 overflow-hidden">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">1. Category Selection</h3>
        </div>
        <div className="p-6 pt-0">
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            <span className="ml-2 text-sm text-gray-600">Loading categories...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm px-0 overflow-hidden">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">1. Category Selection</h3>
        </div>
        <div className="p-6 pt-0">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800 text-sm">
              <strong>Error loading categories:</strong> {error}
            </p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
            >
              Click here to retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm px-0 overflow-hidden">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">1. Category Selection</h3>
        </div>
        <div className="p-6 pt-0">
          <p className="text-gray-500 text-center py-8">No categories available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm px-0 overflow-hidden">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight">1. Category Selection</h3>
        <p className="text-sm text-muted-foreground">
          Categories loaded from API ({categories.length} total)
        </p>
      </div>
      <div className="p-6 pt-0 space-y-4">
        <div className="grid md:grid-cols-3 gap-4 p-4 border rounded-lg">
          <div>
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Main Category * ({mainCategories.length})
            </label>
            <select
              className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-[#00B14F] focus:border-[#00B14F] focus:ring-offset-2"
              value={mainCategory}
              onChange={e => {
                setMainCategory(e.target.value);
                setSubCategory("");
                setSubSubCategory("");
              }}
            >
              <option value="" disabled>Select main category</option>
              {mainCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {getCategoryName(category)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Sub-Category * ({subCategories.length})
            </label>
            <select
              className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-[#00B14F] focus:border-[#00B14F] focus:ring-offset-2"
              value={subCategory}
              onChange={e => {
                setSubCategory(e.target.value);
                setSubSubCategory("");
              }}
              disabled={!mainCategory}
            >
              <option value="" disabled>Select sub-category</option>
              {subCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {getCategoryName(category)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Sub-Sub Category ({subSubCategories.length})
            </label>
            <select
              className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-[#00B14F] focus:border-[#00B14F] focus:ring-offset-2"
              value={subSubCategory}
              onChange={e => setSubSubCategory(e.target.value)}
              disabled={!subCategory}
            >
              <option value="">Optional</option>
              {subSubCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {getCategoryName(category)}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Debug info */}
        <div className="text-xs text-gray-500 space-y-1">
          <div>Selected Main: {mainCategory ? categories.find(c => c.id === mainCategory)?.name?.en : 'None'}</div>
          <div>Selected Sub: {subCategory ? categories.find(c => c.id === subCategory)?.name?.en : 'None'}</div>
          <div>Selected Sub-Sub: {subSubCategory ? categories.find(c => c.id === subSubCategory)?.name?.en : 'None'}</div>
        </div>
      </div>
    </div>
  );
} 