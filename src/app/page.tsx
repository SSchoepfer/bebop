import Link from 'next/link'
import AlbumCard from '@/components/AlbumCard'
import TrackList from '@/components/TrackList'
import { getAllAlbums, getAllTracks } from '@/lib/tracks'

export default function Home() {
  const albums = getAllAlbums()
  const recentTracks = getAllTracks().slice(0, 5)

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Hero */}
      <section className="mb-16">
        <h1 className="text-5xl font-bold tracking-tight text-white mb-3">bebop</h1>
        <p className="text-zinc-400 text-lg">samples &amp; sounds — stream or download originals</p>
      </section>

      {/* Albums */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white">Albums</h2>
          <Link href="/albums" className="text-sm text-zinc-400 hover:text-white transition-colors">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {albums.map((album) => (
            <AlbumCard key={album.slug} album={album} />
          ))}
        </div>
      </section>

      {/* Recent Tracks */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Recent Tracks</h2>
          <Link href="/tracks" className="text-sm text-zinc-400 hover:text-white transition-colors">
            View all →
          </Link>
        </div>
        <div className="bg-zinc-900 rounded-lg border border-zinc-800">
          <TrackList tracks={recentTracks} />
        </div>
      </section>
    </div>
  )
}
