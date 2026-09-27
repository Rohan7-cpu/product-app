import React from 'react';

export const CardSkeleton = () => (
  <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 animate-pulse flex flex-col gap-3">
    <div className="w-full h-44 bg-slate-200 dark:bg-slate-800 rounded-xl" />
    <div className="flex items-center justify-between">
      <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
      <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/4" />
    </div>
    <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
    <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full" />
    <div className="mt-auto pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
      <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
      <div className="h-9 bg-slate-200 dark:bg-slate-800 rounded-xl w-1/3" />
    </div>
  </div>
);

export const TableSkeleton = () => (
  <div className="w-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-pulse">
    <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex justify-between">
      <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-1/4" />
      <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-1/6" />
    </div>
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <div key={i} className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-4">
        <div className="w-12 h-12 bg-slate-200 dark:bg-slate-800 rounded-lg shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
          <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/5" />
        </div>
        <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-16" />
        <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-lg w-24" />
      </div>
    ))}
  </div>
);
