# 📱 Asset Inventory Backend API

A TypeScript-based RESTful backend for a Asset Inventory application, built with Node.js, Express, and MongoDB.

---

## 🚀 Features

- 🔐 JWT authentication
- 🧑 User login, Password Change
- 📝 Data entry - Add Assets, Add Other Assets, Add Repairs, Add Movement,
- Rate Limiting to avoid brute force attacks

---

## 🛠️ Tech Stack

- **Node.js** with **TypeScript**
- **Express.js**
- **JWT** for auth

---

## 📁 Project Structure

src/
├── config/ // Database connection
├── controllers/ // Route handlers
├── middlewares/ // Authentication
├── models/ // Mongoose models
├── routes/ // Express routers
├── utils/ // Helper functions
├── secrets.ts/ // Environment variables
├── app.ts/ // App Entry Point
└── server.ts // Server Entry Point

## 📬 API Endpoints

**Auth**

POST /api/auth/login — Login and set cookie

POST /api/auth/logout - Logout and clear cookie

**Users**
GET /api/users/getoneuser/:id — Get user profile

GET /api/users/getusers — Get Users

POST /api/users/createuser — Create user

PUT /api/users/passchg — Change Password

**Assets**
GET /api/assets/get — Fetch all Laptops

PUT /api/assets/edit/:id - Update a laptops details

POST /api/assets/add — Add a new laptop

DELETE /api/assets/delete/:id - Delete a laptop record

POST /api/assets/addother — Add other assets

GET /api/assets/others — Fetch other assets

**Repairs**

GET /api/repairs/get — Get repairs

POST /api/repairs/add — Add a new repair

**Movements**

GET /api/movements/get - Follow a user

POST /api/movements/add - Unfollow a user

## 🧪 Testing

You can test the API using:

Postman

## 🛡️ Security Notes

Passwords are hashed using bcrypt

JWT tokens are stored client-side ( HTTP-only cookies )

Rate limiting is in use for login and change password endpoints

## 👨‍💻 Author

Built by Michael Amao
