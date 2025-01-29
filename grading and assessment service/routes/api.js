const express = require('express');
const gradeRouter = require('./gradeRouter');
const assessmentRouter = require('./assessmentRouter');

const api = express.Router();

api.use('/grading', gradeRouter);

api.use('/assessment', assessmentRouter);

module.exports = api;