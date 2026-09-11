import React from 'react';

interface BambooLogoProps {
  variant?: 'full' | 'compact' | 'symbol';
  theme?: 'green' | 'white' | 'deep';
  className?: string;
  showTagline?: boolean;
}

export const BambooSymbol: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-10 h-10',
  color = '#4A7C59',
}) => {
  return (
    <svg
      viewBox="0 0 100 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Bamboo Branding Icon"
    >
      {/* Left Bamboo Stalk - Top Segment */}
      <path
        d="M20 18 C20 16 38 16 38 18 L38 56 C38 58 20 58 20 56 Z"
        fill={color}
      />
      {/* Left Bamboo Stalk - Bottom Segment */}
      <path
        d="M19 62 C19 60 39 60 39 62 L39 104 C39 106 19 106 19 104 Z"
        fill={color}
      />
      {/* Node Divider Accent Left */}
      <rect x="18" y="58" width="22" height="3" rx="1.5" fill={color} />

      {/* Right Bamboo Stalk - Top Segment */}
      <path
        d="M45 12 C45 10 63 10 63 12 L63 50 C63 52 45 52 45 50 Z"
        fill={color}
      />
      {/* Right Bamboo Stalk - Bottom Segment */}
      <path
        d="M44 56 C44 54 64 54 64 56 L64 104 C64 106 44 106 44 104 Z"
        fill={color}
      />
      {/* Node Divider Accent Right */}
      <rect x="43" y="52" width="22" height="3" rx="1.5" fill={color} />

      {/* Characteristic Sprouting Leaf / Curve forming dynamic organic B */}
      <path
        d="M66 38 C75 35 83 44 80 56 C77 68 70 70 65 72 C63 72 63 68 66 65 C72 58 75 48 66 41 Z"
        fill={color}
      />
      {/* Lower subtle root/leaf curve */}
      <path
        d="M65 74 C75 75 88 84 82 98 C79 104 73 105 68 106 C72 101 77 94 74 87 C71 80 64 77 65 74 Z"
        fill={color}
      />
    </svg>
  );
};

export const BambooLogo: React.FC<BambooLogoProps> = ({
  variant = 'full',
  theme = 'green',
  className = '',
  showTagline = true,
}) => {
  const primaryColor =
    theme === 'white'
      ? '#F5EFE0'
      : theme === 'deep'
      ? '#2C4A3A'
      : '#4A7C59';

  const textColor =
    theme === 'white'
      ? 'text-[#F5EFE0]'
      : theme === 'deep'
      ? 'text-[#2C4A3A]'
      : 'text-[#3D2F1F]';

  const subTextColor =
    theme === 'white'
      ? 'text-[#B8C5B0]'
      : 'text-[#3D2F1F]/80';

  if (variant === 'symbol') {
    return (
      <div className={`inline-flex items-center ${className}`}>
        <BambooSymbol color={primaryColor} className="w-8 h-8" />
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <BambooSymbol color={primaryColor} className="w-9 h-11 shrink-0" />
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1.5 leading-none">
          <span
            className={`font-serif text-xl sm:text-2xl font-bold tracking-[0.14em] ${
              theme === 'white' ? 'text-[#F5EFE0]' : 'text-[#2C4A3A]'
            }`}
          >
            BAMBOO
          </span>
        </div>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="w-3 h-px bg-current opacity-40"></span>
          <span
            className={`text-[9px] sm:text-[10px] font-semibold tracking-[0.32em] uppercase ${textColor}`}
          >
            BRANDING
          </span>
          <span className="w-3 h-px bg-current opacity-40"></span>
        </div>
        {showTagline && (
          <span
            className={`text-[10px] sm:text-[11px] font-normal tracking-wide mt-1 ${subTextColor}`}
          >
            Đánh thức giá trị – Kiến tạo tài sản
          </span>
        )}
      </div>
    </div>
  );
};
