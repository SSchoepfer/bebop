'use client'

import { usePlayer } from '@/components/PlayerContext'
import Image from 'next/image'

function formatTime(seconds: number): string {
  if (!isFinite(seconds) || seconds < 0) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function AudioPlayer() {
  const { currentTrack, isPlaying, currentTime, duration, volume, pause, resume, seek, setVolume, next, previous } =
    usePlayer()

  if (!currentTrack) return null

  const progress = duration > 0 ? currentTime / duration : 0

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 px-4 py-3 flex items-center gap-4 z-50">
      {/* Cover */}
      <div className="w-11 h-11 rounded overflow-hidden flex-shrink-0 bg-zinc-800">
        <img
          src={currentTrack.cover}
          alt={currentTrack.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Track info */}
      <div className="flex-shrink-0 w-44 min-w-0">
        <p className="text-sm font-medium text-white truncate">{currentTrack.title}</p>
        <p className="text-xs text-zinc-400 truncate">{currentTrack.artist}</p>
      </div>

      {/* Transport controls */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <button onClick={previous} className="text-zinc-400 hover:text-white transition-colors" aria-label="Previous">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
          </svg>
        </button>
        <button
          onClick={isPlaying ? pause : resume}
          className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center hover:bg-zinc-200 transition-colors"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
        <button onClick={next} className="text-zinc-400 hover:text-white transition-colors" aria-label="Next">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 18l8.5-6L6 6v12zM16 6h2v12h-2z" />
          </svg>
        </button>
      </div>

      {/* Progress */}
      <div className="flex-1 flex items-center gap-2 min-w-0">
        <span className="text-xs text-zinc-500 flex-shrink-0 w-9 text-right tabular-nums">
          {formatTime(currentTime)}
        </span>
        <div
          className="flex-1 h-1 bg-zinc-700 rounded-full cursor-pointer relative group"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect()
            seek((e.clientX - rect.left) / rect.width)
          }}
        >
          <div
            className="h-full bg-white rounded-full relative transition-all"
            style={{ width: `${progress * 100}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
        <span className="text-xs text-zinc-500 flex-shrink-0 w-9 tabular-nums">{formatTime(duration)}</span>
      </div>

      {/* Volume */}
      <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
        <svg className="w-4 h-4 text-zinc-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
        </svg>
        <input
          type="range"
          min="0"
          max="1"
          step="0.02"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-20 accent-white cursor-pointer"
          aria-label="Volume"
        />
      </div>

      {/* Download */}
      <a
        href={currentTrack.file}
        download
        className="flex-shrink-0 text-zinc-500 hover:text-white transition-colors"
        title={`Download ${currentTrack.title}`}
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
        </svg>
      </a>
    </div>
  )
}
