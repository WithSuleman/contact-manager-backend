# Contact Manager - Backend API 🚀

A beginner-friendly RESTful API built with **Node.js**, **Express.js**, **Mongoose**, and **MongoDB Atlas**.

---

## 📁 Folder Structure

```
contact-manager-backend/
├── models/
│   └── Contact.js         # Mongoose schema for contacts
├── routes/
│   └── contactRoutes.js   # GET, POST, PUT, DELETE endpoints
├── .env.example           # Example environment variables
├── .env                   # Secret local environment variables
├── .gitignore             # Files excluded from git (node_modules, .env)
├── package.json           # Project metadata and dependencies
├── server.js              # Express app setup and MongoDB connection
└── README.md              # Documentation
```

---

## 🛠️ Prerequisites

1. **Node.js** (v18 or higher recommended)
2. **MongoDB Atlas** free tier account (or local MongoDB)

---

## ⚙️ Environment Variables

Create a file named `.env` in the `contact-manager-backend/` directory:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/contact_manager?retryWrites=true&w=majority
PORT=5000
```

> **Important**: Never commit your `.env` file to GitHub. Keep your database credentials private.

---

## 🚀 How to Run Locally

1. **Open terminal inside this folder:**
   ```bash
   cd contact-manager-backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the server:**
   ```bash
   node server.js
   ```
   *(Or run `npm run dev` with nodemon if installed)*

4. **Verify it is running:**
   Open [http://localhost:5000/api/contacts](http://localhost:5000/api/contacts) in your browser or Postman.

---

## 📡 API Endpoints

| Method | Endpoint | Description | Status Code |
|---|---|---|---|
| `GET` | `/api/contacts` | Get all contacts | 200 OK |
| `POST` | `/api/contacts` | Create a new contact | 201 Created |
| `PUT` | `/api/contacts/:id` | Update an existing contact | 200 OK |
| `DELETE` | `/api/contacts/:id` | Remove a contact | 200 OK |

### Request Body (POST / PUT):
```json
{
  "name": "Sarah Connor",
  "email": "sarah@example.com",
  "phone": "+1 (555) 234-5678"
}
```

---

## 🌐 Deployment on Render (Free)

1. Push your code to GitHub (ensure `.env` is NOT committed).
2. Go to [Render.com](https://render.com) and create a **New Web Service**.
3. Connect your repository.
4. Set:
   - **Root Directory**: `contact-manager-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
5. In **Environment Variables**, add:
   - `MONGO_URI`: *Your full MongoDB Atlas connection string*
   - `PORT`: `10000`
6. Click **Deploy**. Copy the live URL (e.g. `https://contact-manager-backend.onrender.com`).
