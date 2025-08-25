import React, { useState, useEffect } from "react";
import { API_CONFIG } from "@/lib/config";
import { Gender } from "@/lib/enums";

// Type for API brand structure
interface APIBrand {
  id: string;
  name: string;
  logo: string | null;
  description: string;
  website: string;
  country: string;
  isApproved: boolean;
  isActive: boolean;
  productCount: number;
  rejectionReason: string | null;
  rejectedAt: string | null;
  rejectedBy: string | null;
  approvedAt: string;
  approvedBy: string;
  createdAt: string;
  updatedAt: string;
}

interface ProductInformationProps {
  productNameEn: string;
  setProductNameEn: (value: string) => void;
  productNameMy: string;
  setProductNameMy: (value: string) => void;
  productSubtitle: string;
  setProductSubtitle: (value: string) => void;
  brandId: string;
  setBrandId: (value: string) => void;
  hsnCode: string;
  setHsnCode: (value: string) => void;
  modelNumber: string;
  setModelNumber: (value: string) => void;
  sku: string;
  setSku: (value: string) => void;
  gender: string[];
  setGender: (value: string[]) => void;
}

export function ProductInformation({
  productNameEn,
  setProductNameEn,
  productNameMy,
  setProductNameMy,
  productSubtitle,
  setProductSubtitle,
  brandId,
  setBrandId,
  hsnCode,
  setHsnCode,
  modelNumber,
  setModelNumber,
  sku,
  setSku,
  gender,
  setGender,
}: ProductInformationProps) {
  const [brands, setBrands] = useState<APIBrand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const genderOptions = [Gender.MEN, Gender.WOMEN, Gender.UNISEX, Gender.KIDS, Gender.BABY];

  // Fetch brands from API
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoading(true);
        
        console.log('🔑 Attempting to fetch brands...');
        
        const apiUrl = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ADMIN_BRANDS}`;
        console.log('🌐 Brands API URL:', apiUrl);
        
        const response = await fetch(apiUrl);
        
        console.log('📡 Brands API Response Status:', response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('❌ Brands API Error Response:', errorText);
          throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
        }
        
        const data = await response.json();
        console.log('🏷️ Brands fetched from API:', data);
        
        // Handle the new brand structure - direct array response
        let brandsArray = [];
        if (Array.isArray(data)) {
          brandsArray = data;
        } else if (data.data && Array.isArray(data.data)) {
          brandsArray = data.data;
        } else {
          console.warn('⚠️ Unexpected brands API response structure:', data);
          brandsArray = [];
        }
        
        console.log('🏷️ Processed brands array:', brandsArray);
        setBrands(brandsArray);
      } catch (err) {
        console.error('❌ Error fetching brands:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch brands');
      } finally {
        setLoading(false);
      }
    };

    // Fetch brands immediately when component mounts
    fetchBrands();
  }, []); // No dependencies needed

  const handleGenderChange = (selectedGender: string) => {
    if (gender.includes(selectedGender)) {
      setGender(gender.filter(g => g !== selectedGender));
    } else {
      setGender([...gender, selectedGender]);
    }
  };

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm px-0 overflow-hidden">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight">2. Product Core Information</h3>
      </div>
      <div className="p-6 pt-0 space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Product Title (English) * ({productNameEn.length}/100)
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus:border-[#00B14F] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              placeholder="Enter product title in English"
              maxLength={100}
              value={productNameEn}
              onChange={e => setProductNameEn(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Product Title (Myanmar)
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus:border-[#00B14F] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              placeholder="Enter product title in Myanmar"
              value={productNameMy}
              onChange={e => setProductNameMy(e.target.value)}
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Product Subtitle
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus:border-[#00B14F] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              placeholder="Brief product description"
              value={productSubtitle}
              onChange={e => setProductSubtitle(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Brand *
            </label>
            {loading ? (
              <div className="flex h-10 w-full items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm text-gray-500">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600 mr-2"></div>
                Loading brands...
              </div>
            ) : error ? (
              <div className="flex h-10 w-full items-center justify-center rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                Error loading brands
              </div>
            ) : (
              <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-[#00B14F] focus:border-[#00B14F] focus:ring-offset-2"
                  value={brandId}
                  onChange={e => setBrandId(e.target.value)}
                >
                  <option value="" disabled>Select a brand</option>
                  {brands
                    .filter(brand => brand.isApproved)
                    .map((brand) => (
                      <option key={brand.id} value={brand.id}>
                        {brand.name} ({brand.country})
                      </option>
                    ))}
                </select>
            )}
            
            {brandId && (
              <p className="text-xs text-gray-500 mt-1">
                Selected: {brands.find(b => b.id === brandId)?.name || 'Unknown brand'}
              </p>
            )}
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              HSN/SAC Code
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus:border-[#00B14F] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              placeholder="Auto-suggested based on category"
              value={hsnCode}
              onChange={e => setHsnCode(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Model Number
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus:border-[#00B14F] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              placeholder="Unique model identifier"
              value={modelNumber}
              onChange={e => setModelNumber(e.target.value)}
            />
          </div>
        </div>
        
        {/* SKU Field */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              SKU (Stock Keeping Unit)
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus:border-[#00B14F] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              placeholder="e.g., PROD-001, SNACK-001"
              maxLength={50}
              value={sku}
              onChange={e => setSku(e.target.value)}
            />
            <p className="text-xs text-gray-500 mt-1">
              {sku.length}/50 characters
            </p>
          </div>
          <div>
            {/* Empty div for grid alignment */}
          </div>
        </div>
        <div>
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Target Gender *
          </label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-2">
            {genderOptions.map((option) => (
              <label key={option} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={gender.includes(option)}
                  onChange={() => handleGenderChange(option)}
                  className="rounded border-gray-300 text-[#00B14F] focus:ring-[#00B14F]"
                />
                <span className="text-sm capitalize">{option}</span>
              </label>
            ))}
          </div>
          {gender.length === 0 && (
            <p className="text-sm text-red-500 mt-1">Please select at least one gender target</p>
          )}
        </div>
      </div>
    </div>
  );
} 