/* ==========================================================================
   AURA | AI Student OS - Initial Data Store
   ========================================================================== */

const initialProfile = {
  name: "Alex Dev",
  avatar: "AD",
  course: "B.Tech Computer Science",
  year: "3rd Year",
  targetRole: "AI/ML Engineer",
  dailyHours: 4,
  level: "Intermediate",
  xp: 3450,
  levelNum: 6,
  streak: 14,
  dsaSolved: 48,
  dsaTotal: 150,
  aimlProgress: 65,
  jobReadiness: 74
};

const todayTasks = [
  { id: 1, title: "Solve 2 Tree DSA Problems (Binary Tree Inorder & Depth)", category: "dsa", tag: "DSA", hours: "1.5 hrs", completed: false },
  { id: 2, title: "Study Neural Networks & PyTorch Autograd module", category: "aiml", tag: "AI/ML", hours: "1.5 hrs", completed: true },
  { id: 3, title: "Implement Multi-Head Attention layer in Code Sandbox", category: "project", tag: "Project", hours: "1.0 hr", completed: false }
];

const upcomingDeadlines = [
  { id: 1, title: "Mid-Term Exam: Operating Systems", date: "In 4 Days", type: "Exam" },
  { id: 2, title: "Google Summer of Code Proposal", date: "In 10 Days", type: "Application" },
  { id: 3, title: "Campus Placement Aptitude Test", date: "In 2 Weeks", type: "Placement" }
];

const dsaTopicsData = [
  { id: "Arrays", icon: "📊", name: "Arrays & Hashing", total: 20, solved: 14 },
  { id: "Strings", icon: "🔤", name: "Strings & Pointers", total: 15, solved: 10 },
  { id: "Linked Lists", icon: "🔗", name: "Linked Lists", total: 12, solved: 8 },
  { id: "Stack & Queue", icon: "📚", name: "Stack & Queue", total: 12, solved: 6 },
  { id: "Trees", icon: "🌲", name: "Trees & BST", total: 25, solved: 5 },
  { id: "Graphs", icon: "🕸️", name: "Graphs (BFS/DFS)", total: 25, solved: 3 },
  { id: "Dynamic Programming", icon: "⚡", name: "Dynamic Programming", total: 25, solved: 2 }
];

const dsaProblemsData = [
  {
    id: "p1",
    title: "Two Sum",
    topic: "Arrays",
    difficulty: "Easy",
    timeComplexity: "O(N)",
    spaceComplexity: "O(N)",
    status: "Solved",
    desc: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to target.",
    hints: [
      "Hint 1: A brute-force approach uses two nested loops in O(N^2) time.",
      "Hint 2: Can we store numbers we've seen so far in a Hash Map to look up (target - num) in O(1) time?",
      "Hint 3: Map each value to its index during a single iteration through the array."
    ],
    starterCode: {
      python: "def twoSum(nums, target):\n    seen = {}\n    for i, num in enumerate(nums):\n        diff = target - num\n        if diff in seen:\n            return [seen[diff], i]\n        seen[num] = i\n    return []\n\nprint(twoSum([2, 7, 11, 15], 9))",
      javascript: "function twoSum(nums, target) {\n    const map = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        let diff = target - nums[i];\n        if (map.has(diff)) return [map.get(diff), i];\n        map.set(nums[i], i);\n    }\n    return [];\n}\nconsole.log(twoSum([2, 7, 11, 15], 9));",
      cpp: "#include <iostream>\n#include <vector>\n#include <unordered_map>\nusing namespace std;\n\nvector<int> twoSum(vector<int>& nums, int target) {\n    unordered_map<int, int> m;\n    for(int i=0; i<nums.size(); i++) {\n        if(m.find(target - nums[i]) != m.end()) return {m[target-nums[i]], i};\n        m[nums[i]] = i;\n    }\n    return {};\n}",
      java: "import java.util.*;\nclass Solution {\n    public int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            if (map.containsKey(target - nums[i])) return new int[]{map.get(target - nums[i]), i};\n            map.put(nums[i], i);\n        }\n        return new int[]{};\n    }\n}"
    }
  },
  {
    id: "p2",
    title: "Reverse Linked List",
    topic: "Linked Lists",
    difficulty: "Easy",
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    status: "Solved",
    desc: "Given the head of a singly linked list, reverse the list and return its reversed head.",
    hints: [
      "Hint 1: Maintain three pointers: prev (null), current (head), and next (null).",
      "Hint 2: Iteratively flip current.next = prev while updating pointers forward.",
      "Hint 3: Return prev at the end when current becomes null."
    ],
    starterCode: {
      python: "# Definition for singly-linked list node\nclass ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef reverseList(head):\n    prev = None\n    curr = head\n    while curr:\n        nxt = curr.next\n        curr.next = prev\n        prev = curr\n        curr = nxt\n    return prev",
      javascript: "function reverseList(head) {\n    let prev = null;\n    let curr = head;\n    while (curr) {\n        let next = curr.next;\n        curr.next = prev;\n        prev = curr;\n        curr = next;\n    }\n    return prev;\n}"
    }
  },
  {
    id: "p3",
    title: "Binary Tree Maximum Path Sum",
    topic: "Trees",
    difficulty: "Hard",
    timeComplexity: "O(N)",
    spaceComplexity: "O(H)",
    status: "Unsolved",
    desc: "A path in a binary tree is a sequence of nodes where each pair of adjacent nodes has an edge. Find the maximum path sum.",
    hints: [
      "Hint 1: Use Post-Order DFS traversal to compute child path contributions.",
      "Hint 2: At each node, compute node.val + left_gain + right_gain.",
      "Hint 3: Update global maximum, but only return node.val + max(left_gain, right_gain) to parent!"
    ],
    starterCode: {
      python: "def maxPathSum(root):\n    max_sum = float('-inf')\n    def dfs(node):\n        nonlocal max_sum\n        if not node: return 0\n        left = max(dfs(node.left), 0)\n        right = max(dfs(node.right), 0)\n        max_sum = max(max_sum, node.val + left + right)\n        return node.val + max(left, right)\n    dfs(root)\n    return max_sum"
    }
  },
  {
    id: "p4",
    title: "Longest Increasing Subsequence",
    topic: "Dynamic Programming",
    difficulty: "Medium",
    timeComplexity: "O(N log N)",
    spaceComplexity: "O(N)",
    status: "Unsolved",
    desc: "Given an integer array nums, return the length of the longest strictly increasing subsequence.",
    hints: [
      "Hint 1: Standard DP approach is O(N^2) where dp[i] is max length ending at index i.",
      "Hint 2: Optimize to O(N log N) using patience sorting and binary search (bisect_left)."
    ],
    starterCode: {
      python: "import bisect\ndef lengthOfLIS(nums):\n    tails = []\n    for x in nums:\n        idx = bisect.bisect_left(tails, x)\n        if idx == len(tails):\n            tails.append(x)\n        else:\n            tails[idx] = x\n    return len(tails)\n\nprint(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18]))"
    }
  }
];

