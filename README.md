# 🛍️ ProductHub - Responsive Product Management Dashboard

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?logo=javascript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwind-css)
![Zustand](https://img.shields.io/badge/State_Management-Zustand-purple)
![Vercel](https://img.shields.io/badge/Deployment-Vercel_Live-brightgreen?logo=vercel)

A production-minded, fully responsive **Product Management Dashboard** built with **React** and **JavaScript** for the Technical Hiring Assignment. The application integrates with the public [DummyJSON Products API](https://dummyjson.com/products) to allow users to browse, search, filter, sort, view details, and dynamically add products with global state management, performance optimizations, multi-currency support, and bonus features.

---

## 🌐 Live Links & Repository
- 🔗 **Live Vercel Deployment**: [https://product-app-alpha-nine.vercel.app](https://product-app-alpha-nine.vercel.app)
- 📁 **GitHub Repository**: [https://github.com/Rohan7-cpu/product-app.git](https://github.com/Rohan7-cpu/product-app.git)

---

## 🚀 Key Features & Deliverables

### 1. Product Listing Dashboard (`/`)
- **Dual View Modes**: Toggle seamlessly between a **Responsive Grid Card View** and an **Adaptive Data Table View**.
- **Debounced Search**: Powered by a custom `useDebounce` hook (400ms delay) to prevent excessive API calls while typing.
- **Category Filter**: Dynamically populates categories from the DummyJSON API with fallback safety.
- **Multi-Attribute Sorting**: Sort products by Price (Low to High / High to Low), Rating, or Title A-Z.
- **Client & Local Pagination**: Smooth pagination with range counters (*e.g., "Showing 1 to 12 of 194 products"*).
- **Graceful UX States**:
  - 🦴 **Skeleton Loaders** during data fetching.
  - ⚠️ **Error State** with an interactive "Try Again" retry button.
  - 📦 **Empty Results State** with a "Reset Filters" action button.

### 2. Multi-Currency Support (`₹ INR` & `$ USD`)
- **1-Click Currency Switcher**: Easily toggle prices between **Indian Rupees (₹)** and **US Dollars ($)** in the top navigation bar.
- Automatic price conversion with formatted Indian number system (*e.g., `₹8,299`*).

### 3. Product Details Page (`/products/:id`)
- Deep-linked route displaying product thumbnails, gallery selector, stock status badge, brand name, category tag, star rating, description, and discount savings calculations.
- Clean "Back to Products" navigation control.

### 4. Add Product Form (`/products/add`)
- Fields: Product Name, Description, Category, Price, Stock Quantity, Brand, and Image URL.
- **Client-Side Validation**: Inline red error messages for required fields, price > 0, stock ≥ 0, and URL formats.
- **Instant State Sync**: Submits to `POST /products/add` and immediately updates the global Zustand store so new products appear instantly on the dashboard under their selected category.

### 5. Login Page & Access Control (`/login`)
- **JSON Default Credentials Display**: Prominently shows default credentials formatted in a copyable JSON block directly on the login card:
  ```json
  {
    "username": "admin",
    "password": "password123"
  }
  ```
- **1-Click Auto-Fill**: Includes a button to auto-fill demo credentials for instant evaluation.
- **Protected Routes**: Navigation to dashboard routes (`/`, `/products/:id`, `/products/add`) is guarded by a `ProtectedRoute` wrapper.

---

## ⚡ Performance Optimizations (Section 6)

1. **Debounced Search Hook** (`src/hooks/useDebounce.js`):
   Delays search filter execution by 400ms to eliminate unnecessary server requests while the user types.
2. **Route Lazy Loading (`React.lazy` + `Suspense`)** (`src/App.js`):
   Code-splits heavy routes (`/products/:id` and `/products/add`) into separate bundle chunks to minimize initial page load time.

---

## 🎁 Optional Bonus Features Implemented (Section 11)

1. **Dark & Light Theme**: Toggle switch with `localStorage` memory and smooth Tailwind `dark` class transitions.
2. **Toast Notification System**: Custom floating alerts (`src/components/common/ToastContainer.jsx`) giving real-time feedback for product creations, errors, and filter resets.
3. **Favorites Management**: Heart toggle on product cards with persistent `localStorage` storage and header counter.

---

## 🛠️ Technology Decisions

| Technology | Purpose | Rationale |
| :--- | :--- | :--- |
| **React 18** | UI Framework | Component-driven declarative UI rendering |
| **JavaScript (ES6+)** | Language | High readability, quick presentation & easy to maintain |
| **React Router v6** | Client-side Routing | Enables SPA navigation with protected routes and lazy loading |
| **Zustand** | Global State Store | Lightweight, zero-boilerplate alternative to Redux |
| **Tailwind CSS** | Styling | Rapid utility-first styling with built-in dark mode support |
| **Lucide Icons** | UI Icons | Clean, modern vector icons |
| **DummyJSON API** | Backend API | Public REST API for product data integration |
| **Vercel** | Live Hosting | Automatic CI/CD deployment with `vercel.json` SPA rewrites |

---

## 📂 Complete Project Structure

```
product-dash/
├── public/
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.jsx          # Top navbar with Currency Toggle, Theme Switch & User Badge
│   │   │   ├── Footer.jsx          # Application footer
│   │   │   ├── ToastContainer.jsx  # Floating Toast Notifications system
│   │   │   ├── LoadingSkeleton.jsx # Grid & Table skeleton loaders
│   │   │   ├── ErrorState.jsx      # Error alert with Retry button
│   │   │   ├── EmptyState.jsx      # Empty search results with Reset action
│   │   │   └── ProtectedRoute.jsx  # Auth guard wrapper
│   │   └── products/
│   │       ├── ProductCard.jsx     # Responsive product card grid view
│   │       ├── ProductTable.jsx    # Responsive data table view
│   │       ├── ProductFilters.jsx  # Debounced search & filter toolbar
│   │       └── Pagination.jsx      # Pagination bar with range counter
│   ├── hooks/
│   │   └── useDebounce.js          # Custom Debouncing Hook
│   ├── pages/
│   │   ├── LoginPage.jsx           # Login page with JSON credentials box
│   │   ├── ProductListPage.jsx     # Primary Dashboard Page
│   │   ├── ProductDetailPage.jsx   # Product Details Route (/products/:id)
│   │   ├── AddProductPage.jsx      # Validated Form Route (/products/add)
│   │   └── NotFoundPage.jsx       # 404 Error Page
│   ├── services/
│   │   └── api.js                  # DummyJSON API Integration Service
│   ├── store/
│   │   └── useProductStore.js      # Central Zustand State Store & Currency Logic
│   ├── layouts/
│   │   └── MainLayout.jsx          # Shared Page Layout Wrapper
│   ├── App.js                      # Router Setup & Route Lazy Loading
│   ├── index.js                    # Application entry point
│   └── index.css                   # Tailwind Directives & Custom Scrollbars
├── vercel.json                     # Vercel SPA routing configuration
├── package.json
└── tailwind.config.js
```

---

## 🌐 API Integration Summary

| Endpoint | Method | Purpose |
| :--- | :--- | :--- |
| `https://dummyjson.com/products` | `GET` | Retrieve paginated list of products |
| `https://dummyjson.com/products/search?q={query}` | `GET` | Search products by term |
| `https://dummyjson.com/products/category/{cat}` | `GET` | Filter products by category |
| `https://dummyjson.com/products/categories` | `GET` | Fetch category filter options |
| `https://dummyjson.com/products/{id}` | `GET` | Retrieve single product details |
| `https://dummyjson.com/products/add` | `POST` | Submit new product |

---

## 💻 Local Development Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Rohan7-cpu/product-app.git
   cd product-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm start
   ```
   Open `http://localhost:3000` in your browser.

4. **Build Production Bundle**:
   ```bash
   npm run build
   ```

---

## 🚀 Live Deployment
- **Live Vercel Application**: [https://product-app-alpha-nine.vercel.app](https://product-app-alpha-nine.vercel.app)

---

## 💡 Candidate Interview Cheat Sheet

When presenting this project to interviewers, use these key talking points:

1. **Why Zustand for State Management?**
   > *"I chose Zustand over Redux because it offers a centralized global store without unnecessary boilerplate. It cleanly handles product state, category filters, local user-created items, currency formatting, dark mode, and toast notifications."*

2. **How is Performance Optimized?**
   > *"I implemented two primary Section 6 performance features: a custom `useDebounce` hook that delays search execution by 400ms to reduce API load, and `React.lazy()` route lazy loading to split bundle chunks for the detail and form pages."*

3. **How does Local Data & Category Filtering Work?**
   > *"When a user adds a new product, it is posted to `POST /products/add` and prepended to the Zustand local store. When filtering by category (e.g., `smartphones`), local products are dynamically filtered alongside API results so they show up under their respective categories."*

4. **Authentication & Access Control**:
   > *"To make testing easy for evaluators, default credentials are displayed in JSON format on the Login page with a 1-click auto-fill button. Navigation to dashboard pages is secured using a `ProtectedRoute` component."*
