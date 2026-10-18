import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Button from './Button';

type CTAAction = {
  label: string;
  to: string;
  onClick?: () => void;
};

type CTASectionProps = {
  title: ReactNode;
  subtitle?: ReactNode;
  primary?: CTAAction;
  secondary?: CTAAction;
  footnote?: ReactNode;
};

// Closing call-to-action: dark panel used at the end of pages.
const CTASection = ({
  title,
  subtitle,
  primary = { label: 'Get a Quote', to: '/quote' },
  secondary = { label: 'Talk to the Team', to: '/contact' },
  footnote,
}: CTASectionProps) => {
  return (
    <section className="px-4 py-20 sm:px-6 md:py-28 lg:px-8">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative isolate overflow-hidden rounded-[2rem] bg-brown-950 px-6 py-16 text-center text-white sm:px-12 md:py-24"
        >
          <div className="absolute inset-0 -z-10 bg-grid-dark mask-fade-b" aria-hidden="true" />
          <div
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-yellow-500/70 to-transparent"
            aria-hidden="true"
          />

          <h2 className="mx-auto max-w-3xl text-3xl leading-[1.05] sm:text-4xl md:text-5xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">
              {subtitle}
            </p>
          )}
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Button to={primary.to} size="lg" onClick={primary.onClick}>
              {primary.label}
              <ArrowRight size={18} className="transition-transform group-hover/btn:translate-x-0.5" />
            </Button>
            {secondary && (
              <Button to={secondary.to} size="lg" variant="outlineOnDark" onClick={secondary.onClick}>
                {secondary.label}
              </Button>
            )}
          </div>
          {footnote && (
            <div className="mt-8 flex items-center justify-center gap-2 text-sm text-white/45">
              {footnote}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
