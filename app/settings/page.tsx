"use client";
import "@/app/globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SettingSidebar } from "@/components/widgets/sidebar/setting-sidebar";
import { settingMenu } from "@/lib/sampleData";
import { SettingHeaderBar } from "@/components/widgets/sidebar/settings-header";
import {MainContent} from "@/components/widgets/setting/main-content";
import { useState, useCallback } from "react";
export default function Page() {

    const [currView, setCurrView] = useState<string>("#plans");

    const changeView = useCallback((view: string) =>
    {
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
        <MainContent changeView={changeView}/>
      </main>
    </SidebarProvider>
  );
}
