import { ReactElement } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
  variant: "primary" | "secondary";
  text: string;
  startIcon?: ReactElement;
  onClick?: () => void | Promise<void>;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}

const variantClasses = {
  primary: "bg-[#111111] text-white hover:bg-[#635BFF] shadow-md focus:ring-[#635BFF] font-extrabold",
  secondary: "bg-white text-[#111111] border border-amber-900/15 hover:bg-amber-100/60 font-bold",
};

const defaultStyles =
  "px-5 py-2.5 rounded-full text-sm flex items-center justify-center gap-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95";

export function Button({
  variant,
  text,
  startIcon,
  onClick,
  loading = false,
  fullWidth = false,
  className,
}: ButtonProps) {
  const fullWidthClass = fullWidth ? "w-full" : "";

  return (
    <button
      type="button"
      onClick={loading ? undefined : onClick}
      disabled={loading}
      aria-busy={loading}
      className={twMerge(
        variantClasses[variant],
        defaultStyles,
        fullWidthClass,
        className
      )}
    >
      {loading ? (
        <Spinner />
      ) : (
        <>
          {startIcon}
          <span>{text}</span>
        </>
      )}
    </button>
  );
}

// Minimal spinner using Tailwind
function Spinner() {
  return (
    <svg
      className="animate-spin h-5 w-5 text-current"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}
