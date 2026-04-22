
# 💰 Expense Tracker

A full-stack Expense Tracker application built with **React Native** (frontend) and **Node.js + SQLite** (backend). Supports creating, reading, updating, and deleting expenses via a RESTful API.

---

## 🗂 Project Structure

~~~
project/
├── backend/
│   ├── server.js          # Express REST API
│   └── database.js        # SQLite connection and schema
└── frontend/
    ├── App.js             # Main app screen
    ├── services/
    │   └── api.js         # Axios instance
    └── components/
        ├── ExpenseForm.js  # Add expense form
        └── ExpenseItem.js  # Single expense list item
~~~

---

## ⚙️ Prerequisites

- [Node.js](https://nodejs.org/) (v16+)
- [Expo CLI](https://expo.dev/) or React Native environment

> No external database setup required — SQLite is file-based and created automatically.

---

## 🚀 Getting Started

### 1. Start the Backend

~~~bash
cd backend
npm install
node server.js
~~~

The server will start at `http://localhost:3001`. A local `expenses.db` file will be created automatically on first run.

### 2. Start the Frontend

~~~bash
cd frontend
npm install
npx expo start
~~~

---

## 🔌 API Endpoints

### Collection Routes — `/api/`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/` | Retrieve all expenses |
| `POST` | `/api/` | Add a new expense |
| `PUT` | `/api/` | Replace entire collection (reset) |
| `DELETE` | `/api/` | Delete all expenses |

### Item Routes — `/api/:id`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/:id` | Retrieve a single expense |
| `PUT` | `/api/:id` | Update an existing expense |
| `DELETE` | `/api/:id` | Delete a single expense |

### `POST /api/` — Request Body

~~~json
{
  "title": "Coffee",
  "amount": 3.50,
  "category": "Food",
  "date": "2023-10-10",
  "description": "Morning coffee at Tim Hortons"
}
~~~

**Required fields:** `title`, `amount`, `category`, `date`, `description`

---

## 🗄 Database Schema

~~~sql
CREATE TABLE expenses (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  title       TEXT NOT NULL,
  amount      REAL NOT NULL,
  category    TEXT NOT NULL,
  date        TEXT NOT NULL,
  description TEXT
);
~~~

---

## 📱 App Features

- **Add** a new expense with title, amount, category, date, and description
- **View** all expenses in a scrollable list
- **Update** an existing expense
- **Delete** a single expense or all expenses at once
- **Reset** the list with predefined sample data

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React Native |
| Backend | Node.js, Express |
| Database | SQLite (via `sqlite3`) |
| HTTP Client | Axios |

---

## 📌 Notes

- The SQLite database file (`expenses.db`) is created automatically in the `backend/` directory on first run.
- The API base URL is configured in `frontend/services/api.js` — update `baseURL` if deploying to a non-local environment.
- The `PUT /api/` endpoint overwrites the entire collection and is used by the **Reset Data** button to load sample entries.
````
