import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { imgDiv, setSetLogo, setSetLogoText } from "@/lib/constant";
import { sideBarPageProp } from "@/lib/types";

export function SettingSidebar({
  menuItems,
  currView,
}: {
  menuItems: sideBarPageProp[];
  currView: string;
}) {
  const router = useRouter();
  const handleScrollToSection = (id: string) => {
   router.push(`settings/#${id}`);
  }

  
  

  return (
    <Sidebar variant="floating" className="rounded-2xl">
      <SidebarContent className="scrollbar overflow-y-auto rounded-xl ">
        <SidebarGroup>
          <SidebarGroupLabel className="my-[10px] mb-0 items-center gap-2 p-[30px]">
            <div className={setSetLogo}>
              <div className={imgDiv}>
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
                  className={setSetLogoText}
                >
                  Setset
                </a>
              </div>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent className="scrollbar my-5 ">
            {menuItems.map((item) => (
              <SidebarMenuItem
                key={item.url}
                onClick={() => handleScrollToSection(item.url)}
                className={` m-1 flex h-12 cursor-default list-none items-center justify-start gap-1 rounded-xl p-[30px] ${
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
