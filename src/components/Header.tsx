import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { BookOpen, Zap, Server, GitBranch, Wand2, Grid, Menu, X, Search, Command } from 'lucide-react'

const NAV_ITEMS = [
    { to: '/guide', label: 'Guide', icon: BookOpen },
    { to: '/techniques', label: 'Techniques', icon: Zap },
    { to: '/mcp', label: 'MCP', icon: Server },
    { to: '/workflows', label: 'Workflows', icon: GitBranch },
    { to: '/prompt-lab', label: 'Prompt Lab', icon: Wand2 },
    { to: '/cheatsheet', label: 'Cheatsheet', icon: Grid },
]

interface HeaderProps {
    onSearchOpen: () => void
    progress: number
    totalSections: number
}

export default function Header({ onSearchOpen, progress, totalSections }: HeaderProps) {
    const location = useLocation()
    const [mobileOpen, setMobileOpen] = useState(false)

    const progressPct = totalSections > 0 ? Math.round((progress / totalSections) * 100) : 0
    const circumference = 2 * Math.PI * 18
    const strokeDashoffset = circumference - (progressPct / 100) * circumference

    return (
        <header className="sticky top-0 z-40 border-b border-white/10 backdrop-blur-md bg-bg-primary/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-4">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 shrink-0 group">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg group-hover:shadow-primary/50 transition-shadow">
                        <span className="text-white font-bold text-sm">PC</span>
                    </div>
                    <span className="font-bold text-lg gradient-text hidden sm:block">PromptCraft</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center gap-1 flex-1">
                    {NAV_ITEMS.map(({ to, label, icon: Icon }) => {
                        const active = location.pathname === to || (to !== '/' && location.pathname.startsWith(to))
                        return (
                            <Link key={to} to={to} className={active ? 'nav-link-active' : 'nav-link'}>
                                <span className="flex items-center gap-1.5">
                                    <Icon className="w-3.5 h-3.5" />
                                    {label}
                                </span>
                            </Link>
                        )
                    })}
                </nav>

                {/* Right actions */}
                <div className="flex items-center gap-2 ml-auto lg:ml-0">
                    {/* Search */}
                    <button
                        onClick={onSearchOpen}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-text-muted hover:text-text-primary hover:bg-white/8 hover:border-white/20 transition-all duration-200 text-sm"
                    >
                        <Search className="w-4 h-4" />
                        <span className="hidden md:block">Search</span>
                        <span className="hidden md:flex items-center gap-0.5 text-xs border border-white/20 rounded px-1 py-0.5">
                            <Command className="w-3 h-3" />K
                        </span>
                    </button>

                    {/* Progress Ring */}
                    <div className="relative w-10 h-10 shrink-0" title={`${progress}/${totalSections} sections read`}>
                        <svg className="w-10 h-10 -rotate-90" viewBox="0 0 40 40">
                            <circle cx="20" cy="20" r="18" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2.5" />
                            <circle
                                cx="20" cy="20" r="18" fill="none"
                                stroke={progressPct === 100 ? '#06D6A0' : '#7C3AED'}
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeDasharray={circumference}
                                strokeDashoffset={strokeDashoffset}
                                className="transition-all duration-500"
                            />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-text-secondary">
                            {progressPct}%
                        </span>
                    </div>

                    {/* Mobile menu */}
                    <button
                        onClick={() => setMobileOpen(o => !o)}
                        className="lg:hidden p-2 rounded-lg hover:bg-white/5 text-text-secondary"
                    >
                        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            {mobileOpen && (
                <div className="lg:hidden border-t border-white/10 bg-bg-primary/95">
                    <nav className="max-w-7xl mx-auto px-4 py-3 grid grid-cols-2 gap-1">
                        {NAV_ITEMS.map(({ to, label, icon: Icon }) => {
                            const active = location.pathname === to || (to !== '/' && location.pathname.startsWith(to))
                            return (
                                <Link
                                    key={to}
                                    to={to}
                                    className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${active ? 'bg-primary/20 text-primary-light' : 'text-text-secondary hover:text-text-primary hover:bg-white/5'}`}
                                    onClick={() => setMobileOpen(false)}
                                >
                                    <Icon className="w-4 h-4" />
                                    {label}
                                </Link>
                            )
                        })}
                    </nav>
                </div>
            )}
        </header>
    )
}
