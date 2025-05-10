import React, { ReactNode, MouseEventHandler } from "react";
import clsx from "clsx";
import { ArrowRight } from "lucide-react"; 

const baseStyles =
  "inline-flex items-center justify-center font-medium rounded-2xl transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

const variants: Record<string, string> = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
  secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-300",
  danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  ghost: "bg-transparent text-gray-900 hover:bg-gray-100 focus:ring-gray-300",
};

const sizes: Record<string, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-5 py-2.5 text-lg",
};

interface ButtonProps {
  children: ReactNode;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  withArrow?: boolean;
  arrowPosition?: "left" | "right";
  className?: string;
  type?: "button" | "submit" | "reset";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  onClick,
  leftIcon,
  rightIcon,
  withArrow = false,
  arrowPosition = "right", // or "left"
  className,
  type = "button",
}) => {
  const arrow = <ArrowRight className="w-4 h-4" />;

  return (
    <button
      type={type}
      className={clsx(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {(leftIcon || (withArrow && arrowPosition === "left")) && (
        <span className="mr-2">
          {leftIcon || arrow}
        </span>
      )}
      {children}
      {(rightIcon || (withArrow && arrowPosition === "right")) && (
        <span className="ml-2">
          {rightIcon || arrow}
        </span>
      )}
    </button>
  );
};
