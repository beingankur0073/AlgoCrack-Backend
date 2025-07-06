// services/judge0Service.js
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

export const LANGUAGE_IDS = { // Exported for use in controllers
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
 * @param {string} sourceCode - The complete source code to be executed.
 * @param {string} language - The human-readable language name (e.g., 'javascript').
 * @param {string} stdin - The input data for the program as a string.
 * @param {string} expectedOutput - The expected output for comparison as a string.
 * @param {number} cpuTimeLimit - CPU time limit in seconds (defaults to 2).
 * @param {number} memoryLimit - Memory limit in KB (defaults to 128000 KB = 128 MB).
 * @returns {object} Judge0 response containing token.
 */
async function submitCode(sourceCode, language, stdin, expectedOutput, cpuTimeLimit = 2, memoryLimit = 128000) {
    const language_id = LANGUAGE_IDS[language.toLowerCase()];

    if (!language_id) {
        throw new Error(`Unsupported language: ${language}`);
    }

    const payload = {
        source_code: sourceCode,
        language_id: language_id,
        // For C++ (and potentially others), stdin and expected_output will now be raw strings
        // formatted by your Node.js code, not JSON strings.
        stdin: stdin, 
        expected_output: expectedOutput, 
        cpu_time_limit: cpuTimeLimit,
        memory_limit: memoryLimit,
        redirect_stderr_to_stdout: true,
        // Add other parameters if needed, like wall_time_limit, enable_network, etc.
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
 * @param {string} token - The submission token from Judge0.
 * @returns {object} Judge0 submission details.
 */
async function getSubmissionStatus(token) {
    if (!token) {
        throw new Error('Submission token is required to get status.');
    }

    try {
        const response = await judge0Api.get(
            `/submissions/${token}?base64_encoded=true&fields=status,stdout,stderr,compile_output,time,memory,token`
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching submission status from Judge0 (Detailed):', {
            message: error.message,
            statusCode: error.response ? error.response.status : 'N/A',
            data: error.response ? error.response.data : 'N/A',
            configUrl: error.config ? error.config.url : 'N/A',
            token: token
        });
        throw new Error('Failed to fetch submission status from Judge0.');
    }
}

/**
 * Decodes a base64 encoded string.
 * @param {string} encodedString - The base64 string to decode.
 * @returns {string|null} The decoded string or null if input is invalid.
 */
const decodeBase64 = (encodedString) => {
    if (!encodedString) return null;
    try {
        return Buffer.from(encodedString, 'base64').toString('utf8');
    } catch (e) {
        console.error("Error decoding base64 string:", e);
        return null;
    }
};

/**
 * Generates the full source code with wrapper for Judge0 execution.
 * This wrapper handles reading input, calling the user's function, and printing output.
 * IMPORTANT: For 'cpp', 'java', 'python' when operating in 'Full Program Submission' mode,
 * this function will return userCode directly, as the user handles I/O and main.
 * For 'javascript', it currently remains 'Function-based submission' with JSON I/O.
 * * @param {string} userCode - The user's submitted code.
 * @param {string} languageName - The human-readable language name (e.g., 'javascript').
 * @param {object} functionSignatures - The problem's functionSignatures object.
 * @param {object} testCaseInput - The input for the current test case (e.g., { nums: [1,2,3] }).
 * @returns {string} The complete source code ready for Judge0.
 */
const createJudge0WrapperCode = (userCode, languageName, functionSignatures, testCaseInput) => {
    let wrapperCode = '';
    const lang = languageName.toLowerCase();
    
    // functionSignatures, parameters, and returnType are now only relevant for
    // languages still operating in 'Function-based Submission' (like JS here).
    // For C++ (Full Program Submission), these are not used by the wrapper.

    switch (lang) {
        case 'javascript':
            // Keeping JS as function-based, so its wrapper remains.
            // It still expects JSON input and produces JSON output.
            const jsSignature = functionSignatures[lang]?.signature;
            const jsParameters = functionSignatures[lang]?.parameters;
            const jsFunctionName = jsSignature.split('(')[0].split(' ').pop();
            
            // This converts the object input (e.g., { nums: [1,2,3] }) into a string
            // that will be placed into stdin for the Judge0 container.
            // The wrapper code within the container will then parse this string.
            const jsInputForWrapper = JSON.stringify(testCaseInput);

            wrapperCode = `
                ${userCode}

                const readline = require('readline');
                const rl = readline.createInterface({
                    input: process.stdin,
                    output: process.stdout
                });

                let inputData = '';
                rl.on('line', (line) => {
                    inputData += line;
                });

                rl.on('close', () => {
                    try {
                        const parsedInput = JSON.parse(inputData);
                        const args = ${JSON.stringify(jsParameters.map(p => p.name))}.map(name => parsedInput[name]);
                        
                        const result = ${jsFunctionName}(...args);
                        console.log(JSON.stringify(result));
                    } catch (e) {
                        console.error("Error executing code:", e.message);
                        console.error(e.stack);
                    }
                });
            `;
            break;
        case 'python':
            // Keeping Python as function-based for now.
            // If you want Python to also be full program submission, this block needs similar modification.
            const pySignature = functionSignatures[lang]?.signature;
            const pyParameters = functionSignatures[lang]?.parameters;
            const pyFunctionName = pySignature.split('(')[0].split(' ').pop();

            wrapperCode = `
import json
import sys

${userCode}

try:
    input_data_raw = sys.stdin.read()
    input_data = json.loads(input_data_raw)
    
    arg_values = []
    arg_names = ${JSON.stringify(pyParameters.map(p => p.name))}
    for name in arg_names:
        arg_values.append(input_data.get(name))

    user_function = globals()["${pyFunctionName}"]
    
    result = user_function(*arg_values)
    print(json.dumps(result))
except Exception as e:
    print(f"Error executing code: {e}", file=sys.stderr)
    import traceback
    traceback.print_exc(file=sys.stderr)
            `;
            break;
        case 'java':
            // Keeping Java as function-based for now.
            // If you want Java to also be full program submission, this block needs similar modification.
            const javaSignature = functionSignatures[lang]?.signature;
            const javaParameters = functionSignatures[lang]?.parameters;
            const javaReturnType = functionSignatures[lang]?.returnType;
            const javaFunctionName = javaSignature.match(/\s(\w+)\(/)[1];

            wrapperCode = `
import java.util.*;
import java.io.*;
import com.fasterxml.jackson.databind.ObjectMapper; // Assuming Jackson for JSON parsing

// User's code (Solution class) will be here
${userCode}

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String jsonInput = reader.readLine(); // Read the entire JSON input line
        reader.close();

        ObjectMapper mapper = new ObjectMapper(); // Jackson ObjectMapper

        try {
            // Map the JSON input to a generic Map or specific DTO if you have one
            Map<String, Object> inputMap = mapper.readValue(jsonInput, new com.fasterxml.jackson.core.type.TypeReference<Map<String, Object>>(){});
            
            Solution sol = new Solution(); // Instantiate the user's solution class
            
            // Dynamically prepare arguments based on the problem's signature
            // This part is crucial and requires careful type handling
            ${javaParameters.map(param => {
                let javaType = param.type;
                let accessMethod = `inputMap.get("${param.name}")`;

                if (javaType.endsWith("[]")) { // Array types
                    javaType = javaType.replace("[]", "");
                    if (javaType === "int") {
                        return `List<Integer> ${param.name}List = (List<Integer>) ${accessMethod};
                                int[] ${param.name} = ${param.name}List.stream().mapToInt(Integer::intValue).toArray();`;
                    } else if (javaType === "double") {
                         return `List<Double> ${param.name}List = (List<Double>) ${accessMethod};
                                double[] ${param.name} = ${param.name}List.stream().mapToDouble(Double::doubleValue).toArray();`;
                    } else { // Generic object arrays or other types
                         return `${param.type} ${param.name} = mapper.convertValue(${accessMethod}, new com.fasterxml.jackson.core.type.TypeReference<${param.type}>(){});`;
                    }
                } else if (javaType.startsWith("List<")) { // List types
                    return `${param.type} ${param.name} = mapper.convertValue(${accessMethod}, new com.fasterxml.jackson.core.type.TypeReference<${param.type}>(){});`;
                } else if (javaType === "int" || javaType === "long" || javaType === "float" || javaType === "double" || javaType === "boolean") {
                    return `${param.type} ${param.name} = (${javaType}) inputMap.get("${param.name}");`;
                } else if (javaType === "String") {
                    return `String ${param.name} = (String) inputMap.get("${param.name}");`;
                } else if (javaType === "TreeNode") { // For tree problems like LCA
                    return `/* Handle TreeNode parsing from input here */ ${param.type} ${param.name} = null; // Placeholder`;
                }
                return `${param.type} ${param.name} = (${param.type}) inputMap.get("${param.name}");`;
            }).join('\n            ')}

            ${javaReturnType} result = sol.${javaFunctionName}(${javaParameters.map(p => p.name).join(', ')});
            
            // Convert result to JSON string
            System.out.println(mapper.writeValueAsString(result));

        } catch (Exception e) {
            System.err.println("Error executing code: " + e.getMessage());
            e.printStackTrace(System.err);
        }
    }
}
            `;
            // NOTE FOR JAVA: This heavily relies on `com.fasterxml.jackson.databind.ObjectMapper`
            // being available on your Judge0 instance. You'll need to confirm that.
            // If not, you'll have to write manual JSON parsing and serialization, which is complex.
            break;
        case 'cpp':
            // **ABSOLUTE MINIMAL FULL PROGRAM SUBMISSION (Option B for C++)**
            // The user's `userCode` is expected to be a complete executable C++ program,
            // including ALL necessary #include directives, a `main` function,
            // and all input/output logic using `std::cin`/`std::cout`.
            // Our system will simply submit the user's code exactly as provided.
            wrapperCode = `${userCode}`;
            break;
        default:
            throw new Error(`No wrapper code defined for language: ${lang}`);
    }

    return wrapperCode;
};

// Export all relevant functions
export {
    submitCode,
    getSubmissionStatus,
    decodeBase64,
    createJudge0WrapperCode
};