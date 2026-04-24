import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:bg-slate-100 disabled:text-slate-400 disabled:border-slate-100 disabled:shadow-none",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-br from-violet-600 to-violet-700 text-white hover:from-violet-700 hover:to-violet-800 shadow-md shadow-violet-600/25 hover:shadow-lg hover:shadow-violet-600/35 active:scale-[0.98]",
        secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200",
        accent: "bg-gradient-to-br from-emerald-600 to-emerald-700 text-white hover:from-emerald-700 hover:to-emerald-800 shadow-md shadow-emerald-600/25 hover:shadow-lg",
        outline: "border-2 border-slate-200 bg-white text-slate-900 hover:bg-slate-50 hover:border-violet-300 hover:text-violet-700",
        ghost: "hover:bg-slate-100 text-slate-700",
        link: "text-violet-600 underline-offset-4 hover:underline",
        glass: "bg-white/80 backdrop-blur-sm border border-white/20 text-slate-900 hover:bg-white/90",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-lg px-4 text-xs",
        lg: "h-14 rounded-2xl px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
