import { ReactNode } from 'react';

type MarqueeProps = {
  children: ReactNode;
  duration?: number;
  className?: string;
};

// Infinite horizontal scroller. Content is rendered twice so the loop is seamless;
// the second copy is hidden from assistive tech. Pauses on hover.
const Marquee = ({ children, duration = 40, className = '' }: MarqueeProps) => {
  const style = { '--marquee-duration': `${duration}s`, '--marquee-gap': '3rem' } as React.CSSProperties;

  return (
    <div className={`group flex overflow-hidden mask-fade-x ${className}`} style={style}>
      <div className="flex w-max shrink-0 animate-marquee items-center gap-12 group-hover:[animation-play-state:paused]">
        <div className="flex shrink-0 items-center gap-12">{children}</div>
        <div className="flex shrink-0 items-center gap-12" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Marquee;
