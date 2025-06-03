// services/judge0Service.js
import axios from 'axios'; // Changed from const axios = require('axios');
import dotenv from 'dotenv'; // Changed from require('dotenv').config();
dotenv.config(); // Call config method

// Configuration for Judge0 Public API (RapidAPI)
const JUDGE0_API_URL = process.env.JUDGE0_API_URL;
const RAPIDAPI_KEY = process.env.RapidAPI_Key;
const RAPIDAPI_HOST = process.env.RapidAPI_Host;

const judge0Api = axios.create({
    baseURL: JUDGE0_API_URL,
    headers: {
        'x-rapidapi-key': RAPIDAPI_KEY,
        'x-rapidapi-host': RAPIDAPI_HOST,
        'Content-Type': 'application/json'
    },
});

const LANGUAGE_IDS = {
    'javascript': 63, // Node.js
    'python': 71,     // Python 3
    'java': 62,       // OpenJDK 17
    'cpp': 54,        // C++ (GCC 9.2.0)
    'c': 50,
    'go': 60,
    'rust': 73
};

async function submitCode(sourceCode, language, stdin, expectedOutput) {
    const language_id = LANGUAGE_IDS[language.toLowerCase()];

    if (!language_id) {
        throw new Error(`Unsupported language: ${language}`);
    }

    const payload = {
        source_code: sourceCode,
        language_id: language_id,
        stdin: stdin,
        expected_output: expectedOutput,
        cpu_time_limit: 2,
        memory_limit: 128000,
    };

    try {
        const response = await judge0Api.post('/submissions?base64_encoded=false&wait=false', payload);
        return response.data;
    } catch (error) {
        console.error('Error submitting code to Judge0:', error.response ? error.response.data : error.message);
        throw new Error('Failed to submit code to Judge0.');
    }
}

async function getSubmissionStatus(token) {
    try {
        const response = await judge0Api.get(`/submissions/${token}?base64_encoded=false&fields=status,stdout,stderr,compile_output,time,memory,token`);
        return response.data;
    } catch (error) {
        console.error('Error fetching submission status from Judge0:', error.response ? error.response.data : error.message);
        throw new Error('Failed to fetch submission status from Judge0.');
    }
}

export { // Changed from module.exports = {
    submitCode,
    getSubmissionStatus,
    LANGUAGE_IDS
};