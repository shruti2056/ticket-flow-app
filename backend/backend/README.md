# 🚀 Super Simple Backend for Login & Signup

**No JWT, No Tokens, No Complex Stuff - Just the Basics!**

Perfect for beginners learning Node.js, Express, and MongoDB.

---

## 📦 What You Need

- **Node.js** (Download: https://nodejs.org)
- **MongoDB** (Local or Cloud)

---

## 🎯 Quick Start (5 Steps!)

### Step 1: Install MongoDB

**Easy Way - MongoDB Atlas (Cloud, FREE):**
1. Go to: https://www.mongodb.com/cloud/atlas
2. Sign up for free
3. Create a cluster (takes 3 minutes)
4. Get connection string
5. Replace line 13 in `server.js`:
```javascript
mongoose.connect('YOUR_MONGODB_ATLAS_STRING_HERE', {
```

**OR Local MongoDB:**
- Windows: Download from mongodb.com and install
- Mac: `brew install mongodb-community`
- Linux: `sudo apt-get install mongodb`

---

### Step 2: Install Packages

```bash
cd simple-backend
npm install
```

This installs 4 simple packages:
- `express` - Web framework
- `mongoose` - Talk to MongoDB
- `bcryptjs` - Hash passwords
- `cors` - Let frontend connect

---

### Step 3: Start Server

```bash
npm run dev
```

**You should see:**
```
✅ Connected to MongoDB!
🚀 Server running on: http://localhost:5000
```

---

### Step 4: Test with Browser

Open browser and go to:
```
http://localhost:5000
```

You should see:
```json
{
  "message": "TicketFlow Backend is running!"
}
```

---

### Step 5: Test Signup & Login

**Use Postman or Thunder Client:**

#### Test Signup:
```
POST http://localhost:5000/signup

Body (JSON):
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "test123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully!",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Test Login:
```
POST http://localhost:5000/login

Body (JSON):
{
  "email": "john@example.com",
  "password": "test123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful!",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

## 📂 Project Structure

```
simple-backend/
├── server.js          ← All the code (100 lines!)
├── package.json       ← Dependencies list
└── README.md          ← You are here
```

---

## 🎓 How It Works (Simple Explanation)

### 1. **User Signs Up:**
```
Frontend → POST /signup → Backend
                          ↓
                    Check if email exists
                          ↓
                    Hash password
                          ↓
                    Save to MongoDB
                          ↓
Frontend ← Success! ← Backend
```

### 2. **User Logs In:**
```
Frontend → POST /login → Backend
                         ↓
                   Find user by email
                         ↓
                   Compare passwords
                         ↓
Frontend ← Success! ← Backend
```

---

## 🔒 Security Features

- ✅ **Password Hashing** - Passwords are encrypted with bcrypt
- ✅ **Duplicate Email Check** - Can't register same email twice
- ✅ **Error Handling** - Proper error messages

---

## 🧪 Testing Guide

### Using Postman:

1. **Download Postman:** https://www.postman.com/downloads/

2. **Create New Request**

3. **Test Signup:**
   - Method: POST
   - URL: `http://localhost:5000/signup`
   - Body → raw → JSON
   - Paste:
     ```json
     {
       "name": "Test User",
       "email": "test@test.com",
       "password": "test123"
     }
     ```
   - Click "Send"

4. **Test Login:**
   - Method: POST
   - URL: `http://localhost:5000/login`
   - Body → raw → JSON
   - Paste:
     ```json
     {
       "email": "test@test.com",
       "password": "test123"
     }
     ```
   - Click "Send"

### Using cURL (Terminal):

**Signup:**
```bash
curl -X POST http://localhost:5000/signup \
-H "Content-Type: application/json" \
-d '{"name":"Test User","email":"test@test.com","password":"test123"}'
```

**Login:**
```bash
curl -X POST http://localhost:5000/login \
-H "Content-Type: application/json" \
-d '{"email":"test@test.com","password":"test123"}'
```

---

## 🔗 Connect to React Frontend

In your React app:

```javascript
// Signup function
async function signup(name, email, password) {
  const response = await fetch('http://localhost:5000/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });
  const data = await response.json();
  return data;
}

// Login function
async function login(email, password) {
  const response = await fetch('http://localhost:5000/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await response.json();
  
  if (data.success) {
    // Save user info
    localStorage.setItem('user', JSON.stringify(data.user));
    console.log('Login successful!');
  }
  
  return data;
}
```

---

## ❓ Common Issues

### Issue 1: "Cannot connect to MongoDB"
**Fix:** 
- Make sure MongoDB is running
- Check connection string in `server.js` line 13

### Issue 2: "Port 5000 already in use"
**Fix:** 
- Change port in `server.js` (last line)
- Or stop other app using port 5000

### Issue 3: "Email already registered"
**Fix:** 
- Use different email
- Or delete user from database

### Issue 4: "Cannot find module"
**Fix:**
```bash
rm -rf node_modules
npm install
```

---

## 📚 What's in the Code?

### server.js Breakdown:

```javascript
// Lines 1-4: Import packages
// Lines 6-8: Setup Express and middleware
// Lines 10-16: Connect to MongoDB
// Lines 18-30: User Schema (defines what a user looks like)
// Lines 32-36: Model (to interact with database)
// Lines 38-44: Test route
// Lines 46-82: Signup route (create new user)
// Lines 84-124: Login route (check credentials)
// Lines 126-132: Start server
```

---

## 🎯 Next Steps

Once this works, you can add:
1. ✅ Profile update
2. ✅ Logout functionality
3. ✅ Remember me feature
4. ✅ Password reset
5. ✅ Email verification

---

## 🆘 Need Help?

**Server not starting?**
1. Check Node.js installed: `node --version`
2. Check MongoDB connected: Look for "✅ Connected to MongoDB!"
3. Check port available: Try different port

**Can't signup/login?**
1. Check server is running
2. Check request format (JSON)
3. Check MongoDB is running

---

## ✅ Success Checklist

- [ ] Node.js installed
- [ ] MongoDB installed/configured
- [ ] Packages installed (`npm install`)
- [ ] Server starts without errors
- [ ] Browser shows welcome message
- [ ] Signup works in Postman
- [ ] Login works in Postman
- [ ] User saved in MongoDB

---

**That's it! Super simple backend ready! 🎉**

No JWT, no tokens, no complexity - just plain signup and login!
