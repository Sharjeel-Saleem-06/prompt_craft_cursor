import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AnimatePresence, motion } from 'framer-motion'

import Header from './components/Header'
import GlobalSearch from './components/GlobalSearch'
import ErrorBoundary from './components/ErrorBoundary'

import Dashboard from './pages/Dashboard'
import GuidePage from './pages/Guide'
import Techniques from './pages/Techniques'
import MCPPage from './pages/MCP'
import Workflows from './pages/Workflows'
import PromptLab from './pages/Templates'
import Cheatsheet from './pages/Cheatsheet'

import { getGuide } from './data/parser'
import { useProgress } from './hooks/useProgress'

// Wraps a single page — key resets ErrorBoundary and re-triggers animation on every route change
function AnimatedPage({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

function AppRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      {/* key changes on every pathname → AnimatePresence exit/enter fires correctly */}
      <ErrorBoundary key={location.pathname}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<AnimatedPage><Dashboard /></AnimatedPage>} />
          <Route path="/guide" element={<AnimatedPage><GuidePage /></AnimatedPage>} />
          <Route path="/techniques" element={<AnimatedPage><Techniques /></AnimatedPage>} />
          <Route path="/mcp" element={<AnimatedPage><MCPPage /></AnimatedPage>} />
          <Route path="/workflows" element={<AnimatedPage><Workflows /></AnimatedPage>} />
          <Route path="/prompt-lab" element={<AnimatedPage><PromptLab /></AnimatedPage>} />
          <Route path="/cheatsheet" element={<AnimatedPage><Cheatsheet /></AnimatedPage>} />
          {/* Catch-all */}
          <Route path="*" element={<AnimatedPage><Dashboard /></AnimatedPage>} />
        </Routes>
      </ErrorBoundary>
    </AnimatePresence>
  )
}

function AppContent() {
  const [searchOpen, setSearchOpen] = useState(false)
  const guide = getGuide()
  const { count } = useProgress(guide.totalSections)

  // Global Cmd+K / Ctrl+K to open search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <>
      <Header
        onSearchOpen={() => setSearchOpen(true)}
        progress={count}
        totalSections={guide.totalSections}
      />

      <GlobalSearch open={searchOpen} onClose={() => setSearchOpen(false)} />

      <main className="min-h-[calc(100vh-4rem)]">
        <AppRoutes />
      </main>

      <footer className="border-t border-white/5 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-white font-bold text-xs">PC</span>
            </div>
            <span className="text-text-muted text-sm">PromptCraft · Complete Guide · 2026</span>
          </div>
          <div className="text-text-muted text-xs">
            Cursor 2.4+ · iOS/Swift · Android/Kotlin · React Native · Next.js
          </div>
        </div>
      </footer>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
      <Toaster position="bottom-right" />
    </BrowserRouter>
  )
}
