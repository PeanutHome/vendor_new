"use client";
import React, { useState, useEffect } from "react";
import { CategorySelection } from "./CategorySelection";
import { ProductInformation } from "./ProductInformation";
import { ProductDescription } from "./ProductDescription";
import { VariantEngine } from "./VariantEngine";
import { ProductImages } from "./ProductImages";
import { PricingInventory } from "./PricingInventory";
import { ShippingPackaging } from "./ShippingPackaging";
import { SEOOptimization } from "./SEOOptimization";
import { FiltersSetup } from "./FiltersSetup";
import { VisibilityPublishing } from "./VisibilityPublishing";
import { PRIMARY_GREEN, Product } from "../data/mockData";
import { useProductAPI, ProductData, ProductVariant } from "@/lib/product-api";
import { useAuthStore } from "@/lib/auth-store";
import { API_CONFIG } from "@/lib/config";
import { 
  PackType, 
  Gender, 
  ReturnPolicy, 
  DispatchTime, 
  PublishStatus 
} from "@/lib/enums";
import { 
  useProductDialogState, 
  convertToProductVariants, 
  convertFromProductVariants,
  validateProductForm 
} from "./ProductDialogState";

interface ProductDialogProps {
  open: boolean;
  onClose: () => void;
  product?: ProductData | Product | null;
}

