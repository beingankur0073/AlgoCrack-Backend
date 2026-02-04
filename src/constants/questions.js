const Problems = [
  {
    "id": "two-sum",
    "title": "Two Sum",
    "difficulty": "Easy",
    "description": "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.",
    "inputFormat": "The first line contains an integer N, the size of the array.\nThe second line contains N space-separated integers representing the array nums.\nThe third line contains an integer target.",
    "outputFormat": "Print two space-separated integers representing the indices.",
    "constraints": ["2 <= nums.length <= 10⁴", "-10⁹ <= nums[i] <= 10⁹", "-10⁹ <= target <= 10⁹", "Only one valid answer exists."],
    "examples": [
      { 
        "input": "4\n2 7 11 15\n9", 
        "output": "0 1", 
        "explanation": "nums[0] + nums[1] == 9, so we print 0 1." 
      },
      { 
        "input": "3\n3 2 4\n6", 
        "output": "1 2", 
        "explanation": "nums[1] + nums[2] == 6, so we print 1 2." 
      }
    ],
    "testCases": [
      { "input": "4\n2 7 11 15\n9", "expectedOutput": "0 1", "isSample": true },
      { "input": "3\n3 2 4\n6", "expectedOutput": "1 2", "isSample": true },
      { "input": "2\n3 3\n6", "expectedOutput": "0 1", "isSample": false },
      { "input": "10\n1 2 3 4 5 6 7 8 9 10\n19", "expectedOutput": "8 9", "isSample": false }
    ],
    "timeLimit": 2,
    "memoryLimit": 128
  },
  {
    "id": "valid-parentheses",
    "title": "Valid Parentheses",
    "difficulty": "Easy",
    "description": "Given a string `s` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    "inputFormat": "A single string s.",
    "outputFormat": "Print 'true' if the string is valid, otherwise print 'false'.",
    "constraints": ["1 <= s.length <= 10⁴", "s consists of parentheses only"],
    "examples": [
      { "input": "()", "output": "true" },
      { "input": "([)]", "output": "false" }
    ],
    "testCases": [
      { "input": "()", "expectedOutput": "true", "isSample": true },
      { "input": "([)]", "expectedOutput": "false", "isSample": true },
      { "input": "()[]{}", "expectedOutput": "true", "isSample": false },
      { "input": "{[()]}", "expectedOutput": "true", "isSample": false },
      { "input": "((", "expectedOutput": "false", "isSample": false }
    ],
    "timeLimit": 2,
    "memoryLimit": 128
  },
  {
    "id": "longest-substring-without-repeating-characters",
    "title": "Longest Substring Without Repeating Characters",
    "difficulty": "Medium",
    "description": "Given a string `s`, find the length of the longest substring without repeating characters.",
    "inputFormat": "A single string s.",
    "outputFormat": "Print a single integer representing the length.",
    "constraints": ["0 <= s.length <= 5 * 10⁴", "s consists of English letters, digits, symbols and spaces"],
    "examples": [
      { "input": "abcabcbb", "output": "3" },
      { "input": "bbbbb", "output": "1" }
    ],
    "testCases": [
      { "input": "abcabcbb", "expectedOutput": "3", "isSample": true },
      { "input": "bbbbb", "expectedOutput": "1", "isSample": true },
      { "input": "pwwkew", "expectedOutput": "3", "isSample": false },
      { "input": "au", "expectedOutput": "2", "isSample": false },
      { "input": " ", "expectedOutput": "1", "isSample": false }
    ],
    "timeLimit": 2,
    "memoryLimit": 128
  },
  {
    "id": "merge-two-sorted-lists",
    "title": "Merge Two Sorted Lists",
    "difficulty": "Easy",
    "description": "Merge two sorted linked lists and return it as a sorted list. The list should be made by splicing together the nodes of the first two lists.",
    "inputFormat": "First line: N (size of list 1). Second line: N integers for list 1. Third line: M (size of list 2). Fourth line: M integers for list 2.",
    "outputFormat": "Print the merged list elements separated by spaces.",
    "constraints": ["0 <= N, M <= 50", "-100 <= Node.val <= 100"],
    "examples": [
      { "input": "3\n1 2 4\n3\n1 3 4", "output": "1 1 2 3 4 4" },
      { "input": "0\n\n0\n", "output": "" },
      { "input": "0\n\n1\n0", "output": "0" }
    ],
    "testCases": [
      { "input": "3\n1 2 4\n3\n1 3 4", "expectedOutput": "1 1 2 3 4 4", "isSample": true },
      { "input": "0\n\n0\n", "expectedOutput": "", "isSample": true },
      { "input": "0\n\n1\n0", "expectedOutput": "0", "isSample": true },
      { "input": "1\n5\n3\n1 2 4", "expectedOutput": "1 2 4 5", "isSample": false },
      { "input": "1\n1\n1\n2", "expectedOutput": "1 2", "isSample": false }
    ],
    "timeLimit": 2,
    "memoryLimit": 128
  },
  {
    "id": "reverse-integer",
    "title": "Reverse Integer",
    "difficulty": "Easy",
    "description": "Given a signed 32-bit integer `x`, return `x` with its digits reversed. If reversing `x` causes the value to go outside signed 32-bit integer range, return 0.",
    "inputFormat": "A single integer x.",
    "outputFormat": "Print the reversed integer.",
    "constraints": ["-2³¹ <= x <= 2³¹ - 1"],
    "examples": [
      { "input": "123", "output": "321" },
      { "input": "-123", "output": "-321" }
    ],
    "testCases": [
      { "input": "123", "expectedOutput": "321", "isSample": true },
      { "input": "-123", "expectedOutput": "-321", "isSample": true },
      { "input": "120", "expectedOutput": "21", "isSample": false },
      { "input": "0", "expectedOutput": "0", "isSample": false },
      { "input": "2147483647", "expectedOutput": "0", "isSample": false }
    ],
    "timeLimit": 2,
    "memoryLimit": 128
  },
  {
    "id": "container-with-most-water",
    "title": "Container With Most Water",
    "difficulty": "Medium",
    "description": "Find two lines that, together with the x-axis, form a container that holds the most water.",
    "inputFormat": "First line: N (size of array). Second line: N space-separated integers representing heights.",
    "outputFormat": "Print the maximum area.",
    "constraints": ["2 <= n <= 10⁵", "0 <= height[i] <= 10⁴"],
    "examples": [
      { "input": "9\n1 8 6 2 5 4 8 3 7", "output": "49" }
    ],
    "testCases": [
      { "input": "9\n1 8 6 2 5 4 8 3 7", "expectedOutput": "49", "isSample": true },
      { "input": "2\n1 1", "expectedOutput": "1", "isSample": false },
      { "input": "5\n4 3 2 1 4", "expectedOutput": "16", "isSample": false }
    ],
    "timeLimit": 2,
    "memoryLimit": 128
  },
  {
    "id": "median-of-two-sorted-arrays",
    "title": "Median of Two Sorted Arrays",
    "difficulty": "Hard",
    "description": "Given two sorted arrays `nums1` and `nums2`, return the median of the two sorted arrays.",
    "inputFormat": "Line 1: N (size nums1). Line 2: nums1 elements. Line 3: M (size nums2). Line 4: nums2 elements.",
    "outputFormat": "Print the median as a float/double.",
    "constraints": ["0 <= m, n <= 1000"],
    "examples": [
      { "input": "2\n1 3\n1\n2", "output": "2.0" },
      { "input": "2\n1 2\n2\n3 4", "output": "2.5" }
    ],
    "testCases": [
      { "input": "2\n1 3\n1\n2", "expectedOutput": "2.0", "isSample": true },
      { "input": "2\n1 2\n2\n3 4", "expectedOutput": "2.5", "isSample": true },
      { "input": "2\n0 0\n2\n0 0", "expectedOutput": "0.0", "isSample": false },
      { "input": "0\n\n1\n1", "expectedOutput": "1.0", "isSample": false }
    ],
    "timeLimit": 2,
    "memoryLimit": 128
  },
  {
    "id": "search-in-rotated-sorted-array",
    "title": "Search in Rotated Sorted Array",
    "difficulty": "Medium",
    "description": "Return the index if the target is found. If not, return -1.",
    "inputFormat": "Line 1: N. Line 2: Array elements. Line 3: Target.",
    "outputFormat": "Print the index or -1.",
    "constraints": ["1 <= nums.length <= 5000", "-10⁴ <= nums[i] <= 10⁴"],
    "examples": [
      { "input": "7\n4 5 6 7 0 1 2\n0", "output": "4" }
    ],
    "testCases": [
      { "input": "7\n4 5 6 7 0 1 2\n0", "expectedOutput": "4", "isSample": true },
      { "input": "7\n4 5 6 7 0 1 2\n3", "expectedOutput": "-1", "isSample": false },
      { "input": "1\n1\n0", "expectedOutput": "-1", "isSample": false }
    ],
    "timeLimit": 2,
    "memoryLimit": 128
  },
  {
    "id": "climbing-stairs",
    "title": "Climbing Stairs",
    "difficulty": "Easy",
    "description": "Each time you can either take 1 or 2 steps. Given `n`, how many distinct ways can you climb to the top?",
    "inputFormat": "A single integer n.",
    "outputFormat": "Print the number of ways.",
    "constraints": ["1 <= n <= 45"],
    "examples": [
      { "input": "2", "output": "2" },
      { "input": "3", "output": "3" }
    ],
    "testCases": [
      { "input": "2", "expectedOutput": "2", "isSample": true },
      { "input": "3", "expectedOutput": "3", "isSample": true },
      { "input": "1", "expectedOutput": "1", "isSample": false },
      { "input": "4", "expectedOutput": "5", "isSample": false }
    ],
    "timeLimit": 2,
    "memoryLimit": 128
  },
  {
    "id": "word-break",
    "title": "Word Break",
    "difficulty": "Medium",
    "description": "Return true if `s` can be segmented into a space-separated sequence of one or more dictionary words.",
    "inputFormat": "Line 1: String s. Line 2: N (dictionary size). Line 3: N space-separated dictionary words.",
    "outputFormat": "Print 'true' or 'false'.",
    "constraints": ["1 <= s.length <= 300", "1 <= wordDict.length <= 1000"],
    "examples": [
      { "input": "leetcode\n2\nleet code", "output": "true" },
      { "input": "applepenapple\n2\napple pen", "output": "true" }
    ],
    "testCases": [
      { "input": "leetcode\n2\nleet code", "expectedOutput": "true", "isSample": true },
      { "input": "applepenapple\n2\napple pen", "expectedOutput": "true", "isSample": true },
      { "input": "catsandog\n5\ncats dog sand and cat", "expectedOutput": "false", "isSample": false }
    ],
    "timeLimit": 2,
    "memoryLimit": 128
  },
  {
    "id": "best-time-to-buy-and-sell-stock",
    "title": "Best Time to Buy and Sell Stock",
    "difficulty": "Easy",
    "description": "Find the maximum profit you can achieve. You may complete only one transaction.",
    "inputFormat": "Line 1: N. Line 2: N prices.",
    "outputFormat": "Print the maximum profit.",
    "constraints": ["1 <= prices.length <= 10⁵"],
    "examples": [
      { "input": "6\n7 1 5 3 6 4", "output": "5" }
    ],
    "testCases": [
      { "input": "6\n7 1 5 3 6 4", "expectedOutput": "5", "isSample": true },
      { "input": "5\n7 6 4 3 1", "expectedOutput": "0", "isSample": false },
      { "input": "2\n1 2", "expectedOutput": "1", "isSample": false }
    ],
    "timeLimit": 2,
    "memoryLimit": 128
  },
  {
    "id": "product-of-array-except-self",
    "title": "Product of Array Except Self",
    "difficulty": "Medium",
    "description": "Return an array `answer` such that answer[i] is equal to the product of all elements of `nums` except `nums[i]`.",
    "inputFormat": "Line 1: N. Line 2: N integers.",
    "outputFormat": "Print the result array elements separated by spaces.",
    "constraints": ["2 <= nums.length <= 10⁵", "All elements are non-zero"],
    "examples": [
      { "input": "4\n1 2 3 4", "output": "24 12 8 6" }
    ],
    "testCases": [
      { "input": "4\n1 2 3 4", "expectedOutput": "24 12 8 6", "isSample": true },
      { "input": "5\n-1 1 0 -3 3", "expectedOutput": "0 0 9 0 0", "isSample": false }
    ],
    "timeLimit": 2,
    "memoryLimit": 128
  },
  {
    "id": "subsets",
    "title": "Subsets",
    "difficulty": "Medium",
    "description": "Return all possible subsets (the power set). Output order doesn't matter (checker will handle sorting).",
    "inputFormat": "Line 1: N. Line 2: N unique integers.",
    "outputFormat": "Print each subset on a new line, elements separated by spaces. Print an empty line for the empty set.",
    "constraints": ["1 <= nums.length <= 10"],
    "examples": [
      { "input": "3\n1 2 3", "output": "\n3\n1\n2\n1 2 3\n1 3\n2 3\n1 2" }
    ],
    "testCases": [
      { "input": "3\n1 2 3", "expectedOutput": "3\n1\n2\n1 2 3\n1 3\n2 3\n1 2\n", "isSample": true }
    ],
    "timeLimit": 2,
    "memoryLimit": 128
  },
  {
    "id": "permutations",
    "title": "Permutations",
    "difficulty": "Medium",
    "description": "Return all possible permutations of distinct integers.",
    "inputFormat": "Line 1: N. Line 2: N integers.",
    "outputFormat": "Print each permutation on a new line.",
    "constraints": ["1 <= nums.length <= 6"],
    "examples": [
      { "input": "3\n1 2 3", "output": "1 2 3\n1 3 2\n2 1 3\n2 3 1\n3 1 2\n3 2 1" }
    ],
    "testCases": [
      { "input": "3\n1 2 3", "expectedOutput": "1 2 3\n1 3 2\n2 1 3\n2 3 1\n3 1 2\n3 2 1", "isSample": true }
    ],
    "timeLimit": 2,
    "memoryLimit": 128
  },
  {
    "id": "valid-palindrome",
    "title": "Valid Palindrome",
    "difficulty": "Easy",
    "description": "Return true if it is a palindrome, considering only alphanumeric characters and ignoring cases.",
    "inputFormat": "A single string s (may contain spaces).",
    "outputFormat": "Print 'true' or 'false'.",
    "constraints": ["1 <= s.length <= 2 * 10⁵"],
    "examples": [
      { "input": "A man, a plan, a canal: Panama", "output": "true" }
    ],
    "testCases": [
      { "input": "A man, a plan, a canal: Panama", "expectedOutput": "true", "isSample": true },
      { "input": "race a car", "expectedOutput": "false", "isSample": false },
      { "input": " ", "expectedOutput": "true", "isSample": false }
    ],
    "timeLimit": 2,
    "memoryLimit": 128
  },
  {
    "id": "maximum-depth-of-binary-tree",
    "title": "Maximum Depth of Binary Tree",
    "difficulty": "Easy",
    "description": "Given the root of a binary tree, return its maximum depth. Input is level order traversal.",
    "inputFormat": "Space separated values representing the tree in level order (null for empty nodes).",
    "outputFormat": "Integer.",
    "constraints": ["Nodes range [0, 10⁴]"],
    "examples": [
      { "input": "3 9 20 null null 15 7", "output": "3" }
    ],
    "testCases": [
      { "input": "3 9 20 null null 15 7", "expectedOutput": "3", "isSample": true },
      { "input": "1 null 2", "expectedOutput": "2", "isSample": false },
      { "input": "", "expectedOutput": "0", "isSample": false }
    ],
    "timeLimit": 2,
    "memoryLimit": 128
  },
  {
    "id": "diameter-of-binary-tree",
    "title": "Diameter of Binary Tree",
    "difficulty": "Easy",
    "description": "Return the length of the diameter of the tree.",
    "inputFormat": "Space separated values representing the tree in level order.",
    "outputFormat": "Integer.",
    "constraints": ["Nodes range [1, 10⁴]"],
    "examples": [
      { "input": "1 2 3 4 5", "output": "3" }
    ],
    "testCases": [
      { "input": "1 2 3 4 5", "expectedOutput": "3", "isSample": true },
      { "input": "1 2", "expectedOutput": "1", "isSample": false },
      { "input": "1 2 null 3 null 4 null 5", "expectedOutput": "4", "isSample": false }
    ],
    "timeLimit": 2,
    "memoryLimit": 128
  },
  {
    "id": "number-of-islands",
    "title": "Number of Islands",
    "difficulty": "Medium",
    "description": "Given a 2D grid map of '1's (land) and '0's (water), return the number of islands.",
    "inputFormat": "Line 1: Rows M, Cols N. Next M lines: N space-separated characters (1 or 0).",
    "outputFormat": "Integer.",
    "constraints": ["1 <= m, n <= 300"],
    "examples": [
      { 
        "input": "4 5\n1 1 0 0 0\n1 1 0 0 0\n0 0 1 0 0\n0 0 0 1 1", 
        "output": "3" 
      }
    ],
    "testCases": [
      { "input": "4 5\n1 1 0 0 0\n1 1 0 0 0\n0 0 1 0 0\n0 0 0 1 1", "expectedOutput": "3", "isSample": true },
      { "input": "4 5\n1 1 1 1 0\n1 1 0 1 0\n1 1 0 0 0\n0 0 0 0 0", "expectedOutput": "1", "isSample": false },
      { "input": "3 3\n0 0 0\n0 0 0\n0 0 0", "expectedOutput": "0", "isSample": false }
    ],
    "timeLimit": 2,
    "memoryLimit": 128
  },
  {
    "id": "minimum-path-sum",
    "title": "Minimum Path Sum",
    "difficulty": "Medium",
    "description": "Find a path from top-left to bottom-right that minimizes the sum of all numbers along its path.",
    "inputFormat": "Line 1: Rows M, Cols N. Next M lines: N space-separated integers.",
    "outputFormat": "Integer.",
    "constraints": ["1 <= m, n <= 200"],
    "examples": [
      { 
        "input": "3 3\n1 3 1\n1 5 1\n4 2 1", 
        "output": "7" 
      }
    ],
    "testCases": [
      { "input": "3 3\n1 3 1\n1 5 1\n4 2 1", "expectedOutput": "7", "isSample": true },
      { "input": "2 3\n1 2 3\n4 5 6", "expectedOutput": "12", "isSample": false }
    ],
    "timeLimit": 2,
    "memoryLimit": 128
  },
  {
    "id": "coin-change",
    "title": "Coin Change",
    "difficulty": "Medium",
    "description": "Return the fewest number of coins needed to make up that amount. If not possible, return -1.",
    "inputFormat": "Line 1: N (number of coins). Line 2: N integers (coins). Line 3: Amount.",
    "outputFormat": "Integer.",
    "constraints": ["1 <= coins.length <= 12", "0 <= amount <= 10⁴"],
    "examples": [
      { "input": "3\n1 2 5\n11", "output": "3" }
    ],
    "testCases": [
      { "input": "3\n1 2 5\n11", "expectedOutput": "3", "isSample": true },
      { "input": "1\n2\n3", "expectedOutput": "-1", "isSample": false },
      { "input": "1\n1\n0", "expectedOutput": "0", "isSample": false }
    ],
    "timeLimit": 2,
    "memoryLimit": 128
  },
  {
    "id": "find-peak-element",
    "title": "Find Peak Element",
    "difficulty": "Medium",
    "description": "Return the index of any one of its peak elements.",
    "inputFormat": "Line 1: N. Line 2: N integers.",
    "outputFormat": "Integer (index).",
    "constraints": ["1 <= nums.length <= 1000"],
    "examples": [
      { "input": "4\n1 2 3 1", "output": "2" }
    ],
    "testCases": [
      { "input": "4\n1 2 3 1", "expectedOutput": "2", "isSample": true },
      { "input": "7\n1 2 1 3 5 6 4", "expectedOutput": "5", "isSample": false },
      { "input": "1\n1", "expectedOutput": "0", "isSample": false }
    ],
    "timeLimit": 2,
    "memoryLimit": 128
  },
  {
    "id": "course-schedule",
    "title": "Course Schedule",
    "difficulty": "Medium",
    "description": "Determine if it is possible to finish all courses given prerequisites.",
    "inputFormat": "Line 1: NumCourses. Line 2: NumPrerequisites (P). Next P lines: 2 integers (course, prerequisite).",
    "outputFormat": "Print 'true' or 'false'.",
    "constraints": ["1 <= numCourses <= 2000"],
    "examples": [
      { "input": "2\n1\n1 0", "output": "true" }
    ],
    "testCases": [
      { "input": "2\n1\n1 0", "expectedOutput": "true", "isSample": true },
      { "input": "2\n2\n1 0\n0 1", "expectedOutput": "false", "isSample": false },
      { "input": "3\n2\n1 0\n2 1", "expectedOutput": "true", "isSample": false }
    ],
    "timeLimit": 2,
    "memoryLimit": 128
  },
  {
    "id": "top-k-frequent-elements",
    "title": "Top K Frequent Elements",
    "difficulty": "Medium",
    "description": "Return the k most frequent elements. Order doesn't matter.",
    "inputFormat": "Line 1: N. Line 2: N integers. Line 3: K.",
    "outputFormat": "Space separated integers.",
    "constraints": ["1 <= k <= nums.length <= 10⁵"],
    "examples": [
      { "input": "6\n1 1 1 2 2 3\n2", "output": "1 2" }
    ],
    "testCases": [
      { "input": "6\n1 1 1 2 2 3\n2", "expectedOutput": "1 2", "isSample": true },
      { "input": "1\n1\n1", "expectedOutput": "1", "isSample": false },
      { "input": "7\n4 1 -1 2 -1 2 3\n2", "expectedOutput": "-1 2", "isSample": false }
    ],
    "timeLimit": 2,
    "memoryLimit": 128
  },
  {
    "id": "lru-cache",
    "title": "LRU Cache",
    "difficulty": "Medium",
    "description": "Implement LRU Cache. Operations: put(key, value) and get(key).",
    "inputFormat": "Line 1: Total operations. Line 2: Capacity. Next lines: 'put key value' or 'get key'.",
    "outputFormat": "For every 'get' operation, print the result on a new line.",
    "constraints": ["1 <= capacity <= 3000"],
    "examples": [
      { 
        "input": "9\n2\nput 1 1\nput 2 2\nget 1\nput 3 3\nget 2\nput 4 4\nget 1\nget 3\nget 4", 
        "output": "1\n-1\n-1\n3\n4" 
      }
    ],
    "testCases": [
      { 
        "input": "9\n2\nput 1 1\nput 2 2\nget 1\nput 3 3\nget 2\nput 4 4\nget 1\nget 3\nget 4", 
        "expectedOutput": "1\n-1\n-1\n3\n4", 
        "isSample": true 
      }
    ],
    "timeLimit": 2,
    "memoryLimit": 128
  },
  {
    "id": "find-minimum-in-rotated-sorted-array",
    "title": "Find Minimum in Rotated Sorted Array",
    "difficulty": "Medium",
    "description": "Find the minimum element in a rotated sorted array.",
    "inputFormat": "Line 1: N. Line 2: N integers.",
    "outputFormat": "Integer.",
    "constraints": ["1 <= n <= 5000"],
    "examples": [
      { "input": "5\n3 4 5 1 2", "output": "1" }
    ],
    "testCases": [
      { "input": "5\n3 4 5 1 2", "expectedOutput": "1", "isSample": true },
      { "input": "7\n4 5 6 7 0 1 2", "expectedOutput": "0", "isSample": false },
      { "input": "4\n11 13 15 17", "expectedOutput": "11", "isSample": false }
    ],
    "timeLimit": 2,
    "memoryLimit": 128
  },
  {
    "id": "kth-largest-element-in-an-array",
    "title": "Kth Largest Element in an Array",
    "difficulty": "Medium",
    "description": "Find the kth largest element in an unsorted array.",
    "inputFormat": "Line 1: N. Line 2: N integers. Line 3: K.",
    "outputFormat": "Integer.",
    "constraints": ["1 <= k <= nums.length <= 10⁴"],
    "examples": [
      { "input": "6\n3 2 1 5 6 4\n2", "output": "5" }
    ],
    "testCases": [
      { "input": "6\n3 2 1 5 6 4\n2", "expectedOutput": "5", "isSample": true },
      { "input": "9\n3 2 3 1 2 4 5 5 6\n4", "expectedOutput": "4", "isSample": false }
    ],
    "timeLimit": 2,
    "memoryLimit": 128
  },
  {
    "id": "lowest-common-ancestor-of-a-binary-tree",
    "title": "Lowest Common Ancestor of a Binary Tree",
    "difficulty": "Medium",
    "description": "Find the LCA of two given nodes p and q in the tree.",
    "inputFormat": "Line 1: Tree in level order (space separated). Line 2: Value of p. Line 3: Value of q.",
    "outputFormat": "Value of LCA node.",
    "constraints": ["Nodes range [2, 10⁵]"],
    "examples": [
      { "input": "3 5 1 6 2 0 8 null null 7 4\n5\n1", "output": "3" }
    ],
    "testCases": [
      { "input": "3 5 1 6 2 0 8 null null 7 4\n5\n1", "expectedOutput": "3", "isSample": true },
      { "input": "3 5 1 6 2 0 8 null null 7 4\n5\n4", "expectedOutput": "5", "isSample": false }
    ],
    "timeLimit": 2,
    "memoryLimit": 128
  }
];

export default Problems;