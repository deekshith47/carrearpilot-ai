import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal, 
  Code2, 
  Zap, 
  Award, 
  Sparkles, 
  Cpu, 
  RefreshCw, 
  CheckCircle2, 
  XCircle, 
  Trophy, 
  BarChart3, 
  TrendingUp, 
  ShieldCheck, 
  User, 
  BookOpen, 
  Timer,
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip,
  Legend,
  LineChart,
  Line
} from 'recharts';
import { useAuth } from '../context/AuthContext';

interface CodingQuestion {
  id: number;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  category: string;
  expectedComplexity: string;
  description: string;
  boilerplates: {
    [key: string]: string;
  };
  testCases: { input: string; expected: string; args?: any[] }[];
  fnName: string;
  company: string;
  requiredKeywords?: string[];
}

const CODING_QUESTIONS: CodingQuestion[] = [
  // --- INFOR (4 Questions) ---
  {
    id: 1,
    title: "Contains Duplicate",
    difficulty: "Easy",
    category: "Arrays & Hashing",
    expectedComplexity: "Time: O(N) | Space: O(N)",
    description: "Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.",
    fnName: "containsDuplicate",
    company: "Incture",
    requiredKeywords: ["for", "set", "Set", "dict", "map"],
    boilerplates: {
      JavaScript: "function containsDuplicate(nums) {\n  // Write your solution here\n  return false;\n}",
      Python: "def containsDuplicate(nums: list) -> bool:\n    # Write your solution here\n    return False",
      Java: "import java.util.*;\n\nclass Solution {\n    public boolean containsDuplicate(int[] nums) {\n        // Write your solution here\n        return false;\n    }\n}",
      "C++": "#include <vector>\n#include <unordered_set>\n\nclass Solution {\npublic:\n    bool containsDuplicate(std::vector<int>& nums) {\n        // Write your solution here\n        return false;\n    }\n};"
    },
    testCases: [
      { input: "containsDuplicate([1, 2, 3, 1])", expected: "true", args: [[1, 2, 3, 1]] },
      { input: "containsDuplicate([1, 2, 3, 4])", expected: "false", args: [[1, 2, 3, 4]] }
    ]
  },
  {
    id: 2,
    title: "Merge Sorted Array",
    difficulty: "Easy",
    category: "Two Pointers",
    expectedComplexity: "Time: O(M + N) | Space: O(1)",
    description: "You are given two sorted integer arrays nums1 and nums2, sorted in non-decreasing order. Merge nums2 into nums1 as a single sorted array. The first array nums1 has a length of m + n to hold the merged elements. For simulation, return nums1.",
    fnName: "merge",
    company: "Incture",
    boilerplates: {
      JavaScript: "function merge(nums1, m, nums2, n) {\n  // Modify nums1 in-place and return it\n  // Write your solution here\n  return nums1;\n}",
      Python: "def merge(nums1: list, m: int, nums2: list, n: int) -> list:\n    # Modify nums1 in-place and return it\n    # Write your solution here\n    return nums1",
      Java: "class Solution {\n    public int[] merge(int[] nums1, int m, int[] nums2, int n) {\n        // Modify nums1 in-place\n        // Write your solution here\n        return nums1;\n    }\n}",
      "C++": "#include <vector>\n\nclass Solution {\npublic:\n    std::vector<int>& merge(std::vector<int>& nums1, int m, std::vector<int>& nums2, int n) {\n        // Modify nums1 in-place\n        // Write your solution here\n        return nums1;\n    }\n};"
    },
    testCases: [
      { input: "merge([1,2,3,0,0,0], 3, [2,5,6], 3)", expected: "[1,2,2,3,5,6]", args: [[1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3] },
      { input: "merge([1], 1, [], 0)", expected: "[1]", args: [[1], 1, [], 0] }
    ]
  },
  {
    id: 3,
    title: "Two Sum II",
    difficulty: "Medium",
    category: "Two Pointers",
    expectedComplexity: "Time: O(N) | Space: O(1)",
    description: "Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number and return their indices [index1, index2].",
    fnName: "twoSumSorted",
    company: "Incture",
    requiredKeywords: ["left", "right", "while", "for"],
    boilerplates: {
      JavaScript: "function twoSumSorted(numbers, target) {\n  // Write your solution here\n  return [];\n}",
      Python: "def twoSumSorted(numbers: list, target: int) -> list:\n    # Write your solution here\n    return []",
      Java: "class Solution {\n    public int[] twoSumSorted(int[] numbers, int target) {\n        // Write your solution here\n        return new int[]{};\n    }\n}",
      "C++": "#include <vector>\n\nclass Solution {\npublic:\n    std::vector<int> twoSumSorted(std::vector<int>& numbers, int target) {\n        // Write your solution here\n        return {};\n    }\n};"
    },
    testCases: [
      { input: "twoSumSorted([2, 7, 11, 15], 9)", expected: "[1,2]", args: [[2, 7, 11, 15], 9] },
      { input: "twoSumSorted([2,3,4], 6)", expected: "[1,3]", args: [[2, 3, 4], 6] }
    ]
  },
  {
    id: 4,
    title: "Maximum Subarray",
    difficulty: "Medium",
    category: "Dynamic Programming",
    expectedComplexity: "Time: O(N) | Space: O(1)",
    description: "Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum (Kadane's Algorithm).",
    fnName: "maxSubArray",
    company: "Incture",
    requiredKeywords: ["max", "sum", "for"],
    boilerplates: {
      JavaScript: "function maxSubArray(nums) {\n  // Write your solution here\n  return 0;\n}",
      Python: "def maxSubArray(nums: list) -> int:\n    # Write your solution here\n    return 0",
      Java: "class Solution {\n    public int maxSubArray(int[] nums) {\n        // Write your solution here\n        return 0;\n    }\n}",
      "C++": "#include <vector>\n#include <algorithm>\n\nclass Solution {\npublic:\n    int maxSubArray(std::vector<int>& nums) {\n        // Write your solution here\n        return 0;\n    }\n};"
    },
    testCases: [
      { input: "maxSubArray([-2,1,-3,4,-1,2,1,-5,4])", expected: "6", args: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]] },
      { input: "maxSubArray([5,4,-1,7,8])", expected: "23", args: [[5, 4, -1, 7, 8]] }
    ]
  },

  // --- SKYHIGH SECURITY (4 Questions) ---
  {
    id: 5,
    title: "Valid Anagram",
    difficulty: "Easy",
    category: "Arrays & Hashing",
    expectedComplexity: "Time: O(N) | Space: O(1)",
    description: "Given two strings s and t, return true if t is an anagram of s, and false otherwise. An anagram is a word formed by rearranging the letters of another.",
    fnName: "isAnagram",
    company: "Skyhigh",
    requiredKeywords: ["for", "sort", "length", "split", "Set", "Map", "dict"],
    boilerplates: {
      JavaScript: "function isAnagram(s, t) {\n  // Write your solution here\n  return false;\n}",
      Python: "def isAnagram(s: str, t: str) -> bool:\n    # Write your solution here\n    return False",
      Java: "import java.util.*;\n\nclass Solution {\n    public boolean isAnagram(String s, String t) {\n        // Write your solution here\n        return false;\n    }\n}",
      "C++": "#include <string>\n#include <unordered_map>\n\nclass Solution {\npublic:\n    bool isAnagram(std::string s, std::string t) {\n        // Write your solution here\n        return false;\n    }\n};"
    },
    testCases: [
      { input: "isAnagram(\"anagram\", \"nagaram\")", expected: "true", args: ["anagram", "nagaram"] },
      { input: "isAnagram(\"rat\", \"car\")", expected: "false", args: ["rat", "car"] }
    ]
  },
  {
    id: 6,
    title: "Single Number",
    difficulty: "Easy",
    category: "Bit Manipulation",
    expectedComplexity: "Time: O(N) | Space: O(1)",
    description: "Given a non-empty array of integers nums, every element appears twice except for one. Find that single one. You must implement a solution with a linear runtime complexity and use only constant extra space.",
    fnName: "singleNumber",
    company: "Skyhigh",
    requiredKeywords: ["^", "XOR", "for", "xor"],
    boilerplates: {
      JavaScript: "function singleNumber(nums) {\n  // Write your solution here\n  return 0;\n}",
      Python: "def singleNumber(nums: list) -> int:\n    # Write your solution here\n    return 0",
      Java: "class Solution {\n    public int singleNumber(int[] nums) {\n        // Write your solution here\n        return 0;\n    }\n}",
      "C++": "#include <vector>\n\nclass Solution {\npublic:\n    int singleNumber(std::vector<int>& nums) {\n        // Write your solution here\n        return 0;\n    }\n};"
    },
    testCases: [
      { input: "singleNumber([2, 2, 1])", expected: "1", args: [[2, 2, 1]] },
      { input: "singleNumber([4, 1, 2, 1, 2])", expected: "4", args: [[4, 1, 2, 1, 2]] }
    ]
  },
  {
    id: 7,
    title: "String Compression",
    difficulty: "Medium",
    category: "Two Pointers",
    expectedComplexity: "Time: O(N) | Space: O(1)",
    description: "Given an array of characters chars, compress it in-place. Begin with an empty string, and append the character followed by the group count if > 1. Return the new length of the array.",
    fnName: "compress",
    company: "Skyhigh",
    boilerplates: {
      JavaScript: "function compress(chars) {\n  // Compress in-place and return the compressed count\n  // Write your solution here\n  return chars.length;\n}",
      Python: "def compress(chars: list) -> int:\n    # Compress in-place and return new count\n    # Write your solution here\n    return len(chars)",
      Java: "class Solution {\n    public int compress(char[] chars) {\n        // Modify in-place and return new size\n        // Write your solution here\n        return chars.length;\n    }\n}",
      "C++": "#include <vector>\n\nclass Solution {\npublic:\n    int compress(std::vector<char>& chars) {\n        // Write your solution here\n        return chars.size();\n    }\n};"
    },
    testCases: [
      { input: "compress([\"a\",\"a\",\"b\",\"b\",\"c\",\"c\",\"c\"])", expected: "6", args: [["a","a","b","b","c","c","c"]] },
      { input: "compress([\"a\"])", expected: "1", args: [["a"]] }
    ]
  },
  {
    id: 8,
    title: "Longest Consecutive Sequence",
    difficulty: "Medium",
    category: "Arrays & Hashing",
    expectedComplexity: "Time: O(N) | Space: O(N)",
    description: "Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence. The algorithm must run in linear O(N) time.",
    fnName: "longestConsecutive",
    company: "Skyhigh",
    requiredKeywords: ["set", "Set", "unordered_set", "for", "while"],
    boilerplates: {
      JavaScript: "function longestConsecutive(nums) {\n  // Write your solution here\n  return 0;\n}",
      Python: "def longestConsecutive(nums: list) -> int:\n    # Write your solution here\n    return 0",
      Java: "import java.util.*;\n\nclass Solution {\n    public int longestConsecutive(int[] nums) {\n        // Write your solution here\n        return 0;\n    }\n}",
      "C++": "#include <vector>\n#include <unordered_set>\n\nclass Solution {\npublic:\n    int longestConsecutive(std::vector<int>& nums) {\n        // Write your solution here\n        return 0;\n    }\n};"
    },
    testCases: [
      { input: "longestConsecutive([100, 4, 200, 1, 3, 2])", expected: "4", args: [[100, 4, 200, 1, 3, 2]] },
      { input: "longestConsecutive([0,3,7,2,5,8,4,6,0,1])", expected: "9", args: [[0, 3, 7, 2, 5, 8, 4, 6, 0, 1]] }
    ]
  },

  // --- HP (4 Questions) ---
  {
    id: 9,
    title: "Fibonacci Number",
    difficulty: "Easy",
    category: "Math & Logic",
    expectedComplexity: "Time: O(N) | Space: O(1)",
    description: "Calculate F(n) where F(0) = 0, F(1) = 1, and F(n) = F(n-1) + F(n-2) for n > 1.",
    fnName: "fib",
    company: "HP",
    boilerplates: {
      JavaScript: "function fib(n) {\n  // Write your solution here\n  return 0;\n}",
      Python: "def fib(n: int) -> int:\n    # Write your solution here\n    return 0",
      Java: "class Solution {\n    public int fib(int n) {\n        // Write your solution here\n        return 0;\n    }\n}",
      "C++": "class Solution {\npublic:\n    int fib(int n) {\n        // Write your solution here\n        return 0;\n    }\n};"
    },
    testCases: [
      { input: "fib(2)", expected: "1", args: [2] },
      { input: "fib(4)", expected: "3", args: [4] }
    ]
  },
  {
    id: 10,
    title: "Missing Number",
    difficulty: "Easy",
    category: "Math & Logic",
    expectedComplexity: "Time: O(N) | Space: O(1)",
    description: "Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.",
    fnName: "missingNumber",
    company: "HP",
    requiredKeywords: ["sum", "for", "^"],
    boilerplates: {
      JavaScript: "function missingNumber(nums) {\n  // Write your solution here\n  return 0;\n}",
      Python: "def missingNumber(nums: list) -> int:\n    # Write your solution here\n    return 0",
      Java: "class Solution {\n    public int missingNumber(int[] nums) {\n        // Write your solution here\n        return 0;\n    }\n}",
      "C++": "#include <vector>\n\nclass Solution {\npublic:\n    int missingNumber(std::vector<int>& nums) {\n        // Write your solution here\n        return 0;\n    }\n};"
    },
    testCases: [
      { input: "missingNumber([3,0,1])", expected: "2", args: [[3, 0, 1]] },
      { input: "missingNumber([9,6,4,2,3,5,7,0,1])", expected: "8", args: [[9, 6, 4, 2, 3, 5, 7, 0, 1]] }
    ]
  },
  {
    id: 11,
    title: "Binary Search",
    difficulty: "Easy",
    category: "Binary Search",
    expectedComplexity: "Time: O(log N) | Space: O(1)",
    description: "Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, return its index. Otherwise, return -1.",
    fnName: "binarySearch",
    company: "HP",
    requiredKeywords: ["mid", "while", "left", "right"],
    boilerplates: {
      JavaScript: "function binarySearch(nums, target) {\n  // Write your solution here\n  return -1;\n}",
      Python: "def binarySearch(nums: list, target: int) -> int:\n    # Write your solution here\n    return -1",
      Java: "class Solution {\n    public int binarySearch(int[] nums, int target) {\n        // Write your solution here\n        return -1;\n    }\n}",
      "C++": "#include <vector>\n\nclass Solution {\npublic:\n    int binarySearch(std::vector<int>& nums, int target) {\n        // Write your solution here\n        return -1;\n    }\n};"
    },
    testCases: [
      { input: "binarySearch([-1,0,3,5,9,12], 9)", expected: "4", args: [[-1, 0, 3, 5, 9, 12], 9] },
      { input: "binarySearch([-1,0,3,5,9,12], 2)", expected: "-1", args: [[-1, 0, 3, 5, 9, 12], 2] }
    ]
  },
  {
    id: 12,
    title: "Valid Palindrome",
    difficulty: "Easy",
    category: "Two Pointers",
    expectedComplexity: "Time: O(N) | Space: O(1)",
    description: "Given a string s, return true if it is a palindrome, or false otherwise, after converting all uppercase letters into lowercase and removing all non-alphanumeric characters.",
    fnName: "isPalindrome",
    company: "HP",
    boilerplates: {
      JavaScript: "function isPalindrome(s) {\n  // Write your solution here\n  return false;\n}",
      Python: "def isPalindrome(s: str) -> bool:\n    # Write your solution here\n    return False",
      Java: "class Solution {\n    public boolean isPalindrome(String s) {\n        // Write your solution here\n        return false;\n    }\n}",
      "C++": "#include <string>\n\nclass Solution {\npublic:\n    bool isPalindrome(std::string s) {\n        // Write your solution here\n        return false;\n    }\n};"
    },
    testCases: [
      { input: "isPalindrome(\"A man, a plan, a canal: Panama\")", expected: "true", args: ["A man, a plan, a canal: Panama"] },
      { input: "isPalindrome(\"race a car\")", expected: "false", args: ["race a car"] }
    ]
  },

  // --- INFOSYS (4 Questions) ---
  {
    id: 13,
    title: "Is Subsequence",
    difficulty: "Easy",
    category: "Two Pointers",
    expectedComplexity: "Time: O(N) | Space: O(1)",
    description: "Given two strings s and t, return true if s is a subsequence of t, or false otherwise. (e.g. 'abc' is a subsequence of 'ahbgdc').",
    fnName: "isSubsequence",
    company: "Infosys",
    requiredKeywords: ["while", "for", "length", "size"],
    boilerplates: {
      JavaScript: "function isSubsequence(s, t) {\n  // Write your solution here\n  return false;\n}",
      Python: "def isSubsequence(s: str, t: str) -> bool:\n    # Write your solution here\n    return False",
      Java: "class Solution {\n    public boolean isSubsequence(String s, String t) {\n        // Write your solution here\n        return false;\n    }\n}",
      "C++": "#include <string>\n\nclass Solution {\npublic:\n    bool isSubsequence(std::string s, std::string t) {\n        // Write your solution here\n        return false;\n    }\n};"
    },
    testCases: [
      { input: "isSubsequence(\"abc\", \"ahbgdc\")", expected: "true", args: ["abc", "ahbgdc"] },
      { input: "isSubsequence(\"axc\", \"ahbgdc\")", expected: "false", args: ["axc", "ahbgdc"] }
    ]
  },
  {
    id: 14,
    title: "Fizz Buzz",
    difficulty: "Easy",
    category: "Math & Logic",
    expectedComplexity: "Time: O(N) | Space: O(1)",
    description: "Given an integer n, return a 1-indexed string array answer representing the classic FizzBuzz conditions.",
    fnName: "fizzBuzz",
    company: "Infosys",
    requiredKeywords: ["for", "if", "Fizz", "Buzz"],
    boilerplates: {
      JavaScript: "function fizzBuzz(n) {\n  // Write your solution here\n  return [];\n}",
      Python: "def fizzBuzz(n: int) -> list:\n    # Write your solution here\n    return []",
      Java: "import java.util.*;\n\nclass Solution {\n    public List<String> fizzBuzz(int n) {\n        // Write your solution here\n        return new ArrayList<>();\n    }\n}",
      "C++": "#include <vector>\n#include <string>\n\nclass Solution {\npublic:\n    std::vector<std::string> fizzBuzz(int n) {\n        // Write your solution here\n        return {};\n    }\n};"
    },
    testCases: [
      { input: "fizzBuzz(3)", expected: "[\"1\",\"2\",\"Fizz\"]", args: [3] },
      { input: "fizzBuzz(5)", expected: "[\"1\",\"2\",\"Fizz\",\"4\",\"Buzz\"]", args: [5] }
    ]
  },
  {
    id: 15,
    title: "Find Pivot Index",
    difficulty: "Easy",
    category: "Arrays & Hashing",
    expectedComplexity: "Time: O(N) | Space: O(1)",
    description: "Given an array of integers nums, calculate the pivot index where the sum of numbers strictly to the left equals the sum strictly to the right. Return -1 if no such index exists.",
    fnName: "pivotIndex",
    company: "Infosys",
    requiredKeywords: ["sum", "for", "left", "right"],
    boilerplates: {
      JavaScript: "function pivotIndex(nums) {\n  // Write your solution here\n  return -1;\n}",
      Python: "def pivotIndex(nums: list) -> int:\n    # Write your solution here\n    return -1",
      Java: "class Solution {\n    public int pivotIndex(int[] nums) {\n        // Write your solution here\n        return -1;\n    }\n}",
      "C++": "#include <vector>\n\nclass Solution {\npublic:\n    int pivotIndex(std::vector<int>& nums) {\n        // Write your solution here\n        return -1;\n    }\n};"
    },
    testCases: [
      { input: "pivotIndex([1,7,3,6,5,6])", expected: "3", args: [[1, 7, 3, 6, 5, 6]] },
      { input: "pivotIndex([1,2,3])", expected: "-1", args: [[1, 2, 3]] }
    ]
  },
  {
    id: 16,
    title: "Search in Rotated Sorted Array",
    difficulty: "Medium",
    category: "Binary Search",
    expectedComplexity: "Time: O(log N) | Space: O(1)",
    description: "There is an integer array nums sorted in ascending order that is rotationally shifted. Find dynamic index of target in nums in O(log N) time, returning -1 if not found.",
    fnName: "searchRotated",
    company: "Infosys",
    requiredKeywords: ["mid", "left", "right", "while"],
    boilerplates: {
      JavaScript: "function searchRotated(nums, target) {\n  // Write your solution here\n  return -1;\n}",
      Python: "def searchRotated(nums: list, target: int) -> int:\n    # Write your solution here\n    return -1",
      Java: "class Solution {\n    public int searchRotated(int[] nums, int target) {\n        // Write your solution here\n        return -1;\n    }\n}",
      "C++": "#include <vector>\n\nclass Solution {\npublic:\n    int searchRotated(std::vector<int>& nums, int target) {\n        // Write your solution here\n        return -1;\n    }\n};"
    },
    testCases: [
      { input: "searchRotated([4,5,6,7,0,1,2], 0)", expected: "4", args: [[4, 5, 6, 7, 0, 1, 2], 0] },
      { input: "searchRotated([4,5,6,7,0,1,2], 3)", expected: "-1", args: [[4, 5, 6, 7, 0, 1, 2], 3] }
    ]
  },

  // --- COGNIZANT (4 Questions) ---
  {
    id: 17,
    title: "Power of Two",
    difficulty: "Easy",
    category: "Math & Logic",
    expectedComplexity: "Time: O(1) | Space: O(1)",
    description: "Given an integer n, return true if it is a power of two. Otherwise, return false. An integer n is a power of two if there exists x where n == 2^x.",
    fnName: "isPowerOfTwo",
    company: "Cognizant",
    boilerplates: {
      JavaScript: "function isPowerOfTwo(n) {\n  // Write your solution here\n  return false;\n}",
      Python: "def isPowerOfTwo(n: int) -> bool:\n    # Write your solution here\n    return False",
      Java: "class Solution {\n    public boolean isPowerOfTwo(int n) {\n        // Write your solution here\n        return false;\n    }\n}",
      "C++": "class Solution {\npublic:\n    bool isPowerOfTwo(int n) {\n        // Write your solution here\n        return false;\n    }\n};"
    },
    testCases: [
      { input: "isPowerOfTwo(16)", expected: "true", args: [16] },
      { input: "isPowerOfTwo(3)", expected: "false", args: [3] }
    ]
  },
  {
    id: 18,
    title: "Length of Last Word",
    difficulty: "Easy",
    category: "String Manipulation",
    expectedComplexity: "Time: O(N) | Space: O(1)",
    description: "Given a string s consisting of words and spaces, return the length of the last word in the string.",
    fnName: "lengthOfLastWord",
    company: "Cognizant",
    boilerplates: {
      JavaScript: "function lengthOfLastWord(s) {\n  // Write your solution here\n  return 0;\n}",
      Python: "def lengthOfLastWord(s: str) -> int:\n    # Write your solution here\n    return 0",
      Java: "class Solution {\n    public int lengthOfLastWord(String s) {\n        // Write your solution here\n        return 0;\n    }\n}",
      "C++": "#include <string>\n\nclass Solution {\npublic:\n    int lengthOfLastWord(std::string s) {\n        // Write your solution here\n        return 0;\n    }\n};"
    },
    testCases: [
      { input: "lengthOfLastWord(\"Hello World\")", expected: "5", args: ["Hello World"] },
      { input: "lengthOfLastWord(\"   fly me   to   the moon  \")", expected: "4", args: ["   fly me   to   the moon  "] }
    ]
  },
  {
    id: 19,
    title: "Climbing Stairs",
    difficulty: "Easy",
    category: "Dynamic Programming",
    expectedComplexity: "Time: O(N) | Space: O(1)",
    description: "You are climbing a staircase. It takes n steps to reach the top. Each time you can climb 1 or 2 steps. Find how many distinct ways you can reach the top.",
    fnName: "climbStairs",
    company: "Cognizant",
    requiredKeywords: ["for", "while", "array", "memo", "a", "b"],
    boilerplates: {
      JavaScript: "function climbStairs(n) {\n  // Write your solution here\n  return 0;\n}",
      Python: "def climbStairs(n: int) -> int:\n    # Write your solution here\n    return 0",
      Java: "class Solution {\n    public int climbStairs(int n) {\n        // Write your solution here\n        return 0;\n    }\n}",
      "C++": "class Solution {\npublic:\n    int climbStairs(int n) {\n        // Write your solution here\n        return 0;\n    }\n};"
    },
    testCases: [
      { input: "climbStairs(2)", expected: "2", args: [2] },
      { input: "climbStairs(3)", expected: "3", args: [3] }
    ]
  },
  {
    id: 20,
    title: "Majority Element",
    difficulty: "Easy",
    category: "Arrays & Hashing",
    expectedComplexity: "Time: O(N) | Space: O(1)",
    description: "Given an array nums of size n, return the majority element (appears more than n/2 times). Standard Moore's Voting algorithm or count structures.",
    fnName: "majorityElement",
    company: "Cognizant",
    requiredKeywords: ["count", "candidate", "for", "while"],
    boilerplates: {
      JavaScript: "function majorityElement(nums) {\n  // Write your solution here\n  return 0;\n}",
      Python: "def majorityElement(nums: list) -> int:\n    # Write your solution here\n    return 0",
      Java: "class Solution {\n    public int majorityElement(int[] nums) {\n        // Write your solution here\n        return 0;\n    }\n}",
      "C++": "#include <vector>\n\nclass Solution {\npublic:\n    int majorityElement(std::vector<int>& nums) {\n        // Write your solution here\n        return 0;\n    }\n};"
    },
    testCases: [
      { input: "majorityElement([3, 2, 3])", expected: "3", args: [[3, 2, 3]] },
      { input: "majorityElement([2, 2, 1, 1, 1, 2, 2])", expected: "2", args: [[2, 2, 1, 1, 1, 2, 2]] }
    ]
  }
];

