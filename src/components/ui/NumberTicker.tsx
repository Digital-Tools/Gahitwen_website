import { useEffect, useRef } from 'react';
import { animate, useInView } from 'framer-motion';

type NumberTickerProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
};

// Counts up from zero the first time it scrolls into view. The final value is
// rendered up front so prerendered HTML and no-JS readers see the real number.
const NumberTicker = ({ value, prefix = '', suffix = '', className = '' }: NumberTickerProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const format = (n: number) => `${prefix}${Math.round(n).toLocaleString('en-US')}${suffix}`;

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (n) => {
        el.textContent = format(n);
      },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, value]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {format(value)}
    </span>
  );
};

export default NumberTicker;
