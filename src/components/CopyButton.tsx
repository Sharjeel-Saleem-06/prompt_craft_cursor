import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import toast from 'react-hot-toast'

interface CopyButtonProps {
    text: string
    className?: string
}

export function CopyButton({ text, className = '' }: CopyButtonProps) {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text)
            setCopied(true)
            toast.success('Copied to clipboard!', {
                style: {
                    background: '#1A1A2E',
                    color: '#F8FAFC',
                    border: '1px solid rgba(255,255,255,0.1)',
                },
                iconTheme: { primary: '#06D6A0', secondary: '#0A0A0F' },
            })
            setTimeout(() => setCopied(false), 2000)
        } catch {
            toast.error('Failed to copy')
        }
    }

    return (
        <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${copied
                    ? 'bg-accent/20 text-accent border border-accent/30'
                    : 'bg-white/5 text-text-muted hover:bg-white/10 hover:text-text-primary border border-white/10'
                } ${className}`}
        >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied!' : 'Copy'}
        </button>
    )
}
