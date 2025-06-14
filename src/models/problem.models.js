// models/Problem.js
import mongoose from 'mongoose';

const testCaseSchema = new mongoose.Schema({
    input: { type: String, required: true },
    expectedOutput: { type: String, required: true },
    isSample: { type: Boolean, default: false }
});

const problemSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
    examples: [
        {
            input: String,
            output: String,
            explanation: String
        }
    ],
    testCases: [testCaseSchema],
    constraints: { type: String },
    timeLimit: { type: Number, default: 2 },
    memoryLimit: { type: Number, default: 128 },
    // --- NEW FIELD ADDED HERE ---
    functionSignatures: {
        javascript: { type: String },
        python: { type: String },
        java: { type: String },
        cpp: { type: String },
        // You can add more languages here if needed
    },
    // --- END NEW FIELD ---
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Problem', problemSchema);