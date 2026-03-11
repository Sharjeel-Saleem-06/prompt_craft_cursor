import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    ArrowRight, ChevronDown, ChevronRight,
    AlertTriangle, CheckCircle, Copy, RotateCcw,
    Sparkles, Loader2, Lightbulb, Target, Zap
} from 'lucide-react'

// ─── Groq API ─────────────────────────────────────────────────────────────────

const GROQ_KEYS = [
    import.meta.env.VITE_GROQ_KEY_1 || '',
    import.meta.env.VITE_GROQ_KEY_2 || '',
    import.meta.env.VITE_GROQ_KEY_3 || '',
].filter(Boolean)
let groqKeyIndex = Math.floor(Math.random() * GROQ_KEYS.length)
function nextGroqKey() {
    const key = GROQ_KEYS[groqKeyIndex % GROQ_KEYS.length]
    groqKeyIndex++
    return key
}

const SYSTEM_PROMPT = `You are an elite AI prompt engineer specializing in Cursor IDE and AI coding tools.
Your ONLY job is to take a messy, typo-filled, vague developer prompt and transform it into a production-grade prompt that gets perfect results from Cursor Agent, Cursor Chat, or other AI coding tools.

CONTEXT DETECTION: Analyze the prompt to detect the tech stack:
- iOS/Swift/SwiftUI/UIKit/MVVM
- Android/Kotlin/Jetpack Compose/Hilt/Room
- React Native/TypeScript/Expo
- Next.js/React/Vite/Web
- Backend/Node/API/Database
- General/Architecture/Code review

APPLY THE PCTF+ FRAMEWORK:
P = Persona: Start with "You are a senior [specific role] specializing in [exact tech stack]."
C = Context: Reference specific files with @filename.ext. Include architecture pattern, constraints.
T = Task: One clear imperative verb (Create/Fix/Implement/Refactor/Debug/Review). ONE task only.
F = Format: Define exactly what output format you want (file list, structured report, code block).
+ = NEGATIVE constraints: "Do NOT..." section is mandatory. Protect files/APIs not to touch.
+ = Done Criteria: State explicitly when the task is complete and verifiable.
+ = Pattern Reference: Always name an existing file to follow as pattern.

RULES YOU MUST FOLLOW:
1. Split multiple tasks into separate prompts with [SEND AS SEPARATE PROMPT] note
2. Replace vague references ("the logs", "the file", "the screen") with specific @filename.ext
3. Replace "indepth check" / "deep analyze" with a numbered checklist of exactly what to check
4. Replace "make sure everything is perfect" with a specific done criteria checklist
5. Convert typos and unclear phrasing to precise technical language
6. If the prompt mentions a bug → add [STEPS TO REPRODUCE] section
7. If the prompt mentions an API → add endpoint URL, method, expected response structure placeholder
8. Add [NEGATIVE] section listing what NOT to change
9. Keep the enhanced prompt in the SAME language level (don't over-engineer simple tasks)
10. Cursor-specific: use @Codebase for broad searches, @filename for specific files, @terminal for logs

OUTPUT FORMAT (respond ONLY in valid JSON, no markdown wrapper):
{
  "enhanced": "the full improved prompt text (use \\n for newlines, NEVER literal newlines)",
  "summary": "2-sentence plain-English explanation of the main problems fixed",
  "changes": [
    "Change 1: what was wrong and what was fixed",
    "Change 2: ...",
    "Change 3: ..."
  ],
  "tips": [
    "Cursor-specific tip 1 relevant to this prompt's context",
    "Cursor-specific tip 2",
    "Cursor-specific tip 3"
  ],
  "detectedStack": "iOS/Swift | Android/Kotlin | React Native | Next.js | General",
  "splitPrompts": ["optional: if the prompt had multiple tasks, list the additional prompts here as separate strings (use \\n)"]
}
CRITICAL: ENSURE YOUR JSON IS VALID. ESCAPE ALL QUOTES (\\") AND NEWLINES (\\n) INSIDE STRINGS.`

interface EnhanceResult {
    enhanced: string
    summary: string
    changes: string[]
    tips: string[]
    detectedStack: string
    splitPrompts: string[]
}

async function enhancePrompt(userPrompt: string): Promise<EnhanceResult> {
    if (GROQ_KEYS.length === 0) {
        throw new Error('Groq API keys missing. Set VITE_GROQ_KEY_1 in your .env file or deployment config.')
    }
    const key = nextGroqKey()
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${key}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            temperature: 0.3,
            max_tokens: 3000,
            messages: [
                { role: 'system', content: SYSTEM_PROMPT },
                { role: 'user', content: `Transform this prompt:\n\n${userPrompt}` }
            ]
        })
    })

    if (!res.ok) {
        // Try next key on rate limit
        if (res.status === 429) {
            const key2 = nextGroqKey()
            const res2 = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${key2}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: 'llama-3.3-70b-versatile',
                    temperature: 0.3,
                    max_tokens: 3000,
                    messages: [
                        { role: 'system', content: SYSTEM_PROMPT },
                        { role: 'user', content: `Transform this prompt:\n\n${userPrompt}` }
                    ]
                })
            })
            if (!res2.ok) throw new Error(`API error: ${res2.status}`)
            const data2 = await res2.json()
            const text2 = data2.choices[0].message.content as string
            let clean2 = text2.replace(/^```json\n?/, '').replace(/\n?```$/, '').trim()
            try {
                return JSON.parse(clean2) as EnhanceResult
            } catch {
                clean2 = clean2.replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\t/g, '\\t')
                return JSON.parse(clean2) as EnhanceResult
            }
        }
        throw new Error(`API error: ${res.status}`)
    }

    const data = await res.json()
    const text = data.choices[0].message.content as string
    // Strip possible markdown code fences
    let clean = text.replace(/^```json\n?/, '').replace(/\n?```$/, '').trim()
    try {
        return JSON.parse(clean) as EnhanceResult
    } catch (e) {
        // Fallback for unescaped newlines/tabs inside JSON strings
        clean = clean.replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\t/g, '\\t')
        try {
            return JSON.parse(clean) as EnhanceResult
        } catch (e2) {
            console.error('Failed to parse clean JSON:', clean)
            throw new Error('LLM returned malformed JSON')
        }
    }
}

