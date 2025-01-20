import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const paymentSchema = sequelize.define({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    status: { type: String, default: 'pending' },
    type: { type: String, required: true }, // e.g., Tuition, Extracurricular
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', paymentSchema);