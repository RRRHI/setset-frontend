import React from "react";

import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Notification from "@/components/widgets/sidebar/notification";
import { ChangeTheme } from "@/components/widgets/theme-toggle";
import { headerIconSpan, headerSection, headerText, sideBarTrigger } from "@/lib/constant";
import { profile } from "@/lib/sample-data";
import { settingMenu } from "@/lib/sample-data";
import { SettingsHeader } from "@/lib/settings";

import { ProfilePicture } from "./header-profile";


const SidebarIcon = ({View}:{View:string}) => {
  const icon = settingMenu.find((item) => item.title === View)?.icon;
  return (
    <SidebarTrigger className={sideBarTrigger}>
      <span className={headerIconSpan}>
        {
          icon ?(<div className="[&>svg]:!stroke-primary">{icon}</div>): (<SettingsHeader />)
        }
     
      </span>
      <p className={headerText}>
        {View || "Settings"}
      </p>
    </SidebarTrigger>
  );
};

const UserButton = () => {
  return (
    <ProfilePicture
      src="/images/logo.png"
      alt="SS"
      className="!size-6 cursor-pointer"
      profile={profile}
    />
  );
};

export function SettingHeaderBar({currView}: {currView: string}) {
  return (
    <section className={headerSection}>
      <div className="flex items-center">
        <SidebarIcon View={currView}/>
      </div>

      <div className="flex items-center gap-5 md:gap-[30px]">
        <ChangeTheme />
        <UserButton />
        <Button
          variant="ghost"
          className="hidden p-0 hover:bg-transparent sm:block"
          asChild
        ></Button>
        <Notification />
      </div>
    </section>
  );
}
