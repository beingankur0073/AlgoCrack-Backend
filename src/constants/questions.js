// questionsData.js (or whatever you name your import data file)

const Problems = [
    {
        title: "Two Sum",
        difficulty: "Easy",
        description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to target.",
        examples: [
            { input: "nums = [2,7,11,15], target = 9", output: "[0,1]" },
            { input: "nums = [3,2,4], target = 6", output: "[1,2]" },
        ],
        testCases: [
            { input: "[2,7,11,15]\n9", expectedOutput: "[0,1]", isSample: true },
            { input: "[3,2,4]\n6", expectedOutput: "[1,2]", isSample: true },
            { input: "[3,3]\n6", expectedOutput: "[0,1]", isSample: false },
            { input: "[1,2,3,4,5,6,7,8,9,10]\n19", expectedOutput: "[8,9]", isSample: false }
        ],
        constraints: "2 <= nums.length <= 10⁴, -10⁹ <= nums[i] <= 10⁹, -10⁹ <= target <= 10⁹",
        functionSignatures: {
            javascript: "function twoSum(nums, target) { }",
            python: "def twoSum(nums, target):",
            java: "public int[] twoSum(int[] nums, int target) { }",
            cpp: "vector<int> twoSum(vector<int>& nums, int target) { }",
        },
    },
    {
        title: "Valid Parentheses",
        difficulty: "Easy",
        description: "Given a string `s` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
        examples: [
            { input: 's = "()"', output: "true" },
            { input: 's = "([)]"', output: "false" },
        ],
        testCases: [
            { input: "()", expectedOutput: "true", isSample: true },
            { input: "([)]", expectedOutput: "false", isSample: true },
            { input: "()[]{}", expectedOutput: "true", isSample: false },
            { input: "{[()]}", expectedOutput: "true", isSample: false },
            { input: "((", expectedOutput: "false", isSample: false }
        ],
        constraints: "1 <= s.length <= 10⁴, s consists of parentheses only",
        functionSignatures: {
            javascript: "function isValid(s) { }",
            python: "def isValid(s):",
            java: "public boolean isValid(String s) { }",
            cpp: "bool isValid(string s) { }",
        },
    },
    {
        title: "Longest Substring Without Repeating Characters",
        difficulty: "Medium",
        description: "Given a string `s`, find the length of the longest substring without repeating characters.",
        examples: [
            { input: 's = "abcabcbb"', output: "3" },
            { input: 's = "bbbbb"', output: "1" },
        ],
        testCases: [
            { input: "abcabcbb", expectedOutput: "3", isSample: true },
            { input: "bbbbb", expectedOutput: "1", isSample: true },
            { input: "pwwkew", expectedOutput: "3", isSample: false },
            { input: "au", expectedOutput: "2", isSample: false },
            { input: " ", expectedOutput: "1", isSample: false }
        ],
        constraints: "0 <= s.length <= 5 * 10⁴, s consists of English letters, digits, symbols and spaces",
        functionSignatures: {
            javascript: "function lengthOfLongestSubstring(s) { }",
            python: "def lengthOfLongestSubstring(s):",
            java: "public int lengthOfLongestSubstring(String s) { }",
            cpp: "int lengthOfLongestSubstring(string s) { }",
        },
    },
    {
        title: "Merge Two Sorted Lists",
        difficulty: "Easy",
        description: "You are given the heads of two sorted linked lists list1 and list2.Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.Return the head of the merged linked list.",
        examples: [
            { input: "l1 = [1,2,4], l2 = [1,3,4]", output: "[1,1,2,3,4,4]" },
            { input: "l1 = [], l2 = []", output: "[]" },
            { input: "l1 = [], l2 = [0]", output: "[0]" },
        ],
        testCases: [
            // For linked lists, often inputs are stringified arrays, and output is a stringified array
            { input: "[1,2,4]\n[1,3,4]", expectedOutput: "[1,1,2,3,4,4]", isSample: true },
            { input: "[]\n[]", expectedOutput: "[]", isSample: true },
            { input: "[]\n[0]", expectedOutput: "[0]", isSample: true },
            { input: "[5]\n[1,2,4]", expectedOutput: "[1,2,4,5]", isSample: false },
            { input: "[1]\n[2]", expectedOutput: "[1,2]", isSample: false }
        ],
        constraints: "The number of nodes in both lists is in the range [0, 50], -100 <= Node.val <= 100",
        functionSignatures: {
            javascript: "/**\n * Definition for singly-linked list.\n * function ListNode(val, next) {\n * this.val = (val===undefined ? 0 : val)\n * this.next = (next===undefined ? null : next)\n * }\n */\n/**\n * @param {ListNode} list1\n * @param {ListNode} list2\n * @return {ListNode}\n */\nfunction mergeTwoLists(list1, list2) { }",
            python: "# Definition for singly-linked list.\n# class ListNode:\n#     def __init__(self, val=0, next=None):\n#         self.val = val\n#         self.next = next\ndef mergeTwoLists(list1, list2):",
            java: "/**\n * Definition for singly-linked list.\n * public class ListNode {\n * int val;\n * ListNode next;\n * ListNode() {}\n * ListNode(int val) { this.val = val; }\n * ListNode(int val, ListNode next) { this.val = val; this.next = next; }\n * }\n */\nclass Solution {\n    public ListNode mergeTwoLists(ListNode list1, ListNode list2) { }",
            cpp: "/**\n * Definition for singly-linked list.\n * struct ListNode {\n * int val;\n * ListNode *next;\n * ListNode() : val(0), next(nullptr) {}\n * ListNode(int x) : val(x), next(nullptr) {}\n * ListNode(int x, ListNode *next) : val(x), next(next) {}\n * };\n */\nclass Solution {\npublic:\n    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) { }",
        },
    },
    {
        title: "Reverse Integer",
        difficulty: "Easy",
        description: "Given a signed 32-bit integer `x`, return `x` with its digits reversed. If reversing `x` causes the value to go outside signed 32-bit integer range, return 0.",
        examples: [
            { input: "x = 123", output: "321" },
            { input: "x = -123", output: "-321" },
        ],
        testCases: [
            { input: "123", expectedOutput: "321", isSample: true },
            { input: "-123", expectedOutput: "-321", isSample: true },
            { input: "120", expectedOutput: "21", isSample: false },
            { input: "0", expectedOutput: "0", isSample: false },
            { input: "2147483647", expectedOutput: "0", isSample: false } // Max int, should return 0
        ],
        constraints: "-2³¹ <= x <= 2³¹ - 1",
        functionSignatures: {
            javascript: "function reverse(x) { }",
            python: "def reverse(x):",
            java: "public int reverse(int x) { }",
            cpp: "int reverse(int x) { }",
        },
    },
    {
        title: "Container With Most Water",
        difficulty: "Medium",
        description: "Given `n` non-negative integers a₁, a₂, ..., aₙ, where each represents a point at coordinate (i, aᵢ). Find two lines that, together with the x-axis, form a container that holds the most water.",
        examples: [
            { input: "height = [1,8,6,2,5,4,8,3,7]", output: "49" },
        ],
        testCases: [
            { input: "[1,8,6,2,5,4,8,3,7]", expectedOutput: "49", isSample: true },
            { input: "[1,1]", expectedOutput: "1", isSample: false },
            { input: "[4,3,2,1,4]", expectedOutput: "16", isSample: false }
        ],
        constraints: "n == height.length, 2 <= n <= 10⁵, 0 <= height[i] <= 10⁴",
        functionSignatures: {
            javascript: "function maxArea(height) { }",
            python: "def maxArea(height):",
            java: "public int maxArea(int[] height) { }",
            cpp: "int maxArea(vector<int>& height) { }",
        },
    },
    {
        title: "Median of Two Sorted Arrays",
        difficulty: "Hard",
        description: "Given two sorted arrays `nums1` and `nums2` of size m and n respectively, return the median of the two sorted arrays.",
        examples: [
            { input: "nums1 = [1,3], nums2 = [2]", output: "2.0" },
            { input: "nums1 = [1,2], nums2 = [3,4]", output: "2.5" },
        ],
        testCases: [
            { input: "[1,3]\n[2]", expectedOutput: "2.0", isSample: true },
            { input: "[1,2]\n[3,4]", expectedOutput: "2.5", isSample: true },
            { input: "[0,0]\n[0,0]", expectedOutput: "0.0", isSample: false },
            { input: "[]\n[1]", expectedOutput: "1.0", isSample: false }
        ],
        constraints: "nums1.length == m, nums2.length == n, 0 <= m, n <= 1000",
        functionSignatures: {
            javascript: "function findMedianSortedArrays(nums1, nums2) { }",
            python: "def findMedianSortedArrays(nums1, nums2):",
            java: "public double findMedianSortedArrays(int[] nums1, int[] nums2) { }",
            cpp: "double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) { }",
        },
    },
    {
        title: "Search in Rotated Sorted Array",
        difficulty: "Medium",
        description: "You are given a rotated sorted array and a target value. Return the index if the target is found. If not, return -1.",
        examples: [
            { input: "nums = [4,5,6,7,0,1,2], target = 0", output: "4" },
        ],
        testCases: [
            { input: "[4,5,6,7,0,1,2]\n0", expectedOutput: "4", isSample: true },
            { input: "[4,5,6,7,0,1,2]\n3", expectedOutput: "-1", isSample: false },
            { input: "[1]\n0", expectedOutput: "-1", isSample: false }
        ],
        constraints: "1 <= nums.length <= 5000, -10⁴ <= nums[i] <= 10⁴",
        functionSignatures: {
            javascript: "function search(nums, target) { }",
            python: "def search(nums, target):",
            java: "public int search(int[] nums, int target) { }",
            cpp: "int search(vector<int>& nums, int target) { }",
        },
    },
    {
        title: "Climbing Stairs",
        difficulty: "Easy",
        description: "You are climbing a staircase. Each time you can either take 1 or 2 steps. Given `n`, how many distinct ways can you climb to the top?",
        examples: [
            { input: "n = 2", output: "2" },
            { input: "n = 3", output: "3" },
        ],
        testCases: [
            { input: "2", expectedOutput: "2", isSample: true },
            { input: "3", expectedOutput: "3", isSample: true },
            { input: "1", expectedOutput: "1", isSample: false },
            { input: "4", expectedOutput: "5", isSample: false }
        ],
        constraints: "1 <= n <= 45",
        functionSignatures: {
            javascript: "function climbStairs(n) { }",
            python: "def climbStairs(n):",
            java: "public int climbStairs(int n) { }",
            cpp: "int climbStairs(int n) { }",
        },
    },
    {
        title: "Word Break",
        difficulty: "Medium",
        description: "Given a string `s` and a dictionary of strings `wordDict`, return true if `s` can be segmented into a space-separated sequence of one or more dictionary words.",
        examples: [
            { input: 's = "leetcode", wordDict = ["leet","code"]', output: "true" },
            { input: 's = "applepenapple", wordDict = ["apple","pen"]', output: "true" },
        ],
        testCases: [
            { input: "leetcode\n[\"leet\",\"code\"]", expectedOutput: "true", isSample: true },
            { input: "applepenapple\n[\"apple\",\"pen\"]", expectedOutput: "true", isSample: true },
            { input: "catsandog\n[\"cats\",\"dog\",\"sand\",\"and\",\"cat\"]", expectedOutput: "false", isSample: false }
        ],
        constraints: "1 <= s.length <= 300, 1 <= wordDict.length <= 1000",
        functionSignatures: {
            javascript: "function wordBreak(s, wordDict) { }",
            python: "def wordBreak(s, wordDict):",
            java: "public boolean wordBreak(String s, List<String> wordDict) { }",
            cpp: "bool wordBreak(string s, vector<string>& wordDict) { }",
        },
    },
    {
        title: "Best Time to Buy and Sell Stock",
        difficulty: "Easy",
        description: "Given an array `prices` where prices[i] is the price of a stock on the ith day, find the maximum profit you can achieve. You may complete only one transaction.",
        examples: [
            { input: "prices = [7,1,5,3,6,4]", output: "5" },
        ],
        testCases: [
            { input: "[7,1,5,3,6,4]", expectedOutput: "5", isSample: true },
            { input: "[7,6,4,3,1]", expectedOutput: "0", isSample: false },
            { input: "[1,2]", expectedOutput: "1", isSample: false }
        ],
        constraints: "1 <= prices.length <= 10⁵, 0 <= prices[i] <= 10⁴",
        functionSignatures: {
            javascript: "function maxProfit(prices) { }",
            python: "def maxProfit(prices):",
            java: "public int maxProfit(int[] prices) { }",
            cpp: "int maxProfit(vector<int>& prices) { }",
        },
    },
    {
        title: "Product of Array Except Self",
        difficulty: "Medium",
        description: "Given an integer array `nums`, return an array `answer` such that answer[i] is equal to the product of all elements of `nums` except `nums[i]`.",
        examples: [
            { input: "nums = [1,2,3,4]", output: "[24,12,8,6]" },
        ],
        testCases: [
            { input: "[1,2,3,4]", expectedOutput: "[24,12,8,6]", isSample: true },
            { input: "[-1,1,0,-3,3]", expectedOutput: "[0,0,9,0,0]", isSample: false }
        ],
        constraints: "2 <= nums.length <= 10⁵, All elements are non-zero",
        functionSignatures: {
            javascript: "function productExceptSelf(nums) { }",
            python: "def productExceptSelf(nums):",
            java: "public int[] productExceptSelf(int[] nums) { }",
            cpp: "vector<int> productExceptSelf(vector<int>& nums) { }",
        },
    },
    {
        title: "Subsets",
        difficulty: "Medium",
        description: "Given an integer array `nums` of unique elements, return all possible subsets (the power set).",
        examples: [
            { input: "nums = [1,2,3]", output: "[[3],[1],[2],[1,2,3],[1,3],[2,3],[1,2],[]]" },
        ],
        testCases: [
            { input: "[1,2,3]", expectedOutput: "[[3],[1],[2],[1,2,3],[1,3],[2,3],[1,2],[]]", isSample: true } // Output order might vary but functionally same
        ],
        constraints: "1 <= nums.length <= 10, -10 <= nums[i] <= 10",
        functionSignatures: {
            javascript: "function subsets(nums) { }",
            python: "def subsets(nums):",
            java: "public List<List<Integer>> subsets(int[] nums) { }",
            cpp: "vector<vector<int>> subsets(vector<int>& nums) { }",
        },
    },
    {
        title: "Permutations",
        difficulty: "Medium",
        description: "Given an array `nums` of distinct integers, return all possible permutations.",
        examples: [
            { input: "nums = [1,2,3]", output: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]" },
        ],
        testCases: [
            { input: "[1,2,3]", expectedOutput: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]", isSample: true } // Output order might vary
        ],
        constraints: "1 <= nums.length <= 6",
        functionSignatures: {
            javascript: "function permute(nums) { }",
            python: "def permute(nums):",
            java: "public List<List<Integer>> permute(int[] nums) { }",
            cpp: "vector<vector<int>> permute(vector<int>& nums) { }",
        },
    },
    {
        title: "Valid Palindrome",
        difficulty: "Easy",
        description: "Given a string `s`, return true if it is a palindrome, or false otherwise. Consider only alphanumeric characters and ignore cases.",
        examples: [
            { input: 's = "A man, a plan, a canal: Panama"', output: "true" },
        ],
        testCases: [
            { input: "A man, a plan, a canal: Panama", expectedOutput: "true", isSample: true },
            { input: "race a car", expectedOutput: "false", isSample: false },
            { input: " ", expectedOutput: "true", isSample: false }
        ],
        constraints: "1 <= s.length <= 2 * 10⁵",
        functionSignatures: {
            javascript: "function isPalindrome(s) { }",
            python: "def isPalindrome(s):",
            java: "public boolean isPalindrome(String s) { }",
            cpp: "bool isPalindrome(string s) { }",
        },
    },
    {
        title: "Maximum Depth of Binary Tree",
        difficulty: "Easy",
        description: "Given the root of a binary tree, return its maximum depth.",
        examples: [
            { input: "root = [3,9,20,null,null,15,7]", output: "3" },
        ],
        testCases: [
            // Representing binary trees as stringified arrays with nulls
            { input: "[3,9,20,null,null,15,7]", expectedOutput: "3", isSample: true },
            { input: "[1,null,2]", expectedOutput: "2", isSample: false },
            { input: "[]", expectedOutput: "0", isSample: false }
        ],
        constraints: "The number of nodes is in the range [0, 10⁴]",
        functionSignatures: {
            javascript: "/**\n * Definition for a binary tree node.\n * function TreeNode(val, left, right) {\n * this.val = (val===undefined ? 0 : val)\n * this.left = (left===undefined ? null : left)\n * this.right = (right===undefined ? null : right)\n * }\n */\n/**\n * @param {TreeNode} root\n * @return {number}\n */\nfunction maxDepth(root) { }",
            python: "# Definition for a binary tree node.\n# class TreeNode:\n#     def __init__(self, val=0, left=None, right=None):\n#         self.val = val\n#         self.left = left\n#         self.right = right\ndef maxDepth(root):",
            java: "/**\n * Definition for a binary tree node.\n * public class TreeNode {\n * int val;\n * TreeNode left;\n * TreeNode right;\n * TreeNode() {}\n * TreeNode(int val) { this.val = val; }\n * TreeNode(int val, TreeNode left, TreeNode right) {\n * this.val = val;\n * this.left = left;\n * this.right = right;\n * }\n * }\n */\nclass Solution {\n    public int maxDepth(TreeNode root) { }",
            cpp: "/**\n * Definition for a binary tree node.\n * struct TreeNode {\n * int val;\n * TreeNode *left;\n * TreeNode *right;\n * TreeNode() : val(0), left(nullptr), right(nullptr) {}\n * TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n * TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}\n * };\n */\nclass Solution {\npublic:\n    int maxDepth(TreeNode* root) { }",
        },
    },
    {
        title: "Diameter of Binary Tree",
        difficulty: "Easy",
        description: "Given the root of a binary tree, return the length of the diameter of the tree. The diameter is the length of the longest path between any two nodes.",
        examples: [
            { input: "root = [1,2,3,4,5]", output: "3" },
        ],
        testCases: [
            { input: "[1,2,3,4,5]", expectedOutput: "3", isSample: true },
            { input: "[1,2]", expectedOutput: "1", isSample: false },
            { input: "[1,2,null,3,null,4,null,5]", expectedOutput: "4", isSample: false } // A longer path
        ],
        constraints: "The number of nodes is in the range [1, 10⁴]",
        functionSignatures: {
            javascript: "/**\n * Definition for a binary tree node.\n * function TreeNode(val, left, right) {\n * this.val = (val===undefined ? 0 : val)\n * this.left = (left===undefined ? null : left)\n * this.right = (right===undefined ? null : right)\n * }\n */\n/**\n * @param {TreeNode} root\n * @return {number}\n */\nfunction diameterOfBinaryTree(root) { }",
            python: "# Definition for a binary tree node.\n# class TreeNode:\n#     def __init__(self, val=0, left=None, right=None):\n#         self.val = val\n#         self.left = left\n#         self.right = right\ndef diameterOfBinaryTree(root):",
            java: "/**\n * Definition for a binary tree node.\n * public class TreeNode {\n * int val;\n * TreeNode left;\n * TreeNode right;\n * TreeNode() {}\n * TreeNode(int val) { this.val = val; }\n * TreeNode(int val, TreeNode left, TreeNode right) {\n * this.val = val;\n * this.left = left;\n * this.right = right;\n * }\n * }\n */\nclass Solution {\n    public int diameterOfBinaryTree(TreeNode root) { }",
            cpp: "/**\n * Definition for a binary tree node.\n * struct TreeNode {\n * int val;\n * TreeNode *left;\n * TreeNode *right;\n * TreeNode() : val(0), left(nullptr), right(nullptr) {}\n * TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n * TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}\n * };\n */\nclass Solution {\npublic:\n    int diameterOfBinaryTree(TreeNode* root) { }",
        },
    },
    {
        title: "Number of Islands",
        difficulty: "Medium",
        description: "Given a 2D grid map of '1's (land) and '0's (water), return the number of islands.",
        examples: [
            {
                input: `grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]`,
                output: "3",
            },
        ],
        testCases: [
            {
                input: "[[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"1\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"1\",\"1\"]]",
                expectedOutput: "3",
                isSample: true,
            },
            {
                input: "[[\"1\",\"1\",\"1\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"0\",\"0\"]]",
                expectedOutput: "1",
                isSample: false,
            },
            {
                input: "[[\"0\",\"0\",\"0\"],[\"0\",\"0\",\"0\"],[\"0\",\"0\",\"0\"]]",
                expectedOutput: "0",
                isSample: false,
            },
        ],
        constraints: "m == grid.length, n == grid[i].length, 1 <= m, n <= 300",
        functionSignatures: {
            javascript: "function numIslands(grid) { }",
            python: "def numIslands(grid):",
            java: "public int numIslands(char[][] grid) { }",
            cpp: "int numIslands(vector<vector<char>>& grid) { }",
        },
    },
    {
        title: "Minimum Path Sum",
        difficulty: "Medium",
        description: "Given a m x n grid filled with non-negative numbers, find a path from top-left to bottom-right that minimizes the sum of all numbers along its path.",
        examples: [
            {
                input: `grid = [
  [1,3,1],
  [1,5,1],
  [4,2,1]
]`,
                output: "7",
            },
        ],
        testCases: [
            {
                input: "[[1,3,1],[1,5,1],[4,2,1]]",
                expectedOutput: "7",
                isSample: true,
            },
            {
                input: "[[1,2,3],[4,5,6]]",
                expectedOutput: "12",
                isSample: false,
            },
        ],
        constraints: "m == grid.length, n == grid[i].length, 1 <= m, n <= 200",
        functionSignatures: {
            javascript: "function minPathSum(grid) { }",
            python: "def minPathSum(grid):",
            java: "public int minPathSum(int[][] grid) { }",
            cpp: "int minPathSum(vector<vector<int>>& grid) { }",
        },
    },
    {
        title: "Coin Change",
        difficulty: "Medium",
        description: "Given an integer array `coins` and an integer `amount`, return the fewest number of coins needed to make up that amount. If not possible, return -1.",
        examples: [
            { input: "coins = [1,2,5], amount = 11", output: "3" },
        ],
        testCases: [
            { input: "[1,2,5]\n11", expectedOutput: "3", isSample: true },
            { input: "[2]\n3", expectedOutput: "-1", isSample: false },
            { input: "[1]\n0", expectedOutput: "0", isSample: false }
        ],
        constraints: "1 <= coins.length <= 12, 0 <= amount <= 10⁴",
        functionSignatures: {
            javascript: "function coinChange(coins, amount) { }",
            python: "def coinChange(coins, amount):",
            java: "public int coinChange(int[] coins, int amount) { }",
            cpp: "int coinChange(vector<int>& coins, int amount) { }",
        },
    },
    {
        title: "Find Peak Element",
        difficulty: "Medium",
        description: "A peak element is an element that is strictly greater than its neighbors. Given an input array `nums`, return the index of any one of its peak elements.",
        examples: [
            { input: "nums = [1,2,3,1]", output: "2" },
        ],
        testCases: [
            { input: "[1,2,3,1]", expectedOutput: "2", isSample: true }, // or 1 depending on implementation, but 2 is fine for this example
            { input: "[1,2,1,3,5,6,4]", expectedOutput: "5", isSample: false }, // 6 is a peak
            { input: "[1]", expectedOutput: "0", isSample: false }
        ],
        constraints: "1 <= nums.length <= 1000, -2³¹ <= nums[i] <= 2³¹ - 1",
        functionSignatures: {
            javascript: "function findPeakElement(nums) { }",
            python: "def findPeakElement(nums):",
            java: "public int findPeakElement(int[] nums) { }",
            cpp: "int findPeakElement(vector<int>& nums) { }",
        },
    },
    {
        title: "Course Schedule",
        difficulty: "Medium",
        description: "There are a total of `numCourses` courses you have to take, labeled from 0 to numCourses-1. Some courses may have prerequisites. Determine if it is possible to finish all courses.",
        examples: [
            { input: "numCourses = 2, prerequisites = [[1,0]]", output: "true" },
        ],
        testCases: [
            { input: "2\n[[1,0]]", expectedOutput: "true", isSample: true },
            { input: "2\n[[1,0],[0,1]]", expectedOutput: "false", isSample: false },
            { input: "3\n[[1,0],[2,1]]", expectedOutput: "true", isSample: false }
        ],
        constraints: "1 <= numCourses <= 2000, 0 <= prerequisites.length <= 5000",
        functionSignatures: {
            javascript: "function canFinish(numCourses, prerequisites) { }",
            python: "def canFinish(numCourses, prerequisites):",
            java: "public boolean canFinish(int numCourses, int[][] prerequisites) { }",
            cpp: "bool canFinish(int numCourses, vector<vector<int>>& prerequisites) { }",
        },
    },
    {
        title: "Top K Frequent Elements",
        difficulty: "Medium",
        description: "Given a non-empty array of integers, return the k most frequent elements.",
        examples: [
            { input: "nums = [1,1,1,2,2,3], k = 2", output: "[1,2]" },
        ],
        testCases: [
            { input: "[1,1,1,2,2,3]\n2", expectedOutput: "[1,2]", isSample: true },
            { input: "[1]\n1", expectedOutput: "[1]", isSample: false },
            { input: "[4,1,-1,2,-1,2,3]\n2", expectedOutput: "[-1,2]", isSample: false } // Order might vary [2,-1]
        ],
        constraints: "1 <= k <= nums.length <= 10⁵, k is in the range [1, the number of unique elements]",
        functionSignatures: {
            javascript: "function topKFrequent(nums, k) { }",
            python: "def topKFrequent(nums, k):",
            java: "public int[] topKFrequent(int[] nums, int k) { }",
            cpp: "vector<int> topKFrequent(vector<int>& nums, int k) { }",
        },
    },
    {
        title: "LRU Cache",
        difficulty: "Medium",
        description: "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.",
        examples: [
            { input: "LRUCache(2), put(1,1), put(2,2), get(1), put(3,3), get(2)", output: "1, -1" },
        ],
        testCases: [
            // This type of problem is harder to test with simple input/output strings.
            // Often, an integrated test runner in the Judge0 environment is better,
            // or you send a sequence of commands. For now, I'll adapt the example.
            {
                input: "LRUCache(2)\nput(1,1)\nput(2,2)\nget(1)\nput(3,3)\nget(2)\nput(4,4)\nget(1)\nget(3)\nget(4)",
                expectedOutput: "null\nnull\nnull\n1\nnull\n-1\nnull\n-1\n3\n4", // Assuming get returns value, put returns null
                isSample: true // Simplified example
            },
        ],
        constraints: "1 <= capacity <= 3000",
        functionSignatures: {
            javascript: "class LRUCache { constructor(capacity) { } get(key) { } put(key, value) { } }",
            python: "class LRUCache:\n    def __init__(self, capacity: int):\n        pass\n    def get(self, key: int) -> int:\n        pass\n    def put(self, key: int, value: int) -> None:\n        pass",
            java: "class LRUCache { public LRUCache(int capacity) { } public int get(int key) { } public void put(int key, int value) { } }",
            cpp: "class LRUCache { public: LRUCache(int capacity) { } int get(int key) { } void put(int key, int value) { } };",
        },
    },
    {
        title: "Find Minimum in Rotated Sorted Array",
        difficulty: "Medium",
        description: "Suppose an array of length n sorted in ascending order is rotated between 1 and n times. Find the minimum element.",
        examples: [
            { input: "nums = [3,4,5,1,2]", output: "1" },
        ],
        testCases: [
            { input: "[3,4,5,1,2]", expectedOutput: "1", isSample: true },
            { input: "[4,5,6,7,0,1,2]", expectedOutput: "0", isSample: false },
            { input: "[11,13,15,17]", expectedOutput: "11", isSample: false } // Not rotated
        ],
        constraints: "n == nums.length, 1 <= n <= 5000",
        functionSignatures: {
            javascript: "function findMin(nums) { }",
            python: "def findMin(nums):",
            java: "public int findMin(int[] nums) { }",
            cpp: "int findMin(vector<int>& nums) { }",
        },
    },
    {
        title: "Kth Largest Element in an Array",
        difficulty: "Medium",
        description: "Find the kth largest element in an unsorted array. Note that it is the kth largest element in the sorted order, not the kth distinct element.",
        examples: [
            { input: "nums = [3,2,1,5,6,4], k = 2", output: "5" },
        ],
        testCases: [
            { input: "[3,2,1,5,6,4]\n2", expectedOutput: "5", isSample: true },
            { input: "[3,2,3,1,2,4,5,5,6]\n4", expectedOutput: "4", isSample: false }
        ],
        constraints: "1 <= k <= nums.length <= 10⁴",
        functionSignatures: {
            javascript: "function findKthLargest(nums, k) { }",
            python: "def findKthLargest(nums, k):",
            java: "public int findKthLargest(int[] nums, int k) { }",
            cpp: "int findKthLargest(vector<int>& nums, int k) { }",
        },
    },
    {
        title: "Lowest Common Ancestor of a Binary Tree",
        difficulty: "Medium",
        description: "Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.",
        examples: [
            { input: "root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1", output: "3" },
        ],
        testCases: [
            // LCA problems are complex with string input; often involve representing tree and node values.
            // Assuming input format like "[tree_array]\n[p_val]\n[q_val]"
            { input: "[3,5,1,6,2,0,8,null,null,7,4]\n5\n1", expectedOutput: "3", isSample: true },
            { input: "[3,5,1,6,2,0,8,null,null,7,4]\n5\n4", expectedOutput: "5", isSample: false }
        ],
        constraints: "The number of nodes in the binary tree is in the range [2, 10⁵]",
        functionSignatures: {
            javascript: "/**\n * Definition for a binary tree node.\n * function TreeNode(val) {\n * this.val = val;\n * this.left = this.right = null;\n * }\n */\n/**\n * @param {TreeNode} root\n * @param {TreeNode} p\n * @param {TreeNode} q\n * @return {TreeNode}\n */\nfunction lowestCommonAncestor(root, p, q) { }",
            python: "# Definition for a binary tree node.\n# class TreeNode:\n#     def __init__(self, x):\n#         self.val = x\n#         self.left = None\n#         self.right = None\ndef lowestCommonAncestor(root, p, q):",
            java: "/**\n * Definition for a binary tree node.\n * public class TreeNode {\n * int val;\n * TreeNode left;\n * TreeNode right;\n * TreeNode(int x) { val = x; }\n * }\n */\nclass Solution {\n    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) { }",
            cpp: "/**\n * Definition for a binary tree node.\n * struct TreeNode {\n * int val;\n * TreeNode *left;\n * TreeNode *right;\n * TreeNode(int x) : val(x), left(NULL), right(NULL) {}\n * };\n */\nclass Solution {\npublic:\n    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) { }",
        },
    },
    {
        title: "Longest Palindromic Substring",
        difficulty: "Medium",
        description: "Given a string s, return the longest palindromic substring in s.",
        examples: [
            { input: 's = "babad"', output: '"bab"' },
        ],
        testCases: [
            { input: "babad", expectedOutput: "bab", isSample: true }, // "aba" is also valid
            { input: "cbbd", expectedOutput: "bb", isSample: false },
            { input: "a", expectedOutput: "a", isSample: false }
        ],
        constraints: "1 <= s.length <= 1000",
        functionSignatures: {
            javascript: "function longestPalindrome(s) { }",
            python: "def longestPalindrome(s):",
            java: "public String longestPalindrome(String s) { }",
            cpp: "string longestPalindrome(string s) { }",
        },
    },
    {
        title: "Rotate Image",
        difficulty: "Medium",
        description: "You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise).",
        examples: [
            {
                input: `matrix = [
  [1,2,3],
  [4,5,6],
  [7,8,9]
]`,
                output: `[
  [7,4,1],
  [8,5,2],
  [9,6,3]
]`,
            },
        ],
        testCases: [
            {
                input: "[[1,2,3],[4,5,6],[7,8,9]]",
                expectedOutput: "[[7,4,1],[8,5,2],[9,6,3]]",
                isSample: true,
            },
            {
                input: "[[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,18,16]]",
                expectedOutput: "[[15,13,2,5],[14,3,4,1],[18,6,8,9],[16,7,10,11]]",
                isSample: false,
            },
        ],
        constraints: "n == matrix.length == matrix[i].length, 1 <= n <= 20",
        functionSignatures: {
            javascript: "function rotate(matrix) { }",
            python: "def rotate(matrix):",
            java: "public void rotate(int[][] matrix) { }",
            cpp: "void rotate(vector<vector<int>>& matrix) { }",
        },
    },
    {
        title: "Merge Intervals",
        difficulty: "Medium",
        description: "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals.",
        examples: [
            { input: "intervals = [[1,3],[2,6],[8,10],[15,18]]", output: "[[1,6],[8,10],[15,18]]" },
        ],
        testCases: [
            { input: "[[1,3],[2,6],[8,10],[15,18]]", expectedOutput: "[[1,6],[8,10],[15,18]]", isSample: true },
            { input: "[[1,4],[4,5]]", expectedOutput: "[[1,5]]", isSample: false },
            { input: "[[1,4],[0,4]]", expectedOutput: "[[0,4]]", isSample: false }
        ],
        constraints: "1 <= intervals.length <= 10⁴",
        functionSignatures: {
            javascript: "function merge(intervals) { }",
            python: "def merge(intervals):",
            java: "public int[][] merge(int[][] intervals) { }",
            cpp: "vector<vector<int>> merge(vector<vector<int>>& intervals) { }",
        },
    },
    {
        title: "Group Anagrams",
        difficulty: "Medium",
        description: "Given an array of strings `strs`, group the anagrams together. You can return the answer in any order.",
        examples: [
            { input: 'strs = ["eat","tea","tan","ate","nat","bat"]', output: '[["bat"],["nat","tan"],["ate","eat","tea"]]' },
            { input: 'strs = [""]', output: '[[""]]' },
            { input: 'strs = ["a"]', output: '[["a"]]' },
        ],
        testCases: [
            { input: "[\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]", expectedOutput: "[[\"bat\"],[\"nat\",\"tan\"],[\"ate\",\"eat\",\"tea\"]]", isSample: true }, // Order of sub-arrays/elements can vary
            { input: "[\"\"]", expectedOutput: "[[\"\"]]", isSample: true },
            { input: "[\"a\"]", expectedOutput: "[[\"a\"]]", isSample: true }
        ],
        constraints: "1 <= strs.length <= 10⁴, 0 <= strs[i].length <= 100, strs[i] consists of lowercase English letters.",
        functionSignatures: {
            javascript: "function groupAnagrams(strs) { }",
            python: "def groupAnagrams(strs):",
            java: "public List<List<String>> groupAnagrams(String[] strs) { }",
            cpp: "vector<vector<string>> groupAnagrams(vector<string>& strs) { }",
        },
    },
    {
        title: "Meeting Rooms II",
        difficulty: "Medium",
        description: "Given an array of meeting time intervals `intervals` where `intervals[i] = [starti, endi]`, return the minimum number of conference rooms required.",
        examples: [
            { input: "intervals = [[0,30],[5,10],[15,20]]", output: "2" },
            { input: "intervals = [[7,10],[2,4]]", output: "1" },
        ],
        testCases: [
            { input: "[[0,30],[5,10],[15,20]]", expectedOutput: "2", isSample: true },
            { input: "[[7,10],[2,4]]", expectedOutput: "1", isSample: true },
            { input: "[[0,1],[1,2],[2,3]]", expectedOutput: "1", isSample: false }
        ],
        constraints: "1 <= intervals.length <= 10⁴, 0 <= starti < endi <= 10⁶",
        functionSignatures: {
            javascript: "function minMeetingRooms(intervals) { }",
            python: "def minMeetingRooms(intervals):",
            java: "public int minMeetingRooms(int[][] intervals) { }",
            cpp: "int minMeetingRooms(vector<vector<int>>& intervals) { }",
        },
    },
    // {
    //     title: "Serialize and Deserialize Binary Tree",
    //     difficulty: "Hard",
    //     description: "Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.\n\nDesign an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.",
    //     examples: [
    //         { input: "root = [1,2,3,null,null,4,5]", output: "[1,2,3,null,null,4,5]" },
    //         { input: "root = [null]", output: "[null]" },
    //         { input: "root = [1]", output: "[1]" },
    //     ],
    //     testCases: [
    //         // This problem is tricky for standard I/O testing as it involves custom serialization.
    //         // The input for serialize would be a tree structure (represented as string array), output would be serialized string.
    //         // The input for deserialize would be a serialized string, output would be a tree structure (represented as string array).
    //         // A common approach is to test the round trip: serialize(deserialize(serialize(root))) == serialize(root)
    //         // For simple string based Judge0, you'd likely need to combine serialization/deserialization into one test function
    //         // or provide a helper for input/output.
    //         { input: "[1,2,3,null,null,4,5]", expectedOutput: "1,2,3,null,null,4,5", isSample: true, explanation: "Assuming a simple comma-separated serialization format. Actual Judge0 would verify tree structure equality." },
    //         { input: "[]", expectedOutput: "", isSample: true, explanation: "Assuming empty string for empty tree." },
    //         { input: "[1]", expectedOutput: "1", isSample: true }
    //     ],
    //     constraints: "The number of nodes in the tree is in the range [0, 10⁴]., -1000 <= Node.val <= 1000",
    //     functionSignatures: {
    //         javascript: "/**\n * Definition for a binary tree node.\n * function TreeNode(val) {\n * this.val = val;\n * this.left = this.right = null;\n * }\n */\n\nclass Codec {\n    /**\n     * Encodes a tree to a single string.\n     *\n     * @param {TreeNode} root\n     * @return {string}\n     */\n    serialize(root) {\n        \n    }\n\n    /**\n     * Decodes your encoded data to tree.\n     *\n     * @param {string} data\n     * @return {TreeNode}\n     */\n    deserialize(data) {\n        \n    }\n}\n\n/**\n * Your Codec object will be instantiated and called as such:\n * var ser = new Codec();\n * var deser = new Codec();\n * var ans = deser.deserialize(ser.serialize(root));\n */",
    //         python: "# Definition for a binary tree node.\n# class TreeNode(object):\n#     def __init__(self, x):\n#         self.val = x\n#         self.left = None\n#         self.right = None\n\nclass Codec:\n\n    def serialize(self, root):\n        \"\"\"\n        Encodes a tree to a single string.\n        :type root: TreeNode\n        :rtype: str\n        \"\"\"\n        \n\n    def deserialize(self, data):\n        \"\"\"\n        Decodes your encoded data to tree.\n        :type data: str\n        :rtype: TreeNode\n        \"\"\"\n        \n\n# Your Codec object will be instantiated and called as such:\n# ser = Codec()\n# deser = Codec()\n# ans = deser.deserialize(ser.serialize(root))",
    //         java: "/**\n * Definition for a binary tree node.\n * public class TreeNode {\n * int val;\n * TreeNode left;\n * TreeNode right;\n * TreeNode(int x) { val = x; }\n * }\n */\npublic class Codec {\n\n    // Encodes a tree to a single string.\n    public String serialize(TreeNode root) {\n        \n    }\n\n    // Decodes your encoded data to tree.\n    public TreeNode deserialize(String data) {\n        \n    }\n}",
    //         cpp: "/**\n * Definition for a binary tree node.\n * struct TreeNode {\n * int val;\n * TreeNode *left;\n * TreeNode *right;\n * TreeNode(int x) : val(x), left(NULL), right(NULL) {}\n * };\n */\nclass Codec {\npublic:\n\n    // Encodes a tree to a single string.\n    string serialize(TreeNode* root) {\n        \n    }\n\n    // Decodes your encoded data to tree.\n    TreeNode* deserialize(string data) {\n        \n    }\n};",
    //     },
    // },
    {
        title: "Word Search",
        difficulty: "Medium",
        description: "Given an `m x n` grid of characters and a `word`, return `true` if `word` exists in the grid. The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.",
        examples: [
            {
                input: `board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"`,
                output: "true",
            },
            {
                input: `board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"`,
                output: "true",
            },
            {
                input: `board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"`,
                output: "false",
            },
        ],
        testCases: [
            {
                input: "[[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]]\nABCCED",
                expectedOutput: "true",
                isSample: true,
            },
            {
                input: "[[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]]\nSEE",
                expectedOutput: "true",
                isSample: true,
            },
            {
                input: "[[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]]\nABCB",
                expectedOutput: "false",
                isSample: true,
            },
        ],
        constraints: "m == board.length, n = board[i].length, 1 <= m, n <= 6, 1 <= word.length <= 15, board and word consists of only lowercase and uppercase English letters.",
        functionSignatures: {
            javascript: "function exist(board, word) { }",
            python: "def exist(board, word):",
            java: "public boolean exist(char[][] board, String word) { }",
            cpp: "bool exist(vector<vector<char>>& board, string word) { }",
        },
    },
    {
        title: "Longest Increasing Subsequence",
        difficulty: "Medium",
        description: "Given an integer array `nums`, return the length of the longest strictly increasing subsequence.",
        examples: [
            { input: "nums = [10,9,2,5,3,7,101,18]", output: "4" },
            { input: "nums = [0,1,0,3,2,3]", output: "4" },
            { input: "nums = [7,7,7,7,7,7,7]", output: "1" },
        ],
        testCases: [
            { input: "[10,9,2,5,3,7,101,18]", expectedOutput: "4", isSample: true },
            { input: "[0,1,0,3,2,3]", expectedOutput: "4", isSample: true },
            { input: "[7,7,7,7,7,7,7]", expectedOutput: "1", isSample: true },
            { input: "[1,3,6,7,9,4,10,5,6]", expectedOutput: "6", isSample: false }
        ],
        constraints: "1 <= nums.length <= 2500, -10⁴ <= nums[i] <= 10⁴",
        functionSignatures: {
            javascript: "function lengthOfLIS(nums) { }",
            python: "def lengthOfLIS(nums):",
            java: "public int lengthOfLIS(int[] nums) { }",
            cpp: "int lengthOfLIS(vector<int>& nums) { }",
        },
    },
    {
        title: "House Robber",
        difficulty: "Medium",
        description: "You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, an integer array `nums` representing the amount of money in each house. If two adjacent houses are robbed, it will trigger an alarm. Determine the maximum amount of money you can rob tonight without alerting the police.",
        examples: [
            { input: "nums = [1,2,3,1]", output: "4" },
            { input: "nums = [2,7,9,3,1]", output: "12" },
        ],
        testCases: [
            { input: "[1,2,3,1]", expectedOutput: "4", isSample: true },
            { input: "[2,7,9,3,1]", expectedOutput: "12", isSample: true },
            { input: "[2,1,1,2]", expectedOutput: "4", isSample: false }
        ],
        constraints: "1 <= nums.length <= 100, 0 <= nums[i] <= 400",
        functionSignatures: {
            javascript: "function rob(nums) { }",
            python: "def rob(nums):",
            java: "public int rob(int[] nums) { }",
            cpp: "int rob(vector<int>& nums) { }",
        },
    },
    {
        title: "Number of Connected Components in an Undirected Graph",
        difficulty: "Medium",
        description: "Given `n` nodes labeled from `0` to `n - 1` and a list of undirected edges (each edge is a pair of nodes), write a function to find the number of connected components in the graph.",
        examples: [
            { input: "n = 5, edges = [[0,1],[1,2],[3,4]]", output: "2" },
            { input: "n = 5, edges = [[0,1],[1,2],[2,3],[3,4]]", output: "1" },
        ],
        testCases: [
            { input: "5\n[[0,1],[1,2],[3,4]]", expectedOutput: "2", isSample: true },
            { input: "5\n[[0,1],[1,2],[2,3],[3,4]]", expectedOutput: "1", isSample: true },
            { input: "3\n[[0,1]]", expectedOutput: "2", isSample: false }
        ],
        constraints: "1 <= n <= 2000, 1 <= edges.length <= 5000, edges[i].length == 2, 0 <= ai < bi < n, ai != bi, There are no duplicate edges.",
        functionSignatures: {
            javascript: "function countComponents(n, edges) { }",
            python: "def countComponents(n, edges):",
            java: "public int countComponents(int n, int[][] edges) { }",
            cpp: "int countComponents(int n, vector<vector<int>>& edges) { }",
        },
    },
    {
        title: "Clone Graph",
        difficulty: "Medium",
        description: "Given a reference of a node in a connected undirected graph. Return a deep copy (clone) of the graph.",
        examples: [
            { input: "adjList = [[2,4],[1,3],[2,4],[1,3]]", output: "[[2,4],[1,3],[2,4],[1,3]]" },
        ],
        testCases: [
            // Graph problems with complex input/output can be challenging with plain strings.
            // Assuming adjacency list as stringified JSON.
            { input: "[[2,4],[1,3],[2,4],[1,3]]", expectedOutput: "[[2,4],[1,3],[2,4],[1,3]]", isSample: true } // Output should be the same structure for a clone
        ],
        constraints: "The number of nodes in the graph is in the range [0, 100]., 1 <= Node.val <= 100, Node.val is unique for each node., There are no repeated edges and no self-loops in the graph., The graph is connected.",
        functionSignatures: {
            javascript: "/**\n * Definition for a Node.\n * function Node(val, neighbors) {\n * this.val = val === undefined ? 0 : val;\n * this.neighbors = neighbors === undefined ? [] : neighbors;\n * };\n */\n\nfunction cloneGraph(node) { }",
            python: "# Definition for a Node.\n# class Node:\n#     def __init__(self, val = 0, neighbors = None):\n#         self.val = val\n#         self.neighbors = neighbors if neighbors is not None else []\ndef cloneGraph(node):",
            java: "/*\n// Definition for a Node.\nclass Node {\n    public int val;\n    public List<Node> neighbors;\n    public Node() {\n        this.val = 0;\n        this.neighbors = new ArrayList<Node>();\n    }\n    public Node(int _val) {\n        this.val = _val;\n        this.neighbors = new ArrayList<Node>();\n    }\n    public Node(int _val, ArrayList<Node> _neighbors) {\n        this.val = _val;\n        this.neighbors = _neighbors;\n    }\n}\n*/\n\nclass Solution {\n    public Node cloneGraph(Node node) { }",
            cpp: "/*\n// Definition for a Node.\nclass Node {\npublic:\n    int val;\n    vector<Node*> neighbors;\n\n    Node() {\n        val = 0;\n        neighbors = vector<Node*>();\n    }\n\n    Node(int _val) {\n        val = _val;\n        neighbors = vector<Node*>();\n    }\n\n    Node(int _val, vector<Node*> _neighbors) {\n        val = _val;\n        neighbors = _neighbors;\n    }\n};\n*/\n\nclass Solution {\npublic:\n    Node* cloneGraph(Node* node) { }",
        },
    },
    {
        title: "Pacific Atlantic Water Flow",
        difficulty: "Medium",
        description: "Given an `m x n` matrix `heights` representing the height of land at each unit cell in a continent, return a list of grid coordinates `result` where `result[i] = [ri, ci]` denotes that rain water can flow from `(ri, ci)` to both the Pacific and Atlantic oceans.",
        examples: [
            {
                input: `heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]`,
                output: `[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]`,
            },
        ],
        testCases: [
            {
                input: "[[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]",
                expectedOutput: "[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]", // Order of coordinates might vary
                isSample: true,
            },
            {
                input: "[[1]]",
                expectedOutput: "[[0,0]]",
                isSample: false,
            },
        ],
        constraints: "m == heights.length, n == heights[i].length, 1 <= m, n <= 200, 0 <= heights[r][c] <= 10⁵",
        functionSignatures: {
            javascript: "function pacificAtlantic(heights) { }",
            python: "def pacificAtlantic(heights):",
            java: "public List<List<Integer>> pacificAtlantic(int[][] heights) { }",
            cpp: "vector<vector<int>> pacificAtlantic(vector<vector<int>>& heights) { }",
        },
    },
    {
        title: "Longest Consecutive Sequence",
        difficulty: "Medium",
        description: "Given an unsorted array of integers `nums`, return the length of the longest consecutive elements sequence.",
        examples: [
            { input: "nums = [100,4,200,1,3,2]", output: "4" },
            { input: "nums = [0,3,7,2,5,8,4,6,0,1]", output: "9" },
        ],
        testCases: [
            { input: "[100,4,200,1,3,2]", expectedOutput: "4", isSample: true },
            { input: "[0,3,7,2,5,8,4,6,0,1]", expectedOutput: "9", isSample: true },
            { input: "[]", expectedOutput: "0", isSample: false },
            { input: "[1,2,3,4,5]", expectedOutput: "5", isSample: false }
        ],
        constraints: "0 <= nums.length <= 10⁵, -10⁹ <= nums[i] <= 10⁹",
        functionSignatures: {
            javascript: "function longestConsecutive(nums) { }",
            python: "def longestConsecutive(nums):",
            java: "public int longestConsecutive(int[] nums) { }",
            cpp: "int longestConsecutive(vector<int>& nums) { }",
        },
    },
];

export default Problems;