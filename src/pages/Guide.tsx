import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, ChevronRight, CheckSquare, Square, Code2, Search } from 'lucide-react'
import { getGuide } from '../data/parser'
import { useProgress, useRecentSections } from '../hooks/useProgress'
import { CopyButton } from '../components/CopyButton'
import type { Part, Section } from '../data/types'

function MermaidBlock({ code }: { code: string }) {
    const ref = useRef<HTMLDivElement>(null)
    const [error, setError] = useState(false)

    useEffect(() => {
        let cancelled = false
        import('mermaid').then(m => {
            if (cancelled) return
            try {
                m.default.initialize({ theme: 'dark', startOnLoad: false, fontFamily: 'Inter, sans-serif' })
                const id = `mermaid-${Math.random().toString(36).slice(2)}`
                m.default.render(id, code).then(({ svg }) => {
                    if (ref.current && !cancelled) {
                        ref.current.innerHTML = svg
                    }
                }).catch(() => { if (!cancelled) setError(true) })
            } catch { if (!cancelled) setError(true) }
        })
        return () => { cancelled = true }
    }, [code])

    if (error) {
        return (
            <pre className="code-block p-4 text-text-secondary text-sm overflow-auto">{code}</pre>
        )
    }

    return <div ref={ref} className="mermaid p-4 bg-bg-secondary rounded-xl border border-white/10 overflow-auto" />
}

function CodeBlockView({ code, lang }: { code: string; lang: string }) {
    return (
        <div className="relative group">
            <div className="flex items-center justify-between px-4 py-2 bg-bg-secondary border border-white/10 rounded-t-lg border-b-0">
                <span className="text-xs font-mono text-text-muted">{lang || 'code'}</span>
                <CopyButton text={code} />
            </div>
            <pre className="code-block rounded-t-none p-4 text-text-secondary text-sm leading-relaxed overflow-auto max-h-[500px]">
                <code>{code}</code>
            </pre>
        </div>
    )
}

