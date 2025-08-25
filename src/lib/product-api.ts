import { API_CONFIG } from './config';
import { useAuthStore } from './auth-store';

export interface ProductVariant {
  sku: string;
  attributes: {
    color: string;
    size: string;
  };
  price: number;
  stock: number;
  lowStockThreshold: number; // ✅ ADDED: Low stock threshold
}

export interface ProductDimensions {
  length: number;
  width: number;
  height: number;
}

export interface ProductData {
  id?: string;
  name: {
    en: string;
    my: string;
  };
  subtitle: string;
  description: {
    en: string;
    my: string;
  };
  brandId: string;
  hsnCode: string;
  modelNumber: string;
  sku: string; // ✅ ADDED: SKU field
  gender: string[];
  keyFeatures: string[];
  howToUse: string;
  ingredients: string;
  material: string;
  variants: ProductVariant[];
  mrp: number;
  price: number;
  sellingPrice: number;
  taxClass: string;
  discount: number;
  lowStockThreshold: number;
  categoryIds: string[];
  searchTags: string[];
  colors: string[];
  sizes: string[];
  occasions: string[];
  materials: string[];
  isEcoFriendly: boolean;
  isOrganic: boolean;
  bestFor: string[];
  codAvailable: boolean;
  dispatchTime: string;
  returnPolicy: string;
  dimensions: ProductDimensions;
  netWeight: number;
  packType: string;
  inStock: boolean;
  videoUrl: string;
  videoType: string;
  images?: (string | File)[]; // Optional array of image URLs, base64 strings, or File objects
  metaTitle: string;
  metaDescription: string;
  internalNotes: string;
  isLive: boolean;
  showInNewArrivals: boolean;
  featureOnHomepage: boolean;
  productTypes: string[];
}

