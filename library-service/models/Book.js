import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const bookSchema =sequelize.define({
    title: { type: String, required: true },
    author: { type: String, required: true },
    isbn: { type: String, required: true, unique: true },
    availableCopies: { type: Number, default: 1 },
    totalCopies: { type: Number, required: true }
});

module.exports = mongoose.model('Book', bookSchema);