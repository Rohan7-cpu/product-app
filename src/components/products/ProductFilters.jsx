import React, { useState, useEffect } from 'react';
import { Search, LayoutGrid, List, RotateCcw, X } from 'lucide-react';
import { useProductStore } from '../../store/useProductStore';
import { useDebounce } from '../../hooks/useDebounce';

export const ProductFilters = () => {
  const {
    filters,
    setSearch,
    setCategory,
    setSortBy,
    resetFilters,
    categories,
    categoriesLoading,
    viewMode,
    setViewMode,
  } = useProductStore();

  // Local state for smooth search input typing before debouncing
  const [searchInput, setSearchInput] = useState(filters.search);
  
  // Custom hook: debounces search input by 400ms (Performance Requirement #1)
  const debouncedSearchTerm = useDebounce(searchInput, 400);

  // Sync debounced search value with Zustand store
  useEffect(() => {
    if (debouncedSearchTerm !== filters.search) {
      setSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, filters.search, setSearch]);

  // Keep local input state synced when filters are reset
  useEffect(() => {
    setSearchInput(filters.search);
  }, [filters.search]);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 mb-6 shadow-sm space-y-4">
      
      {/* Top Filter Controls Row */}
      <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
        
        {/* Search Box */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search products by name or keyword..."
            className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white dark:focus:bg-slate-900 transition-all"
            aria-label="Search products"
          />
          {searchInput && (
            <button
              onClick={() => {
                setSearchInput('');
                setSearch('');
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5 rounded-md"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Dropdowns & View Toggle Row */}
        <div className="flex flex-wrap sm:flex-nowrap gap-2.5 items-center">
          
          {/* Category Filter */}
          <div className="flex-1 sm:flex-initial min-w-[140px]">
            <select
              value={filters.category}
              onChange={(e) => setCategory(e.target.value)}
              disabled={categoriesLoading}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all cursor-pointer"
              aria-label="Filter by Category"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.slug} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex-1 sm:flex-initial min-w-[150px]">
            <select
              value={filters.sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all cursor-pointer"
              aria-label="Sort products"
            >
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating-desc">Rating: High to Low</option>
              <option value="rating-asc">Rating: Low to High</option>
              <option value="title-asc">Title: A to Z</option>
            </select>
          </div>

          {/* Grid vs Table View Mode Switcher */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 shrink-0">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-sm font-medium transition-all ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Grid View"
              aria-label="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-sm font-medium transition-all ${
                viewMode === 'table'
                  ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Table View"
              aria-label="Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Reset Filters Button */}
          {(filters.search || filters.category !== 'all' || filters.sortBy !== 'price-asc') && (
            <button
              onClick={() => {
                setSearchInput('');
                resetFilters();
              }}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-all shrink-0"
              title="Reset all filters"
              aria-label="Reset all filters"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}

        </div>

      </div>

    </div>
  );
};
