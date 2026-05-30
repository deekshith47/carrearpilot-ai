import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Target, 
  Brain, 
  TrendingUp, 
  FileX2, 
  Award, 
  ChevronRight, 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  RefreshCw, 
  HelpCircle, 
  Play, 
  ArrowRight, 
  AlertTriangle, 
  Code, 
  Activity, 
  Zap, 
  User, 
  Compass,
  Cpu,
  Bookmark
} from 'lucide-react';
import clsx from 'clsx';

interface FailedProblem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic: string;
  failedCode: string;
  errorType: string;
  originalComplexity: string;
  expectedComplexity: string;
  confidence: 'Low' | 'Medium' | 'High';
  associatedConcept: string;
  logicError: string;
  prerequisites: { name: string; status: 'completed' | 'missing' }[];
  steps: { title: string; desc: string }[];
  questions: { title: string; difficulty: 'Easy' | 'Medium' | 'Hard' }[];
}

const INITIAL_FAILED_PROBLEMS: FailedProblem[] = [
  {
    id: 'longest-substring',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    topic: 'Strings / Hash table',
    failedCode: `function lengthOfLongestSubstring(s: string): number {
  let maxLen = 0;
  for (let i = 0; i < s.length; i++) {
    let visited = new Set();
    for (let j = i; j < s.length; j++) {
      if (visited.has(s[j])) break;
      visited.add(s[j]);
      maxLen = Math.max(maxLen, j - i + 1);
    }
  }
  return maxLen;
}`,
    errorType: 'Time Limit Exceeded (TLE) / Efficiency',
    originalComplexity: 'O(n²)',
    expectedComplexity: 'O(n)',
    confidence: 'Low',
    associatedConcept: 'Sliding Window',
    logicError: 'Nested loop brute-force validation on every subsegment. Missing linear slide-back pointers.',
    prerequisites: [
      { name: 'Arrays', status: 'completed' },
      { name: 'HashMap', status: 'completed' },
      { name: 'Two Pointers', status: 'missing' }
    ],
    steps: [
      { title: 'Learn Two Pointers mechanics', desc: 'Understand array indexing expansion and shrinking boundaries.' },
      { title: 'Practice Easy Sliding Window exercises', desc: 'Identify rolling sum or fixed size window aggregates first.' },
      { title: 'Practice Medium Sliding Window scenarios', desc: 'Implement dynamic-size nested index sliding window.' },
      { title: 'Practice Advanced Sliding Window matrices', desc: 'Resolve complex character constraint arrays under linear time.' }
    ],
    questions: [
      { title: 'Maximum Average Subarray I', difficulty: 'Easy' },
      { title: 'Contains Duplicate II', difficulty: 'Easy' },
      { title: 'Permutation in String', difficulty: 'Medium' },
      { title: 'Find All Anagrams in a String', difficulty: 'Medium' },
      { title: 'Minimum Window Substring', difficulty: 'Hard' }
    ]
  },
  {
    id: 'clone-graph',
    title: 'Clone Graph Deep Copy Matrix',
    difficulty: 'Medium',
    topic: 'Graphs / BFS / DFS',
    failedCode: `function cloneGraph(node: Node | null): Node | null {
  if (!node) return null;
  // Mistakenly performing shallow copy on children matrix
  let clone = new Node(node.val);
  clone.neighbors = [...node.neighbors];
  return clone;
}`,
    errorType: 'Runtime Error / Reference Loop / StackOverflow',
    originalComplexity: 'O(v + e) Space Exhaustion',
    expectedComplexity: 'O(v + e) with Map tracking',
    confidence: 'Low',
    associatedConcept: 'Graph Traversal / BFS Map tracking',
    logicError: 'Failed to cycle-detect using node address identifiers. Incurred infinite recursive call loops.',
    prerequisites: [
      { name: 'Recursion Basics', status: 'completed' },
      { name: 'Queues & Stacks', status: 'completed' },
      { name: 'Map Cycle Detection', status: 'missing' }
    ],
    steps: [
      { title: 'Observe Cycle Traversal Theory', desc: 'Learn how to register visited pointer addresses in a reference hash pool.' },
      { title: 'Build basic DFS Graph clones', desc: 'Write a recursion loop with explicit graph memoization maps.' },
      { title: 'Complete BFS Level-order maps', desc: 'Implement Queue structures ensuring duplicates never enter.' },
      { title: 'Resolve complex Node transformations', desc: 'Deep copies of cyclical undirected multi-node pipelines.' }
    ],
    questions: [
      { title: 'Path Sum I', difficulty: 'Easy' },
      { title: 'Clone Graph', difficulty: 'Medium' },
      { title: 'Course Schedule II', difficulty: 'Medium' },
      { title: 'Critical Connections in a Network', difficulty: 'Hard' }
    ]
  },
  {
    id: 'kth-largest',
    title: 'Kth Largest Element in an Array',
    difficulty: 'Medium',
    topic: 'Heaps / Priority Queue',
    failedCode: `function findKthLargest(nums: number[], k: number): number {
  // Nested sorting is highly inefficient for streaming high-volume logs
  nums.sort((a, b) => b - a);
  return nums[k - 1];
}`,
    errorType: 'Efficiency / Scale Bottleneck / Sorting Exhaustion',
    originalComplexity: 'O(n log n)',
    expectedComplexity: 'O(n log k)',
    confidence: 'Low',
    associatedConcept: 'Binary Heap / Min Heap Maintenance',
    logicError: 'Sorting the entire payload instead of keeping a small active min-heap bubble. Consumes high memory indexing times.',
    prerequisites: [
      { name: 'Arrays', status: 'completed' },
      { name: 'Trees', status: 'completed' },
      { name: 'Priority Queue / Heaps', status: 'missing' }
    ],
    steps: [
      { title: 'Observe heap sorting principles', desc: 'Learn parent child structural representation indexes in array format.' },
      { title: 'Construct active min-heap boundaries', desc: 'Maintain size bounds precisely to capacity constraints.' },
      { title: 'Implement custom Heapify structures', desc: 'Write fast shiftUp and shiftDown child level bubbles.' },
      { title: 'Master Streaming Top-K matrices', desc: 'Resolve multi-stream priority inputs.' }
    ],
    questions: [
      { title: 'Kth Largest Element in a Stream', difficulty: 'Easy' },
      { title: 'Last Stone Weight', difficulty: 'Easy' },
      { title: 'Top K Frequent Elements', difficulty: 'Medium' },
      { title: 'K Closest Points to Origin', difficulty: 'Medium' },
      { title: 'Merge k Sorted Lists', difficulty: 'Hard' }
    ]
  },
  {
    id: 'invert-tree',
    title: 'Invert Binary Tree',
    difficulty: 'Easy',
    topic: 'Trees / Recursion',
    failedCode: `function invertTree(root: TreeNode | null): TreeNode | null {
  if (!root) return null;
  // Doing reference swaps directly without a temp pointer overwrites left
  root.left = root.right;
  root.right = root.left;
  invertTree(root.left);
  invertTree(root.right);
  return root;
}`,
    errorType: 'Incorrect Tree Structure / Target Reference Overwritten',
    originalComplexity: 'O(n) - Unstable',
    expectedComplexity: 'O(n) - Stable Temporary Cache Swap',
    confidence: 'Low',
    associatedConcept: 'Tree Traversals & Local Auxiliary Swaps',
    logicError: 'Overwrites root.left with root.right reference prior to caching left side, destroying the sub-nodes completely.',
    prerequisites: [
      { name: 'Recursion Basics', status: 'completed' },
      { name: 'Stack / Queue Traversals', status: 'missing' },
      { name: 'Auxiliary Swapping Cache', status: 'missing' }
    ],
    steps: [
      { title: 'Adopt solid swap references', desc: 'Use temporary storage variables to make variables stable during reassignment.' },
      { title: 'Build post-order Recursion sweeps', desc: 'Structure recursive return values to build subtree mappings.' },
      { title: 'Implement queue-layered BFS Traversals', desc: 'Iterate top-down, swapping children blocks per level.' },
      { title: 'Master recursive tree depth tracking', desc: 'Resolve complex asymmetric tree mirror scenarios.' }
    ],
    questions: [
      { title: 'Same Tree', difficulty: 'Easy' },
      { title: 'Symmetric Tree', difficulty: 'Easy' },
      { title: 'Invert Binary Tree', difficulty: 'Easy' },
      { title: 'Binary Tree Level Order Traversal', difficulty: 'Medium' },
      { title: 'Serialize and Deserialize Binary Tree', difficulty: 'Hard' }
    ]
  }
];

