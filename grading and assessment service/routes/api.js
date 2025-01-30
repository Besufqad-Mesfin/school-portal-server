const express = require('express');
const gradeRouter = require('./gradeRouter');

const api = express.Router();

api.use('/grading', gradeRouter);

module.exports = api;