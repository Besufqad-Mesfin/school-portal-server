import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

// Define the Grade model

const GradeModel = sequelize.define("Grade", {
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
        validate: {
            min: 0,
            max: 100,
        },
    },
    grade: {
        type: DataTypes.VIRTUAL,
        get() {
            const mark = this.getDataValue('mark');
            if (mark >= 90) return 'A';
            if (mark >= 80) return 'B';
            if (mark >= 70) return 'C';
            if (mark >= 50) return 'D';
            return 'F';
        },
        set(value) {
            throw new Error('Do not try to set the `grade` value!');
        }
    },

    // Timestamps
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
});

export default GradeModel;
