'use client';

export default function SectionSeparator() {
  return (
    <div className="relative py-12 overflow-hidden">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-[#e5e5e5]/50"></div>
      </div>
      <div className="relative flex justify-center">
        <div className="bg-[#fcfcf9] px-4">
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-[#1a1a1a] to-black"></div>
        </div>
      </div>
    </div>
  );
}
