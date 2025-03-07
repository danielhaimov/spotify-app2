import Image from "next/image"

export default function SplashScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-black">
      <Image src="/spotify-logo.svg" alt="Spotify Logo" width={150} height={150} className="text-[#1DB954]" />
    </div>
  )
}

