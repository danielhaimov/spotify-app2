"use client"

import { useState, useEffect } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { StatusBar } from "expo-status-bar"
import AsyncStorage from "@react-native-async-storage/async-storage"

import WelcomeScreen from "./screens/WelcomeScreen"
import OnboardingScreen from "./screens/OnboardingScreen"
import ThemeSelectionScreen from "./screens/ThemeSelectionScreen"
import SignInScreen from "./screens/SignInScreen"
import RegisterScreen from "./screens/RegisterScreen"
import MainTabNavigator from "./navigation/MainTabNavigator"
import { ThemeProvider } from "./context/ThemeContext"
import { AuthProvider, useAuth } from "./context/AuthContext"
import { SpotifyProvider } from "./context/SpotifyContext"

const Stack = createStackNavigator()

function AppNavigator() {
  const { isAuthenticated, isLoading } = useAuth()
  const [isFirstLaunch, setIsFirstLaunch] = useState(null)

  useEffect(() => {
    AsyncStorage.getItem("alreadyLaunched").then((value) => {
      if (value === null) {
        AsyncStorage.setItem("alreadyLaunched", "true")
        setIsFirstLaunch(true)
      } else {
        setIsFirstLaunch(false)
      }
    })
  }, [])

  if (isLoading || isFirstLaunch === null) {
    return null // or a loading screen
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isFirstLaunch ? (
        <>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="ThemeSelection" component={ThemeSelectionScreen} />
        </>
      ) : null}

      {!isAuthenticated ? (
        <>
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      ) : (
        <Stack.Screen name="Main" component={MainTabNavigator} />
      )}
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SpotifyProvider>
          <NavigationContainer>
            <StatusBar style="light" />
            <AppNavigator />
          </NavigationContainer>
        </SpotifyProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

