/**
 * Utility functions for backend integration
 */

/**
 * Maps backend product data to frontend product format
 */
export const mapBackendProductToFrontend = (backendProduct: any) => {
  if (!backendProduct) return null;

  return {
    id: backendProduct.productId || backendProduct.id?.toString(),
    name: backendProduct.productTitle,
    price: backendProduct.price,
    rating: backendProduct.rating || 4.5,
    reviews: backendProduct.reviewsCount || 0,
    image: backendProduct.imageUrl,
    images: backendProduct.imageUrl ? [backendProduct.imageUrl] : [],
    category: backendProduct.category?.toLowerCase(),
    description: backendProduct.description || '',
    inStock: backendProduct.inStock !== false,
    badge: backendProduct.badge,
    brand: backendProduct.brand,
    color: backendProduct.color,
    material: backendProduct.material,
    // Category-specific attributes
    ...(backendProduct.electronics && {
      screenSize: backendProduct.electronics.screenSize,
      processor: backendProduct.electronics.processor,
      ram: backendProduct.electronics.ram,
      storage: backendProduct.electronics.storage,
    }),
    ...(backendProduct.fashion && {
      size: backendProduct.fashion.size,
      fit: backendProduct.fashion.fit,
      occasion: backendProduct.fashion.occasion,
    }),
    ...(backendProduct.books && {
      author: backendProduct.books.author,
      publisher: backendProduct.books.publisher,
      isbn: backendProduct.books.isbn,
      pages: backendProduct.books.pages,
      language: backendProduct.books.language,
    }),
    ...(backendProduct.homeKitchen && {
      dimensions: backendProduct.homeKitchen.dimensions,
      weight: backendProduct.homeKitchen.weight,
      warranty: backendProduct.homeKitchen.warranty,
    }),
    ...(backendProduct.sportsFitness && {
      activityType: backendProduct.sportsFitness.activityType,
      skillLevel: backendProduct.sportsFitness.skillLevel,
    }),
  };
};

/**
 * Maps frontend product data to backend format
 */
export const mapFrontendProductToBackend = (frontendProduct: any) => {
  if (!frontendProduct) return null;

  const baseProduct = {
    productId: frontendProduct.id,
    productTitle: frontendProduct.name,
    price: frontendProduct.price,
    category: frontendProduct.category?.toUpperCase(),
    brand: frontendProduct.brand,
    color: frontendProduct.color,
    material: frontendProduct.material,
    imageUrl: frontendProduct.image || frontendProduct.images?.[0],
    description: frontendProduct.description,
    inStock: frontendProduct.inStock !== false,
    badge: frontendProduct.badge,
    rating: frontendProduct.rating,
    reviewsCount: frontendProduct.reviews,
  };

  // Add category-specific attributes based on category
  const category = frontendProduct.category?.toLowerCase();

  if (category === 'electronics' && (frontendProduct.screenSize || frontendProduct.processor)) {
    return {
      ...baseProduct,
      electronics: {
        screenSize: frontendProduct.screenSize,
        processor: frontendProduct.processor,
        ram: frontendProduct.ram,
        storage: frontendProduct.storage,
        batteryLife: frontendProduct.batteryLife,
      },
    };
  }

  if (category === 'fashion' && (frontendProduct.size || frontendProduct.fit)) {
    return {
      ...baseProduct,
      fashion: {
        size: frontendProduct.size,
        fit: frontendProduct.fit,
        occasion: frontendProduct.occasion,
        fabricType: frontendProduct.fabricType,
      },
    };
  }

  if (category === 'books' && frontendProduct.author) {
    return {
      ...baseProduct,
      books: {
        author: frontendProduct.author,
        publisher: frontendProduct.publisher,
        isbn: frontendProduct.isbn,
        pages: frontendProduct.pages,
        language: frontendProduct.language,
        publicationDate: frontendProduct.publicationDate,
      },
    };
  }

  if (category === 'home' && frontendProduct.dimensions) {
    return {
      ...baseProduct,
      homeKitchen: {
        dimensions: frontendProduct.dimensions,
        weight: frontendProduct.weight,
        warranty: frontendProduct.warranty,
        careInstructions: frontendProduct.careInstructions,
      },
    };
  }

  if (category === 'sports' && frontendProduct.activityType) {
    return {
      ...baseProduct,
      sportsFitness: {
        activityType: frontendProduct.activityType,
        skillLevel: frontendProduct.skillLevel,
        ageGroup: frontendProduct.ageGroup,
      },
    };
  }

  return baseProduct;
};

/**
 * Maps backend cart data to frontend format
 */
export const mapBackendCartToFrontend = (backendCart: any) => {
  if (!backendCart) return null;

  return {
    id: backendCart.id,
    items: backendCart.items?.map((item: any) => ({
      id: item.id,
      product: mapBackendProductToFrontend(item.product),
      quantity: item.quantity,
    })) || [],
    totalPrice: backendCart.totalPrice,
    totalItems: backendCart.totalItems,
  };
};

/**
 * Maps backend order data to frontend format
 */
export const mapBackendOrderToFrontend = (backendOrder: any) => {
  if (!backendOrder) return null;

  return {
    id: backendOrder.id,
    orderNumber: backendOrder.orderNumber,
    items: backendOrder.orderItems?.map((item: any) => ({
      id: item.id,
      product: mapBackendProductToFrontend(item.product),
      quantity: item.quantity,
      price: item.price,
      subtotal: item.subtotal,
    })) || [],
    totalAmount: backendOrder.totalAmount,
    deliveryFee: backendOrder.deliveryFee,
    status: backendOrder.status,
    paymentMethod: backendOrder.paymentMethod,
    paymentStatus: backendOrder.paymentStatus,
    shippingAddress: backendOrder.shippingAddress,
    createdAt: backendOrder.createdAt,
  };
};

/**
 * Format currency
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Format date
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

/**
 * Handle API errors
 */
export const handleApiError = (error: any): string => {
  if (error.response) {
    // Server responded with error
    const message = error.response.data?.message || error.response.data?.error;
    return message || `Error: ${error.response.status}`;
  } else if (error.request) {
    // Request made but no response
    return 'Unable to connect to server. Please check your connection.';
  } else {
    // Error in request setup
    return error.message || 'An unexpected error occurred.';
  }
};

/**
 * Validate JWT token expiration
 */
export const isTokenExpired = (token: string): boolean => {
  if (!token) return true;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expirationTime = payload.exp * 1000; // Convert to milliseconds
    return Date.now() >= expirationTime;
  } catch (error) {
    return true;
  }
};

/**
 * Get token from localStorage
 */
export const getAuthToken = (): string | null => {
  return localStorage.getItem('cognicart_jwt');
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  const token = getAuthToken();
  if (!token) return false;
  return !isTokenExpired(token);
};
