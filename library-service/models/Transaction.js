import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const transactionSchema = sequelize.define({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    dateBorrowed: { type: Date, default: Date.now },
    dueDate: { type: Date, required: true },
    returnDate: { type: Date }
});

module.exports = mongoose.model('Transaction', transactionSchema);