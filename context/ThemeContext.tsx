"use client"

import type React from "react"
import { createContext, useState, useContext, useEffect } from "react"
import { useColorScheme } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

type ThemeType = "light" | "dark"

interface ThemeContextType {
  theme: ThemeType
  setTheme: (theme: ThemeType) => void
  colors: {
    background: string
    text: string
    primary: string
    secondary: string
    card: string
    border: string
    notification: string
  }
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const deviceTheme = useColorScheme() as ThemeType
  const [theme, setTheme] = useState<ThemeType>(deviceTheme || "dark")

  useEffect(() => {
    // Load saved theme
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem("theme")
        if (savedTheme) {
          setTheme(savedTheme as ThemeType)
        }
      } catch (error) {
        console.log("Error loading theme", error)
      }
    }

    loadTheme()
  }, [])

  // Save theme when it changes
  useEffect(() => {
    const saveTheme = async () => {
      try {
        await AsyncStorage.setItem("theme", theme)
      } catch (error) {
        console.log("Error saving theme", error)
      }
    }

    saveTheme()
  }, [theme])

  const lightColors = {
    background: "#FFFFFF",
    text: "#000000",
    primary: "#1DB954", // Spotify green
    secondary: "#535353",
    card: "#F5F5F5",
    border: "#E0E0E0",
    notification: "#FF5252",
  }

  const darkColors = {
    background: "#121212", // Spotify dark background
    text: "#FFFFFF",
    primary: "#1DB954", // Spotify green
    secondary: "#B3B3B3",
    card: "#181818",
    border: "#333333",
    notification: "#FF5252",
  }

  const colors = theme === "dark" ? darkColors : lightColors

  return <ThemeContext.Provider value={{ theme, setTheme, colors }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

