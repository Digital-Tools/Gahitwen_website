import { SunDim } from 'lucide-react';

type LogoProps = {
  invert?: boolean;
};

const Logo = ({ invert = false }: LogoProps) => {
  const textColorClass = invert ? 'text-white' : 'text-brown-950';

  return (
    <div className="flex items-center gap-2.5">
      <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-yellow-500 text-brown-950 shadow-[inset_0_1px_0_rgb(255_255_255/0.5)]">
        <SunDim size={20} strokeWidth={2.25} />
      </span>
      <span className={`text-[1.0625rem] font-semibold tracking-[-0.03em] ${textColorClass}`}>
        The Gahitwen
        <span className={`ml-1.5 font-mono text-[0.625rem] font-medium uppercase tracking-[0.12em] align-middle ${invert ? 'text-white/50' : 'text-brown-500'}`}>
          LLC
        </span>
      </span>
    </div>
  );
};

export default Logo;
