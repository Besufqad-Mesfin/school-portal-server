// notificationService/models/Notification.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Notification = sequelize.define('Notification', {
    notificationId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    studentId: {
        type: DataTypes.UUID,
        allowNull: true,
    },
    teacherId: {
        type: DataTypes.UUID,
        allowNull: true,
    },
    adminId: {
        type: DataTypes.UUID,
        allowNull: true,
    },
    type: {
        type: DataTypes.ENUM('grade', 'announcement', 'assignment', 'alert'),
        allowNull: false,
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('unread', 'read'),
        defaultValue: 'unread',
    },
}, {
    timestamps: true,
});

export default Notification;
