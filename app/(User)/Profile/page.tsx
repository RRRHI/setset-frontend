'use client';
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
export default function Page() {
  return (
    <div className="w-full h-full flex items-center justify-center flex-col">
      <h1>Welcome to the user profile page</h1>
      <Button onClick={() => redirect("/")}>Go Home</Button>
    </div>
  );
}
