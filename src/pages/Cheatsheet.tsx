import { CopyButton } from '../components/CopyButton'

const SHORTCUTS = [
    {
        category: 'Core Modes', items: [
            { keys: ['Cmd', 'K'], label: 'Inline Edit', desc: 'Edit selected code in-place. Surgical precision for 1–20 lines.' },
            { keys: ['Cmd', 'L'], label: 'Chat', desc: 'Ask questions or make edits via conversation.' },
            { keys: ['Cmd', 'I'], label: 'Agent Mode', desc: 'Autonomous multi-file editing with tool use.' },
            { keys: ['Shift', 'Tab'], label: 'Plan Mode', desc: 'Within Agent: generates plan BEFORE writing code. Review before any execution.' },
            { keys: ['Cmd', 'E'], label: 'Background Agent', desc: 'Launch agent in background; you keep working. Monitor via web/mobile.' },
            { keys: ['Cmd', 'Shift', 'Enter'], label: 'Full-File Edit', desc: 'Apply inline edit to the ENTIRE current file (not just selection).' },
        ]
    },
    {
        category: 'Tab Autocomplete', items: [
            { keys: ['Tab'], label: 'Accept Completion', desc: 'Accept the current AI suggestion inline.' },
            { keys: ['Esc'], label: 'Reject Suggestion', desc: 'Dismiss the current autocomplete suggestion.' },
            { keys: ['Cmd', '→'], label: 'Accept One Word', desc: 'Accept suggestion word-by-word (partial accept).' },
            { keys: ['Alt', '\\'], label: 'Force Suggestion', desc: 'Manually trigger autocomplete when it hasn\'t appeared.' },
        ]
    },
    {
        category: 'Navigation', items: [
            { keys: ['Cmd', 'P'], label: 'Quick Open', desc: 'Fuzzy-search and open any file by name.' },
            { keys: ['Cmd', 'Shift', 'G'], label: 'Source Control', desc: 'Open git diff view and Source Control panel.' },
            { keys: ['Cmd', 'Option', 'Tab'], label: 'Switch Layout', desc: 'Cycle through Agent / Editor / Zen / Browser layouts.' },
            { keys: ['Cmd', '`'], label: 'Toggle Terminal', desc: 'Open or focus the integrated terminal.' },
        ]
    },
]

const AT_SYMBOLS = [
    { symbol: '@filename.ext', desc: 'Full file content into context', use: 'When agent needs to read or modify a specific file' },
    { symbol: '@folder/', desc: 'All files in a directory', use: 'Working within a feature module or bounded context' },
    { symbol: '@codebase', desc: 'Semantic search across index', use: '"Find where X is used", "How is Y implemented"' },
    { symbol: '@web', desc: 'Live web search', use: 'New library docs, CVEs, current API specs' },
    { symbol: '@docs', desc: 'Your indexed documentation', use: 'Framework questions with your own docs indexed' },
    { symbol: '@git', desc: 'Git history, diff, blame', use: 'PR descriptions, "what changed in last 5 commits"' },
    { symbol: '@terminal', desc: 'Last terminal output', use: '"Here\'s the error — fix it"' },
    { symbol: '@notepad', desc: 'Cursor Notepad content', use: 'Sprint notes, decisions, current context' },
    { symbol: '@linter-errors', desc: 'Current lint/type errors', use: '"Fix all current linter errors"' },
    { symbol: '@recent-changes', desc: 'Recently modified files', use: '"What did I change in the last hour?"' },
    { symbol: '@https://url', desc: 'Fetch and include a webpage', use: 'Specific API docs, GitHub issues, Stack Overflow answers' },
    { symbol: '@ruleName', desc: 'Reference a specific .mdc rule', use: '"Following @ios-swift-rules, create..."' },
]

