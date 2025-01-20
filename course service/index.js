import express from 'express';
import dotenv from 'dotenv';
import api from './routes/api.js';
import sequelize from './config/db.js';  // Import sequelize from db.js

// Load environment variables from .env file
dotenv.config();

// Set the port from environment variables or default to 5000
const PORT = process.env.PORT || 4000;

// Initialize the express application
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Use the router for '/api' route
app.use('/api', api);

// Start the server and sync the database
app.listen(PORT, async () => {
  try {
    // Sync database models
    await sequelize.sync();
    console.log("Database connected and models synced");
  } catch (err) {
    console.error("Error connecting to the database:", err);
  }
  console.log(`Server is running on port ${PORT}`);
});