function SectionCard({
    section,
    isCompleted,
    onToggle,
}: {
    section: Section
    isCompleted: boolean
    onToggle: () => void
}) {
    const [expanded, setExpanded] = useState(false)
    const { addRecent } = useRecentSections()

    useEffect(() => {
        if (expanded) {
            addRecent({ id: section.id, title: section.title, partId: section.partId })
        }
    }, [expanded, section, addRecent])

    return (
        <div
            id={section.id}
            className={`border rounded-xl transition-all duration-200 ${isCompleted ? 'border-accent/30 bg-accent/5' : 'border-white/10 bg-white/2'}`}
        >
            <div
                className="flex items-center gap-3 p-4 cursor-pointer hover:bg-white/3 rounded-xl transition-colors"
                onClick={() => setExpanded(e => !e)}
            >
                <button
                    onClick={e => { e.stopPropagation(); onToggle() }}
                    className="shrink-0 text-text-muted hover:text-accent transition-colors"
                >
                    {isCompleted
                        ? <CheckSquare className="w-5 h-5 text-accent" />
                        : <Square className="w-5 h-5" />
                    }
                </button>
                <h3 className="flex-1 font-semibold text-text-primary text-sm leading-snug">{section.title}</h3>
                <div className="flex items-center gap-2 shrink-0">
                    {section.codeBlocks.length > 0 && (
                        <span className="badge bg-primary/10 text-primary-light border-primary/20 text-xs">
                            <Code2 className="w-3 h-3" /> {section.codeBlocks.length}
                        </span>
                    )}
                    {expanded ? <ChevronDown className="w-4 h-4 text-text-muted" /> : <ChevronRight className="w-4 h-4 text-text-muted" />}
                </div>
            </div>

            {expanded && (
                <div className="px-4 pb-4 space-y-4 border-t border-white/5 pt-4">
                    {section.content && (
                        <div className="text-text-secondary text-sm leading-relaxed whitespace-pre-wrap">
                            {section.content.slice(0, 2000)}{section.content.length > 2000 && '...'}
                        </div>
                    )}
                    {section.mermaidBlocks.map((m, i) => (
                        <div key={i}>
                            <div className="text-xs text-text-muted mb-2 font-medium">Diagram</div>
                            <MermaidBlock code={m} />
                        </div>
                    ))}
                    {section.codeBlocks.map((block, i) => (
                        <CodeBlockView key={i} code={block.code} lang={block.lang} />
                    ))}
                    {section.tables.map((table, i) => (
                        <div key={i} className="overflow-auto">
                            <table className="min-w-full text-sm border-collapse">
                                {table.split('\n').map((row, ri) => {
                                    if (row.includes('---')) return null
                                    const cells = row.split('|').filter(c => c.trim())
                                    return (
                                        <tr key={ri} className={ri === 0 ? 'bg-primary/10' : 'hover:bg-white/3 border-t border-white/5'}>
                                            {cells.map((cell, ci) => ri === 0
                                                ? <th key={ci} className="px-3 py-2 text-left text-text-primary font-medium text-xs">{cell.trim()}</th>
                                                : <td key={ci} className="px-3 py-2 text-text-secondary text-xs">{cell.trim()}</td>
                                            )}
                                        </tr>
                                    )
                                })}
                            </table>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

function PartCard({ part, onToggle, isCompleted }: {
    part: Part
    progress: string
    onToggle: (id: string) => void
    isCompleted: (id: string) => boolean
}) {
    const [expanded, setExpanded] = useState(false)
    const completedCount = part.sections.filter(s => isCompleted(s.id)).length

    return (
        <div id={`part-${part.id}`} className="glass-card overflow-hidden">
            <button
                className="w-full flex items-center gap-4 p-5 hover:bg-white/3 transition-colors text-left"
                onClick={() => setExpanded(e => !e)}
            >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/30 to-accent/20 flex items-center justify-center shrink-0 border border-primary/20">
                    <span className="text-primary-light font-bold text-sm">{part.id}</span>
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <span className="badge bg-white/5 border-white/10 text-text-muted text-xs">{part.category}</span>
                    </div>
                    <h2 className="font-bold text-text-primary leading-snug">{part.title}</h2>
                    <div className="text-text-muted text-xs mt-0.5">
                        {part.sections.length} sections · {completedCount}/{part.sections.length} read
                    </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                    <div className="hidden sm:block w-20">
                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
                                style={{ width: `${part.sections.length > 0 ? (completedCount / part.sections.length) * 100 : 0}%` }}
                            />
                        </div>
                    </div>
                    {expanded ? <ChevronDown className="w-5 h-5 text-text-muted" /> : <ChevronRight className="w-5 h-5 text-text-muted" />}
                </div>
            </button>

            {expanded && (
                <div className="px-4 pb-4 space-y-2 border-t border-white/5">
                    {part.sections.length === 0 && (
                        <p className="text-text-muted text-sm p-4 text-center italic">No subsections parsed for this part.</p>
                    )}
                    {part.sections.map(section => (
                        <SectionCard
                            key={section.id}
                            section={section}
                            isCompleted={isCompleted(section.id)}
                            onToggle={() => onToggle(section.id)}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default function GuidePage() {
    const guide = getGuide()
    const { toggle, isCompleted, count } = useProgress(guide.totalSections)
    const [search, setSearch] = useState('')
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const filtered = search
        ? guide.parts.filter(p =>
            p.title.toLowerCase().includes(search.toLowerCase()) ||
            p.sections.some(s => s.title.toLowerCase().includes(search.toLowerCase()))
        )
        : guide.parts

    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        setSidebarOpen(false)
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
            <div className="flex gap-6">
                {/* Sidebar TOC */}
                <aside className={`
          fixed lg:sticky lg:top-24 left-0 top-0 bottom-0 z-30 w-72 lg:w-64 xl:w-72
          lg:h-[calc(100vh-6rem)] overflow-y-auto
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          transition-transform duration-300
          bg-bg-primary lg:bg-transparent border-r lg:border-0 border-white/10 lg:border-transparent
          p-4 lg:p-0
        `}>
                    <div className="lg:glass-card lg:p-4">
                        <h3 className="font-bold text-text-primary text-sm mb-3">Table of Contents</h3>
                        <div className="relative mb-3">
                            <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-text-muted" />
                            <input
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Filter..."
                                className="w-full pl-8 pr-3 py-2 text-xs bg-bg-secondary border border-white/10 rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary/40"
                            />
                        </div>
                        <nav className="space-y-1">
                            {guide.parts.map(part => (
                                <div key={part.id}>
                                    <button
                                        onClick={() => scrollTo(`part-${part.id}`)}
                                        className="sidebar-item font-medium text-text-primary w-full"
                                    >
                                        {part.id}. {part.title.slice(0, 40)}{part.title.length > 40 ? '…' : ''}
                                    </button>
                                </div>
                            ))}
                        </nav>
                    </div>
                </aside>

                {/* Overlay for mobile */}
                {sidebarOpen && (
                    <div className="fixed inset-0 z-20 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
                )}

                {/* Main Content */}
                <main className="flex-1 min-w-0 space-y-4">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-text-primary">Complete Guide</h1>
                            <p className="text-text-secondary text-sm mt-1">{count}/{guide.totalSections} sections read</p>
                        </div>
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden btn-secondary text-sm"
                        >
                            TOC
                        </button>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden mb-6">
                        <motion.div
                            className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${guide.totalSections > 0 ? (count / guide.totalSections) * 100 : 0}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>

                    {filtered.map(part => (
                        <PartCard
                            key={part.id}
                            part={part}
                            progress={`${part.sections.filter(s => isCompleted(s.id)).length}/${part.sections.length}`}
                            onToggle={toggle}
                            isCompleted={isCompleted}
                        />
                    ))}
                </main>
            </div>
        </div>
    )
}
