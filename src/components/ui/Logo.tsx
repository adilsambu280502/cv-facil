import React from "react";

interface LogoProps {
  className?: string;
  size?: number; // base size for height/width
}

export const Logo: React.FC<LogoProps> = ({ className = "", size = 44 }) => {
  return (
    <div className={`flex items-center select-none ${className}`} style={{ height: size }}>
      <svg
        className="h-full w-auto"
        viewBox="50 330 880 270"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          {/* Folha A4 da Frente (Sky Blue) */}
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M158.19,550.05c-6.04-47.49-25.24-92.55-55.66-129.96c39.98-29.99,85.97-50.99,134.82-61.55c4.26,6.87,8.3,13.86,12.11,20.96c-36.66,2.57-72.81,10.85-107.05,24.6l-6.65,2.67l2.93,6.54C157.86,456.14,164.55,503.77,158.19,550.05"
            className="fill-[#5EA2E5] dark:fill-[#60A5FA]"
          />
          {/* Folha A4 de Trás (Royal Blue) */}
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M148.94,545.66C130.6,503.8,101.35,467.37,64,440.34c30.85-39.32,69.84-71.5,114.3-94.34c5.45,5.11,10.74,10.38,15.87,15.78c-34.65,12.02-67.32,29.36-96.78,51.47l-7.12,5.34l5.61,6.9C124.13,460.22,142.36,501.77,148.94,545.66"
            className="fill-[#4163E6] dark:fill-[#3B82F6]"
          />
        </g>

        {/* Texto "CV" (Extra Bold / Black) */}
        <text
          x="176.9707"
          y="532.7979"
          className="font-black fill-[#191D2D] dark:fill-white font-sans"
          fontSize="179.7235"
          letterSpacing="-8"
        >
          CV
        </text>

        {/* Texto "FÁCIL" (Light / Thin) */}
        <text
          x="436.7285"
          y="532.7979"
          className="font-light fill-[#191D2D] dark:fill-white font-sans"
          fontSize="179.7235"
        >
          FÁCIL
        </text>

        {/* Slogan "CURRÍCULOS QUE ABREM PORTAS" (Cinza Metálico / Elegante) */}
        <text
          x="192.7256"
          y="584.7422"
          className="font-medium fill-[#4D5668] dark:fill-slate-400 font-sans uppercase"
          fontSize="31.9691"
          letterSpacing="7"
        >
          CURRÍCULOS QUE ABREM PORTAS
        </text>
      </svg>
    </div>
  );
};
