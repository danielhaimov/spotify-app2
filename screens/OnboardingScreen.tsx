import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useTheme } from "../context/ThemeContext"

const OnboardingScreen = () => {
  const navigation = useNavigation()
  const { colors } = useTheme()

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Image source={require("../assets/spotify-logo-green.png")} style={styles.logo} resizeMode="contain" />
      </View>

      <View style={styles.content}>
        <Image source={require("../assets/onboarding-image.jpg")} style={styles.image} resizeMode="cover" />

        <Text style={[styles.title, { color: colors.text }]}>Enjoy Listening To Music</Text>

        <Text style={[styles.description, { color: colors.secondary }]}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in ante porta, euismod dolor sit amet, tincidunt
          eleifend diam.
        </Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={() => navigation.navigate("ThemeSelection" as never)}
        >
          <Text style={styles.buttonText}>Get Started</Text>
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
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 20,
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

export default OnboardingScreen

