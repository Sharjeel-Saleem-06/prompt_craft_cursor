# PromptCraft — THE DEFINITIVE GUIDE
## Complete AI Prompting Mastery for Cursor & AI-Powered Development
### Every Feature · Every Technique · Every Workflow · 2025/2026 Edition
#### iOS Native · Android Native · React Native · Web (React/Next.js)

---

> **This is the only reference you need.**
> Covers every Cursor feature from Tab autocomplete to Cloud Agents to Automations.
> Covers every prompting technique from Zero-Shot to ReAct to Self-Consistency.
> Nothing basic. Everything production-grade. Built for developers who ship.

---

## MASTER TABLE OF CONTENTS

### FOUNDATION
- **PART 1** — The Mental Model: Context Engineering, Not Prompt Engineering
- **PART 2** — Cursor's Architecture: What Actually Happens Under the Hood
- **PART 3** — Every Cursor Feature Explained (Complete Map)

### PROMPTING SCIENCE
- **PART 4** — Prompt Anatomy: The PCTF+ Framework
- **PART 5** — The Complete Prompting Technique Encyclopedia
- **PART 6** — Context Engineering: Master Level

### CURSOR MODES & WORKFLOWS
- **PART 7** — The Six Modes: Decision Map + Deep Dives
- **PART 8** — Background Agents & Cloud Agents (The Third Era)
- **PART 9** — Automations: Always-On Agents
- **PART 10** — YOLO Mode, Checkpoints & the Autonomous Loop

### RULES, SKILLS & COMMANDS
- **PART 11** — The Four Rules Layers: Project · User · Team · AGENTS.md
- **PART 12** — Memories: Persistent Project Intelligence
- **PART 13** — Skills: Dynamic Domain Knowledge
- **PART 14** — Custom Commands: Reusable Workflows

### MCP ECOSYSTEM
- **PART 15** — MCP Architecture & Complete Setup
- **PART 16** — MCP Apps: Interactive UIs in Agent Chats
- **PART 17** — The Production MCP Stack

### AGENT INTELLIGENCE
- **PART 18** — Parallel Agents & Git Worktrees
- **PART 19** — BugBot, Autofix & Automated Review
- **PART 20** — Hooks: Runtime Agent Scripting
- **PART 21** — Debug Mode: Execution-Backed Debugging

### PLATFORM PROMPTS
- **PART 22** — Screen Creation (Figma · Screenshots · Cloning)
- **PART 23** — Error Fixing & Debugging Templates
- **PART 24** — Features, Refactoring & API Integration
- **PART 25** — iOS/Swift · Android/Kotlin · React Native · Next.js Templates

### ADVANCED OPERATIONS
- **PART 26** — The @-System: Every Symbol Mastered
- **PART 27** — Model Strategy: When to Use What
- **PART 28** — Token Budget & Cost Engineering
- **PART 29** — Security, Privacy Mode & Enterprise Controls
- **PART 30** — Production Workflows & Team Patterns

### CONFIGURATION LIBRARY
- **PART 31** — `.cursorrules` / `.mdc` Complete Templates
- **PART 32** — `.cursorignore` & Project Configuration
- **PART 33** — YOLO Mode Allowlist Templates
- **PART 34** — Prompt Templates Library (Copy-Paste)
- **PART 35** — Anti-Patterns & Failure Modes
- **PART 36** — Master Checklists

---
---

# PART 1 — THE MENTAL MODEL: CONTEXT ENGINEERING

---

## 1.1 — The Third Era of AI Coding

Understanding which era you are operating in changes how you work completely.

```
ERA 1: TAB AUTOCOMPLETE (2021–2023)
────────────────────────────────────
Copilot era. AI predicts the next line.
Developer writes code; AI completes sentences.
Interaction: keystrokes.
Mental model: smart autocomplete.

ERA 2: SYNCHRONOUS AGENTS (2023–2025)
────────────────────────────────────────
Chat-based agents. Prompt → response loop.
Developer directs agent through conversation.
Interaction: prompts.
Mental model: AI pair programmer.

ERA 3: CLOUD AGENTS (2025–now)
────────────────────────────────────────
Agents work independently over hours/days.
Developer manages a "factory" of agents.
Interaction: tasks, goals, constraints.
Mental model: engineering manager.
```

In March 2025, Cursor had 2.5× as many Tab users as agent users. By late 2025, that flipped: they now have 2× as many agent users as Tab users. The shift is complete. The era of prompt-and-wait is giving way to the era of dispatch-and-review.

**Your new job:** Define the goal clearly. Set the constraints. Review the output. Merge what's correct.

---

## 1.2 — Context Engineering: The Real Skill

In 2025, the frontier is not "write better prompts." It is **context engineering** — the art of filling the context window with exactly the right information before the model starts generating.

Andrej Karpathy defined context engineering as:
> *"The delicate art and science of filling the context window with just the right information for the next step."*

```
CONTEXT ENGINEERING vs PROMPT ENGINEERING
──────────────────────────────────────────────────────────────────────
Prompt Engineering          Context Engineering
────────────────────        ────────────────────────────────
"How do I phrase this?"     "What does the AI need to KNOW before asking?"
One clever message          Persistent rules + targeted mentions + skills
Works on simple tasks       Works on entire features and products
Focused on the message      Focused on the entire context window
Manual each time            Automated via .mdc rules and MCP
```

**In Cursor:** Your `.mdc` rules file IS context engineering. Your `@mentions` are context engineering. Your Skills files are context engineering. The prompt you type in chat is the last 5% of the work.

---

## 1.3 — The Senior Developer Onboarding Analogy

Treat every Cursor session like your first day with a world-class senior developer who just joined the team. They are technically extraordinary — but they walked in the door five minutes ago. They know nothing about:

- Your folder structure
- Your naming conventions
- Your design system
- Your API patterns
- What you built last sprint
- Why you made the architecture decisions you made

Your `.mdc` rules file is their onboarding document. Your `@mentions` are the specific files you hand them. Your prompt is the task you assign.

**The Context Triangle** — every prompt must answer all three:

```
                    ┌───────────────────────┐
                    │     WHAT YOU WANT     │
                    │   (the specific task) │
                    └──────────┬────────────┘
                               │
              ┌────────────────┴─────────────────┐
              │                                   │
   ┌──────────▼──────────┐           ┌────────────▼────────────┐
   │   WHERE IT GOES     │           │    HOW IT SHOULD WORK   │
   │  file · screen ·    │           │  stack · patterns ·     │
   │  function · module  │           │  constraints · rules    │
   └─────────────────────┘           └─────────────────────────┘
```

Cannot clearly answer all three? Do not type the prompt. Think first.

---

## 1.4 — The Information Density Principle

Every token in your context window should carry maximum signal. Low-density tokens dilute the high-density ones — the model's attention distributes across everything it sees.

**Low density (wasteful):**
```
"Hi! I was hoping you could help me with something I've been working on.
 I'm building an iOS app and there's a feature I need to add.
 I think there might be something wrong with how the data loads."
```

**High density (effective):**
```
"@FeedViewModel.swift > loadFeed(): posts[] returns empty on second call.
 API returns data (confirmed in Charles). First call works. Race condition?"
```

Rule: If you can remove a word without losing meaning, remove it.

---
---

# PART 2 — CURSOR'S ARCHITECTURE

---

## 2.1 — The Five-Layer Stack

```
╔═══════════════════════════════════════════════════════════════════╗
║  LAYER 5 — MODEL LAYER                                           ║
║  Composer · Claude Opus/Sonnet 4.5 · GPT-5 · Gemini 3 Pro       ║
║  Grok Code · BYO model (via API key)                             ║
║  Swappable per task. Cursor routes or you choose.                ║
╠═══════════════════════════════════════════════════════════════════╣
║  LAYER 4 — AGENT HARNESS                                         ║
║  Plan → Execute → Verify loop                                    ║
║  Tool calling · Subagent spawning · Hooks                        ║
║  Background Agents (cloud) · Automations                         ║
╠═══════════════════════════════════════════════════════════════════╣
║  LAYER 3 — CONTEXT ASSEMBLY                                      ║
║  .mdc rules · AGENTS.md · Memories · Skills                      ║
║  MCP tool definitions · @mentions · RAG chunks                   ║
║  Conversation history · Notepad                                  ║
╠═══════════════════════════════════════════════════════════════════╣
║  LAYER 2 — CODEBASE INDEX                                        ║
║  Custom embedding model (code-tuned)                             ║
║  Semantic chunking at function/class boundaries                  ║
║  Hash-tracked incremental updates                                ║
║  .cursorignore controls what gets indexed                        ║
╠═══════════════════════════════════════════════════════════════════╣
║  LAYER 1 — IDE SUBSTRATE                                         ║
║  VS Code fork · LSP · Git · Terminal · Browser                   ║
║  JetBrains ACP · Slack bot · Web app · Mobile PWA                ║
╚═══════════════════════════════════════════════════════════════════╝
```

Your leverage point is **Layer 3 (Context Assembly)**. Rules, Skills, Memories, and @mentions are the levers you control. Everything above that flows from what you put here.

---

## 2.2 — The RAG Retrieval Pipeline

When you submit a prompt, Cursor doesn't read every file. It runs semantic search:

```
Your prompt
    │
    ▼  embed → vector
    │
    ├── similarity search against codebase index
    │
    ├── top-K chunks returned (typically 3–8)
    │
    ├── + explicit @mentions (always included, full content)
    │
    ├── + .mdc rules (always-apply or glob-matched)
    │
    ├── + Memories relevant to session
    │
    └── = assembled context window sent to model
```

**Practical implications:**
1. **Vague prompts → wrong chunks retrieved.** Name specific functions, files, and concepts.
2. **Large files are chunked at semantic boundaries** — if you need the whole file, `@mention` it explicitly.
3. **`.cursorignore`** — exclude `node_modules`, `dist`, generated files, large binaries. They add noise and waste index space.
4. **Monorepos** — use `@folder/src/feature/` to narrow retrieval scope.

---

## 2.3 — The Context Window Budget

```
CONTEXT WINDOW ALLOCATION (typical session)
┌──────────────────────────────────────────────────────┐
│ .mdc alwaysApply rules              4 – 12%          │
│ Glob-matched rules (current file)   2 – 6%           │
│ Memories (relevant ones loaded)     2 – 5%           │
│ MCP tool definitions                5 – 15%          │
│ @mentioned files (explicit)         10 – 35%         │
│ RAG-retrieved chunks (auto)         8 – 20%          │
│ Conversation history                10 – 30%         │
│ Your prompt (message)               3 – 8%           │
│ Output / response                   10 – 20%         │
└──────────────────────────────────────────────────────┘
```

**Warning signs of context saturation:**
- Cursor ignores constraints you set earlier in the chat
- It references wrong files or outdated patterns
- Responses get shorter and vaguer
- It "forgets" the architecture in your `.mdc` rules

**Fix:** Start a fresh Agent chat. Reference the minimal set of files needed. Let the rules file carry the persistent context.

---
---

# PART 3 — EVERY CURSOR FEATURE: THE COMPLETE MAP

---

## 3.1 — Feature Classification

```
CURSOR FEATURE TREE (2025/2026)
│
├── EDITING MODES
│   ├── Tab Autocomplete (custom Tab model)
│   ├── Inline Edit / Cmd+K
│   ├── Chat (Cmd+L) — Ask mode
│   └── Agent / Composer (Cmd+I)
│       ├── Plan Mode (Shift+Tab)
│       ├── YOLO Mode (auto-approve)
│       └── Debug Mode
│
├── AGENT TYPES
│   ├── Synchronous Agent (local, in-session)
│   ├── Background Agent (local, Cmd+E)
│   └── Cloud Agent (remote VM, full autonomy)
│
├── CONTEXT SYSTEMS
│   ├── Codebase Index (semantic RAG)
│   ├── Rules (.cursor/rules/*.mdc)
│   │   ├── Project Rules
│   │   ├── User Rules (global)
│   │   ├── Team Rules (dashboard)
│   │   └── AGENTS.md (repo root)
│   ├── Memories (auto-extracted, per-project)
│   ├── Skills (.cursor/skills/*.md)
│   ├── Commands (.cursor/commands/*.md)
│   └── Notepad
│
├── @-MENTION SYSTEM
│   ├── @file · @folder · @codebase
│   ├── @web · @docs · @git · @terminal
│   ├── @notepad · @linter-errors
│   └── @https://url
│
├── MCP ECOSYSTEM
│   ├── MCP Servers (tool providers)
│   ├── MCP Apps (interactive UIs in chat)
│   ├── One-click install / OAuth
│   └── Team Marketplace (private plugins)
│
├── AUTOMATION LAYER
│   ├── Automations (always-on, trigger-based)
│   │   ├── Schedule triggers
│   │   ├── Slack triggers
│   │   ├── Linear triggers
│   │   ├── GitHub triggers
│   │   ├── PagerDuty triggers
│   │   └── Webhook triggers
│   └── BugBot
│       ├── PR review (automatic)
│       ├── Autofix (cloud agent proposes fix)
│       └── Custom team rules
│
├── HOOKS
│   ├── pre-prompt
│   ├── post-edit
│   ├── pre-command
│   └── post-command
│
├── PARALLEL WORK
│   ├── Multi-agent (up to 8 simultaneous)
│   ├── Git worktree isolation
│   └── Remote machine isolation
│
├── INTEGRATIONS
│   ├── GitHub (native PR integration)
│   ├── Slack bot (@Cursor)
│   ├── Linear (direct agent launch from issues)
│   ├── JetBrains ACP (IDEA, PyCharm, WebStorm)
│   └── Web app / Mobile PWA
│
├── SECURITY & PRIVACY
│   ├── Privacy Mode (zero-retention)
│   ├── SOC 2 Type II
│   ├── .cursorignore
│   └── Enterprise: SSO, audit logs, access controls
│
└── INTELLIGENCE FEATURES
    ├── Debug Mode
    ├── Browser / DOM control
    ├── Visual Editor
    ├── Jupyter Notebook support
    └── Max Mode (uncapped context/tokens)
```

---

## 3.2 — Tab Autocomplete: The Custom Tab Model

Cursor's Tab model is a **separate, proprietary model** from chat/agent models — faster, purpose-built for next-token prediction in code.

What Tab predicts:
- **Next lines** — not just next token; multi-line completions
- **Next action** — anticipates your next edit based on recent changes
- **Imports** — auto-suggests the import when you use an unknown symbol
- **Rename cascade** — when you rename something, Tab suggests the same rename elsewhere

**Tab model tuning strategies:**
```
# Accept partial completion
Tab → accepts current suggestion
Escape → rejects

# Accept word-by-word (partial accept)
Cmd+Right → accepts one word of suggestion

# Force suggestion
Alt+\ → manually trigger suggestion

# Tab vs Enter
Tab: accept completion
Enter: newline (does not accept)
```

**When Tab is wrong more than right:**
- Your `.mdc` rules have a conflicting coding style the Tab model doesn't know about
- The file is too large for good contextual prediction
- Solution: Use `@file` in Chat to regenerate the problematic section, then Tab-complete naturally from there

---
---

# PART 4 — PROMPT ANATOMY: THE PCTF+ FRAMEWORK

---

## 4.1 — PCTF+ (Production-Grade Prompt Structure)

```
P — PERSONA        What expert should respond?
C — CONTEXT        What is the current state?
T — TASK           What exactly needs to happen?
F — FORMAT         What should the output look like?
+ R — REFERENCE    Figma / pattern / example to follow
+ N — NEGATIVE     What must NOT be changed/done
+ D — DONE         How to verify completion
```

### Full Template:

```markdown
[PERSONA]
You are a senior [iOS/Android/React Native/Web] engineer specializing in
[UIKit/Compose/React Native/Next.js] with deep knowledge of [MVVM/Clean/etc.].

[CONTEXT]
Current state: [describe what exists right now]
File: @[filename]
Architecture: [describe relevant architecture]

[TASK]
[One imperative verb + specific action]
Requirements:
- [Requirement 1 — specific and measurable]
- [Requirement 2]
- [Requirement 3]

[REFERENCE]
Figma: [URL or frame name]
Follow same pattern as: @[ExistingFile]
Design tokens from: @Colors @Typography

[FORMAT]
Create: [list new files]
Modify: @[file1], @[file2]
Do not touch: @[file3], @[file4]

[NEGATIVE]
- Do NOT modify any public function signatures
- Do NOT introduce new dependencies
- Do NOT use [pattern to avoid]
- Do NOT change @[critical file]

[DONE CRITERIA]
Complete when:
- [Verifiable condition 1]
- [Verifiable condition 2]
- No compile errors / no constraint conflicts
```

---

## 4.2 — Verb Precision Reference

The action verb is the most important single word in your prompt:

```
VERB          AGENT BEHAVIOR
──────────────────────────────────────────────────────────────
Create        Build from scratch — new file(s)
Add           Insert new code into existing file — keep rest intact
Change        Make a targeted modification to a specific thing
Rewrite       Fully regenerate — clean slate for the targeted block
Refactor      Restructure without changing behavior or API
Extract       Move code out into a new file or function
Convert       Transform from one pattern/language/paradigm to another
Extend        Add new capability on top of existing code
Fix           Target and repair a specific broken thing only
Optimize      Improve performance — output must be identical
Remove        Delete specific code — explain what to delete precisely
Replace       Swap one implementation for another
Simplify      Reduce complexity — same behavior, less code
Document      Add comments/docs — do not change code
Test          Write tests for — do not modify the source
Review        Analyze and report — do not change anything
Explain       Describe — do not produce code
Plan          Outline steps — do not execute yet
```

**Rule:** Never use vague verbs like "update," "clean up," "handle," or "do something with." Always pick a precise verb from the table above.

---
---

# PART 5 — THE COMPLETE PROMPTING TECHNIQUE ENCYCLOPEDIA

---

## 5.1 — Technique Taxonomy

