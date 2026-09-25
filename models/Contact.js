const mongoose = require('mongoose');

// Define the Contact Schema
// Simple and clean: stores name, email, phone number, and auto-generated timestamp
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a contact name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide an email address'],
    trim: true,
  },
  phone: {
    type: String,
    required: [true, 'Please provide a phone number'],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Export the Mongoose model
// This creates the 'contacts' collection in MongoDB Atlas
module.exports = mongoose.model('Contact', contactSchema);
