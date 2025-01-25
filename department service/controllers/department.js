import Department from '../models/department.js';  // Import the Department model

// Controller to create a new department
export const createDepartment = async (req, res) => {
  try {
    const { departmentId, name, description } = req.body;

    // Create a new department entry
    const newDepartment = await Department.create({
      departmentId,
      name,
      description
    });

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
    const { name, description } = req.body;

    // Find the department by its ID
    const department = await Department.findOne({ where: { departmentId } });

    if (!department) {
      return res.status(404).json({
        message: 'Department not found'
      });
    }

    // Update the department information
    department.name = name || department.name;
    department.description = description || department.description;

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
