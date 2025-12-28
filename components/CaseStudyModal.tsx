'use client';

import { X } from 'lucide-react';
import { useEffect } from 'react';
import MoodBiteCaseStudy from '@/components/MoodBiteCaseStudy';

interface CaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
}

export default function CaseStudyModal({ isOpen, onClose, projectId }: CaseStudyModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      style={{ animation: 'fadeIn 0.2s ease-out' }}
    >
      <div
        className="relative w-full max-w-6xl max-h-[90vh] bg-slate-900 rounded-xl overflow-hidden shadow-2xl border border-slate-700 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'scaleIn 0.3s ease-out' }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 bg-slate-800 hover:bg-slate-700 rounded-full text-white transition-colors"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[90vh]">
          <MoodBiteCaseStudy projectId={projectId} />
        </div>
      </div>
    </div>
  );
}
