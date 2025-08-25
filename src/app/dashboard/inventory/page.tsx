"use client";
import React, { useState } from "react";
import { InventoryTable } from "./components/InventoryTable";
import { InventoryFilters } from "./components/InventoryFilters";
import { StockAdjustmentDialog } from "./components/StockAdjustmentDialog";
import { PRIMARY_GREEN } from "../products/data/mockData";
import { InventoryItem } from "./data/inventoryMockData";

export default function InventoryPage() {
  const [stockDialogOpen, setStockDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    stockStatus: "",
    sortBy: "name"
  });

  const handleStockAdjustment = (item: InventoryItem) => {
    setSelectedItem(item);
    setStockDialogOpen(true);
  };

  const handleBulkImport = () => {
    // Handle bulk import logic
    console.log("Bulk import triggered");
  };

  const handleExportInventory = () => {
    // Handle export logic
    console.log("Export inventory triggered");
  };

  const handleCloseStockDialog = () => {
    setStockDialogOpen(false);
    setSelectedItem(null);
  };

  return (
    <main className="flex-1 py-6">
      <StockAdjustmentDialog 
        open={stockDialogOpen} 
        onClose={handleCloseStockDialog}
        item={selectedItem}
      />
      
      <div className="space-y-6">
        {/* Header and Actions */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
            <p className="text-gray-600 mt-1">Track stock levels, manage inventory, and monitor product availability</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleExportInventory}
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download w-4 h-4">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7,10 12,15 17,10"/>
                <line x1="12" x2="12" y1="15" y2="3"/>
              </svg>
              Export
            </button>
            <button
              onClick={handleBulkImport}
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary-foreground shadow h-10 px-4 py-2"
              style={{ backgroundColor: PRIMARY_GREEN, color: 'white' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-upload w-4 h-4">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-15a2 2 0 0 1 2-2h4l2 3h9a2 2 0 0 1 2 2z"/>
                <polyline points="17,10 12,5 7,10"/>
                <line x1="12" x2="12" y1="5" y2="15"/>
              </svg>
              Bulk Import
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        {/* <InventorySummaryCards /> */}

        {/* Filters */}
        <InventoryFilters filters={filters} onFiltersChange={setFilters} />

        {/* Recent Activity & Quick Actions Row */}
        {/* <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <RecentStockActivity />
          </div>
          <div className="lg:w-80">
            <InventoryQuickActions onStockAdjustment={handleStockAdjustment} />
          </div>
        </div> */}

        {/* Inventory Table */}
        <InventoryTable 
          filters={filters}
          onStockAdjustment={handleStockAdjustment}
        />
      </div>
    </main>
  );
}
