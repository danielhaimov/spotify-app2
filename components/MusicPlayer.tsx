"use client"
import { useState, useRef, useEffect } from "react"
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react"
import Image from "next/image"

// Mock current track
const mockTrack = {
  id: "song1",
  title: "Bad Guy",
  artist: "Billie Eilish",
  album: "When We All Fall Asleep, Where Do We Go?",
  coverImage: "/placeholder.svg?height=80&width=80",
  duration: 194, // in
  coverImage: "/placeholder.svg?height=80&width=80",
  duration: 194, // in seconds
}

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(80)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause()
    } else {
      audioRef.current?.play()
    }
    setIsPlaying(!isPlaying)
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateProgress = () => {
      setCurrentTime(audio.currentTime)
    }

    audio.addEventListener("timeupdate", updateProgress)

    return () => {
      audio.removeEventListener("timeupdate", updateProgress)
    }
  }, [])

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="bg-gray-900 border-t border-gray-800 p-4">
      <audio ref={audioRef} src="/media/sample-track.mp3" />

      <div className="flex items-center">
        <div className="flex-shrink-0 mr-4">
          <Image
            src={mockTrack.coverImage || "/placeholder.svg"}
            alt={mockTrack.title}
            width={56}
            height={56}
            className="rounded"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-medium truncate">{mockTrack.title}</h3>
          <p className="text-sm text-gray-400 truncate">{mockTrack.artist}</p>

          <div className="flex items-center mt-2">
            <span className="text-xs text-gray-500 w-8">{formatTime(currentTime)}</span>
            <div className="flex-1 mx-2">
              <div className="h-1 bg-gray-700 rounded-full">
                <div
                  className="h-1 bg-[#1DB954] rounded-full"
                  style={{ width: `${(currentTime / mockTrack.duration) * 100}%` }}
                ></div>
              </div>
            </div>
            <span className="text-xs text-gray-500 w-8">{formatTime(mockTrack.duration)}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center mt-4">
        <button className="text-gray-400 mx-2">
          <SkipBack className="w-5 h-5" />
        </button>

        <button
          className="bg-[#1DB954] text-black rounded-full p-2 mx-4 flex items-center justify-center"
          onClick={togglePlay}
        >
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        </button>

        <button className="text-gray-400 mx-2">
          <SkipForward className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center mt-4">
        <Volume2 className="w-4 h-4 text-gray-400 mr-2" />
        <div className="flex-1">
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number.parseInt(e.target.value))}
            className="w-full accent-[#1DB954]"
          />
        </div>
      </div>
    </div>
  )
}

