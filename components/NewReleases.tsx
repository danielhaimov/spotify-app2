import { getNewReleases } from "@/lib/spotify"
import Image from "next/image"
import Link from "next/link"

export default async function NewReleases() {
  const releases = await getNewReleases(5)

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">New Releases</h2>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {releases.map((album) => (
          <Link
            href={`/album/${album.id}`}
            key={album.id}
            className="bg-gray-900 rounded-lg p-3 hover:bg-gray-800 transition-colors"
          >
            <div className="relative aspect-square w-full mb-2">
              <Image
                src={album.images[0]?.url || "/placeholder.svg?height=200&width=200"}
                alt={album.name}
                fill
                className="object-cover rounded"
              />
            </div>
            <h3 className="font-medium text-sm truncate">{album.name}</h3>
            <p className="text-xs text-gray-400 truncate">{album.artists[0]?.name}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

