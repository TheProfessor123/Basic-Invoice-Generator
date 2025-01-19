# Basic Invoice Generator

A full-stack MERN application for generating and managing invoices with PDF export functionality.

## Features

- Create detailed invoices with customer and product information
- Automatic calculation of subtotal, tax (12%), and total amount
- Generate and download invoices as PDF
- View list of all generated invoices
- Form validation for data integrity
- Responsive design for mobile and desktop
- Real-time invoice preview

## Tech Stack

### Frontend
- React.js
- HTML2Canvas & jsPDF for PDF generation
- CSS3 for styling
- Responsive design using media queries

### Backend
- Node.js & Express.js
- MongoDB with Mongoose
- RESTful API architecture
- Environment variable configuration
- CORS enabled

## Getting Started

### Prerequisites
- Node.js
- MongoDB
- npm 

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/Basic-Invoice-Generator.git
cd Basic-Invoice-Generator
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Create a `.env` file in the backend directory with:
```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

4. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

### Running the Application

1. Start the backend server:
```bash
cd backend
npm start
```

2. Start the frontend development server:
```bash
cd frontend
npm start
```

The application will be available at `http://localhost:3000`

## API Endpoints

- `POST /api/invoices` - Create a new invoice
- `GET /api/invoices` - Retrieve all invoices

## Contact

Your Name - chaganramchoudhary7@gmail.com
Project Link: [https://github.com/yourusername/Basic-Invoice-Generator](https://github.com/TheProfessor123/Basic-Invoice-Generator.git)
