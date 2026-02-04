import mongoose from 'mongoose';

// Stores the raw metadata returned by Judge0 for each individual test case
const judge0SubmissionResultSchema = new mongoose.Schema({
    token: { type: String, required: true },
    testCaseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem.testCases', required: true },
    status: String, // e.g., "Accepted", "Wrong Answer" (Raw Judge0 status description)
    stdout: String, // Decoded standard output
    stderr: String, // Decoded error output
    compile_output: String,
    time: Number,   // Execution time for this specific case
    memory: Number  // Memory used for this specific case
}, { _id: false });

// Stores the simplified result we show to the user
const testCaseResultSchema = new mongoose.Schema({
    testCaseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem.testCases' },
    
    // UPDATED: Use String because Standard I/O inputs are always text blocks
    input: { type: String }, 
    expectedOutput: { type: String },
    
    actualOutput: { type: String }, // User's output
    status: { type: String, enum: ['Passed', 'Failed', 'Error'], default: 'Error' },
    message: String // e.g., "Output mismatch" or "Runtime Error"
}, { _id: false });

const submissionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    problemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem', required: true },
    
    code: { type: String, required: true }, // The full C++/Python/Java source code
    language: { type: String, required: true }, // e.g., "cpp", "python"
    
    // Overall Status for the whole submission
    status: {
        type: String,
        enum: [
            'Pending', 
            'Processing', 
            'Accepted',             // All test cases passed
            'Wrong Answer',         // Logic correct, output wrong
            'Time Limit Exceeded',  // Too slow
            'Memory Limit Exceeded',// Used too much RAM
            'Runtime Error',        // Crashed (segfault, exception)
            'Compilation Error',    // Syntax error
            'Internal Error'        // Judge0 failure
        ],
        default: 'Pending'
    },

    // Aggregated stats (usually max time/memory across all test cases)
    executionTime: { type: Number, default: 0 }, // in seconds
    memoryUsed: { type: Number, default: 0 },    // in KB
    
    // Global errors (e.g., if code fails to compile, it applies to all cases)
    compileOutput: { type: String },
    stderr: { type: String },

    // Detailed results
    judge0Submissions: [judge0SubmissionResultSchema], // Internal tracking tokens
    testCaseResults: [testCaseResultSchema],           // User-facing results

    submittedAt: { type: Date, default: Date.now }
});

// Index for faster queries on user profile (Latest Submissions)
submissionSchema.index({ userId: 1, submittedAt: -1 });
submissionSchema.index({ problemId: 1, submittedAt: -1 });

export default mongoose.model('Submission', submissionSchema);