export function ProductDialog({ open, onClose, product }: ProductDialogProps) {
  const { updateProduct } = useProductAPI();

  // Use the extracted state management hook
  const state = useProductDialogState(product || null, open);
  
  // Destructure all the state variables and setters
  const {
    // Loading states
    isSubmitting, setIsSubmitting,
    isSubmittingForReview, setIsSubmittingForReview,
    
    // Category states
    mainCategory, setMainCategory,
    subCategory, setSubCategory,
    subSubCategory, setSubSubCategory,
    
    // Product info states
    productNameEn, setProductNameEn,
    productNameMy, setProductNameMy,
    productSubtitle, setProductSubtitle,
    brandId, setBrandId,
    hsnCode, setHsnCode,
    modelNumber, setModelNumber,
    sku, setSku,
    gender, setGender,
    
    // Description states
    productDescriptionEn, setProductDescriptionEn,
    productDescriptionMy, setProductDescriptionMy,
    keyFeatureInput, setKeyFeatureInput,
    keyFeatures, setKeyFeatures,
    howToUse, setHowToUse,
    ingredients, setIngredients,
    material, setMaterial,
    
    // Variant states
    variantColor, setVariantColor,
    variantSize, setVariantSize,
    variantPrice, setVariantPrice,
    variantStock, setVariantStock,
    variants, setVariants,
    
    // Media states
    productImages, setProductImages,
    selectedFiles, setSelectedFiles,
    videoUrl, setVideoUrl,
    videoType, setVideoType,
    
    // Pricing states
    mrp, setMrp,
    price, setPrice,
    sellingPrice, setSellingPrice,
    taxClass, setTaxClass,
    discount, setDiscount,
    
    // Shipping states
    dimensionL, setDimensionL,
    dimensionW, setDimensionW,
    dimensionH, setDimensionH,
    netWeight, setNetWeight,
    packType, setPackType,
    dispatchTime, setDispatchTime,
    returnPolicy, setReturnPolicy,
    codAvailable, setCodAvailable,
    
    // SEO states
    searchTags, setSearchTags,
    searchTagInput, setSearchTagInput,
    metaTitle, setMetaTitle,
    metaDescription, setMetaDescription,
    internalNotes, setInternalNotes,
    
    // Filter states
    filterOccasion, setFilterOccasion,
    filterMaterial, setFilterMaterial,
    isEcoFriendly, setIsEcoFriendly,
    isOrganic, setIsOrganic,
    filterBestFor, setFilterBestFor,
    
    // Publishing states
    publishStatus, setPublishStatus,
    showInNewArrivals, setShowInNewArrivals,
    featureOnHomepage, setFeatureOnHomepage,
    enableForCampaigns, setEnableForCampaigns,
    
    // Functions
    handleReset
  } = state;

  // Message state for API responses
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // Function to show messages
  const showMessage = (type: 'success' | 'error' | 'info', text: string) => {
    setMessage({ type, text });
    
    // Clear validation errors on success
    if (type === 'success') {
      setValidationErrors([]);
    }
    
    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
      setTimeout(() => setMessage(null), 5000);
    }
  };

  const fileInputRef = React.useRef<HTMLInputElement>(null!);





  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    // Validate file types
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    const validFiles = files.filter((file) => allowedTypes.includes(file.type));

    if (validFiles.length !== files.length) {
      alert("Invalid file type: Only JPEG, PNG, and WebP images are allowed");
      e.target.value = "";
      return;
    }

    // Validate file size (100KB limit like dummy.ts)
    const maxSize = 100 * 1024; // 100KB
    const sizeValidFiles = validFiles.filter((file) => file.size <= maxSize);

    if (sizeValidFiles.length !== validFiles.length) {
      alert("File too large: Files must be smaller than 100KB");
      e.target.value = "";
      return;
    }

    // Find next empty slot
    const nextIndex = selectedFiles.findIndex(file => file === null);
    if (nextIndex === -1) {
      alert("Maximum 6 images allowed");
      e.target.value = "";
      return;
    }

    // Store File object
    const newSelectedFiles = [...selectedFiles];
    newSelectedFiles[nextIndex] = sizeValidFiles[0];
    setSelectedFiles(newSelectedFiles);

    // Create preview URL
    const reader = new FileReader();
    reader.onload = () => {
      const newProductImages = [...productImages];
      newProductImages[nextIndex] = reader.result as string;
      setProductImages(newProductImages);
    };
    reader.readAsDataURL(sizeValidFiles[0]);

    e.target.value = "";
  };



  // Quick test function to fill form with dummy data
  const fillDummyData = () => {
    // Use real category IDs from API
    setMainCategory("66977148-6d83-4316-ba6b-d5eabffaaaeb"); // Fashion
    setSubCategory("3f039f49-615e-467c-ae4f-1310bf12c420"); // Tops
    setSubSubCategory(""); // No level 3 category for Tops in current API data
    
    setProductNameEn("Test T-Shirt - Premium Quality");
    setProductNameMy("စမ်းသပ်တီရှပ် - ပရီမီယံအရည်အသွေး");
    setProductSubtitle("High-quality t-shirt for testing purposes");
    setBrandId("f122ed28-0a6f-4dfd-b5c2-4ac814139a78"); // Using Adidas brand ID
    setHsnCode("6104");
    setModelNumber("TEST-TSHIRT-001");
    setSku("TEST-SKU-001");
    setGender([Gender.MEN, Gender.WOMEN, Gender.UNISEX]);
    
    setProductDescriptionEn("This is a test product description with more than 50 characters to meet validation requirements.");
    setProductDescriptionMy("ဤသည် စမ်းသပ်ထုတ်ကုန်ဖော်ပြချက်ဖြစ်ပြီး အတည်ပြုချက်လိုအပ်ချက်များကို ဖြည့်ဆည်းရန် စာလုံး ၅၀ ကျော်ပါဝင်သည်။");
    setKeyFeatures(["Premium Cotton", "Comfortable Fit", "Durable Material", "Easy Care"]);
    setHowToUse("Machine wash cold, tumble dry low");
    setIngredients("100% Cotton");
    setMaterial("Premium cotton fabric");
    
    // Add a test variant
    const testVariant: ProductVariant = {
      sku: "TEST-VAR-001",
      attributes: { color: "Black", size: "M" },
      price: 15000,
      stock: 100,
      lowStockThreshold: 10
    };
    setVariants([testVariant]);
    
    setMrp("20000");
    setPrice("18000");
    setSellingPrice("15000");
    setTaxClass("GST_5");
    setDiscount("25");
    
    setDimensionL("30");
    setDimensionW("25");
    setDimensionH("2");
    setNetWeight("150");
    setPackType({ value: PackType.BOX, label: "Box" });
    setDispatchTime({ value: DispatchTime.TWO_THREE_DAYS, label: "2-3 days" });
    setReturnPolicy({ value: ReturnPolicy.SEVEN_DAYS, label: "7 days" });
    setCodAvailable(true);
    
    setSearchTags(["t-shirt", "cotton", "premium", "test", "fashion", "clothing"]);
    setMetaTitle("Test T-Shirt - Premium Quality for Testing");
    setMetaDescription("High-quality test t-shirt with premium cotton for testing purposes");
    setInternalNotes("This is a test product for API testing");
    
    setFilterOccasion({ value: "casual", label: "Casual" });
    setFilterMaterial({ value: "cotton", label: "Cotton" });
    setIsEcoFriendly(true);
    setIsOrganic(true);
    setFilterBestFor({ value: "all-occasions", label: "All Occasions" });
    
    setPublishStatus(PublishStatus.DRAFT);
    setShowInNewArrivals(true);
    setFeatureOnHomepage(false);
    setEnableForCampaigns(false);
    
    // Add missing required fields for validation
    setVideoUrl("https://youtube.com/watch?v=test123");
    setVideoType("youtube");
    setKeyFeatureInput(""); // Clear input field
    setSearchTagInput(""); // Clear input field
    
    // Clear any existing images
    setSelectedFiles(Array(6).fill(null));
    setProductImages([]);
    
    console.log('🚀 Form filled with dummy data for testing!');
    console.log('📸 Please select at least 1 image to complete the test data');
    console.log('🏷️ Categories set:', { mainCategory, subCategory, subSubCategory });
    console.log('🏷️ Brand ID set:', brandId);
    
    // Automatically open file picker for images
    setTimeout(() => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      } else {
        console.log('⚠️ File input ref not ready, please select images manually');
        alert('Form filled! Please select at least 1 image manually to complete the test data.');
      }
    }, 500);
  };

  // Direct API test function - sends exact data to API
  const handleDirectAPITest = async () => {
    console.log('🚀 Starting direct API test...');
    
    // Create a hidden file input for image selection
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.multiple = true;
    fileInput.style.display = 'none';
    
    fileInput.onchange = async (e) => {
      const target = e.target as HTMLInputElement;
      const files = Array.from(target.files || []);
      
      if (files.length < 2) {
        alert('Please select at least 2 images for the test.');
        return;
      }
      
      if (files.length > 6) {
        alert('Maximum 6 images allowed.');
        return;
      }
      
      // Validate file types and sizes
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
      const maxSize = 100 * 1024; // 100KB
      
      const validFiles = files.filter(file => {
        if (!allowedTypes.includes(file.type)) {
          alert(`Invalid file type: ${file.name}. Only JPEG, PNG, and WebP images are allowed.`);
          return false;
        }
        if (file.size > maxSize) {
          alert(`File too large: ${file.name}. Files must be smaller than 100KB.`);
          return false;
        }
        return true;
      });
      
      if (validFiles.length !== files.length) {
        return;
      }
      
      try {
        // Create the exact product data as specified
        const productData: ProductData = {
          name: {
            en: "Great Wall",
            my: "ပရီမီယံ ဝါဂွမ်းတီရှပ်"
          },
          subtitle: "",
          description: {
            en: "High-sdadsaqualitdsaday cotton t-shirt with modern design",
            my: "ခေတ်မီဒီဇိုင်းနဲ့ အရည်အသွေးမြdsadsaင့် ဝါဂွမ်းတီရှပ်"
          },
          brandId: "261fe886-53db-436b-8b33-a609b8ac5633",
          hsnCode: "HSN520852",
          modelNumber: "TSH-0012122311",
          sku: "TSH-002131231121",
          gender: [Gender.MEN, Gender.WOMEN],
          keyFeatures: ["100% Cotton", "Breathable", "Comfortable fit"],
          howToUse: "",
          ingredients: "",
          material: "",
          variants: [
            {
              sku: "TSH-001-RED12312-Mb121",
              attributes: {
                color: "Red",
                size: "M"
              },
              price: 1500,
              stock: 50,
              lowStockThreshold: 10
            },
            {
              sku: "TSH-001-BLUE-L1231d1212",
              attributes: {
                color: "Blue",
                size: "L"
              },
              price: 1500,
              stock: 30,
              lowStockThreshold: 10
            }
          ],
          mrp: 2000,
          price: 2000,
          sellingPrice: 1500,
          taxClass: "",
          discount: 25,
          lowStockThreshold: 10,
          categoryIds: ["01da3911-8ea0-47b3-8482-250582c5fccc", "036c4d17-c095-4a00-844e-293cc876f620"],
          searchTags: ["t-shirt", "cotton", "casual", "comfortable"],
          colors: ["Red", "Blue", "Black"],
          sizes: ["S", "M", "L", "XL"],
          occasions: [],
          materials: [],
          isEcoFriendly: false,
          isOrganic: false,
          bestFor: [],
          codAvailable: true,
          dispatchTime: DispatchTime.TWO_THREE_DAYS,
          returnPolicy: ReturnPolicy.SEVEN_DAYS,
          dimensions: {
            length: 30,
            width: 25,
            height: 2
          },
          netWeight: 150,
          packType: PackType.BAG,
          inStock: true,
          videoUrl: "",
          videoType: "youtube",
          images: validFiles, // Send the selected File objects
          metaTitle: "Premium Greate Quality T-Shirt",
          metaDescription: "High-qualitdsaday cotton t-shirt with modern design",
          internalNotes: "Direct API test product",
          isLive: false, // Start as draft
          showInNewArrivals: false,
          featureOnHomepage: false,
          productTypes: []
        };
        
        console.log('📦 Sending exact product data to API:', JSON.stringify(productData, null, 2));
        
        // Get vendor ID from auth store
        const { accessToken, vendorId } = useAuthStore.getState();
        
        if (!accessToken) {
          showMessage('error', 'No access token available. Please log in again.');
          return;
        }
        
        if (!vendorId) {
          showMessage('error', 'No vendor ID available. Please log in again to refresh vendor details.');
          return;
        }
        
        console.log('🏪 Using vendor ID from auth store for direct API test:', vendorId);
        
        // Send to API directly with vendor ID from auth store
        try {
          const apiUrl = `${API_CONFIG.BASE_URL}/vendors/${vendorId}/products`;
          console.log('🌐 API URL:', apiUrl);
          
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
            headers: {
              'Authorization': `Bearer ${accessToken}`,
            },
            body: formData,
          });
          
          console.log('📡 API Response Status:', response.status);
          
          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('❌ API Error:', errorData);
            showMessage('error', errorData.message || `Direct API test failed: HTTP ${response.status}`);
            return;
          }
          
          const responseData = await response.json();
          console.log('✅ Product created successfully:', responseData);
          
          console.log('🎉 Direct API test successful!');
          showMessage('success', `Direct API test successful! Product created with ID: ${responseData.productId || responseData.id || 'Unknown'}`);
          onClose(); // Close the dialog
          
        } catch (error) {
          console.error('❌ Direct API test failed:', error);
          showMessage('error', 'Error in direct API test. Please check console for details.');
        }
        
      } catch (error) {
        console.error('💥 Error in direct API test:', error);
        showMessage('error', 'Error in direct API test. Please check console for details.');
      }
      
      // Clean up
      document.body.removeChild(fileInput);
    };
    
    // Add file input to DOM and trigger click
    document.body.appendChild(fileInput);
    fileInput.click();
  };

  // Handler for overlay click
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Form validation
  const isFormValid = () => {
    const formData = {
      mainCategory,
      subCategory,
      productNameEn,
      brandId,
      productDescriptionEn,
      keyFeatures,
      selectedFiles,
      mrp,
      price,
      sellingPrice,
      dimensionL,
      dimensionW,
      dimensionH,
      netWeight,
      dispatchTime,
      searchTags,
      metaTitle,
      metaDescription,
      gender
    };
    
    const validationResult = validateProductForm(formData);
    setValidationErrors(validationResult.errors);
    return validationResult.isValid;
  };



  // Handle form submission
  const handleSubmit = async () => {
    if (!isFormValid()) {
      showMessage('error', 'Please fill in all required fields.');
      return;
    }
    
    // Set loading state
    setIsSubmitting(true);
    
    const productData: ProductData = {
      ...(product && 'id' in product && { id: product.id }),
      name: {
        en: productNameEn,
        my: productNameMy
      },
      subtitle: productSubtitle,
      description: {
        en: productDescriptionEn,
        my: productDescriptionMy
      },
      brandId: brandId,
      hsnCode: hsnCode,
      modelNumber: modelNumber,
      sku: sku,
      gender: gender,
      keyFeatures: keyFeatures,
      howToUse: howToUse,
      ingredients: ingredients,
      material: material,
      variants: variants.map(variant => ({
        sku: variant.sku || `${modelNumber}-${variant.attributes.color}-${variant.attributes.size}`,
        attributes: {
          color: variant.attributes.color,
          size: variant.attributes.size
        },
        price: variant.price,
        stock: variant.stock,
        lowStockThreshold: 10
      })),
      mrp: parseFloat(mrp),
      price: parseFloat(price),
      sellingPrice: parseFloat(sellingPrice),
      taxClass: taxClass,
      discount: parseFloat(discount),
      lowStockThreshold: 10,
      categoryIds: [mainCategory, subCategory, subSubCategory].filter(Boolean),
      searchTags: searchTags,
      colors: variants.map(v => v.attributes.color).filter((v, i, a) => a.indexOf(v) === i),
      sizes: variants.map(v => v.attributes.size).filter((v, i, a) => a.indexOf(v) === i),
      occasions: filterOccasion ? [filterOccasion.value] : [],
      materials: filterMaterial ? [filterMaterial.value] : [],
      isEcoFriendly: isEcoFriendly || false,
      isOrganic: isOrganic || false,
      bestFor: filterBestFor ? [filterBestFor.value] : [],
      codAvailable: codAvailable || false,
      dispatchTime: dispatchTime?.value || DispatchTime.TWO_THREE_DAYS,
      returnPolicy: returnPolicy?.value || ReturnPolicy.SEVEN_DAYS,
      dimensions: {
        length: parseFloat(dimensionL),
        width: parseFloat(dimensionW),
        height: parseFloat(dimensionH)
      },
      netWeight: parseFloat(netWeight),
      packType: packType?.value || PackType.BAG,
      inStock: variants.some(v => v.stock > 0),
      videoUrl: videoUrl || "",
      videoType: videoType || "youtube",
      images: selectedFiles.filter((file): file is File => file !== null),
      metaTitle: metaTitle || productNameEn,
      metaDescription: metaDescription || productDescriptionEn,
      internalNotes: internalNotes || "",
      isLive: publishStatus === "preview",
      showInNewArrivals: showInNewArrivals || false,
      featureOnHomepage: featureOnHomepage || false,
      productTypes: []
    };

    // Log the exact data being sent
    console.log('📦 Product Data being sent to API:', JSON.stringify(productData, null, 2));
    console.log('🔍 Data structure matches sample JSON:', {
      hasName: !!productData.name?.en && !!productData.name?.my,
      hasVariants: Array.isArray(productData.variants) && productData.variants.length > 0,
      hasDimensions: !!productData.dimensions?.length && !!productData.dimensions?.width && !!productData.dimensions?.height,
      hasColors: Array.isArray(productData.colors) && productData.colors.length > 0,
      hasSizes: Array.isArray(productData.sizes) && productData.sizes.length > 0,
      hasGender: Array.isArray(productData.gender) && productData.gender.length > 0,
      hasKeyFeatures: Array.isArray(productData.keyFeatures) && productData.keyFeatures.length >= 3,
      hasSearchTags: Array.isArray(productData.searchTags) && productData.searchTags.length >= 3,
      hasCategoryIds: Array.isArray(productData.categoryIds) && productData.categoryIds.length > 0,
      isLive: typeof productData.isLive === 'boolean',
      publishStatus: publishStatus
    });
    
    // Log specific field values for debugging
    console.log('🔍 Key field values:', {
      nameEn: productData.name.en,
      nameMy: productData.name.my,
      subtitle: productData.subtitle,
      brandId: productData.brandId,
      modelNumber: productData.modelNumber,
      gender: productData.gender,
      keyFeatures: productData.keyFeatures,
      variants: productData.variants,
      mrp: productData.mrp,
      price: productData.price,
      sellingPrice: productData.sellingPrice,
      taxClass: productData.taxClass,
      discount: productData.discount,
      categoryIds: productData.categoryIds,
      colors: productData.colors,
      sizes: productData.sizes,
      images: productData.images,
      imageCount: productData.images?.length || 0,
      isLive: productData.isLive
    });

    try {
      if (product) {
        // Update existing product - handle both types
        let productId = "";
        if ('id' in product && product.id) {
          productId = product.id;
        }
        // For updates, still use the existing updateProduct function
        const result = await updateProduct(productId, productData);
        if (result.success) {
          showMessage('success', result.message || "Product updated successfully!");
          setTimeout(() => onClose(), 2000); // Close after showing message
        } else {
          showMessage('error', result.error || "Failed to update product. Please try again.");
        }
      } else {
        // Get vendor ID from auth store
        const { accessToken, vendorId } = useAuthStore.getState();
        
        if (!accessToken) {
          showMessage('error', 'No access token available. Please log in again.');
          return;
        }
        
        if (!vendorId) {
          showMessage('error', 'No vendor ID available. Please log in again to refresh vendor details.');
          return;
        }
        
        console.log('🏪 Using vendor ID from auth store:', vendorId);
        
        const apiUrl = `${API_CONFIG.BASE_URL}/vendors/${vendorId}/products`;
        console.log('🌐 API URL for form submission:', apiUrl);
        
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
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
          body: formData,
        });
        
        console.log('📡 API Response Status for form submission:', response.status);
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error('❌ API Error for form submission:', errorData);
          showMessage('error', errorData.message || `Failed to create product: HTTP ${response.status}`);
          return;
        }
        
        const responseData = await response.json();
        console.log('✅ Product created successfully from form:', responseData);
        
        // Display the actual API message if available
        const successMessage = responseData.message || responseData.data?.message || "Product created successfully!";
        showMessage('success', successMessage);
        
        // Log the full response for debugging
        console.log('📝 Full API Response:', responseData);
        console.log('💬 API Message:', successMessage);
        
        // Don't close immediately - let user see the success message
        setTimeout(() => onClose(), 3000);
      }
    } catch (error) {
      console.error("Error saving product:", error);
      showMessage('error', "Error saving product. Please try again.");
    } finally {
      // Always clear loading state
      setIsSubmitting(false);
    }
  };

  // Submit product for review directly
  const handleSubmitForReview = async () => {
    console.log('🚀 Starting review submission process...');

    if (!isFormValid()) {
      console.log('❌ Form validation failed, cannot submit for review');
      showMessage('error', 'Please fill in all required fields before submitting for review.');
      return;
    }

    // Set loading state
    setIsSubmittingForReview(true);

    try {
      const productData: ProductData = {
        ...(product && 'id' in product && { id: product.id }),
        name: {
          en: productNameEn,
          my: productNameMy
        },
        subtitle: productSubtitle,
        description: {
          en: productDescriptionEn,
          my: productDescriptionMy
        },
        brandId: brandId,
        hsnCode: hsnCode,
        modelNumber: modelNumber,
        sku: sku, // ✅ ADDED: SKU field
        gender: gender,
        keyFeatures: keyFeatures,
        howToUse: howToUse,
        ingredients: ingredients,
        material: material,
        variants: variants.map(variant => ({
          sku: variant.sku || `${modelNumber}-${variant.attributes.color}-${variant.attributes.size}`,
          attributes: {
            color: variant.attributes.color,
            size: variant.attributes.size
          },
          price: variant.price,
          stock: variant.stock,
          lowStockThreshold: 10 // ✅ ADDED: Default low stock threshold
        })),
        mrp: parseFloat(mrp),
        price: parseFloat(price),
        sellingPrice: parseFloat(sellingPrice),
        taxClass: taxClass,
        discount: parseFloat(discount),
        lowStockThreshold: 10, // ✅ ADDED: Default low stock threshold
        categoryIds: [mainCategory, subCategory, subSubCategory].filter(Boolean), // Now using real IDs directly
        searchTags: searchTags,
        colors: variants.map(v => v.attributes.color).filter((v, i, a) => a.indexOf(v) === i),
        sizes: variants.map(v => v.attributes.size).filter((v, i, a) => a.indexOf(v) === i),
        occasions: filterOccasion ? [filterOccasion.value] : [],
        materials: filterMaterial ? [filterMaterial.value] : [],
        isEcoFriendly: isEcoFriendly,
        isOrganic: isOrganic,
        bestFor: filterBestFor ? [filterBestFor.value] : [],
        codAvailable: codAvailable,
        dispatchTime: dispatchTime?.value || DispatchTime.TWO_THREE_DAYS,
        returnPolicy: returnPolicy?.value || ReturnPolicy.SEVEN_DAYS,
        dimensions: {
          length: parseFloat(dimensionL),
          width: parseFloat(dimensionW),
          height: parseFloat(dimensionH)
        },
        netWeight: parseFloat(netWeight),
        packType: packType?.value || PackType.BAG,
        inStock: variants.some(v => v.stock > 0),
        videoUrl: videoUrl,
        videoType: videoType,
        images: selectedFiles.filter((file): file is File => file !== null), // Send File objects like dummy.ts
        metaTitle: metaTitle,
        metaDescription: metaDescription,
        internalNotes: internalNotes,
        isLive: true, // ✅ TRUE for review submission - backend will handle review status
        showInNewArrivals: showInNewArrivals,
        featureOnHomepage: featureOnHomepage,
        productTypes: []
      };

      if (product) {
        // Update existing product
        let productId = "";
        if ('id' in product && product.id) {
          productId = product.id;
        }
        const saveResult = await updateProduct(productId, productData);
        if (saveResult.success) {
          console.log('🎉 Product updated and submitted for review successfully!');
          alert("Product updated and submitted for review successfully! The backend will handle the review process.");
          onClose();
        } else {
          console.error('❌ Failed to update and submit product for review:', saveResult.error);
          alert(`Failed to update and submit product for review: ${saveResult.error}`);
        }
      } else {
        // Get vendor ID from auth store
        const { accessToken, vendorId } = useAuthStore.getState();
        
        if (!accessToken) {
          showMessage('error', 'No access token available. Please log in again.');
          return;
        }
        
        if (!vendorId) {
          showMessage('error', 'No vendor ID available. Please log in again to refresh vendor details.');
          return;
        }
        
        console.log('🏪 Using vendor ID from auth store for review submission:', vendorId);
        
        const apiUrl = `${API_CONFIG.BASE_URL}/vendors/${vendorId}/products`;
        console.log('🌐 API URL for review submission:', apiUrl);
        
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
          console.log('📸 Images added to FormData for review:', images.length, 'files');
        }
        
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
          body: formData,
        });
        
        console.log('📡 API Response Status for review submission:', response.status);
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error('❌ API Error for review submission:', errorData);
          showMessage('error', errorData.message || `Failed to submit product for review: HTTP ${response.status}`);
          return;
        }
        
        const responseData = await response.json();
        console.log('✅ Product submitted for review successfully:', responseData);
        
        // Display the actual API message if available
        const successMessage = responseData.message || responseData.data?.message || "Product submitted for review successfully! The backend will handle the review process.";
        showMessage('success', successMessage);
        
        // Log the full response for debugging
        console.log('📝 Full API Response for Review:', responseData);
        console.log('💬 API Message for Review:', successMessage);
        
        setTimeout(() => onClose(), 2000); // Close after showing message
      }
    } catch (error) {
      console.error('💥 Error in review submission process:', error);
      showMessage('error', "Error submitting product for review. Please try again.");
    } finally {
      // Always clear loading state
      setIsSubmittingForReview(false);
    }
  };





  // Prevent background scroll when dialog is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        data-state="open"
        className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        style={{ pointerEvents: 'auto' }}
        aria-hidden="true"
        onClick={handleOverlayClick}
      />
      {/* Dialog */}
      <div
        role="dialog"
        className="fixed left-1/2 top-1/2 z-50 grid w-full max-w-6xl translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-0 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg max-h-[90vh] overflow-y-auto"
        tabIndex={-1}
        style={{ pointerEvents: 'auto' }}
        onClick={handleOverlayClick}
      >
        <div className="flex flex-col space-y-1.5 text-center sm:text-left px-6 pt-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg font-semibold leading-none tracking-tight">
                {product ? 'Edit Product' : 'Add New Product'}
              </h2>
              <p className="text-sm text-muted-foreground">
                {product 
                  ? 'Update the product details below and save your changes.'
                  : 'Fill in the details below to add a new product to your catalog.'
                }
              </p>
            </div>
            {!product && (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={fillDummyData}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-blue-300 bg-blue-50 hover:bg-blue-100 text-blue-700 h-10 px-4 py-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                  </svg>
                  Quick Test + Images
                </button>
                <button
                  type="button"
                  onClick={handleDirectAPITest}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-green-300 bg-green-50 hover:bg-green-100 text-green-700 h-10 px-4 py-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 12l2 2 4-4"/>
                    <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
                    <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
                    <path d="M21 12c0 2.5-2 4.5-4.5 4.5S12 14.5 12 12s2-4.5 4.5-4.5S21 9.5 21 12z"/>
                  </svg>
                  Direct API Test
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Message Display */}
        {message && (
          <div className={`px-6 py-3 mx-6 rounded-lg border ${
            message.type === 'success' 
              ? 'bg-green-50 border-green-200 text-green-800' 
              : message.type === 'error' 
                ? 'bg-red-50 border-red-200 text-red-800'
                : 'bg-blue-50 border-blue-200 text-blue-800'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {message.type === 'success' && (
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
                {message.type === 'error' && (
                  <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                )}
                {message.type === 'info' && (
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                )}
                <span className="font-medium">{message.text}</span>
              </div>
              <button
                onClick={() => setMessage(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Loading State Display */}
        {(isSubmitting || isSubmittingForReview) && (
          <div className="px-6 py-3 mx-6 rounded-lg border bg-blue-50 border-blue-200 text-blue-800">
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
              <span className="font-medium">
                {isSubmitting ? 'Saving product...' : 'Submitting for review...'}
              </span>
            </div>
          </div>
        )}
        
        <div className="space-y-6 px-6 pb-6">
          {/* Section 1: Category Selection */}
          <CategorySelection
            mainCategory={mainCategory}
            setMainCategory={setMainCategory}
            subCategory={subCategory}
            setSubCategory={setSubCategory}
            subSubCategory={subSubCategory}
            setSubSubCategory={setSubSubCategory}
          />

          {/* Section 2: Product Core Information */}
          <ProductInformation
            productNameEn={productNameEn}
            setProductNameEn={setProductNameEn}
            productNameMy={productNameMy}
            setProductNameMy={setProductNameMy}
            productSubtitle={productSubtitle}
            setProductSubtitle={setProductSubtitle}
            brandId={brandId}
            setBrandId={setBrandId}
            hsnCode={hsnCode}
            setHsnCode={setHsnCode}
            modelNumber={modelNumber}
            setModelNumber={setModelNumber}
            sku={sku}
            setSku={setSku}
            gender={gender}
            setGender={setGender}
          />

          {/* Section 3: Description & Highlights */}
          <ProductDescription
            productDescriptionEn={productDescriptionEn}
            setProductDescriptionEn={setProductDescriptionEn}
            productDescriptionMy={productDescriptionMy}
            setProductDescriptionMy={setProductDescriptionMy}
            keyFeatureInput={keyFeatureInput}
            setKeyFeatureInput={setKeyFeatureInput}
            keyFeatures={keyFeatures}
            setKeyFeatures={setKeyFeatures}
            howToUse={howToUse}
            setHowToUse={setHowToUse}
            ingredients={ingredients}
            setIngredients={setIngredients}
            material={material}
            setMaterial={setMaterial}
          />

          {/* Section 4: Product Variants Engine */}
          <VariantEngine
            variantColor={variantColor}
            setVariantColor={setVariantColor}
            variantSize={variantSize}
            setVariantSize={setVariantSize}
            variantPrice={variantPrice}
            setVariantPrice={setVariantPrice}
            variantStock={variantStock}
            setVariantStock={setVariantStock}
            variants={convertFromProductVariants(variants)}
            setVariants={(newVariants) => setVariants(convertToProductVariants(newVariants))}
          />

          {/* Section 5: Product Images & Media */}
          <ProductImages
            productImages={productImages}
            setProductImages={setProductImages}
            videoUrl={videoUrl}
            setVideoUrl={setVideoUrl}
            videoType={videoType}
            setVideoType={setVideoType}
            fileInputRef={fileInputRef}
            handleImageUpload={handleImageUpload}
          />

          {/* Section 6: Pricing & Inventory */}
          <PricingInventory
            mrp={mrp}
            setMrp={setMrp}
            price={price}
            setPrice={setPrice}
            sellingPrice={sellingPrice}
            setSellingPrice={setSellingPrice}
            taxClass={taxClass}
            setTaxClass={setTaxClass}
            discount={discount}
            setDiscount={setDiscount}
          />

          {/* Section 7: Shipping, Packaging & Fulfilment */}
          <ShippingPackaging
            dimensionL={dimensionL}
            setDimensionL={setDimensionL}
            dimensionW={dimensionW}
            setDimensionW={setDimensionW}
            dimensionH={dimensionH}
            setDimensionH={setDimensionH}
            netWeight={netWeight}
            setNetWeight={setNetWeight}
            packType={packType}
            setPackType={setPackType}
            dispatchTime={dispatchTime}
            setDispatchTime={setDispatchTime}
            returnPolicy={returnPolicy}
            setReturnPolicy={setReturnPolicy}
            codAvailable={codAvailable}
            setCodAvailable={setCodAvailable}
          />

          {/* Section 8: SEO & Search Optimization */}
          <SEOOptimization
            searchTags={searchTags}
            setSearchTags={setSearchTags}
            searchTagInput={searchTagInput}
            setSearchTagInput={setSearchTagInput}
            metaTitle={metaTitle}
            setMetaTitle={setMetaTitle}
            metaDescription={metaDescription}
            setMetaDescription={setMetaDescription}
            internalNotes={internalNotes}
            setInternalNotes={setInternalNotes}
          />

          {/* Section 9: Filters Setup */}
          <FiltersSetup
            filterOccasion={filterOccasion}
            setFilterOccasion={setFilterOccasion}
            filterMaterial={filterMaterial}
            setFilterMaterial={setFilterMaterial}
            isEcoFriendly={isEcoFriendly}
            setIsEcoFriendly={setIsEcoFriendly}
            isOrganic={isOrganic}
            setIsOrganic={setIsOrganic}
            filterBestFor={filterBestFor}
            setFilterBestFor={setFilterBestFor}
          />

          {/* Section 10: Visibility & Publishing Options */}
          <VisibilityPublishing
            publishStatus={publishStatus}
            setPublishStatus={setPublishStatus}
            showInNewArrivals={showInNewArrivals}
            setShowInNewArrivals={setShowInNewArrivals}
            featureOnHomepage={featureOnHomepage}
            setFeatureOnHomepage={setFeatureOnHomepage}
            enableForCampaigns={enableForCampaigns}
            setEnableForCampaigns={setEnableForCampaigns}
          />

          {/* Validation Summary */}
          {validationErrors.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <h4 className="font-medium text-red-800">Required Fields Missing</h4>
              </div>
              <p className="text-sm text-red-700 mb-3">
                Please complete the following required fields before submitting:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-red-600">
                {validationErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Final Action Buttons */}
          <div className="flex items-center justify-between pt-6 border-t">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
              onClick={handleReset}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-refresh-cw w-4 h-4"><path d="M3 12a9 9 0 0 1 9-9 9.75 9 0 0 1 6.74 2.74L21 8"></path><path d="M21 3v5h-5"></path><path d="M21 12a9 9 0 0 1-9 9 9.75 9 0 0 1-6.74-2.74L3 16"></path><path d="M3 21v-5h5"></path></svg>
              Reset Form
            </button>
            <div className="flex gap-3">
              <button
                type="button"
                disabled={isSubmitting || isSubmittingForReview}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 h-10 px-4 py-2"
                onClick={() => {
                  setPublishStatus(PublishStatus.DRAFT);
                  handleSubmit();
                }}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14,2 14,8 20,8" />
                      <line x1="16" x2="8" y1="13" y2="13" />
                      <line x1="16" x2="8" y1="17" y2="17" />
                      <polyline points="10,9 9,9 8,9" />
                    </svg>
                    Save as Draft
                  </>
                )}
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-blue-300 bg-blue-50 hover:bg-blue-100 text-blue-700 h-10 px-4 py-2"
                onClick={() => alert("Preview functionality coming soon!")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                Preview Listing
              </button>
              <button
                type="button"
                disabled={isSubmitting || isSubmittingForReview}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-white shadow h-10 px-4 py-2"
                style={{ backgroundColor: PRIMARY_GREEN }}
                onClick={handleSubmitForReview}
              >
                {isSubmittingForReview ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <path d="M9 12l2 2 4-4" />
                      <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3" />
                      <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3" />
                      <path d="M21 12c0 2.5-2 4.5-4.5 4.5S12 14.5 12 12s2-4.5 4.5-4.5S21 9.5 21 12z" />
                    </svg>
                    Submit for Review
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <button
          type="button"
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          onClick={onClose}
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x h-4 w-4"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
          <span className="sr-only">Close</span>
        </button>
      </div>
    </>
  );
} 