import React from "react";
import { Star, Info, SquareArrowOutUpRightIcon } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

const defaultBreadcrumbs = [
  { label: "1 depth" },
  { label: "2 depth" },
  { label: "3 depth" },
];

export const TitleNavigator = ({
  title = "Title here",
  titleDepth = 1,
  breadcrumbs = defaultBreadcrumbs,
  currentPage = "현재 페이지명",
  showStar = true,
  showInfo = true,
  showExternalLink = true,
  starColor = "text-yellow-400",
  onBreadcrumbClick,
  onInfoClick,
  onExternalLinkClick,
}) => {
  return (
    <div className="w-full flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 py-2 border-b border-gray-200 transition-[width] duration-200 ease-linear">
      <div className="flex justify-start items-center">
        <div
          className={`flex items-center ${
            titleDepth === 1
              ? "h-6 gap-1"
              : titleDepth === 2
              ? "h-5 gap-1"
              : "h-[18px] gap-1"
          }`}
        >
          {titleDepth === 1 && (
            <>
              {showStar && (
                <Star className={`w-4 h-4 ${starColor} flex-shrink-0`} />
              )}
              <span className="text-base sm:text-lg font-bold text-gray-800 truncate">
                {title}
              </span>
              {showInfo && (
                <Info
                  className="w-4 h-4 flex-shrink-0 cursor-pointer hover:text-blue-600 transition-colors"
                  onClick={onInfoClick}
                />
              )}
            </>
          )}
          {titleDepth === 2 && (
            <>
              <span className="text-sm sm:text-base font-bold text-gray-800 truncate">
                {title}
              </span>
              {showInfo && (
                <Info
                  className="w-4 h-4 flex-shrink-0 cursor-pointer hover:text-blue-600 transition-colors"
                  onClick={onInfoClick}
                />
              )}
            </>
          )}
          {titleDepth === 3 && (
            <span className="text-xs sm:text-sm font-bold text-gray-800 truncate">
              {title}
            </span>
          )}
        </div>
      </div>
      <div className="flex justify-start sm:justify-end items-center overflow-hidden">
        <Breadcrumb>
          <BreadcrumbList className="text-[var(--text-gray-3)] flex items-center gap-1 text-xs sm:text-sm overflow-hidden">
            {breadcrumbs.map((item, index) => (
              <React.Fragment key={index}>
                <BreadcrumbItem className="flex-shrink-0">
                  <BreadcrumbLink
                    className="text-xs sm:text-sm text-gray-600 hover:text-[var(--foreground)] transition-colors whitespace-nowrap cursor-pointer"
                    onClick={(e) => {
                      if (onBreadcrumbClick) {
                        e.preventDefault();
                        onBreadcrumbClick(item, index);
                      }
                    }}
                    href={item.href}
                  >
                    {item.label}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="flex-shrink-0" />
              </React.Fragment>
            ))}
            <BreadcrumbItem className="flex-shrink-0">
              <BreadcrumbPage className="text-xs sm:text-sm font-medium text-gray-800 mr-2 sm:mr-[10px] whitespace-nowrap">
                {currentPage}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        {showExternalLink && (
          <SquareArrowOutUpRightIcon
            className="w-[14px] sm:w-4 h-[14px] sm:h-4 flex-shrink-0 cursor-pointer hover:text-blue-600 transition-colors"
            onClick={onExternalLinkClick}
          />
        )}
      </div>
    </div>
  );
};

export default TitleNavigator;
