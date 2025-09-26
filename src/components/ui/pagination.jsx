import * as React from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  MoreHorizontalIcon,
} from "lucide-react";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const paginationVariants = cva(
  "inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-[4px] text-[13px] font-bold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 [&_svg]:stroke-1 outline-none focus-visible:border-[var(--ring)] focus-visible:ring-[var(--ring)]/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--accent-2)]",
        tertiary: "text-[var(--gray-2)]-foreground hover:text-[var(--primary)]",
      },
      size: {
        default: "h-8",
        icon: "size-8 [&_svg]:w-[20px] [&_svg]:h-[20px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

function Pagination({
  className,
  ...props
}) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props} />
  );
}

function PaginationContent({
  className,
  ...props
}) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-row items-center gap-1", className)}
      {...props} />
  );
}

function PaginationItem({
  ...props
}) {
  return <li data-slot="pagination-item" {...props} />;
}

function PaginationLink({
  className,
  isActive,
  variant,
  size = "icon",
  ...props
}) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(paginationVariants({
        variant: variant ?? (isActive ? "primary" : "tertiary"),
        size,
      }), className && ` border-none`)}
      {...props} />
  );
}

function PaginationStart({
  className,
  ...props
}) {
  return (
    <PaginationLink
      aria-label="Go to first page"
      size="default"
      className={cn("gap-1", className)}
      {...props}>
      <ChevronsLeftIcon />
    </PaginationLink>
  );
}

function PaginationPrevious({
  className,
  ...props
}) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn("gap-1", className)}
      {...props}>
      <ChevronLeftIcon />
    </PaginationLink>
  );
}

function PaginationNext({
  className,
  ...props
}) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn("gap-1", className)}
      {...props}>
      <ChevronRightIcon />
    </PaginationLink>
  );
}

function PaginationEnd({
  className,
  ...props
}) {
  return (
    <PaginationLink
      aria-label="Go to last page"
      size="default"
      className={cn("gap-1", className)}
      {...props}>
      <ChevronsRightIcon />
    </PaginationLink>
  );
}

function PaginationEllipsis({
  className,
  ...props
}) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}>
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationStart,
  PaginationPrevious,
  PaginationNext,
  PaginationEnd,
  PaginationEllipsis,
};
