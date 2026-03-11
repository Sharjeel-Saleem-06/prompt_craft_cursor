# PromptCraft — Cursor & AI Development Mastery

**PromptCraft** is a production-grade interactive React application designed to be the definitive guide and tool for AI-assisted software development using the Cursor IDE and cutting-edge LLMs (like Llama 3.3).

This platform dynamically parses a highly structured Markdown guide at build time, converting complex architectural patterns, prompting methodologies, and Model Context Protocol (MCP) ecosystems into an elegant, interactive dashboard.

![PromptCraft Screenshot](./public/vite.svg)

## 🚀 Key Features

### 🤖 Prompt Lab (AI Enhancer)
The crown jewel of PromptCraft. Features a **Live Prompt Scorer** to measure prompt quality across 7 PCTF+ dimensions (Persona, Context, Task, Format, +Constraints, +Done Criteria, +Pattern).
It integrates the **Groq API with Llama 3.3 70B** to automatically enhance messy, vague, or complex prompts into production-grade Cursor prompts.
- **Load Balancing**: Automatically cycles through multiple API keys to manage rate limits.
- **Stack Detection**: Adapts responses based on detected frameworks (iOS, Android, React Native, Next.js).
- **Golden Rules**: Reference section with real before-and-after transformations.

### 🔌 MCP Ecosystem (Model Context Protocol)
A comprehensive registry of **22+ pre-configured MCP Servers** categorised by Design, Dev, Backend, Testing, and Specialized functions.
- Learn what MCP is and how it powers agentic workflows.
- Browse servers for tools like GitHub, Figma, Postgres, Supabase, Playwright, and more.
- Generate and copy exact `mcp.json` installation snippets.

### 📚 Interactive Guide & Techniques
A fully functional markdown parser (`src/data/parser.ts`) reads the core `PROMPTCRAFT_ULTIMATE_GUIDE.md` and generates:
- **Guide**: Step-by-step reading progress, collapsible code blocks, and best-practice principles.
- **Techniques**: Deep dives into Context Management, Multi-Turn Refactoring, TDD, and debugging loops.
- **Workflows**: Visual process pipelines for executing end-to-end features.

### 📊 Dashboard & Analytics
A "glassmorphism" styled command center tracking your progress traversing the guide, displaying mastery metrics, and acting as the launchpad into the rest of the application.

## 🛠️ Technology Stack

- **Framework**: [React 18](https://react.dev) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Routing**: [React Router v6](https://reactrouter.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Lucide React](https://lucide.dev/) (Icons), [Recharts](https://recharts.org/) (Data Visualization)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **AI Integration**: [Groq Cloud via Llama 3.3](https://groq.com/)

## 📦 Getting Started

### Prerequisites
Make sure you have Node.js (v18+) and npm/yarn installed.

### Installation

1. **Clone the repository:**
   \`\`\`bash
   git clone https://github.com/Sharjeel-Saleem-06/prompt_craft_cursor.git
   cd prompt_craft_cursor
   \`\`\`

2. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

3. **Start the development server:**
   \`\`\`bash
   npm run dev
   \`\`\`
   Navigate to \`http://localhost:5173\` (or as indicated in the terminal).

### Deployment

This application is optimized for deployment to **Netlify** (or Vercel).
A \`netlify.toml\` has been provided to accommodate client-side routing within React Router.

To build the project:
\`\`\`bash
npm run build
\`\`\`
The output will be found in the \`/dist\` directory.

## 🔒 Environment Setup (Optional)
The Groq keys for the AI Enhancer are hardcoded for demonstration purposes, however, you should extract these as Environment Variables (\`VITE_GROQ_KEY\`) if exposing the application via a public URL.

## 📄 License
This guide and platform are intended to level-up developers transitioning to AI-native workflows. Feel free to use, adapt, and expand.
