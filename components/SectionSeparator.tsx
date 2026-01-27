'use client';

export default function SectionSeparator() {
  return (
    <div className="relative py-12 overflow-hidden">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-[#334155]/50"></div>
      </div>
      <div className="relative flex justify-center">
        <div className="bg-[#0f172a] px-4">
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-[#f59e0b] to-[#d97706]"></div>
        </div>
      </div>
    </div>
  );
}
