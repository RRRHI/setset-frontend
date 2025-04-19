"use client";
import "@/app/globals.css";

import { useCallback, useEffect,useState } from "react";

import { SidebarProvider } from "@/components/ui/sidebar";
import { MainContent } from "@/components/widgets/settings/main-content";
import { SettingHeaderBar } from "@/components/widgets/sidebar/settings-header";
import { SettingSidebar } from "@/components/widgets/sidebar/settings-sidebar";
import {headerClassname } from "@/lib/constant";
import { settingMenu } from "@/lib/sample-data";
import { cn } from "@/lib/utils";

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
    <SidebarProvider className="flex h-screen w-full">
  <SettingSidebar menuItems={settingMenu} currView={currView} />

  <main className="flex flex-1 flex-col overflow-hidden">
    <header className={cn(headerClassname, "shrink-0")}>
      <div className="flex w-full items-center">
        <SettingHeaderBar currView={currView} />
      </div>
    </header>

    {/* Scrollable content area below the header */}
    <section className="no-scrollbar flex-1 overflow-y-auto">
      <MainContent changeView={changeView} />
    </section>
  </main>
</SidebarProvider>

  );
}
