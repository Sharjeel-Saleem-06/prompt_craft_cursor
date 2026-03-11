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

function PageWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

function AppContent() {
  const [searchOpen, setSearchOpen] = useState(false)
  const guide = getGuide()
  const { count } = useProgress(guide.totalSections)

  // Global Cmd+K to open search
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
        <ErrorBoundary>
          <PageWrapper>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/guide" element={<GuidePage />} />
              <Route path="/techniques" element={<Techniques />} />
              <Route path="/mcp" element={<MCPPage />} />
              <Route path="/workflows" element={<Workflows />} />
              <Route path="/prompt-lab" element={<PromptLab />} />
              <Route path="/cheatsheet" element={<Cheatsheet />} />
              {/* Catch-all redirect to home */}
              <Route path="*" element={<Dashboard />} />
            </Routes>
          </PageWrapper>
        </ErrorBoundary>
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
