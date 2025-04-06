import { UserRound } from "lucide-react";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Notification from "@/components/widgets/sidebar/notification";
import { ChangeTheme } from "@/components/widgets/theme-toggle";
import { profile } from "@/lib/sample-data";
import SettingIcon from "@/lib/settings";
import { SettingsHeader } from "@/lib/settings";
import { sideBarPageProp } from "@/lib/types";

import { ProfilePicture } from "./header-profile";

interface HeaderBarProps {
  currPage: sideBarPageProp;
}

const SidebarIcon = ({ currPage }: { currPage: sideBarPageProp }) => {
  return (
    <SidebarTrigger className="flex w-full items-center gap-5 font-semibold text-foreground hover:bg-transparent md:text-2xl">
      <span className="rounded-xl bg-primary-foreground p-2">
        {currPage.title === "Settings" ? (
          <SettingsHeader />
        ) : (
          <div className="[&>svg]:!stroke-primary">{currPage.icon}</div>
        )}
      </span>
      <p className="max-w-24 text-pretty text-left leading-none sm:max-w-full">
        {currPage.title}
      </p>
    </SidebarTrigger>
  );
};

const UserButton = () => {
  //this is the code for the user profile button for now
  return true ? (
    //this is the code for the user profile button

    <ProfilePicture
      src="https://github.com/shadcn.png"
      alt="CN"
      className="!size-6 cursor-pointer"
      profile={profile}
    />
  ) : (
    //this is the code for the login button
    <Button
      variant="ghost"
      className="flex items-center gap-2 p-0 hover:bg-transparent"
      asChild
    >
      <Link href={"/Profile"} className="!flex flex-row">
        <UserRound className="!size-5 fill-foreground stroke-foreground sm:!size-6" />
        <p className="hidden text-lg md:block">Sign In</p>
      </Link>
    </Button>
  );
};

export function HeaderBar({ currPage }: HeaderBarProps) {
  return (
    <header className="flex w-full items-center justify-between px-4">
      <div className="flex items-center">
        <SidebarIcon currPage={currPage} />
      </div>

      <div className="flex items-center gap-5 md:gap-[30px]">
        <ChangeTheme />
        <UserButton />
        <Button
          variant="ghost"
          className="hidden p-0 hover:bg-transparent sm:block"
          asChild
        >
          <Link href={"/settings"} className="hidden sm:!flex">
            <SettingIcon />
          </Link>
        </Button>
        <Notification />
      </div>
    </header>
  );
}
