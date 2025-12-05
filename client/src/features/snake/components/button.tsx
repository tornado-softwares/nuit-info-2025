import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

export function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        "text-white/90 cursor-pointer text-2xl font-medium font-pixel bg-green-800/60 backdrop-blur w-full flex items-center justify-center p-2 rounded-sm",
        className
      )}
    >
      {children}
    </button>
  );
}
