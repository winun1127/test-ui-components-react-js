import * as React from "react";
import { PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

export function FloatingActionButton({
  className,
  icon: Icon = PlusIcon,
  children,
}) {
  const [isHovered, setIsHovered] = React.useState(false);

  // Convert children to array and filter out non-Button elements
  const childButtons = React.Children.toArray(children).filter(
    (child) =>
      React.isValidElement(child) &&
      typeof child.type === "function" &&
      child.type.name === "Button"
  );

  return (
    <div
      className={cn("fixed bottom-6 right-6 z-50", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Sub-items container */}
      {childButtons.length > 0 && (
        <div
          className={cn(
            "absolute bottom-[72px] right-1 flex flex-col gap-3 transition-all duration-300 ease-in-out",
            isHovered
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 translate-y-4 pointer-events-none"
          )}
        >
          {childButtons.map((child, index) => (
            <div
              key={index}
              className={cn(
                "flex items-center justify-end transition-all duration-300 ease-in-out",
                isHovered
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-4"
              )}
              style={{
                transitionDelay: isHovered
                  ? `${index * 50}ms`
                  : `${(childButtons.length - index - 1) * 50}ms`,
              }}
            >
              {/* Sub-item button with tooltip */}
              <Tooltip>
                <TooltipTrigger asChild>
                  {React.cloneElement(child, {
                    ...child.props,
                    variant: child.props.variant || "tertiary",
                    className: cn(
                      "w-12 h-12 rounded-full shadow-lg transition-all duration-200 ease-in-out hover:scale-110 focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-2 focus:outline-hidden flex items-center justify-center",
                      child.props.className
                    ),
                  })}
                </TooltipTrigger>
                <TooltipContent side="left">
                  {child.props.children || child.props.title || "Action"}
                </TooltipContent>
              </Tooltip>
            </div>
          ))}
        </div>
      )}
      {/* Main floating button */}
      <Button
        className={cn(
          "w-14 h-14 rounded-full shadow-lg transition-all duration-300 ease-in-out hover:scale-110 focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-2 focus:outline-hidden flex items-center justify-center"
        )}
      >
        <Icon className="w-6 h-6" />
      </Button>
    </div>
  );
}
