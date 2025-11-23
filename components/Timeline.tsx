'use client';

import { useEffect, useRef, useState } from 'react';
import { Briefcase, Calendar, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

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
  const [carouselIndex, setCarouselIndex] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

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

  // Carousel navigation
  const nextSlide = () => {
    setCarouselIndex((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setCarouselIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  // Update carousel scroll position
  useEffect(() => {
    if (carouselRef.current) {
      const scrollPosition = carouselIndex * carouselRef.current.offsetWidth;
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
    }
  }, [carouselIndex]);

  // Update active index when carousel scrolls (for touch/swipe)
  useEffect(() => {
    const handleScroll = () => {
      if (carouselRef.current) {
        const scrollLeft = carouselRef.current.scrollLeft;
        const itemWidth = carouselRef.current.offsetWidth;
        const newIndex = Math.round(scrollLeft / itemWidth);
        if (newIndex !== carouselIndex && newIndex >= 0 && newIndex < items.length) {
          setCarouselIndex(newIndex);
        }
      }
    };

    if (carouselRef.current) {
      carouselRef.current.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        if (carouselRef.current) {
          carouselRef.current.removeEventListener('scroll', handleScroll);
        }
      };
    }
  }, [carouselIndex, items.length]);

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

      {/* Mobile Carousel */}
      <div className="md:hidden relative w-full overflow-hidden">
        {/* Carousel Container */}
        <div
          ref={carouselRef}
          className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide w-full"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className="w-full min-w-full snap-center px-4 flex-shrink-0"
            >
              <div className="relative">
                {/* Content Card - Mobile (no timeline dot) */}
                <div className="w-full">
                  <div
                    className={`bg-slate-800 rounded-xl p-4 md:p-6 border transition-all duration-500 w-full ${
                      carouselIndex === index
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
                              carouselIndex === index ? 'text-indigo-500' : 'text-slate-500'
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
            </div>
          ))}
        </div>

        {/* Carousel Navigation */}
        <div className="flex items-center justify-between mt-6 px-4 mx-4">
          <button
            onClick={prevSlide}
            className="p-3 bg-slate-800 hover:bg-indigo-600 rounded-full transition-all duration-300 border border-slate-700 hover:border-indigo-500"
            aria-label="Previous"
          >
            <ChevronLeft className="text-white" size={24} />
          </button>

          {/* Carousel Indicators */}
          <div className="flex gap-2">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => setCarouselIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  carouselIndex === index
                    ? 'w-8 bg-indigo-500'
                    : 'w-2 bg-slate-600 hover:bg-slate-500'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="p-3 bg-slate-800 hover:bg-indigo-600 rounded-full transition-all duration-300 border border-slate-700 hover:border-indigo-500"
            aria-label="Next"
          >
            <ChevronRight className="text-white" size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}

