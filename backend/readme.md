# 📱 Asset Inventory Backend API

A TypeScript-based RESTful backend for a Asset Inventory application, built with Node.js, Express, and MongoDB.

---

## 🚀 Features

- 🔐 JWT authentication
- 🧑 User login, Password Change
- 📝 Data entry - Add Assets, Add Other Assets, Add Repairs, Add Movement,
- 🚫 Rate Limiting to avoid brute force attacks
- 🧾 Entry & Exit tracking
- 📅 Date-based filtering
- 🔌 RESTful API architecture
- 🧠 Typed logic with TypeScript
- 🛡️ Input validation and error handling

---

## 🛠️ Tech Stack

- 🟦 Node.js + Express
- 📘 TypeScript
- 🍃 MongoDB + Mongoose
- 🔑 JWT for authentication
- 🌐 CORS for secure cross-origin requests

---

## 📁 Project Structure

src/

- ├── config/ // Database connection
- ├── controllers/ // Route handlers
- ├── middlewares/ // Authentication
- ├── models/ // Mongoose models
- ├── routes/ // Express routers
- ├── utils/ // Helper functions
- ├── app.ts/ // App Entry Point
- └── server.ts // Server Entry Point

## 📬 API Endpoints

**AUTH**

POST /api/auth/login — Login and set cookie

POST /api/auth/logout - Logout and clear cookie

**USERS**

GET /api/users/getoneuser/:id — Get user profile

GET /api/users/getusers — Get Users

POST /api/users/createuser — Create user

PUT /api/users/passchg — Change Password

**ASSETS**

GET /api/assets/get — Fetch all Laptops

PUT /api/assets/update/:id - Update a laptops details

POST /api/assets/add — Add a new laptop

DELETE /api/assets/delete/:id - Delete a laptop record

POST /api/assets/addother — Add other assets

GET /api/assets/others — Fetch other assets

**REPAIRS**

GET /api/repairs/get — Get repairs

POST /api/repairs/add — Add a new repair

PUT /api/repairs/update/:id — Update a repair

PUT /api/repairs/update/:id — Update a repair

**MOVEMENTS**

GET /api/movements/get - Get all movements

POST /api/movements/add - Add a movemenent

PUT /api/movements/update/:id - Update a movement

**EXITS**

GET /api/exits/get - Get all exits

POST /api/exits/add - Add a new exit

PUT /api/exits/update/:id - Update an exit

## 🧪 Endpoint Testing

Postman

## 👨‍💻 Author

Built by [Michael Amao](https://github.com/tireddev24)
