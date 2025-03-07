"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import SplashScreen from "@/components/SplashScreen"
import OnboardingScreen from "@/components/OnboardingScreen"
import ThemeSelectionScreen from "@/components/ThemeSelectionScreen"
import { ThemeProvider } from "@/components/theme-provider"

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState("splash")
  const router = useRouter()

  useEffect(() => {
    // Simulate a splash screen delay
    const timer = setTimeout(() => {
      setCurrentScreen("onboarding")
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleStarted = () => {
    setCurrentScreen("theme-selection")
  }

  const handleContinue = () => {
    router.push("/auth/signin")
  }

  return (
    <ThemeProvider>
      <main className="flex min-h-screen flex-col items-center justify-center">
        {currentScreen === "splash" && <SplashScreen />}
        {currentScreen === "onboarding" && <OnboardingScreen onGetStarted={handleStarted} />}
        {currentScreen === "theme-selection" && <ThemeSelectionScreen onContinue={handleContinue} />}
      </main>
    </ThemeProvider>
  )
}