export const useProductAPI = () => {
  const createProduct = async (
    productData: ProductData
  ): Promise<{ success: boolean; message?: string; error?: string; productId?: string }> => {
    try {
      const { accessToken, user } = useAuthStore.getState();
      
      if (!accessToken) {
        console.error('❌ No access token available');
        return {
          success: false,
          error: 'No access token available. Please log in again.',
        };
      }

      if (!user || !user.id) {
        console.error('❌ No user ID available');
        return {
          success: false,
          error: 'No user ID available. Please log in again.',
        };
      }

      const vendorId = user.id;
      const apiUrl = `${API_CONFIG.BASE_URL}/vendors/${vendorId}/products`;
      console.log('🚀 Creating product for vendor:', vendorId);
      console.log('🌐 API URL:', apiUrl);
      console.log('📦 Product data:', productData);
      console.log('🔑 Access Token (first 20 chars):', accessToken.substring(0, 20) + '...');

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      };
      
      console.log('📋 Headers being sent:', headers);
      console.log('🔑 Full Authorization header:', `Bearer ${accessToken}`);
      console.log('🔑 Access token length:', accessToken.length);
      
      // Extract images from productData and create FormData
      const { images, ...productDataWithoutImages } = productData;
      const formData = new FormData();
      
      // Add product data as JSON string
      formData.append('productData', JSON.stringify(productDataWithoutImages));
      
      // Add images separately as files
      if (images && images.length > 0) {
        images.forEach((image, _index) => {
          if (image instanceof File) {
            formData.append(`images`, image);
          }
        });
        console.log('📸 Images added to FormData:', images.length, 'files');
      }

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers,
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();

      console.log('✅ Product created successfully:', responseData);

      return {
        success: true,
        message: 'Product created successfully!',
        productId: responseData.productId || responseData.id,
      };

    } catch (error: unknown) {
      console.error('💥 Error creating product:', error);
      
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        return {
          success: false,
          error: 'Network error: Unable to reach the server',
        };
      }
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create product',
      };
    }
  };

  const updateProduct = async (
    productId: string,
    productData: Partial<ProductData>
  ): Promise<{ success: boolean; message?: string; error?: string }> => {
    try {
      const { accessToken, user } = useAuthStore.getState();
      
      if (!accessToken) {
        console.error('❌ No access token available');
        return {
          success: false,
          error: 'No access token available. Please log in again.',
        };
      }

      if (!user || !user.id) {
        console.error('❌ No user ID available');
        return {
          success: false,
          error: 'No user ID available. Please log in again.',
        };
      }

      const vendorId = user.id;
      console.log('🔄 Updating product:', productId);
      console.log('📦 Update data:', productData);

      const headers = {
        'Authorization': `Bearer ${accessToken}`,
      };

      // Extract images from productData and create FormData
      const { images, ...productDataWithoutImages } = productData;
      const formData = new FormData();
      
      // Add product data as JSON string
      formData.append('productData', JSON.stringify(productDataWithoutImages));
      
      // Add images separately as files
      if (images && images.length > 0) {
        images.forEach((image, _index) => {
          if (image instanceof File) {
            formData.append(`images`, image);
          }
        });
        console.log('📸 Images added to FormData for update:', images.length, 'files');
      }

      const response = await fetch(`${API_CONFIG.BASE_URL}/vendors/${vendorId}/products/${productId}`, {
        method: 'PUT',
        headers,
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log('✅ Product updated successfully');
      return {
        success: true,
        message: 'Product updated successfully!',
      };

    } catch (error: unknown) {
      console.error('💥 Error updating product:', error);
      
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        return {
          success: false,
          error: 'Network error: Unable to reach the server',
        };
      }
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update product',
      };
    }
  };

  const deleteProduct = async (
    productId: string
  ): Promise<{ success: boolean; message?: string; error?: string }> => {
    try {
      const { accessToken, user } = useAuthStore.getState();
      
      if (!accessToken) {
        console.error('❌ No access token available');
        return {
          success: false,
          error: 'No access token available. Please log in again.',
        };
      }

      if (!user || !user.id) {
        console.error('❌ No user ID available');
        return {
          success: false,
          error: 'No user ID available. Please log in again.',
        };
      }

      const vendorId = user.id;
      console.log('🗑️ Deleting product:', productId);

      const headers = {
        'Authorization': `Bearer ${accessToken}`,
      };

      const response = await fetch(`${API_CONFIG.BASE_URL}/vendors/${vendorId}/products/${productId}`, {
        method: 'DELETE',
        headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log('✅ Product deleted successfully');
      return {
        success: true,
        message: 'Product deleted successfully!',
      };

    } catch (error: unknown) {
      console.error('💥 Error deleting product:', error);
      
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        return {
          success: false,
          error: 'Network error: Unable to reach the server',
        };
      }
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete product',
      };
    }
  };

  const getProducts = async (
    page: number = 1,
    limit: number = 10
  ): Promise<{ success: boolean; products?: ProductData[]; error?: string; total?: number }> => {
    try {
      const { accessToken, user } = useAuthStore.getState();
      
      if (!accessToken) {
        console.error('❌ No access token available');
        return {
          success: false,
          error: 'No access token available. Please log in again.',
        };
      }

      if (!user || !user.id) {
        console.error('❌ No user ID available');
        return {
          success: false,
          error: 'No user ID available. Please log in again.',
        };
      }

      const vendorId = user.id;
      console.log('📋 Fetching products for vendor:', vendorId);

      const headers = {
        'Authorization': `Bearer ${accessToken}`,
      };

      const response = await fetch(`${API_CONFIG.BASE_URL}/vendors/${vendorId}/products?page=${page}&limit=${limit}`, {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();

      console.log('✅ Products fetched successfully:', responseData);

      return {
        success: true,
        products: responseData.products || responseData.data || [],
        total: responseData.total || responseData.count || 0,
      };

    } catch (error: unknown) {
      console.error('💥 Error fetching products:', error);
      
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        return {
          success: false,
          error: 'Network error: Unable to reach the server',
        };
      }
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch products',
      };
    }
  };

    const getProduct = async (
    productId: string
  ): Promise<{ success: boolean; product?: ProductData; error?: string }> => {
    try {
      const { accessToken, user } = useAuthStore.getState();
      
      if (!accessToken) {
        console.error('❌ No access token available');
        return {
          success: false,
          error: 'No access token available. Please log in again.',
        };
      }

      if (!user || !user.id) {
        console.error('❌ No user ID available');
        return {
          success: false,
          error: 'No user ID available. Please log in again.',
        };
      }

      const vendorId = user.id;
      console.log('📋 Fetching product:', productId);

      const headers = {
        'Authorization': `Bearer ${accessToken}`,
      };

      const response = await fetch(`${API_CONFIG.BASE_URL}/vendors/${vendorId}/products/${productId}`, {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const product = await response.json();

      console.log('✅ Product fetched successfully:', product);

      return {
        success: true,
        product,
      };

    } catch (error: unknown) {
      console.error('💥 Error fetching product:', error);
      
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        return {
          success: false,
          error: 'Network error: Unable to reach the server',
        };
      }
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch product',
      };
    }
  };

  const submitForReview = async (
    productId: string,
    reviewData?: {
      notes?: string;
      priority?: 'low' | 'medium' | 'high';
      category?: string;
    }
  ): Promise<{ success: boolean; message?: string; error?: string; reviewId?: string }> => {
    try {
      const { accessToken, user } = useAuthStore.getState();
      
      if (!accessToken) {
        console.error('❌ No access token available');
        return {
          success: false,
          error: 'No access token available. Please log in again.',
        };
      }

      if (!user || !user.id) {
        console.error('❌ No user ID available');
        return {
          success: false,
          error: 'No user ID available. Please log in again.',
        };
      }

      const vendorId = user.id;
      const apiUrl = `${API_CONFIG.BASE_URL}/vendors/${vendorId}/products/${productId}/review`;
      console.log('🔍 Submitting product for review:', productId);
      console.log('👤 Vendor ID:', vendorId);
      console.log('🌐 API URL:', apiUrl);
      console.log('📝 Review data:', reviewData);
      console.log('🔑 Access Token (first 20 chars):', accessToken.substring(0, 20) + '...');

      const payload = {
        action: 'submit_for_review',
        ...reviewData
      };

      console.log('📦 Payload being sent:', payload);

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      };
      
      console.log('📋 Headers being sent:', headers);
      console.log('🔑 Full Authorization header:', `Bearer ${accessToken}`);
      console.log('🔑 Access token length:', accessToken.length);
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();

      console.log('✅ Product submitted for review successfully:', responseData);
      console.log('🎯 Review ID:', responseData.reviewId || responseData.id);

      return {
        success: true,
        message: 'Product submitted for review successfully!',
        reviewId: responseData.reviewId || responseData.id,
      };

    } catch (error: unknown) {
      console.error('💥 Error submitting product for review:', error);
      console.error('💥 Error type:', error instanceof Error ? error.constructor.name : typeof error);
      console.error('💥 Error message:', error instanceof Error ? error.message : 'Unknown error');
      
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        return {
          success: false,
          error: 'Network error: Unable to reach the server',
        };
      }
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to submit product for review',
      };
    }
  };

  return {
    createProduct,
    updateProduct,
    updateProductImmediate,
    deleteProduct,
    getProducts,
    getProduct,
    submitForReview,
  };
};

