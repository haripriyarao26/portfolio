'use client';

import { useState, KeyboardEvent } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-[#565869] bg-[#343541] p-4">
      <div className="max-w-3xl mx-auto flex gap-2 items-end">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Ask me anything about Haripriya..."
          className="flex-1 resize-none bg-[#40414f] text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#19c37d] max-h-32 overflow-y-auto"
          rows={1}
          disabled={disabled}
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#565869 #40414f',
          }}
        />
        <button
          onClick={handleSend}
          disabled={disabled || !input.trim()}
          className="p-3 bg-[#19c37d] hover:bg-[#16a570] disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg transition-colors"
          aria-label="Send message"
        >
          <Send size={20} className="text-white" />
        </button>
      </div>
    </div>
  );
}

