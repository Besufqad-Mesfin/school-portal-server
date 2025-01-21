import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

//  import enviroment variable from '.env';
dotenv.config();

// Define the database connection parameters
const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_DIALECT = process.env.DB_DIALECT;

// Directly define the database connection parameters
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,       
  dialect: DB_DIALECT,      
  logging: false,    
})       

export default sequelize;