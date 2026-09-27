import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useProductStore } from '../store/useProductStore';
import { ArrowLeft, PlusCircle, RotateCcw, Loader2, CheckCircle2 } from 'lucide-react';

export const AddProductPage = () => {
  const navigate = useNavigate();
  const { createProduct, categories } = useProductStore();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: categories[0]?.slug || 'beauty',
    price: '',
    stock: '',
    brand: '',
    thumbnail: '',
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Product name is required.';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required.';
    }

    if (formData.price === '' || isNaN(formData.price) || Number(formData.price) <= 0) {
      newErrors.price = 'Please enter a valid price greater than 0.';
    }

    if (formData.stock === '' || isNaN(formData.stock) || Number(formData.stock) < 0) {
      newErrors.stock = 'Stock quantity cannot be negative.';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category.';
    }

    if (!formData.brand.trim()) {
      newErrors.brand = 'Brand name is required.';
    }

    if (formData.thumbnail && !formData.thumbnail.match(/^(https?:\/\/|\/)/)) {
      newErrors.thumbnail = 'Thumbnail must be a valid HTTP/HTTPS image URL.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error inline as user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleReset = () => {
    setFormData({
      title: '',
      description: '',
      category: categories[0]?.slug || 'beauty',
      price: '',
      stock: '',
      brand: '',
      thumbnail: '',
    });
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      await createProduct(formData);
      navigate('/'); // Return to dashboard after successful creation
    } catch (err) {
      // Error is handled by createProduct toast notification
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Cancel & Return</span>
        </Link>
      </div>

      {/* Form Container */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
        
        <div className="border-b border-slate-100 dark:border-slate-800 pb-5 mb-6">
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
            <PlusCircle className="w-6 h-6 text-sky-500" />
            <span>Add New Product</span>
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Fill in the details below to add a new item to your product management inventory.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          
          {/* Product Title / Name */}
          <div>
            <label htmlFor="title" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Product Name <span className="text-rose-500">*</span>
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Wireless Noise-Canceling Headphones"
              className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${
                errors.title
                  ? 'border-rose-400 focus:ring-rose-500'
                  : 'border-slate-200 dark:border-slate-800 focus:ring-sky-500'
              }`}
              required
            />
            {errors.title && (
              <p className="mt-1 text-xs text-rose-500 font-semibold">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Description <span className="text-rose-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              placeholder="Provide a brief summary of the product features..."
              className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${
                errors.description
                  ? 'border-rose-400 focus:ring-rose-500'
                  : 'border-slate-200 dark:border-slate-800 focus:ring-sky-500'
              }`}
              required
            />
            {errors.description && (
              <p className="mt-1 text-xs text-rose-500 font-semibold">{errors.description}</p>
            )}
          </div>

          {/* Category & Brand Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Category <span className="text-rose-500">*</span>
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
              >
                {categories.length > 0 ? (
                  categories.map((cat) => (
                    <option key={cat.slug} value={cat.slug}>
                      {cat.name}
                    </option>
                  ))
                ) : (
                  <>
                    <option value="smartphones">Smartphones</option>
                    <option value="laptops">Laptops</option>
                    <option value="beauty">Beauty</option>
                    <option value="furniture">Furniture</option>
                  </>
                )}
              </select>
            </div>

            {/* Brand */}
            <div>
              <label htmlFor="brand" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Brand Name <span className="text-rose-500">*</span>
              </label>
              <input
                id="brand"
                name="brand"
                type="text"
                value={formData.brand}
                onChange={handleChange}
                placeholder="e.g. Sony, Apple, Nike"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${
                  errors.brand
                    ? 'border-rose-400 focus:ring-rose-500'
                    : 'border-slate-200 dark:border-slate-800 focus:ring-sky-500'
                }`}
                required
              />
              {errors.brand && (
                <p className="mt-1 text-xs text-rose-500 font-semibold">{errors.brand}</p>
              )}
            </div>

          </div>

          {/* Price & Stock Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Price */}
            <div>
              <label htmlFor="price" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Price <span className="text-rose-500">*</span>
              </label>
              <input
                id="price"
                name="price"
                type="number"
                step="0.01"
                min="0.01"
                value={formData.price}
                onChange={handleChange}
                placeholder="99.99"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${
                  errors.price
                    ? 'border-rose-400 focus:ring-rose-500'
                    : 'border-slate-200 dark:border-slate-800 focus:ring-sky-500'
                }`}
                required
              />
              {errors.price && (
                <p className="mt-1 text-xs text-rose-500 font-semibold">{errors.price}</p>
              )}
            </div>

            {/* Stock Quantity */}
            <div>
              <label htmlFor="stock" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Stock Quantity <span className="text-rose-500">*</span>
              </label>
              <input
                id="stock"
                name="stock"
                type="number"
                min="0"
                value={formData.stock}
                onChange={handleChange}
                placeholder="25"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${
                  errors.stock
                    ? 'border-rose-400 focus:ring-rose-500'
                    : 'border-slate-200 dark:border-slate-800 focus:ring-sky-500'
                }`}
                required
              />
              {errors.stock && (
                <p className="mt-1 text-xs text-rose-500 font-semibold">{errors.stock}</p>
              )}
            </div>

          </div>

          {/* Thumbnail Image URL */}
          <div>
            <label htmlFor="thumbnail" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Image URL (Optional)
            </label>
            <input
              id="thumbnail"
              name="thumbnail"
              type="url"
              value={formData.thumbnail}
              onChange={handleChange}
              placeholder="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
              className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${
                errors.thumbnail
                  ? 'border-rose-400 focus:ring-rose-500'
                  : 'border-slate-200 dark:border-slate-800 focus:ring-sky-500'
              }`}
            />
            {errors.thumbnail ? (
              <p className="mt-1 text-xs text-rose-500 font-semibold">{errors.thumbnail}</p>
            ) : (
              <p className="mt-1 text-[11px] text-slate-400">
                Leave blank to use a default placeholder image.
              </p>
            )}
          </div>

          {/* Form Action Controls */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col-reverse sm:flex-row items-center justify-end gap-3">
            
            <button
              type="button"
              onClick={handleReset}
              disabled={submitting}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-medium text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset Fields</span>
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white font-bold text-sm shadow-md shadow-sky-600/20 transition-all focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Save Product</span>
                </>
              )}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};
