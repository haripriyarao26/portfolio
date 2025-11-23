# Haripriya Rao - Interactive Portfolio

A ChatGPT-style interactive portfolio website that allows visitors to ask questions about Haripriya Rao's experience, projects, and achievements.

## Features

- 🤖 **ChatGPT-style Interface**: Clean, modern chat interface similar to ChatGPT
- 💬 **Interactive Q&A**: Ask questions about work experience, projects, skills, and achievements
- 🎯 **Smart Responses**: AI-powered responses based on resume data
- 💡 **Prompt Suggestions**: Pre-built prompts to help visitors get started
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- ⚡ **Fast & Modern**: Built with Next.js 14 and TypeScript

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main chat interface
│   └── globals.css         # Global styles
├── components/
│   ├── ChatMessage.tsx     # Message component
│   ├── ChatInput.tsx       # Input component
│   └── PromptSuggestions.tsx # Prompt suggestions
├── data/
│   └── resume.ts           # Resume data structure
├── utils/
│   └── chatBot.ts          # Chat logic and responses
└── package.json
```

## Customization

To update the resume information, edit `data/resume.ts`. The chat bot will automatically use this data to answer questions.

To modify the response logic, edit `utils/chatBot.ts` and add new query patterns in the `generateResponse` function.

## Deployment

This project can be deployed to:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS**
- Any platform that supports Next.js

For Vercel:
```bash
npm install -g vercel
vercel
```

## License

MIT

