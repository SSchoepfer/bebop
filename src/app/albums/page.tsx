import AlbumCard from '@/components/AlbumCard'
import { getAllAlbums } from '@/lib/tracks'

export const metadata = {
  title: 'Albums — bebop',
}

export default function AlbumsPage() {
  const albums = getAllAlbums()

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-8">Albums</h1>
      {albums.length === 0 ? (
        <p className="text-zinc-500">No albums yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {albums.map((album) => (
            <AlbumCard key={album.slug} album={album} />
          ))}
        </div>
      )}
    </div>
  )
}