```
PROMPTING TECHNIQUES
│
├── ZERO-SHOT TECHNIQUES
│   ├── Direct Prompting
│   ├── Role / Persona Prompting
│   └── Format-Constrained Prompting
│
├── FEW-SHOT TECHNIQUES
│   ├── Standard Few-Shot
│   ├── Chain-of-Thought Few-Shot
│   └── Tool-Use Few-Shot
│
├── REASONING TECHNIQUES
│   ├── Chain-of-Thought (CoT)
│   ├── Zero-Shot CoT ("think step by step")
│   ├── Tree of Thoughts (ToT)
│   ├── Self-Consistency
│   └── ReAct (Reason + Act)
│
├── DECOMPOSITION TECHNIQUES
│   ├── Prompt Chaining
│   ├── Least-to-Most
│   ├── Plan-and-Execute
│   └── Task Decomposition
│
├── REFINEMENT TECHNIQUES
│   ├── Self-Reflection / Critique
│   ├── Iterative Refinement
│   └── Recursive Self-Improvement
│
└── META TECHNIQUES
    ├── Meta Prompting
    ├── Context Poisoning Defense
    └── Emotional Anchoring
```

---

## 5.2 — Zero-Shot Direct Prompting

The base technique. No examples, no chain-of-thought. Just a clear instruction.

**When to use:** Simple, well-defined tasks. Adding a single UI element, renaming a variable, converting a function.

**Pattern:**
```
[Role]. [Current state]. [Specific action]. [Constraints]. [Output format].
```

**Example:**
```
You are a senior Swift engineer.
In @AuthViewModel.swift, the loginUser() function currently uses a completion handler.
Convert it to async/await.
Keep the same function signature (name, parameters).
Do not change any callers — just the internal implementation.
```

---

## 5.3 — Role / Persona Prompting

Assigning an expert identity changes the vocabulary, depth, and decision-making style of the output.

**Pattern:**
```
You are a [expert role] with [N] years of [specific domain] experience.
You specialize in [specific expertise].
Your primary concern is [what this expert prioritizes].
[Task]
```

**Effect by role:**

| Role | Output effect |
|---|---|
| Senior iOS engineer | More defensive code, UIKit/SwiftUI idioms, memory management awareness |
| Staff Android engineer | Proper Compose lifecycle, structured concurrency, Hilt patterns |
| Security-focused engineer | Input validation, auth checks, injection prevention |
| Performance engineer | Async operations, O(n) analysis, cache strategies |
| API designer | Backward compatibility, versioning, error response contracts |

**High-stakes variation:**
```
You are a principal engineer doing a security audit.
This code handles payment processing and user authentication.
Find every security vulnerability before writing the fix.
List all vulnerabilities first. I will review them before you write a single line of code.
```

---

## 5.4 — Few-Shot Prompting (Show One, Get More)

Showing the model one or two examples of exactly the pattern you want is the single most effective technique for maintaining code consistency.

**Standard Few-Shot:**
```
Here is exactly how API service functions are structured in this project:

EXAMPLE:
```swift
func fetchProfile(userId: String) async throws -> UserProfile {
    let endpoint = Endpoint.profile(userId: userId)
    let response: ProfileResponse = try await networkClient.request(endpoint)
    return response.toProfile()
}
```

Now create similar functions using IDENTICAL pattern:

1. fetchPosts(userId: String) → [Post]
   Endpoint: GET /users/{id}/posts
   Response: { "posts": [{ "id": "string", "title": "string", "body": "string", "createdAt": "ISO8601" }] }

2. createPost(userId: String, title: String, body: String) → Post
   Endpoint: POST /posts
   Body: { "userId": string, "title": string, "body": string }
   Response: { "id": "string", "title": "string", "body": "string", "createdAt": "ISO8601" }

Match: function name style, error handling, response mapping, async/await pattern.
```

**Few-Shot for UI Components:**
```
Here is an existing card component in this project:

@ProductCard.tsx

Create a similar card for UserProfile using IDENTICAL:
- StyleSheet.create() pattern
- Props interface structure
- Loading/error state handling
- Accessibility attributes

Differences:
- Shows: avatar, name, bio, follower count
- On tap: navigates to ProfileScreen
- Colors: use AppColors.profile instead of AppColors.product
```

---

## 5.5 — Chain-of-Thought (CoT) Prompting

Forces the model to reason through a problem step-by-step before producing output. Dramatically improves accuracy on complex tasks.

**Zero-Shot CoT (simplest):**
```
[Task description]
Think through this step by step before writing any code.
```

**Structured CoT:**
```
Before writing any code, work through these steps:

Step 1: What does the current code in @[file] actually do?
Step 2: What is the root cause of [problem]?
Step 3: What are the possible approaches to fix it?
Step 4: What are the tradeoffs of each approach?
Step 5: Which approach fits our architecture in @[pattern file]?
Step 6: What could break if I implement the chosen approach?

After completing all steps: write the implementation.
```

**CoT for Architecture Decisions:**
```
I need to decide between [Option A] and [Option B] for [feature].

Reason through:
1. Requirements: what does this feature actually need?
2. Option A analysis: how does it fulfill requirements? What are the risks?
3. Option B analysis: same questions.
4. Project fit: which fits better with our existing @[architecture files]?
5. Long-term: which is more maintainable 12 months from now?
6. Decision: which do you recommend and why?

Then implement the chosen option.
```

---

## 5.6 — Tree of Thoughts (ToT)

Explores multiple reasoning branches simultaneously. Use this when a problem has multiple viable solutions and you want to compare approaches before committing.

```
Approach this problem by exploring three distinct solutions in parallel.

Problem: [describe the problem]
Context: @[relevant files]

For each approach:
1. Describe the approach in 2 sentences
2. Show a rough code sketch (pseudo-code or key functions)
3. List pros: what this approach does well
4. List cons: risks, limitations, maintenance burden
5. Score: rate 1-10 for our specific project context

After all three: recommend one and explain why.
Then implement only the recommended approach.
```

---

## 5.7 — Self-Consistency Prompting

Generate multiple independent solutions and compare them. Use with parallel agents in Cursor.

```
[Use 3 parallel agents — Cmd+I, open three]

Agent 1 — Conservative approach:
"Implement [feature]. Prioritize: minimal code change, lowest risk,
 most consistent with current codebase patterns. Use @[existing pattern file]."

Agent 2 — Best practices approach:
"Implement [feature]. Prioritize: correctness, comprehensive error handling,
 full edge case coverage, clean architecture. Don't worry about diff size."

Agent 3 — Pragmatic approach:
"Implement [feature]. Prioritize: fastest to ship, most readable for the team,
 easiest to maintain. Balance quality with velocity."

After all three complete:
"Compare the three implementations. For each:
 - What approach was taken
 - Lines changed
 - Risk level
 - Maintenance burden
 Then recommend which to use for [specific context] and why."
```

---

## 5.8 — ReAct Prompting (Reason + Act)

The pattern behind how Cursor's Agent works internally. Useful to prompt explicitly when you want the agent to interleave thinking with tool use.

**The ReAct loop:**
```
Thought: What do I need to understand first?
Action: [read @file / search @codebase / run terminal command]
Observation: [what the action returned]
Thought: What does this mean? What next?
Action: [next action based on observation]
...
Thought: I have enough information.
Action: [write the code / make the fix]
```

**Explicit ReAct prompt:**
```
Solve this problem using a Reason → Act → Observe loop.

Problem: [describe]

Before any action:
- State what you need to know
- State what file/tool will give you that information
- Execute that action
- State what you observed
- State your next thought

Continue until you have enough information, then write the solution.

Do NOT skip to code immediately. The thinking steps are required.
```

---

## 5.9 — Plan-and-Execute Prompting

Two-phase approach: generate a detailed plan, review it, then execute. The professional standard for any non-trivial feature.

**Phase 1 — Plan:**
```
[Switch to Plan Mode: Shift+Tab in Agent]

I want to implement [feature].

Context:
- Current architecture: @[relevant files]
- Constraints: [list]

PLANNING PHASE ONLY. Do not write code.

Produce:
1. Files to CREATE (name + purpose)
2. Files to MODIFY (name + specific changes)
3. Files to NOT touch (and why)
4. Execution order (what depends on what)
5. Assumptions you are making
6. What could break in existing functionality
7. Questions you need answered before starting

I will review this plan and approve before any code is written.
```

**Phase 2 — Execute (after your review):**
```
Plan approved. Proceed with implementation.
Specifically: [reference any modifications to the plan you reviewed]
```

---

## 5.10 — Self-Reflection / Critique Prompting

After the agent produces output, have it review its own work before you see it.

**Post-generation review prompt:**
```
Before showing me the final code, review your own output for:

1. ❌ Crashes: force unwraps, array out-of-bounds, nil access, unhandled throws
2. ❌ Memory leaks: closures capturing self without [weak self], retain cycles
3. ❌ Threading: any UI updates on background thread
4. ❌ Missing error handling: throws that are swallowed silently
5. ❌ Convention violations: anything that violates our .mdc rules
6. ❌ Incomplete implementation: any "TODO" or placeholder code

Fix ALL issues found before showing me the result.
Do not say "I reviewed and found no issues" — actually look.
```

---

## 5.11 — Least-to-Most Decomposition

Break a complex problem into the simplest subproblems first, then build up.

```
This feature is complex. Break it into the smallest possible subtasks,
ordered from simplest to most complex.

Feature: [describe]

List each subtask:
- What it involves
- What it depends on
- Estimated complexity (S/M/L)
- Whether it can be done in isolation

Then implement each subtask in order, verifying each before starting the next.
Do not start subtask N+1 until subtask N compiles and works correctly.
```

---

## 5.12 — Meta Prompting (Prompts About Prompts)

Have the model generate the optimal prompt for a task, then execute it.

```
I need help with: [high-level description of task]

Before you help me, generate the optimal prompt structure I should use
to get the best result for this specific task.

Consider:
- What context do you need?
- What constraints should be specified?
- What format should I request?
- What should I tell you NOT to do?

Give me the optimal prompt template. I will fill it in and send it back.
```

---

## 5.13 — Recursive Self-Improvement

Have the agent iterate on its own output until a quality criterion is met.

```
Implement [feature].

After implementation, evaluate your own output against these criteria:
- Does it compile without errors?
- Does it handle all error cases?
- Does it follow our .mdc conventions?
- Is there any duplicated logic that should be extracted?
- Are there any magic numbers or hardcoded strings?

Score each criterion: PASS / FAIL.
If any FAIL: fix them. Repeat until all PASS.
Show me the final version only after all criteria pass.
```

---

## 5.14 — Emotional Anchoring (Research-Backed)

Studies confirm LLMs respond to importance signals. Use selectively — one per prompt maximum.

**Effective anchors:**
```
"This code handles payment processing. Take extra care with error handling."
"This output will be reviewed by senior engineers before shipping to production."
"This is CRITICAL: do not modify any public API signatures."
"The most important constraint is: [constraint]. Re-read before writing code."
```

**Anti-pattern:** Multiple emotional anchors in one prompt dilute all of them. Pick one.

---

## 5.15 — Negative Space Prompting

Explicitly stating what NOT to do is often more valuable than stating what to do. The AI already knows how to implement a feature — what it doesn't know is your constraints.

```
HIGH-VALUE NEGATIVES (add to every prompt):
──────────────────────────────────────────────────────────────────────
"Do NOT modify any public function signatures"
"Do NOT introduce new dependencies"
"Do NOT change @[critical shared file]"
"Do NOT use [pattern] — we use [alternative] in this project"
"Do NOT refactor code not directly related to this task"
"Do NOT add print/console.log statements"
"Do NOT use force unwrapping (!) anywhere"
"Do NOT hardcode colors/strings/spacing — use design system constants"
"Do NOT touch the database layer — this is a UI-only change"
"Do NOT add TODO comments — implement fully or ask me"
```

---
---

# PART 6 — CONTEXT ENGINEERING: MASTER LEVEL

---

## 6.1 — The Iceberg Model

The iceberg principle: the best prompts are short at the surface and massive below.

```
WHAT YOU TYPE IN CHAT (the tip — visible):
"Create the SettingsScreen."
                             ◄── 4 words

WHAT CURSOR ACTUALLY SEES (the iceberg below):
──────────────────────────────────────────────────────────────
.mdc core rules:       Architecture + naming + folder structure
.mdc platform rules:   Swift UIKit conventions + what not to do
Memories:              "User prefers coordinator pattern for nav"
Skill loaded:          create-ios-screen.md (step-by-step procedure)
@ClosestScreen.swift:  The exact pattern to clone
@Settings model:       The data this screen displays
@AppCoordinator.swift: Where to register the route
──────────────────────────────────────────────────────────────
TOTAL CONTEXT: ~8,000 tokens
YOUR VISIBLE PROMPT: ~4 tokens
```

**Building your iceberg:**
- Every time you give the same instruction twice → put it in `.mdc` rules
- Every time you explain "how to do X in this project" → put it in a Skill
- Every time you say "follow the same pattern as [file]" → put that file in the Skill definition

---

## 6.2 — Context Placement: The Primacy-Recency Effect

Information at the **start** and **end** of a prompt receives the most model attention. The middle of a long prompt is most likely to be ignored.

```
OPTIMAL PROMPT STRUCTURE:
──────────────────────────────────────────────────────
TOP (high attention):
  Critical constraints and context
  The most important rules

MIDDLE (lower attention):
  Detailed requirements
  Reference materials
  Step-by-step specifications

BOTTOM (high attention):
  Restate the single most critical constraint
  The done criteria
──────────────────────────────────────────────────────
```

**Example:**
```
Stack: Swift UIKit, MVVM, NO storyboards, iOS 15 minimum.

[...all detailed requirements go here...]

Remember: Do NOT modify FeedService.swift under any circumstances.
Done when: Builds cleanly. No constraint warnings in console.
```

---

## 6.3 — Context Poisoning: Detection and Defense

Context poisoning: irrelevant, outdated, or contradictory information in your context window causes errors.

**Common sources:**
1. Long chat histories (earlier task bleeds into current task)
2. Outdated `.mdc` rules (old architecture you replaced)
3. Too many MCP tool definitions (unrelated tools eating budget)
4. Overly broad `@codebase` retrieving unrelated modules
5. Auto-retrieved chunks from generated or vendor files

**Detection:**
- Agent starts suggesting patterns from an old architecture
- It references files from a different feature entirely
- It contradicts constraints you set earlier in the conversation
- Responses are longer but less relevant

**Decontamination prompt:**
```
Reset context for this task.

Ignore: anything related to [old feature/pattern/approach]
We no longer use: [old pattern]. It has been replaced by [new pattern].

The ONLY context that matters for this task:
- Our .mdc rules (always injected)
- @[file1] — [why it's relevant]
- @[file2] — [why it's relevant]
- This task: [describe task]

Start fresh with only the above context.
```

---

## 6.4 — The Session Management System

**When to start a new chat:**
- Starting a new feature (always)
- After completing a milestone (natural break)
- When the agent starts behaving inconsistently
- When you switch from one platform/module to another

**Fresh session template:**
```
PROJECT CONTEXT:
- App: [name]
- Platform: [iOS/Android/RN/Web]
- Stack: [language, framework, architecture]
- Minimum OS: [iOS 15/Android 26/etc]
- Key dependencies: [list 3-5]
- Folder structure:
  [paste 2-level tree]
- Design system: Colors @Colors, Typography @Typography

PRIOR SESSION SUMMARY:
- Completed: [what was built and works]
- In progress: [what was started]
- Known issues: [anything broken]
- Decisions made: [any architecture choices]

THIS SESSION TASK:
[describe the task for this session]

Relevant files: @[file1] @[file2] @[file3]
```

---
---

# PART 7 — THE SIX MODES: DECISION MAP

---

## 7.1 — Mode Selection Flowchart

```
You have a task.
        │
        ▼
Is it selecting 1-20 lines of existing code for a targeted change?
        │               │
       YES              NO
        │               │
        ▼               ▼
    Cmd+K          Does it touch more than 2 files?
  (Inline Edit)       │               │
                      NO             YES
                      │               │
                      ▼               ▼
              Is it a question    Is it complex enough
              or explanation?     to plan before building?
                  │    │              │           │
                 YES   NO            YES          NO
                  │    │              │           │
                  ▼    ▼              ▼           ▼
              Cmd+L  Cmd+L        Shift+Tab    Cmd+I
              (Ask)  (Edit)       (Plan Mode)  (Agent)
                                      │
                        Does it need to run
                        for hours without you?
                              │       │
                             YES      NO
                              │       │
                              ▼       ▼
                          Cmd+E    Proceed
                       (Background  with
                          Agent)   Agent
```

---

## 7.2 — Inline Edit (`Cmd+K`) — Surgical Precision

**What it does:** Edits ONLY the selected code. Does not read other files unless you `@mention` them.

**Power patterns:**

```bash
# Pattern 1: Scope-aware variable rename
Select: variable name in declaration
Cmd+K: "Rename to [newName] in this scope only"

# Pattern 2: Convert async pattern
Select: completion handler function (all lines)
Cmd+K: "Convert from callback to async throws. Keep same function name."

# Pattern 3: Add exhaustive guard clauses
Select: function body
Cmd+K: "Add guard clauses at the top for: nil parameters, empty arrays, unauthenticated state"

# Pattern 4: Apply design system
Select: StyleSheet.create block
Cmd+K: "Replace all hex colors with AppColors constants. Replace px values with Spacing constants."

# Pattern 5: Add TypeScript types
Select: function signature
Cmd+K: "Add complete TypeScript types. Use strict types — no any. Infer from usage."

# Pattern 6: Localize strings
Select: any UILabel/Text assignment or string literal in UI code
Cmd+K: "Replace hardcoded strings with localization keys. Create keys in snake_case."
```

**`Cmd+Shift+Enter`** — full-file edit (Ctrl+Shift+Enter on Windows): applies inline edit to the entire current file, not just selection.

---

## 7.3 — Agent Mode (`Cmd+I`) — Autonomous Execution

**Internal loop:**
```
Prompt received
      │
      ▼
[Context Assembly] → load rules + skills + memories + MCP + RAG + @mentions
      │
      ▼
[Plan Generation] → list of steps, files, commands
      │
      ▼
[Execution Loop] ──────────────────────────────────────┐
      │                                                  │
      ├── Edit file → run lint → check output ──────────┤
      ├── Create file → verify imports ─────────────────┤
      ├── Run command → parse output ───────────────────┤
      └── If error → self-correct and retry ────────────┘
      │
      ▼
[Verification] → review output, run tests if available
      │
      ▼
Present result for your review
```

**Agent control commands:**

| Action | How | When |
|---|---|---|
| Stop mid-task | Click Stop button | Agent is going wrong direction |
| Redirect | Stop → type correction → resume | Minor course correction |
| Review all changes | Click "Review" button | Before accepting any changes |
| Find issues | Review → "Find Issues" | After agent finishes, before merge |
| Undo agent changes | Cmd+Z (per-agent) | Reject entire agent's work |
| Accept all | Click "Accept All" | After review passes |
| Accept selectively | Click individual file diffs | Accept some, reject some |

