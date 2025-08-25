import React, { useState, useEffect } from "react";
import { InventoryItem } from "../data/inventoryMockData";
import { PRIMARY_GREEN } from "../../products/data/mockData";

interface StockAdjustmentDialogProps {
  open: boolean;
  onClose: () => void;
  item: InventoryItem | null;
}

export function StockAdjustmentDialog({ open, onClose, item }: StockAdjustmentDialogProps) {
  const [adjustmentType, setAdjustmentType] = useState<'add' | 'remove' | 'set'>('add');
  const [quantity, setQuantity] = useState('');
  const [reason, setReason] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (!open) {
      setAdjustmentType('add');
      setQuantity('');
      setReason('');
      setNotes('');
    }
  }, [open]);

  if (!open || !item) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle stock adjustment logic here
    console.log('Stock adjustment:', {
      itemId: item.id,
      type: adjustmentType,
      quantity: parseInt(quantity),
      reason,
      notes,
    });
    onClose();
  };

  const calculateNewStock = () => {
    const qty = parseInt(quantity) || 0;
    switch (adjustmentType) {
      case 'add':
        return item.currentStock + qty;
      case 'remove':
        return Math.max(0, item.currentStock - qty);
      case 'set':
        return qty;
      default:
        return item.currentStock;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-background rounded-lg w-full max-w-md mx-4 shadow-lg border">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Adjust Stock</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x w-5 h-5">
              <path d="M18 6 6 18"/>
              <path d="m6 6 12 12"/>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Item Info */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-white rounded-lg">
                {item.icon}
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{item.name}</h3>
                <p className="text-sm text-gray-500">SKU: {item.sku}</p>
                <p className="text-sm text-gray-500">Current Stock: {item.currentStock} units</p>
              </div>
            </div>
          </div>

          {/* Adjustment Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Adjustment Type
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setAdjustmentType('add')}
                className={`flex-1 px-3 py-2 text-sm font-medium rounded-md border transition-colors ${
                  adjustmentType === 'add'
                    ? 'bg-green-50 border-green-500 text-green-700'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Add Stock
              </button>
              <button
                type="button"
                onClick={() => setAdjustmentType('remove')}
                className={`flex-1 px-3 py-2 text-sm font-medium rounded-md border transition-colors ${
                  adjustmentType === 'remove'
                    ? 'bg-red-50 border-red-500 text-red-700'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Remove Stock
              </button>
              <button
                type="button"
                onClick={() => setAdjustmentType('set')}
                className={`flex-1 px-3 py-2 text-sm font-medium rounded-md border transition-colors ${
                  adjustmentType === 'set'
                    ? 'bg-blue-50 border-blue-500 text-blue-700'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Set Stock
              </button>
            </div>
          </div>

          {/* Quantity */}
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
              {adjustmentType === 'set' ? 'New Stock Level' : 'Quantity'}
            </label>
            <input
              id="quantity"
              type="number"
              min="0"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter quantity"
              required
            />
            {quantity && (
              <p className="text-sm text-gray-600 mt-1">
                New stock level will be: <span className="font-medium">{calculateNewStock()} units</span>
              </p>
            )}
          </div>

          {/* Reason */}
          <div>
            <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
              Reason
            </label>
            <select
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            >
              <option value="">Select a reason</option>
              <option value="restock">Restock</option>
              <option value="sale">Sale</option>
              <option value="damage">Damaged units</option>
              <option value="theft">Theft/Loss</option>
              <option value="return">Customer return</option>
              <option value="transfer">Transfer</option>
              <option value="correction">Inventory correction</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Notes */}
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
              Notes (Optional)
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Additional notes..."
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 text-sm font-medium text-white rounded-md transition-colors"
              style={{ backgroundColor: PRIMARY_GREEN }}
            >
              Adjust Stock
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 