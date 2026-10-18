import { ReactNode, useRef } from 'react';

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
  dark?: boolean;
  id?: string;
};

// Card with a soft radial highlight that follows the pointer.
const SpotlightCard = ({ children, className = '', dark = false, id }: SpotlightCardProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--x', `${e.clientX - rect.left}px`);
    el.style.setProperty('--y', `${e.clientY - rect.top}px`);
  };

  const tone = dark
    ? 'bg-white/[0.03] border-white/10 hover:border-white/20'
    : 'bg-white border-brown-900/10 shadow-card hover:shadow-lift hover:border-brown-900/15';
  const glow = dark ? 'rgb(255 194 0 / 0.10)' : 'rgb(255 194 0 / 0.16)';

  return (
    <div
      ref={ref}
      id={id}
      onPointerMove={onPointerMove}
      className={`group/spot relative isolate overflow-hidden rounded-2xl border transition-all duration-300 ${tone} ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
        style={{
          background: `radial-gradient(420px circle at var(--x, 50%) var(--y, 0%), ${glow}, transparent 65%)`,
        }}
        aria-hidden="true"
      />
      {children}
    </div>
  );
};

export default SpotlightCard;