// ─── AI Enhancer Component ────────────────────────────────────────────────────

const STACK_COLORS: Record<string, string> = {
    'iOS/Swift': 'text-orange-400 bg-orange-500/10 border-orange-500/20',
    'Android/Kotlin': 'text-green-400 bg-green-500/10 border-green-500/20',
    'React Native': 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    'Next.js': 'text-white bg-white/10 border-white/20',
    'General': 'text-purple-400 bg-purple-500/10 border-purple-500/20',
}

const EXAMPLE_MESSY_PROMPTS = [
    `check ss when i click on the view all, the first course card is focused, like we have view all of other contents, deep check and resolve, also check the first article, when u run the api fo article its data shwos like this , none of the other articel have this astrcutrue why?

alos snalaye the compelte files on whihc you work on are performance oreinted and didnt have any pr issues`,

    `perfect i want you to indeoth check all the folders all fiels the compelte archotecture of teh ap, all screeen all testcases, all loclaization, all mvvm+clean architecture , proeprly chekc fro all PR issues related to any hardcoded thign or cosntants or import or any other old issues, use a multi model approch fro each task, amek sure there is consistent behcviaour`,

    `@logs check the logs indepth when i switch tabs from home to lib and search it lags little bit. indepth check it, and also check proerply the localizatioj working from firebase or not? in offline its perfect in online it make issue deep debug it and resolve this`,

    `resolve these all imports issue, indepth check and resolve all these issues from all fiels where you have added this, the review was 20 minutes ago and sardarKhan is asking to fix it`,
]

