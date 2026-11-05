# Quick Start Guide - Ke Geberew Enhanced

## 🚀 Get Started in 5 Minutes!

### Prerequisites
- XAMPP/WAMP installed
- Node.js installed

### Step 1: Database Setup (2 minutes)
1. Start XAMPP → Start Apache & MySQL
2. Open phpMyAdmin: `http://localhost/phpmyadmin`
3. Create database: `ke_geberew`
4. Import file: `database/schema.sql`

### Step 2: Backend Setup (1 minute)
1. Copy `backend` folder to `C:\xampp\htdocs\ke_geberew_api\`
2. Open: `C:\xampp\htdocs\ke_geberew_api\config\database.php`
3. Verify settings (usually no changes needed)

### Step 3: Frontend Setup (2 minutes)
1. Open terminal in `frontend` folder
2. Run: `npm install`
3. Run: `npm start`
4. Browser opens at: `http://localhost:3000`

### Step 4: Login & Test
**Admin Login:**
- Email: `admin@kegeberew.com`
- Password: `password`

**Try It:**
- ✅ Switch language: English ↔ አማርኛ
- ✅ View real-time statistics
- ✅ Test chatbot in both languages
- ✅ Check admin dashboard

## 🎯 Key Features to Test

### 1. Multilingual Support
- Click language selector in navbar
- Switch between English and Amharic
- All text updates instantly

### 2. Real-Time Statistics
- Scroll to statistics section
- Numbers animate from database
- Admin dashboard shows live data

### 3. Authentication
- Try registering new user
- Login with different roles
- Check role-based dashboards

### 4. Chatbot
- Click chat button (bottom right)
- Ask questions in English or Amharic
- Get automatic responses

## 📋 Default Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@kegeberew.com | password |
| Farmer | farmer@kegeberew.com | password |
| Buyer | buyer@kegeberew.com | password |

## ⚠️ Troubleshooting

**Can't connect to database?**
→ Check MySQL is running in XAMPP

**CORS error?**
→ Ensure backend path is: `C:\xampp\htdocs\ke_geberew_api\`

**npm command not found?**
→ Install Node.js from nodejs.org

**Port 3000 in use?**
→ Close other React apps or use different port

## 📚 Full Documentation
See `SETUP_GUIDE.md` for detailed setup instructions.

## 🎉 You're Ready!
Your Ke Geberew platform is now running with full multilingual support, real-time statistics, and secure authentication!
