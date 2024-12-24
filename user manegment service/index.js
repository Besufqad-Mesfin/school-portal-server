// index.js
import express from 'express';
import router from './routes/route.js';
import sequelize from './config/db.js';  // Import sequelize from db.js

const PORT = 5000;
const app = express();

// Use the router for '/login' route
app.use('/login', router);

// Sync database
sequelize.sync()
  .then(() => {
    console.log('Database connected and models synced');
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
