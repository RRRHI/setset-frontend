"use client";
import { LogOut as LogOutIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export function LogOut() {
  const logOUt = () => {
    // Perform logout logic
    console.log("Logged out");
  };

  return (
    <Button
    variant={"transcript"}

      onClick={logOUt}
    >
      <LogOutIcon />
      Log out
    </Button>
  );
}
