# Ke Geberew - Enhanced Agricultural Market Platform

## 📋 Table of Contents
- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [New Features](#new-features-)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Environment Configuration](#environment-configuration)
- [Default Credentials](#default-credentials)
- [Features by User Role](#features-by-user-role)
- [Multilingual Support](#multilingual-support)
- [API Endpoints](#api-endpoints)
- [Security Features](#security-features)
- [Development Notes](#development-notes)
- [Troubleshooting](#troubleshooting)
- [Browser Support](#browser-support)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)

## Overview
An advanced Ethiopian Agricultural Market platform connecting farmers, buyers, drivers, and administrators with multilingual support (English & Amharic), real-time database statistics, and comprehensive marketplace management.

## Technology Stack

### Frontend
- **Framework**: React
- **Internationalization**: react-i18next
- **Styling**: CSS3 (28.4% of codebase)
- **Language**: JavaScript (49% of codebase)

### Backend
- **Language**: PHP 7.4+ (22.2% of codebase)
- **Architecture**: RESTful API
- **Authentication**: Token-based with bcrypt password hashing

### Database
- **System**: MySQL 5.7+
- **Features**: Real-time statistics, relational data modeling

### Markup
- **HTML5** (0.4% of codebase)

## New Features ✨

### 1. **Multilingual Support (English + Amharic)**
- Full internationalization using react-i18next
- Language selector component in all pages
- Translations for all UI elements
- Automatic language detection
- Persistent language preference

### 2. **Database-Driven Real-Time Statistics**
- Dynamic statistics fetched from database
- Animated counter on scroll
- Real statistics for:
  - Total Users
  - Total Products
  - Total Orders
  - Total Deliveries

### 3. **Enhanced Authentication**
- Database-based authentication (no more demo credentials)
- Password hashing with bcrypt
- Role-based access control
- Separate admin registration prevention
- Secure token-based sessions

### 4. **Admin Dashboard Enhancements**
- Real-time user management
- Live activity tracking from database
- System management buttons (all functional)
- View and manage users
- Real statistics display

### 5. **UI/UX Improvements**
- Transparent background on hero section
- Cleaner, more modern design
- Multilingual chatbot support
- Responsive design improvements

## Quick Start

Get the application running in minutes:

```bash
# Clone the repository
git clone https://github.com/aprotovic/ke-geberew.git
cd ke-geberew

# Setup Database
mysql -u root -p
CREATE DATABASE ke_geberew;
exit
mysql -u root -p ke_geberew < database/schema.sql

# Setup Backend
cd backend
php -S localhost:8000

# Setup Frontend (in a new terminal)
cd frontend
npm install
npm start
```

Visit `http://localhost:3000` in your browser.

**Default Credentials:**
- Admin: `admin@kegeberew.com` / `password`
- Farmer: `farmer@kegeberew.com` / `password`
- Buyer: `buyer@kegeberew.com` / `password`

## Project Structure

```
ke_geberew/
├── backend/
│   ├── api/
│   │   ├── auth/          # Authentication endpoints
│   │   ├── products/      # Product management
│   │   ├── orders/        # Order management
│   │   ├── admin/         # Admin-specific APIs
│   │   └── stats/         # Statistics endpoints
│   ├── config/            # Database & CORS configuration
│   └── middleware/        # Authentication middleware
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/    # Reusable components
│       ├── contexts/      # React contexts
│       ├── i18n/          # Internationalization
│       │   ├── i18n.js
│       │   └── locales/
│       │       ├── en.json
│       │       └── am.json
│       ├── pages/         # Page components
│       ├── styles/        # CSS files
│       └── config/        # API configuration
└── database/
    └── schema.sql         # Database schema with sample data
```

## Installation & Setup

### Prerequisites
- PHP 7.4 or higher
- MySQL 5.7 or higher
- Node.js 14.x or higher
- npm or yarn

### Backend Setup

1. **Import Database**
   ```bash
   mysql -u root -p
   CREATE DATABASE ke_geberew;
   exit
   mysql -u root -p ke_geberew < database/schema.sql
   ```

2. **Configure Database Connection**
   - Edit `backend/config/database.php`
   - Update database credentials:
     ```php
     private $host = "localhost";
     private $db_name = "ke_geberew";
     private $username = "root";
     private $password = "your_password";
     ```

3. **Start PHP Server**
   ```bash
   cd backend
   php -S localhost:8000
   ```

### Frontend Setup

1. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Configure API Base URL**
   - Edit `frontend/src/config/api.js`
   - Update API URL:
     ```javascript
     const API_BASE_URL = 'http://localhost:8000/api';
     ```

3. **Start Development Server**
   ```bash
   npm start
   ```

4. **Access Application**
   - Open browser: `http://localhost:3000`

## Environment Configuration

For better security and flexibility, use environment variables instead of hardcoding credentials.

### Backend (.env file)
Create `backend/.env`:
```env
# Database Configuration
DB_HOST=localhost
DB_NAME=ke_geberew
DB_USER=root
DB_PASS=your_secure_password

# Server Configuration
SERVER_HOST=localhost
SERVER_PORT=8000

# API Configuration
API_URL=http://localhost:8000
API_VERSION=v1

# Security
ENABLE_CORS=true
CORS_ORIGIN=http://localhost:3000

# Session
SESSION_TIMEOUT=3600
```

### Frontend (.env file)
Create `frontend/.env`:
```env
# API Configuration
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_API_TIMEOUT=30000

# App Configuration
REACT_APP_NAME=Ke Geberew
REACT_APP_VERSION=1.0.0

# Feature Flags
REACT_APP_ENABLE_CHAT=true
REACT_APP_ENABLE_NOTIFICATIONS=true
```

### Development (.env.development)
Create `frontend/.env.development`:
```env
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_DEBUG=true
```

### Production (.env.production)
Create `frontend/.env.production`:
```env
REACT_APP_API_URL=https://api.kegeberew.com
REACT_APP_DEBUG=false
```

**Important:** Add `.env` files to `.gitignore` to prevent exposing sensitive information.

## Default Credentials

### Admin Account
- Email: `admin@kegeberew.com`
- Password: `password`
- Role: admin

### Sample User Accounts
- Farmer: `farmer@kegeberew.com` / `password`
- Buyer: `buyer@kegeberew.com` / `password`

⚠️ **Warning**: Change default credentials immediately in production!

## Features by User Role

### Farmer Dashboard
- Add and manage products
- View orders
- Track sales statistics
- Multilingual interface

### Buyer Dashboard
- Browse products
- Place orders
- Track order status
- View purchase history

### Admin Dashboard
- Real-time system statistics
- User management (view, edit users)
- Product oversight
- Order management
- Activity tracking
- System reports

### Driver Dashboard
- View assigned deliveries
- Update delivery status
- Track routes
- Manage availability

## Multilingual Support

### Switching Languages
1. Click the language selector in the navbar
2. Choose between English and አማርኛ (Amharic)
3. Language preference is saved automatically

### Adding New Languages
1. Create new locale file: `frontend/src/i18n/locales/[language_code].json`
2. Copy structure from `en.json`
3. Translate all keys
4. Update `i18n.js` to include new language

## API Endpoints

### Authentication
- `POST /api/auth/login.php` - User login
- `POST /api/auth/register.php` - User registration

### Statistics
- `GET /api/stats/get_stats.php` - Get system statistics

### Admin
- `GET /api/admin/get_recent_activities.php` - Get admin activities
- `GET /api/admin/get_users.php` - Get all users (admin only)

### Products
- `GET /api/products/get_all.php` - Get all products
- `POST /api/products/create.php` - Create product (farmer only)
- `PUT /api/products/update.php` - Update product
- `DELETE /api/products/delete.php` - Delete product

### Orders
- `POST /api/orders/create.php` - Create order (buyer only)
- `GET /api/orders/get_user_orders.php` - Get user orders
- `PUT /api/orders/update_status.php` - Update order status

## Security Features

### Current Implementation
- ✅ Password hashing using bcrypt
- ✅ Token-based authentication
- ✅ Role-based access control (RBAC)
- ✅ CORS configuration
- ✅ SQL injection prevention using prepared statements
- ✅ Admin registration restriction

### Production Deployment Checklist
- [ ] Switch database credentials to environment variables (.env)
- [ ] Enable HTTPS/SSL certificates
- [ ] Implement rate limiting on API endpoints
- [ ] Set up CSRF protection tokens
- [ ] Configure proper CORS origins (not localhost)
- [ ] Implement request validation and sanitization
- [ ] Add API request logging and monitoring
- [ ] Enable database query logging
- [ ] Implement backup and disaster recovery plan
- [ ] Set up security headers (Content-Security-Policy, X-Frame-Options, etc.)
- [ ] Implement 2FA for admin accounts
- [ ] Use environment variables for all sensitive data
- [ ] Rotate session tokens regularly
- [ ] Implement rate limiting and DDoS protection

## Development Notes

### Database Changes
- Passwords are hashed using PHP's `password_hash()`
- Default password for all sample accounts: `password`
- To add new admin: Insert directly into database with hashed password

### Adding New Features
1. Backend: Create new API endpoint in `backend/api/`
2. Frontend: Add translation keys to locale files
3. Update components to use `useTranslation()` hook
4. Test in both languages

### Styling Architecture
- **Global Styles**: Located in `frontend/src/styles/`
- **Component Styles**: Co-located with components or in dedicated style files
- **CSS Variables**: Defined in main stylesheet for consistent theming
- **Responsive Design**: Mobile-first approach with media queries

## Troubleshooting

### Database Connection Issues
- Verify MySQL is running
- Check database credentials in `backend/config/database.php`
- Ensure database exists and schema is imported
- Verify database user has proper permissions

### CORS Errors
- Verify backend server is running
- Check API base URL in `frontend/src/config/api.js`
- Ensure `backend/config/cors.php` is included in all API files
- Check browser console for exact CORS error message

### Language Not Changing
- Clear browser cache
- Check browser console for errors
- Verify locale files exist in `frontend/src/i18n/locales/`
- Ensure localStorage is enabled in browser

### Port Already in Use
```bash
# Kill process on port 8000 (backend)
lsof -ti:8000 | xargs kill -9

# Kill process on port 3000 (frontend)
lsof -ti:3000 | xargs kill -9
```

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

We welcome contributions! Here's how to get started:

1. **Fork the repository**
   ```bash
   git clone https://github.com/YOUR-USERNAME/ke-geberew.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
   - Follow existing code style
   - Add comments for complex logic
   - Update translations for new UI elements

4. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```

5. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open a Pull Request**
   - Provide clear description of changes
   - Reference related issues
   - Include testing details

### Coding Standards
- Follow PSR-12 for PHP code
- Follow Airbnb JavaScript style guide
- Use meaningful variable names
- Add comments for non-obvious logic
- Test in both English and Amharic

## License
© 2024 Ke Geberew. All rights reserved.

## Support
For issues and questions, contact: info@kegeberew.com

---

**Note**: This is an enhanced version with full multilingual support, database-driven statistics, and production-ready authentication. Always use HTTPS in production and implement proper security measures before deploying to production.
