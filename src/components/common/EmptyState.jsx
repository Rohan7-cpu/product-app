import React from 'react';
import { PackageSearch, RotateCcw } from 'lucide-react';
import { useProductStore } from '../../store/useProductStore';

export const EmptyState = () => {
  const { resetFilters } = useProductStore();

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center max-w-md mx-auto my-10 shadow-sm">
      <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 rounded-full flex items-center justify-center mx-auto mb-4">
        <PackageSearch className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
        No Products Found
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
        We couldn't find any products matching your search criteria. Try tweaking your search query or clear active category filters.
      </p>
      <button
        onClick={resetFilters}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-medium text-sm transition-all focus:outline-none focus:ring-2 focus:ring-slate-500"
      >
        <RotateCcw className="w-4 h-4" />
        <span>Reset Filters</span>
      </button>
    </div>
  );
};
