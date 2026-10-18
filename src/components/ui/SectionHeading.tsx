import { ReactNode } from 'react';
import Eyebrow from './Eyebrow';

type SectionHeadingProps = {
  title: ReactNode;
  subtitle?: string | ReactNode;
  centered?: boolean;
  className?: string;
  eyebrow?: string;
  dark?: boolean;
};

const SectionHeading = ({
  title,
  subtitle,
  centered = false,
  className = '',
  eyebrow,
  dark = false,
}: SectionHeadingProps) => {
  const alignment = centered ? 'text-center items-center' : 'text-left items-start';

  return (
    <div className={`mb-12 md:mb-16 flex flex-col ${alignment} ${className}`}>
      {eyebrow && (
        <Eyebrow dark={dark} className="mb-5">
          {eyebrow}
        </Eyebrow>
      )}
      <h2
        className={`text-3xl sm:text-4xl md:text-5xl leading-[1.05] max-w-3xl ${
          dark ? 'text-white' : 'text-brown-950'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <div
          className={`mt-5 text-base sm:text-lg leading-relaxed max-w-2xl ${
            dark ? 'text-white/60' : 'text-brown-700/80'
          }`}
        >
          {subtitle}
        </div>
      )}
    </div>
  );
};

export default SectionHeading;
