# 🩸 Blood Donor Management System

A full-stack MERN Blood Donor Management System that helps users find blood donors, send emergency blood requests, and manage donor information securely.

## 🚀 Features

- User Authentication (JWT + Cookies)
- Google OAuth Login
- Forgot Password with OTP Verification
- Blood Donor Registration
- Search Donors by Blood Group
- Emergency Blood Request Management
- Notification System
- User Profile Management
- Secure REST API
- Responsive UI

---

## 🛠 Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- React Router
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Nodemailer
- Redis
- BullMQ

---

## 📂 Project Structure

```
Blood-Donor-Management-System
│
├── client/
│   ├── src/
│   └── public/
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│
└── README.md
```

---

## ⚙ Installation

Clone the repository

```bash
git clone https://github.com/harishwaranmoorthy2005-glitch/blood-donor-management-system.git
```

Install frontend

```bash
cd client
npm install
```

Install backend

```bash
cd ../server
npm install
```

---

## ▶ Run the Project

Backend

```bash
npm run dev
```

Frontend

```bash
npm run dev
```

---

## 🔒 Environment Variables

Create a `.env` file inside the `server` folder.

Example:

```env
PORT=5000

MONGODB_URI=your_mongodb_connection

JWT_SECRET=your_secret_key

EMAIL_USER=your_email

EMAIL_PASS=your_password

GOOGLE_CLIENT_ID=your_google_client_id

GOOGLE_CLIENT_SECRET=your_google_client_secret

REDIS_URL=your_redis_url
```

---

## 📸 Screenshots

_Add screenshots here after deployment._

---

## 🌐 Live Demo

Coming Soon...

---

## 👨‍💻 Author

**Harishwaran**

GitHub:
https://github.com/harishwaranmoorthy2005-glitch