// New function for immediate updates without admin review
export const updateProductImmediate = async (
  vendorId: string,
  productId: string,
  immediateFields: {
    gender?: string[];
    keyFeatures?: string[];
    variants?: Array<{
      sku: string;
      attributes: {
        color: string;
        size: string;
      };
      price: number;
      stock: number;
    }>;
    mrp?: number;
    sellingPrice?: number;
    discount?: number;
    categoryIds?: string[];
    searchTags?: string[];
    colors?: string[];
    sizes?: string[];
    codAvailable?: boolean;
    dispatchTime?: string;
    returnPolicy?: string;
  }
): Promise<{ success: boolean; message?: string; error?: string }> => {
  try {
    const { accessToken } = useAuthStore.getState();
    
    if (!accessToken) {
      console.error('❌ No access token available');
      return {
        success: false,
        error: 'No access token available. Please log in again.',
      };
    }

    console.log('🚀 Immediate update for product:', productId);
    console.log('📦 Immediate fields:', immediateFields);

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    };

    const response = await fetch(`${API_CONFIG.BASE_URL}/vendors/${vendorId}/products/${productId}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(immediateFields),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log('✅ Product updated immediately without review');
    return {
      success: true,
      message: 'Product updated immediately without review!',
    };

  } catch (error: unknown) {
    console.error('💥 Error in immediate product update:', error);
    
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      return {
        success: false,
        error: 'Network error: Unable to reach the server',
      };
    }
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update product immediately',
    };
  }
};
