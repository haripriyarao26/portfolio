'use client';

import { useEffect, useRef, useState } from 'react';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

interface TimelineItem {
  position: string;
  company: string;
  location: string;
  period: string;
  achievements: string[];
}

interface TimelineProps {
  items: TimelineItem[];
}

export default function Timeline({ items }: TimelineProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;

      const timelineTop = timelineRef.current.offsetTop;
      const timelineHeight = timelineRef.current.offsetHeight;
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      // Find which item is currently in view
      itemRefs.current.forEach((ref, index) => {
        if (ref) {
          const itemTop = ref.offsetTop - timelineTop;
          const itemBottom = itemTop + ref.offsetHeight;
          const relativeScroll = scrollPosition - timelineTop;

          if (relativeScroll >= itemTop && relativeScroll <= itemBottom) {
            setActiveIndex(index);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const getProgress = () => {
      if (!timelineRef.current) return 0;
      const timelineTop = timelineRef.current.offsetTop;
      const timelineHeight = timelineRef.current.offsetHeight;
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;

      const start = timelineTop - viewportHeight * 0.5;
      const end = timelineTop + timelineHeight - viewportHeight * 0.5;
      const current = scrollPosition - start;
      const total = end - start;
      
      if (total <= 0) return 0;
      return Math.max(0, Math.min(1, current / total));
    };

    const handleScroll = () => {
      setProgress(getProgress());
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Color transitions from blue (200) to purple (320) as you scroll
  const hue = 200 + progress * 120;
  const lineColor = `hsl(${hue}, 75%, 55%)`;
  const lineColorLight = `hsl(${hue}, 75%, 65%)`;

  // Handle card expand/collapse
  const toggleCard = (index: number) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  // Collapse expanded card on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (expandedIndex !== null && Math.abs(currentScrollY - lastScrollY.current) > 50) {
        setExpandedIndex(null);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [expandedIndex]);

  return (
    <div ref={timelineRef} className="relative py-12">
      {/* Timeline Line - Only visible on desktop/tablet (md and above) */}
      <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full">
        {/* Background line */}
        <div
          className="absolute top-0 w-full transition-all duration-300"
          style={{
            height: '100%',
            background: 'rgba(148, 163, 184, 0.15)',
          }}
        />
        {/* Animated progress line */}
        <div
          className="absolute top-0 w-full transition-all duration-300 ease-out"
          style={{
            height: `${progress * 100}%`,
            background: `linear-gradient(to bottom, ${lineColorLight}, ${lineColor})`,
            boxShadow: `0 0 15px ${lineColor}50, 0 0 30px ${lineColor}30`,
            borderRadius: '2px',
          }}
        />
      </div>

      {/* Desktop Timeline Items */}
      <div className="hidden md:block relative space-y-12">
        {items.map((item, index) => {
          const isLeft = index % 2 === 0;
          const isActive = activeIndex === index;

          return (
            <div
              key={index}
              ref={(el) => { itemRefs.current[index] = el; }}
              className={`relative flex items-center ${
                isLeft ? 'justify-start' : 'justify-end'
              }`}
            >
              {/* Timeline Dot - Desktop */}
              <div
                className={`absolute left-1/2 transform -translate-x-1/2 z-10 transition-all duration-500 ${
                  isActive ? 'scale-125' : 'scale-100'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full border-4 border-slate-900 transition-all duration-500 ${
                    isActive
                      ? 'bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/50'
                      : 'bg-slate-700'
                  }`}
                />
              </div>

              {/* Content Card */}
              <div
                className={`w-5/12 ${isLeft ? 'pr-8' : 'pl-8'}`}
              >
                <div
                  className={`bg-slate-800 rounded-xl p-6 border transition-all duration-500 card-hover ${
                    isActive
                      ? 'border-indigo-500 shadow-lg shadow-indigo-500/30'
                      : 'border-slate-700'
                  }`}
                >
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-white mb-2">{item.position}</h3>
                    <div className="flex items-center gap-2 text-indigo-400 font-semibold mb-3">
                      <Briefcase size={18} />
                      <span>{item.company}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-slate-400 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>{item.period}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        <span>{item.location}</span>
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {item.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span
                          className={`mt-1.5 transition-colors duration-500 ${
                            isActive ? 'text-indigo-500' : 'text-slate-500'
                          }`}
                        >
                          ▹
                        </span>
                        <span className="text-slate-300 leading-relaxed">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile Stacked Cards */}
      <div className="md:hidden relative space-y-4">
        {items.map((item, index) => {
          const isExpanded = expandedIndex === index;
          return (
            <div
              key={index}
              className="px-4"
            >
              <div
                onClick={() => toggleCard(index)}
                className={`bg-slate-800 rounded-xl p-4 border transition-all duration-300 cursor-pointer relative ${
                  isExpanded
                    ? 'border-indigo-500 shadow-lg shadow-indigo-500/30'
                    : 'border-slate-700'
                }`}
                style={{
                  maxHeight: isExpanded ? 'none' : '200px',
                  overflow: isExpanded ? 'visible' : 'hidden',
                }}
              >
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white mb-2">{item.position}</h3>
                  <div className="flex items-center gap-2 text-indigo-400 font-semibold mb-2">
                    <Briefcase size={16} />
                    <span className="text-sm">{item.company}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-slate-400 text-xs">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{item.period}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={14} />
                      <span>{item.location}</span>
                    </div>
                  </div>
                </div>

                <ul className="space-y-2">
                  {item.achievements.map((achievement, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span
                        className={`mt-1 transition-colors duration-300 text-xs ${
                          isExpanded ? 'text-indigo-500' : 'text-slate-500'
                        }`}
                      >
                        ▹
                      </span>
                      <span className="text-slate-300 text-sm leading-relaxed">{achievement}</span>
                    </li>
                  ))}
                </ul>

                {!isExpanded && (
                  <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-slate-800 to-transparent rounded-b-xl pointer-events-none" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

