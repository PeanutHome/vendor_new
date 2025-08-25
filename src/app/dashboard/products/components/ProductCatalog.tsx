import React, { useState } from "react";
import { ProductCard } from "./ProductCard";
import { statusConfig, ProductStatus } from "../data/mockData";
import { Product } from "../data/mockData";

interface ProductCatalogProps {
  products: any[]; // Real products from API
  loading: boolean;
  error: string | null;
  onRejectedClick?: (product: Product) => void;
  onEdit?: (product: Product) => void;
  onQuickEdit?: (product: Product) => void;
}

export function ProductCatalog({ products, loading, error, onRejectedClick, onEdit, onQuickEdit }: ProductCatalogProps) {
  const [activeTab, setActiveTab] = useState<ProductStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Helper function to map API status to display status (same as ProductCard)
  const getDisplayStatus = (apiStatus: string) => {
    switch (apiStatus) {
      case 'approved': return 'live';
      case 'pending': return 'review';
      case 'rejected': return 'rejected';
      default: return 'draft';
    }
  };

  // Filter products based on active tab and search
  const filteredProducts = products.filter(product => {
    const matchesTab = activeTab === 'all' || getDisplayStatus(product.status) === activeTab;
    const matchesSearch = product.name?.en?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description?.en?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.categories?.[0]?.name?.en === selectedCategory;
    return matchesTab && matchesSearch && matchesCategory;
  });

  // Get unique categories from real products
  const categories = ['all', ...Array.from(new Set(products.map(p => p.categories?.[0]?.name?.en).filter(Boolean)))];

  // Tab configuration with rejected status - count based on mapped display status
  const tabs = [
    { id: 'all' as const, label: 'All Products', count: products.length },
    { id: 'draft' as const, label: 'Drafts', count: products.filter(p => getDisplayStatus(p.status) === 'draft').length },
    { id: 'review' as const, label: 'In Review', count: products.filter(p => getDisplayStatus(p.status) === 'review').length },
    { id: 'live' as const, label: 'Live', count: products.filter(p => getDisplayStatus(p.status) === 'live').length },
    { id: 'rejected' as const, label: 'Rejected', count: products.filter(p => getDisplayStatus(p.status) === 'rejected').length },
  ];

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm mt-6">
      {/* Header */}
      <div className="flex flex-col space-y-1.5 p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">Product Catalog</h3>
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 15-4.3-4.3"></path>
              </svg>
              <input 
                className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-10 w-64" 
                placeholder="Search products..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* Category Filter */}
            <select 
              className="flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-40"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Status Tabs with sidebar-like selection color */}
        <div className="flex space-x-1 border-b">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-t-lg border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-green-500 text-green-600 bg-green-50'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              {tab.id !== 'all' && tab.id in statusConfig && (
                <div className="w-4 h-4">
                  {statusConfig[tab.id as keyof typeof statusConfig].icon}
                </div>
              )}
              <span>{tab.label}</span>
              <span className={`ml-1 px-2 py-0.5 text-xs rounded-full ${
                activeTab === tab.id ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Loading and Error States */}
      {loading && (
        <div className="p-6 pt-4 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600">Loading products...</p>
        </div>
      )}

      {error && !loading && (
        <div className="p-6 pt-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800 text-sm">
              <strong>Error loading products:</strong> {error}
            </p>
          </div>
        </div>
      )}

      {/* Product List */}
      <div className="p-6 pt-4">
        {!loading && !error && filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-package w-6 h-6 text-gray-400">
                <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"></path>
                <path d="M12 22V12"></path>
                <path d="m3.3 7 7.703 4.734a2 2 0 0 0 1.994 0L20.7 7"></path>
                <path d="m7.5 4.27 9 5.15"></path>
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">
              {searchQuery || selectedCategory !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : activeTab === 'all' 
                  ? 'Start by adding your first product'
                  : `No products found in ${activeTab} status`
              }
            </p>
          </div>
        ) : !loading && !error ? (
          <div className="space-y-4">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onRejectedClick={onRejectedClick}
                onEdit={onEdit}
                onQuickEdit={onQuickEdit}
              />
            ))}
          </div>
        ) : null}

        {/* Status-specific action prompts */}
        {filteredProducts.length === 0 && activeTab !== 'all' && (
          <div className="mt-6 text-center">
            {activeTab === 'draft' && (
              <p className="text-sm text-gray-500">
                Draft products are saved automatically. Continue editing to submit for review.
              </p>
            )}
            {activeTab === 'review' && (
              <p className="text-sm text-gray-500">
                Products in review are awaiting approval. Check back soon for updates.
              </p>
            )}
            {activeTab === 'live' && (
              <p className="text-sm text-gray-500">
                Live products are visible to customers and can generate sales.
              </p>
            )}
            {activeTab === 'rejected' && (
              <p className="text-sm text-gray-500">
                Rejected products need attention. Click on any product to view rejection details and resubmit.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 