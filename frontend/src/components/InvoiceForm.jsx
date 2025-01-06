import React, { useState } from 'react';
import './InvoiceForm.css';

const InvoiceForm = ({ onSubmit }) => {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [items, setItems] = useState([{ productName: '', productDescription: '', quantity: 1, price: 0 }]);
  const [errors, setErrors] = useState({});

  const handleAddItem = () => {
    setItems([...items, { productName: '', productDescription: '', quantity: 1, price: 0 }]);
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (customerPhone.length !== 10) {
      newErrors.customerPhone = 'Phone number must be of 10 digits.';
    } 

    items.forEach((item, i) => {
      if (!item.productName.trim()) {
        newErrors[`productName${i}`] = 'Product name is required.';
      }
      if (item.quantity <= 0) {
        newErrors[`quantity${i}`] = 'Quantity must be greater than 0.';
      }
      if (item.price < 0) {
        newErrors[`price${i}`] = 'Price cannot be negative.';
      }
    });

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }
    onSubmit({ customerName, customerEmail, customerAddress, customerPhone, items });
  };

  return (
    <form className='invoice-form' onSubmit={handleSubmit}>
      <div>
        <label>Customer Name:</label>
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Customer Email:</label>
        <input
          type="email"
          value={customerEmail}
          onChange={(e) => setCustomerEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Customer Address:</label>
        <input
          type="text"
          value={customerAddress}
          onChange={(e) => setCustomerAddress(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Customer Phone:</label>
        <input
          type="text"
          value={customerPhone}
          onChange={(e) => setCustomerPhone(e.target.value)}
          required
        />
        {errors.customerPhone && <div className="error">{errors.customerPhone}</div>}
      </div>

      {items.map((item, index) => (
        <div key={index}>
          <label>Product Name:</label>
          <input
            type="text"
            value={item.productName}
            onChange={(e) => handleItemChange(index, 'productName', e.target.value)}
          />
          {errors[`productName${index}`] && <div className="error">{errors[`productName${index}`]}</div>}

          <label>Product Description:</label>
          <input
            type="text"
            value={item.productDescription}
            onChange={(e) => handleItemChange(index, 'productDescription', e.target.value)}
          />

          <label>Quantity:</label>
          <input
            type="number"
            value={item.quantity}
            onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
          />
          {errors[`quantity${index}`] && <div className="error">{errors[`quantity${index}`]}</div>}

          <label>Price:</label>
          <input
            type="number"
            step="0.01"
            value={item.price}
            onChange={(e) => handleItemChange(index, 'price', e.target.value)}
          />
          {errors[`price${index}`] && <div className="error">{errors[`price${index}`]}</div>}
        </div>
      ))}
      <button type="button" onClick={handleAddItem}>
        Add Another Product
      </button>
      <button type="submit">Generate Invoice</button>
    </form>
  );
};

export default InvoiceForm;