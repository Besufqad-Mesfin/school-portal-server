import Course from '../models/course.js';  // Import the Course model

// Controller to create a new course
export const createCourse = async (req, res) => {
  try {
    const { courseId, name, description, gradeLevel, teacherId } = req.body;

    // Create a new course entry
    const newCourse = await Course.create({
      courseId,
      name,
      description,
      gradeLevel,
      teacherId
    });

    // Send a success response
    res.status(201).json({
      message: 'Course created successfully',
      data: newCourse
    });
  } catch (error) {
    // Send an error response if something goes wrong
    res.status(500).json({
      message: 'Error creating course',
      error: error.message
    });
  }
};

// Controller to get all courses
export const getCourses = async (req, res) => {
  try {
    // Fetch all courses from the database
    const courses = await Course.findAll();

    // Send a success response with the list of courses
    res.status(200).json({
      message: 'Courses fetched successfully',
      data: courses
    });
  } catch (error) {
    // Send an error response if something goes wrong
    res.status(500).json({
      message: 'Error fetching courses',
      error: error.message
    });
  }
};

// Controller to get a specific course by its ID
export const getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;

    // Fetch a specific course by its ID
    const course = await Course.findOne({ where: { courseId } });

    if (!course) {
      return res.status(404).json({
        message: 'Course not found'
      });
    }

    // Send a success response with the course data
    res.status(200).json({
      message: 'Course fetched successfully',
      data: course
    });
  } catch (error) {
    // Send an error response if something goes wrong
    res.status(500).json({
      message: 'Error fetching course',
      error: error.message
    });
  }
};

// Controller to update a course by its ID
export const updateCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { name, description, gradeLevel, teacherId } = req.body;

    // Find the course by its ID
    const course = await Course.findOne({ where: { courseId } });

    if (!course) {
      return res.status(404).json({
        message: 'Course not found'
      });
    }

    // Update the course information
    course.name = name || course.name;
    course.description = description || course.description;
    course.gradeLevel = gradeLevel || course.gradeLevel;
    course.teacherId = teacherId || course.teacherId;

    await course.save(); // Save the updated course

    // Send a success response
    res.status(200).json({
      message: 'Course updated successfully',
      data: course
    });
  } catch (error) {
    // Send an error response if something goes wrong
    res.status(500).json({
      message: 'Error updating course',
      error: error.message
    });
  }
};

// Controller to delete a course by its ID
export const deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    // Find the course by its ID
    const course = await Course.findOne({ where: { courseId } });

    if (!course) {
      return res.status(404).json({
        message: 'Course not found'
      });
    }

    // Delete the course
    await course.destroy();

    // Send a success response
    res.status(200).json({
      message: 'Course deleted successfully'
    });
  } catch (error) {
    // Send an error response if something goes wrong
    res.status(500).json({
      message: 'Error deleting course',
      error: error.message
    });
  }
};
