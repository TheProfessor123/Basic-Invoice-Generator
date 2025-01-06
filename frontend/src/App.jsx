import React, { useState } from 'react';
import InvoiceForm from './components/InvoiceForm';
import InvoicePreview from './components/InvoicePreview';
import InvoiceList from './components/InvoiceList';
import './App.css';

function App() {
  const [invoiceData, setInvoiceData] = useState(null);

  const handleInvoiceSubmit = async (data) => {
    const subtotal = data.items.reduce((acc, item) => acc + item.quantity * item.price, 0);
    const tax = subtotal * 0.12;
    const total = subtotal + tax;
    const updatedData = { ...data, subtotal, tax, total };

    setInvoiceData(updatedData);
  
    try {
      const response = await fetch('https://basic-invoice-generator-api.vercel.app/api/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        const savedInvoice = await response.json();
        console.log('Invoice saved:', savedInvoice);
        alert('Invoice successfully saved!');
      } else {
        const errorData = await response.json();
        console.error('Error saving invoice:', errorData);
        alert('Failed to save invoice: ' + errorData.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while saving the invoice.');
    }
  };

  return (
    <div className="App">
      <h1 className="centered-heading">Basic Invoice Generator</h1>
      <div className="app-container">
        <InvoiceForm onSubmit={handleInvoiceSubmit} />
        <InvoicePreview invoiceData={invoiceData} />
      </div>
      <InvoiceList />
    </div>
  );
}

export default App;
