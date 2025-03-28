"use client";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export function LogOutButton() {
  const logOUt = () => {
    // Perform logout logic
    console.log("Logged out");
  };

  return (
    <Button
      className="bg-primary-foreground text-primary hover:bg-background hover:text-foreground"
      onClick={logOUt}
    >
      <LogOut />
      Log out
    </Button>
  );
}
