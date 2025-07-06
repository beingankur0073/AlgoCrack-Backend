// models/Problem.js
import mongoose from 'mongoose';

// Define a schema for parameters within a function signature
const parameterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true }
}, { _id: false }); // _id: false prevents Mongoose from adding an _id to subdocuments

// Define a schema for a single language's function signature
const languageSignatureSchema = new mongoose.Schema({
    signature: { type: String, required: true },
    parameters: [parameterSchema],
    returnType: { type: String, required: true }
}, { _id: false });

const testCaseSchema = new mongoose.Schema({
    input: { type: mongoose.Schema.Types.Mixed, required: true }, // Use Mixed for flexible input types
    expectedOutput: { type: mongoose.Schema.Types.Mixed, required: true }, // Use Mixed for flexible output types
    isSample: { type: Boolean, default: false }
});

const problemSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true }, // Added for a consistent problem ID
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
    examples: [
        {
            input: mongoose.Schema.Types.Mixed, // Changed to Mixed
            output: mongoose.Schema.Types.Mixed, // Changed to Mixed
            explanation: String
        }
    ],
    testCases: [testCaseSchema],
  constraints: [{ type: String }], 
    timeLimit: { type: Number, default: 2 },
    memoryLimit: { type: Number, default: 128 },

    // Modified functionSignatures to use the new languageSignatureSchema
    functionSignatures: {
        javascript: languageSignatureSchema,
        python: languageSignatureSchema,
        java: languageSignatureSchema,
        cpp: languageSignatureSchema,
        // Add more languages here if needed
    },

    // New field for boilerplate code
    boilerplateCode: {
        javascript: { type: String },
        python: { type: String },
        java: { type: String },
        cpp: { type: String },
        // Add more languages here if needed
    },

    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Problem', problemSchema);