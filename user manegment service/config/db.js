// config/db.js
import { Sequelize } from 'sequelize';

// Directly define the database connection parameters
const sequelize = new Sequelize('your_database_name', 'your_username', 'your_password', {
  host: 'localhost',        // Database host (e.g., 'localhost' or IP address)
  dialect: 'mysql',      // Database dialect (e.g., 'postgres', 'mysql', 'sqlite')
  logging: false,           // Optional: Disable logging SQL queries
});

export default sequelize;
