import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BookOpen, Zap, Layers, Server, GitBranch, FileText, Grid, ArrowRight, ChevronRight, Clock, TrendingUp } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { getGuide } from '../data/parser'
import { useRecentSections } from '../hooks/useProgress'

const QUICK_ACCESS = [
    { title: 'Context Engineering', desc: 'Master-level context window strategies', to: '/guide#6-context-engineering-master-level', icon: Zap, color: 'from-purple-500 to-purple-700' },
    { title: 'Prompting Techniques', desc: '15 techniques from Zero-Shot to ReAct', to: '/techniques', icon: BookOpen, color: 'from-blue-500 to-blue-700' },
    { title: 'MCP Ecosystem', desc: 'Production MCP stack and configuration', to: '/mcp', icon: Server, color: 'from-green-500 to-green-700' },
    { title: 'Platform Templates', desc: 'iOS, Android, RN, Next.js templates', to: '/platforms', icon: Layers, color: 'from-orange-500 to-orange-700' },
    { title: 'Workflows', desc: 'PRD-to-Ship, TDD, Debug pipelines', to: '/workflows', icon: GitBranch, color: 'from-red-500 to-red-700' },
    { title: 'Cheatsheet', desc: 'Shortcuts, @-symbols, model matrix', to: '/cheatsheet', icon: Grid, color: 'from-pink-500 to-pink-700' },
]

const ERA_DATA = [
    { era: 'Era 1\n2021', capability: 15, label: 'Tab Autocomplete', users: 100 },
    { era: 'Era 2\n2023', capability: 45, label: 'Chat Agents', users: 250 },
    { era: 'Early\n2025', capability: 75, label: 'Agent Mode', users: 400 },
    { era: 'Mid\n2025', capability: 88, label: 'Background Agents', users: 600 },
    { era: 'Late\n2025', capability: 95, label: 'Cloud Agents', users: 800 },
    { era: 'Now\n2026', capability: 100, label: 'Automations', users: 1000 },
]

const LEARNING_PATH = [
    { step: 1, title: 'Foundation', desc: 'Mental model & architecture', part: 'Parts 1–3', color: 'bg-blue-500' },
    { step: 2, title: 'Prompting Science', desc: 'PCTF+ & techniques', part: 'Parts 4–6', color: 'bg-purple-500' },
    { step: 3, title: 'Modes & Workflows', desc: 'Six modes, agents', part: 'Parts 7–10', color: 'bg-pink-500' },
    { step: 4, title: 'MCP Ecosystem', desc: 'Tools & integrations', part: 'Parts 15–17', color: 'bg-green-500' },
    { step: 5, title: 'Advanced', desc: 'Parallel agents, security', part: 'Parts 18–30', color: 'bg-orange-500' },
]

function AnimatedCounter({ target, duration = 2000 }: { target: number; duration?: number }) {
    const [count, setCount] = useState(0)
    const ref = useRef<HTMLSpanElement>(null)
    const started = useRef(false)

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !started.current) {
                started.current = true
                const startTime = performance.now()
                const tick = (now: number) => {
                    const progress = Math.min((now - startTime) / duration, 1)
                    const eased = 1 - Math.pow(1 - progress, 3)
                    setCount(Math.floor(eased * target))
                    if (progress < 1) requestAnimationFrame(tick)
                    else setCount(target)
                }
                requestAnimationFrame(tick)
            }
        })
        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [target, duration])

    return <span ref={ref}>{count}</span>
}

