'use client';

import { TiltCard3D } from '@/components/ReactBits3D';
import { HaldenFadeUp, HaldenLetterReveal } from '@/components/HaldenMotion';
import { resumeData } from '@/data/resume';

export default function Education() {
  return (
    <section id="education" className="mx-auto max-w-6xl px-6 sm:px-10 py-14 sm:py-20 scroll-mt-24">
      <div>
        <HaldenFadeUp className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/80 border border-[#0b1d3a]/10 px-4 py-1.5 mb-4 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[#2fe0d0]" />
            <span className="mono-accent text-xs tracking-[0.16em] text-[#1d2f4f] uppercase font-semibold">
              ACADEMIC FOUNDATION
            </span>
          </div>

          <HaldenLetterReveal
            as="h2"
            mode="scroll"
            spread={0.32}
            segments={[
              { text: 'Computer Science', highlight: false },
              { text: 'education.', highlight: true },
            ]}
            className="font-display text-3xl sm:text-4xl font-normal text-[#0b1d3a] tracking-[-0.03em]"
          />
        </HaldenFadeUp>

        <div className="grid gap-6 sm:grid-cols-2">
          {resumeData.education.map((edu, idx) => (
            <HaldenFadeUp key={edu.institution} delay={idx * 0.1}>
              <TiltCard3D
                glareColor="rgba(143, 213, 241, 0.35)"
                className="spatial-glass rounded-3xl p-6 sm:p-7 h-full"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="mono-accent text-xs tracking-wider text-[#5b7cf0] uppercase font-semibold">
                      {edu.period}
                    </span>
                    <span className="mono-accent text-xs text-[#3e4d68]">
                      {edu.location}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-[#0b1d3a]">
                    {edu.degree}
                  </h3>
                  <p className="text-sm font-medium text-[#3e4d68] mt-1">
                    {edu.institution}
                  </p>
                </div>
                {edu.coursework && edu.coursework.length > 0 && (
                  <div className="mt-5 pt-4 border-t border-[#0b1d3a]/8">
                    <p className="mono-accent text-xs uppercase tracking-wider text-[#3e4d68] mb-2 font-medium">
                      Key Coursework
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {edu.coursework.map(subject => (
                        <span
                          key={subject}
                          className="mono-accent text-xs px-2.5 py-1 rounded-full bg-white/80 text-[#0b1d3a] border border-[#0b1d3a]/10"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </TiltCard3D>
            </HaldenFadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
