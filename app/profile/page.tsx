"use client"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { MoreHorizontal } from "lucide-react"

export default function Profile() {
  const [activeTab, setActiveTab] = useState("songs")

  const user = {
    name: "Songwriters",
    handle: "songwriter@gmail.com",
    followers: 778,
    following: 243,
  }

  return (
    <div className="h-screen w-full bg-black text-white flex flex-col">
      <div className="relative">
        <div className="absolute top-4 right-4 z-10">
          <button className="bg-black/30 p-2 rounded-full">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-gradient-to-b from-gray-800 to-black pt-12 pb-6 px-6 flex flex-col items-center">
          <div className="relative w-24 h-24 mb-4">
            <Image src="/placeholder.svg?height=96&width=96" alt="Profile" fill className="rounded-full object-cover" />
          </div>

          <h1 className="text-xl font-bold mb-1">{user.name}</h1>
          <p className="text-sm text-gray-400 mb-4">{user.handle}</p>

          <div className="flex items-center gap-8">
            <div className="text-center">
              <p className="font-bold">{user.followers}</p>
              <p className="text-xs text-gray-400">Followers</p>
            </div>
            <div className="text-center">
              <p className="font-bold">{user.following}</p>
              <p className="text-xs text-gray-400">Following</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex border-b border-gray-800">
        <button
          className={`flex-1 py-3 text-sm font-medium ${activeTab === "songs" ? "text-white border-b-2 border-[#1DB954]" : "text-gray-400"}`}
          onClick={() => setActiveTab("songs")}
        >
          Songs
        </button>
        <button
          className={`flex-1 py-3 text-sm font-medium ${activeTab === "albums" ? "text-white border-b-2 border-[#1DB954]" : "text-gray-400"}`}
          onClick={() => setActiveTab("albums")}
        >
          Albums
        </button>
        <button
          className={`flex-1 py-3 text-sm font-medium ${activeTab === "playlists" ? "text-white border-b-2 border-[#1DB954]" : "text-gray-400"}`}
          onClick={() => setActiveTab("playlists")}
        >
          Playlists
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === "songs" && (
          <div className="space-y-2">
            <SongItem title="Don't Smile At Me" artist="Billie Eilish" duration="5:33" />
            <SongItem title="Lickabodiboum" artist="Sonder" duration="3:43" />
            <SongItem title="Super Freaky Girl" artist="Nicki Minaj" duration="2:52" />
            <SongItem title="Bad Habit" artist="Steve Lacy" duration="3:52" />
            <SongItem title="Planet Her" artist="Doja Cat" duration="3:14" />
            <SongItem title="Sweetest Pie" artist="Megan Thee Stallion" duration="3:36" />
          </div>
        )}

        {activeTab === "albums" && (
          <div className="grid grid-cols-2 gap-4">
            <AlbumItem title="Ultravoilence" artist="Lana Del Rey" image="/placeholder.svg?height=150&width=150" />
            <AlbumItem title="Happier Than Ever" artist="Billie Eilish" image="/placeholder.svg?height=150&width=150" />
            <AlbumItem title="Wiped Out!" artist="The Neighborhood" image="/placeholder.svg?height=150&width=150" />
          </div>
        )}

        {activeTab === "playlists" && (
          <div className="grid grid-cols-2 gap-4">
            <AlbumItem title="My Playlist #1" artist="Created by you" image="/placeholder.svg?height=150&width=150" />
            <AlbumItem title="Favorites" artist="Created by you" image="/placeholder.svg?height=150&width=150" />
          </div>
        )}
      </div>

      <div className="p-4 flex justify-around items-center bg-gray-900 border-t border-gray-800">
        <Link href="/dashboard" className="text-gray-400">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        </Link>
        <Link href="/search" className="text-gray-400">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </Link>
        <Link href="/library" className="text-gray-400">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        </Link>
        <Link href="/profile" className="text-[#1DB954]">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    </div>
  )
}

interface SongItemProps {
  title: string
  artist: string
  duration: string
}

function SongItem({ title, artist, duration }: SongItemProps) {
  return (
    <div className="flex items-center p-2 hover:bg-gray-900 rounded-md">
      <div className="flex-1 min-w-0 mr-2">
        <h3 className="font-medium truncate">{title}</h3>
        <p className="text-xs text-gray-400 truncate">{artist}</p>
      </div>
      <div className="text-xs text-gray-400">{duration}</div>
    </div>
  )
}

interface AlbumItemProps {
  title: string
  artist: string
  image: string
}

function AlbumItem({ title, artist, image }: AlbumItemProps) {
  return (
    <div className="bg-gray-900 rounded-lg p-3">
      <div className="relative aspect-square w-full mb-2">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover rounded" />
      </div>
      <h3 className="font-medium text-sm truncate">{title}</h3>
      <p className="text-xs text-gray-400 truncate">{artist}</p>
    </div>
  )
}

