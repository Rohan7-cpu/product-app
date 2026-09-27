# ProductHub - Responsive Product Management Dashboard

A production-minded, responsive Product Management Dashboard constructed with **React** and **JavaScript**. This application interacts with the public [DummyJSON Products API](https://dummyjson.com/products) to browse, search, filter, sort, view details, and dynamically add products with global state management, performance optimizations, and bonus features.

---

## 🚀 Key Features & Implementation Breakdown

### 1. Product Listing & Dashboard (`/`)
- **Dual Display Modes**: Toggle between a **Responsive Grid Card view** and an **Adaptive Data Table view**.
- **Debounced Search**: Built using a custom `useDebounce` hook (400ms delay) to prevent unnecessary API network calls while typing.
- **Category Filter**: Dynamically populated from API categories with fallback options.
- **Sorting**: Client-side multi-attribute sorting (Price: Low to High, Price: High to Low, Rating, Title A-Z).
- **Pagination**: Page-by-page controls showing range items (*e.g., "Showing 1 to 12 of 194 products"*).
- **UX States**: Built-in **Loading Skeletons**, **Error State with Retry Action**, and **Empty Match Results State with Reset Filters button**.

### 2. Product Details Page (`/products/:id`)
- Displays product image gallery with thumbnail selectors, price, discount percentage savings, rating breakdown, brand name, category tag, stock count, and full description.
- Easy "Back to Products" navigation control.

### 3. Add Product Form (`/products/add`)
- Comprehensive form featuring Product Name, Description, Category, Price, Stock Quantity, Brand Name, and Image URL.
- **Validation**: Client-side inline error alerts for required fields, numeric constraints (Price > 0, Stock ≥ 0), and URL validation.
- **State Integration**: Immediately updates the central Zustand store upon successful creation so the new item appears right away on the dashboard.

### 4. Login Page & Access Control (`/login`)
- **JSON Credentials Display**: Shows default login credentials in a formatted, copyable JSON viewer box directly on the login page:
  ```json
  {
    "username": "admin",
    "password": "password123"
  }
  ```
- **1-Click Auto-Fill**: Includes a button to auto-fill demo credentials for instant login.
- **Protected Routes**: Navigation to `/`, `/products/:id`, and `/products/add` is guarded via a `ProtectedRoute` wrapper component.

### 5. Section 6 Performance Requirements
1. **Debounced Search** (`src/hooks/useDebounce.js`): Prevents rapid keystrokes from spamming API endpoints.
2. **Route Lazy Loading** (`React.lazy` + `Suspense` in `src/App.jsx`): Code splits the Product Details and Add Product pages to shrink initial JS bundle size.

### 6. Section 11 Bonus Features
1. **Dark & Light Theme**: Toggle switch in header with `localStorage` memory and smooth Tailwind `dark` class transitions.
2. **Toast Notifications**: Accessible floating alert messages (`src/components/common/ToastContainer.jsx`) providing feedback for product additions, errors, and filter updates.
3. **Favorites Management**: Save favorite products with heart toggles and persistent `localStorage` storage.

---

## 🌐 Deploying to Vercel

The project includes `vercel.json` configured for client-side single page application (SPA) routing.

### Option A: Deploy via GitHub (Recommended)
1. Push your code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Product Management Dashboard"
   git remote add origin <YOUR_GITHUB_REPO_URL>
   git push -u origin main
   ```
2. Go to [vercel.com/new](https://vercel.com/new).
3. Import your GitHub repository.
4. Click **Deploy**. Vercel will automatically detect the build configuration from `vercel.json` and deploy your app.

### Option B: Deploy via Vercel CLI
Run the following command inside the project directory:
```bash
npx vercel
```
Follow the interactive prompts to link your Vercel account and deploy in seconds!

---

## 🛠️ Technology Stack & Decisions

- **Framework**: React 18
- **Language**: JavaScript (ES6+)
- **Routing**: React Router v6
- **State Management**: Zustand (*Chosen over Redux for its lightweight footprint, zero boilerplate, and simple hook-based usage*)
- **Styling**: Tailwind CSS & Lucide Icons
- **API**: DummyJSON Products API

---

## 📂 Project Structure

```
product-dash/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.jsx          # Navbar with Theme Toggle, User Profile & Favorites
│   │   │   ├── Footer.jsx          # App Footer
│   │   │   ├── ToastContainer.jsx  # Floating Toast Notifications
│   │   │   ├── LoadingSkeleton.jsx # Grid & Table Skeleton Loaders
│   │   │   ├── ErrorState.jsx      # Error alert with Retry button
│   │   │   ├── EmptyState.jsx      # Empty search results with Reset action
│   │   │   └── ProtectedRoute.jsx  # Auth guard wrapper
│   │   └── products/
│   │       ├── ProductCard.jsx     # Responsive Product Card
│   │       ├── ProductTable.jsx    # Responsive Data Table
│   │       ├── ProductFilters.jsx  # Debounced Search & Filter Toolbar
│   │       └── Pagination.jsx      # Pagination Bar
│   ├── hooks/
│   │   └── useDebounce.js          # Custom Debouncing Hook
│   ├── pages/
│   │   ├── LoginPage.jsx           # Login page with JSON credentials box
│   │   ├── ProductListPage.jsx     # Primary Dashboard Page
│   │   ├── ProductDetailPage.jsx   # Product Details Route
│   │   ├── AddProductPage.jsx      # Validated Form Route
│   │   └── NotFoundPage.jsx       # 404 Error Page
│   ├── services/
│   │   └── api.js                  # DummyJSON API Integration Service
│   ├── store/
│   │   └── useProductStore.js      # Central Zustand State Store
│   ├── layouts/
│   │   └── MainLayout.jsx          # Shared Page Layout Wrapper
│   ├── App.jsx                     # Router Setup & Lazy Loading
│   ├── index.js                    # Entry point with Theme Init
│   └── index.css                   # Tailwind Directives & Custom Styles
├── vercel.json                     # Vercel deployment configuration
├── package.json
└── tailwind.config.js
```

---

## ⚡ How to Run the Project Locally

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm start
   ```
   Open `http://localhost:3000` in your browser.

3. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 💡 Candidate Interview Cheat Sheet: How to Explain the Code

When presenting this project to interviewers, highlight these key architectural points:

1. **State Management (`useProductStore.js`)**:
   - *"I used Zustand for state management because it provides a predictable global store without the verbosity of Redux. It manages search terms, active categories, local user-added products, theme mode, and toast notifications."*

2. **Debounced Search (`useDebounce.js`)**:
   - *"To meet the performance requirements, I built a custom `useDebounce` hook that delays search execution by 400ms. This prevents triggering API calls on every keystroke."*

3. **Code Splitting & Lazy Loading (`App.jsx`)**:
   - *"I used `React.lazy()` and `Suspense` to code-split routes like `/products/:id` and `/products/add`. This optimizes initial page load speed by downloading code chunks only when the user navigates to those routes."*

4. **Form Validation & API Handling (`AddProductPage.jsx` & `api.js`)**:
   - *"The Add Product form performs client-side validation with inline error messages. Upon submission, it calls `POST /products/add` on the DummyJSON API and immediately updates the local Zustand store so the new product is visible without needing a page refresh."*

5. **JSON Credentials & Security (`LoginPage.jsx` & `ProtectedRoute.jsx`)**:
   - *"For convenience during evaluation, default admin credentials are displayed in JSON format on the Login page with a 1-click auto-fill button. Protected routes enforce authentication before rendering dashboard pages."*
