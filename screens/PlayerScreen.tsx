"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Feather, Ionicons } from "@expo/vector-icons"
import Slider from "@react-native-community/slider"
import { useTheme } from "../context/ThemeContext"
import { useSpotify } from "../context/SpotifyContext"

const { width } = Dimensions.get("window")

const PlayerScreen = () => {
  const navigation = useNavigation()
  const { colors } = useTheme()
  const { currentTrack, isPlaying, pauseTrack, resumeTrack, nextTrack, previousTrack } = useSpotify()

  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(30) // Most Spotify previews are 30 seconds

  useEffect(() => {
    let interval
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= duration) {
            clearInterval(interval)
            return duration
          }
          return prev + 1
        })
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isPlaying, duration])

  useEffect(() => {
    // Reset progress when track changes
    setProgress(0)
  }, [currentTrack])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  if (!currentTrack) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.noTrackText, { color: colors.text }]}>
          No track selected. Please select a track from the Home screen.
        </Text>
      </View>
    )
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="chevron-down" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Now playing</Text>
        <TouchableOpacity>
          <Feather name="more-vertical" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.albumArtContainer}>
        <Image source={{ uri: currentTrack.imageUrl }} style={styles.albumArt} resizeMode="cover" />
      </View>

      <View style={styles.trackInfoContainer}>
        <Text style={[styles.trackTitle, { color: colors.text }]}>{currentTrack.name}</Text>
        <Text style={[styles.artistName, { color: colors.secondary }]}>{currentTrack.artist}</Text>
      </View>

      <View style={styles.progressContainer}>
        <Slider
          style={styles.progressBar}
          minimumValue={0}
          maximumValue={duration}
          value={progress}
          onValueChange={setProgress}
          minimumTrackTintColor={colors.primary}
          maximumTrackTintColor={colors.border}
          thumbTintColor={colors.primary}
        />
        <View style={styles.timeContainer}>
          <Text style={[styles.timeText, { color: colors.secondary }]}>{formatTime(progress)}</Text>
          <Text style={[styles.timeText, { color: colors.secondary }]}>{formatTime(duration)}</Text>
        </View>
      </View>

      <View style={styles.controlsContainer}>
        <TouchableOpacity style={styles.controlButton}>
          <Feather name="shuffle" size={20} color={colors.secondary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlButton} onPress={previousTrack}>
          <Ionicons name="play-skip-back" size={24} color={colors.text} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.playPauseButton, { backgroundColor: colors.primary }]}
          onPress={isPlaying ? pauseTrack : resumeTrack}
        >
          <Ionicons
            name={isPlaying ? "pause" : "play"}
            size={30}
            color="white"
            style={isPlaying ? {} : { marginLeft: 4 }}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlButton} onPress={nextTrack}>
          <Ionicons name="play-skip-forward" size={24} color={colors.text} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlButton}>
          <Feather name="repeat" size={20} color={colors.secondary} />
        </TouchableOpacity>
      </View>

      <View style={styles.extraControlsContainer}>
        <TouchableOpacity>
          <Feather name="speaker" size={20} color={colors.secondary} />
        </TouchableOpacity>

        <TouchableOpacity>
          <Feather name="share" size={20} color={colors.secondary} />
        </TouchableOpacity>

        <TouchableOpacity>
          <Feather name="heart" size={20} color={colors.secondary} />
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 16,
  },
  noTrackText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 200,
  },
  albumArtContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  albumArt: {
    width: width - 80,
    height: width - 80,
    borderRadius: 20,
  },
  trackInfoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  trackTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  artistName: {
    fontSize: 16,
    textAlign: "center",
  },
  progressContainer: {
    marginBottom: 30,
  },
  progressBar: {
    width: "100%",
    height: 40,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: -10,
  },
  timeText: {
    fontSize: 12,
  },
  controlsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
  },
  controlButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  playPauseButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  extraControlsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
})

export default PlayerScreen

