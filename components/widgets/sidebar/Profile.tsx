
import {useRouter} from "next/navigation"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"

  import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"
  import { ProfileData } from "@/lib/types";
  import { LogOutButton } from "./logoutButton";
  export function ProfilePicture({src, alt, className="", profile={name: "", category: "", email: ""}}: {src: string, alt: string, className?: string, profile: ProfileData}) {
    const router = useRouter()
    const toProfile = () => router.push("/settings/#Profile")
    return (
      <HoverCard openDelay={300} >
        <HoverCardTrigger>
          <Avatar onClick={toProfile} className={className}>
            <AvatarImage src={src} alt="@shadcn" />
            <AvatarFallback>{alt}</AvatarFallback>
          </Avatar>
        </HoverCardTrigger>
        <HoverCardContent className="flex flex-col gap-2 p-4 rounded-xl shadow-xl shadow-primary-gray text-sm">
          <p className="font-semibold text-xl pb-3">{profile.name}</p>
          <p>{profile.category}</p>
          <p>{profile.email}</p>
          <LogOutButton />
        </HoverCardContent>
      </HoverCard>
    )
  }
  