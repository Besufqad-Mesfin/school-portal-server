import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const fineSchema = sequelize.define({
    transactionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Transaction', required: true },
    amount: { type: Number, required: true },
    paid: { type: Boolean, default: false },
    dateIssued: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Fine', fineSchema);