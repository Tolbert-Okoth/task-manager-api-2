const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// ✅ Security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');

// ✅ Logging
const morgan = require('morgan');

// ✅ Load environment variables
dotenv.config();

// ✅ Connect to MongoDB
connectDB();

const app = express();

// ✅ Logging middleware (only in development)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ✅ Security Middleware
app.use(helmet());           // Secure HTTP headers
app.use(cors());             // Enable CORS
app.use(xss());              // Prevent XSS attacks
app.use(mongoSanitize());   // Prevent NoSQL injection

// ✅ Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,                 // Limit each IP to 100 requests per window
  message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter);

// ✅ Parse JSON body
app.use(express.json());

// ✅ Routes
const taskRoutes = require('./routes/tasks');
const authRoutes = require('./routes/auth');

app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);

// ✅ 404 Handler (if no route matched)
app.use((req, res, next) => {
  res.status(404);
  next(new Error(`🔍 Not Found - ${req.originalUrl}`));
});

// ✅ Centralized Error Handler
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

// ✅ Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
