import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { ProductListPage } from './pages/ProductListPage';
import { LoginPage } from './pages/LoginPage';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { NotFoundPage } from './pages/NotFoundPage';

// Performance Requirement: Route Lazy Loading (Section 6)
const ProductDetailPage = lazy(() =>
  import('./pages/ProductDetailPage').then((module) => ({ default: module.ProductDetailPage }))
);
const AddProductPage = lazy(() =>
  import('./pages/AddProductPage').then((module) => ({ default: module.AddProductPage }))
);

// Fallback loader component while lazy routes load
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="w-10 h-10 border-4 border-sky-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* Public Login Route */}
          <Route path="login" element={<LoginPage />} />

          {/* Protected Dashboard Routes */}
          <Route
            index
            element={
              <ProtectedRoute>
                <ProductListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="products/:id"
            element={
              <ProtectedRoute>
                <Suspense fallback={<PageLoader />}>
                  <ProductDetailPage />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="products/add"
            element={
              <ProtectedRoute>
                <Suspense fallback={<PageLoader />}>
                  <AddProductPage />
                </Suspense>
              </ProtectedRoute>
            }
          />

          {/* 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
