import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const notificationSchema = sequelize.define({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    type: { type: String, required: true }, // e.g., 'reminder', 'alert'
    status: { type: String, default: 'unread' }, // e.g., 'read', 'unread'
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notification', notificationSchema);