"use client"

import { useEffect } from "react"
import { View, Image, StyleSheet, Animated } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useTheme } from "../context/ThemeContext"

const WelcomeScreen = () => {
  const navigation = useNavigation()
  const { colors } = useTheme()
  const opacity = new Animated.Value(0)

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.delay(1500),
    ]).start(() => {
      navigation.navigate("Onboarding" as never)
    })
  }, [])

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Animated.View style={{ opacity }}>
        <Image source={require("../assets/spotify-logo-green.png")} style={styles.logo} resizeMode="contain" />
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 60,
  },
})

export default WelcomeScreen

