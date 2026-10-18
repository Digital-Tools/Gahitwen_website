import { ReactNode } from 'react';

type EyebrowProps = {
  children: ReactNode;
  dark?: boolean;
  className?: string;
};

// Small mono pill used above section headings.
const Eyebrow = ({ children, dark = false, className = '' }: EyebrowProps) => {
  const tone = dark
    ? 'border-white/15 bg-white/5 text-yellow-400'
    : 'border-brown-900/10 bg-white/80 text-brown-700';

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em] backdrop-blur ${tone} ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-yellow-500" aria-hidden="true" />
      {children}
    </span>
  );
};

export default Eyebrow;
