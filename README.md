# 💸 ExpenseAI – AI Powered Personal Finance Tracker

ExpenseAI is a full-stack AI-powered personal finance management application built using the **PERN Stack (PostgreSQL, Express.js, React.js, Node.js)** and powered by **Google Gemini AI**.

The application enables users to securely track income and expenses, manage budgets, visualize financial data through interactive dashboards, and receive AI-generated financial insights and recommendations.

---

## 🚀 Live Demo

### 🌐 Frontend
"https://expense-ai-zdhq-three.vercel.app/login"


### ⚙️ Backend API
https://expenseai-bbs8.onrender.com

---

## ✨ Features

### 🔐 Authentication & Security
- Secure user registration and login
- JWT Authentication
- Password hashing using bcrypt
- Protected API routes

### 🏷️ Smart Category Management
- 17 default income & expense categories created automatically
- Create custom categories
- Category icon & color customization

### 💳 Transaction Management
- Add income & expense transactions
- Edit & delete transactions
- Search transactions
- Filter by category, transaction type & date

### 💰 Budget Management
- Monthly & weekly budgets
- Category-wise budget allocation
- Real-time budget tracking
- Spending progress indicators

### 📊 Interactive Dashboard
- Financial KPI Cards
- Monthly Income vs Expense Chart
- Top Spending Categories
- Recent Transactions
- Budget Status Overview

### 📈 Analytics
- Last 30 Days
- Last 3 Months
- Monthly
- Yearly
- Real-time client-side aggregation

### 🤖 AI Powered Insights (Google Gemini)

#### 📄 AI Monthly Summary
- Financial Health Report
- Health Score
- Spending Statistics
- Personalized Recommendations

#### 💡 AI Savings Tips
- Category-specific savings suggestions
- Ranked recommendations
- Estimated monthly savings opportunities

#### ⚠️ AI Budget Verdicts
Automatically analyzes budgets and provides:
- ✅ On Track
- ⚠️ Watch It
- ❌ Over Budget

with personalized AI commentary.

#### 🔍 AI Spending Analyzer
- Spending behavior analysis
- Filter-aware AI insights
- Transaction pattern analysis

#### 📝 AI History
- Stores AI-generated insights using PostgreSQL JSONB
- Revisit previous financial analyses anytime

---

## 🎨 User Interface

- Modern responsive design
- Violet-themed UI
- Interactive charts
- Smooth animations
- Skeleton loading states
- Mobile-friendly layout

---

# 🛠️ Tech Stack

## Frontend
- React.js
- Vite
- Tailwind CSS
- Axios
- React Router DOM
- Recharts
- Framer Motion

## Backend
- Node.js
- Express.js
- JWT Authentication
- bcrypt
- Google Gemini AI API

## Database
- PostgreSQL
- Neon Database
- JSONB Storage

## Deployment
- Vercel
- Render
- Neon PostgreSQL

---

# 🏗️ System Architecture

```
User
   │
   ▼
React Frontend (Vercel)
   │
   ▼
Express Backend (Render)
   │
   ▼
Neon PostgreSQL
   │
   ▼
Google Gemini AI
```

---

# 📂 Project Structure

```
ExpenseAI
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── context
│   │   ├── pages
│   │   ├── services
│   │   └── utils
│
├── backend
│   ├── controllers
│   ├── middleware
│   ├── routes
│   ├── services
│   ├── db
│   └── scripts
│
└── README.md
```

---

# ⚙️ Environment Variables

## Backend (.env)

```env
PORT=8000

DATABASE_URL=your_neon_database_url

JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_gemini_api_key
```

## Frontend (.env)

```env
VITE_API_URL=https://your-backend-url.onrender.com/api
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/ExpenseAI.git

cd ExpenseAI
```

---

## Backend Setup

```bash
cd backend

npm install

npm run migrate

npm run seed

npm run dev
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

# 🔒 Security

- JWT Authentication
- Password Hashing (bcrypt)
- Protected API Routes
- Environment Variables
- PostgreSQL Parameterized Queries

