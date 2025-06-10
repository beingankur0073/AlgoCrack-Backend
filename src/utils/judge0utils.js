// src/utils/judge0Utils.js

// This mapping should ideally come from your backend's problem setup,
// or be consistent with what Judge0 service expects.
// It maps your language strings to Judge0's numeric language IDs.
const JUDGE0_LANGUAGE_IDS = {
    javascript: 63, // Node.js
    python: 71,     // Python 3
    cpp: 54,        // C++ (GCC)
    java: 62,       // Java
    // Add other languages as you support them
};

/**
 * Generates the full source code string by wrapping user's code with necessary boilerplate
 * (includes, main function, input/output handling) for Judge0 execution.
 * @param {string} userCode - The user's submitted function code.
 * @param {number} languageId - The Judge0 numeric ID for the language.
 * @param {object} functionSignatures - Object containing problem's function name and params (e.g., { name: "climbStairs", params: ["n"] }).
 * @param {string} testCaseInput - The input string for the current test case.
 * @returns {string} The complete source code ready for Judge0.
 */
export async function createJudge0WrapperCode(userCode, languageId, functionSignatures, testCaseInput) {
    let wrapperCode = '';
    // Extract function name from the function signature string for the current language
    let functionSignature = functionSignatures[Object.keys(JUDGE0_LANGUAGE_IDS).find(key => JUDGE0_LANGUAGE_IDS[key] === languageId)];
    let functionNameMatch = functionSignature && functionSignature.match(/([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/);
    const functionName = functionNameMatch ? functionNameMatch[1] : "unknownFunction";
    
    const inputParamType = functionSignatures.params && functionSignatures.params.length > 0 ? functionSignatures.params[0] : 'int'; // Basic assumption, refine as needed

    switch (languageId) {
        case JUDGE0_LANGUAGE_IDS.cpp: // C++ (GCC)
            wrapperCode = `
                #include <iostream>
                #include <string>
                #include <vector>
                #include <algorithm>
                // Add any other standard library headers if common or required by problems
                // e.g., #include <cmath>, #include <map>, #include <set>

                // --- USER'S SOLUTION CODE ---
                ${userCode}

                // --- MAIN EXECUTION LOGIC ---
                int main() {
                    // This part needs to parse testCaseInput dynamically based on problem's input format.
                    // For now, assuming a single integer input for 'climbStairs'.
                    int input_val;
                    std::cin >> input_val; // Read integer from stdin

                    // Call the user's function
                    ${inputParamType} result = ${functionName}(input_val);

                    // Print the result to stdout
                    std::cout << result << std::endl;

                    return 0;
                }
            `;
            break;

        case JUDGE0_LANGUAGE_IDS.javascript: // JavaScript (Node.js)
            wrapperCode = `
                // --- USER'S SOLUTION CODE ---
                ${userCode}

                // --- MAIN EXECUTION LOGIC ---
                const readline = require('readline');
                const rl = readline.createInterface({
                    input: process.stdin,
                    output: process.stdout
                });

                let inputLines = [];
                rl.on('line', (line) => {
                    inputLines.push(line);
                });

                rl.on('close', () => {
                    // Assuming a single integer input for 'climbStairs'
                    const input_val = parseInt(inputLines[0]);

                    // Call the user's function
                    const result = ${functionName}(input_val);

                    // Print the result
                    console.log(result);
                });
            `;
            break;

        case JUDGE0_LANGUAGE_IDS.python: // Python 3
            wrapperCode = `
                import sys

                # --- USER'S SOLUTION CODE ---
                ${userCode}

                # --- MAIN EXECUTION LOGIC ---
                # Assuming a single integer input for 'climbStairs'
                input_val = int(sys.stdin.readline().strip())

                # Call the user's function
                result = ${functionName}(input_val)

                # Print the result
                print(result)
            `;
            break;

        case JUDGE0_LANGUAGE_IDS.java: // Java
            wrapperCode = `
                import java.util.Scanner;

                // --- USER'S SOLUTION CODE (assuming a class named Solution containing the method) ---
                // For Java, the user often submits just the method. We wrap it in a class.
                class Solution {
                    ${userCode}
                }

                // --- MAIN EXECUTION LOGIC ---
                public class Main {
                    public static void main(String[] args) {
                        Scanner scanner = new Scanner(System.in);
                        // Assuming a single integer input for 'climbStairs'
                        int input_val = scanner.nextInt();

                        // Create an instance of the Solution class to call the user's method
                        Solution sol = new Solution();
                        int result = sol.${functionName}(input_val);

                        System.out.println(result);
                        scanner.close();
                    }
                }
            `;
            break;

        default:
            console.warn(`No specific wrapper for language ID ${languageId}. Sending user code directly.`);
            wrapperCode = userCode;
            break;
    }
    return wrapperCode;
}