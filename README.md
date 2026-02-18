# 🛒 CogniCart - Full-Stack E-Commerce Platform

A modern, full-stack e-commerce application built with React (Frontend) and Spring Boot (Backend).

## 🏗️ Architecture Overview

**Frontend:**
- React 18 + TypeScript + Vite
- Tailwind CSS + Shadcn UI Components
- React Router v6 for navigation
- Zustand for state management
- Axios for API calls
- JWT authentication

**Backend:**
- Spring Boot 3.2.2
- Spring Security with JWT
- Spring Data JPA
- H2 Database (development) / PostgreSQL (production)
- RESTful API design

## 🚀 Quick Start

### Prerequisites
- Node.js & npm (v18+) - [Install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- Java 17+ - [Download JDK](https://adoptium.net/)
- Maven 3.6+ - [Download Maven](https://maven.apache.org/download.cgi)

### 1. Clone the Repository

```bash
git clone <YOUR_GIT_URL>
cd cogni-spark-shop
```

### 2. Start the Backend

```bash
# Navigate to backend directory
cd backend

# Run with Maven
mvn spring-boot:run

# Or use the provided batch file (Windows)
run.bat
```

Backend will be available at: **http://localhost:5454**

### 3. Start the Frontend

**Customer Application:**
```bash
# In project root
npm install
npm run dev
```
Customer app: **http://localhost:5173**

**Seller Application:**
```bash
npm run dev:seller
```
Seller app: **http://localhost:8081**

## 📁 Project Structure

```
cogni-spark-shop/
├── backend/                  # Spring Boot backend
│   ├── src/main/java/com/cognicart/
│   │   ├── controller/      # REST API controllers
│   │   ├── dto/             # Request/Response DTOs
│   │   ├── entity/          # JPA entities
│   │   ├── repository/      # Data access layer
│   │   ├── security/        # JWT & security config
│   │   ├── service/         # Business logic
│   │   └── exception/       # Error handling
│   └── src/main/resources/
│       └── application.yml  # Configuration
├── src/
│   ├── components/          # React components
│   ├── pages/              # Page components
│   ├── hooks/              # Custom hooks (useAuth)
│   ├── services/           # API services
│   ├── lib/                # Utilities (cart, products)
│   └── utils/              # Helper functions
└── public/                 # Static assets
```

## 🔑 Key Features

### Customer Features
- ✅ User authentication (Sign up, Sign in, JWT tokens)
- ✅ Product browsing with categories and filters
- ✅ Product search functionality
- ✅ Shopping cart management
- ✅ Wishlist management
- ✅ Order placement and tracking
- ✅ User profile management

### Seller Features
- ✅ Product management (Add, Edit, Delete)
- ✅ AI-powered catalog generation
- ✅ Dashboard analytics
- ✅ Order management

### Backend Features
- ✅ RESTful API endpoints
- ✅ JWT-based authentication
- ✅ Role-based access control (Customer, Seller, Admin)
- ✅ Category-specific product attributes
- ✅ Order management system
- ✅ Cart persistence
- ✅ Wishlist functionality

## 📖 Documentation

- **[INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md)** - Complete guide to connect frontend with backend
- **[TESTING_GUIDE.md](./TESTING_GUIDE.md)** - Comprehensive testing instructions
- **[backend/README.md](./backend/README.md)** - Backend API documentation

## 🔧 Configuration

### Frontend (.env)
```env
VITE_API_BASE=http://localhost:5454
```

### Backend (application.yml)
```yaml
server:
  port: 5454

spring:
  datasource:
    url: jdbc:h2:mem:cognicart
  
jwt:
  secret: your_secret_key_here
  expiration: 86400000  # 24 hours
```

## 🧪 Testing

Run the complete test suite:

```bash
# Frontend tests
npm run test

# Backend tests
cd backend
mvn test
```

For detailed testing instructions, see [TESTING_GUIDE.md](./TESTING_GUIDE.md)

## 📡 API Endpoints

### Authentication
- `POST /auth/signup` - Register new user
- `POST /auth/signin` - Login user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get product by ID
- `GET /api/products/category/{category}` - Filter by category
- `GET /api/products/search?keyword={keyword}` - Search products
- `POST /api/products` - Create product (Seller only)

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/{productId}` - Update cart item quantity
- `DELETE /api/cart/{productId}` - Remove item from cart

### Orders
- `GET /api/orders` - Get user's orders
- `POST /api/orders` - Create new order

### Wishlist
- `GET /api/wishlist` - Get user's wishlist
- `POST /api/wishlist/{productId}` - Add to wishlist
- `DELETE /api/wishlist/{productId}` - Remove from wishlist

For complete API documentation, see [backend/README.md](./backend/README.md)

## 🌐 Database Access

**H2 Console (Development):**
- URL: http://localhost:5454/h2-console
- JDBC URL: `jdbc:h2:mem:cognicart`
- Username: `sa`
- Password: (leave empty)

## 🚢 Deployment

### Frontend Deployment
- Build: `npm run build`
- Deploy to Vercel, Netlify, or any static hosting
- Set environment variable: `VITE_API_BASE=your_backend_url`

### Backend Deployment
- Update `application.yml` for production database (PostgreSQL)
- Change JWT secret to secure random key
- Deploy to Railway, Render, AWS, or any Java hosting
- Ensure CORS allows your frontend domain

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 💡 Tech Stack

**Frontend:**
- React 18.3.1, TypeScript, Vite
- Tailwind CSS, Shadcn UI
- React Router v6, Zustand, Axios, React Query

**Backend:**
- Spring Boot 3.2.2, Spring Security, Spring Data JPA
- JWT (io.jsonwebtoken), H2/PostgreSQL
- Maven, Lombok, ModelMapper

## 🎯 Project Status

- ✅ Backend Implementation Complete (Spring Boot)
- ✅ Frontend Implementation Complete (React)
- ✅ Authentication System (JWT)
- ✅ Product Management
- ✅ Cart & Wishlist Features
- ✅ Order Management
- ✅ Seller Dashboard
- ✅ AI Catalog Integration
- ✅ Frontend-Backend Integration Ready
- ✅ Documentation Complete

## 📞 Support

For issues and questions:
- Check [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md)
- Review [TESTING_GUIDE.md](./TESTING_GUIDE.md)
- See backend docs: [backend/README.md](./backend/README.md)

## 🔗 Important Links

- **Frontend:** http://localhost:5173
- **Seller Portal:** http://localhost:8081
- **Backend API:** http://localhost:5454
- **H2 Console:** http://localhost:5454/h2-console

---

**Built with ❤️ using React, Spring Boot, and AI-powered features**

- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
