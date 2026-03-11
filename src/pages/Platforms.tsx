import { useState } from 'react'
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { getGuide } from '../data/parser'
import { CopyButton } from '../components/CopyButton'
import type { Platform, PlatformTemplate } from '../data/types'

const PLATFORM_ICONS: Record<string, string> = {
    ios: '🍎',
    android: '🤖',
    'react-native': '⚛️',
    nextjs: '▲',
}

const TEMPLATE_COUNT_DATA = [
    { platform: 'iOS/Swift', count: 3, color: '#F77F00' },
    { platform: 'Android', count: 3, color: '#3DDC84' },
    { platform: 'React Native', count: 2, color: '#61DAFB' },
    { platform: 'Next.js', count: 2, color: '#A3A3A3' },
]

function TemplateModal({ template, platform, onClose }: {
    template: PlatformTemplate
    platform: string
    onClose: () => void
}) {
    const [fields, setFields] = useState<Record<string, string>>({})

    // Extract placeholders like [ScreenName]
    const placeholders = [...new Set(template.prompt.match(/\[([^\]]+)\]/g)?.map(m => m.slice(1, -1)) || [])]

    let customized = template.prompt
    for (const [ph, val] of Object.entries(fields)) {
        if (val) customized = customized.replace(new RegExp(`\\[${ph}\\]`, 'g'), val)
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative glass-card max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
            >
                <div className="p-6 border-b border-white/10">
                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <div className="badge bg-white/5 border-white/10 text-text-muted text-xs mb-2">{platform}</div>
                            <h3 className="font-bold text-text-primary text-lg">{template.title}</h3>
                            <p className="text-text-secondary text-sm mt-1">{template.description}</p>
                        </div>
                        <button onClick={onClose} className="text-text-muted hover:text-text-primary p-1">✕</button>
                    </div>
                </div>

                {placeholders.length > 0 && (
                    <div className="p-6 border-b border-white/10">
                        <h4 className="text-sm font-semibold text-text-primary mb-3">Fill in your details</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {placeholders.slice(0, 8).map(ph => (
                                <div key={ph}>
                                    <label className="text-xs text-text-muted block mb-1">{ph}</label>
                                    <input
                                        value={fields[ph] || ''}
                                        onChange={e => setFields(prev => ({ ...prev, [ph]: e.target.value }))}
                                        placeholder={`Enter ${ph.toLowerCase()}`}
                                        className="input-field text-sm"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-semibold text-text-primary">Prompt Template</span>
                        <CopyButton text={customized} />
                    </div>
                    <pre className="code-block p-4 text-text-secondary text-xs leading-relaxed whitespace-pre-wrap overflow-auto max-h-80">
                        {customized}
                    </pre>
                </div>
            </motion.div>
        </div>
    )
}

function PlatformCard({ platform, onSelect, selected }: {
    platform: Platform
    onSelect: () => void
    selected: boolean
}) {
    return (
        <button
            onClick={onSelect}
            className={`glass-card p-6 text-left w-full hover:border-white/30 transition-all duration-300 ${selected ? 'border-primary/50 bg-primary/10' : ''}`}
        >
            <div className="text-4xl mb-3">{PLATFORM_ICONS[platform.id]}</div>
            <h3 className="font-bold text-text-primary mb-1">{platform.name}</h3>
            <p className="text-text-secondary text-sm mb-3 leading-relaxed">{platform.description}</p>
            <div className="flex items-center gap-2">
                <span className="badge bg-white/5 border-white/10 text-text-muted text-xs">{platform.language}</span>
                <span className="badge bg-white/5 border-white/10 text-text-muted text-xs">{platform.templates.length} templates</span>
            </div>
        </button>
    )
}

export default function Platforms() {
    const guide = getGuide()
    const [selected, setSelected] = useState<string | null>(null)
    const [activeTemplate, setActiveTemplate] = useState<{ template: PlatformTemplate; platform: string } | null>(null)

    const selectedPlatform = guide.platforms.find(p => p.id === selected)

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
            {activeTemplate && (
                <TemplateModal
                    template={activeTemplate.template}
                    platform={activeTemplate.platform}
                    onClose={() => setActiveTemplate(null)}
                />
            )}

            <div>
                <h1 className="text-3xl font-black text-text-primary mb-2">Platform Templates</h1>
                <p className="text-text-secondary">
                    Production-ready prompt templates for iOS/Swift, Android/Kotlin, React Native, and Next.js.
                    Each template follows the platform's idioms, architecture patterns, and best practices.
                    Click any template to customize with your own values.
                </p>
            </div>

            {/* Template Count Chart */}
            <div className="glass-card p-5">
                <h2 className="font-bold text-text-primary mb-1">Template Count by Platform</h2>
                <p className="text-text-muted text-xs mb-4">Number of ready-to-use prompt templates per platform</p>
                <ResponsiveContainer width="100%" height={160}>
                    <BarChart data={TEMPLATE_COUNT_DATA} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                        <XAxis type="number" tick={{ fill: '#64748B', fontSize: 11 }} />
                        <YAxis type="category" dataKey="platform" tick={{ fill: '#64748B', fontSize: 11 }} width={90} />
                        <Tooltip contentStyle={{ background: '#1A1A2E', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                        <Bar dataKey="count" fill="#7C3AED" radius={[0, 4, 4, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Platform Cards */}
            <div>
                <h2 className="font-bold text-text-primary mb-4">Select a Platform</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {guide.platforms.map(p => (
                        <PlatformCard
                            key={p.id}
                            platform={p}
                            selected={selected === p.id}
                            onSelect={() => setSelected(selected === p.id ? null : p.id)}
                        />
                    ))}
                </div>
            </div>

            {/* Templates for selected platform */}
            {selectedPlatform && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                >
                    <h2 className="font-bold text-text-primary text-xl">
                        {selectedPlatform.name} Templates
                        <span className="text-text-muted font-normal text-base ml-2">({selectedPlatform.templates.length})</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {selectedPlatform.templates.map(tmpl => (
                            <div key={tmpl.id} className="glass-card p-5 hover:border-white/20 transition-all duration-300">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="badge bg-white/5 border-white/10 text-text-muted text-xs">{tmpl.complexity} Complexity</div>
                                </div>
                                <h3 className="font-bold text-text-primary mb-2">{tmpl.title}</h3>
                                <p className="text-text-secondary text-sm leading-relaxed mb-4">{tmpl.description}</p>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setActiveTemplate({ template: tmpl, platform: selectedPlatform.name })}
                                        className="btn-primary text-xs flex-1 justify-center"
                                    >
                                        Customize & Copy
                                    </button>
                                    <CopyButton text={tmpl.prompt} />
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}
        </div>
    )
}
