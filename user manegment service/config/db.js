import { Sequelize } from 'sequelize';

// Use SQLite in-memory for testing
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:',  // In-memory database
  logging: false,  // Disable SQL query logging
});

export default sequelize;
