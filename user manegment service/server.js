import express from 'express';
import sequelize from './config/db.js'; // Import DB connection
import studentRoutes from './routes/studentRegisterRoutes.js'; // Import student routes
const app = express();
app.use(express.json()); // Parse incoming JSON requests

// Use student routes
app.use('/api/students', studentRoutes);

// Start the server
const PORT = 3000;
app.listen(PORT, async () => {
  try {
    // Test DB connection
    await sequelize.authenticate();
    console.log('Database connected successfully!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  console.log(`Server is running on http://localhost:${PORT}`);
});
