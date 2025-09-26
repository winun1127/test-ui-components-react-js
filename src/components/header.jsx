import React, { useState } from "react";
import {
  PanelRightCloseIcon,
  PanelLeftCloseIcon,
  ChevronDown,
  CircleUserRoundIcon,
} from "lucide-react";

import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

function Header({
  className,
  children,
  ...props
}) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full flex h-[60px] bg-[var(--secondary)] py-3 text-xs border-b border-[var(--secondary)]",
        className
      )}
      {...props}>
      <div className="flex h-full w-full items-center p-0">{children}</div>
    </header>
  );
}

function HeaderLogo({
  children = "E-Forest Logo here",
  className = ""
}) {
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <>
      <div className="flex items-center justify-center w-14 h-full flex-shrink-0">
        {isCollapsed ? (
          <PanelRightCloseIcon
            className="h-6 w-6 text-white cursor-pointer flex"
            onClick={toggleSidebar} />
        ) : (
          <PanelLeftCloseIcon
            className="h-6 w-6 text-white cursor-pointer flex"
            onClick={toggleSidebar} />
        )}
      </div>
      <div
        className={`font-semibold text-white text-sm sm:text-lg pl-[30px] pr-[40px] truncate ${className}`}>
        {children}
      </div>
    </>
  );
}

function HeaderSelector({
  value,
  placeholder = "Select option...",
  options = [],
  onValueChange,
  className = "",
  children,
  ...props
}) {
  if (children) {
    return (
      <div
        className={cn(
          "font-normal text-white text-sm sm:text-lg pl-[40px] pr-[30px] truncate hidden md:block",
          className
        )}
        {...props}>
        {children}
      </div>
    );
  }

  return (
    <div className={cn("pr-[30px] hidden md:block", className)} {...props}>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="text-white border-white/30 data-[placeholder]:text-white/70">
          <SelectValue placeholder={placeholder} className="text-white" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function HeaderButton({
  children = "Button",
  onClick,
  isOn = false,
  className = ""
}) {
  const [isButtonOn, setIsButtonOn] = useState(isOn);

  const handleClick = () => {
    setIsButtonOn(!isButtonOn);
    onClick?.();
  };

  return (
    <button
      className={cn(
        "w-16 sm:w-20 h-8 border rounded-[4px] cursor-pointer bg-transparent transition-colors duration-200 mr-[8px] flex-shrink-0 text-xs sm:text-sm",
        isButtonOn
          ? "border-[var(--text-warning)] text-[var(--text-warning)]"
          : "border-[var(--text-gray-3)] text-[var(--text-gray-3)]",
        className
      )}
      onClick={handleClick}>
      {children}
    </button>
  );
}

function HeaderSearch({
  placeholder = "Search...",
  value,
  onValueChange,
  onSearch,
  className = "",
  ...props
}) {
  const [searchValue, setSearchValue] = useState(value || "");

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
    onValueChange?.(newValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch?.(searchValue);
    }
  };

  const handleSearchClick = () => {
    onSearch?.(searchValue);
  };

  return (
    <div className={cn("relative mr-2", className)} {...props}>
      <Input
        value={searchValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="bg-transparent border-white/30 text-white placeholder:text-white/70 focus:border-white h-8 pr-8 text-sm w-48" />
      <button
        onClick={handleSearchClick}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors">
        <SearchIcon className="h-4 w-4" />
      </button>
    </div>
  );
}

function UserProfile({
  avatar,
  name = "홍길동",
  part = "E-Forest 전략팀",
  onClick
}) {
  return (
    <div className="flex mr-4">
      <div
        className="bg-transparent text-white pl-4 rounded-none flex items-center h-9 flex-1 select-none cursor-pointer"
        onClick={onClick}>
        <div className="flex items-center gap-2 flex-1">
          <Avatar className="w-[22px] h-[22px]">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback className="bg-white/20 text-white text-xs">
              <CircleUserRoundIcon />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-row items-center gap-1 h-9">
            <span className="text-xs font-bold text-white leading-4 truncate">
              {name} 님
            </span>
            <span
              className="text-xs font-normal text-[var(--text-gray-3)] leading-4 truncate hidden sm:inline">
              ({part})
            </span>
          </div>
          <ChevronDown className="w-4 h-4 text-white ml-1.5 flex-shrink-0" />
        </div>
      </div>
    </div>
  );
}

function HeaderIcon({
  icon: Icon,
  onClick,
  className = "",
  variant = "default"
}) {
  const baseClass = "h-[60px] flex items-center justify-center cursor-pointer mr-2.5";
  const variantClass =
    variant === "primary"
      ? "w-12 sm:w-[60px] bg-[var(--primary)]"
      : "px-1 sm:px-2.5 bg-transparent";

  return (
    <div className={`${baseClass} ${variantClass} ${className}`} onClick={onClick}>
      <Icon className="h-5 sm:h-6 w-5 sm:w-6 text-white" />
    </div>
  );
}

function HeaderActions({
  className,
  children,
  ...props
}) {
  return (
    <div className={cn("ml-auto flex items-center", className)} {...props}>
      {children}
    </div>
  );
}

export {
  Header,
  HeaderLogo,
  HeaderSelector,
  HeaderButton,
  HeaderSearch,
  UserProfile,
  HeaderIcon,
  HeaderActions,
};
