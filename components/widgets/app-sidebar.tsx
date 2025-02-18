"use client"

import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

export function AppSidebar() {
  return (
    <SidebarProvider>
      <Sidebar className="flex min-h-screen max-w-[100vw] flex-col gap-6 bg-gradient-to-b from-black to-primary-gray px-4 py-10 lg:px-6">
        <SidebarContent className="flex min-h-screen max-w-[100vw] flex-col gap-6 bg-gradient-to-b from-black to-primary-gray px-4 py-10 lg:px-6">
          <SidebarGroup>
            <SidebarGroupLabel className="text-white/80">Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a
                        href={item.url}
                        className="
                          rounded-md
                          transition-all
                          bg-transparent
                          hover:ring-1
                          hover:ring-white/40
                          focus:ring-1
                          focus:ring-white/40
                          hover:shadow-[0_0_10px_rgba(255,255,255,0.2)]
                        "
                      >
                        <item.icon className="text-white" />
                        <span className="text-white/80">{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  )
}