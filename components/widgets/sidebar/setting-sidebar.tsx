import {
  Sidebar,
  SidebarContent,
  SidebarMenuItem,
  SidebarGroupLabel,
  SidebarGroup,
  SidebarGroupContent
} from "@/components/ui/sidebar";
import { sideBarPageProp } from "@/lib/types";
import Image from "next/image";

export function SettingSidebar({
  menuItems,
  currView,
}: {
  menuItems: sideBarPageProp[];
  currView: string;
}) {
  const handleScrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Sidebar variant="floating" className="rounded-2xl">
      <SidebarContent className="rounded-xl">
        <SidebarGroup>
        <SidebarGroupLabel className="mb-0 my-[10px] items-center gap-2 p-[30px]">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center gap-2">
              <Image src="/images/logo.png" alt="logo" width={60} height={60} />
              <h1 className="text-2xl font-semibold text-secondary">Setset</h1>
            </div>
          </div>
        </SidebarGroupLabel>
        <SidebarGroupContent className="my-5">
        {menuItems.map((item) => (
          <SidebarMenuItem
            key={item.url}
            onClick={() => handleScrollToSection(item.url)}
            className={`mx-2 flex h-12 cursor-default list-none items-center justify-start gap-1 rounded-xl p-[30px] transition-transform duration-300 ease-in-out hover:translate-x-4 ${currView === item.url ? "translate-x-4 [&>span>svg]:stroke-black [&>span]:bg-primary-foreground [&>span]:text-[38px] [&>span]:text-primary-foreground" : "bg-transparent"}`}
          >
            <span className="flex size-[38px] items-center justify-center rounded-xl">
              {item.icon}
            </span>
            <p className="ml-2">{item.title}</p>
          </SidebarMenuItem>
        ))}
        </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
