import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const mongoose = require('mongoose');

const refundSchema = new mongoose.Schema({
    paymentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    status: { type: String, default: 'pending' }, // e.g., 'pending', 'processed'
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Refund', refundSchema);