import React from "react";
import Image from "next/image";

interface ProductImagesProps {
  productImages: string[];
  setProductImages: (value: string[]) => void;
  videoUrl: string;
  setVideoUrl: (value: string) => void;
  videoType: string;
  setVideoType: (value: string) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ProductImages({
  productImages,
  setProductImages,
  videoUrl,
  setVideoUrl,
  videoType,
  setVideoType,
  fileInputRef,
  handleImageUpload,
}: ProductImagesProps) {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm px-0 overflow-hidden">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight">5. Product Images & Media</h3>
      </div>
      <div className="p-6 pt-0 space-y-4">
        <div>
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Product Images * (Min 1, Max 6)
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
            {/* Upload Card */}
            <div
              className="relative border border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageUpload}
              />
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-upload text-gray-400 w-6 h-6 mb-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17,8 12,3 7,8"></polyline><line x1="12" x2="12" y1="3" y2="15"></line></svg>
              <span className="text-sm text-gray-500">Upload Images</span>
              <span className="text-xs text-gray-400 mt-1">{productImages.length}/6</span>
            </div>
            {/* Image Preview Cards */}
            {productImages.map((image, idx) => (
              <div key={idx} className="relative">
                <Image src={image} alt={`Product ${idx + 1}`} className="w-full h-24 object-cover rounded-lg border" width={96} height={96} />
                <button
                  type="button"
                  className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1"
                  onClick={() => setProductImages(productImages.filter((_, i) => i !== idx))}
                  aria-label="Remove image"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x w-3 h-3"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
                </button>
                {idx === 0 && (
                  <span className="absolute bottom-1 left-1 bg-black bg-opacity-70 text-white text-xs px-1 rounded">Primary</span>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Product Video URL (Optional)
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus:border-[#00B14F] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              placeholder="YouTube, Vimeo, or direct video URL"
              value={videoUrl}
              onChange={e => setVideoUrl(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Video Type
            </label>
            <select
              className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-[#00B14F] focus:border-[#00B14F] focus:ring-offset-2"
              value={videoType}
              onChange={e => setVideoType(e.target.value)}
            >
              <option value="youtube">YouTube</option>
              <option value="vimeo">Vimeo</option>
              <option value="direct">Direct URL</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
} 