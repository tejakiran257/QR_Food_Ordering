Aim: QR Food Ordering System (MERN Stack)
Features
• Restaurant Owner & Customer Flow (JWT Authentication)
• Menu Management (Upload Images & Details)
• Dynamic Cart & Order Management
• Table-specific QR Code Generation
• Online Checkout via Razorpay & Cash Options
• Real-time Order Tracking 
• SMS Notifications via Twilio

Step 1: Install Node.js
Download and install Node.js from:
Node.js
After installation check in terminal:
Bash
node -v
npm -v

Step 2: Create MERN Project
Create Backend (Server)
Bash
mkdir food_court
cd food_court
mkdir backend
cd backend
npm init -y
Install dependencies:
Bash
npm install express mongoose cors dotenv bcrypt jsonwebtoken multer qrcode razorpay twilio

Create Frontend (React)
Open new terminal:
Bash
npm create vite@latest frontend -- --template react
cd frontend
npm install
Install extra dependencies:
Bash
npm install axios react-router-dom react-hot-toast react-icons chart.js react-chartjs-2 @tailwindcss/vite tailwindcss
npm run dev
Your app will run at:
http://localhost:5173

Step 3: Project Structure
food_court/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── UserMenu.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Dashboard.jsx
│   │   ├── components/
│   │   ├── context/
│   │   └── utils/
│   ├── vite.config.js
│   └── package.json
│
├── backend/
│   ├── config/
│   ├── models/
│   │   ├── User.js
│   │   ├── Menu.js
│   │   ├── Order.js
│   ├── routes/
│   │   ├── authRoute.js
│   │   ├── menuRoute.js
│   │   ├── orderRoute.js
│   │   ├── qrRoute.js
│   ├── controllers/
│   │   ├── menuController.js
│   │   ├── qrController.js
│   ├── middleware/
│   ├── server.js
│   └── package.json

Step 4: Create Backend Server
Create server.js
JavaScript
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("Food Court Server Running");
});

app.listen(5000, () => console.log("Server started on port 5000"));

Step 5: Create Database Models (Mongoose Base)
Example Menu data schema:
JavaScript
const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String }, // Saved via Multer
  available: { type: Boolean, default: true }
});

module.exports = mongoose.model('Menu', menuSchema);

Step 6: QR Code Logic
JavaScript
const QRCode = require('qrcode');

exports.generateTableQR = async (req, res) => {
  try {
    const { tableNumber } = req.body;
    const orderUrl = `http://localhost:5173/menu?table=${tableNumber}`;
    const qrCodeDataUrl = await QRCode.toDataURL(orderUrl);
    
    res.json({ success: true, qrCode: qrCodeDataUrl });
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate QR code' });
  }
};

Step 7: Create Menu Display Page (React)
Create UserMenu.jsx
JavaScript
import React, { useState, useEffect } from "react";
import axios from "axios";

function UserMenu() {
 const [menu, setMenu] = useState([]);

 useEffect(() => {
   axios.get("http://localhost:5000/api/menu")
     .then(res => setMenu(res.data))
     .catch(err => console.error(err));
 }, []);

 return (
   <div style={{ textAlign: "center" }}>
     <h2>Digital Food Menu</h2>
     <div className="menu-grid">
       {menu.map((item) => (
         <div key={item._id} className="menu-card">
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>₹{item.price}</p>
            <button>Add to Cart</button>
         </div>
       ))}
     </div>
   </div>
 );
}
export default UserMenu;

Step 8: Update App.jsx
JavaScript
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserMenu from "./pages/UserMenu";
import Cart from "./pages/Cart";

function App() {
 return (
   <BrowserRouter>
     <Routes>
       <Route path="/menu" element={<UserMenu />} />
       <Route path="/cart" element={<Cart />} />
     </Routes>
   </BrowserRouter>
 );
}
export default App;

Step 9: Add Payment & Notifications Display
Example capabilities added:
Payment: Integrated Razorpay Checkout Script during cart finalization.
Tracking: User gets an SMS (Twilio) after successful placement with tracking links.
Display successful status dynamically.

Step 10: Run the Application
Backend:
Bash
npm run dev
Frontend:
Bash
npm run dev
Open: 
http://localhost:5173

Output
The application will display:
Table-based scan flow
Digital dynamic food menu
Cart summary with online (Razorpay) payment or Cash payment options
Order Tracking Screen

Final Summary
This project:
Uses MERN Stack with latest Vite React
Implements digital QR code-based menu system
Generates highly interactive admin interfaces and dashboards
Helps restaurants seamlessly manage orders and online payments
