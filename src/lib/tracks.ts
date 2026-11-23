import catalog from '@/data/tracks.json'
import type { Track, Album } from '@/types'

export function getAllTracks(): Track[] {
  return catalog.tracks as Track[]
}

export function getAllAlbums(): Album[] {
  return catalog.albums.map((album) => ({
    ...album,
    tracks: catalog.tracks.filter((t) => t.albumSlug === album.slug) as Track[],
  })) as Album[]
}

export function getTracksChronological(): Track[] {
  return (catalog.tracks as Track[])
    .filter((t): t is Track & { date: string } => Boolean(t.date))
    .sort((a, b) => a.date!.localeCompare(b.date!))
}

export function getAlbumBySlug(slug: string): Album | null {
  const albumData = catalog.albums.find((a) => a.slug === slug)
  if (!albumData) return null
  return {
    ...albumData,
    tracks: catalog.tracks.filter((t) => t.albumSlug === slug) as Track[],
  } as Album
}
