import rawGuide from './guide.md?raw'
import type { Part, Section, CodeBlock, ParsedGuide, Technique, Platform, MCPServer, Workflow } from './types'

// ─── Markdown Parser ──────────────────────────────────────────────────────────

function extractCodeBlocks(text: string): { code: CodeBlock[], mermaid: string[], cleaned: string } {
    const code: CodeBlock[] = []
    const mermaid: string[] = []
    let cleaned = text

    const codeBlockRegex = /```(\w*)\n?([\s\S]*?)```/g
    let match: RegExpExecArray | null

    const blocks: Array<{ full: string; lang: string; content: string }> = []
    while ((match = codeBlockRegex.exec(text)) !== null) {
        blocks.push({ full: match[0], lang: match[1] || 'text', content: match[2] })
    }

    for (const b of blocks) {
        if (b.lang === 'mermaid') {
            mermaid.push(b.content.trim())
        } else {
            code.push({ lang: b.lang, code: b.content.trim() })
        }
        cleaned = cleaned.replace(b.full, '')
    }

    return { code, mermaid, cleaned }
}

function extractTables(text: string): string[] {
    const tables: string[] = []
    const tableRegex = /(\|[^\n]+\|\n)+/g
    let match: RegExpExecArray | null
    while ((match = tableRegex.exec(text)) !== null) {
        tables.push(match[0].trim())
    }
    return tables
}

function slugify(text: string): string {
    return text.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()
}

