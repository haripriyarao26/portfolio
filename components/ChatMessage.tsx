'use client';

import { Message } from '@/utils/chatBot';
import { User, Bot } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

function formatMessage(content: string) {
  const lines = content.split('\n');
  return lines.map((line, lineIndex) => {
    const parts: (string | JSX.Element)[] = [];
    let lastIndex = 0;
    const boldRegex = /\*\*(.*?)\*\*/g;
    let match;
    let keyCounter = 0;
    
    while ((match = boldRegex.exec(line)) !== null) {
      if (match.index > lastIndex) {
        parts.push(line.substring(lastIndex, match.index));
      }
      parts.push(<strong key={`bold-${lineIndex}-${keyCounter++}`}>{match[1]}</strong>);
      lastIndex = match.index + match[0].length;
    }
    
    if (lastIndex < line.length) {
      parts.push(line.substring(lastIndex));
    }
    
    return (
      <span key={lineIndex}>
        {parts.length > 0 ? parts : line}
        {lineIndex < lines.length - 1 && <br />}
      </span>
    );
  });
}

export default function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div className={`flex gap-4 p-4 ${message.role === 'user' ? 'bg-[#343541]' : 'bg-[#444654]'}`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        message.role === 'user' ? 'bg-[#19c37d]' : 'bg-[#5436da]'
      }`}>
        {message.role === 'user' ? (
          <User size={18} className="text-white" />
        ) : (
          <Bot size={18} className="text-white" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-semibold mb-1 text-sm">
          {message.role === 'user' ? 'You' : 'Haripriya'}
        </div>
        <div className="message-content text-sm text-gray-200 whitespace-pre-wrap break-words">
          {formatMessage(message.content)}
        </div>
      </div>
    </div>
  );
}

