"use client"

import type React from "react"
import { createContext, useState, useContext, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

interface User {
  id: string
  name: string
  email: string
}

interface AuthContextType {
  isAuthenticated: boolean
  isLoading: boolean
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        const userData = await AsyncStorage.getItem("user")
        if (userData) {
          setUser(JSON.parse(userData))
          setIsAuthenticated(true)
        }
      } catch (error) {
        console.log("Error checking auth", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    // In a real app, you would validate credentials with your backend
    // For this demo, we'll simulate a successful login
    const mockUser = {
      id: "1",
      name: "Test User",
      email,
    }

    try {
      await AsyncStorage.setItem("user", JSON.stringify(mockUser))
      setUser(mockUser)
      setIsAuthenticated(true)
    } catch (error) {
      console.log("Error logging in", error)
      throw new Error("Login failed")
    }
  }

  const register = async (name: string, email: string, password: string) => {
    // In a real app, you would register the user with your backend
    // For this demo, we'll simulate a successful registration
    const mockUser = {
      id: "1",
      name,
      email,
    }

    try {
      await AsyncStorage.setItem("user", JSON.stringify(mockUser))
      setUser(mockUser)
      setIsAuthenticated(true)
    } catch (error) {
      console.log("Error registering", error)
      throw new Error("Registration failed")
    }
  }

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("user")
      setUser(null)
      setIsAuthenticated(false)
    } catch (error) {
      console.log("Error logging out", error)
      throw new Error("Logout failed")
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