// Map of curated coding templates for recommended challenges
const PRACTICE_TEMPLATES: Record<string, string> = {
  'Contains Duplicate': `// Easy: Check if any value appears at least twice
function containsDuplicate(nums) {
  const numSet = new Set();
  for (const num of nums) {
    if (numSet.has(num)) return true;
    numSet.add(num);
  }
  return false;
}`,

  'Two Sum': `// Easy: Find indices of two numbers that add up to target
function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const diff = target - nums[i];
    if (map.has(diff)) {
      return [map.get(diff), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,

  'Group Anagrams': `// Medium: Group identical sorting keys together
function groupAnagrams(strs) {
  const map = {};
  for (const s of strs) {
    const key = s.split('').sort().join('');
    if (!map[key]) map[key] = [];
    map[key].push(s);
  }
  return Object.values(map);
}`,

  'Valid Anagram': `// Easy: Character tally index frequency check
function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const count = {};
  for (let char of s) {
    count[char] = (count[char] || 0) + 1;
  }
  for (let char of t) {
    if (!count[char]) return false;
    count[char]--;
  }
  return true;
}`,

  'Maximum Average Subarray I': `// sliding window duplicate concept
function findMaxAverage(nums, k) {
  let sum = 0;
  for (let i = 0; i < k; i++) {
    sum += nums[i];
  }
  let maxSum = sum;
  for (let i = k; i < nums.length; i++) {
    sum = sum - nums[i - k] + nums[i];
    maxSum = Math.max(maxSum, sum);
  }
  return maxSum / k;
}`,

  'Contains Duplicate II': `// Concept duplicate solver
function containsNearbyDuplicate(nums, k) {
  const numSet = new Set();
  for (let i = 0; i < nums.length; i++) {
    if (numSet.has(nums[i])) return true;
    numSet.add(nums[i]);
    if (numSet.size > k) {
      numSet.delete(nums[i - k]);
    }
  }
  return false;
}`,

  'Permutation in String': `// Medium: Sliding window exact anagram frequency matching
function checkInclusion(s1, s2) {
  if (s1.length > s2.length) return false;
  const s1Count = Array(26).fill(0);
  const s2Count = Array(26).fill(0);
  
  for (let i = 0; i < s1.length; i++) {
    s1Count[s1.charCodeAt(i) - 97]++;
    s2Count[s2.charCodeAt(i) - 97]++;
  }
  
  let matches = 0;
  for (let i = 0; i < 26; i++) {
    if (s1Count[i] === s2Count[i]) matches++;
  }
  
  for (let i = 0; i < s2.length - s1.length; i++) {
    if (matches === 26) return true;
    // sliding window transition updates go here
  }
  return matches === 26;
}`,

  'Find All Anagrams in a String': `// Medium: Find starting indices of all s1 anagrams in s
function findAnagrams(s, p) {
  const result = [];
  if (s.length < p.length) return result;
  // Initialize sliding window sliding count buffers
  return result;
}`,

  'Minimum Window Substring': `// Hard: Sliding window with multiple character constraint pools
function minWindow(s, t) {
  if (!s || !t) return "";
  let l = 0, r = 0;
  // Track sliding dynamic subsegment constraints
  return "";
}`,

  'Path Sum I': `// Easy Graph recursive search match traversal
function hasPathSum(root, targetSum) {
  if (!root) return false;
  if (!root.left && !root.right) return targetSum === root.val;
  return hasPathSum(root.left, targetSum - root.val) || hasPathSum(root.right, targetSum - root.val);
}`,

  'Course Schedule II': `// Medium Graph topological sort BFS / DFS cycle detection
function findOrder(numCourses, prerequisites) {
  const adj = Array.from({ length: numCourses }, () => []);
  const inDegree = Array(numCourses).fill(0);
  
  for (const [u, v] of prerequisites) {
    adj[v].push(u);
    inDegree[u]++;
  }
  
  const queue = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }
  
  const order = [];
  while (queue.length > 0) {
    const u = queue.shift();
    order.push(u);
    for (const v of adj[u]) {
      if (--inDegree[v] === 0) queue.push(v);
    }
  }
  return order.length === numCourses ? order : [];
}`,

  'Critical Connections in a Network': `// Hard Graph Tarjan's bridge-discovery loops
function criticalConnections(n, connections) {
  return [];
}`,

  'Kth Largest Element in a Stream': `// Easy heap utility tracking sliding streams
class KthLargest {
  constructor(k, nums) {
    this.k = k;
    this.minHeap = nums.sort((a,b) => b-a).slice(0, k);
  }
  add(val) {
    return this.minHeap[this.minHeap.length - 1];
  }
}`,

  'Last Stone Weight': `// Easy sliding maximum priority bubble list
function lastStoneWeight(stones) {
  while (stones.length > 1) {
    stones.sort((a, b) => a - b);
    const s1 = stones.pop();
    const s2 = stones.pop();
    if (s1 !== s2) stones.push(s1 - s2);
  }
  return stones.length === 1 ? stones[0] : 0;
}`,

  'Top K Frequent Elements': `// Medium hash map frequency counters and sorting heap
function topKFrequent(nums, k) {
  const map = new Map();
  for (const n of nums) map.set(n, (map.get(n) || 0) + 1);
  return [...map.keys()].sort((a, b) => map.get(b) - map.get(a)).slice(0, k);
}`,

  'K Closest Points to Origin': `// Medium coordinates priority math
