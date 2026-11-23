export interface Track {
  id: string
  title: string
  artist: string
  album: string
  albumSlug: string
  year: number
  date?: string // ISO "YYYY-MM-DD", set only when a real recording date is known
  file: string
  duration: number
  cover: string
  notes?: string
  tags?: string[]
  type: 'track' | 'sample' | 'sound'
  bpm?: number
  key?: string
}

export interface Album {
  slug: string
  title: string
  artist: string
  year: number
  cover: string
  type: 'ep' | 'album' | 'single' | 'collection'
  description?: string
  tracks: Track[]
}
