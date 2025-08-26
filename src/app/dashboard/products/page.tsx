"use client";
import React, { useState, useEffect, useCallback } from "react";
import { ProductDialog } from "./components/ProductDialog";
import { ImmediateEditDialog } from "./components/ImmediateEditDialog";
import { RejectionDialog } from "./components/RejectionDialog";

import { ProductCatalog } from "./components/ProductCatalog";
import { PRIMARY_GREEN } from "./data/mockData";
import { Product } from "./data/mockData";
import { API_CONFIG } from "@/lib/config";
import { useAuthStore } from "@/lib/auth-store";



export default function ProductsPage() {
  // Temporarily removed auth requirement for testing
  // const { user, accessToken } = useAuthStore();
  // if (!user || !accessToken) {
  //   return <div>Please log in to access this page.</div>;
  // }

  // State for products
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for dialogs
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [immediateEditDialogOpen, setImmediateEditDialogOpen] = useState(false);
  const [quickEditingProduct, setQuickEditingProduct] = useState<any>(null);
  const [rejectionDialogOpen, setRejectionDialogOpen] = useState(false);
  const [selectedRejectedProduct, setSelectedRejectedProduct] = useState<any>(null);

  
  // Get auth token and vendor ID
  const { accessToken, vendorId, fetchVendorDetails } = useAuthStore();
  
  // Check if we're waiting for vendor ID
  const isWaitingForVendor = !vendorId && accessToken;

                  // Fetch real products from API
    const fetchProducts = useCallback(async () => {
     if (!accessToken) {
       console.log('⏳ Waiting for authentication...');
       setLoading(false);
       return;
     }
     
     if (!vendorId) {
       console.log('⏳ Waiting for vendor ID...');
       setLoading(false);
       return;
     }
     
     try {
       setLoading(true);
       setError(null);
       
       // Use dynamic vendor ID from auth store
       const apiUrl = `${API_CONFIG.BASE_URL}/vendors/${vendorId}/products`;
       
       console.log('🚀 Fetching products from:', apiUrl);
       console.log('👤 Vendor ID:', vendorId);
       console.log('🔑 Token available:', !!accessToken);
      
             const headers = {
               'Authorization': `Bearer ${accessToken}`,
             };

             const response = await fetch(apiUrl, {
               method: 'GET',
               headers,
             });

             if (!response.ok) {
               throw new Error(`HTTP error! status: ${response.status}`);
             }

             const data = await response.json();
      console.log('📦 Products fetched successfully:', data);
      
      if (data.data && Array.isArray(data.data)) {
        setProducts(data.data);
        console.log('✅ Products loaded:', data.data.length);
        console.log('📊 Pagination:', data.pagination);
      } else if (Array.isArray(data)) {
        // Handle case where response is directly an array
        setProducts(data);
        console.log('✅ Products loaded (direct array):', data.length);
      } else {
        console.warn('⚠️ No products data found in response');
        setProducts([]);
      }
      
         } catch (err) {
       console.error('❌ Error fetching products:', err);
       
       // Show user-friendly error messages instead of technical HTTP errors
       let userFriendlyError = 'Failed to fetch products';
       
       if (err instanceof Error) {
         if (err.message.includes('HTTP error! status: 500')) {
           userFriendlyError = 'Server is experiencing issues. Please try again later.';
         } else if (err.message.includes('HTTP error! status: 404')) {
           userFriendlyError = 'Products not found. Please check your account.';
         } else if (err.message.includes('HTTP error! status: 401')) {
           userFriendlyError = 'Please log in again to access your products.';
         } else if (err.message.includes('HTTP error! status: 403')) {
           userFriendlyError = 'Access denied. Please check your permissions.';
         } else if (err.message.includes('Failed to fetch')) {
           userFriendlyError = 'Connection problem. Please check your internet and try again.';
         } else if (err.message.includes('Network error')) {
           userFriendlyError = 'Network connection issue. Please try again.';
         } else {
           // For other errors, show a generic but helpful message
           userFriendlyError = 'Unable to load products. Please refresh the page or try again later.';
         }
       }
       
       setError(userFriendlyError);
       setProducts([]);
           } finally {
        setLoading(false);
      }
    }, [accessToken, vendorId]);

  useEffect(() => {
    console.log('✅ ProductsPage component mounted successfully');
    console.log('📍 Current URL:', typeof window !== 'undefined' ? window.location.href : 'server-side');
    
    // Add global error handler for images
    const handleImageError = (event: ErrorEvent) => {
      if (event.error?.message?.includes('Invalid src prop') || event.error?.message?.includes('next/image')) {
        console.warn('Image loading error caught:', event.error.message);
        event.preventDefault();
        return false;
      }
    };

    // Add global error handler
    window.addEventListener('error', handleImageError);
    
    // Cleanup
    return () => {
      window.removeEventListener('error', handleImageError);
    };
  }, []);

  // Effect to fetch vendor details when we have access token but no vendor ID
  useEffect(() => {
    if (accessToken && !vendorId) {
      console.log('🔄 Fetching vendor details...');
      fetchVendorDetails();
    }
  }, [accessToken, vendorId, fetchVendorDetails]);

  // Effect to fetch products when we have both access token and vendor ID
  useEffect(() => {
    if (accessToken && vendorId) {
      fetchProducts();
    }
  }, [accessToken, vendorId, fetchProducts]);

  const handleRejectedProductClick = (product: Product) => {
    setSelectedRejectedProduct(product);
    setRejectionDialogOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setDialogOpen(true);
  };

  const handleQuickEditProduct = (product: any) => {
    setQuickEditingProduct(product);
    setImmediateEditDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingProduct(null);
  };

  const handleCloseImmediateEditDialog = () => {
    setImmediateEditDialogOpen(false);
    setQuickEditingProduct(null);
  };

  const handleAddNewProduct = () => {
    console.log('🚀 Add Product button clicked');
    console.log('📝 Will use endpoint:', API_CONFIG.ENDPOINTS.VENDOR_PRODUCTS);
    console.log('📦 Product data structure will be FormData with:');
    console.log('   - productData (JSON)');
    console.log('   - images (files)');
    
    setEditingProduct(null);
    setDialogOpen(true);
  };

  const handleResubmit = () => {
    // Find the product by ID and open edit dialog
    const productToEdit = selectedRejectedProduct;
    if (productToEdit) {
      setRejectionDialogOpen(false);
      setSelectedRejectedProduct(null);
      setEditingProduct(productToEdit);
      setDialogOpen(true);
    }
  };

  return (
    <main className="flex-1 py-6">
      <ProductDialog 
        open={dialogOpen} 
        onClose={handleCloseDialog}
        product={editingProduct}
      />
      <ImmediateEditDialog 
        product={quickEditingProduct}
        open={immediateEditDialogOpen}
        onClose={handleCloseImmediateEditDialog}
        onSuccess={() => {
          // Refresh products after successful immediate edit
          fetchProducts();
        }}
      />
      <RejectionDialog 
        product={selectedRejectedProduct}
        open={rejectionDialogOpen}
        onClose={() => {
          setRejectionDialogOpen(false);
          setSelectedRejectedProduct(null);
        }}
        onResubmit={handleResubmit}
      />
      
      <div className="space-y-6">
        {/* Header and Add Product Button */}
                 <div className="flex items-center justify-between">
           <div>
             <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
                            <p className="text-gray-600 mt-1">
                 Manage your products through the complete workflow: Draft → Review → Live
                 {isWaitingForVendor && (
                   <span className="ml-2 text-yellow-600 font-medium">
                     • Loading vendor information...
                   </span>
                 )}
                 {!loading && !isWaitingForVendor && products.length > 0 && (
                   <span className="ml-2 text-green-600 font-medium">
                     • {products.length} products loaded
                   </span>
                 )}
               </p>
             {/* Temporarily removed user welcome message for testing */}
           </div>
                      <div className="flex items-center gap-3">
              <button
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download w-4 h-4">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7,10 12,15 17,10"/>
                  <line x1="12" x2="12" y1="15" y2="3"/>
                </svg>
                Export
              </button>
              {/* Temporarily removed logout button for testing */}
                             <button
                 onClick={() => fetchProducts()}
                 disabled={loading}
                 className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-blue-300 bg-blue-50 hover:bg-blue-100 text-blue-700 h-10 px-4 py-2"
               >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-refresh-cw w-4 h-4">
                  <path d="M3 12a9 9 0 0 1 9-9 9.75 9 75 0 0 1 6.74 2.74L21 8"/>
                  <path d="M21 3v5h-5"/>
                  <path d="M21 12a9 9 0 0 1-9 9 9.75 9 75 0 0 1-6.74-2.74L3 16"/>
                  <path d="M3 21v-5h5"/>
                </svg>
                {loading ? 'Loading...' : 'Refresh'}
              </button>
            <button
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary-foreground shadow h-10 px-4 py-2"
              style={{ backgroundColor: PRIMARY_GREEN, color: 'white' }}
              onClick={handleAddNewProduct}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus w-4 h-4">
                <path d="M5 12h14"></path>
                <path d="M12 5v14"></path>
              </svg>
              Add Product
            </button>
          </div>
        </div>



        {/* Summary Cards */}
        {/* <SummaryCards /> */}

        {/* Recent Activity & Quick Actions Row */}
        {/* <div className="flex flex-col md:flex-row gap-4 mt-6">
          <RecentActivity />
          <QuickActions />
        </div> */}

        {/* Product Catalog Section */}
          <ProductCatalog 
            products={products}
            loading={loading || !!isWaitingForVendor}
            error={error}
            onRejectedClick={handleRejectedProductClick}
            onEdit={handleEditProduct}
            onQuickEdit={handleQuickEditProduct}
          />
      </div>
    </main>
  );
}
