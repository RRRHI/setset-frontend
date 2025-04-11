import Image from "next/image";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { sideBarPageProp } from "@/lib/types";

export function SettingSidebar({
  menuItems,
  currView,
}: {
  menuItems: sideBarPageProp[];
  currView: string;
}) {
  const handleScrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if(section)
    {
      const sectionPos = section.getBoundingClientRect().top
      const scrollPos = window.pageYOffset || document.documentElement.scrollTop;
      const offsetposition = sectionPos + scrollPos-80
      // console.log("sectionPos", sectionPos, "scrollPos", scrollPos, "offsetposition", offsetposition);
      

      window.scrollTo({
        top:offsetposition,
        behavior: "smooth",
      })
    }
  };
  

  return (
    <Sidebar variant="floating" className="rounded-2xl">
      <SidebarContent className="rounded-xl">
        <SidebarGroup>
          <SidebarGroupLabel className="my-[10px] mb-0 items-center gap-2 p-[30px]">
            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-center gap-2">
                <Image
                  src="/images/logo.png"
                  alt="logo"
                  width={60}
                  height={60}
                  className="h-auto"
                  priority
                />
                <a
                  href="/dashboard"
                  className="text-2xl font-semibold text-secondary"
                >
                  Setset
                </a>
              </div>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent className="my-5">
            {menuItems.map((item) => (
              <SidebarMenuItem
                key={item.url}
                onClick={() => handleScrollToSection(item.url)}
                className={`m-1 flex h-12 cursor-default list-none items-center justify-start gap-1 rounded-xl p-[30px] ${
                  currView === item.url
                    ? "bg-foreground text-primary dark:bg-background dark:text-foreground"
                    : "bg-transparent hover:bg-foreground hover:text-primary dark:[&:hover]:bg-background dark:[&:hover]:text-foreground"
                }`}
              >
                {item.icon}

                <p className="ml-2">{item.title}</p>
              </SidebarMenuItem>
            ))}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
