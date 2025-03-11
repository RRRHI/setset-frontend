"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
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
        className="flex items-center gap-2 p-0 hover:bg-transparent"
        onClick={changeTheme}
      >
        <Moon className="!size-5 fill-foreground stroke-foreground dark:hidden sm:!size-6" ></Moon>
        <Sun className="hidden !size-5 fill-foreground stroke-foreground dark:block sm:!size-6" ></Sun>
      </Button>
  );
}
