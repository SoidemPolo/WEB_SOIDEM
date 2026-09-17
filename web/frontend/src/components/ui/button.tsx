import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/** Variantes calcadas de los botones de la web actual (.btn, .btn-g, .btn-w). */
const buttonVariants = cva(
  "inline-flex items-center gap-2 rounded-lg font-semibold transition-[background,transform,border-color] duration-200 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-teal text-white hover:bg-teal-dark hover:-translate-y-px",
        ghost:
          "border-[1.5px] border-line bg-transparent text-ink hover:border-ink",
        white: "bg-white text-deep hover:bg-[#e8f2f4]",
      },
      size: {
        default: "px-[30px] py-[15px] text-[16.5px]",
        sm: "px-5 py-2.5 text-[15px]",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
