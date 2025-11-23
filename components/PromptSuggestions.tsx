'use client';

import { initialPrompts } from '@/utils/chatBot';

interface PromptSuggestionsProps {
  onSelectPrompt: (prompt: string) => void;
  disabled?: boolean;
}

export default function PromptSuggestions({ onSelectPrompt, disabled }: PromptSuggestionsProps) {
  return (
    <div className="max-w-3xl mx-auto px-4 pb-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {initialPrompts.map((prompt, index) => (
          <button
            key={index}
            onClick={() => onSelectPrompt(prompt)}
            disabled={disabled}
            className="text-left p-4 bg-[#40414f] hover:bg-[#565869] rounded-lg border border-[#565869] hover:border-[#19c37d] transition-all text-sm text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
}

