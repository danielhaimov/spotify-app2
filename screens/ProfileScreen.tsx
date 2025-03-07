import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native"
import { Feather } from "@expo/vector-icons"
import { useTheme } from "../context/ThemeContext"
import { useAuth } from "../context/AuthContext"
import { useSpotify } from "../context/SpotifyContext"

const ProfileScreen = () => {
  const { colors } = useTheme()
  const { user, logout } = useAuth()
  const { tracks } = useSpotify()

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error("Error logging out", error)
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Profile</Text>
        <TouchableOpacity>
          <Feather name="settings" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <Image source={require("../assets/profile-placeholder.jpg")} style={styles.profileImage} />
          <Text style={[styles.profileName, { color: colors.text }]}>{user?.name || "User"}</Text>
          <Text style={[styles.profileEmail, { color: colors.secondary }]}>{user?.email || "user@example.com"}</Text>

          <TouchableOpacity style={[styles.editProfileButton, { borderColor: colors.border }]}>
            <Text style={[styles.editProfileText, { color: colors.text }]}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsSection}>
          <View style={[styles.statItem, { backgroundColor: colors.card }]}>
            <Text style={[styles.statValue, { color: colors.text }]}>{tracks.length}</Text>
            <Text style={[styles.statLabel, { color: colors.secondary }]}>Songs</Text>
          </View>

          <View style={[styles.statItem, { backgroundColor: colors.card }]}>
            <Text style={[styles.statValue, { color: colors.text }]}>{Math.floor(tracks.length / 3)}</Text>
            <Text style={[styles.statLabel, { color: colors.secondary }]}>Albums</Text>
          </View>

          <View style={[styles.statItem, { backgroundColor: colors.card }]}>
            <Text style={[styles.statValue, { color: colors.text }]}>{Math.floor(tracks.length / 2)}</Text>
            <Text style={[styles.statLabel, { color: colors.secondary }]}>Artists</Text>
          </View>
        </View>

        <View style={styles.publicPlaylistsSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>PUBLIC PLAYLISTS</Text>

          {[1, 2, 3, 4, 5].map((_, index) => (
            <View key={index} style={[styles.playlistItem, { borderBottomColor: colors.border }]}>
              <Image source={{ uri: tracks[index % tracks.length]?.imageUrl }} style={styles.playlistImage} />
              <View style={styles.playlistInfo}>
                <Text style={[styles.playlistName, { color: colors.text }]}>
                  {["Chill Vibes", "Workout Mix", "Road Trip", "Study Focus", "Party Time"][index]}
                </Text>
                <Text style={[styles.playlistSongs, { color: colors.secondary }]}>
                  {Math.floor(Math.random() * 20) + 5} songs
                </Text>
              </View>
              <Text style={[styles.playlistDuration, { color: colors.secondary }]}>
                {Math.floor(Math.random() * 30) + 10}:
                {Math.floor(Math.random() * 60)
                  .toString()
                  .padStart(2, "0")}
              </Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={[styles.logoutButton, { backgroundColor: colors.card }]} onPress={handleLogout}>
          <Feather name="log-out" size={20} color="#FF3B30" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 16,
    marginBottom: 20,
  },
  editProfileButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
  },
  editProfileText: {
    fontSize: 14,
    fontWeight: "500",
  },
  statsSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  statItem: {
    width: "30%",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
  },
  publicPlaylistsSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 15,
    letterSpacing: 1,
  },
  playlistItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 0.5,
  },
  playlistImage: {
    width: 50,
    height: 50,
    borderRadius: 4,
  },
  playlistInfo: {
    flex: 1,
    marginLeft: 15,
  },
  playlistName: {
    fontSize: 16,
    fontWeight: "500",
  },
  playlistSongs: {
    fontSize: 14,
    marginTop: 4,
  },
  playlistDuration: {
    fontSize: 14,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 8,
    marginBottom: 30,
  },
  logoutText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "500",
    color: "#FF3B30",
  },
})

export default ProfileScreen