const MODEL_MATRIX = [
    { task: 'Architecture design / planning', model: 'Claude Opus 4.5', note: 'Best reasoning depth', color: 'border-l-purple-500' },
    { task: 'Complex multi-file feature', model: 'Claude Sonnet 4.5 or Composer', note: 'Quality + speed balance', color: 'border-l-blue-500' },
    { task: 'Fast iteration / quick UI changes', model: 'Composer', note: 'Sub-30s turns', color: 'border-l-green-500' },
    { task: 'Simple single-file edits (Cmd+K)', model: 'Composer or auto', note: 'Fastest for in-place edits', color: 'border-l-green-400' },
    { task: 'Complex bug diagnosis / root cause', model: 'Claude Opus 4.5', note: 'Needs deep reasoning', color: 'border-l-purple-500' },
    { task: 'Security audit / high-stakes review', model: 'Claude Opus 4.5', note: 'Never compromise here', color: 'border-l-red-500' },
    { task: 'Test generation', model: 'GPT-5 or Composer', note: 'Strong structure', color: 'border-l-amber-500' },
    { task: 'Analyzing very large files (3000+ lines)', model: 'Gemini 3 Pro', note: 'Longest context window', color: 'border-l-cyan-500' },
    { task: 'Code explanation / documentation', model: 'Claude Sonnet 4.5', note: 'Clear natural language', color: 'border-l-blue-400' },
    { task: 'Any task on Max Mode', model: 'Gemini 3 Pro or Claude Opus 4.5', note: 'Giant context unlocked', color: 'border-l-purple-400' },
    { task: 'Routine refactoring', model: 'Composer', note: 'Save quota for harder tasks', color: 'border-l-green-500' },
]

const ANTI_PATTERNS = [
    {
        dont: '"Make it look better" / "Clean up this code" / "Fix the bug"',
        do: 'Name the exact element, file, and desired change. Vague → random.',
        rule: 'Always be specific',
    },
    {
        dont: '"Build the entire onboarding: 5 screens, all APIs, animations, tests"',
        do: 'One screen at a time. Validate each before proceeding.',
        rule: 'No mega prompts',
    },
    {
        dont: '"Getting some kind of nil crash on the home screen"',
        do: 'Paste the complete stack trace. Every line. Every time. Never summarize.',
        rule: 'Never summarize errors',
    },
    {
        dont: '"Add a loading spinner" (no stack specified)',
        do: 'Always specify: UIKit / SwiftUI / Compose / React Native / Web',
        rule: 'Declare your stack',
    },
    {
        dont: '"Refactor AuthService.swift"',
        do: 'Add: "Do NOT change public function signatures. Do NOT modify callers."',
        rule: 'Always include NEGATIVE constraints',
    },
    {
        dont: '"Fix the crash, then add dark mode, then write tests"',
        do: 'One task per prompt. Verify each works. Then next.',
        rule: 'One task per prompt',
    },
    {
        dont: 'Generate → immediately Accept all',
        do: 'Generate → run self-review prompt → check for crashes/leaks → then accept',
        rule: 'Never accept without review',
    },
    {
        dont: '"Create a settings screen" (no pattern reference)',
        do: 'Always add: "Follow the exact pattern of @ProfileViewController.swift"',
        rule: 'Always reference existing patterns',
    },
    {
        dont: 'Using Agent (Cmd+I) to change the color of a button',
        do: 'Select the StyleSheet block → Cmd+K → "Change background to #7C3AED"',
        rule: 'Right mode for each task',
    },
    {
        dont: 'All 6+ MCP servers active at once (50+ tools)',
        do: 'Enable only what you need for the current task. Stay under 40 tools.',
        rule: 'Manage tool budget',
    },
]

function KeyCap({ k }: { k: string }) {
    return (
        <kbd className="inline-flex items-center justify-center px-2.5 py-1.5 rounded-lg bg-bg-secondary border border-white/20 text-text-primary text-xs font-mono font-bold shadow-sm min-w-[32px]">
            {k}
        </kbd>
    )
}

