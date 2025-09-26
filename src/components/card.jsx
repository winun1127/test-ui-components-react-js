import { Progress } from "@/components/ui/progress";

export function Card({
  title = "Title",
  currentValue = 80,
  targetValue = 50,
  unit = "%",
  targetLabel = "목표",
  showStatusIndicator = true,
  showProgressBar = true,
  statusMode = "difference",
  positiveColor = "text-blue-600",
  negativeColor = "text-red-500",
  progressColor = "[&>div]:bg-[var(--primary)]",
  formatValue,
  formatTargetValue,
  className = "",
  "aria-label": ariaLabel,
  role = "button"
}) {
  const safeTargetValue = targetValue || 1;
  const progressPercentage = (currentValue / safeTargetValue) * 100;
  const difference = currentValue - safeTargetValue;

  const getStatusText = () => {
    if (statusMode === "percentage") {
      const percentage = ((currentValue / safeTargetValue) * 100).toFixed(1);
      return `${percentage}%`;
    }
    return difference >= 0
      ? `+${difference.toFixed(1)}${unit}`
      : `${difference.toFixed(1)}${unit}`;
  };

  const statusText = getStatusText();
  const isPositive = difference >= 0;

  const displayCurrentValue = formatValue
    ? formatValue(currentValue)
    : currentValue;
  const displayTargetValue = formatTargetValue
    ? formatTargetValue(safeTargetValue)
    : safeTargetValue;

  return (
    <div
      className={`min-w-[240px] min-h-[120px] border border-gray-300 rounded-[4px] ${className}`}
      aria-label={ariaLabel}>
      <div
        className="px-[14px] py-[14px] relative h-[85px] flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <h2
            className="text-sm sm:text-base font-bold text-gray-800 truncate flex-1 pr-2">
            {title}
          </h2>
        </div>
        <div className="flex justify-between items-end">
          {showStatusIndicator && (
            <div
              className={`text-xs sm:text-sm flex items-center gap-1 ${
                isPositive ? positiveColor : negativeColor
              }`}>
              <span className="inline-block">
                {isPositive ? (
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor">
                    <path d="M4 0 L8 8 L0 8 Z" />
                  </svg>
                ) : (
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor">
                    <path d="M4 8 L0 0 L8 0 Z" />
                  </svg>
                )}
              </span>
              {statusText}
            </div>
          )}
          <div className="flex items-end">
            <span className="text-2xl sm:text-4xl font-bold text-gray-800 leading-none">
              {displayCurrentValue}
            </span>
            <span className="text-lg sm:text-2xl text-gray-800 leading-none ml-1">
              {unit}
            </span>
          </div>
        </div>
      </div>
      <div className="h-[35px] border-t border-gray-300 relative">
        <div className="text-xs text-gray-500 text-right px-[14px] py-[2px]">
          {targetLabel} {displayTargetValue}
          {unit}
        </div>
        {showProgressBar && (
          <div className="w-full absolute bottom-0">
            <Progress
              value={progressPercentage}
              className={`${progressColor} h-[10px] rounded-none`} />
          </div>
        )}
      </div>
    </div>
  );
}
