// MacawIcon - Blue Macaw (Arara Azul) SVG
// Hyacinth Macaw inspired - deep blue with yellow accents

interface Props {
  size?: number;
  className?: string;
}

export default function MacawIcon({ size = 32, className = "" }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Macaw"
    >
      {/* Body - deep blue */}
      <ellipse cx="58" cy="68" rx="26" ry="34" fill="#1B4DFF" />
      {/* Belly - slightly lighter */}
      <ellipse cx="54" cy="76" rx="16" ry="24" fill="#3B6FFF" />
      {/* Chest highlight */}
      <ellipse cx="52" cy="80" rx="12" ry="18" fill="#5B8FFF" opacity="0.6" />

      {/* Head - deep blue */}
      <circle cx="55" cy="30" r="24" fill="#1B4DFF" />
      {/* Head top highlight */}
      <ellipse cx="52" cy="24" rx="14" ry="10" fill="#3B6FFF" opacity="0.5" />

      {/* White face patch */}
      <ellipse cx="42" cy="32" rx="10" ry="12" fill="#F5F5F5" />
      <ellipse cx="42" cy="30" rx="8" ry="10" fill="white" />

      {/* Yellow orbital ring */}
      <ellipse cx="48" cy="28" rx="3" ry="3" fill="#FFD700" opacity="0.8" />

      {/* Eye */}
      <circle cx="48" cy="28" r="5" fill="white" />
      <circle cx="49" cy="27" r="3" fill="#1a1a2e" />
      <circle cx="50" cy="26" r="1.2" fill="white" />

      {/* Yellow patch near beak */}
      <ellipse cx="35" cy="40" rx="4" ry="3" fill="#FFD700" opacity="0.7" />

      {/* Upper beak - dark */}
      <path d="M32 30 C24 28, 14 32, 16 40 C18 44, 24 42, 30 38 Z" fill="#2D2D2D" />
      <path d="M16 40 C18 44, 22 46, 28 44 C26 42, 24 40, 22 38 Z" fill="#1a1a1a" />
      {/* Beak highlight */}
      <path d="M28 32 C24 31, 18 34, 20 38 C22 36, 26 34, 28 32 Z" fill="#555" opacity="0.5" />
      {/* Lower beak */}
      <path d="M18 42 C20 46, 26 46, 28 44 C26 42, 22 40, 18 42 Z" fill="#2D2D2D" />

      {/* Crest feathers */}
      <path d="M40 10 C36 4, 44 2, 48 8" fill="#0F3BCC" />
      <path d="M44 8 C42 2, 50 0, 54 6" fill="#1B4DFF" />
      <path d="M48 6 C46 0, 54 -1, 58 5" fill="#0F3BCC" />

      {/* Wing - folded */}
      <path d="M38 56 C26 62, 22 76, 30 86 C36 80, 40 70, 44 62 Z" fill="#0F3BCC" />
      <path d="M36 60 C28 64, 24 74, 30 82 C34 78, 38 70, 40 64 Z" fill="#2D5FFF" />
      {/* Wing feather detail */}
      <path d="M34 64 C28 68, 26 76, 30 80" stroke="#0A2FA8" strokeWidth="1" fill="none" />
      <path d="M38 62 C32 66, 30 74, 34 78" stroke="#0A2FA8" strokeWidth="1" fill="none" />

      {/* Tail feathers */}
      <path d="M42 92 C34 102, 28 112, 34 115 C38 110, 44 100, 48 94 Z" fill="#0F3BCC" />
      <path d="M48 94 C42 104, 38 114, 44 117 C48 112, 52 102, 52 94 Z" fill="#1B4DFF" />
      <path d="M52 94 C50 104, 48 114, 54 116 C56 110, 56 102, 56 94 Z" fill="#0A2FA8" />
      <path d="M56 94 C56 104, 56 112, 62 114 C62 108, 60 102, 60 94 Z" fill="#0F3BCC" />

      {/* Feet/claws */}
      <path d="M50 98 C48 104, 44 106, 46 108" stroke="#555" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M54 98 C52 104, 48 106, 50 108" stroke="#555" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Branch */}
      <path d="M20 108 C30 106, 50 104, 80 108 C90 110, 100 106, 110 104" stroke="#8B6914" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M20 108 C30 106, 50 104, 80 108 C90 110, 100 106, 110 104" stroke="#A0782C" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* Branch leaf */}
      <ellipse cx="102" cy="100" rx="8" ry="4" fill="#228B22" transform="rotate(-20 102 100)" />
      <ellipse cx="96" cy="102" rx="6" ry="3" fill="#2EA02E" transform="rotate(-10 96 102)" />
    </svg>
  );
}
