# CogniCart Frontend-Backend Integration Guide

## 🔗 Connecting Frontend to Spring Boot Backend

This guide explains how to integrate the React frontend with the Spring Boot backend.

## ✅ Backend Setup Complete

Your Spring Boot backend is now ready with:
- ✅ All entities (User, Product, Cart, Order, Wishlist, CatalogEntry)
- ✅ JWT-based authentication
- ✅ RESTful API endpoints
- ✅ CORS configuration
- ✅ H2 database (development)
- ✅ Exception handling
- ✅ Server running on port 5454

## 🚀 Quick Start

### 1. Start the Backend

```bash
cd backend
mvn spring-boot:run
```

Or use the provided batch file:
```bash
cd backend
run.bat
```

Backend will be available at: `http://localhost:5454`

### 2. Start the Frontend

**Customer App:**
```bash
npm run dev
# Runs on http://localhost:5173
```

**Seller App:**
```bash
npm run dev:seller
# Runs on http://localhost:8081
```

## 📝 Frontend Configuration

### Environment Variable

The frontend is already configured to use `http://localhost:5454` as the API base URL in the `useAuth.tsx` hook:

```typescript
const API_BASE_URL = import.meta.env.VITE_API_BASE ?? 'http://localhost:5454';
```

You can optionally create a `.env` file in the frontend root:

```env
VITE_API_BASE=http://localhost:5454
```

## 🔧 What's Already Connected

The following frontend features are already configured to work with the backend:

### ✅ Authentication (`src/hooks/useAuth.tsx`)
- Sign up: `POST /auth/signup`
- Sign in: `POST /auth/signin`
- JWT token storage in localStorage
- Automatic token inclusion in requests

### ✅ Products
The products are currently using hardcoded data in `src/lib/products.ts`. You'll need to:

1. Create a new service file: `src/services/productApi.ts`
2. Fetch products from backend: `GET /api/products`
3. Update components to use the API

### 🔄 Integration Needed

Create `src/services/productApi.ts`:

```typescript
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE ?? 'http://localhost:5454';

const getAuthHeaders = () => {
  const token = localStorage.getItem('cognicart_jwt');
  return {
    Authorization: token ? `Bearer ${token}` : '',
  };
};

export const getAllProducts = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/products`);
  return response.data;
};

export const getProductById = async (id: string) => {
  const response = await axios.get(`${API_BASE_URL}/api/products/${id}`);
  return response.data;
};

export const searchProducts = async (keyword: string) => {
  const response = await axios.get(`${API_BASE_URL}/api/products/search`, {
    params: { keyword },
  });
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

// Orders API
export const getOrders = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/orders`, {
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
```

## 🔑 Authentication Flow

1. **User Signs Up/Signs In**
   - Frontend sends credentials to backend
   - Backend returns JWT token
   - Frontend stores token in localStorage as `cognicart_jwt`

2. **Protected API Calls**
   - Frontend includes token in Authorization header
   - Backend validates token
   - Returns requested data if valid

3. **Token Expiration**
   - Token expires after 24 hours
   - User needs to login again

## 📊 Data Transformation

The backend returns data in a slightly different format. Map as needed:

**Backend Product:**
```json
{
  "id": 1,
  "productId": "prod_123",
  "productTitle": "Product Name",
  "price": 999.00,
  ...
}
```

**Frontend Format (from products.ts):**
```typescript
{
  id: "1",
  name: "Product Name",
  price: 999,
  ...
}
```

Create a mapper function:
```typescript
const mapBackendProductToFrontend = (backendProduct: any) => ({
  id: backendProduct.productId,
  name: backendProduct.productTitle,
  price: backendProduct.price,
  rating: backendProduct.rating,
  reviews: backendProduct.reviewsCount,
  image: backendProduct.imageUrl,
  category: backendProduct.category,
  description: backendProduct.description,
  inStock: backendProduct.inStock,
  badge: backendProduct.badge,
});
```

## 🛒 Migrating Cart to Backend

The frontend currently uses Zustand for cart state. To use backend cart:

1. Remove Zustand cart store or keep for offline capability
2. Use API calls for cart operations
3. Sync with backend on user login
4. Handle cart merge if user had items before login

## 📱 Testing the Integration

### 1. Test Authentication
```bash
# Sign Up
curl -X POST http://localhost:5454/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123","firstName":"Test","lastName":"User"}'

# Sign In
curl -X POST http://localhost:5454/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

### 2. Test Product API
```bash
# Get all products
curl http://localhost:5454/api/products

# Search products
curl "http://localhost:5454/api/products/search?keyword=phone"
```

### 3. Test Protected Endpoints
```bash
# Get cart (replace TOKEN with your JWT)
curl http://localhost:5454/api/cart \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🐛 Troubleshooting

### CORS Issues
- Backend is configured to allow requests from:
  - `http://localhost:5173` (Frontend)
  - `http://localhost:8081` (Seller App)
  - `http://localhost:3000` (Alternative)

### Authentication Issues
- Check if JWT token is stored: `localStorage.getItem('cognicart_jwt')`
- Verify token format in Authorization header: `Bearer <token>`
- Check token expiration (24 hours)

### Database Issues
- H2 console: `http://localhost:5454/h2-console`
- JDBC URL: `jdbc:h2:mem:cognicart`
- No password required

## 📈 Next Steps

1. ✅ Backend is complete and running
2. 🔄 Create `productApi.ts` service
3. 🔄 Update components to use backend APIs
4. 🔄 Test all features end-to-end
5. 🔄 Handle loading states and errors
6. 🔄 Add toast notifications for API responses
7. 🔄 Implement retry logic for failed requests

## 🎯 Recommendations

### For Production:
1. Change JWT secret to strong random key
2. Use PostgreSQL instead of H2
3. Add API rate limiting
4. Implement refresh tokens
5. Add comprehensive error handling
6. Set up logging and monitoring
7. Enable HTTPS
8. Add API documentation (Swagger)

### For Development:
1. Use React Query for better API state management
2. Add loading spinners for API calls
3. Implement optimistic updates for better UX
4. Add offline support with service workers
5. Cache frequently accessed data

## 📞 Support

If you encounter any issues:
1. Check backend logs
2. Check browser console for errors
3. Verify network requests in DevTools
4. Check CORS headers
5. Validate JWT token

---

**Backend URL:** `http://localhost:5454`
**Frontend URL:** `http://localhost:5173`
**Seller App URL:** `http://localhost:8081`
**H2 Console:** `http://localhost:5454/h2-console`
