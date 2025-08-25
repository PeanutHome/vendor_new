"use client";
import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

interface CustomSelectProps<T = Record<string, unknown>> {
  options: T[];
  value: T | null;
  onChange: (val: T | null) => void;
  renderOption?: (option: T) => React.ReactNode;
  placeholder?: string;
}

export function CustomSelect<T extends { value: string; label: string }>({ options, value, onChange, renderOption, placeholder }: CustomSelectProps<T>) {
  const [open, setOpen] = useState(false);
  const [dropdownPos, setDropdownPos] = useState<{ top: number; left: number; width: number }>({ top: 0, left: 0, width: 0 });
  const selectRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const SIDEBAR_GREEN = '#009944'; // Use this for hover

  // Find the selected option for display
  const selected = options.find(opt => (value && value.value) ? opt.value === value.value : false);

  // Position dropdown absolutely below the select with better positioning
  useEffect(() => {
    if (open && selectRef.current) {
      const rect = selectRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      // Calculate optimal position
      let left = rect.left + window.scrollX;
      let top = rect.bottom + window.scrollY + 4;
      
      // Adjust if dropdown would go off-screen to the right
      if (left + rect.width > viewportWidth - 20) {
        left = Math.max(20, viewportWidth - rect.width - 20);
      }
      
      // Adjust if dropdown would go off-screen to the left
      if (left < 20) {
        left = 20;
      }
      
      // If dropdown would go below viewport, show above the select
      if (top + 240 > viewportHeight + window.scrollY) {
        top = rect.top + window.scrollY - 244; // 240px height + 4px gap
      }
      
      setDropdownPos({
        top,
        left,
        width: rect.width,
      });
    }
  }, [open]);

  // Close dropdown on outside click
  useEffect(() => {
    if (!open) return;
    function handle(e: MouseEvent) {
      if (
        dropdownRef.current && !dropdownRef.current.contains(e.target as Node) &&
        selectRef.current && !selectRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [open]);

  // Auto-close dropdown on scroll (but allow scrolling within dropdown)
  useEffect(() => {
    if (!open) return;
    function handleScroll(e: Event) {
      // Only close if scrolling the main document, not the dropdown itself
      if (e.target === document || e.target === document.documentElement || e.target === document.body) {
        setOpen(false);
      }
    }
    window.addEventListener('scroll', handleScroll, true);
    return () => window.removeEventListener('scroll', handleScroll, true);
  }, [open]);

  // Keyboard accessibility
  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      setOpen(o => !o);
      e.preventDefault();
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  }

  return (
    <>
      <button
        ref={selectRef}
        type="button"
        className={`flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-[#00B14F] focus:border-[#00B14F] focus:ring-offset-2 ${open ? 'z-50' : ''}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
        onKeyDown={handleKeyDown}
      >
        <span className={selected ? '' : 'text-gray-400'}>
          {selected ? (renderOption ? renderOption(selected) : selected.label) : (placeholder || 'Select...')}
        </span>
        <svg className={`ml-2 w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="none" stroke="currentColor"><path d="M6 8l4 4 4-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
      {open && typeof window !== 'undefined' && ReactDOM.createPortal(
        <div
          ref={dropdownRef}
          className="absolute bg-white border border-input rounded-md shadow-lg mt-1 max-h-60 overflow-auto z-[9999]"
          style={{
            top: dropdownPos.top,
            left: dropdownPos.left,
            width: dropdownPos.width,
            position: 'absolute',
          }}
          tabIndex={-1}
          role="listbox"
          onWheel={(e) => {
            // Prevent the dropdown from closing when scrolling within it
            e.stopPropagation();
          }}
        >
          {options.map((option, idx) => (
            <div
              key={option.value || option.label || idx}
              className={`px-4 py-2 cursor-pointer transition-colors ${selected && selected.value === option.value ? 'bg-gray-100 font-semibold' : ''}`}
              role="option"
              aria-selected={selected && selected.value === option.value}
              tabIndex={0}
              style={{}}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = SIDEBAR_GREEN, e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = '', e.currentTarget.style.color = '')}
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onChange(option);
                  setOpen(false);
                }
              }}
            >
              {renderOption ? renderOption(option) : option.label}
            </div>
          ))}
        </div>,
        document.body
      )}
    </>
  );
} 