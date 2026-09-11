import React from 'react';

interface ZaloIconProps {
  className?: string;
  size?: number;
  variant?: 'blue' | 'white' | 'plain';
}

export const ZaloIcon: React.FC<ZaloIconProps> = ({
  className = 'w-5 h-5',
  size,
  variant = 'blue',
}) => {
  const dimensionProps = size ? { width: size, height: size } : {};

  if (variant === 'plain') {
    return (
      <svg
        viewBox="0 0 48 48"
        fill="currentColor"
        className={className}
        {...dimensionProps}
      >
        <path d="M24 4C12.95 4 4 12.5 4 23c0 6.1 2.8 11.5 7.4 15.1-.4 2.8-1.5 6.2-3.1 8.5 3.7-.7 8.2-2.5 11.1-4.6 1.5.4 3.1.6 4.6.6 11.05 0 20-8.5 20-19S35.05 4 24 4z" />
      </svg>
    );
  }

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-xl overflow-hidden shadow-sm shrink-0 ${
        variant === 'blue'
          ? 'bg-[#0068FF] text-white'
          : 'bg-white text-[#0068FF]'
      } ${className}`}
      {...dimensionProps}
    >
      <span className="font-sans font-black tracking-tighter text-[0.65em] uppercase leading-none select-none">
        Zalo
      </span>
    </div>
  );
};
