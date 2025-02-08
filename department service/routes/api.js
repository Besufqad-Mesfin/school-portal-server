import express from 'express';
import adminRoute from './departmentRoute.js';

const api = express.Router();

api.use('/student', studentRoute);
api.use('/teacher', teacherRoute);
api.use('/admin', adminRoute);

export default api;