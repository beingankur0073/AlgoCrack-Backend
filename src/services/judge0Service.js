import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

// Configuration for Judge0 Public API (RapidAPI)
const JUDGE0_API_URL = process.env.JUDGE0_API_URL;
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
const RAPIDAPI_HOST = process.env.RAPIDAPI_HOST;

const judge0Api = axios.create({
    baseURL: JUDGE0_API_URL,
    headers: {
        'x-rapidapi-key': RAPIDAPI_KEY,
        'x-rapidapi-host': RAPIDAPI_HOST,
        'Content-Type': 'application/json'
    },
});

export const LANGUAGE_IDS = { 
    'javascript': 63, // Node.js
    'python': 71,     // Python 3
    'java': 62,       // OpenJDK 17
    'cpp': 54,        // C++ (GCC 9.2.0)
    'c': 50,
    'go': 60,
    'rust': 73
};

/**
 * Submits code to Judge0.
 * @param {string} sourceCode - The COMPLETE source code (Main function + logic).
 * @param {string} language - The language name (e.g., 'cpp').
 * @param {string} stdin - The raw input string (e.g., "2\n5 10").
 * @param {string} expectedOutput - The raw expected output string.
 */
async function submitCode(sourceCode, language, stdin, expectedOutput, cpuTimeLimit = 2, memoryLimit = 128000) {
    const language_id = LANGUAGE_IDS[language.toLowerCase()];

    if (!language_id) {
        throw new Error(`Unsupported language: ${language}`);
    }

    const payload = {
        source_code: sourceCode, // Send code exactly as user wrote it
        language_id: language_id,
        stdin: stdin,            // Raw string input
        expected_output: expectedOutput, // Raw string output
        cpu_time_limit: cpuTimeLimit,
        memory_limit: memoryLimit,
        redirect_stderr_to_stdout: false // Keep errors separate for better debugging
    };

    try {
        const response = await judge0Api.post('/submissions?base64_encoded=false&wait=false', payload);
        return response.data;
    } catch (error) {
        console.error('Error submitting code to Judge0:', error.response ? error.response.data : error.message);
        throw new Error('Failed to submit code to Judge0.');
    }
}

/**
 * Retrieves the status and results of a Judge0 submission.
 */
async function getSubmissionStatus(token) {
    if (!token) {
        throw new Error('Submission token is required.');
    }

    try {
        const response = await judge0Api.get(
            `/submissions/${token}?base64_encoded=true&fields=status,stdout,stderr,compile_output,time,memory,token`
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching submission status:', error.message);
        throw new Error('Failed to fetch submission status.');
    }
}

/**
 * Decodes a base64 encoded string.
 */
const decodeBase64 = (encodedString) => {
    if (!encodedString) return null;
    try {
        return Buffer.from(encodedString, 'base64').toString('utf8');
    } catch (e) {
        console.error("Error decoding base64:", e);
        return null;
    }
};

// --- SIMPLIFIED WRAPPER LOGIC ---
// Since users write full programs (Standard I/O), we DO NOT wrap their code.
// We pass it through exactly as is.
const createJudge0WrapperCode = (userCode) => {
    return userCode;
};

export {
    submitCode,
    getSubmissionStatus,
    decodeBase64,
    createJudge0WrapperCode
};