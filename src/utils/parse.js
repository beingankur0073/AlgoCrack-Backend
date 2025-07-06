// src/utils/judge0Utils.js (or a new file like signatureParsers.js)

/**
 * Parses a C++ function signature string into a structured object.
 * Example input: "std::vector<int> twoSum(std::vector<int>& nums, int target) { }"
 * Example output: {
 * name: "twoSum",
 * returnType: "std::vector<int>",
 * params: [
 * { name: "nums", type: "std::vector<int>" },
 * { name: "target", type: "int" }
 * ]
 * }
 */
export function parseCppSignature(signatureString) {
    // Remove the trailing "{ }" if present
    let cleanedSignature = signatureString.replace(/\s*\{\s*\}\s*$/, '').trim();

    // Regex to match: returnType funcName(params)
    // Group 1: returnType (can contain spaces, e.g., "unsigned long long")
    // Group 2: functionName
    // Group 3: params string
    const regex = /^(.*?)\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\((.*)\)$/;
    const match = cleanedSignature.match(regex);

    if (!match) {
        console.error("Failed to parse C++ signature:", signatureString);
        return null; // Or throw an error
    }

    const returnType = match[1].trim();
    const name = match[2].trim();
    const paramsString = match[3].trim();

    const params = [];
    if (paramsString) {
        // Split parameters by comma, handling nested templates correctly
        // This regex splits by comma, but not if the comma is inside <...>
        const paramRegex = /((?:[^<>,]*)<[^<>]*>|(?:[^<>,]*)),?/g;
        let paramMatch;
        while ((paramMatch = paramRegex.exec(paramsString)) !== null) {
            const fullParam = paramMatch[1].trim();
            if (fullParam) {
                // Split each parameter into type and name (last word is name)
                const parts = fullParam.split(/\s+/);
                const paramName = parts.pop(); // Last word is the name
                const paramType = parts.join(' ').trim(); // Rest is the type
                if (paramName && paramType) {
                    params.push({ name: paramName, type: paramType });
                }
            }
        }
    }

    return {
        name,
        returnType,
        params,
    };
}