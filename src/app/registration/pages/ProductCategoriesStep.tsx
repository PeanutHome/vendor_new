import React from "react";

// Product Category Enum
export enum ProductCategory {
  FASHION = 'Fashion',
  BEAUTY_PERSONAL_CARE = 'Beauty & Personal Care',
  ELECTRONICS = 'Electronics',
  ACCESSORIES = 'Accessories',
  HOME_KITCHEN = 'Home and Kitchen',
}

interface ProductCategoriesData {
  selected?: string[];
}

const categories = [
  ProductCategory.FASHION,
  ProductCategory.BEAUTY_PERSONAL_CARE,
  ProductCategory.ELECTRONICS,
  ProductCategory.ACCESSORIES,
  ProductCategory.HOME_KITCHEN,
];

export default function ProductCategoriesStep({ value, onChange, onPrev, onNext }: {
  value: ProductCategoriesData;
  onChange: (data: ProductCategoriesData) => void;
  onPrev?: () => void;
  onNext?: () => void;
}) {
  const handleCheckbox = (cat: string) => {
    const arr = value.selected || [];
    if (arr.includes(cat)) {
      onChange({ ...value, selected: arr.filter((c) => c !== cat) });
    } else {
      onChange({ ...value, selected: [...arr, cat] });
    }
  };

  return (
    <div className="space-y-6 bg-white">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="font-semibold tracking-tight text-2xl">Step 4: Product Categories to List</h3>
          <p className="text-muted-foreground text-lg">Select one or multiple</p>
        </div>
        <div className="p-6 pt-0 space-y-6">
          <div>
            <label className="text-sm font-medium leading-none">Select Product Categories *</label>
            <div className="flex flex-wrap gap-3 mt-2">
              {categories.map((cat) => (
                <label key={cat} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={!!value.selected && value.selected.includes(cat)}
                    onChange={() => handleCheckbox(cat)}
                    className="accent-[#00B14F]"
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex justify-between mt-8 pt-6 border-t">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus-visible:ring-offset-2 border border-input bg-background hover:bg-[#00B14F]/10 hover:text-[#00B14F] h-10 px-4 py-2 text-[#00B14F]"
              onClick={onPrev}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left w-4 h-4 mr-2"><path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path></svg>
              Previous
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus-visible:ring-offset-2 bg-[#00B14F] text-white hover:bg-[#00B14F]/90 h-10 px-4 py-2"
              onClick={onNext}
            >
              Next Step
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right w-4 h-4 ml-2"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
