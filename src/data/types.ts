export interface CodeBlock {
    lang: string
    code: string
}

export interface Section {
    id: string
    title: string
    level: number
    content: string
    codeBlocks: CodeBlock[]
    mermaidBlocks: string[]
    tables: string[]
    partId: number
}

export interface Part {
    id: number
    title: string
    category: string
    sections: Section[]
    description?: string
}

export interface Technique {
    id: string
    name: string
    description: string
    category: 'reasoning' | 'decomposition' | 'refinement' | 'zero-shot' | 'few-shot' | 'meta'
    complexity: 'Low' | 'Medium' | 'High'
    whenToUse: string
    template: string
    platforms: string[]
    partRef: number
}

export interface Platform {
    id: 'ios' | 'android' | 'react-native' | 'nextjs'
    name: string
    language: string
    icon: string
    description: string
    templates: PlatformTemplate[]
    color: string
}

export interface PlatformTemplate {
    id: string
    title: string
    description: string
    prompt: string
    complexity: 'Low' | 'Medium' | 'High'
}

export interface MCPServer {
    id: string
    name: string
    tier: 1 | 2 | 3 | 4
    category: 'design' | 'dev' | 'backend' | 'specialized'
    description: string
    toolCount: number
    configSnippet: string
    installCommand: string
}

export interface Workflow {
    id: string
    name: string
    description: string
    steps: WorkflowStep[]
    speed: number
    quality: number
    risk: number
    complexity: number
}

export interface WorkflowStep {
    id: string
    title: string
    description: string
    mode?: string
    command?: string
}

export interface ParsedGuide {
    parts: Part[]
    techniques: Technique[]
    platforms: Platform[]
    mcpServers: MCPServer[]
    workflows: Workflow[]
    totalSections: number
    totalParts: number
}
