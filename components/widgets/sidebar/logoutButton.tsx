'use client';
import { Button } from "@/components/ui/button";
import { LogOut } from 'lucide-react';


export  function LogOutButton()
{
    const logOUt = () =>
    {
        // Perform logout logic
        console.log("Logged out");
    }

    return (
        <Button className= 'bg-primary-foreground hover:bg-muted-foreground text-primary' onClick= {logOUt}><LogOut className="stroke-primary"/>Log out</Button>
    )
}