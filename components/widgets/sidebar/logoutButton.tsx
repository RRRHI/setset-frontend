"use client";
import { Button } from "@/components/ui/button";
import { LogOut as LogOutIcon } from "lucide-react";

export function LogOut() {
  const logOUt = () => {
    // Perform logout logic
    console.log("Logged out");
  };

  return (
    <Button
      className="bg-primary-foreground text-primary hover:bg-background hover:text-foreground"
      onClick={logOUt}
    >
      <LogOutIcon />
      Log out
    </Button>
  );
}
