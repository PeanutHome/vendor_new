import React, { useState } from "react";
import { CustomSelect } from "./CustomSelect";
import { PRIMARY_GREEN } from "../data/mockData";

interface Variant {
  color: string;
  colorHex: string;
  size: string;
  price: string;
  stock: string;
}

interface ColorOption {
  value: string;
  color: string;
  label: string;
}

interface SizeOption {
  value: string;
  label: string;
}

interface VariantEngineProps {
  variantColor: ColorOption | null;
  setVariantColor: (value: ColorOption | null) => void;
  variantSize: SizeOption | null;
  setVariantSize: (value: SizeOption | null) => void;
  variantPrice: string;
  setVariantPrice: (value: string) => void;
  variantStock: string;
  setVariantStock: (value: string) => void;
  variants: Variant[];
  setVariants: (value: Variant[]) => void;
}

export function VariantEngine({
  variantColor,
  setVariantColor,
  variantSize,
  setVariantSize,
  variantPrice,
  setVariantPrice,
  variantStock,
  setVariantStock,
  variants,
  setVariants,
}: VariantEngineProps) {
  // Track if we're editing an existing variant
  const [isEditing, setIsEditing] = useState(false);
  
  // Color and size options
  const colorOptions: ColorOption[] = [
    { value: "Red", color: "#EF4444", label: "Red" },
    { value: "Blue", color: "#3B82F6", label: "Blue" },
    { value: "Green", color: "#22C55E", label: "Green" },
    { value: "Black", color: "#000", label: "Black" },
    { value: "White", color: "#fff", label: "White" },
    { value: "Yellow", color: "#EAB308", label: "Yellow" },
    { value: "Purple", color: "#A855F7", label: "Purple" },
    { value: "Orange", color: "#F97316", label: "Orange" },
    { value: "Pink", color: "#EC4899", label: "Pink" },
    { value: "Gray", color: "#6B7280", label: "Gray" },
  ];
  const sizeOptions: SizeOption[] = ["S", "M", "L", "XL"].map(s => ({ value: s, label: s }));

  const handleAddVariant = () => {
    if (!variantColor || !variantSize || !variantPrice || !variantStock) return;
    setVariants([
      ...variants,
      {
        color: variantColor.value,
        colorHex: variantColor.color,
        size: variantSize.value,
        price: variantPrice,
        stock: variantStock,
      },
    ]);
    setVariantColor(null);
    setVariantSize(null);
    setVariantPrice("");
    setVariantStock("");
    
    // Reset editing mode
    setIsEditing(false);
  };

  const handleQuickAddAll = () => {
    if (!variantPrice || !variantStock) {
      alert("Please set price and stock first!");
      return;
    }

    const newVariants = [];
    for (const color of colorOptions) {
      for (const size of sizeOptions) {
        // Check if this combination already exists
        const exists = variants.some(v => v.color === color.value && v.size === size.value);
        if (!exists) {
          newVariants.push({
            color: color.value,
            colorHex: color.color,
            size: size.value,
            price: variantPrice,
            stock: variantStock,
          });
        }
      }
    }

    if (newVariants.length > 0) {
      setVariants([...variants, ...newVariants]);
      alert(`Added ${newVariants.length} new variants!`);
    } else {
      alert("All color-size combinations already exist!");
    }
  };

  const handleQuickAddByColor = () => {
    if (!variantColor || !variantPrice || !variantStock) {
      alert("Please select color, set price and stock first!");
      return;
    }

    const newVariants = [];
    for (const size of sizeOptions) {
      // Check if this combination already exists
      const exists = variants.some(v => v.color === variantColor.value && v.size === size.value);
      if (!exists) {
        newVariants.push({
          color: variantColor.value,
          colorHex: variantColor.color,
          size: size.value,
          price: variantPrice,
          stock: variantStock,
        });
      }
    }

    if (newVariants.length > 0) {
      setVariants([...variants, ...newVariants]);
      alert(`Added ${newVariants.length} variants for ${variantColor.value}!`);
    } else {
      alert("All size variants for this color already exist!");
    }
  };

  const handleBulkEdit = () => {
    if (variants.length === 0) {
      alert("No variants to edit!");
      return;
    }

    const newPrice = prompt("Enter new price for all variants (MMK):", variantPrice);
    const newStock = prompt("Enter new stock for all variants:", variantStock);

    if (newPrice !== null && newStock !== null) {
      const updatedVariants = variants.map(v => ({
        ...v,
        price: newPrice,
        stock: newStock
      }));
      setVariants(updatedVariants);
      setVariantPrice(newPrice);
      setVariantStock(newStock);
      alert("All variants updated successfully!");
    }
  };

  const handleEditVariant = (index: number) => {
    const variant = variants[index];
    if (!variant) return;

    // Populate form with variant data for editing
    setVariantColor({ value: variant.color, color: variant.colorHex, label: variant.color });
    setVariantSize({ value: variant.size, label: variant.size });
    setVariantPrice(variant.price);
    setVariantStock(variant.stock);

    // Remove the variant from the list (will be re-added when user clicks Add Variant)
    setVariants(variants.filter((_, i) => i !== index));
    
    // Set editing mode
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    // Get the current form values
    const currentVariant = {
      color: variantColor?.value || '',
      colorHex: variantColor?.color || '#000000',
      size: variantSize?.value || '',
      price: variantPrice || '',
      stock: variantStock || ''
    };

    // If we have valid data, restore it back to the variants list
    if (currentVariant.color && currentVariant.size && currentVariant.price && currentVariant.stock) {
      setVariants([...variants, currentVariant]);
    }

    // Clear the form
    setVariantColor(null);
    setVariantSize(null);
    setVariantPrice("");
    setVariantStock("");
    setIsEditing(false);
  };

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm px-0 overflow-hidden">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight">4. Product Variants Engine</h3>
      </div>
      <div className="p-6 pt-0 space-y-4">
        <div className="grid md:grid-cols-5 gap-4 p-4 border rounded-lg">
          {/* Color Select */}
          <div>
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Color</label>
            <CustomSelect
              options={colorOptions}
              value={variantColor}
              onChange={setVariantColor}
              placeholder="Select color"
              renderOption={(option) => (
                <span className="flex items-center gap-2">
                  <span className="inline-block w-4 h-4 rounded-full border" style={{ backgroundColor: option.color, borderColor: option.value === 'White' ? '#ccc' : option.color }}></span>
                  {option.label}
                </span>
              )}
            />
          </div>
          {/* Size Select */}
          <div>
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Size</label>
            <CustomSelect
              options={sizeOptions}
              value={variantSize}
              onChange={setVariantSize}
              placeholder="Select size"
            />
          </div>
          {/* Price Input */}
          <div>
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Price (MMK)</label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus:border-[#00B14F] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              placeholder="Price"
              type="number"
              value={variantPrice}
              onChange={e => setVariantPrice(e.target.value)}
            />
          </div>
          {/* Stock Input */}
          <div>
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Stock</label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus:border-[#00B14F] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              placeholder="Stock qty"
              type="number"
              value={variantStock}
              onChange={e => setVariantStock(e.target.value)}
            />
          </div>
          {/* Add Variant Button */}
          <div className="flex flex-col gap-2">
            <button
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus:border-[#00B14F] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 py-2"
              type="button"
              style={{ backgroundColor: PRIMARY_GREEN, color: 'white' }}
              disabled={!(variantColor && variantSize && variantPrice && variantStock)}
              onClick={handleAddVariant}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus w-4 h-4 mr-2">
                {isEditing ? (
                  <>
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </>
                ) : (
                  <>
                    <path d="M5 12h14"/>
                    <path d="M12 5v14"/>
                  </>
                )}
              </svg>
              {isEditing ? 'Update Variant' : 'Add Variant'}
            </button>
            
            {isEditing && (
              <button
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus:border-gray-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 py-2 border border-gray-300 bg-gray-50 hover:bg-gray-100 text-gray-700"
                type="button"
                onClick={handleCancelEdit}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18"/>
                  <path d="m6 6 12 12"/>
                </svg>
                Cancel Edit
              </button>
            )}
          </div>
        </div>

        {/* Quick Add Buttons */}
        <div className="flex gap-3 p-4 border rounded-lg bg-gray-50">
          <button
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus:border-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700"
            type="button"
            disabled={!variantPrice || !variantStock}
            onClick={handleQuickAddAll}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v20M2 12h20"/>
            </svg>
            Quick Add All Colors & Sizes
          </button>
          
          <button
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus:border-purple-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 py-2 bg-purple-600 text-white hover:bg-purple-700"
            type="button"
            disabled={!variantColor || !variantPrice || !variantStock}
            onClick={handleQuickAddByColor}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v20M2 12h20"/>
            </svg>
            Add All Sizes for Selected Color
          </button>

          <button
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus:border-orange-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 py-2 bg-orange-600 text-white hover:bg-orange-700"
            type="button"
            disabled={variants.length === 0}
            onClick={handleBulkEdit}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
            Bulk Edit All Variants
          </button>
        </div>

        {/* Added Variants Section */}
        {variants.length > 0 && (
          <div className="space-y-2 mt-4">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Added Variants:</label>
            {variants.map((variant, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-6 h-6 rounded-full border" style={{ backgroundColor: variant.colorHex }}></div>
                  <span>{variant.color} - {variant.size}</span>
                  <span className="text-green-600 font-medium">{variant.price} MMK</span>
                  <span className="text-gray-600">Stock: {variant.stock}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus:border-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-blue-300 bg-blue-50 hover:bg-blue-100 text-blue-700 h-9 rounded-md px-3"
                    type="button"
                    aria-label="Edit variant"
                    onClick={() => handleEditVariant(idx)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                      <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                  </button>
                  <button
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
                    type="button"
                    aria-label="Remove variant"
                    onClick={() => setVariants(variants.filter((_, i) => i !== idx))}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x w-4 h-4"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 