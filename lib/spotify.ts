"use server"

// This file contains server-side Spotify API functionality

// Types
interface TokenResponse {
  access_token: string
  token_type: string
  expires_in: number
}

interface SpotifyUser {
  id: string
  display_name: string
  email: string
  images: { url: string }[]
  followers: { total: number }
}

interface SpotifyTrack {
  id: string
  name: string
  album: {
    name: string
    images: { url: string }[]
  }
  artists: { name: string }[]
  duration_ms: number
}

interface SpotifyPlaylist {
  id: string
  name: string
  description: string
  images: { url: string }[]
  tracks: { total: number }
}

// Get Spotify OAuth token using client credentials
async function getClientCredentialsToken(): Promise<string> {
  const clientId = process.env.SPOTIFY_CLIENT_ID
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    throw new Error("Missing Spotify credentials")
  }

  const authString = Buffer.from(`${clientId}:${clientSecret}`).toString("base64")

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${authString}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
    }),
  })

  if (!response.ok) {
    throw new Error("Failed to get Spotify access token")
  }

  const data: TokenResponse = await response.json()
  return data.access_token
}

// Mock functions for authentication (in a real app, you would use OAuth flow)
export async function signIn(email: string, password: string) {
  // This is just a mock - in a real app you would use Spotify OAuth
  console.log("Sign in attempt:", email)
  // Return a mock user for now
  return {
    id: "user1",
    name: "Demo User",
    email: email,
  }
}

export async function signUp(name: string, email: string, password: string) {
  // This is just a mock - in a real app you would use Spotify OAuth
  console.log("Sign up attempt:", name, email)
  // Return a mock user for now
  return {
    id: "user1",
    name: name,
    email: email,
  }
}

// Real Spotify API calls
export async function getNewReleases(limit = 10): Promise<SpotifyTrack[]> {
  const token = await getClientCredentialsToken()

  const response = await fetch(`https://api.spotify.com/v1/browse/new-releases?limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch new releases")
  }

  const data = await response.json()
  return data.albums.items
}

export async function getFeaturedPlaylists(limit = 10): Promise<SpotifyPlaylist[]> {
  const token = await getClientCredentialsToken()

  const response = await fetch(`https://api.spotify.com/v1/browse/featured-playlists?limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch featured playlists")
  }

  const data = await response.json()
  return data.playlists.items
}

export async function searchTracks(query: string, limit = 10): Promise<SpotifyTrack[]> {
  const token = await getClientCredentialsToken()

  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  if (!response.ok) {
    throw new Error("Failed to search tracks")
  }

  const data = await response.json()
  return data.tracks.items
}

export async function getPlaylistTracks(playlistId: string): Promise<SpotifyTrack[]> {
  const token = await getClientCredentialsToken()

  const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch playlist tracks")
  }

  const data = await response.json()
  return data.items.map((item: any) => item.track)
}

