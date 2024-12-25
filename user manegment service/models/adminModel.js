import sequelize from "../config/db";
import { DataTypes } from "sequelize";

const Admin = sequelize.define("Admin", {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

export default Admin;


