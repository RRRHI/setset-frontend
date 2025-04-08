"use client"
import { LoginForm } from "@/components/login-form"
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile"

export default function LoginPage() {
  const isMobile = useIsMobile();

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-card p-6 md:p-10">
      <Card className="w-full max-w-lg bg-background"> 
        <CardHeader className="pb-3 pt-11">
          <a href="#" className="flex items-center gap-2 self-center text-lg font-medium"> 
            <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Image 
                src="/images/logo.png" 
                width={100}
                height={100}
                className="size-7" 
                alt="Logo" />
            </div>
            Setset
          </a>
        </CardHeader>
        <CardContent className={`${isMobile ? 'px-6' : 'px-11 py-8'} `}>
          <LoginForm />
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary  ">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}