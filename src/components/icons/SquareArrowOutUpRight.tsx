import React from 'react';

const SquareArrow: React.FC<{ size?: number; color?: string; className?: string }> = ({
                                                                                          size = 24,
                                                                                          color = 'currentColor',
                                                                                          className = '',
                                                                                      }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`lucide lucide-square-arrow-out-up-right ${className}`}
        >
            <path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" />
            <path d="m21 3-9 9" />
            <path d="M15 3h6v6" />
        </svg>
    );
};

export default SquareArrow;