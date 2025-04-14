"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { headerButton } from "@/lib/constant";
export function ChangeTheme() {
  const { setTheme, theme } = useTheme();

  const changeTheme = () => {
    if (theme == "light") {
      setTheme("dark");

    } else {
      setTheme("light");

    }
  };
  return (

      <Button
        variant="ghost"
        className={headerButton}
        onClick={changeTheme}
      >
        <Moon className="!size-5 fill-foreground stroke-foreground dark:hidden sm:!size-6" ></Moon>
        <Sun className="hidden !size-5 fill-foreground stroke-foreground dark:block sm:!size-6" ></Sun>
      </Button>
  );
}
