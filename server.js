// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import contact routes
const contactRoutes = require('./routes/contactRoutes');

// Initialize Express app
const app = express();

// Middleware: Enable CORS (Cross-Origin Resource Sharing)
// Allows our React frontend (local dev or deployed on Vercel) to communicate with this backend
app.use(cors());

// Middleware: Parse incoming JSON requests into req.body
app.use(express.json());

// Health check endpoint (useful for Render/Railway monitoring)
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    message: 'Contact Manager API is running smoothly',
    endpoints: {
      contacts: '/api/contacts',
    },
  });
});

// Mount the contacts router under /api/contacts
app.use('/api/contacts', contactRoutes);

// Port configuration (from .env or default to 5000)
// Port configuration
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB Atlas and start the server
if (!MONGO_URI) {
  console.error('CRITICAL: MONGO_URI is missing!');
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas');

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  });