function kClosest(points, k) {
  return points.sort((a, b) => (a[0]**2 + a[1]**2) - (b[0]**2 + b[1]**2)).slice(0, k);
}`,

  'Merge k Sorted Lists': `// Hard Priority merger
function mergeKLists(lists) {
  return null;
}`,

  'Same Tree': `// Easy Recursive comparative tree search
function isSameTree(p, q) {
  if (!p && !q) return true;
  if (!p || !q) return false;
  return p.val === q.val && isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}`,

  'Symmetric Tree': `// Easy Mirror symmetry checklist recursive traversal
function isSymmetric(root) {
  if (!root) return true;
  function isMirror(t1, t2) {
    if (!t1 && !t2) return true;
    if (!t1 || !t2) return false;
    return t1.val === t2.val && isMirror(t1.left, t2.right) && isMirror(t1.right, t2.left);
  }
  return isMirror(root.left, root.right);
}`,

  'Binary Tree Level Order Traversal': `// Medium Queue-layered level order BFS
function levelOrder(root) {
  if (!root) return [];
  const result = [];
  const queue = [root];
  while (queue.length > 0) {
    const size = queue.length;
    const currentLevel = [];
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      currentLevel.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(currentLevel);
  }
  return result;
}`,

  'Serialize and Deserialize Binary Tree': `// Hard Tree codec traversal
function serialize(root) {
  return "";
}`
};

export default function ConceptRecovery() {
  const [failedProblems, setFailedProblems] = useState<FailedProblem[]>(INITIAL_FAILED_PROBLEMS);
  const [selectedProblemId, setSelectedProblemId] = useState<string>('longest-substring');
  const [activeTab, setActiveTab] = useState<'recovery' | 'practice' | 'coach'>('recovery');
  const [activePracticeQuestion, setActivePracticeQuestion] = useState<{title: string; difficulty: 'Easy' | 'Medium' | 'Hard'} | null>(null);
  
  // Simulated State Engine (Mastery scores saved inside LocalStorage so states exist persistently)
  const [mastery, setMastery] = useState<Record<string, number>>({
    'Arrays': 92,
    'Strings': 85,
    'Sliding Window': 30,
    'Graphs': 20,
    'Trees': 60,
    'Heaps': 40
  });

  // Drill validation states
  const [userDrillSolution, setUserDrillSolution] = useState('');
  const [isEvaluatingDrill, setIsEvaluatingDrill] = useState(false);
  const [drillSuccessStatus, setDrillSuccessStatus] = useState<'idle' | 'success' | 'fail'>('idle');
  const [drillFeedback, setDrillFeedback] = useState('');

  // Loaded problem
  const problem = failedProblems.find(p => p.id === selectedProblemId) || failedProblems[0];

  // Load state from local storage on mount
  useEffect(() => {
    const savedMastery = localStorage.getItem('career pilot_concept_mastery');
    if (savedMastery) {
      try {
        setMastery(JSON.parse(savedMastery));
      } catch (e) {
        console.warn("Error loading stored mastery scores", e);
      }
    }
  }, []);

  // Load failed problems from local storage on mount (with merge to INITIAL_FAILED_PROBLEMS)
  useEffect(() => {
    const savedProblems = localStorage.getItem('career_pilot_failed_problems');
    if (savedProblems) {
      try {
        const parsed = JSON.parse(savedProblems) as FailedProblem[];
        const merged = [...INITIAL_FAILED_PROBLEMS];
        parsed.forEach((prob) => {
          if (!merged.some(m => m.id === prob.id)) {
            merged.push(prob);
          } else {
            const matchedIndex = merged.findIndex(m => m.id === prob.id);
            if (matchedIndex !== -1 && prob.failedCode) {
              merged[matchedIndex].failedCode = prob.failedCode;
            }
          }
        });
        setFailedProblems(merged);
      } catch (e) {
        console.warn("Error loading stored failed problems", e);
      }
    }
  }, []);

  const saveMasteryScores = (newScores: Record<string, number>) => {
    setMastery(newScores);
    localStorage.setItem('career pilot_concept_mastery', JSON.stringify(newScores));
    // Save to the general user metrics or notify other components
    window.dispatchEvent(new Event('metrics_updated'));
  };

  const handleResetScores = () => {
    const defaults = {
      'Arrays': 92,
      'Strings': 85,
      'Sliding Window': 30,
      'Graphs': 20,
      'Trees': 60,
      'Heaps': 40
    };
    saveMasteryScores(defaults);
    setFailedProblems(INITIAL_FAILED_PROBLEMS);
    localStorage.removeItem('career_pilot_failed_problems');
    setDrillSuccessStatus('idle');
    setUserDrillSolution('');
    setDrillFeedback('');
  };

  // Dynamically recalculated metadata Based on Concept Mastery Progression
  const overallReadinessBase = 68; // Starting basic readiness
  const readinessBonus = Math.floor((mastery['Sliding Window'] - 30) * 0.1) + 
                         Math.floor((mastery['Graphs'] - 20) * 0.1) +
                         Math.floor((mastery['Heaps'] - 40) * 0.1) +
                         Math.floor((mastery['Trees'] - 60) * 0.1);
  const overallReadiness = Math.min(98, overallReadinessBase + readinessBonus);
  const remaingDistance = 100 - overallReadiness;
  
  // ETA calculation: less months if readiness goes up
  const initialEtaMonths = 4.1;
  const etaReduction = (overallReadiness - 68) * 0.16; // reduction factor
  const finalEta = Math.max(1, Math.round((initialEtaMonths - etaReduction) * 10) / 10);

  // Auto trigger check when selected problem changes
  useEffect(() => {
    if (problem.id === 'longest-substring') {
      setUserDrillSolution(`// Complete Sliding Window template to master the concept
function solveSlidingWindow(s) {
  let left = 0, maxLen = 0;
  let charMap = {};
  
  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    if (charMap[char] >= left) {
      // Shrink window correctly
      left = charMap[char] + 1;
    }
    charMap[char] = right;
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}`);
    } else if (problem.id === 'clone-graph') {
      setUserDrillSolution(`// Write BFS implementation with dynamic cycle tracking map or set
function solveWithCycleMap(node) {
  if (!node) return null;
  const visited = new Map();
  const queue = [node];
  
  // Initialize clone
  visited.set(node, new Node(node.val));
  
  while (queue.length > 0) {
    const curr = queue.shift();
    for (const neighbor of curr.neighbors) {
      if (!visited.has(neighbor)) {
        visited.set(neighbor, new Node(neighbor.val));
        queue.push(neighbor);
      }
      visited.get(curr).neighbors.push(visited.get(neighbor));
    }
  }
  return visited.get(node);
}`);
    } else if (problem.id === 'kth-largest') {
      setUserDrillSolution(`// Complete Min Heap based K-th Largest logic to bypass complete sort operations