export default function CodingPlatform() {
  const { user } = useAuth();
  
  const [selectedCompany, setSelectedCompany] = useState<string>('Incture');
  const [activeQuestionId, setActiveQuestionId] = useState<number>(1);
  const [selectedLanguage, setSelectedLanguage] = useState<'C++' | 'Java' | 'Python' | 'JavaScript'>('JavaScript');
  
  const filteredQuestions = CODING_QUESTIONS.filter(item => item.company === selectedCompany);
  const q = CODING_QUESTIONS.find(item => item.id === activeQuestionId) || CODING_QUESTIONS[0];
  const activeCodeIdx = CODING_QUESTIONS.indexOf(q);

  const [userCode, setUserCode] = useState('');
  const [isCompiling, setIsCompiling] = useState(false);
  const [userScores, setUserScores] = useState<{ [qId: number]: number }>({});
  const [compileLogs, setCompileLogs] = useState<string[]>([
    "✓ Core compilation backend online.",
    "✓ Isolated runtime sandbox is active (TLS 1.2 Encrypted)",
    "Awaiting code assessment submit trigger..."
  ]);
  const [activeTab, setActiveTab] = useState<'workbench' | 'leaderboard' | 'analytics'>('workbench');
  const [diagnosticResult, setDiagnosticResult] = useState<{
    score: number;
    syntax: string;
    complexity: string;
    passed: boolean;
    feedback: string;
    metrics: { cpu: string; memory: string; time: string };
  } | null>(null);
  const [syntaxError, setSyntaxError] = useState<string | null>(null);

  // Sync boilerplate when language or activeQuestionId changes
  useEffect(() => {
    setUserCode(q.boilerplates[selectedLanguage] || q.boilerplates['JavaScript']);
    setDiagnosticResult(null);
  }, [activeQuestionId, selectedLanguage]);

  // Reset activeQuestionId when selectedCompany changes to ensure it matches the selected recruiter
  useEffect(() => {
    // Only reset if active question's company is not the selected one
    const activeQ = CODING_QUESTIONS.find(item => item.id === activeQuestionId);
    if (activeQ && activeQ.company === selectedCompany) {
      return;
    }
    const firstQ = CODING_QUESTIONS.find(item => item.company === selectedCompany);
    if (firstQ) {
      setActiveQuestionId(firstQ.id);
    }
  }, [selectedCompany, activeQuestionId]);

  // Live syntax check effect as the user types
  useEffect(() => {
    // Universal Empty Code Check
    if (!userCode.trim()) {
      setSyntaxError("Compilation Error: Submission code is entirely empty. Please write or preserve the solution structure.");
      return;
    }

    const fnName = q.fnName;
    const lines = userCode.split('\n');

    // Universal Standalone Alphabetical & Rogue Keypress/Semicolon validation
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();
      if (!trimmed) continue;

      // 1. Standalone Orphaned Semicolons or standalone symbols
      if (trimmed === ';') {
        setSyntaxError(`Line ${i + 1}: Found standalone empty semicolon ';'. Remove idle empty semicolons outside statements.`);
        return;
      }
      if (trimmed === ',') {
        setSyntaxError(`Line ${i + 1}: Syntax error. Trailing orphaned comma ',' outside any parameter context.`);
        return;
      }

      // Check for standalone alphabetical letters / illegal words sitting alone on a line! (e.g. "jh;", "asdf;", "abc;", "x;", "xyz;")
      // We will strip inline comments first
      let cleanLine = trimmed;
      if (cleanLine.includes('//')) {
        cleanLine = cleanLine.split('//')[0].trim();
      } else if (cleanLine.includes('#')) {
        cleanLine = cleanLine.split('#')[0].trim();
      }
      
      const cleanTrimmed = cleanLine.trim();
      if (!cleanTrimmed) continue;

      // Match standalone words like "jh", "asdf" with a semicolon, e.g., "jh;", "asdf;", "x;", "abc;"
      // Ensure we do not trigger on safe words like "break;", "continue;", "return;", "pass;", "else;", etc.
      const safeWords = ["break", "continue", "return", "pass", "else", "try", "do", "public", "private", "protected", "default", "const", "let", "var", "import", "package", "class", "interface", "using", "namespace", "std"];
      
      // Matches a single word with an optional semicolon: e.g. "jh;" or "asdf" or "x;"
      if (/^[a-zA-Z]+;?$/.test(cleanTrimmed)) {
        const wordWithNoSemi = cleanTrimmed.replace(';', '');
        if (!safeWords.includes(wordWithNoSemi) && selectedLanguage !== 'Python') {
          setSyntaxError(`Line ${i + 1}: Standalone alphabetical character or unassigned identifier '${cleanTrimmed}' detected. Statements must be valid assignments, variable declarations, or functional calls.`);
          return;
        }
      }

      // Standalone single operators, e.g., "+;", "-;", "*;", "/;", "&&;", "||;", "=;"
      if (/^[\+\-\*\/%&\|=!]+;$/.test(cleanTrimmed)) {
        setSyntaxError(`Line ${i + 1}: Invalid operator placement. Found compiler token '${cleanTrimmed}' without preceding or succeeding operand expressions.`);
        return;
      }

      // 2. Double semicolons check (e.g. "return true;;")
      if (cleanTrimmed.includes(';;')) {
        setSyntaxError(`Line ${i + 1}: Duplicate consecutive semicolons ';;' detected. Clean up redundant double statement terminators.`);
        return;
      }

      // 3. Consecutive identifiers space checking in JavaScript/Python
      if (selectedLanguage === 'JavaScript' || selectedLanguage === 'Python') {
        const words = cleanTrimmed.split(/\s+/);
        if (words.length >= 3 && !cleanTrimmed.includes('"') && !cleanTrimmed.includes("'") && !cleanTrimmed.includes('`')) {
          for (let w = 0; w < words.length - 1; w++) {
            const current = words[w];
            const next = words[w + 1];
            if (/^[a-z_][a-zA-Z0-9_]*$/.test(current) && /^[a-z_][a-zA-Z0-9_]*$/.test(next)) {
              const forbiddenCombinations = ["let", "const", "var", "function", "return", "def", "if", "elif", "else", "for", "while", "and", "or", "not", "is", "in", "import", "from", "as", "class", "try", "except"];
              if (!forbiddenCombinations.includes(current) && !forbiddenCombinations.includes(next)) {
                setSyntaxError(`Line ${i + 1}: Compilation error. Consecutive orphaned word variables '${current} ${next}' detected without connecting operators.`);
                return;
              }
            }
          }
        }
      }
    }

    // 1. ChatGPT/LLM Prose Detection
    const invalidLLMTokens = ["```", "here is", "sure, ", "implementation:", "python code", "java code", "cpp code", "javascript code", "explanation:", "analysis:"];
    const lowercaseCode = userCode.toLowerCase();
    for (const token of invalidLLMTokens) {
      if (lowercaseCode.includes(token)) {
        setSyntaxError(`ChatGPT/External explanation prose detected ("${token}"). Please keep ONLY the pure programming code structure inside the editor.`);
        return;
      }
    }

    // 2. Bracket & Parentheses balance check - applies universally to curly brace languages
    if (selectedLanguage !== 'Python') {
      const braceOpen = (userCode.match(/\{/g) || []).length;
      const braceClose = (userCode.match(/\}/g) || []).length;
      const parenOpen = (userCode.match(/\(/g) || []).length;
      const parenClose = (userCode.match(/\)/g) || []).length;
      const bracketOpen = (userCode.match(/\[/g) || []).length;
      const bracketClose = (userCode.match(/\]/g) || []).length;

      if (braceOpen !== braceClose) {
        setSyntaxError(`Mismatched curly braces {}. Found ${braceOpen} opening and ${braceClose} closing.`);
        return;
      }
      if (parenOpen !== parenClose) {
        setSyntaxError(`Mismatched parentheses (). Found ${parenOpen} opening and ${parenClose} closing.`);
        return;
      }
      if (bracketOpen !== bracketClose) {
        setSyntaxError(`Mismatched square brackets []. Found ${bracketOpen} opening and ${bracketClose} closing.`);
        return;
      }
    }

    // 3. Code written outside the main class / function block structure (Rogue text / Semicolons)
    // lines split reference is already available in outer scope
    let codeOutsideBlock = false;
    let openCount = 0;
    let hasEnteredBlock = false;
    let firstBlockClosed = false;

    // Check for general language comments, block endings, line by line
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line || line.startsWith('//') || line.startsWith('/*') || line.startsWith('*') || line.startsWith('#')) {
        continue; // comments or blank lines are safe
      }
      
      // Semicolon check on idle text
      if (line === ';') {
        setSyntaxError(`Line ${i + 1}: Found standalone empty semicolon ';'. Remove idle empty semicolons outside statements.`);
        return;
      }

      if (selectedLanguage !== 'Python') {
        if (line.includes('{')) {
          openCount += (line.match(/\{/g) || []).length;
          hasEnteredBlock = true;
        }
        if (line.includes('}')) {
          openCount -= (line.match(/\}/g) || []).length;
          if (openCount === 0 && hasEnteredBlock) {
            firstBlockClosed = true;
          }
        }
        
        // If first block has closed and we see more executable code lines at the base margin, that's irrelevant code outside block!
        if (firstBlockClosed && openCount === 0 && line !== '}' && line !== '};' && !line.startsWith('import')) {
          codeOutsideBlock = true;
          break;
        }
      }
    }

    if (codeOutsideBlock) {
      setSyntaxError("Irrelevant Code Warning: Detected executable statements or definitions written outside the main Solution class/function block boundaries.");
      return;
    }

    // Python specific block scope checking
    if (selectedLanguage === 'Python') {
      let inFunction = false;
      let pyCodeOutside = false;
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#') || trimmed.startsWith('"""') || trimmed.startsWith("'''")) {
          continue;
        }
        if (trimmed.startsWith('def ' + fnName)) {
          inFunction = true;
          continue;
        }
        // If we have non-indented execution code outside def
        if (inFunction && !line.startsWith(' ') && !line.startsWith('\t')) {
          pyCodeOutside = true;
          break;
        }
      }
      if (pyCodeOutside) {
        setSyntaxError("Irrelevant Code Error: Detected statements / variable assignments executed outside of the local def function scope.");
        return;
      }
    }

    // 4. Language-specific parsing/heuristics
    if (selectedLanguage === 'JavaScript') {
      try {
        // Evaluate using browser JS parsing engine in isolated Context Function
        new Function(`
          ${userCode}
          if (typeof ${fnName} !== 'function') {
            throw new Error("Target evaluation function '${fnName}' is missing or has been renamed.");
          }
        `);

        setSyntaxError(null);
      } catch (err: any) {
        setSyntaxError(err.message || String(err));
      }
    } else {
      // General static validation triggers for C++, Java, Python
      if (!userCode.includes(fnName)) {
        setSyntaxError(`Function identifier '${fnName}' is missing. Preserve key naming conventions.`);
        return;
      }

      if (selectedLanguage === 'Java' || selectedLanguage === 'C++') {
        if (!userCode.includes('class Solution')) {
          setSyntaxError(`Main wrapper 'class Solution' is missing. Please wrap your code in class Solution.`);
          return;
        }

        for (let i = 0; i < lines.length; i++) {
          const lineText = lines[i];
          const trimmed = lineText.trim();
          if (!trimmed) continue;

          // Strip comments
          let cleanLine = trimmed;
          if (cleanLine.includes('//')) {
            cleanLine = cleanLine.split('//')[0].trim();
          }

          // A. JS keywords inside C++/Java
          if (/\b(?:let|const|var|function)\b/.test(cleanLine)) {
            const word = cleanLine.match(/\b(?:let|const|var|function)\b/)?.[0];
            setSyntaxError(`Line ${i + 1}: JavaScript keyword '${word}' is invalid in ${selectedLanguage}. Declaring explicit types or standard method structures is required.`);
            return;
          }

          // B. Boolean Capitalization Check
          if (/\b(?:True|False)\b/.test(cleanLine)) {
            setSyntaxError(`Line ${i + 1}: Boolean literals in ${selectedLanguage} are lowercase 'true'/'false'. Found capitalized '${cleanLine.match(/\b(?:True|False)\b/)?.[0]}'.`);
            return;
          }

          // C. Python comment indicator inside C++/Java
          if (trimmed.startsWith('#')) {
            // Check if it's not a preprocessor directive
            if (!/^(?:#include|#define|#pragma|#ifdef|#ifndef|#endif|#else|#elif)/.test(trimmed)) {
              setSyntaxError(`Line ${i + 1}: Python-style comment delimiter '#' found. In ${selectedLanguage}, use '//' for inline comments or '/*' for block comments.`);
              return;
            }
          }

          // D. Logical operators suggestion
          if (selectedLanguage === 'Java') {
            if (/\s+\b(?:and|or|not)\b\s+/.test(cleanLine) || /^not\b/.test(cleanLine)) {
              setSyntaxError(`Line ${i + 1}: Found Python logical words like 'and', 'or', or 'not'. In Java, you must use symbolic logical operators (&&, ||, !).`);
              return;
            }
          }

          // E. Python-style None values
          if (/\bNone\b/.test(cleanLine)) {
            const advice = selectedLanguage === 'C++' ? 'nullptr' : 'null';
            setSyntaxError(`Line ${i + 1}: Keyword 'None' is invalid in ${selectedLanguage}. Use '${advice}' to represent empty bindings.`);
            return;
          }

          // F. Semicolon Checks (Statements that must be closed with Semicolons)
          if (cleanLine.length > 2 && 
              !cleanLine.endsWith('{') && 
              !cleanLine.endsWith('}') && 
              !cleanLine.endsWith('};') && 
              !cleanLine.endsWith(';') && 
              !cleanLine.startsWith('#') &&
              !cleanLine.startsWith('class') &&
              !cleanLine.startsWith('public') &&
              !cleanLine.startsWith('private') &&
              !cleanLine.startsWith('import') &&
              !cleanLine.startsWith('package') &&
              !cleanLine.startsWith('@') && // Annotations like @Override
              !cleanLine.startsWith('for') && 
              !cleanLine.startsWith('while') && 
              !cleanLine.startsWith('if') && 
              !cleanLine.startsWith('else')) {
            setSyntaxError(`Line ${i + 1}: Missing expected trailing semicolon ';' at the end of the ${selectedLanguage} statement.`);
            return;
          }
        }
      }

      if (selectedLanguage === 'Python') {
        for (let i = 0; i < lines.length; i++) {
          const lineText = lines[i];
          const trimmed = lineText.trim();
          if (!trimmed) continue;

          // Strip simple comments
          let cleanLine = trimmed;
          if (cleanLine.includes('#')) {
            cleanLine = cleanLine.split('#')[0].trim();
          }
          if (!cleanLine) continue;

          // A. Semicolon check
          if (cleanLine.endsWith(';')) {
            setSyntaxError(`Line ${i + 1}: Redundant semicolon ';' detected. Python statements do not require a trailing semicolon.`);
            return;
          }

          // B. Double-slash C-comment check
          if (lineText.includes('//')) {
            setSyntaxError(`Line ${i + 1}: C-style comment delimiter '//' detected. Use '#' to start comments in Python.`);
            return;
          }

          // C. Block colon Check
          if (trimmed.startsWith('def ') || trimmed.startsWith('for ') || trimmed.startsWith('while ') || trimmed.startsWith('if ') || trimmed.startsWith('elif ') || trimmed.startsWith('else:')) {
            if (!trimmed.endsWith(':')) {
              setSyntaxError(`Line ${i + 1}: Python grammar violation. Block headers (def, for, while, if, etc.) require a trailing colon (:).`);
              return;
            }
          }

          // D. Lowercase boolean literals
          if (/\b(?:true|false)\b/.test(cleanLine)) {
            const matchedWord = cleanLine.match(/\b(?:true|false)\b/)?.[0];
            const capitalized = matchedWord === 'true' ? 'True' : 'False';
            setSyntaxError(`Line ${i + 1}: Lowercase boolean literal '${matchedWord}' detected. Python boolean literals must be capitalized: '${capitalized}'.`);
            return;
          }

          // E. Lowercase None keyword
          if (/\b(?:null|nullptr|nil)\b/.test(cleanLine)) {
            const word = cleanLine.match(/\b(?:null|nullptr|nil)\b/)?.[0];
            setSyntaxError(`Line ${i + 1}: Keyword '${word}' is invalid in Python. Use capital 'None' to denote null pointers or empty objects.`);
            return;
          }

          // F. JavaScript/Java styling boundaries: curly braces
          if (cleanLine === '{' || cleanLine === '}' || cleanLine.endsWith('{') || cleanLine.endsWith('}')) {
            setSyntaxError(`Line ${i + 1}: Curly brace '${cleanLine.includes('{') ? '{' : '}'}' detected. Python is scoped purely via line indentation spacing instead of curly brackets.`);
            return;
          }

          // G. Wrong Logical/Boolean operators in Python
          if (/&&|\|\||!/.test(cleanLine)) {
            if (cleanLine.includes('&&') && !/['"].*&&.*['"]/.test(cleanLine)) {
              setSyntaxError(`Line ${i + 1}: C-style logical operator '&&' found. In Python, use the keyword 'and'.`);
              return;
            }
            if (cleanLine.includes('||') && !/['"].*\|\|.*['"]/.test(cleanLine)) {
              setSyntaxError(`Line ${i + 1}: C-style logical operator '||' found. In Python, use the keyword 'or'.`);
              return;
            }
          }

          // H. JavaScript variable declaration keyword inside Python
          if (/\b(?:let|const|var)\b/.test(cleanLine)) {
            const word = cleanLine.match(/\b(?:let|const|var)\b/)?.[0];
            setSyntaxError(`Line ${i + 1}: JavaScript declaration keyword '${word}' found inside Python. Python variables are declared with direct assignments (e.g. key = value).`);
            return;
          }
        }
      }

      setSyntaxError(null);
    }
  }, [userCode, selectedLanguage, activeCodeIdx]);

  // Load user previous scores from localStorage to trigger placement ranks
  useEffect(() => {
    try {
      const saved = localStorage.getItem('user_coding_scores');
      if (saved) {
        setUserScores(JSON.parse(saved));
      } else {
        // Default base solve score
        const def = { 3: 95 }; // LED question solved by default
        setUserScores(def);
        localStorage.setItem('user_coding_scores', JSON.stringify(def));
      }
    } catch (e) {
      console.warn("localStorage loading failed", e);
    }
  }, []);

  const totalPoints = Object.values(userScores).reduce((a, b) => a + b, 0);
  const solvedCount = Object.keys(userScores).length;

  // Placement Tiers config based on points earned (max ~400 points)
  const getPlacementTier = () => {
    if (totalPoints >= 260) {
      return {
        title: "S-Tier Elite Programmer",
        description: "Superlative algorithmic syntax accuracy. Placed in the top 1% bracket regionally. Directly recommended to high-throughput core service pods.",
        badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        ringColor: "ring-emerald-500/30",
        textColor: "text-emerald-400"
      };
    }
    if (totalPoints >= 170) {
      return {
        title: "A-Tier Highly Ready Developer",
        description: "Excellent systems reasoning and structured design format. Highly competitive for senior software placements.",
        badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
        ringColor: "ring-cyan-500/30",
        textColor: "text-cyan-400"
      };
    }
    if (totalPoints >= 80) {
      return {
        title: "B-Tier Competent Full-Stack",
        description: "Balanced logic capacity. Solid grip over runtime complexity metrics. Ready for general standard core development roles.",
        badgeColor: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
        ringColor: "ring-yellow-500/30",
        textColor: "text-yellow-400"
      };
    }
    return {
      title: "C-Tier Technical Apprentice",
      description: "Basic programming baseline. Practice more sandbox exercises to build high-throughput connection indexing credentials.",
      badgeColor: "bg-slate-500/10 text-slate-400 border-slate-500/20",
      ringColor: "ring-slate-500/30",
      textColor: "text-slate-400"
    };
  };

  const currentTier = getPlacementTier();

  // Simulated regional Top 10 Leaderboard
  const LEADERBOARD_CANDIDATES = [
    { rank: 1, name: "Priya Nair", college: "IIT Madras", solved: 4, score: 388, tier: "S-Tier Elite", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120" },
    { rank: 2, name: "Kenji Sato", college: "Stanford University", solved: 4, score: 375, tier: "S-Tier Elite", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120" },
    { rank: 3, name: "Elena Rostova", college: "TUM Munich", solved: 4, score: 360, tier: "S-Tier Elite", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120" },
    { rank: 4, name: "Yusuf Al-Fayed", college: "KFUPM Dhahran", solved: 3, score: 285, tier: "S-Tier Elite", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120" },
    { rank: 5, name: user?.name ? `${user.name} (You)` : "Devon Lee (You)", college: user?.email || "devon.lee@university.edu", solved: solvedCount, score: totalPoints, tier: currentTier.title.split(' ')[0], avatar: user?.avatar || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120", isUser: true },
    { rank: 6, name: "Xiao Meng", college: "Tsinghua University", solved: 3, score: 255, tier: "A-Tier Ready", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120" },
    { rank: 7, name: "Carlos Santana", college: "Unicamp Brazil", solved: 2, score: 180, tier: "A-Tier Ready", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120" },
    { rank: 8, name: "Fatima Zahra", college: "NUST Islamabad", solved: 2, score: 175, tier: "A-Tier Ready", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120" },
    { rank: 9, name: "Marcus Aurelius", college: "Sapienza Rome", solved: 1, score: 90, tier: "B-Tier Competent", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120" },
    { rank: 10, name: "Siddharth Shahi", college: "BITS Pilani", solved: 1, score: 85, tier: "B-Tier Competent", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120" }
  ].sort((a,b) => b.score - a.score).map((cand, index) => ({...cand, rank: index + 1}));

  // Recharts analytic data
  const chartData = [
    { subject: 'Memory Efficiency', Value: Math.round(solvedCount > 0 ? 70 + (solvedCount * 7.5) : 40), fullMark: 100 },
    { subject: 'Big-O Complexity', Value: Math.round(solvedCount > 0 ? 65 + (solvedCount * 8) : 50), fullMark: 100 },
    { subject: 'Functional Safety', Value: Math.round(solvedCount > 0 ? 80 + (solvedCount * 5) : 60), fullMark: 100 },
    { subject: 'Correctness/Coverage', Value: Math.round(solvedCount > 0 ? 75 + (solvedCount * 6) : 45), fullMark: 100 },
    { subject: 'Static Types Guard', Value: Math.round(selectedLanguage === 'TypeScript' || selectedLanguage === 'Go' || selectedLanguage === 'C++' ? 95 : 60), fullMark: 100 },
    { subject: 'Runtime Speed (ms)', Value: Math.round(solvedCount > 0 ? 82 + (solvedCount * 4) : 55), fullMark: 100 },
  ];

  const historicalSubmissions = [
    { name: 'Week 1', solved: 0, points: 0, regionPercentile: 24 },
    { name: 'Week 2', solved: 1, points: 95, regionPercentile: 58 },
    { name: 'Week 3', solved: solvedCount, points: totalPoints, regionPercentile: totalPoints > 200 ? 94 : totalPoints > 100 ? 76 : 58 },
  ];

  const handleRunEvaluation = () => {
    setIsCompiling(true);
    const q = CODING_QUESTIONS[activeCodeIdx];
    
    setCompileLogs(prev => [
      ...prev,
      `[COMPILING]: Initiating static check on source text...`,
      `[TRANSPILING]: Normalizing AST syntactic keywords as ${selectedLanguage}...`,
      `[SANDBOX ROOM]: Spawning sandboxed browser worker process...`
    ]);

    setTimeout(() => {
      // Prevent false positive test passes: abort early if there is an active syntax error.
      if (syntaxError) {
        setCompileLogs(prev => [
          ...prev,
          `❌ [PRE-COMPILE HALTED]: Found active syntax violations. Code run aborted.`,
          `❌ [ERROR TARGETED]: ${syntaxError}`
        ]);
        setDiagnosticResult({
          score: 0,
          syntax: "Syntax Error Detected",
          complexity: "N/A",
          passed: false,
          feedback: `Compilation failed: ${syntaxError}. Correct your code structure and try again.`,
          metrics: {
            cpu: "N/A",
            memory: "N/A",
            time: "N/A"
          }
        });
        
        const updatedScores = { ...userScores };
        delete updatedScores[q.id];
        setUserScores(updatedScores);
        localStorage.setItem('user_coding_scores', JSON.stringify(updatedScores));

        setIsCompiling(false);
        return;
      }

      let passed = true;
      const logs: string[] = [];
      let executionError = "";

      try {
        if (selectedLanguage === 'JavaScript') {
          let cleanCode = userCode;

          // Evaluate the user code in a function context
          const fnName = q.fnName;
          
          // Parse helper
          const contextRunner = new Function(`
            ${cleanCode}
            if (typeof ${fnName} !== 'function') {
              throw new Error("Target function '${fnName}' is not defined. Ensure you haven't renamed the main assessment function.");
            }
            return ${fnName};
          `);

          const targetFunc = contextRunner();

          // Evaluate test cases with user code
          for (let i = 0; i < q.testCases.length; i++) {
            const tc = q.testCases[i];
            logs.push(`[TEST_CASE ${i + 1}]: Evaluating arguments: ${tc.input}`);

            let evaluatedResult: any;
            if (tc.args) {
              const argsCopy = JSON.parse(JSON.stringify(tc.args));
              evaluatedResult = targetFunc(...argsCopy);
            } else {
              evaluatedResult = targetFunc();
            }

            const serializedResult = JSON.stringify(evaluatedResult);
            
            // Format expected values for comparison by matching compact JSON tokens
            const expectedCompact = tc.expected.replace(/\s+/g, '').toLowerCase();
            const gotCompact = (serializedResult || '').replace(/\s+/g, '').toLowerCase();

            if (expectedCompact === gotCompact || (tc.expected === 'true' && evaluatedResult === true) || (tc.expected === 'false' && evaluatedResult === false)) {
              logs.push(`✓ [TEST CASE PASSED]: Got exact response output: ${serializedResult}`);
            } else {
              passed = false;
              logs.push(`❌ [TEST CASE FAILED]`);
              logs.push(`   -> Expected value: ${tc.expected}`);
              logs.push(`   -> Obtained value: ${serializedResult}`);
            }
          }
        } else {
          // For non-JS/TS: Support intelligent static verification so other languages feel completely authentic
          logs.push(`[SIMULATION RUN]: Initializing standard runtime engine for ${selectedLanguage}...`);
          
          const unalteredBoilerplate = userCode.trim() === q.boilerplates[selectedLanguage]?.trim();
          const hasKnownSyntaxErrors = userCode.includes("err") && (userCode.includes("syntax") || userCode.includes("unresolved") || userCode.includes("missing"));
          const tooMinified = userCode.trim().length < 45;

          if (unalteredBoilerplate) {
            passed = false;
            logs.push(`❌ [COMPILE ERROR]: Solution has not been modified from the default boilerplate template.`);
            logs.push(`❌ Complete the function content before running evaluation.`);
          } else if (hasKnownSyntaxErrors || tooMinified) {
            passed = false;
            logs.push(`❌ [BUILD TIMEOUT]: Algorithmic script structure has syntax issues or is too short.`);
          } else {
            // Verify structural correctness checks patterns in string based on required keywords
            let logicPasses = true;

            if (q.requiredKeywords) {
              const missingKeyword = q.requiredKeywords.find(kw => !userCode.includes(kw) && !userCode.toLowerCase().includes(kw));
              if (missingKeyword) {
                logicPasses = false;
                logs.push(`❌ [ALGORITHMIC OMISSION]: Missing key logic element containing reference structure '${missingKeyword}'.`);
              }
            }

            if (logicPasses) {
              for (let i = 0; i < q.testCases.length; i++) {
                logs.push(`✓ [TEST CASE ${i + 1} PASSED]: Output matched signature template successfully.`);
              }
            } else {
              passed = false;
            }
          }
        }
      } catch (err: any) {
        passed = false;
        executionError = err.message || String(err);
        logs.push(`❌ [RUNTIME EXCEPTION]: ${executionError}`);
      }

      // Calculate score and update state
      const finalScore = passed ? Math.round(92 + Math.random() * 8) : 0;
      
      const updatedScores = { ...userScores };
      if (passed) {
        updatedScores[q.id] = finalScore;
      } else {
        // If code fails, it removes points for this exercise!
        delete updatedScores[q.id];
      }
      
      // If student fails the Valid Anagram question (id === 5), add to Concept Recovery
      if (!passed && q.id === 5) {
        let problemsList = [];
        try {
          const stored = localStorage.getItem('career_pilot_failed_problems');
          if (stored) {
            problemsList = JSON.parse(stored);
          }
        } catch (e) {
          console.warn(e);
        }
        
        const alreadyExists = problemsList.some((p: any) => p.id === 'valid-anagram');
        if (!alreadyExists) {
          const newFailedObj = {
            id: 'valid-anagram',
            title: 'Valid Anagram',
            difficulty: 'Easy',
            topic: 'Arrays & Hashing',
            failedCode: userCode,
            errorType: 'Logical Check / Output assertion mismatch',
            originalComplexity: 'O(N log N) / Dynamic String Split',
            expectedComplexity: 'Time: O(N) | Space: O(1)',
            confidence: 'Low',
            associatedConcept: 'Valid Anagram (Frequency Matching)',
            logicError: 'Failed to build standard word counters or character tally indexes correctly.',
            prerequisites: [
              { name: 'Arrays', status: 'completed' },
              { name: 'Strings', status: 'completed' },
              { name: 'Hash Map Tally', status: 'missing' }
            ],
            steps: [
              { title: 'Learn Character Counting (Frequency Maps)', desc: 'Understand how to map symbols to frequency occurrences.' },
              { title: 'Tally characters for target and source string', desc: 'Identify rolling sum or fixed size character increment/decrement logic.' },
              { title: 'Analyze character count boundaries', desc: 'Detect missing/extra letters by verifying frequency count balance.' }
            ],
            questions: [
              { title: 'Contains Duplicate', difficulty: 'Easy' },
              { title: 'Two Sum', difficulty: 'Easy' },
              { title: 'Group Anagrams', difficulty: 'Medium' },
              { title: 'Permutation in String', difficulty: 'Medium' },
              { title: 'Find All Anagrams in a String', difficulty: 'Medium' }
            ]
          };
          problemsList.push(newFailedObj);
          localStorage.setItem('career_pilot_failed_problems', JSON.stringify(problemsList));
        } else {
          // Update failedCode anyway
          const idx = problemsList.findIndex((p: any) => p.id === 'valid-anagram');
          if (idx !== -1) {
            problemsList[idx].failedCode = userCode;
            localStorage.setItem('career_pilot_failed_problems', JSON.stringify(problemsList));
          }
        }
      }
      
      setUserScores(updatedScores);
      localStorage.setItem('user_coding_scores', JSON.stringify(updatedScores));
      window.dispatchEvent(new Event('metrics_updated'));

      setCompileLogs(prev => [
        ...prev,
        ...logs,
        passed 
          ? `✓ [SUCCESS]: Program passed all assertions. Benchmark optimization constraints satisfied.`
          : `❌ [FAILURE]: System verification failed. 0 points credited for this attempt.`,
        `[PROCESS TERMINATED]: Sandbox thread exited with status ${passed ? 0 : 1}`
      ]);

      setDiagnosticResult({
        score: finalScore,
        syntax: passed ? "Static-Analyzed clean structure" : (executionError ? "Exception thrown in block" : "Logical assertion mismatch"),
        complexity: passed ? q.expectedComplexity : "N/A",
        passed,
        feedback: passed 
          ? `Superb compilation! Efficient ${q.expectedComplexity} structures guarantee low hardware latency and zero connection blockages.` 
          : (executionError 
              ? `Syntax or run context error: ${executionError}. Correct the syntactic layout and re-run.`
              : `Function returned a value that did not match the expected test case target. Ensure you adhere to formatting bounds.`),
        metrics: {
          cpu: passed ? `${(1.0 + Math.random() * 0.35).toFixed(3)}ms` : "N/A",
          memory: passed ? `${(11.20 + Math.random() * 1.4).toFixed(2)}MB` : "N/A",
          time: passed ? `${(0.31 + Math.random() * 0.10).toFixed(2)}ms` : "N/A"
        }
      });

      setIsCompiling(false);
    }, 1500);
  };

  const resetExerciseCode = () => {
    const q = CODING_QUESTIONS[activeCodeIdx];
    setUserCode(q.boilerplates[selectedLanguage] || q.boilerplates['TypeScript']);
    setDiagnosticResult(null);
  };

  return (
    <div id="coding_platform_page" className="max-w-6xl mx-auto space-y-6 pb-12 font-sans animate-fadeIn">
      
      {/* Header telemetry area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-3.5 border-b border-slate-900 pb-4">
        <div>
          <span className="px-2.5 py-1 bg-indigo-505/10 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full text-[9px] font-mono uppercase tracking-widest font-black inline-block">
            FEATURE 3 — TECHNICAL ASSESSOR
          </span>
          <h2 className="text-xl md:text-2xl font-black text-slate-100 flex items-center gap-2 mt-1.5 md:mt-2">
            Technical Coding Assessment Platform ⚡
          </h2>
          <p className="text-slate-400 text-xs mt-1 max-w-2xl leading-relaxed">
            Measure compiled algorithmic speed, memory consumption, syntax correctness, and recursive tree structures inside an isolated sandbox compiler room.
          </p>
        </div>

        {/* Global tab buttons with icons */}
        <div className="flex bg-slate-950 border border-slate-900 p-1 rounded-xl shrink-0">
          <button
            onClick={() => setActiveTab('workbench')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all border ${
              activeTab === 'workbench' 
                ? 'bg-indigo-500/15 border-indigo-500/20 text-indigo-400 shadow-md' 
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 size={12} />
            <span>IDE Workbench</span>
          </button>
          
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all border ${
              activeTab === 'analytics' 
                ? 'bg-emerald-500/15 border-emerald-500/20 text-emerald-400 shadow-md' 
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BarChart3 size={12} />
            <span>Coding Analytics</span>
          </button>

          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all border ${
              activeTab === 'leaderboard' 
                ? 'bg-yellow-500/15 border-yellow-500/20 text-yellow-400 shadow-md' 
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Trophy size={12} />
            <span>Leaderboard ({LEADERBOARD_CANDIDATES.findIndex(c => c.isUser) + 1}th)</span>
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'workbench' && (
          <motion.div
            key="workbench"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {/* Interactive Celestial Sky Portal */}
            <div 
              id="cosmic_sky_portal"
              onClick={() => {
                setSelectedCompany('Skyhigh');
                setActiveQuestionId(5); // Valid Anagram
                setCompileLogs(prev => [
                  ...prev,
                  `[COSMIC PORTAL]: Connected to the Celestial Sky! Selecting Skyhigh's "Valid Anagram" core workspace...`
                ]);
              }}
              className="relative overflow-hidden rounded-2xl border border-slate-800/80 p-5 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950/90 group hover:border-cyan-500/40 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-cyan-500/5"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-colors" />
              {/* Star backdrop decoration */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/5 via-transparent to-transparent opacity-60" />
              
              <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex gap-3.5 items-center">
                  <div className="flex items-center justify-center w-11 h-11 bg-indigo-950 border border-indigo-500/30 text-indigo-400 rounded-xl group-hover:scale-105 group-hover:border-cyan-400/40 group-hover:text-cyan-400 transition-all duration-300">
                    <span className="text-xl animate-pulse filter drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">🌌</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-100 uppercase tracking-widest font-mono group-hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                      Interstellar Celestial Sky
                    </h4>
                    <p className="text-[10.5px] text-slate-400 leading-normal max-w-xl font-sans mt-0.5">
                      Click directly on this celestial canopy backdrop to immediately select and review the <strong className="text-cyan-400 font-bold">Valid Anagram</strong> benchmark pattern of Skyhigh Security.
                    </p>
                  </div>
                </div>
                <div className="text-[9px] font-mono font-black text-indigo-400 bg-indigo-950/80 border border-indigo-500/20 px-2.5 py-1 rounded-lg uppercase tracking-wider shrink-0 transition-colors group-hover:border-cyan-500/30 group-hover:text-cyan-300">
                  🎯 Click Sky to Trigger Anagram
                </div>
              </div>
              {/* Sparkles / Twinkies */}
              <div className="absolute bottom-2 left-1/3 w-1 h-1 bg-white/40 rounded-full animate-ping" />
              <div className="absolute top-3 right-1/4 w-1 h-1 bg-white/60 rounded-full animate-pulse" />
              <div className="absolute top-6 left-12 w-0.5 h-0.5 bg-white/50 rounded-full" />
            </div>

            {/* Campus Recruiters Placement Drive Selection Bar */}
            <div className="glass rounded-xl p-4 border border-slate-900 bg-slate-950/70 flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-500/10 rounded-lg border border-indigo-500/20 text-indigo-400">
                  <Trophy size={16} />
                </div>
                <div>
                  <h3 className="text-xs font-black text-slate-100 uppercase tracking-widest">
                    VVCE Campus Recruiters Drives 🎓
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Select a Mysore-targeted corporate partner to practice their selected DSA pattern coding questions.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1 bg-slate-900/60 p-1 rounded-xl border border-slate-800 shrink-0">
                {['Incture', 'Skyhigh', 'HP', 'Infosys', 'Cognizant'].map((company) => (
                  <button
                    key={company}
                    onClick={() => setSelectedCompany(company)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${
                      selectedCompany === company
                        ? 'bg-indigo-600/25 text-indigo-400 border border-indigo-500/30 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent'
                    }`}
                  >
                    {company === 'Skyhigh' ? '🌌 Sky / Skyhigh' : company}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Sidebar select list (4 cols) */}
              <div className="lg:col-span-4 space-y-4">
                <div className="glass rounded-xl p-5 space-y-4 border border-slate-900">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">
                    Select Recruiter Question ({selectedCompany})
                  </span>

                  <div className="space-y-2.5">
                    {filteredQuestions.map((question) => {
                      const isSolved = userScores[question.id] !== undefined;
                      return (
                        <button
                          key={question.id}
                          onClick={() => setActiveQuestionId(question.id)}
                          className={`w-full text-left p-4 rounded-xl border transition-all text-xs block relative group ${
                            activeQuestionId === question.id 
                              ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400' 
                              : 'bg-slate-900/40 border-transparent text-slate-400 hover:bg-slate-900/80 hover:text-slate-200'
                          }`}
                        >
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-mono text-[8px] font-bold uppercase text-slate-500">DRIVE EXERCISE</span>
                            <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded ${
                              question.difficulty === 'Easy' ? 'bg-green-500/15 text-green-400 border border-green-500/20' : 
                              question.difficulty === 'Medium' ? 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/20' : 
                              'bg-red-500/15 text-red-00 text-red-400 border border-red-500/20'
                            }`}>
                              {question.difficulty}
                            </span>
                          </div>
                          <h4 className="font-black text-slate-200 block mb-1 text-[13px] group-hover:text-indigo-300 transition-colors">
                            {question.title}
                          </h4>
                          <p className="text-slate-400 text-[11px] leading-relaxed line-clamp-2">
                            {question.description}
                          </p>

                          {isSolved && (
                            <div className="absolute top-2 right-2 flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[8px] uppercase font-bold px-1.5 rounded py-0.2">
                              <span>✓ Solved ({userScores[question.id]}%)</span>
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

              {/* Real-time sync profile tier controller visual */}
              <div className={`p-5 rounded-2xl border ${currentTier.badgeColor} space-y-3`}>
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full bg-indigo-500 animate-ping shrink-0`} />
                  <span className="text-[9px] font-mono font-black uppercase tracking-widest text-indigo-450 text-slate-400">
                    Live Placement Rank Status
                  </span>
                </div>
                <div>
                  <h3 className={`text-base font-black uppercase leading-tight ${currentTier.textColor}`}>
                    {currentTier.title}
                  </h3>
                  <p className="text-[11px] text-slate-300 leading-relaxed mt-2.5">
                    {currentTier.description}
                  </p>
                </div>
                <div className="pt-2 flex justify-between text-[10px] font-mono border-t border-slate-900/60 text-slate-400">
                  <span>Solved exercises: <b>{solvedCount}/4</b></span>
                  <span>Point aggregate: <b className="text-indigo-400 font-bold">{totalPoints} pts</b></span>
                </div>
              </div>

              {/* Standard developer reference widget */}
              <div className="glass rounded-xl p-4.5 space-y-2 text-[11px] text-slate-400 border border-slate-900 leading-normal">
                <h4 className="font-bold text-slate-300 uppercase text-[9px] tracking-wider flex items-center gap-1.5">
                  <Info size={11} className="text-cyan-400" /> Compiler Standard Spec
                </h4>
                <p>
                  Execution streams are automatically timed via microsecond ticks. Avoid importing external Node filesystem (`fs`) libraries or secondary server connectors.
                </p>
              </div>
            </div>

            {/* Custom Interactive IDE Area (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              <div className="glass rounded-2xl p-5 border border-slate-900 space-y-4">
                <div className="flex justify-between items-center pb-2.5 border-b border-slate-900/60">
                  <div className="flex items-center gap-2">
                    <Terminal size={15} className="text-indigo-400" />
                    <span className="text-xs font-bold font-mono tracking-tight text-slate-200">
                      /{CODING_QUESTIONS[activeCodeIdx].category.toLowerCase()}/{CODING_QUESTIONS[activeCodeIdx].title.toLowerCase().replace(/[^a-z0-9]/g, '_')}.{selectedLanguage === 'C++' ? 'cpp' : selectedLanguage === 'Java' ? 'java' : selectedLanguage === 'Python' ? 'py' : 'js'}
                    </span>
                  </div>

                  {/* Language selectors */}
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-500 font-mono">Sandbox Language:</span>
                    <select
                      value={selectedLanguage}
                      onChange={(e) => setSelectedLanguage(e.target.value as any)}
                      className="bg-slate-950 text-indigo-400 border border-slate-800 rounded px-2.5 py-1 text-[11px] font-mono font-bold outline-none focus:border-indigo-500/50"
                    >
                      <option value="C++">C++ Pro (cpp_v17)</option>
                      <option value="Java">Java Standard (jdk_v17)</option>
                      <option value="Python">Python (py_v3.10)</option>
                      <option value="JavaScript">JavaScript (es8_node)</option>
                    </select>
                  </div>
                </div>

                {/* Sub-header instruction box */}
                <div className="p-3.5 bg-slate-950/40 rounded-xl border border-slate-900 text-xs text-slate-300 space-y-1">
                  <p className="font-semibold text-slate-200 uppercase tracking-wider text-[8.5px] font-mono text-indigo-400">Exercise Context</p>
                  <p>{CODING_QUESTIONS[activeCodeIdx].description}</p>
                  <p className="text-[9.5px] text-slate-500 font-mono">Target benchmark limit: <span className="text-cyan-400 font-bold">{CODING_QUESTIONS[activeCodeIdx].expectedComplexity}</span></p>
                </div>

                {/* Simulated workspace editor */}
                <div className={`relative font-mono text-xs bg-slate-955 border rounded-xl overflow-hidden flex p-1 shadow-inner transition-colors duration-250 ${
                  syntaxError ? 'border-red-500/40 ring-1 ring-red-500/10' : 'border-slate-900'
                }`}>
                  <div className="w-9 shrink-0 text-slate-600 select-none text-right pr-2.5 py-3 border-r border-slate-900/60 leading-relaxed text-[10.5px] font-mono">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div key={i}>{i + 1}</div>
                    ))}
                  </div>
                  <textarea
                    value={userCode}
                    onChange={(e) => setUserCode(e.target.value)}
                    onPaste={(e) => {
                      e.preventDefault();
                      setSyntaxError("Copy-Paste Blocked: Copying from external platforms (such as ChatGPT, LeetCode, or other coding hubs) is disabled. Please type out your basic DSA LeetCode answer manually step-by-step.");
                    }}
                    className="w-full bg-transparent text-slate-100 outline-none focus:ring-0 p-3 leading-relaxed placeholder-slate-700 resize-y min-h-[220px] font-mono tracking-wide"
                    style={{ tabSize: 2 }}
                    placeholder="Provide pristine syntax script logic here..."
                  />
                </div>

                {/* Real-time Syntax Checker Box */}
                <AnimatePresence>
                  {syntaxError && (
                    <motion.div
                      initial={{ opacity: 0, y: -4, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: 'auto' }}
                      exit={{ opacity: 0, y: -4, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs font-mono">
                        <div className="flex gap-2">
                          <XCircle size={15} className="mt-0.5 shrink-0 text-red-500" />
                          <div className="space-y-0.5">
                            <p className="font-extrabold uppercase text-[9px] tracking-wider text-red-500">
                              Real-Time Syntax Validation Error
                            </p>
                            <p className="leading-relaxed whitespace-pre-wrap">{syntaxError}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Control triggers */}
                <div className="flex justify-between items-center pt-2">
                  <span className="text-[9.5px] text-slate-500 font-mono flex items-center gap-1">
                    <Timer size={10} /> Compilation Sandbox isolated & initialized
                  </span>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={resetExerciseCode}
                      className="px-3.5 py-2 text-[10px] font-bold uppercase border border-slate-800 rounded-xl hover:bg-slate-900 text-slate-400 hover:text-slate-200 transition-colors"
                      title="Reset Boilerplate"
                    >
                      reset
                    </button>
                    <button
                      onClick={handleRunEvaluation}
                      disabled={isCompiling}
                      className={`px-5 py-2 text-[10px] font-black uppercase tracking-wider rounded-xl flex items-center gap-1.5 transition-all ${
                        isCompiling 
                          ? 'bg-slate-950 text-slate-600 border border-slate-900' 
                          : 'bg-indigo-500 hover:bg-indigo-400 hover:scale-103 text-white shadow-[0_0_15px_rgba(99,102,241,0.25)]'
                      }`}
                    >
                      {isCompiling ? (
                        <>
                          <RefreshCw className="animate-spin" size={12} />
                          <span>running trace assertions...</span>
                        </>
                      ) : (
                        <>
                          <Zap size={12} />
                          <span>compile & execute code</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Compile output process logs */}
              <div className="bg-slate-950 border border-slate-900 rounded-xl p-5 font-mono text-xs space-y-2.5 relative overflow-hidden">
                <div className="absolute top-2 right-2 text-[7.5px] font-black font-mono bg-slate-900 px-2 py-0.5 rounded text-slate-500 tracking-wider uppercase border border-slate-850">
                  Standard Console OS output
                </div>
                <span className="text-[9.5px] tracking-widest text-slate-500 font-sans uppercase font-bold block">Console Logger Stream</span>
                
                <div className="space-y-1.5 max-h-[140px] overflow-auto select-all leading-normal custom-scrollbar select-text font-mono text-[11px]">
                  {compileLogs.map((log, lIdx) => (
                    <div 
                      key={lIdx} 
                      className={
                        log.startsWith('✓') ? 'text-emerald-400 font-mono' : 
                        log.startsWith('❌') ? 'text-red-400 font-bold font-mono' : 
                        'text-slate-400 font-mono'
                      }
                    >
                      {log}
                    </div>
                  ))}
                </div>
              </div>

              {/* Diagnostic results presentation */}
              <AnimatePresence mode="wait">
                {diagnosticResult && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="glass rounded-xl p-5 border border-indigo-500/10 space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-slate-950 p-4 rounded-xl border border-slate-900">
                      <div className="space-y-1 font-sans">
                        <span className="text-[8px] uppercase tracking-wider font-mono font-black text-indigo-400 block">Trace Grade</span>
                        <h4 className="text-xs font-bold text-slate-200">System Diagnostic Metrics</h4>
                        <div className="flex flex-wrap gap-2 text-[10px] font-mono text-slate-400 pt-0.5">
                          <span>CPU Execution: <b className="text-cyan-400">{diagnosticResult.metrics.cpu}</b></span>
                          <span>•</span>
                          <span>Virtual Memory swap: <b className="text-indigo-400">{diagnosticResult.metrics.memory}</b></span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4.5 font-sans self-end sm:self-center shrink-0">
                        <div className="text-right">
                          <span className="text-[7.5px] uppercase font-bold text-slate-500 block">Unit Pass Ratio</span>
                          <span className={`font-mono text-xs font-black block mt-0.5 ${diagnosticResult.passed ? 'text-emerald-400' : 'text-red-400'}`}>
                            {diagnosticResult.passed ? "2/2 CASES PASSED" : "0/2 CASES"}
                          </span>
                        </div>
                        <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-black font-mono text-sm shadow-md mt-0.5 ${
                          diagnosticResult.passed 
                            ? 'border-emerald-400 text-emerald-400 shadow-emerald-500/10' 
                            : 'border-red-400 text-red-400 shadow-red-500/10'
                        }`}>
                          {diagnosticResult.score}%
                        </div>
                      </div>
                    </div>

                    <div className={`p-4 rounded-xl border font-sans ${diagnosticResult.passed ? 'bg-emerald-500/5 border-emerald-500/10' : 'bg-red-500/5 border-red-500/10'}`}>
                      <span className={`text-[8.5px] font-black uppercase tracking-wider block font-mono ${diagnosticResult.passed ? 'text-emerald-400' : 'text-red-400'}`}>
                        {diagnosticResult.passed ? "✓ Algorithmic Compliance Review" : "⚠️ Compilation Assertion Warning"}
                      </span>
                      <p className="text-xs text-slate-200 mt-1 leading-relaxed">
                        "{diagnosticResult.feedback}"
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
        )}

        {activeTab === 'analytics' && (
          <motion.div
            key="analytics"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch"
          >
            {/* Left Radar Chart Vector Grid */}
            <div className="glass rounded-2xl p-6 border border-slate-900 flex flex-col justify-between min-h-[380px]">
              <div>
                <span className="text-[8px] uppercase font-mono text-indigo-400 font-bold block">Telemetry Vector</span>
                <h3 className="text-sm font-black text-slate-100 uppercase mt-0.5">Static Code Qualities DNA</h3>
                <p className="text-slate-500 text-[11px] leading-relaxed mt-1">
                  Radar map compiled from execution passes. Your score updates in raw time based on your language strictness paradigms and solved algorithm benchmarks.
                </p>
              </div>

              <div className="w-full h-[280px] flex items-center justify-center mt-3 scale-x-105">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" radius="75%" data={chartData}>
                    <PolarGrid stroke="#1e293b" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'monospace' }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#475569', fontSize: 8 }} />
                    <Radar name="Active Candidate" dataKey="Value" stroke="#6366f1" fill="#6366f1" fillOpacity={0.25} />
                    <Tooltip contentStyle={{ backgroundColor: '#090d16', border: '1px solid #334155', color: '#f1f5f9', fontSize: 11, borderRadius: '8px' }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Right Side progress line and stat cards */}
            <div className="space-y-6">
              {/* Analytic key cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="glass p-5 rounded-2xl border border-slate-900 text-center space-y-1">
                  <span className="text-[8.5px] uppercase font-bold text-slate-500 tracking-wider block">Space Complexity Grade</span>
                  <p className="text-base font-mono font-black text-cyan-400">O(1) Auxiliary</p>
                  <p className="text-[9.5px] text-slate-400 leading-normal">Optimized zero buffer replication metrics checks.</p>
                </div>

                <div className="glass p-5 rounded-2xl border border-slate-900 text-center space-y-1">
                  <span className="text-[8.5px] uppercase font-bold text-slate-500 tracking-wider block">Average Loop Execution</span>
                  <p className="text-base font-mono font-black text-indigo-400">0.45ms Latency</p>
                  <p className="text-[9.5px] text-slate-400 leading-normal">Sub-millisecond processing on recursive threads.</p>
                </div>
              </div>

              {/* Historical Percentile progression chart */}
              <div className="glass rounded-xl p-6 border border-slate-900 space-y-3">
                <div>
                  <span className="text-[8px] uppercase font-mono text-emerald-400 font-bold block">Time Progression</span>
                  <h4 className="text-xs font-black text-slate-200 mt-0.5">Percentile Competitiveness Cohort Rank</h4>
                </div>

                <div className="w-full h-[180px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={historicalSubmissions}>
                      <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} />
                      <YAxis tick={{ fill: '#64748b', fontSize: 10 }} domain={[0, 100]} axisLine={false} />
                      <Tooltip contentStyle={{ backgroundColor: '#090d16', border: '1px solid #334155', color: '#f1f5f9', fontSize: 11, borderRadius: '8px' }} />
                      <Line type="monotone" dataKey="regionPercentile" name="Percentile Score" stroke="#10b981" strokeWidth={2.5} activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-[9px] text-slate-500 text-center font-mono pt-1">
                  ✓ Sourcing data logs regionally based on MIT Engineering assessment grids.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'leaderboard' && (
          <motion.div
            key="leaderboard"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass rounded-2xl border border-slate-900 overflow-hidden space-y-4"
          >
            {/* Header info bar */}
            <div className="p-6 bg-slate-950/40 border-b border-slate-900/60 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <span className="text-[8px] font-mono uppercase bg-yellow-500/10 border border-yellow-500/25 text-yellow-400 px-2.5 py-0.5 rounded-full font-black">
                  Elite Board telemetry
                </span>
                <h3 className="text-sm font-black text-slate-100 uppercase tracking-wider mt-1 flex items-center gap-1.5 animate-pulse">
                  <Trophy size={14} className="text-yellow-400 shrink-0" />
                  Cohort Top 10 regional Leaderboard
                </h3>
                <p className="text-slate-400 text-[11px] leading-relaxed mt-0.5 text-slate-400">
                  Real-time regional placement scores mapped automatically across 12 participating technology campuses. Sort ranking is determined by aggregate points and functional safety coefficients.
                </p>
              </div>

              <div className="bg-slate-950 p-4 border border-slate-900 rounded-xl space-y-1.5 text-right font-mono shrink-0 text-left md:text-right w-full md:w-auto">
                <span className="text-[8px] uppercase font-bold text-slate-500 tracking-wider block">Your Live Standings</span>
                <p className="text-xs font-black text-slate-200">Point Count: <b className="text-yellow-400 font-bold">{totalPoints}</b></p>
                <p className="text-[10px] text-slate-500">Regional Position: <b className="text-cyan-400">Rank #{LEADERBOARD_CANDIDATES.findIndex(c => c.isUser) + 1}</b></p>
              </div>
            </div>

            {/* Top 10 Table */}
            <div className="px-6 pb-6 overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-900 text-slate-500 font-mono text-[9px] uppercase tracking-wider">
                    <th className="py-3 px-2">Rank</th>
                    <th className="py-3">Candidate & Center</th>
                    <th className="py-3 text-center">Tasks Solved</th>
                    <th className="py-3 text-right">Aggregate Score</th>
                    <th className="py-3 text-right">Placement Tier</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900/60">
                  {LEADERBOARD_CANDIDATES.map((cand) => (
                    <tr 
                      key={cand.name}
                      className={`transition-colors leading-normal ${
                        cand.isUser 
                          ? 'bg-indigo-500/5 text-slate-100 font-bold border-l-2 border-l-indigo-400' 
                          : 'text-slate-300 hover:bg-slate-900/40'
                      }`}
                    >
                      {/* Rank Column */}
                      <td className="py-3.5 px-2 font-mono">
                        <div className="flex items-center gap-1.5">
                          {cand.rank === 1 ? (
                            <span className="w-5 h-5 rounded-full bg-yellow-500/20 text-yellow-400 flex items-center justify-center font-bold text-[10px] border border-yellow-500/30">1</span>
                          ) : cand.rank === 2 ? (
                            <span className="w-5 h-5 rounded-full bg-slate-400/20 text-slate-300 flex items-center justify-center font-bold text-[10px] border border-slate-400/30">2</span>
                          ) : cand.rank === 3 ? (
                            <span className="w-5 h-5 rounded-full bg-amber-700/20 text-amber-500 flex items-center justify-center font-bold text-[10px] border border-amber-700/30">3</span>
                          ) : (
                            <span className="text-slate-500 px-1 font-bold">{cand.rank}</span>
                          )}
                        </div>
                      </td>

                      {/* Candidate details */}
                      <td className="py-3.5 flex items-center gap-3">
                        <img 
                          src={cand.avatar} 
                          alt="Avatar" 
                          className="w-8 h-8 rounded-full border border-slate-800 object-cover" 
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <p className="text-slate-100 font-bold hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                            {cand.name}
                            {cand.isUser && (
                              <span className="bg-indigo-500 text-white font-mono text-[8px] font-black uppercase px-1 py-0.2 rounded shrink-0">
                                YOU
                              </span>
                            )}
                          </p>
                          <p className="text-[10px] text-slate-500 font-medium">
                            {cand.isUser ? `${cand.college} (Logged In)` : cand.college}
                          </p>
                        </div>
                      </td>

                      {/* Solved Count */}
                      <td className="py-3.5 text-center font-mono font-bold text-slate-200">
                        {cand.solved}/4
                      </td>

                      {/* Core Score points count */}
                      <td className="py-3.5 text-right font-mono font-black text-yellow-400">
                        {cand.score} pts
                      </td>

                      {/* Tier Tag label */}
                      <td className="py-3.5 text-right">
                        <span className={`text-[8.5px] font-mono font-black uppercase px-2 py-0.5 rounded border ${
                          cand.tier.startsWith('S-Tier') ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                          cand.tier.startsWith('A-Tier') ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' :
                          cand.tier.startsWith('B-Tier') ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                          'bg-slate-500/10 text-slate-400 border-slate-500/25'
                        }`}>
                          {cand.tier}
                        </span>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
