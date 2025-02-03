import { Op } from "sequelize";
import Assessment from "../models/assessmentModel.js";

// Insert a new assessment
export const insertAssessment = async (req, res) => {
    try {
        const { courseId, midTerm, finalExam, assignment } = req.body;

        if (!courseId || !midTerm || !finalExam || !assignment) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        const assessment = await Assessment.create({
            courseId,
            midTerm,
            finalExam,
            assignment,
        });

        res.status(201).json({ message: "Assessment inserted successfully", assessment });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get assessment by ID
export const getAssessmentById = async (req, res) => {
    try {
        const assessmentId = req.params.assessmentId;

        if (!assessmentId) {
            return res.status(400).json({ message: "Please provide an assessment ID" });
        }

        const assessment = await Assessment.findOne({
            where: { assessmentId },
        });

        if (!assessment) {
            return res.status(404).json({ message: "Assessment not found" });
        }

        res.status(200).json({ assessment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Update assessment by ID
export const updateAssessmentbyId = async (req, res) => {
    try {
        const assessmentId = req.params.assessmentId;
        const { courseId, midTerm, finalExam, assignment } = req.body;

        if (!assessmentId || !courseId || !midTerm || !finalExam || !assignment) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        const updatedAssessment = await Assessment.update(
            { midTerm, finalExam, assignment },
            {
                where: { [Op.and]: [{ assessmentId }, { courseId }] },
            }
        );

        if (updatedAssessment[0] === 0) {
            return res.status(404).json({ message: "I can't update the assessment" });
        }

        res.status(200).json({ message: "Assessment updated successfully", updatedAssessment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
