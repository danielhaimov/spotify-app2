"use client"
import { useState } from "react"
import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft, Eye, EyeOff, Apple } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { signUp } from "@/lib/spotify"

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await signUp(fullName, email, password)
      router.push("/dashboard")
    } catch (error) {
      console.error("Sign up error:", error)
    }
  }

  return (
    <div className="h-screen w-full bg-black text-white overflow-hidden">
      <div className="flex items-center p-4">
        <Link href="/" className="text-gray-400">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <div className="mx-auto">
          <Image src="/spotify-logo.svg" alt="Spotify Logo" width={100} height={30} className="text-[#1DB954]" />
        </div>
      </div>

      <div className="flex flex-col items-center p-8">
        <h1 className="text-2xl font-bold mb-6">Register</h1>

        <p className="text-sm text-gray-400 mb-6">
          If You Need Any Support{" "}
          <Link href="#" className="text-[#1DB954]">
            Click Here
          </Link>
        </p>

        <form onSubmit={handleSignUp} className="w-full max-w-md space-y-4 mb-6">
          <div>
            <Input
              type="text"
              placeholder="Full Name"
              className="bg-gray-900 border-gray-800 py-6 px-4 rounded-xl"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div>
            <Input
              type="email"
              placeholder="Enter Email"
              className="bg-gray-900 border-gray-800 py-6 px-4 rounded-xl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="bg-gray-900 border-gray-800 py-6 px-4 rounded-xl"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <Button
            type="submit"
            className="bg-[#1DB954] hover:bg-[#1ed760] text-black font-medium rounded-full py-6 w-full"
          >
            Create Account
          </Button>
        </form>

        <div className="w-full max-w-md flex items-center justify-center mb-6">
          <div className="flex-1 h-px bg-gray-800"></div>
          <div className="px-4 text-sm text-gray-500">Or</div>
          <div className="flex-1 h-px bg-gray-800"></div>
        </div>

        <div className="w-full max-w-md flex justify-center space-x-4 mb-6">
          <button className="p-3 rounded-full bg-gray-900">
            <Image src="/google-icon.svg" alt="Google" width={24} height={24} />
          </button>
          <button className="p-3 rounded-full bg-gray-900">
            <Apple className="w-6 h-6" />
          </button>
        </div>

        <p className="text-sm text-gray-400">
          Do You Have An Account?{" "}
          <Link href="/auth/signin" className="text-[#1DB954]">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}

