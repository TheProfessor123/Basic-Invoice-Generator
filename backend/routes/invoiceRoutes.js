const express = require('express');
const router = express.Router();
const Invoice = require('../models/Invoice');

const generateInvoiceNumber = async () => {
  const lastInvoice = await Invoice.findOne().sort({ createdAt: -1 });
  const lastNumber = lastInvoice ? parseInt(lastInvoice.invoiceNumber.replace('INV-', '')) : 0;
  const newNumber = lastNumber + 1;
  return `INV-${newNumber.toString().padStart(5, '0')}`;
};

// Create a new invoice
router.post('/', async (req, res) => {
  try {
    const invoiceNumber = await generateInvoiceNumber();
    const newInvoice = new Invoice({ ...req.body, invoiceNumber });
    const savedInvoice = await newInvoice.save();
    res.status(201).json(savedInvoice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all invoices
router.get('/', async (req, res) => {
  try {
    const invoices = await Invoice.find();
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;