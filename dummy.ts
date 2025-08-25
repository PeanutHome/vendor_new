"use client"

import { useEffect, useRef, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  ChevronDown,
  Clock,
  Image as ImageIcon,
  Loader2,
  Plus,
  Star,
  Trash2,
  TrendingUp,
  Upload,
  X,
  Zap,
} from "lucide-react"

import type { Product } from "@/lib/api/productApi"
import type { DictionaryType } from "@/lib/get-dictionary"

import { useGetBrandsQuery } from "@/lib/api/brandApi"
import {
  useGetAllCategoriesQuery,
  useGetCategoriesQuery,
  useGetMegaMenuCategoriesQuery,
} from "@/lib/api/categoryApi"
import { useGetHSNCodesQuery } from "@/lib/api/hsnApi"
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "@/lib/api/productApi"
import { useGetApprovedVendorsQuery } from "@/lib/api/vendorApi"

import { toast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

// Form validation schema
const productSchema = z.object({
  name: z.object({
    en: z
      .string()
      .min(1, "English name is required")
      .max(200, "English name must not exceed 200 characters"),
    my: z
      .string()
      .min(1, "Myanmar name is required")
      .max(200, "Myanmar name must not exceed 200 characters"),
  }),
  sku: z.string().optional(),
  description: z.object({
    en: z
      .string()
      .min(1, "English description is required")
      .max(2000, "English description must not exceed 2000 characters"),
    my: z
      .string()
      .min(1, "Myanmar description is required")
      .max(2000, "Myanmar description must not exceed 2000 characters"),
  }),
  modelNumber: z.string().min(1, "Model number is required"),
  brandId: z.string().optional(),
  hsnCode: z.string().min(1, "HSN Code is required"),
  categoryIds: z.array(z.string()).optional().default([]),
  mrp: z
    .string()
    .min(1, "MRP is required")
    .regex(/^\d+(\.\d{1,2})?$/, "Invalid MRP format"),
  sellingPrice: z
    .string()
    .min(1, "Selling price is required")
    .regex(/^\d+(\.\d{1,2})?$/, "Invalid selling price format"),
  discount: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^\d+(\.\d{1,2})?$/.test(val),
      "Invalid discount format"
    ),
  gender: z
    .array(z.enum(["men", "women", "unisex", "kids", "baby"]))
    .min(1, "At least one gender must be selected")
    .optional()
    .default([]),
  keyFeatures: z.array(z.string()).optional().default([]),
  variants: z
    .array(
      z.object({
        sku: z.string().min(1, "Variant SKU is required"),
        attributes: z.object({
          color: z.string().optional(),
          size: z.string().optional(),
        }),
        price: z
          .number()
          .min(0, "Price must be positive")
          .or(z.string().transform((val) => parseFloat(val) || 0)),
        stock: z
          .number()
          .min(0, "Stock must be positive")
          .or(z.string().transform((val) => parseInt(val) || 0)),
        lowStockThreshold: z
          .number()
          .min(0, "Low stock threshold must be positive")
          .optional()
          .or(z.string().transform((val) => parseInt(val) || 0)),
      })
    )
    .optional()
    .default([]),
  dispatchTime: z.enum(["1_day", "2_3_days", "5_7_days", "1_week"]).optional(),
  returnPolicy: z
    .enum(["no_return", "7_days", "15_days", "30_days"])
    .optional(),
  codAvailable: z.boolean().optional().default(false),
  searchTags: z.array(z.string()).optional().default([]),
  isLive: z.boolean().optional().default(false),
  subtitle: z.string().optional(),
  howToUse: z.string().optional(),
  ingredients: z.string().optional(),
  material: z.string().optional(),
  videoUrl: z.string().url().optional().or(z.literal("")),
  videoType: z.enum(["youtube", "vimeo", "other"]).optional(),
  taxClass: z.enum(["GST_5", "GST_12", "GST_18", "GST_28"]).optional(),
  dimensions: z
    .object({
      length: z
        .number()
        .min(0)
        .or(z.string().transform((val) => parseFloat(val) || 0)),
      width: z
        .number()
        .min(0)
        .or(z.string().transform((val) => parseFloat(val) || 0)),
      height: z
        .number()
        .min(0)
        .or(z.string().transform((val) => parseFloat(val) || 0)),
    })
    .optional(),
  netWeight: z
    .number()
    .min(0)
    .optional()
    .or(z.string().transform((val) => parseFloat(val) || 0)),
  packType: z.string().optional(),
  metaTitle: z
    .string()
    .max(60, "Meta title must not exceed 60 characters")
    .optional(),
  metaDescription: z
    .string()
    .max(160, "Meta description must not exceed 160 characters")
    .optional(),
  internalNotes: z.string().optional(),
  colors: z.array(z.string()).optional().default([]),
  sizes: z.array(z.string()).optional().default([]),
  occasions: z.array(z.string()).optional().default([]),
  materials: z.array(z.string()).optional().default([]),
  isEcoFriendly: z.boolean().optional().default(false),
  isOrganic: z.boolean().optional().default(false),
  bestFor: z.array(z.string()).optional().default([]),
  showInNewArrivals: z.boolean().optional().default(false),
  featureOnHomepage: z.boolean().optional().default(false),
  productTypes: z.array(z.string()).optional().default([]),
  // Legacy fields for backward compatibility
  price: z.string().optional(),
  stock: z.string().optional(),
  rating: z.string().optional(),
  vendorId: z.string().optional(),
  isFeatured: z.boolean().optional(),
  featuredOrder: z.string().optional(),
  viewCount: z.string().optional(),
  flashSaleEndDate: z.string().optional(),
})

type ProductFormValues = z.infer<typeof productSchema>

interface ProductDialogProps {
  dictionary: DictionaryType
  mode: "create" | "edit"
  product?: Product | null
  open?: boolean
  onOpenChange?: (open: boolean) => void
  trigger?: React.ReactNode
}

