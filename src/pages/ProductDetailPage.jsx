import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { useProductStore } from '../store/useProductStore';
import {
  ArrowLeft,
  Star,
  Heart,
  PackageCheck,
  ShieldCheck,
  Truck,
  Tag,
  AlertTriangle,
  Sparkles
} from 'lucide-react';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { favorites, toggleFavorite, products, formatPrice } = useProductStore();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      setError(null);

      // Check if product exists in local store state first (e.g. locally added product)
      const localMatch = products.find((p) => String(p.id) === String(id));
      if (localMatch) {
        setProduct(localMatch);
        setSelectedImage(localMatch.thumbnail || localMatch.images?.[0] || '');
        setLoading(false);
        return;
      }

      // Otherwise fetch from API
      try {
        const data = await api.getProductById(id);
        setProduct(data);
        setSelectedImage(data.thumbnail || data.images?.[0] || '');
      } catch (err) {
        setError(err.message || 'Failed to fetch product details.');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id, products]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto space-y-6 animate-pulse">
        <div className="w-32 h-9 bg-slate-200 dark:bg-slate-800 rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl">
          <div className="w-full h-80 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
          <div className="space-y-4">
            <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-1/4" />
            <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
            <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
            <div className="h-20 bg-slate-200 dark:bg-slate-800 rounded w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-xl mx-auto text-center py-12">
        <div className="w-16 h-16 bg-rose-100 dark:bg-rose-950 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Product Not Found
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mb-6">
          {error || "The product you are looking for does not exist or has been removed."}
        </p>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-slate-800 font-medium text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Dashboard</span>
        </button>
      </div>
    );
  }

  const isFavorite = favorites.includes(product.id);
  const rawOriginalPrice = product.discountPercentage
    ? product.price / (1 - product.discountPercentage / 100)
    : null;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Back Button */}
      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Products</span>
        </Link>
      </div>

      {/* Main Details Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        
        {/* Gallery / Main Image */}
        <div className="space-y-4">
          <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800">
            <img
              src={selectedImage}
              alt={product.title}
              className="w-full h-full object-cover object-center"
            />
            {product.isLocal && (
              <span className="absolute top-4 left-4 bg-sky-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-md">
                <Sparkles className="w-3.5 h-3.5" /> Locally Added
              </span>
            )}
            <button
              onClick={() => toggleFavorite(product.id)}
              className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md shadow-md transition-all ${
                isFavorite
                  ? 'bg-rose-500 text-white'
                  : 'bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 hover:text-rose-500'
              }`}
              aria-label="Favorite product"
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-white' : ''}`} />
            </button>
          </div>

          {/* Image Thumbnails Strip */}
          {product.images && product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                    selectedImage === img
                      ? 'border-sky-500 scale-105'
                      : 'border-slate-200 dark:border-slate-800 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info & Specifications */}
        <div className="flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            
            {/* Category & Brand */}
            <div className="flex items-center justify-between text-xs font-bold tracking-wider uppercase">
              <span className="text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 px-3 py-1 rounded-lg">
                {product.category}
              </span>
              {product.brand && (
                <span className="text-slate-500 dark:text-slate-400">
                  Brand: {product.brand}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
              {product.title}
            </h1>

            {/* Rating & Stock */}
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 font-bold px-2.5 py-1 rounded-lg">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{product.rating ? Number(product.rating).toFixed(1) : '4.5'}</span>
              </div>

              <div className="text-xs">
                {product.stock <= 0 ? (
                  <span className="font-semibold text-rose-600 dark:text-rose-400">
                    Out of Stock
                  </span>
                ) : (
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    In Stock ({product.stock} units left)
                  </span>
                )}
              </div>
            </div>

            {/* Price Box */}
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl flex items-baseline gap-3">
              <span className="text-3xl font-black text-slate-900 dark:text-white">
                {formatPrice(product.price)}
              </span>
              {rawOriginalPrice && (
                <span className="text-sm font-semibold text-slate-400 line-through">
                  {formatPrice(rawOriginalPrice)}
                </span>
              )}
              {product.discountPercentage > 0 && (
                <span className="ml-auto text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 px-2.5 py-1 rounded-lg">
                  Save {Math.round(product.discountPercentage)}%
                </span>
              )}
            </div>

            {/* Description */}
            <div>
              <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-1.5">
                Description
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>

          {/* Feature Highlights Grid */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-sky-500" />
              <span>Fast Express Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Authentic Quality Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <PackageCheck className="w-4 h-4 text-indigo-500" />
              <span>Standard Warranty Included</span>
            </div>
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-amber-500" />
              <span>SKU: #{product.id}</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
