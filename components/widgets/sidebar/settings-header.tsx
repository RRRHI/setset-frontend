import React from "react";

import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Notification from "@/components/widgets/sidebar/notification";
import { ChangeTheme } from "@/components/widgets/theme-toggle";
import { profile } from "@/lib/sample-data";
import { SettingsHeader } from "@/lib/settings";

import { ProfilePicture } from "./header-profile";

const SidebarIcon = () => {
  return (
    <SidebarTrigger className="flex w-full items-center gap-5 font-semibold text-foreground hover:bg-transparent md:text-2xl">
      <span className="rounded-xl bg-primary-foreground p-2">
        <SettingsHeader />
      </span>
      <p className="max-w-24 text-pretty text-left leading-none sm:max-w-full">
        Settings
      </p>
    </SidebarTrigger>
  );
};

const UserButton = () => {
  return (
    <ProfilePicture
      src="https://github.com/shadcn.png"
      alt="CN"
      className="!size-6 cursor-pointer"
      profile={profile}
    />
  );
};

export function SettingHeaderBar() {
  return (
    <section className="flex w-full items-center justify-between px-4">
      <div className="flex items-center">
        <SidebarIcon />
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