export function ProductDialog({
  dictionary,
  mode,
  product,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  trigger,
}: ProductDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<(File | null)[]>(
    Array(8).fill(null)
  )
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedHSNCodes, setSelectedHSNCodes] = useState<string[]>([])
  const [selectedGenders, setSelectedGenders] = useState<string[]>([])
  const [keyFeatures, setKeyFeatures] = useState<string[]>([])
  const [searchTags, setSearchTags] = useState<string[]>([])
  const [colors, setColors] = useState<string[]>([])
  const [sizes, setSizes] = useState<string[]>([])
  const [occasions, setOccasions] = useState<string[]>([])
  const [materials, setMaterials] = useState<string[]>([])
  const [bestFor, setBestFor] = useState<string[]>([])
  const [productTypes, setProductTypes] = useState<string[]>([])
  const [variants, setVariants] = useState<any[]>([])
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Use controlled or uncontrolled state
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : internalOpen
  const setOpen = isControlled ? controlledOnOpenChange! : setInternalOpen

  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation()
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation()

  // Try mega menu API first for hierarchical categories, fallback to other APIs if it fails
  const { data: megaMenuCategoriesData, error: megaMenuError } =
    useGetMegaMenuCategoriesQuery()
  const { data: allCategoriesData, error: allCategoriesError } =
    useGetAllCategoriesQuery()
  const { data: paginatedCategoriesData } = useGetCategoriesQuery({
    limit: 1000,
  })

  const { data: vendorsData, isLoading: vendorsLoading } =
    useGetApprovedVendorsQuery()

  const { data: brandsData, isLoading: brandsLoading } = useGetBrandsQuery()
  const { data: hsnCodesData, isLoading: hsnCodesLoading } =
    useGetHSNCodesQuery()

  const isLoading = isCreating || isUpdating

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    mode: "onBlur",
    defaultValues: {
      name: {
        en: "",
        my: "",
      },
      sku: "",
      description: {
        en: "",
        my: "",
      },
      modelNumber: "",
      brandId: "none",
      hsnCode: "",
      categoryIds: [],
      mrp: "",
      sellingPrice: "",
      discount: "",
      gender: ["unisex"],
      keyFeatures: [],
      variants: [],
      dispatchTime: "5_7_days",
      returnPolicy: "7_days",
      codAvailable: false,
      searchTags: [],
      isLive: false,
      subtitle: "",
      howToUse: "",
      ingredients: "",
      material: "",
      videoUrl: "",
      videoType: "other",
      taxClass: "GST_12",
      dimensions: { length: 0, width: 0, height: 0 },
      netWeight: 0,
      packType: "",
      metaTitle: "",
      metaDescription: "",
      internalNotes: "",
      colors: [],
      sizes: [],
      occasions: [],
      materials: [],
      isEcoFriendly: false,
      isOrganic: false,
      bestFor: [],
      showInNewArrivals: false,
      featureOnHomepage: false,
      productTypes: [],
      // Legacy fields for backward compatibility
      price: "",
      stock: "",
      rating: "",
      vendorId: "none",
      isFeatured: false,
      featuredOrder: "",
      viewCount: "",
      flashSaleEndDate: "",
    },
  })

  // Synchronize variants with form
  useEffect(() => {
    form.setValue("variants", variants)
  }, [variants, form])

  // Populate form when editing
  useEffect(() => {
    if (mode === "edit" && product) {
      form.reset({
        name: {
          en: product.name?.en || "",
          my: product.name?.my || "",
        },
        sku: product.sku || "",
        description: {
          en: product.description?.en || "",
          my: product.description?.my || "",
        },
        modelNumber: product.modelNumber || "",
        brandId: product.brand?.id || "",
        hsnCode: product.hsnCode || "",
        categoryIds: product.categories?.map((cat) => cat.id) || [],
        mrp: product.mrp?.toString() || "",
        sellingPrice: product.sellingPrice?.toString() || "",
        discount: product.discount?.toString() || "",
        gender: (product.gender as any) || ["unisex"],
        keyFeatures: product.keyFeatures || [
          "Feature 1",
          "Feature 2",
          "Feature 3",
        ],
        variants: product.variants || [],
        dispatchTime: (product.dispatchTime as any) || "5_7_days",
        returnPolicy: (product.returnPolicy as any) || "7_days",
        codAvailable: product.codAvailable || false,
        searchTags: product.searchTags || [],
        isLive: product.isLive || false,
        subtitle: product.subtitle || "",
        howToUse: product.howToUse || "",
        ingredients: product.ingredients || "",
        material: product.material || "",
        videoUrl: product.videoUrl || "",
        videoType: product.videoType || "other",
        taxClass: product.taxClass || "GST_12",
        dimensions: product.dimensions || { length: 0, width: 0, height: 0 },
        netWeight: product.netWeight || 0,
        packType: product.packType || "",
        metaTitle: product.metaTitle || "",
        metaDescription: product.metaDescription || "",
        internalNotes: product.internalNotes || "",
        colors: product.colors || [],
        sizes: product.sizes || [],
        occasions: product.occasions || [],
        materials: product.materials || [],
        isEcoFriendly: product.isEcoFriendly || false,
        isOrganic: product.isOrganic || false,
        bestFor: product.bestFor || [],
        showInNewArrivals: product.showInNewArrivals || false,
        featureOnHomepage: product.featureOnHomepage || false,
        productTypes: product.productTypes || [],
        // Legacy fields for backward compatibility
        price: product.price?.toString() || "",
        stock: product.stock?.toString() || "",
        rating: product.rating?.toString() || "",
        vendorId: product.vendorId || "none",
        isFeatured: product.isFeatured || false,
        featuredOrder: product.featuredOrder?.toString() || "",
        viewCount: product.viewCount?.toString() || "",
        flashSaleEndDate: product.flashSaleEndDate || "",
      })

      // Set categories
      const categoryIds = product.categories?.map((cat) => cat.id) || []
      setSelectedCategories(categoryIds)

      // Set existing images
      const existingImageUrls = product.mainImages || []
      setImageUrls(existingImageUrls)

      // Set other state variables
      setSelectedGenders((product.gender as any) || [])
      setKeyFeatures(product.keyFeatures || [])
      setSearchTags(product.searchTags || [])
      setColors(product.colors || [])
      setSizes(product.sizes || [])
      setOccasions(product.occasions || [])
      setMaterials(product.materials || [])
      setBestFor(product.bestFor || [])
      setProductTypes(product.productTypes || [])
      setVariants(product.variants || [])

      // Clear selected files for edit mode
      setSelectedFiles([])
    } else if (mode === "create") {
      // Reset variants for create mode
      setVariants([])
      // Reset form for create mode
      form.reset({
        name: {
          en: "",
          my: "",
        },
        sku: "",
        description: {
          en: "",
          my: "",
        },
        modelNumber: "",
        brandId: "none",
        hsnCode: "",
        categoryIds: [],
        mrp: "",
        sellingPrice: "",
        discount: "",
        gender: ["unisex"],
        keyFeatures: [],
        variants: [],
        dispatchTime: "5_7_days",
        returnPolicy: "7_days",
        codAvailable: false,
        searchTags: [],
        isLive: false,
        subtitle: "",
        howToUse: "",
        ingredients: "",
        material: "",
        videoUrl: "",
        videoType: "other",
        taxClass: "GST_12",
        dimensions: { length: 0, width: 0, height: 0 },
        netWeight: 0,
        packType: "",
        metaTitle: "",
        metaDescription: "",
        internalNotes: "",
        colors: [],
        sizes: [],
        occasions: [],
        materials: [],
        isEcoFriendly: false,
        isOrganic: false,
        bestFor: [],
        showInNewArrivals: false,
        featureOnHomepage: false,
        productTypes: [],
        // Legacy fields for backward compatibility
        price: "",
        stock: "",
        rating: "",
        vendorId: "none",
        isFeatured: false,
        featuredOrder: "",
        viewCount: "",
        flashSaleEndDate: "",
      })
      setSelectedCategories([])
      setSelectedGenders([])
      setKeyFeatures([])
      setSearchTags([])
      setColors([])
      setSizes([])
      setOccasions([])
      setMaterials([])
      setBestFor([])
      setProductTypes([])
      setVariants([])
      setImageUrls([])
      setSelectedFiles([])
    }
  }, [mode, product, form])

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])

    // Validate file types
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
    const validFiles = files.filter((file) => allowedTypes.includes(file.type))

    if (validFiles.length !== files.length) {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Only JPEG, PNG, and WebP images are allowed",
      })
    }

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024 // 10MB
    const sizeValidFiles = validFiles.filter((file) => file.size <= maxSize)

    if (sizeValidFiles.length !== validFiles.length) {
      toast({
        variant: "destructive",
        title: "File too large",
        description: "Files must be smaller than 10MB",
      })
    }

    setSelectedFiles((prev) => [...prev, ...sizeValidFiles])
  }

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const removeImageUrl = (index: number) => {
    setImageUrls((prev) => prev.filter((_, i) => i !== index))
  }

  const addImageUrl = () => {
    const url = prompt("Enter image URL:")
    if (url && url.trim()) {
      setImageUrls((prev) => [...prev, url.trim()])
    }
  }

  const toggleCategory = (categoryId: string) => {
    const newCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId]

    setSelectedCategories(newCategories)
    // Update form field
    form.setValue("categoryIds", newCategories, { shouldValidate: true })
  }

  // Watch form field and sync with state
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "categoryIds") {
        const categoryIds = value.categoryIds || []
        // Filter out undefined values and ensure they are strings
        const validCategoryIds = categoryIds.filter(
          (id): id is string => id !== undefined
        )
        setSelectedCategories(validCategoryIds)
      }
    })
    return () => subscription.unsubscribe()
  }, [form])

  const onSubmit = async (values: ProductFormValues) => {
    // ✅ FIXED: Validate that at least 1 image is selected (backend requirement)
    const validFiles = selectedFiles.filter(
      (file): file is File => file !== null
    )
    console.log("Valid files:", validFiles)
    console.log("Valid files count:", validFiles.length)

    // Trigger validation
    const isValid = await form.trigger()

    if (!isValid) {
      console.log("Form validation failed")
      console.log("Form errors:", form.formState.errors)
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fix the errors in the form before submitting.",
      })
      return
    }

    // Additional validation for variants
    if (!values.variants || values.variants.length === 0) {
      console.log("No variants found")
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "At least one product variant is required.",
      })
      return
    }

    // Validate each variant
    for (let i = 0; i < values.variants.length; i++) {
      const variant = values.variants[i]
      if (!variant.sku || variant.sku.trim() === "") {
        toast({
          variant: "destructive",
          title: "Validation Error",
          description: `Variant ${i + 1}: SKU is required.`,
        })
        return
      }
      if (variant.price <= 0) {
        toast({
          variant: "destructive",
          title: "Validation Error",
          description: `Variant ${i + 1}: Price must be greater than 0.`,
        })
        return
      }
      if (variant.stock < 0) {
        toast({
          variant: "destructive",
          title: "Validation Error",
          description: `Variant ${i + 1}: Stock cannot be negative.`,
        })
        return
      }
    }

    try {
      if (mode === "create") {
        const productData = {
          name: values.name,
          description: values.description,
          modelNumber: values.modelNumber,
          brandId: values.brandId === "none" ? undefined : values.brandId,
          hsnCode: values.hsnCode,
          categoryIds: selectedCategories,
          mrp: parseFloat(values.mrp),
          sellingPrice: parseFloat(values.sellingPrice),
          discount: values.discount ? parseFloat(values.discount) : undefined,
          gender: selectedGenders,
          keyFeatures: keyFeatures,
          variants: values.variants.map((variant) => ({
            ...variant,
            attributes: variant.attributes || { color: "", size: "" },
            lowStockThreshold: variant.lowStockThreshold || 0,
          })),
          dispatchTime: values.dispatchTime || "3-5 business days",
          returnPolicy: values.returnPolicy || "7 days return policy",
          codAvailable: values.codAvailable,
          searchTags: searchTags,
          isLive: values.isLive,
          subtitle: values.subtitle,
          howToUse: values.howToUse,
          ingredients: values.ingredients,
          material: values.material,
          videoUrl: values.videoUrl,
          videoType: values.videoType,
          taxClass: values.taxClass,
          dimensions: values.dimensions,
          netWeight: values.netWeight,
          packType: values.packType,
          metaTitle: values.metaTitle,
          metaDescription: values.metaDescription,
          internalNotes: values.internalNotes,
          colors: colors,
          sizes: sizes,
          occasions: occasions,
          materials: materials,
          isEcoFriendly: values.isEcoFriendly,
          isOrganic: values.isOrganic,
          bestFor: bestFor,
          showInNewArrivals: values.showInNewArrivals,
          featureOnHomepage: values.featureOnHomepage,
          productTypes: productTypes,
          // FIXED: Include images for API Gateway to handle
          images: selectedFiles.filter((file): file is File => file !== null),
          // Legacy fields for backward compatibility
          sku: values.sku,
          price: values.price ? parseFloat(values.price) : undefined,
          stock: values.stock ? parseInt(values.stock) : undefined,
          rating: values.rating ? parseFloat(values.rating) : undefined,
          vendorId: values.vendorId === "none" ? undefined : values.vendorId,
          isFeatured: values.isFeatured,
          featuredOrder: values.featuredOrder
            ? parseInt(values.featuredOrder)
            : undefined,
          viewCount: values.viewCount ? parseInt(values.viewCount) : undefined,
          flashSaleEndDate: values.flashSaleEndDate,
        }

        console.log("Sending product data to API:", productData)
        console.log("Product data keys:", Object.keys(productData))

        await createProduct(productData).unwrap()

        toast({
          title: dictionary.products.messages?.created || "Product Created",
          description:
            dictionary.products.messages?.created ||
            "The new product has been added successfully.",
        })
      } else if (mode === "edit" && product) {
        const updateData = {
          id: product.id,
          name: values.name,
          description: values.description,
          modelNumber: values.modelNumber,
          brandId: values.brandId === "none" ? undefined : values.brandId,
          hsnCode: values.hsnCode,
          categoryIds: selectedCategories,
          mrp: parseFloat(values.mrp),
          sellingPrice: parseFloat(values.sellingPrice),
          discount: values.discount ? parseFloat(values.discount) : undefined,
          gender: selectedGenders,
          keyFeatures: keyFeatures,
          variants: values.variants.map((variant) => ({
            ...variant,
            attributes: variant.attributes || { color: "", size: "" },
            lowStockThreshold: variant.lowStockThreshold || 0,
          })),
          dispatchTime: values.dispatchTime || "3-5 business days",
          returnPolicy: values.returnPolicy || "7 days return policy",
          codAvailable: values.codAvailable,
          searchTags: searchTags,
          isLive: values.isLive,
          subtitle: values.subtitle,
          howToUse: values.howToUse,
          ingredients: values.ingredients,
          material: values.material,
          videoUrl: values.videoUrl,
          videoType: values.videoType,
          taxClass: values.taxClass,
          dimensions: values.dimensions,
          netWeight: values.netWeight,
          packType: values.packType,
          metaTitle: values.metaTitle,
          metaDescription: values.metaDescription,
          internalNotes: values.internalNotes,
          colors: colors,
          sizes: sizes,
          occasions: occasions,
          materials: materials,
          isEcoFriendly: values.isEcoFriendly,
          isOrganic: values.isOrganic,
          bestFor: bestFor,
          showInNewArrivals: values.showInNewArrivals,
          featureOnHomepage: values.featureOnHomepage,
          productTypes: productTypes,
          images: selectedFiles.filter((file): file is File => file !== null),
          // Legacy fields for backward compatibility
          sku: values.sku,
          price: values.price ? parseFloat(values.price) : undefined,
          stock: values.stock ? parseInt(values.stock) : undefined,
          rating: values.rating ? parseFloat(values.rating) : undefined,
          vendorId: values.vendorId === "none" ? undefined : values.vendorId,
          isFeatured: values.isFeatured,
          featuredOrder: values.featuredOrder
            ? parseInt(values.featuredOrder)
            : undefined,
          viewCount: values.viewCount ? parseInt(values.viewCount) : undefined,
          flashSaleEndDate: values.flashSaleEndDate,
        }

        await updateProduct(updateData).unwrap()

        toast({
          title: dictionary.products.messages?.updated || "Product Updated",
          description:
            dictionary.products.messages?.updated ||
            "The product has been updated successfully.",
        })
      }

      // Reset form and close dialog
      if (!isControlled) {
        form.reset({
          ...form.getValues(),
          brandId: "none",
        })
        setSelectedFiles(Array(8).fill(null))
        setSelectedCategories([])
        setSelectedGenders([])
        setKeyFeatures([])
        setSearchTags([])
        setColors([])
        setSizes([])
        setOccasions([])
        setMaterials([])
        setBestFor([])
        setProductTypes([])
        setVariants([])
        setImageUrls([])
      }
      setOpen(false)
    } catch (error: any) {
      console.error("Product creation/update error:", error)
      console.error("Error data:", error?.data)
      console.error("Error message:", error?.data?.message)

      toast({
        variant: "destructive",
        title: "Error",
        description:
          error?.data?.message ||
          dictionary.products.messages?.error ||
          `Failed to ${mode} product.`,
      })
    }
  }

  // Helper function to flatten hierarchical categories
  const flattenCategories = (categories: any[]): any[] => {
    const flattened: any[] = []

    const traverse = (cats: any[]) => {
      cats.forEach((cat) => {
        flattened.push(cat)
        if (cat.children && Array.isArray(cat.children)) {
          traverse(cat.children)
        }
      })
    }

    traverse(categories)
    return flattened
  }

  // Helper function to ensure we always get an array of categories
  const getCategoriesArray = (data: any): any[] => {
    if (!data) return []
    if (Array.isArray(data)) return data
    if (data && typeof data === "object" && "data" in data)
      return (data as any).data || []
    return []
  }

  // Use mega menu API if available for hierarchical categories, otherwise fallback to other APIs
  const rawCategories =
    getCategoriesArray(megaMenuCategoriesData) ||
    getCategoriesArray(allCategoriesData) ||
    getCategoriesArray(paginatedCategoriesData) ||
    []

  // Flatten hierarchical structure if it exists
  const categories = megaMenuCategoriesData
    ? flattenCategories(rawCategories)
    : rawCategories
  const vendors = vendorsData || []

  const dialogContent = (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="w-1/2 h-11/12 flex flex-col p-8">
        <DialogHeader className="flex-shrink-0 pb-4">
          <DialogTitle>
            {mode === "create"
              ? dictionary.products.createNew || "Create New Product"
              : dictionary.products.editProduct || "Edit Product"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? dictionary.products.subtitle ||
                "Add a new product to your inventory"
              : "Update product information"}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col flex-1 min-h-0"
          >
            {/* Error Summary */}
            {Object.keys(form.formState.errors).length > 0 && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <h4 className="text-sm font-medium text-red-800 mb-2">
                  Please fix the following errors:
                </h4>
                <ul className="text-sm text-red-700 space-y-1">
                  {Object.entries(form.formState.errors).map(
                    ([field, error]) => (
                      <li key={field} className="flex items-start gap-2">
                        <span className="text-red-500 mt-0.5">•</span>
                        <span>
                          <strong className="capitalize">
                            {field.replace(/([A-Z])/g, " $1").trim()}:
                          </strong>{" "}
                          {error?.message || "This field is required"}
                        </span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}

            <div className="flex-1 overflow-y-auto space-y-6 pr-2 pb-4">
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-6">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="pricing">Pricing</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="variants">Variants</TabsTrigger>
                  <TabsTrigger value="images">Images</TabsTrigger>
                  <TabsTrigger value="seo">SEO & Meta</TabsTrigger>
                </TabsList>

                {/* Basic Information Tab */}
                <TabsContent value="basic" className="space-y-6">
                  {/* Product Name */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Name</FormLabel>
                        <FormControl>
                          <Tabs defaultValue="en" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                              <TabsTrigger value="en">English</TabsTrigger>
                              <TabsTrigger value="my">မြန်မာ</TabsTrigger>
                            </TabsList>
                            <TabsContent value="en">
                              <Input
                                placeholder="Enter product name in English"
                                value={field.value.en}
                                onChange={(e) =>
                                  field.onChange({
                                    ...field.value,
                                    en: e.target.value,
                                  })
                                }
                              />
                            </TabsContent>
                            <TabsContent value="my">
                              <Input
                                placeholder="ထုတ်ကုန်အမည်ကို မြန်မာလို ထည့်ပါ"
                                value={field.value.my}
                                onChange={(e) =>
                                  field.onChange({
                                    ...field.value,
                                    my: e.target.value,
                                  })
                                }
                              />
                            </TabsContent>
                          </Tabs>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Description */}
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description (50+ characters each)</FormLabel>
                        <FormControl>
                          <Tabs defaultValue="en" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                              <TabsTrigger value="en">English</TabsTrigger>
                              <TabsTrigger value="my">မြန်မာ</TabsTrigger>
                            </TabsList>
                            <TabsContent value="en">
                              <Textarea
                                placeholder="Enter product description in English (minimum 50 characters)"
                                className="min-h-[100px]"
                                value={field.value.en || ""}
                                onChange={(e) =>
                                  field.onChange({
                                    ...field.value,
                                    en: e.target.value,
                                  })
                                }
                                onBlur={() => {
                                  // Only validate if user has started typing
                                  if ((field.value.en || "").length > 0) {
                                    form.trigger("description.en")
                                  }
                                }}
                              />
                            </TabsContent>
                            <TabsContent value="my">
                              <Textarea
                                placeholder="ထုတ်ကုန်ဖော်ပြချက်ကို မြန်မာလို ထည့်ပါ (အနည်းဆုံး ၅၀ လုံး)"
                                className="min-h-[100px]"
                                value={field.value.my || ""}
                                onChange={(e) =>
                                  field.onChange({
                                    ...field.value,
                                    my: e.target.value,
                                  })
                                }
                                onBlur={() => {
                                  // Only validate if user has started typing
                                  if ((field.value.my || "").length > 0) {
                                    form.trigger("description.my")
                                  }
                                }}
                              />
                            </TabsContent>
                          </Tabs>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Model Number and SKU */}
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="modelNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Model Number</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., SNACK-001" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="sku"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>SKU (Optional)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Stock Keeping Unit"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Brand and HSN Code */}
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="brandId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Brand</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a brand" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="none">No Brand</SelectItem>
                              {brandsLoading ? (
                                <SelectItem value="loading" disabled>
                                  Loading brands...
                                </SelectItem>
                              ) : brandsData?.data?.length === 0 ? (
                                <SelectItem value="no-brands" disabled>
                                  No brands available
                                </SelectItem>
                              ) : (
                                brandsData?.data?.map((brand) => (
                                  <SelectItem key={brand.id} value={brand.id}>
                                    {brand.name}
                                  </SelectItem>
                                ))
                              )}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="hsnCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>HSN Code</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select HSN Code" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {hsnCodesLoading ? (
                                <SelectItem value="loading-hsn" disabled>
                                  Loading HSN codes...
                                </SelectItem>
                              ) : (
                                (() => {
                                  // Handle both paginated and non-paginated responses
                                  const hsnCodes = Array.isArray(hsnCodesData)
                                    ? hsnCodesData
                                    : hsnCodesData?.data || []

                                  if (hsnCodes.length === 0) {
                                    return (
                                      <SelectItem value="no-hsn-codes" disabled>
                                        No HSN codes available
                                      </SelectItem>
                                    )
                                  }

                                  return hsnCodes.map((hsn: any) => (
                                    <SelectItem key={hsn.id} value={hsn.code}>
                                      {hsn.code} - {hsn.description}
                                    </SelectItem>
                                  ))
                                })()
                              )}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Categories */}
                  <div className="space-y-3">
                    <Label>Categories</Label>
                    <div className="space-y-4">
                      {/* Level 1 Categories */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">
                          Level 1 Categories
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {categories
                            .filter((category: any) => category.level === 1)
                            .map((category: any) => {
                              const categoryName =
                                typeof category.name === "object"
                                  ? category.name.en ||
                                    category.name.my ||
                                    "Unnamed Category"
                                  : category.name || "Unnamed Category"

                              return (
                                <Badge
                                  key={category.id}
                                  variant={
                                    selectedCategories.includes(category.id)
                                      ? "default"
                                      : "outline"
                                  }
                                  className="cursor-pointer"
                                  onClick={() => toggleCategory(category.id)}
                                >
                                  {categoryName}
                                </Badge>
                              )
                            })}
                        </div>
                      </div>

                      {/* Level 2 Categories */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">
                          Level 2 Categories
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {categories
                            .filter((category: any) => category.level === 2)
                            .map((category: any) => {
                              const categoryName =
                                typeof category.name === "object"
                                  ? category.name.en ||
                                    category.name.my ||
                                    "Unnamed Category"
                                  : category.name || "Unnamed Category"

                              return (
                                <Badge
                                  key={category.id}
                                  variant={
                                    selectedCategories.includes(category.id)
                                      ? "default"
                                      : "outline"
                                  }
                                  className="cursor-pointer"
                                  onClick={() => toggleCategory(category.id)}
                                >
                                  {categoryName}
                                </Badge>
                              )
                            })}
                        </div>
                      </div>

                      {/* Level 3 Categories */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">
                          Level 3 Categories
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {categories
                            .filter((category: any) => category.level === 3)
                            .map((category: any) => {
                              const categoryName =
                                typeof category.name === "object"
                                  ? category.name.en ||
                                    category.name.my ||
                                    "Unnamed Category"
                                  : category.name || "Unnamed Category"

                              return (
                                <Badge
                                  key={category.id}
                                  variant={
                                    selectedCategories.includes(category.id)
                                      ? "default"
                                      : "outline"
                                  }
                                  className="cursor-pointer"
                                  onClick={() => toggleCategory(category.id)}
                                >
                                  {categoryName}
                                </Badge>
                              )
                            })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Gender */}
                  <div className="space-y-3">
                    <Label>Gender</Label>
                    <div className="flex flex-wrap gap-2">
                      {["men", "women", "unisex", "kids", "baby"].map(
                        (gender) => (
                          <Badge
                            key={gender}
                            variant={
                              selectedGenders.includes(gender)
                                ? "default"
                                : "outline"
                            }
                            className="cursor-pointer"
                            onClick={() => {
                              setSelectedGenders((prev) =>
                                prev.includes(gender)
                                  ? prev.filter((g) => g !== gender)
                                  : [...prev, gender]
                              )
                            }}
                          >
                            {gender.charAt(0).toUpperCase() + gender.slice(1)}
                          </Badge>
                        )
                      )}
                    </div>
                  </div>

                  {/* Key Features */}
                  <div className="space-y-3">
                    <Label>Key Features</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a key feature"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            const input = e.target as HTMLInputElement
                            if (input.value.trim()) {
                              setKeyFeatures((prev) => [
                                ...prev,
                                input.value.trim(),
                              ])
                              input.value = ""
                            }
                          }
                        }}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.preventDefault()
                          const input = e.currentTarget
                            .previousElementSibling as HTMLInputElement
                          if (input && input.value.trim()) {
                            setKeyFeatures((prev) => [
                              ...prev,
                              input.value.trim(),
                            ])
                            input.value = ""
                          }
                        }}
                      >
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {keyFeatures.map((feature, index) => (
                        <Badge
                          key={index}
                          variant="default"
                          className="cursor-pointer"
                          onClick={() =>
                            setKeyFeatures((prev) =>
                              prev.filter((_, i) => i !== index)
                            )
                          }
                        >
                          {feature} ×
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {/* Pricing Tab */}
                <TabsContent value="pricing" className="space-y-6">
                  {/* MRP and Selling Price */}
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="mrp"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>MRP (Maximum Retail Price)</FormLabel>
                          <FormControl>
                            <Input placeholder="0.00" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="sellingPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Selling Price</FormLabel>
                          <FormControl>
                            <Input placeholder="0.00" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Discount */}
                  <FormField
                    control={form.control}
                    name="discount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Discount (%)</FormLabel>
                        <FormControl>
                          <Input placeholder="0" {...field} />
                        </FormControl>
                        <FormDescription>
                          20%+ for Hot Deals, 30%+ for Flash Sale
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Tax Class */}
                  <FormField
                    control={form.control}
                    name="taxClass"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tax Class</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select tax class" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="GST_5">GST 5%</SelectItem>
                            <SelectItem value="GST_12">GST 12%</SelectItem>
                            <SelectItem value="GST_18">GST 18%</SelectItem>
                            <SelectItem value="GST_28">GST 28%</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Dispatch Time and Return Policy */}
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="dispatchTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Dispatch Time</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select dispatch time" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="1_day">1 Day</SelectItem>
                              <SelectItem value="2_3_days">2-3 Days</SelectItem>
                              <SelectItem value="5_7_days">5-7 Days</SelectItem>
                              <SelectItem value="1_week">1 Week</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="returnPolicy"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Return Policy</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select return policy" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="no_return">
                                No Return
                              </SelectItem>
                              <SelectItem value="7_days">7 Days</SelectItem>
                              <SelectItem value="15_days">15 Days</SelectItem>
                              <SelectItem value="30_days">30 Days</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* COD Available */}
                  <FormField
                    control={form.control}
                    name="codAvailable"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Cash on Delivery Available</FormLabel>
                          <FormDescription>
                            Allow customers to pay cash on delivery
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </TabsContent>

                {/* Details Tab */}
                <TabsContent value="details" className="space-y-6">
                  {/* Subtitle */}
                  <FormField
                    control={form.control}
                    name="subtitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subtitle</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Fresh and tasty snacks"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* How to Use */}
                  <FormField
                    control={form.control}
                    name="howToUse"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>How to Use</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="e.g., Store in cool dry place, consume within 6 months"
                            className="min-h-[80px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Ingredients */}
                  <FormField
                    control={form.control}
                    name="ingredients"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ingredients</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="e.g., Potato, Oil, Salt, Spices, Natural Flavors"
                            className="min-h-[80px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Material */}
                  <FormField
                    control={form.control}
                    name="material"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Material</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Food grade packaging"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Video URL and Type */}
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="videoUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Video URL</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="https://youtube.com/watch?v=..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="videoType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Video Type</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select video type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="youtube">YouTube</SelectItem>
                              <SelectItem value="vimeo">Vimeo</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Dimensions and Weight */}
                  <div className="grid grid-cols-4 gap-4">
                    <FormField
                      control={form.control}
                      name="dimensions.length"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Length (cm)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="0"
                              value={field.value}
                              onChange={(e) =>
                                field.onChange(parseFloat(e.target.value) || 0)
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="dimensions.width"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Width (cm)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="0"
                              value={field.value}
                              onChange={(e) =>
                                field.onChange(parseFloat(e.target.value) || 0)
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="dimensions.height"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Height (cm)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="0"
                              value={field.value}
                              onChange={(e) =>
                                field.onChange(parseFloat(e.target.value) || 0)
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="netWeight"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Net Weight (g)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="0"
                              value={field.value}
                              onChange={(e) =>
                                field.onChange(parseFloat(e.target.value) || 0)
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Pack Type */}
                  <FormField
                    control={form.control}
                    name="packType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pack Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select pack type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="packet">Packet</SelectItem>
                            <SelectItem value="bottle">Bottle</SelectItem>
                            <SelectItem value="box">Box</SelectItem>
                            <SelectItem value="can">Can</SelectItem>
                            <SelectItem value="jar">Jar</SelectItem>
                            <SelectItem value="pouch">Pouch</SelectItem>
                            <SelectItem value="sachet">Sachet</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Eco-friendly and Organic */}
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="isEcoFriendly"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Eco-friendly</FormLabel>
                            <FormDescription>
                              Product is environmentally friendly
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="isOrganic"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Organic</FormLabel>
                            <FormDescription>
                              Product is organic
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Live Status */}
                  <FormField
                    control={form.control}
                    name="isLive"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Live Product</FormLabel>
                          <FormDescription>
                            Product is live and available for purchase
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </TabsContent>

                {/* Variants Tab */}
                <TabsContent value="variants" className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label>Product Variants</Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setVariants((prev) => [
                            ...prev,
                            {
                              sku: "",
                              attributes: { color: "", size: "" },
                              price: 0,
                              stock: 0,
                              lowStockThreshold: 0,
                            },
                          ])
                        }}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Variant
                      </Button>
                    </div>

                    {variants.map((variant, index) => (
                      <Card key={index} className="p-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>SKU</Label>
                            <Input
                              placeholder="e.g., SNACK-001-CHIPS"
                              value={variant.sku}
                              onChange={(e) => {
                                const newVariants = [...variants]
                                newVariants[index].sku = e.target.value
                                setVariants(newVariants)
                              }}
                            />
                          </div>
                          <div>
                            <Label>Price</Label>
                            <Input
                              type="number"
                              placeholder="0"
                              value={variant.price}
                              onChange={(e) => {
                                const newVariants = [...variants]
                                newVariants[index].price =
                                  parseFloat(e.target.value) || 0
                                setVariants(newVariants)
                              }}
                            />
                          </div>
                          <div>
                            <Label>Color</Label>
                            <Input
                              placeholder="e.g., Red, Blue, Green"
                              value={variant.attributes.color}
                              onChange={(e) => {
                                const newVariants = [...variants]
                                newVariants[index].attributes.color =
                                  e.target.value
                                setVariants(newVariants)
                              }}
                            />
                          </div>
                          <div>
                            <Label>Size</Label>
                            <Input
                              placeholder="e.g., Medium"
                              value={variant.attributes.size}
                              onChange={(e) => {
                                const newVariants = [...variants]
                                newVariants[index].attributes.size =
                                  e.target.value
                                setVariants(newVariants)
                              }}
                            />
                          </div>
                          <div>
                            <Label>Stock</Label>
                            <Input
                              type="number"
                              placeholder="0"
                              value={variant.stock}
                              onChange={(e) => {
                                const newVariants = [...variants]
                                newVariants[index].stock =
                                  parseInt(e.target.value) || 0
                                setVariants(newVariants)
                              }}
                            />
                          </div>
                          <div className="flex items-end">
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() => {
                                setVariants((prev) =>
                                  prev.filter((_, i) => i !== index)
                                )
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                {/* Images Tab */}
                <TabsContent value="images" className="space-y-6">
                  <div className="space-y-4">
                    <Label>Product Images</Label>

                    {/* 8 Image Upload Sections */}
                    <div className="grid grid-cols-2 gap-4">
                      {Array.from({ length: 8 }, (_, index) => (
                        <div key={index} className="space-y-2">
                          <Label>Image {index + 1}</Label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                            {imageUrls[index] ? (
                              <div className="relative">
                                <img
                                  src={imageUrls[index]}
                                  alt={`Product image ${index + 1}`}
                                  className="w-full h-32 object-cover rounded"
                                />
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="sm"
                                  className="absolute top-2 right-2"
                                  onClick={() => {
                                    // Remove from imageUrls
                                    const newImageUrls = [...imageUrls]
                                    newImageUrls.splice(index, 1)
                                    setImageUrls(newImageUrls)

                                    // Remove from selectedFiles
                                    setSelectedFiles((prev) => {
                                      const newFiles = [...prev]
                                      newFiles.splice(index, 1)
                                      return newFiles
                                    })
                                  }}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            ) : (
                              <div className="space-y-2">
                                <Upload className="h-8 w-8 mx-auto text-gray-400" />
                                <div className="text-sm text-gray-500">
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      const input =
                                        document.createElement("input")
                                      input.type = "file"
                                      input.accept = "image/*"
                                      input.onchange = (e) => {
                                        const file = (
                                          e.target as HTMLInputElement
                                        ).files?.[0]
                                        if (file) {
                                          console.log("File selected:", file)
                                          console.log("File index:", index)

                                          // Add file to selectedFiles state
                                          setSelectedFiles((prev) => {
                                            const newFiles = [...prev]
                                            newFiles[index] = file
                                            console.log(
                                              "Updated selectedFiles:",
                                              newFiles
                                            )
                                            return newFiles
                                          })

                                          // Add image URL for preview
                                          const reader = new FileReader()
                                          reader.onload = (e) => {
                                            const newImageUrls = [...imageUrls]
                                            newImageUrls[index] = e.target
                                              ?.result as string
                                            setImageUrls(newImageUrls)
                                          }
                                          reader.readAsDataURL(file)
                                        }
                                      }
                                      input.click()
                                    }}
                                  >
                                    Upload Image
                                  </Button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {/* SEO & Meta Tab */}
                <TabsContent value="seo" className="space-y-6">
                  {/* Meta Title and Description */}
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="metaTitle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Meta Title</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., Delicious Snacks - Best Quality"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="metaDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Meta Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="e.g., Best quality snacks for all occasions"
                              className="min-h-[80px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Search Tags */}
                  <div className="space-y-3">
                    <Label>Search Tags</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a search tag"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            const input = e.target as HTMLInputElement
                            if (input.value.trim()) {
                              setSearchTags((prev) => [
                                ...prev,
                                input.value.trim(),
                              ])
                              input.value = ""
                            }
                          }
                        }}
                      />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {searchTags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="default"
                          className="cursor-pointer"
                          onClick={() =>
                            setSearchTags((prev) =>
                              prev.filter((_, i) => i !== index)
                            )
                          }
                        >
                          {tag} ×
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Colors */}
                  <div className="space-y-3">
                    <Label>Colors</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a color"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            const input = e.target as HTMLInputElement
                            if (input.value.trim()) {
                              setColors((prev) => [...prev, input.value.trim()])
                              input.value = ""
                            }
                          }
                        }}
                      />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {colors.map((color, index) => (
                        <Badge
                          key={index}
                          variant="default"
                          className="cursor-pointer"
                          onClick={() =>
                            setColors((prev) =>
                              prev.filter((_, i) => i !== index)
                            )
                          }
                        >
                          {color} ×
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Sizes */}
                  <div className="space-y-3">
                    <Label>Sizes</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a size"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            const input = e.target as HTMLInputElement
                            if (input.value.trim()) {
                              setSizes((prev) => [...prev, input.value.trim()])
                              input.value = ""
                            }
                          }
                        }}
                      />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {sizes.map((size, index) => (
                        <Badge
                          key={index}
                          variant="default"
                          className="cursor-pointer"
                          onClick={() =>
                            setSizes((prev) =>
                              prev.filter((_, i) => i !== index)
                            )
                          }
                        >
                          {size} ×
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Occasions */}
                  <div className="space-y-3">
                    <Label>Occasions</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add an occasion"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            const input = e.target as HTMLInputElement
                            if (input.value.trim()) {
                              setOccasions((prev) => [
                                ...prev,
                                input.value.trim(),
                              ])
                              input.value = ""
                            }
                          }
                        }}
                      />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {occasions.map((occasion, index) => (
                        <Badge
                          key={index}
                          variant="default"
                          className="cursor-pointer"
                          onClick={() =>
                            setOccasions((prev) =>
                              prev.filter((_, i) => i !== index)
                            )
                          }
                        >
                          {occasion} ×
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Materials */}
                  <div className="space-y-3">
                    <Label>Materials</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a material"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            const input = e.target as HTMLInputElement
                            if (input.value.trim()) {
                              setMaterials((prev) => [
                                ...prev,
                                input.value.trim(),
                              ])
                              input.value = ""
                            }
                          }
                        }}
                      />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {materials.map((material, index) => (
                        <Badge
                          key={index}
                          variant="default"
                          className="cursor-pointer"
                          onClick={() =>
                            setMaterials((prev) =>
                              prev.filter((_, i) => i !== index)
                            )
                          }
                        >
                          {material} ×
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Best For */}
                  <div className="space-y-3">
                    <Label>Best For</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add best for"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            const input = e.target as HTMLInputElement
                            if (input.value.trim()) {
                              setBestFor((prev) => [
                                ...prev,
                                input.value.trim(),
                              ])
                              input.value = ""
                            }
                          }
                        }}
                      />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {bestFor.map((item, index) => (
                        <Badge
                          key={index}
                          variant="default"
                          className="cursor-pointer"
                          onClick={() =>
                            setBestFor((prev) =>
                              prev.filter((_, i) => i !== index)
                            )
                          }
                        >
                          {item} ×
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Product Types */}
                  <div className="space-y-3">
                    <Label>Product Types</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add product type"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            const input = e.target as HTMLInputElement
                            if (input.value.trim()) {
                              setProductTypes((prev) => [
                                ...prev,
                                input.value.trim(),
                              ])
                              input.value = ""
                            }
                          }
                        }}
                      />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {productTypes.map((type, index) => (
                        <Badge
                          key={index}
                          variant="default"
                          className="cursor-pointer"
                          onClick={() =>
                            setProductTypes((prev) =>
                              prev.filter((_, i) => i !== index)
                            )
                          }
                        >
                          {type} ×
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Internal Notes */}
                  <FormField
                    control={form.control}
                    name="internalNotes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Internal Notes</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="e.g., Popular snack item, high demand"
                            className="min-h-[80px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Show in New Arrivals and Feature on Homepage */}
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="showInNewArrivals"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Show in New Arrivals</FormLabel>
                            <FormDescription>
                              Display in new arrivals section
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="featureOnHomepage"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Feature on Homepage</FormLabel>
                            <FormDescription>
                              Display on homepage
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <DialogFooter className="flex-shrink-0 pt-4 border-t bg-background">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isLoading}
              >
                {dictionary.products.cancel || "Cancel"}
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    {mode === "create"
                      ? dictionary.products.creating || "Creating..."
                      : "Updating..."}
                  </>
                ) : mode === "create" ? (
                  dictionary.products.save || "Save Product"
                ) : (
                  "Update Product"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>

      {/* Image Preview Modal */}
      {previewImage && (
        <Dialog
          open={!!previewImage}
          onOpenChange={() => setPreviewImage(null)}
        >
          <DialogContent className="max-w-4xl max-h-[90vh] p-0">
            <div className="relative">
              <img
                src={previewImage}
                alt="Product image preview"
                className="w-full h-auto max-h-[80vh] object-contain"
                onError={(e) => {
                  e.currentTarget.src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f3f4f6'/%3E%3Ctext x='200' y='150' font-family='Arial' font-size='16' fill='%236b7280' text-anchor='middle' dy='.3em'%3EBroken Image%3C/text%3E%3C/svg%3E"
                }}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setPreviewImage(null)}
                className="absolute top-4 right-4 bg-white/80 hover:bg-white"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </Dialog>
  )

  // If controlled, return just the content, otherwise return with trigger
  return isControlled ? (
    dialogContent
  ) : (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            {dictionary.products.addProduct || "Add Product"}
          </Button>
        )}
      </DialogTrigger>
      {dialogContent}
    </Dialog>
  )
}

// Export the old name for backward compatibility
export const AddProductDialog = ProductDialog