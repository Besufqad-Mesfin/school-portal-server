import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './userModel.js';

const Notification = sequelize.define('Notification', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM('due_date_reminder', 'new_arrival'),
        allowNull: false
    }
}, {
    timestamps: true
});

export default Notification;
