"use client"
import { useState } from "react"
import Link from "next/link"
import { Home, Search, Library, User } from "lucide-react"

export default function Navbar() {
  const [activeTab, setActiveTab] = useState("home")

  return (
    <div className="flex justify-around items-center p-4 bg-gray-900 border-t border-gray-800">
      <Link
        href="/dashboard"
        className={`flex flex-col items-center ${activeTab === "home" ? "text-[#1DB954]" : "text-gray-400"}`}
        onClick={() => setActiveTab("home")}
      >
        <Home className="w-6 h-6" />
        <span className="text-xs mt-1">Home</span>
      </Link>

      <Link
        href="/search"
        className={`flex flex-col items-center ${activeTab === "search" ? "text-[#1DB954]" : "text-gray-400"}`}
        onClick={() => setActiveTab("search")}
      >
        <Search className="w-6 h-6" />
        <span className="text-xs mt-1">Search</span>
      </Link>

      <Link
        href="/library"
        className={`flex flex-col items-center ${activeTab === "library" ? "text-[#1DB954]" : "text-gray-400"}`}
        onClick={() => setActiveTab("library")}
      >
        <Library className="w-6 h-6" />
        <span className="text-xs mt-1">Library</span>
      </Link>

      <Link
        href="/profile"
        className={`flex flex-col items-center ${activeTab === "profile" ? "text-[#1DB954]" : "text-gray-400"}`}
        onClick={() => setActiveTab("profile")}
      >
        <User className="w-6 h-6" />
        <span className="text-xs mt-1">Profile</span>
      </Link>
    </div>
  )
}

