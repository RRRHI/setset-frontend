"use client";
import { ReactNode, useCallback, useState } from "react";
import { SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/widgets/sidebar/app-sidebar";
import { HeaderBar } from "@/components/widgets/sidebar/headerBar";
import { items } from "@/lib/sampleData";
import { sideBarPageProp } from "@/lib/types";

interface NewParentProps {
  children: ReactNode;
}

export function NewParent({ children }: NewParentProps) {
  const [currPage, setCurrPage] = useState<sideBarPageProp>(items[0]);

  const updateCurrPage = useCallback((page: sideBarPageProp) => {
    setCurrPage(page);
  }, []);

  return (
    <>
      <AppSidebar updateCurrPage={updateCurrPage} items={items} />
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