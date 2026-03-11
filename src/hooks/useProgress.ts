import { useState, useEffect } from 'react'

const STORAGE_KEY = 'promptcraft-progress'

export function useProgress(totalSections: number) {
    const [completed, setCompleted] = useState<Set<string>>(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY)
            if (stored) return new Set(JSON.parse(stored) as string[])
        } catch { }
        return new Set<string>()
    })

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify([...completed]))
        } catch { }
    }, [completed])

    const toggle = (sectionId: string) => {
        setCompleted(prev => {
            const next = new Set(prev)
            if (next.has(sectionId)) {
                next.delete(sectionId)
            } else {
                next.add(sectionId)
            }
            return next
        })
    }

    const isCompleted = (sectionId: string) => completed.has(sectionId)
    const count = completed.size
    const percentage = totalSections > 0 ? Math.round((count / totalSections) * 100) : 0

    const reset = () => {
        setCompleted(new Set())
        localStorage.removeItem(STORAGE_KEY)
    }

    return { toggle, isCompleted, count, percentage, reset }
}

const RECENT_KEY = 'promptcraft-recent'

export function useRecentSections() {
    const [recent, setRecent] = useState<Array<{ id: string; title: string; partId: number }>>(() => {
        try {
            const stored = localStorage.getItem(RECENT_KEY)
            if (stored) return JSON.parse(stored) as Array<{ id: string; title: string; partId: number }>
        } catch { }
        return []
    })

    const addRecent = (section: { id: string; title: string; partId: number }) => {
        setRecent(prev => {
            const filtered = prev.filter(s => s.id !== section.id)
            const next = [section, ...filtered].slice(0, 5)
            try { localStorage.setItem(RECENT_KEY, JSON.stringify(next)) } catch { }
            return next
        })
    }

    return { recent, addRecent }
}
