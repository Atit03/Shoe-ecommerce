const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require("cors");
const userRoutes = require('./routes/userRoutes');


// Cấu hình dotenv
dotenv.config();

// Khởi tạo ứng dụng Express
const app = express();

// Kết nối cơ sở dữ liệu
connectDB();

// Sử dụng CORS
app.use(cors());

// Middleware cho JSON
app.use(express.json());
app.use('/api/auth', userRoutes); // Định nghĩa route cho auth

// Cổng
const PORT = process.env.PORT || 5000;

// Khởi động server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
