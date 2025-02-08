import Department from '../models/department.js';  // Import the Department model
import Teacher from '../models/teacher.js';  // Import the Teacher model
import DepartmentTeachers from '../models/departmentTeacher.js';  // Import the DepartmentTeachers model

// Controller to create a new department
export const createDepartment = async (req, res) => {
  try {
    const { name, description, headId } = req.body;

    // Create a new department entry
    const newDepartment = await Department.create({
      name,
      description,
      headId
    });

    res.status(201).json({
      message: 'Department created successfully',
      data: newDepartment
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating department',
      error: error.message
    });
  }
};

// Controller to get all departments
export const getDepartments = async (req, res) => {
  try {
    const departments = await Department.findAll();

    res.status(200).json({
      message: 'Departments fetched successfully',
      data: departments
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching departments',
      error: error.message
    });
  }
};

// Controller to get a specific department by ID
export const getDepartmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findOne({ where: { id } });

    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }

    res.status(200).json({
      message: 'Department fetched successfully',
      data: department
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching department',
      error: error.message
    });
  }
};

// Controller to update a department by ID
export const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, headId } = req.body;

    const department = await Department.findOne({ where: { id } });

    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }

    department.name = name || department.name;
    department.description = description || department.description;
    department.headId = headId || department.headId;

    await department.save();

    res.status(200).json({
      message: 'Department updated successfully',
      data: department
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating department',
      error: error.message
    });
  }
};

// Controller to delete a department by ID
export const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findOne({ where: { id } });

    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }

    await department.destroy();
    res.status(200).json({ message: 'Department deleted successfully' });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting department',
      error: error.message
    });
  }
};

// Controller to add a teacher to a department
export const addTeacherToDepartment = async (req, res) => {
  try {
    const { departmentId, teacherId } = req.body;
    
    await DepartmentTeachers.create({ departmentId, teacherId });
    res.status(201).json({ message: 'Teacher added to department successfully' });
  } catch (error) {
    res.status(500).json({
      message: 'Error adding teacher to department',
      error: error.message
    });
  }
};

// Controller to get all teachers in a department
export const getDepartmentTeachers = async (req, res) => {
  try {
    const { departmentId } = req.params;

    const teachers = await DepartmentTeachers.findAll({
      where: { departmentId },
      include: [{ model: Teacher }]
    });

    res.status(200).json({
      message: 'Teachers fetched successfully',
      data: teachers
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching teachers',
      error: error.message
    });
  }
};

// Controller to remove a teacher from a department
export const removeTeacherFromDepartment = async (req, res) => {
  try {
    const { departmentId, teacherId } = req.body;
    
    await DepartmentTeachers.destroy({ where: { departmentId, teacherId } });
    res.status(200).json({ message: 'Teacher removed from department successfully' });
  } catch (error) {
    res.status(500).json({
      message: 'Error removing teacher from department',
      error: error.message
    });
  }
};
