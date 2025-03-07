"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from "react-native"
import { Feather } from "@expo/vector-icons"
import { useTheme } from "../context/ThemeContext"
import { useSpotify } from "../context/SpotifyContext"

const LibraryScreen = () => {
  const { colors } = useTheme()
  const { tracks, playTrack } = useSpotify()
  const [activeTab, setActiveTab] = useState("playlists")

  const renderTrackItem = ({ item }) => (
    <TouchableOpacity style={[styles.trackItem, { backgroundColor: colors.card }]} onPress={() => playTrack(item)}>
      <Image source={{ uri: item.imageUrl }} style={styles.trackImage} />
      <View style={styles.trackInfo}>
        <Text style={[styles.trackName, { color: colors.text }]} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={[styles.artistName, { color: colors.secondary }]} numberOfLines={1}>
          {item.artist}
        </Text>
      </View>
      <TouchableOpacity>
        <Feather name="more-vertical" size={20} color={colors.secondary} />
      </TouchableOpacity>
    </TouchableOpacity>
  )

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={[styles.title, { color: colors.text }]}>Your Library</Text>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Feather name="search" size={24} color={colors.text} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Feather name="plus" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "playlists" && { backgroundColor: colors.primary }]}
            onPress={() => setActiveTab("playlists")}
          >
            <Text style={[styles.tabText, { color: activeTab === "playlists" ? "white" : colors.text }]}>
              Playlists
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === "artists" && { backgroundColor: colors.primary }]}
            onPress={() => setActiveTab("artists")}
          >
            <Text style={[styles.tabText, { color: activeTab === "artists" ? "white" : colors.text }]}>Artists</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === "albums" && { backgroundColor: colors.primary }]}
            onPress={() => setActiveTab("albums")}
          >
            <Text style={[styles.tabText, { color: activeTab === "albums" ? "white" : colors.text }]}>Albums</Text>
          </TouchableOpacity>
        </View>
      </View>

      {activeTab === "playlists" && (
        <View style={styles.playlistsContainer}>
          <TouchableOpacity style={[styles.createPlaylist, { backgroundColor: colors.card }]}>
            <View style={[styles.createPlaylistIcon, { backgroundColor: colors.primary }]}>
              <Feather name="plus" size={24} color="white" />
            </View>
            <Text style={[styles.createPlaylistText, { color: colors.text }]}>Create Playlist</Text>
          </TouchableOpacity>

          <FlatList
            data={[
              { id: "liked", name: "Liked Songs", count: tracks.length },
              { id: "recent", name: "Recently Played", count: Math.floor(tracks.length / 2) },
            ]}
            renderItem={({ item }) => (
              <TouchableOpacity style={[styles.playlistItem, { backgroundColor: colors.card }]}>
                <View style={[styles.playlistIcon, { backgroundColor: item.id === "liked" ? "#1DB954" : "#3498DB" }]}>
                  <Feather name={item.id === "liked" ? "heart" : "clock"} size={24} color="white" />
                </View>
                <View style={styles.playlistInfo}>
                  <Text style={[styles.playlistName, { color: colors.text }]}>{item.name}</Text>
                  <Text style={[styles.playlistCount, { color: colors.secondary }]}>{item.count} songs</Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.playlistsList}
            ListHeaderComponent={<Text style={[styles.sectionTitle, { color: colors.text }]}>Playlists</Text>}
          />
        </View>
      )}

      {activeTab === "artists" && (
        <FlatList
          data={Array.from(new Set(tracks.map((track) => track.artist))).map((artist) => ({
            id: artist,
            name: artist,
            imageUrl: tracks.find((track) => track.artist === artist)?.imageUrl,
          }))}
          renderItem={({ item }) => (
            <TouchableOpacity style={[styles.artistItem, { backgroundColor: colors.card }]}>
              <Image source={{ uri: item.imageUrl }} style={styles.artistImage} />
              <Text style={[styles.artistItemName, { color: colors.text }]}>{item.name}</Text>
              <Text style={[styles.artistType, { color: colors.secondary }]}>Artist</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.artistsList}
          numColumns={2}
          columnWrapperStyle={styles.artistsRow}
        />
      )}

      {activeTab === "albums" && (
        <FlatList
          data={tracks}
          renderItem={renderTrackItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.albumsList}
          ListHeaderComponent={<Text style={[styles.sectionTitle, { color: colors.text }]}>Albums</Text>}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginTop: 40,
    marginBottom: 20,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  headerIcons: {
    flexDirection: "row",
  },
  iconButton: {
    marginLeft: 20,
  },
  tabs: {
    flexDirection: "row",
    marginBottom: 10,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
  },
  playlistsContainer: {
    flex: 1,
  },
  createPlaylist: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  createPlaylistIcon: {
    width: 40,
    height: 40,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  createPlaylistText: {
    marginLeft: 15,
    fontSize: 16,
    fontWeight: "500",
  },
  playlistsList: {
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  playlistItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  playlistIcon: {
    width: 50,
    height: 50,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  playlistInfo: {
    marginLeft: 15,
  },
  playlistName: {
    fontSize: 16,
    fontWeight: "500",
  },
  playlistCount: {
    fontSize: 14,
    marginTop: 4,
  },
  artistsList: {
    paddingBottom: 20,
  },
  artistsRow: {
    justifyContent: "space-between",
  },
  artistItem: {
    width: "48%",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    marginBottom: 15,
  },
  artistImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  artistItemName: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  artistType: {
    fontSize: 14,
    marginTop: 4,
  },
  albumsList: {
    paddingBottom: 20,
  },
  trackItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  trackImage: {
    width: 50,
    height: 50,
    borderRadius: 4,
  },
  trackInfo: {
    flex: 1,
    marginLeft: 15,
  },
  trackName: {
    fontSize: 16,
    fontWeight: "500",
  },
  artistName: {
    fontSize: 14,
    marginTop: 4,
  },
})

export default LibraryScreen

