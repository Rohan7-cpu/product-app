import { create } from 'zustand';
import { api } from '../services/api';

// Helper to retrieve saved user from localStorage
const getInitialUser = () => {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('user');
      return saved ? JSON.parse(saved) : { username: 'admin', role: 'Administrator' };
    } catch {
      return { username: 'admin', role: 'Administrator' };
    }
  }
  return { username: 'admin', role: 'Administrator' };
};

// Helper to retrieve saved theme from localStorage
const getInitialTheme = () => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
};

// Helper to retrieve saved favorites from localStorage
const getInitialFavorites = () => {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  }
  return [];
};

// Helper to retrieve currency preference (default to INR ₹)
const getInitialCurrency = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('currency') || 'INR';
  }
  return 'INR';
};

export const useProductStore = create((set, get) => ({
  // Authentication State
  user: getInitialUser(),

  // Core State
  products: [],
  localProducts: [],
  categories: [],
  total: 0,
  loading: false,
  categoriesLoading: false,
  error: null,

  // Currency State ('INR' or 'USD')
  currency: getInitialCurrency(),
  usdToInrRate: 83.5, // 1 USD = ~83.5 INR

  // Filters & Pagination State
  filters: {
    search: '',
    category: 'all',
    sortBy: 'price-asc',
    page: 1,
    limit: 12,
  },

  // UI Preference States
  viewMode: 'grid', // 'grid' or 'table'
  favorites: getInitialFavorites(),
  theme: getInitialTheme(),
  toasts: [],

  // --- ACTIONS ---

  // Currency Toggle Action (Switch between INR ₹ and USD $)
  toggleCurrency: () => {
    const nextCurrency = get().currency === 'INR' ? 'USD' : 'INR';
    localStorage.setItem('currency', nextCurrency);
    set({ currency: nextCurrency });
    get().addToast('info', 'Currency Updated', `Prices are now displayed in ${nextCurrency === 'INR' ? 'Indian Rupees (₹)' : 'US Dollars ($)'}`);
  },

  // Format Price Helper Function
  formatPrice: (priceInUSD) => {
    const numPrice = Number(priceInUSD) || 0;
    const { currency, usdToInrRate } = get();

    if (currency === 'INR') {
      const inrAmount = Math.round(numPrice * usdToInrRate);
      return `₹${inrAmount.toLocaleString('en-IN')}`;
    }
    return `$${numPrice.toFixed(2)}`;
  },

  // Login Action
  login: (username, password) => {
    if (username.trim() === 'admin' && password === 'password123') {
      const userObj = { username: 'admin', role: 'Administrator', loginTime: new Date().toISOString() };
      localStorage.setItem('user', JSON.stringify(userObj));
      set({ user: userObj });
      get().addToast('success', 'Welcome Back!', 'Successfully authenticated as Administrator.');
      return true;
    } else {
      get().addToast('error', 'Authentication Failed', 'Invalid username or password.');
      return false;
    }
  },

  // Logout Action
  logout: () => {
    localStorage.removeItem('user');
    set({ user: null });
    get().addToast('info', 'Logged Out', 'You have been signed out of your account.');
  },

  // Update Search term (resets to page 1)
  setSearch: (search) => {
    set((state) => ({
      filters: { ...state.filters, search, page: 1 }
    }));
  },

  // Update Category filter (resets to page 1)
  setCategory: (category) => {
    set((state) => ({
      filters: { ...state.filters, category, page: 1 }
    }));
  },

  // Update Sorting option
  setSortBy: (sortBy) => {
    set((state) => ({
      filters: { ...state.filters, sortBy }
    }));
  },

  // Update Page number
  setPage: (page) => {
    set((state) => ({
      filters: { ...state.filters, page }
    }));
  },

  // Reset all filters to default
  resetFilters: () => {
    set((state) => ({
      filters: {
        search: '',
        category: 'all',
        sortBy: 'price-asc',
        page: 1,
        limit: 12,
      }
    }));
    get().addToast('info', 'Filters Reset', 'All filter options have been restored to default.');
  },

  // Toggle View Mode (Grid vs Table)
  setViewMode: (viewMode) => set({ viewMode }),

  // Toggle Theme Mode (Light / Dark)
  toggleTheme: () => {
    const currentTheme = get().theme;
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', nextTheme);

    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    set({ theme: nextTheme });
  },

  // Toggle Product Favorite
  toggleFavorite: (productId) => {
    const currentFavs = get().favorites;
    const isFav = currentFavs.includes(productId);
    const updated = isFav
      ? currentFavs.filter((id) => id !== productId)
      : [...currentFavs, productId];

    localStorage.setItem('favorites', JSON.stringify(updated));
    set({ favorites: updated });

    if (isFav) {
      get().addToast('info', 'Removed from Favorites', 'Product removed from your saved items.');
    } else {
      get().addToast('success', 'Added to Favorites', 'Product saved to your favorites.');
    }
  },

  // Toast Notification System
  addToast: (type, title, message = '') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    set((state) => ({
      toasts: [...state.toasts, { id, type, title, message }]
    }));

    setTimeout(() => {
      get().removeToast(id);
    }, 4000);
  },

  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id)
    }));
  },

  // Fetch Categories Action
  fetchCategories: async () => {
    set({ categoriesLoading: true });
    try {
      const categories = await api.getCategories();
      set({ categories, categoriesLoading: false });
    } catch (err) {
      console.error('Failed to load categories:', err);
      set({ categoriesLoading: false });
    }
  },

  // Main Fetch Products Action (Includes local products matching category & search filter)
  fetchProducts: async () => {
    const { filters, localProducts } = get();
    set({ loading: true, error: null });

    try {
      const response = await api.getProducts(filters);
      let fetchedProducts = response.products || [];

      // Filter user's locally created products matching active category & search query
      const matchingLocalProducts = localProducts.filter((p) => {
        // Search filter check
        if (filters.search.trim()) {
          const query = filters.search.toLowerCase();
          const matchesTitle = p.title.toLowerCase().includes(query);
          const matchesBrand = p.brand ? p.brand.toLowerCase().includes(query) : false;
          if (!matchesTitle && !matchesBrand) return false;
        }

        // Category filter check
        if (filters.category && filters.category !== 'all') {
          const pCat = (p.category || '').toLowerCase().trim();
          const fCat = filters.category.toLowerCase().trim();
          if (pCat !== fCat) return false;
        }

        return true;
      });

      // Prepend matching local products on page 1
      if (filters.page === 1) {
        fetchedProducts = [...matchingLocalProducts, ...fetchedProducts];
      }

      // Client-side sorting
      fetchedProducts.sort((a, b) => {
        switch (filters.sortBy) {
          case 'price-asc':
            return a.price - b.price;
          case 'price-desc':
            return b.price - a.price;
          case 'rating-desc':
            return b.rating - a.rating;
          case 'rating-asc':
            return a.rating - b.rating;
          case 'title-asc':
            return a.title.localeCompare(b.title);
          default:
            return 0;
        }
      });

      set({
        products: fetchedProducts,
        total: (response.total || 0) + (filters.page === 1 ? matchingLocalProducts.length : 0),
        loading: false,
        error: null,
      });
    } catch (err) {
      set({
        loading: false,
        error: err.message || 'An error occurred while fetching products.',
      });
    }
  },

  // Create Product Action
  createProduct: async (formData) => {
    try {
      const newProduct = await api.createProduct(formData);
      
      // Update local state
      set((state) => ({
        localProducts: [newProduct, ...state.localProducts],
        products: [newProduct, ...state.products]
      }));

      get().addToast('success', 'Product Created!', `"${newProduct.title}" has been successfully added under "${newProduct.category}".`);
      return newProduct;
    } catch (err) {
      get().addToast('error', 'Creation Failed', err.message || 'Could not add product.');
      throw err;
    }
  }
}));
