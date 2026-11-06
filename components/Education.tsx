'use client';

import { motion } from 'framer-motion';
import Section3D from '@/components/Section3D';
import { TiltCard3D } from '@/components/ReactBits3D';
import { resumeData } from '@/data/resume';

const spring = { type: 'spring' as const, stiffness: 100, damping: 30 };

const staggerItem = {
  hidden: { opacity: 0, y: 18, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: spring },
};

export default function Education() {
  return (
    <Section3D id="education" className="mx-auto max-w-6xl px-6 sm:px-10 py-14 sm:py-20 scroll-mt-24">
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-lg bg-white/60 border border-white/90 mb-3">
            <span className="h-3 w-[2px] bg-[#0F141C]" />
            <span className="mono-accent text-xs tracking-[0.18em] text-[#475569] uppercase font-semibold">
              ACADEMIC FOUNDATION
            </span>
          </div>
          <h2 className="font-display text-3xl font-semibold text-[#0F141C] sm:text-4xl">
            Education
          </h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2">
          {resumeData.education.map(edu => (
            <motion.div
              key={edu.institution}
              variants={staggerItem}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <TiltCard3D
                glareColor="rgba(255, 255, 255, 0.75)"
                className="spatial-glass rounded-3xl p-6 sm:p-7"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="mono-accent text-xs tracking-wider text-[#D97706] uppercase font-semibold">
                      {edu.period}
                    </span>
                    <span className="mono-accent text-xs text-[#64748B]">
                      {edu.location}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-[#0F141C]">
                    {edu.degree}
                  </h3>
                  <p className="text-sm font-medium text-[#475569] mt-1">
                    {edu.institution}
                  </p>
                </div>
                {edu.coursework && edu.coursework.length > 0 && (
                  <div className="mt-5 pt-4 border-t border-black/5">
                    <p className="mono-accent text-xs uppercase tracking-wider text-[#64748B] mb-2 font-medium">
                      Key Coursework
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {edu.coursework.map(subject => (
                        <span
                          key={subject}
                          className="mono-accent text-xs px-2.5 py-1 rounded-full bg-white/80 text-[#0F141C] border border-black/10"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </TiltCard3D>
            </motion.div>
          ))}
        </div>
      </div>
    </Section3D>
  );
}
