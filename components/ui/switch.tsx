"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full",
      "bg-gradient-to-b from-zinc-400 via-zinc-500 to-zinc-600",
      "transition-all duration-200 ease-in-out",
      "focus-visible:outline-none focus-visible:ring-2",
      "focus-visible:ring-accent focus-visible:ring-offset-2",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:from-accent data-[state=checked]:via-accent/90 data-[state=checked]:to-accent/80",
      "shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)] border border-black/20",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-4 w-4 rounded-full",
        "bg-gradient-to-b from-zinc-100 via-zinc-200 to-zinc-300",
        "shadow-[0_2px_4px_rgba(0,0,0,0.2)] ring-0 border border-zinc-400/30",
        "transition-transform duration-200 ease-in-out",
        "data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
        "data-[state=checked]:from-white data-[state=checked]:via-zinc-50 data-[state=checked]:to-zinc-100"
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
