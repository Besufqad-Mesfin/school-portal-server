import { Op } from "sequelize";
import Assessment from "../models/assessmentModel.js";

// Insert a new assessment
export const insertAssessment = async (req, res) => {
    try {
        const { courseId, midTerm, finalExam, assignment, studentId } = req.body;

        if (!courseId || !midTerm || !finalExam || !assignment || !studentId) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        const assessment = await Assessment.create({
            courseId,
            midTerm,
            finalExam,
            assignment,
            studentId,
        });

        res.status(201).json({ message: "Assessment inserted successfully", assessment });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Update midTerm by assessment ID
export const updateMidTermById = async (req, res) => {
    try {
        const assessmentId = req.params.assessmentId;
        const { midTerm, studentId } = req.body;

        if (!assessmentId || midTerm === undefined || !studentId) {
            return res.status(400).json({ message: "Please provide assessment ID and midTerm value" });
        }

        const updatedAssessment = await Assessment.update(
            { midTerm },
            { where: {[Op.and]: [{ assessmentId }, {studentId} ]}}
        );

        if (updatedAssessment[0] === 0) {
            return res.status(404).json({ message: "Assessment not found or midTerm not updated" });
        }

        res.status(200).json({ message: "MidTerm updated successfully", updatedAssessment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Update finalExam by assessment ID
export const updateFinalExamById = async (req, res) => {
    try {
        const assessmentId = req.params.assessmentId;
        const { finalExam, studentId } = req.body;

        if (!assessmentId || finalExam === undefined || !studentId) {
            return res.status(400).json({ message: "Please provide assessment ID and finalExam value" });
        }

        const updatedAssessment = await Assessment.update(
            { finalExam },
            { where: {[Op.and]: [{studentId} ,{assessmentId }] }}
        );

        if (updatedAssessment[0] === 0) {
            return res.status(404).json({ message: "Assessment not found or finalExam not updated" });
        }

        res.status(200).json({ message: "FinalExam updated successfully", updatedAssessment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Update assignment by assessment ID
export const updateAssignmentById = async (req, res) => {
    try {
        const assessmentId = req.params.assessmentId;
        const { assignment , studentId} = req.body;

        if (!assessmentId || assignment === undefined || !studentId) {
            return res.status(400).json({ message: "Please provide assessment ID and assignment value" });
        }

        const updatedAssessment = await Assessment.update(
            { assignment },
            { where: {[Op.and]: [{studentId}, {assessmentId } ]}}
        );

        if (updatedAssessment[0] === 0) {
            return res.status(404).json({ message: "Assessment not found or assignment not updated" });
        }

        res.status(200).json({ message: "Assignment updated successfully", updatedAssessment });
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
        const { courseId, midTerm, finalExam, assignment, studentId } =
          req.body;

        if (
          (!assessmentId || !courseId || !midTerm || !finalExam || !assignment || !studentId)
        ) {
          return res
            .status(400)
            .json({ message: "Please provide all required fields" });
        }

        const updatedAssessment = await Assessment.update(
          { midTerm, finalExam, assignment },
          {
            where: {
              [Op.and]: [{ assessmentId }, { courseId }, { studentId }],
            },
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
