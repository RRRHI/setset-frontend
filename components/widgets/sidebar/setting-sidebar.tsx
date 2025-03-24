
import { Sidebar, SidebarContent,SidebarMenuItem } from "@/components/ui/sidebar"
import { sideBarPageProp } from "@/lib/types"

export function SettingSidebar({menuItems, currView, changeView}: {menuItems: sideBarPageProp[], currView: string, changeView: (view: string) => void}) {
    const handleScrollToSection = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" ,block: "center"});
          changeView(id);
        }
      };
    
    // const currView = () => {
      
    // }
      
  return (
    <Sidebar>
      <SidebarContent >
        {menuItems.map((item) =>
        {
          return (
            <SidebarMenuItem className={`list-none hover:pl-3 hover:bg-muted-foreground
                cursor-default my-7 mx-2 flex justify-start items-center gap-1 h-12 rounded-xl transition delay-150 duration-300 ease-in-out ${currView === item.url ? "bg-yellow-400" : ""}`}
                key={item.url} onClick={() => { handleScrollToSection(item.url) }}>
                {item.icon}
                {item.title}
            </SidebarMenuItem>
        );
        
        })}
      </SidebarContent>
    </Sidebar>
  )
}