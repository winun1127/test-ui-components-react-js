import * as React from "react";
import {
  ChevronDown,
  ChevronUp,
  Dot,
  SquareMinusIcon,
  SquarePlusIcon,
  ClockIcon,
  ListIcon,
  StarIcon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const defaultNavigationData = [
  {
    title: "Depth 1",
    url: "#",
    isActive: true,
    items: [
      {
        title: "Depth 2",
        url: "#",
        items: [
          {
            title: "Depth 3",
            url: "#",
            items: [
              {
                title: "Depth 4 - Item 1",
                url: "#",
              },
              {
                title: "Depth 4 - Item 2",
                url: "#",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Depth 1",
    url: "#",
    isActive: true,
    items: [
      {
        title: "Depth 2",
        url: "#",
        items: [
          {
            title: "Depth 3",
            url: "#",
            items: [
              {
                title: "Depth 4 - Item 1",
                url: "#",
              },
              {
                title: "Depth 4 - Item 2",
                url: "#",
              },
            ],
          },
        ],
      },
    ],
  },
];

const defaultCollapsedMenuData = [
  {
    title: "가동",
    url: "#",
    isActive: true,
  },
  {
    title: "품질",
    url: "#",
    isActive: false,
  },
  {
    title: "운영",
    url: "#",
    isActive: false,
  },
];

const defaultQuickMenuTabs = [
  {
    value: "tab1",
    label: "즐겨찾기",
    icon: StarIcon,
  },
  {
    value: "tab2",
    label: "최근메뉴",
    icon: ClockIcon,
  },
  {
    value: "tab3",
    label: "전체메뉴",
    icon: ListIcon,
  },
];

const defaultFooterButtons = [
  {
    text: "New E-Forest Tutorial",
    variant: "primary",
    fullWidth: true,
  },
  {
    text: "Manual",
    variant: "secondary",
  },
  {
    text: "Sitemap",
    variant: "secondary",
  },
];

function QuickMenu({
  tabs = defaultQuickMenuTabs,
  defaultValue = "tab1",
  onTabChange
}) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Tabs
      defaultValue={defaultValue}
      onValueChange={onTabChange}
      className="w-full h-full">
      <TabsList
        className={`w-full h-full p-0 bg-transparent rounded-none flex ${
          isCollapsed ? "flex-col" : "flex-row"
        }`}>
        {tabs.map((tab, index) => {
          const Icon = tab.icon;
          const isLast = index === tabs.length - 1;

          return (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className={`py-[14px] px-[10px] text-xs font-normal text-gray-800 bg-transparent border-none rounded-none transition-all duration-200 flex-1 flex items-center justify-center gap-[2px] ${
                isCollapsed
                  ? "border-b border-gray-400 w-full data-[state=active]:shadow-none focus-visible:ring-0"
                  : `${isLast ? "h-12 w-[88px] border-r-0" : "border-r-2 border-gray-400 h-12 w-[87px]"}`
              } data-[state=active]:font-bold data-[state=active]:text-[var(--secondary)] ${
                !isCollapsed
                  ? "data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  : "data-[state=active]:bg-[var(--sidebar)]"
              } hover:bg-blue-100 hover:text-blue-600 ${
                !isCollapsed &&
                "[&:not([data-state=active])]:text-[var(--lnb-tab-inactive-text)] [&:not([data-state=active])]:bg-[var(--lnb-tab-inactive-bg)] [&:not([data-state=active])]:border-b-2 [&:not([data-state=active])]:border-gray-400"
              }`}>
              <Icon className="w-[14px] h-[14px]" />
              {tab.label}
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
}

const NavigationItem = ({
  item,
  depth,
  isCollapsed,
  selectedItems = new Set(),
  onItemClick,
  onItemToggle,
}) => {
  const [isOpen, setIsOpen] = React.useState(depth <= 3 ? true : false);
  const itemId = `${item.title}-${depth}`;

  const handleToggle = () => {
    if (item.items && item.items.length > 0) {
      const newIsOpen = !isOpen;
      setIsOpen(newIsOpen);
      onItemToggle?.(item, depth, newIsOpen);
    }
  };

  const handleSelect = () => {
    onItemClick?.(item, depth);
  };

  const isSelected = selectedItems.has(itemId) || item.isActive;

  const getDepthStyles = () => {
    if (isCollapsed && depth === 1) {
      return isSelected
        ? "w-14 h-[52px] bg-white text-blue-600 font-bold rounded mx-auto my-0.5 flex items-center justify-center text-center p-0"
        : "w-14 h-12 text-xs font-normal text-white flex items-center justify-center text-center p-0 bg-transparent";
    }

    switch (depth) {
      case 1:
        return "text-sm font-bold text-gray-800 h-[38px] py-[10px] justify-start";
      case 2:
        return "text-sm font-bold text-gray-800 h-7 py-[6px] justify-start";
      case 3:
        return "text-sm font-bold text-gray-800 h-7 py-[6px] ml-[10px] justify-start";
      case 4:
        return `text-xs font-normal text-gray-800 h-6 py-1 ml-[20px] ${
          isSelected ? "font-bold text-blue-600" : ""
        }`;
      default:
        return "";
    }
  };

  const getBorderStyles = () => {
    if (isCollapsed && depth === 1) {
      return "border-t border-[var(--lnb-border-collapsed-top)] border-b border-[var(--lnb-border-collapsed-bottom)] w-full flex justify-center first:border-t-0";
    }

    switch (depth) {
      case 1:
        return "relative border-t border-[var(--border)]-blue-2 border-b border-[var(--border)]-blue-2 first:border-t-0 first:border-b-border-blue-2 last:border-b-border-blue-2";
      case 4:
        return "relative last:mb-4";
      default:
        return "relative";
    }
  };

  return (
    <li className={getBorderStyles()}>
      <a
        href={item.url}
        className={`flex items-center no-underline text-gray-800 transition-all duration-200 relative hover:bg-transparent ${getDepthStyles()}`}
        onClick={(e) => {
          if (item.items && item.items.length > 0 && !isCollapsed) {
            e.preventDefault();
            handleToggle();
          } else if (depth === 4) {
            e.preventDefault();
            handleSelect();
          } else if (depth === 1 && isCollapsed) {
            e.preventDefault();
            handleSelect();
          }
        }}>
        {/* Left side icons for depth 2, 3, 4 */}
        {(depth === 2 || depth === 3) &&
          (item.items && item.items.length > 0 ? (
            isOpen ? (
              <SquareMinusIcon className="mr-[2px] flex-shrink-0 w-3 h-3 text-blue-600" />
            ) : (
              <SquarePlusIcon className="mr-[2px] flex-shrink-0 w-3 h-3 text-blue-600" />
            )
          ) : null)}
        {depth === 4 && <Dot className="mr-[2px] flex-shrink-0 w-4 h-4" />}

        {/* Hide icons when collapsed */}
        {isCollapsed && depth === 1 ? null : (
          <>
            <span>{item.title}</span>
            {item.badge && (
              <span
                className="bg-red-500 text-white text-xs py-0.5 px-1.5 rounded-full ml-2 min-w-4 text-center leading-tight">
                {item.badge}
              </span>
            )}
          </>
        )}

        {/* Show only title for collapsed state */}
        {isCollapsed && depth === 1 && <span>{item.title}</span>}

        {/* Right side icons for depth 1 */}
        {depth === 1 &&
          item.items &&
          item.items.length > 0 &&
          !isCollapsed &&
          (isOpen ? (
            <ChevronUp
              className="w-4 h-4 ml-auto transition-transform duration-200 cursor-pointer" />
          ) : (
            <ChevronDown
              className="w-4 h-4 ml-auto transition-transform duration-200 cursor-pointer" />
          ))}
      </a>
      {item.items && item.items.length > 0 && !isCollapsed && (
        <ul
          className={`list-none m-0 p-0 max-h-0 overflow-hidden transition-[max-height] duration-300 bg-transparent ${
            isOpen ? "max-h-[1000px]" : ""
          }`}>
          {item.items.map((subItem, index) => (
            <NavigationItem
              key={`${subItem.title}-${index}`}
              item={subItem}
              depth={depth + 1}
              isCollapsed={isCollapsed}
              selectedItems={selectedItems}
              onItemClick={onItemClick}
              onItemToggle={onItemToggle} />
          ))}
        </ul>
      )}
    </li>
  );
};

export function LeftNavigationBar({
  navigationData = defaultNavigationData,
  collapsedNavigationData = defaultCollapsedMenuData,
  quickMenuTabs = defaultQuickMenuTabs,
  footerButtons = defaultFooterButtons,
  defaultSelectedItem = "가동",
  defaultQuickMenuTab = "tab1",
  onNavigationClick,
  onQuickMenuTabChange,
  onFooterButtonClick,
  ...props
}) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const [selectedItems, setSelectedItems] = React.useState(new Set([defaultSelectedItem]));

  return (
    <Sidebar
      className={`bg-[var(--sidebar)] border-r border-[var(--border)]-blue-3 top-[60px] h-[calc(100vh-60px)] shadow-[2px_0_12px_rgba(62,71,134,0.2)] ${
        isCollapsed ? "w-14" : ""
      }`}
      collapsible="icon"
      {...props}>
      <SidebarHeader className={`p-0 ${isCollapsed ? "hidden" : ""}`}>
        <QuickMenu
          tabs={quickMenuTabs}
          defaultValue={defaultQuickMenuTab}
          onTabChange={onQuickMenuTabChange} />
      </SidebarHeader>
      <SidebarContent
        className={`p-0 bg-transparent ${
          isCollapsed
            ? "bg-gradient-to-b from-[var(--lnb-collapsed-gradient-start)] to-[var(--lnb-collapsed-gradient-end)] w-14 flex flex-col"
            : ""
        }`}>
        <nav
          className={`flex-1 mt-4 px-5 ${
            isCollapsed ? "p-0 m-0 flex flex-col items-center" : ""
          }`}>
          <ul className="list-none m-0 p-0">
            {(isCollapsed ? collapsedNavigationData : navigationData).map((item, index) => (
              <NavigationItem
                key={`${item.title}-${index}`}
                item={item}
                depth={1}
                isCollapsed={isCollapsed}
                selectedItems={selectedItems}
                onItemClick={(clickedItem, depth) => {
                  const itemId = `${clickedItem.title}-${depth}`;
                  const newSelectedItems = new Set(selectedItems);

                  if (selectedItems.has(itemId)) {
                    newSelectedItems.delete(itemId);
                  } else {
                    newSelectedItems.add(itemId);
                  }

                  setSelectedItems(newSelectedItems);
                  onNavigationClick?.(clickedItem, depth);
                }}
                onItemToggle={(item, depth, isOpen) => {
                  // Handle toggle logic if needed
                }} />
            ))}
          </ul>
        </nav>
      </SidebarContent>
      <SidebarFooter className={isCollapsed ? "hidden" : ""}>
        <div className="px-5 pb-[30px] flex flex-col gap-[10px]">
          {footerButtons
            .reduce((acc, button, index) => {
              if (button.fullWidth) {
                acc.push([
                  <button
                    key={index}
                    className={`flex-1 py-3 px-4 h-10 font-bold border border-[var(--border)]-blue-3 rounded cursor-pointer transition-all duration-200 flex items-center justify-center hover:bg-blue-100 hover:border-blue-600 hover:text-blue-600 ${
                      button.variant === "primary"
                        ? "bg-[var(--lnb-footer-bg)] text-[var(--secondary)]"
                        : "bg-white text-gray-800 text-sm"
                    }`}
                    onClick={() => {
                      button.onClick?.();
                      onFooterButtonClick?.(button, index);
                    }}>
                    {button.text}
                  </button>,
                ]);
              } else {
                const lastGroup = acc[acc.length - 1];
                if (
                  lastGroup &&
                  lastGroup.length === 1 &&
                  !footerButtons[index - 1]?.fullWidth
                ) {
                  lastGroup.push(<button
                    key={index}
                    className={`flex-1 py-3 px-4 h-10 border border-[var(--border)]-blue-3 rounded cursor-pointer transition-all duration-200 flex items-center justify-center hover:bg-blue-100 hover:border-blue-600 hover:text-blue-600 ${
                      button.variant === "primary"
                        ? "bg-[var(--lnb-footer-bg)] text-[var(--secondary)] font-bold"
                        : "bg-white text-gray-800 text-sm"
                    }`}
                    onClick={() => {
                      button.onClick?.();
                      onFooterButtonClick?.(button, index);
                    }}>
                    {button.text}
                  </button>);
                } else {
                  acc.push([
                    <button
                      key={index}
                      className={`flex-1 py-3 px-4 h-10 border border-[var(--border)]-blue-3 rounded cursor-pointer transition-all duration-200 flex items-center justify-center hover:bg-blue-100 hover:border-blue-600 hover:text-blue-600 ${
                        button.variant === "primary"
                          ? "bg-[var(--lnb-footer-bg)] text-[var(--secondary)] font-bold"
                          : "bg-white text-gray-800 text-sm"
                      }`}
                      onClick={() => {
                        button.onClick?.();
                        onFooterButtonClick?.(button, index);
                      }}>
                      {button.text}
                    </button>,
                  ]);
                }
              }
              return acc;
            }, [])
            .map((group, groupIndex) => (
              <div key={groupIndex} className="flex gap-[5px]">
                {group}
              </div>
            ))}
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