const aimlRoadmapData = [
  { step: 1, title: "1. Python Fundamentals & OOP", status: "Completed", topics: ["Data types", "Functions", "OOP concepts", "File I/O"] },
  { step: 2, title: "2. Math for AI & LinAlg", status: "Completed", topics: ["Vectors & Matrices", "Eigenvalues", "Calculus & Derivatives", "Probability"] },
  { step: 3, title: "3. Data Wrangling (NumPy & Pandas)", status: "Completed", topics: ["N-Dim Arrays", "DataFrames", "Cleaning", "Aggregations"] },
  { step: 4, title: "4. Machine Learning Algorithms", status: "In Progress", topics: ["Linear Regression", "Decision Trees", "Random Forests", "SVM", "K-Means"] },
  { step: 5, title: "5. Deep Learning & Neural Nets", status: "Recommended Next", topics: ["Perceptrons", "Backpropagation", "PyTorch Basics", "Loss Functions"] },
  { step: 6, title: "6. Computer Vision (CNNs)", status: "Locked", topics: ["Convolutions", "ResNet", "Object Detection (YOLO)", "OpenCV"] },
  { step: 7, title: "7. Natural Language Processing", status: "Locked", topics: ["Tokenization", "TF-IDF", "Word Embeddings", "RNNs & LSTMs"] },
  { step: 8, title: "8. Transformers & GenAI", status: "Locked", topics: ["Self-Attention", "BERT & GPT", "LangChain", "RAG & Vector DBs"] }
];