export default function Dashboard() {
    const guide = getGuide()
    const { recent } = useRecentSections()

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12">

            {/* Hero */}
            <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center py-12 relative"
            >
                <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent rounded-3xl" />
                <div className="relative">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                    >
                        <span className="badge-primary mb-4 inline-flex">✦ Cursor & AI Development Mastery</span>
                    </motion.div>
                    <h1 className="text-5xl sm:text-7xl font-black mb-4 leading-tight">
                        <span className="gradient-text">PromptCraft</span>
                    </h1>
                    <p className="text-text-secondary text-xl mb-8 max-w-2xl mx-auto">
                        The definitive guide to AI-powered development with Cursor. Every feature, every technique, every workflow — production-grade.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link to="/guide" className="btn-primary text-base px-6 py-3">
                            <BookOpen className="w-5 h-5" />
                            Browse Full Guide
                        </Link>
                        <Link to="/techniques" className="btn-secondary text-base px-6 py-3">
                            <Zap className="w-5 h-5" />
                            Explore Techniques
                        </Link>
                    </div>
                </div>
            </motion.section>

            {/* Stats */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-4"
            >
                {[
                    { label: 'Parts', value: guide.totalParts, suffix: '', icon: BookOpen, color: 'text-primary-light' },
                    { label: 'Techniques', value: guide.techniques.length, suffix: '+', icon: Zap, color: 'text-accent' },
                    { label: 'Platforms', value: 4, suffix: '', icon: Layers, color: 'text-amber-400' },
                    { label: 'Sections', value: guide.totalSections, suffix: '', icon: FileText, color: 'text-blue-400' },
                ].map(({ label, value, suffix, icon: Icon, color }) => (
                    <div key={label} className="glass-card p-6 text-center hover:border-white/20 transition-all duration-300 group">
                        <Icon className={`w-6 h-6 ${color} mx-auto mb-2 group-hover:scale-110 transition-transform`} />
                        <div className={`text-4xl font-black ${color} mb-1`}>
                            <AnimatedCounter target={value} />{suffix}
                        </div>
                        <div className="text-text-muted text-sm font-medium">{label}</div>
                    </div>
                ))}
            </motion.section>

            {/* Timeline Chart */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-card p-6"
            >
                <h2 className="text-xl font-bold text-text-primary mb-1">The Cursor Era Evolution</h2>
                <p className="text-text-secondary text-sm mb-6">From Tab autocomplete to autonomous cloud agents — capability growth over time</p>
                <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={ERA_DATA}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                        <XAxis dataKey="era" tick={{ fill: '#64748B', fontSize: 11 }} />
                        <YAxis tick={{ fill: '#64748B', fontSize: 11 }} domain={[0, 100]} />
                        <Tooltip
                            contentStyle={{ background: '#1A1A2E', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                            labelStyle={{ color: '#94A3B8' }}
                            itemStyle={{ color: '#7C3AED' }}
                        />
                        <Line type="monotone" dataKey="capability" stroke="#7C3AED" strokeWidth={2.5} dot={{ fill: '#7C3AED', r: 4 }} activeDot={{ r: 6, fill: '#06D6A0' }} name="Capability Index" />
                        <Line type="monotone" dataKey="users" stroke="#06D6A0" strokeWidth={1.5} dot={{ fill: '#06D6A0', r: 3 }} strokeDasharray="5 3" name="Adoption (relative)" />
                    </LineChart>
                </ResponsiveContainer>
                <p className="text-xs text-text-muted mt-2 text-center">Purple = Capability index • Green (dashed) = Relative adoption • Era 3 flipped: 2×more agent users than Tab users</p>
            </motion.section>

            {/* Quick Access Grid */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
            >
                <h2 className="text-xl font-bold text-text-primary mb-2">Quick Access</h2>
                <p className="text-text-secondary text-sm mb-5">Jump to the most-used sections of the guide</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {QUICK_ACCESS.map(({ title, desc, to, icon: Icon, color }) => (
                        <Link
                            key={to}
                            to={to}
                            className="glass-card-hover p-5 group flex items-start gap-4"
                        >
                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-lg`}>
                                <Icon className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-text-primary group-hover:text-primary-light transition-colors">{title}</h3>
                                <p className="text-text-muted text-sm mt-0.5 leading-relaxed">{desc}</p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-primary-light group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                        </Link>
                    ))}
                </div>
            </motion.section>

            {/* Learning Path */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="glass-card p-6"
            >
                <h2 className="text-xl font-bold text-text-primary mb-1">Learning Path</h2>
                <p className="text-text-secondary text-sm mb-6">Recommended reading order for maximum understanding</p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-0 sm:gap-0 overflow-x-auto pb-2">
                    {LEARNING_PATH.map((item, i) => (
                        <div key={item.step} className="flex items-center">
                            <div className="flex flex-col items-center text-center min-w-[120px]">
                                <div className={`w-10 h-10 rounded-full ${item.color} flex items-center justify-center text-white font-bold text-sm shadow-lg mb-2`}>
                                    {item.step}
                                </div>
                                <div className="font-semibold text-text-primary text-sm">{item.title}</div>
                                <div className="text-xs text-text-muted mt-0.5">{item.desc}</div>
                                <div className="text-xs text-text-muted mt-1 badge bg-white/5 border-white/10">{item.part}</div>
                            </div>
                            {i < LEARNING_PATH.length - 1 && (
                                <ChevronRight className="w-5 h-5 text-text-muted mx-2 shrink-0 hidden sm:block" />
                            )}
                        </div>
                    ))}
                </div>
            </motion.section>

            {/* Recent Sections */}
            {recent.length > 0 && (
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                >
                    <h2 className="text-xl font-bold text-text-primary mb-2 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-accent" /> Recently Viewed
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {recent.map(section => (
                            <Link
                                key={section.id}
                                to={`/guide#${section.id}`}
                                className="glass-card-hover p-4 flex items-center gap-3 group"
                            >
                                <TrendingUp className="w-4 h-4 text-accent shrink-0" />
                                <div className="min-w-0">
                                    <div className="text-text-primary text-sm font-medium truncate">{section.title}</div>
                                    <div className="text-text-muted text-xs">Part {section.partId}</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </motion.section>
            )}
        </div>
    )
}
