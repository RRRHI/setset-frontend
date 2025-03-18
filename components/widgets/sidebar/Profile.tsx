
  import {useRouter} from "next/navigation"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  
  export function ProfilePicture({src, alt, className}: {src: string, alt: string, className?: string}) {
    const router = useRouter()
    const toProfile = () => router.push("/Profile")
    return (
      <Avatar onClick={toProfile} className={className}>
        <AvatarImage src={src} alt="@shadcn" />
        <AvatarFallback>{alt}</AvatarFallback>
      </Avatar>
    )
  }
  