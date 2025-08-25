import React from "react";
import { CustomSelect } from "./CustomSelect";

interface FiltersSetupProps {
  filterOccasion: { value: string; label: string } | null;
  setFilterOccasion: (value: { value: string; label: string } | null) => void;
  filterMaterial: { value: string; label: string } | null;
  setFilterMaterial: (value: { value: string; label: string } | null) => void;
  isEcoFriendly: boolean;
  setIsEcoFriendly: (value: boolean) => void;
  isOrganic: boolean;
  setIsOrganic: (value: boolean) => void;
  filterBestFor: { value: string; label: string } | null;
  setFilterBestFor: (value: { value: string; label: string } | null) => void;
}

export function FiltersSetup({
  filterOccasion,
  setFilterOccasion,
  filterMaterial,
  setFilterMaterial,
  isEcoFriendly,
  setIsEcoFriendly,
  isOrganic,
  setIsOrganic,
  filterBestFor,
  setFilterBestFor,
}: FiltersSetupProps) {


  const occasionOptions = [
    { value: "casual", label: "Casual" },
    { value: "festive", label: "Festive" },
    { value: "office", label: "Office" },
    { value: "party", label: "Party" },
    { value: "wedding", label: "Wedding" },
    { value: "everyday", label: "Everyday" },
  ];

  const materialOptions = [
    { value: "cotton", label: "Cotton" },
    { value: "polyester", label: "Polyester" },
    { value: "silk", label: "Silk" },
    { value: "wool", label: "Wool" },
    { value: "leather", label: "Leather" },
    { value: "denim", label: "Denim" },
    { value: "linen", label: "Linen" },
    { value: "organic", label: "Organic" },
    { value: "natural", label: "Natural" },
    { value: "synthetic", label: "Synthetic" },
    { value: "mineral", label: "Mineral" },
    { value: "vegan", label: "Vegan" },
    { value: "cruelty-free", label: "Cruelty-Free" },
    { value: "paraben-free", label: "Paraben-Free" },
    { value: "sulfate-free", label: "Sulfate-Free" },
    { value: "plastic", label: "Plastic" },
    { value: "metal", label: "Metal" },
    { value: "glass", label: "Glass" },
    { value: "ceramic", label: "Ceramic" },
    { value: "wood", label: "Wood" },
    { value: "bamboo", label: "Bamboo" },
    { value: "other", label: "Other" },
  ];

  const bestForOptions = [
    { value: "men", label: "Men" },
    { value: "women", label: "Women" },
    { value: "teenagers", label: "Teenagers" },
    { value: "young-adults", label: "Young Adults" },
    { value: "adults", label: "Adults" },
    { value: "seniors", label: "Seniors" },
    { value: "kids", label: "Kids" },
    { value: "babies", label: "Babies" },
    { value: "oily-skin", label: "Oily Skin" },
    { value: "dry-skin", label: "Dry Skin" },
    { value: "combination-skin", label: "Combination Skin" },
    { value: "sensitive-skin", label: "Sensitive Skin" },
    { value: "normal-skin", label: "Normal Skin" },
    { value: "mature-skin", label: "Mature Skin" },
    { value: "acne-prone", label: "Acne-Prone Skin" },
    { value: "all-skin-types", label: "All Skin Types" },
    { value: "casual", label: "Casual Wear" },
    { value: "formal", label: "Formal Wear" },
    { value: "sports", label: "Sports/Active" },
    { value: "outdoor", label: "Outdoor Activities" },
    { value: "indoor", label: "Indoor Use" },
    { value: "all-occasions", label: "All Occasions" },
  ];

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm px-0 overflow-hidden">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight">9. Filters Setup</h3>
        <p className="text-sm text-gray-600">Configure filters for end-user product discovery</p>
      </div>
      <div className="p-6 pt-0 space-y-4">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           {/* Occasion Filter */}
          <div>
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Occasion (Optional)
            </label>
            <CustomSelect
              value={filterOccasion}
              onChange={setFilterOccasion}
              options={occasionOptions}
              placeholder="Select occasion"
            />
          </div>

          {/* Material/Ingredient Type */}
          <div>
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Material / Ingredient Type
            </label>
            <CustomSelect
              value={filterMaterial}
              onChange={setFilterMaterial}
              options={materialOptions}
              placeholder="Select material/ingredient"
            />
          </div>

          {/* Best For */}
          <div>
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Best For
            </label>
            <CustomSelect
              value={filterBestFor}
              onChange={setFilterBestFor}
              options={bestForOptions}
              placeholder="Select skin type/use"
            />
          </div>
        </div>

        {/* Eco Friendly Toggle */}
        <div className="flex items-center space-x-3 pt-2">
          <div className="flex items-center space-x-2">
            <button
              type="button"
              role="switch"
              aria-checked={isEcoFriendly}
              className={`peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 ${
                isEcoFriendly ? 'bg-[#00B14F]' : 'bg-input'
              }`}
              onClick={() => setIsEcoFriendly(!isEcoFriendly)}
            >
              <span
                className={`pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform ${
                  isEcoFriendly ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Eco Friendly / Sustainable
            </label>
          </div>
          <div className="flex items-center space-x-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
              <path d="M12 2a3 3 0 0 0-3 3c0 1.5.5 2.9 1.5 3.5.5.3 1.1.5 1.5.5s1-.2 1.5-.5c1-.6 1.5-2 1.5-3.5a3 3 0 0 0-3-3Z"/>
              <path d="M12 8.5c-4 0-8 2.5-8 6.5 0 2.5 2 4.5 4.5 4.5h7c2.5 0 4.5-2 4.5-4.5 0-4-4-6.5-8-6.5Z"/>
            </svg>
            <span className="text-xs text-gray-500">Helps customers find sustainable products</span>
          </div>
        </div>

        {/* Organic Toggle */}
        <div className="flex items-center space-x-3 pt-2">
          <div className="flex items-center space-x-2">
            <button
              type="button"
              role="switch"
              aria-checked={isOrganic}
              className={`peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 ${
                isOrganic ? 'bg-[#00B14F]' : 'bg-input'
              }`}
              onClick={() => setIsOrganic(!isOrganic)}
            >
              <span
                className={`pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform ${
                  isOrganic ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Organic
            </label>
          </div>
          <div className="flex items-center space-x-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
              <path d="M12 2a3 3 0 0 0-3 3c0 1.5.5 2.9 1.5 3.5.5.3 1.1.5 1.5.5s1-.2 1.5-.5c1-.6 1.5-2 1.5-3.5a3 3 0 0 0-3-3Z"/>
              <path d="M12 8.5c-4 0-8 2.5-8 6.5 0 2.5 2 4.5 4.5 4.5h7c2.5 0 4.5-2 4.5-4.5 0-4-4-6.5-8-6.5Z"/>
            </svg>
            <span className="text-xs text-gray-500">Indicates organic certification</span>
          </div>
        </div>
      </div>
    </div>
  );
} 