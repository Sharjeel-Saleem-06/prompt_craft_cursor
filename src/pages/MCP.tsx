import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Server, ChevronDown, ChevronRight, Plus, Minus, Copy, CheckCircle, Terminal, Code2, Zap, Shield, BookOpen } from 'lucide-react'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'

// ─── MCP Server Data ─────────────────────────────────────────────────────────

const MCP_SERVERS = [
    // Design
    { id: 'figma', name: 'Figma', emoji: '🎨', tier: 1, category: 'design', description: 'Read and write Figma designs, components, styles, and variants. Turns specs into production code automatically.', toolCount: 15, installCommand: 'npx @figma/mcp', configSnippet: `{\n  "mcpServers": {\n    "figma": {\n      "command": "npx",\n      "args": ["-y", "@figma/mcp"],\n      "env": { "FIGMA_API_TOKEN": "your-token" }\n    }\n  }\n}` },

    // Dev tools
    { id: 'github', name: 'GitHub', emoji: '🐙', tier: 1, category: 'dev', description: 'Create issues, PRs, branches, review code, search repos. Full GitHub API access for agents to manage the entire dev lifecycle.', toolCount: 30, installCommand: 'npx @modelcontextprotocol/server-github', configSnippet: `{\n  "mcpServers": {\n    "github": {\n      "command": "npx",\n      "args": ["-y", "@modelcontextprotocol/server-github"],\n      "env": { "GITHUB_PERSONAL_ACCESS_TOKEN": "your-token" }\n    }\n  }\n}` },
    { id: 'linear', name: 'Linear', emoji: '📋', tier: 1, category: 'dev', description: 'Create and update tickets, set priorities, move through workflow states, link PRs to issues. Agent becomes a project manager.', toolCount: 18, installCommand: 'npx @linear/mcp-server', configSnippet: `{\n  "mcpServers": {\n    "linear": {\n      "command": "npx",\n      "args": ["-y", "@linear/mcp-server"],\n      "env": { "LINEAR_API_KEY": "your-key" }\n    }\n  }\n}` },
    { id: 'sentry', name: 'Sentry', emoji: '🚨', tier: 1, category: 'dev', description: 'Fetch error reports, stack traces, and performance issues. Agent reads crash data and creates targeted bug-fix prompts.', toolCount: 8, installCommand: 'npx @sentry/mcp-server', configSnippet: `{\n  "mcpServers": {\n    "sentry": {\n      "command": "npx",\n      "args": ["-y", "@sentry/mcp-server"],\n      "env": { "SENTRY_AUTH_TOKEN": "your-token", "SENTRY_ORG": "your-org" }\n    }\n  }\n}` },
    { id: 'jira', name: 'Jira', emoji: '🔷', tier: 2, category: 'dev', description: 'Read/create Jira issues, update sprint boards, manage epics. Full Atlassian project management access for agents.', toolCount: 22, installCommand: 'npx @modelcontextprotocol/server-jira', configSnippet: `{\n  "mcpServers": {\n    "jira": {\n      "command": "npx",\n      "args": ["-y", "@modelcontextprotocol/server-jira"],\n      "env": { "JIRA_URL": "your-url", "JIRA_EMAIL": "email", "JIRA_API_TOKEN": "token" }\n    }\n  }\n}` },
    { id: 'gitlab', name: 'GitLab', emoji: '🦊', tier: 2, category: 'dev', description: 'GitLab issues, MRs, pipelines, and CI/CD status. Full GitLab API for self-hosted or cloud teams.', toolCount: 26, installCommand: 'npx @modelcontextprotocol/server-gitlab', configSnippet: `{\n  "mcpServers": {\n    "gitlab": {\n      "command": "npx",\n      "args": ["-y", "@modelcontextprotocol/server-gitlab"],\n      "env": { "GITLAB_PERSONAL_ACCESS_TOKEN": "token", "GITLAB_URL": "https://gitlab.com" }\n    }\n  }\n}` },

    // Backend/DB
    { id: 'supabase', name: 'Supabase', emoji: '⚡', tier: 1, category: 'backend', description: 'Query tables, run RPC functions, manage auth, storage buckets. Full Supabase backend control from your prompts.', toolCount: 25, installCommand: 'npx @supabase/mcp-server-supabase', configSnippet: `{\n  "mcpServers": {\n    "supabase": {\n      "command": "npx",\n      "args": ["-y", "@supabase/mcp-server-supabase"],\n      "env": { "SUPABASE_URL": "your-url", "SUPABASE_SERVICE_ROLE_KEY": "key" }\n    }\n  }\n}` },
    { id: 'postgres', name: 'PostgreSQL', emoji: '🐘', tier: 1, category: 'backend', description: 'Direct PostgreSQL access. Run queries, inspect schema, create migrations, analyze query plans. Local or remote DB.', toolCount: 12, installCommand: 'npx @modelcontextprotocol/server-postgres', configSnippet: `{\n  "mcpServers": {\n    "postgres": {\n      "command": "npx",\n      "args": ["-y", "@modelcontextprotocol/server-postgres", "postgresql://user:pass@host/db"]\n    }\n  }\n}` },
    { id: 'sqlite', name: 'SQLite', emoji: '🗄️', tier: 2, category: 'backend', description: 'Read and write local SQLite databases. Perfect for offline development, mobile apps, and testing without a cloud DB.', toolCount: 10, installCommand: 'npx @modelcontextprotocol/server-sqlite', configSnippet: `{\n  "mcpServers": {\n    "sqlite": {\n      "command": "npx",\n      "args": ["-y", "@modelcontextprotocol/server-sqlite", "--db-path", "./local.db"]\n    }\n  }\n}` },
    { id: 'redis', name: 'Redis', emoji: '🔴', tier: 2, category: 'backend', description: 'Read/write Redis keys, manage TTL, pub/sub, sorted sets. Cache inspection without leaving Cursor.', toolCount: 14, installCommand: 'npx @modelcontextprotocol/server-redis', configSnippet: `{\n  "mcpServers": {\n    "redis": {\n      "command": "npx",\n      "args": ["-y", "@modelcontextprotocol/server-redis"],\n      "env": { "REDIS_URL": "redis://localhost:6379" }\n    }\n  }\n}` },
    { id: 'firebase', name: 'Firebase', emoji: '🔥', tier: 2, category: 'backend', description: 'Firestore read/write, Realtime Database, Firebase Auth management, Remote Config. Full Firebase admin SDK.', toolCount: 20, installCommand: 'npx @gannonh/firebase-mcp', configSnippet: `{\n  "mcpServers": {\n    "firebase": {\n      "command": "npx",\n      "args": ["-y", "@gannonh/firebase-mcp"],\n      "env": { "FIREBASE_SERVICE_ACCOUNT": "path/to/service-account.json" }\n    }\n  }\n}` },

    // Testing
    { id: 'playwright', name: 'Playwright', emoji: '🎭', tier: 1, category: 'testing', description: 'Browser automation with full screenshot, DOM inspection, and form interaction. Let agents test your own UI.', toolCount: 12, installCommand: 'npx @playwright/mcp', configSnippet: `{\n  "mcpServers": {\n    "playwright": {\n      "command": "npx",\n      "args": ["-y", "@playwright/mcp"]\n    }\n  }\n}` },
    { id: 'browsertools', name: 'BrowserTools', emoji: '🌐', tier: 2, category: 'testing', description: 'Capture browser console logs, network requests, and Chrome DevTools data in real-time. Live debugging.', toolCount: 9, installCommand: 'npx @agentdeskai/browser-tools-mcp', configSnippet: `{\n  "mcpServers": {\n    "browsertools": {\n      "command": "npx",\n      "args": ["-y", "@agentdeskai/browser-tools-mcp"]\n    }\n  }\n}` },

    // Specialized
    { id: 'context7', name: 'Context7', emoji: '📖', tier: 1, category: 'specialized', description: 'Up-to-date library docs in your prompts. Pulls React, Next.js, Swift, Kotlin docs on demand without hallucinating APIs.', toolCount: 5, installCommand: 'npx @upstash/context7-mcp', configSnippet: `{\n  "mcpServers": {\n    "context7": {\n      "command": "npx",\n      "args": ["-y", "@upstash/context7-mcp"]\n    }\n  }\n}` },
    { id: 'filesystem', name: 'Filesystem', emoji: '📁', tier: 1, category: 'specialized', description: 'Read/write files, list directories, move and search files. Built-in Cursor tool; add for non-default directory access.', toolCount: 8, installCommand: 'npx @modelcontextprotocol/server-filesystem', configSnippet: `{\n  "mcpServers": {\n    "filesystem": {\n      "command": "npx",\n      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/allowed/path"]\n    }\n  }\n}` },
    { id: 'slack', name: 'Slack', emoji: '💬', tier: 2, category: 'specialized', description: 'Post messages, read channel history, search conversations, manage channel memberships from your agent workflows.', toolCount: 11, installCommand: 'npx @modelcontextprotocol/server-slack', configSnippet: `{\n  "mcpServers": {\n    "slack": {\n      "command": "npx",\n      "args": ["-y", "@modelcontextprotocol/server-slack"],\n      "env": { "SLACK_BOT_TOKEN": "xoxb-...", "SLACK_TEAM_ID": "T..." }\n    }\n  }\n}` },
    { id: 'notion', name: 'Notion', emoji: '📓', tier: 2, category: 'specialized', description: 'Read and write Notion pages, databases, and blocks. Turn technical specs in Notion into code automatically.', toolCount: 13, installCommand: 'npx @notionhq/notion-mcp-server', configSnippet: `{\n  "mcpServers": {\n    "notion": {\n      "command": "npx",\n      "args": ["-y", "@notionhq/notion-mcp-server"],\n      "env": { "NOTION_API_KEY": "secret_..." }\n    }\n  }\n}` },
    { id: 'stripe', name: 'Stripe', emoji: '💳', tier: 2, category: 'specialized', description: 'Query charges, customers, subscriptions, and refunds. Debug payment flows directly from your development prompts.', toolCount: 17, installCommand: 'npx @stripe/agent-toolkit', configSnippet: `{\n  "mcpServers": {\n    "stripe": {\n      "command": "npx",\n      "args": ["-y", "@stripe/agent-toolkit"],\n      "env": { "STRIPE_SECRET_KEY": "sk_..." }\n    }\n  }\n}` },
    { id: 'aws-kb', name: 'AWS Bedrock', emoji: '☁️', tier: 3, category: 'specialized', description: 'Query AWS Bedrock Knowledge Bases. Retrieve RAG context, semantic search your own company docs from agents.', toolCount: 6, installCommand: 'npx @modelcontextprotocol/server-aws-kb-retrieval', configSnippet: `{\n  "mcpServers": {\n    "aws-kb": {\n      "command": "npx",\n      "args": ["-y", "@modelcontextprotocol/server-aws-kb-retrieval"],\n      "env": { "AWS_ACCESS_KEY_ID": "...", "AWS_SECRET_ACCESS_KEY": "...", "AWS_REGION": "us-east-1" }\n    }\n  }\n}` },
    { id: 'brave-search', name: 'Brave Search', emoji: '🔍', tier: 2, category: 'specialized', description: 'Live web search in agent sessions. Finds current documentation, Stack Overflow answers, and release notes in real-time.', toolCount: 3, installCommand: 'npx @modelcontextprotocol/server-brave-search', configSnippet: `{\n  "mcpServers": {\n    "brave-search": {\n      "command": "npx",\n      "args": ["-y", "@modelcontextprotocol/server-brave-search"],\n      "env": { "BRAVE_API_KEY": "your-key" }\n    }\n  }\n}` },
    { id: 'memory', name: 'Memory', emoji: '🧠', tier: 2, category: 'specialized', description: 'Persistent agent memory — store facts, preferences, and decisions across conversations. Knowledge graph for your project.', toolCount: 7, installCommand: 'npx @modelcontextprotocol/server-memory', configSnippet: `{\n  "mcpServers": {\n    "memory": {\n      "command": "npx",\n      "args": ["-y", "@modelcontextprotocol/server-memory"]\n    }\n  }\n}` },
    { id: 'sequential-thinking', name: 'Sequential Thinking', emoji: '🧩', tier: 3, category: 'specialized', description: 'Forces the agent to use a multi-step reasoning chain before producing output. Dramatically improves complex task accuracy.', toolCount: 4, installCommand: 'npx @modelcontextprotocol/server-sequential-thinking', configSnippet: `{\n  "mcpServers": {\n    "sequential-thinking": {\n      "command": "npx",\n      "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"]\n    }\n  }\n}` },
]

