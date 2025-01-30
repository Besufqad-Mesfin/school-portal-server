import express from "express";
import { insertAssessment, getAssessmentById, updateAssessmentbyId } from "../controllers/assessmentController.js";

const assessmentRouter = express.Router();

// Insert a new assessment
assessmentRouter.post("/insert-assessment", insertAssessment);

// Get assessment by ID
assessmentRouter.get("/getAssessment/:assessmentId", getAssessmentById);

// Update assessment by ID
assessmentRouter.put("/updateAssessment/:assessmentId", updateAssessmentbyId);

export default assessmentRouter;
