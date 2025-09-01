"use client";

import React from "react";

export default function AnimatedBorderButton({
  children,
  className = "",
  color = "#ff6700",
  strokeWidth = 3,
  duration = 3500,
  radius = 18,
  bgColor = "black", // button background
  textColor = "white", // button text color
  ...props
}) {
  const uid = Math.random().toString(36).slice(2, 9);
  const gradId = `grad-${uid}`;
  const glowId = `glow-${uid}`;

  const styleVars = {
    "--ab-duration": `${duration}ms`,
    "--ab-color": color,
    "--ab-stroke": strokeWidth,
    "--ab-radius": `${radius}px`,
    backgroundColor: bgColor, // 👈 background applied here
    color: textColor, // 👈 text color applied here
    borderRadius: `${radius}px`, // 👈 smooth rounded background
  };

  return (
    <button
      {...props}
      type={props.type || "button"}
      className={`relative inline-flex items-center justify-center px-6 py-2 select-none focus:outline-none overflow-hidden ${className}`}
      style={styleVars}
    >
      {/* SVG border */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 40"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradId} x1="0%" x2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.95" />
            <stop offset="60%" stopColor={color} stopOpacity="0.5" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.2" />
          </linearGradient>

          <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Animated border rect */}
        <rect
          className="ab-animated-stroke"
          x={strokeWidth / 2}
          y={strokeWidth / 2}
          width={100 - strokeWidth}
          height={40 - strokeWidth}
          rx={12}
          ry={12}
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={`url(#${glowId})`}
          style={{
            strokeDasharray: 160,
            strokeDashoffset: 0,
            vectorEffect: "non-scaling-stroke",
          }}
        />
      </svg>

      {/* Button text */}
      <span className="relative z-10 text-sm font-semibold">{children}</span>

      <style>{`
        .ab-animated-stroke {
          animation: ab-dash var(--ab-duration) linear infinite;
          transition: filter 200ms linear;
        }

        @keyframes ab-dash {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -320; }
        }

        button:hover .ab-animated-stroke {
          filter: drop-shadow(0px 0px 8px var(--ab-color));
        }

        button:focus {
          box-shadow: 0 0 0 4px rgba(14,165,233,0.08), 0 8px 18px rgba(0,0,0,0.35);
        }

        @media (prefers-reduced-motion: reduce) {
          .ab-animated-stroke { animation: none !important; }
        }
      `}</style>
    </button>
  );
}
