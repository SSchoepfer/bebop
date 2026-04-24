import { notFound } from 'next/navigation'
import { getAlbumBySlug, getAllAlbums } from '@/lib/tracks'
import TrackList from '@/components/TrackList'
import PlayAllButton from '@/components/PlayAllButton'

export async function generateStaticParams() {
  return getAllAlbums().map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const album = getAlbumBySlug(slug)
  if (!album) return {}
  return { title: `${album.title} — bebop` }
}

export default async function AlbumPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const album = getAlbumBySlug(slug)
  if (!album) notFound()

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Album header */}
      <div className="flex flex-col sm:flex-row gap-8 mb-12">
        <div className="w-48 h-48 flex-shrink-0 rounded-lg overflow-hidden bg-zinc-800 self-start">
          <img src={album.cover} alt={album.title} className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col justify-end gap-2">
          <span className="text-xs text-zinc-500 uppercase tracking-widest font-medium">{album.type}</span>
          <h1 className="text-4xl font-bold text-white leading-tight">{album.title}</h1>
          <p className="text-zinc-400 text-lg">{album.artist}</p>
          <p className="text-zinc-600 text-sm">{album.year} &middot; {album.tracks.length} tracks</p>
          {album.description && <p className="text-zinc-400 text-sm mt-1 max-w-md">{album.description}</p>}
          <div className="mt-4">
            <PlayAllButton tracks={album.tracks} />
          </div>
        </div>
      </div>

      {/* Track list */}
      <div className="bg-zinc-900 rounded-lg border border-zinc-800">
        <TrackList tracks={album.tracks} />
      </div>
    </div>
  )
}
