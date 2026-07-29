import { ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "solid" | "outline" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-body text-sm font-medium tracking-wide transition-all duration-300 ease-premium disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  solid:
    "bg-brass text-ink hover:bg-brass-light shadow-[0_10px_30px_-12px_rgba(196,163,90,0.6)] hover:-translate-y-0.5",
  outline:
    "border border-brass/50 text-ink hover:border-brass hover:bg-brass/10",
  ghost: "text-ink/80 hover:text-brass-dark",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "solid", className = "", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`${base} ${variants[variant]} ${className}`}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export default Button;
