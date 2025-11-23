'use client';

import { useState, useRef, useEffect } from 'react';
import ChatMessage from '@/components/ChatMessage';
import ChatInput from '@/components/ChatInput';
import PromptSuggestions from '@/components/PromptSuggestions';
import { Message, generateResponse, initialPrompts } from '@/utils/chatBot';
import { Sparkles } from 'lucide-react';

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Hi! I'm **Haripriya Rao's AI assistant**. I can answer questions about her work, experience, projects, and achievements.\n\nFeel free to ask me anything, or try one of the suggested prompts below! 👇`
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (userMessage: string) => {
    // Add user message
    const userMsg: Message = { role: 'user', content: userMessage };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    // Simulate thinking delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));

    // Generate response
    const response = generateResponse(userMessage);
    const assistantMsg: Message = { role: 'assistant', content: response };
    
    setMessages(prev => [...prev, assistantMsg]);
    setIsLoading(false);
  };

  const handlePromptSelect = (prompt: string) => {
    handleSend(prompt);
  };

  return (
    <main className="flex flex-col h-screen bg-[#343541]">
      {/* Header */}
      <header className="border-b border-[#565869] bg-[#202123] px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#19c37d] to-[#5436da] flex items-center justify-center">
            <Sparkles size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-white">Haripriya Rao</h1>
            <p className="text-xs text-gray-400">Lead Software Engineer</p>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
        {isLoading && (
          <div className="flex gap-4 p-4 bg-[#444654]">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#5436da] flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            </div>
            <div className="flex-1">
              <div className="font-semibold mb-1 text-sm">Haripriya</div>
              <div className="text-sm text-gray-400">Thinking...</div>
            </div>
          </div>
        )}
        {messages.length === 1 && !isLoading && (
          <PromptSuggestions onSelectPrompt={handlePromptSelect} disabled={isLoading} />
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <ChatInput onSend={handleSend} disabled={isLoading} />
    </main>
  );
}

