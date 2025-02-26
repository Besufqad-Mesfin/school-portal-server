import express from 'express';
import dotenv from 'dotenv';
import api from './routes/api.js';
import sequelize from './config/db.js'; 
dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.json());

app.use('/api', api);

app.listen(PORT, async () => {
  try {
    await sequelize.sync();
    console.log("Database connected and models synced");
  } catch (err) {
    console.error("Error connecting to the database:", err);
  }
  console.log(`Server is running on port ${PORT}`);
});
