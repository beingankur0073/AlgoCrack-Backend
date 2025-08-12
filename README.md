# 🚀 AlgoCrack Backend

**AlgoCrack Backend** is the server-side API powering the AlgoCrack full-stack coding platform.  
It handles user authentication, role-based access, problem management, code submission tracking, and real-time code execution integration.

---

## 📌 Features

- **Authentication & Authorization**
  - Secure **JWT-based** authentication with token expiry.
  - **Role-based access control (RBAC)** for Admin and User roles.
  
- **Code Execution**
  - Judge0 API integration for real-time, multi-language code execution.

- **User Management**
  - User registration, login, and profiles.
  - Profile & cover image uploads via **Cloudinary**.

- **Submissions Tracking**
  - Store and retrieve code submissions for progress tracking.

- **Admin Controls**
  - Add, edit, delete coding problems.
  - View user activity and submissions statistics.

- **Security Best Practices**
  - **Password hashing** using bcrypt.
  - Input validations & secure file uploads.
  
---

## 🛠 Tech Stack

| Technology         | Purpose                |
|--------------------|------------------------|
| **Node.js**        | Backend runtime        |
| **Express.js**     | Web framework          |
| **MongoDB**        | Database               |
| **Mongoose**       | ODM for MongoDB        |
| **JWT**            | Authentication         |
| **Bcrypt**         | Password hashing       |
| **Cloudinary**     | Image upload/storage   |
| **Judge0 API**     | Code execution         |
| **Multer**         | File upload handling   |
| **Dotenv**         | Environment variables  |
| **Cors**           | Cross-origin resource sharing |

---

## 📂 Project Structure

    backend/
    │
    ├── controllers/ # Route handlers (Auth, User, Problems, Submissions)
    ├── models/ # Mongoose schemas
    ├── routes/ # API route definitions
    ├── middleware/ # Auth & role-check middleware
    ├── utils/ # Helper functions (Cloudinary, API clients)
    ├── config/ # Database & external API configs
    ├── server.js # Main entry point
    └── package.json

text

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository
git clone <backend-repo-url>
cd backend

text

### 2️⃣ Install Dependencies
npm install

text

### 3️⃣ Configure Environment Variables
    Create a `.env` file in the `backend/` folder:

    PORT=5000
    MONGODB_URI=<Your MongoDB Connection String>
    JWT_SECRET=<Your JWT Secret Key>
    CLOUDINARY_CLOUD_NAME=<Your Cloudinary Cloud Name>
    CLOUDINARY_API_KEY=<Your Cloudinary API Key>
    CLOUDINARY_API_SECRET=<Your Cloudinary API Secret>
    JUDGE0_API_URL=https://judge0-ce.p.rapidapi.com/submissions
    JUDGE0_API_KEY=<Your Judge0 API Key>

text

---

### 4️⃣ Start Development Server
npm run dev

text
Server will run on:
http://localhost:5000

text

---

## 🔌 API Endpoints Overview

### **Auth Routes**
| Method | Endpoint            | Access  | Description                  |
|--------|---------------------|---------|------------------------------|
| POST   | `/api/auth/register`| Public  | Register new user            |
| POST   | `/api/auth/login`   | Public  | Login & return JWT token     |
| GET    | `/api/auth/me`      | Private | Get logged-in user details   |

### **User Routes**
| Method | Endpoint                 | Access  | Description                  |
|--------|--------------------------|---------|------------------------------|
| GET    | `/api/users/:id`         | Private | Fetch specific user profile  |
| PUT    | `/api/users/profile`     | Private | Update profile & upload image|

### **Problem Routes (Admin Only)**
| Method | Endpoint                 | Access  | Description                  |
|--------|--------------------------|---------|------------------------------|
| GET    | `/api/problems`          | Public  | Fetch all coding problems    |
| POST   | `/api/problems`          | Admin   | Create new problem           |
| PUT    | `/api/problems/:id`      | Admin   | Update problem               |
| DELETE | `/api/problems/:id`      | Admin   | Delete problem               |

### **Submission Routes**
| Method | Endpoint                   | Access  | Description                  |
|--------|----------------------------|---------|------------------------------|
| POST   | `/api/submissions`         | Private | Submit code for execution    |
| GET    | `/api/submissions/user/:id`| Private | Fetch user’s submissions     |

---

## 🔗 Postman API Testing Link

> 👉 **[Click here to access the AlgoCrack Backend Postman Collection](https://www.postman.com/spacecraft-geoscientist-20553327/workspace/algocrack/collection/33893722-3b2f6422-cb5e-4c5c-b9f5-8658834c01b1?action=share&creator=33893722)**

---

## 🔐 Security Considerations

- Passwords hashed with `bcrypt` before storage.
- JWT tokens signed with secret key and expiration.
- All sensitive routes protected with authentication middleware.
- File uploads validated before sending to **Cloudinary**.
- Sensitive credentials stored in `.env` (never committed).

---

## 🚀 Deployment

- **Backend Hosting:** Render  
- **Database:** MongoDB Atlas  
- Set environment variables in hosting platform before deployment.

---

## 👤 Author
**Ankur Mukherjee**  
[LinkedIn](#) | [Portfolio](#)

---

## 📝 License
This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.