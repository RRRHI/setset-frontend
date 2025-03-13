"use client";

import { Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { sideBarPageProp } from "@/lib/types";

const getPageInfo = (path: string, items: sideBarPageProp[]): sideBarPageProp | undefined => {
  return items.find((item) => item.url === path);
};

export function AppSidebar({
  updateCurrPage,
  items,
}: {
  updateCurrPage: (page: sideBarPageProp) => void;
  items: sideBarPageProp[];
}) {
  const pathname = usePathname();
  const [currSelected, setCurrSelected] = useState(items[0].title);
  
  useEffect(() => {
    const pageInfo = getPageInfo(pathname, items);
    if (pageInfo) {
      setCurrSelected(pageInfo.title);
      updateCurrPage(pageInfo);
    }
  }, [pathname, items, updateCurrPage]);

  const handleSelected = (item: sideBarPageProp) => {
    setCurrSelected(item.title);
    updateCurrPage(item);
  };

  return (
    <Sidebar variant="floating" className="rounded-2xl">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="mb-0 mt-[10px] p-[30px] font-semibold">
            Setset
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className="mb-2"
                  onClick={() => handleSelected(item)}
                >
                  <SidebarMenuButton asChild className="text-base md:text-sm">
                    <a
                      href={item.url}
                      className={`p-[30px] hover:text-sidebar-foreground ${item.title === "Settings" ? "sm:hidden " : ""}`}
                    >
                      <span
                        className={`flex !size-[38px] shrink-0 items-center justify-center ${currSelected === item.title ? "rounded-lg bg-primary-foreground font-semibold" : "bg-transparent"}`}
                      >
                        {item.title === "Settings" ? (
                          <Settings className={`!size-[18px] ${currSelected === item.title ? "stroke-primary" : "text-muted-foreground"}`} />
                        ) : (
                          <item.icon
                            className={`!size-[18px]  ${currSelected === item.title ? "stroke-primary" : "text-muted-foreground"} `}
                          />
                        )}
                      </span>
                      <span className="h-max !text-wrap text-left">
                        {item.title}
                      </span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
          <SidebarFooter />
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}