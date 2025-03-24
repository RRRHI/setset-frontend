'use client';
import { Button } from "@/components/ui/button";


export  function LogOutButton()
{
    const logOUt = () =>
    {
        // Perform logout logic
        console.log("Logged out");
    }

    return (
        <Button variant={"outline"} onClick= {logOUt}>Log out</Button>
    )
}