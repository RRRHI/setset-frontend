"use client";

import { Mail, Phone } from "lucide-react";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";

export default function Footer() {
  return (
    <Card className="w-full">
      <CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          <p>© 2025 SetSet. All rights reserved.</p>
        </div>

        <div className="flex flex-col gap-2 text-sm md:flex-row md:gap-4">
          <Link
            href="#"
            className="flex items-center gap-2 rounded-md border border-transparent bg-transparent text-muted-foreground outline-none transition-colors hover:border-white focus:border-white focus:outline-none"
          >
            <Mail className="size-4" />
            <span>Contact Us</span>
          </Link>

          <Link
            href="#"
            className="flex items-center gap-2 rounded-md border border-transparent bg-transparent text-muted-foreground outline-none transition-colors hover:border-white focus:border-white focus:outline-none"
          >
            <Phone className="size-4" />
            <span>Support</span>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