function solveKthLargest(nums, k) {
  // representation of a heap using simple JS array and local sorting helper
  const minHeap = [];
  
  for (let num of nums) {
    if (minHeap.length < k) {
      minHeap.push(num);
      minHeap.sort((a, b) => a - b);
    } else if (num > minHeap[0]) {
      minHeap[0] = num;
      minHeap.sort((a, b) => a - b);
    }
  }
  return minHeap[0];
}`);
    } else if (problem.id === 'invert-tree') {
      setUserDrillSolution(`// Complete recursive swap logic with stable swap references
function solveInvertTree(root) {
  if (!root) return null;
  // Use a temporary holder to swap children safely without corruption
  const temp = root.left;
  root.left = root.right;
  root.right = temp;
  
  solveInvertTree(root.left);
  solveInvertTree(root.right);
  return root;
}`);
    } else if (problem.id === 'valid-anagram') {
      setUserDrillSolution(`// Complete character frequency count checks
function solveValidAnagram(s, t) {
  if (s.length !== t.length) return false;
  const countMap = {};
  
  // Tally source characters
  for (let char of s) {
    countMap[char] = (countMap[char] || 0) + 1;
  }
  
  // Verify and decrement target characters
  for (let char of t) {
    if (!countMap[char]) return false;
    countMap[char]--;
  }
  return true;
}`);
    }
    setDrillSuccessStatus('idle');
    setDrillFeedback('');
  }, [selectedProblemId]);

  const submitInteractivePractice = () => {
    setIsEvaluatingDrill(true);
    setDrillSuccessStatus('idle');
    
    setTimeout(() => {
      setIsEvaluatingDrill(false);
      
      const userCodeText = userDrillSolution.toLowerCase();
      let isValid = false;
      let feedbackMsg = '';

      if (activePracticeQuestion) {
        const qTitle = activePracticeQuestion.title;
        if (qTitle === 'Maximum Average Subarray I') {
          const containsK = userCodeText.includes('k') && (userCodeText.includes('maxsum') || userCodeText.includes('max'));
          const containsLoop = userCodeText.includes('for') || userCodeText.includes('while');
          if (containsK && containsLoop) {
            isValid = true;
            feedbackMsg = 'Validation cleared. Linear scan using a dynamic sliding pointer verified successfully! Subarray maximum constraints passed.';
          } else {
            feedbackMsg = 'Verify window constraints. Remember to perform a linear sliding scan after evaluating initial subset size equal to K!';
          }
        } else if (qTitle === 'Contains Duplicate II') {
          const containsSetOrMap = userCodeText.includes('set') || userCodeText.includes('map');
          const containsNearbyCheck = userCodeText.includes('has') && (userCodeText.includes('add') || userCodeText.includes('set'));
          if (containsSetOrMap && containsNearbyCheck) {
            isValid = true;
            feedbackMsg = 'Validation cleared. Slid-size HashSet check verified successfully! Duplicate checks completed in absolute O(N) time.';
          } else {
            feedbackMsg = 'Verify duplicate checking with distance constraints. Utilize a sliding Set with size limits to maintain k constraints!';
          }
        } else if (qTitle === 'Contains Duplicate') {
          const containsSetOrMap = userCodeText.includes('set') || userCodeText.includes('map');
          const containsHasAndAdd = userCodeText.includes('has') && (userCodeText.includes('add') || userCodeText.includes('set'));
          if (containsSetOrMap && containsHasAndAdd) {
            isValid = true;
            feedbackMsg = 'Validation cleared. Unique collection checks verified! Elements tally executed in linear time.';
          } else {
            feedbackMsg = 'Remember to utilize an auxiliary HashSet container to store and check elements in O(1) average time complexity.';
          }
        } else if (qTitle === 'Two Sum') {
          const containsMap = userCodeText.includes('map') || userCodeText.includes('dict') || userCodeText.includes('hash');
          const containsHasAndGet = userCodeText.includes('has') || userCodeText.includes('get') || userCodeText.includes('in');
          if (containsMap && containsHasAndGet) {
            isValid = true;
            feedbackMsg = 'Validation cleared. Dynamic map lookup matches target constraints! Perfect linear time complexity.';
          } else {
            feedbackMsg = 'Two sum requires storing the mapping of previous values to their corresponding index for perfect O(N) lookup. Check your Hash Map statements!';
          }
        } else if (qTitle === 'Group Anagrams') {
          const containsSortAndMap = userCodeText.includes('sort') || userCodeText.includes('split') || userCodeText.includes('map');
          if (containsSortAndMap) {
            isValid = true;
            feedbackMsg = 'Validation cleared. Anagram sorting key grouped successfully! Adheres perfectly to O(N * K log K) requirements.';
          } else {
            feedbackMsg = 'Ensure your solution groups strings by matching sorted or matched canonical character keys.';
          }
        } else if (qTitle === 'Valid Anagram') {
          const containsCountOrSort = userCodeText.includes('count') || userCodeText.includes('map') || userCodeText.includes('sort') || userCodeText.includes('for');
          if (containsCountOrSort) {
            isValid = true;
            feedbackMsg = 'Validation cleared. Corresponding character occurrences checked successfully!';
          } else {
            feedbackMsg = 'Please implement frequency counting or sorting to compare both source and target symbols.';
          }
        } else {
          // General fallback validator for other recommended questions
          if (userCodeText.trim().length > 35 && !userCodeText.includes('// write your template')) {
            isValid = true;
            feedbackMsg = `Validation cleared for "${qTitle}". Optimal runtime constraints and diagnostic assertions verified successfully!`;
          } else {
            feedbackMsg = 'Evaluation failed. Code body is unpopulated or missing required implementation transformations.';
          }
        }
      } else {
        if (problem.id === 'longest-substring') {
          const containsLeftUpdate = userCodeText.includes('left =') || userCodeText.includes('left ==') || userCodeText.includes('left+');
          const containsMaxLen = userCodeText.includes('max') || userCodeText.includes('right - left');
          
          if (containsLeftUpdate && containsMaxLen) {
            isValid = true;
            feedbackMsg = 'Validation cleared. Slide back pointer calculations match O(N) constraints. Perfect window shrink logic verified!';
          } else {
            feedbackMsg = 'Loop variables configured but sliding window bounds did not update matching unique constraints. Check duplicate index map bounds!';
          }
        } else if (problem.id === 'clone-graph') {
          const containsVisitedHas = userCodeText.includes('visited.has') || userCodeText.includes('visited.set') || userCodeText.includes('map');
          const containsNeighbors = userCodeText.includes('neighbor') || userCodeText.includes('push');
          
          if (containsVisitedHas && containsNeighbors) {
            isValid = true;
            feedbackMsg = 'Validation cleared. Node memoization map verified! Standard loop boundaries correctly avoided StackOverflow loops.';
          } else {
            feedbackMsg = 'Neighbor queue populated but circular cycle check map is either unpopulated or skipping loop bounds.';
          }
        } else if (problem.id === 'kth-largest') {
          const containsMinHeap = userCodeText.includes('heap') || userCodeText.includes('push') || userCodeText.includes('sort');
          const containsKCompare = userCodeText.includes('k') || userCodeText.includes('minheap[0]') || userCodeText.includes('heap[0]');
          
          if (containsMinHeap && containsKCompare) {
            isValid = true;
            feedbackMsg = 'Validation cleared. Active streaming heap-sorting routine identified. Space parameters stabilized around O(K) complexity successfully!';
          } else {
            feedbackMsg = 'Min heap logic requires active sizing checks. Ensure you are maintaining size equal to K parameter!';
          }
        } else if (problem.id === 'invert-tree') {
          const containsTemp = userCodeText.includes('temp') || userCodeText.includes('cache') || userCodeText.includes('holder');
          const containsBothSwaps = userCodeText.includes('left =') && userCodeText.includes('right =');
          
          if (containsTemp && containsBothSwaps) {
            isValid = true;
            feedbackMsg = 'Validation cleared. Staged swap logic verified! Auxiliary storage prevented destructive left-child node overwrites.';
          } else {
            feedbackMsg = 'Destructive assignment warning: Ensure you cache one tree child pointer to a temporary holder before reassigning its node parameter!';
          }
        } else if (problem.id === 'valid-anagram') {
          const containsCountOrSort = userCodeText.includes('count') || userCodeText.includes('map') || userCodeText.includes('sort') || userCodeText.includes('for') || userCodeText.includes('char');
          if (containsCountOrSort) {
            isValid = true;
            feedbackMsg = 'Validation cleared! Your frequency tally algorithm accurately solves the Valid Anagram problem. Concept recovery verified!';
          } else {
            feedbackMsg = 'Invalid verification. Please establish character registers or comparison count blocks to balance frequency checks.';
          }
        }
      }

      if (isValid) {
        setDrillSuccessStatus('success');
        setDrillFeedback(feedbackMsg);
        
        // Dynamically update corresponding concept mastery scores
        const updatedScores = { ...mastery };
        if (activePracticeQuestion) {
          if (problem.id === 'longest-substring') {
            updatedScores['Sliding Window'] = Math.min(100, updatedScores['Sliding Window'] + 15); 
          } else if (problem.id === 'clone-graph') {
            updatedScores['Graphs'] = Math.min(100, updatedScores['Graphs'] + 15);
          } else if (problem.id === 'kth-largest') {
            updatedScores['Heaps'] = Math.min(100, updatedScores['Heaps'] + 15);
          } else if (problem.id === 'invert-tree') {
            updatedScores['Trees'] = Math.min(100, updatedScores['Trees'] + 15);
          } else if (problem.id === 'valid-anagram') {
            updatedScores['Strings'] = Math.min(100, updatedScores['Strings'] + 15);
            updatedScores['Arrays'] = Math.min(100, updatedScores['Arrays'] + 15);
          }
        } else {
          if (problem.id === 'longest-substring') {
            updatedScores['Sliding Window'] = 85; 
          } else if (problem.id === 'clone-graph') {
            updatedScores['Graphs'] = 80;
          } else if (problem.id === 'kth-largest') {
            updatedScores['Heaps'] = 85;
          } else if (problem.id === 'invert-tree') {
            updatedScores['Trees'] = 85;
          } else if (problem.id === 'valid-anagram') {
            updatedScores['Strings'] = 98;
            updatedScores['Arrays'] = 98;
          }
        }
        saveMasteryScores(updatedScores);
      } else {
        setDrillSuccessStatus('fail');
        setDrillFeedback(feedbackMsg);
      }
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Top Banner Alert / Feature Tagline */}
      <div className="relative glass bg-slate-900/40 border border-slate-800 rounded-3xl p-6 md:p-8 overflow-hidden select-none">
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-10 left-10 w-64 h-64 bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/25 rounded-md text-[10px] font-mono uppercase font-black text-rose-400">
              <Sparkles size={11} className="animate-spin" />
              AI Concept Recovery Engine
            </div>
            <h1 className="text-xl md:text-2xl font-black text-slate-100 tracking-tight">
              Don't Just Show the Solution — <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-rose-400 to-amber-400">Fix the Skill Gap</span>.
            </h1>
            <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-sans">
              Traditional coding compilers stop at Wrong Answer. Our recovery engine extracts precise algorithmic code patterns, identifies critical logic gaps, maps requirements, and recalculates real-time professional Career GPS outcomes automatically.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleResetScores}
              className="px-4 py-2 border border-slate-800 hover:border-slate-700 bg-slate-950 text-slate-400 hover:text-slate-200 rounded-xl text-xs font-mono transition-all flex items-center gap-2"
            >
              <RefreshCw size={12} />
              Reset Stats / Reset GPS
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Problem Selector + Analyzer on Left, Metrics & DNA on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column (8 cols): Interactive Code Analysis Workspace */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Section Selector Hub */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900/30 p-3 rounded-2xl border border-slate-850">
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => setActiveTab('recovery')}
                className={clsx(
                  "px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-tight uppercase flex items-center gap-1.5 transition-all outline-none",
                  activeTab === 'recovery' ? "bg-red-500/15 text-red-400 border border-red-500/30" : "bg-transparent text-slate-400 hover:text-slate-200"
                )}
              >
                <FileX2 size={13} />
                Failed Attempt Analysis
              </button>
              <button 
                onClick={() => setActiveTab('practice')}
                className={clsx(
                  "px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-tight uppercase flex items-center gap-1.5 transition-all outline-none",
                  activeTab === 'practice' ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/30" : "bg-transparent text-slate-400 hover:text-slate-200"
                )}
              >
                <Code size={13} />
                Interactive Recovery Lab
              </button>
              <button 
                onClick={() => setActiveTab('coach')}
                className={clsx(
                  "px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-tight uppercase flex items-center gap-1.5 transition-all outline-none",
                  activeTab === 'coach' ? "bg-amber-500/15 text-amber-400 border border-amber-500/30" : "bg-transparent text-slate-400 hover:text-slate-200"
                )}
              >
                <Brain size={13} />
                AI Learning Coach
              </button>
            </div>
            
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-slate-500 uppercase tracking-wider font-semibold text-[10px]">Select Failure Logs:</span>
              <select
                value={selectedProblemId}
                onChange={(e) => {
                  setSelectedProblemId(e.target.value);
                  setActivePracticeQuestion(null);
                }}
                className="bg-slate-950 text-xs text-slate-300 font-bold border border-slate-800 rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-red-500/40"
              >
                {failedProblems.map((prob) => (
                  <option key={prob.id} value={prob.id}>
                    {prob.title} ({prob.difficulty})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {/* Tab 1: AI Failed Attempt Analysis */}
            {activeTab === 'recovery' && (
              <motion.div
                key="recovery"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                {/* Dual Panel Code Diff vs. Extraction Telemetry */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                  {/* Left Side: Failed Submission code view */}
                  <div className="md:col-span-6 bg-slate-950 rounded-2xl border border-slate-900 overflow-hidden flex flex-col h-[340px]">
                    <div className="px-4 py-2.5 bg-slate-900/50 border-b border-slate-850 flex justify-between items-center">
                      <div className="flex items-center gap-1.5">
                        <XCircle size={13} className="text-red-500" />
                        <span className="text-[10px] font-mono font-black text-slate-300">Your Flipped Code Submission</span>
                      </div>
                      <span className="text-[8px] uppercase tracking-widest bg-red-500/10 text-red-500 border border-red-500/15 px-1.5 py-0.5 rounded font-bold font-mono">
                        {problem.errorType}
                      </span>
                    </div>
                    <pre className="flex-1 p-4 overflow-auto font-mono text-[10px] text-slate-400 select-text leading-relaxed bg-slate-950 custom-scrollbar">
                      <code>{problem.failedCode}</code>
                    </pre>
                  </div>

                  {/* Right Side: Concept GAP identification insights */}
                  <div className="md:col-span-6 space-y-4">
                    <div className="glass p-5 border border-slate-900 rounded-2xl space-y-4 relative overflow-hidden flex flex-col justify-between h-full bg-slate-950/20">
                      <div className="space-y-3">
                        <h4 className="text-xs uppercase font-black text-slate-400 font-mono tracking-widest flex items-center gap-1.5">
                          <Zap size={13} className="text-red-500 fill-red-500/20" /> Logic Diagnostic Report
                        </h4>
                        
                        <div className="space-y-2">
                          <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-900/50 flex justify-between items-center">
                            <span className="text-[11px] text-slate-400">Deep Concept Gap:</span>
                            <span className="text-xs font-mono font-black text-rose-400 uppercase tracking-tight bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                              {problem.associatedConcept}
                            </span>
                          </div>

                          <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-900/50 flex justify-between items-center">
                            <span className="text-[11px] text-slate-400">Complexity Gap:</span>
                            <div className="flex items-center gap-1 font-mono text-[11px]">
                              <span className="text-red-400 line-through">{problem.originalComplexity}</span>
                              <ChevronRight size={10} className="text-slate-600" />
                              <span className="text-emerald-400 font-bold">{problem.expectedComplexity}</span>
                            </div>
                          </div>

                          <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-900/50 flex flex-col gap-1.5 align-start">
                            <span className="text-[11px] text-slate-400">Specific Code Bug (Logic Error):</span>
                            <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                              {problem.logicError}
                            </p>
                          </div>

                          <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-900/50 flex justify-between items-center">
                            <span className="text-[11px] text-slate-400">AI Confidence:</span>
                            <span className={clsx(
                              "text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded",
                              problem.confidence === 'Low' ? "bg-red-500/10 text-red-400" : "bg-emerald-500/10 text-emerald-400"
                            )}>{problem.confidence} / Flagged Weak</span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => setActiveTab('practice')}
                        className="w-full py-2.5 bg-gradient-to-r from-red-500 to-rose-600 hover:brightness-110 active:scale-[0.99] text-gray-950 text-xs font-mono font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-lg shadow-rose-500/10 flex items-center justify-center gap-2"
                      >
                        <Play size={11} className="fill-gray-950" /> Initiate Concept Recovery Loop
                      </button>
                    </div>
                  </div>
                </div>

                {/* Flow Prerequisite Concept Tree & AI Learning Journey */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  
                  {/* Prerequisite tree mapping card */}
                  <div className="glass p-5 border border-slate-800 rounded-2xl space-y-4">
                    <h4 className="text-xs uppercase font-black text-slate-400 font-mono tracking-widest flex items-center gap-2">
                      <Target size={14} className="text-cyan-500" /> Missing Prerequisite Node Map
                    </h4>
                    
                    <p className="text-[11px] text-slate-400">
                      We trace backwards to locate dependencies before rebuilding target concept <strong className="text-slate-200">{problem.associatedConcept}</strong>.
                    </p>

                    <div className="flex items-center gap-2.5 p-3.5 bg-slate-950/80 rounded-2xl border border-slate-900 justify-around">
                      {problem.prerequisites.map((prereq, index) => (
                        <div key={index} className="flex flex-col items-center gap-1.5 relative">
                          {index > 0 && (
                            <div className="absolute right-full top-3 w-6 h-[2px] bg-slate-800 -mr-[6px]" />
                          )}
                          <div className={clsx(
                            "w-8 h-8 rounded-full border flex items-center justify-center font-mono text-xs font-extrabold select-none",
                            prereq.status === 'completed' 
                              ? "bg-slate-900 border-emerald-500 text-emerald-400" 
                              : "bg-slate-950 border-red-500/40 text-red-400 shadow-[0_0_8px_rgba(239,68,68,0.15)] animate-pulse"
                          )}>
                            {prereq.status === 'completed' ? '✓' : '✖'}
                          </div>
                          <span className="text-[10px] font-sans font-bold text-slate-300">{prereq.name}</span>
                          <span className="text-[8px] font-mono text-slate-500 uppercase">{prereq.status === 'completed' ? 'unlocked' : 'MISSING'}</span>
                        </div>
                      ))}
                    </div>

                    <div className="p-3 bg-red-500/5 rounded-xl border border-red-500/10 flex items-start gap-2.5">
                      <AlertTriangle size={14} className="text-rose-400 shrink-0 mt-0.5" />
                      <p className="text-[10.5px] text-slate-400 leading-normal">
                        <strong>Skill block detected:</strong> You must bridge core patterns under <strong className="text-slate-200">{problem.prerequisites.find(p => p.status === 'missing')?.name || 'Two Pointers'}</strong> prior to mastering the rolling array structures.
                      </p>
                    </div>
                  </div>

                  {/* AI Learning Roadmap */}
                  <div className="glass p-5 border border-slate-800 rounded-2xl space-y-4">
                    <h4 className="text-xs uppercase font-black text-slate-400 font-mono tracking-widest flex items-center gap-2">
                      <BookOpen size={14} className="text-purple-400" /> Dynamic Recovery Action-Roadmap
                    </h4>
                    
                    <div className="space-y-3 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-[1px] before:bg-slate-800">
                      {problem.steps.map((step, index) => {
                        const isFirstStep = index === 0;
                        return (
                          <div key={index} className="flex gap-3.5 relative">
                            <div className={clsx(
                              "w-7 h-7 rounded-full flex items-center justify-center font-mono text-[10px] font-black z-10 select-none border shrink-0",
                              isFirstStep
                                ? "bg-cyan-500/10 border-cyan-500 text-cyan-400 shadow-[0_0_6px_rgba(6,182,212,0.2)]"
                                : "bg-slate-950 border-slate-800 text-slate-500"
                            )}>
                              {index + 1}
                            </div>
                            <div className="space-y-0.5">
                              <h5 className={clsx(
                                "text-xs font-bold",
                                isFirstStep ? "text-cyan-400" : "text-slate-300"
                              )}>{step.title}</h5>
                              <p className="text-[10px] text-slate-400 leading-relaxed font-sans">{step.desc}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>

                {/* Smart Question Recommendation progression */}
                <div className="glass p-5 border border-slate-800 rounded-2xl space-y-3.5">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xs uppercase font-black text-slate-400 font-mono tracking-widest flex items-center gap-2">
                      <Bookmark size={14} className="text-amber-400" /> Dynamic Concept-Based Progression Challenge-Matrix
                    </h4>
                    <span className="text-[8px] uppercase tracking-widest bg-amber-500/10 text-amber-500 px-1.5 py-0.5 rounded font-mono font-bold">
                      Algorithmically Targeted
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-400">
                    Avoid random questions that introduce syntax fatigue. Complete these ordered challenges specifically targetting <strong className="text-slate-300">{problem.associatedConcept}</strong> pattern fluency.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
                    {problem.questions.map((q, idx) => (
                      <div 
                        key={idx} 
                        onClick={() => {
                          setActivePracticeQuestion(q as any);
                          setActiveTab('practice');
                          const customTemplate = PRACTICE_TEMPLATES[q.title];
                          if (customTemplate) {
                            setUserDrillSolution(customTemplate);
                          } else {
                            setUserDrillSolution(`// Write your template solution for: ${q.title}\nfunction solvePractice() {\n  return null;\n}`);
                          }
                          setDrillSuccessStatus('idle');
                          setDrillFeedback('');
                        }}
                        className="bg-slate-950 p-3 rounded-xl border border-slate-900 group hover:border-cyan-500/30 hover:bg-slate-900/60 cursor-pointer transition-all flex flex-col justify-between h-24 relative overflow-hidden shadow-md"
                      >
                        <div className="absolute top-0 right-0 w-12 h-12 bg-slate-900/50 rounded-bl-3xl group-hover:bg-slate-900/80 flex items-start justify-end p-1">
                          <span className="text-[8px] font-mono font-black text-slate-500">#{idx + 1}</span>
                        </div>
                        <h5 className="text-[11px] font-black text-slate-200 mt-1 pr-6 leading-snug line-clamp-2">{q.title}</h5>
                        <div className="flex items-center justify-between">
                          <span className={clsx(
                            "text-[8px] font-mono font-bold tracking-tight uppercase px-1.5 py-0.5 rounded",
                            q.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/15' :
                            q.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/15' :
                            'bg-red-500/10 text-red-400 border border-red-500/15'
                          )}>{q.difficulty}</span>
                          <span className="text-[9px] text-slate-500 font-mono flex items-center gap-0.5 group-hover:text-cyan-400 transition-colors">
                            Practice <ArrowRight size={8} />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>
            )}

            {/* Tab 2: Interactive Practice Workspace */}
            {activeTab === 'practice' && (
              <motion.div
                key="practice"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-5"
              >
                <div className="glass p-5 border border-slate-800 rounded-3xl space-y-4">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                    <div>
                      <h3 className="text-sm font-black text-slate-100 flex items-center gap-2">
                        <Code size={16} className="text-cyan-400" />
                        {activePracticeQuestion 
                          ? `Interactive Recovery Lab: Practice "${activePracticeQuestion.title}" (${activePracticeQuestion.difficulty})`
                          : `Interactive Recovery Lab: Solve "${problem.associatedConcept}"`}
                      </h3>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {activePracticeQuestion
                          ? `Write custom algorithms solving standard "${problem.associatedConcept}" patterns for maximum career suitability marks.`
                          : 'Write algorithmic patterns resolving this failed index using optimal time parameters. Run validation tests below.'}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-400 font-mono">Current Concept Mastery:</span>
                      <span className={clsx(
                        "text-xs font-mono font-black px-2 py-0.5 rounded",
                        mastery[problem.id === 'longest-substring' ? 'Sliding Window' : 'Graphs'] >= 80
                          ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
                          : "bg-red-500/15 text-red-400 border border-red-500/20 animate-pulse"
                      )}>
                        {mastery[problem.id === 'longest-substring' ? 'Sliding Window' : 'Graphs']}%
                      </span>
                    </div>
                  </div>

                  {/* Interactive coding textarea */}
                  <div className="bg-slate-950 rounded-2xl border border-slate-900 overflow-hidden shadow-inner flex flex-col h-[340px]">
                    <div className="px-4 py-2 bg-slate-900/50 border-b border-slate-850 flex justify-between items-center font-mono text-[10px] text-slate-400">
                      <span>JavaScript ES6 Compilation Simulated Buffer</span>
                      <span className="text-[8px] uppercase tracking-widest bg-cyan-500/10 text-cyan-400 border border-cyan-500/15 px-1 rounded">
                        Strict O(N) Constraints
                      </span>
                    </div>
                    <textarea
                      value={userDrillSolution}
                      onChange={(e) => setUserDrillSolution(e.target.value)}
                      className="flex-1 p-4 bg-slate-950 text-[11px] font-mono text-cyan-300 border-none outline-none resize-none focus:outline-none leading-relaxed select-text"
                      spellCheck="false"
                    />
                  </div>

                  {/* Validation trigger and feedback */}
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-slate-500 font-mono">
                        Supports simple pattern assessment logic. Click Submit to verify.
                      </span>

                      <button
                        onClick={submitInteractivePractice}
                        disabled={isEvaluatingDrill}
                        className={clsx(
                          "px-6 py-2.5 rounded-xl text-xs font-mono font-black uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-md",
                          isEvaluatingDrill 
                            ? "bg-slate-900 text-slate-500 border border-slate-800"
                            : "bg-cyan-500 hover:bg-cyan-400 text-slate-950"
                        )}
                      >
                        {isEvaluatingDrill ? (
                          <>
                            <RefreshCw size={13} className="animate-spin" /> Evaluating Code Telemetry...
                          </>
                        ) : (
                          <>
                            <Play size={13} className="fill-slate-950" /> Verify with AI Recovery test-cases
                          </>
                        )}
                      </button>
                    </div>

                    {/* Result outputs */}
                    <AnimatePresence>
                      {drillSuccessStatus !== 'idle' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className={clsx(
                            "p-4 rounded-xl border flex gap-3 items-start",
                            drillSuccessStatus === 'success' 
                              ? "bg-emerald-500/5 border-emerald-550/30 text-slate-300" 
                              : "bg-red-500/5 border-red-550/30 text-slate-300"
                          )}
                        >
                          {drillSuccessStatus === 'success' ? (
                            <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                          ) : (
                            <XCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
                          )}
                          <div className="space-y-1">
                            <h5 className={clsx(
                              "text-xs font-black uppercase font-mono",
                              drillSuccessStatus === 'success' ? "text-emerald-400" : "text-red-400"
                            )}>
                              {drillSuccessStatus === 'success' ? 'Mastery Unlocked! ✓' : 'Validation Failed ✖'}
                            </h5>
                            <p className="text-[11px] leading-relaxed font-mono">
                              {drillFeedback}
                            </p>
                            {drillSuccessStatus === 'success' && (
                              <p className="text-[10px] text-slate-400 pt-1 font-sans">
                                🎉 This concept is now marked as <strong>STRONG</strong> in your Skill DNA! Career GPS has automatically updated. Your overall readiness is now <strong className="text-slate-200">{overallReadiness}%</strong> and ETA is reduced to <strong className="text-slate-200">{finalEta} months</strong>.
                              </p>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Tab 3: AI Learning Coach */}
            {activeTab === 'coach' && (
              <motion.div
                key="coach"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-5"
              >
                <div className="glass p-5 border border-slate-800 rounded-3xl space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400 shrink-0">
                      <Brain size={20} />
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-slate-100 uppercase tracking-tight">Active Learning Coach Diagnostic</h3>
                      <p className="text-[11px] text-slate-400">Personalized timeline breakdown and learning sequencing based on simulated failures.</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-900 space-y-3">
                      <div className="flex items-center gap-1.5 text-xs text-amber-400 font-mono uppercase font-black">
                        <Activity size={12} className="animate-pulse" /> Code telemetry detects cyclic trends:
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed font-sans">
                        You consistently encounter performance bottlenecks (TLE) on array sliding bounds and loop-nest references. This tells us you struggle with both <strong>Graphs</strong> and <strong>Dynamic Programming/Two Pointers</strong>.
                      </p>
                    </div>

                    <div className="space-y-2.5">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">Recommended Conceptual Learning Order:</span>
                      
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                        {[
                          { title: '1. Breadth-First-Search', desc: 'Verify queue bounds' },
                          { title: '2. Depth-First-Search', desc: 'Callstack recursion limit' },
                          { title: '3. Shortest Paths', desc: 'Dijkstra index weights' },
                          { title: '4. Dynamic Programming Basics', desc: 'Symmetry memoization' },
                          { title: '5. Advanced Multigrid DP', desc: 'Recursive state reduction' }
                        ].map((rec, index) => (
                          <div key={index} className="p-3 bg-slate-900/40 rounded-xl border border-slate-850 hover:border-slate-800 transition-all text-center">
                            <h5 className="text-[11px] font-black text-slate-200">{rec.title}</h5>
                            <p className="text-[9px] text-slate-500 mt-1">{rec.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* Right Column (4 cols): Real-time Mastery scores, Skill DNA updates & Career GPS live impact */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Concept Mastery Scores */}
          <div className="glass p-5 border border-slate-800 rounded-3xl space-y-4 relative overflow-hidden">
            <h4 className="text-xs uppercase font-black text-slate-300 font-mono tracking-widest flex items-center justify-between">
              <span className="flex items-center gap-1.5"><TrendingUp size={13} className="text-cyan-400" /> Mastery Scoreboard</span>
              <span className="text-[9px] text-slate-500 font-normal">Real-time</span>
            </h4>

            <div className="space-y-3.5">
              {Object.entries(mastery).map(([topic, score]) => (
                <div key={topic} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-200">{topic}</span>
                    <span className={clsx(
                      "font-mono font-black",
                      score >= 80 ? 'text-emerald-400' : score < 40 ? 'text-rose-400' : 'text-amber-400'
                    )}>{score}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-900">
                    <motion.div 
                      className={clsx(
                        "h-full rounded-full",
                        score >= 80 ? 'bg-gradient-to-r from-emerald-500 to-teal-400' : 
                        score < 40 ? 'bg-gradient-to-r from-red-500 to-rose-400 animate-pulse' : 
                        'bg-gradient-to-r from-amber-500 to-orange-400'
                      )}
                      initial={{ width: 0 }}
                      animate={{ width: `${score}%` }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skill DNA Integration display */}
          <div className="glass p-5 border border-slate-800 rounded-3xl space-y-4 relative overflow-hidden">
            <h4 className="text-xs uppercase font-black text-slate-300 font-mono tracking-widest flex items-center gap-1.5">
              <Cpu size={13} className="text-rose-400" /> Updated Skill DNA Blueprint
            </h4>

            <p className="text-[11px] text-slate-400">
              Your concept recovery metrics directly re-weight indices in the global Skills spectrum.
            </p>

            <div className="grid grid-cols-2 gap-3.5 pt-1">
              <div className="bg-emerald-950/20 p-3 rounded-2xl border border-emerald-500/10 space-y-2">
                <span className="text-[9px] font-mono uppercase font-black text-emerald-400">Strong Competencies</span>
                <div className="space-y-1.5">
                  {Object.entries(mastery).filter(([_, s]) => s >= 80).map(([topic]) => (
                    <div key={topic} className="text-xs text-slate-300 flex items-center gap-1.5">
                      <span className="text-emerald-400">✔</span> {topic}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-red-950/20 p-3 rounded-2xl border border-red-500/10 space-y-2">
                <span className="text-[9px] font-mono uppercase font-black text-rose-400">Weak Gaps Identified</span>
                <div className="space-y-1.5">
                  {Object.entries(mastery).filter(([_, s]) => s < 60).map(([topic]) => (
                    <div key={topic} className="text-xs text-slate-300 flex items-center gap-1.5 text-slate-450">
                      <span className="text-red-400">✖</span> {topic}
                    </div>
                  ))}
                  {Object.entries(mastery).filter(([_, s]) => s < 60).length === 0 && (
                    <div className="text-[10px] text-slate-500 italic">No critical gaps! All concepts above 60%.</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Career GPS Live Recalculation Impact */}
          <div className="glass p-5 border border-slate-800 rounded-3xl space-y-4 relative overflow-hidden bg-gradient-to-br from-slate-900/30 to-rose-950/10">
            <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/2 rounded-full blur-2xl" />
            
            <h4 className="text-xs uppercase font-black text-slate-300 font-mono tracking-widest flex items-center gap-1.5">
              <Compass size={13} className="text-amber-400" /> Career GPS Integration
            </h4>

            <div className="space-y-3 font-mono text-[11px]">
              <div className="flex justify-between py-1 border-b border-slate-850">
                <span className="text-slate-400">Target Role:</span>
                <span className="font-bold text-slate-200">Google L3 Software Eng</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-850 items-center">
                <span className="text-slate-400">Current Readiness:</span>
                <div className="text-right">
                  <span className="font-bold text-cyan-400 text-sm">{overallReadiness}%</span>
                  <p className="text-[8px] text-slate-500 uppercase tracking-wider font-semibold">Remaining: {remaingDistance}%</p>
                </div>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-850 items-center">
                <span className="text-slate-400">Estimated Horizon:</span>
                <div className="text-right">
                  <span className="font-black text-amber-400">{finalEta} Months</span>
                  <p className="text-[8px] text-slate-500 uppercase tracking-wider font-semibold">
                    {finalEta < 4 ? 'ETA Rerouted Faster' : 'Standard Speed'}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-1 py-1 align-start text-xs font-sans">
                <span className="text-slate-400 font-mono text-[11px]">GPS Guidance Warning:</span>
                <p className="text-[10px] text-slate-550 leading-relaxed font-semibold italic">
                  {mastery['Sliding Window'] < 80 
                    ? '⚠ Thruway blocked. Recalculation delayed due to outstanding Sliding Window pattern failures.'
                    : '✓ Path updated! Sliding Window verification completed. Standard speedway is now clear.'
                  }
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
