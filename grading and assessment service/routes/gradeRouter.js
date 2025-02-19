import express from "express";
import { insertMarkGrade, getStudentGrades, changeGrade } from "../controllers/gradeController.js";

const gradeRouter = express.Router();

// Insert a new mark and grade
gradeRouter.post("/insert-mark-grade", insertMarkGrade);

// Get grades for a specific student
gradeRouter.get("/student/:studentId", getStudentGrades);

// Handle grade change requests
gradeRouter.put("/grade-change/:gradeId", changeGrade);

export default gradeRouter;
