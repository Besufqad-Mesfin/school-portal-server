import express from 'express';
import gradeRouter from './gradeRouter.js';

const api = express.Router();

api.use('/grading', gradeRouter);

api.use('/assessment', assessmentRouter);

export default api;
