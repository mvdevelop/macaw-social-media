// MacawIcon - SVG replacement for the 🦜 emoji
// Simple, lightweight, works everywhere (no emoji rendering issues)

interface Props {
  size?: number;
  className?: string;
}

export default function MacawIcon({ size = 32, className = "" }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Macaw"
    >
      {/* Body */}
      <ellipse cx="50" cy="58" rx="22" ry="28" fill="#0052FF" />
      {/* Belly */}
      <ellipse cx="50" cy="62" rx="14" ry="20" fill="#FFD700" />
      {/* Head */}
      <circle cx="50" cy="28" r="20" fill="#0052FF" />
      {/* Eye white */}
      <circle cx="55" cy="24" r="7" fill="white" />
      {/* Eye pupil */}
      <circle cx="57" cy="23" r="4" fill="#1a1a2e" />
      {/* Eye highlight */}
      <circle cx="58" cy="21" r="1.5" fill="white" />
      {/* Beak upper */}
      <path d="M42 30 C36 28, 28 32, 30 38 C32 36, 38 34, 42 32 Z" fill="#FF8C00" />
      {/* Beak lower */}
      <path d="M30 38 C32 42, 36 40, 38 38 C36 37, 33 36, 30 38 Z" fill="#E07000" />
      {/* Crest/head feathers */}
      <path d="M36 14 C34 8, 38 4, 42 10" fill="#FF4444" />
      <path d="M42 10 C40 4, 44 2, 48 8" fill="#FF6666" />
      <path d="M48 8 C46 2, 50 0, 54 6" fill="#FF4444" />
      {/* Wing */}
      <path d="M32 50 C24 54, 20 64, 28 72 C32 68, 34 60, 36 56 Z" fill="#003BB5" />
      {/* Tail feathers */}
      <path d="M35 80 C28 88, 24 96, 30 98 C34 94, 38 86, 40 82 Z" fill="#FF4444" />
      <path d="M40 82 C36 90, 34 98, 40 100 C44 96, 46 88, 44 82 Z" fill="#FFD700" />
      <path d="M44 82 C42 90, 42 98, 48 100 C50 96, 50 88, 48 82 Z" fill="#00CC44" />
    </svg>
  );
}
