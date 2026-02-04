import mongoose from 'mongoose';

// Schema for hidden test cases used by the judge
const testCaseSchema = new mongoose.Schema({
    input: { type: String, default: "" }, 
    expectedOutput: { type: String, default: "" }, 
    isSample: { type: Boolean, default: false }
}); // <--- CHANGED: Removed { _id: false }. Now Mongoose generates an _id for each test case.

const problemSchema = new mongoose.Schema({
    // ... rest of schema remains the same ...
    id: { type: String, required: true, unique: true }, 
    title: { type: String, required: true, unique: true },
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
    description: { type: String, required: true },
    inputFormat: { type: String, required: true },
    outputFormat: { type: String, required: true },
    constraints: [{ type: String }], 
    examples: [
        {
            input: { type: String, default: "" }, 
            output: { type: String, default: "" }, 
            explanation: { type: String }
        }
    ],
    testCases: [testCaseSchema],
    timeLimit: { type: Number, default: 1.0 }, 
    memoryLimit: { type: Number, default: 256 }, 
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Problem', problemSchema);