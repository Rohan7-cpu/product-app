const BASE_URL = 'https://dummyjson.com/products';

/**
 * Service module responsible for communicating with the DummyJSON API.
 */
export const api = {
  /**
   * Fetch products supporting search, category filter, sorting, and pagination.
   */
  async getProducts(params = {}) {
    const { search = '', category = '', page = 1, limit = 12 } = params;
    const skip = (page - 1) * limit;

    let url = `${BASE_URL}?limit=${limit}&skip=${skip}`;

    if (search.trim()) {
      url = `${BASE_URL}/search?q=${encodeURIComponent(search.trim())}&limit=${limit}&skip=${skip}`;
    } else if (category && category !== 'all') {
      url = `${BASE_URL}/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to load products from server (Status ${response.status})`);
    }

    const data = await response.json();
    return data;
  },

  /**
   * Fetch category list for the dropdown filter.
   */
  async getCategories() {
    try {
      const response = await fetch(`${BASE_URL}/categories`);
      if (!response.ok) throw new Error('Failed to fetch categories');
      
      const data = await response.json();
      
      if (Array.isArray(data)) {
        return data.map((cat) => {
          if (typeof cat === 'string') {
            return {
              slug: cat,
              name: cat.charAt(0).toUpperCase() + cat.slice(1).replace(/-/g, ' ')
            };
          }
          return {
            slug: cat.slug || cat.name,
            name: cat.name || cat.slug
          };
        });
      }
      return [];
    } catch (error) {
      console.warn('Error fetching categories from API, using fallback categories:', error);
      return [
        { slug: 'beauty', name: 'Beauty' },
        { slug: 'fragrances', name: 'Fragrances' },
        { slug: 'furniture', name: 'Furniture' },
        { slug: 'groceries', name: 'Groceries' },
        { slug: 'home-decoration', name: 'Home Decoration' },
        { slug: 'kitchen-accessories', name: 'Kitchen Accessories' },
        { slug: 'laptops', name: 'Laptops' },
        { slug: 'mens-shirts', name: 'Mens Shirts' },
        { slug: 'mens-shoes', name: 'Mens Shoes' },
        { slug: 'mens-watches', name: 'Mens Watches' },
        { slug: 'mobile-accessories', name: 'Mobile Accessories' },
        { slug: 'motorcycle', name: 'Motorcycle' },
        { slug: 'skin-care', name: 'Skin Care' },
        { slug: 'smartphones', name: 'Smartphones' },
        { slug: 'sports-accessories', name: 'Sports Accessories' },
        { slug: 'sunglasses', name: 'Sunglasses' },
        { slug: 'tops', name: 'Tops' },
        { slug: 'womens-bags', name: 'Womens Bags' },
        { slug: 'womens-dresses', name: 'Womens Dresses' },
        { slug: 'womens-jewellery', name: 'Womens Jewellery' },
        { slug: 'womens-shoes', name: 'Womens Shoes' },
        { slug: 'womens-watches', name: 'Womens Watches' }
      ];
    }
  },

  /**
   * Fetch details of a single product by ID.
   */
  async getProductById(id) {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Product not found.');
      }
      throw new Error(`Failed to load product details (Status ${response.status})`);
    }
    return await response.json();
  },

  /**
   * Submit new product to DummyJSON API.
   */
  async createProduct(formData) {
    const payload = {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      price: Number(formData.price),
      stock: Number(formData.stock),
      brand: formData.brand,
      thumbnail: formData.thumbnail || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=80',
      images: [formData.thumbnail || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=80'],
      rating: 4.5
    };

    const response = await fetch(`${BASE_URL}/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Failed to create new product. Please check form values.');
    }

    const createdProduct = await response.json();
    return {
      ...createdProduct,
      isLocal: true
    };
  }
};
