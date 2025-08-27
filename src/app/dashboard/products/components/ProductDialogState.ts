import { useState, useEffect } from "react";
import { ProductData, ProductVariant } from "@/lib/product-api";
import { Product } from "../data/mockData";
import { 
  PublishStatus 
} from "@/lib/enums";

// Convert Product type to ProductData type
export const convertProductToProductData = (oldProduct: Product): ProductData => {
  return {
    id: oldProduct.id,
    name: {
      en: typeof oldProduct.name === 'string' ? oldProduct.name : oldProduct.name?.en || "",
      my: typeof oldProduct.name === 'string' ? oldProduct.name : oldProduct.name?.my || ""
    },
    subtitle: "",
    description: {
      en: oldProduct.description || "",
      my: oldProduct.description || ""
    },
    brandId: "",
    hsnCode: "",
    modelNumber: oldProduct.sku || "",
    sku: oldProduct.sku || "",
    gender: [],
    keyFeatures: [],
    howToUse: "",
    ingredients: "",
    material: "",
    variants: [],
    mrp: parseFloat((oldProduct.price || "0").replace(/[^\d.]/g, '')) || 0,
    price: parseFloat((oldProduct.price || "0").replace(/[^\d.]/g, '')) || 0,
    sellingPrice: parseFloat((oldProduct.price || "0").replace(/[^\d.]/g, '')) || 0,
    taxClass: "",
    discount: 0,
    lowStockThreshold: 10,
    categoryIds: oldProduct.category ? [oldProduct.category] : [],
    searchTags: [],
    colors: [],
    sizes: [],
    occasions: [],
    materials: [],
    isEcoFriendly: false,
    isOrganic: false,
    bestFor: [],
    codAvailable: false,
    dispatchTime: "",
    returnPolicy: "",
    dimensions: {
      length: 0,
      width: 0,
      height: 0
    },
    netWeight: 0,
    packType: "",
    inStock: (oldProduct.stock || 0) > 0,
    videoUrl: "",
    videoType: "youtube",
    images: [],
    metaTitle: typeof oldProduct.name === 'string' ? oldProduct.name : oldProduct.name?.en || "",
    metaDescription: oldProduct.description || "",
    internalNotes: "",
    isLive: oldProduct.status === 'live',
    showInNewArrivals: false,
    featureOnHomepage: false,
    productTypes: []
  };
};

// Convert between variant types for compatibility
export const convertToProductVariants = (variants: any[]): ProductVariant[] => {
  return variants.map(v => ({
    sku: `${v.color}-${v.size}-${Date.now()}`,
    attributes: {
      color: v.color,
      size: v.size
    },
    price: parseFloat(v.price) || 0,
    stock: parseInt(v.stock) || 0,
    lowStockThreshold: 10
  }));
};

export const convertFromProductVariants = (variants: ProductVariant[]): any[] => {
  // Create a color map to get the correct hex values
  const colorMap: { [key: string]: string } = {
    'Red': '#EF4444',
    'Blue': '#3B82F6',
    'Green': '#22C55E',
    'Black': '#000000',
    'White': '#FFFFFF',
    'Yellow': '#EAB308',
    'Purple': '#A855F7',
    'Orange': '#F97316',
    'Pink': '#EC4899',
    'Gray': '#6B7280'
  };

  return variants.map(v => ({
    color: v.attributes.color,
    colorHex: colorMap[v.attributes.color] || '#000000',
    size: v.attributes.size,
    price: v.price.toString(),
    stock: v.stock.toString()
  }));
};

// Form validation function
export const validateProductForm = (formData: any) => {
  const validation = {
    mainCategory: !!formData.mainCategory,
    subCategory: !!formData.subCategory,
    productNameEn: !!formData.productNameEn,
    brandId: !!formData.brandId,
    productDescriptionEn: !!formData.productDescriptionEn,
    keyFeatures: formData.keyFeatures.length >= 3,
    productImages: formData.selectedFiles.filter((file: any): file is File => file !== null).length >= 1,
    mrp: !!formData.mrp,
    price: !!formData.price,
    sellingPrice: !!formData.sellingPrice,
    dimensionL: !!formData.dimensionL,
    dimensionW: !!formData.dimensionW,
    dimensionH: !!formData.dimensionH,
    netWeight: !!formData.netWeight,
    dispatchTime: !!formData.dispatchTime?.value,
    searchTags: formData.searchTags.length >= 3,
    metaTitle: !!formData.metaTitle,
    metaDescription: !!formData.metaDescription,
    gender: formData.gender.length > 0
  };

  // Log validation status for debugging
  console.log('🔍 Form validation status:', validation);
  
  // Log which specific fields are failing
  const failedFields = Object.entries(validation)
    .filter(([_field, isValid]) => !isValid)
    .map(([field]) => field);
  
  if (failedFields.length > 0) {
    console.log('❌ Failed validation fields:', failedFields);
  }
  
  const allValid = Object.values(validation).every(Boolean);
  console.log('✅ Form is valid:', allValid);
  
  // Set validation errors for display
  const errorMessages = failedFields.map(field => {
    const fieldLabels: { [key: string]: string } = {
      mainCategory: 'Main Category',
      subCategory: 'Sub Category',
      productNameEn: 'Product Name (English)',
      brandId: 'Brand',
      productDescriptionEn: 'Product Description (English)',
      keyFeatures: 'Key Features (minimum 3)',
      productImages: 'Product Images (minimum 1)',
      mrp: 'MRP',
      price: 'Price',
      sellingPrice: 'Selling Price',
      dimensionL: 'Length',
      dimensionW: 'Width',
      dimensionH: 'Height',
      netWeight: 'Net Weight',
      dispatchTime: 'Dispatch Time',
      searchTags: 'Search Tags (minimum 3)',
      metaTitle: 'Meta Title',
      metaDescription: 'Meta Description',
      gender: 'Target Gender'
    };
    return fieldLabels[field] || field;
  });
  
  return {
    isValid: allValid,
    errors: errorMessages,
    details: validation
  };
};