---

## 7.4 — Plan Mode (`Shift+Tab` in Agent)

Plan Mode is the most underused and highest-value feature in Cursor for professional developers.

**How to invoke:** Type your task in the Agent input → press `Shift+Tab` before pressing Enter.

**Agent behavior in Plan Mode:**
```
1. Asks clarifying questions (if needed)
2. Reads relevant files
3. Produces a structured plan:
   - Files to create
   - Files to modify
   - Execution order
   - Assumptions
   - Risks
4. STOPS. Waits for your approval.
5. Only executes after you say "proceed" or "approved"
```

**Plan Mode template:**
```
[Shift+Tab to enter Plan Mode]

Implement [feature].

Context:
- Architecture: @[relevant files]  
- Constraints: [list]

In your plan, include:
1. Files to create (name, purpose, content summary)
2. Files to modify (which parts change)
3. Files to not touch (list with reason)
4. Order of operations
5. What could break in existing code
6. Any ambiguities that need my input

Do not write code. I will review and approve the plan first.
```

**Plan Mode for risky changes:**
```
[Shift+Tab]

I want to [risky change — e.g., "migrate from callbacks to async/await across the network layer"].

This is a high-risk change. Your plan must include:
1. All 37 files that use the current callback pattern (find them with @codebase)
2. The migration order (which file to change first, why)
3. How to test after each file (what tests to run)
4. Rollback strategy if something breaks midway

I will not approve this plan unless items 1-4 are addressed.
```

---
---

# PART 8 — BACKGROUND AGENTS & CLOUD AGENTS

---

## 8.1 — Three Levels of Agent Execution

```
SYNCHRONOUS AGENT (local)
─────────────────────────────────────────────────────────────────
Where: Your machine, inside your current Cursor session
How: Cmd+I, runs while you watch
When to use: Features you're actively working on, need to iterate fast
Limit: Competes for local CPU/RAM, practical for 2-3 at once
Git: Works in your current branch or git worktree

BACKGROUND AGENT (local async — Cmd+E)
─────────────────────────────────────────────────────────────────
Where: Your machine, separate background process
How: Cmd+E (cloud icon in chat) → submit task → close chat → work on other things
When to use: Long-running tasks while you do other work
Monitoring: Background Agents panel in sidebar, web app, mobile PWA
Git: Clones repo, works on separate branch, pushes for review
Access: Available from anywhere (web, mobile, Slack) — check status remotely

CLOUD AGENT (remote VM)
─────────────────────────────────────────────────────────────────
Where: Isolated Ubuntu VM in Cursor's AWS infrastructure
How: cursor.com/onboard or Slack @Cursor or Linear
When to use: Large tasks, run overnight, parallel with local work
Duration: Can run for hours, even overnight
Output: Produces PRs with artifacts (videos, screenshots, logs)
Git: Clones repo, creates branch, opens PR when done
Access: Available from all Cursor surfaces
Cost: Uses Max Mode tokens (usage-based billing)
Privacy: Requires Privacy Mode disabled; code goes to remote environment
```

---

## 8.2 — Background Agent Setup and Configuration

**Enable:**
```
Settings → Privacy Mode: OFF (required)
Settings → Usage-Based Billing: ON (required)
Click cloud icon in chat, or Cmd+E
```

**Admin configuration (workspace admins):**
```
Dashboard → Background Agents tab

Settings available:
- Default model: [model for all background agent runs]
- Default repository: [skip repo selection step]
- Base branch: [branch agents fork from]
- User restrictions: None / Allow list
- Team follow-ups: on/off (can others add messages to your agents?)
- Display agent summary: show/hide file diffs and code snippets
```

---

## 8.3 — Cloud Agent Prompting Patterns

Cloud agents need more self-contained, comprehensive prompts because you won't be watching in real-time.

**Cloud Agent Prompt Template:**
```
CLOUD AGENT TASK

Project: [name]
Repository: [github.com/org/repo]
Base branch: main
Target branch: feature/[name]

TASK:
[Describe the complete task — be comprehensive]

SUCCESS CRITERIA (agent runs until all pass):
- [ ] [Criterion 1 — specific and checkable]
- [ ] [Criterion 2]
- [ ] All existing tests still pass
- [ ] No new TypeScript/Swift/Kotlin errors

CONTEXT:
- Architecture: [brief description]
- Key files: [list files relevant to this task]
- Pattern to follow: [describe or name the pattern]
- Design reference: [Figma URL if applicable]

CONSTRAINTS:
- Do NOT modify: [list critical files]
- Do NOT introduce: [patterns/dependencies to avoid]
- Use existing: [libraries/patterns already in the project]

WHEN DONE:
Open a PR with:
- Title: [format: type(scope): description]
- Description: what changed, why, how to test
- Screenshots/videos of any UI changes
```

---

## 8.4 — Accessing Agents Remotely

Once a background or cloud agent is running, you can manage it from:

| Surface | Access method |
|---|---|
| Desktop IDE | Background Agents panel (sidebar) |
| Web browser | cursor.com → Agents tab |
| Mobile (iOS/Android) | Cursor PWA |
| Slack | @Cursor in any channel |
| Linear | Launch directly from issue → triggers background agent |
| GitHub | @cursor in PR comments for BugBot interactions |

**Remote follow-up prompt (add to a running agent):**
```
[Add follow-up message to running agent]

Current status looks good. Additional requirement:
[Describe new requirement or change discovered]

Do not restart from scratch — add this to the existing implementation.
```

---
---

# PART 9 — AUTOMATIONS: ALWAYS-ON AGENTS

---

## 9.1 — What Automations Are

Cursor Automations is a system for building always-on agents that run based on triggers and instructions you define. Automations run on schedules or are triggered by events from Slack, Linear, GitHub, PagerDuty, and webhooks. When invoked, the agent spins up a cloud sandbox and follows your instructions using the MCPs and models you've configured.

```
AUTOMATION ANATOMY:
───────────────────────────────────────────────────────────────────
TRIGGER          CONDITION             AGENT TASK
─────────────    ──────────────────    ─────────────────────────────
Schedule         Every night 2 AM      "Run security audit on all
                                        new code merged today"
GitHub event     PR opened             "Review for bugs (BugBot)"
Slack message    @Cursor mentioned     "Implement the task described"
Linear event     Issue → In Progress   "Start implementation"
PagerDuty alert  Incident triggered    "Query logs, diagnose cause"
Webhook          Custom event          Custom agent task
```

---

## 9.2 — Creating Automations

```
Access: cursor.com/automations

Setup:
1. Choose trigger type
2. Write the agent instructions
3. Select model
4. Configure MCP servers the agent can use
5. Enable memory (agent learns from past runs)
6. Deploy
```

**Automation Prompt Templates:**

### Nightly Security Audit:
```
AUTOMATION: nightly-security-audit
TRIGGER: Schedule — every day 2:00 AM

AGENT INSTRUCTIONS:
Audit all code merged to main in the last 24 hours.

Check for:
1. Exposed secrets, API keys, credentials in code
2. New SQL queries without parameterization
3. New authentication bypasses or missing auth checks
4. New file operations without path sanitization
5. Dependencies added without security review

For each finding:
- Create a GitHub issue with label "security"
- Post summary to Slack #security-alerts
- Severity: critical/high/medium

Skip findings already reported in open issues.
```

### Automated Code Review:
```
AUTOMATION: pr-code-review
TRIGGER: GitHub — pull_request opened or updated

AGENT INSTRUCTIONS:
Review this PR for code quality.

Read the diff. Check for:
1. Logic errors and edge cases not handled
2. Missing error handling
3. Performance regressions (N+1 queries, main thread blocking)
4. Convention violations per project standards

Post findings as PR review comments.
Format: [🔴 CRITICAL] / [🟡 IMPORTANT] / [🟢 SUGGESTION] + explanation + line number.

If all critical issues from the previous review are addressed, approve the PR.
```

### PagerDuty Incident Response:
```
AUTOMATION: incident-response
TRIGGER: PagerDuty — incident.trigger

AGENT INSTRUCTIONS:
A production incident has been triggered.

1. Use MCP tools to:
   - Query CloudWatch/Datadog logs for the past 30 minutes
   - Check error rates by endpoint
   - Identify which service is failing

2. Cross-reference with recent deploys (last 6 hours via GitHub MCP)

3. Propose root cause hypothesis

4. Post to Slack #incidents:
   - What service is affected
   - Error rate and user impact
   - Most likely cause
   - Suggested immediate action

5. Create a GitHub issue with full diagnosis
```

---
---

# PART 10 — YOLO MODE, CHECKPOINTS & THE AUTONOMOUS LOOP

---

## 10.1 — YOLO Mode: What It Is and When to Use It

YOLO Mode (Settings → Features → Agent → Enable auto-run) removes the confirmation step for terminal commands. The agent can write code, run it, see the output, and iterate — all without asking you.

```
NORMAL MODE:
Agent proposes → You confirm → Command runs → Agent sees output → Repeats

YOLO MODE:
Agent proposes → Command runs immediately → Agent sees output → Repeats
```

**When YOLO mode is appropriate:**
- Rapid prototyping in a disposable sandbox
- Running safe, read-only commands (tests, linters, type-checkers)
- Automated refactoring where you've already reviewed the approach
- CI-like workflows in a local development environment

**When to NEVER use YOLO mode:**
- Any command that touches a database
- Any command that writes to production
- Any command that deletes files
- Any network request outside of your local dev environment

---

## 10.2 — The Allowlist Pattern (Safe YOLO)

Instead of full YOLO mode, use an allowlist: only pre-approved commands auto-run.

**Settings → Features → Agent → YOLO Allowlist:**

```json
{
  "allowedCommands": [
    "npm run test",
    "npm run lint",
    "npm run type-check",
    "npx tsc --noEmit",
    "swift test",
    "swift build",
    "./gradlew test",
    "./gradlew ktlintCheck",
    "npx prettier --check .",
    "swiftlint",
    "python -m pytest"
  ]
}
```

**Rule:** Only add commands that are:
1. Read-only or easily reversible
2. Cannot affect external systems
3. You run manually anyway

---

## 10.3 — Checkpoints: Time-Travel for Agent Runs

Cursor automatically creates checkpoints after each agent action. This is the "Back to the Future" safety net.

```
CHECKPOINT SYSTEM:
───────────────────────────────────────────────────────────────────
After each agent file edit → checkpoint created automatically
After each terminal command → checkpoint created

OPERATIONS:
- View checkpoints: Agent panel → checkpoint history
- Restore to checkpoint: Click any checkpoint → "Restore"
- Effect: Undoes all agent changes after that checkpoint
- Then: Re-run with a tweaked prompt

USE CASES:
1. Agent went in wrong direction at step 4 of 8 → restore to step 3, redirect
2. Agent made changes you don't understand → restore, start fresh with more context
3. Experimental approach failed → restore, try different approach
4. Testing two approaches: checkpoint → try A → restore → try B → compare
```

**Checkpoint + redirect pattern:**
```
[Agent went wrong at step N]

1. Click "Restore to [previous checkpoint]"
2. Type new prompt:

"The previous approach didn't work because [specific reason].

Instead, [describe alternative approach].

Key difference from what you tried: [explain what to do differently]
Constraint discovered: [new constraint learned from the failed attempt]

Try again with this different approach."
```

---

## 10.4 — The Autonomous Loop Pattern

When you want the agent to run until a specific criterion is met, chain self-evaluation into the prompt:

```
Build [feature].

After each implementation attempt, evaluate:
- Does it compile without errors?
- Do all tests pass? (run: [test command])
- Does [specific behavior] work correctly?

If any evaluation fails:
- State which criterion failed
- State the root cause
- Make a targeted fix
- Re-evaluate

Continue this loop until ALL criteria pass.
Only stop and show me the result when everything is passing.

Maximum iterations: 5. If not passing after 5 attempts, stop and describe what's blocking.
```

---
---

# PART 11 — THE FOUR RULES LAYERS

---

## 11.1 — Rules Architecture Overview

```
RULES PRIORITY (higher = more specific = wins conflicts)
─────────────────────────────────────────────────────────────────────
Priority 4 — Prompt @mention: "Follow @specific-rule.mdc" (most specific)
Priority 3 — Project Rules: .cursor/rules/*.mdc (repo-scoped)
Priority 2 — User Rules: Cursor Settings > Rules (machine-scoped)
Priority 1 — Team Rules: Dashboard (org-scoped, lowest priority)
─────────────────────────────────────────────────────────────────────

AGENTS.md: Sits at repo root. Plain markdown. Read by any agent (including
           non-Cursor AI tools). Lower fidelity but universal compatibility.
```

---

## 11.2 — Project Rules (`.cursor/rules/*.mdc`)

Versioned in your repo. Every team member gets them. The most important rules layer.

**File format:**
```markdown
---
description: [One sentence: what this rule is for]
globs: **/*.swift, **/*.swiftui
alwaysApply: false
---

[Rule content — plain markdown]
```

**Four glob strategies:**

```
# Strategy 1: Always apply — global project rules
---
globs:
alwaysApply: true
---
[core project conventions, tech stack, folder structure]

# Strategy 2: File-type scoped — language-specific rules
---
globs: **/*.swift
alwaysApply: false
---
[Swift-specific rules — only fires when working in .swift files]

# Strategy 3: Folder scoped — module-specific rules
---
globs: src/api/**, src/services/**
alwaysApply: false
---
[API layer rules — only when working in API files]

# Strategy 4: Test scoped — testing rules
---
globs: **/*.test.ts, **/*.spec.ts, **/*Tests.swift
alwaysApply: false
---
[Test writing conventions]
```

---

## 11.3 — User Rules (Global, Machine-Scoped)

Cursor Settings → Rules → User Rules

These apply across ALL your projects. Use for personal preferences that are always true regardless of project.

```
# Example User Rules content:

## My Preferences
- I prefer async/await over promises in all JavaScript/TypeScript code
- I prefer functional style over class-based in non-UI code
- Always show me the diff before applying large changes
- Explain architectural decisions in comments when the choice is non-obvious
- I'm an experienced developer — skip basic explanations

## What I Find Annoying
- Do not add "This is an example implementation" disclaimers
- Do not suggest adding TODO comments for "future improvements"
- Do not ask obvious follow-up questions — make reasonable assumptions
```

---

## 11.4 — Team Rules (Dashboard)

Cursor Dashboard → Settings → Team Rules

Applied to all agents for all team members. Ideal for:
- Organization-wide conventions
- Security policies
- Shared design system tokens
- Approved dependency list

```
# Example Team Rules:

## Security Policy
- Never log user PII (email, phone, address, payment info) to console
- All database queries must use parameterized queries — no string interpolation
- Authentication checks required on every API endpoint

## Approved Dependencies Only
Use only libraries from our approved list:
- State: Zustand
- API client: Axios + React Query
- UI: Tailwind CSS + shadcn/ui
- Tests: Vitest + Testing Library
New dependencies require a PR with tech lead approval comment.

## Design System
Use only our design tokens. Never hardcode:
- Colors: use tokens from @/design-tokens/colors.ts
- Typography: use tokens from @/design-tokens/typography.ts
- Spacing: 4pt base grid (4, 8, 12, 16, 20, 24, 32, 48, 64)
```

---

## 11.5 — `AGENTS.md` — The Universal Rule File

`AGENTS.md` at the repo root is read by all AI agents — including Claude Code, GitHub Copilot, and any future tools — not just Cursor. It's written in plain markdown with no frontmatter.

```markdown
# AGENTS.md — Project Instructions for AI Assistants

## Project Overview
[App name] is a [type] app built with [stack].

## Architecture
- Pattern: [MVVM / Clean Architecture / etc]
- Platform: [iOS / Android / Web / All]
- Key constraint: [most important rule]

## Quick Reference

### Adding a New Screen
1. Create [Name]Screen in [folder]
2. Create [Name]ViewModel in [folder]
3. Register route in [routing file]
4. Follow pattern from [closest existing screen]

### API Integration Pattern
All API calls go through [ServiceName].
Response mapping happens in [ModelName].toModel().
Error types are in [ErrorFile].

### Design System
Colors: [file path]
Typography: [file path]
Spacing unit: [Xpt]

## Critical Rules
1. Never use storyboards or Interface Builder (iOS)
2. Always use async/await — no completion handlers
3. No hardcoded colors, strings, or spacing
4. Never commit API keys or secrets

## File Naming
[List your conventions]
```

---
---

# PART 12 — MEMORIES: PERSISTENT PROJECT INTELLIGENCE

---

## 12.1 — How Memories Work

Memories allow the AI to automatically remember key details and decisions from past conversations in the chat, carrying that knowledge across sessions. A "sidecar model" observes the chat and suggests potential memories to save, which developers can approve or reject.

```
MEMORY FLOW:
────────────────────────────────────────────────────────────────────
Session ends
      │
      ▼
Sidecar model analyzes conversation
      │
      ▼
Suggests memories: "User prefers Combine over closure callbacks"
                   "Auth module uses [specific pattern]"
                   "Project uses [specific API base URL]"
      │
      ▼
Developer approves/rejects each suggested memory
      │
      ▼
Approved memories stored per-project
      │
      ▼
Next session: relevant memories auto-loaded into context
      │
      ▼
No more repeating context every session
```

**Enable:** Settings → Rules → Memories (beta)

**Where memories live:** Settings → Rules → Memories tab (view, edit, delete)

---

## 12.2 — Managing Memories Effectively

**Approve memories when:**
- They capture a decision that should persist ("We use Coordinator for navigation, not push directly")
- They capture a preference that's always true ("Always use @MainActor for UI updates")
- They capture a project-specific fact ("API base URL is configured in APIConfig.swift")

**Reject memories when:**
- They capture a one-time task choice that won't generalize
- They contradict a `.mdc` rule (rule should win)
- They're about a temporary workaround

**Explicit memory creation prompt:**
```
Remember this for future sessions:
[specific fact, decision, or preference]

This is important because: [context]
```

**Memory conflict resolution:**
```
Correction: in past sessions you learned [old memory].
That is no longer accurate. The updated fact is: [new fact].
Please update your understanding.
```

---
---

# PART 13 — SKILLS: DYNAMIC DOMAIN KNOWLEDGE

---

## 13.1 — Skills vs Rules: The Critical Distinction

