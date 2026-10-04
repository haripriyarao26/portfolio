'use client';

import { motion } from 'framer-motion';
import Section3D from '@/components/Section3D';
import { resumeData } from '@/data/resume';

const spring = { type: 'spring' as const, stiffness: 100, damping: 30 };

const staggerItem = {
  hidden: { opacity: 0, y: 18, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: spring },
};

export default function Education() {
  return (
    <Section3D id="education" className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={spring}
        className="mb-8"
      >
        <p className="mono-accent text-xs tracking-[0.22em] text-[var(--accent)] uppercase mb-2">
          Academic Foundation
        </p>
        <h2 className="font-display text-2xl font-bold text-[var(--text-primary)] sm:text-4xl">
          Education
        </h2>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2">
        {resumeData.education.map((edu, index) => (
          <motion.div
            key={edu.institution}
            variants={staggerItem}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="card p-6 border border-white/10 hover:border-[var(--accent)]/40 transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="mono-accent text-[11px] tracking-[0.16em] text-[var(--accent)] uppercase font-semibold">
                  {edu.period}
                </span>
                <span className="mono-accent text-[11px] text-[var(--text-muted)]">
                  {edu.location}
                </span>
              </div>
              <h3 className="font-display text-lg font-bold text-[var(--text-primary)] leading-snug">
                {edu.degree}
              </h3>
              <p className="text-sm font-medium text-[var(--text-muted)] mt-1">
                {edu.institution}
              </p>
            </div>
            {edu.coursework && edu.coursework.length > 0 && (
              <div className="mt-5 pt-4 border-t border-white/5">
                <p className="mono-accent text-[10px] uppercase tracking-wider text-[#A69F94] mb-2 font-medium">
                  Key Coursework &amp; Subjects
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {edu.coursework.map(subject => (
                    <span
                      key={subject}
                      className="mono-accent text-[11px] px-2.5 py-1 rounded-md bg-white/[0.03] text-[#A69F94] border border-white/10 hover:border-[#E07A5F]/40 hover:text-[#FAF6F0] transition-colors"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </Section3D>
  );
}
