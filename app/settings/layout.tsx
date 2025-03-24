'use client';
import "@/app/globals.css"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { SettingSidebar } from "@/components/widgets/sidebar/setting-sidebar";
import { settingMenu } from "@/lib/sampleData"
import {useState} from "react"

export default function Layout({ children }: { children: React.ReactNode }) {
    // console.log("setting menu", settingMenu);
    const[currView, setCurrentView] = useState<string>("");

    const handleScrollToSection = (id:string) =>
    {
      setCurrentView(id);
    }
    
  return (
    <SidebarProvider>
      <SettingSidebar menuItems={settingMenu} />
      <main className="flex flex-1 flex-col">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}