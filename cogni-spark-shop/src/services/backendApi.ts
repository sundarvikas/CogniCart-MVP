import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE ?? 'http://localhost:5454';

const getAuthHeaders = () => {
  const token = localStorage.getItem('cognicart_jwt');
  return {
    Authorization: token ? `Bearer ${token}` : '',
  };
};

// Products API
export const getAllProducts = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/products`);
  return response.data;
};

export const getProductById = async (id: string) => {
  const response = await axios.get(`${API_BASE_URL}/api/products/${id}`);
  return response.data;
};

export const getProductsByCategory = async (category: string) => {
  const response = await axios.get(`${API_BASE_URL}/api/products/category/${category}`);
  return response.data;
};

export const searchProducts = async (keyword: string) => {
  const response = await axios.get(`${API_BASE_URL}/api/products/search`, {
    params: { keyword },
  });
  return response.data;
};

export const createProduct = async (productData: any) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/products`,
    productData,
    { headers: getAuthHeaders() }
  );
  return response.data;
};

// Cart API
export const getCart = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/cart`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const addToCart = async (productId: number, quantity: number = 1) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/cart`,
    { productId, quantity },
    { headers: getAuthHeaders() }
  );
  return response.data;
};

export const updateCartItem = async (productId: number, quantity: number) => {
  const response = await axios.put(
    `${API_BASE_URL}/api/cart/${productId}`,
    { quantity },
    { headers: getAuthHeaders() }
  );
  return response.data;
};

export const removeFromCart = async (productId: number) => {
  const response = await axios.delete(`${API_BASE_URL}/api/cart/${productId}`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const clearCart = async () => {
  const response = await axios.delete(`${API_BASE_URL}/api/cart`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

// Wishlist API
export const getWishlist = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/wishlist`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const addToWishlist = async (productId: number) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/wishlist/${productId}`,
    {},
    { headers: getAuthHeaders() }
  );
  return response.data;
};

export const removeFromWishlist = async (productId: number) => {
  const response = await axios.delete(
    `${API_BASE_URL}/api/wishlist/${productId}`,
    { headers: getAuthHeaders() }
  );
  return response.data;
};

export const isInWishlist = async (productId: number) => {
  const response = await axios.get(
    `${API_BASE_URL}/api/wishlist/check/${productId}`,
    { headers: getAuthHeaders() }
  );
  return response.data;
};

// Orders API
export const getOrders = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/orders`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const getOrderById = async (orderId: number) => {
  const response = await axios.get(`${API_BASE_URL}/api/orders/${orderId}`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const createOrder = async (orderData: any) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/orders`,
    orderData,
    { headers: getAuthHeaders() }
  );
  return response.data;
};

// Catalog API (for seller)
export const submitToEngine2Catalog = async (catalogData: any) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/engine2/catalog`,
    catalogData,
    { headers: getAuthHeaders() }
  );
  return response.data;
};