function parseParts(): Part[] {
    const lines = rawGuide.split('\n')
    const parts: Part[] = []
    let currentPart: Part | null = null
    let currentSection: Section | null = null
    let contentLines: string[] = []

    function flushSection() {
        if (currentSection && currentPart) {
            const rawContent = contentLines.join('\n').trim()
            const { code, mermaid, cleaned } = extractCodeBlocks(rawContent)
            const tables = extractTables(rawContent)
            currentSection.content = cleaned.trim()
            currentSection.codeBlocks = code
            currentSection.mermaidBlocks = mermaid
            currentSection.tables = tables
            currentPart.sections.push(currentSection)
        }
        contentLines = []
    }

    function flushPart() {
        flushSection()
        currentSection = null
        if (currentPart) {
            parts.push(currentPart)
        }
    }

    const categoryMap: Record<string, string> = {
        'FOUNDATION': 'Foundation',
        'PROMPTING SCIENCE': 'Prompting Science',
        'CURSOR MODES': 'Cursor Modes & Workflows',
        'RULES': 'Rules, Skills & Commands',
        'MCP ECOSYSTEM': 'MCP Ecosystem',
        'AGENT INTELLIGENCE': 'Agent Intelligence',
        'PLATFORM PROMPTS': 'Platform Prompts',
        'ADVANCED OPERATIONS': 'Advanced Operations',
        'CONFIGURATION LIBRARY': 'Configuration Library',
        'SUPPLEMENT': 'Supplement',
    }

    let currentCategory = 'Foundation'

    for (const line of lines) {
        // Detect category headers (### CATEGORY NAME)
        for (const [key, val] of Object.entries(categoryMap)) {
            if (line.includes(key)) {
                currentCategory = val
            }
        }

        // PART heading: # PART N — TITLE
        const partMatch = line.match(/^#\s+PART\s+(\d+)\s+[—–-]+\s+(.+)/)
        // Also match supplement parts
        const suppMatch = line.match(/^#\s+SUPPLEMENT\s+([A-Z])\s+[—–-]+\s+(.+)/)

        if (partMatch || suppMatch) {
            flushPart()
            const partNum = partMatch ? parseInt(partMatch[1]) : 36 + (suppMatch![1].charCodeAt(0) - 65 + 1)
            const partTitle = partMatch ? partMatch[2].trim() : `Supplement ${suppMatch![1]}: ${suppMatch![2].trim()}`
            currentPart = {
                id: partNum,
                title: partTitle,
                category: currentCategory,
                sections: [],
                description: '',
            }
            currentSection = null
            continue
        }

        // Section heading: ## N.N — TITLE
        const sectionMatch = line.match(/^#{2,4}\s+(\d+\.[0-9A-Za-z]+.*?|[A-Z]\.\d+.+?)\s+[—–-]+\s+(.+)/)
        // Also match section headings without dash
        const sectionMatch2 = line.match(/^#{2}\s+(.+)/)

        if (sectionMatch && currentPart) {
            flushSection()
            const secId = slugify(`${currentPart.id}-${sectionMatch[2]}`)
            currentSection = {
                id: secId,
                title: sectionMatch[2].trim(),
                level: 2,
                content: '',
                codeBlocks: [],
                mermaidBlocks: [],
                tables: [],
                partId: currentPart.id,
            }
            continue
        } else if (sectionMatch2 && currentPart && !sectionMatch) {
            const titleText = sectionMatch2[1].trim()
            // Skip MASTER TABLE OF CONTENTS and similar headings
            if (!titleText.includes('TABLE OF CONTENTS') && !titleText.includes('PART ') && !titleText.includes('SUPPLEMENT')) {
                flushSection()
                const secId = slugify(`${currentPart.id}-${titleText}`)
                currentSection = {
                    id: secId,
                    title: titleText,
                    level: 2,
                    content: '',
                    codeBlocks: [],
                    mermaidBlocks: [],
                    tables: [],
                    partId: currentPart.id,
                }
                continue
            }
        }

        if (currentPart) {
            contentLines.push(line)
        }
    }

    flushPart()
    return parts
}

// ─── Techniques ───────────────────────────────────────────────────────────────

const TECHNIQUES: Technique[] = [
    {
        id: 'zero-shot-direct',
        name: 'Zero-Shot Direct Prompting',
        description: 'The base technique. No examples, no chain-of-thought. Just a clear, structured instruction. Effective for simple well-defined tasks.',
        category: 'zero-shot',
        complexity: 'Low',
        whenToUse: 'Simple, well-defined tasks. Adding a single UI element, renaming a variable, converting a function. Best when requirements are explicit and unambiguous.',
        template: `You are a senior [iOS/Android/React Native/Web] engineer.
In @[filename], the [function/class] currently [describe current behavior].
[Precise verb: Convert/Add/Fix/Refactor] it to [desired behavior].
Keep: [what to preserve].
Do not change: [what not to touch].`,
        platforms: ['all'],
        partRef: 5,
    },
    {
        id: 'role-persona',
        name: 'Role / Persona Prompting',
        description: 'Assigning an expert identity changes the vocabulary, depth, and decision-making style. A security engineer will focus on validation; a performance engineer on O(n) complexity.',
        category: 'zero-shot',
        complexity: 'Low',
        whenToUse: 'When you need domain-specific expertise, security audits, performance optimization, or API design decisions.',
        template: `You are a [expert role] with [N] years of [specific domain] experience.
You specialize in [specific expertise].
Your primary concern is [what this expert prioritizes].

[Task description]

Focus on: [domain-specific concerns]`,
        platforms: ['all'],
        partRef: 5,
    },
    {
        id: 'few-shot',
        name: 'Few-Shot Prompting',
        description: 'Providing 1-2 examples of the exact pattern you want is the most effective technique for maintaining code consistency across a codebase.',
        category: 'few-shot',
        complexity: 'Low',
        whenToUse: 'Creating multiple similar components, API functions, data models. When you need strict pattern consistency with existing code.',
        template: `Here is exactly how [components/functions/services] are structured in this project:

EXAMPLE:
\`\`\`[lang]
[paste existing code example]
\`\`\`

Now create similar [components] using IDENTICAL pattern:

1. [Name 1] - [brief description]
   [Specific differences only]

2. [Name 2] - [brief description]
   [Specific differences only]

Match: [naming style, error handling, patterns, async style].`,
        platforms: ['all'],
        partRef: 5,
    },
    {
        id: 'chain-of-thought',
        name: 'Chain-of-Thought (CoT)',
        description: 'Forces the model to reason through a problem step-by-step before producing output. Dramatically improves accuracy on complex architectural and debugging tasks.',
        category: 'reasoning',
        complexity: 'Medium',
        whenToUse: 'Complex bugs, architecture decisions, refactoring strategy, anything where the "why" matters as much as the "what".',
        template: `Before writing any code, work through these steps:

Step 1: What does the current code in @[file] actually do?
Step 2: What is the root cause of [problem]?
Step 3: What are the possible approaches to fix it?
Step 4: What are the tradeoffs of each approach?
Step 5: Which approach fits our architecture in @[pattern file]?
Step 6: What could break if I implement the chosen approach?

After completing all steps: write the implementation.`,
        platforms: ['all'],
        partRef: 5,
    },
    {
        id: 'tree-of-thoughts',
        name: 'Tree of Thoughts (ToT)',
        description: 'Explores multiple reasoning branches simultaneously. Use when a problem has multiple viable solutions and you want to compare approaches before committing.',
        category: 'reasoning',
        complexity: 'High',
        whenToUse: 'Architecture decisions with multiple valid paths, technology selection, major refactoring strategies where tradeoffs matter.',
        template: `Approach this problem by exploring three distinct solutions in parallel.

Problem: [describe the problem]
Context: @[relevant files]

For each approach:
1. Describe the approach in 2 sentences
2. Show a rough code sketch (pseudo-code or key functions)
3. List pros: what this approach does well
4. List cons: risks, limitations, maintenance burden
5. Score: rate 1-10 for our specific project context

After all three: recommend one and explain why.
Then implement only the recommended approach.`,
        platforms: ['all'],
        partRef: 5,
    },
    {
        id: 'self-consistency',
        name: 'Self-Consistency Prompting',
        description: 'Generate multiple independent solutions using parallel agents and compare them. Reduces variance and identifies the most robust solution.',
        category: 'reasoning',
        complexity: 'High',
        whenToUse: 'High-stakes implementations, security-critical code, performance-sensitive features where multiple approaches need comparison.',
        template: `[Use 3 parallel agents — open three Cmd+I windows]

Agent 1 — Conservative approach:
"Implement [feature]. Prioritize: minimal code change, lowest risk,
 most consistent with current codebase patterns. Use @[existing pattern]."

Agent 2 — Best practices approach:
"Implement [feature]. Prioritize: correctness, comprehensive error handling,
 full edge case coverage, clean architecture."

Agent 3 — Pragmatic approach:
"Implement [feature]. Prioritize: fastest to ship, most readable for the team,
 easiest to maintain."

After all three complete:
"Compare the three implementations. Recommend which to use and why."`,
        platforms: ['all'],
        partRef: 5,
    },
    {
        id: 'react',
        name: 'ReAct (Reason + Act)',
        description: 'The pattern behind how Cursor\'s Agent works internally. Interleave thinking with tool use — read, observe, reason, then act.',
        category: 'reasoning',
        complexity: 'Medium',
        whenToUse: 'Debugging sessions, codebase exploration, understanding unfamiliar code, root cause analysis for complex bugs.',
        template: `Solve this problem using a Reason → Act → Observe loop.

Problem: [describe]

Before any action:
- State what you need to know
- State what file/tool will give you that information
- Execute that action
- State what you observed
- State your next thought

Continue until you have enough information, then write the solution.

Do NOT skip to code immediately. The thinking steps are required.`,
        platforms: ['all'],
        partRef: 5,
    },
    {
        id: 'plan-and-execute',
        name: 'Plan-and-Execute',
        description: 'Two-phase approach: generate a detailed plan, review it, then execute. The professional standard for any non-trivial feature touching multiple files.',
        category: 'decomposition',
        complexity: 'Medium',
        whenToUse: 'Any feature touching 4+ files, risky migrations, large refactors. When you want to review the approach before any code is written.',
        template: `[Switch to Plan Mode: Shift+Tab in Agent]

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

I will review this plan and approve before any code is written.`,
        platforms: ['all'],
        partRef: 5,
    },
    {
        id: 'self-reflection',
        name: 'Self-Reflection / Critique',
        description: 'After the agent produces output, have it review its own work before you see it. Catches crashes, memory leaks, threading issues, and convention violations.',
        category: 'refinement',
        complexity: 'Medium',
        whenToUse: 'Production-critical code, after any non-trivial implementation, before accepting agent output on complex features.',
        template: `Before showing me the final code, review your own output for:

1. ❌ Crashes: force unwraps, array out-of-bounds, nil access, unhandled throws
2. ❌ Memory leaks: closures capturing self without [weak self], retain cycles
3. ❌ Threading: any UI updates on background thread
4. ❌ Missing error handling: throws that are swallowed silently
5. ❌ Convention violations: anything that violates our .mdc rules
6. ❌ Incomplete implementation: any "TODO" or placeholder code

Fix ALL issues found before showing me the result.
Do not say "I reviewed and found no issues" — actually look.`,
        platforms: ['all'],
        partRef: 5,
    },
    {
        id: 'least-to-most',
        name: 'Least-to-Most Decomposition',
        description: 'Break a complex problem into the simplest subproblems first, then build up incrementally. Prevent starting with the hardest part.',
        category: 'decomposition',
        complexity: 'Medium',
        whenToUse: 'Complex features with many interdependencies, learning unfamiliar codebases, when you want to minimize risk of getting stuck.',
        template: `This feature is complex. Break it into the smallest possible subtasks,
ordered from simplest to most complex.

Feature: [describe]

List each subtask:
- What it involves
- What it depends on
- Estimated complexity (S/M/L)
- Whether it can be done in isolation

Then implement each subtask in order, verifying each before starting the next.
Do not start subtask N+1 until subtask N compiles and works correctly.`,
        platforms: ['all'],
        partRef: 5,
    },
    {
        id: 'meta-prompting',
        name: 'Meta Prompting',
        description: 'Have the model generate the optimal prompt for a task, then execute it. Useful when you\'re unsure how to prompt for a specific domain.',
        category: 'meta',
        complexity: 'Low',
        whenToUse: 'When you\'re unsure how to structure a complex prompt, learning a new domain, or optimizing for a specific type of task.',
        template: `I need help with: [high-level description of task]

Before you help me, generate the optimal prompt structure I should use
to get the best result for this specific task.

Consider:
- What context do you need?
- What constraints should be specified?
- What format should I request?
- What should I tell you NOT to do?

Give me the optimal prompt template. I will fill it in and send it back.`,
        platforms: ['all'],
        partRef: 5,
    },
    {
        id: 'negative-space',
        name: 'Negative Space Prompting',
        description: 'Explicitly stating what NOT to do is often more valuable than stating what to do. The AI knows how to code — what it doesn\'t know is your specific constraints.',
        category: 'zero-shot',
        complexity: 'Low',
        whenToUse: 'Any prompt where you need to constrain behavior — use as an addendum to other techniques. Always include in production prompts.',
        template: `[Add to any prompt as a NEGATIVE section:]

Do NOT:
- Modify any public function signatures
- Introduce new dependencies
- Change @[critical shared file]
- Use [pattern] — we use [alternative] in this project
- Refactor code not directly related to this task
- Add print/console.log statements
- Use force unwrapping (!) anywhere
- Hardcode colors/strings/spacing — use design system constants
- Touch the database layer — this is a UI-only change
- Add TODO comments — implement fully or ask me`,
        platforms: ['all'],
        partRef: 5,
    },
    {
        id: 'tdd-cursor',
        name: 'TDD with Cursor (Test-First)',
        description: 'Write the failing test first, then implement until tests pass. The test acts as the exact specification — agents cannot diverge from a passing test suite.',
        category: 'decomposition',
        complexity: 'High',
        whenToUse: 'Business logic, data transformations, algorithm implementations — any code where correctness is critical and behavior must be verifiable.',
        template: `STEP 1 — Write the failing test:
"Write a failing unit test for [function/feature].
Test should verify:
- [specific behavior 1]
- [edge case: null input]
Do NOT implement the function. Only the test."

STEP 2 — Implement until tests pass:
"Read @[test file].
Implement [function] in @[source file] to make all tests pass.
Rules:
- Make only the tests pass — do not over-implement
- Do not modify the test file
- Run tests after implementation"

STEP 3 — Refactor safely:
"All tests pass. Now refactor @[source file] for clarity.
All tests must still pass. Do NOT change the public interface."`,
        platforms: ['all'],
        partRef: 5,
    },
    {
        id: 'reconaissance-first',
        name: 'Reconnaissance-First Doctrine',
        description: 'Research before action. The single biggest difference between novice and expert Cursor users — the agent must never act on assumptions.',
        category: 'meta',
        complexity: 'Medium',
        whenToUse: 'Before every non-trivial implementation. Especially critical when touching shared files, APIs, or making architectural changes.',
        template: `Before writing any code, perform a reconnaissance pass:

1. Read @[files that will be modified]
2. Read @[files that call/import from modified files]
3. @codebase search for [function/class being modified]
4. State your understanding of the current system
5. State your assumptions
6. State what could break

Then: write the implementation.`,
        platforms: ['all'],
        partRef: 5,
    },
    {
        id: 'recursive-improvement',
        name: 'Recursive Self-Improvement',
        description: 'Have the agent iterate on its own output until specific quality criteria are met. Creates an autonomous quality loop.',
        category: 'refinement',
        complexity: 'High',
        whenToUse: 'Complex implementations where you want guaranteed quality before reviewing, automated refactoring passes, ensuring convention compliance.',
        template: `Implement [feature].

After implementation, evaluate your own output against these criteria:
- Does it compile without errors?
- Does it handle all error cases?
- Does it follow our .mdc conventions?
- Is there any duplicated logic that should be extracted?
- Are there any magic numbers or hardcoded strings?

Score each criterion: PASS / FAIL.
If any FAIL: fix them. Repeat until all PASS.
Show me the final version only after all criteria pass.`,
        platforms: ['all'],
        partRef: 5,
    },
]

// ─── Platforms ────────────────────────────────────────────────────────────────

const PLATFORMS: Platform[] = [
    {
        id: 'ios',
        name: 'iOS / Swift',
        language: 'Swift',
        icon: '',
        description: 'SwiftUI and UIKit patterns for iOS development with MVVM architecture, Combine, and modern Swift concurrency.',
        color: '#F77F00',
        templates: [
            {
                id: 'ios-new-vc',
                title: 'New UIViewController (Programmatic MVVM)',
                description: 'Create a complete screen with ViewController, ViewModel, and View using programmatic UIKit patterns.',
                complexity: 'Medium',
                prompt: `Create [Name]ViewController.

Stack: Swift 5.9, UIKit programmatic, MVVM, iOS [minimum] min.
State binding: [Combine @Published / closure callbacks]
Pattern: identical to @[ClosestExistingVC].swift

ViewModel properties:
- [name]: [Type] // [what it represents]

ViewModel actions:
- func [name]([params]) // [what it does]

UI elements (from Figma [URL] / description):
[list each element with type, rough position, style]

Navigation:
- Pushed from: @[ParentVC] via coordinator
- Receives: [params: Type]
- Navigates to: @[ChildVC] when [trigger]

Files: [Name]ViewController.swift, [Name]ViewModel.swift, [Name]View.swift`,
            },
            {
                id: 'ios-custom-view',
                title: 'Custom UIView Component',
                description: 'Reusable UIView component with public interface, states, and programmatic layout.',
                complexity: 'Medium',
                prompt: `Create reusable UIView: [Name]View.

Design: [Figma component URL or description]

Public interface:
var [property]: [Type] { get set }    // [what it controls visually]
var on[Action]: (([type]) -> Void)?   // callback
weak var delegate: [Name]ViewDelegate?

States: default / highlighted / loading / disabled / error
[describe each state's appearance]

Both init(frame:) and init?(coder:) required.
No XIB. Programmatic only.
Location: Sources/DesignSystem/Components/`,
            },
            {
                id: 'ios-api-integration',
                title: 'API Integration (async/await)',
                description: 'Integrate a REST endpoint following the project\'s async/await and error handling patterns.',
                complexity: 'Low',
                prompt: `Integrate new endpoint.

Method: [GET/POST/PUT/DELETE]
URL: [full URL]
Auth: Bearer token from [storage location]

Response (200):
\`\`\`json
{[paste full example response]}
\`\`\`

Error handling required:
- 400: [meaning] → [what to show user]
- 401: redirect to login
- 404: show empty state
- 500: show retry option

Create:
1. @[ModelName] — data struct mapping ALL response fields
2. @[FunctionName] in @[ServiceFile] — async throws → [ReturnType]
3. Call from @[ViewModel] — loading/success/error states

Do NOT use callbacks. Match pattern in @[ExistingAPIFunction].`,
            },
        ],
    },
    {
        id: 'android',
        name: 'Android / Kotlin',
        language: 'Kotlin',
        icon: '',
        description: 'Jetpack Compose with MVVM+UDF, Hilt dependency injection, and Kotlin coroutines for modern Android development.',
        color: '#3DDC84',
        templates: [
            {
                id: 'android-new-screen',
                title: 'New Compose Screen',
                description: 'Create a complete Compose screen with ViewModel, UiState, and Hilt injection.',
                complexity: 'Medium',
                prompt: `Create [Name]Screen.kt

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

Collect with: collectAsStateWithLifecycle()`,
            },
            {
                id: 'android-composable',
                title: 'Reusable Composable Component',
                description: 'Create a reusable, stateless Composable following Material 3 design tokens.',
                complexity: 'Low',
                prompt: `Create reusable Composable: [Name]

Package: [com.app.design.components]
Material 3 — use MaterialTheme tokens only (no hardcoded values)

Parameters:
- [param1]: [Type] // [purpose]
- [param2]: [Type] // [purpose]
- modifier: Modifier = Modifier
- onClick: () -> Unit

States to handle: [default / loading / error / disabled]

Preview: provide @Preview with sample data
Location: app/src/main/java/[package]/components/`,
            },
            {
                id: 'android-repository',
                title: 'Repository + API Service',
                description: 'Create Repository and Retrofit service following the clean architecture pattern.',
                complexity: 'High',
                prompt: `Create Repository layer for [feature].

Architecture: UI → ViewModel → Repository → ApiService/LocalDataSource

ApiService interface:
\`\`\`kotlin
interface [Name]ApiService {
    @GET("[endpoint]")
    suspend fun [methodName](): Response<[ResponseType]>
}
\`\`\`

Repository:
- Return Result<T> from all methods
- Handle network errors with [ErrorType]
- Inject IODispatcher for all network calls
- @Inject constructor — no manual instantiation

ViewModel integration:
- Collect from repository in viewModelScope
- Map Result<T> to UiState

Pattern: follow @[ExistingRepository].kt exactly`,
            },
        ],
    },
    {
        id: 'react-native',
        name: 'React Native',
        language: 'TypeScript',
        icon: '',
        description: 'Cross-platform React Native with TypeScript strict mode, React Navigation v6, and Zustand state management.',
        color: '#61DAFB',
        templates: [
            {
                id: 'rn-new-screen',
                title: 'New Screen',
                description: 'Create a typed React Native screen with StyleSheet, navigation types, and state management.',
                complexity: 'Medium',
                prompt: `Create [Name]Screen.tsx

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
- No any types
- Named export only

Pattern: @[ExistingScreen]Screen.tsx`,
            },
            {
                id: 'rn-component',
                title: 'Reusable Component',
                description: 'Create a typed, memoized React Native component with testID support.',
                complexity: 'Low',
                prompt: `Create reusable component: [Name]

Location: src/components/[Name]/[Name].tsx

Props interface:
interface [Name]Props {
  [prop1]: [type]    // [purpose]
  [prop2]?: [type]   // [optional]
  testID?: string    // always include
  style?: StyleProp<ViewStyle>
}

Styling: StyleSheet.create() in [Name].styles.ts
Colors: @/constants/Colors constants only
Export: named export (no default)
Memo: wrap with React.memo() — used in lists

Story/test exports: include for testing`,
            },
        ],
    },
    {
        id: 'nextjs',
        name: 'Next.js',
        language: 'TypeScript',
        icon: '',
        description: 'Next.js 14+ App Router with TypeScript, Tailwind CSS, server components, and server actions.',
        color: '#FFFFFF',
        templates: [
            {
                id: 'nextjs-page',
                title: 'New App Router Page',
                description: 'Create a typed Server Component page with metadata, loading, and error states.',
                complexity: 'Medium',
                prompt: `Create app/[route]/page.tsx

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
No any. All props typed.
Tailwind CSS only — no inline styles.
Responsive: mobile-first, sm: md: lg: breakpoints.

Follows: @app/[similar-route]/page.tsx`,
            },
            {
                id: 'nextjs-server-action',
                title: 'Server Action',
                description: 'Create a typed server action with Zod validation and structured error responses.',
                complexity: 'Medium',
                prompt: `Create server action: [actionName]

Location: app/actions/[feature].ts
'use server' directive at top

Input validation: Zod schema
\`\`\`typescript
const [Action]Schema = z.object({
  [field]: z.string().[validation](),
})
\`\`\`

Return type:
{ success: true; data: [ReturnType] } | { success: false; error: string }

Error handling:
- Validation errors → return { success: false, error: ... }
- Database errors → log internally, return generic message
- Auth check first: verify session before any operation

Call from: Client Component with useTransition`,
            },
        ],
    },
]

// ─── MCP Servers ──────────────────────────────────────────────────────────────

const MCP_SERVERS: MCPServer[] = [
    {
        id: 'figma',
        name: 'Figma MCP',
        tier: 1,
        category: 'design',
        description: 'Read Figma frames, components, and design tokens directly. Convert designs to code with exact spacing, colors, and typography.',
        toolCount: 15,
        configSnippet: `"figma": {
  "command": "npx",
  "args": ["-y", "figma-developer-mcp", "--figma-api-key=YOUR_KEY", "--stdio"]
}`,
        installCommand: 'npx -y figma-developer-mcp',
    },
    {
        id: 'github',
        name: 'GitHub MCP',
        tier: 1,
        category: 'dev',
        description: 'Create PRs, manage issues, check CI status, read/write files, manage branches — all without leaving Cursor.',
        toolCount: 30,
        configSnippet: `"github": {
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-github"],
  "env": { "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_..." }
}`,
        installCommand: 'npx -y @modelcontextprotocol/server-github',
    },
    {
        id: 'context7',
        name: 'Context7 MCP',
        tier: 1,
        category: 'dev',
        description: 'Live library documentation that bypasses model training cutoff. Always get current API docs for the exact version you\'re using.',
        toolCount: 5,
        configSnippet: `"context7": {
  "command": "npx",
  "args": ["-y", "@upstash/context7-mcp"]
}`,
        installCommand: 'npx -y @upstash/context7-mcp',
    },
    {
        id: 'linear',
        name: 'Linear MCP',
        tier: 2,
        category: 'dev',
        description: 'Read and update Linear tickets, create issues, track issue status. Close the loop between task management and code.',
        toolCount: 20,
        configSnippet: `"linear": {
  "command": "npx",
  "args": ["-y", "@linear/mcp-server"]
}`,
        installCommand: 'npx -y @linear/mcp-server',
    },
    {
        id: 'sentry',
        name: 'Sentry MCP',
        tier: 2,
        category: 'dev',
        description: 'Read production crash reports with full context — stack traces, breadcrumbs, user impact, linked issues.',
        toolCount: 8,
        configSnippet: `"sentry": {
  "command": "npx",
  "args": ["-y", "@sentry/mcp-server"],
  "env": { "SENTRY_AUTH_TOKEN": "sntrys_..." }
}`,
        installCommand: 'npx -y @sentry/mcp-server',
    },
    {
        id: 'playwright',
        name: 'Playwright MCP',
        tier: 2,
        category: 'dev',
        description: 'Browser automation for E2E testing, screenshot verification, and visual regression testing directly from agents.',
        toolCount: 12,
        configSnippet: `"playwright": {
  "command": "npx",
  "args": ["-y", "@playwright/mcp"]
}`,
        installCommand: 'npx -y @playwright/mcp',
    },
    {
        id: 'supabase',
        name: 'Supabase MCP',
        tier: 3,
        category: 'backend',
        description: 'Database queries, schema management, and migrations. Let agents read your schema and generate type-safe queries.',
        toolCount: 25,
        configSnippet: `"supabase": {
  "command": "npx",
  "args": ["-y", "@supabase/mcp-server-supabase"],
  "env": {
    "SUPABASE_URL": "https://yourproject.supabase.co",
    "SUPABASE_SERVICE_ROLE_KEY": "eyJ..."
  }
}`,
        installCommand: 'npx -y @supabase/mcp-server-supabase',
    },
    {
        id: 'vercel',
        name: 'Vercel MCP',
        tier: 3,
        category: 'backend',
        description: 'Deploy projects, manage environment variables, check build logs, and manage domains — all from within agent sessions.',
        toolCount: 10,
        configSnippet: `"vercel": {
  "command": "npx",
  "args": ["-y", "@vercel/mcp-server"]
}`,
        installCommand: 'npx -y @vercel/mcp-server',
    },
    {
        id: 'netlify',
        name: 'Netlify MCP',
        tier: 3,
        category: 'backend',
        description: 'Build and deploy web projects, manage functions, configure redirects, and monitor deployments.',
        toolCount: 8,
        configSnippet: `"netlify": {
  "command": "npx",
  "args": ["-y", "@netlify/mcp-server"]
}`,
        installCommand: 'npx -y @netlify/mcp-server',
    },
]

// ─── Workflows ────────────────────────────────────────────────────────────────

const WORKFLOWS: Workflow[] = [
    {
        id: 'prd-to-ship',
        name: 'PRD-to-Ship Pipeline',
        description: 'The complete product development workflow from requirements document to merged pull request. Covers spec, tickets, implementation, review, and merge.',
        speed: 70,
        quality: 95,
        risk: 20,
        complexity: 80,
        steps: [
            { id: 's1', title: 'Write PRD', description: 'Generate a Product Requirements Document covering user stories, acceptance criteria, and technical constraints.', command: 'Write PRD for [feature] in docs/features/[name]-PRD.md' },
            { id: 's2', title: 'Break into Tickets', description: 'Decompose the PRD into sized development tickets with acceptance criteria and dependencies.', command: 'Read @[PRD file] and break into Linear tickets' },
            { id: 's3', title: 'Plan Mode', description: 'Use Plan Mode (Shift+Tab) to generate implementation plan before writing code.', mode: 'Plan Mode', command: 'Shift+Tab in Agent' },
            { id: 's4', title: 'Implement', description: 'Execute the approved plan ticket by ticket, using Agent mode for multi-file changes.', mode: 'Agent Mode', command: 'Cmd+I' },
            { id: 's5', title: 'Code Review', description: 'Run the /code-review command and fix all 🔴 critical issues surfaced.', command: '/code-review current diff' },
            { id: 's6', title: 'PR & BugBot', description: 'Generate PR description and let BugBot auto-review on push.', command: '/pr-description then push' },
        ],
    },
    {
        id: 'tdd-loop',
        name: 'TDD Loop',
        description: 'Test-Driven Development workflow — write failing tests first, implement until green, refactor. The test acts as the unambiguous specification.',
        speed: 60,
        quality: 98,
        risk: 10,
        complexity: 70,
        steps: [
            { id: 's1', title: 'Write Tests', description: 'Write comprehensive failing tests covering all cases — happy path, errors, edge cases.', command: 'Write failing tests for [feature]. Do NOT implement yet.' },
            { id: 's2', title: 'Verify Tests Fail', description: 'Confirm tests fail for the right reason — function doesn\'t exist, not a misconfigured test.', command: 'npm test -- run failing' },
            { id: 's3', title: 'Implement', description: 'Implement the minimum code to make tests pass without over-engineering.', command: 'Read @[test file]. Implement to make tests pass.' },
            { id: 's4', title: 'Tests Green', description: 'Verify all tests pass with no modifications to test files.', command: 'npm test (all must pass)' },
            { id: 's5', title: 'Refactor', description: 'Safely refactor knowing tests protect behavior. Run tests after each change.', command: 'refactor @[file]. All tests must still pass.' },
        ],
    },
    {
        id: 'daily-dev-loop',
        name: 'Daily Development Loop',
        description: 'Structured start-of-day and end-of-day routine for AI-assisted development. Maintains context continuity across sessions.',
        speed: 85,
        quality: 80,
        risk: 30,
        complexity: 30,
        steps: [
            { id: 's1', title: 'Morning Context', description: 'Read DEV_LOG.md to restore context from previous session before starting.', command: 'Read @DEV_LOG.md. Summarize where we left off.' },
            { id: 's2', title: 'Fresh Session', description: 'Start each feature in a fresh Agent chat with a context header to avoid context poisoning.', command: 'Cmd+I — new session per feature' },
            { id: 's3', title: 'Implement', description: 'Build the day\'s tasks using the appropriate Cursor mode for each task type.', mode: 'Agent/Tab/Cmd+K' },
            { id: 's4', title: 'Summarize', description: 'Run /summarize at the end of each long chat session to condense context.', command: '/summarize' },
            { id: 's5', title: 'Update DEV_LOG', description: 'Update the development log with today\'s completed work, decisions, and next steps.', command: 'Update @DEV_LOG.md with today\'s work.' },
        ],
    },
    {
        id: 'parallel-agents',
        name: 'Parallel Agents',
        description: 'Run multiple independent agent instances simultaneously to maximize throughput. Use git worktrees for isolation. Up to 8 concurrent agents.',
        speed: 95,
        quality: 80,
        risk: 50,
        complexity: 90,
        steps: [
            { id: 's1', title: 'Create Worktrees', description: 'Set up isolated git worktrees for each parallel track to prevent file conflicts.', command: 'git worktree add ../feature-ui feature/ui' },
            { id: 's2', title: 'Launch Agents', description: 'Open multiple Cursor windows, one per worktree. Assign each agent a distinct scope.', command: 'Cmd+I × 3 (UI / API / Tests)' },
            { id: 's3', title: 'Monitor Progress', description: 'Monitor all agents via Background Agents panel or cursor.com web interface.', command: 'Cmd+E or cursor.com/agents' },
            { id: 's4', title: 'Review All Diffs', description: 'When all agents complete, review each diff independently before merging.', command: '/code-review per agent' },
            { id: 's5', title: 'Integrate', description: 'Merge all branches, resolve any interface mismatches between parallel tracks.', command: 'git merge + verify interfaces' },
        ],
    },
    {
        id: 'debug-pipeline',
        name: 'Debug Pipeline',
        description: 'Systematic bug investigation workflow — from report to root cause to fix to regression test. Never guess; always verify.',
        speed: 50,
        quality: 95,
        risk: 15,
        complexity: 60,
        steps: [
            { id: 's1', title: 'Categorize Bug', description: 'Classify the bug type: crash / logic / layout / performance / intermittent.', command: 'Use debugging decision tree from Part 36' },
            { id: 's2', title: 'Gather Context', description: 'Paste complete crash log, error output, and reproduction steps. Never summarize.', command: 'Paste full stack trace + steps to reproduce' },
            { id: 's3', title: 'Root Cause', description: 'Use ReAct or Chain-of-Thought to reason through the root cause before any fix.', command: 'CoT or ReAct prompting for root cause' },
            { id: 's4', title: 'Fix & Verify', description: 'Apply minimal targeted fix. Verify the specific bug is fixed without introducing regressions.', command: 'Fix the error only. Do not change outside error site.' },
            { id: 's5', title: 'Regression Test', description: 'Write a test that would have caught this bug. Add to the test suite to prevent recurrence.', command: 'Write test for [bug]. Add to test suite.' },
        ],
    },
]

// ─── Main Export ──────────────────────────────────────────────────────────────

let _cachedGuide: ParsedGuide | null = null

export function getGuide(): ParsedGuide {
    if (_cachedGuide) return _cachedGuide

    const parts = parseParts()
    const totalSections = parts.reduce((acc, p) => acc + p.sections.length, 0)

    _cachedGuide = {
        parts,
        techniques: TECHNIQUES,
        platforms: PLATFORMS,
        mcpServers: MCP_SERVERS,
        workflows: WORKFLOWS,
        totalSections,
        totalParts: parts.length,
    }

    return _cachedGuide
}

export function searchGuide(query: string): Array<{ type: string; title: string; description: string; path: string; partId?: number }> {
    if (!query.trim()) return []
    const guide = getGuide()
    const q = query.toLowerCase()
    const results: Array<{ type: string; title: string; description: string; path: string; partId?: number }> = []

    // Search parts and sections
    for (const part of guide.parts) {
        if (part.title.toLowerCase().includes(q)) {
            results.push({ type: 'Part', title: `Part ${part.id}: ${part.title}`, description: part.category, path: `/guide#part-${part.id}`, partId: part.id })
        }
        for (const section of part.sections) {
            if (section.title.toLowerCase().includes(q) || section.content.toLowerCase().includes(q)) {
                results.push({ type: 'Section', title: section.title, description: `Part ${part.id} — ${part.title}`, path: `/guide#${section.id}`, partId: part.id })
            }
        }
    }

    // Search techniques
    for (const t of guide.techniques) {
        if (t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)) {
            results.push({ type: 'Technique', title: t.name, description: t.description.slice(0, 100), path: `/techniques#${t.id}` })
        }
    }

    return results.slice(0, 20)
}
