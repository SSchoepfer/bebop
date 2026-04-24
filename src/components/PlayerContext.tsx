'use client'

import { createContext, useContext, useState, useRef, useCallback } from 'react'
import type { Track } from '@/types'

interface PlayerContextType {
  currentTrack: Track | null
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
  queue: Track[]
  play: (track: Track, queue?: Track[]) => void
  pause: () => void
  resume: () => void
  seek: (pct: number) => void
  setVolume: (vol: number) => void
  next: () => void
  previous: () => void
}

const PlayerContext = createContext<PlayerContextType | null>(null)

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolumeState] = useState(0.8)
  const [queue, setQueue] = useState<Track[]>([])

  const howlRef = useRef<any>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const queueRef = useRef<Track[]>([])
  const queueIndexRef = useRef<number>(0)
  const volumeRef = useRef(0.8)

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const loadAndPlay = useCallback(
    async (track: Track, trackQueue: Track[], index: number) => {
      const { Howl } = await import('howler')

      if (howlRef.current) {
        howlRef.current.stop()
        howlRef.current.unload()
        howlRef.current = null
      }
      clearTimer()

      queueRef.current = trackQueue
      queueIndexRef.current = index
      setQueue(trackQueue)
      setCurrentTrack(track)
      setCurrentTime(0)
      setDuration(0)

      const howl = new Howl({
        src: [track.file],
        html5: true,
        volume: volumeRef.current,
        onplay() {
          setIsPlaying(true)
          setDuration(howl.duration())
          timerRef.current = setInterval(() => {
            setCurrentTime(howl.seek() as number)
          }, 250)
        },
        onpause() {
          setIsPlaying(false)
          clearTimer()
        },
        onstop() {
          setIsPlaying(false)
          clearTimer()
          setCurrentTime(0)
        },
        onend() {
          setIsPlaying(false)
          clearTimer()
          const nextIdx = queueIndexRef.current + 1
          if (nextIdx < queueRef.current.length) {
            loadAndPlay(queueRef.current[nextIdx], queueRef.current, nextIdx)
          }
        },
      })

      howlRef.current = howl
      howl.play()
    },
    [clearTimer]
  )

  const play = useCallback(
    (track: Track, newQueue?: Track[]) => {
      const q = newQueue ?? [track]
      const idx = q.findIndex((t) => t.id === track.id)
      loadAndPlay(track, q, idx >= 0 ? idx : 0)
    },
    [loadAndPlay]
  )

  const pause = useCallback(() => howlRef.current?.pause(), [])

  const resume = useCallback(() => {
    if (howlRef.current && !howlRef.current.playing()) {
      howlRef.current.play()
    }
  }, [])

  const seek = useCallback((pct: number) => {
    if (howlRef.current) {
      const dur = howlRef.current.duration() as number
      const t = pct * dur
      howlRef.current.seek(t)
      setCurrentTime(t)
    }
  }, [])

  const setVolume = useCallback((vol: number) => {
    volumeRef.current = vol
    setVolumeState(vol)
    howlRef.current?.volume(vol)
  }, [])

  const next = useCallback(() => {
    const nextIdx = queueIndexRef.current + 1
    if (nextIdx < queueRef.current.length) {
      loadAndPlay(queueRef.current[nextIdx], queueRef.current, nextIdx)
    }
  }, [loadAndPlay])

  const previous = useCallback(() => {
    const currentPos = howlRef.current ? (howlRef.current.seek() as number) : 0
    if (currentPos > 3) {
      howlRef.current?.seek(0)
      setCurrentTime(0)
    } else {
      const prevIdx = queueIndexRef.current - 1
      if (prevIdx >= 0) {
        loadAndPlay(queueRef.current[prevIdx], queueRef.current, prevIdx)
      }
    }
  }, [loadAndPlay])

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        currentTime,
        duration,
        volume,
        queue,
        play,
        pause,
        resume,
        seek,
        setVolume,
        next,
        previous,
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}

export function usePlayer() {
  const ctx = useContext(PlayerContext)
  if (!ctx) throw new Error('usePlayer must be used within PlayerProvider')
  return ctx
}
