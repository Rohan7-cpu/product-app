import React from 'react';

export const Footer = () => {
  return (
    <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 text-center text-xs text-slate-500 dark:text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p>© {new Date().getFullYear()} ProductHub. Built with React & JavaScript.</p>
        <div className="flex items-center gap-4">
        </div>
      </div>
    </footer>
  );
};