const skillTreeData = {
  swe: {
    nodes: [
      { id: "n1", label: "Python / C++", x: 100, y: 150, status: "unlocked", icon: "🐍", prereqs: "None", unlocks: "DSA Basics", topics: ["Variables & Loops", "Functions", "Classes & Objects"] },
      { id: "n2", label: "Arrays & Strings", x: 260, y: 150, status: "unlocked", icon: "📊", prereqs: "Python / C++", unlocks: "LinkedLists & Stack", topics: ["Two Pointers", "Sliding Window", "Prefix Sum"] },
      { id: "n3", label: "Linked Lists & Stack", x: 420, y: 150, status: "unlocked", icon: "🔗", prereqs: "Arrays & Strings", unlocks: "Trees & Recursion", topics: ["Singly/Doubly", "Monotonic Stack", "Queue Queue"] },
      { id: "n4", label: "Trees & Recursion", x: 580, y: 150, status: "current", icon: "🌲", prereqs: "Linked Lists", unlocks: "Graphs & DP", topics: ["Binary Search Trees", "DFS & BFS", "Trie"] },
      { id: "n5", label: "Graphs & DP", x: 740, y: 150, status: "locked", icon: "🕸️", prereqs: "Trees", unlocks: "System Design", topics: ["Dijkstra / Topological Sort", "Memoization", "Tabulation"] },
      { id: "n6", label: "Full Stack / Backend", x: 420, y: 350, status: "unlocked", icon: "🌐", prereqs: "Python", unlocks: "Portfolio App", topics: ["REST APIs", "Node.js / FastAPI", "PostgreSQL"] },
      { id: "n7", label: "Portfolio & GitHub", x: 650, y: 350, status: "unlocked", icon: "🐙", prereqs: "Full Stack", unlocks: "Technical Interview", topics: ["Git Workflow", "README Specs", "Deployments"] },
      { id: "n8", label: "Tech Interview Ready", x: 880, y: 250, status: "locked", icon: "💼", prereqs: "Graphs & Portfolio", unlocks: "Software Internship", topics: ["Mock Interviews", "System Design", "Behavioral"] }
    ],
    edges: [
      { from: "n1", to: "n2", active: true },
      { from: "n2", to: "n3", active: true },
      { from: "n3", to: "n4", active: true },
      { from: "n4", to: "n5", active: false },
      { from: "n1", to: "n6", active: true },
      { from: "n6", to: "n7", active: true },
      { from: "n5", to: "n8", active: false },
      { from: "n7", to: "n8", active: false }
    ]
  },
  aiml: {
    nodes: [
      { id: "m1", label: "Python for AI", x: 100, y: 150, status: "unlocked", icon: "🐍", prereqs: "None", unlocks: "Math & NumPy", topics: ["Data Structures", "Functions", "Generators"] },
      { id: "m2", label: "Math & LinAlg", x: 260, y: 150, status: "unlocked", icon: "📐", prereqs: "Python", unlocks: "NumPy & Pandas", topics: ["Matrix Multiplication", "Derivatives", "Probability"] },
      { id: "m3", label: "NumPy & Pandas", x: 420, y: 150, status: "unlocked", icon: "🐼", prereqs: "Math", unlocks: "Machine Learning", topics: ["Vectorization", "DataFrames", "EDA"] },
      { id: "m4", label: "Scikit-Learn ML", x: 580, y: 150, status: "current", icon: "🤖", prereqs: "NumPy & Pandas", unlocks: "Deep Learning", topics: ["Regressions", "Decision Trees", "SVM", "Metrics"] },
      { id: "m5", label: "PyTorch & DL", x: 740, y: 150, status: "locked", icon: "🔥", prereqs: "ML", unlocks: "GenAI & LLMs", topics: ["Tensors", "Autograd", "Neural Networks", "CNNs"] },
      { id: "m6", label: "GenAI & LLM RAG", x: 900, y: 150, status: "locked", icon: "✨", prereqs: "PyTorch", unlocks: "AI Engineer Role", topics: ["Transformers", "LangChain", "Vector Databases", "Prompt Eng"] }
    ],
    edges: [
      { from: "m1", to: "m2", active: true },
      { from: "m2", to: "m3", active: true },
      { from: "m3", to: "m4", active: true },
      { from: "m4", to: "m5", active: false },
      { from: "m5", to: "m6", active: false }
    ]
  }
};

const careerRoadmapsData = [
  {
    role: "AI/ML Engineer",
    description: "Build, train, and deploy intelligent Machine Learning and Generative AI models into production.",
    phases: [
      { phase: "Phase 1: Foundations", duration: "1-2 Months", items: ["Python Core & OOP", "Linear Algebra & Calculus", "Data Manipulation (NumPy, Pandas)"] },
      { phase: "Phase 2: Core ML", duration: "2 Months", items: ["Supervised & Unsupervised Learning", "Scikit-Learn & Feature Engineering", "Model Evaluation & Tuning"] },
      { phase: "Phase 3: Deep Learning & GenAI", duration: "2-3 Months", items: ["PyTorch & Neural Networks", "Computer Vision & NLP Transformers", "LangChain & Vector Search (Pinecone/Chroma)"] },
      { phase: "Phase 4: DSA & Portfolio", duration: "Ongoing", items: ["Solve 100+ LeetCode DSA Problems", "Deploy 2 End-to-End AI Projects on HuggingFace/Vercel"] }
    ]
  },
  {
    role: "Full Stack Developer",
    description: "Design and build modern responsive web applications from frontend UI to backend microservices.",
    phases: [
      { phase: "Phase 1: Frontend Mastery", duration: "2 Months", items: ["HTML5, Modern CSS Grid/Flexbox", "JavaScript ES6+ & TypeScript", "React.js & State Management"] },
      { phase: "Phase 2: Backend Architecture", duration: "2 Months", items: ["Node.js / Express or Python FastAPI", "RESTful & GraphQL API Design", "PostgreSQL & MongoDB Database Design"] },
      { phase: "Phase 3: DevOps & Deployment", duration: "1 Month", items: ["Docker Containerization", "CI/CD Pipelines & AWS/Vercel Deployment"] }
    ]
  }
];

