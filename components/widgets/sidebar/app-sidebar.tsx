"use client";

import { Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
import { imgDiv, setSetLogo, setSetLogoText } from "@/lib/constant";
import { sideBarPageProp } from "@/lib/types";

export function AppSidebar({
  currPage,
  updateCurrPage,
  items,
}: {
  currPage: sideBarPageProp;
  updateCurrPage: (page: sideBarPageProp) => void;
  items: sideBarPageProp[];
}) {
  const handleSelected = (item: sideBarPageProp) => {
    updateCurrPage(item);
  };

  return (
    <Sidebar variant="floating" className="rounded-2xl">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="mb-0 mt-[10px] items-center gap-2 p-[30px]">
            <div className={setSetLogo}>
              <div className={imgDiv}>
                <Image
                  src="/images/logo.png"
                  alt="logo"
                  width={60}
                  height={60}
                />
                <a
                  href="/dashboard"
                  className={setSetLogoText}
                >
                  Setset
                </a>
              </div>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <div className="mt-8 flex flex-col gap-6">
                {items.map((item) => (
                  <SidebarMenuItem
                    key={item.title}
                    className="scrollbar"
                    onClick={() => handleSelected(item)}
                  >
                    <SidebarMenuButton asChild className="text-base md:text-sm">
                      <Link
                        href={item.url}
                        className={`p-[30px] hover:text-sidebar-foreground ${item.title === "Settings" ? "sm:hidden" : ""} ${item.title === "Profile" ? "hidden" : ""}`}
                      >
                        <span
                          className={`flex size-[38px] shrink-0 items-center justify-center ${currPage?.title === item.title ? "rounded-lg bg-primary-foreground font-semibold" : ""}`}
                        >
                          {item.title === "Settings" ? (
                            <Settings
                              className={`size-[18px] ${currPage?.title === item.title ? "stroke-primary" : "text-muted-foreground"}`}
                            />
                          ) : (
                            <div
                              className={
                                currPage?.title === item.title
                                  ? "[&>svg]:stroke-primary"
                                  : "[&>svg]:text-muted-foreground"
                              }
                            >
                              {item.icon}
                            </div>
                          )}
                        </span>
                        <p className="ml-2 !text-wrap text-left text-primary-foreground ">
                          {item.title}
                        </p>
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
