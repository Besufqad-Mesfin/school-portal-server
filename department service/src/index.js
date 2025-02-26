import express from 'express';
import dotenv from 'dotenv';
import api from './routes/api.js';
import sequelize from './config/db.js';
import Department from './models/departmentModel.js';
import DepartmentTeacher from './models/departmentTeachers.js';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use('/api', api);

// Sync database models in the correct order
const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected...");

    await Department.sync({ force: true });  // Drops table if exists, recreates
    await DepartmentTeacher.sync({ force: true }); 

    console.log("✅ Tables synced successfully!");
  } catch (error) {
    console.error("❌ Error syncing database:", error);
  }
};

// Start server
app.listen(PORT, async () => {
  await syncDatabase();
  console.log(`🚀 Server is running on port ${PORT}`);
});
