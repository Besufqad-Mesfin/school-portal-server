import express from 'express';
import studentRoute from './studentRoute.js';
import teacherRoute from './teacherRoute.js';

const api = express.Router();

api.use('/student', studentRoute);
api.use('/teacher', teacherRoute);

export default api;
