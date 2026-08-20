/* ==========================================================================
   AURA | AI Engine & Intelligence Simulator
   ========================================================================== */

const AIEngine = {
  // 1. AI Study Tutor Responder
  generateTutorResponse(userMessage) {
    const msg = userMessage.toLowerCase();
    
    if (msg.includes("dynamic programming") || msg.includes("dp")) {
      return `
<strong>💡 Dynamic Programming (DP) Explained Simply:</strong><br><br>
Imagine writing down <code>1 + 1 + 1 + 1 + 1 = 5</code> on a piece of paper. If I ask you what it equals, you count to 5. Now, if I add another <code>+ 1</code> at the end and ask you the new total, you don't recount from the beginning—you remember that the previous total was 5, and simply add 1 to get <strong>6</strong>!<br><br>
<em>That memory is Dynamic Programming!</em> We break a complex problem into smaller subproblems, solve them once, and store the result (Memoization / Tabulation).<br><br>
<strong>Core Steps to Master DP:</strong>
<ol>
  <li>Identify subproblem state (e.g. <code>dp[i]</code>).</li>
  <li>Write down the Recurrence Relation (e.g. <code>dp[i] = dp[i-1] + dp[i-2]</code>).</li>
  <li>Identify base cases (e.g. <code>dp[0] = 0, dp[1] = 1</code>).</li>
</ol><br>
<strong>Quick Follow-Up Quiz:</strong> Can you name 2 classic DP problems besides Fibonacci? (Hint: Climbing Stairs, Coin Change).
      `;
    }

    if (msg.includes("gradient descent") || msg.includes("ml")) {
      return `
<strong>🤖 Gradient Descent Intuition:</strong><br><br>
Imagine you are blindfolded on a foggy mountain peak and want to walk down to the lowest valley (the minimum Loss/Error point). You feel the slope under your feet with your cane:<br>
<ul>
  <li>If the slope is steep downward, you take a step in that direction.</li>
  <li>The size of your step is controlled by the <strong>Learning Rate ($\alpha$)</strong>.</li>
</ul>
If your step size is too large, you might overshoot the valley! If it's too small, it takes forever to reach the bottom.<br><br>
<strong>Formula:</strong><br>
<code>θ_new = θ_old - (learning_rate * ∂Loss / ∂θ)</code>
      `;
    }

    if (msg.includes("bfs") || msg.includes("dfs") || msg.includes("graph")) {
      return `
<strong>🧩 BFS vs. DFS Breakdown:</strong><br><br>
- <strong>BFS (Breadth-First Search):</strong> Explores node by node in concentric ripples like water droplets. Uses a <code>Queue (FIFO)</code>. Best for finding the <em>Shortest Path</em> in unweighted graphs!<br>
- <strong>DFS (Depth-First Search):</strong> Explores as deep down one branch as possible before backtracking. Uses a <code>Stack (LIFO)</code> or <em>Recursion</em>. Best for detecting cycles or topological sorting.<br><br>
<code>Time Complexity: O(V + E) for both!</code>
      `;
    }

    // Default intelligent AI response fallback
    return `
<strong>💡 AI Tutor Insight for: "${userMessage}"</strong><br><br>
Great question! When approaching <strong>${userMessage}</strong> in computer science and engineering:<br><br>
1. <strong>Core Principle:</strong> Break down the problem into smaller modular components.<br>
2. <strong>Key Edge Cases:</strong> Always test edge cases (empty inputs, zero values, large $N$).<br>
3. <strong>Best Practice:</strong> Focus on achieving correctness first, then optimize time/space complexity.<br><br>
<em>Pro Tip: Try solving a practice question related to this in the Code Sandbox or check out the Knowledge Hub cheat sheets!</em>
    `;
  },

  // 2. AI Reschedule Engine
  rescheduleTasks(tasks, dailyHours) {
    const updated = tasks.map(t => {
      if (!t.completed) {
        return {
          ...t,
          title: `[Rescheduled by AI] ${t.title}`,
          hours: "1.0 hr"
        };
      }
      return t;
    });

    // Add a balanced review task
    updated.push({
      id: Date.now(),
      title: "AI Quick Review: 15-min Formula Flashcards",
      category: "aiml",
      tag: "AI Review",
      hours: "0.25 hr",
      completed: false
    });

    return updated;
  },

  // 3. AI Code Debugger & Complexity Analyzer
  analyzeCode(code, lang) {
    const hasLoop = code.includes("for") || code.includes("while");
    const hasNested = (code.match(/for|while/g) || []).length > 1;
    const hasMap = code.includes("dict") || code.includes("Map") || code.includes("{}") || code.includes("set");

    let timeComplexity = "O(1)";
    let spaceComplexity = "O(1)";

    if (hasNested) {
      timeComplexity = "O(N^2)";
    } else if (hasLoop) {
      timeComplexity = "O(N)";
    }

    if (hasMap) {
      spaceComplexity = "O(N)";
    }

    return {
      status: "Success (Passed 3/3 Test Cases)",
      timeComplexity,
      spaceComplexity,
      feedback: `✅ Solution Executed Cleanly!\n\n• Estimated Time Complexity: ${timeComplexity}\n• Estimated Space Complexity: ${spaceComplexity}\n• AI Optimization Note: Good job using optimal data structures!`
    };
  },

  // 4. AI Career Mentor Audit Generator
  generateCareerAudit(profile) {
    return `
<h3>🧙‍♂️ AI Career Diagnostic Report for ${profile.name}</h3>
<p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 16px;">Target Role: <strong>${profile.targetRole}</strong> • Year: ${profile.year}</p>

<div class="audit-section">
  <h4>1. Strengths & Consistency</h4>
  <p>🔥 <strong>Streak Excellence:</strong> You've maintained a 14-day study streak! Your consistency in Python and Machine Learning fundamentals is in the top 15% of college students.</p>
</div>

<div class="audit-section">
  <h4>2. High-Priority Focus Area (Skill-Gap)</h4>
  <p>⚠️ <strong>DSA Practice Gap:</strong> You have solved 48 / 150 DSA problems. To pass technical screening rounds for ${profile.targetRole}, aim to reach <strong>80+ problems</strong> focusing on Binary Trees, Graphs, and Dynamic Programming over the next 3 weeks.</p>
</div>

<div class="audit-section">
  <h4>3. Actionable Next Steps</h4>
  <ul>
    <li>Complete 3 Binary Search Tree problems in the DSA Preparation Hub.</li>
    <li>Build & deploy your "Smart AI Code Reviewer" project to boost your GitHub portfolio.</li>
    <li>Run an ATS Resume Scan in the Job & Internship Prep section.</li>
  </ul>
</div>
    `;
  },

  // 5. AI Notes Summarizer & Flashcards Engine
  summarizeNotes(noteText) {
    if (!noteText.trim()) return "Please type or paste some lecture notes first!";
    return `
<strong>📌 Executive Bullet Summary:</strong>
<ul>
  <li>Main Concepts Extracted: Core definitions, key operational phases, and architectural tradeoffs.</li>
  <li>Critical Exam Takeaways: Pay special attention to comparison criteria and edge-case conditions.</li>
</ul>

<strong>🎴 Auto-Generated Revision Flashcards:</strong>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 10px;">
  <div style="background: var(--bg-input); padding: 10px; border-radius: 8px; border: 1px solid var(--border-color);">
    <strong>Q: What is the core definition?</strong><br>
    <span style="color: var(--text-muted); font-size: 0.8rem;">A: Summarized directly from your note text above.</span>
  </div>
  <div style="background: var(--bg-input); padding: 10px; border-radius: 8px; border: 1px solid var(--border-color);">
    <strong>Q: What is the main formula or algorithm?</strong><br>
    <span style="color: var(--accent-emerald); font-size: 0.8rem;">A: Stored in Knowledge Hub for rapid exam revision.</span>
  </div>
</div>
    `;
  }
};
