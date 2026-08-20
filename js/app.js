/* ==========================================================================
   AURA | AI Student OS - Main Application Controller
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // ------------------------------------------------------------------------
  // State Initialization & LocalStorage Persistence
  // ------------------------------------------------------------------------
  let state = {
    profile: JSON.parse(localStorage.getItem("aura_profile")) || { ...initialProfile },
    tasks: JSON.parse(localStorage.getItem("aura_tasks")) || [...todayTasks],
    dsaProblems: JSON.parse(localStorage.getItem("aura_dsa")) || [...dsaProblemsData],
    notes: JSON.parse(localStorage.getItem("aura_notes")) || [...initialNotes],
    activeTrack: "swe",
    activeView: "dashboard",
    theme: localStorage.getItem("aura_theme") || "dark"
  };

  function saveState() {
    localStorage.setItem("aura_profile", JSON.stringify(state.profile));
    localStorage.setItem("aura_tasks", JSON.stringify(state.tasks));
    localStorage.setItem("aura_dsa", JSON.stringify(state.dsaProblems));
    localStorage.setItem("aura_notes", JSON.stringify(state.notes));
    localStorage.setItem("aura_theme", state.theme);
  }

  // Set Theme
  document.documentElement.setAttribute("data-theme", state.theme);
  updateThemeIcon();

  // ------------------------------------------------------------------------
  // Navigation & View Switching
  // ------------------------------------------------------------------------
  const navBtns = document.querySelectorAll(".nav-btn");
  const viewPanels = document.querySelectorAll(".view-panel");
  const mobileToggle = document.getElementById("mobile-toggle");
  const sidebar = document.getElementById("sidebar");

  function switchView(tabId) {
    state.activeView = tabId;
    navBtns.forEach(btn => {
      if (btn.dataset.tab === tabId) btn.classList.add("active");
      else btn.classList.remove("active");
    });

    viewPanels.forEach(panel => {
      if (panel.id === `view-${tabId}`) panel.classList.add("active");
      else panel.classList.remove("active");
    });

    // Close mobile sidebar if open
    sidebar.classList.remove("open");

    // Specific View Initializations
    if (tabId === "skill-graph") renderSkillTree();
    if (tabId === "notes") renderNotes();
    if (tabId === "dsa-hub") renderDSAHub();
    if (tabId === "aiml-roadmap") renderAIMLRoadmap();
    if (tabId === "job-prep") renderJobPrep();
    if (tabId === "career-roadmaps") renderCareerRoadmaps();
    if (tabId === "knowledge-hub") renderKnowledgeHub();
    if (tabId === "gamification") renderGamification();
    if (tabId === "ai-mentor") renderAIMentor();
  }

  navBtns.forEach(btn => {
    btn.addEventListener("click", () => switchView(btn.dataset.tab));
  });

  // Triggers inside cards
  document.querySelectorAll(".nav-trigger").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      switchView(btn.dataset.tab);
    });
  });

  mobileToggle.addEventListener("click", () => sidebar.classList.toggle("open"));

  // Theme Toggle
  const themeBtn = document.getElementById("theme-toggle-btn");
  themeBtn.addEventListener("click", () => {
    state.theme = state.theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", state.theme);
    updateThemeIcon();
    saveState();
  });

  function updateThemeIcon() {
    const isDark = state.theme === "dark";
    themeBtn.querySelector(".theme-icon").textContent = isDark ? "🌙" : "☀️";
    const label = document.getElementById("theme-toggle-label");
    if (label) label.textContent = isDark ? "Dark Mode" : "Light Mode";
  }

  // Global Profile UI Update
  function updateProfileUI() {
    document.getElementById("sidebar-user-name").textContent = state.profile.name;
    document.getElementById("sidebar-target-role").textContent = state.profile.targetRole;
    document.getElementById("user-avatar").textContent = state.profile.avatar || "AD";
    document.getElementById("header-xp-val").textContent = `${state.profile.xp.toLocaleString()} XP`;
    document.getElementById("header-level-val").textContent = `Lvl ${state.profile.levelNum}`;
    document.getElementById("sidebar-streak").textContent = `${state.profile.streak} Days`;

    // Dashboard Banner
    document.getElementById("dash-greeting").textContent = `Ready to level up your engineering career today, ${state.profile.name.split(" ")[0]}?`;
    document.getElementById("dash-subtext").innerHTML = `Targeting <strong>${state.profile.targetRole}</strong> • ${state.profile.year} • ${state.profile.dailyHours} Hours/day goal`;

    // Metrics Bar
    document.getElementById("dash-metric-streak").textContent = `${state.profile.streak} Days`;
    document.getElementById("dash-metric-dsa").textContent = `${state.profile.dsaSolved} / ${state.profile.dsaTotal}`;
    document.getElementById("dash-metric-aiml").textContent = `Level 4`;
    document.getElementById("dash-metric-readiness").textContent = `${state.profile.jobReadiness}%`;

    renderTodayTasks();
    renderDeadlines();
  }

  // ------------------------------------------------------------------------
  // VIEW 1: DASHBOARD RENDERERS
  // ------------------------------------------------------------------------
  function renderTodayTasks() {
    const container = document.getElementById("today-tasks-container");
    container.innerHTML = "";

    state.tasks.forEach(task => {
      const div = document.createElement("div");
      div.className = "task-item";
      div.innerHTML = `
        <input type="checkbox" class="task-checkbox" ${task.completed ? "checked" : ""} data-id="${task.id}" />
        <div class="task-details">
          <div class="task-title ${task.completed ? "completed" : ""}">${task.title}</div>
          <div class="task-meta">⏱️ ${task.hours} • Recommended by AI</div>
        </div>
        <span class="task-tag ${task.category}">${task.tag}</span>
      `;
      container.appendChild(div);
    });

    // Add Checkbox Event Listeners
    container.querySelectorAll(".task-checkbox").forEach(chk => {
      chk.addEventListener("change", (e) => {
        const id = parseInt(e.target.dataset.id);
        const task = state.tasks.find(t => t.id === id);
        if (task) {
          task.completed = e.target.checked;
          if (task.completed) state.profile.xp += 100;
          saveState();
          updateProfileUI();
        }
      });
    });
  }

  function renderDeadlines() {
    const container = document.getElementById("dash-deadlines-container");
    container.innerHTML = "";
    upcomingDeadlines.forEach(item => {
      const div = document.createElement("div");
      div.className = "deadline-item";
      div.innerHTML = `
        <div>
          <div class="d-title">${item.title}</div>
          <span class="badge-tag" style="background: rgba(139,92,246,0.2); color: var(--accent-violet);">${item.type}</span>
        </div>
        <div class="d-date">${item.date}</div>
      `;
      container.appendChild(div);
    });
  }

  // Reschedule with AI Button
  document.getElementById("reschedule-tasks-btn").addEventListener("click", () => {
    state.tasks = AIEngine.rescheduleTasks(state.tasks, state.profile.dailyHours);
    saveState();
    renderTodayTasks();
    alert("🤖 AI has redistributed your uncompleted study tasks and optimized today's schedule!");
  });

  // Quick Action Buttons
  document.getElementById("dash-quick-planner-btn").addEventListener("click", () => switchView("study-planner"));
  document.getElementById("dash-ask-mentor-btn").addEventListener("click", () => switchView("ai-mentor"));

  // ------------------------------------------------------------------------
  // VIEW 2: VISUAL SKILL GRAPH / SKILL TREE RENDERER
  // ------------------------------------------------------------------------
  const svg = document.getElementById("skill-tree-svg");
  const trackBtnSwe = document.getElementById("skill-track-swe");
  const trackBtnAiml = document.getElementById("skill-track-aiml");

  trackBtnSwe.addEventListener("click", () => {
    state.activeTrack = "swe";
    trackBtnSwe.classList.add("active");
    trackBtnAiml.classList.remove("active");
    renderSkillTree();
  });

  trackBtnAiml.addEventListener("click", () => {
    state.activeTrack = "aiml";
    trackBtnAiml.classList.add("active");
    trackBtnSwe.classList.remove("active");
    renderSkillTree();
  });

  function renderSkillTree() {
    if (!svg) return;
    svg.innerHTML = "";

    const track = skillTreeData[state.activeTrack];
    if (!track) return;

    // Render Edges
    track.edges.forEach(edge => {
      const fromNode = track.nodes.find(n => n.id === edge.from);
      const toNode = track.nodes.find(n => n.id === edge.to);
      if (fromNode && toNode) {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", fromNode.x);
        line.setAttribute("y1", fromNode.y);
        line.setAttribute("x2", toNode.x);
        line.setAttribute("y2", toNode.y);
        line.setAttribute("class", `tree-edge ${edge.active ? "active" : ""}`);
        svg.appendChild(line);
      }
    });

    // Render Nodes
    track.nodes.forEach(node => {
      const g = document.createElementNS("http://www.w3.org/2000/svg", "g");

      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("cx", node.x);
      circle.setAttribute("cy", node.y);
      circle.setAttribute("r", 28);
      circle.setAttribute("class", `node-circle ${node.status}`);
      circle.addEventListener("click", () => showSkillDetail(node));

      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", node.x);
      text.setAttribute("y", node.y + 44);
      text.setAttribute("class", "node-label");
      text.textContent = `${node.icon} ${node.label}`;

      g.appendChild(circle);
      g.appendChild(text);
      svg.appendChild(g);
    });

    // Show initial detail for node 1
    showSkillDetail(track.nodes[0]);
  }

  function showSkillDetail(node) {
    document.getElementById("sd-icon").textContent = node.icon;
    document.getElementById("sd-title").textContent = node.label;
    const statusBadge = document.getElementById("sd-status");
    statusBadge.textContent = node.status;
    statusBadge.className = `status-badge ${node.status}`;
    document.getElementById("sd-prereqs").textContent = node.prereqs || "None";
    document.getElementById("sd-unlocks").textContent = node.unlocks || "Advanced Tracks";

    const topicsUl = document.getElementById("sd-topics");
    topicsUl.innerHTML = "";
    (node.topics || []).forEach(tp => {
      const li = document.createElement("li");
      li.textContent = tp;
      topicsUl.appendChild(li);
    });
  }

  document.getElementById("sd-practice-btn").addEventListener("click", () => switchView("dsa-hub"));

  // ------------------------------------------------------------------------
  // SMART NOTES WORKSPACE RENDERER & LOGIC
  // ------------------------------------------------------------------------
  let activeNoteId = null;

  function renderNotes() {
    const container = document.getElementById("notes-list-container");
    if (!container) return;
    container.innerHTML = "";

    if (state.notes.length === 0) {
      container.innerHTML = `<div style="font-size:0.8rem; color:var(--text-muted); text-align:center; padding:20px;">No notes yet. Click "+ Create New Note"</div>`;
      return;
    }

    if (!activeNoteId) activeNoteId = state.notes[0].id;

    state.notes.forEach(n => {
      const btn = document.createElement("button");
      btn.className = `note-item-btn ${n.id === activeNoteId ? "active" : ""}`;
      btn.innerHTML = `
        <div class="ni-title">${n.title}</div>
        <div class="ni-meta">
          <span>${n.subject}</span>
          <span>${n.updated}</span>
        </div>
      `;
      btn.addEventListener("click", () => loadNoteInEditor(n.id));
      container.appendChild(btn);
    });

    const activeNote = state.notes.find(n => n.id === activeNoteId);
    if (activeNote) populateEditor(activeNote);
  }

  function loadNoteInEditor(id) {
    activeNoteId = id;
    renderNotes();
  }

  function populateEditor(note) {
    document.getElementById("note-title-input").value = note.title;
    document.getElementById("note-subject-tag").textContent = note.subject;
    document.getElementById("note-content-area").value = note.content;
    document.getElementById("ai-note-summary-box").classList.add("hidden");
  }

  document.getElementById("create-note-btn")?.addEventListener("click", () => {
    const newId = `n-${Date.now()}`;
    const newNote = {
      id: newId,
      title: "Untitled Lecture Note",
      subject: "Computer Science",
      updated: "Just now",
      content: "Type your lecture notes, concepts, or formulas here..."
    };
    state.notes.unshift(newNote);
    activeNoteId = newId;
    saveState();
    renderNotes();
  });

  document.getElementById("note-save-btn")?.addEventListener("click", () => {
    const activeNote = state.notes.find(n => n.id === activeNoteId);
    if (activeNote) {
      activeNote.title = document.getElementById("note-title-input").value || "Untitled Note";
      activeNote.content = document.getElementById("note-content-area").value;
      activeNote.updated = "Just now";
      saveState();
      renderNotes();
      alert("💾 Note saved successfully!");
    }
  });

  document.getElementById("note-ai-summarize-btn")?.addEventListener("click", () => {
    const content = document.getElementById("note-content-area").value;
    const summaryBox = document.getElementById("ai-note-summary-box");
    const summaryContent = document.getElementById("ai-note-summary-content");
    summaryContent.innerHTML = AIEngine.summarizeNotes(content);
    summaryBox.classList.remove("hidden");
  });

  // ------------------------------------------------------------------------
  // VIEW 3: AI STUDY PLANNER RENDERER
  // ------------------------------------------------------------------------
  function renderStudyPlanner() {
    const timeline = document.getElementById("schedule-timeline-container");
    if (!timeline) return;

    const sampleSchedule = [
      { time: "08:00 - 09:30 AM", title: "DSA Topic: Binary Trees & Traversal Algorithms", sub: "Practice 2 Problems on LeetCode", status: "done" },
      { time: "10:30 - 12:00 PM", title: "College Course: Computer Networks & TCP/IP", sub: "Read Chapter 4 & Unit Notes", status: "done" },
      { time: "04:00 - 05:30 PM", title: "AI/ML Track: PyTorch Neural Network Autograd", sub: "Code mini perceptron model", status: "pending" },
      { time: "07:30 - 08:30 PM", title: "Project Development: AI Code Reviewer", sub: "Implement AST Parser module", status: "pending" }
    ];

    timeline.innerHTML = "";
    sampleSchedule.forEach(slot => {
      const div = document.createElement("div");
      div.className = "time-block";
      div.innerHTML = `
        <div class="tb-time">${slot.time}</div>
        <div class="tb-content">
          <div class="tb-title">${slot.title}</div>
          <div class="tb-sub">${slot.sub}</div>
        </div>
        <span class="tb-status ${slot.status}">${slot.status === "done" ? "Completed ✅" : "Scheduled ⏳"}</span>
      `;
      timeline.appendChild(div);
    });

    // Render Subject Tags
    const tagBox = document.getElementById("planner-subject-tags");
    tagBox.innerHTML = `
      <span class="sub-tag strong">Python (Strong)</span>
      <span class="sub-tag strong">Data Structures (Strong)</span>
      <span class="sub-tag weak">Dynamic Programming (Weak)</span>
      <span class="sub-tag weak">Computer Networks (Needs Exam Prep)</span>
    `;

    // Render Exam Countdown
    const examList = document.getElementById("planner-exam-list");
    examList.innerHTML = upcomingDeadlines.map(d => `
      <div class="deadline-item">
        <div class="d-title">${d.title}</div>
        <div class="d-date">${d.date}</div>
      </div>
    `).join("");
  }

  document.getElementById("planner-day-tabs")?.querySelectorAll(".day-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".day-tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      renderStudyPlanner();
    });
  });

  document.getElementById("trigger-auto-reschedule")?.addEventListener("click", () => {
    alert("🤖 AI Planner re-balanced your timetable to account for upcoming Operating Systems exam!");
    renderStudyPlanner();
  });

  // ------------------------------------------------------------------------
  // VIEW 4: DSA PREPARATION HUB RENDERER
  // ------------------------------------------------------------------------
  function renderDSAHub() {
    const topicsBar = document.getElementById("dsa-topics-bar");
    if (!topicsBar) return;
    topicsBar.innerHTML = "";

    dsaTopicsData.forEach(t => {
      const div = document.createElement("div");
      div.className = "dsa-topic-card";
      div.innerHTML = `
        <span class="dt-icon">${t.icon}</span>
        <div class="dt-title">${t.name}</div>
        <div class="dt-count">${t.solved} / ${t.total} Solved</div>
      `;
      topicsBar.appendChild(div);
    });

    const tbody = document.getElementById("dsa-problems-body");
    tbody.innerHTML = "";

    state.dsaProblems.forEach(p => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${p.status === "Solved" ? "✅" : "⭕"}</td>
        <td><strong>${p.title}</strong></td>
        <td>${p.topic}</td>
        <td><span class="diff-badge ${p.difficulty}">${p.difficulty}</span></td>
        <td><code>${p.timeComplexity}</code></td>
        <td>
          <button class="btn btn-sm btn-primary launch-code-btn" data-id="${p.id}">Solve 🚀</button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    tbody.querySelectorAll(".launch-code-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const pId = btn.dataset.id;
        const prob = state.dsaProblems.find(p => p.id === pId);
        if (prob) {
          switchView("coding-practice");
          loadProblemInSandbox(prob);
        }
      });
    });
  }

  // ------------------------------------------------------------------------
  // VIEW 5: AI/ML ROADMAP RENDERER
  // ------------------------------------------------------------------------
  function renderAIMLRoadmap() {
    const grid = document.getElementById("aiml-roadmap-grid");
    if (!grid) return;
    grid.innerHTML = "";

    aimlRoadmapData.forEach(step => {
      const div = document.createElement("div");
      div.className = `aiml-step-card ${step.status === "Recommended Next" ? "active-step" : ""}`;
      div.innerHTML = `
        <div class="step-num">Step 0${step.step} • ${step.status}</div>
        <div class="step-title">${step.title}</div>
        <div class="step-topics">Key Concepts: ${step.topics.join(", ")}</div>
        <button class="btn btn-sm ${step.status === "Completed" ? "btn-secondary" : "btn-primary"}">
          ${step.status === "Completed" ? "Review Topic" : "Start Learning"}
        </button>
      `;
      grid.appendChild(div);
    });
  }

  // ------------------------------------------------------------------------
  // VIEW 6: IN-BROWSER CODE PRACTICE & SANDBOX
  // ------------------------------------------------------------------------
  let currentSandboxProblem = dsaProblemsData[0];

  function loadProblemInSandbox(prob) {
    currentSandboxProblem = prob;
    document.getElementById("sandbox-prob-title").textContent = prob.title;
    document.getElementById("sandbox-prob-diff").textContent = prob.difficulty;
    document.getElementById("sandbox-prob-diff").className = `prob-tag diff-badge ${prob.difficulty}`;
    document.getElementById("sandbox-prob-desc").innerHTML = `<p>${prob.desc}</p>`;
    document.getElementById("code-complexity-tag").textContent = `Time: ${prob.timeComplexity} | Space: ${prob.spaceComplexity}`;

    const lang = document.getElementById("code-lang-select").value;
    document.getElementById("code-editor-input").value = prob.starterCode[lang] || prob.starterCode.python || "# Write code here...";

    document.getElementById("sandbox-ai-hint-box").classList.add("hidden");
    document.getElementById("term-output-text").textContent = 'Press "Run Code" to execute test cases...';
  }

  // Initial Sandbox Setup
  loadProblemInSandbox(dsaProblemsData[0]);

  document.getElementById("code-lang-select").addEventListener("change", (e) => {
    const lang = e.target.value;
    if (currentSandboxProblem && currentSandboxProblem.starterCode[lang]) {
      document.getElementById("code-editor-input").value = currentSandboxProblem.starterCode[lang];
    }
  });

  document.getElementById("code-ai-hint-btn").addEventListener("click", () => {
    const hintBox = document.getElementById("sandbox-ai-hint-box");
    const hints = currentSandboxProblem.hints || ["Try breaking the problem into sub-cases!"];
    document.getElementById("sandbox-hint-text").innerHTML = hints.join("<br><br>");
    hintBox.classList.remove("hidden");
  });

  document.getElementById("code-run-btn").addEventListener("click", () => {
    const code = document.getElementById("code-editor-input").value;
    const lang = document.getElementById("code-lang-select").value;
    const term = document.getElementById("term-output-text");

    term.textContent = "⏳ Running tests in virtual sandbox environment...\n";

    setTimeout(() => {
      const result = AIEngine.analyzeCode(code, lang);
      term.textContent = `=== TEST RUN RESULTS ===\n${result.status}\n\n${result.feedback}`;

      // Update XP
      state.profile.xp += 50;
      saveState();
      updateProfileUI();
    }, 800);
  });

  document.getElementById("clear-term-btn").addEventListener("click", () => {
    document.getElementById("term-output-text").textContent = "Terminal cleared.";
  });

  // ------------------------------------------------------------------------
  // VIEW 7: AI STUDY TUTOR CHAT
  // ------------------------------------------------------------------------
  const tutorMsgContainer = document.getElementById("tutor-messages-container");
  const tutorInput = document.getElementById("tutor-input-text");
  const tutorSendBtn = document.getElementById("tutor-send-btn");

  function sendTutorMessage(text) {
    if (!text.trim()) return;

    // User Message
    const uMsg = document.createElement("div");
    uMsg.className = "chat-msg user";
    uMsg.innerHTML = `
      <div class="msg-avatar">${state.profile.avatar}</div>
      <div class="msg-content"><p>${text}</p></div>
    `;
    tutorMsgContainer.appendChild(uMsg);
    tutorInput.value = "";
    tutorMsgContainer.scrollTop = tutorMsgContainer.scrollHeight;

    // AI Response Simulation
    setTimeout(() => {
      const reply = AIEngine.generateTutorResponse(text);
      const bMsg = document.createElement("div");
      bMsg.className = "chat-msg bot";
      bMsg.innerHTML = `
        <div class="msg-avatar">💡</div>
        <div class="msg-content">${reply}</div>
      `;
      tutorMsgContainer.appendChild(bMsg);
      tutorMsgContainer.scrollTop = tutorMsgContainer.scrollHeight;
    }, 600);
  }

  tutorSendBtn.addEventListener("click", () => sendTutorMessage(tutorInput.value));
  tutorInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendTutorMessage(tutorInput.value);
    }
  });

  document.querySelectorAll(".qp-btn").forEach(btn => {
    btn.addEventListener("click", () => sendTutorMessage(btn.dataset.prompt));
  });

  // ------------------------------------------------------------------------
  // VIEW 8: JOB & INTERNSHIP PREP RENDERER
  // ------------------------------------------------------------------------
  function renderJobPrep() {
    document.getElementById("sg-role-title").textContent = state.profile.targetRole;
    const masteredList = document.getElementById("sg-mastered-list");
    const gapList = document.getElementById("sg-gap-list");

    masteredList.innerHTML = `
      <li>✅ Python Programming (Advanced)</li>
      <li>✅ Data Manipulation (NumPy, Pandas)</li>
      <li>✅ Machine Learning Algorithms (Scikit-Learn)</li>
      <li>✅ Arrays, Strings & Linked Lists DSA</li>
    `;

    gapList.innerHTML = `
      <li>⚠️ Dynamic Programming & Graph Algorithms</li>
      <li>⚠️ PyTorch Neural Network Architectures</li>
      <li>⚠️ Vector Databases & RAG Frameworks</li>
      <li>⚠️ System Design & Model API Deployment</li>
    `;

    // ATS Checklist
    const atsContainer = document.getElementById("ats-checklist-container");
    atsContainer.innerHTML = `
      <div class="task-item">
        <input type="checkbox" checked />
        <div class="task-details">
          <div class="task-title">Single-Page Clean Formatting & PDF Export</div>
          <div class="task-meta">ATS Parsability Rating: 95%</div>
        </div>
      </div>
      <div class="task-item">
        <input type="checkbox" checked />
        <div class="task-details">
          <div class="task-title">GitHub Profile README & Live Demo Links</div>
          <div class="task-meta">Evaluates Portfolio Quality</div>
        </div>
      </div>
      <div class="task-item">
        <input type="checkbox" />
        <div class="task-details">
          <div class="task-title">Add End-to-End LLM / RAG Capstone Project</div>
          <div class="task-meta">Recommended for AI/ML Engineer Roles</div>
        </div>
      </div>
    `;

    // Mock Interview Simulator
    const interviewBox = document.getElementById("interview-simulator-box");
    interviewBox.innerHTML = `
      <div class="question-card" style="background: var(--bg-input); padding: 16px; border-radius: 12px; margin-bottom: 12px;">
        <h4>Technical Q1: How do you prevent overfitting in deep learning models?</h4>
        <p style="font-size: 0.82rem; color: var(--text-muted); margin-top: 6px;">Ideal Answer Points: Dropout regularization, Early stopping, Data augmentation, L1/L2 Weight Decay.</p>
      </div>
      <button class="btn btn-primary btn-sm">🎙️ Start Practice Simulation</button>
    `;
  }

  document.querySelectorAll(".jtab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".jtab-btn").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".jtab-content").forEach(c => c.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById(`jtab-${btn.dataset.jtab}`).classList.add("active");
    });
  });

  // ------------------------------------------------------------------------
  // VIEW 9: CAREER ROADMAPS RENDERER
  // ------------------------------------------------------------------------
  function renderCareerRoadmaps() {
    const bar = document.getElementById("role-selector-bar");
    if (!bar) return;

    bar.innerHTML = careerRoadmapsData.map((r, i) => `
      <button class="role-btn ${i === 0 ? "active" : ""}" data-index="${i}">${r.role}</button>
    `).join("");

    renderRoadmapDetail(careerRoadmapsData[0]);

    bar.querySelectorAll(".role-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        bar.querySelectorAll(".role-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        renderRoadmapDetail(careerRoadmapsData[btn.dataset.index]);
      });
    });
  }

  function renderRoadmapDetail(roadmap) {
    const detail = document.getElementById("career-roadmap-detail");
    detail.innerHTML = `
      <div style="margin-bottom: 20px;">
        <h3>${roadmap.role} Pathway</h3>
        <p style="color: var(--text-muted); font-size: 0.9rem;">${roadmap.description}</p>
      </div>
      ${roadmap.phases.map(p => `
        <div class="roadmap-phase-card">
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <h4>${p.phase}</h4>
            <span class="badge-tag" style="background: rgba(139,92,246,0.2); color: var(--accent-violet);">${p.duration}</span>
          </div>
          <ul style="padding-left: 18px; font-size: 0.85rem; color: var(--text-muted);">
            ${p.items.map(it => `<li>${it}</li>`).join("")}
          </ul>
        </div>
      `).join("")}
    `;
  }

  // ------------------------------------------------------------------------
  // VIEW 10: AI PROJECT GENERATOR
  // ------------------------------------------------------------------------
  document.getElementById("generate-proj-btn")?.addEventListener("click", () => {
    const domain = document.getElementById("proj-domain-select").value;
    const level = document.getElementById("proj-level-select").value;
    const card = document.getElementById("generated-project-card");

    const proj = sampleProjects.find(p => p.domain === domain) || sampleProjects[0];

    card.innerHTML = `
      <div class="pcard-header">
        <div>
          <span class="badge-tag" style="background: var(--accent-violet); color: #fff; font-size: 0.7rem;">${proj.level} Level Blueprint</span>
          <h3 class="pcard-title" style="margin-top: 6px;">${proj.title}</h3>
        </div>
        <div style="text-align: right;">
          <span style="font-weight: 800; font-size: 1.1rem; color: var(--accent-emerald);">${proj.portfolioValue}</span>
          <div style="font-size: 0.65rem; color: var(--text-muted);">Portfolio Value Score</div>
        </div>
      </div>

      <div style="margin-bottom: 16px; font-size: 0.88rem; color: var(--text-muted);">
        <strong style="color: var(--text-main);">Problem Statement:</strong> ${proj.problem}<br><br>
        <strong style="color: var(--text-main);">Why Useful:</strong> ${proj.utility}
      </div>

      <div style="margin-bottom: 16px;">
        <strong style="font-size: 0.85rem;">Tech Stack Required:</strong><br>
        ${proj.stack.map(s => `<span class="tech-pill">${s}</span>`).join("")}
      </div>

      <div>
        <strong style="font-size: 0.85rem;">Step-by-Step Execution Plan (${proj.time}):</strong>
        <ol style="padding-left: 20px; font-size: 0.85rem; color: var(--text-muted); margin-top: 8px;">
          ${proj.steps.map(s => `<li style="margin-bottom: 6px;">${s}</li>`).join("")}
        </ol>
      </div>
    `;
  });

  // Trigger initial project rendering
  document.getElementById("generate-proj-btn")?.click();

  // ------------------------------------------------------------------------
  // VIEW 11: KNOWLEDGE HUB RENDERER
  // ------------------------------------------------------------------------
  function renderKnowledgeHub() {
    const grid = document.getElementById("khub-articles-grid");
    if (!grid) return;
    grid.innerHTML = "";

    knowledgeHubData.forEach(item => {
      const div = document.createElement("div");
      div.className = "khub-card";
      div.innerHTML = `
        <span class="badge-tag" style="background: rgba(6,182,212,0.2); color: var(--accent-cyan); font-size: 0.68rem;">${item.category.toUpperCase()}</span>
        <h4 style="margin: 8px 0;">${item.title}</h4>
        <p style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 12px;">${item.summary}</p>
        <pre style="background: var(--bg-input); padding: 10px; border-radius: 6px; font-family: var(--font-code); font-size: 0.75rem; color: #7EE787;">${item.code}</pre>
      `;
      grid.appendChild(div);
    });
  }

  // ------------------------------------------------------------------------
  // VIEW 12: GAMIFICATION RENDERER
  // ------------------------------------------------------------------------
  function renderGamification() {
    const container = document.getElementById("badges-container");
    if (!container) return;
    container.innerHTML = "";

    badgesData.forEach(b => {
      const div = document.createElement("div");
      div.className = "badge-card";
      div.innerHTML = `
        <span class="badge-icon">${b.icon}</span>
        <div class="badge-title">${b.title}</div>
        <div class="badge-sub">${b.sub}</div>
      `;
      container.appendChild(div);
    });
  }

  // ------------------------------------------------------------------------
  // VIEW 13: AI MENTOR RENDERER
  // ------------------------------------------------------------------------
  function renderAIMentor() {
    const display = document.getElementById("mentor-audit-display");
    if (!display) return;
    display.innerHTML = AIEngine.generateCareerAudit(state.profile);
  }

  document.getElementById("run-ai-audit-btn")?.addEventListener("click", () => {
    renderAIMentor();
    alert("⚡ Generated fresh AI Career Audit based on your latest study activities!");
  });

  // ------------------------------------------------------------------------
  // PROFILE MODAL HANDLER
  // ------------------------------------------------------------------------
  const profileModal = document.getElementById("profile-modal");
  const editProfileBtn = document.getElementById("edit-profile-btn");
  const closeProfileBtn = document.getElementById("close-profile-modal");
  const profileForm = document.getElementById("profile-config-form");

  editProfileBtn.addEventListener("click", () => {
    document.getElementById("cfg-name").value = state.profile.name;
    document.getElementById("cfg-course").value = state.profile.course;
    document.getElementById("cfg-year").value = state.profile.year;
    document.getElementById("cfg-role").value = state.profile.targetRole;
    document.getElementById("cfg-hours").value = state.profile.dailyHours;
    document.getElementById("cfg-level").value = state.profile.level;
    profileModal.classList.remove("hidden");
  });

  closeProfileBtn.addEventListener("click", () => profileModal.classList.add("hidden"));

  profileForm.addEventListener("submit", (e) => {
    e.preventDefault();
    state.profile.name = document.getElementById("cfg-name").value;
    state.profile.course = document.getElementById("cfg-course").value;
    state.profile.year = document.getElementById("cfg-year").value;
    state.profile.targetRole = document.getElementById("cfg-role").value;
    state.profile.dailyHours = parseInt(document.getElementById("cfg-hours").value);
    state.profile.level = document.getElementById("cfg-level").value;
    state.profile.avatar = state.profile.name.split(" ").map(n => n[0]).join("").toUpperCase();

    saveState();
    updateProfileUI();
    profileModal.classList.add("hidden");
    alert("✅ Profile updated successfully! Your AI career roadmap has been re-calibrated.");
  });

  // Initial Launch Setup
  updateProfileUI();
  renderStudyPlanner();
});
