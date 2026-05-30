# Ke Geberew - Complete Setup Guide

## Quick Start Guide

This guide will help you set up the Ke Geberew platform from scratch.

## Step 1: System Requirements

Before you begin, ensure you have the following installed:

### Required Software
- **XAMPP** (includes Apache, MySQL, PHP) - Download from: https://www.apachefriends.org/
  - OR **WAMP** - Download from: http://www.wampserver.com/
  - OR **MAMP** (for Mac) - Download from: https://www.mamp.info/
- **Node.js** (v14 or higher) - Download from: https://nodejs.org/
- **Git** (optional) - Download from: https://git-scm.com/

## Step 2: Extract Project Files

1. Extract the `ke_geberew_enhanced.zip` file
2. You should see three main folders:
   - `backend/`
   - `frontend/`
   - `database/`

## Step 3: Database Setup

### Option A: Using phpMyAdmin (Recommended for beginners)

1. Start XAMPP/WAMP and start Apache & MySQL
2. Open browser and go to: `http://localhost/phpmyadmin`
3. Click on "New" in the left sidebar
4. Create database named: `ke_geberew`
5. Click on the database name
6. Click on "Import" tab
7. Click "Choose File" and select `database/schema.sql`
8. Click "Go" button at the bottom
9. Wait for success message

### Option B: Using Command Line

```bash
# Windows (CMD or PowerShell)
cd C:\xampp\mysql\bin
mysql -u root -p
# Press Enter when asked for password (default is no password)

# Mac/Linux
mysql -u root -p

# Then run these commands:
CREATE DATABASE ke_geberew;
USE ke_geberew;
SOURCE /path/to/database/schema.sql;
exit;
```

## Step 4: Backend Setup

### 1. Move Backend Files

#### For XAMPP (Windows/Linux):
```bash
# Copy backend folder to xampp htdocs
cp -r backend/ C:\xampp\htdocs\ke_geberew_api\

# OR manually:
# Copy the 'backend' folder to C:\xampp\htdocs\
# Rename it to 'ke_geberew_api'
```

#### For MAMP (Mac):
```bash
cp -r backend/ /Applications/MAMP/htdocs/ke_geberew_api/
```

### 2. Configure Database Connection

Open `C:\xampp\htdocs\ke_geberew_api\config\database.php` and verify:

```php
private $host = "localhost";
private $db_name = "ke_geberew";
private $username = "root";
private $password = ""; // Leave empty for XAMPP default
```

If you set a MySQL password, update the `$password` value.

### 3. Test Backend

1. Start Apache and MySQL in XAMPP Control Panel
2. Open browser: `http://localhost/ke_geberew_api/api/stats/get_stats.php`
3. You should see JSON response like:
   ```json
   {
     "totalUsers": 2,
     "totalProducts": 0,
     "totalOrders": 0,
     "totalDeliveries": 0,
     "pendingOrders": 0
   }
   ```

## Step 5: Frontend Setup

### 1. Navigate to Frontend Folder

```bash
# Open terminal/command prompt
cd path/to/frontend

# Example:
cd C:\Users\YourName\Desktop\ke_geberew_enhanced\frontend
```

### 2. Install Dependencies

```bash
npm install
```

This will take 2-5 minutes depending on your internet speed.

### 3. Configure API URL

Open `frontend/src/config/api.js` and verify:

```javascript
const API_BASE_URL = 'http://localhost/ke_geberew_api/api';
export default API_BASE_URL;
```

### 4. Start Development Server

```bash
npm start
```

The application will automatically open in your browser at: `http://localhost:3000`

## Step 6: Test the Application

### 1. Test Home Page
- You should see the homepage with statistics
- Try switching language between English and አማርኛ (Amharic)
- Statistics should show real numbers from database

### 2. Test Login

#### Admin Login:
- Email: `admin@kegeberew.com`
- Password: `password`
- Role: Admin

#### Farmer Login:
- Email: `farmer@kegeberew.com`
- Password: `password`
- Role: Farmer

#### Buyer Login:
- Email: `buyer@kegeberew.com`
- Password: `password`
- Role: Buyer

### 3. Test Registration
- Click "Register" tab in login modal
- Fill in details
- Select role (Farmer/Buyer/Driver)
- Submit

### 4. Test Dashboards
After logging in, you'll be redirected to the appropriate dashboard based on your role.

## Common Issues & Solutions

### Issue 1: "Cannot connect to database"
**Solution:**
- Ensure MySQL is running in XAMPP
- Check database name is exactly `ke_geberew`
- Verify credentials in `backend/config/database.php`

### Issue 2: "CORS Error" in browser console
**Solution:**
- Ensure backend server is running
- Check API URL in `frontend/src/config/api.js`
- Clear browser cache

### Issue 3: "npm command not found"
**Solution:**
- Node.js is not installed or not in PATH
- Install Node.js from https://nodejs.org/
- Restart terminal/command prompt

### Issue 4: "Port 3000 already in use"
**Solution:**
```bash
# Kill process using port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID [PID_NUMBER] /F

# Mac/Linux:
lsof -ti:3000 | xargs kill
```

### Issue 5: "White page after npm start"
**Solution:**
- Check browser console for errors
- Ensure all dependencies installed: `npm install`
- Delete `node_modules` and reinstall:
  ```bash
  rm -rf node_modules
  npm install
  ```

### Issue 6: "Statistics showing 0"
**Solution:**
- Database is empty (normal for fresh install)
- Register some users and add products
- Refresh the page

## Production Deployment

### For Production Environment:

1. **Build Frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Move Build Files**
   - Copy `frontend/build/*` to your web server
   - Configure web server to serve `index.html` for all routes

3. **Update API URL**
   - Change API_BASE_URL to your production domain
   - Example: `https://api.kegeberew.com`

4. **Secure Backend**
   - Use HTTPS
   - Implement proper JWT authentication
   - Add rate limiting
   - Enable strict CORS policy
   - Use environment variables for sensitive data

5. **Database Security**
   - Change default passwords
   - Use strong passwords
   - Restrict database access
   - Enable SSL for database connections

## Additional Configuration

### Changing Default Passwords

To change admin password:

```sql
UPDATE admins 
SET password = '$2y$10$NEW_HASHED_PASSWORD' 
WHERE email = 'admin@kegeberew.com';
```

Generate hashed password using PHP:
```php
<?php
echo password_hash('your_new_password', PASSWORD_BCRYPT);
?>
```

### Adding New Admin

```sql
INSERT INTO admins (name, email, password) 
VALUES (
  'New Admin', 
  'newadmin@kegeberew.com', 
  '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'
);
```

## Development Tips

### Hot Reload
- Frontend changes auto-reload
- Backend changes need server restart

### Debugging
- Frontend: Check browser console (F12)
- Backend: Check PHP error logs in XAMPP

### Testing API Endpoints
Use Postman or curl:
```bash
curl http://localhost/ke_geberew_api/api/stats/get_stats.php
```

## Support & Documentation

- **README.md** - Main documentation
- **SETUP_GUIDE.md** - This file
- **Database Schema** - See `database/schema.sql`

For questions: info@kegeberew.com

---

**Congratulations! Your Ke Geberew platform is now set up and running! 🎉**
