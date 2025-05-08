import { ReactNode } from 'react';
import { motion } from 'framer-motion';

type CardProps = {
  children: ReactNode;
  className?: string;
};

const Card = ({ children, className = '' }: CardProps) => {
  return (
    <motion.div
      className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {children}
    </motion.div>
  );
};

export default Card;