import React from "react";
import { Lock } from "lucide-react";
import { cn } from "../../lib/utils";

interface PremiumSectionProps {
  hasPaid: boolean;
  title: string;
  dark?: boolean;
  children: React.ReactNode;
}

export const PremiumSection: React.FC<PremiumSectionProps> = ({
  hasPaid,
  title,
  dark,
  children,
}) => {
  return (
    <div className="relative mb-8">
      {!hasPaid && (
        <div
          className={cn(
            "absolute inset-0 z-10 flex flex-col items-center justify-center backdrop-blur-[2px] border-y border-dashed",
            dark
              ? "border-green-500/30 bg-black/50"
              : "border-gray-300 bg-white/70",
          )}
        >
          <Lock
            size={18}
            className={cn("mb-1", dark ? "text-green-500" : "text-gray-400")}
          />
          <span
            className={cn(
              "font-bold uppercase tracking-widest text-[11px]",
              dark ? "text-green-600" : "text-gray-400",
            )}
          >
            {title}
          </span>
        </div>
      )}
      <div
        className={cn(
          hasPaid
            ? ""
            : "opacity-20 blur-[3px] select-none pointer-events-none",
        )}
      >
        {children}
      </div>
    </div>
  );
};