const CATEGORY_COLORS: Record<string, string> = {
    design: '#A855F7',
    dev: '#3B82F6',
    backend: '#10B981',
    testing: '#F59E0B',
    specialized: '#EC4899',
}

const TIER_LABELS: Record<number, { label: string; color: string; desc: string }> = {
    1: { label: 'Must-Have', color: 'text-green-400 border-green-500/30 bg-green-500/10', desc: 'Core servers every Cursor + agent setup needs' },
    2: { label: 'Recommended', color: 'text-blue-400 border-blue-500/30 bg-blue-500/10', desc: 'Add based on your stack and workflow' },
    3: { label: 'Specialized', color: 'text-purple-400 border-purple-500/30 bg-purple-500/10', desc: 'Advanced use cases and power users' },
}

// ─── How MCP Works Section ────────────────────────────────────────────────────

function HowMCPWorks() {
    const [openStep, setOpenStep] = useState<number | null>(0)

    const steps = [
        {
            title: 'What Is MCP?',
            icon: <BookOpen className="w-5 h-5" />,
            color: 'from-purple-500 to-purple-700',
            content: `The Model Context Protocol (MCP) is an open standard that lets Cursor's agent securely connect to external tools and data sources.

Think of it as a universal USB-C port: instead of each AI tool needing a custom integration, MCP provides one standard protocol that any tool can implement. Once connected, the agent can READ data from external systems (databases, APIs, file systems) and WRITE data back (create issues, push commits, send messages).

MCP was open-sourced by Anthropic in November 2024. It now has hundreds of community and official servers. Cursor adopted it natively — enabling true agentic workflows that span your entire development stack.`
        },
        {
            title: 'How It Works (Technical)',
            icon: <Zap className="w-5 h-5" />,
            color: 'from-blue-500 to-blue-700',
            content: `MCP uses a client-server architecture over stdio (local) or HTTP/SSE (remote):

1. CURSOR (MCP Client) → reads ~/.cursor/mcp.json at startup
2. For each server entry, Cursor spawns the process (e.g., npx @figma/mcp)
3. The MCP server registers its TOOLS via the initialize handshake
4. Cursor adds those tools to the agent's tool registry
5. When you prompt the agent, it can call any registered tool
6. Tool calls go: Cursor → JSON-RPC → MCP Server → External API → response back
7. The response is added to the agent's context for next reasoning step

The 40-tool limit: Cursor caps active MCP tools at 40 to keep the context window clean. Each MCP server exposes N tools — budget carefully.`
        },
        {
            title: 'The 40-Tool Limit Strategy',
            icon: <Shield className="w-5 h-5" />,
            color: 'from-amber-500 to-amber-700',
            content: `Cursor limits active MCP tools to 40 across all connected servers. This is not a bug — large tool lists degrade model accuracy.

STRATEGY:
• Tier 1 (must-have): GitHub (30), Figma (15), Context7 (5) = 50 tools → TOO MANY
• Keep only what you need per project. Use separate ~/.cursor/mcp.json per project dir.
  
PRIORITY APPROACH:
1. Always include Context7 (5 tools) — prevents hallucinated APIs
2. Include your version control: GitHub OR GitLab (not both)
3. Include your DB: Postgres OR Supabase OR SQLite (not all)
4. Include Playwright for UI-heavy projects
5. Project-specific: Figma for design, Sentry for production debugging

PRO TIP: Set "disabled": true in mcp.json for servers you want available but not active by default.`
        },
        {
            title: 'Build Your Own MCP Server',
            icon: <Code2 className="w-5 h-5" />,
            color: 'from-green-500 to-green-700',
            content: `Creating an MCP server is straightforward. You can wrap any REST API, local tool, or database in under 50 lines.

TYPESCRIPT EXAMPLE (Node.js):

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new Server({ name: "my-tool", version: "1.0.0" }, {
  capabilities: { tools: {} }
});

// Register a tool
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [{
    name: "get_data",
    description: "Fetch data from my internal API",
    inputSchema: {
      type: "object",
      properties: { id: { type: "string" } },
      required: ["id"]
    }
  }]
}));

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (req) => {
  if (req.params.name === "get_data") {
    const data = await fetchMyAPI(req.params.arguments.id);
    return { content: [{ type: "text", text: JSON.stringify(data) }] };
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);

// Add to ~/.cursor/mcp.json:
// "my-tool": { "command": "node", "args": ["./my-mcp-server.js"] }`
        },
        {
            title: 'mcp.json Configuration Reference',
            icon: <Terminal className="w-5 h-5" />,
            color: 'from-cyan-500 to-cyan-700',
            content: `Full ~/.cursor/mcp.json structure:

{
  "mcpServers": {
    "server-name": {
      /* REQUIRED */
      "command": "npx",         // or "node", "python", "uvx"
      "args": ["-y", "@pkg/server"],

      /* OPTIONAL */
      "env": {                  // environment variables (secrets)
        "API_KEY": "sk-..."
      },
      "disabled": false,        // set true to deactivate without removing
      "alwaysAllow": [          // tools that skip the confirmation dialog
        "get_issues",
        "list_files"
      ]
    }
  }
}

FILE LOCATIONS:
• Global (all projects): ~/.cursor/mcp.json
• Per-project (overrides global): .cursor/mcp.json in project root
• Per-project settings are MERGED with global (not replaced)

SECURITY NOTE:
Never commit mcp.json with real API keys. Use env vars from your shell profile instead:
"env": { "GITHUB_TOKEN": "$GITHUB_TOKEN" }  ← sourced from shell env`
        },
    ]

    return (
        <div className="glass-card overflow-hidden">
            <div className="p-6 border-b border-white/5">
                <h2 className="text-xl font-bold text-text-primary">Understanding MCP</h2>
                <p className="text-text-secondary text-sm mt-1">From first principles to building your own server. Everything you need to know.</p>
            </div>
            <div className="divide-y divide-white/5">
                {steps.map((step, i) => (
                    <div key={i}>
                        <button
                            onClick={() => setOpenStep(openStep === i ? null : i)}
                            className="w-full flex items-center gap-4 p-5 hover:bg-white/3 transition-colors text-left"
                        >
                            <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${step.color} flex items-center justify-center text-white shrink-0`}>
                                {step.icon}
                            </div>
                            <div className="flex-1">
                                <div className="font-semibold text-text-primary">{step.title}</div>
                            </div>
                            {openStep === i ? <ChevronDown className="w-4 h-4 text-text-muted" /> : <ChevronRight className="w-4 h-4 text-text-muted" />}
                        </button>
                        <AnimatePresence>
                            {openStep === i && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="overflow-hidden"
                                >
                                    <div className="px-5 pb-5 ml-[52px]">
                                        <pre className="text-text-secondary text-sm leading-relaxed whitespace-pre-wrap font-sans">
                                            {step.content}
                                        </pre>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    )
}

// ─── Server Card ──────────────────────────────────────────────────────────────

function ServerCard({ server, inStack, onToggle }: {
    server: typeof MCP_SERVERS[0]
    inStack: boolean
    onToggle: () => void
}) {
    const [showConfig, setShowConfig] = useState(false)
    const [copied, setCopied] = useState(false)

    const tierInfo = TIER_LABELS[server.tier]
    const catColor = CATEGORY_COLORS[server.category]

    const copy = () => {
        navigator.clipboard.writeText(server.configSnippet)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className={`glass-card overflow-hidden transition-all duration-200 hover:border-white/20 ${inStack ? 'border-primary/30 bg-primary/5' : ''}`}>
            <div className="p-4">
                {/* Header row */}
                <div className="flex items-start gap-3 mb-3">
                    <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                        style={{ background: `${catColor}20` }}
                    >
                        {server.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-bold text-text-primary">{server.name}</h3>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${tierInfo.color}`}>
                                {tierInfo.label}
                            </span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-text-muted border border-white/10">
                                {server.category}
                            </span>
                        </div>
                        <div className="text-xs text-text-muted mt-0.5">{server.toolCount} tools</div>
                    </div>
                    <button
                        onClick={onToggle}
                        className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all ${inStack
                            ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30'
                            : 'bg-primary/20 text-primary-light hover:bg-primary/30 border border-primary/30'
                            }`}
                    >
                        {inStack ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </button>
                </div>

                <p className="text-text-secondary text-xs leading-relaxed mb-3">{server.description}</p>

                {/* Install */}
                <div className="flex items-center gap-2 bg-bg-secondary rounded-lg px-3 py-1.5 border border-white/5 mb-3">
                    <Terminal className="w-3.5 h-3.5 text-text-muted shrink-0" />
                    <code className="text-xs text-accent font-mono flex-1 truncate">{server.installCommand}</code>
                </div>

                <button
                    onClick={() => setShowConfig(e => !e)}
                    className="text-xs text-primary-light hover:text-white flex items-center gap-1.5 transition-colors"
                >
                    {showConfig ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                    View mcp.json config
                </button>
            </div>

            <AnimatePresence>
                {showConfig && (
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        className="overflow-hidden border-t border-white/5"
                    >
                        <div className="p-4 relative">
                            <button onClick={copy} className="absolute top-3 right-3 btn-secondary text-xs gap-1">
                                {copied ? <CheckCircle className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                                {copied ? 'Copied' : 'Copy'}
                            </button>
                            <pre className="text-xs text-green-300/90 font-mono leading-relaxed whitespace-pre-wrap pr-20">
                                {server.configSnippet}
                            </pre>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

// ─── Stack Builder ────────────────────────────────────────────────────────────

function StackBuilder({ stack, setStack }: { stack: string[], setStack: (s: string[]) => void }) {
    const [showFull, setShowFull] = useState(false)
    const [copiedJSON, setCopiedJSON] = useState(false)

    const activeServers = MCP_SERVERS.filter(s => stack.includes(s.id))
    const totalTools = activeServers.reduce((a, s) => a + s.toolCount, 0)
    const overLimit = totalTools > 40

    const generateJSON = () => {
        const servers: Record<string, unknown> = {}
        for (const s of activeServers) {
            const lines = s.configSnippet
                .replace(/^\{[\s\S]*?"mcpServers":\s*\{/m, '')
                .replace(/\}\s*\}\s*$/, '')
                .trim()
            try {
                const inner = JSON.parse(`{${lines}}`)
                Object.assign(servers, inner)
            } catch {
                servers[s.id] = { command: 'npx', args: [`-y`, s.installCommand.replace('npx ', '')] }
            }
        }
        return JSON.stringify({ mcpServers: servers }, null, 2)
    }

    const copyJSON = () => {
        navigator.clipboard.writeText(generateJSON())
        setCopiedJSON(true)
        setTimeout(() => setCopiedJSON(false), 2000)
    }

    return (
        <div className={`glass-card overflow-hidden sticky top-4 transition-all ${overLimit ? 'border-red-500/40' : stack.length > 0 ? 'border-accent/30' : ''}`}>
            <div className="p-4 border-b border-white/5">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-text-primary">Your MCP Stack</h3>
                    {stack.length > 0 && (
                        <button onClick={() => setStack([])} className="text-xs text-text-muted hover:text-red-400 transition-colors">
                            Clear all
                        </button>
                    )}
                </div>

                {/* Tool budget bar */}
                <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                        <span className="text-text-muted">Tool Budget</span>
                        <span className={overLimit ? 'text-red-400 font-bold' : 'text-text-primary font-mono'}>
                            {totalTools}/40{overLimit && ' ⚠️'}
                        </span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                                width: `${Math.min(100, (totalTools / 40) * 100)}%`,
                                background: overLimit ? '#EF4444' : totalTools > 30 ? '#F59E0B' : '#06D6A0'
                            }}
                        />
                    </div>
                    {overLimit && (
                        <p className="text-red-400 text-xs">Over limit! Cursor will disable random tools. Remove some servers.</p>
                    )}
                </div>
            </div>

            {stack.length === 0 ? (
                <div className="p-6 text-center text-text-muted text-sm">
                    <Server className="w-8 h-8 mx-auto mb-2 opacity-30" />
                    Click + on any server to add it to your stack
                </div>
            ) : (
                <div className="p-4 space-y-2">
                    {activeServers.map(s => (
                        <div key={s.id} className="flex items-center justify-between py-1.5 px-3 rounded-lg bg-bg-secondary border border-white/5">
                            <div className="flex items-center gap-2">
                                <span className="text-base">{s.emoji}</span>
                                <span className="text-sm text-text-primary font-medium">{s.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-text-muted">{s.toolCount} tools</span>
                                <button onClick={() => setStack(stack.filter(id => id !== s.id))} className="text-text-muted hover:text-red-400 transition-colors">
                                    <Minus className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                    ))}

                    {/* Export JSON */}
                    <div className="pt-2">
                        <button
                            onClick={() => setShowFull(e => !e)}
                            className="w-full text-xs text-primary-light hover:text-white flex items-center justify-center gap-1.5 py-2 transition-colors"
                        >
                            {showFull ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                            {showFull ? 'Hide' : 'Show'} generated mcp.json
                        </button>

                        <AnimatePresence>
                            {showFull && (
                                <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                                    <div className="relative mt-2">
                                        <button onClick={copyJSON} className="absolute top-2 right-2 btn-primary text-xs gap-1">
                                            <Copy className="w-3 h-3" /> {copiedJSON ? 'Copied!' : 'Copy'}
                                        </button>
                                        <pre className="bg-bg-secondary border border-white/5 rounded-xl p-4 text-xs text-green-300/90 font-mono leading-relaxed overflow-auto max-h-80 pr-24">
                                            {generateJSON()}
                                        </pre>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {!showFull && (
                            <button onClick={copyJSON} className="btn-primary w-full mt-2 text-sm gap-2">
                                <Copy className="w-4 h-4" /> {copiedJSON ? 'Copied to clipboard!' : 'Export mcp.json'}
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MCP() {
    const [stack, setStack] = useState<string[]>(['github', 'context7', 'playwright'])
    const [filterCat, setFilterCat] = useState('all')
    const [filterTier, setFilterTier] = useState('all')

    const toggleServer = (id: string) => {
        setStack(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id])
    }

    const cats = ['all', 'dev', 'backend', 'design', 'testing', 'specialized']
    const tiers = ['all', '1', '2', '3']

    const filtered = MCP_SERVERS.filter(s =>
        (filterCat === 'all' || s.category === filterCat) &&
        (filterTier === 'all' || s.tier === parseInt(filterTier))
    )

    const catData = Object.entries(
        MCP_SERVERS.reduce((acc, s) => {
            acc[s.category] = (acc[s.category] || 0) + s.toolCount
            return acc
        }, {} as Record<string, number>)
    ).map(([name, value]) => ({ name, value }))

    const tierData = [
        { name: 'Must-Have', count: MCP_SERVERS.filter(s => s.tier === 1).length, tools: MCP_SERVERS.filter(s => s.tier === 1).reduce((a, s) => a + s.toolCount, 0) },
        { name: 'Recommended', count: MCP_SERVERS.filter(s => s.tier === 2).length, tools: MCP_SERVERS.filter(s => s.tier === 2).reduce((a, s) => a + s.toolCount, 0) },
        { name: 'Specialized', count: MCP_SERVERS.filter(s => s.tier === 3).length, tools: MCP_SERVERS.filter(s => s.tier === 3).reduce((a, s) => a + s.toolCount, 0) },
    ]

    const PIE_COLORS = Object.values(CATEGORY_COLORS)

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">

            {/* Header */}
            <div>
                <h1 className="text-3xl font-black text-text-primary mb-2">MCP Ecosystem</h1>
                <p className="text-text-secondary max-w-3xl leading-relaxed">
                    The Model Context Protocol connects Cursor's agent to external tools. Learn how it works, browse {MCP_SERVERS.length} ready-to-use servers, manage your tool budget, and export a working <code className="text-accent text-sm">mcp.json</code> config.
                    The 40-tool limit means every server slot counts — choose wisely.
                </p>
            </div>

            {/* Understanding MCP — collapsible accordion */}
            <HowMCPWorks />

            {/* Stats row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Servers Available', value: MCP_SERVERS.length, color: 'text-primary-light', sub: 'across 5 categories' },
                    { label: 'Total Tools', value: MCP_SERVERS.reduce((a, s) => a + s.toolCount, 0), color: 'text-accent', sub: 'cursor limit: 40 active' },
                    { label: 'Tool Limit', value: '40', color: 'text-amber-400', sub: 'active tools max' },
                    { label: 'Must-Have Tier', value: MCP_SERVERS.filter(s => s.tier === 1).length, color: 'text-green-400', sub: 'essential servers' },
                ].map(stat => (
                    <div key={stat.label} className="glass-card p-5 text-center">
                        <div className={`text-3xl font-black mb-1 ${stat.color}`}>{stat.value}</div>
                        <div className="text-text-primary text-sm font-medium">{stat.label}</div>
                        <div className="text-text-muted text-xs mt-0.5">{stat.sub}</div>
                    </div>
                ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="glass-card p-5">
                    <h3 className="text-text-primary font-semibold mb-1">Tool Budget by Category</h3>
                    <p className="text-text-muted text-xs mb-4">Total tools across all available servers per category</p>
                    <ResponsiveContainer width="100%" height={220}>
                        <PieChart>
                            <Pie data={catData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} innerRadius={50} paddingAngle={3}>
                                {catData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                            </Pie>
                            <Tooltip contentStyle={{ background: '#1A1A2E', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }} />
                            <Legend iconType="circle" iconSize={10} formatter={(v: string) => <span style={{ color: '#9CA3AF', fontSize: '12px' }}>{v}</span>} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="glass-card p-5">
                    <h3 className="text-text-primary font-semibold mb-1">Servers by Tier</h3>
                    <p className="text-text-muted text-xs mb-4">Count of servers and total tools per recommendation tier</p>
                    <ResponsiveContainer width="100%" height={220}>
                        <BarChart data={tierData} barGap={4}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey="name" tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                            <Tooltip contentStyle={{ background: '#1A1A2E', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }} />
                            <Bar dataKey="count" fill="#7C3AED" radius={[4, 4, 0, 0]} name="Servers" />
                            <Bar dataKey="tools" fill="#06D6A0" radius={[4, 4, 0, 0]} name="Total tools" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Main content: server grid + stack builder */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                {/* Servers */}
                <div className="xl:col-span-2 space-y-5">
                    {/* Filters */}
                    <div className="flex flex-wrap gap-3">
                        <div className="flex flex-wrap gap-1.5">
                            {cats.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setFilterCat(cat)}
                                    className={`text-xs px-3 py-1.5 rounded-lg border capitalize transition-all ${filterCat === cat
                                        ? 'bg-primary/20 text-primary-light border-primary/30'
                                        : 'bg-white/5 text-text-muted border-white/10 hover:bg-white/10'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                            {tiers.map(tier => (
                                <button
                                    key={tier}
                                    onClick={() => setFilterTier(tier)}
                                    className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${filterTier === tier
                                        ? 'bg-accent/20 text-accent border-accent/30'
                                        : 'bg-white/5 text-text-muted border-white/10 hover:bg-white/10'
                                        }`}
                                >
                                    {tier === 'all' ? 'All Tiers' : `Tier ${tier}`}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {filtered.map((server, i) => (
                            <motion.div key={server.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                                <ServerCard
                                    server={server}
                                    inStack={stack.includes(server.id)}
                                    onToggle={() => toggleServer(server.id)}
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Stack builder sidebar */}
                <div>
                    <StackBuilder stack={stack} setStack={setStack} />
                </div>
            </div>

            {/* Quick Setup Guide */}
            <div className="glass-card p-6">
                <h2 className="text-xl font-bold text-text-primary mb-4">⚡ 3-Step Quick Setup</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        {
                            step: '1',
                            title: 'Build your stack above',
                            desc: 'Use the + buttons to add servers. Watch the tool budget bar — keep it under 40.',
                            color: 'from-purple-500 to-purple-700',
                        },
                        {
                            step: '2',
                            title: 'Export mcp.json',
                            desc: 'Click "Export mcp.json" in the stack builder. It generates the complete config with all your selected servers.',
                            color: 'from-blue-500 to-blue-700',
                        },
                        {
                            step: '3',
                            title: 'Place in ~/.cursor/mcp.json',
                            desc: 'Save to your home directory. Restart Cursor (Cmd+Shift+P → Reload Window). Servers appear in the MCP section of Settings.',
                            color: 'from-green-500 to-green-700',
                        },
                    ].map(s => (
                        <div key={s.step} className="flex gap-3">
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white font-black shrink-0`}>
                                {s.step}
                            </div>
                            <div>
                                <div className="font-semibold text-text-primary mb-1">{s.title}</div>
                                <div className="text-text-secondary text-sm leading-relaxed">{s.desc}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
