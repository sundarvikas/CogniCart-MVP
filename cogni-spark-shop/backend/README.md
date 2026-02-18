# CogniCart Backend API

Spring Boot backend for CogniCart E-commerce Platform with JWT authentication, product management, cart, orders, and wishlist functionality.

## 🚀 Technologies Used

- **Spring Boot 3.2.2** - Core framework
- **Spring Security** - JWT-based authentication
- **Spring Data JPA** - Data persistence
- **H2 Database** - In-memory database (development)
- **PostgreSQL** - Production database support
- **Lombok** - Reduce boilerplate code
- **ModelMapper** - Object mapping
- **Maven** - Dependency management

## 📋 Features

- ✅ User Authentication (JWT)
- ✅ Product Management (CRUD)
- ✅ Shopping Cart
- ✅ Order Management
- ✅ Wishlist
- ✅ Seller Product Submission
- ✅ AI Catalog Integration (Engine2)
- ✅ Category-based Product Browsing
- ✅ Product Search
- ✅ CORS Configuration

## 🏗️ Project Structure

```
backend/
├── src/main/java/com/cognicart/
│   ├── CogniCartApplication.java      # Main application
│   ├── config/
│   │   └── SecurityConfig.java        # Security configuration
│   ├── controller/                    # REST Controllers
│   │   ├── AuthController.java
│   │   ├── ProductController.java
│   │   ├── CartController.java
│   │   ├── OrderController.java
│   │   ├── WishlistController.java
│   │   └── SellerController.java
│   ├── dto/                          # Data Transfer Objects
│   │   ├── request/
│   │   └── response/
│   ├── entity/                       # JPA Entities
│   │   ├── User.java
│   │   ├── Product.java
│   │   ├── Cart.java
│   │   ├── Order.java
│   │   ├── Wishlist.java
│   │   └── CatalogEntry.java
│   ├── enums/                        # Enumerations
│   │   ├── UserRole.java
│   │   ├── ProductCategory.java
│   │   └── OrderStatus.java
│   ├── exception/                    # Exception handlers
│   │   └── GlobalExceptionHandler.java
│   ├── repository/                   # JPA Repositories
│   ├── security/                     # Security components
│   │   ├── JwtTokenProvider.java
│   │   ├── JwtAuthenticationFilter.java
│   │   └── CustomUserDetailsService.java
│   └── service/                      # Business logic
│       ├── AuthService.java
│       ├── ProductService.java
│       ├── CartService.java
│       ├── OrderService.java
│       ├── WishlistService.java
│       └── CatalogService.java
└── src/main/resources/
    └── application.yml               # Configuration
```

## 🔧 Configuration

### Database Configuration

**Development (H2):**
```yaml
spring:
  datasource:
    url: jdbc:h2:mem:cognicart
    driver-class-name: org.h2.Driver
  h2:
    console:
      enabled: true
      path: /h2-console
```

**Production (PostgreSQL):**
```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/cognicart
    driver-class-name: org.postgresql.Driver
    username: your_username
    password: your_password
```

### JWT Configuration

Configure JWT secret and expiration in `application.yml`:
```yaml
jwt:
  secret: your-secret-key-change-this-in-production
  expiration: 86400000  # 24 hours
```

## 🚦 API Endpoints

### Authentication
- `POST /auth/signup` - Register new user
- `POST /auth/signin` - Login user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get product by ID
- `GET /api/products/category/{category}` - Get products by category
- `GET /api/products/search?keyword={keyword}` - Search products
- `POST /api/products` - Create product (requires authentication)
- `PUT /api/products/{id}` - Update product
- `DELETE /api/products/{id}` - Delete product

### Cart
- `GET /api/cart` - Get user cart (requires authentication)
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/{productId}` - Update cart item quantity
- `DELETE /api/cart/{productId}` - Remove item from cart
- `DELETE /api/cart` - Clear cart

### Orders
- `GET /api/orders` - Get user orders (requires authentication)
- `GET /api/orders/{orderId}` - Get order details
- `POST /api/orders` - Create order

### Wishlist
- `GET /api/wishlist` - Get user wishlist (requires authentication)
- `POST /api/wishlist/{productId}` - Add to wishlist
- `DELETE /api/wishlist/{productId}` - Remove from wishlist
- `GET /api/wishlist/check/{productId}` - Check if in wishlist

### Seller/Catalog
- `POST /api/engine2/catalog` - Submit product to Engine2 catalog

## 🏃‍♂️ Running the Application

### Prerequisites
- Java 17 or higher
- Maven 3.6+

### Steps

1. **Build the project:**
```bash
cd backend
mvn clean install
```

2. **Run the application:**
```bash
mvn spring-boot:run
```

The server will start on `http://localhost:5454`

### Access H2 Console (Development)
- URL: `http://localhost:5454/h2-console`
- JDBC URL: `jdbc:h2:mem:cognicart`
- Username: `sa`
- Password: (leave empty)

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication.

**Request Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Example Flow:**
1. Sign up: `POST /auth/signup`
2. Sign in: `POST /auth/signin` → Receive JWT token
3. Use token in Authorization header for protected routes

## 📝 Sample Requests

### Sign Up
```json
POST /auth/signup
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

### Add to Cart
```json
POST /api/cart
Authorization: Bearer <token>
{
  "productId": 1,
  "quantity": 2
}
```

### Create Order
```json
POST /api/orders
Authorization: Bearer <token>
{
  "shippingFirstName": "John",
  "shippingLastName": "Doe",
  "shippingAddress": "123 Main St",
  "shippingCity": "Mumbai",
  "shippingPincode": "400001",
  "shippingPhone": "+91 9876543210",
  "paymentMethod": "card"
}
```

## 🔒 Security Features

- Password encryption using BCrypt
- JWT-based stateless authentication
- Role-based access control (CUSTOMER, SELLER, ADMIN)
- CORS configuration for frontend integration
- Protected endpoints require authentication
- Secure session management

## 🐛 Error Handling

The API returns standardized error responses:
```json
{
  "success": false,
  "message": "Error description",
  "data": null
}
```

## 📦 Deployment

### Production Checklist
1. Change JWT secret to a strong random key
2. Configure PostgreSQL database
3. Update CORS allowed origins
4. Set appropriate logging levels
5. Configure environment-specific properties
6. Enable HTTPS
7. Set up production database migrations

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email support@cognicart.com or open an issue in the repository.