```
RULES (.mdc files)                  SKILLS (.md files)
─────────────────────               ──────────────────────────────────
Always injected (or glob-matched)   Dynamically loaded when relevant
"What" and "don't do X"             "How to do X in this project"
Constraints and conventions         Step-by-step procedures
Short — preserve context budget     Can be longer — loaded on demand
Example: "Never use storyboards"    Example: "How to create an iOS screen"
```

---

## 13.2 — Skills File Structure

```markdown
<!-- .cursor/skills/create-ios-screen.md -->

# Skill: Create iOS Screen

## When to load this skill
When asked to create a new UIViewController, screen, or feature view.

## What to do

### Step 1: Assess existing code
Read the closest similar screen: @[ScreenName]ViewController.swift
Note: architecture pattern, lifecycle setup, ViewModel binding method

### Step 2: Create View file
Location: Sources/Features/[FeatureName]/[Name]View.swift

Requirements:
- UIView subclass
- init(frame:) and init?(coder:) required
- All constraints in layout setup function called from init
- Use NSLayoutConstraint.activate([...])
- No layout logic in ViewController

### Step 3: Create ViewModel
Location: Sources/Features/[FeatureName]/[Name]ViewModel.swift

Requirements:
- No UIKit imports
- @Published properties for all state
- func for each user action
- All async functions use async/await

### Step 4: Create ViewController
Location: Sources/Features/[FeatureName]/[Name]ViewController.swift

Requirements:
- Init takes ViewModel
- loadView() creates and configures [Name]View
- viewDidLoad() binds ViewModel → View
- Navigation via coordinator.navigate(to:)

### Step 5: Register Route
Add to: Sources/Navigation/AppCoordinator.swift
Follow: existing route enum pattern

### Step 6: Verify
- Build succeeds
- No NSLayoutConstraint conflicts in console
- ViewModel binds correctly
```

---

## 13.3 — Skill Invocation Methods

**Method 1: Agent auto-loads when relevant**
The agent detects the task matches the skill description and loads it automatically.

**Method 2: Manual @mention**
```
Using the create-ios-screen skill, create [ScreenName].
```

**Method 3: Command triggers skill**
```markdown
<!-- .cursor/commands/create-screen.md -->
Load the create-$2-screen skill.
Create a new screen called $1.
Follow all steps in the skill exactly.
```
Invoked as: `/create-screen LoginScreen ios`

---
---

# PART 14 — CUSTOM COMMANDS: REUSABLE WORKFLOWS

---

## 14.1 — Command File Format

```markdown
<!-- .cursor/commands/[command-name].md -->

[The prompt that runs when this command is invoked]
$1 = first argument, $2 = second argument, etc.
```

**Invoke:** Type `/[command-name]` in Agent or Chat, followed by arguments.

---

## 14.2 — Essential Command Library

### `/create-screen [name] [platform]`
```markdown
Load the create-$2-screen skill.
Create a new screen called $1Screen.
Reference the closest existing screen for pattern.
Create all required files (screen, viewmodel, view).
Verify it compiles.
```

### `/write-tests [file]`
```markdown
Write comprehensive unit tests for @$1.

Test coverage required:
1. Happy path — valid inputs produce correct output
2. Empty/null/undefined inputs
3. Boundary values (min, max, zero)
4. All error states (network error, parse error, auth error)
5. State mutations — verify state after each action
6. Any async operations — test loading, success, and error states

Test file location: [test folder path]/$1_test.[ext]
Follow pattern from: @[ExistingTest]
```

### `/code-review [file or "current diff"]`
```markdown
Review @$1 (or the current git diff if $1 is "diff").

Report format:
🔴 CRITICAL (must fix before merge):
  - [finding] — [file:line] — [how to fix]

🟡 IMPORTANT (should fix):
  - [finding]

🟢 SUGGESTION (optional):
  - [finding]

Check for:
- Logic errors and missed edge cases
- Missing error handling
- Performance: N+1 queries, main thread work, memory leaks
- Security: unsanitized input, exposed secrets, missing auth
- Convention violations from our .mdc rules
- Missing or weak tests

If no issues in a category, write "None found."
```

### `/summarize`
```markdown
Summarize this conversation so far.

Format:
## Completed
- [what was built, with file names]

## Current State
- [what works, what doesn't]

## In Progress
- [what was started but not finished]

## Next Steps
- [logical next actions]

## Decisions Made
- [any architecture or design choices and their rationale]

This summary will be used to start a fresh session.
```

### `/pr-description`
```markdown
Read @git diff main.

Write a PR description:

## Summary
[2-3 sentence overview of what changed]

## Changes
[Bullet list of specific changes with file names]

## Why
[Rationale — what problem this solves]

## How to Test
[Step-by-step testing instructions]

## Screenshots
[Note: developer will add manually]

## Breaking Changes
[Any breaking changes, or "None"]
```

### `/onboard [repo-url]`
```markdown
I am starting work on a new codebase.

@web https://gitingest.com/[transform $1 to gitingest URL]

Analyze this repository and produce:
1. Architecture overview (what pattern, why)
2. Key files I should know about
3. How to add a new feature (the established pattern)
4. Conventions I must follow
5. Things to avoid (anti-patterns in this codebase)
6. How to run and test locally

Format this as my orientation document for this project.
```

---
---

# PART 15 — MCP ARCHITECTURE & COMPLETE SETUP

---

## 15.1 — MCP Protocol Architecture

```
THE MCP STANDARD
─────────────────────────────────────────────────────────────────────────
Before MCP: Every AI tool had custom integrations with every external tool.
            n tools × m AI clients = n×m integrations to maintain.

After MCP:  One server per tool. One client per AI.
            n tools + m AI clients = n+m things to maintain.

┌─────────────────┐    MCP Protocol    ┌─────────────────────────┐
│  Cursor Client  │ ◄────────────────► │  GitHub MCP Server      │
│  (MCP Client)   │                    │  (wraps GitHub REST API) │
└─────────────────┘    MCP Protocol    └─────────────────────────┘
         │
         │             MCP Protocol    ┌─────────────────────────┐
         └──────────────────────────► │  Figma MCP Server       │
                                       └─────────────────────────┘
         │
         │             MCP Protocol    ┌─────────────────────────┐
         └──────────────────────────► │  Sentry MCP Server      │
                                       └─────────────────────────┘
```

**Three MCP primitives:**
- **Tools** — callable functions (create_pr, query_database, deploy)
- **Resources** — contextual data the server provides (schemas, configs)
- **Prompts** — reusable prompt templates offered by the server

---

## 15.2 — The Three-Tier Configuration System

```
TIER 1: Project-scoped (.cursor/mcp.json — committed to repo)
Use for: Servers the whole team uses. Team-shared configs.
Warning: Never put API keys here — commit to git → exposed.

TIER 2: Global (~/.cursor/mcp.json — never committed)
Use for: Personal API keys. Servers only you use.
Safe for: All sensitive credentials.

TIER 3: UI setup (Settings → Tools & MCP)
Use for: One-off testing of new servers.
OAuth: Servers that support OAuth use this method.
```

---

## 15.3 — The 40-Tool Limit

Cursor passes only the first 40 tool definitions to the agent. Past 40, performance degrades because the model's tool-selection becomes less reliable.

```
TOOL BUDGET MANAGEMENT:
─────────────────────────────────────────────────────────────────────
Check current count: Settings → Tools & MCP → count enabled tools

Average tools per server:
- Figma MCP: ~15 tools
- GitHub MCP: ~30 tools
- Linear MCP: ~20 tools
- Sentry MCP: ~8 tools
- Supabase MCP: ~25 tools
- Playwright MCP: ~12 tools

Strategy: Enable only the servers you need for the current task.
          Disable others to stay under 40.

Quick disable: Settings → Tools & MCP → toggle server off
```

---

## 15.4 — MCP One-Click Install & Deep Links

Cursor 1.0+ supports one-click MCP server installation. For any server that supports it, clicking "Add to Cursor" in the server's documentation automatically adds it to your configuration.

**Deep link format for your own servers:**
```
cursor://settings/mcp?name=[server-name]&command=[install-command]
```

**OAuth-supported servers** (no manual API key setup):
- GitHub — authorize via GitHub OAuth
- Linear — authorize via Linear OAuth
- Slack — authorize via Slack OAuth

---
---

# PART 16 — MCP APPS: INTERACTIVE UIS IN AGENT CHATS

---

## 16.1 — What MCP Apps Are

MCP Apps support interactive user interfaces like charts from Amplitude, diagrams from Figma, and whiteboards from tldraw directly inside Cursor.

This means MCP servers can now return not just text/data, but rendered interactive UI components inside the Cursor chat panel.

```
WITHOUT MCP APPS:
Agent → queries Amplitude → returns raw JSON data
You: read the JSON, mentally visualize the trend

WITH MCP APPS:
Agent → queries Amplitude → renders interactive chart inline
You: see the chart directly in chat, hover for data points
```

**Available MCP App integrations:**
- **Amplitude** — analytics charts and funnels inline in chat
- **Figma** — design diagrams and component specs rendered inline
- **tldraw** — interactive whiteboard for architecture diagrams
- **Mermaid** (built-in) — flowcharts, sequence diagrams, ERDs

---

## 16.2 — Using Mermaid Diagrams in Chat

Cursor renders Mermaid diagrams natively in chat responses. Request them explicitly:

```
Generate a Mermaid flowchart showing the authentication flow.
Show: login attempt → validate credentials → check 2FA → issue JWT → redirect.
Include error paths: wrong password, expired token, 2FA failure.
```

```
Generate a Mermaid sequence diagram showing the API request flow for:
User taps "Load Feed" → FeedViewModel → FeedService → NetworkClient → API → response.
Show all method calls and data transformations.
```

```
Generate a Mermaid class diagram for the @[module] directory.
Show class relationships, inheritance, and key properties.
```

---
---

# PART 17 — THE PRODUCTION MCP STACK

---

## 17.1 — Complete Production Configuration

```json
{
  "mcpServers": {

    "figma": {
      "command": "npx",
      "args": ["-y", "figma-developer-mcp", "--figma-api-key=YOUR_KEY", "--stdio"],
      "description": "Design → code. Read Figma frames, components, design tokens."
    },

    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"],
      "description": "Live library docs. Bypasses model knowledge cutoff."
    },

    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_..." },
      "description": "PRs, issues, branches, CI status."
    },

    "linear": {
      "command": "npx",
      "args": ["-y", "@linear/mcp-server"],
      "description": "Issue lifecycle. Agent can read/update Linear tickets."
    },

    "sentry": {
      "command": "npx",
      "args": ["-y", "@sentry/mcp-server"],
      "env": { "SENTRY_AUTH_TOKEN": "sntrys_..." },
      "description": "Read production crash reports with full context."
    },

    "playwright": {
      "command": "npx",
      "args": ["-y", "@playwright/mcp"],
      "description": "Browser automation. E2E testing, screenshot verification."
    },

    "supabase": {
      "command": "npx",
      "args": ["-y", "@supabase/mcp-server-supabase"],
      "env": {
        "SUPABASE_URL": "https://yourproject.supabase.co",
        "SUPABASE_SERVICE_ROLE_KEY": "eyJ..."
      },
      "description": "Database queries, schema management, migrations."
    },

    "vercel": {
      "command": "npx",
      "args": ["-y", "@vercel/mcp-server"],
      "description": "Deploy, manage env vars, check build logs."
    },

    "netlify": {
      "command": "npx",
      "args": ["-y", "@netlify/mcp-server"],
      "description": "Build and deploy web projects to Netlify."
    }
  }
}
```

---

## 17.2 — MCP Power Prompt Patterns

### The Crash-to-Fix Pipeline:
```
Use Sentry MCP to read this issue: [Sentry URL]

Retrieve:
1. Full stack trace
2. Breadcrumbs (user actions before crash)
3. Device/OS distribution of affected users
4. First seen / last seen / event count
5. Any linked similar issues

Cross-reference with:
- @[files mentioned in stack trace]
- @git log (was there a recent change to those files?)

Produce:
1. Root cause analysis (not just "line X crashed" — why did it crash?)
2. Fix (minimal code change — do not refactor)
3. Test to add to prevent regression
```

### The Ticket-to-PR Pipeline:
```
Read Linear issue [LINEAR-XXX] using Linear MCP.
Extract: title, description, acceptance criteria.

Implement the ticket.
Context: @[relevant files]
Follow pattern from: @[closest existing feature]

When implementation is complete:
Use GitHub MCP to create a PR:
- Title: [ticket title]
- Description: [what changed, how to test, link to Linear issue]
- Assign to: [your username]
- Label: ready-for-review

Then update the Linear ticket status to "In Review".
```

### The Live-Docs Pattern (Bypasses Knowledge Cutoff):
```
I need to integrate [library name] version [X.Y.Z].

Step 1: Use Context7 MCP to fetch the current API documentation.
Step 2: Show me the key APIs I need for: [specific feature]
Step 3: Implement [feature] using ONLY the documented API — do not use
        any knowledge from your training data for this library.
        If there's a discrepancy between training knowledge and Context7,
        trust Context7.
```

---
---

# PART 18 — PARALLEL AGENTS & GIT WORKTREES

---

## 18.1 — Architecture

```
YOUR REPO (main branch)
        │
        ├─ worktree: agent-login-ui      ← Agent 1: Login UI
        │  (isolated copy of codebase)
        │
        ├─ worktree: agent-login-api     ← Agent 2: Login API integration
        │  (isolated copy of codebase)
        │
        ├─ worktree: agent-login-tests   ← Agent 3: Unit tests
        │  (isolated copy of codebase)
        │
        └─ worktree: agent-login-docs    ← Agent 4: Documentation
           (isolated copy of codebase)

All four run simultaneously. No file conflicts.
Each agent has its own undo history.
You review all four diffs when done.
```

**Maximum parallel agents:** 8 simultaneous (as of Cursor 2.0)

---

## 18.2 — The Four Parallel Patterns

**Pattern 1: Competing Solutions (pick the best)**
```
Run 3 agents simultaneously on the same task:

Agent 1 [Composer — speed]:
"Implement [feature]. Optimize for: minimal diff, fastest delivery.
 Be pragmatic — don't over-engineer."

Agent 2 [Claude Sonnet — quality]:
"Implement [feature]. Optimize for: correctness, full error handling,
 complete edge case coverage."

Agent 3 [GPT-5 — innovation]:
"Implement [feature]. Think from first principles.
 Is there a simpler or more elegant architecture? Propose it."

After all three:
"Compare the 3 approaches. Score each on: correctness, maintainability,
 risk level. Recommend one for this project."
```

**Pattern 2: Feature Decomposition (parallel tracks)**
```
All 3 agents work on the SAME feature, different layers:

Agent 1: "Create the UI layer for [feature]. Use mock data. No API calls."
Agent 2: "Create the ViewModel and data model for [feature]. No UI."
Agent 3: "Create the API service and integration for [feature]. No UI."

After all three:
"Integrate the three layers. Verify interfaces match."
```

**Pattern 3: Parallel Bug Fixes (clear backlog)**
```
Agent 1: "Fix: [bug from ticket 1] — @[relevant file]"
Agent 2: "Fix: [bug from ticket 2] — @[relevant file]"
Agent 3: "Fix: [bug from ticket 3] — @[relevant file]"

All unrelated bugs run simultaneously.
Review each fix independently.
```

**Pattern 4: Plan + Build (quality + speed)**
```
Agent 1 [Claude Opus — planning]:
"Plan the implementation of [feature]. Produce a detailed spec.
 Do NOT write code. Only produce the plan."

[Review plan]

Agent 2 [Composer — execution]:
"Implement [feature] according to this plan: [paste plan]
 Follow exactly. Do not deviate."
```

---
---

# PART 19 — BUGBOT, AUTOFIX & AUTOMATED REVIEW

---

## 19.1 — BugBot Complete Reference

**How it works:**
- Automatically triggers on every PR open or update
- Runs multiple analysis passes with randomized diff order (reduces false positives)
- Posts findings as PR comments
- Each comment includes: "Fix in Cursor" link → opens IDE with context pre-loaded

**BugBot Autofix:**
- When BugBot finds an issue it can fix, it spawns a cloud agent
- Cloud agent runs in isolated VM, makes the fix, runs tests
- Proposes fix as a new commit on the PR
- Over 35% of BugBot Autofix changes are merged into the base PR
- Merge via `@cursor merge-fix` comment on the PR

**Trigger manually:**
```
Comment on any GitHub PR: "bugbot run"
→ Forces a fresh BugBot analysis even if PR hasn't changed
```

---

## 19.2 — Manual Pre-Merge Review Prompt

Before any significant merge, run this:

```
Review all changes in @git diff main.

Perform three passes:

PASS 1 — CORRECTNESS:
For each changed function/component: does it do what it should?
Check: logic errors, off-by-one errors, wrong conditionals,
       state management bugs, async race conditions.

PASS 2 — ROBUSTNESS:
What can crash or fail silently?
Check: nil/null access, array bounds, network failures,
       missing error handling, unhandled promise rejections,
       force unwraps.

PASS 3 — CONVENTIONS:
Does this code follow our project standards?
Check: naming conventions, folder placement, design system usage,
       missing tests, any .mdc rule violations.

Report format:
🔴 CRITICAL: [finding] — [file:line] — [exact fix needed]
🟡 IMPORTANT: [finding]
🟢 SUGGESTION: [finding]

Number of 🔴 items: [N]
Ready to merge: YES if N=0, NO if N>0
```

---
---

# PART 20 — HOOKS: COMPLETE REFERENCE

---

## 20.1 — Hook Points and Configuration

```json
// .cursor/hooks.json
{
  "hooks": {
    "prePrompt": {
      "script": ".cursor/hooks/pre-prompt.sh",
      "timeout": 10,
      "failOnError": false
    },
    "postEdit": {
      "script": ".cursor/hooks/post-edit.sh",
      "timeout": 30,
      "failOnError": false
    },
    "preCommand": {
      "script": ".cursor/hooks/pre-command.sh",
      "timeout": 5,
      "failOnError": true
    },
    "postCommand": {
      "script": ".cursor/hooks/post-command.sh",
      "timeout": 15,
      "failOnError": false
    }
  }
}
```

---

## 20.2 — Production Hook Scripts

