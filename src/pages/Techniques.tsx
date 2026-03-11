import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronRight, Filter, Zap } from 'lucide-react'
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { getGuide } from '../data/parser'
import { CopyButton } from '../components/CopyButton'
import type { Technique } from '../data/types'

const CATEGORY_LABELS: Record<string, string> = {
    'zero-shot': 'Zero-Shot',
    'few-shot': 'Few-Shot',
    reasoning: 'Reasoning',
    decomposition: 'Decomposition',
    refinement: 'Refinement',
    meta: 'Meta',
}

const CATEGORY_COLORS: Record<string, string> = {
    'zero-shot': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    'few-shot': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    reasoning: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    decomposition: 'bg-green-500/20 text-green-400 border-green-500/30',
    refinement: 'bg-red-500/20 text-red-400 border-red-500/30',
    meta: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
}

const COMPLEXITY_COLORS: Record<string, string> = {
    Low: 'bg-green-500/20 text-green-400 border-green-500/30',
    Medium: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    High: 'bg-red-500/20 text-red-400 border-red-500/30',
}

const RADAR_DATA = [
    { subject: 'Complexity', CoT: 70, ToT: 90, ReAct: 75, 'Zero-Shot': 20, 'Few-Shot': 35 },
    { subject: 'Effectiveness', CoT: 85, ToT: 88, ReAct: 82, 'Zero-Shot': 60, 'Few-Shot': 78 },
    { subject: 'Speed', CoT: 55, ToT: 35, ReAct: 50, 'Zero-Shot': 95, 'Few-Shot': 80 },
    { subject: 'Versatility', CoT: 88, ToT: 70, ReAct: 85, 'Zero-Shot': 72, 'Few-Shot': 65 },
    { subject: 'Accuracy', CoT: 90, ToT: 92, ReAct: 87, 'Zero-Shot': 65, 'Few-Shot': 82 },
]

const SUCCESS_DATA = [
    { task: 'Bug Fix', 'Zero-Shot': 72, CoT: 91, ToT: 88, ReAct: 85 },
    { task: 'Feature', 'Zero-Shot': 58, CoT: 80, ToT: 85, ReAct: 78 },
    { task: 'Refactor', 'Zero-Shot': 65, CoT: 83, ToT: 79, ReAct: 80 },
    { task: 'Testing', 'Zero-Shot': 78, CoT: 87, ToT: 82, ReAct: 76 },
    { task: 'Review', 'Zero-Shot': 70, CoT: 85, ToT: 90, ReAct: 88 },
]

