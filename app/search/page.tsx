"use client"
import { useState } from "react"
import { SearchIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Navbar from "@/components/Navbar"
import { searchTracks } from "@/lib/spotify"

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("")
  const [results, setResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = async () => {
    if (!searchTerm.trim()) return

    setIsSearching(true)
    try {
      const tracks = await searchTracks(searchTerm)
      setResults(tracks)
    } catch (error) {
      console.error("Search error:", error)
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <div className="h-screen w-full bg-black text-white flex flex-col">
      <div className="p-4 sticky top-0 bg-black z-10">
        <div className="relative mb-4">
          <Input
            type="text"
            placeholder="What do you want to listen to?"
            className="bg-gray-800 border-none py-6 pl-10 rounded-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>

        {!searchTerm && <h2 className="text-xl font-bold mb-4">Browse all</h2>}
      </div>

      <main className="flex-1 overflow-y-auto p-4">
        {isSearching ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#1DB954]"></div>
          </div>
        ) : (
          <>
            {!searchTerm ? (
              <div className="grid grid-cols-2 gap-4">
                <CategoryItem title="Pop" color="bg-pink-500" />
                <CategoryItem title="Hip-Hop" color="bg-indigo-600" />
                <CategoryItem title="Rock" color="bg-red-600" />
                <CategoryItem title="Electronic" color="bg-blue-500" />
                <CategoryItem title="R&B" color="bg-purple-600" />
                <CategoryItem title="Latin" color="bg-yellow-500" />
                <CategoryItem title="K-Pop" color="bg-green-500" />
                <CategoryItem title="Jazz" color="bg-orange-500" />
              </div>
            ) : (
              <>
                {results.length > 0 ? (
                  <div className="space-y-2">
                    {results.map((track) => (
                      <div key={track.id} className="flex items-center p-2 hover:bg-gray-900 rounded-md">
                        <div className="flex-shrink-0 mr-4">
                          <Image
                            src={track.album.images[0]?.url || "/placeholder.svg?height=56&width=56"}
                            alt={track.name}
                            width={56}
                            height={56}
                            className="rounded"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium truncate">{track.name}</h3>
                          <p className="text-xs text-gray-400 truncate">
                            {track.artists.map((a: any) => a.name).join(", ")}
                          </p>
                        </div>
                        <div className="text-xs text-gray-400">
                          {Math.floor(track.duration_ms / 60000)}:
                          {Math.floor((track.duration_ms % 60000) / 1000)
                            .toString()
                            .padStart(2, "0")}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-400">
                    {searchTerm && "No results found. Try a different search term."}
                  </div>
                )}
              </>
            )}
          </>
        )}
      </main>

      <Navbar />
    </div>
  )
}

interface CategoryItemProps {
  title: string
  color: string
}

function CategoryItem({ title, color }: CategoryItemProps) {
  return (
    <div className={`${color} rounded-lg p-4 h-24 flex items-end`}>
      <h3 className="font-bold text-white">{title}</h3>
    </div>
  )
}