### Auto-Format + Lint on Edit:
```bash
#!/bin/bash
# .cursor/hooks/post-edit.sh
FILE="$1"
case "$FILE" in
  *.swift)  swiftformat "$FILE"; swiftlint --fix "$FILE" ;;
  *.kt)     ktlint format "$FILE" ;;
  *.ts|*.tsx) npx prettier --write "$FILE"; npx eslint --fix "$FILE" ;;
  *.py)     black "$FILE"; isort "$FILE" ;;
esac
```

### Command Security Guard:
```bash
#!/bin/bash
# .cursor/hooks/pre-command.sh
CMD="$1"
# Block dangerous patterns
echo "$CMD" | grep -qEi "DROP TABLE|DELETE.*WHERE 1|rm -rf /|>.*production" && {
  echo "BLOCKED: Dangerous command pattern detected"
  exit 1
}
# Block production environment
echo "$CMD" | grep -qE "PROD|PRODUCTION|prod\." && {
  echo "BLOCKED: Production commands not allowed in development"
  exit 1
}
exit 0
```

### Auto-Checkpoint Commits:
```bash
#!/bin/bash
# .cursor/hooks/post-edit.sh
FILE="$1"
[[ "$FILE" == *src/* || "$FILE" == *Sources/* || "$FILE" == *app/* ]] && {
  git add "$FILE" 2>/dev/null
  git commit -m "chore: agent checkpoint — $(basename $FILE)" --no-verify 2>/dev/null
}
```

### Test-Loop Continuation Signal:
```bash
#!/bin/bash
# .cursor/hooks/post-command.sh
CMD="$1"; EXIT="$2"
echo "$CMD" | grep -qE "test|spec|jest|pytest|xctest" && [ "$EXIT" != "0" ] && {
  echo "Tests failed. Diagnose failures and fix. Run tests again." > .cursor/agent-hint.txt
  exit 2  # Signal agent to continue iterating
}
[ "$EXIT" = "0" ] && rm -f .cursor/agent-hint.txt
```

---
---

# PART 21 — DEBUG MODE

---

## 21.1 — Debug Mode vs Regular Debugging

```
REGULAR DEBUGGING          DEBUG MODE
────────────────────────── ───────────────────────────────────────
Reads source code           Instruments app with runtime log points
Hypothesizes cause          Observes actual execution
"This might be nil"         "Value IS nil at line 47. Trace: [path]"
Generic fix attempt         Fix targeted to proven root cause
Works on simple bugs        Excellent for complex, elusive bugs
```

**Activate Debug Mode:**
```
In Agent chat:
"Use Debug Mode to find and fix this bug."
[describe the bug]
```

---

## 21.2 — Debug Mode Prompt Templates

### Race Condition:
```
Use Debug Mode.

Bug: [describe intermittent behavior — "sometimes crashes", "occasionally shows wrong data"]
How to reproduce: [best steps you know of]
Files likely involved: @[file1] @[file2]

Instrument the app to capture:
1. Thread identifiers at every state change
2. Exact sequence of events before the bug triggers
3. Values of [specific variables] at each step

Reproduce the bug, capture the execution trace,
then fix the root cause (not just add a guard).
```

### Infinite Render/Recomposition:
```
Use Debug Mode.

Bug: [Component name] is re-rendering/recomposing excessively.
Symptom: UI is laggy, CPU spike visible in profiler.

Instrument to capture:
1. What triggers each recompose/re-render
2. Which props/state are changing
3. Which parent is causing the cascade

Show the render chain. Then fix the root cause.
```

---
---

# PART 22 — SCREEN CREATION PROMPTS

---

## 22.1 — The Figma MCP Pipeline (Best Method)

```
Setup: Add Figma MCP to .cursor/mcp.json (see Part 17)

Prompt:
"Using Figma MCP, read this component/frame: [Figma URL]

Generate the [platform] implementation.

Code generation requirements:
- Colors: use tokens from @Colors — never hardcode HEX
- Typography: use tokens from @Typography — never hardcode sizes
- Spacing: use multiples of [8]pt — never hardcode px/pt values
- Existing components: check @/components/ui/ before creating new ones
- Pattern: follow same structure as @[ClosestExistingScreen]

Platform: [Swift UIKit / SwiftUI / Compose / React Native / Next.js]
Files to create: [list]
Files to NOT create: [list if any should be reused]"
```

---

## 22.2 — The Screenshot-Based Prompt

When Figma MCP isn't available, attach screenshot to chat and describe:

```
[Attach screenshot to Cursor chat]

Implement the screen shown in the attached screenshot.

From my analysis of the screenshot (describe top → bottom):

NAVIGATION BAR:
- Back button: [left / none]
- Title: "[text]" or [none]
- Right button: "[icon or text]" or [none]

BODY (describe each element in order):
1. [Element name]
   - Type: [UIImageView / Text / Button / List / Card / etc]
   - Position: [below nav / full-width / centered / padded 16pt]
   - Size: [full-width / specific: 120×120 / fills available]
   - Style: [background #HEX / corner radius Xpt / border / shadow]
   - Text: [font weight, size, color]
   - Content: [static placeholder / dynamic from data]

2. [Next element — same fields]

[continue for all visible elements]

BOTTOM:
- [Fixed CTA button / Tab bar / Nothing]

COLORS (from screenshot):
- Background: [closest HEX]
- Primary text: [HEX]
- Accent/CTA: [HEX]

Stack: [your stack]
Follow pattern: @[ExistingScreen]
```

---

## 22.3 — Pattern-Clone Method

```
Read @[ExistingScreen]ViewController.swift and @[ExistingScreen]ViewModel.swift.

Understand:
1. Initialization pattern (how ViewController and ViewModel connect)
2. State binding mechanism (Combine / closures / delegates)
3. Layout approach (all constraints in loadView / viewDidLoad / etc)
4. Navigation style (coordinator call / direct push / etc)
5. Loading/error/empty state pattern

Create [NewScreen] using IDENTICAL patterns for all of the above.

Differences:
- Name: [NewScreenName]
- Data model: [struct or class description]
- UI layout: [Figma URL or description]
- API endpoint: [URL]
- Navigation destination: [where it goes on completion]

Do NOT deviate from the established patterns.
```

---

## 22.4 — The 7-Step Incremental Build

Never build a complete screen in one shot. Use this sequence:

```
Step 1 — UI Shell
"Create [ScreenName]ViewController.swift with layout ONLY.
 Hardcoded placeholder strings and colors.
 No ViewModel, no API, no navigation.
 Just the visual structure."

Step 2 — ViewModel Skeleton  
"Create [ScreenName]ViewModel.swift.
 Properties to expose: [list].
 Actions: [list].
 Use mock/hardcoded data. No API calls yet."

Step 3 — Bind ViewModel → View
"Connect @[ScreenName]ViewModel to @[ScreenName]ViewController.
 Bind using [Combine/@Published/closures].
 Display mock data in the UI."

Step 4 — Real API
"Replace mock data with real API call.
 Endpoint: [url]
 Response: [JSON]
 Add call to @[ServiceFile]."

Step 5 — Edge Cases
"Add to @[ScreenName]:
 Loading state: [describe UI]
 Error state: [describe UI]
 Empty state: [describe UI]
 Pull-to-refresh: [yes/no]"

Step 6 — Navigation
"Add navigation from @[ScreenName]:
 To: @[DestinationScreen]
 Trigger: [button tap / row select / completion]
 Pass: [data parameters]"

Step 7 — Tests
"Write unit tests for @[ScreenName]ViewModel.
 Test: loadData success, loadData network error, [action] happy path, [action] error"
```

---
---

# PART 23 — ERROR FIXING TEMPLATES

---

## 23.1 — Compile Error
```markdown
Compile error. Full output:

[PASTE ENTIRE ERROR — never summarize]

File: [filename]
Line: [number]
Language: [Swift/Kotlin/TypeScript]

Surrounding code (±15 lines):
```[lang]
[paste]
```

Intent: [one sentence — what you were trying to accomplish]

Fix the error only. Do not change anything outside the error site.
Explain the cause in one sentence.
```

---

## 23.2 — Runtime Crash
```markdown
Runtime crash. Full log:

[PASTE ENTIRE STACK TRACE — every line]

Reproduction:
1. [step]
2. [step]
3. [crash here]

Device: [model + OS]
Build: [Debug/Release]

Likely files: @[file1] @[file2]

Find the root cause (not just the symptom).
Fix and explain why it crashed.
Check if the same bug could exist elsewhere in the codebase.
```

---

## 23.3 — Logic Bug
```markdown
Wrong behavior. No crash.

File: @[filename]
Function: [name]

Expected: [exact expected behavior with sample input/output]
Actual: [exact actual behavior with sample input/output]

Sample data:
Input: [paste]
Expected output: [paste]
Actual output: [paste]

Code:
```[lang]
[paste full function]
```

Fix the logic error with minimal change.
Add one inline comment explaining what was wrong.
```

---

## 23.4 — UI Layout Bug
```markdown
Layout broken.

Screen: [name]
Device: [model — e.g., iPhone SE, Pixel 5]

What's wrong:
[Element] should be [position/size] but appears [wrong position/size]
[Describe overlap, clipping, wrong size, missing element]

Screenshot description: [or attach screenshot]

Layout code:
```[lang]
[paste constraints/styles/compose/rn layout]
```

Fix layout ONLY. Do not change:
- Colors
- Fonts
- Business logic
- Any file other than the layout code
```

---

## 23.5 — Performance Bug
```markdown
Performance issue.

Symptom: [lag / slow load / high CPU / excessive rerender]
When: [user action that triggers it]
Severity: [drops to ~Xfps / takes Xs / spikes to X% CPU]

Suspected location:
File: @[filename]
Function(s): [names]

Code:
```[lang]
[paste]
```

Context:
- Data size: [e.g., "list has ~500 items"]
- Call frequency: [e.g., "called on every scroll frame"]
- Thread: [main/background]

Target: [< 16ms / < 500ms / < 50% CPU]

Identify bottleneck. Explain WHY it's slow.
Show optimized version. Confirm output is identical.
```

---
---

# PART 24 — FEATURES, REFACTORING & API INTEGRATION

---

## 24.1 — Adding a Feature

```markdown
[PERSONA] Senior [platform] engineer.

[CONTEXT]
Screen: @[ScreenName]
ViewModel: @[ScreenName]ViewModel  
Current behavior: [describe what the screen does today]

[TASK]
Add: [feature name]

User story: As a [user], I can [action] so that [benefit].

Requirements:
- [UI element: what it is, where it appears, Figma: URL]
- [Behavior: what happens when triggered]
- [Data: where it comes from]
- [States: loading / success / error / empty]

[FORMAT]
Modify: @[ViewController], @[ViewModel]
Create (if needed): @[NewComponent]

[NEGATIVE]
Do NOT break existing functionality.
Do NOT change public function signatures.
Do NOT modify @[critical shared file].

[DONE]
Feature works. Existing functionality unchanged. No new crashes.
```

---

## 24.2 — Safe Refactoring

```markdown
Refactor @[filename] for [readability / performance / separation of concerns].

Problems to solve:
- [specific problem 1]
- [specific problem 2]

NON-NEGOTIABLE CONSTRAINTS:
- All public function signatures IDENTICAL (name, params, return type)
- All behavior IDENTICAL — same input = same output
- All protocol/interface conformances preserved
- All callers (@[caller1], @[caller2]) must still compile without changes
- Do NOT modify any file other than @[filename]

After refactoring, verify:
1. All callers still compile
2. All existing tests still pass
3. No new imports introduced
4. No new external dependencies
```

---

## 24.3 — API Integration

```markdown
Integrate new endpoint.

Method: [GET/POST/PUT/DELETE]
URL: [full URL]
Auth: [Bearer token from [storage location] / None]
Headers: [any custom headers]

Request body (POST/PUT):
```json
{[paste schema]}
```

Response (200):
```json
{[paste full example response — real data, not just schema]}
```

Error handling required:
- 400: [meaning] → [what to show user]
- 401: [meaning] → [redirect to login / refresh token]
- 404: [meaning] → [show empty state]
- 500: [meaning] → [show retry option]
- Network timeout: → [show offline message]

Create:
1. @[ModelName] — data class/struct mapping ALL response fields
   Optional fields: use nullable types (String? / String | undefined)
   
2. @[FunctionName] in @[ServiceFile]
   async throws → [ReturnType]
   Follows pattern from: @[ExistingFunction]
   
3. Call from @[ViewModel]:
   Loading: set isLoading = true before, false after
   Success: update state with response data
   Error: set errorMessage from error type

Do NOT use callbacks.
Do NOT hardcode the base URL — use [constant location].
Match exactly the pattern in @[ExistingAPIFunction].
```

---
---

# PART 25 — PLATFORM-SPECIFIC TEMPLATES

---

## 25.1 — iOS / Swift UIKit

### New UIViewController (Programmatic MVVM):
```markdown
Create [Name]ViewController.

Stack: Swift 5.9, UIKit programmatic, MVVM, iOS [minimum] min.
State binding: [Combine @Published / closure callbacks]
Pattern: identical to @[ClosestExistingVC].swift

ViewModel properties:
- [name]: [Type] // [what it represents]
[list all]

ViewModel actions:
- func [name]([params]) // [what it does]
[list all]

UI elements (from Figma [URL] / description):
[list each element with type, rough position, style]

Navigation:
- Pushed from: @[ParentVC] via [coordinator/nav]
- Receives: [params: Type]
- Navigates to: @[ChildVC] when [trigger]

Files: [Name]ViewController.swift, [Name]ViewModel.swift, [Name]View.swift
```

### Custom UIView Component:
```markdown
Create reusable UIView: [Name]View.

Design: [Figma component URL or description]

Public interface:
var [property]: [Type] { get set }    // [what it controls visually]
var on[Action]: (([type]) -> Void)?   // callback
weak var delegate: [Name]ViewDelegate?

States: default / highlighted / loading / disabled / error
[describe each state's appearance]

Both init(frame:) and init?(coder:) required.
No XIB. Programmatic only.
Location: Sources/DesignSystem/Components/
```

---

## 25.2 — Android / Jetpack Compose

### New Compose Screen:
```markdown
Create [Name]Screen.kt

Package: [com.app.feature.screenname]
Pattern: clone structure from @[Existing]Screen.kt

UiState:
data class [Name]UiState(
    val isLoading: Boolean = false,
    val error: String? = null,
    [list domain-specific fields]
)

ViewModel: @HiltViewModel, expose uiState as StateFlow
User actions: [list functions the UI calls]

Layout (Figma: [URL]):
[describe top to bottom]

Navigation:
Route: "[screenName]/{[arg]}"
Args: [arg]: [Type]
NavHost file: @[NavGraph].kt

Collect with: collectAsStateWithLifecycle()
```

---

## 25.3 — React Native (TypeScript)

### New Screen:
```markdown
Create [Name]Screen.tsx

Location: src/screens/[name]/[Name]Screen.tsx

Navigation:
Stack: [Stack/Tab] — React Navigation v6
Route: '[routeName]'
Params: { [param]: [type] }

State: [useState / Zustand store / React Query]
API: [endpoint] → [response shape]

Platform specifics:
- iOS: [SafeAreaView / specific behavior]
- Android: [StatusBar / back handler]

Rules:
- StyleSheet.create() in [Name].styles.ts (no inline)
- Colors: @/constants/Colors
- Typography: @/constants/Typography
- No `any` types
- Named export only

Pattern: @[ExistingScreen]Screen.tsx
```

---

## 25.4 — Next.js App Router

### New Page:
```markdown
Create app/[route]/page.tsx

Route: /[route-path]
Component type: [Server Component / Client Component]

Data fetching:
Type: [async Server Component / React Query / SWR]
Source: [API / database / static]
Loading: loading.tsx with [skeleton description]
Error: error.tsx with [message]

Metadata:
title: "[page title]"
description: "[under 160 chars]"

Layout (Figma: [URL]):
[description]

Types: define in this file or import from @/types/[file]
No `any`. All props typed.
Tailwind CSS only — no inline styles.
Responsive: mobile-first, sm: md: lg: breakpoints.

Follows: @app/[similar-route]/page.tsx
```

---
---

# PART 26 — THE @-SYSTEM: COMPLETE REFERENCE

---

## 26.1 — Every @ Symbol

```
@filename.ext      Full file content added to context
                   Use: when you need the AI to read/modify a specific file

@folder/           All files in folder added
                   Use: when working within a module/feature

@codebase          Semantic search across entire index
                   Use: "find where X is used", "how is Y implemented"

@web               Live web search
                   Use: docs for new libraries, CVEs, current API specs

@docs              Your indexed documentation (add in Settings → Features → Docs)
                   Use: framework-specific questions with your docs indexed

@git               Git history, diff, blame
                   Use: PR descriptions, "what changed in last 5 commits"

@terminal          Last terminal output
                   Use: "here's the error from the terminal — fix it"

@notepad           Your Cursor Notepad
                   Use: project notes, sprint context, current decisions

@linter-errors     Current lint/type errors in project
                   Use: "fix all current linter errors"

@recent-changes    Recently modified files
                   Use: "what did I change in the last hour"

@https://url       Fetch and include a web page
                   Use: specific API docs, GitHub issues, Stack Overflow

@ruleName          Reference a specific .mdc rule by name
                   Use: "following @ios-swift-rules, create..."

@skillName         Load a specific skill manually
                   Use: "using the @create-screen skill, build..."
```

---

## 26.2 — Power @-Patterns

### Codebase archaeology:
```
@codebase "where is the authentication token stored and refreshed?"
Give me: file path, function name, how it's called.
```

### Complete context for complex refactor:
```
I need to understand the full data flow before refactoring.
@codebase "trace the data flow from user tap on 'Submit' to API call in CheckoutFlow"
List every function call in order.
```

### Git-powered PR description:
```
@git diff origin/main
Write a PR description for these changes:
- What changed (technical)
- Why it changed (business reason)
- How to test
- Any breaking changes
```

### Live docs for new library:
```
@web "react-query v5 infinite scroll documentation"
Implement infinite scroll in @FeedScreen.tsx using react-query v5 syntax only.
```

### Terminal-to-fix:
```
@terminal
The test above failed with that error. Fix the root cause.
Do not just suppress the error.
```

---
---

# PART 27 — MODEL STRATEGY

---

## 27.1 — Complete Model Decision Matrix

