import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

// Notification Schema
const Notification = sequelize.define('Notification', {
    notificationId: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    recipients: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
    },
    role: {
        type: DataTypes.ENUM('student', 'teacher', 'admin', 'all'),
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM('in-app', 'email', 'sms', 'assignment', 'grade', 'alert', 'announcement'),
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('sent', 'read', 'unread', 'deleted'),
        defaultValue: 'unread',
    },
    metadata: {
        type: DataTypes.JSONB, // To store additional data like grade details, assignment info, etc.
        allowNull: true,
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
}, {
    timestamps: true,
    tableName: 'notifications'
});

// User Settings Schema
const UserSettings = sequelize.define('UserSettings', {
    userId: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    email: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    inApp: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    sms: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
}, {
    timestamps: true,
    tableName: 'user_settings'
});

export { Notification, UserSettings };
