import express from "express";
import { insertAssessment, getAssessmentById, updateAssessmentbyId, updateAssignmentById, updateFinalExamById,updateMidTermById } from "../controllers/assessmentController.js";

const assessmentRouter = express.Router();

// Insert a new assessment
assessmentRouter.post("/insert-assessment", insertAssessment);

// Get assessment by ID
assessmentRouter.get("/getAssessment/:assessmentId", getAssessmentById);

// Update assessment by ID
assessmentRouter.put("/updateAssessment/:assessmentId", updateAssessmentbyId);

// Update assignment by assessment ID
assessmentRouter.patch("/updateAssignment/:assessmentId", updateAssignmentById);

// Update mid-term by assessment ID
assessmentRouter.patch("/updateMidTerm/:assessmentId", updateMidTermById);

// Update final exam by assessment ID
assessmentRouter.patch("/updateFinalExam/:assessmentId", updateFinalExamById);

export default assessmentRouter;
