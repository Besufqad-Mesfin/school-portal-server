import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

//  import enviroment variable from '.env';
dotenv.config();
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_NAME = process.env.DB_NAME || "mock"; // Fix here
const DB_USER = process.env.DB_USER || "root";
const DB_PASSWORD = process.env.DB_PASSWORD || "root";
const DB_DIALECT = process.env.DB_DIALECT || "mysql"; // Explicitly set dialect

// Directly define the database connection parameters
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,       
  dialect: DB_DIALECT, // Explicitly specify MySQL as the dialect
  logging: false,    
})       

export default sequelize;



