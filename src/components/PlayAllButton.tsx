'use client'

import { usePlayer } from '@/components/PlayerContext'
import type { Track } from '@/types'

export default function PlayAllButton({ tracks }: { tracks: Track[] }) {
  const { play, pause, isPlaying, currentTrack, queue } = usePlayer()

  const isThisQueuePlaying =
    isPlaying && queue.length > 0 && tracks.some((t) => t.id === currentTrack?.id)

  function handleClick() {
    if (isThisQueuePlaying) {
      pause()
    } else if (tracks.length > 0) {
      play(tracks[0], tracks)
    }
  }

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-medium text-sm hover:bg-zinc-200 transition-colors"
    >
      {isThisQueuePlaying ? (
        <>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          </svg>
          Pause
        </>
      ) : (
        <>
          <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
          Play All
        </>
      )}
    </button>
  )
}
