"use client";
import { usePathname } from "next/navigation";
import { ReactNode, useCallback, useEffect, useState } from "react";

import { AppSidebar } from "@/components/widgets/sidebar/app-sidebar";
import { HeaderBar } from "@/components/widgets/sidebar/header-bar";
import {headerClassname} from "@/lib/constant";
import { items } from "@/lib/sample-data";
import { sideBarPageProp } from "@/lib/types";
import { cn } from "@/lib/utils";

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
          <header className={cn(headerClassname)}>
            <div className="flex w-full items-center">
              <HeaderBar currPage={currPage} />
            </div>
          </header>
          <div>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}