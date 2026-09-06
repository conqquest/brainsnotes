import { ButtonHTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export interface ButtonLProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "secondary";
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-5 text-sm", // Adjusted height slightly for better touch target
  lg: "h-12 px-8 text-base",
};

const variantClasses = {
  // Purple Gradient Solid
  default: "text-white bg-gradient-to-r from-[#7C5CFC] to-[#6A4CE0] hover:from-[#6A4CE0] hover:to-[#5839CC] shadow-md shadow-purple-200",

  // Clean Purple Outline
  outline:
    "border border-purple-200 bg-white text-[#7C5CFC] hover:border-[#7C5CFC] hover:bg-purple-50 transition-all",

  // Secondary Soft Lavender
  secondary: "bg-purple-50 text-[#7C5CFC] hover:bg-purple-100",
};

export const ButtonL = forwardRef<HTMLButtonElement, ButtonLProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={twMerge(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium rounded-xl transition-all duration-200 active:scale-95",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFC] focus-visible:ring-offset-2 ring-offset-white",
          "disabled:opacity-50 disabled:pointer-events-none",
          "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        {...props}
      />
    );
  }
);

ButtonL.displayName = "ButtonL";
