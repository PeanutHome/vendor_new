import React from "react";
import { PRIMARY_GREEN } from "../data/mockData";

interface ProductDescriptionProps {
  productDescriptionEn: string;
  setProductDescriptionEn: (value: string) => void;
  productDescriptionMy: string;
  setProductDescriptionMy: (value: string) => void;
  keyFeatureInput: string;
  setKeyFeatureInput: (value: string) => void;
  keyFeatures: string[];
  setKeyFeatures: (value: string[]) => void;
  howToUse: string;
  setHowToUse: (value: string) => void;
  ingredients: string;
  setIngredients: (value: string) => void;
  material: string;
  setMaterial: (value: string) => void;
}

export function ProductDescription({
  productDescriptionEn,
  setProductDescriptionEn,
  productDescriptionMy,
  setProductDescriptionMy,
  keyFeatureInput,
  setKeyFeatureInput,
  keyFeatures,
  setKeyFeatures,
  howToUse,
  setHowToUse,
  ingredients,
  setIngredients,
  material,
  setMaterial,
}: ProductDescriptionProps) {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm px-0 overflow-hidden">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight">3. Description & Highlights</h3>
      </div>
      <div className="p-6 pt-0 space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Product Description (English) *
            </label>
            <textarea
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus:border-[#00B14F] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Detailed product description in English..."
              rows={4}
              value={productDescriptionEn}
              onChange={e => setProductDescriptionEn(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Product Description (Myanmar)
            </label>
            <textarea
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus:border-[#00B14F] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Detailed product description in Myanmar..."
              rows={4}
              value={productDescriptionMy}
              onChange={e => setProductDescriptionMy(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Key Features/Highlights (Min 3, Max 10)
          </label>
          <div className="flex space-x-2 mb-2">
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus:border-[#00B14F] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              placeholder="Add a key feature"
              value={keyFeatureInput}
              onChange={e => setKeyFeatureInput(e.target.value)}
              maxLength={60}
              disabled={keyFeatures.length >= 10}
            />
            <button
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus:border-[#00B14F] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              type="button"
              onClick={() => {
                if (keyFeatureInput.trim() && keyFeatures.length < 10) {
                  setKeyFeatures([...keyFeatures, keyFeatureInput.trim()]);
                  setKeyFeatureInput("");
                }
              }}
              disabled={!keyFeatureInput.trim() || keyFeatures.length >= 10}
              aria-label="Add key feature"
              style={{ backgroundColor: PRIMARY_GREEN, borderColor: PRIMARY_GREEN }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus w-4 h-4"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {keyFeatures.map((feature, idx) => (
              <div
                key={feature + idx}
                className="rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#00B14F] focus:border-[#00B14F] focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 flex items-center space-x-1"
              >
                <span>{feature}</span>
                <button
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus:border-[#00B14F] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground rounded-md h-4 w-4 p-0"
                  type="button"
                  aria-label="Remove key feature"
                  onClick={() => setKeyFeatures(keyFeatures.filter((_, i) => i !== idx))}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x w-3 h-3"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              How to Use/Styling Tips
            </label>
            <textarea
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus:border-[#00B14F] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Instructions on how to use or style the product..."
              rows={3}
              value={howToUse}
              onChange={e => setHowToUse(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Ingredients/Materials
            </label>
            <textarea
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus:border-[#00B14F] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="List of ingredients or materials used..."
              rows={3}
              value={ingredients}
              onChange={e => setIngredients(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Material Description
          </label>
          <textarea
            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus:border-[#00B14F] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Detailed description of materials, texture, quality..."
            rows={3}
            value={material}
            onChange={e => setMaterial(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
} 