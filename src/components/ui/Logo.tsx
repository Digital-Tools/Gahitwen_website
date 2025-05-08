import { SunDim } from 'lucide-react';

type LogoProps = {
  invert?: boolean;
};

const Logo = ({ invert = false }: LogoProps) => {
  const textColorClass = invert ? 'text-white' : 'text-brown-900';
  const iconColorClass = invert ? 'text-yellow-500' : 'text-yellow-500';

  return (
    <div className="flex items-center">
      <SunDim className={`mr-2 ${iconColorClass}`} size={28} />
      <span className={`font-bold text-xl ${textColorClass}`}>Gahitwen</span>
      <span className={`ml-1 text-xl ${textColorClass} opacity-80`}>LLC</span>
    </div>
  );
};

export default Logo;