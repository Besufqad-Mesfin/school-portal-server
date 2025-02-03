import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Load environment variables from .env
dotenv.config();

// Extracting the library's connection info (database credentials)
const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_DIALECT = process.env.DB_DIALECT;

// Creating the guidebook (Sequelize connection) to interact with the library (database)
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
  logging: false, // Don't log queries
});

// Exporting the guidebook to be used in other parts of the application
export default sequelize;
