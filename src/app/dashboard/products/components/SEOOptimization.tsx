import React from "react";
import { PRIMARY_GREEN } from "../data/mockData";

interface SEOOptimizationProps {
  searchTags: string[];
  setSearchTags: (value: string[]) => void;
  searchTagInput: string;
  setSearchTagInput: (value: string) => void;
  metaTitle: string;
  setMetaTitle: (value: string) => void;
  metaDescription: string;
  setMetaDescription: (value: string) => void;
  internalNotes: string;
  setInternalNotes: (value: string) => void;
}

export function SEOOptimization({
  searchTags,
  setSearchTags,
  searchTagInput,
  setSearchTagInput,
  metaTitle,
  setMetaTitle,
  metaDescription,
  setMetaDescription,
  internalNotes,
  setInternalNotes,
}: SEOOptimizationProps) {
  const addSearchTag = () => {
    if (searchTagInput.trim() && searchTags.length < 15 && !searchTags.includes(searchTagInput.trim())) {
      setSearchTags([...searchTags, searchTagInput.trim()]);
      setSearchTagInput("");
    }
  };

  const removeSearchTag = (tagToRemove: string) => {
    setSearchTags(searchTags.filter(tag => tag !== tagToRemove));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSearchTag();
    } else if (e.key === ',' && searchTagInput.trim()) {
      e.preventDefault();
      addSearchTag();
    }
  };

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm px-0 overflow-hidden">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight">8. SEO & Search Optimization</h3>
        <p className="text-sm text-muted-foreground">
          Optimize your product for search engines and internal discovery
        </p>
      </div>
      <div className="p-6 pt-0 space-y-4">
        {/* Search Tags */}
        <div>
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Search Tags * (Min 3, Max 15)
          </label>
          <p className="text-xs text-gray-500 mb-2">
            Add keywords that customers might search for. Press Enter or comma to add tags.
          </p>
          <div className="flex space-x-2 mb-3">
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus:border-[#00B14F] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              placeholder="e.g., summer top, Korean style, casual wear"
              value={searchTagInput}
              onChange={e => setSearchTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              maxLength={50}
              disabled={searchTags.length >= 15}
            />
            <button
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus:border-[#00B14F] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              type="button"
              onClick={addSearchTag}
              disabled={!searchTagInput.trim() || searchTags.length >= 15 || searchTags.includes(searchTagInput.trim())}
              style={{ backgroundColor: PRIMARY_GREEN, borderColor: PRIMARY_GREEN }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus w-4 h-4"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
            </button>
          </div>
          
          {/* Tags Display */}
          <div className="flex flex-wrap gap-2 mb-2">
            {searchTags.map((tag, idx) => (
              <div
                key={tag + idx}
                className="rounded-full border px-3 py-1 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#00B14F] focus:border-[#00B14F] focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 flex items-center space-x-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-hash w-3 h-3"><line x1="4" x2="20" y1="9" y2="9"></line><line x1="4" x2="20" y1="15" y2="15"></line><line x1="10" x2="8" y1="3" y2="21"></line><line x1="16" x2="14" y1="3" y2="21"></line></svg>
                <span>{tag}</span>
                <button
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus:border-[#00B14F] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground rounded-md h-4 w-4 p-0"
                  type="button"
                  onClick={() => removeSearchTag(tag)}
                  aria-label="Remove search tag"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x w-3 h-3"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
                </button>
              </div>
            ))}
          </div>
          
          {/* Tag Counter */}
          <div className="text-xs text-gray-500">
            {searchTags.length}/15 tags • {searchTags.length < 3 ? `Add ${3 - searchTags.length} more tags (minimum)` : 'Good!'}
          </div>
        </div>

        {/* Meta Title & Description */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Meta Title for Google * ({metaTitle.length}/60)
            </label>
            <p className="text-xs text-gray-500 mb-2">
              Appears in Google search results. Keep under 60 characters.
            </p>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus:border-[#00B14F] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              placeholder="Best Summer Top - Korean Style Fashion"
              maxLength={60}
              value={metaTitle}
              onChange={e => setMetaTitle(e.target.value)}
            />
            {metaTitle.length > 50 && (
              <p className="text-xs text-orange-600 mt-1">
                {metaTitle.length > 60 ? 'Title too long - may be truncated' : 'Approaching character limit'}
              </p>
            )}
          </div>
          
          <div>
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Meta Description * ({metaDescription.length}/160)
            </label>
            <p className="text-xs text-gray-500 mb-2">
              Short description for Google search results.
            </p>
            <textarea
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus:border-[#00B14F] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Discover trendy Korean-style summer tops. Perfect for casual wear with premium quality materials. Shop now for the latest fashion!"
              rows={3}
              maxLength={160}
              value={metaDescription}
              onChange={e => setMetaDescription(e.target.value)}
            />
            {metaDescription.length > 140 && (
              <p className="text-xs text-orange-600 mt-1">
                {metaDescription.length > 160 ? 'Description too long - will be truncated' : 'Approaching character limit'}
              </p>
            )}
          </div>
        </div>

        {/* Internal Notes */}
        <div>
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Internal Notes (Optional)
          </label>
          <p className="text-xs text-gray-500 mb-2">
            Private notes for your team - not visible to customers
          </p>
          <textarea
            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B14F] focus:border-[#00B14F] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Add any internal notes about this product for team coordination, sourcing info, marketing strategies, etc."
            rows={3}
            value={internalNotes}
            onChange={e => setInternalNotes(e.target.value)}
          />
        </div>

        {/* SEO Preview */}
        {(metaTitle || metaDescription) && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search w-4 h-4"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.35-4.35"></path></svg>
              Google Search Preview
            </h4>
            <div className="bg-white p-3 rounded border">
              <div className="text-blue-600 text-lg hover:underline cursor-pointer line-clamp-1">
                {metaTitle || "Your Meta Title Here"}
              </div>
              <div className="text-green-700 text-sm">
                yourstore.com › products › {metaTitle.toLowerCase().replace(/\s+/g, '-') || 'product-name'}
              </div>
              <div className="text-gray-700 text-sm mt-1 line-clamp-2">
                {metaDescription || "Your meta description will appear here..."}
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              ✨ This is how your product will appear in Google search results
            </div>
          </div>
        )}

        {/* SEO Score */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trending-up w-4 h-4"><polyline points="22,7 13.5,15.5 8.5,10.5 2,17"></polyline><polyline points="16,7 22,7 22,13"></polyline></svg>
            SEO Optimization Score
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div>
              <span className="text-gray-600">Search Tags:</span>
              <span className={`ml-2 font-medium ${searchTags.length >= 3 ? 'text-green-600' : 'text-orange-600'}`}>
                {searchTags.length >= 3 ? '✓' : '⚠'} {searchTags.length}/3+
              </span>
            </div>
            <div>
              <span className="text-gray-600">Meta Title:</span>
              <span className={`ml-2 font-medium ${metaTitle.length > 0 && metaTitle.length <= 60 ? 'text-green-600' : 'text-orange-600'}`}>
                {metaTitle.length > 0 && metaTitle.length <= 60 ? '✓' : '⚠'} {metaTitle.length > 0 ? 'Set' : 'Missing'}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Meta Desc:</span>
              <span className={`ml-2 font-medium ${metaDescription.length > 0 && metaDescription.length <= 160 ? 'text-green-600' : 'text-orange-600'}`}>
                {metaDescription.length > 0 && metaDescription.length <= 160 ? '✓' : '⚠'} {metaDescription.length > 0 ? 'Set' : 'Missing'}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Overall:</span>
              <span className={`ml-2 font-medium ${
                searchTags.length >= 3 && metaTitle.length > 0 && metaDescription.length > 0 
                  ? 'text-green-600' 
                  : 'text-orange-600'
              }`}>
                {searchTags.length >= 3 && metaTitle.length > 0 && metaDescription.length > 0 ? '✓ Good' : '⚠ Needs work'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 