"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TextInput, FlatList, Image, TouchableOpacity } from "react-native"
import { Feather } from "@expo/vector-icons"
import { useTheme } from "../context/ThemeContext"
import { useSpotify } from "../context/SpotifyContext"

const SearchScreen = () => {
  const { colors } = useTheme()
  const { tracks, playTrack } = useSpotify()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTracks = searchQuery
    ? tracks.filter(
        (track) =>
          track.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          track.artist.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : []

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
      <Feather name="play" size={24} color={colors.primary} />
    </TouchableOpacity>
  )

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Search</Text>
      </View>

      <View style={[styles.searchContainer, { backgroundColor: colors.card }]}>
        <Feather name="search" size={20} color={colors.secondary} />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="Artists, songs, or podcasts"
          placeholderTextColor={colors.secondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery ? (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <Feather name="x" size={20} color={colors.secondary} />
          </TouchableOpacity>
        ) : null}
      </View>

      {searchQuery ? (
        <FlatList
          data={filteredTracks}
          renderItem={renderTrackItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.tracksList}
          ListEmptyComponent={
            <Text style={[styles.emptyText, { color: colors.secondary }]}>No results found for "{searchQuery}"</Text>
          }
        />
      ) : (
        <View style={styles.browseContainer}>
          <Text style={[styles.browseTitle, { color: colors.text }]}>Browse all</Text>
          <View style={styles.categoriesGrid}>
            {["Pop", "Hip-Hop", "Rock", "Electronic", "R&B", "Latin", "K-Pop", "Classical"].map((category, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.categoryItem,
                  {
                    backgroundColor: [
                      "#1DB954",
                      "#FF5733",
                      "#3498DB",
                      "#9B59B6",
                      "#F1C40F",
                      "#E74C3C",
                      "#2ECC71",
                      "#34495E",
                    ][index % 8],
                  },
                ]}
              >
                <Text style={styles.categoryText}>{category}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
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
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
  },
  tracksList: {
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
  emptyText: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
  },
  browseContainer: {
    flex: 1,
  },
  browseTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  categoryItem: {
    width: "48%",
    height: 100,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  categoryText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
})

export default SearchScreen

