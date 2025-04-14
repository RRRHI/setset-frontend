"use client";
import "@/app/globals.css";

import { useCallback, useState, useEffect } from "react";

import { SidebarProvider } from "@/components/ui/sidebar";
import { MainContent } from "@/components/widgets/settings/main-content";
import { SettingHeaderBar } from "@/components/widgets/sidebar/settings-header";
import { SettingSidebar } from "@/components/widgets/sidebar/settings-sidebar";
import { settingMenu } from "@/lib/sample-data";
import {headerClassname } from "@/lib/constant";

export default function Page() {
  const [hasMounted, setHasMounted] = useState(false);
  const [currView, setCurrView] = useState<string>("null");

  const changeView = useCallback((view: string) => {
    // localStorage.setItem("view", view);
    setCurrView(view);
  }, []);

  useEffect(() => {
    // const hash = localStorage.getItem("view") || "null";
    setCurrView("Profile");
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return (
    <SidebarProvider>
      <SettingSidebar menuItems={settingMenu} currView={currView} />
      <main className="flex flex-1 flex-col pt-0">
        <header className={headerClassname}>
          <div className="flex w-full items-center">
            <SettingHeaderBar currView={currView} />
          </div>
        </header>
        <MainContent changeView={changeView} />
      </main>
    </SidebarProvider>
  );
}
