import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './InvoicePreview.css';

const InvoicePreview = ({ invoiceData }) => {
  const printRef = useRef(null);

  if (!invoiceData) return null;

  const { customerName, customerEmail, customerAddress, customerPhone, items } = invoiceData;
  const subtotal = items.reduce((acc, item) => acc + item.quantity * item.price, 0);
  const taxRate = 0.12; // 12% for example
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  const downloadPDF = async () => {
    const element = printRef.current;
    if (element) {
      const canvas = await html2canvas(element, { scale: 2 });
      const data = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'pt', 'a4');
      const imgProps = pdf.getImageProperties(data);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('invoice.pdf');
    }
  };

  return (
    <div className='invoice-preview'>
      <div ref={printRef} style={{ padding: '10px' }}>
        <h2>Invoice</h2>
        <div className="customer-details">
          <p><strong>Customer Name:</strong> {customerName}</p>
          <p><strong>Customer Email:</strong> {customerEmail}</p>
          <p><strong>Customer Address:</strong> {customerAddress}</p>
          <p><strong>Customer Phone:</strong> {customerPhone}</p>
        </div>
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={idx}>
                <td>{item.productName}</td>
                <td>{item.productDescription}</td>
                <td>{item.quantity}</td>
                <td>Rs.{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="totals">
          <p><strong>Subtotal:</strong> Rs.{subtotal.toFixed(2)}</p>
          <p><strong>Tax (12%):</strong> Rs.{tax.toFixed(2)}</p>
          <p><strong>Total:</strong> Rs.{total.toFixed(2)}</p>
        </div>
      </div>

      <button onClick={downloadPDF}>Download as PDF</button>
    </div>
  );
};

export default InvoicePreview;