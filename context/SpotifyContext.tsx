"use client"

import type React from "react"
import { createContext, useState, useContext, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { encode as btoa } from "base-64"

interface Track {
  id: string
  name: string
  artist: string
  album: string
  imageUrl: string
  previewUrl: string | null
}

interface SpotifyContextType {
  isInitialized: boolean
  accessToken: string | null
  tracks: Track[]
  currentTrack: Track | null
  isPlaying: boolean
  fetchTracks: () => Promise<void>
  playTrack: (track: Track) => void
  pauseTrack: () => void
  resumeTrack: () => void
  nextTrack: () => void
  previousTrack: () => void
}

const SpotifyContext = createContext<SpotifyContextType | undefined>(undefined)

export const SpotifyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false)
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [tracks, setTracks] = useState<Track[]>([])
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audio, setAudio] = useState<any>(null)

  useEffect(() => {
    // Initialize Spotify API
    const initializeSpotify = async () => {
      try {
        // Check if we have a cached token
        const token = await AsyncStorage.getItem("spotify_token")
        const tokenExpiry = await AsyncStorage.getItem("spotify_token_expiry")

        if (token && tokenExpiry && new Date().getTime() < Number.parseInt(tokenExpiry)) {
          setAccessToken(token)
          await fetchTracksWithToken(token)
        } else {
          await getNewToken()
        }

        setIsInitialized(true)
      } catch (error) {
        console.error("Error initializing Spotify", error)
      }
    }

    initializeSpotify()

    // Cleanup audio on unmount
    return () => {
      if (audio) {
        audio.unloadAsync()
      }
    }
  }, [])

  const getNewToken = async () => {
    try {
      const clientId = process.env.SPOTIFY_CLIENT_ID
      const clientSecret = process.env.SPOTIFY_CLIENT_SECRET

      if (!clientId || !clientSecret) {
        throw new Error("Spotify credentials not found")
      }

      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
        },
        body: "grant_type=client_credentials",
      })

      const data = await response.json()

      if (data.access_token) {
        const expiryTime = new Date().getTime() + data.expires_in * 1000
        await AsyncStorage.setItem("spotify_token", data.access_token)
        await AsyncStorage.setItem("spotify_token_expiry", expiryTime.toString())

        setAccessToken(data.access_token)
        await fetchTracksWithToken(data.access_token)
      } else {
        throw new Error("Failed to get access token")
      }
    } catch (error) {
      console.error("Error getting Spotify token", error)
    }
  }

  const fetchTracksWithToken = async (token: string) => {
    try {
      // Fetch new releases
      const response = await fetch("https://api.spotify.com/v1/browse/new-releases?limit=20", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()

      if (data.albums && data.albums.items) {
        const fetchedTracks: Track[] = []

        // For each album, get the first track
        for (const album of data.albums.items) {
          const tracksResponse = await fetch(`https://api.spotify.com/v1/albums/${album.id}/tracks?limit=1`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })

          const tracksData = await tracksResponse.json()

          if (tracksData.items && tracksData.items.length > 0) {
            const track = tracksData.items[0]
            fetchedTracks.push({
              id: track.id,
              name: track.name,
              artist: track.artists[0].name,
              album: album.name,
              imageUrl: album.images[0]?.url || "",
              previewUrl: track.preview_url,
            })
          }
        }

        setTracks(fetchedTracks)
        if (fetchedTracks.length > 0 && !currentTrack) {
          setCurrentTrack(fetchedTracks[0])
        }
      }
    } catch (error) {
      console.error("Error fetching tracks", error)
    }
  }

  const fetchTracks = async () => {
    if (accessToken) {
      await fetchTracksWithToken(accessToken)
    } else {
      await getNewToken()
    }
  }

  const playTrack = async (track: Track) => {
    try {
      if (audio) {
        await audio.unloadAsync()
      }

      if (track.previewUrl) {
        const { Audio } = await import("expo-av")
        const { sound } = await Audio.Sound.createAsync({ uri: track.previewUrl }, { shouldPlay: true })

        setAudio(sound)
        setCurrentTrack(track)
        setIsPlaying(true)
      } else {
        console.log("No preview URL available for this track")
      }
    } catch (error) {
      console.error("Error playing track", error)
    }
  }

  const pauseTrack = async () => {
    if (audio && isPlaying) {
      await audio.pauseAsync()
      setIsPlaying(false)
    }
  }

  const resumeTrack = async () => {
    if (audio && !isPlaying) {
      await audio.playAsync()
      setIsPlaying(true)
    }
  }

  const nextTrack = () => {
    if (currentTrack && tracks.length > 0) {
      const currentIndex = tracks.findIndex((t) => t.id === currentTrack.id)
      const nextIndex = (currentIndex + 1) % tracks.length
      playTrack(tracks[nextIndex])
    }
  }

  const previousTrack = () => {
    if (currentTrack && tracks.length > 0) {
      const currentIndex = tracks.findIndex((t) => t.id === currentTrack.id)
      const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length
      playTrack(tracks[prevIndex])
    }
  }

  return (
    <SpotifyContext.Provider
      value={{
        isInitialized,
        accessToken,
        tracks,
        currentTrack,
        isPlaying,
        fetchTracks,
        playTrack,
        pauseTrack,
        resumeTrack,
        nextTrack,
        previousTrack,
      }}
    >
      {children}
    </SpotifyContext.Provider>
  )
}

export const useSpotify = () => {
  const context = useContext(SpotifyContext)
  if (context === undefined) {
    throw new Error("useSpotify must be used within a SpotifyProvider")
  }
  return context
}

