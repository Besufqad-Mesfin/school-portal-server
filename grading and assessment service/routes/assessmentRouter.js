const express = require("express");
const {insertAssessment, getAssessmentById, updateAssessmentbyId} = require("../controllers/assessmentController");

const assessmentRouter = express.Router();

// Insert a new assessment
assessmentRouter.post("/insert-assessment", insertAssessment);

// Get assessment by ID
assessmentRouter.get("/getAssessment/:assessmentId", getAssessmentById);

// Update assessment by ID
assessmentRouter.put("/updateAssessment/:assessmentId", updateAssessmentbyId);

module.exports = assessmentRouter;
