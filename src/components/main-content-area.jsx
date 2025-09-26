import { SidebarInset, useSidebar } from "@/components/ui/sidebar";

export function MainContentArea({
  children
}) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <SidebarInset
      className={`px-[45px] py-[40px] transition-all duration-200 ${
        isCollapsed ? 'ml-[3rem] w-[calc(100%-3rem)]' : 'ml-[16rem] w-[calc(100%-16rem)]'
      }`}>
      {children}
    </SidebarInset>
  );
}

export function MainContentHeader({
  children
}) {
  return <div className="flex flex-col space-y-6">{children}</div>;
}

export function MainContentBody({
  children
}) {
  return (
    <div className="pt-6 flex flex-wrap gap-x-[30px] gap-y-[24px]">
      {children}
    </div>
  );
}
