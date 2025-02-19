import DepartmentTeacher from '../models/departmentTeachers.js';
import Department from '../models/departmentModel.js';  // Import the Department model

// Controller to create a new department
export const createDepartment = async (req, res) => {
  try {
    const { departmentId, name, headName } = req.body;

    // Create a new department entry
    const newDepartment = await Department.create({
      departmentId,
      name,
      headName,
    });
    console.log("kjhbfn")
    // Send a success response
    res.status(201).json({
      message: 'Department created successfully',
      data: newDepartment
    });
  } catch (error) {
    // Send an error response if something goes wrong
    res.status(500).json({
      message: 'Error creating department',
      error: error.message
    });
  }
};

// Controller to get all departments
export const getDepartments = async (req, res) => {
  try {
    // Fetch all departments from the database
    const departments = await Department.findAll();

    // Send a success response with the list of departments
    res.status(200).json({
      message: 'Departments fetched successfully',
      data: departments
    });
  } catch (error) {
    // Send an error response if something goes wrong
    res.status(500).json({
      message: 'Error fetching departments',
      error: error.message
    });
  }
};

// Controller to get a specific department by its ID
export const getDepartmentById = async (req, res) => {
  try {
    const { departmentId } = req.params;

    // Fetch a specific department by its ID
    const department = await Department.findOne({ where: { departmentId } });

    if (!department) {
      return res.status(404).json({
        message: 'Department not found'
      });
    }

    // Send a success response with the department data
    res.status(200).json({
      message: 'Department fetched successfully',
      data: department
    });
  } catch (error) {
    // Send an error response if something goes wrong
    res.status(500).json({
      message: 'Error fetching department',
      error: error.message
    });
  }
};

// Controller to update a department by its ID
export const updateDepartment = async (req, res) => {
  try {
    const { departmentId } = req.params;
    const { name, headName } = req.body;

    // Find the department by its ID
    const department = await Department.findOne({ where: { departmentId } });

    if (!department) {
      return res.status(404).json({
        message: 'Department not found'
      });
    }

    // Update the department information
    department.name = name || department.name;
    department.headName = headName || department.headName;

    await department.save(); // Save the updated department

    // Send a success response
    res.status(200).json({
      message: 'Department updated successfully',
      data: department
    });
  } catch (error) {
    // Send an error response if something goes wrong
    res.status(500).json({
      message: 'Error updating department',
      error: error.message
    });
  }
};


// Controller to delete a department by its ID
export const deleteDepartment = async (req, res) => {
  try {
    const { departmentId } = req.params;

    // Find the department by its ID
    const department = await Department.findOne({ where: { departmentId } });

    if (!department) {
      return res.status(404).json({
        message: 'Department not found'
      });
    }

    // Delete the department
    await department.destroy();

    // Send a success response
    res.status(200).json({
      message: 'Department deleted successfully'
    });
  } catch (error) {
    // Send an error response if something goes wrong
    res.status(500).json({
      message: 'Error deleting department',
      error: error.message
    });
  }
};

export const assignTeacherToDepartment = async (req, res) => {
  try {
    const { departmentId, teacherId, teacherName } = req.body;

    // Create a new record in DepartmentTeachers
    const assignment = await DepartmentTeacher.create({
      departmentId,
      teacherId,
      teacherName
    });

    res.status(201).json({
      message: 'Teacher assigned to department successfully',
      data: assignment
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error assigning teacher to department',
      error: error.message
    });
  }
};



// Controller to get teachers assigned to a specific department
export const getTeachersByDepartmentId = async (req, res) => {
  try {
    const { departmentId } = req.params;
    const teachers = await DepartmentTeacher.findAll({ where: { departmentId } });

    res.status(200).json({
      message: 'Teachers for department fetched successfully',
      data: teachers
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching teachers for department',
      error: error.message
    });
  }
};

// Controller to remove a teacher from a department
export const removeTeacherFromDepartment = async (req, res) => {
  try {
    const { departmentId, teacherId } = req.params;

    const assignment = await DepartmentTeacher.findOne({
      where: { departmentId, teacherId }
    });

    if (!assignment) {
      return res.status(404).json({ message: 'Teacher not found in department' });
    }

    await assignment.destroy();

    res.status(200).json({ message: 'Teacher removed from department successfully' });
  } catch (error) {
    res.status(500).json({
      message: 'Error removing teacher from department',
      error: error.message
    });
  }
};
