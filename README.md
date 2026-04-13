# QR Food Ordering System (MERN Stack)

A comprehensive food ordering system built with the MERN stack (MongoDB, Express.js, React.js, Node.js). This application is designed to streamline the food ordering process by allowing customers to scan a QR code at their table, view a highly responsive menu, place orders directly, and make payments online via Razorpay or choose Cash options. It also provides a robust administration dashboard for restaurant owners to manage operations seamlessly.

## 🚀 Key Features

### For Customers:
- **Scan & Browse:** Access the digital menu via table-specific QR codes.
- **Dynamic Cart Management:** Add items to cart, adjust quantities, and manage orders clearly.
- **Checkout:** Seamless Razorpay payment gateway integration for online payments, alongside a pay-by-cash option.
- **Order Tracking:** Real-time order status tracking with custom links containing exact food order details.

### For Restaurant Owners:
- **Owner Dashboard:** Overview of sales, daily revenues, transaction history, and interactive charts.
- **Menu Management:** Add, edit, or remove menu items, upload images, and manage availability.
- **Order Management:** View all incoming orders. Accept or reject orders. Rejected orders allow adding a cancellation reason for clarity.
- **QR Code Generation:** Generate Table QR codes directly from the dashboard to set up new dining tables.
- **SMS Notifications:** Automated alerts for order status updates via Twilio integrated seamlessly.
- **Transactions & Marketing:** Dedicated panels for analyzing transactions and promotional campaigns.

## 🛠️ Technology Stack

**Frontend:**
- React 19 (via Vite)
- TailwindCSS 4
- React Router DOM 7
- Context API (State Management)
- Axios & React Hot Toast

**Backend:**
- Node.js & Express 5
- MongoDB (via Mongoose)
- Razorpay API (Payments)
- Twilio API (SMS Notifications)
- JSON Web Token (JWT) + Bcrypt (Authentication)
- Multer (Image file uploads)

## 📁 Project Structure

```text
├── backend
│   ├── config/          # Database connection logs & configurations
│   ├── controllers/     # API Business Logic
│   ├── middleware/      # Express middlewares (Authentication, File Upload)
│   ├── models/          # Mongoose Database Schemas (User, Menu, Order)
│   ├── routes/          # Express Routers (authRoute, menuRoute, orderRoute, etc)
│   ├── uploads/         # Uploaded images storage
│   ├── server.js        # Main Entry-Point
│   └── package.json    
└── frontend
    ├── public/          # Static Assets
    ├── src/
    │   ├── assets/      # Image/Icon assets
    │   ├── components/  # Reusable UI components / Layouts
    │   ├── context/     # React ContextProviders
    │   ├── pages/       # Specific application views (Login, Menu, Dashboards)
    │   ├── utils/       # Helper functions
    │   ├── App.jsx      # React router configuration
    │   └── main.jsx     # Frontend entry-point
    ├── vite.config.js   
    └── package.json
```

## ⚙️ Local Development Setup

To run this application locally, ensure you have Node.js and MongoDB installed or specify an Atlas remote database string.

### 1. Backend Setup

Open a terminal and navigate to the `backend` folder:

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory providing necessary secrets (use identical variable names from the codebase constants):
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=your_twilio_number
```

Start the backend server:
```bash
npm run dev
```
*(The backend should start properly on port 5000).*

### 2. Frontend Setup

Open a new terminal and navigate to the `frontend` folder:

```bash
cd frontend
npm install
```

Start the frontend development server:
```bash
npm run dev
```

Your React application should now be accessible locally on Port `5173`. 

## 📦 Deployment considerations
- Make sure to add `.env` keys securely into your hosting provider parameters.
- Provide matching configurations for any allowed CORS origins in the `server.js` matching your actual deployed frontend.
- Provide a `vercel.json` if relying on Vercel deployment.
