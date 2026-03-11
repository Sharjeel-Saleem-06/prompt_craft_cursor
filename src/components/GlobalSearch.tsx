import { useState, useEffect, useCallback } from 'react'
import { Search, X, ArrowRight, BookOpen, Zap, Layout, ChevronDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { searchGuide } from '../data/parser'
import { motion, AnimatePresence } from 'framer-motion'

interface SearchResult {
    type: string
    title: string
    description: string
    path: string
    partId?: number
}

interface GlobalSearchProps {
    open: boolean
    onClose: () => void
}

const typeIcons: Record<string, React.ReactNode> = {
    Part: <BookOpen className="w-4 h-4" />,
    Section: <ChevronDown className="w-4 h-4" />,
    Technique: <Zap className="w-4 h-4" />,
    Platform: <Layout className="w-4 h-4" />,
}

const typeColors: Record<string, string> = {
    Part: 'bg-primary/20 text-primary-light border-primary/30',
    Section: 'bg-white/10 text-text-secondary border-white/20',
    Technique: 'bg-accent/20 text-accent border-accent/30',
    Platform: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
}

export default function GlobalSearch({ open, onClose }: GlobalSearchProps) {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState<SearchResult[]>([])
    const [selected, setSelected] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
        if (!open) { setQuery(''); setResults([]); setSelected(0) }
    }, [open])

    useEffect(() => {
        if (query.length > 1) {
            const res = searchGuide(query)
            setResults(res)
            setSelected(0)
        } else {
            setResults([])
        }
    }, [query])

    const handleSelect = useCallback((result: SearchResult) => {
        navigate(result.path)
        onClose()
    }, [navigate, onClose])

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (!open) return
            if (e.key === 'ArrowDown') { e.preventDefault(); setSelected(s => Math.min(s + 1, results.length - 1)) }
            if (e.key === 'ArrowUp') { e.preventDefault(); setSelected(s => Math.max(s - 1, 0)) }
            if (e.key === 'Enter' && results[selected]) { handleSelect(results[selected]) }
            if (e.key === 'Escape') onClose()
        }
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [open, results, selected, handleSelect, onClose])

    if (!open) return null

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    onClick={onClose}
                />

                {/* Modal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -20 }}
                    transition={{ duration: 0.15 }}
                    className="relative w-full max-w-2xl glass-card overflow-hidden shadow-2xl"
                >
                    {/* Input */}
                    <div className="flex items-center gap-3 p-4 border-b border-white/10">
                        <Search className="w-5 h-5 text-text-muted shrink-0" />
                        <input
                            autoFocus
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            placeholder="Search guide, techniques, templates..."
                            className="flex-1 bg-transparent text-text-primary placeholder:text-text-muted outline-none text-base"
                        />
                        {query && (
                            <button onClick={() => setQuery('')} className="text-text-muted hover:text-text-primary transition-colors">
                                <X className="w-4 h-4" />
                            </button>
                        )}
                        <kbd className="hidden sm:block px-2 py-0.5 text-xs font-mono text-text-muted border border-white/20 rounded">ESC</kbd>
                    </div>

                    {/* Results */}
                    {results.length > 0 && (
                        <div className="max-h-96 overflow-y-auto">
                            {results.map((result, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleSelect(result)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/5 transition-colors border-b border-white/5 last:border-0 ${i === selected ? 'bg-primary/10' : ''}`}
                                >
                                    <span className={`badge ${typeColors[result.type] || typeColors.Section} shrink-0`}>
                                        {typeIcons[result.type]} {result.type}
                                    </span>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-text-primary text-sm font-medium truncate">{result.title}</p>
                                        <p className="text-text-muted text-xs truncate mt-0.5">{result.description}</p>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-text-muted shrink-0" />
                                </button>
                            ))}
                        </div>
                    )}

                    {query.length > 1 && results.length === 0 && (
                        <div className="p-8 text-center text-text-muted">
                            <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                            <p>No results for "<span className="text-text-secondary">{query}</span>"</p>
                        </div>
                    )}

                    {!query && (
                        <div className="p-4 text-center text-text-muted text-sm">
                            <p>Type to search all 36 parts, 50+ techniques, and templates</p>
                            <div className="flex justify-center gap-4 mt-3">
                                <span className="flex items-center gap-1.5"><kbd className="px-1.5 py-0.5 text-xs font-mono border border-white/20 rounded">↑↓</kbd> Navigate</span>
                                <span className="flex items-center gap-1.5"><kbd className="px-1.5 py-0.5 text-xs font-mono border border-white/20 rounded">↵</kbd> Select</span>
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>
        </AnimatePresence>
    )
}
