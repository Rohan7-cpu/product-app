import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, ArrowLeft } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="max-w-md mx-auto text-center py-16 px-4">
      <div className="w-20 h-20 bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 rounded-full flex items-center justify-center mx-auto mb-5 shadow-sm">
        <HelpCircle className="w-10 h-10" />
      </div>
      <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2">404</h1>
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-3">
        Page Not Found
      </h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
        The page you are trying to access doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-sky-600 text-white font-bold text-sm shadow-md hover:bg-sky-700 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Dashboard</span>
      </Link>
    </div>
  );
};
