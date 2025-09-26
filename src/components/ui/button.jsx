import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[4px] text-[13px] font-bold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 [&_svg]:stroke-1 outline-none focus-visible:border-[var(--ring)] focus-visible:ring-[var(--ring)]/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--accent-2)]",
        secondary:
          "border border-[var(--primary)] text-[var(--primary)] hover:text-[var(--accent-2)] hover:border-[var(--accent-2)]",
        tertiary:
          "border border-[var(--gray-2)] text-[var(--text-gray-3)] hover:text-[var(--primary)]",
        link: "text-[var(--primary)] underline-offset-4 hover:underline",
        icon: "bg-transparent text-[var(--primary)] hover:bg-[var(--gray-2)]/10 border border-[var(--primary)]",
      },
      size: {
        default: "h-8 px-5 py-1 has-[>svg]:px-4",
        icon: "size-8 [&_svg]:w-[20px] [&_svg]:h-[20px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props} />
  );
}

export { Button, buttonVariants };
