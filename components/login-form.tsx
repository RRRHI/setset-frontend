"use client"

import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeClosed } from "lucide-react"

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [passwordError, setPasswordError] = useState('');
  const [isPassword, setIsPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));

    if (id === 'password' && !isPassword) {
      setIsPassword(true);
    }
  }

  useEffect(() => {
    if (isPassword) {
      if (formData.password.length === 0) {
        setPasswordError('');
      } else if (formData.password.length < 8) {
        setPasswordError('Password must be at least 8 characters');
      } else {
        setPasswordError('');
      }
    }
  }, [formData.password, isPassword]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password.length < 8) {
      setIsPassword(true);
      setPasswordError('Password must be at least 8 characters');
      return;
    }
    setPasswordError('');
  }

  return (
    <form onSubmit={handleSubmit} className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
              Forgot your password?
            </a>
          </div>
          
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              className="pr-10"
              value={formData.password}
              onChange={handleChange}
              onBlur={() => setIsPassword(true)}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeClosed className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          
          {isPassword && passwordError && (
            <p className="text-sm font-bold text-red-300">
              {passwordError}
            </p>
          )}
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-white text-black hover:text-white hover:border hover:border-white hover:bg-card"
          disabled={!!passwordError && isPassword}
        >
          Login
        </Button>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        
        <Button variant="outline" type="button" className="w-full bg-white text-black hover:text-white">
          <svg
            className="mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
              fill="currentColor"
            />
          </svg>
          Google
        </Button>
      </div>
      
      <div className="text-center text-sm">
        Don't have an account?{" "}
        <a href="#" className="font-medium underline underline-offset-4">
          Sign up
        </a>
      </div>
    </form>
  )
}