function TechniqueCard({ technique }: { technique: Technique }) {
    const [expanded, setExpanded] = useState(false)

    return (
        <motion.div
            id={technique.id}
            layout
            className="glass-card overflow-hidden hover:border-white/20 transition-all duration-300"
        >
            <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <span className={`badge border text-xs ${CATEGORY_COLORS[technique.category]}`}>
                                {CATEGORY_LABELS[technique.category]}
                            </span>
                            <span className={`badge border text-xs ${COMPLEXITY_COLORS[technique.complexity]}`}>
                                {technique.complexity} Complexity
                            </span>
                        </div>
                        <h3 className="font-bold text-text-primary text-base">{technique.name}</h3>
                    </div>
                    <Zap className="w-5 h-5 text-accent shrink-0 mt-1" />
                </div>

                <p className="text-text-secondary text-sm leading-relaxed mb-3">{technique.description}</p>

                <div className="bg-bg-secondary border border-white/5 rounded-lg p-3 mb-3">
                    <div className="text-xs font-semibold text-accent mb-1">✓ When to Use</div>
                    <p className="text-text-secondary text-xs leading-relaxed">{technique.whenToUse}</p>
                </div>

                <button
                    onClick={() => setExpanded(e => !e)}
                    className="w-full flex items-center justify-between text-sm text-primary-light hover:text-primary font-medium py-1 transition-colors"
                >
                    <span>View Prompt Template</span>
                    {expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
            </div>

            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <div className="px-5 pb-5 border-t border-white/5 pt-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-semibold text-text-muted">PROMPT TEMPLATE</span>
                                <CopyButton text={technique.template} />
                            </div>
                            <pre className="code-block p-4 text-text-secondary text-xs leading-relaxed whitespace-pre-wrap overflow-auto max-h-80">
                                {technique.template}
                            </pre>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export default function Techniques() {
    const guide = getGuide()
    const [category, setCategory] = useState<string>('all')
    const [complexity, setComplexity] = useState<string>('all')
    const [search, setSearch] = useState('')

    const techniques = guide.techniques.filter(t => {
        const matchCat = category === 'all' || t.category === category
        const matchCmp = complexity === 'all' || t.complexity === complexity
        const matchSearch = !search || t.name.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase())
        return matchCat && matchCmp && matchSearch
    })

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">

            <div>
                <h1 className="text-3xl font-black text-text-primary mb-2">Prompting Techniques</h1>
                <p className="text-text-secondary">
                    A comprehensive encyclopedia of {guide.techniques.length} prompting techniques — from Zero-Shot to ReAct to advanced Cursor-specific patterns.
                    Each technique includes when to use it, how it works, and a ready-to-use prompt template.
                </p>
            </div>

            {/* Filters */}
            <div className="glass-card p-4 flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Filter className="absolute left-3 top-2.5 w-4 h-4 text-text-muted" />
                    <input
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search techniques..."
                        className="input-field pl-9 text-sm"
                    />
                </div>
                <div className="flex gap-2 flex-wrap">
                    {['all', ...Object.keys(CATEGORY_LABELS)].map(cat => (
                        <button
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className={`text-xs px-3 py-1.5 rounded-lg border transition-all font-medium ${category === cat
                                    ? 'bg-primary/20 text-primary-light border-primary/30'
                                    : 'bg-white/5 text-text-muted border-white/10 hover:bg-white/10'
                                }`}
                        >
                            {cat === 'all' ? 'All' : CATEGORY_LABELS[cat]}
                        </button>
                    ))}
                </div>
                <div className="flex gap-2">
                    {['all', 'Low', 'Medium', 'High'].map(cmp => (
                        <button
                            key={cmp}
                            onClick={() => setComplexity(cmp)}
                            className={`text-xs px-3 py-1.5 rounded-lg border transition-all font-medium ${complexity === cmp
                                    ? 'bg-accent/20 text-accent border-accent/30'
                                    : 'bg-white/5 text-text-muted border-white/10 hover:bg-white/10'
                                }`}
                        >
                            {cmp}
                        </button>
                    ))}
                </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="glass-card p-5">
                    <h2 className="font-bold text-text-primary mb-1">Technique Success Rate by Task</h2>
                    <p className="text-text-muted text-xs mb-4">Estimated first-attempt success rate (%) per task type</p>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={SUCCESS_DATA}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey="task" tick={{ fill: '#64748B', fontSize: 10 }} />
                            <YAxis tick={{ fill: '#64748B', fontSize: 10 }} domain={[50, 100]} />
                            <Tooltip contentStyle={{ background: '#1A1A2E', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} labelStyle={{ color: '#94A3B8' }} />
                            <Legend wrapperStyle={{ fontSize: '11px', color: '#64748B' }} />
                            <Bar dataKey="Zero-Shot" fill="#3B82F6" radius={[2, 2, 0, 0]} />
                            <Bar dataKey="CoT" fill="#7C3AED" radius={[2, 2, 0, 0]} />
                            <Bar dataKey="ToT" fill="#06D6A0" radius={[2, 2, 0, 0]} />
                            <Bar dataKey="ReAct" fill="#F59E0B" radius={[2, 2, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="glass-card p-5">
                    <h2 className="font-bold text-text-primary mb-1">Technique Comparison (Radar)</h2>
                    <p className="text-text-muted text-xs mb-4">Multi-dimensional comparison across 5 attributes</p>
                    <ResponsiveContainer width="100%" height={200}>
                        <RadarChart data={RADAR_DATA}>
                            <PolarGrid stroke="rgba(255,255,255,0.1)" />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748B', fontSize: 10 }} />
                            <Radar name="CoT" dataKey="CoT" stroke="#7C3AED" fill="#7C3AED" fillOpacity={0.2} />
                            <Radar name="ToT" dataKey="ToT" stroke="#06D6A0" fill="#06D6A0" fillOpacity={0.1} />
                            <Radar name="ReAct" dataKey="ReAct" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.1} />
                            <Legend wrapperStyle={{ fontSize: '11px', color: '#64748B' }} />
                            <Tooltip contentStyle={{ background: '#1A1A2E', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Technique Grid */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="font-bold text-text-primary">
                        {techniques.length} Technique{techniques.length !== 1 ? 's' : ''}
                        {(category !== 'all' || complexity !== 'all' || search) && (
                            <span className="text-text-muted font-normal text-sm ml-2">(filtered)</span>
                        )}
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {techniques.map(t => (
                        <TechniqueCard key={t.id} technique={t} />
                    ))}
                </div>
                {techniques.length === 0 && (
                    <div className="text-center py-16 text-text-muted">
                        <Zap className="w-12 h-12 mx-auto mb-3 opacity-30" />
                        <p>No techniques match your filters</p>
                    </div>
                )}
            </div>
        </div>
    )
}
