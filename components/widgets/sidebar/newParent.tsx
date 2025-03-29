"use client";
import { ReactNode, useCallback, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/widgets/sidebar/app-sidebar";
import { HeaderBar } from "@/components/widgets/sidebar/headerBar";
import { items } from "@/lib/sampleData";
import { sideBarPageProp } from "@/lib/types";

interface NewParentProps {
  children: ReactNode;
}

const getPageInfo = (
  path: string,
  items: sideBarPageProp[],
): sideBarPageProp | undefined => {
  return items.find((item) => item.url === path);
};

export function NewParent({ children }: NewParentProps) {
  const pathname = usePathname();
  useEffect(() => {
    
    const pageInfo = getPageInfo(pathname, items);
  
    if (pageInfo) {
      // setCurrSelected(pageInfo.title);
      setCurrPage(pageInfo);
    }
  }, [pathname]);
  const [currPage, setCurrPage] = useState<sideBarPageProp>(() => {
    const pageInfo = getPageInfo(pathname, items);
    return pageInfo || { title: "", url: "", icon: <></> };
  });

  
  
  const updateCurrPage = useCallback((page: sideBarPageProp) => {
    setCurrPage(page);
  }, []);

  return (
    <>
      <AppSidebar currPage={currPage} items={items} updateCurrPage={updateCurrPage} />
      <SidebarInset>
        <header className="my-4 flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[data-collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex w-full items-center">
            <HeaderBar currPage={currPage} />
          </div>
        </header>
        {children}
      </SidebarInset>
    </>
  );
}