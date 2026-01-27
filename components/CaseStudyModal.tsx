'use client';

import { X } from 'lucide-react';
import { useEffect, memo } from 'react';
import MoodBiteCaseStudy from './MoodBiteCaseStudy';
import GeminiCaseStudy from './GeminiCaseStudy';
import AutoUnitAgentCaseStudy from './AutoUnitAgentCaseStudy';

interface CaseStudyModalProps {
  projectId: string | null;
  onClose: () => void;
}

function CaseStudyModal({ projectId, onClose }: CaseStudyModalProps) {
  useEffect(() => {
    if (projectId) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [projectId]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && projectId) {
        onClose();
      }
    };

    if (projectId) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [projectId, onClose]);

  if (!projectId) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Modal Content */}
      <div className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-[#0f172a] rounded-xl border border-[#334155] shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="sticky top-4 right-4 z-10 ml-auto mr-4 mt-4 p-2 bg-[#1e293b] hover:bg-[#334155] rounded-full transition-colors text-[#94a3b8] hover:text-[#f8fafc]"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        {/* Case Study Content */}
        <div className="px-4 pb-8">
          {projectId === 'gemini-cookbook' ? (
            <GeminiCaseStudy projectId={projectId} />
          ) : projectId === 'auto-unit-agent' ? (
            <AutoUnitAgentCaseStudy projectId={projectId} />
          ) : projectId === 'moodbite' ? (
            <MoodBiteCaseStudy projectId={projectId} />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default memo(CaseStudyModal);
