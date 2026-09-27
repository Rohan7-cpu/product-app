import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, ArrowRight, Sparkles } from 'lucide-react';
import { useProductStore } from '../../store/useProductStore';

export const ProductCard = ({ product }) => {
  const { favorites, toggleFavorite, formatPrice } = useProductStore();
  const isFavorite = favorites.includes(product.id);

  const getStockBadge = (stock) => {
    if (stock <= 0) {
      return (
        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300">
          Out of Stock
        </span>
      );
    }
    if (stock < 10) {
      return (
        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 dark:bg-amber-950/80 dark:text-amber-300">
          Low Stock ({stock})
        </span>
      );
    }
    return (
      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300">
        In Stock ({stock})
      </span>
    );
  };

  return (
    <div className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
      
      {/* Product Image & Badges Overlay */}
      <div className="relative w-full h-48 bg-slate-100 dark:bg-slate-800 overflow-hidden">
        <img
          src={product.thumbnail || product.images?.[0]}
          alt={product.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Local product indicator badge */}
        {product.isLocal && (
          <span className="absolute top-3 left-3 bg-sky-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md">
            <Sparkles className="w-3 h-3" /> New Local
          </span>
        )}

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all shadow-sm ${
            isFavorite
              ? 'bg-rose-500 text-white'
              : 'bg-white/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-300 hover:text-rose-500'
          }`}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-white' : ''}`} />
        </button>

        {/* Stock Status Badge */}
        <div className="absolute bottom-3 left-3">
          {getStockBadge(product.stock)}
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Brand */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1.5">
            <span className="font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400">
              {product.category}
            </span>
            {product.brand && <span>{product.brand}</span>}
          </div>

          {/* Product Title */}
          <h3 className="font-bold text-slate-900 dark:text-white text-base line-clamp-1 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
            {product.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-2">
            <div className="flex items-center text-amber-400">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            </div>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
              {product.rating ? Number(product.rating).toFixed(1) : '4.5'}
            </span>
            <span className="text-xs text-slate-400">/ 5</span>
          </div>
        </div>

        {/* Card Footer: Price & Details Link */}
        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-lg font-extrabold text-slate-900 dark:text-white">
              {formatPrice(product.price)}
            </div>
            {product.discountPercentage > 0 && (
              <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                {Math.round(product.discountPercentage)}% OFF
              </span>
            )}
          </div>

          <Link
            to={`/products/${product.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl bg-slate-900 text-white dark:bg-slate-800 dark:text-slate-100 hover:bg-sky-600 dark:hover:bg-sky-600 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <span>Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

    </div>
  );
};
