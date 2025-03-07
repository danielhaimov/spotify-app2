"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"

interface OnboardingScreenProps {
  onGetStarted: () => void
}

export default function OnboardingScreen({ onGetStarted }: OnboardingScreenProps) {
  return (
    <div className="relative flex flex-col items-center h-screen w-full bg-black text-white overflow-hidden">
      <div className="absolute top-0 right-0 left-0 p-6">
        <Image src="/spotify-logo.svg" alt="Spotify Logo" width={120} height={36} className="text-[#1DB954]" />
      </div>

      <div className="flex flex-col items-center justify-center h-full w-full p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Enjoy Listening To Music</h1>
        <p className="text-sm text-gray-400 mb-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
        </p>

        <Button
          onClick={onGetStarted}
          className="bg-[#1DB954] hover:bg-[#1ed760] text-black font-medium rounded-full px-12 py-6 w-full max-w-xs"
        >
          Get Started
        </Button>
      </div>

      <div className="absolute bottom-0 right-0 w-full h-3/4 opacity-20">
        <div className="relative w-full h-full">
          <Image src="/placeholder.svg?height=600&width=400" alt="Background" fill className="object-cover" />
        </div>
      </div>
    </div>
  )
}

