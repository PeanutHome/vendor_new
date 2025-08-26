"use client";
import React, { useState, useEffect } from "react";
import { updateProductImmediate } from "@/lib/product-api";
import { useAuthStore } from "@/lib/auth-store";
import { 
  Gender, 
  DispatchTime, 
  ReturnPolicy, 
  PackType, 
  Language, 
  ProductStatus, 
  ProductType 
} from "@/lib/enums";
import { API_CONFIG } from "@/lib/config";

interface ImmediateEditDialogProps {
  open: boolean;
  onClose: () => void;
  product: any;
  onSuccess?: () => void;
}

export function ImmediateEditDialog({ open, onClose, product, onSuccess }: ImmediateEditDialogProps) {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Log user info when component mounts
  useEffect(() => {
    if (user) {
      console.log('👤 Current user in Quick Edit:', user);
      console.log('🆔 User ID:', user.id);
    }
  }, [user]);

  // Form state for immediate edit fields
  const [gender, setGender] = useState<string[]>([]);
  const [keyFeatures, setKeyFeatures] = useState<string[]>([]);
  const [variants, setVariants] = useState<Array<{
    sku: string;
    attributes: { color: string; size: string };
    price: number;
    stock: number;
  }>>([]);
  const [mrp, setMrp] = useState<string>("");
  const [sellingPrice, setSellingPrice] = useState<string>("");
  const [discount, setDiscount] = useState<string>("");
  const [categoryIds, setCategoryIds] = useState<string[]>([]);
  const [searchTags, setSearchTags] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [codAvailable, setCodAvailable] = useState(false);
  const [dispatchTime, setDispatchTime] = useState("");
  const [returnPolicy, setReturnPolicy] = useState("");
  const [packType, setPackType] = useState<string>("");
  const [language, setLanguage] = useState<string>("");
  const [productStatus, setProductStatus] = useState<string>("");
  const [productType, setProductType] = useState<string>("");

  // Temporary state for adding new items
  const [newKeyFeature, setNewKeyFeature] = useState("");
  const [newSearchTag, setNewSearchTag] = useState("");
  const [newColor, setNewColor] = useState("");
  const [newSize, setNewSize] = useState("");

  // Initialize form when product changes
  useEffect(() => {
    if (product && open) {
      console.log('📱 Quick Edit Dialog opened for product:', product);
      console.log('🆔 Product ID:', product.id);
      console.log('📝 Product Name:', product.name);
      
      setGender(product.gender || []);
      setKeyFeatures(product.keyFeatures || []);
      setVariants(product.variants || []);
      setMrp(product.mrp?.toString() || "");
      setSellingPrice(product.sellingPrice?.toString() || "");
      setDiscount(product.discount?.toString() || "");
      setCategoryIds(product.categoryIds || []);
      setSearchTags(product.searchTags || []);
      setColors(product.colors || []);
      setSizes(product.sizes || []);
      setCodAvailable(product.codAvailable || false);
      setDispatchTime(product.dispatchTime || "");
      setReturnPolicy(product.returnPolicy || "");
      setPackType(product.packType || "");
      setLanguage(product.language || "");
      setProductStatus(product.productStatus || "");
      setProductType(product.productType || "");
      
      console.log('📊 Form initialized with current values');
    }
  }, [product, open]);

  const handleSubmit = async () => {
    if (!product?.id || !user?.id) {
      setError("No product ID or user ID available");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const immediateFields = {
        gender,
        keyFeatures,
        variants,
        mrp: parseFloat(mrp) || 0,
        sellingPrice: parseFloat(sellingPrice) || 0,
        discount: parseFloat(discount) || 0,
        categoryIds,
        searchTags,
        colors,
        sizes,
        codAvailable,
        dispatchTime,
        returnPolicy,
        packType,
        language,
        productStatus,
        productType,
      };

      console.log('🚀 Quick Edit - Starting immediate update...');
      console.log('👤 User ID:', user.id);
      console.log('📦 Product ID:', product.id);
      console.log('🔗 API Endpoint:', `${API_CONFIG.BASE_URL}/vendors/${user.id}/products/${product.id}`);
      console.log('🔗 Full URL:', `${API_CONFIG.BASE_URL}/vendors/${user.id}/products/${product.id}`);
      console.log('📋 Fields to update:', immediateFields);
      console.log('🔑 Bearer token will be included automatically');
      console.log('📡 HTTP Method: PATCH (as defined in updateProductImmediate)');

      const result = await updateProductImmediate(user.id, product.id, immediateFields);
      
      if (result.success) {
        console.log('✅ Quick edit successful!');
        alert(result.message || "Product updated immediately!");
        onSuccess?.();
        onClose();
      } else {
        console.error('❌ Quick edit failed:', result.error);
        setError(result.error || "Failed to update product");
      }
    } catch (error) {
      console.error('💥 Unexpected error in quick edit:', error);
      setError("An unexpected error occurred");
      console.error("Error updating product:", error);
    } finally {
      setLoading(false);
    }
  };

  const addKeyFeature = () => {
    if (newKeyFeature.trim() && !keyFeatures.includes(newKeyFeature.trim())) {
      setKeyFeatures([...keyFeatures, newKeyFeature.trim()]);
      setNewKeyFeature("");
    }
  };

  const removeKeyFeature = (index: number) => {
    setKeyFeatures(keyFeatures.filter((_, i) => i !== index));
  };

  const addSearchTag = () => {
    if (newSearchTag.trim() && !searchTags.includes(newSearchTag.trim())) {
      setSearchTags([...searchTags, newSearchTag.trim()]);
      setNewSearchTag("");
    }
  };

  const removeSearchTag = (index: number) => {
    setSearchTags(searchTags.filter((_, i) => i !== index));
  };

  const addColor = () => {
    if (newColor.trim() && !colors.includes(newColor.trim())) {
      setColors([...colors, newColor.trim()]);
      setNewColor("");
    }
  };

  const removeColor = (index: number) => {
    setColors(colors.filter((_, i) => i !== index));
  };

  const addSize = () => {
    if (newSize.trim() && !sizes.includes(newSize.trim())) {
      setSizes([...sizes, newSize.trim()]);
      setNewSize("");
    }
  };

  const removeSize = (index: number) => {
    setSizes(sizes.filter((_, i) => i !== index));
  };

  const addVariant = () => {
    const newVariant = {
      sku: `VAR-${Date.now()}`,
      attributes: { color: "", size: "" },
      price: 0,
      stock: 0,
    };
    setVariants([...variants, newVariant]);
  };

  const updateVariant = (index: number, field: string, value: any) => {
    const updatedVariants = [...variants];
    if (field === 'color' || field === 'size') {
      (updatedVariants[index].attributes as any)[field] = value;
    } else if (field === 'price' || field === 'stock' || field === 'sku') {
      (updatedVariants[index] as any)[field] = value;
    }
    setVariants(updatedVariants);
  };

  const removeVariant = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  if (!open) return null;

  // Helper function to get product name safely
  const getProductName = () => {
    if (!product) return 'Unnamed Product';
    if (typeof product.name === 'string') return product.name;
    if (product.name && typeof product.name === 'object' && 'en' in product.name) {
      return (product.name as any).en || 'Unnamed Product';
    }
    return 'Unnamed Product';
  };

  return (
    <>
      {/* Overlay */}
      <div
        data-state="open"
        className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        style={{ pointerEvents: 'auto' }}
        aria-hidden="true"
        onClick={onClose}
      />
      {/* Dialog */}
      <div
        role="dialog"
        className="fixed left-1/2 top-1/2 z-50 grid w-full max-w-4xl translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-0 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg max-h-[90vh] overflow-y-auto"
        tabIndex={-1}
        style={{ pointerEvents: 'auto' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col space-y-1.5 text-center sm:text-left px-6 pt-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg font-semibold leading-none tracking-tight">
                Quick Edit - {getProductName()}
              </h2>
              <p className="text-sm text-muted-foreground">
                Update essential product details quickly and efficiently.
              </p>
            </div>
            <button
              onClick={onClose}
              className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x h-4 w-4"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
              <span className="sr-only">Close</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="px-6 py-3 mx-6 rounded-lg border bg-red-50 border-red-200 text-red-800">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">{error}</span>
            </div>
          </div>
        )}

        <div className="px-6 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender
              </label>
              <div className="space-y-2">
                {Object.values(Gender).map((g) => (
                  <label key={g} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={gender.includes(g)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setGender([...gender, g]);
                        } else {
                          setGender(gender.filter(gen => gen !== g));
                        }
                      }}
                      className="mr-2"
                    />
                    {g.charAt(0).toUpperCase() + g.slice(1)}
                  </label>
                ))}
              </div>
            </div>

            {/* Key Features */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Key Features
              </label>
              <div className="space-y-2">
                {keyFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="text-sm">{feature}</span>
                    <button
                      onClick={() => removeKeyFeature(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newKeyFeature}
                    onChange={(e) => setNewKeyFeature(e.target.value)}
                    placeholder="Add new feature"
                    className="flex-1 px-3 py-1 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  />
                  <button
                    onClick={addKeyFeature}
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-blue-300 bg-blue-50 hover:bg-blue-100 text-blue-700 h-8 px-3 py-1"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

            {/* MRP, Selling Price, Discount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                MRP (MMK)
              </label>
              <input
                type="number"
                value={mrp}
                onChange={(e) => setMrp(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Selling Price (MMK)
              </label>
              <input
                type="number"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Discount (%)
              </label>
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              />
            </div>

            {/* COD Available */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                COD Available
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={codAvailable}
                  onChange={(e) => setCodAvailable(e.target.checked)}
                  className="mr-2"
                />
                Available
              </label>
            </div>

            {/* Dispatch Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dispatch Time
              </label>
              <select
                value={dispatchTime}
                onChange={(e) => setDispatchTime(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <option value="">Select dispatch time</option>
                {Object.values(DispatchTime).map(dt => (
                  <option key={dt} value={dt}>{dt}</option>
                ))}
              </select>
            </div>

            {/* Return Policy */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Return Policy
              </label>
              <select
                value={returnPolicy}
                onChange={(e) => setReturnPolicy(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <option value="">Select return policy</option>
                {Object.values(ReturnPolicy).map(rp => (
                  <option key={rp} value={rp}>{rp}</option>
                ))}
              </select>
            </div>

            {/* Pack Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pack Type
              </label>
              <select
                value={packType}
                onChange={(e) => setPackType(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <option value="">Select pack type</option>
                {Object.values(PackType).map(pt => (
                  <option key={pt} value={pt}>{pt}</option>
                ))}
              </select>
            </div>

            {/* Language */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <option value="">Select language</option>
                {Object.values(Language).map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>

            {/* Product Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Status
              </label>
              <select
                value={productStatus}
                onChange={(e) => setProductStatus(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <option value="">Select product status</option>
                {Object.values(ProductStatus).map(ps => (
                  <option key={ps} value={ps}>{ps}</option>
                ))}
              </select>
            </div>

            {/* Product Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Type
              </label>
              <select
                value={productType}
                onChange={(e) => setProductType(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <option value="">Select product type</option>
                {Object.values(ProductType).map(pt => (
                  <option key={pt} value={pt}>{pt}</option>
                ))}
              </select>
            </div>

            {/* Search Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Tags
              </label>
              <div className="space-y-2">
                {searchTags.map((tag, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="text-sm bg-gray-100 px-2 py-1 rounded">{tag}</span>
                    <button
                      onClick={() => removeSearchTag(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newSearchTag}
                    onChange={(e) => setNewSearchTag(e.target.value)}
                    placeholder="Add new tag"
                    className="flex-1 px-3 py-1 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  />
                  <button
                    onClick={addSearchTag}
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-blue-300 bg-blue-50 hover:bg-blue-100 text-blue-700 h-8 px-3 py-1"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

            {/* Colors */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Colors
              </label>
              <div className="space-y-2">
                {colors.map((color, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="text-sm">{color}</span>
                    <button
                      onClick={() => removeColor(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newColor}
                    onChange={(e) => setNewColor(e.target.value)}
                    placeholder="Add new color"
                    className="flex-1 px-3 py-1 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  />
                  <button
                    onClick={addColor}
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-blue-300 bg-blue-50 hover:bg-blue-100 text-blue-700 h-8 px-3 py-1"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

            {/* Sizes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sizes
              </label>
              <div className="space-y-2">
                {sizes.map((size, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="text-sm">{size}</span>
                    <button
                      onClick={() => removeSize(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newSize}
                    onChange={(e) => setNewSize(e.target.value)}
                    placeholder="Add new size"
                    className="flex-1 px-3 py-1 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  />
                  <button
                    onClick={addSize}
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-blue-300 bg-blue-50 hover:bg-blue-100 text-blue-700 h-8 px-3 py-1"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Variants Section */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Variants</h3>
              <button
                onClick={addVariant}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-green-300 bg-green-50 hover:bg-green-100 text-green-700 h-10 px-4 py-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"/>
                  <path d="M12 5v14"/>
                </svg>
                Add Variant
              </button>
            </div>
            
            <div className="space-y-4">
              {variants.map((variant, index) => (
                <div key={index} className="border rounded-lg p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                    <input
                      type="text"
                      value={variant.attributes.color}
                      onChange={(e) => updateVariant(index, 'color', e.target.value)}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
                    <input
                      type="text"
                      value={variant.attributes.size}
                      onChange={(e) => updateVariant(index, 'size', e.target.value)}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price (MMK)</label>
                    <input
                      type="number"
                      value={variant.price}
                      onChange={(e) => updateVariant(index, 'price', parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    />
                  </div>
                  <div className="flex items-end gap-2">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                      <input
                        type="number"
                        value={variant.stock}
                        onChange={(e) => updateVariant(index, 'stock', parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      />
                    </div>
                    <button
                      onClick={() => removeVariant(index)}
                      className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-red-300 bg-red-50 hover:bg-red-100 text-red-700 h-10 px-4 py-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6 6 18"/>
                        <path d="m6 6 12 12"/>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-6 border-t">
            <button
              onClick={onClose}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-white shadow h-10 px-4 py-2"
              style={{ backgroundColor: '#22C55E' }}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 12l2 2 4-4"/>
                    <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
                    <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
                    <path d="M21 12c0 2.5-2 4.5-4.5 4.5S12 14.5 12 12s2-4.5 4.5-4.5S21 9.5 21 12z"/>
                  </svg>
                  Update Immediately
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
