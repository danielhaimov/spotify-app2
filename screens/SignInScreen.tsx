"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ActivityIndicator } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Feather } from "@expo/vector-icons"
import { useTheme } from "../context/ThemeContext"
import { useAuth } from "../context/AuthContext"

const SignInScreen = () => {
  const navigation = useNavigation()
  const { colors } = useTheme()
  const { login } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSignIn = async () => {
    if (!email || !password) {
      setError("Please enter both email and password")
      return
    }

    setError("")
    setIsLoading(true)

    try {
      await login(email, password)
    } catch (error) {
      setError("Invalid email or password")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Feather name="chevron-left" size={24} color={colors.text} />
      </TouchableOpacity>

      <View style={styles.header}>
        <Image source={require("../assets/spotify-logo-green.png")} style={styles.logo} resizeMode="contain" />
      </View>

      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>Sign In</Text>

        <Text style={[styles.subtitle, { color: colors.secondary }]}>
          If You Need Any Support <Text style={{ color: colors.primary }}>Click Here</Text>
        </Text>

        <View style={styles.form}>
          <View style={[styles.inputContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <TextInput
              style={[styles.input, { color: colors.text }]}
              placeholder="Enter Username Or Email"
              placeholderTextColor={colors.secondary}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View style={[styles.inputContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <TextInput
              style={[styles.input, { color: colors.text }]}
              placeholder="Password"
              placeholderTextColor={colors.secondary}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Feather name={showPassword ? "eye" : "eye-off"} size={20} color={colors.secondary} />
            </TouchableOpacity>
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity>
            <Text style={[styles.forgotPassword, { color: colors.secondary }]}>Recovery Password</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.signInButton, { backgroundColor: colors.primary }]}
            onPress={handleSignIn}
            disabled={isLoading}
          >
            {isLoading ? <ActivityIndicator color="white" /> : <Text style={styles.signInButtonText}>Sign In</Text>}
          </TouchableOpacity>
        </View>

        <View style={styles.socialSignIn}>
          <View style={styles.orContainer}>
            <View style={[styles.orLine, { backgroundColor: colors.border }]} />
            <Text style={[styles.orText, { color: colors.secondary }]}>OR</Text>
            <View style={[styles.orLine, { backgroundColor: colors.border }]} />
          </View>

          <View style={styles.socialButtons}>
            <TouchableOpacity style={[styles.socialButton, { backgroundColor: colors.card }]}>
              <Image source={require("../assets/google-icon.png")} style={styles.socialIcon} />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.socialButton, { backgroundColor: colors.card }]}>
              <Image source={require("../assets/apple-icon.png")} style={styles.socialIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={{ color: colors.secondary }}>
          Not A Member?{" "}
          <Text
            style={{ color: colors.primary, fontWeight: "bold" }}
            onPress={() => navigation.navigate("Register" as never)}
          >
            Register Now
          </Text>
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
  },
  header: {
    alignItems: "center",
    marginTop: 40,
  },
  logo: {
    width: 120,
    height: 36,
  },
  content: {
    flex: 1,
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 30,
  },
  form: {
    gap: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 56,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    height: "100%",
  },
  errorText: {
    color: "#FF5252",
    marginTop: -8,
  },
  forgotPassword: {
    textAlign: "right",
    marginTop: 8,
  },
  signInButton: {
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  signInButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  socialSignIn: {
    marginTop: 40,
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  orLine: {
    flex: 1,
    height: 1,
  },
  orText: {
    marginHorizontal: 10,
  },
  socialButtons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  socialIcon: {
    width: 24,
    height: 24,
  },
  footer: {
    alignItems: "center",
    marginBottom: 20,
  },
})

export default SignInScreen

