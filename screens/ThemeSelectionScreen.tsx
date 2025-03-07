import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useTheme } from "../context/ThemeContext"
import { Feather } from "@expo/vector-icons"

const ThemeSelectionScreen = () => {
  const navigation = useNavigation()
  const { setTheme, colors } = useTheme()

  const handleThemeSelection = (theme: "light" | "dark") => {
    setTheme(theme)
    navigation.navigate("SignIn" as never)
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Image source={require("../assets/spotify-logo-green.png")} style={styles.logo} resizeMode="contain" />
      </View>

      <View style={styles.content}>
        <Image source={require("../assets/theme-selection-image.jpg")} style={styles.image} resizeMode="cover" />

        <Text style={[styles.title, { color: colors.text }]}>Choose Mode</Text>

        <View style={styles.themeOptions}>
          <TouchableOpacity
            style={[styles.themeOption, { backgroundColor: "#121212" }]}
            onPress={() => handleThemeSelection("dark")}
          >
            <Feather name="moon" size={24} color="#1DB954" />
            <Text style={styles.themeText}>Dark Mode</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.themeOption, { backgroundColor: "#F5F5F5" }]}
            onPress={() => handleThemeSelection("light")}
          >
            <Feather name="sun" size={24} color="#1DB954" />
            <Text style={[styles.themeText, { color: "#121212" }]}>Light Mode</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={() => navigation.navigate("SignIn" as never)}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 40,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  themeOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
  },
  themeOption: {
    width: "45%",
    height: 100,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  themeText: {
    color: "white",
    marginTop: 10,
    fontWeight: "500",
  },
  footer: {
    marginBottom: 40,
  },
  button: {
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
})

export default ThemeSelectionScreen

