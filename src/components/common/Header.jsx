import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useProductStore } from '../../store/useProductStore';
import { LayoutGrid, PlusCircle, Sun, Moon, Heart, PackageSearch, LogOut, User, LogIn, DollarSign, IndianRupee } from 'lucide-react';

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme, favorites, user, logout, currency, toggleCurrency } = useProductStore();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo & Brand Name */}
        <Link to="/" className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-sky-500 rounded-lg p-1">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform duration-200">
            <PackageSearch className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white block leading-tight">
              ProductHub
            </span>
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block leading-none">
              Management Dashboard
            </span>
          </div>
        </Link>

        {/* Navigation & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {user && (
            <nav className="flex items-center gap-1 sm:gap-2">
              <Link
                to="/"
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive('/')
                    ? 'bg-sky-50 text-sky-600 dark:bg-sky-950/60 dark:text-sky-400 font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>

              <Link
                to="/products/add"
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive('/products/add')
                    ? 'bg-sky-50 text-sky-600 dark:bg-sky-950/60 dark:text-sky-400 font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <PlusCircle className="w-4 h-4 text-sky-500" />
                <span className="hidden sm:inline">Add Product</span>
              </Link>
            </nav>
          )}

          <div className="h-5 w-px bg-slate-200 dark:bg-slate-800 my-auto hidden sm:block" />

          {/* Currency Toggle Switcher (INR ₹ / USD $) */}
          <button
            onClick={toggleCurrency}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            title={`Switch currency to ${currency === 'INR' ? 'USD ($)' : 'INR (₹)'}`}
            aria-label="Toggle currency"
          >
            {currency === 'INR' ? (
              <>
                <IndianRupee className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>INR (₹)</span>
              </>
            ) : (
              <>
                <DollarSign className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                <span>USD ($)</span>
              </>
            )}
          </button>

          {/* Favorites Badge Counter */}
          <div className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400" title="Saved Favorites">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>{favorites.length}</span>
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500"
            aria-label="Toggle light and dark mode"
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5 text-slate-700" />
            ) : (
              <Sun className="w-5 h-5 text-amber-400" />
            )}
          </button>

          {/* User Profile / Auth State */}
          {user ? (
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
              <div className="hidden md:flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-1.5 rounded-lg">
                <User className="w-3.5 h-3.5 text-sky-500" />
                <span>{user.username}</span>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                title="Log Out"
                aria-label="Log Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-600 text-white font-semibold text-xs hover:bg-sky-700 transition-colors"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Log In</span>
            </Link>
          )}

        </div>

      </div>
    </header>
  );
};
