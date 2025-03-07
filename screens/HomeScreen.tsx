"use client"

import { useEffect } from "react"
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, FlatList } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Feather } from "@expo/vector-icons"
import { useTheme } from "../context/ThemeContext"
import { useSpotify } from "../context/SpotifyContext"

const HomeScreen = () => {
  const navigation = useNavigation()
  const { colors } = useTheme()
  const { tracks, fetchTracks, playTrack } = useSpotify()

  useEffect(() => {
    fetchTracks()
  }, [])

  const renderTrackItem = ({ item }) => (
    <TouchableOpacity style={[styles.trackItem, { backgroundColor: colors.card }]} onPress={() => playTrack(item)}>
      <Image source={{ uri: item.imageUrl }} style={styles.trackImage} />
      <Text style={[styles.trackName, { color: colors.text }]} numberOfLines={1}>
        {item.name}
      </Text>
      <Text style={[styles.artistName, { color: colors.secondary }]} numberOfLines={1}>
        {item.artist}
      </Text>
    </TouchableOpacity>
  )

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Image source={require("../assets/spotify-logo-green.png")} style={styles.logo} resizeMode="contain" />
        <TouchableOpacity>
          <Feather name="bell" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.welcomeSection}>
          <Text style={[styles.greeting, { color: colors.text }]}>Good morning</Text>
          <Text style={[styles.username, { color: colors.text }]}>User</Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Recently Played</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalList}>
            {tracks.slice(0, 5).map((track) => (
              <TouchableOpacity
                key={track.id}
                style={[styles.recentItem, { backgroundColor: colors.card }]}
                onPress={() => playTrack(track)}
              >
                <Image source={{ uri: track.imageUrl }} style={styles.recentImage} />
                <Text style={[styles.recentName, { color: colors.text }]} numberOfLines={1}>
                  {track.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Made For You</Text>
          <FlatList
            data={tracks}
            renderItem={renderTrackItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Popular Artists</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalList}>
            {tracks.slice(0, 5).map((track) => (
              <TouchableOpacity key={track.id} style={styles.artistItem}>
                <Image source={{ uri: track.imageUrl }} style={styles.artistImage} />
                <Text style={[styles.artistItemName, { color: colors.text }]} numberOfLines={1}>
                  {track.artist}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
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
  logo: {
    width: 120,
    height: 36,
  },
  welcomeSection: {
    marginBottom: 30,
  },
  greeting: {
    fontSize: 16,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  horizontalList: {
    marginLeft: -5,
  },
  recentItem: {
    width: 140,
    marginHorizontal: 5,
    borderRadius: 10,
    overflow: "hidden",
  },
  recentImage: {
    width: "100%",
    height: 140,
  },
  recentName: {
    padding: 10,
    fontSize: 14,
  },
  trackItem: {
    width: 160,
    marginRight: 15,
    borderRadius: 10,
    overflow: "hidden",
  },
  trackImage: {
    width: "100%",
    height: 160,
  },
  trackName: {
    paddingHorizontal: 10,
    paddingTop: 10,
    fontSize: 14,
    fontWeight: "bold",
  },
  artistName: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    fontSize: 12,
  },
  artistItem: {
    alignItems: "center",
    marginHorizontal: 10,
    width: 100,
  },
  artistImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  artistItemName: {
    marginTop: 10,
    fontSize: 14,
    textAlign: "center",
  },
})

export default HomeScreen

