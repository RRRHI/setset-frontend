import { useRouter } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ProfileData } from "@/lib/types";

import { LogOut } from "./logout-button";
export function ProfilePicture({
  src,
  alt,
  className = "",
  profile = { name: "", category: "", email: "" },
}: {
  src: string;
  alt: string;
  className?: string;
  profile: ProfileData;
}) {
  const router = useRouter();
  const toProfile = () => router.push("/settings/#Profile");
  return (
    <HoverCard openDelay={300}>
      <HoverCardTrigger>
        <Avatar onClick={toProfile} className={className}>
          <AvatarImage src={src} alt="@shadcn" />
          <AvatarFallback>{alt}</AvatarFallback>
        </Avatar>
      </HoverCardTrigger>
      <HoverCardContent className="mr-2 flex flex-col gap-2 rounded-xl p-4 text-sm shadow-xl shadow-primary-gray">
        {" "}
        <p className="text-xl font-semibold">{profile.name}</p>
        <p className="opacity-80">{profile.category}</p>
        <p className="pt-3">{profile.email}</p>
        <LogOut />
      </HoverCardContent>
    </HoverCard>
  );
}
