import React from "react";

export default function BackgroundDoodles() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10"
      aria-hidden="true"
    >
      {/* 1) Wavy squiggle */}
      <svg
        className="absolute top-[70%] left-[8%] w-[60px] h-[18px] text-white opacity-[0.04] mix-blend-overlay"
        viewBox="0 0 160 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 30 C 22 10, 42 46, 62 28 S 102 10, 122 28 S 142 46, 158 30"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* 2) Dashed rounded square */}
      <svg
        className="absolute top-[42%] left-[32%] w-[36px] h-[36px] text-white opacity-[0.04] mix-blend-overlay"
        viewBox="0 0 88 88"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="4"
          y="4"
          width="80"
          height="80"
          rx="12"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="4 6"
        />
      </svg>

      {/* 3) Quarter arc */}
      <svg
        className="absolute top-[12%] right-[18%] w-[50px] h-[50px] text-white opacity-[0.04] mix-blend-overlay"
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 140 A120 120 0 0 0 140 20"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      {/* 4) Overlapping squares */}
      <svg
        className="absolute bottom-[22%] right-[12%] w-[40px] h-[40px] text-white opacity-[0.04] mix-blend-overlay"
        viewBox="0 0 96 96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="10"
          y="18"
          width="42"
          height="42"
          rx="6"
          stroke="currentColor"
          strokeWidth="2"
        />
        <rect
          x="34"
          y="36"
          width="42"
          height="42"
          rx="6"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>

      {/* 5) Step chevrons */}
      <svg
        className="absolute top-[22%] right-[42%] w-[36px] h-[24px] text-white opacity-[0.04] mix-blend-overlay"
        viewBox="0 0 84 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M10 30 L26 14 M10 30 L26 46" stroke="currentColor" strokeWidth="2" />
        <path d="M34 30 L50 14 M34 30 L50 46" stroke="currentColor" strokeWidth="2" />
      </svg>

      

      {/* 6) Dotted grid */}
      <svg
        className="absolute bottom-[12%] left-[12%] w-[70px] h-[70px] text-white opacity-[0.03] mix-blend-overlay"
        viewBox="0 0 120 120"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="dots"
            x="0"
            y="0"
            width="12"
            height="12"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1.5" cy="1.5" r="1.5" fill="currentColor" opacity="0.25" />
          </pattern>
        </defs>
        <rect width="120" height="120" fill="url(#dots)" />
      </svg>
    </div>
  );
}
