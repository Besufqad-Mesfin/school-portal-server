import express from 'express';
import studentRoute from './studentRoute.js';
import teacherRoute from './teacherRoute.js';
import adminRoute from './adminRoute.js';

const api = express.Router();

api.use('/student', studentRoute);
api.use('/teacher', teacherRoute);
api.use('admin', adminRoute);

export default api;