```
TASK                                        BEST MODEL
──────────────────────────────────────────────────────────────────────────
Architecture design / planning              Claude Opus 4.5
Complex multi-file feature implementation   Claude Sonnet 4.5 or Composer
Fast iteration / quick UI changes           Composer (< 30s turns)
Simple single-file edits (Cmd+K)            Composer or auto
Complex bug diagnosis / root cause          Claude Opus 4.5
Security audit / high-stakes review         Claude Opus 4.5
Test generation                             GPT-5 or Composer
Analyzing very large files (3000+ lines)    Gemini 3 Pro (long context)
Code explanation / documentation            Claude Sonnet 4.5
Type generation / structured output         GPT-5
Any task on Max Mode (giant context)        Gemini 3 Pro or Claude Opus 4.5
Routine refactoring                         Composer
Natural language API / docs generation      Claude Sonnet 4.5
```

---

## 27.2 — The Plan-Sonnet → Build-Composer Pattern

The most cost-efficient high-quality workflow:

```
Step 1 [Sonnet 4.5 in Plan Mode]:
"Plan the implementation of [feature].
 Produce: files to create, files to modify, execution order, risks."
 
[Review plan → approve]

Step 2 [Composer in Agent Mode]:
"Execute this plan exactly:
 [paste the Sonnet plan]
 
 Do not deviate from the plan.
 Flag any ambiguity before implementing that step."
```

This gets Sonnet's reasoning quality for planning (where reasoning matters) and Composer's speed for execution (where speed matters).

---

## 27.3 — Max Mode — When to Use It

Max Mode bypasses request quotas and bills at direct API token rates. It unlocks much longer context windows.

**Use Max Mode when:**
- Analyzing a file over 3,000 lines
- Reviewing an entire module at once
- Planning a large refactor that needs to see everything
- Debugging an issue that spans many files
- Final pre-launch code review of entire changeset

**Do NOT use Max Mode for:**
- Regular feature development (normal mode is sufficient)
- Simple bug fixes
- UI tweaks
- Anything you do many times per day (cost adds up fast)

---
---

# PART 28 — TOKEN BUDGET & COST ENGINEERING

---

## 28.1 — The Efficiency Playbook

```
TECHNIQUE                               SAVINGS    QUALITY IMPACT
──────────────────────────────────────────────────────────────────────
Cmd+K for tiny edits (not Agent)        HIGH       None — often better
Fresh chat for each feature             HIGH       Positive (clean context)
Scope @mentions to 1-3 files            HIGH       Positive (less noise)
Composer for execution tasks            MED-HIGH   Slight (vs Sonnet)
Keep .mdc rules under 150 lines         MED        None
Disable unused MCP servers              MED        Positive (less tool noise)
Use /summarize in long chats            MED        None
Plan-then-execute (fewer wrong paths)   HIGH       Strongly positive
```

---

## 28.2 — Billing Plans (2025/2026)

```
PLAN          PRICE           BEST FOR
──────────────────────────────────────────────────────────────────────
Hobby         $0/month        Learning, occasional use
Pro           $20/month       Most individual developers
Business      $40/user/month  Teams. BugBot. Team rules.
Ultra         $200/month      Heavy parallel agent users (20× more usage)
Enterprise    Custom          SSO, compliance, dedicated support
```

**Usage pools:**
- Composer / auto pool: much higher limits (Composer 1.5 = 6× the limit of older Composer)
- Frontier models pool (Opus, GPT-5, Gemini Pro): more limited, save for high-value tasks

---
---

# PART 29 — SECURITY, PRIVACY & ENTERPRISE

---

## 29.1 — Privacy Mode

**What it does:** Routes all code to zero-retention model providers. No storage. No training on your code.

**Enable:** Settings → General → Privacy Mode: ON

**Limitations when enabled:**
- Background Agents: disabled or restricted (requires sending code to remote VM)
- Memories: may be limited (memories require some persistence)
- Some MCP features may be affected

**Enterprise enforcement:** Team admins can enforce Privacy Mode for all members via the dashboard.

---

## 29.2 — What Cursor Stores (Privacy Mode OFF vs ON)

```
Privacy Mode OFF:
- Code may be stored temporarily for features
- Embeddings/metadata stored for indexing
- NOT used for training models (explicitly stated)

Privacy Mode ON:
- Code sent to zero-retention provider replicas
- No storage by model providers
- Code NOT used for training (same guarantee)
- Some features limited (Background Agents, Memories)
```

---

## 29.3 — MCP Security Rules

```
RULE 1: No API keys in committed .cursor/mcp.json
→ Use env: block with environment variables
→ Set actual values in ~/.cursor/mcp.json (global, not committed)
→ Or use OAuth where supported

RULE 2: Minimum permission principle
→ Database MCP: read-only for development
→ GitHub MCP: repo-scoped token, not org admin
→ Sentry MCP: read-only is sufficient

RULE 3: Audit the 40-tool limit
→ Check what's enabled: Settings → Tools & MCP
→ Disable unused servers — fewer attack surfaces

RULE 4: Review mcp.json changes in PRs
→ Treat like security-sensitive infrastructure
→ Don't auto-merge changes to .cursor/mcp.json
→ CVE-2025-54136 ("MCPoison"): malicious mcp.json can redirect commands

RULE 5: YOLO denylist for dangerous commands
→ Even with YOLO mode on, maintain explicit denylist
→ Block: DROP TABLE, rm -rf, production env commands, curl to external
```

---
---

# PART 30 — PRODUCTION WORKFLOWS & TEAM PATTERNS

---

## 30.1 — The PRD-to-Ship Pipeline

```
PHASE 1: SPEC
──────────────────────────────────────────────────────────────────────
"Help me write a Product Requirements Document for [feature].

Include:
1. Problem statement (what user pain does this solve?)
2. User stories (As a [user], I can [action])
3. Functional requirements (numbered, measurable)
4. Out of scope (explicitly excluded)
5. Success metrics (how do we know it worked?)
6. Technical constraints (anything known upfront)

Save as: docs/features/[feature-name]-PRD.md"

PHASE 2: TICKETS
──────────────────────────────────────────────────────────────────────
"Read @docs/features/[feature-name]-PRD.md

Break into development tickets:
- Title (imperative verb, under 60 chars)
- Size (S/M/L)
- Acceptance criteria (3-5 bullet points)
- Dependencies (what must be done first)
- Platform (iOS / Android / Web / API / All)

[If Linear MCP enabled]:
Create these as Linear issues in project [ProjectName]."

PHASE 3: IMPLEMENT (per ticket)
──────────────────────────────────────────────────────────────────────
[Plan Mode — Shift+Tab]
"Implement: [ticket title]
 Acceptance criteria: [paste from ticket]
 Context: @[PRD file] @[relevant files]
 Pattern: @[closest existing feature]"

PHASE 4: REVIEW & MERGE
──────────────────────────────────────────────────────────────────────
"/code-review"
[BugBot reviews automatically on PR open]
"@git diff main — write PR description"
```

---

## 30.2 — The Daily Development Loop

```
START OF DAY:
───────────────
"Read @DEV_LOG.md. Summarize where we left off yesterday.
 Today's task: [task from sprint board]
 Relevant files: @[files]"

END OF DAY:
────────────
"/summarize"  (condenses current chat)
"Update @DEV_LOG.md with today's work."

BEFORE MERGING:
────────────────
"/code-review current diff"
[If issues found]: fix all 🔴 items
"/pr-description"
[Create PR → BugBot auto-reviews]
```

---

## 30.3 — The Context Continuity System

Three files to maintain for seamless AI context across sessions:

**`DEV_LOG.md`** — Session-by-session record:
```markdown
## [Date]
### Completed
- [file]: [what was built]

### In Progress
- [file]: [current state, what's left]

### Decisions
- [decision]: [rationale]

### Known Issues
- [issue]: [status]

### Next Session
- [priority task]
```

**`ARCHITECTURE.md`** — Living architecture document:
```markdown
# Architecture Overview
[High-level diagram or description]

## Key Files
[Map of important files and their purposes]

## Patterns
[Document the patterns used — link to examples]

## Why Decisions Were Made
[ADR-style decisions]
```

**`AGENTS.md`** — Universal agent instructions (repo root):
```markdown
[See Part 11.5 for full template]
```

---
---

# PART 31 — COMPLETE PLATFORM `.mdc` TEMPLATES

---

## 31.1 — iOS/Swift `.mdc`

```markdown
---
description: iOS Swift project conventions
globs: **/*.swift
alwaysApply: false
---

## Stack
Swift 5.9 · UIKit programmatic · MVVM+Coordinator · iOS [X]+ min · SPM

## Core Rules
- async/await ONLY — no completion handlers, no DispatchQueue
- @MainActor for all UI updates
- [weak self] in ALL stored closures
- NO force unwrapping (!) anywhere
- NO storyboards or XIBs

## File Naming
[Name]ViewController · [Name]ViewModel · [Name]View · [Name]Coordinator
[Name]Service · [Name].swift (models)

## Folder Structure
Sources/Features/[Name]/ → ViewController + ViewModel + View
Sources/Core/Network/ · Sources/Core/Services/ · Sources/DesignSystem/

## Design System
Colors: AppColors (Colors.swift) · Typography: AppFont · Spacing: 8pt base
Corner radius: 8/12/20/50+ · Never hardcode colors/fonts/spacing

## Architecture
ViewController: lifecycle + user events only, no business logic
ViewModel: all logic, no UIKit imports
Coordinator: all navigation
Service: all network/data calls

## Forbidden
Storyboards · Force unwraps · DispatchQueue.main · Completion handlers
print() (use os_log) · UI on background thread
```

---

## 31.2 — Android/Kotlin `.mdc`

```markdown
---
description: Android Kotlin Jetpack Compose conventions
globs: **/*.kt
alwaysApply: false
---

## Stack
Kotlin · Jetpack Compose · MVVM+UDF · Hilt · Navigation Compose · Coroutines+Flow

## Core Rules
- Compose ONLY — zero XML layouts
- suspend functions ONLY — no callbacks or Thread.sleep
- StateFlow for ALL ViewModel state
- @HiltViewModel on all ViewModels
- Dispatchers.IO for network/disk operations (inject IODispatcher)
- collectAsStateWithLifecycle() in Composables

## UiState Pattern
data class [Screen]UiState(isLoading: Boolean = false, error: String? = null, ...)
Exposed as: val uiState: StateFlow<[Screen]UiState> = _uiState.asStateFlow()

## Architecture
UI → ViewModel → Repository → ApiService/LocalDataSource
ViewModel calls Repository, never ApiService directly
Return Result<T> from Repository

## Design Tokens
MaterialTheme.colorScheme · MaterialTheme.typography · MaterialTheme.shapes
Spacing: multiples of 4dp (4, 8, 12, 16, 24, 32)

## Forbidden
XML layouts · GlobalScope · runBlocking (except tests)
Mutable state exposed from ViewModel · Thread.sleep
```

---

## 31.3 — React Native `.mdc`

```markdown
---
description: React Native TypeScript conventions
globs: **/*.tsx, **/*.ts
alwaysApply: false
---

## Stack
TypeScript strict · React Native [Expo/CLI] · React Navigation v6
[Zustand/Redux] · StyleSheet.create() · [Axios/React Query]

## TypeScript
strict: true · No `any` · All props have interface · prefer interfaces

## Components
Function components only · Named exports (default: screen files only)
Max 150 lines per file · No business logic in components (extract to hooks)
Props must accept testID

## Styling
StyleSheet.create() ONLY — no inline styles
Colors: @/constants/Colors · Spacing: @/constants/Spacing · Fonts: @/constants/Typography
No hardcoded values anywhere

## File Structure Per Screen
[Name]Screen.tsx · [Name].styles.ts · [Name].types.ts · use[Name].ts

## Performance
React.memo() for frequent re-renders · useCallback for child callbacks
FlatList: always keyExtractor, never index as key

## Forbidden
Class components · Inline styles · Hardcoded colors/spacing
`any` type · console.log in commits · Default exports on non-screen files
```

---

## 31.4 — Next.js `.mdc`

```markdown
---
description: Next.js App Router TypeScript conventions
globs: **/*.tsx, **/*.ts
alwaysApply: false
---

## Stack
Next.js 14+ App Router · TypeScript strict · Tailwind CSS
[Zustand/Jotai] · [Prisma/Drizzle] · [NextAuth/Clerk]

## App Router
Default to Server Components · 'use client' only when needed
Loading: loading.tsx · Error: error.tsx · Not found: not-found.tsx
Data fetching: async/await in Server Components

## TypeScript
strict: true · No `any` · Named exports everywhere
Default exports: only page.tsx and layout.tsx

## Styling
Tailwind ONLY · Use cn() for conditional classes
Mobile-first: base → sm: → md: → lg:
Extract repeated patterns to components, not @apply

## Server Actions
In /app/actions/ · 'use server' at top · Validate with Zod
Return: { success: boolean, data?: T, error?: string }

## Performance
next/image for ALL images · next/font for ALL fonts
Lazy load heavy components with dynamic()

## Forbidden
Pages Router · `any` type · CSS modules · Inline styles
Client-side data fetching (use Server Components or React Query)
```

---
---

# PART 32 — `.cursorignore` TEMPLATE

---

```
# .cursorignore — keeps index clean and fast

# Package managers
node_modules/
.pnpm-store/
Pods/
.gradle/
.gradle-cache/

# Build output
dist/
build/
.next/
.nuxt/
out/
DerivedData/
*.xcarchive/
.build/

# Generated code
*.generated.swift
*.generated.ts
*.pb.swift
*.pb.go
*.pb.cc
*.pb.h
*.g.dart
generated/
__generated__/

# Large binary assets
*.png
*.jpg
*.jpeg
*.gif
*.mp4
*.mov
*.pdf
*.sketch
*.fig

# Lock files (noisy, low signal)
package-lock.json
yarn.lock
pnpm-lock.yaml
Podfile.lock
Gemfile.lock
*.lock

# Test fixtures and snapshots
__snapshots__/
__fixtures__/
TestData/
*.snap

# IDE and OS
.idea/
.vscode/
*.xcuserstate
.DS_Store
Thumbs.db

# Environment (safety)
.env
.env.local
.env.*.local
*.pem
*.key
*.cert

# Coverage reports
coverage/
lcov.info
*.lcov

# Documentation (if large)
# docs/  # uncomment if docs are large and not useful for code context
```

---
---

# PART 33 — YOLO MODE ALLOWLIST TEMPLATES

---

## Safe Commands by Platform:

### JavaScript/TypeScript:
```json
{
  "allowedCommands": [
    "npm run test",
    "npm run test:unit",
    "npm run lint",
    "npm run type-check",
    "npx tsc --noEmit",
    "npx eslint .",
    "npx prettier --check .",
    "npm run build",
    "npx jest --passWithNoTests"
  ]
}
```

### iOS/Swift:
```json
{
  "allowedCommands": [
    "swift build",
    "swift test",
    "swiftlint",
    "swiftformat --lint .",
    "xcodebuild test -scheme [YourScheme] -destination 'platform=iOS Simulator,name=iPhone 15'"
  ]
}
```

### Android/Kotlin:
```json
{
  "allowedCommands": [
    "./gradlew build",
    "./gradlew test",
    "./gradlew ktlintCheck",
    "./gradlew ktlintFormat",
    "./gradlew lint",
    "./gradlew detekt"
  ]
}
```

**Never add to YOLO allowlist:**
```
rm -rf
DROP TABLE / DELETE / TRUNCATE
git push --force
kubectl delete
terraform destroy
Any command with "prod" or "production"
Any command that modifies a database
Any curl/wget to external services
```

---
---

# PART 34 — COMPLETE PROMPT TEMPLATES LIBRARY

---

## Quick Reference Card

| Task | Prompt Starter |
|---|---|
| New screen (iOS/Figma) | `"Create [Name]ViewController. Stack: Swift UIKit MVVM. Figma: [URL]. Pattern: @[Existing]."` |
| New screen (Android) | `"Create [Name]Screen.kt in Compose. Figma: [URL]. Follow @[Existing]Screen.kt"` |
| New screen (RN) | `"Create [Name]Screen.tsx. Stack: RN TypeScript. Figma: [URL]. Follow @[Existing]."` |
| New page (Next.js) | `"Create app/[route]/page.tsx. Server Component. Data from [source]. Figma: [URL]."` |
| Fix compile error | `"Full error: [paste]. File: [name] Line: [N]. Code: [paste]. Fix ONLY the error."` |
| Fix crash | `"Crash log: [paste full trace]. Steps: [list]. Fix and explain root cause."` |
| Fix layout | `"[Element] at wrong position. Layout code: [paste]. Fix layout only, nothing else."` |
| Add API | `"Endpoint: [method] [url]. Response: [JSON]. Follow pattern in @[ExistingService]."` |
| Safe refactor | `"Refactor @[file] for [reason]. DO NOT change public API, behavior, or callers."` |
| Write tests | `"Test @[file] > [function]. Cover: happy path, null input, network error, edge cases."` |
| Code review | `"/code-review — @git diff main or @[specific file]"` |
| PR description | `"@git diff main — write PR description: summary, changes, why, how to test"` |
| Analyze codebase | `"@codebase — [specific question about the architecture or patterns]"` |

---
---

# PART 35 — ANTI-PATTERNS: THE COMPLETE FAILURE MODE CATALOG

---

## The 15 Anti-Patterns

### 1. The Vague Ask
❌ `"Make it look better"` / `"Clean up this code"` / `"Fix the bug"`
✅ Name the exact element, file, and desired change

### 2. The Mega Prompt
❌ `"Build the entire onboarding: 5 screens, all API integrations, animations, tests"`
✅ One screen at a time. Validate each before proceeding.

### 3. Summarizing Errors
❌ `"Getting some kind of nil crash on the home screen"`
✅ Paste the complete stack trace. Every line. Every time.

### 4. Missing Stack Declaration
❌ `"Add a loading spinner"`
✅ Always specify: UIKit / SwiftUI / Compose / React Native / Web

### 5. No Negative Constraints
❌ `"Refactor AuthService.swift"`
✅ Add: "Do NOT change public function signatures. Do NOT modify callers."

### 6. Chaining Unrelated Tasks
❌ `"Fix the crash, then add dark mode, then write tests"`
✅ One task per prompt. Verify each. Then next.

### 7. Accepting First Output Without Review
❌ Generate → immediately accept
✅ Generate → run self-review prompt → check for crashes/leaks → then accept

### 8. No Pattern Reference
❌ `"Create a settings screen"`
✅ Always add: "Follow the exact pattern of @ProfileViewController.swift"

