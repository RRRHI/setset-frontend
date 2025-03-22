"use client";

import { Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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

const getPageInfo = (
  path: string,
  items: sideBarPageProp[],
): sideBarPageProp | undefined => {
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
          <SidebarGroupLabel className="mb-0 mt-[10px] items-center gap-2 p-[30px]">
            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-center gap-2">
                <Image
                  src="/images/logo.png"
                  alt="logo"
                  width={60}
                  height={60}
                />
                <h1 className="text-2xl font-semibold text-secondary">
                  Setset
                </h1>
              </div>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <div className="mt-8 flex flex-col gap-6">
                {items.map((item) => (
                  <SidebarMenuItem
                    key={item.title}
                    className=""
                    onClick={() => handleSelected(item)}
                  >
                    <SidebarMenuButton asChild className="text-base md:text-sm">
                      <Link
                        href={item.url}
                        className={`p-[30px] hover:text-sidebar-foreground ${item.title === "Settings" ? "sm:hidden" : ""} ${item.title === "Profile" ? "hidden" : ""}`}
                      >
                        <span
                          className={`flex !size-[38px] shrink-0 justify-center stroke-primary first:items-center ${currSelected === item.title ? "rounded-lg bg-primary-foreground font-semibold" : "bg-transparent"}`}
                        >
                          {item.title === "Settings" ? (
                            <Settings
                              className={`!size-[18px] ${currSelected === item.title ? "stroke-primary" : "text-muted-foreground"}`}
                            />
                          ) : (
                            <div
                              className={` ${currSelected === item.title ? "[&>svg]:!stroke-primary" : "[&>svg]:text-muted-foreground"}`}
                            >
                              {item.icon}
                            </div>
                          )}
                        </span>
                        <span className="ml-2 h-max !text-wrap text-left">
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </div>
            </SidebarMenu>
          </SidebarGroupContent>
          <SidebarFooter />
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
