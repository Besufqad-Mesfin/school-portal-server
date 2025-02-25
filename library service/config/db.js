import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const DB_HOST = process.env.DB_HOST || "localhost";
const DB_NAME = process.env.DB_NAME || "mock";
const DB_USER = process.env.DB_USER || "root";
const DB_PASSWORD = process.env.DB_PASSWORD || "root";
const DB_DIALECT = process.env.DB_DIALECT || "mysql";

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
  logging: false,
});

// Retry mechanism for database connection
const connectWithRetry = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Error connecting to the database:', error);
    setTimeout(connectWithRetry, 5000); // Retry after 5 seconds
  }
};

// Start the database connection
connectWithRetry();

export default sequelize;