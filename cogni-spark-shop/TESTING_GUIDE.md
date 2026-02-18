# 🧪 Testing the CogniCart Integration

This guide helps you test the complete integration between the React frontend and Spring Boot backend.

## Prerequisites

- ✅ Backend running on `http://localhost:5454`
- ✅ Frontend running on `http://localhost:5173` (customer) or `http://localhost:8081` (seller)
- ✅ H2 Database accessible at `http://localhost:5454/h2-console`

## 📝 Test Checklist

### 1. Backend Health Check

**Test:** Verify backend is running
```bash
curl http://localhost:5454/actuator/health
# Expected: Backend responds (even if endpoint doesn't exist, you'll get a response)

# Better test - try to hit the H2 console
# Open in browser: http://localhost:5454/h2-console
```

**Expected Result:** Backend responds, H2 console page loads

---

### 2. Authentication Flow

#### Test 2.1: User Sign Up

**Frontend Test:**
1. Navigate to `http://localhost:5173/signup`
2. Fill in:
   - Email: `test@cognicart.com`
   - Password: `Test@123`
   - Full Name: `Test User`
3. Click "Sign Up"

**Expected Result:**
- ✅ User account created
- ✅ JWT token stored in localStorage (`cognicart_jwt`)
- ✅ Redirected to home page or dashboard
- ✅ User information displayed in navbar

**Backend Test (curl):**
```bash
curl -X POST http://localhost:5454/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@cognicart.com",
    "password": "Test@123",
    "firstName": "Test",
    "lastName": "User"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "email": "test@cognicart.com",
    "role": "CUSTOMER"
  }
}
```

#### Test 2.2: User Sign In

**Frontend Test:**
1. Navigate to `http://localhost:5173/login`
2. Fill in:
   - Email: `test@cognicart.com`
   - Password: `Test@123`
3. Click "Sign In"

**Expected Result:**
- ✅ User authenticated
- ✅ JWT token stored in localStorage
- ✅ Redirected to home page

**Backend Test (curl):**
```bash
curl -X POST http://localhost:5454/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@cognicart.com",
    "password": "Test@123"
  }'
```

#### Test 2.3: Token Validation

**Check Token in Browser Console:**
```javascript
// Open browser console (F12)
const token = localStorage.getItem('cognicart_jwt');
console.log('Token:', token);

// Decode token (for viewing only - not for validation)
const payload = JSON.parse(atob(token.split('.')[1]));
console.log('Token Payload:', payload);
```

**Expected Payload:**
```json
{
  "sub": "test@cognicart.com",
  "email": "test@cognicart.com",
  "role": "CUSTOMER",
  "iat": 1234567890,
  "exp": 1234654290
}
```

---

### 3. Product Management

#### Test 3.1: View All Products

**Frontend Test:**
1. Navigate to `http://localhost:5173/products`
2. Products should load from backend

**Backend Test:**
```bash
curl http://localhost:5454/api/products
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Products retrieved successfully",
  "data": [
    {
      "id": 1,
      "productId": "prod_123",
      "productTitle": "Sample Product",
      "price": 999.00,
      "category": "ELECTRONICS",
      "imageUrl": "https://...",
      "inStock": true
    }
  ]
}
```

#### Test 3.2: Search Products

**Frontend Test:**
1. Go to Products page
2. Use search bar to search for "phone"

**Backend Test:**
```bash
curl "http://localhost:5454/api/products/search?keyword=phone"
```

#### Test 3.3: Filter by Category

**Frontend Test:**
1. Go to Products page
2. Select a category filter (e.g., "Electronics")

**Backend Test:**
```bash
curl http://localhost:5454/api/products/category/ELECTRONICS
```

#### Test 3.4: Add Product (Seller)

**Frontend Test:**
1. Navigate to `http://localhost:8081/add-product`
2. Log in with seller credentials
3. Fill product form
4. Submit product

**Backend Test:**
```bash
# First, get your JWT token from localStorage or login response
TOKEN="your_jwt_token_here"

curl -X POST http://localhost:5454/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "productId": "prod_test_001",
    "productTitle": "Test Product",
    "category": "ELECTRONICS",
    "brand": "TestBrand",
    "price": 1999.00,
    "description": "A test product",
    "imageUrl": "https://via.placeholder.com/400",
    "inStock": true
  }'
```