export default function Cheatsheet() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12 print:space-y-8">

            <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                    <h1 className="text-3xl font-black text-text-primary mb-2">Cheatsheet & Quick Reference</h1>
                    <p className="text-text-secondary">
                        Every keyboard shortcut, @-symbol, model selection matrix, and anti-pattern in one page.
                        Designed for quick lookup mid-session — bookmark this page.
                    </p>
                </div>
                <button onClick={() => window.print()} className="btn-secondary text-sm print:hidden">
                    🖨️ Print
                </button>
            </div>

            {/* ── Keyboard Shortcuts ── */}
            <section>
                <h2 className="text-xl font-bold text-text-primary mb-5 flex items-center gap-2">
                    ⌨️ Keyboard Shortcuts
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {SHORTCUTS.map(cat => (
                        <div key={cat.category} className="glass-card p-5">
                            <h3 className="font-bold text-primary-light text-sm mb-4 uppercase tracking-wider">{cat.category}</h3>
                            <div className="space-y-4">
                                {cat.items.map(item => (
                                    <div key={item.label}>
                                        <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                                            {item.keys.map((k, i) => (
                                                <span key={i} className="flex items-center gap-1">
                                                    <KeyCap k={k} />
                                                    {i < item.keys.length - 1 && <span className="text-text-muted text-xs">+</span>}
                                                </span>
                                            ))}
                                            <span className="font-semibold text-text-primary text-sm ml-1">{item.label}</span>
                                        </div>
                                        <p className="text-text-muted text-xs leading-relaxed pl-0.5">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── @-Symbol Reference ── */}
            <section>
                <h2 className="text-xl font-bold text-text-primary mb-5">@ Symbol Reference</h2>
                <p className="text-text-secondary text-sm mb-5">
                    The @-system is Cursor's most powerful context mechanism. Each symbol injects specific information into the agent's context window.
                    Use the most targeted symbol available — @filename beats @folder beats @codebase for precision.
                </p>
                <div className="glass-card overflow-auto">
                    <table className="w-full text-sm min-w-[640px]">
                        <thead>
                            <tr className="border-b border-white/10 bg-bg-secondary">
                                <th className="px-4 py-3 text-left text-text-muted text-xs font-semibold">SYMBOL</th>
                                <th className="px-4 py-3 text-left text-text-muted text-xs font-semibold">WHAT IT INJECTS</th>
                                <th className="px-4 py-3 text-left text-text-muted text-xs font-semibold">BEST USED WHEN</th>
                            </tr>
                        </thead>
                        <tbody>
                            {AT_SYMBOLS.map(s => (
                                <tr key={s.symbol} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                                    <td className="px-4 py-3">
                                        <code className="text-accent font-mono text-xs font-semibold">{s.symbol}</code>
                                    </td>
                                    <td className="px-4 py-3 text-text-secondary text-xs">{s.desc}</td>
                                    <td className="px-4 py-3 text-text-muted text-xs italic">{s.use}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* ── Model Decision Matrix ── */}
            <section>
                <h2 className="text-xl font-bold text-text-primary mb-2">Model Selection Matrix</h2>
                <p className="text-text-secondary text-sm mb-5">
                    Use the right model for the right task. Frontier models (Opus, GPT-5, Gemini Pro) have limited quota — save them for high-value decisions.
                    Composer handles the bulk of execution work efficiently.
                </p>
                <div className="glass-card overflow-auto">
                    <table className="w-full text-sm min-w-[640px]">
                        <thead>
                            <tr className="border-b border-white/10 bg-bg-secondary">
                                <th className="px-4 py-3 text-left text-text-muted text-xs font-semibold">TASK</th>
                                <th className="px-4 py-3 text-left text-text-muted text-xs font-semibold">BEST MODEL</th>
                                <th className="px-4 py-3 text-left text-text-muted text-xs font-semibold">WHY</th>
                            </tr>
                        </thead>
                        <tbody>
                            {MODEL_MATRIX.map((row, i) => (
                                <tr key={i} className={`border-b border-white/5 border-l-2 ${row.color} hover:bg-white/2 transition-colors`}>
                                    <td className="px-4 py-3 text-text-primary text-xs font-medium">{row.task}</td>
                                    <td className="px-4 py-3">
                                        <code className="text-primary-light text-xs font-mono">{row.model}</code>
                                    </td>
                                    <td className="px-4 py-3 text-text-muted text-xs">{row.note}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* ── Anti-Patterns ── */}
            <section>
                <h2 className="text-xl font-bold text-text-primary mb-2">Anti-Patterns & Failure Modes</h2>
                <p className="text-text-secondary text-sm mb-5">
                    The 10 most common mistakes that cause agents to produce wrong output, introduce bugs, or waste tokens.
                    Each one has a verified fix. Internalizing these patterns alone will meaningfully improve your AI-assisted development workflow.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {ANTI_PATTERNS.map((ap, i) => (
                        <div key={i} className="glass-card overflow-hidden">
                            <div className="px-4 py-2 bg-white/3 border-b border-white/5">
                                <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Rule {i + 1}: {ap.rule}</span>
                            </div>
                            <div className="p-4 space-y-3">
                                <div className="flex items-start gap-2.5">
                                    <span className="text-red-400 text-base shrink-0 mt-0.5">✗</span>
                                    <div>
                                        <div className="text-xs font-semibold text-red-400 mb-1">Don't</div>
                                        <p className="text-text-secondary text-xs leading-relaxed italic">"{ap.dont}"</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2.5">
                                    <span className="text-accent text-base shrink-0 mt-0.5">✓</span>
                                    <div>
                                        <div className="text-xs font-semibold text-accent mb-1">Do</div>
                                        <p className="text-text-primary text-xs leading-relaxed">{ap.do}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── PCTF+ Checklist ── */}
            <section>
                <h2 className="text-xl font-bold text-text-primary mb-2">PCTF+ Prompt Checklist</h2>
                <p className="text-text-secondary text-sm mb-5">
                    Before sending any non-trivial prompt, verify it answers all 7 dimensions of the PCTF+ framework.
                    Missing elements are the #1 cause of wrong-direction agent runs.
                </p>
                <div className="glass-card p-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { letter: 'P', name: 'Persona', desc: 'What expert role should respond? (e.g. "Senior iOS engineer specializing in UIKit MVVM")', color: 'text-purple-400' },
                            { letter: 'C', name: 'Context', desc: 'Current state of the code. What exists right now? @mention the relevant files.', color: 'text-blue-400' },
                            { letter: 'T', name: 'Task', desc: 'One imperative verb + specific action. Precise verb from the verb table (Create/Fix/Refactor).', color: 'text-green-400' },
                            { letter: 'F', name: 'Format', desc: 'What files to create/modify. What files NOT to touch.', color: 'text-amber-400' },
                            { letter: '+R', name: 'Reference', desc: 'Figma URL, pattern to clone, design tokens. "Follow the exact pattern of @[file]"', color: 'text-cyan-400' },
                            { letter: '+N', name: 'Negative', desc: 'What must NOT be done. "Do NOT modify public API. Do NOT introduce new dependencies."', color: 'text-red-400' },
                            { letter: '+D', name: 'Done Criteria', desc: 'Verifiable completion signal. "Done when: npm run build exits 0 and all tests pass."', color: 'text-accent' },
                        ].map(item => (
                            <div key={item.letter} className="p-3 bg-bg-secondary rounded-xl border border-white/5">
                                <div className={`text-2xl font-black mb-1 ${item.color}`}>{item.letter}</div>
                                <div className="font-bold text-text-primary text-sm mb-1">{item.name}</div>
                                <p className="text-text-muted text-xs leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-5 pt-5 border-t border-white/5">
                        <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-text-primary text-sm">Full PCTF+ Template</h4>
                            <CopyButton text={`[PERSONA]
You are a senior [iOS/Android/React Native/Web] engineer specializing in [stack].

[CONTEXT]
Current state: [describe what exists right now]
File: @[filename]
Architecture: @[pattern file]

[TASK]
[Imperative verb] [specific action]
Requirements:
- [Requirement 1 — specific and measurable]
- [Requirement 2]

[REFERENCE]
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

[DONE CRITERIA]
Complete when:
- [Verifiable condition 1 — e.g. npm run build exits 0]
- [Verifiable condition 2]
- No compile errors / no type errors`} />
                        </div>
                        <pre className="code-block p-4 text-text-secondary text-xs leading-relaxed whitespace-pre-wrap overflow-auto">
                            {`[PERSONA]
You are a senior [iOS/Android/React Native/Web] engineer specializing in [stack].

[CONTEXT]
Current state: [describe what exists right now]
File: @[filename]
Architecture: @[pattern file]

[TASK]
[Imperative verb] [specific action]
Requirements:
- [Requirement 1 — specific and measurable]
- [Requirement 2]

[REFERENCE]
Follow same pattern as: @[ExistingFile]

[FORMAT]
Create: [list new files]
Modify: @[file1], @[file2]
Do not touch: @[file3]

[NEGATIVE]
- Do NOT modify any public function signatures
- Do NOT introduce new dependencies

[DONE CRITERIA]
Complete when:
- [e.g. npm run build exits 0]
- No compile errors`}
                        </pre>
                    </div>
                </div>
            </section>
        </div>
    )
}
