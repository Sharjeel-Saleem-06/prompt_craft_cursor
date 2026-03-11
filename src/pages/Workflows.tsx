import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Plus, Trash2 } from 'lucide-react'
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { getGuide } from '../data/parser'
import type { Workflow } from '../data/types'
import { CopyButton } from '../components/CopyButton'

const RADAR_DATA_BASE = [
    { subject: 'Speed' },
    { subject: 'Quality' },
    { subject: 'Safety' },
    { subject: 'Parallelism' },
    { subject: 'Ease' },
]

const WORKFLOW_RADAR: Record<string, Record<string, number>> = {
    'prd-to-ship': { Speed: 70, Quality: 95, Safety: 80, Parallelism: 40, Ease: 65 },
    'tdd-loop': { Speed: 55, Quality: 98, Safety: 95, Parallelism: 30, Ease: 60 },
    'daily-dev-loop': { Speed: 88, Quality: 80, Safety: 75, Parallelism: 50, Ease: 90 },
    'parallel-agents': { Speed: 95, Quality: 78, Safety: 50, Parallelism: 100, Ease: 55 },
    'debug-pipeline': { Speed: 50, Quality: 95, Safety: 90, Parallelism: 20, Ease: 65 },
}

const WORKFLOW_COLORS = ['#7C3AED', '#06D6A0', '#F59E0B', '#3B82F6', '#EC4899']

const ALL_STEPS = [
    { id: 'fresh-session', title: '🆕 Fresh Session', description: 'Start a new Agent chat with a context header', prompt: 'PROJECT CONTEXT:\n- App: [name]\n- Stack: [stack]\n- Task: [describe task]\nRelevant files: @[file1] @[file2]' },
    { id: 'plan-mode', title: '📋 Plan Mode', description: 'Shift+Tab to generate plan before coding', prompt: '[Shift+Tab in Agent]\nImplement [feature].\nProduce: files to create, modify, not touch, execution order, risks.\nDo not write code. I will review first.' },
    { id: 'recon-pass', title: '🔍 Reconnaissance', description: 'Read files before writing any code', prompt: 'Before writing any code:\n1. Read @[files to modify]\n2. Find all callers: @codebase "[function name]"\n3. State your understanding\n4. State assumptions and risks\nThen implement.' },
    { id: 'code-review', title: '✅ Code Review', description: 'Run /code-review on the diff', prompt: '/code-review\n\nReview @git diff main.\nReport: 🔴 CRITICAL / 🟡 IMPORTANT / 🟢 SUGGESTION\nReady to merge: YES if zero 🔴 items.' },
    { id: 'self-reflect', title: '🪞 Self-Reflect', description: 'Agent reviews its own output before you', prompt: 'Before showing me the code, review for:\n1. Crashes / force unwraps / nil access\n2. Memory leaks / retain cycles\n3. Missing error handling\n4. Convention violations\nFix ALL issues. Do not say "no issues" without looking.' },
    { id: 'pr-desc', title: '📝 PR Description', description: 'Generate PR description from git diff', prompt: '/pr-description\n\n@git diff main — write PR description:\n## Summary\n## Changes\n## Why\n## How to Test\n## Breaking Changes' },
    { id: 'write-tests', title: '🧪 Write Tests', description: 'Write comprehensive unit tests', prompt: '/write-tests @[filename]\n\nCover: happy path, null input, boundary values, error states, async loading/success/error.' },
    { id: 'bugbot', title: '🤖 BugBot Review', description: 'Trigger BugBot on the PR', prompt: 'Comment on PR: bugbot run\n→ Forces fresh BugBot analysis\n→ Fix all 🔴 CRITICAL findings before merge' },
]

