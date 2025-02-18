"use client";

import Link from "next/link";
import { Mail, Phone } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export function Footer() {
  return (
    <Card className="mt-6 w-full">
      <CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          <p>© 2025 SetSet. All rights reserved.</p>
        </div>
        
        <div className="flex flex-col gap-2 text-sm md:flex-row md:gap-4">
          <Link 
            href="#" 
            className="
              flex items-center gap-2 text-muted-foreground transition-colors 
              bg-transparent
              border border-transparent
              hover:border-white
              focus:border-white
              rounded-md
              outline-none
              focus:outline-none
            "
          >
            <Mail className="h-4 w-4" />
            <span>Contact Us</span>
          </Link>
          
          <Link 
            href="#" 
            className="
              flex items-center gap-2 text-muted-foreground transition-colors 
              bg-transparent
              border border-transparent
              hover:border-white
              focus:border-white
              rounded-md
              outline-none
              focus:outline-none
            "
          >
            <Phone className="h-4 w-4" />
            <span>Support</span>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}