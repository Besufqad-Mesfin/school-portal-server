import Grade from "../models/gradeModel.js";  // Use import for the Grade model
import { Op } from "sequelize";  // Use import for Sequelize operators


// Insert a new mark and grade
const insertMarkGrade = async (req, res) => {
    try {
        const { studentId, courseId, assessmentId, mark, grade } = req.body;

        if (!studentId || !courseId || !assessmentId || !mark || !grade) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        const studerGrade = await Grade.create();
        res.status(201).json({message: "Grade inserted successfully", grade:studentGrade});

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get grades for a specific student
const getStudentGrades = async (req, res) => {
    try {
        const studentId = req.params.studentId;

        if (!studentId) {
            return res.status(400).json({ message: "Please provide a student ID" });
        }

        const studentGrades = await Grade.findAll({
            where: {
                studentId: studentId,
            },
        });

        if(!studentGrades){
            return res.status(404).json({ message: "No grades found for this student" });
        }

        res.status(200).json({ studentGrades });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// change grade for a specific student
const changeGrade = async (req, res) => {
    try {
        const gradeId = req.params.gradeId;
        const { studentId, assessmentId, courseId, mark, grade } = req.body;

        if (!gradeId || !studentId || !assessmentId || !courseId || !mark || !grade) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        const updatedGrade = await Grade.update({
            mark: mark,
            grade: grade,
        }, {
            where: {
                [Op.and]: [{ gradeId: gradeId }, { studentId: studentId }, { assessmentId: assessmentId }, { courseId: courseId }],
            },
        });

        if (updatedGrade[0] === 0) {
            return res.status(404).json({ message: "I can't update the grade" });
        }

        

        res.status(200).json({ message: "Grade updated successfully", grade: updatedGrade });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export = {
    insertMarkGrade,
    getStudentGrades,
    changeGrade,
};
