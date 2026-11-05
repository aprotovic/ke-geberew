# Ke Geberew - Enhanced Agricultural Market Platform

## Overview
An advanced Ethiopian Agricultural Market platform connecting farmers, buyers, drivers, and administrators with multilingual support (English & Amharic), real-time database statistics, and comprehensive authentication system.

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

## Default Credentials

### Admin Account
- Email: `admin@kegeberew.com`
- Password: `password`
- Role: admin

### Sample User Accounts
- Farmer: `farmer@kegeberew.com` / `password`
- Buyer: `buyer@kegeberew.com` / `password`

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

- Password hashing using bcrypt
- Token-based authentication
- Role-based access control
- CORS configuration
- SQL injection prevention using prepared statements
- Admin registration restriction

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

## Troubleshooting

### Database Connection Issues
- Verify MySQL is running
- Check database credentials in `backend/config/database.php`
- Ensure database exists and schema is imported

### CORS Errors
- Verify backend server is running
- Check API base URL in `frontend/src/config/api.js`
- Ensure `backend/config/cors.php` is included in all API files

### Language Not Changing
- Clear browser cache
- Check browser console for errors
- Verify locale files exist in `frontend/src/i18n/locales/`

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License
© 2024 Ke Geberew. All rights reserved.

## Support
For issues and questions, contact: info@kegeberew.com

---

**Note**: This is an enhanced version with full multilingual support, database-driven statistics, and production-ready authentication. Always use HTTPS in production and implement proper security measures.
