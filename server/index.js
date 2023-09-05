const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan=require('morgan')
// Load environment variables
dotenv.config();

// Import routes

// Create Express application
const app = express();

// Middleware
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());

// Import routes
const Route = require('./route/Route.js');
// Routes
app.use('/api', Route);

// Connect to MongoDB
mongoose.connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB...');
    // Start the server after successful database connection
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}...`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });