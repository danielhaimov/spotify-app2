import { getFeaturedPlaylists } from "@/lib/spotify"
import Image from "next/image"
import Link from "next/link"

export default async function FeaturedPlaylists() {
  const playlists = await getFeaturedPlaylists(5)

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">Featured Playlists</h2>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {playlists.map((playlist) => (
          <Link
            href={`/playlist/${playlist.id}`}
            key={playlist.id}
            className="bg-gray-900 rounded-lg p-3 hover:bg-gray-800 transition-colors"
          >
            <div className="relative aspect-square w-full mb-2">
              <Image
                src={playlist.images[0]?.url || "/placeholder.svg?height=200&width=200"}
                alt={playlist.name}
                fill
                className="object-cover rounded"
              />
            </div>
            <h3 className="font-medium text-sm truncate">{playlist.name}</h3>
            <p className="text-xs text-gray-400 truncate">{playlist.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

