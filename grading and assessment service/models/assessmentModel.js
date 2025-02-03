import sequelize from "../config/db.js";  // Use import for the sequelize instance
import { DataTypes } from "sequelize";  // Use import for DataTypes

const Assessment = sequelize.define("Assessment", {
  assessmentId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  courseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  midTerm: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  finalExam: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  assignment: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },

  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

export default Assessment;
