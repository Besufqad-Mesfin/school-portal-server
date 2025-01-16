import express from "express";
import { loginTeacher } from "../controllers/login/teacherLogin.js"; // Adjust the path if necessary
import { changePassword } from "../controllers/passwordChange/teacherPasswordChange.js";
import { teacherLogout } from "../controllers/logout/teacherLogout.js";
const teacherRoute = express.Router();

// POST route for login
teacherRoute.post("/login", loginTeacher);
teacherRoute.post("/change-password", changePassword);
teacherRoute.post("/logout", teacherLogout);

export default teacherRoute;
