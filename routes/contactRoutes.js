const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// 1. GET ALL CONTACTS
// Route: GET /api/contacts
// Description: Fetches all saved contacts, sorted from newest to oldest
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error.message);
    res.status(500).json({ message: 'Failed to retrieve contacts' });
  }
});

// 2. CREATE A NEW CONTACT
// Route: POST /api/contacts
// Description: Validates required fields and saves a new contact to MongoDB
router.post('/', async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    // Basic input validation
    if (!name || !email || !phone) {
      return res.status(400).json({ message: 'Name, email, and phone are all required' });
    }

    // Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Please provide a valid email address' });
    }

    const newContact = new Contact({
      name,
      email,
      phone,
    });

    const savedContact = await newContact.save();
    res.status(201).json(savedContact);
  } catch (error) {
    console.error('Error creating contact:', error.message);
    res.status(500).json({ message: 'Failed to create contact' });
  }
});

// 3. UPDATE AN EXISTING CONTACT
// Route: PUT /api/contacts/:id
// Description: Updates a contact by their MongoDB _id
router.put('/:id', async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    // Basic input validation
    if (!name || !email || !phone) {
      return res.status(400).json({ message: 'Name, email, and phone are all required' });
    }

    // Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Please provide a valid email address' });
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      { name, email, phone },
      { new: true, runValidators: true }
    );

    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    console.error('Error updating contact:', error.message);
    res.status(500).json({ message: 'Failed to update contact' });
  }
});

// 4. DELETE A CONTACT
// Route: DELETE /api/contacts/:id
// Description: Deletes a contact by their MongoDB _id
router.delete('/:id', async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);

    if (!deletedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json({ message: 'Contact deleted successfully', id: req.params.id });
  } catch (error) {
    console.error('Error deleting contact:', error.message);
    res.status(500).json({ message: 'Failed to delete contact' });
  }
});

module.exports = router;
