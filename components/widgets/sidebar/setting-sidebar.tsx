
import { Sidebar, SidebarContent,SidebarMenuItem } from "@/components/ui/sidebar"
import { sideBarPageProp } from "@/lib/types"

export function SettingSidebar({menuItems}: {menuItems: sideBarPageProp[]}) {
    const handleScrollToSection = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" ,block: "center"});
        }
      };
      
  return (
    <Sidebar>
      <SidebarContent >
        {menuItems.map((item) =>
        {
            return (
                <SidebarMenuItem className="list-none hover:pl-3 hover:bg-muted-foreground
                cursor-default my-7 mx-2 flex justify-start align-middle gap-1 h-12 rounded-xl " key={item.url} onClick={() => {handleScrollToSection(item.url)}}>
                    {item.icon}
                    {item.title}
                </SidebarMenuItem>
            )
        })}
      </SidebarContent>
    </Sidebar>
  )
}