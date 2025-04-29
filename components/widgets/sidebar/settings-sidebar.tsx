import { useRouter } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { sideBarPageProp } from "@/lib/types";

import { Brand } from "./branding";

export function SettingSidebar({
  menuItems,
  currView,
}: {
  menuItems: sideBarPageProp[];
  currView: string;
}) {
  const router = useRouter();
  const handleScrollToSection = (scrollingTo: string) => {
    router.push(`settings/#${scrollingTo}`);
    //re-aligning element scroll position
    const sectionIds = menuItems.map((item) => item.url);
    const currIndex = sectionIds.indexOf(scrollingTo);
    for (const id of sectionIds) {
      // console.log(id);
      
      if (sectionIds.indexOf(id) === currIndex) continue; // Skip the current section
      const higherIndex = currIndex > sectionIds.indexOf(id);
      if (higherIndex) {
        // console.log("the selected index is greater than the current index", id);
        // console.log("does this event run?");
        
        const sectionFirstChild = document.getElementById(id)
          ?.firstChild as HTMLElement;
        if (sectionFirstChild) {
          sectionFirstChild.classList.remove(
            "translate-y-full",
            "opacity-100",
            "translate-y-1",
          );
          sectionFirstChild.classList.add("-translate-y-full", "opacity-0");
        } 
      }else {
        //setting the right classes for every section below
        // console.log("the selected index is less than the current index");
        
        const sectionFirstChild = document.getElementById(id)?.firstChild as HTMLElement;
        // console.log("here is the id", id, "here is the first child ", sectionFirstChild);
        
        if (sectionFirstChild) {
          sectionFirstChild.classList.remove(
            "-translate-y-full",
            "opacity-100",
            "translate-y-1",
          );
          sectionFirstChild.classList.add("translate-y-full", "opacity-0");
        }
      }
    }
  };
  return (
    <Sidebar variant="floating" className="rounded-2xl">
      <SidebarContent className="scrollbar overflow-y-auto rounded-xl">
        <SidebarGroup>
          <SidebarGroupLabel className="my-[10px] mb-0 items-center gap-2 p-[30px]">
            <Brand />
          </SidebarGroupLabel>
          <SidebarGroupContent className="scrollbar my-5">
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