function AIEnhancer() {
    const [input, setInput] = useState('')
    const [result, setResult] = useState<EnhanceResult | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [copiedEnhanced, setCopiedEnhanced] = useState(false)
    const [copiedSplit, setCopiedSplit] = useState<number | null>(null)
    const [activeExIdx, setActiveExIdx] = useState<number | null>(null)

    const enhance = async () => {
        if (!input.trim() || input.length < 10) return
        setLoading(true)
        setError(null)
        setResult(null)
        try {
            const r = await enhancePrompt(input)
            setResult(r)
        } catch (e) {
            setError(`Failed: ${(e as Error).message}. Check console for details.`)
        } finally {
            setLoading(false)
        }
    }

    const copyEnhanced = () => {
        if (!result) return
        navigator.clipboard.writeText(result.enhanced)
        setCopiedEnhanced(true)
        setTimeout(() => setCopiedEnhanced(false), 2000)
    }

    const copySplit = (text: string, i: number) => {
        navigator.clipboard.writeText(text)
        setCopiedSplit(i)
        setTimeout(() => setCopiedSplit(null), 2000)
    }

    const loadExample = (idx: number) => {
        setActiveExIdx(idx)
        setInput(EXAMPLE_MESSY_PROMPTS[idx])
        setResult(null)
        setError(null)
    }

    const stackColor = result?.detectedStack
        ? STACK_COLORS[result.detectedStack] ?? 'text-purple-400 bg-purple-500/10 border-purple-500/20'
        : ''

    return (
        <div className="space-y-6">
            {/* Intro banner */}
            <div className="glass-card p-5 border-primary/20 bg-primary/5">
                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0">
                        <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="font-bold text-text-primary mb-1">AI Prompt Enhancer — Powered by Llama 3.3 70B</h2>
                        <p className="text-text-secondary text-sm leading-relaxed">
                            Paste any messy, typo-filled, vague Cursor prompt. The AI will correct it, apply the PCTF+ framework,
                            detect your tech stack (iOS/Android/Web), split multi-task prompts, and give you Cursor-specific tips.
                            Load balancing across 3 API keys for maximum reliability.
                        </p>
                    </div>
                </div>
            </div>

            {/* Example prompts */}
            <div>
                <div className="text-xs text-text-muted mb-2 font-medium">📋 Try a real messy prompt example:</div>
                <div className="flex flex-wrap gap-2">
                    {['View All Bug', 'Architecture Check', 'Tab Lag Debug', 'PR Import Fix'].map((label, i) => (
                        <button
                            key={i}
                            onClick={() => loadExample(i)}
                            className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${activeExIdx === i
                                    ? 'bg-primary/20 text-primary-light border-primary/30'
                                    : 'bg-white/5 text-text-muted border-white/10 hover:bg-white/10'
                                }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Input + Enhance button */}
            <div className="space-y-3">
                <textarea
                    value={input}
                    onChange={e => { setInput(e.target.value); setActiveExIdx(null) }}
                    placeholder="Paste your messy prompt here... typos, missing context, multiple tasks — anything. The AI will fix it all."
                    className="w-full h-52 bg-bg-secondary border border-white/10 rounded-xl p-4 text-text-primary text-sm font-mono resize-none focus:outline-none focus:border-primary/50 placeholder-text-muted leading-relaxed transition-colors"
                />
                <div className="flex items-center gap-3">
                    <button
                        onClick={enhance}
                        disabled={loading || input.length < 10}
                        className="btn-primary gap-2 px-6 py-2.5 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        {loading
                            ? <><Loader2 className="w-4 h-4 animate-spin" /> Enhancing with AI...</>
                            : <><Sparkles className="w-4 h-4" /> Enhance Prompt</>
                        }
                    </button>
                    {(input || result) && (
                        <button
                            onClick={() => { setInput(''); setResult(null); setError(null); setActiveExIdx(null) }}
                            className="btn-secondary gap-1.5 text-sm"
                        >
                            <RotateCcw className="w-3.5 h-3.5" /> Clear
                        </button>
                    )}
                    <span className="text-text-muted text-xs ml-auto">{input.length} chars · Llama 3.3 70B · 3-key load balancer</span>
                </div>
            </div>

            {/* Error */}
            {error && (
                <div className="glass-card p-4 border-red-500/30 bg-red-500/10">
                    <div className="flex items-center gap-2 text-red-400 text-sm">
                        <AlertTriangle className="w-4 h-4 shrink-0" /> {error}
                    </div>
                </div>
            )}

            {/* Loading animation */}
            {loading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="glass-card p-8 text-center space-y-3"
                >
                    <div className="flex justify-center gap-1">
                        {[0, 1, 2].map(i => (
                            <motion.div
                                key={i}
                                className="w-2 h-2 rounded-full bg-primary"
                                animate={{ y: [0, -8, 0] }}
                                transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }}
                            />
                        ))}
                    </div>
                    <div className="text-text-secondary text-sm">Analyzing structure, detecting stack, applying PCTF+ framework...</div>
                    <div className="text-text-muted text-xs">This takes 3–8 seconds</div>
                </motion.div>
            )}

            {/* Result */}
            {result && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-5"
                >
                    {/* Header row */}
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-400" />
                            <span className="font-bold text-text-primary">Prompt Enhanced!</span>
                        </div>
                        {result.detectedStack && (
                            <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${stackColor}`}>
                                🔍 Detected: {result.detectedStack}
                            </span>
                        )}
                    </div>

                    {/* Summary */}
                    <div className="glass-card p-4 border-accent/20 bg-accent/5">
                        <div className="flex items-start gap-2">
                            <Lightbulb className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                            <p className="text-text-secondary text-sm leading-relaxed">{result.summary}</p>
                        </div>
                    </div>

                    {/* Enhanced prompt */}
                    <div className="glass-card overflow-hidden">
                        <div className="flex items-center justify-between p-4 border-b border-white/5">
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                                    <span className="text-green-400 text-[10px] font-bold">✓</span>
                                </div>
                                <span className="font-semibold text-green-400 text-sm">Enhanced Prompt — Ready to paste into Cursor</span>
                            </div>
                            <button onClick={copyEnhanced} className="btn-primary text-xs gap-1.5">
                                {copiedEnhanced
                                    ? <><CheckCircle className="w-3.5 h-3.5" /> Copied!</>
                                    : <><Copy className="w-3.5 h-3.5" /> Copy</>
                                }
                            </button>
                        </div>
                        <pre className="p-5 text-green-100/90 text-xs leading-relaxed font-mono whitespace-pre-wrap overflow-auto max-h-[500px] bg-green-950/10">
                            {result.enhanced}
                        </pre>
                    </div>

                    {/* Changes made */}
                    <div className="glass-card p-5">
                        <div className="flex items-center gap-2 mb-3">
                            <Target className="w-4 h-4 text-primary-light" />
                            <h3 className="font-semibold text-text-primary text-sm">What Was Changed & Why</h3>
                        </div>
                        <div className="space-y-2">
                            {result.changes.map((change, i) => (
                                <div key={i} className="flex items-start gap-2.5 text-sm">
                                    <span className="text-primary-light font-bold shrink-0 text-xs mt-0.5">{i + 1}.</span>
                                    <span className="text-text-secondary text-xs leading-relaxed">{change}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tips grid */}
                    <div className="glass-card p-5">
                        <div className="flex items-center gap-2 mb-3">
                            <Zap className="w-4 h-4 text-accent" />
                            <h3 className="font-semibold text-text-primary text-sm">Cursor-Specific Tips for Your Stack</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {result.tips.map((tip, i) => (
                                <div key={i} className="bg-bg-secondary rounded-lg p-3 border border-white/5">
                                    <div className="text-accent text-xs font-bold mb-1">TIP {i + 1}</div>
                                    <p className="text-text-secondary text-xs leading-relaxed">{tip}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Split prompts */}
                    {result.splitPrompts && result.splitPrompts.length > 0 && (
                        <div className="glass-card p-5 border-amber-500/20">
                            <div className="flex items-center gap-2 mb-3">
                                <AlertTriangle className="w-4 h-4 text-amber-400" />
                                <h3 className="font-semibold text-amber-400 text-sm">
                                    Your prompt had multiple tasks — send these as separate prompts:
                                </h3>
                            </div>
                            <div className="space-y-3">
                                {result.splitPrompts.map((sp, i) => (
                                    <div key={i} className="bg-amber-950/20 border border-amber-500/20 rounded-lg overflow-hidden">
                                        <div className="flex items-center justify-between px-3 py-2 border-b border-amber-500/10">
                                            <span className="text-amber-400 text-xs font-medium">Separate Prompt #{i + 2}</span>
                                            <button onClick={() => copySplit(sp, i)} className="text-xs text-text-muted hover:text-text-primary flex items-center gap-1 transition-colors">
                                                <Copy className="w-3 h-3" /> {copiedSplit === i ? 'Copied' : 'Copy'}
                                            </button>
                                        </div>
                                        <pre className="p-3 text-amber-100/80 text-xs leading-relaxed whitespace-pre-wrap font-mono">{sp}</pre>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Before / After comparison */}
                    <div className="glass-card overflow-hidden">
                        <div className="p-4 border-b border-white/5">
                            <h3 className="font-semibold text-text-primary text-sm">Side-by-Side Comparison</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/5">
                            <div className="p-4">
                                <div className="text-red-400 font-semibold text-xs mb-2 flex items-center gap-1.5">
                                    <span className="w-4 h-4 rounded-full bg-red-500/20 flex items-center justify-center text-[9px]">✗</span>
                                    BEFORE — Your original
                                </div>
                                <pre className="text-red-200/70 text-xs leading-relaxed whitespace-pre-wrap font-mono max-h-64 overflow-auto">{input}</pre>
                            </div>
                            <div className="p-4">
                                <div className="text-green-400 font-semibold text-xs mb-2 flex items-center gap-1.5">
                                    <span className="w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center text-[9px]">✓</span>
                                    AFTER — Enhanced
                                </div>
                                <pre className="text-green-200/90 text-xs leading-relaxed whitespace-pre-wrap font-mono max-h-64 overflow-auto">{result.enhanced}</pre>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    )
}

// ─── Real examples from actual codebase prompts ─────────────────────────────

const PROMPT_EXAMPLES = [
    {
        id: 'arch-review',
        category: 'Architecture Review',
        tag: '🔍 Review',
        tagColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
        issue: 'Vague, no scope, no context, no done criteria, impossible to verify',
        bad: `review the complete architecture all best practices and everything that we poreprly have strog backbone of architecture and we are ready to mvoe towards teh real api end points
and i ahev added the enw localization fiels in the firebase as i think everytime we need to manually do this, or automate it?`,
        problems: [
            'No specific files mentioned — agent reads entire codebase blindly',
            '"Review everything" is unverifiable — no criteria defined',
            'Two unrelated questions in one prompt (architecture + Firebase)',
            'Typos force the model to guess your meaning',
            'No done criteria — how do you know it finished correctly?',
        ],
        good: `You are a senior Android/Kotlin engineer.

[CONTEXT]
Architecture: MVVM + Clean (UI → ViewModel → Repository → API)
Files: @app/src/main/java/com/example/ (entire src tree)
Target: verify we are API-ready before connecting real endpoints

[TASK]
Perform a pre-API architecture audit. Check only:
1. Are all ViewModels free of direct API/network calls?
2. Are Repositories injected via Hilt — no manual instantiation?
3. Are all hardcoded strings moved to strings.xml / constants?
4. Are all Coroutine calls scoped to viewModelScope (no GlobalScope)?
5. Does any screen have business logic that should be in a ViewModel?

[FORMAT]
For each issue found:
🔴 CRITICAL | File: [path] | Line: [N] | Issue: [exact problem] | Fix: [exact fix]
🟡 WARNING  | [same format]

Summary: "API-ready: YES / NO — [N] blockers found"

[DONE CRITERIA]
Report is complete when all 5 categories above are explicitly addressed.

[SEPARATE QUESTION — send as separate prompt]
Regarding Firebase localization: should we automate JSON pushes?`,
        principles: ['One concern per prompt', 'Named specific files', 'Defined audit scope', 'Structured output format', 'Clear done criteria'],
    },
    {
        id: 'bug-crash',
        category: 'Crash Debug',
        tag: '💥 Crash',
        tagColor: 'bg-red-500/20 text-red-400 border-red-500/30',
        issue: 'No stack trace, no steps, no context — the agent cannot debug what it cannot see',
        bad: `@logs check the logs indepth when i switch tabs from home to lib and search it lags little bit.
indepth check it, and also check proerply the localizatioj working from firebase or not?

in offline its perfect in online it make issue deep debug it  and resolve this and alos check the connectstions with all screens`,
        problems: [
            'No stack trace, no profiling output — @logs alone is insufficient',
            'Three separate problems in one prompt (lag + localization + offline)',
            '"It lags a little bit" — not quantified or reproducible',
            'No device model or Android version specified',
            '"Check connections with all screens" — impossible task scope',
        ],
        good: `[PERFORMANCE DEBUG — Tab-switch lag]

[CONTEXT]
@terminal — last 50 lines of logcat output
Device: Samsung Galaxy S21, Android 13
Repro steps (100% reproducible):
1. Launch app
2. Tap "Library" tab
3. Tap "Search" tab
→ Noticeable stutter/freeze ~200-400ms

[TASK]
Debug the tab-switch lag between Home → Library → Search.

Likely suspects: @HomeScreen.kt, @LibraryScreen.kt, @SearchScreen.kt
Check:
1. Are all screens in the NavHost? Could be recomposition issue.
2. Is there a heavy operation running on Main thread on tab select?
3. Is there a missing LaunchedEffect key causing restarts?

Find the root cause. Provide a fix with exact file and line number.

[SEPARATE PROMPT — send next]
Firebase localization not working online: [describe with logcat error]`,
        principles: ['Exact steps to reproduce', 'Device + OS specified', 'Attached actual output', 'Isolated one problem', 'Named likely files'],
    },
    {
        id: 'feature-impl',
        category: 'Feature Implementation',
        tag: '🏗️ Feature',
        tagColor: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
        issue: 'Wall of text mixing analysis, questions, and implementation — no phase boundary',
        bad: `perfect as you are an senior ios develoepr, analzye the above complete behaviour of the api implemntation and all, and now we need to implement the courses screen api,

courses has content type 5, i want you to run the curl test and analzye the data for the multiple courses responses

so in courses, we have multiple modules/lessona and inside each we have the multiple videos/content, analzye the current mock data so that you ahve a great idea about it`,
        problems: [
            'Mixes analysis + implementation + questions in one prompt',
            'Says "analyze" and "implement" without a phase boundary',
            '"Analyze the above" — no stable context, relies on chat history',
            'Screen details in plain text instead of structured spec',
            '"and also" chains — agent does too many things at once',
        ],
        good: `You are a senior iOS engineer specializing in UIKit/SwiftUI + MVVM + REST.

[CONTEXT]
Content type 5 = Courses
API pattern to follow: @LibraryScreen.swift
Mock data for reference: @CoursesDetailScreen.swift

[RECONNAISSANCE — do this first, no code yet]
Run: curl -s "[API_URL]?contentType=5" | head -200
Report the JSON structure. State your understanding of: modules → lessons hierarchy.

[TASK — only after recon]
Implement CoursesDetailScreen:
- Header: course.title + selectedModule.name subtitle + lesson count right
- Content: video/image/pdf based on lesson.type
- Accordion: module list, empty modules show "No lessons"
- Info tab: category, title, ageGroup, moduleCount, description

[NEGATIVE]
- Do NOT show lesson name in header subtitle — only module name
- Do NOT implement Home screen — Library only
- Do NOT change API service layer

[PATTERN]
Match exactly: @ArticleDetailScreen.swift`,
        principles: ['Phase separation (Recon → Task)', 'Specific data source', 'Structured spec', 'NEGATIVE constraints', 'Pattern reference'],
    },
    {
        id: 'refactor',
        category: 'Refactoring',
        tag: '♻️ Refactor',
        tagColor: 'bg-green-500/20 text-green-400 border-green-500/30',
        issue: 'No safety constraints — agent may change public APIs and break callers',
        bad: `search fro the mvvm+clean architecture and everythign liek the sisues we have resovled above indepth check them and proerply resolve them if amything like against the ebst rpactices liekw e are calling inside the views , indepth analzye these thigns from start to end , donto skip any folder donot siskip any fiel`,
        problems: [
            '"Don\'t skip any file" — agent will scan hundreds of files without focus',
            '"Issues we resolved above" — relies on lost context from earlier in chat',
            'No constraints: agent can change public APIs, breaking call sites',
            'No scope: everything in the entire codebase is fair game',
        ],
        good: `You are a senior Android Kotlin engineer.

[CONTEXT]
Architecture: MVVM + Clean Architecture
Violations to fix: Views calling Repository directly (bypassing ViewModel)
Scope: ONLY @app/src/main/java/com/example/presentation/ (no data/domain layers)

[TASK]
Audit presentation layer for MVVM violations:
1. Direct Repository/UseCase calls from Fragment or Activity
2. Business logic inside Fragment/Activity
3. StateFlow collection NOT in lifecycle-aware scope

[NEGATIVE — these must NOT change]
- Do NOT modify any public function signatures
- Do NOT touch /data/ or /domain/ directories
- Do NOT refactor code unrelated to the violations above

[FORMAT — output BEFORE making changes]
File: [path] | Line: [N] | Violation: [type] | Fix: [one line]

After I approve the report: implement only violations I mark ✅`,
        principles: ['Scoped to presentation layer', 'Explicit violations defined', 'NEGATIVE protects other layers', 'Approval gate before implementation'],
    },
    {
        id: 'fix-imports',
        category: 'PR Review Fix',
        tag: '🔧 Fix',
        tagColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
        issue: 'Raw PR dump without extracting the actual task — agent gets confused by GitHub metadata',
        bad: `resolve these all imports issue, indepth check and resolve all these issues 
app/src/main/java/com/example/hockeyfoodapp/di/FirebaseModule.kt
@sardarKhan-dev reviewed 20 minutes ago
HockeyFoodSegmentedTabBar.kt
onTabSelected = {}
fix import issue`,
        problems: [
            'GitHub PR metadata (reviewer names, timestamps) is noise',
            '"Resolve these all" — no clarity on how many files or what the issue is',
            'Pasted raw diff fragment without file context',
            '"Indepth check" — undefined scope',
        ],
        good: `[TASK]
Fix import resolution errors in 3 Kotlin files from PR #42.

Files:
1. @HockeyFoodSegmentedTabBar.kt — PreviewTranslateProvider import unresolved
2. @HockeyFoodTextField.kt — PreviewTranslateProvider import unresolved
3. @ScreenHeaderView.kt — PreviewTranslateProvider import unresolved

[WHAT TO FIX]
All 3 use: languageViewModel = com.example.hockeyfoodapp.presentation.language.PreviewTranslateProvider
Find where PreviewTranslateProvider is declared and add the correct import statement.

[NEGATIVE]
- Only add the missing import — do not refactor @Preview functions
- Do not change any non-preview production code`,
        principles: ['Extracted relevant info only', 'Listed exact files with issues', 'Clear problem statement', 'NEGATIVE prevents over-refactoring'],
    },
    {
        id: 'ui-fix',
        category: 'UI Bug Fix',
        tag: '🎨 UI Bug',
        tagColor: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
        issue: 'No screenshot, no reproduce steps, multiple unrelated bugs combined',
        bad: `check ss when i click on the view all, the first course card is focused, like we have view all of other contents, deep check and resolve, also check the first article when u run the api its data shows like this, none of the other article have this structure why? alos snalaye the compelte files`,
        problems: [
            '"Check ss" — screenshot referenced but not attached',
            'Two unrelated bugs in one prompt',
            '"Analyze complete files" — unbounded scope appended',
            'No file names or component names provided',
        ],
        good: `[BUG REPORT — View All: first card auto-focused]

[STEPS TO REPRODUCE]
1. Open Library screen
2. Tap "View All" on Courses section
3. Expected: List opens with no card selected
4. Actual: First course card appears highlighted/focused

[FILES TO CHECK]
@CoursesListScreen.kt — LaunchedEffect or initial selection state
@CoursesListViewModel.kt — check if selectedIndex defaults to 0

[HYPOTHESIS]
selectedCourse should be null on initial load, not list[0].

[NEGATIVE]
- Do NOT touch Articles or Videos sections — separate issue
- Do not refactor beyond the bug fix

[SEPARATE PROMPT — after this resolves]
Article API structure discrepancy: [paste exact JSON diff]`,
        principles: ['Steps to reproduce', 'Expected vs actual', 'Named likely files', 'Isolated one bug', 'Deferred unrelated issue'],
    },
]

// ─── Live Prompt Scorer ───────────────────────────────────────────────────────

const IMPROVEMENT_RULES = [
    { id: 'persona', label: 'Add Persona', points: 15, check: (p: string) => /you are a senior|act as a|persona/i.test(p) },
    { id: 'context', label: 'Reference Files (@)', points: 20, check: (p: string) => /@[\w./]/.test(p) },
    { id: 'task', label: 'Clear Imperative Verb', points: 15, check: (p: string) => /^(create|fix|refactor|add|implement|convert|migrate|debug|review|write|update)/im.test(p) },
    { id: 'negative', label: 'NEGATIVE Constraints', points: 20, check: (p: string) => /do not|don't|negative|must not|never|avoid/i.test(p) },
    { id: 'format', label: 'Output Format Defined', points: 15, check: (p: string) => /format|output|produce|list each|for each|report/i.test(p) },
    { id: 'scope', label: 'Bounded Scope', points: 10, check: (p: string) => /only|scope|limit|do not touch|single file|one task/i.test(p) },
    { id: 'done', label: 'Done Criteria', points: 5, check: (p: string) => /done when|complete when|success when|all tests pass|build exits/i.test(p) },
]

function LiveImprover() {
    const [input, setInput] = useState('')
    const [copied, setCopied] = useState(false)

    const results = IMPROVEMENT_RULES.map(rule => ({ ...rule, passed: rule.check(input) }))
    const score = results.filter(r => r.passed).reduce((a, r) => a + r.points, 0)
    const maxScore = IMPROVEMENT_RULES.reduce((a, r) => a + r.points, 0)
    const pct = Math.round((score / maxScore) * 100)
    const grade = pct >= 90 ? { label: 'Excellent', color: 'text-green-400' }
        : pct >= 70 ? { label: 'Good', color: 'text-accent' }
            : pct >= 50 ? { label: 'Fair', color: 'text-amber-400' }
                : { label: 'Needs Work', color: 'text-red-400' }

    const missing = results.filter(r => !r.passed)

    return (
        <div className="glass-card p-6 space-y-5">
            <div>
                <h2 className="text-xl font-bold text-text-primary mb-1">⚡ Live Prompt Scorer</h2>
                <p className="text-text-secondary text-sm">Instant 7-dimension PCTF+ quality score. No AI needed — scores as you type.</p>
            </div>
            <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Paste your prompt here — score updates as you type."
                className="w-full h-44 bg-bg-secondary border border-white/10 rounded-xl p-4 text-text-primary text-sm font-mono resize-none focus:outline-none focus:border-primary/50 placeholder-text-muted leading-relaxed"
            />
            {input.length > 10 && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className={`text-4xl font-black ${grade.color}`}>{pct}</div>
                            <div>
                                <div className={`font-bold ${grade.color}`}>{grade.label}</div>
                                <div className="text-text-muted text-xs">Prompt Quality Score / 100</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button onClick={() => setInput('')} className="btn-secondary text-xs gap-1.5">
                                <RotateCcw className="w-3.5 h-3.5" /> Clear
                            </button>
                            <button onClick={() => { navigator.clipboard.writeText(input); setCopied(true); setTimeout(() => setCopied(false), 2000) }} className="btn-primary text-xs gap-1.5">
                                <Copy className="w-3.5 h-3.5" /> {copied ? 'Copied!' : 'Copy'}
                            </button>
                        </div>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: pct >= 70 ? '#06D6A0' : pct >= 50 ? '#F59E0B' : '#EF4444' }} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {results.map(r => (
                            <div key={r.id} className={`flex items-center gap-2.5 p-2.5 rounded-lg border text-sm ${r.passed ? 'bg-green-500/10 border-green-500/20' : 'bg-white/3 border-white/5'}`}>
                                {r.passed ? <CheckCircle className="w-4 h-4 text-green-400 shrink-0" /> : <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />}
                                <span className={r.passed ? 'text-green-300' : 'text-text-muted'}>{r.label}</span>
                                <span className="ml-auto text-xs text-text-muted">+{r.points}pts</span>
                            </div>
                        ))}
                    </div>
                    {missing.length > 0 && (
                        <div className="bg-bg-secondary rounded-xl p-4 border border-white/5">
                            <div className="text-sm font-semibold text-text-primary mb-2">💡 To improve your score, add:</div>
                            <ul className="space-y-1.5">
                                {missing.map(r => (
                                    <li key={r.id} className="text-text-secondary text-xs flex items-start gap-2">
                                        <span className="text-accent shrink-0 mt-0.5">→</span>
                                        <span>
                                            <strong className="text-text-primary">{r.label}: </strong>
                                            {r.id === 'persona' && 'Start with: "You are a senior [iOS/Android/Web] engineer..."'}
                                            {r.id === 'context' && 'Reference files with @filename.ext or @codebase'}
                                            {r.id === 'task' && 'Begin the task line with: Create / Fix / Refactor / Implement'}
                                            {r.id === 'negative' && 'Add [NEGATIVE]: "Do NOT modify... Do NOT change..."'}
                                            {r.id === 'format' && 'Define output: list, structured report, code block'}
                                            {r.id === 'scope' && '"Only touch X. Do not change Y or Z."'}
                                            {r.id === 'done' && '"Done when: build passes, all tests green"'}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </motion.div>
            )}
        </div>
    )
}

// ─── Example Card ─────────────────────────────────────────────────────────────

function ExampleCard({ ex, index }: { ex: typeof PROMPT_EXAMPLES[0]; index: number }) {
    const [expanded, setExpanded] = useState(false)
    const [copiedBad, setCopiedBad] = useState(false)
    const [copiedGood, setCopiedGood] = useState(false)

    const copy = (text: string, which: 'bad' | 'good') => {
        navigator.clipboard.writeText(text)
        if (which === 'bad') { setCopiedBad(true); setTimeout(() => setCopiedBad(false), 2000) }
        else { setCopiedGood(true); setTimeout(() => setCopiedGood(false), 2000) }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.06 }}
            className="glass-card overflow-hidden hover:border-white/20 transition-all duration-300"
        >
            <div className="p-5">
                <div className="flex flex-wrap gap-2 mb-2">
                    <span className={`badge border text-xs ${ex.tagColor}`}>{ex.tag}</span>
                    <span className="badge bg-white/5 border-white/10 text-text-muted text-xs">{ex.category}</span>
                </div>
                <p className="text-red-400 text-xs font-medium mb-3 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" /> {ex.issue}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {ex.principles.map(p => (
                        <span key={p} className="text-[11px] bg-accent/10 text-accent border border-accent/20 rounded px-2 py-0.5">✓ {p}</span>
                    ))}
                </div>
                <button onClick={() => setExpanded(e => !e)} className="w-full flex items-center justify-between text-sm text-primary-light hover:text-white font-medium py-1 transition-colors">
                    <span>View Before → After Transformation</span>
                    {expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
            </div>
            <AnimatePresence>
                {expanded && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden border-t border-white/5">
                        <div className="p-5 pb-3">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-red-400 font-semibold text-sm">✗ BEFORE — What was sent</span>
                                <button onClick={() => copy(ex.bad, 'bad')} className="text-xs text-text-muted hover:text-text-primary flex items-center gap-1 transition-colors">
                                    <Copy className="w-3 h-3" /> {copiedBad ? 'Copied' : 'Copy'}
                                </button>
                            </div>
                            <pre className="bg-red-950/30 border border-red-500/20 rounded-lg p-3 text-red-200/80 text-xs leading-relaxed whitespace-pre-wrap overflow-auto max-h-48">{ex.bad}</pre>
                            <div className="mt-3 space-y-1.5">
                                {ex.problems.map((p, i) => <div key={i} className="text-xs text-text-muted flex items-start gap-2"><span className="text-red-400 shrink-0">✗</span>{p}</div>)}
                            </div>
                        </div>
                        <div className="flex justify-center py-2">
                            <div className="flex items-center gap-2 text-xs text-text-muted">
                                <ArrowRight className="w-4 h-4 text-accent" /><span>Transformed using PCTF+ framework</span><ArrowRight className="w-4 h-4 text-accent" />
                            </div>
                        </div>
                        <div className="p-5 pt-3">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-green-400 font-semibold text-sm">✓ AFTER — Production-grade prompt</span>
                                <button onClick={() => copy(ex.good, 'good')} className="btn-primary text-xs gap-1.5">
                                    <Copy className="w-3.5 h-3.5" /> {copiedGood ? 'Copied!' : 'Copy Prompt'}
                                </button>
                            </div>
                            <pre className="bg-green-950/20 border border-green-500/20 rounded-lg p-4 text-green-100/90 text-xs leading-relaxed whitespace-pre-wrap overflow-auto max-h-80">{ex.good}</pre>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

// ─── Golden Rules ─────────────────────────────────────────────────────────────

const GOLDEN_RULES = [
    { no: '1', title: 'One Task Per Prompt', icon: '🎯', color: 'from-purple-500 to-purple-700', bad: '"Fix the crash, add dark mode, write tests, and review the architecture"', good: 'One prompt → one crash fix. New prompt → dark mode. Verify each before next.', why: 'The model\'s accuracy degrades exponentially with prompt complexity.' },
    { no: '2', title: 'Never Summarize Errors — Paste Full Output', icon: '📋', color: 'from-red-500 to-red-700', bad: '"There\'s some kind of nil crash on the home screen"', good: '@terminal ← full logcat/crash log, not your interpretation of it', why: 'The model cannot debug what it cannot see. Summaries strip the signal it needs.' },
    { no: '3', title: 'Always Reference Files With @', icon: '📎', color: 'from-blue-500 to-blue-700', bad: '"Check the repository file"', good: '@app/src/main/java/com/example/data/repo/UserRepository.kt', why: 'Without @, the model searches semantically — slower, less precise. Explicit = deterministic.' },
    { no: '4', title: 'Constraints Beat Instructions', icon: '🚧', color: 'from-amber-500 to-amber-700', bad: '"Refactor the auth module"', good: '"Refactor @AuthViewModel.kt. Do NOT change any public function signatures."', why: 'The model knows how to refactor. What it doesn\'t know are YOUR constraints.' },
    { no: '5', title: 'Always Name The Pattern File', icon: '📐', color: 'from-green-500 to-green-700', bad: '"Create a new screen following MVVM"', good: '"Create screen following the EXACT pattern of @ProfileScreen.kt"', why: 'General patterns have infinite variations. A file reference gives the exact convention.' },
    { no: '6', title: 'Separate Recon From Implementation', icon: '🔍', color: 'from-cyan-500 to-cyan-700', bad: '"Add the course screen and connect it to the API"', good: 'Prompt 1: "Read @[files]. State understanding. No code yet." → Prompt 2: "Implement."', why: 'Agents that write without reading make assumptions. That\'s where bugs live.' },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PromptLab() {
    const [activeTab, setActiveTab] = useState<'ai' | 'examples' | 'scorer' | 'rules'>('ai')
    const [filterCat, setFilterCat] = useState('All')
    const categories = ['All', ...PROMPT_EXAMPLES.map(e => e.category)]
    const filtered = filterCat === 'All' ? PROMPT_EXAMPLES : PROMPT_EXAMPLES.filter(e => e.category === filterCat)

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
            <div>
                <h1 className="text-3xl font-black text-text-primary mb-2">Prompt Lab</h1>
                <p className="text-text-secondary max-w-3xl leading-relaxed">
                    Your AI-powered prompt workshop. Paste any messy Cursor prompt and the AI rewrites it into a production-grade version,
                    detects your tech stack, splits multi-task prompts, and gives Cursor-specific tips. Or study the manual before/after examples to learn the patterns yourself.
                </p>
            </div>

            {/* Tab nav */}
            <div className="flex flex-wrap gap-2 p-1 bg-bg-secondary rounded-xl border border-white/5 w-fit">
                {([
                    { key: 'ai', label: '🤖 AI Enhancer', highlight: true },
                    { key: 'examples', label: '📚 Before / After' },
                    { key: 'scorer', label: '⚡ Live Scorer' },
                    { key: 'rules', label: '📏 Golden Rules' },
                ] as const).map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`text-sm px-4 py-2 rounded-lg font-medium transition-all ${activeTab === tab.key
                                ? 'bg-primary/30 text-primary-light border border-primary/40'
                                : 'text-text-muted hover:text-text-primary'
                            }`}
                    >
                        {tab.label}
                        {tab.key === 'ai' && activeTab !== 'ai' && (
                            <span className="ml-1.5 text-[10px] bg-accent/20 text-accent rounded px-1 py-0.5">NEW</span>
                        )}
                    </button>
                ))}
            </div>

            {/* AI Enhancer */}
            {activeTab === 'ai' && <AIEnhancer />}

            {/* Examples Tab */}
            {activeTab === 'examples' && (
                <div className="space-y-6">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {[
                            { label: 'Real Prompts', value: PROMPT_EXAMPLES.length, color: 'text-primary-light' },
                            { label: 'Transformations', value: PROMPT_EXAMPLES.length, color: 'text-accent' },
                            { label: 'Anti-Patterns', value: PROMPT_EXAMPLES.reduce((a, e) => a + e.problems.length, 0), color: 'text-red-400' },
                            { label: 'Principles Applied', value: PROMPT_EXAMPLES.reduce((a, e) => a + e.principles.length, 0), color: 'text-green-400' },
                        ].map(s => (
                            <div key={s.label} className="glass-card p-4 text-center">
                                <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
                                <div className="text-text-muted text-xs mt-1">{s.label}</div>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {categories.map(cat => (
                            <button key={cat} onClick={() => setFilterCat(cat)} className={`text-xs px-3 py-1.5 rounded-lg border transition-all font-medium ${filterCat === cat ? 'bg-primary/20 text-primary-light border-primary/30' : 'bg-white/5 text-text-muted border-white/10 hover:bg-white/10'}`}>{cat}</button>
                        ))}
                    </div>
                    <div className="space-y-4">
                        {filtered.map((ex, i) => <ExampleCard key={ex.id} ex={ex} index={i} />)}
                    </div>
                </div>
            )}

            {/* Scorer */}
            {activeTab === 'scorer' && <LiveImprover />}

            {/* Golden Rules */}
            {activeTab === 'rules' && (
                <div className="space-y-5">
                    <p className="text-text-secondary text-sm max-w-2xl">6 rules that explain 90% of why Cursor prompts fail. Derived from real production development sessions.</p>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                        {GOLDEN_RULES.map((rule, i) => (
                            <motion.div key={rule.no} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} className="glass-card overflow-hidden hover:border-white/20 transition-all">
                                <div className={`h-1 bg-gradient-to-r ${rule.color}`} />
                                <div className="p-5">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br ${rule.color} text-xl`}>{rule.icon}</div>
                                        <div>
                                            <div className="text-xs text-text-muted">Rule {rule.no}</div>
                                            <h3 className="font-bold text-text-primary">{rule.title}</h3>
                                        </div>
                                    </div>
                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-start gap-2 p-2.5 bg-red-950/30 border border-red-500/20 rounded-lg">
                                            <span className="text-red-400 text-sm shrink-0">✗</span>
                                            <code className="text-red-200/80 text-xs italic leading-relaxed">{rule.bad}</code>
                                        </div>
                                        <div className="flex items-start gap-2 p-2.5 bg-green-950/20 border border-green-500/20 rounded-lg">
                                            <span className="text-green-400 text-sm shrink-0">✓</span>
                                            <code className="text-green-200/90 text-xs leading-relaxed">{rule.good}</code>
                                        </div>
                                    </div>
                                    <p className="text-text-muted text-xs leading-relaxed border-t border-white/5 pt-3">
                                        <span className="text-text-secondary font-medium">Why: </span>{rule.why}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
