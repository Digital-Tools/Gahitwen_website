import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Eyebrow from './Eyebrow';

type PageHeroProps = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
  centered?: boolean;
};

// Shared hero for inner pages: light grid backdrop with a warm glow.
const PageHero = ({ eyebrow, title, subtitle, children, centered = true }: PageHeroProps) => {
  const alignment = centered ? 'text-center items-center mx-auto' : 'text-left items-start';

  return (
    <section className="relative overflow-hidden px-4 pt-36 pb-16 sm:px-6 md:pt-44 md:pb-24 lg:px-8">
      <div className="absolute inset-0 bg-grid mask-fade-radial" aria-hidden="true" />
      <div
        className="absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-yellow-400/25 blur-[120px]"
        aria-hidden="true"
      />

      <div className="container relative mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`flex max-w-3xl flex-col ${alignment}`}
        >
          {eyebrow && <Eyebrow className="mb-6">{eyebrow}</Eyebrow>}
          <h1 className="text-4xl leading-[1.02] text-brown-950 sm:text-5xl md:text-6xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-brown-700/80 sm:text-xl">
              {subtitle}
            </p>
          )}
          {children && (
            <div className={`mt-9 flex flex-col gap-3 sm:flex-row ${centered ? 'justify-center' : ''}`}>
              {children}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default PageHero;