---

### 4. Cart Operations

#### Test 4.1: Get Cart

**Frontend Test:**
1. Log in
2. Navigate to `/cart`
3. Cart should load from backend

**Backend Test:**
```bash
TOKEN="your_jwt_token_here"

curl http://localhost:5454/api/cart \
  -H "Authorization: Bearer $TOKEN"
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Cart retrieved successfully",
  "data": {
    "id": 1,
    "items": [],
    "totalPrice": 0.0,
    "totalItems": 0
  }
}
```

#### Test 4.2: Add Item to Cart

**Frontend Test:**
1. Browse products
2. Click "Add to Cart" on a product
3. Check cart count in navbar

**Backend Test:**
```bash
TOKEN="your_jwt_token_here"

curl -X POST http://localhost:5454/api/cart \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "productId": 1,
    "quantity": 2
  }'
```

#### Test 4.3: Update Cart Item Quantity

**Frontend Test:**
1. Go to cart
2. Change quantity using +/- buttons
3. Total should update

**Backend Test:**
```bash
TOKEN="your_jwt_token_here"

curl -X PUT http://localhost:5454/api/cart/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "quantity": 3
  }'
```

#### Test 4.4: Remove Item from Cart

**Frontend Test:**
1. Go to cart
2. Click remove/delete icon on an item

**Backend Test:**
```bash
TOKEN="your_jwt_token_here"

curl -X DELETE http://localhost:5454/api/cart/1 \
  -H "Authorization: Bearer $TOKEN"
```

---

### 5. Wishlist Operations

#### Test 5.1: Add to Wishlist

**Frontend Test:**
1. Browse products
2. Click heart/wishlist icon on a product
3. Icon should change state

**Backend Test:**
```bash
TOKEN="your_jwt_token_here"

curl -X POST http://localhost:5454/api/wishlist/1 \
  -H "Authorization: Bearer $TOKEN"
```

#### Test 5.2: View Wishlist

**Frontend Test:**
1. Navigate to `/wishlist`
2. Should see all wishlisted products

**Backend Test:**
```bash
TOKEN="your_jwt_token_here"

curl http://localhost:5454/api/wishlist \
  -H "Authorization: Bearer $TOKEN"
```

#### Test 5.3: Remove from Wishlist

**Frontend Test:**
1. Go to wishlist page
2. Click remove icon

**Backend Test:**
```bash
TOKEN="your_jwt_token_here"

curl -X DELETE http://localhost:5454/api/wishlist/1 \
  -H "Authorization: Bearer $TOKEN"
```

---

### 6. Order Management

#### Test 6.1: Create Order (Checkout)

**Frontend Test:**
1. Add items to cart
2. Go to `/cart`
3. Click "Proceed to Checkout"
4. Fill shipping information
5. Select payment method
6. Place order

**Backend Test:**
```bash
TOKEN="your_jwt_token_here"

curl -X POST http://localhost:5454/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "shippingAddress": {
      "fullName": "Test User",
      "phone": "9876543210",
      "addressLine1": "123 Test Street",
      "city": "Mumbai",
      "state": "Maharashtra",
      "pinCode": "400001"
    },
    "paymentMethod": "CARD"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Order created successfully",
  "data": {
    "id": 1,
    "orderNumber": "ORD-XXXXXXXX",
    "status": "PENDING",
    "totalAmount": 1998.00,
    "deliveryFee": 50.00,
    "orderItems": [...]
  }
}
```

#### Test 6.2: View Orders

**Frontend Test:**
1. Navigate to `/orders`
2. Should see list of all orders

**Backend Test:**
```bash
TOKEN="your_jwt_token_here"

curl http://localhost:5454/api/orders \
  -H "Authorization: Bearer $TOKEN"
```

---

### 7. Integration Testing Scenarios

