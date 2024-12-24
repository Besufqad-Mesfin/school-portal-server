// config/db.js
import { Sequelize } from 'sequelize';

// Directly define the database connection parameters
const sequelize = new Sequelize('school', 'root', 'Bb@0939852436', {
  host: 'localhost',       
  dialect: 'mysql',      
  logging: false,    })       

export default sequelize;
