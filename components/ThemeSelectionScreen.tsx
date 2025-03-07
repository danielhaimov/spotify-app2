"use client"
import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Settings } from "lucide-react"
import { useTheme } from "next-themes"

interface ThemeSelectionScreenProps {
  onContinue: () => void
}

export default function ThemeSelectionScreen({ onContinue }: ThemeSelectionScreenProps) {
  const [selectedTheme, setSelectedTheme] = useState("dark")
  const { setTheme } = useTheme()

  const handleThemeSelect = (theme: string) => {
    setSelectedTheme(theme)
    setTheme(theme)
  }

  return (
    <div className="relative flex flex-col items-center h-screen w-full bg-black text-white overflow-hidden">
      <div className="absolute top-0 right-0 left-0 p-6">
        <Image src="/spotify-logo.svg" alt="Spotify Logo" width={120} height={36} className="text-[#1DB954]" />
      </div>

      <div className="flex flex-col items-center justify-center h-full w-full p-8 text-center">
        <h1 className="text-2xl font-bold mb-8">Choose Mode</h1>

        <div className="flex justify-center gap-6 mb-10">
          <div
            className={`flex flex-col items-center p-4 rounded-xl ${selectedTheme === "dark" ? "bg-gray-800" : "bg-gray-900"}`}
            onClick={() => handleThemeSelect("dark")}
          >
            <Moon className="w-10 h-10 mb-2 text-[#1DB954]" />
            <span className="text-sm">Dark Mode</span>
          </div>

          <div
            className={`flex flex-col items-center p-4 rounded-xl ${selectedTheme === "light" ? "bg-gray-200 text-black" : "bg-gray-900"}`}
            onClick={() => handleThemeSelect("light")}
          >
            <Sun className="w-10 h-10 mb-2 text-[#1DB954]" />
            <span className="text-sm">Light Mode</span>
          </div>
        </div>

        <Button
          onClick={onContinue}
          className="bg-[#1DB954] hover:bg-[#1ed760] text-black font-medium rounded-full px-12 py-6 w-full max-w-xs"
        >
          Continue
        </Button>
      </div>

      <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
        <Settings className="w-6 h-6 text-gray-500" />
      </div>

      <div className="absolute bottom-0 right-0 w-full h-3/4 opacity-20">
        <div className="relative w-full h-full">
          <Image src="/placeholder.svg?height=600&width=400" alt="Background" fill className="object-cover" />
        </div>
      </div>
    </div>
  )
}