#### Scenario 1: Complete Purchase Flow
1. ✅ Sign up new user
2. ✅ Browse products
3. ✅ Add 3 products to cart
4. ✅ Update quantity of 1 product
5. ✅ Remove 1 product
6. ✅ Add 1 product to wishlist
7. ✅ Proceed to checkout
8. ✅ Fill shipping details
9. ✅ Place order
10. ✅ View order confirmation
11. ✅ Check orders page

#### Scenario 2: Seller Product Management
1. ✅ Sign up as seller (or create seller account)
2. ✅ Navigate to seller dashboard
3. ✅ Add new product with AI catalog
4. ✅ View product in product list
5. ✅ Edit product details
6. ✅ Delete product

---

## 🔍 Debugging Tips

### Check Backend Logs
Look for errors in the Spring Boot console where you ran `mvn spring-boot:run`

### Check H2 Database
1. Open `http://localhost:5454/h2-console`
2. Use connection details:
   - JDBC URL: `jdbc:h2:mem:cognicart`
   - Username: `sa`
   - Password: (leave empty)
3. Query tables:
   ```sql
   SELECT * FROM USERS;
   SELECT * FROM PRODUCTS;
   SELECT * FROM CART;
   SELECT * FROM CART_ITEMS;
   SELECT * FROM ORDERS;
   SELECT * FROM WISHLIST;
   ```

### Check Browser Network Tab
1. Open DevTools (F12)
2. Go to Network tab
3. Look for:
   - Request headers (Authorization: Bearer token)
   - Request payload
   - Response status
   - Response data

### Check localStorage
```javascript
// In browser console
console.log('JWT Token:', localStorage.getItem('cognicart_jwt'));
console.log('All Storage:', localStorage);
```

---

## ❌ Common Issues & Solutions

### Issue 1: CORS Error
**Error:** `Access to XMLHttpRequest... has been blocked by CORS policy`

**Solution:**
- Verify backend CORS configuration includes your frontend URL
- Check `SecurityConfig.java` for correct allowed origins
- Restart backend after changes

### Issue 2: 401 Unauthorized
**Error:** `401 Unauthorized` on API calls

**Solution:**
- Check if JWT token is present: `localStorage.getItem('cognicart_jwt')`
- Verify token is not expired (24-hour expiry)
- Check Authorization header format: `Bearer <token>`
- Try logging in again

### Issue 3: 404 Not Found
**Error:** `404 Not Found` on API endpoints

**Solution:**
- Verify backend is running on port 5454
- Check API endpoint path matches controller mappings
- Look for typos in URL

### Issue 4: Empty Products List
**Error:** Products page is empty

**Solution:**
- Check if products exist in database (H2 console)
- Verify API call is successful (Network tab)
- Check data mapping in frontend (console logs)
- Add sample products via API or seller dashboard

### Issue 5: Cart Not Syncing
**Error:** Cart items not persisting

**Solution:**
- Ensure user is logged in
- Check backend cart API responses
- Verify frontend is calling backend APIs (not using Zustand only)
- Clear cart and try again

---

## 📊 Expected Database State After Tests

After running all tests, your H2 database should have:

**USERS Table:**
- At least 1 customer user
- At least 1 seller user (if tested)

**PRODUCTS Table:**
- Multiple products (added by seller or via API)

**CART & CART_ITEMS Tables:**
- 1 cart per user
- Cart items for current session

**ORDERS & ORDER_ITEMS Tables:**
- Order records with order numbers
- Order items linked to orders

**WISHLIST Table:**
- Wishlist entries for products

---

## ✅ Success Criteria

Your integration is successful if:

1. ✅ Users can sign up and sign in
2. ✅ JWT tokens are generated and stored
3. ✅ Products load from backend
4. ✅ Cart operations work (add, update, remove)
5. ✅ Wishlist operations work
6. ✅ Orders can be created
7. ✅ All API calls include proper authentication
8. ✅ Error messages are displayed properly
9. ✅ Data persists across page refreshes
10. ✅ No console errors

---

## 📞 Need Help?

If tests fail:
1. Check backend logs for errors
2. Check browser console for errors
3. Verify network requests in DevTools
4. Check H2 database state
5. Review INTEGRATION_GUIDE.md for setup steps

**Happy Testing! 🚀**
