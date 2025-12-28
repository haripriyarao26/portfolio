'use client';

export default function SectionSeparator() {
  return (
    <div className="relative py-12 overflow-hidden">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-slate-700/50"></div>
      </div>
      <div className="relative flex justify-center">
        <div className="bg-slate-900 px-4">
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500"></div>
        </div>
      </div>
    </div>
  );
}
