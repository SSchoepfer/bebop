'use client'

import { usePlayer } from '@/components/PlayerContext'
import type { Track } from '@/types'

function formatTime(seconds: number): string {
  if (!isFinite(seconds) || seconds < 0) return '—'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function TrackList({ tracks }: { tracks: Track[] }) {
  const { currentTrack, isPlaying, play, pause, resume } = usePlayer()

  function handlePlay(track: Track) {
    if (currentTrack?.id === track.id) {
      isPlaying ? pause() : resume()
    } else {
      play(track, tracks)
    }
  }

  return (
    <div className="divide-y divide-zinc-800">
      {tracks.map((track, i) => {
        const isActive = currentTrack?.id === track.id
        return (
          <div
            key={track.id}
            className={`flex items-center gap-3 px-3 py-3 rounded group hover:bg-zinc-800/50 transition-colors ${isActive ? 'bg-zinc-800/30' : ''}`}
          >
            {/* Track number / play indicator */}
            <div className="w-6 flex-shrink-0 flex items-center justify-center">
              <button
                onClick={() => handlePlay(track)}
                className="text-zinc-500 hover:text-white transition-colors"
                aria-label={isActive && isPlaying ? 'Pause' : 'Play'}
              >
                {isActive && isPlaying ? (
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                ) : (
                  <>
                    <span className={`text-xs tabular-nums group-hover:hidden ${isActive ? 'hidden' : 'block'}`}>
                      {i + 1}
                    </span>
                    <svg
                      className={`w-4 h-4 ${isActive ? 'block' : 'hidden group-hover:block'}`}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </>
                )}
              </button>
            </div>

            {/* Title + meta */}
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium truncate ${isActive ? 'text-white' : 'text-zinc-200'}`}>
                {track.title}
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-zinc-500 truncate">{track.artist}</span>
                {track.notes && (
                  <span className="text-xs text-zinc-600 truncate hidden sm:block">&middot; {track.notes}</span>
                )}
              </div>
            </div>

            {/* Tags */}
            {track.tags && track.tags.length > 0 && (
              <div className="hidden md:flex gap-1 flex-shrink-0">
                {track.tags.map((tag) => (
                  <span key={tag} className="text-xs px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-500">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Duration */}
            <span className="text-xs text-zinc-500 flex-shrink-0 tabular-nums w-8 text-right">
              {formatTime(track.duration)}
            </span>

            {/* Download */}
            <a
              href={track.file}
              download
              onClick={(e) => e.stopPropagation()}
              className="flex-shrink-0 text-zinc-600 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
              title={`Download ${track.title}`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
              </svg>
            </a>
          </div>
        )
      })}
    </div>
  )
}
