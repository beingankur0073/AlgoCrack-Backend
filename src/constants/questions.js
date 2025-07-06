// questionsData.js (or whatever you name your import data file)

const Problems =
    [
  {
    "id": "two-sum",
    "title": "Two Sum",
    "difficulty": "Easy",
    "description": "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.",
    "examples": [
      { "input": { "nums": "[2,7,11,15]", "target": 9 }, "output": "[0,1]", "explanation": "Because nums[0] + nums[1] == 9, we return [0, 1]." },
      { "input": { "nums": "[3,2,4]", "target": 6 }, "output": "[1,2]", "explanation": "Because nums[1] + nums[2] == 6, we return [1, 2]." }
    ],
    "testCases": [
      { "input": { "nums": [2, 7, 11, 15], "target": 9 }, "expectedOutput": [0, 1], "isSample": true },
      { "input": { "nums": [3, 2, 4], "target": 6 }, "expectedOutput": [1, 2], "isSample": true },
      { "input": { "nums": [3, 3], "target": 6 }, "expectedOutput": [0, 1], "isSample": false },
      { "input": { "nums": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], "target": 19 }, "expectedOutput": [8, 9], "isSample": false }
    ],
    "constraints": ["2 <= nums.length <= 10⁴", "-10⁹ <= nums[i] <= 10⁹", "-10⁹ <= target <= 10⁹", "Only one valid answer exists."],
    "functionSignatures": {
      "javascript": {
        "signature": "function twoSum(nums, target)",
        "parameters": [{ "name": "nums", "type": "number[]" }, { "name": "target", "type": "number" }],
        "returnType": "number[]"
      },
      "python": {
        "signature": "def twoSum(nums, target):",
        "parameters": [{ "name": "nums", "type": "List[int]" }, { "name": "target", "type": "int" }],
        "returnType": "List[int]"
      },
      "java": {
        "signature": "public int[] twoSum(int[] nums, int target)",
        "parameters": [{ "name": "nums", "type": "int[]" }, { "name": "target", "type": "int" }],
        "returnType": "int[]"
      },
      "cpp": {
        "signature": "std::vector<int> twoSum(std::vector<int>& nums, int target)",
        "parameters": [{ "name": "nums", "type": "std::vector<int>&" }, { "name": "target", "type": "int" }],
        "returnType": "std::vector<int>"
      }
    },
    "boilerplateCode": {
      "javascript": "function twoSum(nums, target) {\n    // Write your code here\n}",
      "python": "def twoSum(nums, target):\n    # Write your code here",
      "java": "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write your code here\n    }\n}",
      "cpp": "class Solution {\npublic:\n    std::vector<int> twoSum(std::vector<int>& nums, int target) {\n        // Write your code here\n    }\n};"
    }
  },
  {
    "id": "valid-parentheses",
    "title": "Valid Parentheses",
    "difficulty": "Easy",
    "description": "Given a string `s` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    "examples": [
      { "input": { "s": "\"()\"" }, "output": "true" },
      { "input": { "s": "\"([)]\"" }, "output": "false" }
    ],
    "testCases": [
      { "input": { "s": "()" }, "expectedOutput": true, "isSample": true },
      { "input": { "s": "([)]" }, "expectedOutput": false, "isSample": true },
      { "input": { "s": "()[]{}" }, "expectedOutput": true, "isSample": false },
      { "input": { "s": "{[()]}" }, "expectedOutput": true, "isSample": false },
      { "input": { "s": "((" }, "expectedOutput": false, "isSample": false }
    ],
    "constraints": ["1 <= s.length <= 10⁴", "s consists of parentheses only"],
    "functionSignatures": {
      "javascript": {
        "signature": "function isValid(s)",
        "parameters": [{ "name": "s", "type": "string" }],
        "returnType": "boolean"
      },
      "python": {
        "signature": "def isValid(s):",
        "parameters": [{ "name": "s", "type": "str" }],
        "returnType": "bool"
      },
      "java": {
        "signature": "public boolean isValid(String s)",
        "parameters": [{ "name": "s", "type": "String" }],
        "returnType": "boolean"
      },
      "cpp": {
        "signature": "bool isValid(string s)",
        "parameters": [{ "name": "s", "type": "string" }],
        "returnType": "bool"
      }
    },
    "boilerplateCode": {
      "javascript": "function isValid(s) {\n    // Write your code here\n}",
      "python": "def isValid(s):\n    # Write your code here",
      "java": "class Solution {\n    public boolean isValid(String s) {\n        // Write your code here\n    }\n}",
      "cpp": "class Solution {\npublic:\n    bool isValid(string s) {\n        // Write your code here\n    }\n};"
    }
  },
  {
    "id": "longest-substring-without-repeating-characters",
    "title": "Longest Substring Without Repeating Characters",
    "difficulty": "Medium",
    "description": "Given a string `s`, find the length of the longest substring without repeating characters.",
    "examples": [
      { "input": { "s": "\"abcabcbb\"" }, "output": "3" },
      { "input": { "s": "\"bbbbb\"" }, "output": "1" }
    ],
    "testCases": [
      { "input": { "s": "abcabcbb" }, "expectedOutput": 3, "isSample": true },
      { "input": { "s": "bbbbb" }, "expectedOutput": 1, "isSample": true },
      { "input": { "s": "pwwkew" }, "expectedOutput": 3, "isSample": false },
      { "input": { "s": "au" }, "expectedOutput": 2, "isSample": false },
      { "input": { "s": " " }, "expectedOutput": 1, "isSample": false }
    ],
    "constraints": ["0 <= s.length <= 5 * 10⁴", "s consists of English letters, digits, symbols and spaces"],
    "functionSignatures": {
      "javascript": {
        "signature": "function lengthOfLongestSubstring(s)",
        "parameters": [{ "name": "s", "type": "string" }],
        "returnType": "number"
      },
      "python": {
        "signature": "def lengthOfLongestSubstring(s):",
        "parameters": [{ "name": "s", "type": "str" }],
        "returnType": "int"
      },
      "java": {
        "signature": "public int lengthOfLongestSubstring(String s)",
        "parameters": [{ "name": "s", "type": "String" }],
        "returnType": "int"
      },
      "cpp": {
        "signature": "int lengthOfLongestSubstring(string s)",
        "parameters": [{ "name": "s", "type": "string" }],
        "returnType": "int"
      }
    },
    "boilerplateCode": {
      "javascript": "function lengthOfLongestSubstring(s) {\n    // Write your code here\n}",
      "python": "def lengthOfLongestSubstring(s):\n    # Write your code here",
      "java": "class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        // Write your code here\n    }\n}",
      "cpp": "class Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        // Write your code here\n    }\n};"
    }
  },
  {
    "id": "merge-two-sorted-lists",
    "title": "Merge Two Sorted Lists",
    "difficulty": "Easy",
    "description": "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists. Return the head of the merged linked list.",
    "examples": [
      { "input": { "l1": "[1,2,4]", "l2": "[1,3,4]" }, "output": "[1,1,2,3,4,4]" },
      { "input": { "l1": "[]", "l2": "[]" }, "output": "[]" },
      { "input": { "l1": "[]", "l2": "[0]" }, "output": "[0]" }
    ],
    "testCases": [
      { "input": { "list1": [1, 2, 4], "list2": [1, 3, 4] }, "expectedOutput": [1, 1, 2, 3, 4, 4], "isSample": true },
      { "input": { "list1": [], "list2": [] }, "expectedOutput": [], "isSample": true },
      { "input": { "list1": [], "list2": [0] }, "expectedOutput": [0], "isSample": true },
      { "input": { "list1": [5], "list2": [1, 2, 4] }, "expectedOutput": [1, 2, 4, 5], "isSample": false },
      { "input": { "list1": [1], "list2": [2] }, "expectedOutput": [1, 2], "isSample": false }
    ],
    "constraints": ["The number of nodes in both lists is in the range [0, 50]", "-100 <= Node.val <= 100"],
    "functionSignatures": {
      "javascript": {
        "signature": "function mergeTwoLists(list1, list2)",
        "parameters": [{ "name": "list1", "type": "ListNode" }, { "name": "list2", "type": "ListNode" }],
        "returnType": "ListNode"
      },
      "python": {
        "signature": "def mergeTwoLists(list1, list2):",
        "parameters": [{ "name": "list1", "type": "Optional[ListNode]" }, { "name": "list2", "type": "Optional[ListNode]" }],
        "returnType": "Optional[ListNode]"
      },
      "java": {
        "signature": "public ListNode mergeTwoLists(ListNode list1, ListNode list2)",
        "parameters": [{ "name": "list1", "type": "ListNode" }, { "name": "list2", "type": "ListNode" }],
        "returnType": "ListNode"
      },
      "cpp": {
        "signature": "ListNode* mergeTwoLists(ListNode* list1, ListNode* list2)",
        "parameters": [{ "name": "list1", "type": "ListNode*" }, { "name": "list2", "type": "ListNode*" }],
        "returnType": "ListNode*"
      }
    },
    "boilerplateCode": {
      "javascript": "/**\n * Definition for singly-linked list.\n * function ListNode(val, next) {\n * this.val = (val===undefined ? 0 : val)\n * this.next = (next===undefined ? null : next)\n * }\n */\n/**\n * @param {ListNode} list1\n * @param {ListNode} list2\n * @return {ListNode}\n */\nfunction mergeTwoLists(list1, list2) {\n    // Write your code here\n}",
      "python": "# Definition for singly-linked list.\n# class ListNode:\n#     def __init__(self, val=0, next=None):\n#         self.val = val\n#         self.next = next\ndef mergeTwoLists(list1, list2):\n    # Write your code here",
      "java": "/**\n * Definition for singly-linked list.\n * public class ListNode {\n * int val;\n * ListNode next;\n * ListNode() {}\n * ListNode(int val) { this.val = val; }\n * ListNode(int val, ListNode next) { this.val = val; this.next = next; }\n * }\n */\nclass Solution {\n    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {\n        // Write your code here\n    }\n}",
      "cpp": "/**\n * Definition for singly-linked list.\n * struct ListNode {\n * int val;\n * ListNode *next;\n * ListNode() : val(0), next(nullptr) {}\n * ListNode(int x) : val(x), next(nullptr) {}\n * ListNode(int x, ListNode *next) : val(x), next(next) {}\n * };\n */\nclass Solution {\npublic:\n    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {\n        // Write your code here\n    }\n};"
    }
  },
  {
    "id": "reverse-integer",
    "title": "Reverse Integer",
    "difficulty": "Easy",
    "description": "Given a signed 32-bit integer `x`, return `x` with its digits reversed. If reversing `x` causes the value to go outside signed 32-bit integer range, return 0.",
    "examples": [
      { "input": { "x": "123" }, "output": "321" },
      { "input": { "x": "-123" }, "output": "-321" }
    ],
    "testCases": [
      { "input": { "x": 123 }, "expectedOutput": 321, "isSample": true },
      { "input": { "x": -123 }, "expectedOutput": -321, "isSample": true },
      { "input": { "x": 120 }, "expectedOutput": 21, "isSample": false },
      { "input": { "x": 0 }, "expectedOutput": 0, "isSample": false },
      { "input": { "x": 2147483647 }, "expectedOutput": 0, "isSample": false }
    ],
    "constraints": ["-2³¹ <= x <= 2³¹ - 1"],
    "functionSignatures": {
      "javascript": {
        "signature": "function reverse(x)",
        "parameters": [{ "name": "x", "type": "number" }],
        "returnType": "number"
      },
      "python": {
        "signature": "def reverse(x):",
        "parameters": [{ "name": "x", "type": "int" }],
        "returnType": "int"
      },
      "java": {
        "signature": "public int reverse(int x)",
        "parameters": [{ "name": "x", "type": "int" }],
        "returnType": "int"
      },
      "cpp": {
        "signature": "int reverse(int x)",
        "parameters": [{ "name": "x", "type": "int" }],
        "returnType": "int"
      }
    },
    "boilerplateCode": {
      "javascript": "function reverse(x) {\n    // Write your code here\n}",
      "python": "def reverse(x):\n    # Write your code here",
      "java": "class Solution {\n    public int reverse(int x) {\n        // Write your code here\n    }\n}",
      "cpp": "class Solution {\npublic:\n    int reverse(int x) {\n        // Write your code here\n    }\n};"
    }
  },
  {
    "id": "container-with-most-water",
    "title": "Container With Most Water",
    "difficulty": "Medium",
    "description": "Given `n` non-negative integers a₁, a₂, ..., aₙ, where each represents a point at coordinate (i, aᵢ). Find two lines that, together with the x-axis, form a container that holds the most water.",
    "examples": [
      { "input": { "height": "[1,8,6,2,5,4,8,3,7]" }, "output": "49" }
    ],
    "testCases": [
      { "input": { "height": [1, 8, 6, 2, 5, 4, 8, 3, 7] }, "expectedOutput": 49, "isSample": true },
      { "input": { "height": [1, 1] }, "expectedOutput": 1, "isSample": false },
      { "input": { "height": [4, 3, 2, 1, 4] }, "expectedOutput": 16, "isSample": false }
    ],
    "constraints": ["n == height.length", "2 <= n <= 10⁵", "0 <= height[i] <= 10⁴"],
    "functionSignatures": {
      "javascript": {
        "signature": "function maxArea(height)",
        "parameters": [{ "name": "height", "type": "number[]" }],
        "returnType": "number"
      },
      "python": {
        "signature": "def maxArea(height):",
        "parameters": [{ "name": "height", "type": "List[int]" }],
        "returnType": "int"
      },
      "java": {
        "signature": "public int maxArea(int[] height)",
        "parameters": [{ "name": "height", "type": "int[]" }],
        "returnType": "int"
      },
      "cpp": {
        "signature": "int maxArea(vector<int>& height)",
        "parameters": [{ "name": "height", "type": "std::vector<int>&" }],
        "returnType": "int"
      }
    },
    "boilerplateCode": {
      "javascript": "function maxArea(height) {\n    // Write your code here\n}",
      "python": "def maxArea(height):\n    # Write your code here",
      "java": "class Solution {\n    public int maxArea(int[] height) {\n        // Write your code here\n    }\n}",
      "cpp": "class Solution {\npublic:\n    int maxArea(vector<int>& height) {\n        // Write your code here\n    }\n};"
    }
  },
  {
    "id": "median-of-two-sorted-arrays",
    "title": "Median of Two Sorted Arrays",
    "difficulty": "Hard",
    "description": "Given two sorted arrays `nums1` and `nums2` of size m and n respectively, return the median of the two sorted arrays.",
    "examples": [
      { "input": { "nums1": "[1,3]", "nums2": "[2]" }, "output": "2.0" },
      { "input": { "nums1": "[1,2]", "nums2": "[3,4]" }, "output": "2.5" }
    ],
    "testCases": [
      { "input": { "nums1": [1, 3], "nums2": [2] }, "expectedOutput": 2.0, "isSample": true },
      { "input": { "nums1": [1, 2], "nums2": [3, 4] }, "expectedOutput": 2.5, "isSample": true },
      { "input": { "nums1": [0, 0], "nums2": [0, 0] }, "expectedOutput": 0.0, "isSample": false },
      { "input": { "nums1": [], "nums2": [1] }, "expectedOutput": 1.0, "isSample": false }
    ],
    "constraints": ["nums1.length == m", "nums2.length == n", "0 <= m, n <= 1000"],
    "functionSignatures": {
      "javascript": {
        "signature": "function findMedianSortedArrays(nums1, nums2)",
        "parameters": [{ "name": "nums1", "type": "number[]" }, { "name": "nums2", "type": "number[]" }],
        "returnType": "number"
      },
      "python": {
        "signature": "def findMedianSortedArrays(nums1, nums2):",
        "parameters": [{ "name": "nums1", "type": "List[int]" }, { "name": "nums2", "type": "List[int]" }],
        "returnType": "float"
      },
      "java": {
        "signature": "public double findMedianSortedArrays(int[] nums1, int[] nums2)",
        "parameters": [{ "name": "nums1", "type": "int[]" }, { "name": "nums2", "type": "int[]" }],
        "returnType": "double"
      },
      "cpp": {
        "signature": "double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2)",
        "parameters": [{ "name": "nums1", "type": "std::vector<int>&" }, { "name": "nums2", "type": "std::vector<int>&" }],
        "returnType": "double"
      }
    },
    "boilerplateCode": {
      "javascript": "function findMedianSortedArrays(nums1, nums2) {\n    // Write your code here\n}",
      "python": "def findMedianSortedArrays(nums1, nums2):\n    # Write your code here",
      "java": "class Solution {\n    public double findMedianSortedArrays(int[] nums1, int[] nums2) {\n        // Write your code here\n    }\n}",
      "cpp": "class Solution {\npublic:\n    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {\n        // Write your code here\n    }\n};"
    }
  },
  {
    "id": "search-in-rotated-sorted-array",
    "title": "Search in Rotated Sorted Array",
    "difficulty": "Medium",
    "description": "You are given a rotated sorted array and a target value. Return the index if the target is found. If not, return -1.",
    "examples": [
      { "input": { "nums": "[4,5,6,7,0,1,2]", "target": 0 }, "output": "4" }
    ],
    "testCases": [
      { "input": { "nums": [4, 5, 6, 7, 0, 1, 2], "target": 0 }, "expectedOutput": 4, "isSample": true },
      { "input": { "nums": [4, 5, 6, 7, 0, 1, 2], "target": 3 }, "expectedOutput": -1, "isSample": false },
      { "input": { "nums": [1], "target": 0 }, "expectedOutput": -1, "isSample": false }
    ],
    "constraints": ["1 <= nums.length <= 5000", "-10⁴ <= nums[i] <= 10⁴"],
    "functionSignatures": {
      "javascript": {
        "signature": "function search(nums, target)",
        "parameters": [{ "name": "nums", "type": "number[]" }, { "name": "target", "type": "number" }],
        "returnType": "number"
      },
      "python": {
        "signature": "def search(nums, target):",
        "parameters": [{ "name": "nums", "type": "List[int]" }, { "name": "target", "type": "int" }],
        "returnType": "int"
      },
      "java": {
        "signature": "public int search(int[] nums, int target)",
        "parameters": [{ "name": "nums", "type": "int[]" }, { "name": "target", "type": "int" }],
        "returnType": "int"
      },
      "cpp": {
        "signature": "int search(vector<int>& nums, int target)",
        "parameters": [{ "name": "nums", "type": "std::vector<int>&" }, { "name": "target", "type": "int" }],
        "returnType": "int"
      }
    },
    "boilerplateCode": {
      "javascript": "function search(nums, target) {\n    // Write your code here\n}",
      "python": "def search(nums, target):\n    # Write your code here",
      "java": "class Solution {\n    public int search(int[] nums, int target) {\n        // Write your code here\n    }\n}",
      "cpp": "class Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        // Write your code here\n    }\n};"
    }
  },
  {
    "id": "climbing-stairs",
    "title": "Climbing Stairs",
    "difficulty": "Easy",
    "description": "You are climbing a staircase. Each time you can either take 1 or 2 steps. Given `n`, how many distinct ways can you climb to the top?",
    "examples": [
      { "input": { "n": "2" }, "output": "2" },
      { "input": { "n": "3" }, "output": "3" }
    ],
    "testCases": [
      { "input": { "n": 2 }, "expectedOutput": 2, "isSample": true },
      { "input": { "n": 3 }, "expectedOutput": 3, "isSample": true },
      { "input": { "n": 1 }, "expectedOutput": 1, "isSample": false },
      { "input": { "n": 4 }, "expectedOutput": 5, "isSample": false }
    ],
    "constraints": ["1 <= n <= 45"],
    "functionSignatures": {
      "javascript": {
        "signature": "function climbStairs(n)",
        "parameters": [{ "name": "n", "type": "number" }],
        "returnType": "number"
      },
      "python": {
        "signature": "def climbStairs(n):",
        "parameters": [{ "name": "n", "type": "int" }],
        "returnType": "int"
      },
      "java": {
        "signature": "public int climbStairs(int n)",
        "parameters": [{ "name": "n", "type": "int" }],
        "returnType": "int"
      },
      "cpp": {
        "signature": "int climbStairs(int n)",
        "parameters": [{ "name": "n", "type": "int" }],
        "returnType": "int"
      }
    },
    "boilerplateCode": {
      "javascript": "function climbStairs(n) {\n    // Write your code here\n}",
      "python": "def climbStairs(n):\n    # Write your code here",
      "java": "class Solution {\n    public int climbStairs(int n) {\n        // Write your code here\n    }\n}",
      "cpp": "class Solution {\npublic:\n    int climbStairs(int n) {\n        // Write your code here\n    }\n};"
    }
  },
  {
    "id": "word-break",
    "title": "Word Break",
    "difficulty": "Medium",
    "description": "Given a string `s` and a dictionary of strings `wordDict`, return true if `s` can be segmented into a space-separated sequence of one or more dictionary words.",
    "examples": [
      { "input": { "s": "\"leetcode\"", "wordDict": "[\"leet\",\"code\"]" }, "output": "true" },
      { "input": { "s": "\"applepenapple\"", "wordDict": "[\"apple\",\"pen\"]" }, "output": "true" }
    ],
    "testCases": [
      { "input": { "s": "leetcode", "wordDict": ["leet", "code"] }, "expectedOutput": true, "isSample": true },
      { "input": { "s": "applepenapple", "wordDict": ["apple", "pen"] }, "expectedOutput": true, "isSample": true },
      { "input": { "s": "catsandog", "wordDict": ["cats", "dog", "sand", "and", "cat"] }, "expectedOutput": false, "isSample": false }
    ],
    "constraints": ["1 <= s.length <= 300", "1 <= wordDict.length <= 1000"],
    "functionSignatures": {
      "javascript": {
        "signature": "function wordBreak(s, wordDict)",
        "parameters": [{ "name": "s", "type": "string" }, { "name": "wordDict", "type": "string[]" }],
        "returnType": "boolean"
      },
      "python": {
        "signature": "def wordBreak(s, wordDict):",
        "parameters": [{ "name": "s", "type": "str" }, { "name": "wordDict", "type": "List[str]" }],
        "returnType": "bool"
      },
      "java": {
        "signature": "public boolean wordBreak(String s, List<String> wordDict)",
        "parameters": [{ "name": "s", "type": "String" }, { "name": "wordDict", "type": "List<String>" }],
        "returnType": "boolean"
      },
      "cpp": {
        "signature": "bool wordBreak(string s, vector<string>& wordDict)",
        "parameters": [{ "name": "s", "type": "string" }, { "name": "wordDict", "type": "std::vector<string>&" }],
        "returnType": "bool"
      }
    },
    "boilerplateCode": {
      "javascript": "function wordBreak(s, wordDict) {\n    // Write your code here\n}",
      "python": "def wordBreak(s, wordDict):\n    # Write your code here",
      "java": "class Solution {\n    public boolean wordBreak(String s, List<String> wordDict) {\n        // Write your code here\n    }\n}",
      "cpp": "class Solution {\npublic:\n    bool wordBreak(string s, vector<string>& wordDict) {\n        // Write your code here\n    }\n};"
    }
  },
  {
    "id": "best-time-to-buy-and-sell-stock",
    "title": "Best Time to Buy and Sell Stock",
    "difficulty": "Easy",
    "description": "Given an array `prices` where prices[i] is the price of a stock on the ith day, find the maximum profit you can achieve. You may complete only one transaction.",
    "examples": [
      { "input": { "prices": "[7,1,5,3,6,4]" }, "output": "5" }
    ],
    "testCases": [
      { "input": { "prices": [7, 1, 5, 3, 6, 4] }, "expectedOutput": 5, "isSample": true },
      { "input": { "prices": [7, 6, 4, 3, 1] }, "expectedOutput": 0, "isSample": false },
      { "input": { "prices": [1, 2] }, "expectedOutput": 1, "isSample": false }
    ],
    "constraints": ["1 <= prices.length <= 10⁵", "0 <= prices[i] <= 10⁴"],
    "functionSignatures": {
      "javascript": {
        "signature": "function maxProfit(prices)",
        "parameters": [{ "name": "prices", "type": "number[]" }],
        "returnType": "number"
      },
      "python": {
        "signature": "def maxProfit(prices):",
        "parameters": [{ "name": "prices", "type": "List[int]" }],
        "returnType": "int"
      },
      "java": {
        "signature": "public int maxProfit(int[] prices)",
        "parameters": [{ "name": "prices", "type": "int[]" }],
        "returnType": "int"
      },
      "cpp": {
        "signature": "int maxProfit(vector<int>& prices)",
        "parameters": [{ "name": "prices", "type": "std::vector<int>&" }],
        "returnType": "int"
      }
    },
    "boilerplateCode": {
      "javascript": "function maxProfit(prices) {\n    // Write your code here\n}",
      "python": "def maxProfit(prices):\n    # Write your code here",
      "java": "class Solution {\n    public int maxProfit(int[] prices) {\n        // Write your code here\n    }\n}",
      "cpp": "class Solution {\npublic:\n    int maxProfit(vector<int>& prices) {\n        // Write your code here\n    }\n};"
    }
  },
  {
    "id": "product-of-array-except-self",
    "title": "Product of Array Except Self",
    "difficulty": "Medium",
    "description": "Given an integer array `nums`, return an array `answer` such that answer[i] is equal to the product of all elements of `nums` except `nums[i]`.",
    "examples": [
      { "input": { "nums": "[1,2,3,4]" }, "output": "[24,12,8,6]" }
    ],
    "testCases": [
      { "input": { "nums": [1, 2, 3, 4] }, "expectedOutput": [24, 12, 8, 6], "isSample": true },
      { "input": { "nums": [-1, 1, 0, -3, 3] }, "expectedOutput": [0, 0, 9, 0, 0], "isSample": false }
    ],
    "constraints": ["2 <= nums.length <= 10⁵", "All elements are non-zero"],
    "functionSignatures": {
      "javascript": {
        "signature": "function productExceptSelf(nums)",
        "parameters": [{ "name": "nums", "type": "number[]" }],
        "returnType": "number[]"
      },
      "python": {
        "signature": "def productExceptSelf(nums):",
        "parameters": [{ "name": "nums", "type": "List[int]" }],
        "returnType": "List[int]"
      },
      "java": {
        "signature": "public int[] productExceptSelf(int[] nums)",
        "parameters": [{ "name": "nums", "type": "int[]" }],
        "returnType": "int[]"
      },
      "cpp": {
        "signature": "vector<int> productExceptSelf(vector<int>& nums)",
        "parameters": [{ "name": "nums", "type": "std::vector<int>&" }],
        "returnType": "std::vector<int>"
      }
    },
    "boilerplateCode": {
      "javascript": "function productExceptSelf(nums) {\n    // Write your code here\n}",
      "python": "def productExceptSelf(nums):\n    # Write your code here",
      "java": "class Solution {\n    public int[] productExceptSelf(int[] nums) {\n        // Write your code here\n    }\n}",
      "cpp": "class Solution {\npublic:\n    vector<int> productExceptSelf(vector<int>& nums) {\n        // Write your code here\n    }\n};"
    }
  },
  {
    "id": "subsets",
    "title": "Subsets",
    "difficulty": "Medium",
    "description": "Given an integer array `nums` of unique elements, return all possible subsets (the power set).",
    "examples": [
      { "input": { "nums": "[1,2,3]" }, "output": "[[3],[1],[2],[1,2,3],[1,3],[2,3],[1,2],[]]" }
    ],
    "testCases": [
      { "input": { "nums": [1, 2, 3] }, "expectedOutput": [[3], [1], [2], [1, 2, 3], [1, 3], [2, 3], [1, 2], []], "isSample": true }
    ],
    "constraints": ["1 <= nums.length <= 10", "-10 <= nums[i] <= 10"],
    "functionSignatures": {
      "javascript": {
        "signature": "function subsets(nums)",
        "parameters": [{ "name": "nums", "type": "number[]" }],
        "returnType": "number[][]"
      },
      "python": {
        "signature": "def subsets(nums):",
        "parameters": [{ "name": "nums", "type": "List[int]" }],
        "returnType": "List[List[int]]"
      },
      "java": {
        "signature": "public List<List<Integer>> subsets(int[] nums)",
        "parameters": [{ "name": "nums", "type": "int[]" }],
        "returnType": "List<List<Integer>>"
      },
      "cpp": {
        "signature": "vector<vector<int>> subsets(vector<int>& nums)",
        "parameters": [{ "name": "nums", "type": "std::vector<int>&" }],
        "returnType": "std::vector<std::vector<int>>"
      }
    },
    "boilerplateCode": {
      "javascript": "function subsets(nums) {\n    // Write your code here\n}",
      "python": "def subsets(nums):\n    # Write your code here",
      "java": "class Solution {\n    public List<List<Integer>> subsets(int[] nums) {\n        // Write your code here\n    }\n}",
      "cpp": "class Solution {\npublic:\n    vector<vector<int>> subsets(vector<int>& nums) {\n        // Write your code here\n    }\n};"
    }
  },
  {
    "id": "permutations",
    "title": "Permutations",
    "difficulty": "Medium",
    "description": "Given an array `nums` of distinct integers, return all possible permutations.",
    "examples": [
      { "input": { "nums": "[1,2,3]" }, "output": "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]" }
    ],
    "testCases": [
      { "input": { "nums": [1, 2, 3] }, "expectedOutput": [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]], "isSample": true }
    ],
    "constraints": ["1 <= nums.length <= 6"],
    "functionSignatures": {
      "javascript": {
        "signature": "function permute(nums)",
        "parameters": [{ "name": "nums", "type": "number[]" }],
        "returnType": "number[][]"
      },
      "python": {
        "signature": "def permute(nums):",
        "parameters": [{ "name": "nums", "type": "List[int]" }],
        "returnType": "List[List[int]]"
      },
      "java": {
        "signature": "public List<List<Integer>> permute(int[] nums)",
        "parameters": [{ "name": "nums", "type": "int[]" }],
        "returnType": "List<List<Integer>>"
      },
      "cpp": {
        "signature": "vector<vector<int>> permute(vector<int>& nums)",
        "parameters": [{ "name": "nums", "type": "std::vector<int>&" }],
        "returnType": "std::vector<std::vector<int>>"
      }
    },
    "boilerplateCode": {
      "javascript": "function permute(nums) {\n    // Write your code here\n}",
      "python": "def permute(nums):\n    # Write your code here",
      "java": "class Solution {\n    public List<List<Integer>> permute(int[] nums) {\n        // Write your code here\n    }\n}",
      "cpp": "class Solution {\npublic:\n    vector<vector<int>> permute(vector<int>& nums) {\n        // Write your code here\n    }\n};"
    }
  },
  {
    "id": "valid-palindrome",
    "title": "Valid Palindrome",
    "difficulty": "Easy",
    "description": "Given a string `s`, return true if it is a palindrome, or false otherwise. Consider only alphanumeric characters and ignore cases.",
    "examples": [
      { "input": { "s": "\"A man, a plan, a canal: Panama\"" }, "output": "true" }
    ],
    "testCases": [
      { "input": { "s": "A man, a plan, a canal: Panama" }, "expectedOutput": true, "isSample": true },
      { "input": { "s": "race a car" }, "expectedOutput": false, "isSample": false },
      { "input": { "s": " " }, "expectedOutput": true, "isSample": false }
    ],
    "constraints": ["1 <= s.length <= 2 * 10⁵"],
    "functionSignatures": {
      "javascript": {
        "signature": "function isPalindrome(s)",
        "parameters": [{ "name": "s", "type": "string" }],
        "returnType": "boolean"
      },
      "python": {
        "signature": "def isPalindrome(s):",
        "parameters": [{ "name": "s", "type": "str" }],
        "returnType": "bool"
      },
      "java": {
        "signature": "public boolean isPalindrome(String s)",
        "parameters": [{ "name": "s", "type": "String" }],
        "returnType": "boolean"
      },
      "cpp": {
        "signature": "bool isPalindrome(string s)",
        "parameters": [{ "name": "s", "type": "string" }],
        "returnType": "bool"
      }
    },
    "boilerplateCode": {
      "javascript": "function isPalindrome(s) {\n    // Write your code here\n}",
      "python": "def isPalindrome(s):\n    # Write your code here",
      "java": "class Solution {\n    public boolean isPalindrome(String s) {\n        // Write your code here\n    }\n}",
      "cpp": "class Solution {\npublic:\n    bool isPalindrome(string s) {\n        // Write your code here\n    }\n};"
    }
  },
  {
    "id": "maximum-depth-of-binary-tree",
    "title": "Maximum Depth of Binary Tree",
    "difficulty": "Easy",
    "description": "Given the root of a binary tree, return its maximum depth.",
    "examples": [
      { "input": { "root": "[3,9,20,null,null,15,7]" }, "output": "3" }
    ],
    "testCases": [
      { "input": { "root": [3, 9, 20, null, null, 15, 7] }, "expectedOutput": 3, "isSample": true },
      { "input": { "root": [1, null, 2] }, "expectedOutput": 2, "isSample": false },
      { "input": { "root": [] }, "expectedOutput": 0, "isSample": false }
    ],
    "constraints": ["The number of nodes is in the range [0, 10⁴]"],
    "functionSignatures": {
      "javascript": {
        "signature": "function maxDepth(root)",
        "parameters": [{ "name": "root", "type": "TreeNode" }],
        "returnType": "number"
      },
      "python": {
        "signature": "def maxDepth(root):",
        "parameters": [{ "name": "root", "type": "Optional[TreeNode]" }],
        "returnType": "int"
      },
      "java": {
        "signature": "public int maxDepth(TreeNode root)",
        "parameters": [{ "name": "root", "type": "TreeNode" }],
        "returnType": "int"
      },
      "cpp": {
        "signature": "int maxDepth(TreeNode* root)",
        "parameters": [{ "name": "root", "type": "TreeNode*" }],
        "returnType": "int"
      }
    },
    "boilerplateCode": {
      "javascript": "/**\n * Definition for a binary tree node.\n * function TreeNode(val, left, right) {\n * this.val = (val===undefined ? 0 : val)\n * this.left = (left===undefined ? null : left)\n * this.right = (right===undefined ? null : right)\n * }\n */\n/**\n * @param {TreeNode} root\n * @return {number}\n */\nfunction maxDepth(root) {\n    // Write your code here\n}",
      "python": "# Definition for a binary tree node.\n# class TreeNode:\n#     def __init__(self, val=0, left=None, right=None):\n#         self.val = val\n#         self.left = left\n#         self.right = right\ndef maxDepth(root):\n    # Write your code here",
      "java": "/**\n * Definition for a binary tree node.\n * public class TreeNode {\n * int val;\n * TreeNode left;\n * TreeNode right;\n * TreeNode() {}\n * TreeNode(int val) { this.val = val; }\n * TreeNode(int val, TreeNode left, TreeNode right) {\n * this.val = val;\n * this.left = left;\n * this.right = right;\n * }\n * }\n */\nclass Solution {\n    public int maxDepth(TreeNode root) {\n        // Write your code here\n    }\n}",
      "cpp": "/**\n * Definition for a binary tree node.\n * struct TreeNode {\n * int val;\n * TreeNode *left;\n * TreeNode *right;\n * TreeNode() : val(0), left(nullptr), right(nullptr) {}\n * TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n * TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}\n * };\n */\nclass Solution {\npublic:\n    int maxDepth(TreeNode* root) {\n        // Write your code here\n    }\n};"
    }
  },
  {
    "id": "diameter-of-binary-tree",
    "title": "Diameter of Binary Tree",
    "difficulty": "Easy",
    "description": "Given the root of a binary tree, return the length of the diameter of the tree. The diameter is the length of the longest path between any two nodes.",
    "examples": [
      { "input": { "root": "[1,2,3,4,5]" }, "output": "3" }
    ],
    "testCases": [
      { "input": { "root": [1, 2, 3, 4, 5] }, "expectedOutput": 3, "isSample": true },
      { "input": { "root": [1, 2] }, "expectedOutput": 1, "isSample": false },
      { "input": { "root": [1, 2, null, 3, null, 4, null, 5] }, "expectedOutput": 4, "isSample": false }
    ],
    "constraints": ["The number of nodes is in the range [1, 10⁴]"],
    "functionSignatures": {
      "javascript": {
        "signature": "function diameterOfBinaryTree(root)",
        "parameters": [{ "name": "root", "type": "TreeNode" }],
        "returnType": "number"
      },
      "python": {
        "signature": "def diameterOfBinaryTree(root):",
        "parameters": [{ "name": "root", "type": "Optional[TreeNode]" }],
        "returnType": "int"
      },
      "java": {
        "signature": "public int diameterOfBinaryTree(TreeNode root)",
        "parameters": [{ "name": "root", "type": "TreeNode" }],
        "returnType": "int"
      },
      "cpp": {
        "signature": "int diameterOfBinaryTree(TreeNode* root)",
        "parameters": [{ "name": "root", "type": "TreeNode*" }],
        "returnType": "int"
      }
    },
    "boilerplateCode": {
      "javascript": "/**\n * Definition for a binary tree node.\n * function TreeNode(val, left, right) {\n * this.val = (val===undefined ? 0 : val)\n * this.left = (left===undefined ? null : left)\n * this.right = (right===undefined ? null : right)\n * }\n */\n/**\n * @param {TreeNode} root\n * @return {number}\n */\nfunction diameterOfBinaryTree(root) {\n    // Write your code here\n}",
      "python": "# Definition for a binary tree node.\n# class TreeNode:\n#     def __init__(self, val=0, left=None, right=None):\n#         self.val = val\n#         self.left = left\n#         self.right = right\ndef diameterOfBinaryTree(root):\n    # Write your code here",
      "java": "/**\n * Definition for a binary tree node.\n * public class TreeNode {\n * int val;\n * TreeNode left;\n * TreeNode right;\n * TreeNode() {}\n * TreeNode(int val) { this.val = val; }\n * TreeNode(int val, TreeNode left, TreeNode right) {\n * this.val = val;\n * this.left = left;\n * this.right = right;\n * }\n * }\n */\nclass Solution {\n    public int diameterOfBinaryTree(TreeNode root) {\n        // Write your code here\n    }\n}",
      "cpp": "/**\n * Definition for a binary tree node.\n * struct TreeNode {\n * int val;\n * TreeNode *left;\n * TreeNode *right;\n * TreeNode() : val(0), left(nullptr), right(nullptr) {}\n * TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n * TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}\n * };\n */\nclass Solution {\npublic:\n    int diameterOfBinaryTree(TreeNode* root) {\n        // Write your code here\n    }\n};"
    }
  },
  {
    "id": "number-of-islands",
    "title": "Number of Islands",
    "difficulty": "Medium",
    "description": "Given a 2D grid map of '1's (land) and '0's (water), return the number of islands.",
    "examples": [
      {
        "input": {
          "grid": [
            ["1", "1", "0", "0", "0"],
            ["1", "1", "0", "0", "0"],
            ["0", "0", "1", "0", "0"],
            ["0", "0", "0", "1", "1"]
          ]
        },
        "output": "3"
      }
    ],
    "testCases": [
      {
        "input": { "grid": [["1", "1", "0", "0", "0"], ["1", "1", "0", "0", "0"], ["0", "0", "1", "0", "0"], ["0", "0", "0", "1", "1"]] },
        "expectedOutput": 3,
        "isSample": true
      },
      {
        "input": { "grid": [["1", "1", "1", "1", "0"], ["1", "1", "0", "1", "0"], ["1", "1", "0", "0", "0"], ["0", "0", "0", "0", "0"]] },
        "expectedOutput": 1,
        "isSample": false
      },
      {
        "input": { "grid": [["0", "0", "0"], ["0", "0", "0"], ["0", "0", "0"]] },
        "expectedOutput": 0,
        "isSample": false
      }
    ],
    "constraints": ["m == grid.length", "n == grid[i].length", "1 <= m, n <= 300"],
    "functionSignatures": {
      "javascript": {
        "signature": "function numIslands(grid)",
        "parameters": [{ "name": "grid", "type": "string[][]" }],
        "returnType": "number"
      },
      "python": {
        "signature": "def numIslands(grid):",
        "parameters": [{ "name": "grid", "type": "List[List[str]]" }],
        "returnType": "int"
      },
      "java": {
        "signature": "public int numIslands(char[][] grid)",
        "parameters": [{ "name": "grid", "type": "char[][]" }],
        "returnType": "int"
      },
      "cpp": {
        "signature": "int numIslands(vector<vector<char>>& grid)",
        "parameters": [{ "name": "grid", "type": "std::vector<std::vector<char>>&" }],
        "returnType": "int"
      }
    },
    "boilerplateCode": {
      "javascript": "function numIslands(grid) {\n    // Write your code here\n}",
      "python": "def numIslands(grid):\n    # Write your code here",
      "java": "class Solution {\n    public int numIslands(char[][] grid) {\n        // Write your code here\n    }\n}",
      "cpp": "class Solution {\npublic:\n    int numIslands(vector<vector<char>>& grid) {\n        // Write your code here\n    }\n};"
    }
  },
  {
    "id": "minimum-path-sum",
    "title": "Minimum Path Sum",
    "difficulty": "Medium",
    "description": "Given a m x n grid filled with non-negative numbers, find a path from top-left to bottom-right that minimizes the sum of all numbers along its path.",
    "examples": [
      {
        "input": {
          "grid": [
            [1, 3, 1],
            [1, 5, 1],
            [4, 2, 1]
          ]
        },
        "output": "7"
      }
    ],
    "testCases": [
      {
        "input": { "grid": [[1, 3, 1], [1, 5, 1], [4, 2, 1]] },
        "expectedOutput": 7,
        "isSample": true
      },
      {
        "input": { "grid": [[1, 2, 3], [4, 5, 6]] },
        "expectedOutput": 12,
        "isSample": false
      }
    ],
    "constraints": ["m == grid.length", "n == grid[i].length", "1 <= m, n <= 200"],
    "functionSignatures": {
      "javascript": {
        "signature": "function minPathSum(grid)",
        "parameters": [{ "name": "grid", "type": "number[][]" }],
        "returnType": "number"
      },
      "python": {
        "signature": "def minPathSum(grid):",
        "parameters": [{ "name": "grid", "type": "List[List[int]]" }],
        "returnType": "int"
      },
      "java": {
        "signature": "public int minPathSum(int[][] grid)",
        "parameters": [{ "name": "grid", "type": "int[][]" }],
        "returnType": "int"
      },
      "cpp": {
        "signature": "int minPathSum(vector<vector<int>>& grid)",
        "parameters": [{ "name": "grid", "type": "std::vector<std::vector<int>>&" }],
        "returnType": "int"
      }
    },
    "boilerplateCode": {
      "javascript": "function minPathSum(grid) {\n    // Write your code here\n}",
      "python": "def minPathSum(grid):\n    # Write your code here",
      "java": "class Solution {\n    public int minPathSum(int[][] grid) {\n        // Write your code here\n    }\n}",
      "cpp": "class Solution {\npublic:\n    int minPathSum(vector<vector<int>>& grid) {\n        // Write your code here\n    }\n};"
    }
  },
  {
    "id": "coin-change",
    "title": "Coin Change",
    "difficulty": "Medium",
    "description": "Given an integer array `coins` and an integer `amount`, return the fewest number of coins needed to make up that amount. If not possible, return -1.",
    "examples": [
      { "input": { "coins": "[1,2,5]", "amount": 11 }, "output": "3" }
    ],
    "testCases": [
      { "input": { "coins": [1, 2, 5], "amount": 11 }, "expectedOutput": 3, "isSample": true },
      { "input": { "coins": [2], "amount": 3 }, "expectedOutput": -1, "isSample": false },
      { "input": { "coins": [1], "amount": 0 }, "expectedOutput": 0, "isSample": false }
    ],
    "constraints": ["1 <= coins.length <= 12", "0 <= amount <= 10⁴"],
    "functionSignatures": {
      "javascript": {
        "signature": "function coinChange(coins, amount)",
        "parameters": [{ "name": "coins", "type": "number[]" }, { "name": "amount", "type": "number" }],
        "returnType": "number"
      },
      "python": {
        "signature": "def coinChange(coins, amount):",
        "parameters": [{ "name": "coins", "type": "List[int]" }, { "name": "amount", "type": "int" }],
        "returnType": "int"
      },
      "java": {
        "signature": "public int coinChange(int[] coins, int amount)",
        "parameters": [{ "name": "coins", "type": "int[]" }, { "name": "amount", "type": "int" }],
        "returnType": "int"
      },
      "cpp": {
        "signature": "int coinChange(vector<int>& coins, int amount)",
        "parameters": [{ "name": "coins", "type": "std::vector<int>&" }, { "name": "amount", "type": "int" }],
        "returnType": "int"
      }
    },
    "boilerplateCode": {
      "javascript": "function coinChange(coins, amount) {\n    // Write your code here\n}",
      "python": "def coinChange(coins, amount):\n    # Write your code here",
      "java": "class Solution {\n    public int coinChange(int[] coins, int amount) {\n        // Write your code here\n    }\n}",
      "cpp": "class Solution {\npublic:\n    int coinChange(vector<int>& coins, int amount) {\n        // Write your code here\n    }\n};"
    }
  },
  {
    "id": "find-peak-element",
    "title": "Find Peak Element",
    "difficulty": "Medium",
    "description": "A peak element is an element that is strictly greater than its neighbors. Given an input array `nums`, return the index of any one of its peak elements.",
    "examples": [
      { "input": { "nums": "[1,2,3,1]" }, "output": "2" }
    ],
    "testCases": [
      { "input": { "nums": [1, 2, 3, 1] }, "expectedOutput": 2, "isSample": true },
      { "input": { "nums": [1, 2, 1, 3, 5, 6, 4] }, "expectedOutput": 5, "isSample": false },
      { "input": { "nums": [1] }, "expectedOutput": 0, "isSample": false }
    ],
    "constraints": ["1 <= nums.length <= 1000", "-2³¹ <= nums[i] <= 2³¹ - 1"],
    "functionSignatures": {
      "javascript": {
        "signature": "function findPeakElement(nums)",
        "parameters": [{ "name": "nums", "type": "number[]" }],
        "returnType": "number"
      },
      "python": {
        "signature": "def findPeakElement(nums):",
        "parameters": [{ "name": "nums", "type": "List[int]" }],
        "returnType": "int"
      },
      "java": {
        "signature": "public int findPeakElement(int[] nums)",
        "parameters": [{ "name": "nums", "type": "int[]" }],
        "returnType": "int"
      },
      "cpp": {
        "signature": "int findPeakElement(vector<int>& nums)",
        "parameters": [{ "name": "nums", "type": "std::vector<int>&" }],
        "returnType": "int"
      }
    },
    "boilerplateCode": {
      "javascript": "function findPeakElement(nums) {\n    // Write your code here\n}",
      "python": "def findPeakElement(nums):\n    # Write your code here",
      "java": "class Solution {\n    public int findPeakElement(int[] nums) {\n        // Write your code here\n    }\n}",
      "cpp": "class Solution {\npublic:\n    int findPeakElement(vector<int>& nums) {\n        // Write your code here\n    }\n};"
    }
  },
  {
    "id": "course-schedule",
    "title": "Course Schedule",
    "difficulty": "Medium",
    "description": "There are a total of `numCourses` courses you have to take, labeled from 0 to numCourses-1. Some courses may have prerequisites. Determine if it is possible to finish all courses.",
    "examples": [
      { "input": { "numCourses": "2", "prerequisites": "[[1,0]]" }, "output": "true" }
    ],
    "testCases": [
      { "input": { "numCourses": 2, "prerequisites": [[1, 0]] }, "expectedOutput": true, "isSample": true },
      { "input": { "numCourses": 2, "prerequisites": [[1, 0], [0, 1]] }, "expectedOutput": false, "isSample": false },
      { "input": { "numCourses": 3, "prerequisites": [[1, 0], [2, 1]] }, "expectedOutput": true, "isSample": false }
    ],
    "constraints": ["1 <= numCourses <= 2000", "0 <= prerequisites.length <= 5000"],
    "functionSignatures": {
      "javascript": {
        "signature": "function canFinish(numCourses, prerequisites)",
        "parameters": [{ "name": "numCourses", "type": "number" }, { "name": "prerequisites", "type": "number[][]" }],
        "returnType": "boolean"
      },
      "python": {
        "signature": "def canFinish(numCourses, prerequisites):",
        "parameters": [{ "name": "numCourses", "type": "int" }, { "name": "prerequisites", "type": "List[List[int]]" }],
        "returnType": "bool"
      },
      "java": {
        "signature": "public boolean canFinish(int numCourses, int[][] prerequisites)",
        "parameters": [{ "name": "numCourses", "type": "int" }, { "name": "prerequisites", "type": "int[][]" }],
        "returnType": "boolean"
      },
      "cpp": {
        "signature": "bool canFinish(int numCourses, vector<vector<int>>& prerequisites)",
        "parameters": [{ "name": "numCourses", "type": "int" }, { "name": "prerequisites", "type": "std::vector<std::vector<int>>&" }],
        "returnType": "bool"
      }
    },
    "boilerplateCode": {
      "javascript": "function canFinish(numCourses, prerequisites) {\n    // Write your code here\n}",
      "python": "def canFinish(numCourses, prerequisites):\n    # Write your code here",
      "java": "class Solution {\n    public boolean canFinish(int numCourses, int[][] prerequisites) {\n        // Write your code here\n    }\n}",
      "cpp": "class Solution {\npublic:\n    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {\n        // Write your code here\n    }\n};"
    }
  },
  {
    "id": "top-k-frequent-elements",
    "title": "Top K Frequent Elements",
    "difficulty": "Medium",
    "description": "Given a non-empty array of integers, return the k most frequent elements.",
    "examples": [
      { "input": { "nums": "[1,1,1,2,2,3]", "k": 2 }, "output": "[1,2]" }
    ],
    "testCases": [
      { "input": { "nums": [1, 1, 1, 2, 2, 3], "k": 2 }, "expectedOutput": [1, 2], "isSample": true },
      { "input": { "nums": [1], "k": 1 }, "expectedOutput": [1], "isSample": false },
      { "input": { "nums": [4, 1, -1, 2, -1, 2, 3], "k": 2 }, "expectedOutput": [-1, 2], "isSample": false }
    ],
    "constraints": ["1 <= k <= nums.length <= 10⁵", "k is in the range [1, the number of unique elements]"],
    "functionSignatures": {
      "javascript": {
        "signature": "function topKFrequent(nums, k)",
        "parameters": [{ "name": "nums", "type": "number[]" }, { "name": "k", "type": "number" }],
        "returnType": "number[]"
      },
      "python": {
        "signature": "def topKFrequent(nums, k):",
        "parameters": [{ "name": "nums", "type": "List[int]" }, { "name": "k", "type": "int" }],
        "returnType": "List[int]"
      },
      "java": {
        "signature": "public int[] topKFrequent(int[] nums, int k)",
        "parameters": [{ "name": "nums", "type": "int[]" }, { "name": "k", "type": "int" }],
        "returnType": "int[]"
      },
      "cpp": {
        "signature": "vector<int> topKFrequent(vector<int>& nums, int k)",
        "parameters": [{ "name": "nums", "type": "std::vector<int>&" }, { "name": "k", "type": "int" }],
        "returnType": "std::vector<int>"
      }
    },
    "boilerplateCode": {
      "javascript": "function topKFrequent(nums, k) {\n    // Write your code here\n}",
      "python": "def topKFrequent(nums, k):\n    # Write your code here",
      "java": "class Solution {\n    public int[] topKFrequent(int[] nums, int k) {\n        // Write your code here\n    }\n}",
      "cpp": "class Solution {\npublic:\n    vector<int> topKFrequent(vector<int>& nums, int k) {\n        // Write your code here\n    }\n};"
    }
  },
  {
    "id": "lru-cache",
    "title": "LRU Cache",
    "difficulty": "Medium",
    "description": "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.",
    "examples": [
      { "input": { "commands": "LRUCache(2), put(1,1), put(2,2), get(1), put(3,3), get(2)" }, "output": "1, -1" }
    ],
    "testCases": [
      {
        "input": {
          "commands": [
            "LRUCache(2)",
            "put(1,1)",
            "put(2,2)",
            "get(1)",
            "put(3,3)",
            "get(2)",
            "put(4,4)",
            "get(1)",
            "get(3)",
            "get(4)"
          ]
        },
        "expectedOutput": [null, null, null, 1, null, -1, null, -1, 3, 4],
        "isSample": true
      }
    ],
    "constraints": ["1 <= capacity <= 3000"],
    "functionSignatures": {
      "javascript": {
        "signature": "class LRUCache { constructor(capacity) { } get(key) { } put(key, value) { } }",
        "parameters": [],
        "returnType": "void"
      },
      "python": {
        "signature": "class LRUCache:\n    def __init__(self, capacity: int):\n        pass\n    def get(self, key: int) -> int:\n        pass\n    def put(self, key: int, value: int) -> None:\n        pass",
        "parameters": [],
        "returnType": "void"
      },
      "java": {
        "signature": "class LRUCache { public LRUCache(int capacity) { } public int get(int key) { } public void put(int key, int value) { } }",
        "parameters": [],
        "returnType": "void"
      },
      "cpp": {
        "signature": "class LRUCache { public: LRUCache(int capacity) { } int get(int key) { } void put(int key, int value) { } };",
        "parameters": [],
        "returnType": "void"
      }
    },
    "boilerplateCode": {
      "javascript": "class LRUCache {\n    constructor(capacity) {\n        // Write your constructor code here\n    }\n\n    get(key) {\n        // Write your get method code here\n    }\n\n    put(key, value) {\n        // Write your put method code here\n    }\n}",
      "python": "class LRUCache:\n    def __init__(self, capacity: int):\n        # Write your constructor code here\n        pass\n\n    def get(self, key: int) -> int:\n        # Write your get method code here\n        pass\n\n    def put(self, key: int, value: int) -> None:\n        # Write your put method code here\n        pass",
      "java": "class LRUCache {\n    public LRUCache(int capacity) {\n        // Write your constructor code here\n    }\n\n    public int get(int key) {\n        // Write your get method code here\n        return -1;\n    }\n\n    public void put(int key, int value) {\n        // Write your put method code here\n    }\n}",
      "cpp": "class LRUCache {\npublic:\n    LRUCache(int capacity) {\n        // Write your constructor code here\n    }\n\n    int get(int key) {\n        // Write your get method code here\n        return -1;\n    }\n\n    void put(int key, int value) {\n        // Write your put method code here\n    }\n};"
    }
  },
  {
    "id": "find-minimum-in-rotated-sorted-array",
    "title": "Find Minimum in Rotated Sorted Array",
    "difficulty": "Medium",
    "description": "Suppose an array of length n sorted in ascending order is rotated between 1 and n times. Find the minimum element.",
    "examples": [
      { "input": { "nums": "[3,4,5,1,2]" }, "output": "1" }
    ],
    "testCases": [
      { "input": { "nums": [3, 4, 5, 1, 2] }, "expectedOutput": 1, "isSample": true },
      { "input": { "nums": [4, 5, 6, 7, 0, 1, 2] }, "expectedOutput": 0, "isSample": false },
      { "input": { "nums": [11, 13, 15, 17] }, "expectedOutput": 11, "isSample": false }
    ],
    "constraints": ["n == nums.length", "1 <= n <= 5000"],
    "functionSignatures": {
      "javascript": {
        "signature": "function findMin(nums)",
        "parameters": [{ "name": "nums", "type": "number[]" }],
        "returnType": "number"
      },
      "python": {
        "signature": "def findMin(nums):",
        "parameters": [{ "name": "nums", "type": "List[int]" }],
        "returnType": "int"
      },
      "java": {
        "signature": "public int findMin(int[] nums)",
        "parameters": [{ "name": "nums", "type": "int[]" }],
        "returnType": "int"
      },
      "cpp": {
        "signature": "int findMin(vector<int>& nums)",
        "parameters": [{ "name": "nums", "type": "std::vector<int>&" }],
        "returnType": "int"
      }
    },
    "boilerplateCode": {
      "javascript": "function findMin(nums) {\n    // Write your code here\n}",
      "python": "def findMin(nums):\n    # Write your code here",
      "java": "class Solution {\n    public int findMin(int[] nums) {\n        // Write your code here\n    }\n}",
      "cpp": "class Solution {\npublic:\n    int findMin(vector<int>& nums) {\n        // Write your code here\n    }\n};"
    }
  },
  {
    "id": "kth-largest-element-in-an-array",
    "title": "Kth Largest Element in an Array",
    "difficulty": "Medium",
    "description": "Find the kth largest element in an unsorted array. Note that it is the kth largest element in the sorted order, not the kth distinct element.",
    "examples": [
      { "input": { "nums": "[3,2,1,5,6,4]", "k": 2 }, "output": "5" }
    ],
    "testCases": [
      { "input": { "nums": [3, 2, 1, 5, 6, 4], "k": 2 }, "expectedOutput": 5, "isSample": true },
      { "input": { "nums": [3, 2, 3, 1, 2, 4, 5, 5, 6], "k": 4 }, "expectedOutput": 4, "isSample": false }
    ],
    "constraints": ["1 <= k <= nums.length <= 10⁴"],
    "functionSignatures": {
      "javascript": {
        "signature": "function findKthLargest(nums, k)",
        "parameters": [{ "name": "nums", "type": "number[]" }, { "name": "k", "type": "number" }],
        "returnType": "number"
      },
      "python": {
        "signature": "def findKthLargest(nums, k):",
        "parameters": [{ "name": "nums", "type": "List[int]" }, { "name": "k", "type": "int" }],
        "returnType": "int"
      },
      "java": {
        "signature": "public int findKthLargest(int[] nums, int k)",
        "parameters": [{ "name": "nums", "type": "int[]" }, { "name": "k", "type": "int" }],
        "returnType": "int"
      },
      "cpp": {
        "signature": "int findKthLargest(vector<int>& nums, int k)",
        "parameters": [{ "name": "nums", "type": "std::vector<int>&" }, { "name": "k", "type": "int" }],
        "returnType": "int"
      }
    },
    "boilerplateCode": {
      "javascript": "function findKthLargest(nums, k) {\n    // Write your code here\n}",
      "python": "def findKthLargest(nums, k):\n    # Write your code here",
      "java": "class Solution {\n    public int findKthLargest(int[] nums, int k) {\n        // Write your code here\n    }\n}",
      "cpp": "class Solution {\npublic:\n    int findKthLargest(vector<int>& nums, int k) {\n        // Write your code here\n    }\n};"
    }
  },
  {
    "id": "lowest-common-ancestor-of-a-binary-tree",
    "title": "Lowest Common Ancestor of a Binary Tree",
    "difficulty": "Medium",
    "description": "Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.",
    "examples": [
      { "input": { "root": "[3,5,1,6,2,0,8,null,null,7,4]", "p": 5, "q": 1 }, "output": "3" }
    ],
    "testCases": [
      { "input": { "root": [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], "p": 5, "q": 1 }, "expectedOutput": 3, "isSample": true },
      { "input": { "root": [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], "p": 5, "q": 4 }, "expectedOutput": 5, "isSample": false }
    ],
    "constraints": ["The number of nodes in the binary tree is in the range [2, 10⁵]"],
    "functionSignatures": {
      "javascript": {
        "signature": "function lowestCommonAncestor(root, p, q)",
        "parameters": [{ "name": "root", "type": "TreeNode" }, { "name": "p", "type": "TreeNode" }, { "name": "q", "type": "TreeNode" }],
        "returnType": "TreeNode"
      },
      "python": {
        "signature": "def lowestCommonAncestor(root, p, q):",
        "parameters": [{ "name": "root", "type": "TreeNode" }, { "name": "p", "type": "TreeNode" }, { "name": "q", "type": "TreeNode" }],
        "returnType": "TreeNode"
      },
      "java": {
        "signature": "public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q)",
        "parameters": [{ "name": "root", "type": "TreeNode" }, { "name": "p", "type": "TreeNode" }, { "name": "q", "type": "TreeNode" }],
        "returnType": "TreeNode"
      },
      "cpp": {
        "signature": "TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q)",
        "parameters": [{ "name": "root", "type": "TreeNode*" }, { "name": "p", "type": "TreeNode*" }, { "name": "q", "type": "TreeNode*" }],
        "returnType": "TreeNode*"
      }
    },
    "boilerplateCode": {
      "javascript": "/**\n * Definition for a binary tree node.\n * function TreeNode(val) {\n * this.val = val;\n * this.left = this.right = null;\n * }\n */\n/**\n * @param {TreeNode} root\n * @param {TreeNode} p\n * @param {TreeNode} q\n * @return {TreeNode}\n */\nfunction lowestCommonAncestor(root, p, q) {\n    // Write your code here\n}",
      "python": "# Definition for a binary tree node.\n# class TreeNode:\n#     def __init__(self, x):\n#         self.val = x\n#         self.left = None\n#         self.right = None\ndef lowestCommonAncestor(root, p, q):\n    # Write your code here",
      "java": "/**\n * Definition for a binary tree node.\n * public class TreeNode {\n * int val;\n * TreeNode left;\n * TreeNode right;\n * TreeNode(int x) { val = x; }\n * }\n */\nclass Solution {\n    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n        // Write your code here\n    }\n}",
      "cpp": "/**\n * Definition for a binary tree node.\n * struct TreeNode {\n * int val;\n * TreeNode *left;\n * TreeNode *right;\n * TreeNode(int x) : val(x), left(NULL), right(NULL) {}\n * };\n */\nclass Solution {\npublic:\n    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {\n        // Write your code here\n    }\n};"
    }
  }
    ];

export default Problems;