function WorkflowCard({ workflow, index }: { workflow: Workflow; index: number }) {
    const [expanded, setExpanded] = useState(false)

    const fullPrompt = workflow.steps.map(s => `// STEP: ${s.title}\n${s.description}${s.command ? `\n→ ${s.command}` : ''}`).join('\n\n')

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.07 }}
            className="glass-card overflow-hidden hover:border-white/20 transition-all duration-300"
        >
            <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="font-bold text-text-primary text-lg">{workflow.name}</h3>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                        style={{ background: `linear-gradient(135deg, ${WORKFLOW_COLORS[index % WORKFLOW_COLORS.length]}, ${WORKFLOW_COLORS[(index + 1) % WORKFLOW_COLORS.length]})` }}>
                        {index + 1}
                    </div>
                </div>

                <p className="text-text-secondary text-sm leading-relaxed mb-4">{workflow.description}</p>

                {/* Metrics row */}
                <div className="grid grid-cols-4 gap-2 mb-4">
                    {[
                        { label: 'Speed', value: workflow.speed, color: '#06D6A0' },
                        { label: 'Quality', value: workflow.quality, color: '#7C3AED' },
                        { label: 'Safety', value: 100 - workflow.risk, color: '#F59E0B' },
                        { label: 'Complexity', value: workflow.complexity, color: '#3B82F6' },
                    ].map(m => (
                        <div key={m.label} className="text-center">
                            <div className="text-xs text-text-muted mb-1">{m.label}</div>
                            <div className="text-sm font-bold" style={{ color: m.color }}>{m.value}%</div>
                            <div className="h-1 bg-white/10 rounded-full overflow-hidden mt-1">
                                <div className="h-full rounded-full transition-all duration-700" style={{ width: `${m.value}%`, background: m.color }} />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Step Flow */}
                <div className="space-y-1 mb-4">
                    <div className="text-xs font-semibold text-text-muted mb-2">WORKFLOW STEPS</div>
                    <div className="flex flex-wrap items-center gap-1">
                        {workflow.steps.map((step, i) => (
                            <span key={step.id} className="flex items-center gap-1">
                                <span className="text-xs bg-bg-secondary border border-white/10 rounded px-2 py-1 text-text-secondary whitespace-nowrap">
                                    {i + 1}. {step.title}
                                </span>
                                {i < workflow.steps.length - 1 && <ArrowRight className="w-3 h-3 text-text-muted shrink-0" />}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setExpanded(e => !e)}
                        className="btn-secondary text-xs flex-1 justify-center"
                    >
                        {expanded ? 'Hide Details' : 'View Step Details'}
                    </button>
                    <CopyButton text={fullPrompt} />
                </div>
            </div>

            {expanded && (
                <div className="px-5 pb-5 border-t border-white/5 pt-4 space-y-3">
                    {workflow.steps.map((step, i) => (
                        <div key={step.id} className="flex gap-3">
                            <div className="w-7 h-7 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary-light text-xs font-bold shrink-0">
                                {i + 1}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="font-semibold text-text-primary text-sm">{step.title}</div>
                                <p className="text-text-secondary text-xs mt-0.5 leading-relaxed">{step.description}</p>
                                {step.command && (
                                    <code className="text-xs text-accent font-mono mt-1 block">{step.command}</code>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </motion.div>
    )
}

export default function Workflows() {
    const guide = getGuide()
    const [selectedSteps, setSelectedSteps] = useState<string[]>([])

    const toggleStep = (id: string) => {
        setSelectedSteps(prev =>
            prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
        )
    }

    const customPrompt = selectedSteps
        .map(id => ALL_STEPS.find(s => s.id === id))
        .filter(Boolean)
        .map((s, i) => `// ── STEP ${i + 1}: ${s!.title} ──\n${s!.prompt}`)
        .join('\n\n')

    // Radar chart data for all workflows
    const radarData = RADAR_DATA_BASE.map(base => {
        const row: Record<string, number | string> = { subject: base.subject }
        for (const w of guide.workflows) {
            row[w.name] = WORKFLOW_RADAR[w.id]?.[base.subject] ?? 50
        }
        return row
    })

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">

            <div>
                <h1 className="text-3xl font-black text-text-primary mb-2">Workflow Builder</h1>
                <p className="text-text-secondary">
                    Production-tested development workflows for Cursor-powered teams. Each workflow is a proven sequence of Cursor modes, prompting techniques, and review steps.
                    Use the builder at the bottom to assemble a custom workflow tailored to your task.
                </p>
            </div>

            {/* Effectiveness Radar */}
            <div className="glass-card p-6">
                <h2 className="font-bold text-text-primary mb-1">Workflow Effectiveness Comparison</h2>
                <p className="text-text-muted text-xs mb-4">Multi-dimensional comparison across Speed, Quality, Safety, Parallelism, and Ease</p>
                <ResponsiveContainer width="100%" height={280}>
                    <RadarChart data={radarData}>
                        <PolarGrid stroke="rgba(255,255,255,0.08)" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748B', fontSize: 11 }} />
                        {guide.workflows.map((w, i) => (
                            <Radar key={w.id} name={w.name} dataKey={w.name}
                                stroke={WORKFLOW_COLORS[i % WORKFLOW_COLORS.length]}
                                fill={WORKFLOW_COLORS[i % WORKFLOW_COLORS.length]}
                                fillOpacity={0.1}
                            />
                        ))}
                        <Legend wrapperStyle={{ fontSize: '11px', color: '#64748B' }} />
                        <Tooltip contentStyle={{ background: '#1A1A2E', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                    </RadarChart>
                </ResponsiveContainer>
            </div>

            {/* Workflow Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {guide.workflows.map((w, i) => (
                    <WorkflowCard key={w.id} workflow={w} index={i} />
                ))}
            </div>

            {/* Custom Workflow Builder */}
            <div className="glass-card p-6">
                <h2 className="text-xl font-bold text-text-primary mb-1">Build Your Custom Workflow</h2>
                <p className="text-text-secondary text-sm mb-5">
                    Select steps in order. Each step generates its prompt snippet. The full combined prompt will be ready to copy and paste.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                    {ALL_STEPS.map(step => (
                        <button
                            key={step.id}
                            onClick={() => toggleStep(step.id)}
                            className={`text-left p-3 rounded-xl border text-sm transition-all duration-200 ${selectedSteps.includes(step.id)
                                    ? 'bg-primary/20 border-primary/40 text-primary-light'
                                    : 'bg-white/3 border-white/10 text-text-secondary hover:bg-white/8 hover:text-text-primary'
                                }`}
                        >
                            <div className="font-medium mb-0.5">{step.title}</div>
                            <div className="text-xs opacity-70">{step.description}</div>
                        </button>
                    ))}
                </div>

                {selectedSteps.length > 0 && (
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-text-primary text-sm">
                                Your Workflow ({selectedSteps.length} steps)
                            </h3>
                            <div className="flex gap-2">
                                <CopyButton text={customPrompt} />
                                <button onClick={() => setSelectedSteps([])} className="btn-secondary text-xs gap-1">
                                    <Trash2 className="w-3.5 h-3.5" /> Clear
                                </button>
                            </div>
                        </div>

                        {/* Selected steps flow */}
                        <div className="flex flex-wrap items-center gap-2 p-3 bg-bg-secondary rounded-xl border border-white/5">
                            {selectedSteps.map((id, i) => {
                                const step = ALL_STEPS.find(s => s.id === id)
                                return (
                                    <span key={id} className="flex items-center gap-1">
                                        <span className="badge bg-primary/20 text-primary-light border-primary/30 text-xs">
                                            {i + 1}. {step?.title}
                                        </span>
                                        {i < selectedSteps.length - 1 && <ArrowRight className="w-3 h-3 text-text-muted" />}
                                    </span>
                                )
                            })}
                        </div>

                        <pre className="code-block p-4 text-text-secondary text-xs overflow-auto max-h-72 whitespace-pre-wrap leading-relaxed">
                            {customPrompt}
                        </pre>
                    </div>
                )}

                {selectedSteps.length === 0 && (
                    <div className="text-center py-8 text-text-muted border border-dashed border-white/10 rounded-xl">
                        <Plus className="w-8 h-8 mx-auto mb-2 opacity-40" />
                        <p className="text-sm">Select steps above to build your custom workflow</p>
                    </div>
                )}
            </div>
        </div>
    )
}
