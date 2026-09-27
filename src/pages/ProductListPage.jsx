import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProductStore } from '../store/useProductStore';
import { ProductFilters } from '../components/products/ProductFilters';
import { ProductCard } from '../components/products/ProductCard';
import { ProductTable } from '../components/products/ProductTable';
import { Pagination } from '../components/products/Pagination';
import { CardSkeleton, TableSkeleton } from '../components/common/LoadingSkeleton';
import { ErrorState } from '../components/common/ErrorState';
import { EmptyState } from '../components/common/EmptyState';
import { PlusCircle } from 'lucide-react';

export const ProductListPage = () => {
  const {
    products,
    loading,
    error,
    filters,
    viewMode,
    fetchProducts,
    fetchCategories,
  } = useProductStore();

  // Load categories once on mount
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Fetch products whenever filter parameters change (search, category, page, limit)
  useEffect(() => {
    fetchProducts();
  }, [filters.search, filters.category, filters.page, fetchProducts]);

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-sky-600 via-indigo-600 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl shadow-sky-900/10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Product Inventory
          </h1>
      
        </div>
        <Link
          to="/products/add"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white text-slate-900 font-bold text-sm shadow-md hover:bg-sky-50 transition-all focus:outline-none focus:ring-2 focus:ring-white shrink-0"
        >
          <PlusCircle className="w-5 h-5 text-sky-600" />
          <span>Add New Product</span>
        </Link>
      </div>

      {/* Filter Toolbar */}
      <ProductFilters />

      {/* Content Rendering Logic */}
      {loading ? (
        viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {[...Array(8)].map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <TableSkeleton />
        )
      ) : error ? (
        <ErrorState message={error} onRetry={fetchProducts} />
      ) : products.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <ProductTable products={products} />
          )}

          {/* Pagination Controls */}
          <Pagination />
        </>
      )}

    </div>
  );
};
