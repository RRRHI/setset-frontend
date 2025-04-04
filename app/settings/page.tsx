"use client";
import "@/app/globals.css";

import { useCallback,useState } from "react";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { MainContent } from "@/components/widgets/settings/main-content";
import { SettingHeaderBar } from "@/components/widgets/sidebar/settings-header";
import { SettingSidebar } from "@/components/widgets/sidebar/settings-sidebar";
import { settingMenu } from "@/lib/sample-data";
export default function Page() {
  const [currView, setCurrView] = useState<string>("#plans");

  const changeView = useCallback((view: string) => {
    setCurrView(view);
  }, []);

  return (
    <SidebarProvider>
      <SettingSidebar menuItems={settingMenu} currView={currView} />
      <main className="flex flex-1 flex-col">
        <header className="my-4 flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[data-collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex w-full items-center">
            <SettingHeaderBar />
          </div>
        </header>
        <SidebarTrigger />
        <MainContent changeView={changeView} />
      </main>
    </SidebarProvider>
  );
}
