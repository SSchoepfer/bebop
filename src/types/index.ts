export interface Track {
  id: string
  title: string
  artist: string
  album: string
  albumSlug: string
  year: number
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