// Hook for managing product dialog state
export const useProductDialogState = (product: ProductData | Product | null, open: boolean) => {
  // Add loading states for different actions
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittingForReview, setIsSubmittingForReview] = useState(false);

  // Section 1: Category Selection state
  const [mainCategory, setMainCategory] = useState<string>("");
  const [subCategory, setSubCategory] = useState<string>("");
  const [subSubCategory, setSubSubCategory] = useState<string>("");

  // Section 2: Product Core Information state
  const [productNameEn, setProductNameEn] = useState("");
  const [productNameMy, setProductNameMy] = useState("");
  const [productSubtitle, setProductSubtitle] = useState("");
  const [brandId, setBrandId] = useState("");
  const [hsnCode, setHsnCode] = useState("");
  const [modelNumber, setModelNumber] = useState("");
  const [sku, setSku] = useState("");
  const [gender, setGender] = useState<string[]>([]);

  // Section 3: Description & Highlights state
  const [productDescriptionEn, setProductDescriptionEn] = useState("");
  const [productDescriptionMy, setProductDescriptionMy] = useState("");
  const [keyFeatureInput, setKeyFeatureInput] = useState("");
  const [keyFeatures, setKeyFeatures] = useState<string[]>([]);
  const [howToUse, setHowToUse] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [material, setMaterial] = useState("");

  // Section 4: Variants state
  const [variantColor, setVariantColor] = useState<{ value: string; color: string; label: string } | null>(null);
  const [variantSize, setVariantSize] = useState<{ value: string; label: string } | null>(null);
  const [variantPrice, setVariantPrice] = useState("");
  const [variantStock, setVariantStock] = useState("");
  const [variants, setVariants] = useState<ProductVariant[]>([]);

  // Section 5: Product Images & Media state
  const [productImages, setProductImages] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<(File | null)[]>(Array(6).fill(null));
  const [videoUrl, setVideoUrl] = useState("");
  const [videoType, setVideoType] = useState("youtube");

  // Section 6: Pricing & Inventory state
  const [mrp, setMrp] = useState("");
  const [price, setPrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [taxClass, setTaxClass] = useState("");
  const [discount, setDiscount] = useState("");

  // Section 7: Shipping, Packaging & Fulfilment state
  const [dimensionL, setDimensionL] = useState<string>("");
  const [dimensionW, setDimensionW] = useState<string>("");
  const [dimensionH, setDimensionH] = useState<string>("");
  const [netWeight, setNetWeight] = useState<string>("");
  const [packType, setPackType] = useState<{ value: string; label: string } | null>(null);
  const [dispatchTime, setDispatchTime] = useState<{ value: string; label: string } | null>(null);
  const [returnPolicy, setReturnPolicy] = useState<{ value: string; label: string } | null>(null);
  const [codAvailable, setCodAvailable] = useState<boolean>(false);

  // Section 8: SEO & Search Optimization state
  const [searchTags, setSearchTags] = useState<string[]>([]);
  const [searchTagInput, setSearchTagInput] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [internalNotes, setInternalNotes] = useState("");

  // Section 9: Filters Setup state
  const [filterOccasion, setFilterOccasion] = useState<{ value: string; label: string } | null>(null);
  const [filterMaterial, setFilterMaterial] = useState<{ value: string; label: string } | null>(null);
  const [isEcoFriendly, setIsEcoFriendly] = useState<boolean>(false);
  const [isOrganic, setIsOrganic] = useState<boolean>(false);
  const [filterBestFor, setFilterBestFor] = useState<{ value: string; label: string } | null>(null);

  // Section 10: Visibility & Publishing state
  const [publishStatus, setPublishStatus] = useState<"draft" | "preview">("draft");
  const [showInNewArrivals, setShowInNewArrivals] = useState<boolean>(false);
  const [featureOnHomepage, setFeatureOnHomepage] = useState<boolean>(false);
  const [enableForCampaigns, setEnableForCampaigns] = useState<boolean>(false);

  // Effect to populate form when editing a product
  useEffect(() => {
    if (product && open) {
      let productData: ProductData;

      // Check if it's the old Product type and convert it
      if ('status' in product && 'icon' in product) {
        // Old Product type - convert to ProductData
        productData = convertProductToProductData(product as Product);
      } else {
        // New ProductData type
        productData = product as ProductData;
      }

      // Populate basic information
      setProductNameEn(productData.name?.en || "");
      setProductNameMy(productData.name?.my || "");
      setProductSubtitle(productData.subtitle || "");
      setProductDescriptionEn(productData.description?.en || "");
      setProductDescriptionMy(productData.description?.my || "");
      setBrandId(productData.brandId || "");
      setHsnCode(productData.hsnCode || "");
      setModelNumber(productData.modelNumber || "");
      setSku(productData.sku || "");
      setGender(productData.gender || []);
      setKeyFeatures(productData.keyFeatures || []);
      setHowToUse(productData.howToUse || "");
      setIngredients(productData.ingredients || "");
      setMaterial(productData.material || "");
      setVariants(productData.variants || []);
      setMrp(productData.mrp?.toString() || "");
      setPrice(productData.price?.toString() || "");
      setSellingPrice(productData.sellingPrice?.toString() || "");
      setTaxClass(productData.taxClass || "");
      setDiscount(productData.discount?.toString() || "");
      setSearchTags(productData.searchTags || []);
      setVideoUrl(productData.videoUrl || "");
      setVideoType(productData.videoType || "youtube");
      setMetaTitle(productData.metaTitle || "");
      setMetaDescription(productData.metaDescription || "");
      setInternalNotes(productData.internalNotes || "");
      setCodAvailable(productData.codAvailable || false);
      setDispatchTime({ value: productData.dispatchTime || "", label: productData.dispatchTime || "" });
      setReturnPolicy({ value: productData.returnPolicy || "", label: productData.returnPolicy || "" });
      setDimensionL(productData.dimensions?.length?.toString() || "");
      setDimensionW(productData.dimensions?.width?.toString() || "");
      setDimensionH(productData.dimensions?.height?.toString() || "");
      setNetWeight(productData.netWeight?.toString() || "");
      setPackType({ value: productData.packType || "", label: productData.packType || "" });
      setIsEcoFriendly(productData.isEcoFriendly || false);
      setIsOrganic(productData.isOrganic || false);
      setShowInNewArrivals(productData.showInNewArrivals || false);
      setFeatureOnHomepage(productData.featureOnHomepage || false);

      // Handle categories - old Product type has single category, new has categoryIds array
      if (productData.categoryIds && productData.categoryIds.length > 0) {
        setMainCategory(productData.categoryIds[0] || "");
        setSubCategory(productData.categoryIds[1] || "");
        setSubSubCategory(productData.categoryIds[2] || "");
      }
      
      // Set status based on product status
      setPublishStatus(productData.isLive ? 'preview' : 'draft');

    } else if (!product && open) {
      // Reset form for new product
      handleReset();
    }
  }, [product, open]);

  // Handle reset/clear form
  const handleReset = () => {
    setMainCategory("");
    setSubCategory("");
    setSubSubCategory("");
    setProductNameEn("");
    setProductNameMy("");
    setProductSubtitle("");
    setBrandId("");
    setHsnCode("");
    setModelNumber("");
    setSku("");
    setGender([]);
    setProductDescriptionEn("");
    setProductDescriptionMy("");
    setKeyFeatureInput("");
    setKeyFeatures([]);
    setHowToUse("");
    setIngredients("");
    setMaterial("");
    setVariantColor(null);
    setVariantSize(null);
    setVariantPrice("");
    setVariantStock("");
    setVariants([]);
    setProductImages([]);
    setSelectedFiles(Array(6).fill(null));
    setVideoUrl("");
    setVideoType("youtube");
    setMrp("");
    setPrice("");
    setSellingPrice("");
    setTaxClass("");
    setDiscount("");
    setDimensionL("");
    setDimensionW("");
    setDimensionH("");
    setNetWeight("");
    setPackType(null);
    setDispatchTime(null);
    setReturnPolicy(null);
    setCodAvailable(false);
    setSearchTags([]);
    setSearchTagInput("");
    setMetaTitle("");
    setMetaDescription("");
    setInternalNotes("");
    setFilterOccasion(null);
    setFilterMaterial(null);
    setIsEcoFriendly(false);
    setIsOrganic(false);
    setFilterBestFor(null);
    setPublishStatus(PublishStatus.DRAFT);
    setShowInNewArrivals(false);
    setFeatureOnHomepage(false);
    setEnableForCampaigns(false);
  };

  return {
    // Loading states
    isSubmitting,
    setIsSubmitting,
    isSubmittingForReview,
    setIsSubmittingForReview,
    
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
  };
};
