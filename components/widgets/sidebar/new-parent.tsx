"use client";
import { usePathname } from "next/navigation";
import { ReactNode, useCallback, useEffect, useState } from "react";

import { SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/widgets/sidebar/app-sidebar";
import { HeaderBar } from "@/components/widgets/sidebar/header-bar";
import { items } from "@/lib/sample-data";
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
    <div className="flex h-screen w-full overflow-hidden">
      <AppSidebar
        currPage={currPage}
        items={items}
        updateCurrPage={updateCurrPage}
      />
      <div className="flex flex-1 flex-col overflow-auto">
        <main className="flex flex-1 flex-col">
          <header className="sticky top-0 z-10 my-4 flex h-16 shrink-0 items-center gap-2 rounded-xl bg-background transition-[width,height] ease-linear group-has-[data-collapsible=icon]/sidebar-wrapper:h-12 overflow-hidden">
            <div className="flex w-full items-center">
              <HeaderBar currPage={currPage} />
            </div>
          </header>
          <div className="px-4 pb-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}