const sampleProjects = [
  {
    domain: "aiml",
    level: "Intermediate",
    title: "Smart AI Code Reviewer & Complexity Analyzer",
    problem: "Developers need automated feedback on code quality, security vulnerabilities, and runtime efficiency before code reviews.",
    utility: "High value for engineering portfolios demonstrating LLM integration, abstract syntax trees, and full-stack API design.",
    stack: ["Python", "FastAPI", "React", "OpenAI / HuggingFace API", "Monaco Editor"],
    time: "3-4 Weeks",
    portfolioValue: "9.5 / 10",
    steps: [
      "1. Build frontend code editor in React with syntax highlighting.",
      "2. Create FastAPI backend endpoint parsing Python code into AST.",
      "3. Integrate LLM prompts for static bug analysis & Big-O estimation.",
      "4. Add unit test suite runner & deploy on Vercel/Render."
    ]
  },
  {
    domain: "webdev",
    level: "Intermediate",
    title: "Real-Time Collaborative Engineering Whiteboard",
    problem: "Distributed student developer teams need a lag-free canvas to sketch architecture diagrams and solve DSA problems together.",
    utility: "Demonstrates WebSocket proficiency, canvas rendering, and scalable backend state synchronization.",
    stack: ["React", "Node.js", "Socket.io", "HTML5 Canvas", "Redis"],
    time: "2-3 Weeks",
    portfolioValue: "9.0 / 10",
    steps: [
      "1. Implement HTML5 Canvas drawing & node creation tools.",
      "2. Connect Socket.io client to broadcast cursor & line events.",
      "3. Store workspace room state in Redis for rapid reconnection."
    ]
  }
];

const knowledgeHubData = [
  { id: 1, category: "dsa", title: "Sliding Window Pattern Cheat Sheet", summary: "Used for subarray/substring problems in contiguous data. Reduces O(N^2) to O(N).", code: "left = 0\nfor right in range(len(arr)):\n    # Expand window\n    while condition_broken:\n        # Shrink window\n        left += 1" },
  { id: 2, category: "aiml", title: "Gradient Descent Formula & Intuition", summary: "Optimization algorithm that iteratively steps down the loss function curve in the direction of negative gradient.", code: "θ_new = θ_old - (learning_rate * ∂L/∂θ)" },
  { id: 3, category: "interview", title: "STAR Method for HR & Behavioral Interviews", summary: "Situation, Task, Action, Result. Frame your project stories with clear quantitative outcomes.", code: "Structure: 20% Context (S/T), 60% Your Specific Action (A), 20% Result/Impact (R)" }
];

const badgesData = [
  { icon: "🔥", title: "14-Day Streak Warrior", sub: "Maintained daily study consistency for 2 weeks straight." },
  { icon: "🧩", title: "DSA Rookie", sub: "Solved over 40+ fundamental data structure problems." },
  { icon: "🤖", title: "ML Apprentice", sub: "Mastered NumPy, Pandas, and Scikit-Learn pipelines." },
  { icon: "💻", title: "Code Sandbox Champion", sub: "Executed 50+ algorithm tests in the interactive IDE." }
];

const initialNotes = [
  {
    id: "n-1",
    title: "Operating Systems: Process Scheduling & CPU Dispatcher",
    subject: "Operating Systems",
    updated: "Today",
    content: "Process States: New, Ready, Running, Waiting, Terminated.\n\nScheduling Algorithms:\n1. FCFS (First Come First Served) - Non-preemptive, suffers from Convoy Effect.\n2. SJF (Shortest Job First) - Optimal average waiting time, but can cause starvation.\n3. Round Robin (RR) - Preemptive using Time Quantum (q).\n\nDeadlock 4 Necessary Conditions:\n- Mutual Exclusion\n- Hold and Wait\n- No Preemption\n- Circular Wait"
  },
  {
    id: "n-2",
    title: "Machine Learning: Convolutional Neural Networks (CNN)",
    subject: "Machine Learning",
    updated: "Yesterday",
    content: "CNN Layers:\n1. Convolutional Layer: Applies kernels/filters over input feature maps.\n2. Activation (ReLU): f(x) = max(0, x) introduces non-linearity.\n3. Pooling Layer (Max Pooling): Reduces spatial dimension & parameters.\n4. Fully Connected (FC) Layer: Classifies features into output probabilities."
  }
];

