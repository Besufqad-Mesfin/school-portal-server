import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const DB_HOST = process.env.DB_HOST || "mysql"; // Ensure it matches docker-compose.yml
const DB_NAME = process.env.DB_NAME || "school_portal_user_management_service";
const DB_USER = process.env.DB_USER || "bruk";
const DB_PASSWORD = process.env.DB_PASSWORD || "Bb0939852436";
const DB_DIALECT = process.env.DB_DIALECT || "mysql";

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
  logging: false,
});

// Retry mechanism for database connection
const connectWithRetry = async () => {
  for (let attempt = 1; attempt <= 5; attempt++) {
    try {
      await sequelize.authenticate();
      console.log("✅ Database connection established successfully.");
      return;
    } catch (error) {
      console.error(`⏳ Attempt ${attempt}: Error connecting to database. Retrying in 5 seconds...`, error);
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
  console.error("❌ Could not connect to the database. Exiting.");
  process.exit(1);
};

// Start the database connection
connectWithRetry();

export default sequelize;
