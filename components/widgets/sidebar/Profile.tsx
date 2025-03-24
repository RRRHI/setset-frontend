
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
  
  import { LogOutButton } from "./logoutButton";
  export function ProfilePicture({src, alt, className}: {src: string, alt: string, className?: string}) {
    const router = useRouter()
    const toProfile = () => router.push("/settings/#profile")
    return (
      <HoverCard openDelay={300} >
        <HoverCardTrigger>
          <Avatar onClick={toProfile} className={className}>
            <AvatarImage src={src} alt="@shadcn" />
            <AvatarFallback>{alt}</AvatarFallback>
          </Avatar>
        </HoverCardTrigger>
        <HoverCardContent className="flex flex-col gap-2 p-4 rounded-xl">
          <p>achu worifung</p>
          <p>category</p>
          <p>achuworifung@gmail.com</p>
          <LogOutButton />
        </HoverCardContent>
      </HoverCard>
    )
  }
  