// generateToken.js

require('dotenv').config(); // Load .env variables
const jwt = require('jsonwebtoken');

// Replace this with a real MongoDB _id (as a string)
const userId = '64dbdd8ac3e7eabbf0d70b1a';

// Generate JWT
const token = jwt.sign(
  { userId }, // JWT payload
  process.env.JWT_SECRET, // Must match middleware's secret
  { expiresIn: '1d' } // Token lifespan
);

console.log('\n✅ JWT Token:\n');
console.log(`Bearer ${token}\n`);


