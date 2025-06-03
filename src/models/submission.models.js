// models/Submission.js
import mongoose from 'mongoose'; // Changed from const mongoose = require('mongoose');

const judge0SubmissionResultSchema = new mongoose.Schema({
    token: { type: String, required: true },
    testCaseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem.testCases', required: true },
    status: String,
    stdout: String,
    stderr: String,
    compile_output: String,
    time: Number,
    memory: Number
});

const testCaseResultSchema = new mongoose.Schema({
    testCaseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem.testCases' },
    input: String,
    expectedOutput: String,
    actualOutput: String,
    status: { type: String, enum: ['Passed', 'Failed', 'Error'], default: 'Error' },
    message: String
});

const submissionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    problemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem', required: true },
    code: { type: String, required: true },
    language: { type: String, required: true },
    status: {
        type: String,
        enum: ['Pending', 'Processing', 'Accepted', 'Wrong Answer', 'Time Limit Exceeded', 'Memory Limit Exceeded', 'Runtime Error', 'Compilation Error', 'Internal Error'],
        default: 'Pending'
    },
    judge0Submissions: [judge0SubmissionResultSchema],
    executionTime: { type: Number },
    memoryUsed: { type: Number },
    compileOutput: { type: String },
    stderr: { type: String },
    testCaseResults: [testCaseResultSchema],
    submittedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Submission', submissionSchema); 