### 9. Wrong Mode for the Task
❌ Using Agent (Cmd+I) to change the color of a button
✅ Select the StyleSheet block → Cmd+K → `"Change color to #1A1A2E"`

### 10. Stale `.mdc` Rules
❌ Rules that describe an architecture you replaced 3 months ago
✅ Update rules whenever you change patterns, rename folders, or add/remove dependencies

### 11. Too Many MCP Servers Active
❌ All 6 MCP servers active at once (50+ tools)
✅ Enable only what you need for the current task. Stay under 40 tools.

### 12. No Plan for Complex Tasks
❌ Sending Agent straight to code on a 6-file feature
✅ Use Plan Mode (Shift+Tab) for anything touching 4+ files

### 13. Forgetting to Reference Existing Patterns
❌ `"Create a new service for notifications"`
✅ `"Create a notification service following the exact same pattern as @[ExistingService].swift"`

### 14. Ignoring Context Saturation
❌ Continuing a 2-hour chat session until the AI starts making mistakes
✅ `/summarize` then start a fresh session when the AI shows signs of confusion

### 15. YOLO Mode on Sensitive Systems
❌ YOLO mode enabled when working on auth, payments, or database code
✅ YOLO allowlist only — and never for anything that touches production data

---
---

# PART 36 — MASTER CHECKLISTS

---

## New Project Setup Checklist

```
□ Create .cursorignore (exclude build artifacts, dependencies, generated files)
□ Create .cursor/rules/core.mdc (alwaysApply: true — stack, architecture, structure)
□ Create platform .mdc files with glob patterns
□ Create .cursor/skills/ with create-screen and api-integration skills
□ Create .cursor/commands/ with: create-screen, write-tests, code-review, summarize, pr-description
□ Configure .cursor/mcp.json with relevant servers (stay under 40 tools)
□ Set up Figma MCP API key (~/.cursor/mcp.json)
□ Enable BugBot (team dashboard)
□ Create AGENTS.md at repo root
□ Create DEV_LOG.md
□ Create ARCHITECTURE.md
□ Enable Memories (Settings → Rules → Memories)
□ Set up .cursor/hooks/ (auto-format, command guard)
□ Configure YOLO allowlist if using YOLO mode
□ Run /Generate Cursor Rules and review output
□ Test rules loading: open a .swift/.kt/.tsx file → check Settings → Rules
```

## Per-Feature Checklist

```
BEFORE:
□ Fresh Agent chat
□ Paste Project Context Header
□ Reference closest existing pattern: @[file]
□ Plan Mode for 4+ file tasks
□ Approve plan before execution

DURING:
□ UI shell first (hardcoded data)
□ ViewModel/state second
□ API integration third
□ Edge cases (loading/error/empty) fourth
□ Navigation last

BEFORE MERGE:
□ /code-review — all 🔴 items resolved
□ Tests written (happy path + error case minimum)
□ /pr-description generated
□ BugBot passed (team projects)
□ DEV_LOG.md updated
□ If new pattern established → update .mdc rules
```

## Debugging Decision Tree

```
BUG REPORTED
     │
     ▼
Does it CRASH?
  YES → Paste full crash log template (Part 23.2)
  NO → Continue
     │
     ▼
Is the OUTPUT wrong (logic bug)?
  YES → Logic bug template (Part 23.3)
  NO → Continue
     │
     ▼
Is the LAYOUT broken?
  YES → Layout bug template (Part 23.4)
  NO → Continue
     │
     ▼
Is it SLOW / performance?
  YES → Performance bug template (Part 23.5)
  NO → Continue
     │
     ▼
Is it INTERMITTENT / hard to reproduce?
  YES → Debug Mode (Part 21) + Rubber Duck (Part 5.11)
  NO → Continue
     │
     ▼
Still stuck?
  → Parallel agents with 3 different debugging approaches
  → Tree of Thoughts for root cause analysis
  → @codebase search for similar patterns/bugs
```

---

*This is the complete definitive guide.*
*Total coverage: Every Cursor feature (Tab through Cloud Agents/Automations) + Every prompting technique + All platform templates + Complete configuration library.*
*Last updated: March 2026 · Cursor 2.4+ · iOS/Swift · Android/Kotlin · React Native · Next.js*
---
---

# ════════════════════════════════════════════════════════════════════
# SUPPLEMENT: EVERY MISSING FEATURE, TECHNIQUE & WORKFLOW — 2026 COMPLETE
# ════════════════════════════════════════════════════════════════════

> This supplement fills every gap identified from the official Cursor changelog,
> 2026 reviews, best-practices blogs, and the Cursor agent best-practices guide.
> After merging with PROMPTCRAFT_FINAL_DEFINITIVE.md, nothing is missing.

---

# SUPPLEMENT A — CURSOR FEATURES NOT YET COVERED

---

## A.1 — The Four Workspace Layouts (v2.3+)

Cursor ships four default workspace layouts switchable with `Cmd+Option+Tab`:

```
LAYOUT 1: AGENT  (default for most developers)
┌───────────────┬─────────────────────────────┐
│  File         │  Editor (main)              │
│  Explorer     ├─────────────────────────────┤
│               │  Agent Chat Panel           │
│  Agent        │  (full height, prominent)   │
│  Sidebar      │                             │
└───────────────┴─────────────────────────────┘
Best for: Any session where you're directing agents

LAYOUT 2: EDITOR  (focused coding)
┌───────────────┬─────────────────────────────┐
│  File         │  Editor (large, full focus) │
│  Explorer     │                             │
│               │                             │
│               │                             │
│               │  (chat minimized/sidebar)   │
└───────────────┴─────────────────────────────┘
Best for: Manual coding, reviewing diffs, reading code

LAYOUT 3: ZEN  (distraction-free)
┌─────────────────────────────────────────────┐
│                                             │
│              Editor only                   │
│        (everything else hidden)             │
│                                             │
└─────────────────────────────────────────────┘
Best for: Reading and understanding complex code, deep review

LAYOUT 4: BROWSER  (web development)
┌─────────────────┬───────────────────────────┐
│  Editor         │  Built-in Browser         │
│                 │  (side-by-side live view) │
│                 │  Multi-tab support        │
└─────────────────┴───────────────────────────┘
Best for: Web development with live preview, E2E debugging
```

**Keyboard shortcut:** `Cmd+Option+Tab` / `Cmd+Shift+Option+Tab` (reverse)

**When to switch layouts:**
- Starting a planning session → Agent layout
- Doing a detailed code review → Editor layout
- Understanding a complex unfamiliar codebase → Zen layout
- Working on frontend with live browser → Browser layout

---

## A.2 — Jupyter Notebook Integration

Cursor's Agent can create, edit, and execute Jupyter Notebook cells directly.

**Full capability:**
- Create new notebooks from scratch
- Add, edit, and reorder cells
- Run individual cells or entire notebooks
- Fix errors in cell output and iterate
- Convert Python scripts to notebooks and vice versa

**Prompting for Notebooks:**

```
# Create a new data analysis notebook
"Create a Jupyter notebook for analyzing [dataset].

Notebook structure:
1. Setup cell: imports (pandas, numpy, matplotlib, seaborn)
2. Data loading cell: load from [source/path]
3. Exploratory analysis: shape, dtypes, null counts, describe()
4. Visualization: [list charts needed]
5. Key findings cell: markdown summary of insights

Use markdown cells between code cells to explain each section."

# Debug a failing cell
"The cell at position [N] in @[notebook.ipynb] is failing with:
[paste error output]

Fix the error. The goal of this cell is: [describe intent].
Do not change cells above or below this one."

# Convert script to notebook
"Convert @analysis.py into a well-structured Jupyter notebook.
Split into logical sections, add markdown explanations between sections,
keep all existing logic intact."
```

---

## A.3 — Agent Conversation Sharing (Enterprise)

Enterprise feature: generate a read-only transcript of any agent conversation.

**Use cases:**
- Include in PR description: link to the agent session that built the feature
- Share with code reviewer: they can see every step the agent took
- Internal documentation: record of how a complex change was made
- Onboarding: show new team members how to work with agents

**How to use:**
```
Agent sidebar → three-dot menu on any conversation → "Share"
→ Generates a read-only URL
→ Share in PR description or Slack
```

---

## A.4 — Context Window Usage Indicator

Cursor now shows a real-time context usage indicator directly in the chat.

```
[Context usage bar visible in chat input area]

██████████░░░░░░░░░░  58% used

When you see this approaching 80-90%:
→ Use /summarize to condense history
→ Start a fresh session
→ Remove unnecessary @mentions

When it hits 100%:
→ Cursor auto-summarizes to let you continue
→ But: quality degrades — better to start fresh manually
```

**Behavior at 100%:** Cursor automatically summarizes older context so you can continue chatting. However, auto-summarization loses nuance. Manual fresh sessions with a context header are always better.

---

## A.5 — Agent Review Tab (+ Known Conflict Bug)

After an agent finishes, the "Review" button opens the Agent Review Tab — a full diff view of all proposed changes across all modified files.

**Using the Agent Review Tab:**
```
Agent finishes
    │
    ▼
Click "Review" button
    │
    ▼
Agent Review Tab opens
Shows: every file changed, with diff view
    │
    ├── "Find Issues" button → runs a dedicated review pass
    │   (AI re-reads all changes line-by-line for bugs/issues)
    │
    ├── Accept file-by-file (click ✓ per file)
    │
    ├── Accept all (click "Accept All")
    │
    └── Reject file-by-file or all
```

**⚠️ KNOWN BUG (as of Cursor 2.4):** A file-locking conflict between the Agent Review Tab and the editor causes code changes to silently revert in certain cases. The agent writes changes to disk (visible in `git diff`), but the IDE cache doesn't update.

**Workaround:**
```
1. Close the Agent Review Tab before clicking "Fix in Chat"
2. Disable "Format On Save" and Prettier auto-format during agent sessions
3. After any agent session, verify with: git diff
4. Use defensive commits: git add -A && git commit -m "agent-checkpoint"
   before starting each agent task
```

---

## A.6 — Source Control Agent Review

Beyond the in-chat Review button, Cursor has a "Agent Review" in the Source Control tab:

```
Source Control tab (Cmd+Shift+G)
    → "Agent Review" button
    → Compares ALL local changes against main branch
    → Full AI review of the entire working diff
    → More comprehensive than per-session review
```

**Best practice:** Run Source Control Agent Review before every PR, not just in-session review.

---

## A.7 — Multi-Tab Browser (Layout 4)

The built-in browser in Cursor 2.3+ supports multiple tabs:

```
Browser layout → "+" button in browser panel
→ Open multiple tabs
→ Tab 1: localhost:3000 (your running app)
→ Tab 2: localhost:3000/admin (admin panel)
→ Tab 3: localhost:6006 (Storybook)
→ Tab 4: https://api-docs.external.com

Cross-reference between tabs without leaving Cursor.
Agent can read from all open browser tabs.
```

---

## A.8 — Enterprise Insights & Billing Groups (v Enterprise, Dec 2025)

For enterprise teams, Cursor now provides:

**Insights:** Cursor analyzes the code and context in each agent session to understand the type of work being done. Categories include:
- Feature development
- Bug fixing
- Refactoring
- Code review
- Documentation
- Testing

Teams can extend these categories. No PII or sensitive data is collected.

**Billing Groups:** Separate billing pools for different teams/departments within an enterprise. Assign budget limits per group.

**Service Accounts:** Non-personal accounts for CI/CD automations, BugBot policies, and pipeline integrations.

---

## A.9 — Graphite Acquisition — Code Review Integration (2026)

Cursor acquired Graphite (Dec 22, 2025) — a code review platform used by hundreds of thousands of engineers.

**What this means:**

```
CURRENT (early 2026):
Cursor IDE ←──── BugBot PR review
Graphite ←──── Human code review platform
(Operating independently)

PLANNED INTEGRATION:
Cursor IDE ←──── BugBot AI review
     +
Graphite code review ←──── Cursor local context
= Unified review experience connecting local development to PRs
```

**Why it matters:** Code review, not code generation, is the next bottleneck. With Graphite integrated, the goal is that opening a PR in Graphite will have full context from the agent sessions that built it — who made what decisions, why, and what alternatives were considered.

---

## A.10 — JetBrains ACP (Cursor in JetBrains IDEs)

Cursor's Agent Coordination Protocol (ACP) allows Cursor's agent to run inside JetBrains IDEs (IntelliJ IDEA, PyCharm, WebStorm, Android Studio).

```
Install: JetBrains AI chat → "Install Cursor ACP"
Auth: Use existing Cursor account
Plans: Free for all paid Cursor plans

What works in JetBrains with Cursor ACP:
✓ Agent mode
✓ Plan Mode
✓ MCP servers
✓ Rules
✓ Codebase context

What doesn't transfer:
✗ Tab autocomplete (JetBrains uses its own)
✗ Inline edit (Cmd+K equivalent is IDE-dependent)
✗ Browser integration
```

**For Android development specifically:** Android Studio (JetBrains-based) can now run Cursor's agent natively — you get Cursor's full agent capability without switching IDEs.

---

## A.11 — The Long-Running Agent Drift Problem (and Fix)

**The drift problem:** In long agent sessions (>2 hours or >50 tool calls), the agent's mental model gradually diverges from the actual disk state. It starts calling functions that don't exist or referencing old file states.

```
DRIFT SYMPTOMS:
- Agent says it added a function that doesn't exist in the file
- Agent references a variable that was renamed 30 steps ago
- Agent generates code that imports from files it deleted earlier
- Agent creates duplicate functions because it "forgot" it already made them

ROOT CAUSE:
The agent tracks file state through its tool call history.
Over many operations, this history gets stale or truncated.
The agent's understanding of the codebase diverges from reality.
```

**Prevention strategies:**

```
1. TIME LIMIT: Keep agent sessions under 2 hours
   After 2 hours, start fresh with /summarize

2. CHECKPOINT COMMITS: After every significant milestone:
   git add -A && git commit -m "checkpoint: [what was done]"
   This gives the agent a clean baseline to reference

3. FORCED RE-INDEX: Periodically in long sessions:
   "Re-read @[file-you-just-modified] and confirm its current state."
   Forces the agent to re-read from disk, not from memory

4. SCOPE LIMITS: Never give an agent >8 files to modify in one task
   Split large tasks into 2-3 smaller agent sessions

5. VERIFY BEFORE CONTINUING:
   "Before proceeding: read @[last-modified-file] and confirm
    the current state matches what you believe you implemented."
```

---

## A.12 — Test-Driven Development (TDD) with Cursor

TDD with Cursor is one of the highest-quality workflows possible. The test acts as the specification — the agent cannot diverge from it.

```
TDD WORKFLOW WITH CURSOR:

STEP 1: Write the failing test first
"Write a failing unit test for [function/feature].

Test should verify:
- [specific behavior 1]
- [specific behavior 2]
- [edge case: null input]
- [edge case: error condition]

Do NOT implement the function. Only the test.
Test should fail with: 'function does not exist' or similar.
File: [test path]"

STEP 2: Implement until tests pass
"Read @[test file].
Implement [function] in @[source file] to make all tests pass.

Rules:
- Make only the tests pass — do not over-implement
- Do not modify the test file
- Run tests after implementation

Done when: all tests in @[test file] pass."

STEP 3: Refactor safely
"All tests pass. Now refactor @[source file] for clarity.
Rules:
- All tests must still pass after refactoring
- Run tests before showing me the final result
- Do NOT change the function's public interface"
```

**Why TDD works so well with Cursor:**
- The test is the exact specification — no ambiguity
- The agent has a verifiable done criterion (tests pass)
- You can refactor freely knowing the tests guard behavior
- The autonomous loop (implement → test → fix → test) runs entirely in the agent

---

## A.13 — Git Operations as Agent Tasks

Cursor's agent can handle most git operations through the terminal. These are underused agent tasks:

```
# Intelligent commit message generation
"@git diff --staged
 Write a conventional commit message for these staged changes.
 Format: type(scope): description
 Types: feat, fix, refactor, test, docs, chore, perf
 Scope: the module/feature affected
 Description: under 72 chars, present tense
 
 If changes are too large for one commit, suggest how to split them."

# Branch management
"Create a new branch called feature/[feature-name].
 Base it off the latest main.
 Push to origin."

# Changelog generation
"Read @git log --oneline v1.2.0..HEAD
 Generate a CHANGELOG.md entry for version 1.3.0.
 Format: Added / Changed / Fixed / Deprecated / Removed sections.
 Only include user-visible changes, not internal refactors."

# Pre-merge conflict resolution
"@git diff main...HEAD
 There are merge conflicts in: @[file1], @[file2].
 Read both the incoming changes and the current state.
 Resolve the conflicts, preserving the intent of both changes.
 Explain your resolution decisions."
```

---

## A.14 — Architecture Diagram Generation

Cursor can generate architecture diagrams as Mermaid code, which renders inline in chat:

```
"Analyze @[module-folder] and generate:

1. A Mermaid class diagram showing:
   - All classes and their relationships
   - Key properties and methods
   - Inheritance and composition relationships

2. A Mermaid sequence diagram showing:
   - The main user flow: [describe flow]
   - All service calls in order
   - Error handling paths

3. A Mermaid flowchart showing:
   - The state machine for [feature]
   - All transitions and triggers

Render all three as Mermaid diagrams."
```

**Other diagram types Cursor can generate:**
```
Mermaid flowchart      → feature/algorithm logic
Mermaid sequence       → API call flows, auth flows
Mermaid class          → OOP architecture
Mermaid ER diagram     → database schema
Mermaid gitGraph       → branching strategy
Mermaid stateDiagram   → state machines (auth states, order states)
Mermaid mindmap        → feature tree/hierarchy
```

---

---

# SUPPLEMENT B — ADVANCED PROMPTING TECHNIQUES (NEWLY RESEARCHED)

---

## B.1 — The Reconnaissance-First Doctrine

From the Cursor agent best-practices guide: the most impactful behavior difference between novice and expert Cursor users is **research before action**. The agent must never act on assumptions.

**The Doctrine principle:**
```
BEFORE every non-trivial implementation, the agent must:

1. READ the current state of relevant files
2. UNDERSTAND the existing patterns (don't invent new ones)
3. IDENTIFY all callers/dependents of what you're changing
4. VERIFY assumptions (is that function actually exported? does that file exist?)
5. ONLY THEN: write code

Prompt enforcement:
"Before writing any code, perform a reconnaissance pass:
 1. Read @[files that will be modified]
 2. Read @[files that call/import from modified files]
 3. @codebase search for [function/class being modified]
 4. State your understanding of the current system
 5. State your assumptions
 6. State what could break
 Then: write the implementation."
```

