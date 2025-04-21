import { UserRound } from "lucide-react";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Notification from "@/components/widgets/sidebar/notification";
import { ThemeToggle } from "@/components/widgets/theme-toggle";
import {
  headerButton,
  headerIconSpan,
  headerSection,
  headerText,
  sideBarTrigger,
} from "@/lib/constant";
import { profile } from "@/lib/sample-data";
import SettingIcon from "@/lib/settings";
import { SettingsHeader } from "@/lib/settings";
import { sideBarPageProp } from "@/lib/types";
import { cn } from "@/lib/utils";

import { ProfileDropdown } from "./header-profile";
interface HeaderBarProps {
  currPage: sideBarPageProp;
}

const SidebarIcon = ({ currPage }: { currPage: sideBarPageProp }) => {
  return (
    <SidebarTrigger className={sideBarTrigger}>
      <span className={headerIconSpan}>
        {currPage.title === "Settings" ? (
          <SettingsHeader />
        ) : (
          <div className="[&>svg]:!stroke-primary">{currPage.icon}</div>
        )}
      </span>
      <p className={cn(headerText, "max-w-48")}>{currPage.title}</p>
    </SidebarTrigger>
  );
};

const UserButton = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  //profile button
  return isLoggedIn ? (
    <ProfileDropdown
      src="/images/logo.png"
      alt="SS"
      className="!size-6 cursor-pointer"
      profile={profile}
    />
  ) : (
    //login button
    <Button variant="ghost" className={headerButton} asChild>
      <Link href={"/Profile"} className="!flex flex-row">
        <UserRound className="!size-5 fill-foreground stroke-foreground sm:!size-6" />
        <p className="hidden text-lg md:block">Sign In</p>
      </Link>
    </Button>
  );
};

export function HeaderBar({ currPage }: HeaderBarProps) {
  return (
    <section className={headerSection}>
      <div className="flex items-center">
        <SidebarIcon currPage={currPage} />
      </div>

      <div className="flex items-center gap-5 md:gap-[30px]">
        <ThemeToggle />
        {/* set to true to view the profile button */}
        <UserButton isLoggedIn={true} />
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
    </section>
  );
}
