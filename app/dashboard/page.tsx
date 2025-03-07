import { Suspense } from "react"
import MusicPlayer from "@/components/MusicPlayer"
import Navbar from "@/components/Navbar"
import NewReleases from "@/components/NewReleases"
import FeaturedPlaylists from "@/components/FeaturedPlaylists"
import LoadingSpinner from "@/components/LoadingSpinner"

export default function Dashboard() {
  return (
    <div className="h-screen w-full bg-black text-white flex flex-col">
      <Navbar />

      <main className="flex-1 overflow-y-auto p-4">
        <Suspense fallback={<LoadingSpinner />}>
          <NewReleases />
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <FeaturedPlaylists />
        </Suspense>
      </main>

      <MusicPlayer />
    </div>
  )
}

