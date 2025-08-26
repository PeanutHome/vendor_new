export const API_CONFIG = {
  // Note: For local development, you might want to use: BASE_URL: 'http://localhost:5000'
  BASE_URL: 'https://ecommerce-2-cdft.onrender.com',
  ENDPOINTS: {
    LOGIN: '/auth/login',
    REFRESH: '/auth/refresh',
    VENDOR_REGISTER: '/vendors/register',
    VENDOR_PRODUCTS: '/vendors/{vendorId}/products', // Create/update products
    VENDOR_PRODUCTS_LIST: '/vendors/{vendorId}/products', // Get list of vendor's products
    PRODUCT_CATEGORIES: '/products/categories', // Get product categories
    VENDOR_BY_USER: '/vendors/user/{userId}', // Get vendor details by user ID
    VENDOR_PRODUCT_IMMEDIATE_UPDATE: '/vendors/{vendorId}/products/{productId}', // Immediate updates without review
    ADMIN_BRANDS: '/products/brands/list', // Get brands for product creation
  }
} as const;

