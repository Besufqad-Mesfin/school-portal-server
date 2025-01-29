const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

// Define the Grade model

const Grade = sequelize.define("Grade", {
    gradeId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    courseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    assessmentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    mark: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    grade: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    // Timestamps
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
});

module.exports = Grade;