---

## B.2 — The Verifiable Goals Pattern

<CITE from official Cursor docs:> "Agents can't fix what they don't know about. Use typed languages, configure linters, and write tests. Give the agent clear signals for whether changes are correct."

The verifiable goals pattern makes every task have a machine-checkable done criterion:

```
WEAK (unverifiable):
"Add error handling to the login flow."

STRONG (verifiable):
"Add error handling to the login flow.

Done criteria (agent verifies all before reporting complete):
✓ npx tsc --noEmit returns 0 errors
✓ npm run test -- --testPathPattern=auth passes
✓ The following are handled with typed errors:
  - NetworkError → shows 'Connection failed. Try again.' toast
  - AuthError → shows 'Wrong email or password.' toast
  - RateLimitError → shows 'Too many attempts. Wait 30s.' toast
✓ No try/catch block swallows errors silently
✓ Console shows no unhandled promise rejections"
```

**Types of verifiable signals:**
- TypeScript: `npx tsc --noEmit` → 0 errors
- Linting: `npx eslint . --max-warnings 0` → 0 warnings
- Tests: `npm test` → all pass
- Build: `npm run build` → succeeds
- Swift: `swift build` → 0 errors
- Android: `./gradlew assembleDebug` → BUILD SUCCESSFUL

---

## B.3 — The "Give It Something to Copy" Pattern

The single most effective technique for getting consistent, idiomatic output:

```
INSTEAD OF:
"Create an error handling service"

DO THIS:
"Create an error handling service.
 
 Use the EXACT same pattern as @UserService.ts.
 Specifically copy:
 - The class structure (constructor, injected dependencies)
 - The logging pattern (using this.logger.error())
 - The error categorization approach (typed error classes)
 - The retry logic structure (exponential backoff)
 
 Differences only:
 - Name: ErrorHandlingService
 - Methods: handleNetworkError(), handleAuthError(), handleValidationError()
 - Error source: all incoming errors (not just user-related)"
```

This works because:
1. The model sees exactly what "correct" looks like for your project
2. No ambiguity about style choices, naming conventions, or patterns
3. The output will slot into your codebase without stylistic friction

---

## B.4 — The Specificity Ladder

Specificity directly correlates with agent success rate. Every vague word is an opportunity for misinterpretation.

```
SPECIFICITY LADDER (worst → best):

Level 1 (Vague):
"Add tests for auth.ts"

Level 2 (Better):
"Write unit tests for the auth module"

Level 3 (Good):
"Write unit tests for @auth/auth.service.ts"

Level 4 (Better):
"Write unit tests for @auth/auth.service.ts
 covering the login() and logout() methods"

Level 5 (Excellent):
"Write a unit test for @auth/auth.service.ts covering the
 logout() edge case where the user's session has already
 expired. Use the patterns in @__tests__/user.test.ts.
 Avoid mocks — use the test database helper in @test-utils/db.ts"

Level 5 is ~3× more likely to produce usable output on first attempt.
```

---

## B.5 — The Operational System Pattern (Mission Briefings)

For complex, multi-session projects, use a complete operational system with a doctrine, playbooks, and retrospectives. This is the professional-grade equivalent of CI/CD for AI workflows.

**The three-file system:**

```
.cursor/
  DOCTRINE.md         ← The standing rules (applies every session)
  playbooks/
    feature.md        ← Template for building features
    bugfix.md         ← Template for fixing bugs
    refactor.md       ← Template for refactoring
    review.md         ← Template for code reviews
  retro.md            ← Running log of lessons learned
```

**DOCTRINE.md example:**
```markdown
# Agent Doctrine

## Foundational Principles
1. Research-First: Never act on assumption. Read before writing.
2. Extreme Ownership: Own the health of the entire system, not just the task.
3. Autonomous Problem-Solving: Exhaust all research before escalating.
4. Minimal Footprint: Make the smallest change that fulfills the requirement.
5. Verify Completion: Run verifiable checks before declaring done.

## Status Markers (use in all reports)
✅ COMPLETE — verified done
🔄 IN PROGRESS — currently executing
⚠️ BLOCKED — needs human input
❌ FAILED — attempted, failed, here's why

## Clarification Threshold
Ask only when: the answer fundamentally changes the approach.
If uncertain: state your assumption, proceed, flag it in the report.

## Pre-Task Checklist
Before writing any code:
- Read all files to be modified
- Identify all callers/dependents
- State understanding of current system
- State assumptions and risks
```

**Playbook template (feature.md):**
```markdown
# Feature Playbook

## Phase 1: Reconnaissance
- Read: @[relevant files]
- Search: @codebase for patterns related to this feature
- Identify: files to create / modify / avoid

## Phase 2: Plan
- Files to create (name, purpose)
- Files to modify (specific changes)
- Execution order
- Risk assessment

## Phase 3: Execute (one file at a time)
- Create/modify file N
- Run: [verification command]
- Confirm: output is as expected
- Proceed to file N+1 only when N is verified

## Phase 4: Integration
- All files complete?
- Compile check?
- Tests pass?
- Conventions followed?

## Phase 5: Report
Status: ✅/❌
Completed: [list]
Issues found: [list]
Recommended next steps: [list]
```

**Retrospective pattern (retro.md):**
```markdown
# Retrospective Log

## [Date] — [Task]
What worked: [describe]
What didn't: [describe]
Lesson learned: [specific lesson]
Doctrine update needed: [yes/no — what change]
```

---

## B.6 — The Agent Persistence Pattern

For agentic tasks where the agent might quit early, explicitly instruct persistence:

```
"Keep going until the task is completely resolved before stopping.

If you encounter:
- An error → diagnose and fix, don't stop
- An ambiguity → state your assumption and proceed
- A test failure → fix the failure and run again
- An unclear requirement → pick the most reasonable interpretation, document it

Do NOT:
- Ask me questions mid-task (complete the task, then surface questions)
- Stop because of uncertainty (document the uncertainty, proceed)
- Declare complete until all verifiable criteria are met

Report format when done:
✅ COMPLETE
What was done: [list]
Assumptions made: [list]
Things to verify manually: [list]"
```

---

## B.7 — The Explicit Exploration Pattern

For large unfamiliar codebases, direct the agent to explore strategically:

```
"Explore the @[folder] directory.

Exploration strategy:
1. Start broad: what are all the top-level modules?
2. Find the entry point: how does data flow into this system?
3. Find the exit point: how does data flow out?
4. Find the key abstractions: what are the main interfaces/protocols?
5. Find the patterns: what architecture pattern is used?

After exploration, produce:
- A map of the module (files → purpose)
- The main data flow (narrative)
- Key patterns to follow when adding new code
- Files I should NOT touch (critical shared infrastructure)

Then: [describe actual task]"
```

---

## B.8 — Prompt for Architecture Diagrams from Agent Sessions

New in Cursor (mentioned in best practices guide): request architecture diagrams as part of any complex implementation:

```
"Create a Mermaid diagram showing the data flow for our 
authentication system, including all services, state transitions,
and API calls. Include error paths."
```

This serves three purposes:
1. Verifies the agent understands the architecture correctly (if the diagram is wrong, the code will be wrong)
2. Creates documentation you can use in the PR
3. Reveals gaps in the architecture before they become bugs

---

## B.9 — The Conventional Commits Pattern

Have the agent enforce commit hygiene:

```
# In your .mdc rules or AGENTS.md:
## Commit Messages
Use Conventional Commits format:
- feat: new feature
- fix: bug fix
- refactor: code restructure (no behavior change)
- test: adding/modifying tests
- docs: documentation only
- chore: build, tooling, CI
- perf: performance improvement
Keep subject under 72 characters, present tense.
Body (optional): explain WHY, not what.

# When asking agent to commit:
"Commit the current staged changes.
 Use Conventional Commits format.
 Write the commit message based on what was actually changed.
 Do not use generic messages like 'update files'."
```

---

## B.10 — The "Don't Apologize, Fix It" Rule

Add to your `.mdc` rules or User Rules:

```markdown
## AI Behavior Rules
- When you make an error: fix it. Do not apologize.
- When code is incomplete: add TODO with specific description. Do not leave placeholders.
- When uncertain: state the uncertainty inline as a comment. Do not ask.
- When something might be wrong: flag it. Do not silently omit it.
- When I ask for a specific format: use that format exactly. Do not add unsolicited commentary.
- Do not use phrases like "Certainly!", "Of course!", "I'd be happy to"
- Go straight to the work. Preamble wastes context.
```

---

## B.11 — URL-Based Documentation Injection

For libraries released after the model's knowledge cutoff, inject documentation directly:

```
# Method 1: Via @web
@web "https://docs.newlibrary.com/api/v2/getting-started"
Implement [feature] using the API documented at this URL.
Use only what's in the documentation — not your training data.

# Method 2: Via Context7 MCP
"Using Context7, get current docs for [library] version [X.Y.Z]
 Implement [feature] using only the documented API."

# Method 3: Via gitingest
@web "https://gitingest.com/[owner]/[repo]"
"Understand the API from this repo summary.
 Implement [feature] following the patterns you observe."
```

---

## B.12 — The Collaborative AI Workflow (Multi-Model)

For the most complex tasks, use different AI surfaces for different roles:

```
MULTI-MODEL WORKFLOW:

Role 1: Claude (Cursor chat) — Architecture design
"Think through the architecture for [feature].
 Consider: scalability, maintainability, existing patterns.
 Propose an approach. Don't write code yet."

Role 2: Cursor Agent (Composer) — Implementation
"Implement the architecture proposed:
 [paste Claude's proposal]
 Follow all rules in .mdc files."

Role 3: Cursor Agent (Opus) — Review
"Review @[implemented files].
 Check against the proposed architecture.
 Find deviations, bugs, and missing cases."

Role 4: GPT-5 (for second opinion) — Alternative view
"Review @[implemented files] for:
 - Security vulnerabilities
 - Performance issues
 - Alternative implementations worth considering"
```

---

---

# SUPPLEMENT C — MISSING PLATFORM WORKFLOWS

---

## C.1 — iOS: Instruments Profiling Workflow

```
"Profile @[ViewController].swift for performance issues.

Use Instruments to check:
1. Time Profiler: is [function] taking >16ms on main thread?
2. Allocations: are there objects being created on every scroll frame?
3. Leaks: any retain cycles in closures?
4. Core Animation: any offscreen rendering (shouldRasterize, masks)?

Add profiling comments before I run Instruments manually:
// PROFILE: Check if this is on main thread
// PROFILE: Check for retain cycle here
// PROFILE: This might allocate excessively"
```

---

## C.2 — Android: Compose Performance Profiling

```
"Analyze @[ScreenComposable].kt for recomposition performance.

Check for:
1. State reads inside composable that force full recomposition
   (should be read in the lambda, not in the composable body)
2. Unstable parameters causing unnecessary recomposition
   (non-stable types not wrapped in @Stable or @Immutable)
3. Heavy computations inside composable body
   (should be in remember {} blocks)
4. Missing keys in LazyColumn items
5. Animations that could use rememberUpdatedState

Produce:
- List of recomposition hotspots with explanation
- Fixed code with comments explaining each optimization
- Verify: add recomposition counters for the 3 most impactful items"
```

---

## C.3 — React Native: New Architecture Migration

```
"Audit @[module] for New Architecture compatibility.

Check for:
1. Synchronous native module calls (must become async or JSI)
2. Any reliance on the bridge (NativeModules.X.method())
3. Custom ViewManager components not yet updated to Fabric
4. AsyncStorage direct usage (migrate to MMKV or similar)
5. InteractionManager.runAfterInteractions (deprecated pattern)

For each issue:
- File + line
- Current pattern (incompatible)
- New Architecture equivalent pattern
- Migration effort: S/M/L

Produce a migration plan ordered by effort (smallest first)."
```

---

## C.4 — Next.js: Server Actions Pattern

```
"Create a Server Action for [form/mutation].

File: app/actions/[name].ts
Requirements:
- 'use server' at top of file
- Validate all input with Zod before processing
- Return type: { success: boolean; data?: T; error?: string }
- Error messages must be user-safe (no stack traces to client)
- Log full error server-side with full context
- Revalidate: [path or tag to invalidate]

Follow pattern from: @app/actions/[existing-action].ts"
```

---

---

# SUPPLEMENT D — THE COMPLETE KEYBOARD SHORTCUT MASTER REFERENCE

---

## D.1 — Updated Complete Shortcut Table

```
CORE EDITING
─────────────────────────────────────────────────────────────────────
Cmd+K              Inline edit (selection) — apply changes to selected code
Cmd+Shift+K        Inline edit entire file — apply to whole file
Cmd+L              Open / focus Chat panel
Cmd+I              Open / focus Agent panel (Composer)
Cmd+Shift+I        New Agent session (fresh chat)
Escape             Close chat / cancel current suggestion

AGENT CONTROL
─────────────────────────────────────────────────────────────────────
Shift+Tab          Toggle Plan Mode (inside Agent input)
Cmd+E              Launch Background Agent
Cmd+Z              Undo agent changes (per-agent)
Click "Stop"       Cancel running agent mid-task
Click "Review"     Open Agent Review Tab (diff all changes)
Click "Find Issues" Run AI review pass on agent's changes

CONTEXT & MENTIONS
─────────────────────────────────────────────────────────────────────
@                  Open mention picker (files, codebase, web, etc.)
Cmd+Shift+L        Add selected code to current chat context
/                  Open command picker (custom commands)

WORKSPACE LAYOUTS
─────────────────────────────────────────────────────────────────────
Cmd+Option+Tab     Cycle forward through layouts (Agent→Editor→Zen→Browser)
Cmd+Shift+Option+Tab  Cycle backward through layouts

NAVIGATION (standard VS Code shortcuts still work)
─────────────────────────────────────────────────────────────────────
Cmd+P              Quick file open
Cmd+Shift+P        Command palette
Cmd+Shift+G        Source Control (git)
Cmd+`              Toggle terminal
Cmd+B              Toggle sidebar
Cmd+Shift+E        Explorer
Cmd+Shift+F        Global search
Cmd+Shift+X        Extensions

CLI (from terminal)
─────────────────────────────────────────────────────────────────────
cursor agent "..."      Run agent task from CLI
cursor /[command]       Run a custom command
cursor mcp enable X     Enable MCP server
cursor mcp disable X    Disable MCP server
cursor rules            Manage rules
cursor agent --model X  Specify model for CLI task
```

---

---

# SUPPLEMENT E — THE COMPLETE ANTI-PATTERN ADDITIONS

---

## E.1 — The Long Session Trap
❌ Working in the same agent chat for 3+ hours
✅ Sessions under 2 hours. `/summarize` then start fresh.

## E.2 — YOLO Mode on Sensitive Code
❌ YOLO mode with no allowlist on auth/payments/database code
✅ Explicit allowlist of safe commands only. Never auto-approve DB operations.

## E.3 — Not Verifying Agent Changes
❌ Agent finishes → "Accept All" without reviewing
✅ Always: Review → Find Issues → check 🔴 items → git diff → then accept

## E.4 — Forgetting the Drift Problem
❌ Continuing a 50+ tool-call agent session without checkpoints
✅ `git add -A && git commit -m "checkpoint"` after every significant milestone

## E.5 — Vague Done Criteria
❌ "Make the tests pass"
✅ Specify the exact commands: "Done when `npm test -- --testPathPattern=auth` exits 0"

## E.6 — Ignoring Context Window Indicator
❌ Continuing past 80% context window usage
✅ At 80%: `/summarize` then start fresh session

## E.7 — Too Many Active MCP Servers
❌ 6+ MCP servers all active = 60+ tools = agent confusion
✅ Enable only what you need per task. Stay under 40 tools.

## E.8 — Using Wrong Layout for Task
❌ Reading complex code in Agent layout (distracting UI)
✅ Switch to Zen or Editor layout with `Cmd+Option+Tab`

## E.9 — Skipping Architecture Diagrams on Complex Tasks
❌ Implementing a complex feature without verifying the agent's understanding
✅ "Before writing code, generate a Mermaid diagram of the architecture you plan to implement"

## E.10 — Treating Cursor Like a Search Engine
❌ "What is the best state management library for React Native?"
✅ Cursor is for BUILDING your software. Use `@web` for research when needed, but the primary value is agentic execution on YOUR codebase.

---

---

# SUPPLEMENT F — THE TDD + AUTONOMOUS LOOP MASTER WORKFLOW

The most powerful complete workflow combining TDD, verifiable goals, and the autonomous loop:

```
PHASE 1: SPEC (5 minutes)
──────────────────────────────────────────────────────────────────────
"Write a specification for [feature] as executable acceptance tests.
 
 For each user story, write a test that will PASS when the feature is complete.
 Use: [test framework]
 
 User stories:
 - As a user, I can [action 1]
 - As a user, I can [action 2]
 
 Do NOT implement anything. Tests only.
 Tests should fail right now with 'not implemented'."

PHASE 2: IMPLEMENT (autonomous loop)
──────────────────────────────────────────────────────────────────────
"Make all tests in @[spec file] pass.

Loop until all tests pass:
1. Run: [test command]
2. If any fail: diagnose the failure, fix the root cause
3. Run again
4. Repeat

Rules:
- Do NOT modify the test file
- Only modify @[source files]
- Use the pattern from @[existing similar feature]
- Follow all .mdc rules

Maximum 8 iterations. If not passing after 8: stop and report what's blocking."

PHASE 3: HARDEN (quality gate)
──────────────────────────────────────────────────────────────────────
"All acceptance tests pass. Now harden the implementation.

Check and fix:
1. TypeScript: npx tsc --noEmit → 0 errors
2. Lint: npx eslint . --max-warnings 0 → 0 warnings
3. Null safety: any force unwrap or non-null assertion?
4. Error handling: any try/catch that swallows errors?
5. Loading/error/empty states: all handled in UI?

Fix all issues found. Report final state."

PHASE 4: REVIEW
──────────────────────────────────────────────────────────────────────
"/code-review"
[BugBot on PR]
```

This workflow produces the highest-quality first-time output of any approach and works across all platforms.

---

*End of Supplement — merge with PROMPTCRAFT_FINAL_DEFINITIVE.md for the complete master guide.*
